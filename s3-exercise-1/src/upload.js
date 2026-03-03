const fs = require('fs');
const path = require('path');
const S3Service = require("./s3Service");
const client = require('./s3Client')
require('dotenv').config();

/**
 * Main Execute function for uploading JSON file to AWS S3 Bucket
 */
async function execute() {
  console.log('main S3 upload function- start')

  const bucketName=process.env.BUCKET_NAME;
  if(!bucketName){
      throw new Error('BUCKET_NAME is not defined in the process.env')
  }

  const service= new S3Service(client, bucketName)
  const localFileName = process.env.FILE_NAME || "the-phoenix-test-sample.json";
  const key = localFileName;

  try {
    console.log('reading file content, parsing to JSON type.')
    const filePath = path.join(__dirname, '..', localFileName);
    if(!fs.existsSync(filePath)){
        throw new Error(`File not found at: ${filePath}`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));  
    console.log(`uploading ${localFileName} to bucket: ${bucketName}`);
    await service.upload(key, JSON.stringify(data));
    console.log('successfully uploaded to S3');
  } catch (err) {
    console.error('main S3 update function failed:', err.message);
  }
}

execute();