---
id: agentic-ai-aiagent
sidebar_label: AI Agent
title: AI Agent connector
description: AI agent connector implementing a feedback loop using for user interactions and toolcalls with an LLM.
---

Camunda has taken a systemic, future-ready approach for agentic AI by building on the proven foundation of BPMN. At the
core of this approach is our use of the BPMN ad-hoc sub-process construct, which allows for tasks to be executed in any
order, skipped, or repeated—all determined dynamically at runtime based on the context of the process instance.

The **AI Agent connector** is an outbound connector that implements the Large Language Model (LLM) interaction paired
with a feedback loop for user interactions and tool calls. It is designed to be used in combination with an ad-hoc
sub-process defining the tools to be used, but can also be used independently.

The core features provided by the AI Agent connector are:

- Support for **different LLM providers**
- **Conversational/short-term memory** handling to enable feedback loops. For example a user can ask follow-up questions
  to
  an agent response.
- **Tool calling** support to make the agent capable of interacting with tasks within the ad-hoc sub-process. This
  allows leveraging all Camunda features such as connectors and user tasks (human-in-the-loop). The AI Agent connector
  provides automatic **tool resolution** to identify the tools available in the ad-hoc sub-process.

## Concepts

![agenticai-ai-agent-loop.png](../img/agenticai-ai-agent-loop.png)

The basic concept of the AI Agent connector is to be used as part of a **feedback loop**, re-entering the AI Agent
connector task multiple times. Depending on your use case, the connector can be part of different loops:

- **Response interaction loop:** after returning a response (and not calling any tools), the process can be modeled to
  act upon the response. For example, the response can be presented to a user who might ask follow-up questions which
  can be fed back to the AI Agent connector.
- **Tool calling loop:** In combination with an ad-hoc sub-process, the AI Agent connector will resolve available tools
  and their input parameters and pass these tool definitions to the LLM. The LLM will then generate a response, which
  might include tool calls (a request to call a tool paired with the input parameters). If tool calls are requested,
  the process can be modelled to pass these tool calls to the ad-hoc sub-process and to return the tool call results
  to the AI Agent task by modelling the feedback loop as shown in the figure above.

As the agent preserves the context of the conversation, follow-up questions/tasks and handling of tool call results can
relate to the previous interaction with the LLM, allowing the LLM to provide more relevant responses.

A crucial concept to make this work is the **Agent context** process variable which contains all the needed information
to allow re-entering the AI Agent connector task with the same context as before. This variable is both mapped as
**input** and **output** variable of the connector and will be updated on each agent execution.

:::important
When modelling an AI Agent, make sure to align the agent context input variable and the response variable/expression so
that the context update is correctly passed to the next execution of the AI Agent connector task.
:::

### Example conversation

On a high level the conversation with the AI Agent connector, including both user and tool feedback loops, can look like
the following. The conversation awareness provided by the agent context allows use cases like the user just responding
with `Yes, please proceed` and the agent understanding what to do next.

```
# Initial input/user prompt
User: Is John Doe eligible for a credit card?

# Tool feedback loop
AI Agent: Call the `Check_Credit_Card_Eligibility` tool with the following parameters: {"name": "John Doe"}
<process routes through ad-hoc sub-process>
Tool Call Result: {"Check_Credit_Card_Eligibility": {"eligible": true}}

# User feedback loop
AI Agent: John Doe is eligible for a credit card. Would you like to proceed?
<process routes to a user task as no tool calls are requested>
User: Yes, please proceed.

AI Agent: Call the `Create_Credit_Card` tool with the following parameters: {"name": "John Doe"}
Tool Call Result: {"Create_Credit_Card": {"success": true}}

Agent: John Doe's credit card has been created successfully.
```

## Configuration

## Modelling the tools feedback loop

## Tool Resolution

