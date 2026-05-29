---
id: amazon-bedrock-agentcore-harness
sidebar_label: Amazon Bedrock AgentCore Harness (Alpha)
title: Amazon Bedrock AgentCore Harness connector
description: Use AWS-managed AI agents (AgentCore Harness) with full visibility of tool calls as BPMN element activations.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::info Alpha Feature
This connector is an [alpha feature](/components/early-access/alpha/alpha-features.md) and is subject to change. AWS Bedrock AgentCore Harness is currently in Preview.
:::

The **Amazon Bedrock AgentCore Harness** connector enables you to use [AWS Bedrock AgentCore Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html) as the AI backend for your agentic workflows, with full visibility of tool calls as BPMN element activations.

## About this connector

This connector implements an AI agent using an ad-hoc sub-process, similar to the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md), but uses AWS Bedrock AgentCore Harness instead of direct LLM provider integration.

Key differences from the standard AI Agent Sub-process:

| Feature | AI Agent Sub-process | AgentCore Harness |
|---------|---------------------|-------------------|
| LLM Provider | Direct (Anthropic, OpenAI, etc.) | AWS-managed via Harness |
| Built-in tools | None | Shell, browser, code interpreter |
| Tool execution | All tools executed by Camunda | Built-in tools executed by Harness, custom tools by Camunda |
| Session management | Managed by connector | Managed by Harness |

### How it works

1. Inner BPMN elements in the ad-hoc sub-process are exposed to Harness as `inline_function` tools
2. When Harness decides to use a custom tool, the connector activates the corresponding BPMN element
3. Built-in Harness tools (shell, browser, code interpreter) are executed by Harness internally
4. The connector maintains conversation continuity using Harness session IDs

## Prerequisites

To use the **Amazon Bedrock AgentCore Harness** connector, you need:

- An AWS account with access to Amazon Bedrock AgentCore
- An [AgentCore Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-create.html) created in your AWS account
- IAM permissions to execute the `InvokeHarness` action
- AWS credentials configured (access key/secret key or default credentials chain)

:::note
Use Camunda secrets to store credentials and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock AgentCore Harness connector

1. Create an [ad-hoc sub-process](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) in your BPMN diagram
2. Apply the **Amazon Bedrock AgentCore Managed Agent (Alpha)** element template to the ad-hoc sub-process
3. Add inner elements (service tasks, user tasks, etc.) that will become tools available to the AI agent

## Authentication

Select an authentication type from the **Authentication** dropdown:

<Tabs groupId="authentication">
<TabItem value="credentials" label="Credentials" default>

Select this option if you have a valid pair of access and secret keys provided by your AWS account administrator.

| Field | Description |
|-------|-------------|
| **Access key** | AWS access key ID |
| **Secret key** | AWS secret access key |

</TabItem>
<TabItem value="default" label="Default Credentials Chain">

Select this option if your system is configured with an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on the target host.

This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
This option is only available for Hybrid and Self-Managed deployments.
:::

</TabItem>
</Tabs>

## Configuration

### Harness configuration

| Field | Required | Description |
|-------|----------|-------------|
| **Harness ARN** | Yes | The ARN of your AgentCore Harness (e.g., `arn:aws:bedrock-agentcore:us-east-1:123456789012:harness/my-harness`) |
| **Region** | No | AWS region. If not specified, the region is extracted from the Harness ARN. |
| **Allowed tools** | No | List of tool names the agent is allowed to use. If empty, all tools are available. Use `@builtin/*` for built-in tools. |

### User prompt

| Field | Required | Description |
|-------|----------|-------------|
| **User prompt** | Yes | The prompt or question to send to the AI agent |

### Limits

| Field | Default | Description |
|-------|---------|-------------|
| **Max iterations** | 10 | Maximum number of tool-call iterations before the agent stops |

## Built-in tools

AgentCore Harness provides built-in tools that are executed by Harness internally:

| Tool | Description |
|------|-------------|
| `@builtin/shell` | Execute shell commands |
| `@builtin/browser` | Browse web pages |
| `@builtin/code_interpreter` | Execute code |

To use built-in tools, include them in the **Allowed tools** configuration (e.g., `@builtin/shell`, `@builtin/browser`).

:::note
Built-in tools are executed by Harness and do not appear as BPMN element activations. Only custom `inline_function` tools (your BPMN elements) are visible in the process execution.
:::

## Response

The connector returns the following response structure:

| Field | Description |
|-------|-------------|
| `response` | The final text response from the AI agent |
| `agentContext` | Context object containing conversation history and metrics |
| `sessionId` | The Harness session ID for conversation continuity |

## Session management

The connector automatically manages Harness sessions:

- A new session ID is generated for the first invocation
- The session ID is preserved in the agent context for subsequent invocations
- Sessions persist across multiple `InvokeHarness` calls with the same session ID
- Session timeouts are configured in AWS Harness settings, not in the connector

## Example

A basic AgentCore Harness workflow might look like this:

1. Create an ad-hoc sub-process with the **Amazon Bedrock AgentCore Managed Agent (Alpha)** template
2. Add service tasks inside the sub-process for custom tools (e.g., "Search Database", "Send Email")
3. Configure each inner task with appropriate input/output mappings
4. The AI agent will automatically discover these tools and use them as needed

## Limitations

- This connector requires Camunda 8.10 or later
- AWS Bedrock AgentCore Harness is currently in Preview
- Built-in tool executions are not visible in the BPMN process execution history

## Related resources

- [AI Agent connector](./agentic-ai-aiagent.md)
- [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md)
- [Ad-hoc sub-processes](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md)
- [AWS Bedrock AgentCore documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html)
