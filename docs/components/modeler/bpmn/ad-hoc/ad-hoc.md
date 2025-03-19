---
id: ad-hoc
title: "Ad-hoc"
description: "The ad-hoc marker is only available for embedded subprocesses, allowing more flexibility while executing inner elements."
---

The ad-hoc marker (represented by a **~** tilde character) is only available
for [embedded subprocesses](../embedded-subprocesses/embedded-subprocesses.md), which are therefore called **ad-hoc subprocesses**.
Compared to regular subprocesses, ad-hoc subprocesses allow more flexibility for executing inner elements.

![A demo process with an ad-hoc subprocess. Some elements inside the subprocess are active.](assets/ad-hoc-subprocess.png)

The inner elements of an ad-hoc subprocess are not connected to a start or end event. Each element can be executed
multiple times, in any order, or skipped.

If elements depend on each other, the elements can be connected by a sequence flow to build a structured sequence
within the ad-hoc subprocess.

When a process instance reaches an ad-hoc subprocess, it [activates the inner elements](#activate-an-element) and
completes the ad-hoc subprocess depending on the [completion condition](#completion). After completion, the process
instance takes the outgoing sequence flows.

### Constraints

An ad-hoc subprocess has the following constraints:

- Must have at least one activity
- Must not have start events or end events
- Any intermediate catch event must have an outgoing sequence flow

## Activate an element

An ad-hoc subprocess can define an expression `activeElementsCollection` that should return a
[list](../../feel/language-guide/feel-data-types.md#list) of strings. Each string in the list should match to an ID of
an inner element of the ad-hoc subprocess. Usually, the expression accesses a process instance variable that was
created before and holds the list of element IDs.

![A process with an ad-hoc subprocess that shows how a variable is used to active the inner elements.](assets/ad-hoc-subprocess-activation.png)

When a process instance reaches an ad-hoc subprocess, it evaluates the expression `activeElementsCollection` and
activates all elements whose element IDs are in the list.

If the list is empty or the expression is not defined, no element is activated and the ad-hoc subprocess remains active.

If the expression doesn't evaluate to a list of strings, or the list contains other values than inner element IDs, the
process instance creates an incident.

:::note
Currently, it is not possible to activate elements dynamically after the ad-hoc subprocess is activated, only on
entering the subprocess.
:::

## Completion

An ad-hoc subprocess can define an optional `completionCondition` [boolean expression](/components/modeler/feel/language-guide/feel-boolean-expressions.md)
that is evaluated every time an inner element is completed.

- If the expression evaluates to `true` after completing an inner element, the ad-hoc subprocess is completed and the process instance takes the outgoing sequence flows.
- If no `completionCondition` is defined, the ad-hoc subprocess is completed after all [activated elements](#activate-an-element)
  are completed.

A `cancelRemainingInstances` boolean attribute can be configured to influence the ad-hoc subprocess behavior when the completion condition is met.

- If set to `true` (default value), all remaining active instances of inner elements are terminated and the ad-hoc subprocess is directly completed.
- If set to `false`, the ad-hoc subprocess waits for the completion of all active instances before completing.

## Variable mappings

An ad-hoc subprocess can define input and output
[variable mappings](../../../concepts/variables.md#inputoutput-variable-mappings).

**Input variable mappings** are applied on activating the ad-hoc subprocess and before evaluating the expression
`activeElementsCollection`. They can be used to create local variables for the ad-hoc subprocess.

**Output variable mappings** are applied on completing the ad-hoc subprocess. They can be used to propagate local variables
from the ad-hoc subprocess into the process instance. By default, no local variables are propagated.

## Additional resources

### XML representation

```xml
<bpmn:adHocSubProcess id="ad-hoc-subprocess" name="Ad-hoc subprocess" cancelRemainingInstances="false">
  <bpmn:extensionElements>
    <zeebe:adHoc activeElementsCollection="=activeElements" />
  </bpmn:extensionElements>
  ... more contained elements ...
  <bpmn:completionCondition xsi:type="bpmn:tFormalExpression">=myCondition</bpmn:completionCondition>
</bpmn:adHocSubProcess>
```
