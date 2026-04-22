---
id: amazon-bedrock-agentcore-long-term-memory
sidebar_label: Amazon Bedrock AgentCore Long-Term Memory
title: Amazon Bedrock AgentCore Long-Term Memory connector
description: Retrieve persistent knowledge from AWS Bedrock AgentCore Long-Term Memory from your BPMN process.
---

The **Amazon Bedrock AgentCore Long-Term Memory connector** is an outbound connector that allows you to retrieve persistent knowledge — facts, preferences, and summaries — from [AWS Bedrock AgentCore Long-Term Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-long-term.html) from your BPMN process.

## Prerequisites

To use the **Amazon Bedrock AgentCore Long-Term Memory connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- An [AgentCore Memory resource](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-create.html) created in your AWS account.
- IAM permissions to execute the `RetrieveMemoryRecords` and `ListMemoryRecords` actions.

Learn more about Amazon Bedrock AgentCore Long-Term Memory in the [official documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-long-term.html).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock AgentCore Long-Term Memory connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

Select an authentication type from the **Authentication** dropdown.

- **Credentials** (SaaS/Self-Managed): Select this option if you have a valid pair of access and secret keys provided by your AWS account administrator.

- **Default Credentials Chain** (Hybrid/Self-Managed only): Select this option if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

## Configuration

In the **Region** field, enter the AWS region where your AgentCore Memory resource is deployed (for example, `us-east-1`).

In the **Memory ID** field, enter the identifier of the AgentCore Memory resource you want to query.

In the **Namespace** field, enter a namespace prefix to scope memory records (for example, `customer/12345`). This is required by AWS to organize and isolate memory records.

## Operations

The **Amazon Bedrock AgentCore Long-Term Memory connector** supports the following operations:

### Retrieve Memory Records

Perform a semantic search to find relevant memory records based on a natural language query.

#### Parameters

| Parameter              | Required | Description                                                                 |
| :--------------------- | :------- | :-------------------------------------------------------------------------- |
| **Search query**       | Yes      | Semantic search query to find relevant memory records (up to 10,000 characters). |
| **Memory strategy ID** | No       | Limits the search to memories created by a specific extraction strategy.    |
| **Max results**        | No       | Maximum number of results to return (1–100). Defaults to 10.                |
| **Next token**         | No       | Pagination token from a previous response to fetch the next page.           |

### List Memory Records

List all memory records within the configured namespace.

#### Parameters

| Parameter              | Required | Description                                                                 |
| :--------------------- | :------- | :-------------------------------------------------------------------------- |
| **Memory strategy ID** | No       | Filter memory records by a specific extraction strategy.                    |
| **Max results**        | No       | Maximum number of results to return (1–100). Defaults to 20.                |
| **Next token**         | No       | Pagination token from a previous response to fetch the next page.           |

## Response

Both operations return the same response structure:

| Field         | Description                                                                                      |
| :------------ | :----------------------------------------------------------------------------------------------- |
| `records`     | A list of memory record entries. Each entry contains the fields described below.                 |
| `resultCount` | The number of records returned.                                                                  |
| `nextToken`   | A token for retrieving additional results in subsequent requests. `null` if no more results.    |

Each record in the `records` list contains:

| Field              | Description                                                        |
| :----------------- | :----------------------------------------------------------------- |
| `memoryRecordId`   | Unique identifier for the memory record.                           |
| `content`          | The text content of the memory record.                             |
| `memoryStrategyId` | The extraction strategy that created this record.                  |
| `namespaces`       | List of namespaces associated with the record.                     |
| `createdAt`        | Timestamp when the record was created.                             |
| `score`            | Relevance score (only present for retrieve operations).            |
| `metadata`         | Key-value metadata associated with the record.                     |

## Output mapping

1. Use **Result Variable** to store the response in a process variable. For example, `memoryResult`.
2. Use **Result Expression** to map specific fields from the response into process variables.

For example, to extract the content from all records:

```feel
= {
  memories: records.content,
  count: resultCount
}
```

## Example response

The following is an example of the connector response:

```json
{
  "records": [
    {
      "memoryRecordId": "mem-abc123",
      "content": "Customer prefers email communication over phone calls.",
      "memoryStrategyId": "preference-extraction",
      "namespaces": ["customer/12345"],
      "createdAt": "2024-01-15T10:30:00Z",
      "score": 0.95,
      "metadata": {
        "source": "support-ticket",
        "confidence": "high"
      }
    },
    {
      "memoryRecordId": "mem-def456",
      "content": "Customer is located in the Pacific timezone.",
      "memoryStrategyId": "fact-extraction",
      "namespaces": ["customer/12345"],
      "createdAt": "2024-01-10T14:20:00Z",
      "score": 0.87,
      "metadata": {
        "source": "profile-update"
      }
    }
  ],
  "resultCount": 2,
  "nextToken": null
}
```
