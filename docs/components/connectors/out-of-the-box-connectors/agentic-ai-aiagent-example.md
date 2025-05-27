---
id: agentic-ai-aiagent-example
sidebar_label: Example integration
title: Example AI Agent connector integration
description: AI agent connector implementing a feedback loop using for user interactions and toolcalls with an LLM.
---

This worked example shows how you can integrate an AI Agent connector into a feedback loop model.

## About this worked example

This worked example demonstrates how you can use the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) and an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to model AI Agent [tools and response interaction feedback loops](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#feedback-loop-use-cases).

## Example tools feedback loop {#tools-loop}

First, an AI Agent connector is added and configured, and then an ad-hoc sub-process is added in a feedback loop to connect the agent to the tools it needs.

![aiagent-tools-loop-empty.png](../img/agenticai-tools-loop-empty.png)

### Add ad-hoc sub-process and loop

1. An ad-hoc sub-process is added and marked as a [parallel multi-instance](../../modeler/bpmn/multi-instance/multi-instance.md). This allows the process to execute the tools in parallel, and wait for all tool calls to complete before continuing with the process.

1. A descriptive ID is configured for the ad-hoc sub-process. This is then entered in the **Ad-hoc sub-process ID** field in the [tools](agentic-ai-aiagent.md#tools) section of the AI Agent connector.

1. A loop is then modeled into the sub-process and back to the AI Agent connector.

   - The `no` flow of the `Contains tool calls?` gateway is marked as the default flow.

   - The `yes` flow condition is configured to be activated when the AI Agent response contains a list of tool calls. If the suggested default values for the [result variable/expression](#result-variableexpression) are used, this condition could be configured as follows:

     ```feel
     not(agent.toolCalls = null) and count(agent.toolCalls) > 0
     ```

     This means execution routes through the ad-hoc sub-process if the LLM response requests one or more tools to be called.

### Configure multi-instance execution

:::note
Use the suggested values as a starting point and change them to your needs if needed or when dealing with multiple
agents within the same process.
:::

As stated above, the ad-hoc sub-process needs to be configured as a **parallel multi-instance** sub-process. This
ensures that:

- Tools can be called **independently of each other**, each with its own set of input parameters. This also implies that
  the same tool can be called **multiple times with different parameters** within the same ad-hoc sub-process execution.
  For example, a _Lookup user_ tool could be called multiple times with different user IDs.
- The process can **wait until all requested tools have been executed** before passing the results back to the AI
  Agent/LLM. After all tools have been executed, results will be passed back to the AI Agent connector.

The multi-instance configuration is the same for each agent configuration, and it will be possible to reuse a template
to make this configuration easier. For the moment, you need to configure the following properties.

- **Input collection**: set this to the list of tool calls your AI Agent connector returns, for example
  `agent.toolCalls`.
- **Input element**: this will contain the individual tool call including LLM-generated input parameters based on
  the [tool definition](#tool-definitions). Suggested value: `toolCall`. This needs to be aligned with
  the `fromAi` function calls in the tool definition.
- **Output collection**: this will collect the results of all the requested tool calls. Suggested value:
  `toolCallResults`. Make sure to pass this value as [Tool Call Results](#tools) in the AI Agent configuration.
- **Output element**: this will collect the individual tool call result as returned by an individual tool
  (see [Tool Call Responses](#tool-call-responses)). When changing ths `toolCallResult` to something else, make sure
  to also change your tools to write to the updated variable name.
  ```feel
  {
    id: toolCall._meta.id,
    name: toolCall._meta.name,
    content: toolCallResult
  }
  ```

As a last step, you need to configure the element to activate to the ad-hoc sub-process. As we're using a multi-instance
configuration, this is always a single task ID of the tool being executed in the individual instance. Configure
**Active elements collection** to contain exactly `[toolCall._meta.name]`.

After configuring all of the above, your ad-hoc sub-process configuration should look like the following:

![agenticai-ad-hoc-sub-process-multi-instance.png](../img/agenticai-ad-hoc-sub-process-multi-instance.png)

## Modeling a response interaction feedback loop

:::note
How exactly this needs to be modeled highly depends on your use case. The example below is expecting a simple feedback
action based on a user task, but this could also be interacting with other process flows or with another
agent process.

For example, instead of the user task, you could also use another LLM connector to verify the response of the AI Agent.
An example of such a pattern can be found in
the [Fraud Detection Example](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/fraud-detection).
:::

Similar to the tools feedback loop, another feedback loop acting on the agent response can be added by re-entering the
AI Agent connector with new information. You need to make sure to model your user prompt in a way that it adds the
follow-up data instead of the initial request.

For example, your **User Prompt** field could contain the following FEEL expression to make sure it acts upon follow-up
input:

```feel
=if (is defined(followUpInput)) then followUpInput else initialUserInput
```

![agenticai-user-feedback-loop.png](../img/agenticai-user-feedback-loop.png)

## Tool Resolution

When resolving the available tools within an ad-hoc sub-process, the AI Agent will take all activities into account
which **have no incoming flows** (root nodes within the ad-hoc sub-process) and **are not boundary events**. In the
following screenshot, the activities marked in red are the ones that will be considered as tools:

![agenticai-tool-resolution.png](../img/agenticai-tool-resolution.png)

As you can see, you are free to use any BPMN elements and connectors as tools and to model sub-flows within the ad-hoc
sub-process.

To resolve available tools the AI Agent connector will:

- Read the BPMN model and look up the ad-hoc sub-process by the configured ID. If it cannot be found, the connector will
  throw an error.
- Iterate over all activities within the ad-hoc sub-process and check if they are root nodes (no incoming flows) and not
  boundary events.
- For each activity found, it will analyze the input/output mappings and look for the
  [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) function calls
  which define parameters which need to be provided by the LLM.
- The connector will then create a tool definition for each activity found and pass these tool definitions to the LLM
  as part of the prompt.

:::note
The [Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview) and
[OpenAI](https://platform.openai.com/docs/guides/function-calling) docs contain good examples how tool/function calling
works in combination with an LLM.
:::

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
schema resolution will collect all `fromAi` definitions within an activity and combine them into an input schema for
the activity.

:::important
The first argument passed to the `fromAi` function must be a reference type (e.g. not a static string), referencing a
value within the variable defined as **Input element** in the multi-instance configuration. In our examples, we
typically use `toolCall` as the input element. Example value: `toolCall.myParameter`.
:::

By utilizing the `fromAi` tool call as wrapper function around the actual value the connector can both
**describe the parameter** for the LLM by generating a JSON Schema from the function calls and at the same time
**utilize the LLM-generated value** as it can do with any other process variable.

You can use the `fromAi` function in:

- Input & Output mappings (e.g service task, script task, user task)
- Custom input fields provided by an element template if an element template is applied to the activity as technically
  these are handled as input mappings.

An example of `fromAi` function usage on a [REST outbound connector](../protocol/rest.md):

![agenticai-tool-resolution-fromAi.png](../img/agenticai-tool-resolution-fromAi.png)

#### `fromAi` examples

The [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function
can be called with a varying number of parameters to define simple or complex inputs. The simplest form is to just pass
a value.

```feel
fromAi(toolCall.url)
```

This will make the LLM aware that it needs to provide a value for the `url` parameter. As the first value to `fromAi`
needs to be a variable reference, the last segment of the reference will be used as parameter name (`url` in this case).

To make a LLM understand the purpose of the input, you can add a description:

```feel
fromAi(toolCall.url, "Fetches the contents of a given URL. Only accepts valid RFC 3986/RFC 7230 HTTP(s) URLs.")
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

You can combine multiple parameters within the same FEEL expression, for example:

```feel
fromAi(toolCall.firstNumber, "The first number.", "number") + fromAi(toolCall.secondNumber, "The second number.", "number")
```

### Tool Call Responses

To collect the output of the called tool and pass it back to the agent, the task within the ad-hoc sub-process needs to
set its output to the variable configured as `content` when setting up
the [multi-instance execution](#modeling-the-tools-feedback-loop). Typically, this variable is called `toolCallResult`
and can be used from every tool call within the ad-hoc sub-process as the multi-instance execution takes care of
isolating individual tool calls.

This can be achieved in multiple ways, depending on the used task:

- as a [result variable](../use-connectors/index.md#result-variable) or
  a [result expression](../use-connectors/index.md#result-expression) containing a `toolCallResult` key
- as an [output mapping](../../concepts/variables.md#output-mappings) creating the `toolCallResult` variable or adding
  to a part of the `toolCallResult` variable (e.g. an output mapping could be set to `toolCallResult.statusCode`)
- as a [script task](../../modeler/bpmn/script-tasks/script-tasks.md) which sets the `toolCallResult` variable

Tool call results can be either primitive values (e.g. a string) or complex ones, such as
a [FEEL context](../../modeler/feel/language-guide/feel-context-expressions.md) which will be serialized to a JSON
string before passing it to the LLM.

#### Document support

Similar to the [user prompt](#documents), tool call responses can contain
[Camunda Document references](../../../self-managed/document-handling/overview.md) within arbitrary structures
(supporting the same file types as for the user prompt). When serializing the tool call response to JSON, document
references will be transformed to a content block containing the plain text or base64 encoded document content before
passing them to the LLM.
