---
id: call-activities
title: "Call activities"
description: "A call activity (or reusable subprocess) allows you to call and invoke another process as part of this process."
---

A call activity (or reusable subprocess) allows you to call and invoke another process as part of this process. It's similar to an [embedded subprocess](../embedded-subprocesses/embedded-subprocesses.md), but the process is externalized (i.e. stored as separated BPMN) and can be invoked by different processes.

![call-activity](assets/call-activities-example.png)

When a call activity is entered, a new process instance of the referenced process is created. The new process instance is activated at the **none start event**. The process can have start events of other types, but they are ignored.

When the created process instance is completed, the call activity is left and the outgoing sequence flow is taken.

## Defining the called process

A call activity must define the BPMN process ID of the called process as `processId`.

Usually, the `processId` is defined as a [static value](/components/concepts/expressions.md#expressions-vs-static-values) (e.g. `shipping-process`), but it can also be defined as [expression](/components/concepts/expressions.md) (e.g. `= "shipping-" + tenantId`). The expression is evaluated on activating the call activity and must result in a `string`.

The `bindingType` attribute determines which version of the called process is instantiated:

- `latest`: The latest deployed version at the moment the call activity is activated.
- `deployment`: The version that was deployed together with the currently running version of the calling process.
- `versionTag`: The latest deployed version that is annotated with the version tag specified in the `versionTag` attribute.

To learn more about choosing binding types, see [choosing the resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md).

:::note
If the `bindingType` attribute is not specified, `latest` is used as the default.
:::

## Boundary events

![call-activity-boundary-event](assets/call-activities-boundary-events.png)

Interrupting and non-interrupting boundary events can be attached to a call activity.

When an interrupting boundary event is triggered, the call activity and the created process instance are terminated. The variables of the created process instance are not propagated to the call activity.

When a non-interrupting boundary event is triggered, the created process instance is not affected. The activities at the outgoing path have no access to the variables of the created process instance since they are bound to the other process instance.

## Variable mappings

Input mappings can be used to create new local variables in the scope of the call activity. These variables are also copied to the created process instance.

If the attribute `propagateAllChildVariables` is set (default: `true`), all variables of the created process instance are propagated to the call activity. This behavior can be customized by defining output mappings at the call activity. The output mappings are applied on completing the call activity and only those variables that are defined in the output mappings are propagated.

It's recommended to disable the attribute `propagateAllChildVariables` or define output mappings if the call activity is in a parallel flow (e.g. when it is marked as [parallel multi-instance](../multi-instance/multi-instance.md#variable-mappings)). Otherwise, variables can be accidentally overridden when they are changed in the parallel flow.

By default, all variables of the call activity scope are copied to the created process instance. This can be limited to copying only the local variables of the call activity, by setting the attribute `propagateAllParentVariables` to `false`.

By disabling this attribute, variables existing at higher scopes are no longer copied. If the attribute `propagateAllParentVariables` is set (default: `true`), all variables are propagated to the child process instance.

## Additional resources

### XML representation

A call activity with static process id, propagation of all child variables turned on, and no explicit binding type (`latest` is used implicitly):

```xml
<bpmn:callActivity id="Call_Activity" name="Call Process A">
  <bpmn:extensionElements>
    <zeebe:calledElement processId="child-process-a" propagateAllChildVariables="true" />
  </bpmn:extensionElements>
</bpmn:callActivity>
```

A call activity with the `deployment` binding type:

```xml
<bpmn:callActivity id="Call_Activity" name="Call Process A">
  <bpmn:extensionElements>
    <zeebe:calledElement processId="child-process-a" bindingType="deployment" />
  </bpmn:extensionElements>
</bpmn:callActivity>
```

A call activity with the `versionTag` binding type:

```xml
<bpmn:callActivity id="Call_Activity" name="Call Process A">
  <bpmn:extensionElements>
    <zeebe:calledElement processId="child-process-a"
                         bindingType="versionTag" versionTag="v1.0" />
  </bpmn:extensionElements>
</bpmn:callActivity>
```

A call activity with copying of all variables to the child process turned off:

```xml
<bpmn:callActivity id="Call_Activity" name="Call Process A">
    <bpmn:extensionElements>
        <zeebe:calledElement processId="child-process-id" propagateAllParentVariables="false" />
        <zeebe:ioMapping>
            <zeebe:input source="=variableValue" target="variableName" />
        </zeebe:ioMapping>
    </bpmn:extensionElements>
</bpmn:callActivity>
```

### References

- [Expressions](/components/concepts/expressions.md)
- [Variable scopes](/components/concepts/variables.md#variable-scopes)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
