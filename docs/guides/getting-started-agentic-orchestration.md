---
id: getting-started-agentic-orchestration
title: "Build your first AI agent"
sidebar_label: Build your first AI agent
description: "Get started with Camunda agentic orchestration by running your first AI agent."
keywords: [agentic orchestration, ai agent]
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AiAgentExampleDiagramImg from './img/ai-agent-example-diagram.png';
import AiAgentStartFormImg from './img/ai-agent-example-start-form.png';
import AiAgentPropertiesPanelImg from './img/ai-agent-properties.png';

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

After completing it, you will have an example AI agent running in Camunda 8.

## Prerequisites

To build your first AI agent, see the prerequisites below depending on:

- Your working environment.
- Your chosen model.

### Camunda 8 environment

To run your agent, you must have Camunda 8 (version 8.8 or newer) running, using either:

- [Camunda 8 SaaS](/components/saas/saas.md). For example, [sign up for a free SaaS trial account](https://accounts.cloud.camunda.io/signup).
- [Camunda 8 Self-Managed](/self-managed/about-self-managed.md). For example, follow [Run your first local project](../getting-started-example).

### Supported models

The AI Agent connector makes it easy to integrate LLMs into your process workflows, with out-of-the-box support for popular model providers. It can also connect to any additional LLM that exposes an OpenAI-compatible API.
See [all supported model providers](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#model-provider) for more details.

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

:::note
If you’re using Camunda 8 Run and installed it using the [starter package](./getting-started-example.md#download-the-camunda-8-starter-package), the blueprint was already downloaded as part of it.
:::

2. Open the blueprint BPMN diagram in Desktop Modeler.

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

:::tip Understand the decision model behind this example
To make this agent reliable, treat each activity in the ad-hoc sub-process as a documented tool. Learn why this matters in [AI agents: Why tool documentation in ad-hoc sub-processes matters](/components/agentic-orchestration/ai-agents.md#why-tool-documentation-in-ad-hoc-sub-processes-matters).

For a runtime view of what the LLM decides vs. what Camunda orchestrates, see [Design and architecture: How execution works in an AI agent](/components/agentic-orchestration/design-architecture.md#how-execution-works-in-an-ai-agent).

For prompt configuration details, see [AI Agent connector: System prompt, user prompt, and tool descriptions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#system-prompt-user-prompt-and-tool-descriptions).
:::

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
Configure the secrets using the [Console](../components/hub/organization/manage-clusters/manage-secrets.md).
</TabItem>

<TabItem value="self-managed">
Export the secrets as environment variables before starting the distribution.
See [Connector secrets](/self-managed/components/connectors/connectors-configuration.md#secrets) for details.

</TabItem>
</Tabs>

See [Amazon Bedrock model provider](../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#amazon-bedrock) for more information about other available authentication methods.

#### Configure properties

In the blueprint BPMN diagram, the AI agent is implemented using the [AI Agent Sub-process connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md).

You can keep the default configuration or adjust it to test other setups. To do so, use the properties panel:

<img src={AiAgentPropertiesPanelImg} alt="AI agent properties panel" width="50%"/>

</TabItem>

<TabItem value="local">
Configure your local LLM with Ollama.

#### Set up Ollama

1. **Download and install**: Follow [Ollama's documentation](https://docs.ollama.com/quickstart) for details.
1. **Confirm installation**: Check the installed version in a terminal or command prompt by running `ollama --version`.
1. **Start the local server**: Start it using the application, or run `ollama serve` in a terminal or command prompt.
1. **Pull the GPT-OSS:20b model**: If it isn't installed by default, run `ollama pull gpt-oss:20b` in a terminal or command prompt to download the model.
1. **Test**: Ollama serves an API at `http://localhost:11434` by default. To test it, open that URL in a browser or run this command in your terminal:

```
curl -X POST http://localhost:11434/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{"model":"gpt-oss:20b","messages":[{"role":"user","content":"Hello!"}]}'
```

#### Configure properties

The example blueprint downloaded in step one is preconfigured to use AWS Bedrock. Update the connector's configuration using the Model provider and Model sections to use Ollama instead.

**Model provider**

1. Select **OpenAI Compatible** from the **Provider** dropdown.
1. Enter `http://localhost:11434/v1` in the **API endpoint** field. This is Ollama's default API URL.
1. No authentication or additional headers are required for the local Ollama API, so leave the remaining fields blank.

**Model**

1. Enter `gpt-oss:20b` in the **Model** field. This field is case-sensitive, so be sure to enter it in all lowercase.

</TabItem>
</Tabs>

:::tip
When configuring connectors, use [FEEL expressions](/components/modeler/feel/language-guide/feel-expressions-introduction.md), by clicking the `fx` icon, to reference process variables and create dynamic prompts based on runtime data.
:::

## Step 3: Test your AI agent

Deploy and run your AI agent in your Camunda cluster.

:::important
Whether you are testing your agent in Camunda 8 SaaS or locally with Camunda 8 Self-Managed, make sure you’re running a cluster with version 8.8 or higher.
:::

Depending on your working environment, test your agent by following the corresponding steps below.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">

1. Open [Web Modeler](/components/modeler/web-modeler/index.md).
1. Select the [**Play**](/components/modeler/web-modeler/validation/play-your-process.md) tab.
1. Select the cluster you want to deploy and play the process on.
1. Open the Start form and add a prompt for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start instance**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer. Open the **Task form** to view the result.
1. You can monitor the process execution in [Operate](/components/operate/operate-introduction.md).
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish your testing and complete the process.

:::tip
Instead of using **Play**, you can also test the process within the **Implement** tab using **Deploy & Run**, and use [Tasklist](/components/tasklist/introduction-to-tasklist.md) to complete the form.
:::
</TabItem>

<TabItem value="self-managed">

1. Deploy the process model to your local Camunda 8 environment using [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Open Tasklist in your browser at http://localhost:8080/tasklist.
1. On the **Processes** tab, find the `AI Agent Chat With Tools` process and click **Start process**.
1. In the start form, add a prompt for the AI agent. For example, enter "Tell me a joke" in the **How can I help you today?** field, and click **Start process**.
1. The AI agent analyzes your prompt, decides what tools to use, and responds with an answer.
1. Select the **Tasks** tab in Tasklist. When the AI agent finishes processing, you should see a `User Feedback` task waiting for you to complete.
1. You can monitor the process execution in [Operate](/components/operate/operate-introduction.md). Open it in your browser at http://localhost:8080/operate.
1. You can follow up with more prompts to continue testing the AI agent. Select the **Are you satisfied with the result?** checkbox when you want to finish the process.

</TabItem>
</Tabs>

### What to expect during execution

When you run the AI agent process:

1. The AI agent receives your prompt and analyzes it together with the configured system prompt and tool descriptions.
1. The LLM determines which tools from the ad-hoc subprocess should be activated.
1. Camunda executes the selected BPMN activities.
1. Tasks can execute in parallel or sequentially, depending on the agent's decisions and process state.
1. Process variables are updated as each tool completes its execution.
1. The agent may iterate through multiple tool calls to handle complex requests.

You can observe this dynamic behavior in real-time through Operate, where you'll see which tasks were activated and in what order.

## Step 4: Add your first tool

You can customize your AI agent by adding tools. In this section, you will add a tool that fetches weather conditions for a given location using the [Open-Meteo API](https://open-meteo.com/).

### Add a REST connector task

1. Inside the AI agent sub-process, add a new task element.
1. Change the task type to [**REST Outbound Connector**](/components/connectors/protocol/rest.md) using the **Change element** menu.
1. Name the task. For example, `Get current weather`. This name is visible to the LLM as the tool name.

### Write a tool description

The LLM selects tools based on their description. Open the **Documentation** field in the properties panel and add a clear description of what the tool does and when to use it. For example:

```
Fetches current weather conditions for a given location. Use this tool when the user asks about weather, temperature, wind, or climate conditions for a city or place. Returns temperature in Celsius, wind speed, and a weather description.
```

:::tip
Provide as much context as possible in tool descriptions to help the LLM select the right tool and generate proper inputs.
:::

### Configure the REST connector

Set up the HTTP request in the properties panel:

1. In the **Authentication** section, select **None**.
1. In the **HTTP Endpoint** section:
   - Set **Method** to **GET**.
   - Set **URL** to the following [FEEL expression](/components/modeler/feel/language-guide/feel-expressions-introduction.md) by clicking the `fx` icon:

     ```feel
     "https://api.open-meteo.com/v1/forecast"
     ```

   - Set **Query parameters** to:

   ```feel
   {
       latitude: fromAi(toolCall.latitude, "Latitude of the location to check weather for", "string"),
       longitude: fromAi(toolCall.longitude, "Longitude of the location to check weather for", "string"),
       current: "temperature_2m,wind_speed_10m,weather_code"
   }
   ```

The [`fromAi()`](../components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) calls tell the AI Agent connector which parameters the LLM must provide. At runtime, the LLM generates the latitude and longitude values based on the user's request, while the `current` parameter is a fixed value that selects which weather fields to return.

### Map the response to `toolCallResult`

Each tool within the AI agent sub-process must return its result in a `toolCallResult` variable so the AI Agent connector can pass it back to the LLM.

In the **Output Mapping** section, set **Result Expression** to:

```feel
{
    toolCallResult: {
        latitude: response.body.latitude,
        longitude: response.body.longitude,
        temperature_celsius: response.body.current.temperature_2m,
        wind_speed_kmh: response.body.current.wind_speed_10m,
        weather_code: response.body.current.weather_code
    }
}
```

This extracts the relevant fields from the Open-Meteo API response and returns them in a structure the LLM can interpret and summarize for the user.

### Test the new tool

Deploy the updated process and start a new instance. Try prompts like:

- _"What's the weather in Paris right now?"_
- _"Is it windy in Tokyo?"_
- _"Tell me the temperature in New York"_

The LLM will recognize these as weather requests, select the **Get current weather** tool, provide the appropriate latitude and longitude values, and summarize the response in natural language.

### Add your own tools

To add more tools to your agent, follow the same pattern:

1. Add a task inside the ad-hoc sub-process and apply a [connector](/components/connectors/introduction.md) or configure a [job worker](/components/concepts/job-workers.md).
1. Write a clear tool name and **Documentation** description so the LLM knows when to use it.
1. Use [`fromAi()`](../components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) in input mappings to define the parameters the LLM must provide.
1. Return `toolCallResult` in the result expression or output mapping.

At runtime, each tool call produces one `toolCallResult`, and the ad-hoc multi-instance output collection aggregates them into `toolCallResults` for the AI Agent connector.

:::tip
For more examples, review the tasks already available in this blueprint and the [AI Agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md) documentation.
:::

## Next steps

Now that you’ve built your first Camunda AI agent, you can tailor it further.
For example:

- Add and configure more tools.
- Update the system prompt to adjust the AI agent's behavior.
- Experiment with different model providers and configurations in the AI Agent connector.

Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).

:::info Camunda Academy
Register for the free [Camunda 8 - Agentic Orchestration](https://academy.camunda.com/path/c8-lp-agentic) course to learn how to model, deploy, and manage AI agents in your end-to-end processes.
:::
