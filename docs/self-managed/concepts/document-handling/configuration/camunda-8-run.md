---
id: camunda-8-run
sidebar_label: Camunda 8 Run
title: Document handling configuration in Camunda 8 Run
description: "Learn more about storage configuration options for Camunda 8 Run setups."
keywords: ["document handling", "document storage configuration"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
[Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) can be used for local development only, and none of the storage options below are suitable for production.
:::

If no storage configuration is provided, the default document storage is **in-memory**. It means that documents will be lost when the application is stopped.

To change this to a different storage method, use the environment variables in the sections below. No additional configuration is required for the **in-memory** storage.

To set what storage should be used, accepted values for `DOCUMENT_DEFAULT_STORE_ID` are `aws`, `inmemory`, `gcp` (for Google Cloud Platform), `azure` (for Azure Blob Storage), and `local` (for local storage).

## Storage options

<Tabs groupId="storage" defaultValue="aws" queryString values={
[
{label: 'AWS', value: 'aws' },
{label: 'GCP', value: 'gcp' },
{label: 'Azure', value: 'azure' },
{label: 'In-memory', value: 'in-memory' },
{label: 'Local', value: 'local' },
]}>

<TabItem value='aws'>

By using **external cloud file bucket storage** with [**AWS S3**](https://aws.amazon.com/s3/), documents can be stored in a secure and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management.

The same store also targets self-hosted **S3-compatible object stores** (MinIO, Cloudian, Garage, etc.) when a custom endpoint is configured — see [S3-compatible object stores](#s3-compatible-object-stores) below.

| Credentials variable    | Required | Description                                                                                           |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Yes      | Access key ID used to interact with AWS S3 buckets.                                                   |
| `AWS_SECRET_ACCESS_KEY` | Yes      | The AWS secret access key associated with the `AWS_ACCESS_KEY_ID`. This will be used to authenticate. |
| `AWS_REGION`            | Yes      | Region where the bucket is.                                                                           |

| Store variable                                | Required | Description                                                                                                                                                                                                                                              |
| --------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_AWS_BUCKET`                   | Yes      | Specifies the name of the AWS S3 bucket where documents are stored.                                                                                                                                                                                      |
| `DOCUMENT_STORE_AWS_CLASS`                    | Yes      | io.camunda.document.store.aws.AwsDocumentStoreProvider                                                                                                                                                                                                   |
| `DOCUMENT_STORE_AWS_BUCKET_PATH`              | No       | Optional path/prefix within the S3 bucket (for example, `documents/invoices`). If not provided, documents are stored at the bucket root.                                                                                                                 |
| `DOCUMENT_STORE_AWS_BUCKET_TTL`               | No       | Time-to-live (TTL) for documents in the S3 bucket (number of days). When set, documents are automatically deleted after this duration. If not provided, documents are retained indefinitely.                                                             |
| `DOCUMENT_STORE_AWS_ENDPOINT`                 | No       | Custom endpoint URL for an [S3-compatible object store](#s3-compatible-object-stores) such as MinIO, Cloudian, or Garage. When unset, the AWS SDK default endpoint is used.                                                                              |
| `DOCUMENT_STORE_AWS_FORCE_PATH_STYLE`         | No       | Forces path-style addressing on the S3 client. Most S3-compatible backends require this. Automatically enabled when `DOCUMENT_STORE_AWS_ENDPOINT` is set, so explicit configuration is rarely needed.                                                    |
| `DOCUMENT_STORE_AWS_CHUNKED_ENCODING_ENABLED` | No       | Controls AWS chunked transfer encoding. Set to `false` for S3-compatible backends that do not support `aws-chunked` streaming-signed uploads (for example, Garage). When unset, the SDK default (`true`) is used, which is correct for AWS S3 and MinIO. |

**Example:**

```
AWS_ACCESS_KEY_ID=AWSACCESSKEYID
AWS_REGION=eu-north-1
AWS_SECRET_ACCESS_KEY=AWSSECRETACCESSKEYGOESHERE
DOCUMENT_STORE_AWS_BUCKET=test-bucket
DOCUMENT_STORE_AWS_BUCKET_PATH=test/path
DOCUMENT_STORE_AWS_BUCKET_TTL=5
DOCUMENT_STORE_AWS_CLASS=io.camunda.document.store.aws.AwsDocumentStoreProvider
DOCUMENT_DEFAULT_STORE_ID=aws
```

### S3-compatible object stores

To use an S3-compatible object store (MinIO, Cloudian, Garage, etc.), set `DOCUMENT_STORE_AWS_ENDPOINT` in addition to the standard AWS variables. Set these environment variables before running `./c8run start`. The bucket must already exist on the backend — Camunda does not create it.

**Example (local MinIO):**

```
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_REGION=us-east-1
DOCUMENT_STORE_AWS_BUCKET=camunda-docs
DOCUMENT_STORE_AWS_CLASS=io.camunda.document.store.aws.AwsDocumentStoreProvider
DOCUMENT_STORE_AWS_ENDPOINT=http://localhost:9000
DOCUMENT_DEFAULT_STORE_ID=aws
```

For backends that do not support AWS chunked transfer encoding (notably Garage), add `DOCUMENT_STORE_AWS_CHUNKED_ENCODING_ENABLED=false`.

### Troubleshooting checksum issues

Some S3-compatible implementations cannot properly handle the checksum feature of the S3 client introduced with version 2.30.0. For more details, refer to [the AWS documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/s3-checksums.html).

If checksum-related errors appear, disable automated checksum creation by setting these environment variables before running `./c8run start`:

```
AWS_REQUEST_CHECKSUM_CALCULATION=WHEN_REQUIRED
AWS_RESPONSE_CHECKSUM_VALIDATION=WHEN_REQUIRED
```

If you're still encountering issues with MD5 checksums required by your provider, enable legacy MD5 support by setting:

```
DOCUMENT_STORE_AWS_SUPPORT_LEGACY_MD5=true
```

## AWS API client permission requirements

To ensure seamless integration and functionality of document handling with AWS services, the API client utilized must be configured with the appropriate permissions. The following AWS Identity and Access Management (IAM) permissions are necessary for the execution of operations related to document handling:

| Permission        | Description                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `s3:DeleteObject` | This permission authorizes the API client to remove objects from the specified S3 bucket.                                                                                                                                       |
| `s3:GetObject`    | This permission is required to retrieve contents and metadata of objects from Amazon S3. The API client will utilize this permission to download or access the contents of the documents that have been uploaded to the bucket. |
| `s3:ListBucket`   | This permission allows the application to verify it has access to the specified S3 bucket. Lack of this permission does not prevent the application from starting, but it logs a warning on application start-up.               |
| `s3:PutObject`    | To upload documents to an Amazon S3 bucket, the API client must have this permission.                                                                                                                                           |

</TabItem>

<TabItem value='gcp'>

By using **external cloud file bucket storage** with [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage), documents can be stored in a secure and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management.

| Credentials variable             | Required | Description                                                                                                             |
| -------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_APPLICATION_CREDENTIALS` | Yes      | Specifies the file path to a JSON key file that contains authentication credentials for a Google Cloud service account. |

| Store variable              | Required | Description                                                                     |
| --------------------------- | -------- | ------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_GCP_BUCKET` | Yes      | Defines the name of the Google Cloud Storage bucket where documents are stored. |
| `DOCUMENT_STORE_GCP_CLASS`  | Yes      | io.camunda.document.store.gcp.GcpDocumentStoreProvider                          |

**Example:**

```
DOCUMENT_STORE_GCP_CLASS=io.camunda.document.store.gcp.GcpDocumentStoreProvider
DOCUMENT_STORE_GCP_BUCKET=test-bucket
DOCUMENT_DEFAULT_STORE_ID=gcp
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

## GCP API client permission requirements

To ensure seamless integration and functionality of document handling with GCP services, the API client utilized must be configured with the appropriate permissions. The following permissions are necessary for the execution of operations related to document handling:

| Permission                     | Description                                                                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storage.buckets.get`          | This permission allows the application to verify it has access to the specified bucket. Lack of this permission does not prevent the application from starting, but it logs a warning on application start-up. |
| `storage.objects.get`          | This permission allows the API client to retrieve objects from Google Cloud Storage. It is vital for downloading or accessing the contents of stored objects.                                                  |
| `storage.objects.create`       | With this permission, the API client can upload new objects to a bucket. It is essential for adding new documents to the storage.                                                                              |
| `storage.objects.update`       | This permission enables the API client to update contents and metadata of existing objects within a bucket.                                                                                                    |
| `storage.objects.delete`       | This permission grants the API client the ability to delete objects from a bucket.                                                                                                                             |
| `iam.serviceAccounts.signBlob` | This permission allows the service account to sign data as part of the process to create secure, signed URLs for accessing uploaded documents.                                                                 |

</TabItem>

<TabItem value='azure'>

By using **external cloud file bucket storage** with [**Azure Blob Storage**](https://azure.microsoft.com/en-us/products/storage/blobs), documents can be stored in a secure and scalable way.

Azure Blob Storage supports two authentication methods: connection string and DefaultAzureCredential (Managed Identity).

#### Prerequisites

- An Azure Storage account with a Blob container.
- For connection string authentication: The connection string from the Azure portal (**Settings > Access keys**).
- For Managed Identity/DefaultAzureCredential authentication: The `Storage Blob Data Contributor` RBAC role assigned on the storage account.

| Store variable                           | Required    | Description                                                                                                                                     |
| ---------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_AZURE_CLASS`             | Yes         | `io.camunda.document.store.azure.AzureBlobDocumentStoreProvider`                                                                                |
| `DOCUMENT_STORE_AZURE_CONTAINER`         | Yes         | Name of the Azure Blob Storage container.                                                                                                       |
| `DOCUMENT_STORE_AZURE_CONNECTION_STRING` | Conditional | Azure Storage connection string. Required unless using DefaultAzureCredential.                                                                  |
| `DOCUMENT_STORE_AZURE_ENDPOINT`          | Conditional | Storage account endpoint (for example, `https://myaccount.blob.core.windows.net`). Required when using DefaultAzureCredential/Managed Identity. |
| `DOCUMENT_STORE_AZURE_CONTAINER_PATH`    | No          | Optional path/prefix within the container.                                                                                                      |

**Example (connection string):**

```
DOCUMENT_STORE_AZURE_CLASS=io.camunda.document.store.azure.AzureBlobDocumentStoreProvider
DOCUMENT_STORE_AZURE_CONTAINER=my-container
DOCUMENT_STORE_AZURE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=...;EndpointSuffix=core.windows.net
DOCUMENT_DEFAULT_STORE_ID=azure
```

**Example (DefaultAzureCredential/Managed Identity):**

```
DOCUMENT_STORE_AZURE_CLASS=io.camunda.document.store.azure.AzureBlobDocumentStoreProvider
DOCUMENT_STORE_AZURE_CONTAINER=my-container
DOCUMENT_STORE_AZURE_ENDPOINT=https://myaccount.blob.core.windows.net
DOCUMENT_DEFAULT_STORE_ID=azure
```

## Azure API client permission requirements

To ensure seamless integration and functionality of document handling with Azure Blob Storage, the identity used must be assigned the `Storage Blob Data Contributor` RBAC role on the storage account.

</TabItem>

<TabItem value='in-memory'>

**In-memory** storage can be used to store documents during the application's runtime. When the application is stopped, documents are lost.

In-memory storage is not suitable for production use, as pods and memory are not shared across components. Files stored in memory are not persisted and will be lost on application restart.

If no configuration is provided for at least one storage type, and no `DOCUMENT_DEFAULT_STORE_ID` is set, in-memory is used as the default storage type. If the configuration for another storage type has been provided (`DOCUMENT_STORE_AWS_BUCKET`, `DOCUMENT_STORE_AWS_BUCKET_PATH`, etc.), in-memory storage must be set explicitly to be used.

To use the in-memory store when an alternate configuration has been provided, take the following steps:

1. Set `DOCUMENT_STORE_INMEMORY_CLASS=io.camunda.document.store.inmemory.InMemoryDocumentStoreProvider`.
2. Set `DOCUMENT_DEFAULT_STORE_ID=inmemory`.

| Store variable                  | Required | Description                                                                                                                              |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_INMEMORY_CLASS` | Yes      | The class for instantiating the in-memory store. This must always be `io.camunda.document.store.inmemory.InMemoryDocumentStoreProvider`. |

**Example:**

```
DOCUMENT_STORE_INMEMORY_CLASS=io.camunda.document.store.inmemory.InMemoryDocumentStoreProvider
DOCUMENT_DEFAULT_STORE_ID=inmemory
```

</TabItem>

<TabItem value='local'>

**Local storage** can be configured for a cluster to store documents in a local folder. It can be used only for local development with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md).

Local storage is not suitable for production use, as pods and file paths are not shared across components. This prevents components like Tasklist and Zeebe from accessing the same data. Files are stored locally, and their retention must be managed manually.

| Store variable               | Required | Description                                                                                                                                 |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_LOCAL_CLASS` | Yes      | The class for instantiating the local store. This must always be `io.camunda.document.store.localstorage.LocalStorageDocumentStoreProvider` |
| `DOCUMENT_STORE_LOCAL_PATH`  | Yes      | The path to the directory which will host the uploaded files.                                                                               |

**Example:**

```
DOCUMENT_STORE_LOCAL_CLASS=io.camunda.document.store.localstorage.LocalStorageDocumentStoreProvider
DOCUMENT_STORE_LOCAL_PATH=/usr/local/camunda
DOCUMENT_DEFAULT_STORE_ID=local
```

</TabItem>

</Tabs>
