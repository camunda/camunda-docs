---
id: script-tasks
title: "Script tasks"
---

A script task is used to model the evaluation of a script; for example, a script written in Groovy,
JavaScript, or Python.

![task](assets/script-task.png)

Script tasks behave exactly like [service tasks](../service-tasks/service-tasks.md). Both task
types are based on jobs and [job workers](../../../components/concepts/job-workers.md). The
differences between these task types are the visual representation (i.e. the task marker) and the
semantics for the model.

When a process instance enters a script task, it creates a corresponding job and waits for its
completion. A job worker should request jobs of this job type and process them. When the job is
complete, the process instance continues.

:::info 

Jobs for script tasks are not processed by Zeebe itself. To process them, provide a job worker.

:::

## Defining a task

A script task must define a [job type](../service-tasks/service-tasks#task-definition). It specifies
the type of job workers should subscribe to (e.g. `script`).

Use [task headers](../service-tasks/service-tasks#task-headers) to pass static parameters to the job
worker (e.g. the script to evaluate).

Define [variable mappings](../service-tasks/service-tasks#variable-mappings) to transform the
variables passed to the job worker, or to customize how the variables of the job merge
in the process instance.

## Additional resources

:::tip Community Extension

Review the [Zeebe Script Worker](https://github.com/camunda-community-hub/zeebe-script-worker). It's a
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

### References

- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
