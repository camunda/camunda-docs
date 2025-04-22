---
id: storage-options
title: "Storage options"
description: "Understand how Camunda SaaS manages storage for you, how you can configure storage options for Self-Managed environments, and limitations."
keywords: ["document handling"]
---

## SaaS

Camunda SaaS manages storage for you by integrating with [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage) and [**AWS S3**](https://aws.amazon.com/s3/) bucket storage.

- Each cluster automatically includes one pre-configured storage bucket.
- Clusters hosted on GCP use a GCP bucket; clusters hosted on AWS use an AWS S3 bucket.
- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: 30 days. A custom expiration date can be specified via the [document upload API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx).

## Self-Managed

If you're deploying Camunda in a Self-Managed environment, document storage must be configured manually. To learn more, visit the [Self-Managed configuration docs](/self-managed/concepts/document-handling/configuration/overview.md).
