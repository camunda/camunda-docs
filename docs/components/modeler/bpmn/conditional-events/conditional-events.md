---
id: conditional-events
title: Conditional events
description: "Conditional events are used to trigger events based on specific conditions"
---

Conditional events are events that trigger when a condition evaluates to `true`. They evaluate a FEEL expression over process variables and trigger automatically when their scope starts or when relevant variables change.

![process with error event](assets/conditional-events.png)

### Interrupting vs. non-interrupting events

Some conditional events—such as event subprocess start events and boundary events—can be interrupting or non-interrupting.

- Interrupting: When triggered, the event stops the current execution path before continuing along the event’s outgoing flow.
- Non-interrupting: When triggered, the event starts an additional execution path and the current activity or scope continues running.

Conditional events behave differently depending on where they appear in the BPMN model. The following sections describe each event type in Camunda 8.

## Types of conditional events in Camunda 8

Camunda 8 supports conditional events in the following positions:

- Root conditional start events (on the process)
- Conditional event subprocess start events (interrupting and non-interrupting)
- Intermediate conditional catch events
- Conditional boundary events (interrupting and non-interrupting)

In all cases, the event is triggered when its condition evaluates to `true`.

### Conditional start events

A conditional start event starts a process instance or an event subprocess when its condition becomes `true`.

- Root conditional start events start a new process instance.
- Event subprocess conditional start events start an event subprocess inside an active process instance.

Event subprocess conditional start events can be interrupting or non-interrupting. See Interrupting vs. non-interrupting events above.

Typical use cases include:

- Starting an escalation process when a case’s `priority` becomes `"high"`.
- Triggering a monitoring subprocess when a risk score crosses a threshold.

