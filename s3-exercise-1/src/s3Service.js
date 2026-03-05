const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

/**
 * Service class for AWS S3 operations handling
 */
class S3Service {
    /**
     * Initialization of S3 service with a client and bucket
     * @param {S3Client} client - instance of AWS sdk S3
     * @param {string} bucketName - S3 target bucket name
     * @throws {Error} In case bucket name isn't provided
     */
  constructor(client, bucketName) {
    if (!bucketName) {
      throw new Error("Bucket name must be provided.");
    }
    console.log(`creating S3Service instance. \n Name of S3 bucket to interact with is ${bucketName}`)
    this.client = client;
    this.bucketName = bucketName;
  }

  /**
   * Upload json content to S3 bucket
   * @param {string} key - Target name/path in the bucket
   * @param {string} content - string typed content for uploading
   */
  async upload(key, content) {
    console.log('S3Service/upload start');
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: content,
      ContentType: "application/json",
    });
    
    try {
      console.log('send command to AWS');
      await this.client.send(command);
    }
    catch(e){
      console.error(`uploading file failed. Error Meassage: ${e.message}`)
      throw e;
    }
  }

  /**
   * Fetching a JSON file from the S3 bucket and viewing it to console.
   * @param {string} key - Target name/path in the bucket of the file to fetch.
   * @returns {Promise<Object>} - Parsed JSON data, fetched from S3
   */
  async fetch(key) {
    console.log('S3Service/fetch start');
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      console.log('send command to AWS');
      const response = await this.client.send(command);
      const text = await response.Body.transformToString();
    
      return JSON.parse(text);
    }
    catch(e){
      console.error(`fetching file failed. Error Meassage: ${e.message}`)
      throw e;
    }
  }
}

module.exports = S3Service;