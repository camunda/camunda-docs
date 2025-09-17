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

First, an AI Agent connector is added and configured in the process diagram. Next, an ad-hoc sub-process is added in a feedback loop to connect the agent to the tools it needs.

![aiagent-tools-loop-empty.png](../img/agenticai-tools-loop-empty.png)

### Add ad-hoc sub-process and loop

1. An ad-hoc sub-process is added and marked as a [parallel multi-instance](../../modeler/bpmn/multi-instance/multi-instance.md). This allows the process to execute the tools in parallel, and wait for all tool calls to complete before continuing with the process.

1. A descriptive ID is configured for the ad-hoc sub-process. This can then be configured in the **Ad-hoc sub-process ID** field in the AI Agent connector [tools](agentic-ai-aiagent.md#tools) section.

1. A loop is modeled into the sub-process and back to the AI Agent connector.

   - The `no` flow of the `Contains tool calls?` gateway is marked as the default flow.

   - The `yes` flow condition is configured to activate when the AI Agent response contains a list of tool calls. For example, if the suggested default values for the [result variable/expression](#result-variableexpression) are used, this condition could be configured as follows:

     ```feel
     not(agent.toolCalls = null) and count(agent.toolCalls) > 0
     ```

     The process execution routes through the ad-hoc sub-process if the LLM response requests one or more tools to be called.

### Configure multi-instance execution

The ad-hoc sub-process in this example is configured as a [parallel multi-instance](../../modeler/bpmn/multi-instance/multi-instance.md) sub-process (instead of sequential multi-instance).

This allows:

- Tools to be called **independently of each other**, each with its own set of input parameters. This also implies that the same tool can be called **multiple times with different parameters** within the same ad-hoc sub-process execution. For example, a _Lookup user_ tool could be called multiple times with different user IDs.

- The process to **wait until all requested tools have been executed** before passing the results back to the AI Agent/LLM. After all tools have been executed, results are passed back to the AI Agent connector.

#### Configure properties

The following properties for the ad-hoc sub-process must be configured. You can use the following suggested values as a starting point and change as required or if dealing with multiple agents within the same process.

- **Input collection**: Set this to the list of tool calls your AI Agent connector returns, for example `agent.toolCalls`.
- **Input element**: Contains the individual tool call, including LLM-generated input parameters based on the [tool definition](#tool-definitions). Suggested value: `toolCall`. This must be aligned with the `fromAi` function calls in the tool definition.
- **Output collection**: Collects the results of all the requested tool calls. Suggested value: `toolCallResults`. Make sure you pass this value as [Tool Call Results](agentic-ai-aiagent.md#tools) in the AI Agent configuration.
- **Output element**: Collects the individual tool call result as returned by an individual tool (see [Tool Call Responses](#tool-call-responses)). When changing this `toolCallResult` to a different value, make sure you also change your tools to write to the updated variable name.
  ```feel
  {
    id: toolCall._meta.id,
    name: toolCall._meta.name,
    content: toolCallResult
  }
  ```

As a final step, the element must be configured to activate the ad-hoc sub-process.

- When using a multi-instance configuration, this is always the single task ID of the tool being executed in the individual instance.
- Configure **Active elements collection** to contain the exact `[toolCall._meta.name]`.

For example, the completed ad-hoc sub-process configuration would look as follows:

![agenticai-ad-hoc-sub-process-multi-instance.png](../img/agenticai-ad-hoc-sub-process-multi-instance.png)

#### Configure an input mapping for the tool call result variable

To prevent interference between tool calls, create an [input mapping](../../concepts/variables.md#input-mappings) for the `toolCallResult` variable. This ensures the variable is created as a local variable within the ad-hoc sub-process.

1. In the **Inputs** section of the ad-hoc sub-process properties panel, add a new entry.
2. In the **Local variable name** field, enter `toolCallResult` (or use your custom variable name if you changed it earlier).
3. Leave the **Variable assignment value** field blank.

## Example response interaction feedback loop {#response-loop}

Similar to the tools feedback loop, another feedback loop acting on the agent response can be added by re-entering the AI Agent connector with new information. You must model your user prompt so that it adds the follow-up data instead of the initial request.

For example, your **User Prompt** field could contain the following FEEL expression to make sure it acts upon follow-up input:

```feel
=if (is defined(followUpInput)) then followUpInput else initialUserInput
```

![agenticai-user-feedback-loop.png](../img/agenticai-user-feedback-loop.png)

:::note
How you model this type of feedback loop greatly depends on your specific use case.

- The example feedback loop expects a simple feedback action based on a user task, but this could also interact with other process flows or another agent process.
- Instead of the user task, you could also use another LLM connector to verify the response of the AI Agent. For an example of this pattern, see the [fraud detection example](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/fraud-detection).
  :::

## Tool Resolution

When resolving the available tools within an ad-hoc sub-process, the AI Agent will take all activities into account which **have no incoming flows** (root nodes within the ad-hoc sub-process) and **are not boundary events**.

For example, in the following image the activities marked in red are the ones that will be considered as tools:

![agenticai-tool-resolution.png](../img/agenticai-tool-resolution.png)

You can use any BPMN elements and connectors as tools and to model sub-flows within the ad-hoc sub-process.

To resolve available tools the AI Agent connector:

- Reads the BPMN model and looks up the ad-hoc sub-process using the configured ID. If not found, the connector throws an error.
- Iterates over all activities within the ad-hoc sub-process and checks that they are root nodes (no incoming flows) and not boundary events.
- For each activity found, analyzes the input/output mappings and looks for the [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) function calls that define the parameters that need to be provided by the LLM.
- Creates a tool definition for each activity found, and passes these tool definitions to the LLM as part of the prompt.

:::note
Refer to the [Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview) and [OpenAI](https://platform.openai.com/docs/guides/function-calling) documentation for examples of how tool/function calling works in combination with an LLM.
:::

### Tool Definitions

:::important
The AI Agent connector only considers the **root node** of the sub-flow when resolving a tool definition.
:::

A tool definition consists of the following properties which will be passed to the LLM. The tool definition is closely modeled after the [list tools response](https://modelcontextprotocol.io/specification/2025-03-26/server/tools#listing-tools) as defined in the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

| Property    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | The name of the tool. This is the **ID of the activity** in the ad-hoc sub-process.                                                                                                                                                                                                                                                                                                                                                                 |
| description | The description of the tool, used to inform the LLM of the tool purpose. If the **documentation** of the activity is set, this is used as the description, otherwise the **name** of the activity is used. Make sure you provide a meaningful description to help the LLM understand the purpose of the tool.                                                                                                                                       |
| inputSchema | The input schema of the tool, describing the input parameters of the tool. The connector will analyze all input/output mappings of the activity and create a [JSON Schema](https://json-schema.org/) based on the [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) function calls defined in these mappings. If no `fromAi` function calls are found, an empty JSON Schema object is returned. |

:::note
Provide as much context and guidance in tool definitions and input parameter definitions as you can to ensure the LLM
selects the right tool and generates proper input values.

Refer to the [Anthropic documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#example-of-a-good-tool-description) for tool definition best practices.
:::

### AI-generated parameters via `fromAi`

Within an activity, you can define parameters which should be AI-generated by tagging them with the
[`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function in
input/output mappings.

The function itself does not implement any logic (it simply returns the first argument it receives), but provides a way
to configure all the necessary metadata (for example, description, type) to generate an input schema definition. The tools
schema resolution will collect all `fromAi` definitions within an activity and combine them into an input schema for
the activity.

:::important
The first argument passed to the `fromAi` function must be a reference type (for example, not a static string), referencing a
value within the variable defined as **Input element** in the multi-instance configuration. In the examples provided, `toolCall` is typically used as the input element. Example value: `toolCall.myParameter`.
:::

By using the `fromAi` tool call as a wrapper function around the actual value, the connector can both **describe the parameter** for the LLM by generating a JSON Schema from the function calls and at the same time **utilize the LLM-generated value** as it can do with any other process variable.

You can use the `fromAi` function in:

- Input & Output mappings (for example, service task, script task, user task).
- Custom input fields provided by an element template if an element template is applied to the activity as technically these are handled as input mappings.

For example, the following image shows an example of `fromAi` function usage on a [REST outbound connector](../protocol/rest.md):

![agenticai-tool-resolution-fromAi.png](../img/agenticai-tool-resolution-fromAi.png)

#### `fromAi` examples

The [`fromAi`](../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function
can be called with a varying number of parameters to define simple or complex inputs. The simplest form is to just pass
a value.

```feel
fromAi(toolCall.url)
```

This makes the LLM aware that it needs to provide a value for the `url` parameter. As the first value to `fromAi`
needs to be a variable reference, the last segment of the reference is used as parameter name (`url` in this case).

To make an LLM understand the purpose of the input, you can add a description:

```feel
fromAi(toolCall.url, "Fetches the contents of a given URL. Only accepts valid RFC 3986/RFC 7230 HTTP(s) URLs.")
```

To define the type of the input, you can add a type (if no type is given, it will default to `string`):

```feel
fromAi(toolCall.firstNumber, "The first number.", "number")

fromAi(toolCall.shouldCalculate, "Defines if the calculation should be executed.", "boolean")
```

For more complex type definitions, the fourth parameter of the function allows you to specify a JSON Schema from a
FEEL context. Note that support for the JSON Schema features depends on your AI integration. For a list of examples, refer to the [JSON Schema documentation](https://json-schema.org/learn/miscellaneous-examples).

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
the [multi-instance execution](#tools-loop). This variable is typically named `toolCallResult`
and can be used from every tool call within the ad-hoc sub-process as the multi-instance execution takes care of
isolating individual tool calls.

Depending on the used task, this can be achieved in multiple ways, as:

- A [result variable](../use-connectors/index.md#result-variable) or
  a [result expression](../use-connectors/index.md#result-expression) containing a `toolCallResult` key
- An [output mapping](../../concepts/variables.md#output-mappings) creating the `toolCallResult` variable or adding
  to a part of the `toolCallResult` variable (for example, an output mapping could be set to `toolCallResult.statusCode`)
- A [script task](../../modeler/bpmn/script-tasks/script-tasks.md) that sets the `toolCallResult` variable

Tool call results can be either primitive values (for example, a string) or complex ones, such as
a [FEEL context](../../modeler/feel/language-guide/feel-context-expressions.md) that is serialized to a JSON
string before passing it to the LLM.

#### Document support

Similar to the [user prompt](agentic-ai-aiagent.md#user-prompt) **Documents** field, tool call responses can contain
[Camunda Document references](/self-managed/concepts/document-handling/overview.md) within arbitrary structures
(supporting the same file types as for the user prompt).

When serializing the tool call response to JSON, document references are transformed into a content block containing the plain text or base64 encoded document content, before being passed to the LLM.
