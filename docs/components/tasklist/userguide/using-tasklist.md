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

Click on the selection field in the left panel to choose which tasks you want to see:

- All open
- Assigned to me
- Unassigned
- Completed

Click on the icon ![order-icon](img/order-icon.png) to order the tasks. You can order them by the date of creation, the due date, or the follow up date.

The follow up date defines the latest time you should start working on a task, helping you to prioritize work.
The due date provides a deadline when the task should be finished:

![tasklist-task-ordering](img/tasklist-task-ordering.png)

### Assign tasks

When no tasks are assigned to you, the list appears empty

![tasklist-claimed-by-me-empty](img/tasklist-claimed-by-me-empty_light.png)

Select the **Unassigned** list and assign a task to yourself using the **Assign to me** button on the top panel:

![tasklist-claim](img/tasklist-claim_light.png)

### Work on assigned tasks

Select the **Assigned to me** list to see the tasks that are assigned to you. Select a task to work on it.

![tasklist-claimed-by-me-list](img/tasklist-claimed-by-me-list_light.png)

### Complete a task

When a task is assigned to you, you can complete the task by filling out the given form, and clicking on the Complete Task button. There are also cases where no form is available. In these cases, you have to add and/or update variables directly.

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
