---
id: use-cases
title: Use cases
description: "Learn how to upload a document to a BPMN process, display and download a document in a user task, and send a document to an external system via a connector."
keywords: ["document handling"]
---

import DocCardList from '@theme/DocCardList';

Offering robust [document handling](/components/document-handling/getting-started.md) capabilities within Camunda 8, users can efficiently manage large volumes of binary data such as PDFs and images across both development and production environments in SaaS and Self-Managed.

In this section we will cover three main use cases:

- [Upload a document to a BPMN process](/components/document-handling/upload-document-to-bpmn-process.md)
- [Display and download a document](/components/document-handling/display-and-download-document.md)
- [Send a document to an external system via a connector](/components/document-handling/send-document-to-external-system.md)

## Two paths for document handling

When a document flows through a process, it follows one of two paths. Understanding which path you need makes it easier to choose the right connector configuration.

### Path 1: Document Store (opaque pass-through)

The document is a blob that moves through the process. You don't need to read or manipulate its content — you just route it. The process never "looks inside" the file.

Typical examples:

- A webhook receives a PDF, and you upload it to Amazon S3.
- You download an image from Google Cloud Storage and send it via email.

On this path, the document is held in the [Camunda document store](/components/document-handling/getting-started.md) and passed between systems as a reference.

### Path 2: Inline (data the process works with)

The content _is_ actual process data, and it is not stored in the document store. It flows as regular process variables — strings or JSON objects — that happen to be written to or read from an external system. You either:

- **Write it**: construct a `.json`, `.csv`, or `.txt` file from process variables and upload it to storage (for example, an error report built from process data). See [inline documents](/components/document-handling/send-document-to-external-system.md#inline-documents).
- **Read it**: download content from storage as JSON or text and use the values directly in FEEL expressions downstream. See [return formats](/components/document-handling/send-document-to-external-system.md#return-formats).

Path 2 does not involve the document store. It is best suited to smaller text or JSON files, since inline content is bounded by the process variable size limit.

## Automate documents with intelligent document processing

Document handling can be integrated with intelligent document processing (IDP).
This allows you to extract specific data from a high volume of documents using an IDP application, and use the extracted data throughout your BPMN process.

Learn more about this in the IDP documentation:

<DocCardList items={[{type:"link", href:"/docs/next/components/hub/workspace/modeler/idp/idp-example/", label: "IDP integration", docId:"components/hub/workspace/modeler/idp/idp-example"}
]}/>
