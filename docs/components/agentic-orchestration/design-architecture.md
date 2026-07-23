---
id: ao-design
title: Design and architecture
description: "Plan and design your agentic orchestration solutions, and understand recommended architecture and workflow guidelines."
keywords: ["agentic ai", "AI agents"]
---

import WorkflowImg from './img/ao-workflow.png';

Plan and design your agentic orchestration solutions, and understand recommended architecture guidelines.

## Plan agentic orchestration solutions

Follow these principles when planning your agentic orchestration solution:

- **Problem first**: First, identify any problem you might have in a process, and only then determine whether an AI agent could help solve the problem. Do not use an AI agent where it is not really necessary, or just for the sake of it.
- **Architect for composability**. Avoid becoming too dependant on a specific LLM model, for example by doing too much fine tuning. This allows you to more easily integrate newer LLM providers and models in the future that better suit your needs.
- **Observability and governance**: Use [Operate](/components/operate/operate-introduction.md) and [Optimize](/components/optimize/what-is-optimize.md) for visibility into your agentic orchestration processes.

### Blend deterministic and dynamic orchestration

Blending both deterministic and dynamic (AI-driven) process orchestration into your end-to-end processes allows you to take advantage of non-deterministic process orchestration without sacrificing predictability, customer experience, and compliance.

For example, you could use an AI agent to enhance a Know Your Customer (KYC) process, where the AI agent:

- Provides dynamic guidance and problem-solving to the person throughout the process.
- Monitors for policy changes and dynamically changes the process execution in response.
- Automatically adjusts risk level and takes action such as restricting account activity or dynamically adjusting spend limits.

### When to use deterministic or non-deterministic orchestration

Agentic orchestration involves blending both deterministic and dynamic (AI-driven) process orchestration into your end-to-end processes. It is important to understand when to use each approach:

| &nbsp;           | Deterministic                                                                                                                                                                                                | Dynamic                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Suitable for** | <p><ul><li><p>Clear, predictable paths.</p></li><li><p>Repeatable, rules-based decisions.</p></li><li><p>Fast, efficient execution.</p></li><li><p>Regulation dictates execution sequence.</p></li></ul></p> | <p><ul><li><p>Flexible, context-aware choices.</p></li><li><p>AI-driven task planning.</p></li><li><p>Unstructured cases: classification, triage, or investigation.</p></li><li><p>Adaptable to data and conditions.</p></li></ul></p> |
| **Enabled by**   | <p><ul><li><p>Advanced workflow patterns.</p></li><li><p>Business/IT alignment on process and decision logic.</p></li></ul></p>                                                                              | <p><ul><li><p>Dynamic task scheduling and tracking.</p></li><li><p>Collaboration between AI and Human.</p></li></ul></p>                                                                                                               |

:::info
To learn more about determining when and where to use AI agents within your automation strategy, download the [why agentic process orchestration belongs in your automation](https://page.camunda.com/wp-why-agentic-process-orchestration-belongs-in-your-automation-strategy) strategy guide.
:::

## Design agent orchestration workflows

Follow these principles when designing your agentic orchestration solution:

- **Guardrail sandwich**: Apply guardrails in your process when using agents. For example, you could have one agent performing the task execution, with another agent following up to check the chain of thought and make sure every execution is compliant. If the execution is not compliant, route to a human for additional validation.
- **Human-in-the-Loop escalation**: Provide an agent with an escalation path to a human - confidence levels are useful, but it is good to always provide deterministic outbreaks for agents.
- **Prompt versioning**: Version every prompt, so you can revert to using a previous prompt when required.

### How execution works in an AI agent

In Camunda agentic orchestration, decision-making and orchestration are intentionally split:

- **LLM responsibility**: Interprets the system prompt, current user prompt, and available tool descriptions. It decides which tool to call, in what order, and with which parameters.
- **Camunda responsibility**: Executes the selected BPMN elements, stores process state, applies retries and incident handling, and coordinates user tasks and other deterministic workflow logic.

Think of the ad-hoc sub-process as a governed toolbox:

- Each element can be selected by the LLM as a tool.
- Slements can be executed multiple times, in different orders, in parallel, or skipped.
- The LLM chooses a path from the allowed options, while Camunda enforces process boundaries and execution reliability.

This is a typical execution timeline:

1. A user submits a prompt.
1. The LLM evaluates the prompt together with the configured system prompt and available tool definitions.
1. The LLM chooses one or more tool calls.
1. Camunda activates and executes the corresponding BPMN elements.
1. Results are written to process variables and returned to the LLM context.
1. The loop repeats until the LLM returns a final response or the process routes to deterministic follow-up steps.

### Define your agent tools

In the AI agent model, each BPMN element inside an ad-hoc sub-process is a tool exposed to the LLM. The element's **ID** is used as the tool name, and its **Documentation** field is used as the tool description (falling back to the element's **Name** if **Documentation** is empty). The LLM uses this tool definition to decide which tool to call, in what order, and with which parameters.

