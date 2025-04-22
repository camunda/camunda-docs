---
id: amazon-comprehend
title: Amazon Comprehend Connector
sidebar_label: AWS Comprehend
description: Use the Amazon Comprehend Connector to extract insights from the content of your documents, like key phrases and personal identifiable information.
---

:::info
The **Amazon Comprehend Connector** is available for `8.7.0` or later.
:::

The **Amazon Comprehend Connector** allows you to integrate your BPMN service with [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html), a service which extracts insights about the content of documents, such as personal identifiable information and key phrases.

## Prerequisites

To use the **Amazon Comprehend Connector**, you must have an **AWS IAM Access Key** and **Secret Key** with the appropriate Comprehend permissions. Refer to the [AWS Comprehend set up instructions](https://docs.aws.amazon.com/comprehend/latest/dg/setting-up.html).

:::note
Use **Camunda secrets** to avoid exposing your AWS IAM credentials as plain text.  
Refer to [managing secrets](components/console/manage-clusters/manage-secrets.md) for more details.
:::

## Create an Amazon Comprehend Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Amazon Comprehend Connector executable

To execute the **Amazon Comprehend Connector**, ensure all mandatory fields are correctly filled.

## 1. Authentication

Choose an authentication type from the **Authentication** dropdown. For details on the different authentication types, refer to the [appendix](#aws-authentication-types).

If you select **Credentials**, the following fields must be provided:

- **Access Key**: The AWS access key for a user with Comprehend permissions.
- **Secret Key**: The corresponding AWS secret key.

Both **Access Key** and **Secret Key** are required to use the Connector.

## 2. **Configuration (AWS Region)**

After authentication, set the AWS **Region** where the Textract service is hosted:

- **Region**: Specify the region (for example, `us-east-1`, `eu-west-1`).

:::note
Ensure the region matches the location of your Comprehend service and S3 buckets to reduce latency and meet compliance requirements. For a full list of AWS regions, refer to the [AWS regional data](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).
:::

## 3. Configure input

### Execution types

Select the desired execution type from the **Execution Type** dropdown. The following options are available:

- **Sync**

Use **Sync** execution to create a classification request and analyze a single document in real-time.

For more details, refer to [sync execution](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html).

- **Async**

Use **Async** execution to start an asynchronous document classification job using a custom classification model. This method allows you to submit a document for analysis and receive results at a later time, making it ideal for background processing or batch operations.

**Async** execution enables you to process documents without waiting for immediate responses. This is particularly useful for larger files or when handling multiple documents simultaneously.

For more details on the fields that can be configured during asynchronous execution, refer to [async execution](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html).

### Sync execution fields

- **Text (mandatory)**: The document text to be analyzed.
- **Endpoint Arn (mandatory)**: The Amazon Resource Number (ARN) of the endpoint. For more details, refer to [Classify Document](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html#API_ClassifyDocument_RequestSyntax).

### Async execution fields

- **Document read mode**: Determines the text extraction actions for PDF files. For more details, refer to [document read mode](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-DocumentReadMode).
- **Document read action**: This field defines the Amazon Textract API operation that Amazon Comprehend uses to extract text from PDF files and image files. For more details, refer to [document read action](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-DocumentReadAction).
- **Analyze tables**: Returns additional information about any tables that are detected in the input document. For more details, refer to [feature types](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-FeatureTypes).
- **Analyze forms**: Returns additional information about any forms that are detected in the input document. For more details, refer to [feature types](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_DocumentReaderConfig.html#comprehend-Type-DocumentReaderConfig-FeatureTypes).
- **Inputs' S3 URI (mandatory)**: The Amazon S3 URI for the input data. For more details, refer to [S3 URI](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_InputDataConfig.html#comprehend-Type-InputDataConfig-S3Uri).
- **Input file processing mode**: Specifies how the text in an input file should be processed. For more details, refer to [InputFormat](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_InputDataConfig.html#comprehend-Type-InputDataConfig-InputFormat).
- **Client request token**: A unique identifier for the request. If you do not set the client request token, Amazon Comprehend generates one.
- **Data Access Role's ARN (mandatory)**: The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data.
- **Document Classifier's ARN**: The Amazon Resource Name (ARN) of the document classifier to use to process the job.
- **Flywheel's ARN**: The Amazon Resource Number (ARN) of the flywheel associated with the model to use.
- **Job name**: The identifier of the job.
- **Output's S3 URI (mandatory)**: The Amazon S3 location where you want to write the output data. For more details, refer to [output data config](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_OutputDataConfig.html).
- **Outputs KMS Key Id**: The ID for the AWS Key Management Service (KMS) key that Amazon Comprehend uses to encrypt the output results from an analysis job. For more details, refer to [output data config](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_OutputDataConfig.html).
- **Tags**: Tags to associate with the document classification job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend.
  **Example:**

```feel
= {"status": "active"}
```

- **VolumeKmsKeyId**: ID for the AWS Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.
- **Security group Ids**: The ID number for a security group on an instance of your private VPC. For more details, refer to [security group](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_VpcConfig.html#comprehend-Type-VpcConfig-SecurityGroupIds).
  **Example:**

```feel
= ["sg-07a2cc6d96e4ec178"]
```

- **Subnets**: The ID for each subnet being used in your private VPC. For more details, refer to [Subnets](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_VpcConfig.html#comprehend-Type-VpcConfig-Subnets).
  **Example:**

```feel
= ["subnet-013eac53274e1d93f"]
```

:::note
To use **VPC** you need at last one VPC endpoint For more details, refer to [create a VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#create-interface-endpoint-aws).
:::

## Amazon Comprehend Connector response

The response from the **Amazon Comprehend Connector** will mirror the AWS Comprehend service’s response. The type of response you receive depends on the execution mode selected:

- **[Sync Response](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_ClassifyDocument.html#API_ClassifyDocument_ResponseSyntax)**: Provides immediate analysis for provided text.
- **[Asynchronous Response](https://docs.aws.amazon.com/comprehend/latest/APIReference/API_StartDocumentClassificationJob.html#API_StartDocumentClassificationJob_ResponseSyntax)**: Used for batch processing where results are returned later through job completion.

### Using the Comprehend Connector response in your process

The **Amazon Comprehend Connector** provides the same response structure as the AWS Comprehend API. You can map fields from the response to process variables, depending on your needs. Here's an example of how to extract specific fields using **Result Expression** and **Result Variable**:

### Example Comprehend response (real-time execution)

Utilize output mapping to align this response with process variables:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`. This approach stores the entire Comprehend message as a process variable named `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. This approach allows for more granularity. Instead of storing the entire response in one variable, you can extract specific fields from the **Comprehend Connector** message and assign them to different process variables. This is particularly useful when you are only interested in certain parts of the message, or when different parts of the message need to be used separately in your process.
   Example:

```json
{
  "classes": [
    {
      "name": "CHECKING_AC",
      "score": 0.5423,
      "page": null
    },
    {
      "name": "SAVINGS_AC",
      "score": 0.4577,
      "page": null
    }
  ],
  "labels": null,
  "documentMetadata": null,
  "documentType": null,
  "errors": null,
  "warnings": null
}
```

#### Mapping example

To store only first **Classes** element information, use the following result **expression**:

```feel
= {classInfo: classes[1]}
```

Mapped values **result**:

```json
{
  "name": "CHECKING_AC",
  "score": 0.5422999858856201,
  "page": null
}
```

## Appendix & FAQ

### How do I securely store AWS IAM credentials for my Comprehend Connector?

Store your AWS IAM credentials as **Camunda secrets** to avoid exposing sensitive information. Follow our [managing secrets guide](components/console/manage-clusters/manage-secrets.md) to learn more.

### AWS authentication types

You can authenticate the **Amazon Comprehend Connector** in two ways:

- **Credentials**: Select this option if you have an AWS **Access Key** and **Secret Key**. This method is applicable for both SaaS and Self-Managed users.
- **Default Credentials Chain (Hybrid/Self-Managed only)**: Select this option if your system uses implicit authentication methods like role-based access, environment variables, or files on the target host. This method is applicable only for Self-Managed or Hybrid environments. It uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve credentials.
