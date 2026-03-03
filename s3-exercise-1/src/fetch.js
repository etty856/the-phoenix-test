const S3Service = require("./s3Service");
const client = require('./s3Client')
require("dotenv").config();

/**
 * Main Execute function for fetching and viewing JSON file from AWS S3 Bucket
 */
async function execute() {
  console.log('main S3 fetch function- start')

  const bucketName=process.env.BUCKET_NAME;
  if(!bucketName){
      throw new Error('BUCKET_NAME is not defined in the process.env')
  }

  const service= new S3Service(client, bucketName)
  const fileKey = process.env.FILE_NAME || "the-phoenix-test-sample.json";

  try {
    console.log(`fetching file: ${fileKey} from bucket: ${bucketName}`)
    const data = await service.fetch(fileKey);
    console.log('successfully fetched from S3');
    
    //view data in console
    console.log(`JSON file fetched from ${bucketName} \nraw content is: ${data}`)
    console.log(`beutify content is \n${JSON.stringify(data, null, 2)}`)

  } catch (error) {
    console.error('main S3 fetch function failed:', err.message);
  }
}

execute();