---
id: user-task-lifecycle
title: "User task lifecycle"
description: "Understand and decide on the lifecycle of user tasks in your application."
---

The user task lifecycle in Camunda defines how users interact with tasks and perform work. Define it before implementing your application logic and user interface.

## Define your task lifecycle

Define your task lifecycle based on your use case, the users interacting with the task, and the data you want to track.

Use the following task lifecycle as a starting point.

## Task lifecycle example

[Tasklist](/components/tasklist/introduction-to-tasklist.md) implements a lifecycle optimized for tracking work on individual tasks using [forms](../03-forms/01-introduction-to-forms.md). It separates assignment from task state to support collaborative processes.

In a typical flow, users can:

- `start` a task to indicate that they are working on it.
- `complete` the task when the work is done.
- When they cannot continue work, they can `pause` it and `resume` it later.
- While a task is paused, the data entered up to this point is preserved. If users are unable to continue, they can `return` a task to the queue for someone else to pick up, which resets the task data.

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

The engine derives the task state using a CQRS pattern. [Zeebe](/components/zeebe/zeebe-overview.md), Camunda's process execution engine, manages a stream of events. There is no single status attribute on tasks. Instead, the task status is derived from these events.

User task listeners run in a blocking manner. The lifecycle transition pauses until all listeners complete.

Listeners can also deny certain transitions. During `completing`, a listener can reject the transition and return the task to its previous state.

:::tip
To use Optimize task performance reports, include at least `start` and `complete` actions in your lifecycle. Optionally include `pause`, `resume`, and `return`.
:::

### Task assignment

Assignment runs independently of the work state, so tasks can be reassigned while work is in progress. A task may be assigned but remain open for some time, indicating that the assigned user is not available to work on it immediately. The assignee can also change while work is in progress.

In the Tasklist user interface, a task can be claimed by the logged-in user, which assigns the task to that user. Managers can assign unassigned tasks to team members and reassign them as needed.

```mermaid
flowchart
    subgraph Assignment
        Unassigned(Unassigned) -->|assign/claim| Assigned(fa:fa-user Assigned)
        Assigned -->|return| Unassigned
        Assigned -->|reassign| Assigned
    end
```

The execution engine does not validate user authorization. Your application must enforce access control.

Tasklist allows only the assigned user, an admin, or a manager to update and complete a task. You can implement different rules in your application, such as allowing a user to complete a task on behalf of another user.

The following best practices are implemented in Tasklist:

- `update` and `complete` operations can only be performed by the assigned user or an admin or manager.
- Users can only see tasks assigned to them and tasks assigned to their candidate groups.
- When a task is returned to the queue (i.e. the assignee is cleared), its data and status are reset to `open`.
- Only admins or managers can reassign tasks.
- Users can return tasks, but they must provide a comment explaining why.
- Users can mark tasks with a follow-up date. These then disappear from their individual task list until the follow-up date is reached. The `open` status is preserved, or the task is moved to the `paused` status if it has already been processed. The task remains assigned to the user.

Define validation logic that matches your use case.

## Lifecycle events

Camunda emits lifecycle events that can be triggered by REST API operations. User task listeners react to them to execute custom logic. For details, see [user task listeners](/components/concepts/user-task-listeners.md).

Supported events:

- `creating`
- `assigning`
- `updating`
- `completing`
- `canceling`

Lifecycle events represent engine-level transitions. Actions such as `start`, `pause`, and `resume` are application-level operations that typically trigger the `updating` event.

### `creating`

The `creating` event is emitted when a task instance is created. If the `creating` event already contains an assignee, no additional `assigning` event is fired.

### `assigning`

The engine emits the `assigning` event when a task assignment changes. This includes actions such as `claim`, `assign`, `return`, or `unassign`.

### `updating`

The engine emits the `updating` event when task data changes (except assignment), including:

- candidate users or groups
- due date or follow-up date

It also emits this event for application-level actions such as `start`, `pause`, or `resume`.

### `completing`

The engine emits the `completing` event when a task is being completed. It can contain a custom action to indicate the outcome, such as `approved` or `rejected`.

### `canceling`

The engine emits the `canceling` event when a user task is terminated by the process. This happens when the process instance is canceled or an interrupting catch event ends the user task.

## Implement the lifecycle

Use the Orchestration Cluster REST API to implement task lifecycle operations in your application.  
See the [full API reference](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

### Perform lifecycle operations

You interact with user tasks through the following endpoints:

- Assign or unassign a task:
  - [`POST /user-tasks/:userTaskKey/assignment`](/apis-tools/orchestration-cluster-api-rest/specifications/assign-user-task.api.mdx)
  - [`DELETE /user-tasks/:userTaskKey/assignee`](/apis-tools/orchestration-cluster-api-rest/specifications/unassign-user-task.api.mdx)

- Update a task:
  - [`PATCH /user-tasks/:userTaskKey`](/apis-tools/orchestration-cluster-api-rest/specifications/update-user-task.api.mdx)

- Complete a task:
  - [`POST /user-tasks/:userTaskKey/completion`](/apis-tools/orchestration-cluster-api-rest/specifications/complete-user-task.api.mdx)

These operations trigger lifecycle events such as `assigning`, `updating`, and `completing`.

### Assign a task

Use the assignment endpoint to assign, reassign, or unassign a task.

- `POST /user-tasks/:userTaskKey/assignment` assigns or reassigns a task.
- `DELETE /user-tasks/:userTaskKey/assignee` removes the current assignee.

Use the `action` attribute to describe the reason for the change, such as `claim`, `assign`, or `reassign`.

### Update a task

Use the update endpoint to modify task data or perform lifecycle actions.

You can:

- Update fields such as candidate users, candidate groups, due date, or follow-up date using a `changeset`.
- Trigger application-level actions such as `start`, `pause`, or `resume` by providing an `action`.

You can also send custom actions for audit or business logic purposes, such as `escalate`, `requestFurtherInformation`, `uploadDocument`, or `openExternalApp`.

Example request:

```json
{
  "changeset": {
    "dueDate": "2024-03-18T20:47:20.340Z"
  },
  "action": "escalate"
}
```

### Complete a task

Use `POST /user-tasks/:userTaskKey/completion` to complete a task. You can include an `action` to indicate the outcome, such as `approve` or `reject`.

## Reporting

Use lifecycle events to build audit logs or productivity reports.

### Task lifecycle reporting in Optimize

Optimize supports task productivity reports but currently measures only assigned vs. unassigned time.

It does not calculate:

- **Idle time:** Time a task was open (time to `start`).
- **Net working time:** Time during which a task was processed from `start` to `complete`, excluding time spent in `pause` until `resume`.

### Export task lifecycle information

Use user task listeners and job workers to send lifecycle event data to external systems such as analytics or monitoring tools.
