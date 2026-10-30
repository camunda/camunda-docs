---
id: azure-blob-storage
title: Azure blob storage connector
sidebar_label: Azure Blob Storage
description: Interact with Azure Blob Storage from your BPMN process.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Upload documents to and download documents from [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) in your BPMN process.

## About this connector

The Azure Blob Storage connector is an outbound connector that lets your BPMN process interact with Azure Blob Storage resources. It currently supports uploading and downloading documents.

## Prerequisites

To use the Azure Blob Storage connector, create the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):

- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts).
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers).
- An Azure [shared access signature (SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json) for the container. You need both the SAS token and the SAS URL.

### Create a connector secret

Keep your SAS token and SAS URL secure by not including them directly in the BPMN XML file. Instead, create a secret:

1. Follow the [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (for example, `AZURE_SAS_TOKEN`) so you can reference them later in the connector configuration, for example as `{{secrets.AZURE_SAS_TOKEN}}`.

## Create a connector task

<ConnectorTask/>

## Configuration

### Authentication

The connector authenticates with a shared access signature (SAS).

| Property  | Type   | Required | Description                                                          | Example |
| :-------- | :----- | :------- | :------------------------------------------------------------------- | :------ |
| SAS token | String | Yes      | The SAS token of the container. See [prerequisites](#prerequisites). |         |
| SAS URL   | String | Yes      | The SAS URL of the container. See [prerequisites](#prerequisites).   |         |

### Operation

Select the operation from the **Operation** dropdown. The options are **Upload blob** (default) and **Download blob**. The properties that appear depend on your selection.

## Operations

### Upload document

Upload a document to a container in Azure Blob Storage.

#### Input parameters

| Property               | Type   | Required | Description                                                                                                                                                       | Example |
| :--------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Blob Storage container | String | Yes      | The name of the container to upload to. A container acts as a directory that organizes a set of blobs. It must match the container the SAS token was created for. |         |
| Document               | String | Yes      | The document to upload, as a FEEL expression that references a document.                                                                                          |         |
| Document file name     | String | No       | The name of the blob. If left empty, the file name from the document metadata is used. Shown under **Additional properties**.                                     |         |
| Timeout (in seconds)   | Number | Yes      | The time limit for the upload. Defaults to `30`. Shown under **Additional properties**.                                                                           | `30`    |

:::note
If a blob with the same name already exists in the container, it is overwritten. Depending on the settings of the Azure storage account, the previous version may still be accessible in the file version history.
:::

#### Output

The connector returns the container, the blob name, and the URL of the uploaded blob:

```json
{
  "container": "my-container",
  "filename": "invoice.pdf",
  "link": "https://mystorageaccount.blob.core.windows.net/my-container/invoice.pdf"
}
```

For example, to get the URL of the uploaded blob, use the **Result expression**:

```feel
= {blobUrl: response.link}
```

### Download document

Download a document from a container in Azure Blob Storage.

#### Input parameters

| Property                     | Type    | Required | Description                                                                                                                                                                                           | Example |
| :--------------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Blob Storage container       | String  | Yes      | The name of the container to download from. A container acts as a directory that organizes a set of blobs. It must match the container the SAS token was created for.                                 |         |
| File name                    | String  | Yes      | The name of the document to download.                                                                                                                                                                 |         |
| Return document as reference | Boolean | Yes      | Selected by default. If selected, the connector returns a reference to the document. If cleared, the connector extracts the full content of the document and includes it in the response as a string. |         |

#### Output

If **Return document as reference** is selected, the connector returns a reference to the downloaded document:

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

If **Return document as reference** is cleared, the connector returns the content of the document as a string:

```json
{
  "content": "The content of the document"
}
```

To work with the document reference in later steps, for example to pass it to another connector, use the **Result expression**:

```feel
= {invoice: response.document}
```

To learn how to use documents in your process, see [upload a document when using any connector](/components/document-handling/upload-document-to-bpmn-process.md#upload-a-document-when-using-any-connector).

## Troubleshooting

If the connector task fails, check the following:

- The **SAS token**, **SAS URL**, and **Blob Storage container** belong together, and the SAS has not expired.
- For downloads, the **File name** matches the name of an existing blob in the container.

To handle connector errors in your process, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors). To change the number of retries, see [use an outbound connector](/components/connectors/use-connectors/outbound.md#retries).

## Further resources

- [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Create a SAS with Azure Storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
