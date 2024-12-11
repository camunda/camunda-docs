---
id: amazon-s3
sidebar_label: AWS S3 Connector
title: Amazon S3 Connector
description: Interact with Amazon S3 services from your BPMN process.
---

The **Amazon S3 Connector** is an outbound Connector that allows you to interact with
[Amazon S3](https://aws.amazon.com/S3/) from your BPMN process.

## Prerequisites

To use the **Amazon S3 Connector**, you need to have an AWS account with an access key and secret key.

The key needs those permissions:

- GetObject
- DeleteObject
- PutObject

Learn more about Amazon bedrock in
the [official S3 documentation](https://docs.aws.amazon.com/s3/).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer
to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in
the related [appendix entry](#aws-authentication-types).

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided
  by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is
  configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via
  environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid
  distributions. This approach uses
  the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html)
  to resolve required credentials.

If you select **Credentials** to access the **Amazon Bedrock Connector**, the Connector requires the appropriate
credentials. The following authentication options are available:

- **Access key**: Provide an access key of a user with permissions to the Amazon S3 actions
- **Secret key**: Provide the secret key of the user with the access key provided above.

The **Access key** and the **Secret key** are required properties and must be provided to use the Connector.

## Region

In the **Region** field write the region of the deployed endpoint.

## Action

There are three possible actions with the Amazon S3 Connector: `Upload Document`, `Download Document` and
`Delete Document`.

### Upload Document

This action is meant to upload the document. The incoming document must come as a reference from previous process.

#### Parameters

| Parameter    | Description                                                                                                              |
| :----------- | :----------------------------------------------------------------------------------------------------------------------- |
| `AWS bucket` | Specify the targeted AWS S3 bucket where the document should be uploaded.                                                |
| `AWS key`    | Specify the key of the document which uniquely identifies the object in an Amazon S3 bucket.                             |
| `Document`   | Specify the document which should be uploaded to S3. should be provided as a feel expression with the document reference |

:::info
To learn more about Friendly Enough Expression Language (FEEL) expression,
see [what is FEEL?](/components/modeler/feel/what-is-feel.md).
:::

#### Response Structure

Upon successfully uploading the document, the following JSON response is returned:

- `bucket`: Echoes back the bucket of the uploaded document.
- `key`: Echoes back the unique key of the uploaded document.
- `link`: The link

#### Example Response

The following is an example of a successful send upload operation:

```json
{
  "bucket": "Example Subject",
  "key": true,
  "link": "https://mybucket.s3.amazonaws.com/test"
}
```

### Download Document

This action is meant to download the document from AWS S3.

#### Parameters

| Parameter         | Description                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `AWS bucket`      | Specify the targeted AWS S3 bucket where the document should be downloaded from.                                          |
| `AWS key`         | Specify the key of the document which uniquely identifies the object in an Amazon S3 bucket.                              |
| `Create document` | `false` or `true`, if false no document will be created and the output will be inserted as json, text or base64 raw bytes |

:::info
To learn more about Friendly Enough Expression Language (FEEL) expression,
see [what is FEEL?](/components/modeler/feel/what-is-feel.md).
:::

#### Response Structure

Upon successfully download operation, the following JSON response is returned:

- `bucket`: Echoes back the bucket of the uploaded document.
- `key`: Echoes back the unique key of the uploaded document.
- `document`: The document. This will always be null is `Create document` is set to false, as no document reference will
  be created
- `content`: The content inside the downloaded document, It will be shown as JSON, text or base64 raw bytes depending on
  the content-type.

#### Example Response

The following is an example of a successful download operation:

```json
{
  "bucket": "Example Subject",
  "key": true,
  "document": {
    "storeId": "in-memory",
    "documentId": "20f1fd6a-d8ea-403b-813c-e281c1193495",
    "metadata": {
      "contentType": "image/webp; name=305a4816-b3df-4724-acd3-010478a54add.webp",
      "size": 311032,
      "fileName": "305a4816-b3df-4724-acd3-010478a54add.webp"
    },
    "documentType": "camunda"
  },
  "content": null
}
```

or

```json
{
  "bucket": "Example Subject",
  "key": true,
  "document": null,
  "content": {
    "json": {
      "testKey": "testValue"
    }
  }
}
```

### Delete Document

This action is meant to delete the document from AWS S3.

#### Parameters

| Parameter    | Description                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------- |
| `AWS bucket` | Specify the targeted AWS S3 bucket where the document should be deleted from.                |
| `AWS key`    | Specify the key of the document which uniquely identifies the object in an Amazon S3 bucket. |

:::info
To learn more about Friendly Enough Expression Language (FEEL) expression,
see [what is FEEL?](/components/modeler/feel/what-is-feel.md).
:::

#### Response Structure

Upon successfully deleting the document, the following JSON response is returned:

- `bucket`: Echoes back the bucket of the uploaded document.
- `key`: Echoes back the unique key of the uploaded document.

#### Example Response

The following is an example of a successful delete operation:

```json
{
  "bucket": "Example Subject",
  "key": "document.txt"
}
```
