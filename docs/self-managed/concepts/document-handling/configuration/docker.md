---
id: docker
sidebar_label: Docker Compose
title: Document handling configuration in Docker Compose
description: "Learn more about storage configuration options for Docker Compose setups."
keywords: ["document handling", "document storage configuration"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
None of the storage options below with Docker Compose are suitable for production.
:::

Document Store configuration uses the unified `camunda.document.*` Spring property model. The sections below show the new configuration format. If you're migrating from legacy `DOCUMENT_*` environment variables, see [property mapping reference](#property-mapping-reference).

For Docker Compose, mount an `application.yaml` file and set `SPRING_CONFIG_ADDITIONAL_LOCATION` to its directory. For example, set `camunda.document.default-store-id` to specify the active store.

If no storage configuration is provided, the default document storage is **in-memory**. Documents are lost when the application is stopped.

:::warning Deprecated: `DOCUMENT_*` and `DOCUMENT_STORE_*` environment variables

The legacy `DOCUMENT_*` and `DOCUMENT_STORE_*` environment variables (for example, `DOCUMENT_STORE_AWS_BUCKET`, `DOCUMENT_DEFAULT_STORE_ID`) are deprecated. They continue to work for at least one release cycle via a backward compatibility bridge, but will be removed in a future release. When both the unified `camunda.document.*` properties and the legacy environment variables are set, `camunda.document.*` takes precedence.

:::

When using [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), Tasklist and Zeebe run in separate containers and do not share memory or volumes, which introduces certain limitations. While the document handling feature will still work, the configuration below must be set for all components that use it (Zeebe and Tasklist). In this topology, using in-memory or local storage means components cannot access the same data, so documents uploaded by Zeebe may not be visible to Tasklist. This limitation does not apply when using cloud storage options like AWS or GCP, where documents are always stored in a shared, centralized location.

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

```yaml
camunda:
  document:
    default-store-id: aws1 # the instance ID defined below
    aws:
      aws1: # store instance ID — must match default-store-id
        bucket-name: my-bucket
        bucket-path: documents/ # optional
        bucket-ttl: 30 # optional, days
```

| Property                                             | Required | Description                                                                                                                                                                                                                                        |
| ----------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.document.aws.<id>.bucket-name`              | Yes      | Name of the AWS S3 bucket where documents are stored.                                                                                                                                                                                             |
| `camunda.document.aws.<id>.bucket-path`              | No       | Folder-like path within the S3 bucket. Defaults to `""`.                                                                                                                                                                                          |
| `camunda.document.aws.<id>.bucket-ttl`               | No       | Time-to-live for documents in the bucket, in days.                                                                                                                                                                                                |
| `camunda.document.aws.<id>.endpoint`                 | No       | Custom endpoint URL for an [S3-compatible object store](#s3-compatible-object-stores) such as MinIO, Cloudian, or Garage. When unset, the AWS SDK default endpoint is used.                                                                       |
| `camunda.document.aws.<id>.force-path-style`         | No       | Forces path-style addressing on the S3 client. Most S3-compatible backends require this. Automatically enabled when `endpoint` is set, so explicit configuration is rarely needed.                                                              |
| `camunda.document.aws.<id>.chunked-encoding-enabled` | No       | Controls AWS chunked transfer encoding. Set to `false` for S3-compatible backends that do not support `aws-chunked` streaming-signed uploads (for example, Garage). When unset, the SDK default (`true`) is used, which is correct for AWS S3 and MinIO. |
| `camunda.document.default-store-id`                  | Yes      | Instance ID of the store to use as the default.                                                                                                                                                                                                   |
| `camunda.document.thread-pool-size`                  | No       | Number of threads in the document store thread pool.                                                                                                                                                                                              |

<details>
<summary>Deprecated: legacy environment variable equivalents</summary>

```
DOCUMENT_STORE_AWS_CLASS=io.camunda.document.store.aws.AwsDocumentStoreProvider
DOCUMENT_STORE_AWS_BUCKET=my-bucket
DOCUMENT_STORE_AWS_BUCKET_PATH=documents/
DOCUMENT_STORE_AWS_BUCKET_TTL=30
DOCUMENT_DEFAULT_STORE_ID=aws
```

</details>

### S3-compatible object stores

To use an S3-compatible object store (MinIO, Cloudian, Garage, etc.), set `endpoint` on the store instance, in addition to the standard properties above. The bucket must already exist on the backend — Camunda does not create it.

**Example (MinIO running alongside Camunda in the same Compose network):**

```yaml
camunda:
  document:
    default-store-id: aws1
    aws:
      aws1:
        bucket-name: camunda-docs
        endpoint: http://minio:9000
```

For Garage, add `chunked-encoding-enabled: false` to the same block.

### Troubleshooting checksum issues

Some S3-compatible implementations cannot properly handle the checksum feature of the S3 client introduced with version 2.30.0. For more details, refer to [the AWS documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/s3-checksums.html).

If checksum-related errors appear, disable automated checksum creation by setting these environment variables on your orchestration and connectors containers:

```
AWS_REQUEST_CHECKSUM_CALCULATION=WHEN_REQUIRED
AWS_RESPONSE_CHECKSUM_VALIDATION=WHEN_REQUIRED
```

If you're still encountering issues with MD5 checksums required by your provider, enable legacy MD5 support by setting:

```
DOCUMENT_STORE_AWS_SUPPORT_LEGACY_MD5=true
```


AWS SDK credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`) are resolved by the AWS SDK directly and are not part of `camunda.document.*`. Set them as environment variables as before.

