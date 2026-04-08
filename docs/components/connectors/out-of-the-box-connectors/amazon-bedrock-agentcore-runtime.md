---
id: amazon-bedrock-agentcore-runtime
sidebar_label: Amazon Bedrock AgentCore Runtime
title: Amazon Bedrock AgentCore Runtime connector
description: Invoke external agents deployed on AWS Bedrock AgentCore Runtime from your BPMN process.
---

The **Amazon Bedrock AgentCore Runtime connector** is an outbound connector that allows you to invoke external agents deployed on [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) from your BPMN process.

Use this connector to delegate complex reasoning tasks to specialized AI agents hosted on AWS, such as fraud detection, risk analysis, or document processing agents built with frameworks like Strands, LangGraph, or CrewAI.

## Prerequisites

To use the **Amazon Bedrock AgentCore Runtime connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- An agent deployed to [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-getting-started.html) in an `ACTIVE` state.
- IAM permissions to execute the `InvokeAgentRuntime` action on the agent's ARN.

Learn more about AgentCore Runtime in the [official documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html).

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock AgentCore Runtime connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

Select an authentication type from the **Authentication** dropdown.

- **Credentials** (SaaS/Self-Managed): Select this option if you have a valid pair of access and secret keys provided by your AWS account administrator.

- **Default Credentials Chain** (Hybrid/Self-Managed only): Select this option if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
The **Default Credentials Chain** option is applicable only for Self-Managed or hybrid distributions.
:::

## Configuration

In the **Region** field, enter the AWS region where your agent is deployed (for example, `us-east-1`).

## Agent configuration

### Parameters

| Parameter             | Required | Description                                                                                                                                       |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agent Runtime ARN** | Yes      | The ARN of the deployed AgentCore Runtime agent. You can find this in the AgentCore console or in the output of `agentcore deploy`.               |
| **Prompt**            | Yes      | The message or task to send to the agent. Supports [FEEL](/components/modeler/feel/what-is-feel.md) expressions.                                  |
| **Session ID**        | No       | An optional session ID for multi-turn conversations. When provided, the agent retains context from previous interactions within the same session. |

### Response

The connector returns the following fields:

| Field        | Description                                                                              |
| :----------- | :--------------------------------------------------------------------------------------- |
| `response`   | The agent's response text or payload.                                                    |
| `sessionId`  | The runtime session ID. Use this value in subsequent calls to continue the conversation. |
| `statusCode` | The HTTP status code of the response.                                                    |

### Output mapping

1. Use **Result Variable** to store the response in a process variable. For example, `agentResult`.
2. Use **Result Expression** to map specific fields from the response into process variables.

For example, to extract the agent's response:

```feel
= {
  answer: response,
  session: sessionId
}
```

### Example: Invoke a fraud detection agent

**Configuration:**

- Agent Runtime ARN: `arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/fraud_agent-1GRoTlCtHi`
- Prompt: `Claim: Customer reports stolen vehicle worth $45,000. Filed 2 days after policy activation. No police report.`

**Response:**

```json
{
  "response": "{\"result\": {\"role\": \"assistant\", \"content\": [{\"text\": \"{\\\"riskScore\\\": 85, \\\"riskLevel\\\": \\\"HIGH\\\", \\\"flags\\\": [\\\"Policy activated only 2 days before claim\\\", \\\"No police report filed\\\", \\\"High-value claim\\\"], \\\"recommendation\\\": \\\"REJECT\\\"}\"}]}}",
  "sessionId": "76f079e6-f30b-4416-9fbc-5d09d2ad31de",
  "statusCode": 200
}
```

### Multi-turn conversations

To maintain context across multiple interactions with the same agent, pass the `sessionId` from the previous response into the **Session ID** field of the next call. This allows the agent to remember prior messages and maintain state.

:::note
When using the connector as a tool in an [AI Agent subprocess](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md), use the `fromAi()` function for the **Prompt** field to let the orchestrating agent compose the message dynamically based on the user's request.
:::
