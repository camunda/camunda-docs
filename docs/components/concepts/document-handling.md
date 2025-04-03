---
id: document-handling
title: "Document handling"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in a SaaS environment."
keywords: ["document handling"]
---

import DocCardList from '@theme/DocCardList';

:::note
Looking for details on document handling for a Self-Managed environment? Visit the [Self-Managed documentation](/self-managed/concepts/document-handling/overview.md).
:::

Store, track, and manage documents in Camunda 8 using the [Camunda 8 API](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx), Connectors, Forms, and Tasklist.

Offering more robust document handling capabilities within Camunda SaaS, users can efficiently manage large volumes of binary data such as PDFs and images across both development and production environments.

## Storage integration and configuration

A [**Google Cloud Platform**](https://cloud.google.com/storage) and [**AWS S3**](https://aws.amazon.com/s3/) bucket storage integration is configured for SaaS and handled by Camunda.

### Limitations

- One bucket per cluster is permitted with SaaS.
- This storage integration is handled and configured by Camunda. While this is not dynamically configurable by the cluster, it is provided as environment configuration.
- **Maximum upload size for one or multiple files**: 10 MB
- **File expiration time/time-to-live (TTL) policy**: 30 days by default. Clients for Connectors and Forms may specify a custom expiration date when uploading documents.

## Use cases and capabilities

Document handling can be beneficial for different process use cases. Step through all of its capabilities in this guide:

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
