// @ts-check
/**
 * Lambda handler — generates pre-signed S3 PUT URLs for direct browser uploads.
 *
 * Environment variables (set by CDK):
 *   BUCKET_NAME         — target S3 bucket
 *   CDN_DOMAIN          — CloudFront distribution domain (e.g. d1234abcdef.cloudfront.net)
 *   URL_EXPIRY_SECONDS  — pre-signed URL lifetime (default 300)
 *   MAX_FILE_SIZE       — max allowed file size in bytes (default 50 MB)
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import path from "node:path";

const s3 = new S3Client({});

const BUCKET = process.env.BUCKET_NAME;
const CDN_DOMAIN = process.env.CDN_DOMAIN;
const EXPIRY = Number(process.env.URL_EXPIRY_SECONDS) || 300;
const MAX_SIZE = Number(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024;

/** File extensions we accept */
const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".pdf",
]);

/** Map extension → MIME type */
const MIME_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
};

/**
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 */
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { fileName, contentType, folder } = body;

    // ── Validate ──────────────────────────────────────────
    if (!fileName || typeof fileName !== "string") {
      return response(400, {
        error: "Missing or invalid 'fileName' in request body.",
      });
    }

    const ext = path.extname(fileName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return response(400, {
        error: `File extension '${ext}' is not allowed. Allowed: ${[...ALLOWED_EXTENSIONS].join(", ")}`,
      });
    }

    // ── Build unique S3 key ───────────────────────────────
    const prefix = folder ? `${sanitize(folder)}/` : "uploads/";
    const uniqueName = `${randomUUID()}${ext}`;
    const key = `${prefix}${uniqueName}`;

    const resolvedContentType =
      contentType || MIME_MAP[ext] || "application/octet-stream";

    // ── Generate pre-signed URL ───────────────────────────
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: resolvedContentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: EXPIRY });

    const cdnUrl = `https://${CDN_DOMAIN}/${key}`;

    return response(200, {
      uploadUrl,
      cdnUrl,
      key,
      expiresIn: EXPIRY,
    });
  } catch (err) {
    console.error("Pre-sign error:", err);
    return response(500, { error: "Internal server error" });
  }
}

// ── Helpers ─────────────────────────────────────────────────

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}

/** Strip dangerous characters from a folder name */
function sanitize(folder) {
  return folder
    .replace(/[^a-zA-Z0-9_\-\/]/g, "")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}
