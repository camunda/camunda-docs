---
id: service-tasks
title: "Service tasks"
---

A service task represents a work item in the process with a specific type.

![process](../assets/order-process.png)

When a service task is entered, a corresponding job is created. The process instance stops here and waits until the job is complete.

A [job worker](/product-manuals/concepts/job-workers.md) can subscribe to the job type, process the jobs, and complete them using one of the Zeebe clients. When the job is complete, the service task is completed and the process instance continues.

## Task definition

A service task must have a `taskDefinition`. This specifies the type of job workers can subscribe to.

Optionally, a `taskDefinition` can specify the number of times the job is retried when a worker signals failure (default = 3).

Typically, the job type and the job retries are defined as static values (e.g. `order-items`) but they can also be defined as [expressions](/product-manuals/concepts/expressions.md) (e.g. `= "order-" + priorityGroup`). The expressions are evaluated on activating the service task and must result in a `string` for the job type and a `number` for the retries.

## Task headers

A service task can define an arbitrary number of `taskHeaders`. They are static metadata handed to workers along with the job. The headers can be used as configuration parameters for the worker.

## Variable mappings

By default, all job variables merge into the process instance. This behavior can be customized by defining an output mapping at the service task.

Input mappings can be used to transform the variables into a format accepted by the job worker.

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

Learn more about the concept of job types and how to set up a job worker via our [manual on job workers](/product-manuals/concepts/job-workers.md).

### References

- [Job handling](/product-manuals/concepts/job-workers.md)
- [Expressions](/product-manuals/concepts/expressions.md)
- [Variable mappings](/product-manuals/concepts/variables.md#inputoutput-variable-mappings)
- [Incidents](/product-manuals/concepts/incidents.md)
