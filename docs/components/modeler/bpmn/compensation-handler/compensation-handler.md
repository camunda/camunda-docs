---
id: compensation-handler
title: "Compensation"
description: "A compensation handler is an activity used to undo tasks that have already been executed."
---

Activities that are associated to a compensation boundary event have a compensation marker. These activities are called
**compensation handlers** and are in charge of reverting the effects of the activity with the compensation boundary
event, the compensation activity.

![Compensation marker example](assets/compensation-marker-example.png)

When the process instance reaches the compensation throw event, it invokes the compensation handler `undo A`, if the
task `A` is completed before. If the task has been completed more than once, the compensation handler is invoked for the
same amount.

Read more about triggering the compensation on the [compensation events](../compensation-events/compensation-events.md)
page.

## Embedded subprocess as compensation handler

![Process with subprocess as compensation handler](assets/subprocess-compensation-handler.png)

The subprocess contains the steps to undo the actions of the compensation activity. Using a subprocess can be useful if
a sequence of steps is required to undo the actions of the activity.

## Call activity as compensation handler

![Process with call activity as compensation handler](assets/call-activity-compensation-handler.png)

The call activity contains the steps to undo the actions of the compensation activity. Using a call activity can be
useful in combination with a call activity as the compensation activity since compensation isn't propagated to the child
process.

## Multi-instance activity as compensation handler

![Process with multi instance activity as compensation handler](assets/multi-instance-compensation-handler.png)

The compensation handler for a [multi-instance activity](../multi-instance/multi-instance.md) is invoked only once,
rather than for each item in the input collection. To invoke the compensation handler more than once, the handler can be
marked as multi-instance too.

If the compensation handler should revert the effects of each item in the input collection, it could use the same input
collection as the multi-instance activity.

## Interrupting compensation handlers

Compensation handlers can be interrupted. If the process instance is cancelled then it terminates all compensation
handlers.

Within a process, the process instance terminates a compensation handler if the compensation throw event that invoked
the compensation handler is interrupted. This can happen in the following cases:

- If a terminate end event is entered.
- If an interrupting event subprocess is triggered.
- If the compensation throw event is inside an embedded subprocess and the subprocess is interrupted.

## Variable Mappings

A compensation handler can define input and output [variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings).

Input variable mappings are applied before invoking the compensation handler. They can be used to create local variables
for the compensation handler.

Output variable mappings are applied after completing the compensation handler. They can be used to customize how the
result variables of the compensation handler are merged into the process instance. By default, all variables are merged.

## Additional resources

### XML representation

A service task with a compensation marker:

```xml
<bpmn:serviceTask id="undo-A" name="undo A" isForCompensation="true">
    <bpmn:extensionElements>
        <zeebe:taskDefinition type="undo-A" />
    </bpmn:extensionElements>
</bpmn:serviceTask>
```
