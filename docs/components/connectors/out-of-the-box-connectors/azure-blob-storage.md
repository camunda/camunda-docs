---
id: azure-blob-storage
title: Azure blob storage connector
sidebar_label: Azure Blob Storage
description: Interact with Azure Blob Storage from your BPMN process.
---

The **Azure Blob Storage connector** is an outbound connector that allows you to interact with
[Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) resources from your BPMN processes.

The **Azure Blob Storage connector** currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Azure Blob Storage connector**, ensure you have created the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):

- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts)
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers)

## Authentication

### Create a new connector secret

Keep your secrets secure by avoiding direct inclusion in the BPMN `xml` file. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (e.g., `AZURE_SAS_TOKEN`) so you can reference them later in the connector configuration.

### OAuth 2.0

1. Create an app registration in the [Azure Portal](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade). Note the client id and tenant id.
2. Go to `Certificates & secrets` and create a new client secret. Note the secret value.
3. Go to Blob Storage, select the container and click on "Access control (IAM)". Click "Add" assign the app registration the `Storage Blob Data Contributor` or `Storage Blob Data Reader` role.
4. Now enter the following details in the connector configuration:
   - **Client ID**: The client id of the app registration.
   - **Tenant ID**: The tenant id of the app registration.
   - **Client Secret**: The client secret value of the app registration.
   - **Account URL**: The URL of the storage account, e.g. `https://<storage_account_name>.blob.core.windows.net/`. Replace `<storage_account_name>` with the name of your storage account, where the container is located.

### SAS Token

1. Go to your Container in the Azure Portal.
2. Click on the three dots next to the container name and select `Generate SAS`.
3. Now enter SAS token and SAS Url to the connector configuration.

## Operation

Select the desired operation from the **Operation** dropdown.

### Upload document

1. Enter the **Container name** — it must match the container the **SAS token** was created for.
2. (Optional) Enter the **File name**. If left blank, the filename from the document metadata will be used.
3. Reference the **Document to upload**.

:::note
If an uploaded document already exists in the container with the same name, it will be overwritten. Depending on the settings made on the Azure Storage Account, the previous version of the document may still be accessible in the file version history.
:::

### Download document

1. Enter the **Container name** — it must match the container the **SAS token** was created for.
2. Enter the **File name** to download.
3. Select the **Create document** checkbox, as preferred:
   - If selected, a document reference will be created.
   - If not selected, the content will be extracted and included in the response.
