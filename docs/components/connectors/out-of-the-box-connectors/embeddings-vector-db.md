---
id: embeddings-vector-db
title: Vector Database Connector
sidebar_label: Vector Database
description: Embed, store and retrieve LLM embeddings and store them into vector databases.
---

The **Vector Database Connector** allows embedding, storing and retrieving Large Language Model (LLM) embeddings. This enables building
AI-based solutions for your organizations, such as context document search, long-term LLM memory and/or agentic AI interaction.

:::note
The **Vector Database Connector** uses the [Langchain4J](https://docs.langchain4j.dev/) library. Data models and possible implementations are limited
to the latest stable released Langchain4j library.
:::

## Prerequisites

Before using the **Vector Database Connector**, it is highly recommended to understand the
[concept of LLM embeddings](https://huggingface.co/spaces/hesamation/primer-llm-embedding).

To start using the **Vector Database Connector**, you need to have access to a supported LLM embeddings API to convert
documents content into vectorized embeddings form. You will also need to have write access to a supported databases.

## Create a Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Operations

### Embed document

The **Embed document** operation performs the following steps: [consumes a document](#embedding-document-configuration),
parses it depending on a file format, optionally [splits into text chunks](#splitting), converts chunks into a vector form
with an LLM help, and finally, stores produced vectors into a vector database.

To perform this operation, enter the following:

- **Operation** dropdown: **Embed document**.
- **Embedding model** section: refer to the [relevant section](#embedding-models).
- **Vector store** section: refer to the [relevant section](#vector-stores).
- **Document** section: refer to the [relevant section](#embedding-document-configuration).

As a result of this operation you will get an array of created embeddings chunks IDs,
e.g. `["d599ec62-fe51-4a91-bbf0-26e1241f9079", "a1fad021-5148-42b4-aa02-7de9d590e69c"]`.

### Retrieve document

The **Retrieve document** operation perform the following steps: consumes a query, converts it into a vector form with
an LLM help, performs a vector similarity search on previously stored LLM embeddings, and then stores results into
Camunda document storage.

To perform this operation, enter the following:

- **Operation** dropdown: **Retrieve document**.
- **Search query** input field: enter your search query.
- **Max results** input field: enter maximum amount of returned results.
- **Min score** input field: enter the lowest score threshold similarity value; the value should be between 0 and 1, e.g. 0.81.
- **Embedding model** section: refer to the [relevant section](#embedding-models).
- **Vector store** section: refer to the [relevant section](#vector-stores).

As a result of this operation you will get an array of relevant chunks, where each includes a [chunk ID](#splitting),
Camunda document reference metadata, similarity score, and the actual text content.

```json
{
  "chunks": [
    {
      "chunkId": "e30d570b-2a3a-4f4a-9a0c-78f0f1acd383",
      "documentReference": {
        "storeId": "local",
        "documentId": "2b36ec67-a78f-4f99-9371-8c6e5b332838",
        "contentHash": "1c232bc1e553c10d00c3327dcca9012b6b4b0758a1c2afaad8b77c80fa1bd36e",
        "metadata": {
          "size": 116,
          "fileName": null,
          "processDefinitionId": null,
          "processInstanceKey": null,
          "customProperties": {},
          "expiresAt": null,
          "contentType": "text/plain"
        },
        "camunda.document.type": "camunda"
      },
      "score": 0.6721556,
      "content": "Camunda is a platform for orchestrating and automating business processes. It helps organizations design, execute, and manage workflows, enabling them to optimize processes and improve efficiency."
    }
  ]
}
```

## Embedding models

### Amazon Bedrock

The **Vector Database Connector** currently supports only [Amazon Titan V1/V2 models](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html).
Please see the [official Amazon documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-titan-embed-text.html)
that will explain what are and how to choose request parameters.

The **Vector Database Connector** uses [Langchain4J implementation](https://docs.langchain4j.dev/integrations/embedding-models/amazon-bedrock).

## Vector stores

### Elasticsearch

The **Vector Database Connector** can use Elasticsearch as a vector store. The Elasticsearch version must be 8+.

Enter the following parameters:

- **Base URL**: the Elasticsearch base URL, including protocol, i.e. `https://host:port`.
- **Username**: for the Elasticsearch user that has read/write access.
- **Password**: for the Elasticsearch user that has read/write access.
- **Index name**: name of the index where you wish to store embeddings.
- - When embedding: if index is not present, the Connector will create a new one.
- - When retrieving: if the index is absent, the Connector will raise an error.

### Amazon Managed OpenSearch

- **Access key** and **Secret key**: enter AWS IAM credential for the user that has read/write access.
- **Server URL**: is an Amazon Managed OpenSearch URL _without_ protocol, i.e. `my-opensearch.aws.com:port`.
- **Region**: of the Amazon Managed OpenSearch instance.
- **Index name**: name of the index where you wish to store embeddings.
- - When embedding: if index is not present, the Connector will create a new one.
- - When retrieving: if the index is absent, the Connector will raise an error.

## Embedding document configuration

### Document source

The **Document source** can be either a **Plain text** or a **Camunda document**.

The **Plain text** can be useful when you deal with small size data that can fit into a text field or a process instance variable.
Input will be handled as a regular UTF-8 text.

Hint: a FEEL [string conversion function](/components/modeler/feel/builtin-functions/feel-built-in-functions-conversion/#stringfrom) might be useful if you have JSON input.

The **Camunda document** might be useful when you deal with larger documents pipelines that come either from
[webhook or user tasks](/guides/document-handling). Input documents will be parsed with [Apache Tika](https://tika.apache.org/), hence files
can be of any Apache Tika supported formats.

### Splitting

**Splitting** is an action of breaking large documents into smaller pieces. It can be either recursive or no splitting
at all. Please seek guidance from your local data scientist to make a decision whether you require splitting.

Learn more about splitting at the [Langchain4j documentation page](https://docs.langchain4j.dev/tutorials/rag#document-splitter).
