---
id: azure-blob-storage
title: Azure blob storage connector
sidebar_label: Azure Blob Storage
description: Interact with Azure blob storage from your BPMN process.
---

The **Azure blob storage connector** is an outbound connector that allows you to interact with
[Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) models from your BPMN processes.

The **Azure Blob Storage connector** currently supports uploading and downloading documents.


## Prerequisites

To begin using the **Azure Blob Storage connector**, ensure you have created the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):
- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts)
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers)
- An Azure [shared access signature (SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json) for the container

## Authentication

### Create a new connector secret

Keep your **SAS token** and **SAS URL** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (for example, `AZURE_SAS_TOKEN`) so you can reference it later in the connector.

## Operation

Select the desired operation from the **Action** dropdown.

### Upload document

- Enter the name of the container, it must match the container the SAS-Token was created for
- (optional) Enter the name of the file. If nothing is entered the filename of the document metadata will be used
- Reference the document to upload

## Download document

- Enter the name of the container, it must match the container the SAS-Token was created for
- Enter the name of the file to download
- Select the "Create document" checkbox, as preffered. If selected, a document reference will be created. If not, the content will be extracted and provided inside the response.



