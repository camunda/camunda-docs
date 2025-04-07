---
id: getting-started
title: "Getting started with document handling"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in Self-Managed."
keywords: ["document handling", "storage configuration"]
---

import DocCardList from '@theme/DocCardList';

Camunda 8 Self-Managed supports document storage and management using Camunda Forms, Connectors, Tasklist, and the [REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx).

You can store, track, and manage binary data, like PDFs, images and other file types, across development and production environments.

Storage must be configured according to your infrastructure and operational needs.

## Storage integration and configuration

You can configure document storage based on your deployment setup and production requirements.
Supported options include an external cloud storage such as Google Cloud Platform (GCP) or AWS S3, local file storage or an in-memory storage.

Learn how to set it up in the [storage configuration guide](configuration.md).

## Use cases and capabilities

Document handling can be beneficial for different process use cases, such as uploading a document to a BPMN process, displaying and downloading a document, sending a document to an external system via a Connector, and automating documents with [intelligent document processing](/components/modeler/web-modeler/idp/idp-example.md).

Step through all of these capabilities in the guide below:

<DocCardList items={[{type:"link", href:"/docs/8.7/guides/document-handling/", label: "Store, track and manage documents", docId:"guides/document-handling"}
]}/>
