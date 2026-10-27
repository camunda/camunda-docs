---
id: azure-blob-storage
title: Azure blob storage connector
sidebar_label: Azure Blob Storage
description: Interact with Azure Blob Storage from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Upload documents to and download documents from Azure Blob Storage in your BPMN process.

## About this connector

The **Azure Blob Storage connector** is an outbound connector that allows you to interact with [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) resources from your BPMN processes. It currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Azure Blob Storage connector**, ensure you have created the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):

- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts)
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers)

You also need credentials for one of the supported authentication types. See [Authentication](#authentication) for how to create them.

<OutboundConnectorBasics />

## Configuration

### Authentication

Select an authentication type from the **Type** dropdown. The default is **SAS token**.

#### Create a new connector secret

Keep your secrets secure by avoiding direct inclusion in the BPMN `xml` file. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secrets (for example, `AZURE_SAS_TOKEN`) so you can reference them later in the connector configuration.

#### SAS token

Use a shared access signature (SAS) for the container.

1. In the **Azure Portal**, open your **Storage account > Containers**, and select your container.
2. From the container's **toolbar**, click **Generate SAS**.
3. In the connector configuration, enter the **SAS token** and **SAS URL**.

| Property  | Type   | Required | Description                                           | Example                       |
| :-------- | :----- | :------- | :---------------------------------------------------- | :---------------------------- |
| SAS token | String | Yes      | Shared access signature (SAS) token of the container. | `{{secrets.AZURE_SAS_TOKEN}}` |
| SAS URL   | String | Yes      | Shared access signature (SAS) URL of the container.   |                               |

#### OAuth 2.0

Use **OAuth 2.0 (Microsoft Entra ID)** to authenticate with an app registration.

1. In the [Azure Portal](https://portal.azure.com), open **Microsoft Entra ID** and select **+ Add > App registration** to create a new app registration.
   - Note the **client ID** and **tenant ID** from the app registration's **Overview** tab.
2. Go to **Manage > Certificates & secrets**, select **+ New client secret**, and copy the **Value** (this is your client secret).
3. In **Blob Storage**, open your container, select **Access control (IAM) > Add > Add role assignment**, and assign the app registration one of the following roles:
   - `Storage Blob Data Contributor`
   - `Storage Blob Data Reader`
4. In the connector configuration, enter the details from the following table.

| Property      | Type   | Required | Description                                                                                         | Example                                                 |
| :------------ | :----- | :------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Tenant id     | String | Yes      | Tenant ID of the app registration.                                                                  |                                                         |
| Client id     | String | Yes      | Client ID of the app registration.                                                                  |                                                         |
| Client secret | String | Yes      | Client secret value of the app registration.                                                        |                                                         |
| Account url   | String | Yes      | URL of the storage account. Replace `<storage_account_name>` with your actual storage account name. | `https://<storage_account_name>.blob.core.windows.net/` |

## Operations

Select the desired operation from the **Operation** dropdown.

### Upload document

Upload a document to a container. Select **Upload blob** in the **Operation** dropdown.

#### Input parameters

| Property               | Type   | Required | Description                                                                                                                                        | Example |
| :--------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Blob Storage container | String | Yes      | Name of the container that organizes a set of blobs. With SAS token authentication, it must match the container the **SAS token** was created for. |         |
| Document               | String | Yes      | Reference to the document to upload, as a FEEL expression.                                                                                         |         |
| Document file name     | String | No       | Name of the uploaded file, set in **Additional properties**. If left blank, the file name from the document metadata is used.                      |         |
| Timeout (in seconds)   | Number | Yes      | Time limit for the upload in seconds, set in **Additional properties**. Defaults to `30`.                                                          | `30`    |

:::note
If an uploaded document already exists in the container with the same name, it is overwritten. Depending on the settings of the Azure storage account, the previous version of the document may still be accessible in the file version history.
:::

#### Output

The connector returns the container, the name of the uploaded file, and a link to it:

```json
{
  "container": "my-container",
  "filename": "invoice.pdf",
  "link": "https://<storage_account_name>.blob.core.windows.net/my-container/invoice.pdf"
}
```

### Download document

Download a document from a container. Select **Download blob** in the **Operation** dropdown.

#### Input parameters

| Property                     | Type    | Required | Description                                                                                                                                                                         | Example |
| :--------------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Blob Storage container       | String  | Yes      | Name of the container that organizes a set of blobs. With SAS token authentication, it must match the container the **SAS token** was created for.                                  |         |
| File name                    | String  | Yes      | Name of the document to download.                                                                                                                                                   |         |
| Return document as reference | Boolean | Yes      | Selected by default. If selected, a document reference is created and returned. If cleared, the full content of the document is extracted and included in the response as a string. |         |

#### Output

If **Return document as reference** is selected, the connector creates a document in the Camunda document store and returns a reference to it:

```json
{
  "document": {
    "storeId": "in-memory",
    "documentId": "8b54b413-b847-4650-b445-de963d5c506d",
    "contentHash": "ed0f7ad835669698a108a32b2a99e89e4f5aea84127fde68df4248b11197b0e5",
    "metadata": {
      "contentType": "application/pdf",
      "size": 2048,
      "fileName": "invoice.pdf"
    },
    "camunda.document.type": "camunda"
  }
}
```

If **Return document as reference** is cleared, the content is returned directly as a string:

```json
{
  "content": "Hello from Azure Blob Storage"
}
```

## Troubleshooting

<ErrorHandling />

## Further resources

- [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Document handling](/components/document-handling/getting-started.md)
