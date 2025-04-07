---
id: document-handling
title: "Document handling"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in a SaaS environment."
keywords: ["document handling"]
---

import DocCardList from '@theme/DocCardList';

Camunda 8 SaaS provides built-in support for storing, tracking, and managing documents using Camunda Forms, Connectors, Tasklist, and the [REST API](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx).

Document handling is automatically integrated into each SaaS cluster, allowing you to manage binary data, like PDFs, images and other file types, across development and production environments without needing to configure or maintain storage infrastructure yourself.

## Storage options

### SaaS

Camunda SaaS manages storage for you by integrating with [**Google Cloud Platform (GCP)**](https://cloud.google.com/storage) and [**AWS S3**](https://aws.amazon.com/s3/) bucket storage.

- Each cluster automatically includes one pre-configured storage bucket.
- Camunda 8 clusters hosted on GCP use a GCP bucket; clusters hosted on AWS use an AWS S3 bucket.
- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: 30 days. A custom expiration date can be specified via the [Document upload API](../../apis-tools/camunda-api-rest/specifications/create-document.api.mdx).

### Self-Managed

If you're deploying Camunda in a Self-managed environment, document storage must be configured manually. To learn more, visit the following guides:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/concepts/document-handling/getting-started/", label: "Getting started on Self-Managed", docId:"self-managed/concepts/document-handling/getting-started"},
{type:"link", href:"/docs/next/self-managed/concepts/document-handling/document-storage-configuration/", label: "Storage configuration", docId:"self-managed/concepts/document-handling/document-storage-configuration"}
]}/>

## Use cases and capabilities

Document handling can be beneficial for different process use cases, such as uploading a document to a BPMN process, displaying and downloading a document, sending a document to an external system via a Connector, and automating documents with [intelligent document processing](/components/modeler/web-modeler/idp/idp-example.md).

Step through all of these capabilities in the guide below:

<DocCardList items={[{type:"link", href:"/docs/8.7/guides/document-handling/", label: "Store, track and manage documents", docId:"guides/document-handling"}
]}/>
