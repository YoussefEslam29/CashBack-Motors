"use client";

import { useState, useCallback } from "react";

interface UploadResult {
  /** The CDN URL where the file will be available after upload */
  cdnUrl: string;
  /** The S3 object key */
  key: string;
}

interface UploadState {
  /** Whether an upload is in progress */
  isUploading: boolean;
  /** Upload progress percentage (0–100) */
  progress: number;
  /** Error message if the upload failed */
  error: string | null;
  /** Result after a successful upload */
  result: UploadResult | null;
}

interface UseS3UploadOptions {
  /**
   * The API endpoint that returns pre-signed URLs.
   * Should match the API Gateway URL from the CDK stack output.
   * Example: "https://abc123.execute-api.eu-west-1.amazonaws.com/v1/get-upload-url"
   */
  apiEndpoint: string;

  /** Optional folder prefix for organizing uploads in S3 */
  folder?: string;

  /** Max file size in bytes (default: 50 MB) */
  maxFileSize?: number;
}

const DEFAULT_MAX_SIZE = 50 * 1024 * 1024; // 50 MB

/**
 * Custom hook for uploading files to S3 via pre-signed URLs with CloudFront CDN.
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, progress, error, result } = useS3Upload({
 *   apiEndpoint: process.env.NEXT_PUBLIC_UPLOAD_API_URL!,
 *   folder: "bike-images",
 * });
 *
 * const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (file) {
 *     const result = await upload(file);
 *     if (result) console.log("Available at:", result.cdnUrl);
 *   }
 * };
 * ```
 */
export function useS3Upload(options: UseS3UploadOptions) {
  const { apiEndpoint, folder, maxFileSize = DEFAULT_MAX_SIZE } = options;

  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    result: null,
  });

  const upload = useCallback(
    async (file: File): Promise<UploadResult | null> => {
      // ── Validate ────────────────────────────────────────
      if (file.size > maxFileSize) {
        const maxMB = Math.round(maxFileSize / 1024 / 1024);
        setState((s) => ({
          ...s,
          error: `File exceeds maximum size of ${maxMB} MB`,
          result: null,
        }));
        return null;
      }

      setState({
        isUploading: true,
        progress: 0,
        error: null,
        result: null,
      });

      try {
        // ── Step 1: Get pre-signed URL from our API ───────
        const presignResponse = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            folder,
          }),
        });

        if (!presignResponse.ok) {
          const errBody = await presignResponse.json().catch(() => ({}));
          throw new Error(
            errBody.error || `Failed to get upload URL (${presignResponse.status})`
          );
        }

        const { uploadUrl, cdnUrl, key } = await presignResponse.json();

        // ── Step 2: Upload directly to S3 via pre-signed URL ─
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", uploadUrl, true);
          xhr.setRequestHeader("Content-Type", file.type);

          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              setState((s) => ({ ...s, progress: pct }));
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(
                new Error(`Upload failed with status ${xhr.status}`)
              );
            }
          });

          xhr.addEventListener("error", () =>
            reject(new Error("Network error during upload"))
          );
          xhr.addEventListener("abort", () =>
            reject(new Error("Upload was cancelled"))
          );

          xhr.send(file);
        });

        // ── Step 3: Success ──────────────────────────────────
        const result: UploadResult = { cdnUrl, key };
        setState({
          isUploading: false,
          progress: 100,
          error: null,
          result,
        });
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        setState({
          isUploading: false,
          progress: 0,
          error: message,
          result: null,
        });
        return null;
      }
    },
    [apiEndpoint, folder, maxFileSize]
  );

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      result: null,
    });
  }, []);

  return {
    upload,
    reset,
    ...state,
  };
}
