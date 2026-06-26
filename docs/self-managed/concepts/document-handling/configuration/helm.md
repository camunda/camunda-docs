---
id: helm
sidebar_label: "Helm"
title: "Document handling configuration in Helm"
description: "Learn more about storage configuration options for Helm setups."
keywords: ["document handling", "document storage configuration"]
---

This page covers two configuration approaches:

- **Legacy approach (deprecated)**: `global.documentStore.*` in `values.yaml` — generates `DOCUMENT_*` environment variables. Still works via a backward compatibility bridge but will be removed in a future release.
- **New approach (recommended)**: `extraConfiguration` with `camunda.document.*` Spring properties — the unified configuration model. See [Using the unified configuration format](#using-the-unified-configuration-format).

:::warning Deprecated: `DOCUMENT_*` and `DOCUMENT_STORE_*` environment variables

The `global.documentStore.*` Helm values generate legacy `DOCUMENT_*` and `DOCUMENT_STORE_*` environment variables (for example, `DOCUMENT_STORE_AWS_BUCKET`, `DOCUMENT_DEFAULT_STORE_ID`). These are deprecated. They continue to work for at least one release cycle via a backward compatibility bridge, but will be removed in a future release. When both `camunda.document.*` properties and legacy environment variables are set, `camunda.document.*` takes precedence.

:::

Helm offers external cloud file bucket storage options (recommended for production use when deploying with Helm) and in-memory storage (not suitable for production use):

- By using **external cloud file bucket storage options**, documents can be stored in a secure, and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management. The following file bucket storage options are supported:
  - [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage)
  - [**AWS S3**](https://aws.amazon.com/s3/)
  - [**Azure Blob Storage**](https://azure.microsoft.com/en-us/products/storage/blobs)

- **In-memory** storage can be used to store documents during the application's runtime. When the application is stopped, documents are lost. In-memory storage is not suitable for production use, as pods and memory are not shared across components. Files stored in memory are not persisted and will be lost on application restart.

If no storage configuration is provided, the default document storage is in-memory. However, in-memory storage is not supported in production environments, so a configuration update is required. This is because memory is not shared between pods or components, preventing services like Tasklist and Zeebe from accessing the same data. Additionally, all uploaded files are lost when the application restarts.

To change the storage to **Google Cloud Platform**, **AWS S3**, or **Azure Blob Storage**, update the `values.yaml` file with the storage configuration parameters.

The following `values.yaml` example shows the legacy configuration format. It generates deprecated `DOCUMENT_*` environment variables that are bridged to `camunda.document.*` properties at runtime. This approach still works but is deprecated. To use the new unified format instead, see [Using the unified configuration format](#using-the-unified-configuration-format).

The example below represents part of the [default Helm chart values](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.7/values.yaml) and shows the fields you need to change to enable the storage type of your preference.

:::note
Azure Blob Storage configuration differs from AWS and GCP. Only the connection string secret is managed in `values.yaml` under `global.documentStore.type.azure`. All other Azure configuration (container name, class, endpoint, etc.) must be provided via [`extraConfiguration`](/self-managed/deployment/helm/configure/application-configs.md). See the [Azure Blob Storage configuration](#azure-blob-storage-configuration) section below for details.
:::

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

## Using the unified configuration format

To adopt the new `camunda.document.*` model for any provider, disable the corresponding `global.documentStore.type.<provider>.enabled` flag and configure the store via `extraConfiguration`. This also enables advanced scenarios such as multiple named store instances.

### AWS S3

```yaml
global:
  documentStore:
    activeStoreId: "aws1" # must match the store instance ID in extraConfiguration
    type:
      aws:
        enabled: false # disable legacy env var generation
        existingSecret: "aws-credentials"
        accessKeyIdKey: "awsAccessKeyId"
        secretAccessKeyKey: "awsSecretAccessKey"

orchestration:
  extraConfiguration:
    - file: aws-documentstore.yaml
      content: |
        camunda:
          document:
            aws:
              aws1: # store instance ID — must match activeStoreId
                bucket-name: my-bucket
                bucket-path: documents/ # optional
                bucket-ttl: 30 # optional, days

connectors:
  extraConfiguration:
    - file: aws-documentstore.yaml
      content: |
        camunda:
          document:
            aws:
              aws1: # store instance ID — must match activeStoreId
                bucket-name: my-bucket
```

### GCP

```yaml
global:
  documentStore:
    activeStoreId: "gcp1" # must match the store instance ID in extraConfiguration
    type:
      gcp:
        enabled: false # disable legacy env var generation
        existingSecret: "gcp-credentials"
        credentialsKey: "service-account.json"
        mountPath: "/var/secrets/gcp"
        fileName: "service-account.json"

orchestration:
  extraConfiguration:
    - file: gcp-documentstore.yaml
      content: |
        camunda:
          document:
            gcp:
              gcp1: # store instance ID — must match activeStoreId
                bucket-name: my-gcp-bucket
                prefix: documents/ # optional

connectors:
  extraConfiguration:
    - file: gcp-documentstore.yaml
      content: |
        camunda:
          document:
            gcp:
              gcp1: # store instance ID — must match activeStoreId
                bucket-name: my-gcp-bucket
```

### Azure Blob Storage

See [Azure Blob Storage configuration](#azure-blob-storage-configuration) below for Azure-specific setup, including connection string and Managed Identity options.

## Azure Blob Storage configuration

Azure Blob Storage uses a different configuration pattern than AWS and GCP. Only the connection string secret is managed via `values.yaml` under `global.documentStore.type.azure`. All other configuration (container name, class, endpoint, etc.) must be provided by the user via `orchestration.extraConfiguration` and `connectors.extraConfiguration`.

This follows the same [`extraConfiguration` pattern](/self-managed/deployment/helm/configure/application-configs.md) used by other application-level settings in the 8.9+ chart.

### Prerequisites

- An Azure Storage account with a Blob container.
- For connection string authentication: The connection string from the Azure portal (**Settings > Access keys**).
- For Managed Identity/DefaultAzureCredential authentication: The `Storage Blob Data Contributor` RBAC role assigned on the storage account.

### Authentication options

Azure Blob Storage supports two authentication methods:

1. **Connection string** — simplest setup. The connection string is injected as a secret via `global.documentStore.type.azure.connectionString.secret`.
2. **DefaultAzureCredential** (recommended for AKS): Uses Workload Identity or Managed Identity. Set the `endpoint` in `extraConfiguration` instead of providing a connection string. Requires the `Storage Blob Data Contributor` RBAC role on the storage account.

### Connection string authentication

This example uses a connection string stored in a Kubernetes secret.

```yaml
global:
  documentStore:
    activeStoreId: "az1" # must match the store instance ID in extraConfiguration
    type:
      azure:
        connectionString:
          secret:
            existingSecret: "azure-storage-credentials"
            existingSecretKey: "connection-string"

orchestration:
  extraConfiguration:
    - file: azure-documentstore.yaml
      content: |
        camunda:
          document:
            azure:
              az1: # store instance ID — must match activeStoreId
                container-name: my-container

connectors:
  extraConfiguration:
    - file: azure-documentstore.yaml
      content: |
        camunda:
          document:
            azure:
              az1: # store instance ID — must match activeStoreId
                container-name: my-container
```

### Managed Identity/DefaultAzureCredential

When using AKS Workload Identity or Managed Identity, omit the connection string secret and set the `endpoint` instead:

```yaml
global:
  documentStore:
    activeStoreId: "az1" # must match the store instance ID in extraConfiguration
    # No connectionString secret needed — DefaultAzureCredential handles auth

orchestration:
  extraConfiguration:
    - file: azure-documentstore.yaml
      content: |
        camunda:
          document:
            azure:
              az1: # store instance ID — must match activeStoreId
                container-name: my-container
                endpoint: https://myaccount.blob.core.windows.net

connectors:
  extraConfiguration:
    - file: azure-documentstore.yaml
      content: |
        camunda:
          document:
            azure:
              az1: # store instance ID — must match activeStoreId
                container-name: my-container
                endpoint: https://myaccount.blob.core.windows.net
```

## Startup validation

The application validates the Document Store configuration at startup and fails with a clear error message in the following cases:

- **Duplicate store IDs across namespaces**: Each store instance ID must be unique across all provider namespaces (`aws`, `gcp`, `azure`, `local`, `in-memory`).
- **Missing required fields**: Required properties (for example, `bucket-name` for AWS or `container-name` for Azure) must be set.
- **Unknown `default-store-id`**: The value of `camunda.document.default-store-id` (or `activeStoreId` in Helm values) must match a configured store instance ID.