| Credentials variable    | Required | Description                                                                          |
| ----------------------- | -------- | ------------------------------------------------------------------------------------ |
| `AWS_ACCESS_KEY_ID`     | Yes      | Access key ID used to interact with AWS S3 buckets.                                  |
| `AWS_SECRET_ACCESS_KEY` | Yes      | The AWS secret access key associated with `AWS_ACCESS_KEY_ID`, used to authenticate. |
| `AWS_REGION`            | Yes      | Region where the bucket is.                                                          |

</TabItem>

<TabItem value='gcp'>

By using **external cloud file bucket storage** with [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage), documents can be stored in a secure and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management.

```yaml
camunda:
  document:
    default-store-id: gcp1 # the instance ID defined below
    gcp:
      gcp1: # store instance ID — must match default-store-id
        bucket-name: my-gcp-bucket
        prefix: documents/ # optional
```

| Property                                | Required | Description                                                         |
| --------------------------------------- | -------- | ------------------------------------------------------------------- |
| `camunda.document.gcp.<id>.bucket-name` | Yes      | Name of the Google Cloud Storage bucket where documents are stored. |
| `camunda.document.gcp.<id>.prefix`      | No       | Folder-like prefix within the GCS bucket.                           |
| `camunda.document.default-store-id`     | Yes      | Instance ID of the store to use as the default.                     |

<details>
<summary>Deprecated: legacy environment variable equivalents</summary>

```
DOCUMENT_STORE_GCP_CLASS=io.camunda.document.store.gcp.GcpDocumentStoreProvider
DOCUMENT_STORE_GCP_BUCKET=my-gcp-bucket
DOCUMENT_DEFAULT_STORE_ID=gcp
```

</details>

The GCP credential variable (`GOOGLE_APPLICATION_CREDENTIALS`) is resolved by the GCP SDK directly and is not part of `camunda.document.*`. Set it as an environment variable as before.

| Credentials variable             | Required | Description                                                                                                             |
| -------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_APPLICATION_CREDENTIALS` | Yes      | Specifies the file path to a JSON key file that contains authentication credentials for a Google Cloud service account. |

</TabItem>

<TabItem value='azure'>

By using **external cloud file bucket storage** with [**Azure Blob Storage**](https://azure.microsoft.com/en-us/products/storage/blobs), documents can be stored in a secure and scalable way.

Azure Blob Storage supports two authentication methods: connection string and DefaultAzureCredential (Managed Identity).

#### Prerequisites

- An Azure Storage account with a Blob container.
- For connection string authentication: The connection string from the Azure portal (**Settings > Access keys**).
- For Managed Identity/DefaultAzureCredential authentication: The `Storage Blob Data Contributor` RBAC role assigned on the storage account.

**Example (connection string):**

```yaml
camunda:
  document:
    default-store-id: az1 # the instance ID defined below
    azure:
      az1: # store instance ID — must match default-store-id
        container-name: my-container
        connection-string: "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=...;EndpointSuffix=core.windows.net"
        container-path: documents/ # optional
```

**Example (DefaultAzureCredential/Managed Identity):**

```yaml
camunda:
  document:
    default-store-id: az1 # the instance ID defined below
    azure:
      az1: # store instance ID — must match default-store-id
        container-name: my-container
        endpoint: "https://myaccount.blob.core.windows.net"
        container-path: documents/ # optional
```

| Property                                        | Required    | Description                                                                                                                                     |
| ----------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.document.azure.<id>.container-name`    | Yes         | Name of the Azure Blob Storage container.                                                                                                       |
| `camunda.document.azure.<id>.connection-string` | Conditional | Azure Storage connection string. Required unless using DefaultAzureCredential.                                                                  |
| `camunda.document.azure.<id>.endpoint`          | Conditional | Storage account endpoint (for example, `https://myaccount.blob.core.windows.net`). Required when using DefaultAzureCredential/Managed Identity. |
| `camunda.document.azure.<id>.container-path`    | No          | Optional path/prefix within the container.                                                                                                      |
| `camunda.document.default-store-id`             | Yes         | Instance ID of the store to use as the default.                                                                                                 |

