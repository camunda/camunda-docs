---
id: google-cloud-storage
title: Google Cloud storage connector
sidebar_label: Google Cloud Storage
description: Interact with Google Cloud Storage from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Upload documents to and download documents from Google Cloud Storage in your BPMN process.

## About this connector

The **Google Cloud Storage connector** is an outbound connector that allows you to interact with
[Google Cloud Storage](https://cloud.google.com/storage?hl=en) resources from your BPMN processes.

The connector currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Google Cloud Storage connector**, ensure the following are set up:

- A Google [service account](https://cloud.google.com/iam/docs/service-account-overview)
- A [JSON key for the service account](https://cloud.google.com/iam/docs/keys-create-delete)
- A Google Cloud Storage [bucket](https://cloud.google.com/storage/docs/creating-buckets)

The service account must be granted access to the bucket:

- To **upload and download** objects, assign the `Storage Object Admin` role.
- To **download only**, assign the `Storage Object Viewer` role.

:::tip
To keep your **JSON key** secure, avoid including it directly in the BPMN XML. Create a [connector secret](/components/saas/clusters/manage-secrets.md) (for example, `GOOGLE_SERVICE_ACCOUNT_KEY`) and reference it as `{{secrets.GOOGLE_SERVICE_ACCOUNT_KEY}}`.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property                        | Type   | Required | Description                                                                         | Example |
| :------------------------------ | :----- | :------- | :---------------------------------------------------------------------------------- | :------ |
| JSON key of the service account | String | Yes      | The key of the service account in JSON format. See [prerequisites](#prerequisites). |         |

## Operations

Select the desired operation from the **Operation** dropdown: **Upload object** or **Download object**.

### Upload document

Upload a document to a bucket.

#### Input parameters

| Property              | Type     | Required | Description                                                                                                                                                                                               | Example       |
| :-------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| GCP project           | String   | Yes      | The project where the bucket is located.                                                                                                                                                                  | `my-project`  |
| Object Storage bucket | String   | Yes      | The bucket to upload to. A bucket acts as a directory that organizes a set of objects.                                                                                                                    | `invoices`    |
| Document source       | Dropdown | Yes      | The [document source](/components/document-handling/send-document-to-external-system.md#document-sources) of the document to upload: **Camunda Document** (default), **Inline Content**, or **From URL**. |               |
| Camunda document      | String   | Yes      | A reference to a document in the Camunda document store, as a FEEL expression. Shown when **Document source** is **Camunda Document**.                                                                    |               |
| Document file name    | String   | No       | The name of the object. If empty, the file name from the document metadata is used. Shown when **Document source** is **Camunda Document**.                                                               | `invoice.pdf` |
| Content               | String   | Yes      | The content of the document, for example built from process data. Shown when **Document source** is **Inline Content**.                                                                                   |               |
| File name             | String   | No       | The file name of the inline document. Shown when **Document source** is **Inline Content**.                                                                                                               |               |
| Content type          | String   | No       | The content type of the inline document. Shown when **Document source** is **Inline Content**.                                                                                                            |               |
| URL                   | String   | Yes      | The URL to fetch the document from. Shown when **Document source** is **From URL**.                                                                                                                       |               |
| File name             | String   | No       | The file name of the document fetched from the URL. Shown when **Document source** is **From URL**.                                                                                                       |               |

:::note
Use **Inline Content** to build a file (for example, a `.json` file) directly from process variables without first storing it in the Camunda document store. See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).

If a document with the same name already exists in the bucket, it will be overwritten. If object versioning is enabled, previous versions can be restored.
:::

#### Output

The connector returns the bucket, the name of the uploaded object, and a download URL:

```json
{
  "bucket": "invoices",
  "filename": "invoice.pdf",
  "downloadUrl": "https://storage.cloud.google.com/invoices/invoice.pdf"
}
```

To keep only the download URL in a process variable, use a result expression such as:

```feel
= {"objectUrl": response.downloadUrl}
```

### Download document

Download a document from a bucket.

#### Input parameters

| Property              | Type     | Required                | Description                                                                                                                                                                                                                                                                                                                        | Example       |
| :-------------------- | :------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| GCP project           | String   | Yes                     | The project where the bucket is located.                                                                                                                                                                                                                                                                                           | `my-project`  |
| Object Storage bucket | String   | Yes                     | The bucket to download from. A bucket acts as a directory that organizes a set of objects.                                                                                                                                                                                                                                         | `invoices`    |
| File name             | String   | Yes                     | The name of the object in the bucket to download.                                                                                                                                                                                                                                                                                  | `invoice.pdf` |
| Response format       | Dropdown | Yes                     | How the downloaded payload is returned: **Document reference** (default) uploads it to the Camunda document store and returns a reference, **as text** decodes it as a string, and **as JSON** parses it into a structure. See [return formats](/components/document-handling/send-document-to-external-system.md#return-formats). |               |
| Encoding              | String   | No, defaults to `UTF-8` | The character set used to decode the response. Default: `UTF-8`. Shown when **Response format** is **as text**.                                                                                                                                                                                                                    | `UTF-8`       |

:::note
**as text** and **as JSON** return the content directly in a process variable and are subject to a size guard (approximately 1.5 MiB); use **Document reference** for large files. **as JSON** fails the job when the content is not valid JSON.

If the specified file is not found, the operation will fail and return an error message.
:::

#### Output

The output depends on the **Response format**.

**Document reference** returns a reference to a document created in the Camunda document store in `document`:

```json
{
  "document": {
    "camunda.document.type": "camunda",
    "storeId": "in-memory",
    "documentId": "8b54b413-b847-4650-b445-de963d5c506d",
    "contentHash": "ed0f7ad835669698a108a32b2a99e89e4f5aea84127fde68df4248b11197b0e5",
    "metadata": {
      "contentType": "application/pdf",
      "size": 2048,
      "fileName": "invoice.pdf"
    }
  }
}
```

**as text** returns the decoded content as a string in `content`:

```json
{
  "content": "Invoice 2025-0042"
}
```

**as JSON** returns the parsed content in `content`:

```json
{
  "content": {
    "invoiceId": "2025-0042",
    "total": 120.5
  }
}
```

For example, to read a field from a JSON object, use a result expression such as:

```feel
= {"invoiceId": response.content.invoiceId}
```

<ErrorHandling />

## Limitations

For detailed information on quotas and limits, including file size constraints, refer to the official [Google Cloud Storage quotas and limits](https://cloud.google.com/storage/quotas).

## Further resources

- [Google Cloud Storage documentation](https://cloud.google.com/storage/docs)
- [Document handling](/components/document-handling/getting-started.md)
