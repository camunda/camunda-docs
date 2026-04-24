---
id: integrate-ai-into-your-processes
title: "Integrate AI into your processes"
sidebar_label: Integrate AI into your processes
description: "Best practices for adding AI to Camunda processes: when to use the AI Agent connector, how to compose multi-step tools, and patterns for predictable results."
keywords:
  [
    ai,
    agentic,
    ai agent connector,
    ad-hoc sub-process,
    best practices,
    patterns,
  ]
---

This guide addresses common design decisions when adding AI to a Camunda process. It is intended for developers who are familiar with BPMN and are evaluating or implementing AI-assisted process patterns.

## Choose the right pattern: AI Agent connector vs. a manual loop

When a process needs to have a back-and-forth conversation with a user, or call an LLM repeatedly until a goal is reached, there are two approaches:

| Pattern                                           | Description                                                                                                                                                                                                                                                              | Recommended |
| :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| **Explicit BPMN loop**                            | A receive-message task feeds a service task that calls an LLM directly (for example, via an SDK), a gateway checks whether the conversation is done, and the process loops back.                                                                                         |     No      |
| **AI Agent connector with an ad-hoc sub-process** | An [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) manages the conversation and tool calls. No explicit loop is needed. |     Yes     |

### Why the AI Agent connector is the better choice

The explicit loop pattern works, but it adds unnecessary complexity:

- More BPMN elements to maintain.
- A custom job worker with a direct LLM SDK dependency.
- Manual context management across iterations.
- A "done" check gateway that needs to be wired into the process.

The AI Agent connector eliminates all of this. The agent drives the conversation internally: it decides which tools to call, reads their results, and determines when the goal is reached. You define the tools; the agent handles the orchestration.

:::tip Recognizing the pattern
If you find yourself modeling a loop that calls an LLM service task and checking a flag to exit the loop, consider replacing it with an AI Agent connector in an ad-hoc sub-process.
:::

### Before and after

**Before — explicit loop:**

```
Start → Receive message → Call LLM (service task) → Check done? (gateway)
         ↑                                                      |
         └──────────────────────────────────────────────────────┘
                              (loop back if not done)
```

This requires a custom worker, a direct LLM dependency, and a "done" flag managed in process variables.

**After — AI Agent connector:**

```
Start → AI Agent sub-process (contains tools as ad-hoc activities)
         └── Agent calls tools, iterates internally, exits when goal is reached
```

The process is shorter, the agent manages the loop, and each tool is a self-contained BPMN activity.

## Understand how tools work in ad-hoc sub-processes

Inside an ad-hoc sub-process, **root elements** (activities with no incoming sequence flow) are exposed to the LLM as callable tools. The agent sees each root element as a tool it can invoke.

This means:

- A single service task is one tool.
- A service task connected to a receive task via a sequence flow is also one tool — but the tool executes two BPMN steps when called.

### Compose a multi-step tool

Multi-step tools let you model behaviors that a single service task cannot express, such as sending a message and waiting for a reply.

**Send-and-wait pattern:**

```
[Service task: Send notification] → [Receive task: Wait for reply]
```

Only the first element (the service task) is a root element. The agent calls that root element as a tool, and BPMN automatically executes the receive task before control returns.

This is useful when an agent needs to:

- Send a message to an external system and wait for a callback.
- Perform a step that depends on the result of a previous step inside the same tool.
- Apply conditional branching within a single tool invocation.

**Conditional tool pattern:**

```
[Service task: Fetch data] → [Gateway: Check result] → [Service task: Handle success]
                                                       → [Service task: Handle failure]
```

Again, only the service task at the start is a root element. The agent calls it as one tool; the gateway and downstream tasks handle the branching internally.

:::note
The agent sees one tool entry point. What happens inside the tool is opaque to the agent — it only receives the final `toolCallResult`.
:::

## Write effective tool descriptions

The LLM selects tools based on their name and description. Document each tool so the agent knows when to call it and what to provide.

Good tool documentation answers:

- What does this tool do?
- When should the agent use it?
- What inputs does it expect?
- What does it return?

Use the **Documentation** field in the properties panel for each activity. For example:

```
Fetches current weather conditions for a given location.
Use this tool when the user asks about weather, temperature, wind, or climate.
Inputs: latitude (string), longitude (string).
Returns: temperature in Celsius, wind speed, and a weather code.
```

Use [`fromAi()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md#fromaivalue) in input mappings to declare which parameters the agent should supply at runtime.

## Return results consistently

Every tool inside an ad-hoc sub-process must return its output in a `toolCallResult` process variable. The AI Agent connector collects these into a `toolCallResults` list and passes them back to the LLM.

In the **Output Mapping** section, use a **Result Expression** like:

```feel
{
  toolCallResult: {
    result: response.body.result
  }
}
```

Consistent output mapping is critical. If a tool does not set `toolCallResult`, the agent cannot use its output.

## Use MCP context for grounded responses

When AI tooling interacts with your cluster at development time, connecting both MCP servers gives the LLM accurate context:

- [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md) — runtime state (incidents, instances, definitions).
- [Camunda Docs MCP server](/reference/mcp-docs/mcp-docs.md) — up-to-date documentation.

With both connected, your AI assistant can generate code that matches your actual cluster version and configuration rather than relying on stale training data.

## Use Camunda Copilot to scaffold agents

[Camunda Copilot](/components/modeler/web-modeler/copilot/copilot-overview.md) in Web Modeler can generate the initial structure of an AI agent process from a natural-language description. Use it to:

- Scaffold an ad-hoc sub-process with starter tools.
- Generate FEEL expressions for `fromAi()` input parameters.
- Add error handling sub-processes to an existing agent.

Review Copilot's output before deploying, and iterate with follow-up prompts to refine the result.

## Next steps

- [Build your first AI agent](./getting-started-agentic-orchestration.md)
- [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)
- [Ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md)
- [Agentic orchestration overview](/components/agentic-orchestration/agentic-orchestration-overview.md)
- [Build Camunda solutions with AI](./build-camunda-with-ai.md)
