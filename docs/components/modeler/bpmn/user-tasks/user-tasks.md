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

Forms can either be embedded in [Tasklist](/components/tasklist/introduction-to-tasklist.md) via [Camunda Forms](/guides/utilizing-forms.md) that offer visual editing of forms in the Camunda Modeler or handled by a custom application.
Depending on your use-case, three different types of form references can be used:

1. **Camunda forms (linked)** provide a flexible way of linking a user task to a form and can be deployed together with the referencing process models.
   To link a user task to a Camunda Form, you have to specify the ID of the Camunda Form as the `formId` attribute of the task's `zeebe:formDefinition` extension element (see the [XML representation](#camunda-form-linked)).
   Form ID references always refer to the latest deployed version of the Camunda Form.

   You can read more about Camunda Forms in the [Camunda Forms guide](/guides/utilizing-forms.md) or the [Camunda Forms reference](/docs/components/modeler/forms/camunda-forms-reference.md) to explore all configuration options for form elements.

2. **Camunda forms (embedded)** can be used to embed a form's JSON configuration directly into the BPMN process XML as a `zeebe:UserTaskForm` extension element of the process element.
   The embedded form can be referenced via the `formKey` attribute (see [XML representation](#camunda-form-embedded)).

3. A **custom form key** can be used to specify an identifier to associate a form to the user task.
   The form key can for example be picked up by a custom application.
   A form referenced by a custom form key will not be embedded in Tasklist.

## Assignments

User tasks support specifying assignments, using the `zeebe:AssignmentDefinition` extension element.
This can be used to define which user the task can be assigned to. One or all of the following
attributes can be specified simultaneously:

- `assignee`: Specifies the user assigned to the task. [Tasklist](/components/tasklist/introduction-to-tasklist.md) will claim the task for this user.
- `candidateUsers`: Specifies the users that the task can be assigned to.
- `candidateGroups`: Specifies the groups of users that the task can be assigned to.

Typically, the assignee, candidate users, and candidate groups are defined as [static values](/docs/components/concepts/expressions.md#expressions-vs-static-values) (e.g. `some_username`, `some_username, another_username` and
`sales, operations`), but they can also be defined as
[expressions](/components/concepts/expressions.md) (e.g. `= book.author` and `= remove(reviewers, book.author)` and `= reviewer_roles`). The expressions are evaluated on activating the user task and must result in a
`string` for the assignee and a `list of strings` for the candidate users and a `list of strings` for the candidate groups.

For [Tasklist](/components/tasklist/introduction-to-tasklist.md) to claim the task for a known Tasklist user,
the value of the `assignee` must be the user's **unique identifier**.
The unique identifier depends on the authentication method used to login to Tasklist:

- Camunda 8 (login with email, Google, GitHub): `email`
- Default Basic Auth (elasticsearch): `username`
- IAM: `username`

:::note
For example, say you log into Tasklist using Camunda 8 login with email using your email address `foo@bar.com`. Every time a user task activates with `assignee` set to value `foo@bar.com`, Tasklist automatically assigns it to you. You'll be able to find your new task under the task dropdown option `Claimed by me`.
:::

## Scheduling

User tasks support specifying a task schedule using the `zeebe:taskSchedule` extension element.
This can be used to define **when** users interact with a given task. One or both of the following
attributes can be specified simultaneously:

- `dueDate`: Specifies the due date of the user task.
- `followUpDate`: Specifies the follow-up date of the user task.

:::note
For example, you can use the `followUpDate` to define the latest time a user should start working on a task, and then
use the `dueDate` to provide a deadline when the user task should be finished.
:::

You can define the due date and follow-up date as static values (e.g. `2023-02-28T13:13:10+02:00`), but you can also use
[expressions](/components/concepts/expressions.md) (e.g. `= schedule.dueDate` and `= now() + duration("PT15S")`). The
expressions are evaluated on activating the user task and must result in a `string` conforming to an ISO 8601 combined
date and time representation.

import ISO8601DateTime from '../assets/react-components/iso-8601-date-time.md'

:::info
<ISO8601DateTime/>
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

### XML representations

#### Camunda Form (linked)

A user task with a Camunda Form linked to a user task, an assignment definition, and a task schedule:

```xml
<bpmn:userTask id="configure" name="Configure">
  <bpmn:extensionElements>
    <zeebe:formDefinition formId="configure-control-process" />
    <zeebe:assignmentDefinition assignee="= default_controller" candidateGroups="controllers, auditors" />
    <zeebe:taskSchedule dueDate="= task_finished_deadline" followUpDate="= now() + duration(&#34;P12D&#34;)" />
  </bpmn:extensionElements>
</bpmn:userTask>
```

#### Camunda Form (embedded)

A user task with a Camunda Form embedded into user task:

```xml
<bpmn:process id="controlProcess" name="Control Process" isExecutable="true">
  <bpmn:extensionElements>
    <zeebe:userTaskForm id="userTaskForm_configure-control-process">
      <!-- Task Form Content -->
    </zeebe:userTaskForm>
  </bpmn:extensionElements>
  <bpmn:userTask id="configure" name="Configure">
    <bpmn:extensionElements>
      <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_configure-control-process" />
    </bpmn:extensionElements>
  </bpmn:userTask>
</bpmn:process>
```

#### Custom form key

A user task with an external task form referenced by a custom form key:

```xml
<bpmn:userTask id="configure" name="Configure">
   <bpmn:extensionElements>
      <zeebe:formDefinition formKey="custom-key" />
   </bpmn:extensionElements>
</bpmn:userTask>
```

### References

- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [User task linking in Modeler](/components/modeler/web-modeler/advanced-modeling/user-task-linking.md)
- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
