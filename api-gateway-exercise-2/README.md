# Serverless Candidate API – API Gateway & Lambda

## Overview

This project demonstrates a serverless REST API built with **Amazon API Gateway** and **AWS Lambda**.

It provides an endpoint to create a "Candidate" record, including:
- Ensuring Request validity in code
- Proxy Integration: Seamless connection between API Gateway and Lambda using aws_proxy.
- Error Handling

---

## Tech Stack

- Node.js ((v20.x))  
- AWS Lambda
- Amazon API Gateway (REST API)
- OpenAPI / Swagger (YAML) (For API structure definition)
- Amazon S3  

---
## Project Structure
- `lambda/candidate-handler.js` — Core logic: extracts the body, validates the name field, and returns the response.
- `lambda/package.json` — Metadata and Node.js configuration for the Lambda.
- `the-phoenix-test-post.yaml` — The API Gateway definition file used to import the resources and methods.

---
## Prerequisites
- AWS Account  
---

## Setup Instructions

### 1. Clone this root repository (the-phoenix-test) 
```bash
git clone <repo-url>
cd api-gateway-exercise-2
```

### 2. Deploy the Lambda Function
#### Important Note
All AWS resources used in this project (Lambda, API Gateway, S3, etc.) **must be created in the same region** to ensure proper integration.
- Go to the AWS Lambda console and create a new function (Node.js 20.x).
- Upload the code from `lambda/candidate-handler.js`.
- **Important:** Under Runtime settings, set the Handler to **candidate-handler.create**.
- Click Deploy.
- **Copy the Lambda ARN**


### 3. Uplaod .yaml file to S3
Before importing the API definition (`the-phoenix-test-post.yaml`), **replace placeholder values**:
- `<your_lambda_arn>` → replace with the **ARN of the Lambda function** you deployed earlier  
- `<your_region>` → replace with the **AWS region** where your Lambda is deployed

This ensures that the API Gateway POST method is correctly linked to your Lambda function.

- Upload `the-phoenix-test-post.yaml` to your S3 bucket manually.

### 4. API Gateway Configuration

#### Note:
The assignment required importing the OpenAPI definition from an S3 bucket.

The file was uploaded to S3 as required.  
During the API creation process, the AWS Console did not provide an option to import the definition directly from S3.

As a result, the YAML definition was imported via the local file upload option.
1. Go to the **API Gateway Console.**
2. Click **Create API** and choose **REST API**.
3. Select **Import Api**, click **choose file**
5. Please upload the `the-phoenix-test-post.yaml` file directly from this repository's local folder.

### 5. Final Integration
- After importing, ensure the POST method is linked to your Lambda function.
- Enable Lambda Proxy Integration.
- Deploy API: Create a stage named prod to generate your Invoke URL.
- 
---
## Testing the API
#### Live Endpoint
- URL: `https://ziio4pd8q1.execute-api.eu-west-1.amazonaws.com/prod/candidate`
- Method: `POST`

#### Testing from Windows (CMD/PowerShell)
Due to how Windows handles quotes and SSL, please use the following command format:
```bash
curl.exe -k -i -X POST https://ziio4pd8q1.execute-api.eu-west-1.amazonaws.com/prod/candidate -H "Content-Type: application/json" -d "{\"name\": \"Etty Rosenthal\"}"
```
*(Note: -k skips SSL revocation checks which can fail on some local environments).*

#### Testing from Mac / Linux
```bash
curl -i -X POST https://ziio4pd8q1.execute-api.eu-west-1.amazonaws.com/prod/candidate \
     -H "Content-Type: application/json" \
     -d '{"name": "Etty Rosenthal"}'
```
#### Expected Responses

| Scenario | Input | Status Code | Response Body |
| :--- | :--- | :--- | :--- |
| **Success** | `{"name": "Etty"}` | `201 Created` | `{"message": "Candidate created successfully", "data": {"name": "Etty"}}` |
| **Missing Field** | `{"age": 25}` | `400 Bad Request` | `{"message": "Missing required field: name"}` |
| **Empty Body** | `null` | `400 Bad Request` | `{"message": "Request body is required"}` |

---

## Troubleshooting
- **500 Internal Server Error:** This usually indicates a JSON.parse failure. Ensure your curl command uses correctly escaped quotes (\").
- **403 Forbidden:** Check if you included the /candidate path at the end of the URL.
- Visit **CloudWatch** Logs under the /aws/lambda/candidate-handler log group for full execution details.

---

## Demo
```
Microsoft Windows [Version 10.0.26200.7840]
(c) Microsoft Corporation. All rights reserved.

C:\Users\Etty>curl -i -X POST https://ziio4pd8q1.execute-api.eu-west-1.amazonaws.com/prod/candidate -H "Content-Type: application/json" -d "{\"name\": \"Etty Rosenthal\"}"
HTTP/1.1 201 Created
Date: Wed, 04 Mar 2026 22:47:28 GMT
Content-Type: application/json
Content-Length: 44
Connection: keep-alive
x-amzn-RequestId: cf358768-3e26-4018-a181-ef04bfd5c1fa
x-amz-apigw-id: ZuF0BEzgjoEEjMw=
X-Amzn-Trace-Id: Root=1-69a8b67f-6395bb1b1c4fe9744e9208ba;Parent=277796bfb1dca1e7;Sampled=0;Lineage=1:2987d45a:0

{"message":"Candidate created successfully"}
```


