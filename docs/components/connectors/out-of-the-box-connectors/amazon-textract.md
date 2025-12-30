---
id: amazon-textract
title: Amazon Textract connector
sidebar_label: AWS Textract
description: "Extract printed text, handwriting, layout elements, and structured data from documents using Amazon Textract. Integrate Amazon Textract to automatically extr."
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'
import AsyncImg from '../img/connector-textract-async.png';

Integrate Amazon Textract to automatically extract document text and data in your BPMN service.

## About this connector

Use this connector to orchestrate Amazon Textract-powered extraction as part of business processes that rely on documents. Using machine learning allows you to read and process any type of document, reducing manual work and increasing accuracy in document-centric processes.

The [Amazon Textract](https://aws.amazon.com/textract/) machine learning (ML) service can automatically extract text, handwriting, layout elements, and data from scanned documents.

:::tip Camunda marketplace
The [Amazon Textract connector](https://marketplace.camunda.com/en-US/apps/473161/amazon-textract-connector) is available in the Camunda marketplace.
:::

## Prerequisites

The following prerequisites are required to use this connector:

| Prerequisite                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Amazon Web Services (AWS) IAM user and permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) | <ul><li><p>A valid AWS Identity and Access Management (IAM) user with permissions configured to allow access to Amazon Textract (and Amazon S3 if used), such as:<ul><li><p>`AmazonTextractFullAccess`: Required</p></li><li><p>`AmazonS3ReadOnlyAccess`: Required if using Amazon S3 as the document source</p></li><li><p>`AmazonS3FullAccess`: Optional if using Amazon S3 as the output location for asynchronous execution</p></li></ul></p></li><li><p>The [access key pair](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) (_access key_ and _secret access key_) for this IAM user. This is required for connector authentication.</p></li></ul> |

:::info
For Amazon Textract setup instructions, refer to the [Amazon Textract Developer Guide](https://docs.aws.amazon.com/textract/latest/dg/getting-started.html).
:::

<OutboundConnectorBasics />

## Authentication

Select an authentication type from the **Authentication** dropdown.

### Credentials

Use AWS authentication.

| Property   | Type   | Required | Description                  | Example                          |
| :--------- | :----- | :------- | :--------------------------- | :------------------------------- |
| Access Key | String | Yes      | AWS access key for Textract. | `AKIAIOSFODNN37`                 |
| Secret Key | String | Yes      | AWS secret key for Textract. | `wJalrXUtnFEgfMIK7MDENGbPxRfiCY` |

:::note
Requires your AWS access key and secret access key (see [prerequisites](#prerequisites)).
:::

### Default Credentials Chain (hybrid/Self-Managed only)

Use this authentication type if your system relies on implicit authentication (for example, IAM roles, environment variables, or credentials files). Uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.

## Configuration

### Region

Configure the AWS region for this connector.

| Property | Type   | Required | Description                                                                       | Example     |
| :------- | :----- | :------- | :-------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes      | Specify the AWS region where the Textract service and your S3 buckets are hosted. | `us-east-1` |

## Operations

### Analyze Document

Analyze documents using Textract. Different input parameters are available depending on the **Execution type** you select.

#### Input parameters

| Property          | Type     | Required               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Example           |
| :---------------- | :------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| Execution type    | Dropdown | Yes                    | <p>Specify the inference endpoint type:</p><ul><li><p>**Real-time**: For small files requiring immediate text extraction. Only single-page PDFs are supported when using S3. For multi-page PDFs, use **Polling** or **Asynchronous**.</p></li><li><p>**Polling**: Starts analysis and polls every five seconds until the result is available. Best for larger documents where blocking execution is acceptable.</p></li><li><p>**Asynchronous**: For large or complex documents processed in the background.</p></li></ul> | document          |
| Document location | Dropdown | Yes                    | Where the document that should be analyzed is stored. S3 is best for most use-cases                                                                                                                                                                                                                                                                                                                                                                                                                                         | S3                |
| Document bucket   | String   | Yes for S3 source      | Name of the S3 bucket containing the document. Ensure proper permissions for Textract access.                                                                                                                                                                                                                                                                                                                                                                                                                               | automation-test   |
| Document name     | String   | Yes for S3 source      | Full path from the bucket root to the document.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | my-document.pdf   |
| Document version  | String   | No                     | Specify if you need to process a specific document version. If not set, the latest version is used.                                                                                                                                                                                                                                                                                                                                                                                                                         | 5                 |
| Camunda document  | String   | Yes for Camunda source | Select the document from the Camunda document store. Only PNG and JPEG formats are supported. Real-time execution only.                                                                                                                                                                                                                                                                                                                                                                                                     | document          |
| Output S3 Bucket  | String   | Yes for Asynchronous   | Output S3 Bucket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | automation-output |

You must select at least one feature type. Combining multiple options can produce richer extraction results.

| Property           | Type    | Required                        | Description                                                         | Example                          |
| :----------------- | :------ | :------------------------------ | :------------------------------------------------------------------ | :------------------------------- |
| Analyze form       | Boolean | No                              | Select this to return information detected form data.               |                                  |
| Analyze signatures | Boolean | No                              | Select this to return the locations of detected signatures.         |                                  |
| Analyze layout     | Boolean | No                              | Select this to return information about the layout of the document. |                                  |
| Analyze queries    | Boolean | No                              | Select this to return an answer to a query.                         |                                  |
| Query              | String  | Yes, if analyze queries is true | The query to be applied to the document.                            | What is the IBAN in the invoice? |

Additional optional parameters for advanced configuration:
| Property | Type | Required | Description | Example |
|:--------------------|:----------|:---------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------|
| Client Request Token | String | No | The idempotent token that you use to identify the start request. | |
| Job Tag | String | No | An identifier that you specify that's included in the completion notification published to the Amazon SNS topic. | |
| KMS Key ID | String | No | The KMS key used to encrypt the inference results. | |
| Notification Channel Role ARN | String | No | The Amazon SNS topic role ARN that you want Amazon Textract to publish the completion status of the operation to. | |
| Notification Channel SNS Topic ARN | String | No | The Amazon SNS topic ARN that you want Amazon Textract to publish the completion status of the operation to. | |

#### Output

The connector response mirrors the [AWS Textract API](https://docs.aws.amazon.com/textract/latest/dg/API_Reference.html), depending on the execution type:

- [Real-time Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html#API_AnalyzeDocument_ResponseSyntax)
- [Polling Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_GetDocumentAnalysis.html#API_GetDocumentAnalysis_ResponseSyntax)
- [Asynchronous Execution Response](https://docs.aws.amazon.com/textract/latest/dg/API_StartDocumentAnalysis.html#API_StartDocumentAnalysis_ResponseSyntax)

To get the answer of the query when using the Analyze queries feature:

```feel
= {"answer": response.blocks[item.blockType = "QUERY_RESULT"][1].text}
```

For example, to get the response, when using asynchronous execution, use a timer event for example and retrieve the result with the S3 connector.

<img src={AsyncImg} alt="Example process using asynchronous execution" class="img-500"/>

## Troubleshooting

<ErrorHandling />

## Further Resources

- [Amazon Textract connector](https://marketplace.camunda.com/en-US/apps/473161/amazon-textract-connector) in the Camunda marketplace
- [Amazon Textract Documentation](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