When resolving the available tools within an ad-hoc sub-process, the AI Agent will take all activities into account
which **have no incoming flows** (root nodes within the ad-hoc sub-process) and **are not boundary events**. In the
following screenshot, the activities marked in red are the ones that will be considered as tools:

![agenticai-tool-resolution.png](../img/agenticai-tool-resolution.png)

As you can see, you are free to use any BPMN elements and connectors as tools and to model sub-flows within the ad-hoc
sub-process.

### Tool Definitions

:::important
When resolving a tool definition, the AI Agent connector will only consider the **root node** of the sub-flow.
:::

A tool definition consists of the following properties which will be passed to the LLM. The tool definition is closely
modeled after the
[list tools response](https://modelcontextprotocol.io/specification/2025-03-26/server/tools#listing-tools) as defined in
the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

- **name**: The name of the tool. This is the **ID of the activity** in the ad-hoc sub-process.
- **description**: The description of the tool, telling an LLM the purpose of the tool. If the
  **documentation** of the activity is set, it will be used as the description, otherwise the **name** of the activity
  will be used. Make sure to provide a meaningful description to help the LLM understand the purpose of the tool.
- **inputSchema**: The input schema of the tool, describing the input parameters of the tool. The connector will analyze
  all input/output mappings of the activity and will create a [JSON Schema](https://json-schema.org/) based on the
  [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) function calls
  defined in these mappings. If no `fromAi` function calls are found, an empty JSON Schema object will be returned.

:::note
Provide as much context and guidance in tool definitions and input parameter definitions as you can to ensure the LLM
selects the right tool and generates proper input values.

You can find best practices for tool definitions on
the [Anthropic docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#example-of-a-good-tool-description).
:::

### AI-generated parameters via `fromAi`

Within an activity, you can define parameters which should be AI-generated by tagging them with the
[`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function in
input/output mappings.

The function itself does not implement any logic (it simply returns the first argument it receives), but provides a way
to configure all the necessary metadata (e.g. description, type) to generate an input schema definition. The tools
schema connector will collect all `fromAi` definitions within an activity and combine them into an input schema for
the activity.

:::note
The first argument passed to the `fromAi` function must be a reference type (e.g. not a static string) as this
reference can be used by an AI integration to inject the value.
:::

:::important
It depends on the AI integration you are using in combination with the tool resolving, but for the `AI Agent` connector
it is important that the input is referencing a variable which is used to store all the input parameters for an
individual tool execution. For example `toolCall.myParameter` (`toolCall` containing all variables for the individual
tool call).
:::

You can use the `fromAi` function in:

- Input & Output mappings (e.g Service Task, Script Task, User Task)
- Custom input fields provided by an element template if an element template is applied to the activity as technically
  these are handled as input mappings.

An example of `fromAi` function usage on a [REST outbound connector](../protocol/rest.md):

![agenticai-tool-resolution-fromAi.png](../img/agenticai-tool-resolution-fromAi.png)

#### `fromAi` examples

The [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function
can be called with a varying number of parameters to define simple or complex inputs. The simplest form is to just pass
a value:

```feel
fromAi(toolCall.url)
```

To make a LLM understand the purpose of the input, you can add a description:

```feel
fromAi(toolCall.url, "The URL to download the file from. Should be an RFC 3986 compliant HTTP/HTTPS URL.")
```

To define the type of the input, you can add a type (if no type is given, it will default to `string`):

```feel
fromAi(toolCall.firstNumber, "The first number.", "number")

fromAi(toolCall.shouldCalculate, "Defines if the calculation should be executed", "boolean")
```

For more complex type definitions, the fourth parameter of the function allows you to specify a JSON Schema from a
FEEL context. Note that support for the JSON Schema features is depending on the AI integration. You can find an
extensive list of examples on the [JSON Schema documentation](https://json-schema.org/learn/miscellaneous-examples).

```feel
fromAi(
  toolCall.myComplexObject,
  "A complex object",
  "string",
  { enum: ["first", "second"] }
)
```

## Agent Response

TBD
