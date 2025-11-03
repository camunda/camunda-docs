---
id: getting-started-agentic-orchestration
title: "Build your first AI Agent"
sidebar_label: Build your first AI Agent
description: "Get started with agentic orchestration by running your first AI agent in Camunda."
keywords: [agentic orchestration, ai agent]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AiAgentExampleDiagramImg from './img/ai-agent-example-diagram.png';
import AiAgentStartFormImg from './img/ai-agent-example-start-form.png';
import AiAgentPropertiesPanelImg from './img/ai-agent-example-properties-panel.png';

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 45 minutes</span>

Get started with Camunda [agentic orchestration](/components/agentic-orchestration/agentic-orchestration.md) by building and running your first [AI agent](/components/agentic-orchestration/ai-agents.md).

## About this guide

In this guide, you will:

- Run Camunda 8 in either a local development environment (using [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)) or [Camunda 8 SaaS](https://accounts.cloud.camunda.io/signup).
- Deploy and start a business process using either [Desktop Modeler](/components/modeler/desktop-modeler/index.md) with Camunda 8 Run, or [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) with Camunda 8 SaaS.
- Use an [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) to provide interaction/reasoning capabilities for the AI agent.
- Use an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to define the tools the AI agent should use.

Once you have completed this guide, you will have an example running AI agent and Camunda 8 process.

## Prerequisites

The following prerequisites are required to build your first AI agent:

| Prerequisite                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running Camunda 8 environment    | <p>To run your agent, you must have a running Camunda 8 environment (version 8.8 or newer), either:</p><p><ul><li><p>A local (Self-Managed) Camunda 8 environment. For example, see [Run your first local project](../getting-started-example).</p></li><li><p>A Camunda 8 SaaS account. For example, [sign up for a free SaaS Trial Account](https://accounts.cloud.camunda.io/signup).</p></li></ul></p>                                                                                                                                                                                                                                                                                                                                                 |
| A supported LLM provider account | <p>The [AI Agent connector](../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) supports multiple model providers, such as AWS Bedrock, OpenAI, and Anthropic.</p><p>For the purposes of this guide it is assumed you have access to an AWS account with permissions for the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html).</p> <p> If you do not have access to an AWS account, you can use a different LLM provider instead, such as OpenAI or Anthropic. For more information on how to configure the connector with your preferred LLM provider, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#model-provider)</p> |

### AWS Bedrock Configuration

The AI Agent example is preconfigured to use AWS Bedrock with Claude Sonnet 4 in the us-east-1 region.

- To use the example process without changes you must first request access to **Anthropic Claude** foundation models using the AWS console.
- Refer to the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) for more information.

## Concepts

### Introducing dynamic workflows

Business processes are traditionally modeled as a deterministic sequence of steps, with predefined flow logic following a strict order. This works well if flow logic can be defined in advance, but struggles to adapt in more complex, open-ended scenarios.

- [Dynamic workflows](/components/agentic-orchestration/design-architecture.md#when-to-use-deterministic-or-non-deterministic-orchestration) adapt in real time, adjusting steps based on current information and AI insights. An agent works toward its goal in a loop, choosing actions from available tools until the goal is reached.

- Camunda agentic orchestration blends both deterministic and dynamic (AI-driven) process orchestration into a single process model. This allows you to use deterministic control when needed, and flexibility where it makes sense.

- The deterministic flow logic acts as a guardrail on dynamic execution, defining boundaries and constraints for the AI agent. This ensures the agent stays aligned with business goals and compliance requirements, so you can **build agents you can trust**.

:::info
To learn more about dynamic workflows, see [agentic orchestration design and architecture](/components/agentic-orchestration/design-architecture.md).
:::

### What is an AI agent?

An **AI agent** in Camunda is an automation that leverages ad-hoc sub-processes to perform tasks with non-deterministic behavior. AI agents can:

- Make autonomous decisions about task execution
- Adapt their behavior based on context and input
- Handle complex scenarios that require dynamic responses
- Integrate with other process components through standard interfaces

AI agents represent the practical implementation of agentic process orchestration within the Camunda ecosystem, combining the flexibility of AI with the reliability of traditional process automation.

### Ad-hoc sub-processes

An [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) is a key building block in Camunda agentic orchestration. Unlike standard BPMN subprocesses with predefined sequences, ad-hoc subprocesses allow:

- **Dynamic task selection**: Tasks within the subprocess can be executed in any order, repeatedly, or skipped entirely based on runtime needs
- **Non-deterministic execution**: The exact sequence and occurrence of tasks are determined at runtime by the AI agent
- **Parallel execution**: Multiple tasks can run simultaneously when appropriate
- **Flexible tool access**: The subprocess acts as a container of available actions (tools) that the AI agent can choose from

The AI Agent connector lets the LLM choose from the tools in that sub-process and dynamically orchestrates tool calling and request handling. This approach provides the AI agent freedom within constraints, ensuring it stays aligned with business goals while having the flexibility to adapt.

## Step 1: Install the example model blueprint

To start building your first AI agent, you can use a pre-built Camunda blueprint process model.

### SaaS

1. Navigate to the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) blueprint in the Camunda marketplace.
1. Click **For SAAS** and select the project you want to save the blueprint in, or create a new project and save it in this.
1. The blueprint BPMN diagram opens in Web Modeler.

### Self-Managed (local environment)

1. Navigate to the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) blueprint in the Camunda marketplace.
1. Click **For SM** and download the blueprint files from the repository.
1. Open the blueprint BPMN diagram in Desktop Modeler or in Web Modeler.

### About the example AI agent process

The example AI agent process is a chatbot that you (the user) can chat and interact with via a [user task form](/components/modeler/forms/camunda-forms-reference.md).

<img src={AiAgentExampleDiagramImg} alt="A example AI agent BPMN process diagram"/>

