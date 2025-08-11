---
id: embeddings-vector-db
title: Vector database connector
sidebar_label: Vector database
description: Embed, store, and retrieve LLM embeddings and store them in vector databases.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The **vector database connector** allows embedding, storing, and retrieving Large Language Model (LLM) embeddings. This enables building AI-based solutions for your organizations, such as context document search, long-term LLM memory, and agentic AI interaction.

:::note
The **vector database connector** uses the [LangChain4j](https://docs.langchain4j.dev/) library. Data models and possible implementations are limited
to the latest stable released LangChain4j library.
:::

## Prerequisites

Before using the **vector database connector**, ensure you understand the
[concept of LLM embeddings](https://huggingface.co/spaces/hesamation/primer-llm-embedding).

To start using the **vector database connector**, ensure you have access to a supported LLM embeddings API to convert document content into vectorized embedding form. You will also need to have write access to a supported database.

## Create a connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Operations

<Tabs groupId="operations" defaultValue="embed" queryString values={
[
{label: 'Embed document', value: 'embed' },
{label: 'Retrieve document', value: 'retrieve' },
]}>

<TabItem value='embed'>

The **embed document** operation performs the following steps:

1. [Consume a document](#embedding-document-configuration).
2. Parse the document depending on a file format (optionally [split into text chunks](#splitting)).
3. Convert chunks into a vector form with LLM help.
4. Store produced vectors in a vector database.

To perform this operation, enter the following:

- **Operation** dropdown: **Embed document**.
- **Embedding model**: Refer to the [relevant section](#embedding-models).
- **Vector store**: Refer to the [relevant section](#vector-stores).
- **Document**: Refer to the [relevant section](#embedding-document-configuration).

As a result of this operation, you will get an array of created embedding chunk IDs,
for example `["d599ec62-fe51-4a91-bbf0-26e1241f9079", "a1fad021-5148-42b4-aa02-7de9d590e69c"]`.

### Updating embedded documents

Every time you embed a document, the connector creates a new set of chunks and stores them in the vector database.
If the document has been previously embedded, this will result in duplicate chunks in the vector database.
To avoid duplicates, you should delete the existing chunks before re-embedding the document.
To delete existing chunks, you need to use the chunk IDs returned by the previous embedding operation.
If you have embedded a Camunda document, you can use the `filename` metadata field to retrieve the chunk IDs.
Consult your vector store's documentation for chunk deletion procedures.

</TabItem>

<TabItem value='retrieve'>

The **retrieve document** operation performs the following steps:

1. Consumes a query.
2. Convert the query into a vector form with LLM help.
3. Perform a vector similarity search on previously-stored LLM embeddings.
4. Store results in Camunda document storage.

To perform this operation, enter the following:

- **Operation** dropdown: **Retrieve document**.
- **Search query**: Enter your search query.
- **Max results**: Enter maximum amount of returned results.
- **Min score**: Enter the lowest score threshold similarity value; the value should be between 0 and 1, for example, 0.81.
- **Embedding model**: Refer to the [relevant section](#embedding-models).
- **Vector store**: Refer to the [relevant section](#vector-stores).

As a result of this operation, you will get an array of relevant chunks, where each includes a [chunk ID](#splitting),
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

</TabItem>

</Tabs>

## Embedding models

<Tabs groupId="embedding-models" defaultValue="bedrock" queryString values={
[
{label: 'Amazon Bedrock', value: 'bedrock' },
{label: 'Azure OpenAI', value: 'azure-openai' },
{label: 'Google Vertex AI', value: 'vertex-ai' },
{label: 'OpenAI', value: 'openai' }
]}>

<TabItem value='bedrock'>
The **vector database connector** currently supports [Amazon Titan V1/V2 models](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html).
It is also possible to specify any custom model that supports text embedding and is available in your Amazon Bedrock account.

The following parameters are required to use Amazon Bedrock as an embedding model:

- **Access key**: Provide an access key of a user with permissions to the Amazon SageMaker `InvokeModel` action.
- **Secret key**: Provide the secret key of the user with the access key provided above.
- **Region**: The AWS region where the Amazon Bedrock model is hosted, for example `us-east-1`. Consult the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) for model support by region.
- **Model name**: The Amazon Bedrock embedding model. There are three options:
  - **Amazon Titan V1**: `amazon.titan-embed-text-v1`.
  - **Amazon Titan V2**: `amazon.titan-embed-text-v2:0`.
  - **Custom model**: Specify the name of your custom Amazon Bedrock embedding model.

When Amazon Titan V2 is selected, the following parameters can be specified:

- **Embedding dimensions**: The number of dimensions for the embedding vector.
- **Normalize**: Whether to normalize the embedding vector. More information about normalization can be found [here](https://aws.amazon.com/blogs/aws/amazon-titan-text-v2-now-available-in-amazon-bedrock-optimized-for-improving-rag/).

The following parameter is optional for all models:

- **Max retries**: The maximum number of retries for the embedding request in case of failure.

</TabItem>

<TabItem value='openai'>

The following parameters are required to use OpenAI as an embedding model:

- **API key**: Your OpenAI account API key for authorization.
- **Model name**: The OpenAI model to use for embeddings. Refer to the [OpenAI documentation](https://platform.openai.com/docs/guides/embeddings) for available models.

The following parameters are optional:

- **Organization ID**: If you access projects through a legacy user API key, specify the organization ID to use for API requests with this connector.
- **Project ID**: If you access projects through a legacy user API key, specify the project ID to use for API requests with this connector.
- **Embedding dimensions**: The number of dimensions for the embedding vector. If not specified, the connector will use the default value for the selected model.
- **Custom Headers**: Additional headers to include in the request.
- **Custom base URL**: If you use a custom OpenAI endpoint, specify the base URL to use for API requests with this connector.
- **Max retries**: The maximum number of retries for the embedding request in case of failure.

</TabItem>

<TabItem value='azure-openai'>

The following parameters are required to use Azure OpenAI as an embedding model:

- **Endpoint**: The Azure OpenAI endpoint URL, for example `https://<your-resource-name>.openai.azure.com/`.
- **Authentication**: Select the authentication type to use to authenticate the connector with Azure OpenAI.

The following parameters are optional:

- **Embedding dimensions**: The number of dimensions for the embedding vector. If not specified, the connector will use the default value for the selected model.
- **Custom Headers**: Additional headers to include in the request.
- **Max retries**: The maximum number of retries for the embedding request in case of failure.

Two authentication methods are currently supported:

- **API key**: Authenticate using an Azure OpenAI API key, available in the [Azure AI Foundry portal](https://ai.azure.com/).
- **Client credentials**: Authenticate using a client ID and secret. This method requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908). Provide the following fields:
  - **Client ID** – The Microsoft Entra application ID.
  - **Client secret** – The application’s client secret.
  - **Tenant ID** – The Microsoft Entra tenant ID.
  - **Authority host** – _(Optional)_ The authority host URL. Defaults to `https://login.microsoftonline.com/`. This can also be an OAuth 2.0 token endpoint.

</TabItem>

<TabItem value='vertex-ai'>

The following parameters are required to use Google Vertex AI as an embedding model:

- **Project ID**: The Google Cloud project ID.
- **Region**: The [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) where AI inference should take place.
- **Authentication**: Select the authentication type to use for connecting to Google Cloud.
- **Model name**: The Vertex AI model to use for embeddings. Refer to the [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings) for available models.
- **Embedding dimensions**: The number of dimensions for the embedding vector. Consult the documentation for the selected model to determine the value range.

The following parameters are optional:

- **Publisher**: The publisher of the Vertex AI model. If not specified, the default value of `google` is used.
- **Max retries**: The maximum number of retries for the embedding request in case of failure.

Two authentication methods are currently supported:

- **Service Account Credentials**: Authenticate using a [service account](https://cloud.google.com/iam/docs/service-account-overview) key in JSON format.
- **Application Default Credentials (ADC)**: Authenticate using the default credentials available in your environment.  
  This method is only supported in Self-Managed or hybrid environments.  
  To set up ADC in a local development environment, follow the instructions [here](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

</TabItem>

</Tabs>

## Vector stores

<Tabs groupId="vector" defaultValue="elasticsearch" queryString values={
[
{label: 'Amazon OpenSearch', value: 'amazon-opensearch' },
{label: 'Azure AI Search', value: 'azure-ai-search' },
{label: 'Azure Cosmos DB NoSql', value: 'azure-cosmos-db' },
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' }
]}>

<TabItem value='elasticsearch'>

The **vector database connector** can use Elasticsearch as a vector store. The Elasticsearch version must be 8+.

Enter the following parameters:

- **Base URL**: The Elasticsearch base URL, including protocol, for example `https://host:port`.
- **Username**: For the Elasticsearch user that has read/write access.
- **Password**: For the Elasticsearch user that has read/write access.
- **Index name**: Name of the index where you wish to store embeddings.
  - When embedding: If the index is not present, the connector will create a new one.
  - When retrieving: If the index is absent, the connector will raise an error.

</TabItem>

<TabItem value='opensearch'>

The **vector database connector** can use OpenSearch as a vector store.

Enter the following parameters:

- **Base URL**: The OpenSearch base URL, including protocol, for example `https://host:port`.
- **Username**: For the OpenSearch user that has read/write access.
- **Password**: For the OpenSearch user that has read/write access.
- **Index name**: Name of the index where you wish to store embeddings.
  - When embedding: If the index is not present, the connector will create a new one.
  - When retrieving: If the index is absent, the connector will raise an error.

</TabItem>

<TabItem value='amazon-opensearch'>

- **Access key** and **Secret key**: Enter AWS IAM credentials for the user that has read/write access.
- **Server URL**: An Amazon OpenSearch URL _without_ protocol, for example `my-opensearch.aws.com:port`.
- **Region**: Region of the Amazon OpenSearch instance.
- **Index name**: Name of the index where you wish to store embeddings.
  - When embedding: If the index is not present, the connector will create a new one.
  - When retrieving: If the index is absent, the connector will raise an error.

</TabItem>

<TabItem value='azure-ai-search'>

Enter the following parameters:

- **Endpoint**: The Azure AI Search endpoint URL, for example `https://<your-resource-name>.search.windows.net/`.
- **Authentication**: Select the authentication type to use to authenticate the connector with Azure AI Search.
- **Index name**: Name of the index where you wish to store embeddings.
  - When embedding: If the index is not present, the connector will create a new one.
  - When retrieving: If the index is absent, the connector will raise an error.

Two authentication methods are currently supported:

- **API key**: Authenticate using an Azure AI Search key.
- **Client credentials**: Authenticate using a client ID and secret.
  This method requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908). The [required roles](https://learn.microsoft.com/en-us/azure/search/search-security-rbac) must be assigned to the application.  
  Note that role-based access control must be explicitly enabled for the Azure AI Search resource.

  Provide the following fields:
  - **Client ID** – The Microsoft Entra application ID.
  - **Client secret** – The application’s client secret.
  - **Tenant ID** – The Microsoft Entra tenant ID.
  - **Authority host** – _(Optional)_ The authority host URL. Defaults to `https://login.microsoftonline.com/`. This can also be an OAuth 2.0 token endpoint.

</TabItem>

<TabItem value='azure-cosmos-db'>

Enter the following parameters:

- **Endpoint**: The Azure Cosmos DB NoSql endpoint URL, for example `https://<your-resource-name>.documents.azure.com/`.
- **Authentication**: Select the authentication type to use to authenticate the connector with Azure Cosmos DB NoSql.
- **Database name**: The name of the Azure Cosmos DB NoSql database.
- **Container name**: The name of the Azure Cosmos DB NoSql container.  
  _Note:_ The container must already exist and have an `/id` partition key.
- **Consistency level**: The consistency level for the Azure Cosmos DB NoSql container. The default value is `Eventual`.
- **Distance function**: The distance function to use for vector similarity search. The default value is `Cosine`.
- **Vector index type**: The vector index type to use. The default value is `Flat`.

:::info
For more information about the Azure Cosmos DB NoSql vector search, refer to the [official documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/vector-search).  
Please pay special attention to the vector dimensions limitations as stated in the documentation.
:::

Two authentication methods are currently supported:

- **API key**: Authenticate using an Azure Cosmos DB key.
- **Client credentials**: Authenticate using a client ID and secret.  
  This method requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908).

  Provide the following fields:
  - **Client ID** – The Microsoft Entra application ID.
  - **Client secret** – The application’s client secret.
  - **Tenant ID** – The Microsoft Entra tenant ID.
  - **Authority host** – _(Optional)_ The authority host URL. Defaults to `https://login.microsoftonline.com/`. This can also be an OAuth 2.0 token endpoint.

</TabItem>

</Tabs>

## Embedding document configuration

### Document source

The **Document source** can be either **Plain text** or a **Camunda document**.

**Plain text** can be useful when you deal with small size data that can fit into a text field or a process instance variable. Input will be handled as a regular UTF-8 text.

:::note
A FEEL [string conversion function](/components/modeler/feel/builtin-functions/feel-built-in-functions-conversion.md#stringfrom) might be useful if you have JSON input.
:::

The **Camunda document** might be useful when you deal with larger document pipelines that come from
[webhook or user tasks](/components/document-handling/getting-started.md). Input documents will be parsed with [Apache Tika](https://tika.apache.org/), so files
can be of any Apache Tika-supported formats.

### Splitting

**Splitting** is an action of breaking large documents into smaller pieces. It can be either recursive or no splitting
at all. Seek guidance from your local data scientist to determine if you require splitting.

Learn more about splitting in the [LangChain4j documentation](https://docs.langchain4j.dev/tutorials/rag#document-splitter).
