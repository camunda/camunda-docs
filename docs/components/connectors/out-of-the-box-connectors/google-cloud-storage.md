---
id: google-cloud-storage
title: Google cloud storage connector
sidebar_label: Google Cloud Storage
description: Interact with Google Cloud Storage from your BPMN process.
---

The **Google Cloud Storage connector** is an outbound connector that allows you to interact with
[Google Cloud Storage](https://cloud.google.com/storage?hl=en) resources from your BPMN processes.

The **Google Blob Storage connector** currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Google Cloud Storage connector**, ensure you have created the following:

- A Google [service account](https://cloud.google.com/iam/docs/service-account-overview)
- A [JSON key for the service account](https://cloud.google.com/iam/docs/keys-create-delete)
- A Google Cloud Storage [bucket](https://cloud.google.com/storage/docs/creating-buckets)

The google cloud service account needs to be granted access to the bucket. If the service account should be able to upload and download objects add the `Storage Object Admin` role to the service account. If the service account should only be able to download objects add the `Storage Object Viewer` role to the service account.

## Authentication

### Create a new connector secret

Keep your **JSON key** secure by avoiding direct inclusion in the BPMN `xml` file. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (e.g., `GOOGLE_SERVICE_ACCOUNT_KEY`) so you can reference them later in the connector configuration.

## Operation

Select the desired operation from the **Operation** dropdown.

### Upload document

1. Enter the **project ID**
2. Enter the **bucket name**
3. (Optional) Enter the **File name**. If left blank, the filename from the document metadata will be used.
4. Reference the **Document to upload**.

:::note
If an uploaded document already exists in the bucket with the same name, it will be overwritten. If object versioning is not disabled for the bucket, older version can still be restored.
:::

### Download document

1. Enter the **project ID**
1. Enter the **bucket name**
1. Enter the **File name** to download.
1. Select the **Create document** checkbox, as preferred:
   - If selected, a document reference will be created.
   - If not selected, the content will be extracted and included in the response.