The process showcases how an AI agent can:

- **Make autonomous decisions** about which tasks to execute based on your input
- **Adapt its behavior** dynamically using the context provided
- **Handle complex scenarios** by selecting and combining different tools
- **Integrate seamlessly** with other process components

The example comes with a form linked to the start event where you can provide requests—from simple questions to more complex tasks involving document uploads.

<img src={AiAgentStartFormImg} alt="Example AI agent start form" className="img-800"/>

## Step 2: Configure connector secrets

The example process is preconfigured to use AWS Bedrock as the model. For authentication, it is preconfigured to use the following connector secrets:

- `AWS_BEDROCK_ACCESS_KEY`: The AWS Access Key ID for your AWS account able to call the Bedrock Converse API.
- `AWS_BEDROCK_SECRET_KEY`: The AWS Secret Access Key for your AWS account.

How you configure these secrets depends if you are running Camunda 8 SaaS or a Self-Managed (local) environment.

- For SaaS and Self Managed deployments, you can configure the secrets in the [Console](../components/console/manage-clusters/manage-secrets.md).
- For Camunda 8 Run, export the secrets as environment variables before starting the distribution. If you use Camunda 8 Run with docker, add the secrets in the `connector-secrets.txt` file.

## Step 3: Configure the AI Agent connector (optional)

In the blueprint BPMN diagram, the AI Agent connector template is applied to the `AI Agent` service task. You can change the AI Agent configuration in the properties panel of the AI Agent if required.

<img src={AiAgentPropertiesPanelImg} alt="AI agent properties panel"/>

### Key configuration options

- **Model provider**: Change from AWS Bedrock to OpenAI, Anthropic, or other supported providers
- **System prompt**: Customize the agent's behavior and personality
- **Model parameters**: Adjust temperature, max tokens, and other LLM settings
- **Connector secrets**: Update authentication credentials if changing providers

:::tip
When configuring connectors, use FEEL expressions (click the `fx` icon) to reference process variables and build dynamic prompts based on runtime data.
:::

:::info
For a reference of available configuration options, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
:::

## Step 4: Deploy, run, and test your AI agent

You can now deploy and run your AI agent, and test it as a running process on your Camunda cluster running version 8.8 or higher.

Once you have started your process, you can then monitor the execution in [Operate](/components/operate/operate-introduction.md).

### What to expect during execution

When you run the AI agent process:

1. The AI agent receives your prompt and analyzes it
2. It determines which tools from the ad-hoc subprocess to activate
3. Tasks may execute in parallel or sequentially based on the agent's decisions
4. Process variables are updated as each tool completes
5. The agent may iterate through multiple tool calls to fulfill complex requests

You can observe this dynamic behavior in real-time through Operate, where you'll see which tasks were activated and in what order.

### SaaS

In this example, you can quickly test the AI agent using the [Play](/components/modeler/web-modeler/play-your-process.md) feature.

1. Select the **Play** tab.
1. Select the cluster you want to deploy and play the process on.
1. Open the Start form and add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start instance**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer. Open the **Task form** to view the result.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish your testing and complete the process.

:::note
Instead of using Play, you can also deploy and run the process, and use Tasklist to complete the form.
:::

### Self-Managed (local environment)

1. Deploy the process model to your local Camunda 8 environment using [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Open Tasklist in your browser (for example at http://localhost:8080/tasklist, depending on your environment).
1. On the `Processes` tab, find the `AI Agent Chat With Tools` process and click **Start process**.
1. In the start form, add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start process**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer.
1. Select the `Tasks` tab in Tasklist. When the AI agent finishes processing, you should see either a `User Feedback` or a `Ask human to send email` task waiting for you to complete.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish the process.

### Example prompts {#example-prompts}

The following example prompts are provided as guidance to help you test your AI agent.

| Prompt                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Send Ervin a joke"                          | <p>Showcases multiple tool call iterations. The AI agent fetches a list of users, finds the matching user, fetches a joke, and compiles an email to send to the user (Ervin) with the joke.</p><p>For easier testing, it does not actually send an email, but uses a user task to instruct a "human operator" to handle sending the email. The operator can give feedback, such as "I can't send an email without emojis" or "include a Spanish translation".</p> |
| "What is the superflux product of 3 and 10?" | Executes an imaginary superflux calculation, using the provided tool.                                                                                                                                                                                                                                                                                                                                                                                             |
| "Go and fetch \<url\> and tell me about it"  | The AI agent fetches the specified URL and provides you with a summary of the content. After returning with a response, you can ask follow-up questions.                                                                                                                                                                                                                                                                                                          |
| "Tell me about this document"                | You can upload a document in the prompt form, and get the AI agent to provide you with a summary of the content. Note that this is limited to smaller documents by the Bedrock API.                                                                                                                                                                                                                                                                               |

## Next steps

Now that you have seen how easy it is to build a simple Camunda AI agent, why not try customizing it further?

For example:

- Add and configure more tools in the ad-hoc sub-process that the AI agent can use.
- Change the provided system prompt to adjust the behavior of the AI agent.
- Experiment with different model providers and configurations in the AI Agent connector.

Learn more about building and deploying agentic orchestration and advanced AI agents in your processes:

- [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration.md)
- [Camunda AI agents](/components/agentic-orchestration/ai-agents.md)
- [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)
- [Building Your First AI Agent in Camunda (blog)](https://camunda.com/blog/2025/02/building-ai-agent-camunda/) - Step-by-step guide with video tutorial showing a fraud detection example

:::info Camunda Academy
Register for the free [Camunda 8 - Agentic Orchestration](https://academy.camunda.com/path/c8-lp-agentic) course and learn how to model, deploy, and manage AI agents seamlessly into your end-to-end processes.
:::
