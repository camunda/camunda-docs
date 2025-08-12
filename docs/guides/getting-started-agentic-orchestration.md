---
id: getting-started-agentic-orchestration
title: "Build your first AI Agent"
sidebar_label: Build your first AI Agent
description: "Get started with agentic orchestration by running your first AI agent in Camunda."
keywords: [agentic orchestration, ai agent]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AiAgentImg from './img/ai-agent-example-diagram.png';

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">1 hour</span>

Get started with Camunda [agentic orchestration](/components/agentic-orchestration/agentic-orchestration.md) by building and running your first [AI agent](/components/agentic-orchestration/ai-agents.md).

## About this guide

In this guide, you will:

- Run Camunda 8 in either a local development environment (using [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)) or [Camunda 8 SaaS](https://accounts.cloud.camunda.io/signup).
- Deploy and start a business process using either [Desktop Modeler](/components/modeler/desktop-modeler/index.md) with Camunda 8 Run, or [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) with Camunda 8 SaaS.
- Use an [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) to provide interaction/reasoning capabilities for the AI agent.
- Use an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to define the tools the AI agent should use.

Once you have completed this guide, you will have an example running AI agent and Camunda 8 process.

## Prerequisites

The following prerequisites are required for building your first AI agent:

| Prerequisite                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Running Camunda 8 environment                                                                                        | <p>To run your agent, you must set up a running Camunda 8 environment, either:</p><p><ul><li><p>A local (Self-Managed) Camunda 8 environment. For example, see [Run your first local project](../getting-started-example).</p></li><li><p>A Camunda 8 SaaS account. For example, [sign up for a free SaaS Trial Account](https://accounts.cloud.camunda.io/signup).</p></li></ul></p> |
| [Amazon Web Services (AWS) IAM user and permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) | A valid AWS Identity and Access Management (IAM) user with permissions configured to allow access to Amazon Bedrock `bedrock:InvokeModel` (Claude 3 Sonnet/Haiku) and `aoss:*` for your OpenSearch index.                                                                                                                                                                             |

## Before you begin

Before building your first AI agent it is helpful to understand the following key concepts and terms.

### Introducing dynamic workflows

Business processes are traditionally modeled as a deterministic sequence of steps, with predefined flow logic following a strict order. This works well if flow logic can be defined in advance, but struggles to adapt in more complex, open-ended scenarios.

- [Dynamic workflows](/components/agentic-orchestration/design-architecture.md#when-to-use-deterministic-or-non-deterministic-orchestration) allow a process to adapt and change at runtime, based on real-time information and AI-driven insights. An agent with a goal to complete runs within a loop, selecting what it needs from a set of tools (possible actions) to achieve its goal.

- Camunda agentic orchestration blends both deterministic and dynamic (AI-driven) process orchestration into a single process model. This allows you to use deterministic control when needed, and flexibility where it makes sense.

- The deterministic flow logic acts as a guardrail on dynamic execution, defining boundaries and constraints for the AI agent. This ensures the agent stays aligned with business goals and compliance requirements, so you can **build agents you can trust**.

:::info
To learn more about dynamic workflows, see [agentic orchestration design and architecture](/components/agentic-orchestration/design-architecture.md).
:::

### Ad-hoc sub-processes

An [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) is a key building block in Camunda agentic orchestration.

- It allows an AI agent to dynamically select and run tools (available actions) based on the current context and requirements.
- It can perform tasks in parallel, handle exceptions, and make decisions on the fly.

For example, the process in this guide uses an ad-hoc sub-process in a [tool calling feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#feedback-loop-use-cases), with the AI Agent connector used to allow the LLM to choose from the tools available in the ad-hoc sub-process.

## Build your first agent

Perform the following steps to build your first Camunda AI agent:

### Step 1: Install the example model blueprint

To get started quickly, you can use the pre-built blueprint process model of a simple AI agent.

#### SaaS

1. Navigate to the [Example AI Agent](https://marketplace.camunda.com/en-US/apps/522492/ai-email-support-agent) blueprint in the Camunda marketplace.
1. Click **For SAAS** and select the project you want to save the blueprint in, or create a new project and save it in this.
1. The blueprint BPMN diagram opens in Web Modeler.

#### Self-Managed (local environment)

1. Navigate to the [Example AI Agent](https://marketplace.camunda.com/en-US/apps/522492/ai-email-support-agent) blueprint in the Camunda marketplace.
1. Click **For SM** and download the blueprint files from the repository.
1. Open the blueprint BPMN diagram in Desktop Modeler.

### About the example model

The example AI Agent model process (description)...

<img src={AiAgentImg} alt="A example AI agent BPMN process diagram"/>

## Step 2: Configure the...

Secrets?

<!-- Create the following secrets in your Camunda cluster or set them up locally with the `connector-secrets.txt` file and restart `c8run`. Use the set secrets with the `{{secrets.SECRET_NAME}}` syntax.

- `CAMUNDA_SAMPLE_AGENT_EMAIL_PASSWORD`: Email account password (App Password or SMTP token)
- `CAMUNDA_SAMPLE_AGENT_EMAIL_USERNAME`: Email account username (e.g. your-address@example.com)
- `CAMUNDAAGENT_AWS_ACCESS_KEY`: AWS Access Key ID
- `CAMUNDAAGENT_AWS_SECRET_KEY`: AWS Secret Access Key

Configure the connectors:

1. **Email connectors (Inbound & Send):**
   - Username: your email address
   - IMAP/SMTP host & port: according to your provider (Gmail, Outlook, etc.)
2. **Vector Database connectors (Retrieve & Write):**
   - Region: your AWS region (e.g. `eu-central-1`)
   - Endpoint: `https://<your-opensearch-domain>`
3. **Agent connector:**
   - Model ID: default is `anthropic.claude-3.7-sonnet-20240229-v1:0` (change as needed) -->

## Step 3: Deploy and run your AI agent

You can now run and deploy your AI agent:

### SaaS

1. ...

### Self-Managed (local environment)

1. ...

## Step 4: Test your AI agent

Now that your AI agent is running, you can test it using the form linked to the start event.

### Example prompts

| Prompt                                      | Description                                                                                                                                                                                |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "send ervin a joke"                         | Fetches a list of users, fetches single user record, fetches joke, compiles email - on the email operator task you can add additional feedback like "add emojis" or "translate to french". |
| "go and fetch \<url\> and tell me about it" | -                                                                                                                                                                                          |
| "tell me about this document"               | the start form has a document upload field                                                                                                                                                 |

## Next steps

Now that you have seen easy it is to build a simple Camunda AI agent, learn more about using agentic orchestration and advanced AI agents in your processes:

- [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration.md)
- [Camunda AI agents](/components/agentic-orchestration/ai-agents.md)
