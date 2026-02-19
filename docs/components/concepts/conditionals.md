---
id: conditionals
title: Conditionals
description: "Learn how conditional events let processes react automatically to data changes."
---

import ConditionalBoundary from './assets/conditional/conditional-boundary.png';
import ConditionalEventSubprocess from './assets/conditional/conditional-event-subprocess.png';
import ConditionalTopDownEvaluation from './assets/conditional/conditional-top-down-evaluation.png';
import ConditionalScopeIsolation from './assets/conditional/conditional-scope-isolation.png';

# Conditionals

With conditional events, you can configure a process to react automatically when variables matches a condition, without explicitly sending a message or broadcasting a signal. Instead of waiting for an external trigger, a conditional event evaluates an expression over process variables and triggers when that expression becomes `true`.

Conditional events are conceptually similar to [messages](messages.md) and [signals](signals.md), but differ in how they are triggered:

- Messages are correlated to a specific process instance.
- Signals can trigger all matching signal events with a single broadcast.
- Conditional events are triggered when process variables changes and a configured condition evaluates to `true`.

For details on which BPMN event types support conditionals and how to model them, see the [conditional events modeling guide](../modeler/bpmn/conditional-events/conditional-events.md).

# Triggering conditional events

Whenever a conditional event scope is activated a conditional subscription is created for that event.
The engine evaluates the condition for that event whenever relevant variables change within the event’s visible scope.
If the condition becomes `true` while the event is active and in scope, the event triggers and the process follows the behavior defined by the underlying BPMN event.
In the following sections, we describe the semantics of how conditional events are evaluated and triggered in more detail, including how variable filters can limit when conditions are re-evaluated.

