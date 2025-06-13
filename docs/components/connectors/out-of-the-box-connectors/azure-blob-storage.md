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
- An Azure [shared access signature (SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json) for the container

## Authentication

### Create a new connector secret

Keep your **SAS token** and **SAS URL** secure by avoiding direct inclusion in the BPMN `xml` file. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (e.g., `AZURE_SAS_TOKEN`) so you can reference them later in the connector configuration.

## Operation

Select the desired operation from the **Action** dropdown.

### Upload document

1. Enter the **Container name** — it must match the container the **SAS token** was created for.
2. (Optional) Enter the **File name**. If left blank, the filename from the document metadata will be used.
3. Reference the **Document to upload**.

### Download document

1. Enter the **Container name** — it must match the container the **SAS token** was created for.
2. Enter the **File name** to download.
3. Select the **Create document** checkbox, as preferred:
   - If selected, a document reference will be created.
   - If not selected, the content will be extracted and included in the response.
