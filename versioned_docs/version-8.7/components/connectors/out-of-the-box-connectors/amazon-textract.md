---
id: amazon-textract
title: Amazon Textract connector
sidebar_label: AWS Textract
description: Extract printed text, handwriting, layout elements, and structured data from documents using Amazon Textract.
---

The **Amazon Textract connector** enables you to integrate your BPMN service with [Amazon Textract](https://aws.amazon.com/textract/) to automatically extract text and data from documents.

## Prerequisites

You need an **AWS IAM Access Key** and **Secret Key** with the following permissions:

- `AmazonTextractFullAccess` — required
- `AmazonS3ReadOnlyAccess` — required if using S3 as the document source
- `AmazonS3FullAccess` — optional if using S3 as the output location for asynchronous execution

For setup instructions, refer to the [AWS Textract Developer Guide](https://docs.aws.amazon.com/textract/latest/dg/getting-started.html).

## Authentication

Select an authentication type from the **Authentication** dropdown:

1. **Credentials**:  
   Use if you have an AWS **Access Key** and **Secret Key**. Supported in both SaaS and Self-Managed deployments.  
   Required fields:
   - **Access Key**: AWS access key for the user with Textract permissions.
   - **Secret Key**: Corresponding AWS secret key.

2. **Default Credentials Chain** _(hybrid/Self-Managed only)_:  
   Use if your system relies on implicit authentication (e.g., IAM roles, environment variables, or credentials files).  
   This option uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.

:::note
Use Camunda secrets to avoid exposing token credentials as plain text. See [managing secrets](/components/console/manage-clusters/manage-secrets.md) for details.
:::

## Configure AWS region

- **Region**: Enter the AWS region where the Textract service and your S3 buckets are hosted (e.g., `us-east-1`, `eu-west-1`).

:::note
Choose the region that matches your Textract and S3 resources to minimize latency and meet compliance requirements. See [AWS Regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).
:::

## Configure input document

Set the document location in the **Document location type** field.

### S3

- **Document Bucket**: Name of the S3 bucket containing the document. Ensure proper permissions for Textract access.
- **Document path**: Full path from the bucket root to the document.
- **Document version** _(optional)_: Specify if you need to process a specific document version. If not set, the latest version is used.

### Camunda Document

- **Document**: Select the document from the Camunda document store.

:::note
Only PNG and JPEG formats are supported. Real-time execution only.
:::

## Configure operation

### Execution types

Select an option from **Execution Type**:

- **Real-time**:  
  For small files requiring immediate text extraction. Only single-page PDFs are supported when using S3. For multi-page PDFs, use **Polling** or **Asynchronous**.

- **Polling**:  
  Starts analysis and polls every five seconds until the result is available. Best for larger documents where blocking execution is acceptable.

- **Asynchronous**:  
  For large or complex documents processed in the background.  
  Configure:
  - **Output S3 Bucket**
  - **Output S3 Prefix**

  Optional fields:
  - **Client Request Token**
  - **Job Tag**
  - **KMS Key ID**
  - **Notification Channel Role ARN**
  - **Notification Channel SNS Topic ARN**

### Feature types

Select one or more **Feature Types**:

- **Analyze Tables** — extracts tabular data
- **Analyze Forms** — extracts key-value pairs
- **Analyze Signatures** — detects signatures
- **Analyze Layout** — extracts layout elements (lines, words, spatial data)

At least one feature type must be selected. Combining multiple options can produce richer extraction results.

## Response

The connector response mirrors the [AWS Textract API](https://docs.aws.amazon.com/textract/latest/dg/API_Reference.html), depending on the execution type:

- [Real-time Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html#API_AnalyzeDocument_ResponseSyntax)
- [Polling Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_GetDocumentAnalysis.html#API_GetDocumentAnalysis_ResponseSyntax)
- [Asynchronous Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_StartDocumentAnalysis.html#API_StartDocumentAnalysis_ResponseSyntax)

## Use the Textract connector response in your process

You can map fields from the Textract response to process variables using **Result Variable** or **Result Expression**.

1. **Result Variable** — stores the entire response in one variable, e.g., `myResultVariable`.
2. **Result Expression** — extracts specific fields for more granular control.

### Example Textract response (real-time execution)

```json
{
  "DocumentMetadata": {
    "Pages": 1
  },
  "Blocks": [
    {
      "BlockType": "LINE",
      "Confidence": 99.1,
      "Text": "Hello World",
      "Geometry": {
        "BoundingBox": {
          "Width": 0.5,
          "Height": 0.1,
          "Left": 0.1,
          "Top": 0.1
        }
      },
      "Id": "abcd1234"
    }
  ]
}
```

### Mapping example

```feel
= {lineText: blocks[0].text, textConfidence: blocks[0].confidence, blockType: blocks[0].blockType}
```

**Result:**

```json
{
  "lineText": "V3",
  "textConfidence": 91.60225677490234,
  "blockType": "LINE"
}
```
