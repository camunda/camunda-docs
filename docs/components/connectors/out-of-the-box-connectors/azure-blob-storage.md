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

The **Azure Blob Storage connector** is an outbound connector that allows you to interact with
[Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) resources from your BPMN processes.

The connector currently supports uploading and downloading documents.

## Prerequisites

To begin using the **Azure Blob Storage connector**, ensure you have created the following [resources](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources):

- An Azure [storage account](https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts)
- An Azure [container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#containers)

Then set up access for the connector using one of the following authentication methods.

### OAuth 2.0

1. In the [Azure Portal](https://portal.azure.com), open **Microsoft Entra ID** and select **+ Add > App registration** to create a new app registration.
   - Note the **client ID** and **tenant ID** from the app registration’s **Overview** tab.
2. Go to **Manage > Certificates & secrets**, select **+ New client secret**, and copy the **Value** (this is your client secret).
3. In **Blob Storage**, open your container, select **Access control (IAM) > Add > Add role assignment**, and assign the app registration one of the following roles:
   - `Storage Blob Data Contributor`
   - `Storage Blob Data Reader`
4. Enter the client ID, tenant ID, client secret, and account URL in the connector configuration. See [OAuth 2.0 (Microsoft Entra ID)](#oauth-20-microsoft-entra-id).

### SAS token

1. In the **Azure Portal**, open your **Storage account > Containers**, and select your container.
2. From the container’s **toolbar**, click **Generate SAS**.
3. Enter the **SAS token** and **SAS URL** in the connector configuration. See [SAS token authentication](#sas-token-authentication).

:::tip
Keep your credentials secure by avoiding direct inclusion in the BPMN `xml` file. Store them as [connector secrets](/components/saas/clusters/manage-secrets.md) (for example, `AZURE_SAS_TOKEN`) and reference them as `{{secrets.AZURE_SAS_TOKEN}}`, or use an [Azure Blob Storage credential](#authentication).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

Choose how the connector authenticates to your storage account.

| Property                      | Type          | Required | Description                                                                                                                                                                                                                                                                                                                         | Example |
| :---------------------------- | :------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Azure Blob Storage credential | Configuration | No       | Select a reusable Azure Blob Storage credential, or leave it empty to configure authentication on the element. When you select a credential, the **Type** field and the authentication fields below are hidden. Available from Camunda 8.11. See [Using an Azure Blob Storage credential](#using-an-azure-blob-storage-credential). |         |
| Type                          | Dropdown      | Yes      | The authentication type: **SAS token** (default) or **OAuth 2.0 (Microsoft Entra ID)**. Shown only when no credential is selected.                                                                                                                                                                                                  |         |

#### Using an Azure Blob Storage credential

In Camunda 8.11 and later, you can select a reusable **Azure Blob Storage credential** instead of entering the authentication details on each element. When you select a credential, the manual authentication fields are hidden, and the credential supplies the authentication details. Leave the field empty to configure authentication manually as described in the following sections.

For more information, see [using credentials](/components/connectors/use-connectors/index.md#using-credentials) and [credentials](/components/hub/organization/credentials/index.md).

#### SAS token authentication

Select **SAS token** in the **Type** dropdown. These fields are shown only when no credential is selected.

| Property  | Type   | Required | Description                                                                                                   | Example |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------ | :------ |
| SAS token | String | Yes      | The shared access signature (SAS) token of the container. See [SAS token](#sas-token) for how to generate it. |         |
| SAS URL   | String | Yes      | The shared access signature (SAS) URL of the container. See [SAS token](#sas-token) for how to generate it.   |         |

#### OAuth 2.0 (Microsoft Entra ID)

Select **OAuth 2.0 (Microsoft Entra ID)** in the **Type** dropdown. These fields are shown only when no credential is selected. See [OAuth 2.0](#oauth-20) for how to create the app registration and assign roles.

| Property      | Type   | Required | Description                                                                                                       | Example                                                 |
| :------------ | :----- | :------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Tenant id     | String | Yes      | The ID of the Microsoft Entra ID tenant that owns the application.                                                |                                                         |
| Client id     | String | Yes      | The application (client) ID of the registered Microsoft Entra ID application.                                     |                                                         |
| Client secret | String | Yes      | The client secret generated for the registered Microsoft Entra ID application.                                    |                                                         |
| Account url   | String | Yes      | The URL of the Azure Blob Storage account to connect to. Replace `<storage_account_name>` with your account name. | `https://<storage_account_name>.blob.core.windows.net/` |

### Additional properties

| Property             | Type   | Required | Description                                                                                            | Example |
| :------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------- | :------ |
| Timeout (in seconds) | Number | Yes      | The time in seconds allowed for the upload to complete. Default: `30`. Shown only for **Upload blob**. | `30`    |

To change retries and the retry backoff, see [use an outbound connector](/components/connectors/use-connectors/outbound.md#retries).

## Operations

Select the desired operation from the **Operation** dropdown: **Upload blob** (default) or **Download blob**.

### Upload document

Upload a document to a container in your storage account.

#### Input parameters

| Property               | Type     | Required | Description                                                                                                                                                                                               | Example       |
| :--------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| Blob Storage container | String   | Yes      | The container to upload to. A container acts as a directory that organizes a set of blobs. It must match the container the **SAS token** was created for when using SAS token authentication.             | `invoices`    |
| Document source        | Dropdown | Yes      | The [document source](/components/document-handling/send-document-to-external-system.md#document-sources) of the document to upload: **Camunda Document** (default), **Inline Content**, or **From URL**. |               |
| Camunda document       | String   | Yes      | A reference to a document in the Camunda document store, as a FEEL expression. Shown when **Document source** is **Camunda Document**.                                                                    |               |
| Document file name     | String   | No       | The name of the blob. If empty, the file name from the document metadata is used. Shown when **Document source** is **Camunda Document**.                                                                 | `invoice.pdf` |
| Content                | String   | Yes      | The content of the document, for example built from process data. Shown when **Document source** is **Inline Content**.                                                                                   |               |
| File name              | String   | No       | The file name of the inline document. Shown when **Document source** is **Inline Content**.                                                                                                               |               |
| Content type           | String   | No       | The content type of the inline document. Shown when **Document source** is **Inline Content**.                                                                                                            |               |
| URL                    | String   | Yes      | The URL to fetch the document from. Shown when **Document source** is **From URL**.                                                                                                                       |               |
| File name              | String   | No       | The file name of the document fetched from the URL. Shown when **Document source** is **From URL**.                                                                                                       |               |

:::note
Use **Inline Content** to build a file (for example, a `.json` file) directly from process variables without first storing it in the Camunda document store. See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).

If an uploaded document already exists in the container with the same name, it will be overwritten. Depending on the settings made on the Azure Storage Account, the previous version of the document may still be accessible in the file version history.
:::

#### Output

The connector returns the container, the name of the uploaded blob, and a link to it:

```json
{
  "container": "invoices",
  "filename": "invoice.pdf",
  "link": "https://<storage_account_name>.blob.core.windows.net/invoices/invoice.pdf"
}
```

To keep only the link in a process variable, use a result expression such as:

```feel
= {"blobUrl": response.link}
```

### Download document

Download a document from a container in your storage account.

#### Input parameters

| Property               | Type     | Required | Description                                                                                                                                                                                                                                                                                                                        | Example       |
| :--------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| Blob Storage container | String   | Yes      | The container to download from. A container acts as a directory that organizes a set of blobs. It must match the container the **SAS token** was created for when using SAS token authentication.                                                                                                                                  | `invoices`    |
| File name              | String   | Yes      | The name of the document to download.                                                                                                                                                                                                                                                                                              | `invoice.pdf` |
| Response format        | Dropdown | Yes      | How the downloaded payload is returned: **Document reference** (default) uploads it to the Camunda document store and returns a reference, **as text** decodes it as a string, and **as JSON** parses it into a structure. See [return formats](/components/document-handling/send-document-to-external-system.md#return-formats). |               |
| Encoding               | String   | No       | The character set used to decode the response. Default: `UTF-8`. Shown when **Response format** is **as text**.                                                                                                                                                                                                                    | `UTF-8`       |

:::note
**as text** and **as JSON** return the content directly in a process variable and are subject to a size guard (approximately 1.5 MiB); use **Document reference** for large files. **as JSON** fails the job when the content is not valid JSON.
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

For example, to read a field from a JSON blob, use a result expression such as:

```feel
= {"invoiceId": response.content.invoiceId}
```

## Troubleshooting

<ErrorHandling />

## Further resources

- [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Document handling](/components/document-handling/getting-started.md)
