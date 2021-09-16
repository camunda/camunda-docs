---
id: service-tasks
title: "Service tasks"
---

A service task represents a work item in the process with a specific type.

![process](../assets/order-process.png)

When a service task is entered then a corresponding job is created. The process instance stops at this point and waits until the job is completed.

A worker can subscribe to the job type, process the jobs and complete them using one of the Zeebe clients. When the job is completed, the service task gets completed and the process instance continues.

## Task definition

A service task **must** have a `taskDefinition`. It specifies the **type of job** which workers can subscribe to.

Optionally, a `taskDefinition` can specify the number of times the job is retried when a worker signals failure (default = 3).

Usually, the job type and the job retries are defined as static values (e.g. `order-items`) but they can also be defined as [expressions](/components/concepts/expressions.md) (e.g. `= "order-" + priorityGroup`). The expressions are evaluated on activating the service task and must result in a `string` for the job type and a `number` for the retries.

## Task headers

A service task can define an arbitrary number of `taskHeaders`. They are static metadata that are handed to workers along with the job. The headers can be used as configuration parameters for the worker.

## Variable mappings

By default, all job variables are merged into the process instance. This behavior can be customized by defining an output mapping at the service task.

Input mappings can be used to transform the variables into a format that is accepted by the job worker.

## Additional resources

### XML Representation
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

### References

- [Job handling](/components/concepts/job-workers.md)
- [Expressions](/components/concepts/expressions.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
- [Incidents](/components/concepts/incidents.md)
