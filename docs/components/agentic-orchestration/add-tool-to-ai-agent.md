---
id: add-tool-to-ai-agent
title: Add tools to an AI agent
sidebar_label: Add tools to an AI agent
description: "Add BPMN elements as callable tools to your AI agents."
keywords: ["agentic ai", "AI agents", "tools", "fromAi", "toolCallResult"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AddElement from './img/add-element.png';
import InputMapping from './img/input-mapping.png';
import ToolDescription from './img/tool-description.png';

Add BPMN elements as callable tools to your AI agents.

## About

A tool is a BPMN element inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) that an [LLM](/reference/glossary.md#large-language-model-llm) can choose to invoke to complete a goal.

You can use any BPMN element or connector as a tool. See [AI agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md) for more details.

:::tip See a full example
For a complete, step-by-step walkthrough that applies all the steps below, see [add your first tool](/guides/getting-started-agentic-orchestration.md#step-4-add-your-first-tool).
:::

## Add an element inside the ad-hoc sub-process

1. Open your process in [Web Modeler](/components/hub/workspace/modeler/index.md) or [Desktop Modeler](/components/modeler/desktop-modeler/index.md).
1. Click inside the ad-hoc sub-process to enter it.
1. Add a new task element. You can use any BPMN element as a tool, including service tasks, script tasks, user tasks, and sub-processes.
1. Apply the appropriate connector or task type. For example:
   - Use the [REST Outbound connector](/components/connectors/protocol/rest.md) to call an external API.
   - Use a [script task](/components/modeler/bpmn/script-tasks/script-tasks.md) to execute inline logic.
   - Use a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) to route to a human reviewer.
1. Make sure the element has **no incoming sequence flow**, as the AI Agent connector only resolves root-level elements as tools.

:::tip
You can model a sub-flow inside the ad-hoc sub-process. Only the first element in the sub-flow (the root node) is exposed to the LLM as a tool; the rest of the flow executes automatically once the LLM selects it.
:::

<img src={AddElement} alt="Add a task element to the AI agent ad-hoc sub-process" width="75%"/>

## Write a tool name and description

The LLM selects tools based on the tool element's **ID** and its **Documentation** fields. Clear, specific descriptions significantly improve the reliability of tool selection.

- The element's **ID** field is always used as the tool name.
- The element's **Documentation** field is used as the tool description. If **Documentation** is empty, the element's **Name** field is used as a fallback description. If both are empty, the tool has no description.

See [tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-definitions) for more details.

1. Give the element a descriptive **ID**, since this is what the LLM receives as the tool name.
1. Open the **Documentation** field in the properties panel and write a description that explains:
   - What the tool does.
   - When the LLM should use it.
   - When it should not, especially if two tools have overlapping purposes.
   - Any constraints or expected inputs.

### Example: weak vs. strong description

A precise description makes the expected behavior explicit and reduces the risk of incorrect tool selection, repeated calls, or hallucinated behavior. Vague descriptions are the most common cause of unreliable agent behavior.

See the following comparison:

| &nbsp; | Tool name                          | Documentation                                                                                                                                                           |
| :----- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weak   | `Lookup`                           | `Find customer data`                                                                                                                                                    |
| Strong | `Resolve customer by company name` | `Use this tool when a document mentions a company and you need its internal customer ID. If multiple matches are returned, request human validation before continuing.` |

<img src={ToolDescription} alt="Write a tool name and description" width="75%"/>

## Declare AI-generated parameters with `fromAi()`

If the tool requires values that the LLM should supply at runtime, such as a search query, a location, or an identifier, declare those parameters using the `fromAi()` FEEL function in the activity's input mappings or connector input fields.

How you configure this depends on the BPMN element type that implements your tool. A connector task exposes its own input fields, such as **URL** or **Query parameters** in the REST outbound connector's **HTTP Endpoint** section, while a script, service, or user task exposes an [**Input Mappings**](/components/concepts/variables.md#input-mappings) section instead.

1. Open the input field (for a connector task) or the **Input Mappings** section (for a script, service, or user task) where the value is configured.
1. If you're using the **Input Mappings** section, add a new entry and set its **Local variable name**. This is the name you'll reference the variable elsewhere in the element.
1. Wrap the value in `fromAi()`, referencing the parameter as a field of the `toolCall` context, and add a description so the LLM knows what to provide:

   ```feel
   fromAi(toolCall.url, "The URL to fetch. Must be a valid HTTP(s) URL.")
   ```

1. Repeat for each value the LLM should supply.

<img src={InputMapping} alt="Input mapping with local variable name url and a fromAi() FEEL expression as the variable assignment value" width="75%"/>

See [AI-generated parameters via `fromAi`](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#ai-generated-parameters-via-fromai) for more details.

## Return the result as `toolCallResult`

After the tool executes, its output must be returned in a [process variable](/reference/glossary.md#process-variable) named `toolCallResult` so the AI Agent connector can pass it back to the LLM.

How you set `toolCallResult` depends on the BPMN element type that implements your tool. For example, a connector task exposes a dedicated [result expression](/components/connectors/use-connectors/index.md#result-expression) field, a user task uses regular [output mappings](/components/concepts/variables.md#output-mappings), and a script task uses a dedicated result variable. Use the approach that matches your tool's element type:

<Tabs groupId="tool-result-mapping" defaultValue="connector-task" values={[
{ label: "Connector task", value: "connector-task" },
{ label: "User task", value: "user-task" },
{ label: "Script task", value: "script-task" },
]}>

<TabItem value="connector-task">

In the **Output Mapping** section of a connector, set **Result Expression** to map relevant response fields into `toolCallResult`:

```feel
{
  toolCallResult: {
    temperature_celsius: response.body.current.temperature_2m,
    wind_speed_kmh: response.body.current.wind_speed_10m,
    weather_code: response.body.current.weather_code
  }
}
```

</TabItem>

<TabItem value="user-task">

In the **Output Mappings** section, add an output mapping with `toolCallResult` as the target variable:

| Source            | Target           |
| :---------------- | :--------------- |
| `= response.body` | `toolCallResult` |

</TabItem>

<TabItem value="script-task">

Set the script task's **Result variable** to `toolCallResult`. The FEEL expression provides the value that is assigned to it:

```feel
{ status: "completed", id: customerId }
```

</TabItem>

</Tabs>

### Combine multiple outputs into a single `toolCallResult`

When your tool task has several output parameters that each contribute a field to `toolCallResult`, avoid an output mapping per field targeting `toolCallResult.<field>`.

:::note
Output mappings and result variables containing a period are discouraged. See [output mappings](/components/concepts/variables.md#output-mappings).
:::

Mapping to `toolCallResult` directly also replaces the entire variable, so multiple mappings targeting it would overwrite each other.

For script tasks and output mappings on regular tasks, use the [`context put()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-context.md#context-putcontext-key-value) FEEL function to add a single key to the existing `toolCallResult` context without replacing it:

| Source                                                         | Target           |
| :------------------------------------------------------------- | :--------------- |
| `=context put(toolCallResult, "status", response.body.status)` | `toolCallResult` |

Connector result expressions cannot use this accumulation pattern because they don't have access to process variables, so they can't read the current value of `toolCallResult`. A connector tool must build its full result in one result expression. For example:

```feel
 `= { toolCallResult: { status: response.status, body: response.body } }`
```

:::note
The `toolCallResult` value can be a primitive string, a number, or a complex FEEL context object. Complex objects are serialized to JSON before being passed to the LLM. Prefer returning a structured FEEL context over a raw string when the result has multiple fields, as this gives the LLM more to work with when summarizing the outcome. If `toolCallResult` is not set or is empty after the tool executes, the AI Agent connector returns a constant success string to the LLM.
:::