<details>
<summary>Deprecated: legacy environment variable equivalents</summary>

Connection string:

```
DOCUMENT_STORE_AZURE_CLASS=io.camunda.document.store.azure.AzureBlobDocumentStoreProvider
DOCUMENT_STORE_AZURE_CONTAINER=my-container
DOCUMENT_STORE_AZURE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=...;EndpointSuffix=core.windows.net
DOCUMENT_DEFAULT_STORE_ID=azure
```

DefaultAzureCredential/Managed Identity:

```
DOCUMENT_STORE_AZURE_CLASS=io.camunda.document.store.azure.AzureBlobDocumentStoreProvider
DOCUMENT_STORE_AZURE_CONTAINER=my-container
DOCUMENT_STORE_AZURE_ENDPOINT=https://myaccount.blob.core.windows.net
DOCUMENT_DEFAULT_STORE_ID=azure
```

</details>

</TabItem>

<TabItem value='in-memory'>

**In-memory** storage can be used to store documents during the application's runtime. When the application is stopped, documents are lost. In-memory storage is not suitable for production use, as pods and memory are not shared across components.

In-memory is the default when no storage configuration is provided. To use in-memory explicitly when other stores are also configured:

```yaml
camunda:
  document:
    default-store-id: inmemory1 # the instance ID defined below
    in-memory:
      inmemory1: {} # store instance ID — must match default-store-id
```

| Property                            | Required | Description                                                                 |
| ----------------------------------- | -------- | --------------------------------------------------------------------------- |
| `camunda.document.in-memory.<id>`   | Yes      | Declares an in-memory store instance. The value is an empty mapping (`{}`). |
| `camunda.document.default-store-id` | Yes      | Instance ID of the store to use as the default.                             |

<details>
<summary>Deprecated: legacy environment variable equivalents</summary>

```
DOCUMENT_STORE_INMEMORY_CLASS=io.camunda.document.store.inmemory.InMemoryDocumentStoreProvider
DOCUMENT_DEFAULT_STORE_ID=inmemory
```

</details>

</TabItem>

<TabItem value='local'>

```yaml
camunda:
  document:
    default-store-id: local1 # the instance ID defined below
    local:
      local1: # store instance ID — must match default-store-id
        path: /usr/local/camunda/documents
```

| Property                            | Required | Description                                                                                                                                                           |
| ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.document.local.<id>.path`  | Yes      | The path to the directory which will host the uploaded files. Use `/usr/local/camunda/documents` — it is pre-created with the right permissions for the process user. |
| `camunda.document.default-store-id` | Yes      | Instance ID of the store to use as the default.                                                                                                                       |

<details>
<summary>Deprecated: legacy environment variable equivalents</summary>

```
DOCUMENT_STORE_LOCAL_CLASS=io.camunda.document.store.localstorage.LocalStorageDocumentStoreProvider
DOCUMENT_STORE_LOCAL_PATH=/usr/local/camunda/documents
DOCUMENT_DEFAULT_STORE_ID=local
```

</details>

</TabItem>

</Tabs>

## API client permission requirements

### AWS S3

The API client must have the following AWS Identity and Access Management (IAM) permissions:

| Permission        | Description                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `s3:DeleteObject` | This permission authorizes the API client to remove objects from the specified S3 bucket.                                                                                                                                       |
| `s3:GetObject`    | This permission is required to retrieve contents and metadata of objects from Amazon S3. The API client will utilize this permission to download or access the contents of the documents that have been uploaded to the bucket. |
| `s3:ListBucket`   | This permission allows the application to verify it has access to the specified S3 bucket. Lack of this permission does not prevent the application from starting, but it logs a warning on application start-up.               |
| `s3:PutObject`    | To upload documents to an Amazon S3 bucket, the API client must have this permission.                                                                                                                                           |

### GCP

The API client must have the following permissions:

| Permission                     | Description                                                                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storage.buckets.get`          | This permission allows the application to verify it has access to the specified bucket. Lack of this permission does not prevent the application from starting, but it logs a warning on application start-up. |
| `storage.objects.get`          | This permission allows the API client to retrieve objects from Google Cloud Storage. It is vital for downloading or accessing the contents of stored objects.                                                  |
| `storage.objects.create`       | With this permission, the API client can upload new objects to a bucket. It is essential for adding new documents to the storage.                                                                              |
| `storage.objects.update`       | This permission enables the API client to update contents and metadata of existing objects within a bucket.                                                                                                    |
| `storage.objects.delete`       | This permission grants the API client the ability to delete objects from a bucket.                                                                                                                             |
| `iam.serviceAccounts.signBlob` | This permission allows the service account to sign data as part of the process to create secure, signed URLs for accessing uploaded documents.                                                                 |

