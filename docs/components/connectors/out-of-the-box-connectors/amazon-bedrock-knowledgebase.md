---
id: amazon-bedrock-knowledgebase
sidebar_label: Amazon Bedrock Knowledge Base
title: Amazon Bedrock Knowledge Base connector
description: Retrieve relevant documents from an AWS Bedrock Knowledge Base from your BPMN process.
---

The **Amazon Bedrock Knowledge Base connector** is an outbound connector that allows you to perform semantic search over documents indexed in an [Amazon Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) from your BPMN process.

## Prerequisites

To use the **Amazon Bedrock Knowledge Base connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- A [Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html) created and configured with at least one data source.
- IAM permissions to execute the [`Retrieve`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Retrieve.html) action on the knowledge base.

Learn more about Amazon Bedrock Knowledge Bases in the [official documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock Knowledge Base connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

Select an authentication type from the **Authentication** dropdown.

- **Credentials** (SaaS/Self-Managed): Select this option if you have a valid pair of access and secret keys provided by your AWS account administrator. The access key must have permissions to the Bedrock Knowledge Base `Retrieve` action.

- **Default Credentials Chain** (Hybrid/Self-Managed only): Select this option if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
The **Default Credentials Chain** option is applicable only for Self-Managed or hybrid distributions.
:::

## Configuration

In the **Region** field, enter the AWS region where your knowledge base is deployed (for example, `us-east-1`).

In the **Knowledge Base ID** field, enter the ID of the Bedrock Knowledge Base you want to query. You can find this ID in the [Amazon Bedrock console](https://console.aws.amazon.com/bedrock/).

## Operation

The **Amazon Bedrock Knowledge Base connector** supports the following operation:

### Retrieve from Knowledge Base

Perform a semantic search over the documents indexed in your knowledge base. The connector returns the most relevant passages matching your query.

#### Parameters

| Parameter             | Required | Description                                                                                                                   |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Query**             | Yes      | A natural language query to search the knowledge base. Supports [FEEL](/components/modeler/feel/what-is-feel.md) expressions. |
| **Number of results** | No       | The maximum number of results to return (1–100). Defaults to five.                                                            |

#### Response

The connector returns the following fields:

| Field             | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `results`         | A list of retrieval results. Each result contains the fields described below.                                        |
| `resultCount`     | The number of results returned.                                                                                      |
| `paginationToken` | A token for retrieving additional results in subsequent requests. This value is `null` if there are no more results. |

Each result in the `results` list contains:

| Field               | Description                                                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `documentReference` | A [Camunda document](/components/document-handling/getting-started.md) reference containing the chunk text, for use with downstream connectors or processing. |
| `content`           | The matched text passage from the knowledge base.                                                                                                             |
| `score`             | A relevance score between 0 and 1 indicating how well the result matches the query.                                                                           |
| `sourceUri`         | The S3 URI of the source document.                                                                                                                            |
| `metadata`          | Key-value metadata associated with the source document.                                                                                                       |

#### Output mapping

1. Use **Result Variable** to store the response in a process variable. For example, `kbResult`.
2. Use **Result Expression** to map specific fields from the response into process variables.

For example, to extract just the text content from all results:

```feel
= {
  texts: results.content,
  count: resultCount
}
```

#### Query guidelines

For best results, use specific, descriptive queries rather than short keywords:

| Query                                                            | Quality | Why                                               |
| :--------------------------------------------------------------- | :------ | :------------------------------------------------ |
| "What does the auto insurance policy cover for stolen vehicles?" | Good    | Specific topic with clear intent.                 |
| "What are the exclusions for water damage in home insurance?"    | Good    | Targets a specific section and policy type.       |
| "coverage"                                                       | Poor    | Too broad — returns many loosely related results. |
| "Tell me everything about insurance"                             | Poor    | Too vague — no specific topic to match against.   |

:::tip
When using the connector as a tool in an [AI Agent subprocess](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md), the agent composes the query automatically based on the user's request. Use the `fromAi()` function to let the agent generate targeted queries.
:::

#### Example response

The following is an example of the connector response:

```json
{
  "results": [
    {
      "documentReference": {
        "storeId": "in-memory",
        "documentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
      },
      "content": "Comprehensive auto insurance covers damage to your vehicle from events other than collisions, including theft, vandalism, natural disasters, and falling objects.",
      "score": 0.92,
      "sourceUri": "s3://my-bucket/policies/auto-insurance.pdf",
      "metadata": {
        "category": "auto",
        "policyType": "comprehensive"
      }
    },
    {
      "documentReference": {
        "storeId": "in-memory",
        "documentId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
      },
      "content": "Liability coverage pays for bodily injury and property damage that you cause to others in an auto accident.",
      "score": 0.85,
      "sourceUri": "s3://my-bucket/policies/auto-insurance.pdf",
      "metadata": {
        "category": "auto",
        "policyType": "liability"
      }
    }
  ],
  "resultCount": 2,
  "paginationToken": null
}
```
