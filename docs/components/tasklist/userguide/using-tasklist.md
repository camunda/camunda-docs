---
id: using-tasklist
title: Overview and example use case
description: "What you can do with Tasklist and an example use case."
---

## What can I do with Tasklist?

Tasklist shows you all user tasks that appeared in processes; those processes are running in Zeebe.

User tasks need an interaction from the user. This can be updating, adding variables, filling out a [Camunda Form](../../../guides/utilizing-forms.md), or simply completion of the task. The user must first claim a task or unclaim an already claimed task.

If the user claimed a task, the task can be completed. Different task status filters help the user choose the desired task.

:::note
When a user is granted Tasklist access, the user has full access to the respective process instance data.
:::

## Example use case

If you've successfully logged in, you'll see a screen similar to the following:

![tasklist-start-screen](../img/tasklist-start-screen_light.png)

On the left side of the screen, you can see tasks. On the right side of the screen, you can see details of the current selected task.

Change the list of tasks by applying filters. You can also collapse and expand the task list.

You can choose which tasks you want to see:

- All open
- Assigned to me
- Unassigned
- Completed

You can also order the tasks on the left menu, clicking on the icon ![order-icon](img/order-icon.png):

![tasklist-task-ordering](img/tasklist-task-ordering.png)

### Assign tasks

Initially, we have no **Assigned to me** tasks.

![tasklist-claimed-by-me-empty](img/tasklist-claimed-by-me-empty_light.png)

Select the **Unassigned** list and assign a task using the **Assign to me** button on the top panel:

![tasklist-claim](img/tasklist-claim_light.png)

### Assigned to me tasks

Select the **Assigned to me** list to see if you assigned the task:

![tasklist-claimed-by-me-list](img/tasklist-claimed-by-me-list_light.png)

### Complete a task

Once you are assigned a task, you can complete the task by adding and updating variables, and using the **Complete Task** button:

![tasklist-claimed-by-me](img/tasklist-claimed-by-me_light.png)

Always choose a list of tasks with a specified status. Then, select the task you want to work on.

Complete the task and check if it is shown in the **Completed** list.

Change variables as needed and begin completion with the **Complete Task** button.

#### Add and update variables

Update variables in the **Variables** section by adjusting their text field.

To add a new variable, click **Add Variable**.

![tasklist-complete-task](img/tasklist-complete-task_light.png)

### Completed tasks

You will now see the completed task by selecting the **Completed** task list:

![tasklist-task-completed](img/tasklist-task-completed_light.png)

### Processes

:::note
This tab is currently only available for Self-Managed environments or an alpha cluster with Camunda Platform.
:::

It is possible to start processes by demand using Tasklist. To do this, click **Processes** in the top menu. All the processes you have access to start will be listed in the **Processes** page.

![tasklist-processes](img/tasklist-processes.png)

On the **Search** checkbox, it's possible to filter the processes. Start typing the process name and the list will be updated.

![tasklist-processes-search](img/tasklist-processes-search.png)

To start a process, click **Start Process** on the process you want to start.

![tasklist-processes-search](img/tasklist-processes-start.png)

Tasklist will then wait for the process to be executed. If the process generates a task, you will be redirected to the generated task.

### I'm not seeing a process

There could be multiple reasons why you are not seeing any process in the **Processes** tab:

- There is no process deployed to your environment.
- Your user doesn't have permission to see any process. Permissions are managed in [Identity](docs/self-managed/identity/what-is-identity.md) to allow users access to processes.
- You are in a SaaS environment.

For all the above scenarios, contact your administrator to understand why no processes are displayed.
