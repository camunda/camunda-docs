---
id: agentic-ai-aiagent-documents
sidebar_label: Document support
title: AI Agent document support
description: How the AI Agent connector passes documents and images to the LLM.
---

The AI Agent connector can pass [Camunda documents](/self-managed/concepts/document-handling/overview.md) to the LLM
from two sources:

- The [user prompt](./agentic-ai-aiagent-subprocess.md#user-prompt) **Documents** field.
- [Tool call results](./agentic-ai-aiagent-tool-definitions.md#tool-call-responses) and event payloads from event sub-processes.

In both cases, supported documents are resolved and passed to the LLM as native content blocks so the model can
interpret them directly.

## Supported document types

Because file type support varies by LLM provider and model, you must test your document use case with the provider you are using.

| File type         | Supported | Description                                                                                                                                                                        |
| :---------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text              | Yes       | Text files (MIME types matching `text/*`, `application/xml`, `application/json`, or `application/yaml`) are passed as plain text content blocks.                                   |
| PDF               | Yes       | PDF files (MIME types matching `application/pdf`) are passed as base64 encoded content blocks.                                                                                     |
| Image             | Yes       | Image files (MIME types matching `image/jpeg`, `image/png`, `image/gif`, or `image/webp`) are passed as base64 encoded content blocks.                                             |
| Audio/video/other | No        | Audio and video files are not currently supported, and will result in an error if passed. All other unsupported file types not listed here will also result in an error if passed. |

:::info
To learn more about storing, tracking, and managing documents in Camunda 8, see [document handling](/components/document-handling/getting-started.md).
:::

## Documents in the user prompt

Use the [user prompt](./agentic-ai-aiagent-subprocess.md#user-prompt) **Documents** field to add a list of document
references the agent can interact with. The list is internally resolved and passed to the LLM if the document type is
supported.

LLM APIs allow the user prompt to be specified as a list of content blocks. Each supported document reference is
resolved to a corresponding content block and passed as part of the user message. For examples of how LLM providers
accept document content blocks, refer to the
[Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/vision#base64-encoded-image-example) and
[OpenAI](https://platform.openai.com/docs/guides/images-vision#giving-a-model-images-as-input) documentation.

## Documents in tool call results

[Tool call responses](./agentic-ai-aiagent-tool-definitions.md#tool-call-responses) can contain document references nested anywhere within the result structure.

The agent extracts these documents from the tool call result and passes them to the LLM as native content blocks (plain text for text files, base64 encoded content for PDFs and images). This is the same mechanism used for user prompt documents.

In the conversation, the tool call result itself retains a lightweight document _reference_ (for example, the document ID and store, or an external URL). The resolved document content is delivered in a separate follow-up user message immediately after the tool result, allowing the model to correlate each reference with its content.

For example, a tool can return a document for the LLM to analyze:

- A [REST connector](/components/connectors/protocol/rest.md) tool with the **Store response** option enabled downloads a PDF document.
- A user task tool with a [Filepicker](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) form lets a person upload a document as part of a human-in-the-loop workflow.
