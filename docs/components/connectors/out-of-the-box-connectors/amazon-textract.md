---
id: amazon-textract
title: Amazon Textract connector
sidebar_label: AWS Textract
description: Extract printed text, handwriting, layout elements, and data from any document.
---

The **Amazon Textract connector** allows you to integrate your BPMN service with [Amazon Textract](https://aws.amazon.com/textract/) to extract text from documents.

## Prerequisites

To use this connector, you'll need an **AWS IAM Access Key** and **Secret Key** with the appropriate permissions:

- grant `AmazonTextractFullAccess` policy (mandatory)
- grant `AmazonS3ReadOnlyAccess` policy (mandatory, if using S3 as document source)
- grant `AmazonS3FullAccess` policy (optional, if you want to use S3 as output location for asynchronous execution)

Refer to the [AWS Textract Developer Guide](https://docs.aws.amazon.com/textract/latest/dg/getting-started.html) for setup instructions, if needed.

### Authentication

Select an authentication type from the **Authentication** dropdown:

1. **Credentials**: Select this option if you have an AWS **Access Key** and **Secret Key**. This method is applicable for both SaaS and Self-Managed users. If you select this option, you must provide the following required fields to use the connector:

   - **Access Key**: AWS access key for the user with Textract permissions.
   - **Secret Key**: The corresponding AWS secret key.

2. **Default Credentials Chain** (hybrid/Self-Managed only): Select this option if your system uses implicit authentication methods such as role-based access, environment variables, or files on the target host. This method is only applicable for Self-Managed or hybrid environments. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.

:::note
Use Camunda secrets to avoid exposing your token credentials as plain text. Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

### Configure AWS region

Set the AWS **Region** where the Textract service is hosted:

- **Region**: Specify the region (for example, `us-east-1`, `eu-west-1`).

:::note
Ensure the region matches the location of your Textract service and S3 buckets to reduce latency and meet compliance requirements. For a full list of AWS regions, refer to [AWS Regional Data](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).
:::

### Configure input document

In this mode, you can select the document location using **Document location type** field.

#### S3

- **Document Bucket**: Enter the **S3 Bucket** that contains the document to be processed. Ensure the bucket has the correct permissions to allow Textract to access the document.
- **Document path**: Enter the **S3 Document Path** to the file you want to process. This should include the full path from the bucket root to the document. Make sure the document path is properly structured and accessible by the Textract service.
- **Document version** (optional): Specify the **Document Version** if you need to process a specific version of the document. If unspecified, the latest version of the document is processed. Document versioning is useful for tracking changes over time or processing a specific document iteration.

#### Camunda Document

- **Document**: Select the document from the Camunda document store.
  :::note Only PNG and JPEG formats are supported. Only real-time execution is supported.

### Configure operation

#### Execution types

Select the desired execution type from the **Execution Type** dropdown:

- **Real-time**: Use for small files that require immediate text extraction. This method processes the document instantly, allowing you to quickly retrieve the data. Real-time execution with **S3** document location only supports single-page PDFs. For multi-page PDFs, consider using **Polling** or **Asynchronous** execution.

- **Polling**: The **Polling** starts a document analysis and polls for the result every five seconds. Once the result is available the process continues. This method is suitable for larger documents if blocking further jobs, while the analysis is performed, is acceptable.

- **Asynchronous**: Use **Asynchronous** execution when processing large or complex documents that do not require immediate results. This method allows you to submit a document for analysis and receive results at a later time, making it ideal for background processing or batch operations. The results are writting to a s3 bucket.
  The output location needs to be configured:

  - **Output S3 Bucket**: The bucket where the processed document's output will be stored.
  - **Output S3 Prefix**: The prefix under which the output will be saved.

  In this mode, you can configure the following optional fields:

  - **Client Request Token**: An idempotent token used to identify the start request.
  - **Job Tag**: A tag included in the completion notification, published to the Amazon SNS topic.
  - **KMS Key ID**: The KMS key used to encrypt inference results.
  - **Notification Channel Role ARN**: The Amazon SNS role ARN for publishing the operation's completion status. Also requires the **Notification Channel SNS Topic ARN** field.
  - **Notification Channel SNS Topic ARN**: The SNS topic ARN for publishing the operation's completion status. Also requires the **Notification Channel Role ARN** field.

#### Feature types

Select one or more **Feature Types** from the following options:

- **Analyze Tables**: Identifies and extracts tabular data from the document.
- **Analyze Forms**: Extracts key-value pairs from forms for further processing.
- **Analyze Signatures**: Detects and analyzes signatures within the document.
- **Analyze Layout**: Analyzes and extracts layout elements such as lines and words, and their spatial relationships.

At least one feature type must be selected, and choosing multiple options can provide richer data extraction results depending on your document’s format.

## Response

The response from the **Amazon Textract connector** mirrors the AWS Textract service’s response. The type of response you receive depends on the execution mode selected:

- **[Real-time Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html#API_AnalyzeDocument_ResponseSyntax)**: Provides immediate analysis for single-page documents.
- **[Polling Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_GetDocumentAnalysis.html#API_GetDocumentAnalysis_ResponseSyntax)**: Returns chunks of data in a paginated format for multi-page or complex documents.
- **[Asynchronous Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_StartDocumentAnalysis.html#API_StartDocumentAnalysis_ResponseSyntax)**: Used for batch processing where results are returned later through job completion.

:::note
Starting from version 8.7.0, the Amazon Textract connector can read the input document directly from the Camunda document store. Review the **Document** field in the properties panel where the document reference can be provided. See additional details and limitations in [document handling](/components/document-handling/getting-started.md).
:::

### Use the Textract connector response in your process

The **Amazon Textract connector** provides the same response structure as the AWS Textract API. You can map fields from the response to process variables, depending on your needs.

For example, to extract specific fields using **Result Expression** and **Result Variable**:

#### Example Textract Response (real-time execution)

Use output mapping to align this response with process variables:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`. This approach stores the entire Textract message as a process variable named `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. This approach allows for more granularity. Instead of storing the entire response in one variable, you can extract specific fields from the **Textract connector** message and assign them to different process variables. This is particularly useful when you are only interested in certain parts of the message, or when different parts of the message need to be used separately in your process.

Example:

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

#### Mapping example

To store the **Text** from the first block in a variable `lineText`, the **Confidence** in `textConfidence`, and the **BlockType** in `blockType`, use the following result **expression**:

```feel
= {lineText: blocks[0].text, textConfidence: blocks[0].confidence, blockType: blocks[0].blockType}
```

Mapped values **result**:

```json
{
  "lineText": "V3",
  "textConfidence": 91.60225677490234,
  "blockType": "LINE"
}
```
