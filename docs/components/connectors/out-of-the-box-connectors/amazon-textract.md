---
id: amazon-textract
title: Amazon Textract Connector
sidebar_label: AWS Textract Connector
description: Extract printed text, handwriting, layout elements, and data from any document.
---

:::info
The **Amazon Textract Connector** is available for `8.6.0` or later.
:::

The **Amazon Textract Connector** allows you to integrate your BPMN service with [Amazon Textract Service](https://aws.amazon.com/textract/) to extract text from various types of documents.

## Prerequisites

To use the **Amazon Textract Connector**, you need to have an **AWS IAM Access Key** and **Secret Key** with the appropriate Textract permissions. Refer to the [AWS Textract Developer Guide](https://docs.aws.amazon.com/textract/latest/dg/getting-started.html) for setup instructions.

:::note
Use **Camunda secrets** to avoid exposing your AWS IAM credentials as plain text.  
Refer to [managing secrets](components/console/manage-clusters/manage-secrets.md) for more details.
:::

## Create an Amazon Textract Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## To make your Amazon Textract Connector executable

To execute the **Amazon Textract Connector**, ensure all mandatory fields are correctly filled.

## 1. Authentication

Choose an authentication type from the **Authentication** dropdown. For details on the different authentication types, refer to the [Appendix](#aws-authentication-types).

If you select **Credentials**, the following fields must be provided:

- **Access Key**: The AWS access key for a user with Textract permissions.
- **Secret Key**: The corresponding AWS secret key.

Both **Access Key** and **Secret Key** are required to use the connector.

## 2. **Configuration (AWS Region)**

After authentication, set the AWS **Region** where the Textract service is hosted:

- **Region**: Specify the region (e.g., `us-east-1`, `eu-west-1`).

> **Note**: Ensure the region matches the location of your Textract service and S3 buckets to reduce latency and meet compliance requirements.

For a full list of AWS regions, refer to [AWS Regional Data](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).

## 3. Configure Input

### Execution Types

Select the desired execution type from the **Execution Type** dropdown. The following options are available:

- **Real-time**

Use **Real-time** execution for single-page PDF documents or smaller files where immediate text extraction is needed. This method processes the document instantly, allowing you to quickly retrieve the data.

Note: **Real-time** execution supports only **single-page PDFs**. For multi-page PDFs, consider using **Polling** or **Asynchronous** execution.

For more details, see [real-time PDF processing](https://aws.amazon.com/about-aws/whats-new/2022/01/amazon-textract-pdf-processing-jpeg-encoded-images/).

- **Polling**

The **Polling** execution type collects data in chunks. After processing the document, it returns a token that allows you to retrieve the next result. This method is ideal for multi-page documents or large files that take longer to process.

Polling continues retrieving results until the entire document is processed or until there are no more tokens left.

Note: Use **Polling** for documents that exceed the limitations of **Real-time** execution.

- **Asynchronous**

Use **Asynchronous** execution when processing large or complex documents where immediate results are not required. This method allows you to submit a document for analysis and receive results at a later time, making it ideal for background processing or batch operations.

**Asynchronous** execution offers more flexibility than real-time or polling, as it enables you to process documents without waiting for immediate responses. This is particularly useful for larger files or when handling multiple documents simultaneously.

In this mode, you can configure several optional fields, such as setting up notifications when the processing is complete or defining specific output locations for results.

For more details on the optional fields that can be configured during asynchronous execution, refer to [Asynchronous Execution Optional Fields](#asynchronous-execution-optional-fields).

### Document Bucket

Enter the **S3 Bucket** that contains the document to be processed. Ensure that the bucket has the correct permissions to allow Textract to access the document.

### Document Path

Enter the **S3 Document Path** to the file you want to process. This should include the full path from the bucket root to the document. Make sure the document path is properly structured and accessible by the Textract service.

### Feature Types

Select one or more **Feature Types** from the following options:

- **Analyze Tables**: Identifies and extracts tabular data from the document.
- **Analyze Forms**: Extracts key-value pairs from forms for further processing.
- **Analyze Signatures**: Detects and analyzes signatures within the document.
- **Analyze Layout**: Analyzes and extracts layout elements such as lines and words, and their spatial relationships.

At least one feature type must be selected, and choosing multiple options can provide richer data extraction results depending on your document’s format.

### Document Version (Optional)

Specify the **Document Version** if you need to process a specific version. If left blank, the latest version of the document will be processed. Document versioning can be useful for tracking changes over time or processing a specific iteration of a document.

## Asynchronous Execution Optional Fields

When using asynchronous execution, the following optional fields can be configured:

- **Client Request Token**: An idempotent token used to identify the start request.
- **Job Tag**: A tag included in the completion notification, published to the Amazon SNS topic.
- **KMS Key ID**: The KMS key used to encrypt inference results.
- **Notification Channel Role ARN**: The Amazon SNS role ARN for publishing the operation's completion status.
- **Notification Channel SNS Topic ARN**: The SNS topic ARN for publishing the operation's completion status.

  :::note
  If **Notification Channel Role ARN** or **SNS Topic ARN** is specified, both must be filled.
  :::

- **Output S3 Bucket**: The bucket where the processed document's output will be stored.
- **Output S3 Prefix**: The prefix under which the output will be saved.

  :::note
  If **Output S3 Prefix** is specified, the **Output S3 Bucket** must also be filled.
  :::

## Amazon Textract Connector Response

The response from the **Amazon Textract Connector** will mirror the AWS Textract service’s response. The type of response you receive depends on the execution mode selected:

- **[Real-time Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html#API_AnalyzeDocument_ResponseSyntax)**: Provides immediate analysis for single-page documents.
- **[Polling Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_GetDocumentAnalysis.html#API_GetDocumentAnalysis_ResponseSyntax)**: Returns chunks of data in a paginated format for multi-page or complex documents.
- **[Asynchronous Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_StartDocumentAnalysis.html#API_StartDocumentAnalysis_ResponseSyntax)**: Used for batch processing where results are returned later through job completion.

### Using the Textract Connector Response in Your Process

The **Amazon Textract Connector** provides the same response structure as the AWS Textract API. You can map fields from the response to process variables, depending on your needs. Here's an example of how to extract specific fields using **Result Expression** and **Result Variable**.

### Example Textract Response (Real-time Execution)

Utilize output mapping to align this response with process variables:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`. This approach stores the entire Textract message as a process variable named `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. This approach allows for more granularity. Instead of storing the entire response in one variable, you can extract specific fields from the **Textract Connector** message and assign them to different process variables. This is particularly useful when you are only interested in certain parts of the message, or when different parts of the message need to be used separately in your process.
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

#### Mapping Example

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

## Appendix & FAQ

### How do I securely store AWS IAM credentials for my Textract Connector?

Store your AWS IAM credentials as **Camunda Secrets** to avoid exposing sensitive information. Follow our [Managing Secrets Guide](components/console/manage-clusters/manage-secrets.md) to learn more.

### AWS Authentication Types

You can authenticate the **Amazon Textract Connector** in two ways:

1. **Credentials**:  
   Select this option if you have an AWS **Access Key** and **Secret Key**. This method is applicable for both SaaS and Self-Managed users.

2. **Default Credentials Chain (Hybrid/Self-Managed only)**:  
   Select this option if your system uses implicit authentication methods like role-based access, environment variables, or files on the target host. This method is applicable only for Self-Managed or Hybrid environments. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.
