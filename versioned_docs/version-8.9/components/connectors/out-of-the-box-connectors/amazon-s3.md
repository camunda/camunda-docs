---
id: amazon-s3
sidebar_label: AWS S3
title: Amazon S3 connector
description: Upload, download, and delete documents in Amazon S3 from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon S3 connector to upload, download, and delete objects in [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/S3/) from your BPMN process.

## About this connector

The **Amazon S3 connector** is an outbound connector that works with documents. It can upload a document to a bucket, download an object from a bucket, and delete an object from a bucket.

Starting from version 8.7.0, the connector uploads documents from (and downloads documents to) the Camunda document store. For details and limitations, see [document handling](/components/document-handling/getting-started.md).

## Prerequisites

To use the **Amazon S3 connector**, you need an AWS account with an access key and secret key.

The key needs the following permissions:

- `GetObject`
- `DeleteObject`
- `PutObject`

Learn more about Amazon S3 in the [Amazon Simple Storage Service Documentation](https://docs.aws.amazon.com/s3/).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type     | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example |
| :------------- | :------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authentication | Dropdown | Yes                                           | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |         |
| Access key     | String   | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to the Amazon S3 actions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| Secret key     | String   | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |

### Region

| Property | Type   | Required | Description                          | Example     |
| :------- | :----- | :------- | :----------------------------------- | :---------- |
| Region   | String | Yes      | The region of the deployed endpoint. | `us-east-1` |

## Operations

Select the operation in the **Action** dropdown. The properties that apply depend on the action.

### Upload object

Upload a document to an Amazon S3 bucket. The incoming document must be a reference from the previous process.

#### Input parameters

| Property   | Type   | Required | Description                                                                                                              | Example |
| :--------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS bucket | String | Yes      | The targeted Amazon S3 bucket where the document is uploaded.                                                            |         |
| AWS key    | String | No       | The key that uniquely identifies the object in the bucket. If not set, the file name from the document metadata is used. |         |
| Document   | String | Yes      | The document to upload, provided as a FEEL expression with the document reference.                                       |         |

To learn more about Friendly Enough Expression Language (FEEL) expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Output

The following JSON response is returned after a successful document upload:

- `bucket`: Echoes back the bucket of the uploaded document.
- `key`: Echoes back the **AWS key** you set.
- `link`: The document link, built from the bucket and the **AWS key** you set.

:::note
If you leave **AWS key** empty, the connector stores the object under the file name of the document. The `key` in the response is then `null`, and the `link` ends with `null`.
:::

Example response:

```json
{
  "bucket": "mybucket",
  "key": "test",
  "link": "https://mybucket.s3.amazonaws.com/test"
}
```

### Download object

Download an object from an Amazon S3 bucket.

#### Input parameters

| Property        | Type    | Required | Description                                                                                                                           | Example |
| :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| AWS bucket      | String  | Yes      | The targeted Amazon S3 bucket that the document is downloaded from.                                                                   |         |
| AWS key         | String  | Yes      | The key that uniquely identifies the object in the bucket.                                                                            |         |
| Create document | Boolean | No       | If `true` (default), a document reference is created. If `false`, no document is created and the content is returned in the response. |         |

To learn more about FEEL expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Output

The following JSON response is returned after a successful document download:

- `bucket`: Echoes back the bucket of the downloaded document.
- `key`: Echoes back the unique key of the downloaded document.
- `element`: An object that holds the downloaded content. Its field depends on the **Create document** setting:
  - If **Create document** is `true`: `element.document` contains a document reference, rather than the document content itself.
  - If **Create document** is `false`: `element.content` contains the content of the object, depending on its content type:
    - `text/plain`: the string content.
    - `application/json`: the parsed JSON content.
    - Any other content type: the raw bytes, encoded in base64 as a string.

The following examples show a successful download response.

With **Create document** set to `true`:

```json
{
  "bucket": "mybucket",
  "key": "report.json",
  "element": {
    "document": {
      "storeId": "in-memory",
      "documentId": "20f1fd6a-d8ea-403b-813c-e281c1193495",
      "metadata": {
        "contentType": "application/json",
        "size": 311032,
        "fileName": "report.json"
      },
      "camunda.document.type": "camunda"
    }
  }
}
```

With **Create document** set to `false` and a JSON object:

```json
{
  "bucket": "mybucket",
  "key": "report.json",
  "element": {
    "content": {
      "testKey": "testValue"
    }
  }
}
```

### Delete object

Delete an object from an Amazon S3 bucket.

#### Input parameters

| Property   | Type   | Required | Description                                                    | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------- | :------ |
| AWS bucket | String | Yes      | The targeted Amazon S3 bucket that the object is deleted from. |         |
| AWS key    | String | Yes      | The key that uniquely identifies the object in the bucket.     |         |

To learn more about FEEL expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Output

The following JSON response is returned after a successful deletion:

- `bucket`: Echoes back the bucket of the deleted document.
- `key`: Echoes back the unique key of the deleted document.

Example response:

```json
{
  "bucket": "mybucket",
  "key": "document.txt"
}
```

<ErrorHandling />
