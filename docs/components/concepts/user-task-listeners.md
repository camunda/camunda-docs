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

User task listeners are implemented using [job workers](/components/concepts/job-workers.md), similar to execution listeners and service task jobs. The job worker processes the task listener job, applies corrections, and may optionally deny the operation.

See [open a job worker](/apis-tools/java-client-examples/job-worker-open.md) for an example of how to create a job worker and handler that can also process user task listener jobs.

### Accessing user task data

User task-specific data, such as `assignee` and `priority`, is accessible through the job headers of the user task listener job. The following properties can be retrieved using predefined header names from the `Protocol` class:

| Property          | Header name                                       |
| ----------------- | ------------------------------------------------- |
| `action`          | `Protocol.USER_TASK_ACTION_HEADER_NAME`           |
| `assignee`        | `Protocol.USER_TASK_ASSIGNEE_HEADER_NAME`         |
| `candidateGroups` | `Protocol.USER_TASK_CANDIDATE_GROUPS_HEADER_NAME` |
| `candidateUsers`  | `Protocol.USER_TASK_CANDIDATE_USERS_HEADER_NAME`  |
| `dueDate`         | `Protocol.USER_TASK_DUE_DATE_HEADER_NAME`         |
| `followUpDate`    | `Protocol.USER_TASK_FOLLOW_UP_DATE_HEADER_NAME`   |
| `formKey`         | `Protocol.USER_TASK_FORM_KEY_HEADER_NAME`         |
| `userTaskKey`     | `Protocol.USER_TASK_KEY_HEADER_NAME`              |
| `priority`        | `Protocol.USER_TASK_PRIORITY_HEADER_NAME`         |

Below is an example of accessing the `assignee` value from the headers:

```java
import io.camunda.zeebe.protocol.Protocol;

final JobHandler userTaskListenerHandler =
    (jobClient, job) -> {
        // Access the 'assignee' from the job headers
        // highlight-start
        final String assignee = job.getCustomHeaders()
            .get(Protocol.USER_TASK_ASSIGNEE_HEADER_NAME);
        // highlight-end

        System.out.println("The assignee for this user task is: " + assignee);

        // remaining job handler logic
    };
```

Each header provides user task metadata that can be leveraged to customize the behavior of the user task listener job. Use these headers to retrieve necessary information about the user task in your job handler implementation.

### Correcting user task data

User task listeners can correct user task data before the lifecycle transition is finalized. Corrections allow user task listeners to update specific attributes of the user task, such as the assignee, due date, follow-up date, candidate users, candidate groups, and priority. These corrections are applied after all task listeners for the current operation have successfully completed.

If an operation is denied by a listener, no corrections are applied to the user task.

Below is an example of how to correct the user task data form a job worker while completing the user task listener job:

```java
final JobHandler completeTaskListenerJobWithCorrectionsHandler =
    (jobClient, job) ->
        jobClient
            .newCompleteCommand(job)
            // highlight-start
            .withResult(
                new CompleteJobResult()
                    .correctAssignee("john_doe") // assigns the user task to 'john_doe'
                    .correctDueDate(null) // preserves the current 'dueDate' of the user task
                    .correctFollowUpDate("") // clears the 'followUpDate'
                    .correctCandidateUsers(List.of("alice", "bob")) // sets candidate users
                    .correctCandidateGroups(List.of()) // clears the candidate groups
                    .correctPriority(80)) // sets the priority to 80
            // highlight-end
            .send();

client.newWorker()
    .jobType("user-task-listener-completion") // type of the user task listener job
    .handler(completeTaskListenerJobWithCorrectionsHandler)
    .open();
```

### Denying the operation

User task listeners can deny a user task operation, such as assignment or completion, effectively preventing the lifecycle transition from completing.

When an operation is denied:

- **Corrections discarded**: Any corrections made by preceding listeners within the same operation are discarded.
- **Task state preserved**: The user task retains its state and data as if the operation was never attempted.

This capability is particularly useful for implementing validation logic or enforcing business rules before allowing a user task operation to proceed.

Below is an example of how to deny a user task operation from a job worker while completing the user task listener job:

```java
final JobHandler denyUserTaskOperationHandler =
    (jobClient, job) ->
        jobClient
            .newCompleteCommand(job)
            // highlight-start
            .withResult()
            .deny(true)
            // highlight-end
            .send();
```

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
