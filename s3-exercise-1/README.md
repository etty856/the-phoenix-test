# S3 File Upload & Fetch – using AWS SDK

## Overview

This project demonstrates a simple interaction with Amazon S3 using Node.js and AWS SDK v3.  

It includes:  
- Uploading a JSON file to S3  
- Fetching the file from S3  
- Secure credential handling  
- IAM policy following the Principle of Least Privilege  

The project is intentionally minimal while following production-oriented best practices.

---

## Tech Stack

- Node.js (v18 or higher)  
- AWS SDK for JavaScript (v3)  
- Amazon S3  
- Amazon IAM user  

---

## Prerequisites

- AWS Account  
- Node.js installed (v18+)  
- AWS CLI configured on your machine  

---

## Setup Instructions

### 1. Create an S3 Bucket
- Go to your AWS console and create a new bucket.  
- Note the bucket name for later steps.  

### 2. Create an IAM User
- Create a user with **Programmatic Access**.  

#### Recommended: Minimal Policy
Create a new policy with the following JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```
- Attach this policy to your IAM user.
- (For quick testing only, you may temporarily use AmazonS3FullAccess.)

#### Access Key 
- In IAM User settings → **Security credentials**, create a new Access Key.
- Choose **Command Line Interface (CLI)** option.
- Save **Access Key ID** and **Secret Access Key** securely (download the CSV file).


### 3. Configure AWS CLI
```bash
aws configure
```
Provide:
- Access Key ID
- Secret Access Key
- Default region (e.g., eu-west-1)

### 4. Clone this root repository (the-phoenix-test) 
```bash
git clone <repo-url>
cd s3-exercise-1
```

### 5. Add .env file 
Create a .env file in the project root:
```env
AWS_REGION=<your-region>       # defaults to eu-west-1
BUCKET_NAME=<your-bucket-name>   
FILE_NAME=<json-file-name-in-repo>        # defaults to to the-phoenix-test-sample.json file
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Upload JSON to S3
Upload the JSON file as specified in your .env to AWS S3 bucket using AWS SDK
Run this:
```
node src/upload.js
```

### 8. Fetch JSON from S3
Fetch and parse the JSON file as specefied in your .env from AWS S3 bucket using AWS SDK
Run this in terminal
```
node src/fetch.js
```

---

## Code Structure

- s3Client.js — Configures the S3 client
- s3Service.js — Encapsulates upload/fetch functions
- upload.js — Uses s3Service.upload() to upload JSON file
- fetch.js — Uses s3Service.fetch() to retrieve and parse JSON

---

## Usage Example
```bash
# Upload a file
node src/upload.js

# Fetch the file
node src/fetch.js
```
Expected output: JSON object logged in the console.

---

## Security Best Practices

- No credentials committed
- Principle of Least Privilege in IAM
- Bucket name injected through environment

---

## Troubleshooting
- Access Denied errors: Check that your IAM policy allows s3:PutObject and s3:GetObject for the correct bucket.
- AWS CLI not configured: Run aws configure and ensure keys are correct.
- File not found: Ensure the FILE_NAME in .env matches the actual JSON file name.

---

## Demo
```
the-phoenix-test> cd ./s3-exercise-1
the-phoenix-test\s3-exercise-1> node src/upload.js 
[dotenv@17.3.1] injecting env (3) from .env -- tip: ⚡️ secrets for agents: https://dotenvx.com/as2
[dotenv@17.3.1] injecting env (0) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
main S3 upload function- start
creating S3Service instance. 
 Name of S3 bucket to interact with is the-phoenix-test-etty
reading file content, parsing to JSON type.
uploading the-phoenix-test-sample.json to bucket: the-phoenix-test-etty
S3Service/upload start
send command to AWS
(node:15544) Warning: NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js v18.15.0 in January 2026.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/c895JFp
(Use `node --trace-warnings ...` to show where the warning was created)
successfully uploaded to S3
the-phoenix-test\s3-exercise-1> node src/fetch.js                
[dotenv@17.3.1] injecting env (3) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
[dotenv@17.3.1] injecting env (0) from .env -- tip: 🤖 agentic secret storage: https://dotenvx.com/as2                   
main S3 fetch function- start
creating S3Service instance. 
 Name of S3 bucket to interact with is the-phoenix-test-etty
fetching file: the-phoenix-test-sample.json from bucket: the-phoenix-test-etty
S3Service/fetch start            
send command to AWS       
(node:19124) Warning: NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js v18.15.0 in January 2026.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/c895JFp
(Use `node --trace-warnings ...` to show where the warning was created)
successfully fetched from S3
JSON file fetched from the-phoenix-test-etty 
raw content is: [object Object]
beutify content is
{
  "name": "Etty Rosenthal",
  "company_name": "The phoenix Insurance Company LTD",
  "open_position": "AWS Backend Developer"
}
```
