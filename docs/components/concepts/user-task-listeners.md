---
id: user-task-listeners
title: "User task listeners"
description: "User task listeners allow users to react to specific user task lifecycle events by executing custom logic."
---

A user task listener (UTL) allows users to react to specific user task lifecycle events by executing custom logic.

## About user task listeners

User task listeners enable flexibility and control over user task behavior by allowing external logic to react to lifecycle events. This is useful for implementing custom business logic, assigning tasks, or triggering external systems without cluttering the BPMN model. Additionally, user task data can be dynamically altered during execution using the corrections feature, enabling adjustments to key attributes such as assignee, due date, priority and so on, before task state transitions are finalized.

### Use cases

User task listeners are useful in the following scenarios:

- Implementing complex user task assignment or reassignment logic
- Validating user task assignments
- Notifying users of new task assignments with contextual information
- Reacting to task completions with custom logic

### Blocking behavior

User task listeners operate in a blocking manner, meaning the user task lifecycle transition is paused until the task listener completes. This ensures that any corrections or validations defined by the task listener are fully applied before the task transition continues.

## Define a user task listener

You can configure user task listeners per BPMN user task element.

### Supported operations

Currently, user task listeners support the following operations:

- **Assigning**: Triggered when a task is assigned to a user.
- **Completing**: Triggered when a task is completed.

### User task listener properties

Each user task listener has the following properties:

| Property    | Description                                                                                                       |
| :---------- | :---------------------------------------------------------------------------------------------------------------- |
| `eventType` | Specifies the user task operation that triggers the listener. Supported values are `assigning` and `completing` . |
| `type`      | The name of the job type.                                                                                         |
| `retries`   | The number of retries for the user task listener job.                                                             |

:::note
If multiple user task listeners of the same `eventType` (such as multiple `assigning` listeners) are defined on the same user task, they are executed sequentially, one after the other, in the order they are defined in the BPMN model.
:::

## Implement a user task listener

User task listeners are implemented using job workers, similar to execution listeners and service task jobs. The job worker processes the task listener job, applies corrections, and may optionally deny the operation.

### Accessing user task data

User task-specific data, such as `assignee` and `priority`, is accessible through the job headers.

### Correcting user task data

User task listeners can correct user task data before the lifecycle transition completes. Corrections are applied when all user task listeners for the operation have completed. The corrected data will be accessible to the subsequent listeners within the same operation.

### Denying the operation

User task listeners can deny a user task operation. Denying an operation rolls back the lifecycle transition and discards any corrections made by preceding listeners.

## Expression evaluation and incident behavior

### Expression evaluation

User task listener properties, such as job `type` or `retries`, are evaluated right before the job creation for the listener. If an expression evaluation fails, the operation is paused, and an incident is raised.

### Incident recovery

If a user task listener job fails or its expression evaluation raises an incident, the operation is paused until the incident is resolved.

There are two types of incidents for task listeners:

- **Expression evaluation failure**: Raised when a property expression (e.g., `type`) fails to evaluate.
- **Job failure**: Raised when a user task listener job exhausts all retries.

## Limitations

User task listeners have the following limitations:

- **Limited operations support**: Currently, only assign and complete operations are supported.
- **No variable handling**: User task listener jobs cannot be completed if variables are provided.
- **No BPMN error throwing**: Throwing BPMN errors from user task listener jobs is not supported.

## Related resources

- [Job workers (basics)](/components/concepts/job-workers.md)
- [Job workers (Java client)](/apis-tools/java-client/job-worker.md)
- [Incidents](/components/concepts/incidents.md)
- [Expressions](/components/concepts/expressions.md)
- [Execution listeners](/components/concepts/execution-listeners.md)
