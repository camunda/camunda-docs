---
id: conditions
title: Conditions
description: "Learn how conditional events let processes react automatically to data changes."
---

With conditional events, you can configure a process to react automatically when data matches a condition, without explicitly sending a message or broadcasting a signal. Instead of waiting for an external trigger, a conditional event evaluates an expression over process variables and triggers when that expression becomes `true`.

Conditional events are conceptually similar to [messages](messages.md) and [signals](signals.md), but differ in how they are triggered:

- Messages are correlated to a specific process instance.
- Signals can trigger all matching signal events with a single broadcast.
- Conditional events are triggered when process data changes and a configured condition evaluates to `true`.

For details on which BPMN event types support conditionals and how to model them, see the [conditional events modeling guide](../modeler/bpmn/conditional-events/conditional-events.md).

## Evaluation semantics

Each conditional event defines a condition (a FEEL expression) that must evaluate to a boolean value (`true` or `false`).

The engine evaluates the condition in two situations:

1. When a BPMN scope starts. For example, when a process instance, activity, or event subprocess is created.
2. When relevant variables change within the event’s visible scope.

If the condition becomes `true` while the event is active and in scope, the event triggers and the process follows the behavior defined by the underlying BPMN event.

## Variable filter semantics

Conditional events can define a `zeebe:conditionalFilter` to limit when the engine re-evaluates the condition.

A filter can restrict evaluation based on:

- Specific variable names (`variableNames`)
- Specific variable events (`variableEvents`, such as `create` or `update`)

If no filter is defined, the engine evaluates the condition on any variable change within the event’s visible scope.

The `variableEvents` attribute is supported only for conditional events within a running process instance. It is not supported for process-level conditional start events, because no process instance exists yet in which variable events could occur.

## Migration from Camunda 7

In Camunda 7, conditional events use the `camunda:variableName` and `camunda:variableEvents` attributes.

During migration to Camunda 8, these attributes are converted to a `zeebe:conditionalFilter` extension element:

- `camunda:variableName` → `zeebe:conditionalFilter variableNames="..."`
- `camunda:variableEvents` → `zeebe:conditionalFilter variableEvents="..."`

Only `create` and `update` are supported in Camunda 8. If a model uses `delete` in Camunda 7, migration maps it to the closest supported behavior.

## Evaluate conditional start events via APIs

Process-level conditional start events can be evaluated on demand via APIs. The engine evaluates their conditions against a provided set of variables and starts matching process instances.

- Orchestration Cluster REST API. Use the Evaluate root-level conditional start events endpoint (`POST /conditionals/evaluation`) to evaluate all matching conditional start events for the provided variables and start any resulting process instances. See [Evaluate root-level conditional start events](../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx).

- Gateway gRPC API. Use the `EvaluateConditional` RPC on the gateway service. See the `EvaluateConditional` RPC in the [gateway service](../../apis-tools/zeebe-api/gateway-service.md#evaluateconditional-rpc).

- Clients and SDKs. Camunda client libraries (for example, Java and Python) provide convenience methods that call these APIs.

These APIs apply only to process-level conditional start events. Conditional events inside running process instances are evaluated automatically when their BPMN scope starts or when relevant variables change.

## Evaluation scope and isolation

Because conditional events are driven by variable visibility and BPMN scopes:

- A variable change affects only conditional events in the same scope and its child scopes that can see that variable.
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

## Runtime and tooling integration

The Zeebe engine evaluates conditional events automatically according to the rules described above.

Conditional events are visible in runtime tools:

- Operate displays conditional events in process instance views and supports instance migration and modification.
- Optimize includes conditional events in BPMN diagrams and makes them available in reports.
