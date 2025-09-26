---
id: user-task-listeners
title: "User task listeners"
sidebar_label: "Overview"
description: "User task listeners allow users to react to specific user task lifecycle events."
---

A user task listener allows users to react to specific user task lifecycle events.

:::tip
Try out our [getting started with user task listeners guide](/components/concepts/user-task-listeners-guide.md).
:::

## About user task listeners

User task listeners provide flexibility and control over [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) behavior:

- They can react to user task lifecycle events, such as assigning and completing.
- They can access user task data, such as the assignee, to execute task-specific business logic.
- They can dynamically correct user task data during execution, allowing adjustments to key attributes such as the assignee, due date, and priority.
- They can deny state transitions, rolling back the task to its previous state, which enables validation of task lifecycle changes.

### Use cases

User task listeners are useful in the following scenarios:

- Implementing complex user task assignment or reassignment logic.
- Validating user task lifecycle changes, e.g. completing with valid variables.
- Notifying users of new task assignments with contextual information.
- Reacting to task completions with custom logic.

### User task lifecycle

A user task has the following lifecycle.
A user task listener can react to the events highlighted in orange.

```mermaid
stateDiagram-v2
    direction LR
    [*] --> creating
    creating --> created

    created --> assigning
    assigning --> created

    created --> updating
    updating --> created

    created --> completing
    completing --> created
    completing --> completed

    creating --> canceling
    created --> canceling
    assigning --> canceling
    updating --> canceling
    completing --> canceling
    canceling --> canceled

    classDef listenerEvent fill:#fc5d0d,color:white,font-weight:bold
    class creating listenerEvent
    class assigning listenerEvent
    class updating listenerEvent
    class completing listenerEvent
    class canceling listenerEvent
```

### Blocking behavior

User task listeners operate in a blocking manner, meaning the user task lifecycle transition is paused until the task listener completes. This ensures that any corrections or validations defined by the task listener are fully applied before the task transition continues.

## Trigger a user task listener

The supported user task listener events can be triggered in the following ways.

| Event        | Triggered                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creating`   | <ul><li>When a process instance reaches a user task.</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `assigning`  | <ul><li>When the [assign user task API](/apis-tools/orchestration-cluster-api-rest/specifications/assign-user-task.api.mdx) is called.</li><li>When activating a user task that [specifies an `assignee`](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments) in the process.</li><li>When a user task is assigned using the [Tasklist interface](/components/tasklist/userguide/managing-tasks.md#assign-tasks).</li></ul>                                                                                                                                                                                                        |
| `updating`   | <ul><li>When the [update user task API](/apis-tools/orchestration-cluster-api-rest/specifications/update-user-task.api.mdx) is called. </li><li>When the [update element instance variables API](/apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx) is called on a user task instance.</li><li>When the [set variables RPC](/apis-tools/zeebe-api/gateway-service.md#setvariables-rpc) is called on a user task instance.</li><li>When variables are set at a user task scope using the [Operate interface](/components/operate/userguide/resolve-incidents-update-variables.md).</li></ul> |
| `completing` | <ul><li>When a user task is completed using the [Tasklist interface](/components/tasklist/userguide/managing-tasks.md#complete-a-task).</li><li>When the [complete user task API](/apis-tools/orchestration-cluster-api-rest/specifications/complete-user-task.api.mdx) is called.</li></ul>                                                                                                                                                                                                                                                                                                                                                  |
| `canceling`  | <ul><li>When a canceling process instance terminates a user task.</li><li>When a [catch event](/components/modeler/bpmn/events.md) interrupts a user task.</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

Once triggered, the workflow engine creates a job that you can process using a job worker.

## Define a user task listener

You can configure user task listeners per BPMN user task element.

### User task listener properties

Each user task listener has the following properties:

| Property    | Description                                                                                                                                                                                                                                                                                                                              |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventType` | (Required) Specifies the user task event type that triggers the listener. Supported values are `creating`, `assigning`, `updating`, `completing`, and `canceling`.                                                                                                                                                                       |
| `type`      | (Required) The name of the job type. Used as a reference to specify which job workers request the respective task listener job. For example, `order-items`. `type` can be specified as any static value (`myType`) or as a FEEL expression prefixed by `=` that evaluates to any FEEL string; for example, `= "order-" + priorityGroup`. |
| `retries`   | (Optional) The number of retries for the user task listener job (defaults to 3 if omitted).                                                                                                                                                                                                                                              |

:::note
If multiple user task listeners of the same `eventType` (such as multiple `assigning` listeners) are defined on the same user task, they are executed sequentially, one after the other, in the order they are defined in the BPMN model.
:::

