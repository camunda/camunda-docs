---
id: amazon-bedrock-agentcore-long-term-memory
sidebar_label: Amazon Bedrock AgentCore Long-Term Memory
title: Amazon Bedrock AgentCore Long-Term Memory connector
description: Retrieve persistent knowledge from AWS Bedrock AgentCore Long-Term Memory in your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon Bedrock AgentCore Long-Term Memory connector to retrieve persistent knowledge, such as facts, preferences, and summaries, from [AWS Bedrock AgentCore Long-Term Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-long-term.html) in your BPMN process.

## About this connector

The **Amazon Bedrock AgentCore Long-Term Memory connector** is an outbound connector that reads memory records from an AgentCore Memory resource. It can search for records with a natural language query, or list all records in a namespace.

## Prerequisites

To use the **Amazon Bedrock AgentCore Long-Term Memory connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- An [AgentCore Memory resource](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-create.html) created in your AWS account.
- IAM permissions to execute the `RetrieveMemoryRecords` and `ListMemoryRecords` actions.

Learn more about Amazon Bedrock AgentCore Long-Term Memory in the [official documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-memory-long-term.html).

:::note
Use secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example |
| :------------- | :------------ | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |         |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to read memory records.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |         |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |

### Memory

| Property  | Type   | Required | Description                                                                                         | Example          |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------- | :--------------- |
| Memory ID | String | Yes      | The identifier of the AgentCore Memory resource you want to query.                                  |                  |
| Namespace | String | Yes      | A namespace prefix to scope memory records. AWS requires it to organize and isolate memory records. | `customer/12345` |

### Region

| Property | Type   | Required                                     | Description                                                                                                | Example     |
| :------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes, if no AWS credential is set             | The AWS region where your AgentCore Memory resource is deployed.                                           | `us-east-1` |
| Region   | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |             |

## Operations

Select the operation in the **Operation** dropdown. **Retrieve Memory Records** is selected by default. The properties that apply depend on the operation.

### Retrieve memory records

Perform a semantic search to find relevant memory records based on a natural language query.

#### Input parameters

| Property           | Type   | Required | Description                                                                      | Example |
| :----------------- | :----- | :------- | :------------------------------------------------------------------------------- | :------ |
| Search query       | String | Yes      | Semantic search query to find relevant memory records (up to 10,000 characters). |         |
| Memory strategy ID | String | No       | Limits the search to memories created by a specific extraction strategy.         |         |
| Max results        | Number | No       | Maximum number of results to return (1–100). Defaults to 10.                     | `10`    |
| Pagination token   | String | No       | Pagination token from a previous response to fetch the next page.                |         |

#### Output

The operation returns the [response structure](#response) described below.

### List memory records

List all memory records within the configured namespace.

#### Input parameters

| Property           | Type   | Required | Description                                                       | Example |
| :----------------- | :----- | :------- | :---------------------------------------------------------------- | :------ |
| Memory strategy ID | String | No       | Filter memory records by a specific extraction strategy.          |         |
| Max results        | Number | No       | Maximum number of results to return (1–100). Defaults to 20.      | `20`    |
| Pagination token   | String | No       | Pagination token from a previous response to fetch the next page. |         |

#### Output

The operation returns the [response structure](#response) described below.

## Response

Both operations use the following response structure:

| Field         | Description                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------- |
| `records`     | A list of memory record entries. Each entry contains the fields described below.             |
| `resultCount` | The number of records returned.                                                              |
| `nextToken`   | A token for retrieving additional results in subsequent requests. `null` if no more results. |

Each record in the `records` list contains:

| Field              | Description                                             |
| :----------------- | :------------------------------------------------------ |
| `memoryRecordId`   | Unique identifier for the memory record.                |
| `content`          | The text content of the memory record.                  |
| `memoryStrategyId` | The extraction strategy that created this record.       |
| `namespaces`       | List of namespaces associated with the record.          |
| `createdAt`        | Timestamp when the record was created.                  |
| `score`            | Relevance score (only present for retrieve operations). |
| `metadata`         | Key-value metadata associated with the record.          |

The connector returns only records that have text content, and `resultCount` counts only these records. In `metadata`, the connector includes only entries with string values.

To continue reading, pass the `nextToken` value of a response into the **Pagination token** field of the next call.

Use the **Result variable** to store the response in a process variable, or the **Result expression** to map specific fields into process variables. For example, to extract the content from all records:

```feel
= {
  memories: records.content,
  count: resultCount
}
```

### Example response

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

<ErrorHandling />

### AGENTCORE_MEMORY_FAILED

The connector throws an error with the code `AGENTCORE_MEMORY_FAILED` when AgentCore Memory returns an error. The error message contains the details from AWS.
