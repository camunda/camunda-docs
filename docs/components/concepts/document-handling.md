---
id: document-handling
title: "Document handling"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in a SaaS environment."
keywords: ["document handling"]
---

import DocCardList from '@theme/DocCardList';

Store, track, and manage documents in Camunda 8 using the [Camunda 8 API](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx), Connectors, Forms, and Tasklist.

Offering robust document handling capabilities within Camunda SaaS, users can efficiently manage large volumes of binary data such as PDFs and images across both development and production environments.

## Storage integration and configuration

[**Google Cloud Platform (GCP)**](https://cloud.google.com/storage) and [**AWS S3**](https://aws.amazon.com/s3/) bucket storage integrations are supported on SaaS and handled by Camunda.
Storage is configured for a cluster based on the selected region (either GCP or AWS).

### Storage policies for SaaS

- One bucket per cluster is permitted with SaaS.
- Storage integration is handled and configured by Camunda. While this is not dynamically configurable by the cluster, it is provided as environment configuration.
- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: 30 days.

### Self-Managed environment

Looking for details on document handling for a Self-Managed environment? Visit this guide:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/concepts/document-handling/getting-started/", label: "Guide for Self-Managed", docId:"self-managed/concepts/document-handling/getting-started"}
]}/>

## Use cases and capabilities

Document handling can be beneficial for different process use cases, such as uploading a document to a BPMN process, displaying and downloading a document, sending a document to an external system via a Connector, and automating documents with [intelligent document processing](/components/modeler/web-modeler/idp/idp-example.md).

Step through all of these capabilities in the guide below:

<DocCardList items={[{type:"link", href:"/docs/next/guides/document-handling/", label: "Store, track and manage documents", docId:"guides/document-handling"}
]}/>
