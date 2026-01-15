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

In Camunda, an **AI agent** refers to an automation solution that uses [ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to perform tasks with non-deterministic behavior.

AI agents represent the practical implementation of agentic process orchestration within Camunda, combining the flexibility of AI with the reliability of traditional process automation.

## About this guide

In this guide, you will:

- Run Camunda 8 using [Camunda 8 SaaS](https://accounts.cloud.camunda.io/signup) or locally with [Camunda 8 Self-Managed](/self-managed/about-self-managed.md).
- Deploy and start a business process using [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) or locally with [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
- Use an [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) to provide interaction and reasoning capabilities for the AI agent.
- Use an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to define the tools the AI agent should use.

Once you have completed this guide, you will have an example AI agent running within Camunda 8.

## Prerequisites

To build your first AI agent, see the prerequisites below depending on:

- Your [working environment](#camunda-8-environment).
- Your [chosen model](#supported-models).

### Camunda 8 environment

To run your agent, you must have Camunda 8 (version 8.8 or newer) running, using either:

- [Camunda 8 SaaS](/components/saas/saas.md). For example, [sign up for a free SaaS trial account](https://accounts.cloud.camunda.io/signup).
- [Camunda 8 Self-Managed](/self-managed/about-self-managed.md). For example, see [Run your first local project](../getting-started-example).

### Supported models

The AI Agent connector makes it easy to integrate Large Language Models (LLMs) into your process workflows.
It supports multiple model providers and can communicate with any LLM that exposes an OpenAI‑compatible API.

In this guide, you can try two use cases:

| Setup | Model provider | Model used      | Prerequisites                                                                                                                                                                                                                                                                                                                                                              |
| :---- | :------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud | AWS Bedrock    | Claude Sonnet 4 | <p><ul><li> An AWS account with permissions for the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html).</li><li><p> Anthropic Claude foundation models using the AWS console. See [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) for details.</p></li></ul></p> |
| Local | Ollama         | GPT-OSS:20b     | <p><ul><li> [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) running locally.</li><li><p> Ollama and GPT-OSS:20b installed. See [Ollama's documentation](https://docs.ollama.com/) for details.</p></li></ul></p>                                                                                                                                   |

:::important
LLMs require a significant amount of available disk space and memory. GPT-OSS:20b requires more than 20GB of RAM to function and 14GB of free disk space to download.
:::

You can use a different LLM provider instead, such as OpenAI or Anthropic. For more information on how to configure the connector with your preferred LLM provider, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).

## Step 1: Install the example model blueprint

To start building your first AI agent, you can use a prebuilt Camunda blueprint process model.

In this tutorial, you will use the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) blueprint from [Camunda marketplace](https://marketplace.camunda.com/en-US/home).
Depending on your Camunda 8 working environment, follow the corresponding steps below.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">
1. In the blueprint page, click **For SAAS** and select or create a project to save the blueprint.
1. The blueprint BPMN diagram opens in Web Modeler.
</TabItem>

<TabItem value="self-managed">
1. In the blueprint page, click **For SM** and download the blueprint files from the repository.
1. Open the blueprint BPMN diagram in Desktop Modeler or in Web Modeler.
</TabItem>
</Tabs>

### About the example AI agent process

The example AI agent process is a chatbot that you can interact with via a [user task form](/components/modeler/forms/camunda-forms-reference.md).

<img src={AiAgentExampleDiagramImg} alt="A example AI agent BPMN process diagram"/>

The process showcases how an AI agent can:

- **Make autonomous decisions** about which tasks to execute based on your input.
- **Adapt its behavior** dynamically using the context provided.
- **Handle complex scenarios** by selecting and combining different tools.
- **Integrate seamlessly** with other process components.

The example includes a form linked to the start event, allowing you to submit requests ranging from simple questions to more complex tasks, such as document uploads.

<img src={AiAgentStartFormImg} alt="Example AI agent start form" className="img-800"/>

## Step 2: Configure the AI Agent connector

Depending on your model choice, configure the AI Agent connector accordingly.

<Tabs groupId="setup" defaultValue="aws" values={
[
{ label: 'AWS Bedrock', value: 'aws', },
{ label: 'Ollama', value: 'local', },
]}>

<TabItem value="aws">

Configure the connector secrets and template for AWS Bedrock.

### Configure connector secrets

The example blueprint downloaded in step one is preconfigured to use AWS Bedrock.
For authentication, it uses the following connector secrets:

- `AWS_BEDROCK_ACCESS_KEY`: The AWS Access Key ID for your AWS account able to call the Bedrock Converse API.
- `AWS_BEDROCK_SECRET_KEY`: The AWS Secret Access Key for your AWS account.

You will configure these secrets differently depending on your working environment.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">
Configure the secrets using the [Console](../components/console/manage-clusters/manage-secrets.md).
</TabItem>

<TabItem value="self-managed">
Export the secrets as environment variables before starting the distribution. If you use Camunda 8 Run with Docker, add the secrets in the `connector-secrets.txt` file.
</TabItem>
</Tabs>

### Configure the connector template

In the blueprint BPMN diagram, the AI Agent connector template is applied to the `AI Agent` service task.
You can leave it as is or adjust its configuration to test other setups. To do so, use the properties panel of the AI Agent:

<img src={AiAgentPropertiesPanelImg} alt="AI agent properties panel"/>

</TabItem>

<TabItem value="local">
Configure your local LLM with Ollama.

### Configure the connector template

The example blueprint downloaded in step one is preconfigured to use AWS Bedrock. Therefore, update the connector template as follows to use Ollama instead.

The **Model provider** and **Model** are the sections where you configure Camunda to point to your local Ollama API, which serves the GPT-OSS:20b LLM.

#### Model provider section

1. Select **OpenAI Compatible** from the Provider dropdown.
1. The default Ollama API is served at `http://localhost:11434/v1`, so enter this value in the API endpoint field.

No authentication or additional headers are required for the local Ollama API, so you can leave the remaining fields blank.

#### Model section

1. Enter `gpt-oss:20b` in the Model field. Note that this field is case-sensitive, so be sure to enter it in all lowercase.

</TabItem>
</Tabs>

:::tip
When configuring connectors, use [FEEL expressions](/components/modeler/feel/language-guide/feel-expressions-introduction.md), by clicking the `fx` icon, to reference process variables and create dynamic prompts based on runtime data.
:::

:::info
For a reference of available configuration options, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
:::

## Step 3: Test your AI agent

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

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">
In this example, you can quickly test the AI agent using the [Play](/components/modeler/web-modeler/validation/play-your-process.md) feature.

1. Select the **Play** tab.
1. Select the cluster you want to deploy and play the process on.
1. Open the Start form and add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start instance**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer. Open the **Task form** to view the result.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish your testing and complete the process.

:::tip
Instead of using **Play**, you can also test the process within the **Implement** tab using **Deploy & Run**, and use [Tasklist](/components/tasklist/introduction-to-tasklist.md) to complete the form.
:::
</TabItem>

<TabItem value="self-managed">
1. Deploy the process model to your local Camunda 8 environment using [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Open Tasklist in your browser. For example at http://localhost:8080/tasklist, depending on your environment.
1. On the **Processes** tab, find the `AI Agent Chat With Tools` process and click **Start process**.
1. In the start form, add a [starting prompt](#example-prompts) for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start process**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer.
1. Select the **Tasks** tab in Tasklist. When the AI agent finishes processing, you should see either a `User Feedback` or a `Ask human to send email` task waiting for you to complete.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish the process.
</TabItem>
</Tabs>

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
- Explore other [AI blueprints](https://marketplace.camunda.com/en-US/listing?q=ai&cat=107793&locale=en-US) from Camunda marketplace.

:::info Camunda Academy
Register for the free [Camunda 8 - Agentic Orchestration](https://academy.camunda.com/path/c8-lp-agentic) course to learn how to model, deploy, and manage AI agents in your end-to-end processes.
:::
