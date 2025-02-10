---
id: script-tasks
title: "Script tasks"
description: "A script task is used to model the evaluation of a script; for example, a script written in Groovy,
JavaScript, or Python."
---

A script task is used to model the evaluation of a script; for example, a script written in Groovy,
JavaScript, or Python.

![task](assets/script-task.png)

:::info
Camunda 8 supports alternative task implementations for the script task. To use your own
implementation for a script task, refer to the [job worker implementation](#job-worker-implementation) section below. The
sections before this job worker implementation apply to the [FEEL expression](/components/modeler/feel/language-guide/feel-expressions-introduction.md)
implementation only.
:::

When the process instance arrives at a script task, the integrated [FEEL Scala](https://github.com/camunda/feel-scala)
engine evaluates the script task FEEL expression. Once the FEEL expression is evaluated successfully, the process
instance continues.

If the FEEL expression evaluation is unsuccessful, an [incident](/components/concepts/incidents.md) is
raised at the script task. When the incident is resolved, the script task is evaluated again.

## Defining a script task

To define a script task with an inline FEEL expression, use the `zeebe:script` extension element. In the
`zeebe:script` extension element, perform the following steps:

1. Define the **FEEL expression** inside the `expression` attribute.
2. Define the name of process variable in the `resultVariable` attribute. This variable will store the result of the FEEL expression evaluation.

### Variable mappings

By default, the variable defined by `resultVariable` is merged into the process instance. This behavior can be
customized by defining an output mapping at the script task.

All variables in scope of the script task are available to the FEEL engine when the FEEL expression in the script task
is evaluated. Input mappings can be used to transform the variables into a format accepted by the FEEL expression.

:::info
Input mappings are applied on activating the script task (or when an incident at the script task is resolved) before
the FEEL expression evaluation. When an incident is resolved at the script task, the input mappings are applied again
before evaluating the FEEL expression. This can affect the result of the FEEL expression evaluation.
:::

For more information about this topic, visit the documentation about [input and output variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings).

## Job worker implementation

When the job worker implementation is used, script tasks behave exactly like [service tasks](/components/modeler/bpmn/service-tasks/service-tasks.md). Both task types are based on jobs and [job workers](/components/concepts/job-workers.md). The differences between these task types are the visual representation (i.e. the task marker) and the
semantics for the model.

When a process instance enters a script task using a job worker implementation, it creates a corresponding job and waits
for its completion. A job worker should request jobs of this job type and process them. When the job is complete, the
process instance continues.

:::note
Jobs for script tasks are not processed by Zeebe itself. To process them, provide a job worker.
:::

### Defining a job worker script task

A script task must define a [job type](/components/modeler/bpmn/service-tasks/service-tasks.md#task-definition) the
same way a service task does. It specifies the type of job workers should subscribe to (e.g. `script`).

Use [task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers) to pass static parameters to
the job worker (e.g. the script to evaluate). The community extension [Zeebe Script Worker](https://github.com/camunda-community-hub/zeebe-script-worker)
requires certain attributes to be set in the task headers.

Define [variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
the [same way a service task does](/components/modeler/bpmn/service-tasks/service-tasks.md#variable-mappings)
to transform the variables passed to the job worker, or to customize how the variables of the job merge.

## Additional resources

:::tip Community Extension

Review the [Zeebe Script Worker](https://github.com/camunda-community-hub/zeebe-script-worker). This is a
community extension that provides a job worker to evaluate scripts. You can run it, or use it as a
blueprint for your own job worker.

:::

### XML representation

A script task with a custom header:

```xml
<bpmn:scriptTask id="calculate-sum" name="Calculate sum">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="script" />
    <zeebe:taskHeaders>
      <zeebe:header key="language" value="javascript" />
      <zeebe:header key="script" value="a + b" />
    </zeebe:taskHeaders>
  </bpmn:extensionElements>
</bpmn:scriptTask>
```

A script task with an inline FEEL expression:

```xml
<bpmn:scriptTask id="calculate-sum" name="Calculate sum">
  <bpmn:extensionElements>
    <zeebe:script expression="=a + b" resultVariable="sum" />
  </bpmn:extensionElements>
</bpmn:scriptTask>
```

### References

- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