## Implement a user task listener

User task listeners are implemented using [job workers](/components/concepts/job-workers.md), similar to execution listeners and service task jobs. The job worker processes the task listener job, can apply corrections, and may optionally deny the lifecycle transition.

See the [job worker documentation](/apis-tools/java-client/job-worker.md) for examples of how to create a job worker and handler that can also process user task listener jobs.

### Accessing user task data

User task-specific data, such as `assignee` and `priority`, are accessible through the `userTask` property of the user task listener job.  
The following user task attributes can be accessed from the activated job's `userTask` property:

| Attribute           | Description                                                                                                                                                                                   |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`            | A custom action value provided along with the request that triggered this event. If none was provided, it defaults to one of `assign`, `claim`, `update`, or `complete`.                      |
| `assignee`          | The user assigned to the task. If not specified, the task is unassigned. Refer to [assignments](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments) for more details.              |
| `candidateGroups`   | Specifies the groups of users that the task can be assigned to. Refer to [assignments](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments) for more details.                       |
| `candidateUsers`    | Specifies the users that the task can be assigned to. Refer to [assignments](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments) for more details.                                 |
| `changedAttributes` | Lists the user task attributes that have changed with the event. Refer to the [changed attributes](#changed-attributes) section below for more details.                                       |
| `dueDate`           | Specifies the due date of the task. Refer to [scheduling](/components/modeler/bpmn/user-tasks/user-tasks.md#scheduling) for more details.                                                     |
| `followUpDate`      | Specifies the follow-up date of the task. Refer to [scheduling](/components/modeler/bpmn/user-tasks/user-tasks.md#scheduling) for more details.                                               |
| `formKey`           | The form linked to the user task, referenced by its uniquely identifying key. Refer to [user task forms](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms) for more details. |
| `priority`          | The task’s priority level. Refer to [priority](/components/modeler/bpmn/user-tasks/user-tasks.md#define-user-task-priority) for more details.                                                 |
| `userTaskKey`       | The unique key identifying the user task.                                                                                                                                                     |

Below is an example of accessing the `assignee` value from the activated job in Java:

```java
final JobHandler userTaskListenerHandler =
    (jobClient, job) -> {
        // Access the 'assignee' from the job's user task property
        // highlight-start
        final String assignee = job.getUserTask().getAssignee();
        // highlight-end

        System.out.println("The assignee for this user task is: " + assignee);

        // remaining job handler logic
    };
```

This user task data can be leveraged to customize the behavior of the user task listener job worker.

#### Changed attributes

The `changedAttributes` attribute lists which user task attributes have changed with the event.

:::note
User task data corrections are taken into account.
For example, consider a user task with three `assigning` listeners defined.
When assigning the user task, the first listener sees the `assignee` attribute in the `changedAttributes`.
If it corrects the priority, a subsequent assigning listener sees both the `assignee` and the `priority` attributes as changed attributes.
Now, this second listener corrects the priority back to the value it had before assigning.
The third listener sees only the `assignee` attribute as changed attribute, because the priority is no longer changed with the event.
:::

#### Task headers

Configured [task headers](/components/modeler/bpmn/user-tasks/user-tasks.md#task-headers) on the user task are available in the job's custom headers.

### Correcting user task data

User task listeners can correct user task data before the lifecycle transition is finalized. Corrections allow user task listeners to update specific attributes of the user task, such as the assignee, due date, follow-up date, candidate users, candidate groups, and priority. These corrections are immediately available to any subsequent task listeners and are applied to the user task when the lifecycle transition is finalized, without triggering the `UPDATING` lifecycle event.

If a lifecycle transition is denied by a listener, no corrections are applied to the user task.

Below is an example of how to correct the user task data from a job worker while completing the user task listener job in Java:

```java
final JobHandler completeTaskListenerJobWithCorrectionsHandler =
    (jobClient, job) ->
        jobClient
            .newCompleteCommand(job)
            // highlight-start
            .withResult(
                r -> r.forUserTask()
                    .correctAssignee("john_doe")                    // assigns the user task to 'john_doe'
                    .correctDueDate(null)                           // preserves the current 'dueDate'
                    .correctFollowUpDate("")                        // clears the 'followUpDate'
                    .correctCandidateUsers(List.of("alice", "bob")) // sets candidate users
                    .correctCandidateGroups(List.of())              // clears the candidate groups
                    .correctPriority(80))                           // sets the priority to 80
            // highlight-end
            .send();