To start processes via conditional start events from external systems, use the Orchestration Cluster REST API. See [Evaluate root level conditional start events](https://docs.camunda.io/docs/next/apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals/) for request and response details.

### Intermediate conditional catch events

An intermediate conditional catch event waits until its condition becomes `true`.

When the process instance enters the event:

- The engine evaluates the condition once.
  - If the condition is already true, the event completes immediately.
  - If the condition is false, the process instance waits.
- When relevant variables change in scope, the engine re-evaluates the condition.
  When it evaluates to `true`, the event completes and the process continues.

Intermediate conditional catch events are always interrupting, as they represent a waiting point in the process flow.

Typical use cases include:

- “Wait until `processorAvailable` becomes `true`, then proceed to `Assign task`.”

### Conditional boundary events

A conditional boundary event is attached to an activity and monitors data while the activity is active.

When the activity is entered, the engine evaluates the boundary event’s condition and continues to monitor relevant variable changes.

Conditional boundary events can be interrupting or non-interrupting. See Interrupting vs. non-interrupting events above.

Typical use cases include:

- Interrupting: “If `customerCancelled = true` while `Review application` is running, cancel the review.”
- Non-interrupting: “While waiting for documents, start separate checks whenever `documentReceived = true`.”

## Conditions

### Condition expressions (FEEL)

Conditional events use FEEL expressions in the `bpmn:condition` element. These expressions must evaluate to a boolean value (`true` or `false`).

Example:

```
xml title="Conditional event definition with FEEL condition"
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1">
<bpmn:condition xsi:type="bpmn:tFormalExpression">= x > 1</bpmn:condition>
</bpmn:conditionalEventDefinition>
```

The engine evaluates the FEEL expression using the variables available in the event’s scope:

- The expression can access variables according to BPMN scoping rules (for example, process-level or subprocess-level variables).
- On BPMN scope start (such as when a process, subprocess, or activity begins), the condition is evaluated once.
- When a relevant variable changes, the condition is re-evaluated. If the expression becomes `true`, the event is triggered.

### Variable filters

Variable filters restrict when a conditional event is re-evaluated in response to variable changes.

You can define a filter by adding a `zeebe:conditionalFilter` extension element:

xml title="Conditional event with Zeebe variable filter"
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_1rp6yz6">
<bpmn:condition xsi:type="bpmn:tFormalExpression">= x > 1</bpmn:condition>
<bpmn:extensionElements>
<zeebe:conditionalFilter
variableNames="var1, var2"
variableEvents="create, update" />
</bpmn:extensionElements>
</bpmn:conditionalEventDefinition>

The `zeebe:conditionalFilter` extension provides two main options:

- `variableNames`  
  Limits evaluation to changes of specific variables.  
  For example, if set to `var1, var2`, the engine only evaluates the condition when `var1` or `var2` changes in the relevant scope.

- `variableEvents`
  Specifies which kinds of variable changes should trigger evaluation.  
  Supported values are given as a comma-separated list, for example:
  - `create`
  - `update`
  - `create, update`

If you omit the `zeebe:conditionalFilter`, the engine treats the conditional event as listening to any variable change in the scope (any variable change in that scope). This mirrors the “unfiltered” default behavior of Camunda 7 conditional events, but with FEEL conditions and Zeebe extensions in Camunda 8.

Note that `variableEvents` is only supported for conditional events inside a running scope (for example, intermediate conditional catch events, conditional boundary events, and conditional event subprocess start events). It is not supported on root-level conditional start events, as Camunda Modeler prevents or clears it there.

:::note Migration
In Camunda 7, `camunda:variableName` and `camunda:variableEvents` are attributes on the conditional event definition.

During migration to Camunda 8, these attributes are converted into a `zeebe:conditionalFilter` extension:

- `camunda:variableName` → `zeebe:conditionalFilter variableNames="..."`
- `camunda:variableEvents` → `zeebe:conditionalFilter variableEvents="..."`

This preserves evaluation behavior while ensuring BPMN 2.0–compliant XML.  
Note that `variableEvents` filters only support `create` and `update` in Camunda 8. Any use of `delete` as a filter in Camunda 7 is not supported directly and is mapped to the closest available behavior during migration.
:::

## Modeling conditional events in Modeler

Camunda Modeler (desktop and web) supports conditional start events, intermediate conditional catch events, and conditional boundary events. Use the properties panel to define the FEEL condition and optional variable filters.

## Runtime and tooling behavior

The system processes conditional events as follows:

- Zeebe evaluates conditional events when their BPMN scope starts and when relevant variables change.
- Operate displays conditional events in process instance views and supports instance migration and modification.
- Optimize includes conditional events in BPMN diagrams and makes them available in reports.

## XML representation

A conditional start event:

```
<bpmn:startEvent id="ConditionalStart">
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Start">
<bpmn:condition xsi:type="bpmn:tFormalExpression">= amount > 100</bpmn:condition>
</bpmn:conditionalEventDefinition>
</bpmn:startEvent>
```

An intermediate conditional catch event:

```
<bpmn:intermediateCatchEvent id="WaitForCondition">
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Catch">
<bpmn:condition xsi:type="bpmn:tFormalExpression">= processorAvailable</bpmn:condition>
<bpmn:extensionElements>
<zeebe:conditionalFilter variableNames="processorAvailable"
variableEvents="create, update" />
</bpmn:extensionElements>
</bpmn:conditionalEventDefinition>
</bpmn:intermediateCatchEvent>
```

A conditional boundary event:

```
<bpmn:boundaryEvent id="CancelReview" attachedToRef="ReviewApplication">
<bpmn:conditionalEventDefinition id="ConditionalEventDefinition_Boundary">
<bpmn:condition xsi:type="bpmn:tFormalExpression">= customerCancelled</bpmn:condition>
</bpmn:conditionalEventDefinition>
</bpmn:boundaryEvent>
```

## Additional resources

- Orchestration Cluster REST API: [Evaluate root level conditional start events](https://docs.camunda.io/docs/next/apis-tools/orchestration-cluster-api-rest/specifications/evaluate-conditionals/)
