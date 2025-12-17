---
title: Document handling configuration
description: "Learn more about storage configuration options like Google Cloud Platform, AWS S3, local folders, and in-memory."
keywords: ["document handling", "document storage configuration"]
---

Camunda supports multiple storage options for handling documents in Self-Managed environments. Depending on your deployment setup and production requirements, you can choose from cloud-based, local, or in-memory storage methods.

The following section outlines supported storage options, their intended use cases, and configuration guidance.

Jump to the environment configuration options below:

- [Camunda 8 Run](/self-managed/concepts/document-handling/configuration/camunda-8-run.md)
- [Docker Compose](/self-managed/concepts/document-handling/configuration/docker.md)
- [Helm](/self-managed/concepts/document-handling/configuration/helm.md)

:::note

Camunda 8 Run is a fast way for users to test the capabilities of the platform, but it is not necessarily scalable. Docker Compose is not recommended for use in production. Therefore, Helm is currently the **only** option to deploy the platform in a Self-Managed environment for production.

:::

## Supported storage options

- By using **external cloud file bucket storages**, documents can be stored in a secure, and scalable way. Buckets are integrated per cluster to ensure proper isolation and environment-specific management. The following file bucket storages are supported:
  - [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage)
  - [**AWS S3**](https://aws.amazon.com/s3/).
  - Configuring these buckets is supported in [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md), [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), and [Helm](/self-managed/deployment/helm/install/quick-install.md).
- **Local storage** can be configured for a cluster to store documents in a local folder.
  - It can be used only for local development with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md).
  - Local storage is not suitable for production use, as pods and file paths are not shared across components. This prevents components like Tasklist and Zeebe from accessing the same data. Files are stored locally, and their retention must be managed manually.
  - If you're using a container image and a mounted volume for your storage, you can use the path `/usr/local/camunda/documents` as the mount path, as it will already have the right permissions for the Camunda process to read and write to it.
- **In-memory** storage can be used to store documents during the application's runtime. When the application is stopped, documents are lost.
  - It can be used with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md), [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) and [Helm](/self-managed/deployment/helm/install/quick-install.md).
  - In-memory storage is not suitable for production use, as pods and memory are not shared across components. Files stored in memory are not persisted and will be lost on application restart.

## Storage policies

- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: With Self-Managed, users may define their own lifecycle policies. A custom expiration date can be specified via metadata for each document. The [document upload API](/apis-tools/orchestration-cluster-api-rest/specifications/create-document.api.mdx) allows this. For forms, this defaults to the cluster configuration as there is no set custom TTL for forms.
