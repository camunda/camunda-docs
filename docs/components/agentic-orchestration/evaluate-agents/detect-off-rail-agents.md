---
id: detect-off-rail-agents
title: Detect off-rail agents
sidebar_label: Detect off-rail agents
description: "Use agent health indicators and guardrail proximity warnings to identify a stuck or looping AI agent before it fails."
keywords: ["agentic ai", "AI agents", "troubleshooting", "guardrails"]
---

Use agent health indicators and guardrail proximity warnings to identify a stuck or looping AI agent before it fails.

## About

An agent can go off-rail without failing outright, for example, by getting stuck repeating a tool call or reasoning in circles. Left unnoticed, it keeps consuming tokens and model calls until it hits its configured limit. This guide explains how to read an agent instance's [state and usage metrics](/components/agentic-orchestration/agent-health-and-guardrails.md) to catch this early, and how to interpret guardrail proximity warnings.

## Prerequisites

- You have access to [Operate](/components/operate/operate-introduction.md) to inspect running agent process instances. See [monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md).
- You understand the [agent state model and usage metrics](/components/agentic-orchestration/agent-health-and-guardrails.md) Camunda tracks for an agent instance.

## Identify a stuck or looping agent

No single health indicator proves that an agent is stuck. Look at the combination of state, usage metrics, and duration for the agent instance:

- **State doesn't change over an extended period.** An agent instance stuck in Thinking far longer than a typical model call, or in Tool calling far longer than the tool normally takes to respond, is not progressing through its loop.
- **Tool call count climbs without resolution.** The agent keeps calling the same tool, or a small set of tools, with similar or identical inputs across multiple loops, without the conversation moving toward a final response.
- **Token consumption grows steadily loop after loop.** Since each loop appends the previous reasoning and tool results to the conversation, a steadily rising token count with no final response is a sign the agent is accumulating context without converging.
- **Execution duration is disproportionate to the task.** The total time the agent instance has been active is much longer than comparable runs of the same agent, even though its state keeps changing, which suggests the agent is caught in a longer-than-expected cycle of loops rather than a single stuck call.

An agent that calls the same tool many times can still be legitimately working through a multi-step task. Treat these indicators together, not individually: an agent instance with a stalled state, a climbing tool call count, and a duration that keeps growing without settling is the strongest signal that it's going off-rail.

## Interpret guardrail proximity warnings

Camunda tracks model calls made against the agent's configured [**Maximum model calls**](/components/agentic-orchestration/agent-health-and-guardrails.md#model-call-limit) limit, so you can see how close an agent instance is to that guardrail before it's reached. A proximity warning means the agent instance is nearing its configured limit and could reach it on a subsequent loop, at which point the AI Agent connector throws a `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED` error and stops the agent.

Apply the following best practices when you see a proximity warning:

- **Investigate before the hard limit hits.** Use a proximity warning as a prompt to check the agent instance's other health indicators. An agent nearing its limit while making steady progress is different from one nearing its limit while stuck in a loop.
- **Handle the limit explicitly instead of letting it fail the process instance.** Catch the `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED` error with an error boundary event and route it to a human reviewer. See the [guardrail sandwich and human-in-the-loop escalation](/components/agentic-orchestration/design-architecture.md#design-agent-orchestration-workflows) design principles.
- **Size the limit to the task, not the default.** A **Maximum model calls** value that's frequently near-exhausted by agents completing their task normally is probably too low for that task's typical loop count. Raise it deliberately rather than repeatedly dismissing the warning.
- **Don't treat a higher limit as the fix for a stuck agent.** If an agent instance reaches its limit while stuck, for example, repeating the same tool call, raising the limit only lets it consume more tokens and tool calls before failing. Address the underlying cause, such as the tool's input, output, or description, instead.

## Next steps

- Review the [agent state model and usage metrics](/components/agentic-orchestration/agent-health-and-guardrails.md) behind these indicators.
- [Analyze your AI agents with Optimize](/components/agentic-orchestration/evaluate-agents/analyze-ai-agents.md) to track token and tool usage trends across process instances over time.
- [Design and architecture](/components/agentic-orchestration/design-architecture.md) best practices for agentic orchestration solutions.
