---
id: add-tool-to-ai-agent
title: Add tools to an AI agent
sidebar_label: Add tools to an AI agent
description: "Add BPMN elements as callable tools to your AI agents."
keywords: ["agentic ai", "AI agents", "tools", "fromAi", "toolCallResult"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Add BPMN elements as callable tools to your AI agents.

## About

A tool is a BPMN element inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) that the [LLM](/reference/glossary.md#large-language-model-llm) can choose to invoke to complete a goal.

You can use any BPMN element or connector as a tool. See [AI agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md) for more details.

## Add an element inside the ad-hoc sub-process

Open your process in [Web Modeler](/components/hub/workspace/modeler/index.md) or [Desktop Modeler](/components/modeler/desktop-modeler/index.md).

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

## Write a tool name and description

The LLM selects tools based on the element's **ID** and its **Documentation** field. Clear, specific descriptions significantly improve the reliability of tool selection.

- The element's **ID** is always used as the tool name.
- The element's **Documentation** field is used as the tool description. If **Documentation** is empty, the element's **Name** is used as a fallback description. If both are empty, the tool has no description.

See [Tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-definitions) for the complete resolution rules.

1. Give the element a descriptive **ID**, since this is what the LLM receives as the tool name.
1. Open the **Documentation** field in the properties panel and write a description that explains:
   - What the tool does.
   - When the LLM should use it.
   - When it should not, especially if two tools have overlapping purposes.
   - Any constraints or expected inputs.

**Example: weak vs. strong description**

| &nbsp; | Tool name                          | Documentation                                                                                                                                                           |
| :----- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weak   | `Lookup`                           | `Find customer data`                                                                                                                                                    |
| Strong | `Resolve customer by company name` | `Use this tool when a document mentions a company and you need its internal customer ID. If multiple matches are returned, request human validation before continuing.` |

A precise description makes the expected behavior explicit and reduces the risk of incorrect tool selection, repeated calls, or hallucinated behavior. Vague descriptions are the most common cause of unreliable agent behavior.

## Declare AI-generated parameters with `fromAi()`

If the tool requires values that the LLM should supply at runtime, such as a search query, a location, or an identifier, declare those parameters using the [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function in input mappings.

The `fromAi()` function marks a value as LLM-provided and generates a JSON Schema parameter definition that is passed to the LLM as part of the tool definition. Always provide a description and type for every parameter, as this significantly reduces hallucinated values.

**Basic usage**: declare a string parameter:

```feel
fromAi(toolCall.url, "The URL to fetch. Must be a valid HTTP(s) URL.", "string")
```

**With type**: declare a number parameter:

```feel
fromAi(toolCall.latitude, "Latitude of the location", "number")
```

**Optional parameter**: mark a parameter as not required:

```feel
fromAi(
  value: toolCall.filterStatus,
  description: "Optional status filter. Pass null to return all results.",
  options: { required: false }
)
```

**Combined in one expression**: use multiple `fromAi()` calls in a single field:

```feel
fromAi(toolCall.firstName, "Customer first name", "string") + " " + fromAi(toolCall.lastName, "Customer last name", "string")
```

:::important
The first argument to `fromAi()` must be a reference to a field within the `toolCall` context, for example `toolCall.myParameter`. This is automatically populated by the AI Agent connector when the LLM calls the tool.
:::

For more examples and the full function signature, see [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue).

## Return the result as `toolCallResult`

After the tool executes, its output must be returned in a [process variable](/reference/glossary.md#process-variable) named `toolCallResult` so the AI Agent connector can pass it back to the LLM.

Use any of the following approaches depending on your task type:

<Tabs groupId="tool-result-mapping" defaultValue="result-expression" values={[
{ label: "Result expression (connector)", value: "result-expression" },
{ label: "Output mapping", value: "output-mapping" },
{ label: "Script task", value: "script-task" },
]}>

<TabItem value="result-expression">

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

<TabItem value="output-mapping">

In the **Output Mappings** section, add an output mapping with `toolCallResult` as the target variable:

| Source            | Target           |
| :---------------- | :--------------- |
| `= response.body` | `toolCallResult` |

You can also map a nested field:

| Source                   | Target                  |
| :----------------------- | :---------------------- |
| `= response.body.status` | `toolCallResult.status` |

:::tip Avoid accidental overwrites with multiple outputs
When your tool task has several output parameters that each contribute a field to `toolCallResult`, prefer nested targets like `toolCallResult.status` over mapping everything directly to `toolCallResult`. Mapping to `toolCallResult` directly replaces the entire variable.

For script tasks and output mappings on regular tasks, the FEEL `put` function adds a single key to an existing context without replacing it:

```feel
put(toolCallResult, "Complete", sendEmail)
```

This accumulation pattern only works for elements that run in the workflow engine. Connector result expressions cannot use it: connectors don't have access to process variables, so they can't read the current value of `toolCallResult`. A connector tool must build its full result in one result expression, for example `= { toolCallResult: { status: response.status, body: response.body } }`.
:::

</TabItem>

<TabItem value="script-task">

In a script task, set the variable directly in the script:

```groovy
toolCallResult = [status: "completed", id: customerId]
```

</TabItem>

</Tabs>

:::note
The `toolCallResult` value can be a primitive string, a number, or a complex FEEL context object. Complex objects are serialized to JSON before being passed to the LLM. Prefer returning a structured FEEL context over a raw string when the result has multiple fields, as this gives the LLM more to work with when summarizing the outcome. If `toolCallResult` is not set or is empty after the tool executes, the AI Agent connector returns a constant success string to the LLM.
:::

## Example: add a REST connector tool

This example adds a tool that fetches current weather conditions using the [Open-Meteo API](https://open-meteo.com/).

1. Inside the ad-hoc sub-process, add a new task, apply the [REST Outbound connector](/components/connectors/protocol/rest.md) using the **Change element** menu, and name the task `Get current weather`.

1. In the **Documentation** field, enter a description so the LLM knows when to select this tool:

   ```
   Fetches current weather conditions for a given location. Use this tool when the user asks about weather, temperature, wind, or climate conditions for a city or place. Returns temperature in Celsius, wind speed, and a weather description.
   ```

1. In the **HTTP Endpoint** section, configure the request:

   - Set **Method** to **GET**.
   - Set **URL** to:

     ```feel
     "https://api.open-meteo.com/v1/forecast"
     ```

   - Set **Query parameters** to:

     ```feel
     {
       latitude: fromAi(toolCall.latitude, "Latitude of the location to check weather for", "number"),
       longitude: fromAi(toolCall.longitude, "Longitude of the location to check weather for", "number"),
       current: "temperature_2m,wind_speed_10m,weather_code"
     }
     ```

   The `latitude` and `longitude` are LLM-generated parameters. The `current` field is a fixed value that selects which weather fields to return.

1. In the **Output Mapping** section, set **Result Expression** to return the relevant response fields as `toolCallResult`:

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
