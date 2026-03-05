require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-west-1"
});

module.exports = s3Client;