---
id: helm
sidebar_label: "Helm"
title: "Document handling configuration in Helm"
description: "Learn more about storage configuration options for Helm setups."
keywords: ["document handling", "document storage configuration"]
---

Helm offers external cloud file bucket storage options (recommended for production use when deploying with Helm) and in-memory storage (not suitable for production use):

- By using **external cloud file bucket storage options**, documents can be stored in a secure, and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management. The following file bucket storage options are supported:

  - [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage)
  - [**AWS S3**](https://aws.amazon.com/s3/).

- **In-memory** storage can be used to store documents during the application's runtime. When the application is stopped, documents are lost. In-memory storage is not suitable for production use, as pods and memory are not shared across components. Files stored in memory are not persisted and will be lost on application restart.

If no storage configuration is provided, the default document storage is in-memory. However, in-memory storage is not supported in production environments, so a configuration update is required. This is because memory is not shared between pods or components, preventing services like Tasklist and Zeebe from accessing the same data. Additionally, all uploaded files are lost when the application restarts.

To change the storage to **Google Cloud Platform** or **AWS S3**, update the `values.yaml` file with a storage configuration parameters.

Below is an example of storage configuration. While this example mixes GCP, AWS, and in-memory, this example represents part of the [default Helm chart values](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.7/values.yaml). This example demonstrates the current default values and what they would need to change to enable the storage type of their preference:

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
