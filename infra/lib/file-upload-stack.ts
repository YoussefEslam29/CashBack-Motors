import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as path from "path";

export class FileUploadStack extends cdk.Stack {
  /** The S3 bucket storing uploaded files */
  public readonly uploadBucket: s3.Bucket;

  /** The CloudFront distribution serving files from the bucket */
  public readonly cdn: cloudfront.Distribution;

  /** The API Gateway endpoint for requesting pre-signed upload URLs */
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ────────────────────────────────────────────────────────
    // 1. S3 Bucket — private, versioned, CORS-enabled
    // ────────────────────────────────────────────────────────
    this.uploadBucket = new s3.Bucket(this, "UploadBucket", {
      bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,

      // Lifecycle: move old versions to cheaper storage after 30 days
      lifecycleRules: [
        {
          id: "archive-old-versions",
          noncurrentVersionExpiration: cdk.Duration.days(90),
          noncurrentVersionTransitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(30),
            },
          ],
        },
      ],

      // CORS — allow direct browser uploads via PUT
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.PUT,
            s3.HttpMethods.POST,
            s3.HttpMethods.GET,
            s3.HttpMethods.HEAD,
          ],
          allowedOrigins: ["*"], // Tighten to your domain(s) in production
          allowedHeaders: ["*"],
          exposedHeaders: ["ETag"],
          maxAge: 3600,
        },
      ],
    });

    // ────────────────────────────────────────────────────────
    // 2. CloudFront Distribution — OAC to S3
    // ────────────────────────────────────────────────────────

    // Origin Access Control (OAC) for secure S3 access
    const oac = new cloudfront.S3OriginAccessControl(this, "UploadBucketOAC", {
      signing: cloudfront.Signing.SIGV4_NO_OVERRIDE,
    });

    this.cdn = new cloudfront.Distribution(this, "UploadCDN", {
      comment: "CashBack Moto — File Upload CDN",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(
          this.uploadBucket,
          { originAccessControl: oac }
        ),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // US + Europe + Israel — cheapest
      minimumProtocolVersion:
        cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
    });

    // ────────────────────────────────────────────────────────
    // 3. Lambda — generate pre-signed upload URLs
    // ────────────────────────────────────────────────────────
    const presignFn = new lambda.Function(this, "GetPresignedUrlFn", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "lambda", "get-presigned-url")
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        BUCKET_NAME: this.uploadBucket.bucketName,
        CDN_DOMAIN: this.cdn.distributionDomainName,
        URL_EXPIRY_SECONDS: "300", // 5 min
        MAX_FILE_SIZE: String(50 * 1024 * 1024), // 50 MB
      },
      description:
        "Generates S3 pre-signed PUT URLs for direct browser uploads",
    });

    // Grant the Lambda permission to generate pre-signed PutObject URLs
    this.uploadBucket.grantPut(presignFn);

    // ────────────────────────────────────────────────────────
    // 4. API Gateway — REST endpoint
    // ────────────────────────────────────────────────────────
    this.api = new apigateway.RestApi(this, "UploadApi", {
      restApiName: "CashbackMotoUploadApi",
      description: "API to get pre-signed S3 upload URLs",
      deployOptions: {
        stageName: "v1",
        throttlingRateLimit: 50,
        throttlingBurstLimit: 100,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // Tighten in production
        allowMethods: ["POST", "OPTIONS"],
        allowHeaders: [
          "Content-Type",
          "Authorization",
          "X-Amz-Date",
          "X-Api-Key",
        ],
      },
    });

    const uploadResource = this.api.root.addResource("get-upload-url");
    uploadResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(presignFn, {
        proxy: true,
      })
    );

    // ────────────────────────────────────────────────────────
    // 5. Outputs
    // ────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, "BucketName", {
      value: this.uploadBucket.bucketName,
      description: "S3 bucket for uploaded files",
    });

    new cdk.CfnOutput(this, "CDNDomain", {
      value: `https://${this.cdn.distributionDomainName}`,
      description: "CloudFront CDN URL to access uploaded files",
    });

    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: this.api.url,
      description: "API Gateway base URL",
    });

    new cdk.CfnOutput(this, "UploadEndpoint", {
      value: `${this.api.url}get-upload-url`,
      description: "POST here to get a pre-signed upload URL",
    });
  }
}
