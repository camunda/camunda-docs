---
id: google-cloud-storage
title: Google cloud storage connector
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

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (e.g., `GOOGLE_SERVICE_ACCOUNT_KEY`) for reference in the connector configuration.

## Operation

Select the desired operation from the **Operation** dropdown.

### Upload document

1. Enter the **project ID**.
2. Enter the **bucket name**.
3. (Optional) Enter the **File name**. If left blank, the filename from the document metadata will be used.
4. Reference the **Document to upload**.

:::note
If a document with the same name already exists in the bucket, it will be overwritten. If object versioning is enabled, previous versions can be restored.
:::

### Download document

1. Enter the **project ID**.
2. Enter the **bucket name**.
3. Enter the **File name** to download.
4. Choose whether to check the **Create document** checkbox:
   - If selected, a document reference will be created.
   - If not selected, the content will be extracted and returned in the response.

:::note
If the specified file is not found, the operation will fail and return an error message.
:::

## Limitations

For detailed information on quotas and limits, including file size constraints, please refer to the official [Google Cloud Storage Quotas and Limits documentation](https://cloud.google.com/storage/quotas).
