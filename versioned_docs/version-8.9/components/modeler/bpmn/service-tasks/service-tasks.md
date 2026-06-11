---
id: service-tasks
title: "Service tasks"
description: "Learn more about service tasks which represent a work item in the process with a specific type. When a service task is entered, a corresponding job is created."
---

A service task represents a work item in the process with a specific type.

![process](../assets/order-process.png)

When a service task is entered, a corresponding job is created. The process instance stops here and waits until the job is complete.

A [job worker](/components/concepts/job-workers.md) can subscribe to the job type, process the jobs, and complete them using one of the Zeebe clients. When the job is complete, the service task is completed and the process instance continues.

## Task definition

A service task must have a `taskDefinition`. The `taskDefinition` is used to specify which [job workers](../../../concepts/job-workers.md) handle the service task work.

A `taskDefinition` specifies the following properties:

- `type` (required): Used as reference to specify which job workers request the respective service task job. For example, `order-items`.
  - `type` can be specified as any [static value](/components/concepts/expressions.md#expressions-vs-static-values) (`myType`) or as a FEEL [expression](../../../concepts/expressions.md) prefixed by `=` that evaluates to any FEEL string; for example, `= "order-" + priorityGroup`.
- `retries` (optional): Specifies the number of times the job is retried when a worker signals failure. The default is three.

The expressions are evaluated on activating the service task and must result in a `string` for the job type and a `number` for the retries.

Refer to an example in the form of the [XML representation](#xml-representation) below.

## Task headers

A service task can define an arbitrary number of `taskHeaders`; they are static metadata handed to workers along with the job. The headers can be used as configuration parameters for the worker.

## Variable mappings

By default, all job variables merge into the process instance. This behavior can be customized by defining an output mapping at the service task.

Input mappings can be used to transform the variables into a format accepted by the job worker.

For more information about this topic visit the documentation about [Input/output variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings).

## Additional resources

### XML representation

A service task with a custom header:

```xml
<bpmn:serviceTask id="collect-money" name="Collect Money">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="payment-service" retries="5" />
    <zeebe:taskHeaders>
      <zeebe:header key="method" value="VISA" />
    </zeebe:taskHeaders>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

## Next steps

Learn more about the concept of job types and how to set up a job worker via our [manual on job workers](/components/concepts/job-workers.md).

### References

- [Job handling](/components/concepts/job-workers.md)
- [Expressions](/components/concepts/expressions.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
- [Incidents](/components/concepts/incidents.md)