Clear, behavior-oriented tool names and descriptions directly improve agent reliability. Vague or missing documentation increases the risk of incorrect tool selection, repeated calls, and hallucinated behavior.

For a how-to guide on adding tools, see [add tools to an AI agent](./add-tool-to-ai-agent.md).

### Mix agents with workflow patterns

<p><img src={WorkflowImg} style={{marginBottom: '0'}} title="Diagram showing how to mix agents into your workflow patterns" className="img-transparent"/></p>

<table className="table-callout">
<tr>
    <td><span className="callout">1</span></td>
    <td>**Process flow within tools**: Full BPMN control inside ad-hoc sub-processes for ultimate flexibility.</td>
</tr>
<tr>
    <td><span className="callout">2</span></td>
    <td>**Agents pivot instantly with external messages and timers**: During execution, agents can be influenced by events like external messages or timers, enabling on-the-fly adjustments.</td>
</tr>
<tr>
    <td><span className="callout">3</span></td>
    <td>**Event-driven agent reconfiguration**: Sub-workflows handle new data, guiding the next AI steps.</td>
</tr>
<tr>
    <td><span className="callout">4</span></td>
    <td>**Agents orchestrate sub-workflow**: A tool doesn't need to be a single tool - it can be a whole subprocess.</td>
</tr>
<tr>
    <td><span className="callout">5</span></td>
    <td>**Multi-agent orchestration**: Agents orchestrate other agents for streamlined, scalable solutions. This agent-to-agent pattern runs inside Camunda's [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md), as one of the tools available to an agent. It is not the same as agentic orchestration itself, which is Camunda's overall model for orchestrating agents, people, and systems.</td>
</tr>
</table>

### Call processes as agent tools

When an AI agent needs to invoke another BPMN process as a tool, you have two options:

- Use a call activity inside the ad-hoc sub-process.
- Add an MCP client gateway tool connected to the [Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md).

The right choice depends on whether your target process runs on the same or a different Orchestration Cluster:

| Scenario                                                   | Recommended approach                                                                                                                                                            |
| :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Target process is on the **same** Orchestration Cluster    | Use a [call activity](/components/modeler/bpmn/call-activities/call-activities.md) inside the ad-hoc sub-process.                                                               |
| Target process is on a **different** Orchestration Cluster | Use the [MCP Remote Client connector](../connectors/out-of-the-box-connectors/agentic-ai-mcp-remote-client-connector.md) connected to the other cluster's Processes MCP Server. |

These two approaches differ in runtime behavior, the result the agent receives, instance visibility, and the audit trail:

| &nbsp;                 | Call activity                                                                                                      | MCP client                                                                                                                          |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Execution**          | The tool call waits for the called process to complete and returns its output to the agent.                        | The called process starts immediately and the tool returns the process instance key. The agent does not receive the process output. |
| **Instance hierarchy** | The called process instance is a child of the ad-hoc sub-process element, visible in the instance tree in Operate. | The called process runs independently with no structural link to the calling agent process.                                         |
| **Audit logs**         | The audit trail reflects the full call hierarchy.                                                                  | The audit trail shows a process triggered by an external message, with no structural link to the calling agent.                     |

:::note
Although it is technically possible to use an MCP client to connect to the Processes MCP Server on the same cluster as the calling agent, this produces a detached hierarchy and a less coherent audit trail. Use call activities for same-cluster process invocations.
:::
