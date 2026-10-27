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
Use secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example |
| :------------- | :------------ | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |         |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to the Amazon S3 actions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |

### Region

| Property | Type   | Required                                     | Description                                                                                                | Example     |
| :------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes, if no AWS credential is set             | The region of the deployed endpoint.                                                                       | `us-east-1` |
| Region   | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |             |

## Operations

Select the operation in the **Action** dropdown. The properties that apply depend on the action.

### Upload object

Upload a document to an Amazon S3 bucket.

#### Input parameters

| Property         | Type     | Required                      | Description                                                                                                                                                                              | Example |
| :--------------- | :------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS bucket       | String   | Yes                           | The targeted Amazon S3 bucket where the document is uploaded.                                                                                                                            |         |
| AWS key          | String   | No                            | The key that uniquely identifies the object in the bucket. If not set, the file name from the document metadata is used.                                                                 |         |
| Document source  | Dropdown | Yes                           | The [document source](/components/document-handling/send-document-to-external-system.md#document-sources): **Camunda Document**, **Inline Content**, or **From URL**.                    |         |
| Camunda document | String   | Yes, for **Camunda Document** | A FEEL expression with the reference to the document in the Camunda document store.                                                                                                      |         |
| Content          | String   | Yes, for **Inline Content**   | The content of the document, built from process data.                                                                                                                                    |         |
| File name        | String   | No                            | The file name of the uploaded document. For **Inline Content**, a unique name is generated if you leave it empty.                                                                        |         |
| Content type     | String   | No                            | The MIME type of the content, for **Inline Content** only. If you leave it empty, the type is inferred from the extension of the file name, with `application/octet-stream` as fallback. |         |
| URL              | String   | Yes, for **From URL**         | The URL of the external document.                                                                                                                                                        |         |

:::note
Use **Inline Content** to build a file (for example, a `.json` error report) directly from process variables without first storing it in the Camunda document store. See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).
:::

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

| Property        | Type     | Required | Description                                                                                                                                                                                              | Example |
| :-------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS bucket      | String   | Yes      | The targeted Amazon S3 bucket that the document is downloaded from.                                                                                                                                      |         |
| AWS key         | String   | Yes      | The key that uniquely identifies the object in the bucket.                                                                                                                                               |         |
| Response format | Dropdown | Yes      | How the downloaded content is returned. Select a [return format](/components/document-handling/send-document-to-external-system.md#return-formats): **Document reference**, **as text**, or **as JSON**. |         |
| Encoding        | String   | No       | The character set used to decode the content. The default is `UTF-8`.                                                                                                                                    |         |

To learn more about FEEL expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Output

The following JSON response is returned after a successful document download:

- `bucket`: Echoes back the bucket of the downloaded document.
- `key`: Echoes back the unique key of the downloaded document.
- `element`: An object that holds the downloaded content. Its field depends on the selected **Response format**:
  - **Document reference**: `element.document` contains a reference to the document created in the Camunda document store.
  - **as text**: `element.content` contains the content decoded as a string.
  - **as JSON**: `element.content` contains the content parsed as JSON.

:::note
**as text** and **as JSON** return the content directly in a process variable and are subject to a size guard (approximately 1.5 MiB). A larger object fails the job with an incident. Use **Document reference** for large files. **as JSON** fails the job when the content is not valid JSON.
:::

The following examples show a successful download response.

With **Document reference**:

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

With **as JSON**:

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
