---
id: getting-started-agentic-orchestration
title: "Build your first AI agent"
sidebar_label: Build your first AI agent
description: "Get started with Camunda agentic orchestration by running your first AI agent."
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

## About

AI agents represent the practical implementation of agentic process orchestration within Camunda, combining the flexibility of AI with the reliability of traditional process automation.

In Camunda, an AI agent refers to an automation solution that uses [ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to perform tasks with non-deterministic behavior.

In this guide, you will:

- Run your AI agent using [Camunda 8 SaaS](https://accounts.cloud.camunda.io/signup) or locally with [Camunda 8 Self-Managed](/self-managed/about-self-managed.md).
- Use an [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) to provide interaction and reasoning capabilities to the AI agent.
- Use an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to define the tools the AI agent should use.
- Integrate a Large Language Model (LLM) into your AI agent.

After completing it, you will have an example AI agent running within Camunda 8.

## Prerequisites

To build your first AI agent, see the prerequisites below depending on:

- Your [working environment](#camunda-8-environment).
- Your [chosen model](#supported-models).

### Camunda 8 environment

To run your agent, you must have Camunda 8 (version 8.8 or newer) running, using either:

- [Camunda 8 SaaS](/components/saas/saas.md). For example, [sign up for a free SaaS trial account](https://accounts.cloud.camunda.io/signup).
- [Camunda 8 Self-Managed](/self-managed/about-self-managed.md). For example, follow [Run your first local project](../getting-started-example).

### Supported models

The AI Agent connector makes it easy to integrate LLMs into your process workflows and can communicate with any LLM that exposes an OpenAI‑compatible API.
See [supported model providers](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#model-provider) for more details.

In this guide, you can try two use cases:

| Setup | Model provider | Model used      | Prerequisites                                                                                                                                                                                                                                                                                                                                                              |
| :---- | :------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud | AWS Bedrock    | Claude Sonnet 4 | <p><ul><li> An AWS account with permissions for the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html).</li><li><p> Anthropic Claude foundation models using the AWS console. See [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) for details.</p></li></ul></p> |
| Local | Ollama         | GPT-OSS:20b     | <p><ul><li> [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) running locally.</li><li><p> Ollama and GPT-OSS:20b installed. See [Set up Ollama](#set-up-ollama) for details.</p></li></ul></p>                                                                                                                                                      |

:::important
Running LLMs locally requires substantial disk space and memory. GPT-OSS:20b requires more than 20GB of RAM to function and 14GB of free disk space to download.
:::

## Step 1: Install the model blueprint

To start building your first AI agent, you can use a Camunda model blueprint from [Camunda marketplace](https://marketplace.camunda.com/en-US/home).

In this guide, you will use the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint.
Depending on your working environment, follow the corresponding steps below.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">
1. In the [blueprint page](https://marketplace.camunda.com/en-US/apps/587865), click **For SAAS** and select or create a project to save the blueprint.
1. The blueprint BPMN diagram opens in Web Modeler.
</TabItem>

<TabItem value="self-managed">
1. In the [blueprint page](https://marketplace.camunda.com/en-US/apps/587865), click **For SM** and download the blueprint files from the repository.
1. Open the blueprint BPMN diagram in Desktop Modeler.
</TabItem>
</Tabs>

### About the example AI agent process

The example AI agent process is a chatbot that you can interact with via a [user task form](/components/modeler/forms/camunda-forms-reference.md).

<img src={AiAgentExampleDiagramImg} alt="A example AI agent BPMN process diagram"/>

This process showcases how an AI agent can:

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

Configure the connector's authentication and template for AWS Bedrock.

#### Configure authentication

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

See [Amazon Bedrock model provider](../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#amazon-bedrock) for more information about other available authentication methods.

#### Configure properties

In the blueprint BPMN diagram, the AI Agent connector template is applied to the `AI Agent` service task.
See [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) for more details.

You can keep the default configuration or adjust it to test other setups. To do so, use the properties panel:

<img src={AiAgentPropertiesPanelImg} alt="AI agent properties panel"/>

</TabItem>

<TabItem value="local">
Configure your local LLM with Ollama.

#### Set up Ollama

1. **Download and install**: Follow [Ollama's documentation](https://docs.ollama.com/quickstart) for details.
2. **Confirm installation**: Start the application and check the running version in a terminal or command prompt with the command `ollama --version`.
3. **Pull the GPT-OSS:20b model**: From the same terminal or command prompt, run `ollama pull gpt-oss:20b`.
4. **Start the local server**: Run `ollama serve`.
5. **Test**: Ollama serves an API by default at `http://localhost:11434`. To test it, use a tool like Postman or run this command from your terminal:

```
curl -X POST http://localhost:11434/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{"model":"gpt-oss:20b","messages":[{"role":"user","content":"Hello!"}]}'
```

#### Configure properties

The example blueprint downloaded in step one is preconfigured to use AWS Bedrock. Update the connector's configuration as follows to use Ollama instead.

Configure Camunda to point to your local Ollama API, which serves the GPT-OSS:20b LLM, using the Model provider and Model sections within the connector's properties panel.

**Model provider**

1. Select **OpenAI Compatible** from the Provider dropdown.
1. The default Ollama API is served at `http://localhost:11434/v1`, so enter this value in the API endpoint field.
1. No authentication or additional headers are required for the local Ollama API, so leave the remaining fields blank.

**Model**

1. Enter `gpt-oss:20b` in the Model field. Note that this field is case-sensitive, so be sure to enter it in all lowercase.

</TabItem>
</Tabs>

:::tip
When configuring connectors, use [FEEL expressions](/components/modeler/feel/language-guide/feel-expressions-introduction.md), by clicking the `fx` icon, to reference process variables and create dynamic prompts based on runtime data.
:::

## Step 3: Test your AI agent

Now deploy and run your AI agent on your Camunda cluster.

:::important
Whether you are testing your agent in Camunda 8 SaaS or locally with Camunda 8 Self-Managed, make sure you’re running a cluster on version 8.8 or higher.
:::

Depending on your working environment, test your agent by following the corresponding steps below.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">
In this example, you can quickly test the AI agent using the [ feature.

1. Open Web Modeler.
1. Make sure Camunda 8.8 or higher is selected in the **Check problems against** field (see the bottom right of the window).
1. Select the [**Play**](/components/modeler/web-modeler/validation/play-your-process.md) tab.
1. Select the cluster you want to deploy and play the process on.
1. Open the Start form and add a prompt for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start instance**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer. Open the **Task form** to view the result.
1. You can monitor the process execution in [Operate](/components/operate/operate-introduction.md). Open it in your browser at http://localhost:8080/operate.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish your testing and complete the process.

:::tip
Instead of using **Play**, you can also test the process within the **Implement** tab using **Deploy & Run**, and use [Tasklist](/components/tasklist/introduction-to-tasklist.md) to complete the form.
:::
</TabItem>

<TabItem value="self-managed">

1. Deploy the process model to your local Camunda 8 environment using [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Make sure Camunda 8.8 or higher is selected. See the bottom left of the window.
1. Open Tasklist in your browser at http://localhost:8080/tasklist.
1. On the **Processes** tab, find the `AI Agent Chat With Tools` process and click **Start process**.
1. In the start form, add a prompt for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start process**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer.
1. Select the **Tasks** tab in Tasklist. When the AI agent finishes processing, you should see either a `User Feedback` or a `Ask human to send email` task waiting for you to complete.
1. You can monitor the process execution in [Operate](/components/operate/operate-introduction.md). Open it in your browser at http://localhost:8080/operate.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish the process.
   </TabItem>
   </Tabs>

### What to expect during execution

When you run the AI agent process:

1. The AI agent receives your prompt and analyzes it.
1. It determines which tools from the ad-hoc subprocess should be activated.
1. Tasks can execute in parallel or sequentially, depending on the agent's decisions.
1. Process variables are updated as each tool completes its execution.
1. The agent may iterate through multiple tool calls to handle complex requests.

You can observe this dynamic behavior in real-time through Operate, where you'll see which tasks were activated and in what order.

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
