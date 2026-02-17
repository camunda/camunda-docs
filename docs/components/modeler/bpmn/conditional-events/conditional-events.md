---
id: conditional-events
title: Conditional events
description: "Use conditional events to trigger process behavior when a FEEL condition evaluates to true, based on process variables, BPMN scope, and variable change events."
---

A conditional event triggers when its condition evaluates to `true`. A conditional event triggers when its condition evaluates to `true`.

![BPMN diagram showing conditional start, intermediate, and boundary events](assets/all-conditional-event-types.png)

## Interrupting vs. non-interrupting events

Some conditional events—such as event subprocess start events and boundary events—can be interrupting or non-interrupting.

- Interrupting: When triggered, the event stops the current execution path before continuing along the event’s outgoing flow.
- Non-interrupting: When triggered, the event starts an additional execution path while the current activity or scope continues.

Conditional events behave differently depending on where they appear in the BPMN model. The following sections describe each supported event type in Camunda 8.

## Types of conditional events

Camunda 8 supports conditional events in the following positions:

- Root conditional start events (on the process)
- Conditional event subprocess start events (interrupting and non-interrupting)
- Intermediate conditional catch events
- Conditional boundary events (interrupting and non-interrupting)

In all cases, the event triggers when its condition evaluates to `true`.

### Conditional start events

A conditional start event starts a process instance or an event subprocess when its condition becomes `true`.

- Root conditional start events start a new process instance.
- Event subprocess conditional start events start an event subprocess within an active process instance.

Event subprocess conditional start events can be interrupting or non-interrupting. See [Interrupting vs. non-interrupting events](#interrupting-vs-non-interrupting-events).

You might use conditional start events to:

- Start an escalation process when a case’s `priority` becomes `"high"`.
- Trigger a monitoring subprocess when a risk score crosses a threshold.

To start processes via conditional start events from external systems, use the Orchestration Cluster REST API. See [Evaluate root-level conditional start events](../../../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx) for request and response details.

### Intermediate conditional catch events

An intermediate conditional catch event waits until its condition becomes `true`.

When the process instance reaches the event, it waits until the condition evaluates to `true`, then continues along the outgoing sequence flow. For details on evaluation timing and scope rules, see [Evaluation semantics](../../../concepts/conditions.md#evaluation-semantics).

Intermediate conditional catch events are always interrupting, as they represent a waiting point in the process flow.

Typical use cases include:

- “Wait until `processorAvailable` becomes `true`, then proceed to `Assign task`.”

### Conditional boundary events

A conditional boundary event is attached to an activity and monitors data while the activity is active.

When the activity is entered, the engine evaluates the boundary event’s condition and continues to monitor relevant variable changes.

Conditional boundary events can be interrupting or non-interrupting. See [Interrupting vs. non-interrupting events](#interrupting-vs-non-interrupting-events).

Typical use cases include:

- Interrupting: “If `customerCancelled = true` while `Review application` is running, cancel the review.”
- Non-interrupting: “While waiting for documents, start separate checks whenever `documentReceived = true`.”

## Conditions

### Condition expressions (FEEL)

Conditional events use FEEL expressions in the `bpmn:condition` element. The expression must evaluate to a boolean value (`true` or `false`).

Example:

```xml title="Conditional event definition with FEEL condition"
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1">
  <bpmn:condition xsi:type="bpmn:tFormalExpression">
    = x > 1
  </bpmn:condition>
</bpmn:conditionalEventDefinition>
```

The FEEL expression is evaluated using variables available in the event’s scope.

For details on how and when conditions are evaluated, see [Evaluation semantics](../../../concepts/conditions.md#evaluation-semantics).

### Variable filters

Variable filters restrict when a conditional event is re-evaluated in response to variable changes.

Define a filter by adding a `zeebe:conditionalFilter` extension element:

```xml title="Conditional event with Zeebe variable filter"
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1rp6yz6">
  <bpmn:condition xsi:type="bpmn:tFormalExpression">
    = x > 1
  </bpmn:condition>

  <bpmn:extensionElements>
    <zeebe:conditionalFilter
      variableNames="var1, var2"
      variableEvents="create, update" />
  </bpmn:extensionElements>
</bpmn:conditionalEventDefinition>
```

The `zeebe:conditionalFilter` extension supports:

- `variableNames` limits evaluation to changes of specific variables in the relevant scope.

- `variableEvents` specifies which variable events trigger evaluation. Supported values:
  - `create`
  - `update`
  - `create, update`

For runtime behavior and limitations of variable filters, see [Variable filter semantics](../../../concepts/conditions.md#variable-filter-semantics).

## Modeling conditional events in Modeler

Camunda Modeler (desktop and web) supports conditional start events, intermediate conditional catch events, and conditional boundary events. Use the properties panel to define the FEEL condition and optional variable filters.

## XML representation

### Conditional start event

```xml
<bpmn:startEvent id="ConditionalStart">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Start">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">= amount > 100</bpmn:condition>
  </bpmn:conditionalEventDefinition>
</bpmn:startEvent>
```

### Intermediate conditional catch event

```xml
<bpmn:intermediateCatchEvent id="WaitForCondition">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Catch">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">
      = processorAvailable
    </bpmn:condition>

    <bpmn:extensionElements>
      <zeebe:conditionalFilter
        variableNames="processorAvailable"
        variableEvents="create, update" />
    </bpmn:extensionElements>
  </bpmn:conditionalEventDefinition>
</bpmn:intermediateCatchEvent>
```

### Conditional boundary event

```xml
<bpmn:boundaryEvent id="CancelReview" attachedToRef="ReviewApplication">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Boundary">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">
      = customerCancelled
    </bpmn:condition>
  </bpmn:conditionalEventDefinition>
</bpmn:boundaryEvent>
```

## Additional resources

- [Evaluate root-level conditional start events](../../../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx) for request and response details.
