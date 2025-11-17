---
id: getting-started-agentic-orchestration
title: "Build your first AI agent"
sidebar_label: Build your first AI agent
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

Get started with Camunda [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) by building and running your first [AI agent](/components/agentic-orchestration/ai-agents.md).

In Camunda, an **AI agent** refers to an automation mechanism that leverages [ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to perform tasks with non-deterministic behavior.

AI agents represent the practical implementation of agentic process orchestration within the Camunda ecosystem, combining the flexibility of AI with the reliability of traditional process automation.

## About this guide

In this guide, you will:

- Run Camunda 8 using [Camunda 8 SaaS](https://accounts.cloud.camunda.io/signup) or locally with [Camunda 8 Self-Managed](/self-managed/about-self-managed.md).
- Deploy and start a business process using [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) or locally with [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
- Use an [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) to provide interaction and reasoning capabilities for the AI agent.
- Use an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to define the tools the AI agent should use.

Once you have completed this guide, you will have an example of an AI agent running within Camunda 8.

## Prerequisites

The following prerequisites are required to build your first AI agent:

| Prerequisite                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 environment            | <p>To run your agent, you must have Camunda 8 (version 8.8 or newer) running using either:</p><p><ul><li><p> [Camunda 8 Self-Managed](/self-managed/about-self-managed.md). For example, see [Run your first local project](../getting-started-example).</p></li><li><p> [Camunda 8 SaaS](/components/saas/saas.md). For example, [sign up for a free SaaS trial account](https://accounts.cloud.camunda.io/signup).</p></li></ul></p>                                                                                                  |
| A supported LLM provider account | <p>The AI Agent connector supports multiple model providers. This guide assumes you have access to an AWS account with permissions for the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html).</p> <p> You can use a different LLM provider instead, such as OpenAI or Anthropic. For more information on how to configure the connector with your preferred LLM provider, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).</p> |

:::important
The AI Agent connector example in this guide is preconfigured to use AWS Bedrock with Claude Sonnet 4 in the `us-east-1` region.

To use it without changes, you must first request access to Anthropic Claude foundation models using the AWS console. See [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) for more details.
:::

## Step 1: Install the example model blueprint

To start building your first AI agent, you can use a prebuilt Camunda blueprint process model.

In this tutorial, you will use the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) blueprint from [Camunda marketplace](https://marketplace.camunda.com/en-US/home).
Depending on the environment you choose, follow the corresponding steps below.

### SaaS

1. In the blueprint page, click **For SAAS** and select the project you want to save the blueprint in, or create a new project and save it in this.
1. The blueprint BPMN diagram opens in Web Modeler.

### Self-Managed (local environment)

1. In the blueprint page, click **For SM** and download the blueprint files from the repository.
1. Open the blueprint BPMN diagram in Desktop Modeler or in Web Modeler.

### About the example AI agent process

The example AI agent process is a chatbot that you (the user) can chat and interact with via a [user task form](/components/modeler/forms/camunda-forms-reference.md).

<img src={AiAgentExampleDiagramImg} alt="A example AI agent BPMN process diagram"/>

The process showcases how an AI agent can:

- **Make autonomous decisions** about which tasks to execute based on your input.
- **Adapt its behavior** dynamically using the context provided.
- **Handle complex scenarios** by selecting and combining different tools.
- **Integrate seamlessly** with other process components.

The example includes a form linked to the start event, allowing you to submit requests ranging from simple questions to more complex tasks, such as document uploads.

<img src={AiAgentStartFormImg} alt="Example AI agent start form" className="img-800"/>

## Step 2: Configure connector secrets

The example process is preconfigured to use AWS Bedrock as the model.
For authentication, it is preconfigured to use the following connector secrets:

- `AWS_BEDROCK_ACCESS_KEY`: The AWS Access Key ID for your AWS account able to call the Bedrock Converse API.
- `AWS_BEDROCK_SECRET_KEY`: The AWS Secret Access Key for your AWS account.

How you configure these secrets depends if you are running Camunda 8 SaaS or a Self-Managed local environment.

- For SaaS and Self-Managed deployments, you can configure the secrets in the [Console](../components/console/manage-clusters/manage-secrets.md).
- For Camunda 8 Run, export the secrets as environment variables before starting the distribution. If you use Camunda 8 Run with Docker, add the secrets in the `connector-secrets.txt` file.

## Step 3: Configure the AI Agent connector (optional)

In the blueprint BPMN diagram, the AI Agent connector template is applied to the `AI Agent` service task.
You can leave it as is or adjust its configuration to test other setups. To do so, use the properties panel of the AI Agent.

<img src={AiAgentPropertiesPanelImg} alt="AI agent properties panel"/>

### Key configuration options

- **Model provider**: Change from AWS Bedrock to OpenAI, Anthropic, or other supported providers.
- **System prompt**: Customize the agent's behavior and personality.
- **Model parameters**: Adjust temperature, max tokens, and other LLM settings.
- **Connector secrets**: Update authentication credentials if changing providers.

:::tip
When configuring connectors, use [FEEL expressions](/components/modeler/feel/language-guide/feel-expressions-introduction.md), by clicking the `fx` icon, to reference process variables and create dynamic prompts based on runtime data.
:::

:::info
For a reference of available configuration options, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
:::

## Step 4: Test your AI agent

You can now deploy and run your AI agent, and test it as a running process on your Camunda cluster running version 8.8 or higher.

Once you have started your process, you can then monitor the execution in [Operate](/components/operate/operate-introduction.md).

### What to expect during execution

When you run the AI agent process:

1. The AI agent receives your prompt and analyzes it.
1. It determines which tools from the ad-hoc subprocess should be activated.
1. Tasks can execute in parallel or sequentially, depending on the agent's decisions.
1. Process variables are updated as each tool completes its execution.
1. The agent may iterate through multiple tool calls to handle complex requests.

You can observe this dynamic behavior in real-time through Operate, where you'll see which tasks were activated and in what order.

### SaaS

In this example, you can quickly test the AI agent using the [Play](/components/modeler/web-modeler/validation/play-your-process.md) feature.

1. Select the **Play** tab.
1. Select the cluster you want to deploy and play the process on.
1. Open the Start form and add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start instance**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer. Open the **Task form** to view the result.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish your testing and complete the process.

:::tip
Instead of using **Play**, you can also test the process within the **Implement** tab using **Deploy & Run**, and use [Tasklist](/components/tasklist/introduction-to-tasklist.md) to complete the form.
:::

### Self-Managed (local environment)

1. Deploy the process model to your local Camunda 8 environment using [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Open Tasklist in your browser. For example at http://localhost:8080/tasklist, depending on your environment.
1. On the **Processes** tab, find the `AI Agent Chat With Tools` process and click **Start process**.
1. In the start form, add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start process**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer.
1. Select the **Tasks** tab in Tasklist. When the AI agent finishes processing, you should see either a `User Feedback` or a `Ask human to send email` task waiting for you to complete.
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

Now that you’ve built your first Camunda AI agent, why not try customizing it further?

For example:

- Add and configure more tools in the ad-hoc sub-process that the AI agent can use.
- Change the provided system prompt to adjust the behavior of the AI agent.
- Experiment with different model providers and configurations in the AI Agent connector.

You can also:

- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
- Read the [Building Your First AI Agent in Camunda](https://camunda.com/blog/2025/02/building-ai-agent-camunda/) blog.
- Explore other [blueprints](https://marketplace.camunda.com/en-US/listing?q=ai&cat=107793&locale=en-US) from Camunda marketplace.

:::info Camunda Academy
Register for the free [Camunda 8 - Agentic Orchestration](https://academy.camunda.com/path/c8-lp-agentic) course to learn how to model, deploy, and manage AI agents seamlessly into your end-to-end processes.
:::
