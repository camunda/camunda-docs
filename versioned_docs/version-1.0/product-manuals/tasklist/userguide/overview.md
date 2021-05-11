---
id: overview
title: Overview and example use case
---

## What can I do with Tasklist?
Tasklist shows you all user tasks that appeared in processes. Those processes are running in Zeebe.

User tasks needs an interaction from the user - that can be updating, adding variables, filling out a Camunda Form or just completion of the task. The user needs to claim a task first or even unclaim an already claimed task.
If the user has claimed a task, then the task is completable. Different task status filters help the user
to choose the desired task.

## Example use case 
If you have successfully logged in you can see a screen like this:

![tasklist-start-screen](../img/tasklist-start-screen_light.png)

On the left side you can see tasks and on the right side details of the current selected task.
You can change the list of tasks by applying filters. You can collapse and expand the task list.

You can choose which tasks you want to see: 

* All open
* Claimed by me
* Unclaimed
* Completed

At the begin we have no **Claimed by me** tasks.

### Claimed by me tasks
![tasklist-claimed-by-me-empty](img/tasklist-claimed-by-me-empty_light.png)

We select the **Unclaimed** list and claim a task by using the **Claim** button on the details panel:

### Claim a task 
![tasklist-claim](img/tasklist-claim_light.png)

Now select the **Claimed by me** list to see whether you have the task claimed:

![tasklist-claimed-by-me-list](img/tasklist-claimed-by-me-list_light.png)

### Complete a task
Only then you can complete the task by adding and updating variables and finally using the **Complete Task** button:

![tasklist-claimed-by-me](img/tasklist-claimed-by-me_light.png)

You always choose a list of tasks with a specified status and then select the task you want to work on.

Now we complete the task and check if it will be shown in **Completed** list. 
Change and variables as needed and start the completion with **Complete Task**.

#### Add and update variables
![tasklist-complete-task](img/tasklist-complete-task_light.png)

### Completed tasks
If everything went fine you can see the completed task by selecting the **Completed** task list:

![tasklist-task-completed](img/tasklist-task-completed_light.png)
