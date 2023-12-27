---
id: introduction-to-task-applications
title: "Introduction to task applications"
description: "Task applications are the interface between humans and Camunda processes to orchestrate human work."
---

import TasklistProcessesImg from './img/tasklist-processes.png';
import TasklistDetailsImg from './img/tasklist-details.png';

Task applications are the interface between humans and Camunda processes to orchestrate human work. Learn key concepts of the architecture of task applications before you build your own.

:::note
If you are not familiar with the idea of human task management itself, read the [introduction to human task management](/components/best-practices/architecture/understanding-human-tasks-management.md) first. 
:::

## Tasklist layout

Camunda 8 comes with a ready-to-use Tasklist UI that implements all key concepts of a task application. The Tasklist UI is a generic task application; your custom task application should probably be tailored to your specific use case and also include external data sources and tools.

The Tasklist UI is split into two main pages: the [tasks page](#task-page) and the [processes page](#processes-page).

### Task page

The task page lists all tasks that are pending for a user or user group, and allows users to pick and claim a task from that queue to work on. On the same page, the details of a selected task are displayed including the form that the user must submit in order to execute and complete the task.

The task page is divided into two panels, similar to the layout of messaging clients:

#### Task queue side panel

The **task queue side panel** that lists all tasks that are pending for a user or user group. It comes with filter and sort options that allow users to identify the right task to work on next. The tasks can be sorted by the creation date, due date, or follow-up date.

Learn more how to work with the task queue in the [Tasklist user guide](/components/tasklist/userguide/using-tasklist.md).

#### Task details panel

The **task details panel** shows the details of the selected task. A [form](/guides/utilizing-forms.md) is displayed in the center of the details panel, which must be filled out to complete a task.

<img src={TasklistDetailsImg} alt="Tas details page in Tasklist" />

On the top of the form, a header shows the title of the task to work on, and the current assignee. Depending on the status of the assignment, a button allows you to assign the task to yourself or release it to the queue.

At the bottom of the form there is a button with which you can complete the task.

To the right of the task, you find additional information about the task, such as the [due date](/components/modeler/bpmn/user-tasks/user-tasks.md#scheduling) of the task, or the [user groups that can work on this task](/self-managed/concepts/access-control/user-task-access-restrictions.md).

Potential extensions are dependent on your use case. You can consider adding more buttons to the bottom of the panel to indicate different task outcomes such as "approve" or "reject", or you could add a list of attachments to the right panel. 

Learn more how to work with the task details panel in the [Tasklist user guide](/components/tasklist/userguide/using-tasklist.md).

### Processes page

The processes page lists all processes that are available to the logged in user, and allows the user to start a process from there.

<img src={TasklistProcessesImg} style={{width: 800}} alt="Processes page in Tasklist" />

Potential extensions are dependent on your use case. You can consider grouping processes by apps, domains, or teams, showing a process history, or adding a list of open process instances or cases. 

Learn more about the processes page in the [Tasklist documentation](/components/tasklist/userguide/starting-processes.md).

<!--
## Forms and external applications
-->

<!-- 
## Task queues
-->

<!--
## Additional elements

### Cases

### Attachments

### Comments
-->

<!-- 
TODO Section to be added once pages are available

## Next steps

You learned the basic concepts of a task application. Your possible next steps are:

* Learn how to utilize Camunda 8 APIs to query and execute tasks in your task application, and to enrich it with process execution data. 
* Learn how to embed or customize Camunda Forms to render unique, tailored forms that can be designed by business users.
* Run through a comprehensive guide on how to build your own task application.
* Run throuh a guide on how to integrate with low-code tools to design your task application.
-->
