#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FileUploadStack } from "../lib/file-upload-stack";

const app = new cdk.App();

new FileUploadStack(app, "CashbackMotoFileUploadStack", {
  description:
    "CashBack Moto — S3 file upload bucket with CloudFront CDN and pre-signed URL API",

  /* Uncomment and set these to deploy to a specific account/region:
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region:  process.env.CDK_DEFAULT_REGION,   // e.g. 'me-south-1' for Bahrain
  },
  */
});
