---
id: amazon-bedrock-agentcore-runtime
sidebar_label: Amazon Bedrock AgentCore Runtime
title: Amazon Bedrock AgentCore Runtime connector
description: Invoke external agents deployed on AWS Bedrock AgentCore Runtime from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon Bedrock AgentCore Runtime connector to invoke external agents deployed on [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) from your BPMN process.

## About this connector

The **Amazon Bedrock AgentCore Runtime connector** is an outbound connector that sends a payload to an agent hosted on AWS and returns the agent's response to your process.

Use this connector to delegate complex reasoning tasks to specialized AI agents hosted on AWS, such as fraud detection, risk analysis, or document processing agents built with frameworks like Strands, LangGraph, or CrewAI.

## Prerequisites

To use the **Amazon Bedrock AgentCore Runtime connector**, you need the following:

- An AWS account with an access key and secret key, or a configured default credentials chain.
- An agent deployed to [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-getting-started.html) in an `ACTIVE` state.
- IAM permissions to execute the `InvokeAgentRuntime` action on the agent's ARN.

Learn more about AgentCore Runtime in the [official documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html).

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
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to invoke the agent runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |

For more information on authentication and security in Amazon Bedrock, see [Amazon Bedrock security and privacy](https://aws.amazon.com/bedrock/security-compliance/).

### Region

| Property | Type   | Required                                     | Description                                                                                                | Example     |
| :------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Region   | String | Yes, if no AWS credential is set             | The AWS region where your AgentCore Runtime agent is deployed.                                             | `us-east-1` |
| Region   | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |             |

## Operations

The **Amazon Bedrock AgentCore Runtime connector** supports one operation.

### Invoke agent runtime

Send a payload to a deployed AgentCore Runtime agent and return its response.

#### Input parameters

| Property          | Type   | Required | Description                                                                                                                                                                                                  | Example                                                                           |
| :---------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Agent Runtime ARN | String | Yes      | The ARN of the AgentCore Runtime agent to invoke. You can find it in the AgentCore console or in the output of `agentcore deploy`.                                                                           | `arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/fraud_agent-1GRoTlCtHi` |
| Payload           | String | Yes      | The payload to send to the agent. Use a [FEEL](/components/modeler/feel/what-is-feel.md) expression to define the structure. The connector sends the payload as JSON, so the structure depends on the agent. | `={inputText: "your prompt"}`                                                     |
| Session ID        | String | No       | An optional session ID for multi-turn conversations. When provided, the agent retains context from previous interactions within the same session.                                                            |                                                                                   |

#### Output

The connector returns the following fields:

| Field        | Description                                                                                                                                                                                                                             |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response`   | The agent's response. If the agent returns valid JSON, the connector parses it. If the agent streams its response as server-sent events, the connector joins the streamed values into one string. Otherwise, it returns the plain text. |
| `sessionId`  | The runtime session ID. Use this value in subsequent calls to continue the conversation.                                                                                                                                                |
| `statusCode` | The HTTP status code of the response.                                                                                                                                                                                                   |

Use the **Result variable** to store the response in a process variable, or the **Result expression** to map specific fields into process variables. For example, to extract the agent's response and the session ID:

```feel
= {
  answer: response,
  session: sessionId
}
```

#### Example: Invoke a fraud detection agent

**Configuration:**

- Agent Runtime ARN: `arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/fraud_agent-1GRoTlCtHi`
- Payload: `={inputText: "Claim: Customer reports stolen vehicle worth $45,000. Filed 2 days after policy activation. No police report."}`

**Response:**

In this example, the agent returns a JSON-encoded string, so `response` is a string. If the agent returns a JSON object, `response` is the parsed object.

```json
{
  "response": "{\"result\": {\"role\": \"assistant\", \"content\": [{\"text\": \"{\\\"riskScore\\\": 85, \\\"riskLevel\\\": \\\"HIGH\\\", \\\"flags\\\": [\\\"Policy activated only 2 days before claim\\\", \\\"No police report filed\\\", \\\"High-value claim\\\"], \\\"recommendation\\\": \\\"REJECT\\\"}\"}]}}",
  "sessionId": "76f079e6-f30b-4416-9fbc-5d09d2ad31de",
  "statusCode": 200
}
```

#### Multi-turn conversations

To maintain context across multiple interactions with the same agent, pass the `sessionId` from the previous response into the **Session ID** field of the next call. This allows the agent to remember prior messages and maintain state.

<ErrorHandling />

### AGENTCORE_RUNTIME_FAILED

The connector throws an error with the code `AGENTCORE_RUNTIME_FAILED` when it cannot serialize the payload to JSON, or when AgentCore Runtime returns an error. The error message contains the details from AWS.
