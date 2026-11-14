---
id: embeddings-vector-db
title: Vector Database connector
sidebar_label: Vector Database
description: Embed, store, and retrieve LLM embeddings and store them in vector databases.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Embed documents into a vector database and retrieve them by similarity search to give your process context documents and long-term LLM memory.

## About this connector

The **Vector Database connector** embeds, stores, and retrieves Large Language Model (LLM) embeddings. This enables building AI-based solutions for your organizations, such as context document search, long-term LLM memory, and agentic AI interaction.

The connector supports two operations:

- **Embed document**: Converts a document or text into vectors with an embedding model and stores them in a vector store.
- **Retrieve document**: Converts a query into a vector and searches the vector store for similar chunks.

:::note
The connector uses the [LangChain4j](https://docs.langchain4j.dev/) library. Data models and possible implementations are limited to the latest stable released LangChain4j library.
:::

## Prerequisites

Before using this connector, make sure you understand the [concept of LLM embeddings](https://huggingface.co/spaces/hesamation/primer-llm-embedding).

You also need:

- Access to a supported LLM embeddings API to convert document content into vectorized embedding form.
- Write access to a supported vector store.

## Create a connector task

<ConnectorTask/>

## Configuration

Every operation needs an embedding model and a vector store. Select the **Operation** first, then configure the **Embedding model** and **Vector store** properties.

| Property  | Type     | Required | Description                                                                                                       | Example |
| :-------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------- | :------ |
| Operation | Dropdown | Yes      | The operation to run: **Embed document** or **Retrieve document**. The template default is **Retrieve document**. |         |

### Embedding models

Select an embedding model provider, then configure the properties for that provider.

| Property       | Type     | Required | Description                                                                                                                                            | Example |
| :------------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Model provider | Dropdown | Yes      | The embedding model provider. The options are **AWS Bedrock**, **Azure OpenAI**, **Google Vertex AI**, and **OpenAI**. The default is **AWS Bedrock**. |         |

#### Amazon Bedrock

The connector supports [Amazon Titan V1 and V2 models](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html). You can also specify any custom model that supports text embedding and is available in your Amazon Bedrock account.

| Property             | Type     | Required | Description                                                                                                                                                                                                                                                                      | Example                        |
| :------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| Access key           | String   | Yes      | Access key for a user with permissions for the Amazon Bedrock `InvokeModel` action.                                                                                                                                                                                              |                                |
| Secret key           | String   | Yes      | Secret key for the user associated with the access key.                                                                                                                                                                                                                          |                                |
| Region               | String   | Yes      | AWS region where the model is hosted. See [AWS model region support](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html).                                                                                                                                  | `us-east-1`                    |
| Model name           | Dropdown | Yes      | The embedding model to use: `amazon.titan-embed-text-v1`, `amazon.titan-embed-text-v2:0`, or **Custom**. Defaults to `amazon.titan-embed-text-v2:0`.                                                                                                                             | `amazon.titan-embed-text-v2:0` |
| Custom model name    | String   | Yes      | Name of your custom Amazon Bedrock embedding model. Shown when **Model name** is **Custom**.                                                                                                                                                                                     |                                |
| Embedding dimensions | Dropdown | Yes      | Number of dimensions of the embedding vector: `256`, `512`, or `1024`. Defaults to `1024`. Shown when **Model name** is `amazon.titan-embed-text-v2:0`.                                                                                                                          | `1024`                         |
| Normalize            | Boolean  | Yes      | Whether to normalize the embedding vector. Defaults to `false`. Shown when **Model name** is `amazon.titan-embed-text-v2:0`. See the [AWS blog](https://aws.amazon.com/blogs/aws/amazon-titan-text-v2-now-available-in-amazon-bedrock-optimized-for-improving-rag/) for details. |                                |
| Max retries          | Number   | Yes      | Maximum number of retries for the embedding request if it fails. Defaults to `3`.                                                                                                                                                                                                | `3`                            |

#### Azure OpenAI

| Property              | Type     | Required | Description                                                                                                                                                                | Example                                          |
| :-------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| Endpoint              | String   | Yes      | The Azure OpenAI endpoint URL.                                                                                                                                             | `https://<your-resource-name>.openai.azure.com/` |
| Authentication        | Dropdown | Yes      | The authentication type: **API key** or **Client credentials**. Defaults to **API key**.                                                                                   |                                                  |
| API key               | String   | Yes      | An Azure OpenAI API key from the [Azure AI Foundry portal](https://ai.azure.com/). Shown when **Authentication** is **API key**.                                           |                                                  |
| Client ID             | String   | Yes      | The Microsoft Entra application ID. Shown when **Authentication** is **Client credentials**.                                                                               |                                                  |
| Client secret         | String   | Yes      | The client secret of the Microsoft Entra application. Shown when **Authentication** is **Client credentials**.                                                             |                                                  |
| Tenant ID             | String   | Yes      | The Microsoft Entra tenant ID. Shown when **Authentication** is **Client credentials**.                                                                                    |                                                  |
| Authority host        | String   | No       | The authority host URL. Can also be an OAuth 2.0 token endpoint. Defaults to `https://login.microsoftonline.com`. Shown when **Authentication** is **Client credentials**. |                                                  |
| Model deployment name | String   | Yes      | The name of the model deployment.                                                                                                                                          |                                                  |
| Embedding dimensions  | Number   | No       | Number of dimensions of the embedding vector. If you don't specify a value, the default of the selected model is used.                                                     |                                                  |
| Max retries           | Number   | No       | Maximum number of retries for the embedding request if it fails. Defaults to `3`.                                                                                          | `3`                                              |
| Custom headers        | String   | No       | Map of custom HTTP headers to add to the request.                                                                                                                          |                                                  |

Client credentials authentication requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908).

#### Google Vertex AI

| Property                        | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                  | Example  |
| :------------------------------ | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| Project ID                      | String   | Yes      | The Google Cloud project ID.                                                                                                                                                                                                                                                                                                                                                                                                 |          |
| Region                          | String   | Yes      | The [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) where AI inference takes place.                                                                                                                                                                                                                                                                                                 |          |
| Authentication                  | Dropdown | Yes      | The authentication type: **Service account credentials** or **Application default credentials (Hybrid/Self-Managed only)**. Defaults to **Service account credentials**. Application default credentials (ADC) use the default credentials available in your environment. To set up ADC in a local development environment, see [set up ADC](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment). |          |
| JSON key of the service account | String   | Yes      | The key of a [service account](https://cloud.google.com/iam/docs/service-account-overview) in JSON format. Shown when **Authentication** is **Service account credentials**.                                                                                                                                                                                                                                                 |          |
| Model name                      | String   | Yes      | The Vertex AI embedding model. See the [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings) for available models.                                                                                                                                                                                                                                                                     |          |
| Embedding dimensions            | Number   | Yes      | Number of dimensions of the embedding vector. See the documentation of the selected model for valid values.                                                                                                                                                                                                                                                                                                                  |          |
| Publisher                       | String   | No       | The publisher of the Vertex AI model. Defaults to `google`.                                                                                                                                                                                                                                                                                                                                                                  | `google` |
| Max retries                     | Number   | No       | Maximum number of retries for the embedding request if it fails. Defaults to `3`.                                                                                                                                                                                                                                                                                                                                            | `3`      |

#### OpenAI

| Property             | Type   | Required | Description                                                                                                                                      | Example |
| :------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| OpenAI API key       | String | Yes      | Your OpenAI account API key for authorization.                                                                                                   |         |
| Model name           | String | Yes      | The OpenAI model to use for embeddings. See the [OpenAI documentation](https://platform.openai.com/docs/guides/embeddings) for available models. |         |
| Organization ID      | String | No       | For projects accessed through a legacy user API key, the organization ID to use for API requests with this connector.                            |         |
| Project ID           | String | No       | For projects accessed through a legacy user API key, the project ID to use for API requests with this connector.                                 |         |
| Embedding dimensions | Number | No       | Number of dimensions of the embedding vector. If you don't specify a value, the default of the selected model is used.                           |         |
| Max retries          | Number | No       | Maximum number of retries for the embedding request if it fails. Defaults to `3`.                                                                | `3`     |
| Custom headers       | String | No       | Map of custom HTTP headers to add to the request.                                                                                                |         |
| Custom base URL      | String | No       | Base URL for API requests when you use a custom OpenAI endpoint. Defaults to `https://api.openai.com/v1/`.                                       |         |

### Vector stores

Select a vector store, then configure the properties for that store.

| Property         | Type     | Required | Description                                                                                                                                                                               | Example |
| :--------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Embeddings store | Dropdown | Yes      | The vector store. The options are **Amazon Managed OpenSearch**, **Azure AI Search**, **Azure Cosmos DB NoSQL**, **Elasticsearch**, and **OpenSearch**. The default is **Elasticsearch**. |         |

#### Amazon Managed OpenSearch

| Property   | Type   | Required | Description                                                                                                                                                                                         | Example                      |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| Access key | String | Yes      | AWS IAM access key of a user with read/write access.                                                                                                                                                |                              |
| Secret key | String | Yes      | Secret key associated with the access key.                                                                                                                                                          |                              |
| Server URL | String | Yes      | The Amazon OpenSearch URL without protocol.                                                                                                                                                         | `my-opensearch.aws.com:port` |
| Region     | String | Yes      | Region of the Amazon OpenSearch instance.                                                                                                                                                           |                              |
| Index name | String | Yes      | Name of the index where you want to store embeddings. When embedding, the connector creates a new index if it doesn't exist. When retrieving, the connector raises an error if the index is absent. |                              |

#### Azure AI Search

| Property       | Type     | Required | Description                                                                                                                                                                | Example                                            |
| :------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| Endpoint       | String   | Yes      | The Azure AI Search endpoint URL.                                                                                                                                          | `https://<your-resource-name>.search.windows.net/` |
| Authentication | Dropdown | Yes      | The authentication type: **API key** or **Client credentials**. Defaults to **API key**.                                                                                   |                                                    |
| API key        | String   | Yes      | An Azure AI Search key. Shown when **Authentication** is **API key**.                                                                                                      |                                                    |
| Client ID      | String   | Yes      | The Microsoft Entra application ID. Shown when **Authentication** is **Client credentials**.                                                                               |                                                    |
| Client secret  | String   | Yes      | The client secret of the Microsoft Entra application. Shown when **Authentication** is **Client credentials**.                                                             |                                                    |
| Tenant ID      | String   | Yes      | The Microsoft Entra tenant ID. Shown when **Authentication** is **Client credentials**.                                                                                    |                                                    |
| Authority host | String   | No       | The authority host URL. Can also be an OAuth 2.0 token endpoint. Defaults to `https://login.microsoftonline.com`. Shown when **Authentication** is **Client credentials**. |                                                    |
| Index name     | String   | Yes      | Name of the search index. When embedding, the connector creates the index if it doesn't exist. When retrieving, the connector raises an error if the index is absent.      |                                                    |

Client credentials authentication requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908) and assigning the [required roles](https://learn.microsoft.com/en-us/azure/search/search-security-rbac). You must explicitly enable role-based access control for the Azure AI Search resource.

#### Azure Cosmos DB NoSQL

| Property          | Type     | Required | Description                                                                                                                                                                | Example                                             |
| :---------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Endpoint          | String   | Yes      | The Azure Cosmos DB NoSQL endpoint URL.                                                                                                                                    | `https://<your-resource-name>.documents.azure.com/` |
| Authentication    | Dropdown | Yes      | The authentication type: **API key** or **Client credentials**. Defaults to **API key**.                                                                                   |                                                     |
| API key           | String   | Yes      | An Azure Cosmos DB key. Shown when **Authentication** is **API key**.                                                                                                      |                                                     |
| Client ID         | String   | Yes      | The Microsoft Entra application ID. Shown when **Authentication** is **Client credentials**.                                                                               |                                                     |
| Client secret     | String   | Yes      | The client secret of the Microsoft Entra application. Shown when **Authentication** is **Client credentials**.                                                             |                                                     |
| Tenant ID         | String   | Yes      | The Microsoft Entra tenant ID. Shown when **Authentication** is **Client credentials**.                                                                                    |                                                     |
| Authority host    | String   | No       | The authority host URL. Can also be an OAuth 2.0 token endpoint. Defaults to `https://login.microsoftonline.com`. Shown when **Authentication** is **Client credentials**. |                                                     |
| Database name     | String   | Yes      | The name of the Azure Cosmos DB NoSQL database.                                                                                                                            |                                                     |
| Container name    | String   | Yes      | The name of the Azure Cosmos DB NoSQL container. The container must already exist and have an `/id` partition key.                                                         |                                                     |
| Consistency level | Dropdown | Yes      | The consistency level for the container: **Strong**, **Bounded Staleness**, **Session**, **Consistent Prefix**, or **Eventual**. Defaults to **Eventual**.                 |                                                     |
| Distance function | Dropdown | Yes      | The distance function for vector similarity search: **Euclidean**, **Cosine**, or **Dot Product**. Defaults to **Cosine**.                                                 |                                                     |
| Vector index type | Dropdown | Yes      | The vector index type: **Flat**, **Quantized Flat**, or **DiskANN**. Defaults to **Flat**.                                                                                 |                                                     |

Client credentials authentication requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908).

For more information about Azure Cosmos DB NoSQL vector search, refer to the [official documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/vector-search). Pay special attention to the vector dimensions limitations.

#### Elasticsearch

The Elasticsearch version must be 8 or later.

| Property   | Type   | Required | Description                                                                                                                                                                                         | Example             |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| Base URL   | String | Yes      | The Elasticsearch base URL, including protocol.                                                                                                                                                     | `https://host:port` |
| Username   | String | Yes      | The Elasticsearch user with read/write access.                                                                                                                                                      |                     |
| Password   | String | Yes      | The password of the Elasticsearch user.                                                                                                                                                             |                     |
| Index name | String | Yes      | Name of the index where you want to store embeddings. When embedding, the connector creates a new index if it doesn't exist. When retrieving, the connector raises an error if the index is absent. |                     |

#### OpenSearch

| Property   | Type   | Required | Description                                                                                                                                                                                         | Example             |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| Base URL   | String | Yes      | The OpenSearch base URL, including protocol.                                                                                                                                                        | `https://host:port` |
| Username   | String | Yes      | The OpenSearch user with read/write access.                                                                                                                                                         |                     |
| Password   | String | Yes      | The password of the OpenSearch user.                                                                                                                                                                |                     |
| Index name | String | Yes      | Name of the index where you want to store embeddings. When embedding, the connector creates a new index if it doesn't exist. When retrieving, the connector raises an error if the index is absent. |                     |

## Operations

### Embed document

Embed a document or plain text into the vector store. The operation performs the following steps:

1. Consumes a document.
1. Parses the document depending on its file format and optionally splits it into text chunks.
1. Converts the chunks into vectors with the embedding model.
1. Stores the vectors in the vector store.

#### Input parameters

Select **Embed document** in the **Operation** dropdown, then configure the [embedding model](#embedding-models) and the [vector store](#vector-stores). The following properties are specific to this operation.

| Property                    | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                           | Example |
| :-------------------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Document source             | Dropdown | Yes      | Whether to embed a **Camunda document** or **Plain text**. Defaults to **Camunda document**.                                                                                                                                                                                                                                                                                                          |         |
| Plain text to embed         | String   | Yes      | The text to embed, handled as regular UTF-8 text. Shown when **Document source** is **Plain text**. Use plain text for small data that fits into a text field or a process variable. If you have JSON input, a FEEL [string conversion function](/components/modeler/feel/builtin-functions/feel-built-in-functions-conversion.md#stringfrom) can help.                                               |         |
| Documents                   | String   | Yes      | A FEEL expression that returns the Camunda documents to embed. Shown when **Document source** is **Camunda document**. Use Camunda documents for larger document pipelines, for example from [webhooks or user tasks](/components/document-handling/getting-started.md). The connector parses documents with [Apache Tika](https://tika.apache.org/), so any Apache Tika-supported file format works. |         |
| Document splitting strategy | Dropdown | Yes      | How to break large documents into smaller chunks: **Recursive** or **Do not split**. Defaults to **Recursive**. Seek guidance from your local data scientist to determine whether you need splitting. See the [LangChain4j documentation](https://docs.langchain4j.dev/tutorials/rag#document-splitter).                                                                                              |         |
| Max chars                   | Number   | Yes      | Maximum size of a chunk in characters. Defaults to `500`. Shown when **Document splitting strategy** is **Recursive**.                                                                                                                                                                                                                                                                                | `500`   |
| Max overlap window          | Number   | Yes      | Maximum overlap between consecutive chunks in characters. Defaults to `80`. Shown when **Document splitting strategy** is **Recursive**.                                                                                                                                                                                                                                                              | `80`    |

#### Output

The operation returns an array of the IDs of the created embedding chunks:

```json
["d599ec62-fe51-4a91-bbf0-26e1241f9079", "a1fad021-5148-42b4-aa02-7de9d590e69c"]
```

#### Update embedded documents

Each time you embed a document, the connector generates a new set of chunks and stores them in the vector store. If you embed the same document again, this creates duplicate chunks.

To prevent duplicates:

1. Delete the existing chunks before you embed the document again.
1. Use the chunk IDs returned by the previous embedding operation.
1. If the embedded document is from Camunda, use the `filename` metadata field to find the chunk IDs.
1. Follow the documentation of your vector store to delete chunks.

### Retrieve document

Search the vector store for chunks that are similar to a query. The operation performs the following steps:

1. Consumes a query.
1. Converts the query into a vector with the embedding model.
1. Performs a vector similarity search on the stored embeddings.
1. Stores the results in Camunda document storage.

#### Input parameters

Select **Retrieve document** in the **Operation** dropdown, then configure the [embedding model](#embedding-models) and the [vector store](#vector-stores). The following properties are specific to this operation.

| Property     | Type   | Required | Description                                                                                                                                                            | Example |
| :----------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Search query | String | Yes      | The query to look up similar documents for.                                                                                                                            |         |
| Max results  | Number | Yes      | The maximum number of results to return. Defaults to `5`.                                                                                                              | `5`     |
| Min score    | Number | No       | The minimum similarity score a result needs to be included. Enter a value between 0 and 1. An empty or incorrect value resolves to `0.0`, which includes every result. | `0.81`  |

#### Output

The operation returns an object with a `chunks` array. Each chunk includes a chunk ID, the Camunda document reference metadata, the similarity score, and the text content.

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

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Further resources

- [Add long-term memory to your AI agents](/components/agentic-orchestration/rag-ai-agents.md)
- [LangChain4j documentation](https://docs.langchain4j.dev/)
