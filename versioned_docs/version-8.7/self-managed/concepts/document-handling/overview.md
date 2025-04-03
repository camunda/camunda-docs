---
id: document-handling
title: "Getting started"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in Self-Managed."
keywords: ["document handling"]
---

import DocCardList from '@theme/DocCardList';

Store, track, and manage documents in Camunda 8 using the [Camunda 8 API](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx), Connectors, Forms, and Tasklist.

Offering more robust document handling capabilities within Camunda SaaS, users can efficiently manage large volumes of binary data such as PDFs and images across both development and production environments.

## Storage integration and configuration

Review all storage integration and configuration options in the [configuration documentation](/self-managed/concepts/document-handling/configuration.md).

## Use cases and capabilities

Document handling can be beneficial for different process use cases, such as uploading a document to a BPMN process, displaying and downloading a document, sending a document to an external system via a Connector, and automating documents with [intelligent document processing](/components/modeler/web-modeler/idp/).

Step through all of these capabilities in the guide below:

<DocCardList items={[{type:"link", href:"/docs/next/guides/document-handling/", label: "Store, track and manage documents", docId:"guides/document-handling"}
]}/>

## Supported outbound Connectors

| Connector                                                                               | Document handling support                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md)    | Supports consuming documents as inputs for conversations. Review the **Document** field in the properties panel where the document reference can be provided.                                                                  |
| [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md)              | Supports uploading documents from (or downloading documents to) the Camunda document store. Review the **Document** field in the properties panel where the document reference can be provided.                                |
| [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md)  | Can read the input document directly from the Camunda document store. Review the **Document** field in the properties panel where the document reference can be provided.                                                      |
| [Box](/components/connectors/out-of-the-box-connectors/box.md)                          | Supports uploading documents from (or downloading documents to) the Camunda document store. Review the **Document** field in the properties panel where the document reference can be provided.                                |
| [Email](/components/connectors/out-of-the-box-connectors/email.md#response-structure-1) | Supports sending Camunda documents as attachments, or storing incoming attachments as Camunda documents. These documents are automatically stored in the Camunda document store and available to map in the result expression. |
| [Google Drive](/components/connectors/out-of-the-box-connectors/googledrive.md)         | Supports document upload and download.                                                                                                                                                                                         |
| [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md)  | Supports sending documents to channels.                                                                                                                                                                                        |
| [REST](/components/connectors/protocol/rest.md)                                         | Supports storing the response as a document.                                                                                                                                                                                   |
| [SendGrid](/components/connectors/out-of-the-box-connectors/sendgrid.md)                | Provides attachment support.                                                                                                                                                                                                   |
| [Slack](/components/connectors/out-of-the-box-connectors/slack.md)                      | Supports adding attachments and increasing template versions.                                                                                                                                                                  |