Triggering semantics explained in the subtitles below are only valid for conditional events within an active process instance.
See [Triggering root level conditional start events via API](#triggering-root-level-conditional-start-events-via-api) for details on how process-level conditional start events can be triggered on demand via APIs.

## Triggering on scope activation

When a scope is activated, the engine evaluates the condition for conditional events in that scope.
For example, when an activity with an attached conditional boundary event is activated, the engine evaluates the condition for that boundary event immediately at activation.

Given the below process definition:
<img src={ConditionalBoundary} alt="Process definition with conditional boundary event" width="40%"/>

An interrupting conditional boundary event with condition `x > 10` is attached to the service task A.
Let's assume the process instance starts with variable `x` initialized to `11`.
Right after start event is completed and service task A is activated, the condition for boundary event is evaluated to `true` and the boundary event triggers immediately.
Service task A will be terminated and the created job will be canceled.
The process instance will continue with the flow after the boundary event, skipping the service task A.

## Triggering on variable changes

In addition to scope activation, conditional events can also be triggered when relevant variables change within the event’s visible scope.
When a variable changes (for example, it is created or updated), the engine evaluates the condition for any active conditional events in variable's scope and all child scopes (see [Top-down evaluation](#top-down-evaluation)).

Given the following process definition:
<img src={ConditionalEventSubprocess} alt="Process definition with event subprocess conditional start event" width="40%"/>

An event subprocess with a conditional start event is defined with condition `x > 10`.
Let's assume the process instance starts with variable `x` initialized to `5`.
The main process starts and executes the service task, while the event subprocess is not triggered because the condition is not satisfied.
Now, if process instance variables are updated via [Update element instance variables API](../../apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx) and `x` with value `11`, the engine evaluates the condition for the conditional start event in the event subprocess.
Since the condition is now `true`, the conditional start event triggers and the event subprocess starts.

### Top-down evaluation

When a variable changes, the engine evaluates conditions in a top-down order based on scopes.
Starting from the scope where the variable changed, the engine evaluates conditions for any active conditional events in that scope.
Then it continues to evaluate conditions in child scopes, and so on down the hierarchy.
This is performed until one of scopes are interrupted by a triggered event or there are no more child scopes to evaluate.

Given the following process definition:
<img src={ConditionalTopDownEvaluation} alt="Process definition with nested conditional boundary events" width="60%"/>

If a variable is set within the scope of the root process instance or subprocess instance, the engine evaluates the subprocess’s conditional boundary event first.
If the condition is satisfied, execution is interrupted; otherwise, the engine evaluates the conditional boundary event on the inner service task A and triggers it if its condition is satisfied.

### Scope isolation

Variable changes within a scope instance can trigger only those conditional events for which the variable is visible in that scope.
They do not affect unrelated scope instances.
In practice, when a variable changes, the engine evaluates only the conditional events that listen in the context of that scope instance or one of its child scopes.

Given the following process definition:
<img src={ConditionalScopeIsolation} alt="Process definition with parallel branches and conditional boundary events" width="60%"/>

Service task A and service task B are active in parallel branches of the process.
If a variable is set in the context of the subprocess instance, then only the conditional boundary event on service task B is evaluated.
The boundary event on service task A cannot trigger because the variable is not visible in its scope.
See [variable scopes](variables.md#variable-scopes) for more details on variable visibility rules.

### Variable filter semantics

Conditional events can define a `zeebe:conditionalFilter` to limit when the engine re-evaluates the condition.

A filter can restrict evaluation based on:

- Specific variable names (`variableNames`)
- Specific variable events (`variableEvents`, such as `create` or `update`)

If no filter is defined, the engine evaluates the condition on any variable change within the event’s visible scope.

:::warning Important
Please always define variable filters for conditional events unless you explicitly want the event to trigger on every variable change when the condition is satisfied.

If a conditional event has no variable filters and its condition is satisfied, it will trigger on every variable change within its visible scope.
This can lead to unintended triggers, such as multiple triggers of the same event in rapid succession.
:::

The `variableEvents` attribute is supported only for conditional events within a running process instance.
It is not supported for process-level conditional start events, because no process instance exists yet in which variable events could occur.

### Considerations

While conditional events are powerful for enabling reactive process behavior, they require careful modeling to avoid unintended triggers.
When modeling conditional events, keep in mind the following considerations.

**A conditional subscription triggers at most once per variable document change**

When multiple variables are updated in the same document change and both satisfy the condition of a conditional event, the subscription triggers only once.

Given the following process definition:
<img src={ConditionalBoundary} alt="Process definition with conditional boundary event" width="40%"/>

Given that conditional boundary event has condition `x > 10 or y > 5`.
If both variables `x` and `y` are updated from `11` to `6` via [Update element instance variables API](../../apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx),
the boundary event will trigger only once, even though both variables satisfy the condition.

**Variables set via input expressions DO trigger the conditional boundary event**

Given an activity with attached conditional boundary event and an input variable mapping that sets a variable which satisfies the condition of the boundary event, the boundary event will trigger when the activity is activated.

**Variables set during output mapping DO NOT trigger the boundary**

Given an activity A with attached conditional boundary event and an output variable mapping that sets a variable.
If the variable set during output mapping satisfies the condition of the boundary event, the boundary event attached to the activity A will not trigger when the activity A completes.
This is because the subscription for the boundary event is removed when the activity completes.

**If a job completes and writes a variable that satisfies the condition, the conditional boundary event will NOT trigger**

When a job completes and sets a variable that satisfies the condition of a conditional boundary event, the boundary event does not trigger.

Given the following process definition:
<img src={ConditionalBoundary} alt="Process definition with conditional boundary event" width="40%"/>

If the service task A is completed with an updated variable `x` with value `11`, the conditional boundary event with condition `x > 10` will not trigger.
This is because the subscription for the boundary event is already removed when the task completes.

**Multi instance activity behavior**

- Given interrupting boundary on multi-instance body, a child completion that changes a variable can interrupt the entire multi-instance activity execution.
- Given non-interrupting boundary on multi-instance body, conditional event satisfying the condition will trigger for each child instance, but will not interrupt the multi-instance body execution.
- A local-scope variable update on the multi-instance child will only trigger the specific child instance where the local variable changed; sibling children continue unaffected.
- A process-scope variable update which is visible to all multi-instance children will trigger inner conditional events on all active child instances.

# Triggering root level conditional start events via API

Process-level conditional start events can be evaluated on demand via APIs.
The engine evaluates their conditions against a provided set of variables and starts matching process instances.

- Orchestration Cluster REST API. Use the Evaluate root-level conditional start events endpoint (`POST /conditionals/evaluation`) to evaluate all matching conditional start events for the provided variables and start any resulting process instances.
  See [Evaluate root-level conditional start events](../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx).
- Gateway gRPC API. Use the `EvaluateConditional` RPC on the gateway service. See the `EvaluateConditional` RPC in the [gateway service](../../apis-tools/zeebe-api/gateway-service.md#evaluateconditional-rpc).
- Clients and SDKs.
  Camunda client libraries (e.g. Java and Python) provide convenience methods that call these APIs.
  For example, the Java Client offers the `newEvaluateConditionalCommand()` method to evaluate conditions and trigger events programmatically.
  See the [Java client documentation](<https://javadoc.io/doc/io.camunda/camunda-client-java/latest/io/camunda/client/CamundaClient.html#newEvaluateConditionalCommand()>) for usage details.

When evaluating conditional start events (via REST/gRPC API or Client SDKs):

- Multiple conditional start events in the same process definition can trigger if their conditions evaluate to `true`.
  This can result in multiple instances being started from the same process definition.
- If no `processDefinitionKey` is specified, the engine evaluates all conditional start events across all deployed process definitions and starts instances for those whose conditions evaluate to `true`.

These APIs apply only to process-level conditional start events.
Conditional events inside running process instances are evaluated automatically when their BPMN scope starts or when relevant variables change.

## Migration from Camunda 7

In Camunda 7, conditional events use the `camunda:variableName` and `camunda:variableEvents` attributes.

During migration to Camunda 8, these attributes are converted to a `zeebe:conditionalFilter` extension element:

- `camunda:variableName` → `zeebe:conditionalFilter variableNames="..."`
- `camunda:variableEvents` → `zeebe:conditionalFilter variableEvents="..."`

Only `create` and `update` are supported in Camunda 8. If a model uses `delete` in Camunda 7, migration maps it to the closest supported behavior.
