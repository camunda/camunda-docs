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

The **Azure Blob Storage connector** is an outbound connector that allows you to interact with [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) resources from your BPMN processes.

The connector currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Azure Blob Storage connector**, ensure you have created the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):

- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts)
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers)

<OutboundConnectorBasics />

## Configuration

### Authentication

Select an authentication type from the **Type** dropdown.

#### Create a new connector secret

Keep your secrets secure by avoiding direct inclusion in the BPMN `xml` file. Instead, create a secret:

1. Follow our [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secrets (for example, `AZURE_SAS_TOKEN`) so you can reference them later in the connector configuration.

#### OAuth 2.0

Select **OAuth 2.0 (Microsoft Entra ID)** to authenticate with a Microsoft Entra ID app registration.

1. In the [Azure Portal](https://portal.azure.com), open **Microsoft Entra ID** and select **+ Add > App registration** to create a new app registration.
   - Note the **client ID** and **tenant ID** from the app registration’s **Overview** tab.
2. Go to **Manage > Certificates & secrets**, select **+ New client secret**, and copy the **Value** (this is your client secret).
3. In **Blob Storage**, open your container, select **Access control (IAM) > Add > Add role assignment**, and assign the app registration one of the following roles:
   - `Storage Blob Data Contributor`
   - `Storage Blob Data Reader`
4. In the connector configuration, enter the details from the following table.

| Property      | Type   | Required | Description                                                                                                           | Example                                                 |
| :------------ | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Tenant id     | String | Yes      | ID of the Microsoft Entra ID tenant that owns the application.                                                        |                                                         |
| Client id     | String | Yes      | Application (client) ID of the registered Microsoft Entra ID application.                                             |                                                         |
| Client secret | String | Yes      | Client secret generated for the registered Microsoft Entra ID application.                                            |                                                         |
| Account url   | String | Yes      | URL of the Azure Blob Storage account to connect to. Replace `<storage_account_name>` with your storage account name. | `https://<storage_account_name>.blob.core.windows.net/` |

#### SAS token

Select **SAS token** to authenticate with a shared access signature (SAS).

1. In the **Azure Portal**, open your **Storage account > Containers**, and select your container.
2. From the container’s **toolbar**, click **Generate SAS**.
3. In the connector configuration, enter the **SAS token** and **SAS URL**.

| Property  | Type   | Required | Description                                           | Example |
| :-------- | :----- | :------- | :---------------------------------------------------- | :------ |
| SAS token | String | Yes      | Shared access signature (SAS) token of the container. |         |
| SAS URL   | String | Yes      | Shared access signature (SAS) URL of the container.   |         |

## Operations

Select the desired operation from the **Operation** dropdown.

### Upload document

Upload a document to a container. Select **Upload blob** in the **Operation** dropdown.

#### Input parameters

| Property               | Type     | Required | Description                                                                                                                                                                                                                             | Example |
| :--------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Blob Storage container | String   | Yes      | Name of the container that organizes a set of blobs. It must match the container the **SAS token** was created for.                                                                                                                     |         |
| Document source        | Dropdown | Yes      | Where the document comes from: **Camunda Document**, **Inline Content**, or **From URL**. Defaults to **Camunda Document**. See [document sources](/components/document-handling/send-document-to-external-system.md#document-sources). |         |
| Camunda document       | String   | Yes      | Reference to a Camunda document. Shown if **Document source** is **Camunda Document**.                                                                                                                                                  |         |
| Content                | String   | Yes      | Content of the document, built from process data. Shown if **Document source** is **Inline Content**.                                                                                                                                   |         |
| File name              | String   | No       | Name of the document. Shown if **Document source** is **Inline Content**.                                                                                                                                                               |         |
| Content type           | String   | No       | Content type of the document. Shown if **Document source** is **Inline Content**.                                                                                                                                                       |         |
| URL                    | String   | Yes      | URL of the document to upload. Shown if **Document source** is **From URL**.                                                                                                                                                            |         |
| File name              | String   | No       | Name of the document. Shown if **Document source** is **From URL**.                                                                                                                                                                     |         |
| Document file name     | String   | No       | Name of the blob in the container. By default, the file name from the document metadata is used. Located in the **Additional properties** group.                                                                                        |         |
| Timeout (in seconds)   | Number   | Yes      | Time limit for the upload. Defaults to `30`. Located in the **Additional properties** group.                                                                                                                                            |         |

:::note
Use **Inline Content** to build a file (for example, a `.json` file) directly from process variables without first storing it in the Camunda document store. See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).

If an uploaded document already exists in the container with the same name, it will be overwritten. Depending on the settings made on the Azure Storage Account, the previous version of the document may still be accessible in the file version history.
:::

#### Output

The connector returns the container, the name of the blob, and a link to it:

```json
{
  "container": "my-container",
  "filename": "invoice.pdf",
  "link": "https://<storage_account_name>.blob.core.windows.net/my-container/invoice.pdf"
}
```

To get the link to the uploaded blob, use the following FEEL expression as the **Result expression**:

```feel
= {"blobLink": response.link}
```

### Download document

Download a document from a container. Select **Download blob** in the **Operation** dropdown.

#### Input parameters

| Property               | Type     | Required                | Description                                                                                                                                                                                                                                                                                                                                                  | Example                            |
| :--------------------- | :------- | :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| Blob Storage container | String   | Yes                     | Name of the container that organizes a set of blobs. It must match the container the **SAS token** was created for.                                                                                                                                                                                                                                          |                                    |
| File name              | String   | Yes                     | Name of the document to download.                                                                                                                                                                                                                                                                                                                            |                                    |
| Response format        | Dropdown | Yes                     | How the downloaded content is returned: **Document reference** uploads it to the Camunda document store and returns a reference, **as text** decodes it as a string, and **as JSON** parses it into a structure. Defaults to **Document reference**. See [return formats](/components/document-handling/send-document-to-external-system.md#return-formats). | Defaults to **Document reference** |
| Encoding               | String   | No, defaults to `UTF-8` | Character set used to decode the content. Shown if **Response format** is **as text**.                                                                                                                                                                                                                                                                       | Defaults to `UTF-8`                |

:::note
**as text** and **as JSON** return the content directly in a process variable and are subject to a size guard (approximately 1.5 MiB). Use **Document reference** for large files. **as JSON** fails the job when the content is not valid JSON.
:::

#### Output

The response depends on the **Response format**.

**Document reference** returns a reference to a document in the Camunda document store in `document`:

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

**as text** returns the decoded string in `content`:

```json
{
  "content": "Hello from Azure Blob Storage"
}
```

**as JSON** returns the parsed structure in `content`:

```json
{
  "content": {
    "orderId": "1234",
    "total": 99.5
  }
}
```

To get the content, use the following FEEL expression as the **Result expression**, for example with **as JSON**:

```feel
= {"orderId": response.content.orderId}
```

<ErrorHandling />

## Further resources

- [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Document handling](/components/document-handling/getting-started.md)
