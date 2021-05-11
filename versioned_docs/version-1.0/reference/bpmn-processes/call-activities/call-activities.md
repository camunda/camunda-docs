---
id: call-activities
title: "Call activities"
---

A call activity (aka reusable subprocess) allows to call/invoke another process as part of this process. It is similar to an [embedded subprocess](../embedded-subprocesses/embedded-subprocesses.md) but the process is externalized (i.e. stored as separated BPMN) and can be invoked by different processes.

![call-activity](assets/call-activities-example.png)

When a call activity is entered then a new process instance of the referenced process is created. The new process instance gets activated at the **none start event**. The process can have start events of other types but they are ignored.

When the created process instance is completed then the call activity is left and the outgoing sequence flow is taken.

## Defining the called process

A call activity must define the BPMN process id of the called process as `processId`.

The new instance of the defined process will be created of its **latest version** - at the point when the call activity is activated.

Usually, the `processId` is defined as a static value (e.g. `shipping-process`) but it can also be defined as [expression](/product-manuals/concepts/expressions.md) (e.g. `= "shipping-" + tenantId`). The expression is evaluated on activating the call activity and must result in a `string`.

## Boundary events

![call-activity-boundary-event](assets/call-activities-boundary-events.png)

Interrupting and non-interrupting boundary events can be attached to a call activity.

When an interrupting boundary event is triggered then the call activity **and** the created process instance are terminated. The variables of the created process instance are not propagated to the call activity.

When an non-interrupting boundary event is triggered then the created process instance is not affected. The activities at the outgoing path have no access to the variables of the created process instance since they are bounded to the other process instance.

## Variable mappings

When the call activity is activated then **all variables** of the call activity scope are copied to the created process instance.

Input mappings can be used to create new local variables in the scope of the call activity. These variables are also copied to the created process instance.

If the attribute `propagateAllChildVariables` is set (default: `true`) then all variables of the created process instance are propagated to the call activity. This behavior can be customized by defining output mappings at the call activity. The output mappings are applied on completing the call activity and only those variables that are defined in the output mappings are propagated.

It is recommended to disable the attribute `propagateAllChildVariables` or define output mappings if the call activity is in a parallel flow (e.g. when it is marked as [parallel multi-instance](../multi-instance/multi-instance.md#variable-mappings)). Otherwise, it can happen that variables are overridden accidentally when they are changed in the parallel flow.

## Additional resources

### XML Representation
A call activity with static process id:

```xml
<bpmn:callActivity id="task-A" name="A">
  <bpmn:extensionElements>
    <zeebe:calledElement processId="child-process-id" />
  </bpmn:extensionElements>
</bpmn:callActivity>
```

### References

- [Expressions](/product-manuals/concepts/expressions.md)
- [Variable scopes](/product-manuals/concepts/variables.md#variable-scopes)
- [Variable mappings](/product-manuals/concepts/variables.md#inputoutput-variable-mappings)
