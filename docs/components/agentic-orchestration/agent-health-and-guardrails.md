---
id: agent-health-and-guardrails
title: Agent health and guardrails
description: "Understand the agent state model, state transitions, and the usage metrics Camunda tracks for every agent instance."
keywords:
  ["agentic ai", "AI agents", "agent health", "guardrails", "agent state"]
---

Understand the agent state model, state transitions, and the usage metrics Camunda tracks for every agent instance.

## About

Every [agent instance](/components/agentic-orchestration/ai-agents.md) exposes a defined execution state and a set of usage metrics as it runs. Together, they show whether the agent is progressing normally and how close it is to the limits you configured. This page describes the state model, what triggers each transition, and the usage metrics that back the agent's guardrails.

For guidance on using these signals to catch an agent going off-rail, see [detect off-rail agents](/components/agentic-orchestration/evaluate-agents/detect-off-rail-agents.md).

## Agent states

Camunda updates an agent instance's state as it progresses through its feedback loop, fed by status updates from the connector handling the agent.

| State          | Meaning                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| Initializing   | The agent instance is being created and set up for a newly activated agent element.                          |
| Tool discovery | The agent resolves which BPMN activities and other tool sources are available to it as tools.                |
| Thinking       | The agent sends the conversation, system prompt, and tool definitions to the model and waits for a response. |
| Tool calling   | Camunda executes the BPMN activities the model selected as tools.                                            |
| Idle           | The process instance has moved away from the agent element, so the agent isn't currently working.            |
| Completed      | The process instance that hosted the agent completed or terminated.                                          |

### State transitions

An agent instance follows a predictable path through these states. The following table lists what triggers entry into each state and what happens next.

| State          | Entered when                                                                                             | Moves to                                                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Initializing   | An agent element is activated and no reusable agent instance exists yet, or a new one is created.        | Tool discovery, once the agent instance is set up.                                                                                                     |
| Tool discovery | The agent instance resolves the tools available to it.                                                   | Thinking, once tool definitions are resolved.                                                                                                          |
| Thinking       | The agent instance is ready to reason over the current conversation.                                     | Tool calling, if the model selects one or more tools. Idle or Completed, if the model returns a final response.                                        |
| Tool calling   | The model selected one or more tools in the previous Thinking state.                                     | Thinking, once tool results are available. This starts the next loop.                                                                                  |
| Idle           | The process instance moves away from the agent element, for example, to wait for a user task or message. | Thinking, when the process instance re-activates the same agent element and reuses this agent instance. Completed, if the process instance ends first. |
| Completed      | The process instance that hosted the agent completes or terminates.                                      | Terminal state; the agent instance stops updating.                                                                                                     |

The cycle from Thinking to Tool calling and back to Thinking is one **loop**: the model reasons over the current messages, optionally calls tools, and receives the tool results that become the input for the next loop. An agent instance can run through many loops before reaching a final response.

## Usage metrics and guardrails

Alongside its state, Camunda tracks usage metrics for every agent instance so you can measure cost and activity, and enforces a configurable guardrail on how many times an agent can call the model.

### Token consumption

Camunda tracks the number of tokens consumed by the agent's model calls. Token consumption accumulates as the conversation grows: every loop adds the previous tool results and the model's reasoning to the context that's sent with the next model call, so token usage tends to climb with each additional loop.

Rising token consumption without a final response is a signal that the conversation is growing without converging on an outcome. Token usage is also a direct driver of the LLM provider cost for the agent's execution. See [context window size](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#memory) for how conversation length is capped independently of token count.

### Tool call count

Camunda counts the number of tool calls the agent instance has made across all loops. A climbing tool call count generally reflects active work, but a count that climbs while the agent calls the same tool repeatedly with similar or identical inputs can indicate the agent is stuck rather than progressing.

### Execution duration

Camunda tracks how long the agent instance has been active, both across its full run and in its current state. A model or tool call that takes far longer than comparable calls, without a change in state, is a sign the agent isn't progressing normally.

### Model call limit

The **Maximum model calls** setting is the primary guardrail against runaway loops and unexpected cost. It limits how many times an agent instance can call the model, and defaults to `10` if you don't configure it. Camunda tracks model calls made against this configured limit, so you can see how close an agent instance is to its guardrail.

When an agent instance reaches its configured limit, the AI Agent connector throws a `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED` error. You can catch this error with an error boundary event and an [error expression](/components/connectors/use-connectors/index.md#error-expression) to handle it explicitly, for example by routing to a human reviewer instead of failing the process instance.

See the **Limits** section of the [AI Agent Sub-process](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#limits) or [AI Agent Task](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task.md#limits) connector documentation to configure this setting, and [error handling](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#error-handling) for the full list of error codes.

## Next steps

- [Detect off-rail agents](/components/agentic-orchestration/evaluate-agents/detect-off-rail-agents.md) using these states and metrics.
- [Monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md).
- [Design and architecture](/components/agentic-orchestration/design-architecture.md) best practices for agentic orchestration solutions.