### Azure Blob Storage

To use document handling with Azure Blob Storage, assign the `Storage Blob Data Contributor` RBAC role to the identity on the storage account. This role grants the following permissions:

| Permission                                                               | Description                      |
| ------------------------------------------------------------------------ | -------------------------------- |
| `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read`   | Read blob content and metadata.  |
| `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write`  | Create or update blobs.          |
| `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/delete` | Delete blobs from the container. |

## Property mapping reference

Use this table to migrate from legacy `DOCUMENT_*` environment variables to the unified `camunda.document.*` properties.

### Root-level

| Legacy environment variable | Unified property                    |
| --------------------------- | ----------------------------------- |
| `DOCUMENT_DEFAULT_STORE_ID` | `camunda.document.default-store-id` |
| `DOCUMENT_THREAD_POOL_SIZE` | `camunda.document.thread-pool-size` |

### AWS S3

| Legacy environment variable                             | Unified property                        |
| ------------------------------------------------------- | --------------------------------------- |
| `DOCUMENT_STORE_<id>_CLASS=...AwsDocumentStoreProvider` | Implicit — use the `aws` namespace      |
| `DOCUMENT_STORE_<id>_BUCKET`                            | `camunda.document.aws.<id>.bucket-name` |
| `DOCUMENT_STORE_<id>_BUCKET_PATH`                       | `camunda.document.aws.<id>.bucket-path` |
| `DOCUMENT_STORE_<id>_BUCKET_TTL`                        | `camunda.document.aws.<id>.bucket-ttl`  |
| `DOCUMENT_STORE_<id>_ENDPOINT`                          | `camunda.document.aws.<id>.endpoint`    |
| `DOCUMENT_STORE_<id>_FORCE_PATH_STYLE`                  | `camunda.document.aws.<id>.force-path-style` |
| `DOCUMENT_STORE_<id>_CHUNKED_ENCODING_ENABLED`          | `camunda.document.aws.<id>.chunked-encoding-enabled` |

### GCP

| Legacy environment variable                             | Unified property                        |
| ------------------------------------------------------- | --------------------------------------- |
| `DOCUMENT_STORE_<id>_CLASS=...GcpDocumentStoreProvider` | Implicit — use the `gcp` namespace      |
| `DOCUMENT_STORE_<id>_BUCKET`                            | `camunda.document.gcp.<id>.bucket-name` |
| `DOCUMENT_STORE_<id>_PREFIX`                            | `camunda.document.gcp.<id>.prefix`      |

### Azure Blob

| Legacy environment variable                                   | Unified property                                |
| ------------------------------------------------------------- | ----------------------------------------------- |
| `DOCUMENT_STORE_<id>_CLASS=...AzureBlobDocumentStoreProvider` | Implicit — use the `azure` namespace            |
| `DOCUMENT_STORE_<id>_CONTAINER`                               | `camunda.document.azure.<id>.container-name`    |
| `DOCUMENT_STORE_<id>_CONTAINER_PATH`                          | `camunda.document.azure.<id>.container-path`    |
| `DOCUMENT_STORE_<id>_CONNECTION_STRING`                       | `camunda.document.azure.<id>.connection-string` |
| `DOCUMENT_STORE_<id>_ENDPOINT`                                | `camunda.document.azure.<id>.endpoint`          |

### Local storage

| Legacy environment variable                                      | Unified property                     |
| ---------------------------------------------------------------- | ------------------------------------ |
| `DOCUMENT_STORE_<id>_CLASS=...LocalStorageDocumentStoreProvider` | Implicit — use the `local` namespace |
| `DOCUMENT_STORE_<id>_PATH`                                       | `camunda.document.local.<id>.path`   |

### In-memory

| Legacy environment variable                                  | Unified property                         |
| ------------------------------------------------------------ | ---------------------------------------- |
| `DOCUMENT_STORE_<id>_CLASS=...InMemoryDocumentStoreProvider` | Implicit — use the `in-memory` namespace |

## Startup validation

The application validates the Document Store configuration at startup and fails with a clear error message in the following cases:

- **Duplicate store IDs across namespaces**: Each store instance ID must be unique across all provider namespaces (`aws`, `gcp`, `azure`, `local`, `in-memory`).
- **Missing required fields**: Required properties (for example, `bucket-name` for AWS or `container-name` for Azure) must be set.
- **Unknown `default-store-id`**: The value of `camunda.document.default-store-id` must match a configured store instance ID.
