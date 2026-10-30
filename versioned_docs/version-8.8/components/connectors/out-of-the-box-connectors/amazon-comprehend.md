---
id: amazon-comprehend
title: Amazon Comprehend connector
sidebar_label: AWS Comprehend
description: Use the Amazon Comprehend connector to classify the content of your documents with a custom classification model.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Integrate your BPMN service with [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html) to classify documents with a custom classification model.

## About this connector

The **Amazon Comprehend connector** is an outbound connector that connects your BPMN service with Amazon Comprehend, a service that extracts insights about the content of documents, such as personal identifiable information and key phrases. Use it to classify a document as part of a process, for example to route an incoming document based on its class.

The connector supports two execution types:

- **Sync**: Classifies a single piece of text in real time and returns the result to your process.
- **Async**: Starts an asynchronous document classification job, for example for larger files or several documents at once, and returns the job details. The job results are written to an Amazon S3 location.

## Prerequisites

To use the Amazon Comprehend connector, you need the following:

| Prerequisite                                                                                     | Description                                                                                                                                                                |
| :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AWS IAM user and permissions](https://docs.aws.amazon.com/comprehend/latest/dg/setting-up.html) | An IAM access key and secret key pair with the appropriate Amazon Comprehend permissions. Not required if you use the default credentials chain (hybrid/Self-Managed only) |

:::note
Use secrets to avoid exposing your AWS IAM credentials as plain text. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Comprehend connector task

<ConnectorTask/>

## Configuration

### Authentication

Select an authentication method for the connector. Learn more about the available options in [AWS authentication types](#aws-authentication-types).

| Property       | Type     | Required | Description                                                                                                                   | Example                         |
| :------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| Authentication | Dropdown | Yes      | The AWS authentication strategy: **Credentials**, or **Default Credentials Chain (Hybrid/Self-Managed only)**.                | **Credentials**                 |
| Access key     | String   | Yes      | IAM access key of a user with the necessary permissions for this connector. Shown when **Authentication** is **Credentials**. | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String   | Yes      | IAM secret key of a user with the necessary permissions for this connector. Shown when **Authentication** is **Credentials**. | `{{secrets.MY_AWS_SECRET_KEY}}` |

### Region

| Property | Type   | Required | Description                                                                                                                                                                                                                                                                                     | Example     |
| :------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes      | The AWS region where your Amazon Comprehend service and S3 buckets are hosted. Choosing the matching region reduces latency and helps you meet compliance requirements. Refer to [AWS regional data](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) for a list of regions. | `us-east-1` |

### AWS authentication types

You can authenticate the connector with AWS in the following ways:

- **Credentials**: Use this option if your AWS account administrator provided a pair of access and secret keys. It applies to SaaS and Self-Managed.
- **Default Credentials Chain (Hybrid/Self-Managed only)**: Use this option if your system relies on an implicit authentication mechanism, such as role-based authentication, credentials supplied through environment variables, or files on the target host. It applies only to Self-Managed or hybrid distributions, and uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.

## Operations

Select the operation with the **Execution type** dropdown. The available input parameters depend on your selection.

| Property       | Type     | Required | Description                                                                                              | Example  |
| :------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------- | :------- |
| Execution type | Dropdown | Yes      | **Sync** classifies a single piece of text in real time. **Async** starts a document classification job. | **Sync** |

### Classify a document (Sync)

Create a classification request and analyze a single document in real time. For more details, refer to the [ClassifyDocument API](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html).

#### Input parameters

| Property       | Type   | Required | Description                                                                                                                                                                                                                         | Example                                                                              |
| :------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Text           | String | Yes      | The [text](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html#comprehend-ClassifyDocument-request-Text) to be analyzed.                                                                           |                                                                                      |
| Endpoint's ARN | String | Yes      | The Amazon Resource Name (ARN) of the custom model [endpoint](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html#comprehend-ClassifyDocument-request-EndpointArn) used to run the classification. | `arn:aws:comprehend:us-east-1:123456789012:document-classifier-endpoint/my-endpoint` |

#### Output

The connector response mirrors the [ClassifyDocument response](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html#API_ClassifyDocument_ResponseSyntax) of the AWS Comprehend service. It contains the following fields:

| Field                 | Description                                                                               |
| :-------------------- | :---------------------------------------------------------------------------------------- |
| `sdkResponseMetadata` | Metadata of the AWS response, such as the `requestId`.                                    |
| `sdkHttpMetadata`     | The HTTP status code and headers of the AWS response.                                     |
| `classes`             | The classes of the document, each with a `name`, a `score`, and the `page` it applies to. |
| `labels`              | The labels of the document, each with a `name`, a `score`, and the `page` it applies to.  |
| `documentMetadata`    | The number of pages and the extracted characters per page.                                |
| `documentType`        | The document type per page.                                                               |
| `errors`              | Page-level errors reported by Amazon Comprehend.                                          |
| `warnings`            | Page-level warnings reported by Amazon Comprehend.                                        |

Fields that Amazon Comprehend does not return are `null`. For example, a response for a classifier that returns classes:

```json
{
  "sdkResponseMetadata": {
    "requestId": "929bf054-193b-48e6-ab80-3aeeb613b415"
  },
  "sdkHttpMetadata": {
    "httpHeaders": { "Content-Type": "application/x-amz-json-1.1" },
    "httpStatusCode": 200,
    "allHttpHeaders": { "Content-Type": ["application/x-amz-json-1.1"] }
  },
  "classes": [
    { "name": "CHECKING_AC", "score": 0.5423, "page": null },
    { "name": "SAVINGS_AC", "score": 0.4577, "page": null }
  ],
  "labels": null,
  "documentMetadata": null,
  "documentType": null,
  "errors": null,
  "warnings": null
}
```

To map the response into process variables, use **Result variable** to store the whole response, or **Result expression** to map individual fields. For example, to store only the first element of `classes`:

```feel
= {classInfo: response.classes[1]}
```

### Start a classification job (Async)

Start an asynchronous document classification job using a custom classification model. Use this operation to submit documents for analysis and receive the results later, which suits background processing, larger files, or handling several documents at once. For more details, refer to the [StartDocumentClassificationJob API](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html).

#### Input parameters

| Property                   | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           | Example                                                                       |
| :------------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Document read mode         | Dropdown | Yes      | Determines the [text extraction actions](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-DocumentReadMode) for PDF files: **Service default**, **Force document read action**, or **None**. Defaults to **Service default**.                                                                                                            | **Service default**                                                           |
| Document read action       | Dropdown | Yes      | The Amazon Textract API operation that Amazon Comprehend uses to extract text from PDF files and image files: **Detect document text**, **Analyze document**, or **None**. For more details, refer to [document read action](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-DocumentReadAction). Defaults to **Detect document text**. | **Detect document text**                                                      |
| Analyze tables             | Boolean  | No       | Returns additional information about any tables that are detected in the input document. Shown when **Document read action** is **Analyze document**. For more details, refer to [feature types](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-FeatureTypes).                                                                         |                                                                               |
| Analyze forms              | Boolean  | No       | Returns additional information about any forms that are detected in the input document. Shown when **Document read action** is **Analyze document**. For more details, refer to [feature types](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-FeatureTypes).                                                                          |                                                                               |
| Inputs' S3 URI             | String   | Yes      | The [Amazon S3 URI](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_InputDataConfig.html#comprehend-Type-InputDataConfig-S3Uri) for the input data.                                                                                                                                                                                                                                                    | `s3://my-input-bucket/documents/`                                             |
| Input file processing mode | Dropdown | Yes      | Specifies how the [text in an input file](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_InputDataConfig.html#comprehend-Type-InputDataConfig-InputFormat) is processed: **Each file is considered a separate document**, **Each line in a file is considered a separate document**, or **None**. Defaults to **Each file is considered a separate document**.                                        | **Each file is considered a separate document**                               |
| Client request token       | String   | No       | A [unique identifier](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-ClientRequestToken) for the request. If you do not set the client request token, Amazon Comprehend generates one.                                                                                                                          |                                                                               |
| Data Access Role's ARN     | String   | Yes      | The ARN of the IAM role that grants Amazon Comprehend [read access](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-DataAccessRoleArn) to your input data.                                                                                                                                                       | `arn:aws:iam::123456789012:role/comprehend-data-access-role`                  |
| Document Classifier's ARN  | String   | Yes      | The [ARN of the document classifier](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-DocumentClassifierArn) to use to process the job.                                                                                                                                                                           | `arn:aws:comprehend:us-east-1:123456789012:document-classifier/my-classifier` |
| Flywheel's ARN             | String   | No       | The ARN of the [flywheel](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-FlywheelArn) that orchestrates training and versioning of the classification model.                                                                                                                                                    |                                                                               |
| Job name                   | String   | No       | The identifier of the job.                                                                                                                                                                                                                                                                                                                                                                                            |                                                                               |
| Output's S3 URI            | String   | Yes      | The Amazon S3 location where you want to write the [output data](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_OutputDataConfig.html).                                                                                                                                                                                                                                                               | `s3://my-output-bucket/results/`                                              |
| Outputs KMS Key Id         | String   | No       | The ID of the AWS Key Management Service (KMS) key that Amazon Comprehend uses to [encrypt the output results](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_OutputDataConfig.html#comprehend-Type-OutputDataConfig-KmsKeyId) of the job.                                                                                                                                                            |                                                                               |
| Tags                       | String   | No       | [Tags](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-Tags) to associate with the document classification job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. Provide a FEEL expression.                                                                                 | `= {"status": "active"}`                                                      |
| VolumeKmsKeyId             | String   | No       | The ID of the KMS key that Amazon Comprehend uses to [encrypt data on the storage volume](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#comprehend-StartDocumentClassificationJob-request-VolumeKmsKeyId) attached to the ML compute instances that process the job.                                                                                             |                                                                               |
| Security group Ids         | String   | No       | The ID of each [security group](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_VpcConfig.html#comprehend-Type-VpcConfig-SecurityGroupIds) on an instance of your private VPC. Provide a FEEL expression.                                                                                                                                                                                              | `= ["sg-07a2cc6d96e4ec178"]`                                                  |
| Subnets                    | String   | No       | The ID of each [subnet](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_VpcConfig.html#comprehend-Type-VpcConfig-Subnets) used in your private VPC. Provide a FEEL expression.                                                                                                                                                                                                                         | `= ["subnet-013eac53274e1d93f"]`                                              |

:::note
To use a **VPC**, you need at least one VPC endpoint. For more details, refer to [create a VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#create-interface-endpoint-aws).
:::

#### Output

The connector response mirrors the [StartDocumentClassificationJob response](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#API_StartDocumentClassificationJob_ResponseSyntax) of the AWS Comprehend service. It contains the job details, not the classification results: Amazon Comprehend writes the results to the location you set in **Output's S3 URI** when the job completes.

| Field                   | Description                                                |
| :---------------------- | :--------------------------------------------------------- |
| `sdkResponseMetadata`   | Metadata of the AWS response, such as the `requestId`.     |
| `sdkHttpMetadata`       | The HTTP status code and headers of the AWS response.      |
| `jobId`                 | The identifier of the job.                                 |
| `jobArn`                | The ARN of the job.                                        |
| `jobStatus`             | The status of the job, for example `SUBMITTED`.            |
| `documentClassifierArn` | The ARN of the document classifier that processes the job. |

For example:

```json
{
  "sdkResponseMetadata": {
    "requestId": "929bf054-193b-48e6-ab80-3aeeb613b415"
  },
  "sdkHttpMetadata": {
    "httpHeaders": { "Content-Type": "application/x-amz-json-1.1" },
    "httpStatusCode": 200,
    "allHttpHeaders": { "Content-Type": ["application/x-amz-json-1.1"] }
  },
  "jobId": "12345678-1234-1234-1234-123456789012",
  "jobArn": "arn:aws:comprehend:eu-central-1:123456789012:document-classification-job/12345678-1234-1234-1234-123456789012",
  "jobStatus": "SUBMITTED",
  "documentClassifierArn": "arn:aws:comprehend:eu-central-1:123456789012:document-classifier/my-classifier"
}
```

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Further resources

- [Amazon Comprehend documentation](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html)
