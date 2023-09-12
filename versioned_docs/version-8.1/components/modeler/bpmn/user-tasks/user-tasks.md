---
id: user-tasks
title: "User tasks"
description: "A user task is used to model work that needs to be done by a human actor."
---

A user task is used to model work that needs to be done by a human actor. When
the process instance arrives at such a user task, a new job similar to a
[service task](/components/modeler/bpmn/service-tasks/service-tasks.md) is created. The process instance
stops at this point and waits until the job is completed.

![user-task](assets/user-task.png)

Applications like [Tasklist](/components/tasklist/introduction-to-tasklist.md) can be used by humans to complete these tasks.

Alternatively, a job worker can subscribe to the job type
`io.camunda.zeebe:userTask` to complete the job manually.

When the job is completed, the user task is completed and the process
instance continues.

## User task forms

User tasks support specifying a `formKey` attribute, using the
`zeebe:formDefinition` extension element. The form key can be used to specify
an identifier to associate a form to the user task. [Tasklist](/components/tasklist/introduction-to-tasklist.md) supports
embedded [Camunda Forms](/guides/utilizing-forms.md),
these can be embedded into the BPMN process XML as a `zeebe:UserTaskForm`
extension element of the process element.

## Assignments

User tasks support specifying assignments, using the `zeebe:AssignmentDefinition` extension element.
This can be used to define which user the task can be assigned to. One or both of the following
attributes can be specified simultaneously:

- `assignee`: Specifies the user assigned to the task. [Tasklist](/components/tasklist/introduction-to-tasklist.md) will claim the task for this user.
- `candidateGroups`: Specifies the groups of users that the task can be assigned to.

Typically, the assignee and candidate groups are defined as static values (e.g. `some_username` and
`sales, operations`), but they can also be defined as
[expressions](/components/concepts/expressions.md) (e.g. `= book.author` and `= remove(reviewers, book.author)`). The expressions are evaluated on activating the user task and must result in a
`string` for the assignee and a `list of strings` for the candidate groups.

For [Tasklist](/components/tasklist/introduction-to-tasklist.md) to claim the task for a known Tasklist user,
the value of the `assignee` must be the user's **unique identifier**.
The unique identifier depends on the authentication method used to login to Tasklist:

- Camunda 8 (login with email, Google, GitHub): `email`
- Default Basic Auth (elasticsearch): `username`
- IAM: `username`

:::note
For example, say you log into Tasklist using Camunda 8 login with email using your email address `foo@bar.com`. Every time a user task activates with `assignee` set to value `foo@bar.com`, Tasklist automatically assigns it to you. You'll be able to find your new task under the task dropdown option `Claimed by me`.
:::

## Variable mappings

By default, all job variables are merged into the process instance. This
behavior can be customized by defining an output mapping at the user task.

Input mappings can be used to transform the variables into a format accepted by the job worker.

## Task headers

A user task can define an arbitrary number of `taskHeaders`; they are static
metadata handed to workers along with the job. The headers can be used
as configuration parameters for the worker.

## Additional resources

### XML representation

A user task with a user task form and an assignment definition:

```xml
<bpmn:process id="controlProcess" name="Control Process" isExecutable="true">
  <bpmn:extensionElements>
    <zeebe:userTaskForm id="userTaskForm_2g7iho6">
      <!-- Task Form Content -->
    </zeebe:userTaskForm>
  </bpmn:extensionElements>
  <bpmn:userTask id="Activity_025dulo" name="Configure">
    <bpmn:extensionElements>
      <zeebe:assignmentDefinition assignee="= default_controller" candidateGroups="controllers, auditors" />
      <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_2g7iho6" />
    </bpmn:extensionElements>
  </bpmn:userTask>
</bpmn:process>
```

### References

- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
