---
id: business-rule-tasks
title: "Business rule tasks"
description: "A business rule task is used to model the evaluation of a business rule."
---

A business rule task is used to model the evaluation of a business rule; for example, a decision
modeled in [Decision Model and Notation](https://www.omg.org/dmn/) (DMN).

![task](assets/business-rule-task.png)

Business rule tasks behave exactly like [service tasks](/components/modeler/bpmn/service-tasks/service-tasks.md). Both
task types are based on jobs and [job workers](/components/concepts/job-workers.md).

The differences between these task types are the visual representation (i.e. the task marker) and
the semantics for the model.

When a process instance enters a business rule task, it creates a corresponding job and waits for
its completion. A job worker should request jobs of this job type and process them. When the job is
completed, the process instance continues.

:::note
Jobs for business rule tasks are not processed by Zeebe itself. To process them, you must provide a job worker.
:::

## Defining a task

A business rule task must define a [job type](/components/modeler/bpmn/service-tasks/service-tasks.md#task-definition) the same way as a service task does. This
specifies the type of job workers should subscribe to (e.g. DMN).

Use [task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers) to pass static parameters to the job
worker (e.g. the key of the decision to evaluate).

Define [variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings) to transform the
variables passed to the job worker, or to customize how the variables of the job are merged
in the process instance.

## Additional resources

:::tip Community Extension

Take a look at the [Zeebe DMN Worker](https://github.com/camunda-community-hub/zeebe-dmn-worker).
This is a community extension providing a job worker to evaluate DMN decisions. You can run it, or
use it as a blueprint for your own job worker.

:::

### XML representation

A business rule task with a custom header:

```xml
<bpmn:businessRuleTask id="calculate-risk" name="Calculate risk">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="DMN" />
    <zeebe:taskHeaders>
      <zeebe:header key="decisionRef" value="risk" />
    </zeebe:taskHeaders>
  </bpmn:extensionElements>
</bpmn:businessRuleTask>
```

### References

- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