client.newWorker()
    .jobType("user-task-listener-completion") // type of the user task listener job
    .handler(completeTaskListenerJobWithCorrectionsHandler)
    .open();
```

#### On correcting the assignee

The assignee can be corrected in the `creating` listener only if the process hasn't specified an assignee for this user task already. For example, if the user task's `assignee` expression evaluates to `null`.

:::tip
To set an assignee when creating the user task, review [specifying the assignee in the process](components/modeler/bpmn/user-tasks/user-tasks.md#assignments), or verify the assignee is not yet defined by the process by [accessing the `assignee` attribute in the job headers](#accessing-user-task-data).

To change the assignee specified by the process, correct it with the `assigning` event.
:::

### Denying the lifecycle transition

User task listeners can deny the user task lifecycle transition belonging to the lifecycle event. For example, it can deny the completion of a task in reaction to the completing event, effectively preventing a user request to complete the task.

When a lifecycle transition is denied:

- **Corrections discarded**: Any corrections made by preceding listeners within the same lifecycle transition are discarded.
- **Task state preserved**: The user task retains its state and data as if the lifecycle event never occurred.

This capability is particularly useful for implementing validation logic or enforcing business rules before allowing a user task lifecycle transition to proceed.

Below is an example of how to deny a user task lifecycle transition from a job worker while completing the user task listener job in Java:

```java
final JobHandler denyUserTaskLifecycleTransitionHandler =
    (jobClient, job) ->
        jobClient
            .newCompleteCommand(job)
            // highlight-start
            .withResult(r -> r.forUserTask().deny(true))
            // highlight-end
            .send();
```

Not all events can be denied. For example, it's not possible to deny the creation or cancelation of a user task.
Currently, user task listeners can deny the lifecycle transition for the following events:

- `assigning`
- `updating`
- `completing`

## Expression evaluation and incident behavior

### Expression evaluation

User task listener properties, such as job `type` or `retries`, are evaluated right before the job creation for the listener.

### Incident recovery

If a user task listener job fails or its expression evaluation raises an [incident](/components/concepts/incidents.md), the lifecycle transition is paused until the incident is resolved.

There are two types of incidents for task listeners:

- **Expression evaluation failure**: Raised when a listener property expression fails to evaluate. After the incident is resolved, the entire lifecycle transition is retried, re-executing all listeners configured for the transition, including those that previously completed successfully.
- **Job failure**: If a listener job fails, it is retried according to the `retries` property. If all retries are exhausted and the job still fails, an incident is raised. Once resolved, only the failed listener job is retried, allowing the lifecycle transition to resume without re-executing successfully completed listeners.

## Limitations

User task listeners have the following limitations:

- **No variable handling**: User task listener jobs cannot be completed if variables are provided.
- **No BPMN error throwing**: Throwing BPMN errors from user task listener jobs is not supported.

### Limitations for Tasklist v1

User task listeners are designed for use with [Tasklist v2](components/tasklist/api-versions.md) and the [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

While you can use [Tasklist v1](components/tasklist/api-versions.md) or the deprecated [Tasklist API](../../apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) in combination with user task listeners, there are some limitations. For the best experience, use Tasklist v2 and the Orchestration Cluster API.

- **Tasklist v1 does not list tasks with pending task listeners**: If a task's lifecycle transition is blocked by a pending task listener, Tasklist v1 does not display the task in the task queue. However, Tasklist v1 can still show the details of such a task.
- **Tasklist v1 incorrectly lists creating tasks when filtering for the "all" status (open and completed)**: If a task's creation is blocked by a pending task listener, Tasklist v1 includes it in the task queue when filtering for the "all" status, even though the task has not yet been created.
- **Tasklist v1 API cannot filter for tasks with pending task listeners**: The deprecated Tasklist API cannot filter for the following task states when searching tasks: `CREATING`, `ASSIGNING`, `UPDATING`, `COMPLETING`, `CANCELING`. Tasks in these states are included in responses when not filtering by state.
- **Tasklist v1 API responses may not reflect corrections applied by task listeners**: Requests made to the deprecated Tasklist API can trigger a listener. Responses to such requests will appear as if the listener did not make any [corrections](#correcting-user-task-data) to the user task data, even when the listener did make corrections.

## Related resources

- [Job workers (basics)](/components/concepts/job-workers.md)
- [Job workers (Java client)](/apis-tools/java-client/job-worker.md)
- [Incidents](/components/concepts/incidents.md)
- [Expressions](/components/concepts/expressions.md)
- [Execution listeners](/components/concepts/execution-listeners.md)
- [User tasks](/components/modeler/bpmn/user-tasks/user-tasks.md)
