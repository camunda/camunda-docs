---
id: document-handling
title: "Getting started"
description: "Learn more about integration, secure management, and efficient storage and retrieval of documents across development and production environments in Self-Managed."
keywords: ["document handling"]
---

Store, track, and manage documents in Camunda 8 using the [Camunda 8 API](/apis-tools/camunda-api-rest/specifications/create-documents.api.mdx), Connectors, Forms, and Tasklist.

Offering more robust document handling capabilities within Camunda Self-Managed, users can efficiently manage large volumes of binary data such as PDFs and images across both development and production environments.

## Storage integration and configuration

Review all storage integration and configuration options in the [configuration documentation](/self-managed/concepts/document-handling/configuration.md).

## Use cases and capabilities

Document handling may be beneficial for several use cases. For example:

- **Upload a document via the inbound webhook Connector**, and later retrieve the document content in another Connector invocation to store it in a third-party system.
- **Upload a document via a form**, including start forms and user task forms.
- **Reference a document in an outbound Connector**, such as Amazon Bedrock, REST, Slack, and more.
- **Display a document in a user task**

Step through all of these capabilities in our [document handling guide](/guides/document-handling.md). Below, take a closer look at all supported outbound Connectors.

:::note
Document handling can also be used with intelligent document processing (IDP). For example, a published document extraction template can be used to extract data from a document uploaded via Tasklist. Learn more in the [IDP documentation](/components/modeler/web-modeler/idp/idp-example.md).
:::

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
