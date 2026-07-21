---
id: google-cloud-storage
title: Google Cloud storage connector
sidebar_label: Google Cloud Storage
description: Interact with Google Cloud Storage from your BPMN process.
---

The **Google Cloud Storage connector** is an outbound connector that allows you to interact with
[Google Cloud Storage](https://cloud.google.com/storage?hl=en) resources from your BPMN processes.

:::note
The connector currently supports uploading and downloading documents.
:::

## Prerequisites

To begin using the **Google Cloud Storage connector**, ensure the following are set up:

- A Google [service account](https://cloud.google.com/iam/docs/service-account-overview)
- A [JSON key for the service account](https://cloud.google.com/iam/docs/keys-create-delete)
- A Google Cloud Storage [bucket](https://cloud.google.com/storage/docs/creating-buckets)

The service account must be granted access to the bucket:

- To **upload and download** objects, assign the `Storage Object Admin` role.
- To **download only**, assign the `Storage Object Viewer` role.

## Authentication

### Create a new connector secret

To keep your **JSON key** secure, avoid including it directly in the BPMN XML. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/hub/organization/manage-clusters/manage-secrets.md).
2. Name your secret (e.g., `GOOGLE_SERVICE_ACCOUNT_KEY`) for reference in the connector configuration.

## Operation

Select the desired operation from the **Operation** dropdown.

### Upload document

1. Enter the **project ID**.
2. Enter the **bucket name**.
3. (Optional) Enter the **File name**. If left blank, the filename from the document metadata will be used.
4. Select a [document source](/components/document-handling/send-document-to-external-system.md#document-sources) for the **Document to upload**: a **Camunda document** reference, **inline content** built from process data, or an **external document** URL.

:::note
Use **inline content** to build a file (for example, a `.json` file) directly from process variables without first storing it in the Camunda document store. See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).

If a document with the same name already exists in the bucket, it will be overwritten. If object versioning is enabled, previous versions can be restored.
:::

### Download document

1. Enter the **project ID**.
2. Enter the **bucket name**.
3. Enter the **File name** to download.
4. Select a [return format](/components/document-handling/send-document-to-external-system.md#return-formats) for the downloaded content:
   - **Document reference**: a reference to a document created in the Camunda document store is returned in `document`.
   - **As text**: the content is decoded to a string (with an optional encoding, default UTF-8) and returned in `content`.
   - **As JSON**: the content is parsed as JSON and returned in `content`.

:::note
**As text** and **As JSON** return the content directly in a process variable and are subject to a size guard (approximately 1.5 MiB); use **Document reference** for large files. **As JSON** fails the job when the content is not valid JSON.

If the specified file is not found, the operation will fail and return an error message.
:::

## Limitations

For detailed information on quotas and limits, including file size constraints, refer to the official [Google Cloud Storage quotas and limits](https://cloud.google.com/storage/quotas).
