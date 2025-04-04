---
id: document-handling-configuration
title: "Storage configuration"
description: "Learn more about storage configuration options like Google Cloud Platform, AWS S3, local folders, and in-memory."
keywords: ["document handling", "document storage configuration"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda supports multiple storage option for handling documents in Self-Managed environments. Depending on your deployment setup and production requirements, you can choose from cloud-based, local, or in-memory storage methods.

The following section outlines supported storage types, their intended use cases, and configuration guidance.

## Supported storage options

<Tabs groupId="storage-option" defaultValue="all" queryString values={
[
{label: 'All storage options', value: 'all' },
{label: 'Storage options for production use', value: 'production' },
]}>

<TabItem value='all'>

- [**Google Cloud Platform**](https://cloud.google.com/storage) bucket storage integration can be used in Self-Managed configurations with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) and [Helm](../../setup/install.md).
- Use [**AWS S3**](https://aws.amazon.com/s3/) storage and bucket creation per cluster to securely store and retrieve documents in an external, scalable storage solution for Self-Managed, and to ensure storage is properly isolated and managed for each environment.
  - It can be used with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) and [Helm](../../setup/install.md).
- **Local storage** can be configured for a cluser to store documents in a local folder.
  - It can be used only for [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md).
  - It is not supported for production environments.
- **In-memory** storage can be used to store documents during application runtime. When the application is stopped, documents will be lost.
  - It can be used with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) and [Helm](../../setup/install.md).
  - It is not supported for production environments.

</TabItem>

<TabItem value='production'>

- A [**Google Cloud Platform**](https://cloud.google.com/storage) bucket storage integration can be used in Self-Managed configurations with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) and [Helm](../../setup/install.md).
- Use [**AWS S3**](https://aws.amazon.com/s3/) storage and bucket creation per cluster to securely store and retrieve documents in an external, scalable storage solution for Self-Managed, and to ensure storage is properly isolated and managed for each environment.
  - It can be used with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) and [Helm](../../setup/install.md).

</TabItem>
</Tabs>

## Configuration guidance

Storage configuration depends on your Self-Managed installation type.

<Tabs className="unique-tabs" groupId="sm-installation-type" defaultValue="helm" queryString values={
[
{label: 'Helm', value: 'helm' },
{label: 'Camunda 8 Run', value: 'c8run' },
]}>

<TabItem className="child-tab-content" value='helm'>

If no storage configuration is provided, the default document storage is **in-memory**. It means that documents will be lost when the application is stopped.

To change the storage to **Google Cloud Platform** or **AWS S3**, update the `values.yaml` file with a storage configuration parameters.
Below is an example of storage configuration:

```
# Global configuration for variables which can be accessed by all sub charts
global:
    ## Document Store Configuration
    documentStore:
        activeStoreId: "inmemory"
        type:
            aws:
                ## @param global.documentStore.type.aws.enabled Enable AWS document store configuration.
                enabled: false
                ## @param global.documentStore.type.aws.storeId Custom prefix for AWS. Default will generate env vars containing 'storeId' such as DOCUMENT_STORE_AWS_CLASS.
                storeId: "AWS"
                ## @param global.documentStore.type.aws.region AWS region for the S3 bucket. (example: us-east-1)
                region: ""
                ## @param global.documentStore.type.aws.bucket Name of the AWS S3 bucket.
                bucket: "your-aws-bucket"
                ## @param global.documentStore.type.aws.bucketPath [string, nullable] (Optional) Path/prefix within the S3 bucket.
                bucketPath: ""
                ## @param global.documentStore.type.aws.bucketTtl [int, nullable] (Optional) Time-to-live for documents in the S3 bucket (number in days).
                bucketTtl: 0
                ## @param global.documentStore.type.aws.class Fully qualified class name for the AWS document store provider.
                class: "io.camunda.document.store.aws.AwsDocumentStoreProvider"
                ## @param global.documentStore.type.aws.existingSecret Reference to an existing Kubernetes secret containing AWS credentials.
                existingSecret: "aws-credentials"
                ## @param global.documentStore.type.aws.accessKeyIdKey Key within the AWS credentials secret for AWS_ACCESS_KEY_ID.
                accessKeyIdKey: "awsAccessKeyId"
                ## @param global.documentStore.type.aws.secretAccessKeyKey Key within the AWS credentials secret for AWS_SECRET_ACCESS_KEY.
                secretAccessKeyKey: "awsSecretAccessKey"
            gcp:
                ## @param global.documentStore.type.gcp.enabled Enable GCP document store configuration.
                enabled: false
                ## @param global.documentStore.type.gcp.storeId Custom prefix for GCP. Default will generate env vars containing 'storeId' such as DOCUMENT_STORE_GCP_CLASS.
                storeId: "GCP"
                ## @param global.documentStore.type.gcp.bucket Name of the GCP bucket.
                bucket: "your-gcp-bucket"
                ## @param global.documentStore.type.gcp.class Fully qualified class name for the GCP document store provider.
                class: "io.camunda.document.store.gcp.GcpDocumentStoreProvider"
                ## @param global.documentStore.type.gcp.existingSecret Reference to an existing Kubernetes secret containing GCP credentials.
                existingSecret: "gcp-credentials"
                ## @param global.documentStore.type.gcp.credentialsKey Key in the GCP credentials secret that contains the service-account JSON.
                credentialsKey: "service-account.json"
                ## @param global.documentStore.type.gcp.mountPath Mount path for the GCP credentials secret.
                mountPath: "/var/secrets/gcp"
                ## @param global.documentStore.type.gcp.fileName The file name for the GCP credentials JSON.
                fileName: "service-account.json"
            inmemory:
                ## @param global.documentStore.type.inmemory.enabled Enable in-memory document store configuration.
                enabled: true
                ## @param global.documentStore.type.inmemory.storeId Custom prefix for in-memory. Default will generate env vars containing 'storeId' such as DOCUMENT_STORE_INMEMORY_CLASS.
                storeId: "INMEMORY"
                ## @param global.documentStore.type.inmemory.class Fully qualified class name for the in-memory document store provider.
                class: "io.camunda.document.store.inmemory.InMemoryDocumentStoreProvider"
```

</TabItem>

<TabItem className="child-tab-content" value='c8run'>

:::note
[Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) can be used for local development only.
:::

If no storage configuration is provided, the default document storage is **in-memory**. It means that documents will be lost when the application is stopped.

To change this to a different storage method, use the environment variables in the section below for **every** component using document handling. No additional configuration is required for the **in-memory** storage.

To set what storage should be used, accepted values for `DOCUMENT_DEFAULT_STORE_ID` are `aws`, `inmemory`, `gcp` (for Google Cloud Platform), and `local` (for local storage).

<Tabs groupId="storage" defaultValue="aws" queryString values={
[
{label: 'AWS', value: 'aws' },
{label: 'GCP', value: 'gcp' },
{label: 'In-memory', value: 'in-memory' },
{label: 'Local', value: 'local' },
]}>

<TabItem value='aws'>

| Credentials variable    | Required | Description                                                                                           |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Yes      | Access key ID used to interact with AWS S3 buckets.                                                   |
| `AWS_SECRET_ACCESS_KEY` | Yes      | The AWS secret access key associated with the `AWS_ACCESS_KEY_ID`. This will be used to authenticate. |
| `AWS_REGION`            | Yes      | Region where the bucket is.                                                                           |

| Store variable                   | Required | Description                                                                                                                                                                                                                                               |
| -------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_STORE_AWS_BUCKET`      | Yes      | Specifies the name of the AWS S3 bucket where documents are stored.                                                                                                                                                                                       |
| `DOCUMENT_STORE_AWS_CLASS`       | Yes      | io.camunda.document.store.aws.AwsDocumentStoreProvider                                                                                                                                                                                                    |
| `DOCUMENT_STORE_AWS_BUCKET_PATH` | No       | Defines the folder-like path within the S3 bucket where documents are stored. This helps organize files within the bucket. For example, `documents/invoices`. If not provided, the application logic assumes a default value of `""`.                     |
| `DOCUMENT_STORE_AWS_BUCKET_TTL`  | No       | Represents the time-to-live (TTL) for documents stored in the S3 bucket. This could be used to set an expiration policy, meaning documents will be deleted automatically after a specified duration. If not provided, the application logic ignores this. |

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

<TabItem value='in-memory'>

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

</TabItem>

</Tabs>

## Storage policies

- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: 30 days by default. A custom expiration date can be specified via the [Document upload API](../../../apis-tools/camunda-api-rest/specifications/create-document.api.mdx).
