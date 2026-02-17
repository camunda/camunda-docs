---
id: conditional-events-new
title: Conditional events (new)
description: "Use conditional events to trigger process behavior when a FEEL condition evaluates to true, based on process variables, BPMN scope, and variable change events."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Conditional events are a powerful modeling tool when process instances should react to changes in process state rather than to an explicitly delivered notification.
For example, when a variable crosses a threshold, a required set of fields becomes complete, a risk score changes, or a business rule flips from false to true.
This is especially handy when the producer of the change is not a single known sender (or there are many), when you don’t want to build correlation logic, or when the process logic is naturally expressed as guard conditions over process state.

A conditional event triggers when its condition evaluates to `true`.
The engine evaluates the FEEL expression over process variables and triggers the event automatically when its scope starts and when the relevant variables change.
The diagram below shows all the four types of conditional events: root level start, event subprocess start, intermediate catch, and boundary events.

![BPMN diagram showing conditional start, intermediate, and boundary events](assets/all-conditional-event-types.png)

In this example, the process starts with a root-level conditional start event.
Root level conditional start events can be triggered via Orchestration Cluster API or Camunda Client SDKs.
// TODO - link to triggering section below
A new instance is created once the condition `=orderReceived = true` evaluates to true.

The intermediate conditional catch event acts like a wait-until condition.
It continues to “Ship order” only after inventory is successfully reserved.

The interrupting conditional boundary event attached to “Review order” handles changes mid-review.
If the delivery address is changed, the boundary event triggers and interrupts the user task, routing execution to “Apply changes” before completing the order preparation.

Finally, the interrupting event subprocess can cancel the work at any time while the instance is running.
If order is canceled while preparing the order, the conditional start event inside the event subprocess fires and interrupts the main process, starting the cancellation subprocess to handle the cancellation logic.

// TODO - start here

## Interrupting vs. non-interrupting events

Some conditional events can be interrupting or non-interrupting:

- **Interrupting**: Stops the current execution path before continuing along the event's outgoing flow.
- **Non-interrupting**: Starts an additional execution path while the current activity or scope continues.

## Types of conditional events

<Tabs groupId="event-types" defaultValue="start" values={[
{label: 'Start events', value: 'start'},
{label: 'Intermediate catch events', value: 'intermediate'},
{label: 'Boundary events', value: 'boundary'}
]}>

<TabItem value="start">

Conditional start events start a process instance or event subprocess when the condition becomes `true`.

- **Root conditional start events**: Start a new process instance
- **Event subprocess start events**: Start an event subprocess within an active process instance (can be interrupting or non-interrupting)

**Use cases:**

- Start an escalation process when `priority = "high"`
- Trigger a monitoring subprocess when a risk score crosses a threshold

**Evaluation from external systems:**  
Use the Orchestration Cluster REST API to [evaluate root-level conditional start events](../../../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx).

</TabItem>

<TabItem value="intermediate">

Intermediate conditional catch events wait until the condition becomes `true`.

**Behavior:**

1. On entry, the engine evaluates the condition once
   - If `true`, the event completes immediately
   - If `false`, the process instance waits
2. When relevant variables change in scope, the engine re-evaluates
3. When the condition becomes `true`, the event completes

**Use case:**  
Wait until `processorAvailable = true`, then proceed to assign task.

</TabItem>

<TabItem value="boundary">

Conditional boundary events are attached to an activity and monitor data while the activity is active. They can be interrupting or non-interrupting.

**Use cases:**

- **Interrupting**: Cancel a review if `customerCancelled = true` while the review is running
- **Non-interrupting**: Start separate checks whenever `documentReceived = true` while waiting for documents

</TabItem>

</Tabs>

## Conditions

### FEEL expressions

Conditional events use FEEL expressions that must evaluate to a boolean (`true` or `false`).

```xml
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1">
  <bpmn:condition xsi:type="bpmn:tFormalExpression">= x > 1</bpmn:condition>
</bpmn:conditionalEventDefinition>
```

**Evaluation rules:**

- Expressions follow BPMN scoping rules (process-level or subprocess-level variables)
- Evaluated once when the BPMN scope starts
- Re-evaluated when relevant variables change

### Variable filters

Variable filters restrict when a conditional event is re-evaluated. Define using `zeebe:conditionalFilter`:

```xml
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1">
  <bpmn:condition xsi:type="bpmn:tFormalExpression">= x > 1</bpmn:condition>
  <bpmn:extensionElements>
    <zeebe:conditionalFilter
      variableNames="var1, var2"
      variableEvents="create, update" />
  </bpmn:extensionElements>
</bpmn:conditionalEventDefinition>
```

**Attributes:**

- `variableNames`: Limits evaluation to changes of specific variables
- `variableEvents`: Specifies which events trigger evaluation (`create`, `update`, or `create, update`)

:::note
If omitted, the condition evaluates on any variable change in scope. `variableEvents` is not supported for root-level conditional start events.
:::

### Migration from Camunda 7

Camunda 7 attributes are automatically converted during migration:

- `camunda:variableName` → `zeebe:conditionalFilter variableNames="..."`
- `camunda:variableEvents` → `zeebe:conditionalFilter variableEvents="..."`

Only `create` and `update` are supported in Camunda 8. The `delete` event is mapped to the closest supported behavior.

## XML representation

<Tabs groupId="xml-examples" defaultValue="start" values={[
{label: 'Start event', value: 'start'},
{label: 'Intermediate catch event', value: 'intermediate'},
{label: 'Boundary event', value: 'boundary'}
]}>

<TabItem value="start">

```xml
<bpmn:startEvent id="ConditionalStart">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Start">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">= amount > 100</bpmn:condition>
  </bpmn:conditionalEventDefinition>
</bpmn:startEvent>
```

</TabItem>

<TabItem value="intermediate">

```xml
<bpmn:intermediateCatchEvent id="WaitForCondition">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Catch">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">= processorAvailable</bpmn:condition>
    <bpmn:extensionElements>
      <zeebe:conditionalFilter
        variableNames="processorAvailable"
        variableEvents="create, update" />
    </bpmn:extensionElements>
  </bpmn:conditionalEventDefinition>
</bpmn:intermediateCatchEvent>
```

</TabItem>

<TabItem value="boundary">

```xml
<bpmn:boundaryEvent id="CancelReview" attachedToRef="ReviewApplication">
  <bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Boundary">
    <bpmn:condition xsi:type="bpmn:tFormalExpression">= customerCancelled</bpmn:condition>
  </bpmn:conditionalEventDefinition>
</bpmn:boundaryEvent>
```

</TabItem>

</Tabs>

## Additional resources

- [Evaluate root-level conditional start events](../../../../apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals.api.mdx)
