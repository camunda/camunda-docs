---
id: add-tool-to-ai-agent
title: Add tools to an AI agent
sidebar_label: Add tools to an AI agent
description: "Add BPMN activities as callable tools to your AI agents."
keywords: ["agentic ai", "AI agents", "tools", "fromAi", "toolCallResult"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Add BPMN activities as callable tools to your AI agents.

## What is a tool

A tool is a BPMN activity inside an ad-hoc sub-process that the LLM can choose to invoke to complete a goal. Each tool has:

- A **name** — the element ID, used by the LLM to identify the tool.
- A **description** — the element's **Documentation** field, used by the LLM to decide when to call the tool.
- **Input parameters** — values the LLM must supply at call time, declared using the [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function in input mappings.
- A **result** — the tool's output, returned to the LLM as `toolCallResult`.

The AI Agent connector gathers all root-level activities in the ad-hoc sub-process (those with no incoming flows), builds a tool definition for each, and passes them to the LLM as part of the prompt. The LLM then decides which tool to call, in what order, and with which parameters.

You can use any BPMN activity type as a tool:

| Tool type            | When to use                                                                                                                                          |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| REST connector       | Call an external HTTP API.                                                                                                                           |
| Script task          | Execute inline logic or data transformation.                                                                                                         |
| User task            | Route to a human for input or approval as part of the agent's decision path.                                                                         |
| Call activity        | Invoke another BPMN process as a tool when the target process is on the same cluster.                                                                |
| MCP client connector | Expose tools from an external [MCP server](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md) as gateway tools to the agent. |
| Sub-process          | Model a multi-step sub-flow that the LLM triggers as a single tool.                                                                                  |

:::tip
For the full technical reference on how tool definitions are resolved and the complete `fromAi()` function syntax, see [AI Agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md).
:::

## Add an activity inside the ad-hoc sub-process

Open your process in [Web Modeler](/components/hub/workspace/modeler/index.md) or [Desktop Modeler](/components/modeler/desktop-modeler/index.md).

1. Click inside the ad-hoc sub-process to enter it.
1. Add a new task element. You can use any BPMN activity type as a tool — service task, script task, user task, or a sub-process.
1. Apply the appropriate connector or task type. For example:
   - Use the [REST Outbound connector](/components/connectors/protocol/rest.md) to call an external API.
   - Use a [script task](/components/modeler/bpmn/script-tasks/script-tasks.md) to execute inline logic.
   - Use a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) to route to a human reviewer.
1. Make sure the activity has **no incoming sequence flow** — the AI Agent connector only resolves root-level activities as tools.

:::tip
You can model a sub-flow inside the ad-hoc sub-process. Only the first activity in the sub-flow (the root node) is exposed to the LLM as a tool; the rest of the flow executes automatically once the LLM selects it.
:::

## Write a tool name and description

The LLM selects tools based on the activity name and its **Documentation** field. Clear, specific descriptions significantly improve the reliability of tool selection.

1. Give the activity a descriptive **name**. The element ID (derived from the name) is what the LLM receives as the tool name.
1. Open the **Documentation** field in the properties panel and write a description that explains:
   - What the tool does.
   - When the LLM should use it.
   - When it should not — especially if two tools have overlapping purposes.
   - Any constraints or expected inputs.

**Example: weak vs. strong description**

| &nbsp; | Tool name                          | Documentation                                                                                                                                                           |
| :----- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weak   | `Lookup`                           | `Find customer data`                                                                                                                                                    |
| Strong | `Resolve customer by company name` | `Use this tool when a document mentions a company and you need its internal customer ID. If multiple matches are returned, request human validation before continuing.` |

A precise description makes the expected behavior explicit and reduces the risk of incorrect tool selection, repeated calls, or hallucinated behavior. Vague descriptions are the most common cause of unreliable agent behavior.

## Declare AI-generated parameters with `fromAi()`

If the tool requires values that the LLM should supply at runtime — such as a search query, a location, or an identifier — declare those parameters using the [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) FEEL function in input mappings.

The `fromAi()` function marks a value as LLM-provided and generates a JSON Schema parameter definition that is passed to the LLM as part of the tool definition. Always provide a description and type for every parameter — this significantly reduces hallucinated values.

**Basic usage** — declare a string parameter:

```feel
fromAi(toolCall.url, "The URL to fetch. Must be a valid HTTP(s) URL.", "string")
```

**With type** — declare a number parameter:

```feel
fromAi(toolCall.latitude, "Latitude of the location", "number")
```

**Optional parameter** — mark a parameter as not required:

```feel
fromAi(
  value: toolCall.filterStatus,
  description: "Optional status filter. Pass null to return all results.",
  options: { required: false }
)
```

**Combined in one expression** — use multiple `fromAi()` calls in a single field:

```feel
fromAi(toolCall.firstName, "Customer first name", "string") + " " + fromAi(toolCall.lastName, "Customer last name", "string")
```

:::important
The first argument to `fromAi()` must be a reference to a field within the `toolCall` context, for example `toolCall.myParameter`. This is automatically populated by the AI Agent connector when the LLM calls the tool.
:::

For more examples and the full function signature, see [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue).

## Return the result as `toolCallResult`

After the tool executes, its output must be returned in a process variable named `toolCallResult` so the AI Agent connector can pass it back to the LLM.

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

</TabItem>

<TabItem value="script-task">

In a script task, set the variable directly in the script:

```groovy
toolCallResult = [status: "completed", id: customerId]
```

</TabItem>

</Tabs>

:::note
The `toolCallResult` value can be a primitive string, a number, or a complex FEEL context object. Complex objects are serialized to JSON before being passed to the LLM. Prefer returning a structured FEEL context over a raw string when the result has multiple fields — this gives the LLM more to work with when summarizing the outcome. If `toolCallResult` is not set or is empty after the tool executes, the AI Agent connector returns a constant success string to the LLM.
:::

## Example: add a REST connector tool

This example adds a tool that fetches current weather conditions using the [Open-Meteo API](https://open-meteo.com/).

### Add the activity

1. Inside the ad-hoc sub-process, add a new task.
1. Apply the [REST Outbound connector](/components/connectors/protocol/rest.md) using the **Change element** menu.
1. Name the task `Get current weather`.

### Write the description

In the **Documentation** field, enter:

```
Fetches current weather conditions for a given location. Use this tool when the user asks about weather, temperature, wind, or climate conditions for a city or place. Returns temperature in Celsius, wind speed, and a weather description.
```

### Configure the connector

In the **HTTP Endpoint** section:

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

The `latitude` and `longitude` parameters are LLM-generated; the `current` parameter is a fixed value.

### Map the result

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
