---
id: user-tasks
title: "User tasks"
description: "A user task is used to model work that needs to be done by a human actor."
---

A user task is used to model work that needs to be done by a human actor. When
the process instance arrives at such a user task, a new user task instance is created at Zeebe.
The process instance stops at this point and waits until the user task instance is completed.
When the user task instance is completed, the process instance continues.

![user-task](assets/user-task.png)

:::info
Camunda 8 also supports the implementation of user tasks with a [service task](/components/modeler/bpmn/service-tasks/service-tasks.md)-like behavior.
Refer to the [job worker implementation](#job-worker-implementation) section below.
Version 8.4 and below are limited to the job worker implementation.
:::

## Define a user task

A user task is marked as a **Zeebe user task** by the `zeebe:userTask` extension element. Without the `zeebe:userTask` extension element, the user task behaves like a [service task](#job-worker-implementation).

You can define assignments, scheduling, variable mappings, and a form for the user task as detailed in the following sections.

The [job worker implementation](#job-worker-implementation) section details the differences and limitations of job worker-based user tasks.

### Assignments

User tasks support specifying assignments, using the `zeebe:AssignmentDefinition` extension element.
This can be used to define which user the task can be assigned to. One or all of the following
attributes can be specified simultaneously:

- `assignee`: Specifies the user assigned to the task. [Tasklist](/components/tasklist/introduction-to-tasklist.md) will claim the task for this user.
- `candidateUsers`: Specifies the users that the task can be assigned to.
- `candidateGroups`: Specifies the groups of users that the task can be assigned to.

:::info
The assignee attribute must adhere to the userId field’s case-sensitivity requirements.
Note that in SaaS, all user IDs are converted to lowercase by default, as they are based on email addresses.
:::

:::info
Assignment resources can also be used for set user task restrictions ([SaaS](/components/concepts/access-control/user-task-access-restrictions.md)/[Self-Managed](docs/self-managed/concepts/access-control/user-task-access-restrictions.md)), where users will see only the tasks they have authorization to work on.
:::

Typically, the assignee, candidate users, and candidate groups are defined as [static values](/components/concepts/expressions.md#expressions-vs-static-values) (e.g. `some_username`, `some_username, another_username` and
`sales, operations`), but they can also be defined as
[expressions](/components/concepts/expressions.md) (e.g. `= book.author` and `= remove(reviewers, book.author)` and `= reviewer_roles`). The expressions are evaluated on activating the user task and must result in a
`string` for the assignee and a `list of strings` for the candidate users and a `list of strings` for the candidate groups.

For [Tasklist](/components/tasklist/introduction-to-tasklist.md) to claim the task for a known Tasklist user,
the value of the `assignee` must be the user's **unique identifier**.
The unique identifier depends on the authentication method used to login to Tasklist:

- Camunda 8 (login with email, Google, GitHub): `email`
- Default Basic Auth (Elasticsearch): `username`
- IAM: `username`

These assignees are not related to user restrictions, which is related to the visibility of the task in Tasklist for Self-Managed. For more information, see [Tasklist Authentication](/self-managed/tasklist-deployment/tasklist-authentication.md).

:::note
For example, say you log into Tasklist using Camunda 8 login with email using your email address `foo@bar.com`. Every time a user task activates with `assignee` set to value `foo@bar.com`, Tasklist automatically assigns it to you. You'll be able to find your new task under the task dropdown option `Assigned to me`.
:::

### Scheduling

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

### Variable mappings

By default, all Zeebe user task variables are merged into the process instance. This
behavior can be customized by defining an output mapping at the user task.

Input mappings can be used to transform the variables into a different format.

### User task forms

A user task typically includes a form. A form contains work instructions for the user and captures the resulting information in a structured way.

However, user tasks are not limited to forms. User tasks can also be used to refer users to other applications or redirect them to a website.

You can use [Camunda Forms](/guides/utilizing-forms.md) that offer visual editing of forms directly in Camunda Modeler, or use your own forms.
Forms can either be displayed in [Tasklist](/components/tasklist/introduction-to-tasklist.md), or handled by a custom application.

To use a form, a user task requires a form reference.
Depending on your use case, two different types of form references can be used:

1. **Camunda Forms** provide a flexible way of linking a user task to a Camunda Form via the form ID.
   Forms linked this way can be deployed together with the referencing process models.
   To link a user task to a Camunda Form, you have to specify the ID of the Camunda Form as the `formId` attribute
   of the task's `zeebe:formDefinition` extension element (see the [XML representation](#camunda-form-linked)).
   Form ID references always refer to the latest deployed version of the Camunda Form.

   You can read more about Camunda Forms in the [Camunda Forms guide](/guides/utilizing-forms.md) or the [Camunda Forms reference](/components/modeler/forms/camunda-forms-reference.md)
   to explore all configuration options for form elements.

2. A **custom form reference** can specify any custom identifier in the user task using the `externalReference`
   attribute of the task's `zeebe:formDefinition` extension element (see the [XML representation](#camunda-form-linked)).
   How the identifier is interpreted depends on your implementation.
   You can use it to associate a custom form, route to a custom application, or a URL to a web page, for example.
   A custom form reference will not be shown in Tasklist.

:::info
For user tasks with a [job worker implementation](#job-worker-implementation), the custom form references are defined on the `formKey` attribute
of the `zeebe:formDefinition` extension element instead of the `externalReference` attribute.

Furthermore, there is a third form option for job worker-based user tasks: embedded Camunda Forms. You can use them to
embed a form's JSON configuration directly into the BPMN process XML as a `zeebe:UserTaskForm` extension element of the
process element. The embedded form can then be referenced via the `formKey` attribute (see [XML representation](#camunda-form-embedded)).
:::

### Task headers

A user task can define an arbitrary number of `taskHeaders`; they are static
metadata stored with the user task in Zeebe. The headers can be used as
configuration parameters for tasklist applications.

## Job worker implementation

A user task does not have to be managed by Zeebe. Instead, you can also use
job workers to implement a custom user task logic. Note that you will lose all the task lifecycle and state management features that Zeebe provides and will have to implement them yourself. Use job workers only in case you require a very specific implementation of user tasks that can't be implemented on top of Zeebe user tasks.

:::info
If you started using Camunda 8 with version 8.4 or a lower version and upgraded to 8.5 or newer, your user tasks are probably implemented as job workers. Refer to the [migration guide](/apis-tools/tasklist-api-rest/migrate-to-zeebe-user-tasks.md) to find a detailed list of the differences between the task implementation types and learn how to migrate to Zeebe user tasks.
:::

You can define a job worker implementation for a user task by removing its `zeebe:userTask` extension element.

User tasks with a job worker implementation behave exactly like [service tasks](/components/modeler/bpmn/service-tasks/service-tasks.md). The differences between these task
types are the visual representation (i.e. the task marker) and the semantics for the model.

When a process instance enters a user task with job worker implementation, it creates
a corresponding job and waits for its completion. A job worker should request jobs of the job type `io.camunda.zeebe:userTask`
and process them. When the job is completed, the process instance continues.

Use [task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers) to pass static parameters to the job
worker.

Define [variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
the [same way as a service task does](/components/modeler/bpmn/service-tasks/service-tasks.md#variable-mappings)
to transform the variables passed to the job worker, or to customize how the variables of the job merge.

### Limitations

User tasks based on a job worker implementation provide no insight into the lifecycle of the task in the engine.
You need to manage the user task's lifecycle in your own application outside the engine.
This also limits available metrics and reporting for such user tasks to what is available for service tasks.

All user task-specific data like assignments and scheduling information is provided in the job as
[task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers).

You cannot use the Camunda 8 Zeebe User Task API to work on user tasks based on job workers.
Overall, you are limiting those user tasks to the capabilities of [service tasks](/components/modeler/bpmn/service-tasks/service-tasks.md).
Zeebe user task-specific features are not available to those user tasks.

## Additional resources

### XML representations

#### Camunda Form

A user task with a linked Camunda Form, an assignment definition, and a task schedule:

```xml
<bpmn:userTask id="configure" name="Configure">
  <bpmn:extensionElements>
    <zeebe:formDefinition formId="configure-control-process" />
    <zeebe:assignmentDefinition assignee="= default_controller" candidateGroups="controllers, auditors" />
    <zeebe:taskSchedule dueDate="= task_finished_deadline" followUpDate="= now() + duration(&#34;P12D&#34;)" />
    <zeebe:userTask />
  </bpmn:extensionElements>
</bpmn:userTask>
```

#### Custom form reference

A user task with an external task form referenced by a custom form reference:

```xml
<bpmn:userTask id="configure" name="Configure">
  <bpmn:extensionElements>
    <zeebe:formDefinition externalReference="custom-key" />
    <zeebe:userTask />
  </bpmn:extensionElements>
</bpmn:userTask>
```

:::info
If you choose the [job worker
implementation](#job-worker-implementation) for a user task, the custom form reference needs to be set to the `formKey` attribute instead of
the `externalReference` attribute.
:::

#### Camunda Form (embedded)

:::info
This is only supported if you choose the [job worker implementation](#job-worker-implementation) for a user task.
:::

A job-based user task with an embedded Camunda Form:

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

### References

- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Form linking in Modeler](/components/modeler/web-modeler/advanced-modeling/form-linking.md)
- [Job handling](/components/concepts/job-workers.md)
- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
