---
id: conditions
title: "Conditions"
description: "Learn how conditional events let processes react automatically to data changes."
---

Conditional events let a process react automatically when data matches a condition, without explicitly sending a message or broadcasting a signal. Instead of waiting for an external trigger, a conditional event evaluates an expression over process variables and triggers when that expression becomes `true`.

Conditional events are conceptually similar to [messages](messages.md) and [signals](signals.md), but differ in how they are triggered:

- Messages are correlated to a specific process instance.
- Signals can trigger all matching signal events with a single broadcast.
- Conditional events are triggered when process data changes and a configured condition evaluates to `true`.

For details on which BPMN event types support conditionals and how to model them, see the [conditional events modeling guide](../modeler/bpmn/conditional-events/conditional-events.md).

## How conditional events work

Each conditional event defines a condition (a FEEL expression) that must evaluate to a boolean value (`true` or `false`). Conceptually, the engine:

1. Evaluates the condition when a BPMN scope starts. For example, when a process instance starts, an activity begins, or an event subprocess is created.

2. Re-evaluates the condition when relevant variables change. Variable changes can come from internal execution (such as job completion or message correlation), or from APIs that modify variables.

If the condition becomes `true` while the event is active and in scope, the event triggers and the process follows the behavior defined by the underlying BPMN event (for example, continue past an intermediate catch, start an event subprocess, or interrupt an activity).

Different BPMN event types can be configured with conditions (for example, conditional start events, intermediate conditional catch events, and conditional boundary events). The modeling guide explains the behavior and limitations of each type in more detail.

## Triggering conditional events

### Triggering via data changes

Most conditional events are triggered implicitly as part of normal process execution:

- When a scope starts (for example, a process or activity begins), any conditional events in that scope have their conditions evaluated once.
- When variables change in that scope, the engine checks whether any conditional events that can "see" those variables should now trigger.

Conceptually, this follows two rules inherited from Camunda 7:

- Scoped evaluation. Only conditional events whose variables are visible in the scope where the change occurred are considered.

- Top-down evaluation.The engine evaluates conditional events starting from the scope where the variable changed and then into nested scopes, stopping when an interrupting event cuts off further execution in that scope.

From a user perspective, you don’t “send” anything directly to a conditional event. Instead, you design your variable updates and scopes so that the right events see the right data at the right time.

### Triggering root-level conditional start events via APIs

Root-level conditional start events can also be triggered on demand via APIs, by evaluating conditions against a given set of variables:

- Orchestration Cluster REST API. Use **Evaluate root level conditional start events** (`POST /conditionals/evaluation`) to evaluate all matching root-level conditional start events for the provided variables and start any resulting process instances. See [Evaluate root level conditional start events](../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx).

- Use the `EvaluateConditional` RPC on the gateway service to trigger the same evaluation via gRPC. See the `EvaluateConditional` RPC in the [gateway service](../apis-tools/zeebe-api/gateway-service.md#evaluateconditional-rpc).

- Clients and SDKs. Camunda client libraries (for example, Java and Python clients) expose convenience methods that internally call these APIs to evaluate conditional start events.

These APIs only apply to root-level conditional start events. Conditional events inside running process instances are always triggered via scope start and variable changes, not via a direct “evaluate this event” API.

## Evaluation scope and isolation

Because conditional events are driven by variable visibility and BPMN scopes:

- A variable change affects only conditional events in the same scope and its children which can "see" that variable.
- Conditional events in unrelated scopes or process instances are not affected by that change.
- When an interrupting conditional event triggers in a scope, it cancels child scopes in that branch (for example, an interrupting conditional boundary event cancels its attached activity).

This scoping behavior helps keep complex models with nested subprocesses and multi-instance activities predictable. The modeling guide describes which scopes are created by which BPMN constructs and how variables are shared between them.

## Cardinality and performance considerations

Unlike signals, conditional events do not broadcast across the cluster. However, they can still have significant impact if used heavily:

- A single variable update may require the engine to evaluate many conditional events across nested scopes in the same process instance.
- Multi-instance activities can create many child scopes, each with its own conditional events.
- Frequent variable updates with broad visibility can cause many evaluations, even if no events ultimately trigger.

To keep models efficient:

- Use conditions that are as specific as necessary, so they only depend on variables that meaningfully affect the event.
- Use the modeling options (such as variable filters) to limit when an event should be re-evaluated based on which variables changed.
- Avoid patterns that create very large numbers of conditional events in a single instance (for example, extremely large multi-instance structures with conditionals on each child).

## When to use conditional events

Conditional events are useful when you want a process to react to data changes rather than explicit external triggers. Typical situations include:

- Data-driven escalation. Starting an escalation subprocess when a `priority` or `riskScore` crosses a threshold.

- State-based progression. Continuing a process when `processorAvailable` becomes `true`, rather than polling or waiting for a message.

- Reactive cleanup or compensating behavior. Reacting when `applicationCanceled` becomes `true` while a review or processing step is still running.

In many cases, you can model similar behavior with messages, signals, or timers. Conditional events are best suited when:

- The trigger is purely internal to the process data, and
- You want the engine to detect the right moment automatically, based on variable changes, rather than coordinating explicit sends from external systems.
