---
id: amazon-bedrock-knowledgebase
sidebar_label: Amazon Bedrock Knowledge Base
title: Amazon Bedrock Knowledge Base connector
description: Perform semantic search over documents indexed in an Amazon Bedrock Knowledge Base from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon Bedrock Knowledge Base connector to perform semantic search over documents indexed in an [Amazon Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) from your BPMN process.

## About this connector

The **Amazon Bedrock Knowledge Base connector** is an outbound connector that retrieves the passages of your indexed documents that best match a natural language query. Use it, for example, to ground answers or decisions in your own documents.

## Prerequisites

To use the **Amazon Bedrock Knowledge Base connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- A [Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html) created and configured with at least one data source.
- IAM permissions to execute the [`Retrieve`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Retrieve.html) action on the knowledge base.

Learn more about Amazon Bedrock Knowledge Bases in the [official documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html). For more information on authentication and security in Amazon Bedrock, see [Amazon Bedrock security and privacy](https://aws.amazon.com/bedrock/security-compliance/).

:::note
Use secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Example |
| :------------- | :------------ | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |         |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator. The access key must have permissions to the Bedrock Knowledge Base `Retrieve` action.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |         |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with the necessary permissions for this connector.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |         |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |         |

### Region

| Property | Type   | Required                                     | Description                                                                                                | Example     |
| :------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes, if no AWS credential is set             | The AWS region where your knowledge base is deployed.                                                      | `us-east-1` |
| Region   | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |             |

### Knowledge base

| Property          | Type   | Required | Description                                                                                                                                   | Example |
| :---------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Knowledge Base ID | String | Yes      | The ID of the Bedrock Knowledge Base to query. You can find this ID in the [Amazon Bedrock console](https://console.aws.amazon.com/bedrock/). |         |

## Operations

Select the operation in the **Operation** dropdown. **Retrieve from Knowledge Base** is the only operation.

### Retrieve from Knowledge Base

Perform a semantic search over the documents indexed in your knowledge base. The connector returns the most relevant passages that match your query.

#### Input parameters

| Property          | Type   | Required | Description                                                                                                                   | Example |
| :---------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------- | :------ |
| Query             | String | Yes      | A natural language query to search the knowledge base. Supports [FEEL](/components/modeler/feel/what-is-feel.md) expressions. |         |
| Number of results | Number | No       | The maximum number of results to return (1-100). Defaults to five.                                                            |         |

#### Query guidelines

For best results, use specific, descriptive queries rather than short keywords:

| Query                                                            | Quality | Why                                               |
| :--------------------------------------------------------------- | :------ | :------------------------------------------------ |
| "What does the auto insurance policy cover for stolen vehicles?" | Good    | Specific topic with clear intent.                 |
| "What are the exclusions for water damage in home insurance?"    | Good    | Targets a specific section and policy type.       |
| "Coverage"                                                       | Poor    | Too broad. It may return loosely related results. |
| "Tell me everything about insurance"                             | Poor    | Too vague. No specific topic to match against.    |

:::tip
When using the connector as a tool in an [AI Agent Sub-process](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md), the agent composes the query automatically based on the user's request. Use the `fromAi()` function to let the agent generate targeted queries.
:::

#### Output

The connector returns the following fields. Use **Result variable** or **Result expression** to map them into process variables.

| Field             | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `results`         | A list of retrieval results. Each result contains the fields described below.                                        |
| `resultCount`     | The number of results returned.                                                                                      |
| `paginationToken` | A token for retrieving additional results in subsequent requests. This value is `null` if there are no more results. |

Each result in the `results` list contains the following fields:

| Field               | Description                                                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `documentReference` | A [Camunda document](/components/document-handling/getting-started.md) reference containing the chunk text, for use with downstream connectors or processing. |
| `content`           | The matched text passage from the knowledge base.                                                                                                             |
| `score`             | A relevance score between 0 and 1 indicating how well the result matches the query.                                                                           |
| `sourceUri`         | The S3 URI of the source document, or `null` if the source is not in Amazon S3.                                                                               |
| `metadata`          | Key-value metadata associated with the source document.                                                                                                       |

For example, to extract only the text content of all results, use the following **Result expression**:

```feel
= {
  texts: results.content,
  count: resultCount
}
```

Example response:

```json
{
  "results": [
    {
      "documentReference": {
        "camunda.document.type": "camunda",
        "storeId": "in-memory",
        "documentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "contentHash": "9f2b7c1e5d3a4b8c6e0f1a2d3c4b5a69e8f7d6c5b4a39281706f5e4d3c2b1a09",
        "metadata": {
          "contentType": "text/plain",
          "size": 160
        }
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
        "camunda.document.type": "camunda",
        "storeId": "in-memory",
        "documentId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "contentHash": "1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
        "metadata": {
          "contentType": "text/plain",
          "size": 106
        }
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

<ErrorHandling />
