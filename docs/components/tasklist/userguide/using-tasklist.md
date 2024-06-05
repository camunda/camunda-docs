---
id: using-tasklist
title: Overview
description: "What you can do with Tasklist."
---

import TasklistTasksPageSpecifications from '../img/tasklist-page-specifications.png';
import TaskTileSpecification from '../img/task-tile-specification.png';
import styles from "./styles.module.css";

Tasklist provides a user-friendly interface for managing and completing tasks that require manual interaction.
It shows you all user tasks that appear in processes. Those processes are running in [Zeebe](/docs/components/zeebe/zeebe-overview.md).

The user interaction with a task may involve making updates, adding variables, filling out a [Camunda Form](../../../guides/utilizing-forms.md), or simply reviewing and completing the task.

User tasks can be automatically assigned to users and groups in the BPMN process or they must be self-assigned from Tasklist.
Once assigned to a user, the task can be completed. The user can unassign the task if they do not intend to work on it.

:::info
When a user is granted Tasklist access, the user has full access to the respective process instance data.
:::

## Tasks overview

Tasklist has two main pages:

- Tasks page (_described here_).
- Processes page. Read about it [here](./starting-processes.md).

The Tasks page lists all tasks available to a user or user group and allows users to assign a task from the list to work on.

On the left side of the page you can see task filters and the queue of tasks.
On the right side, details of the selected task are displayed.

Here's an overview of the page structure:

<img src={TasklistTasksPageSpecifications} className={styles.noShadow} alt="Tasks page layout" />

The queue shows the preview of available tasks. The following information is listed there:

- Task name
- Name of the process the task belongs to
- Task context description ([can be optionally configured](/docs/components/concepts/variables.md#context-variable))
- Assignee
- Creation date
- Due date
- Follow up date

<img src={TaskTileSpecification} className={styles.noShadow} alt="Task attributes" />

## Task details

Select a task from the list to view its details. It usually includes a form that has to be filled in and submitted to complete a task.

![tasklist-task-details-form](./img/tasklist-task-details-form.png "Task completion form")

If the task doesn’t have a form, it will display task variables.

![tasklist-with-variables-claimed-by-me](img/tasklist-with-variables-claimed-by-me_light.png "Task variables")

### View process diagram

From the task detail page you can switch to the "Process" tab. It provides a visual representation of the BPMN diagram the task is part of. This helps you understand how an individual task fits into the larger workflow, what activities happened earlier and what’s coming next.

![tasklist-process-diagram](./img/tasklist-task-details-process-diagram.png "Process diagram preview")

:::note
The diagram indicates the version of the process instance in which the task was initiated.
:::

#### Role-based access (RBA)

If your organization has RBA enabled, the process diagram will be displayed only to users that have permission to view process and decision definitions.

## Filtering

To group tasks and quickly find relevant assignments you can use task filters.
Read more about it [here](./find-relevant-tasks.md).

[![tasklist-default-filters](img/task-filters/tasklist-default-filters.jpg "Task filters")](./find-relevant-tasks.md)

## Ordering

Click the order icon ![order-icon](img/order-icon.png) to order the tasks. You can arrange them by the date of creation, the due date, or the follow-up date.

The follow-up date defines the latest time you should start working on a task, helping you to prioritize work.
The due date provides a deadline for when the task should be finished.

![tasklist-task-ordering](img/tasklist-task-ordering.png "Order tasks by dates")
