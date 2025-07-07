---
id: incorporate-user-task-listener
title: User task listeners
description: "In Camunda 8, user task listeners allow you to run custom logic when a user task is created, assigned, or completed."
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

import SaasPrereqs from './react-components/\_saas-prerequisites.md'
import CreateCluster from '../components/react-components/create-cluster.md';
import CreateApiCredentials from '../components/react-components/create-api-credentials.md';

In Camunda 8, **user task listeners** allow you to run custom logic in response to changes to a user task, such as when the `creating`, `assigning`, or `completing` event occurs.

User task listeners facilitate the integration of custom logic into your workflows. For more details, refer to the [User Task Listeners concept](../components/concepts/user-task-listeners.md).

This guide walks you through:

- Defining a task listener using **Camunda Modeler**
- Implementing a task listener as a job worker
- Verifying the result in **Operate** and **Tasklist**

## Prerequisites

You must have access to a Camunda 8 SaaS account.

<details>
   <summary>Have you signed up for Camunda yet?</summary>
   <SaasPrereqs/>
</details>

You must also know how to model a process with a user task.  
If you haven't done this before, first follow the steps in our guide to [get started with human task orchestration](./getting-started-orchestrate-human-tasks.md).

Additionally, you need the following:

- Java ≥ 8
- Maven
- IDE (IntelliJ, VSCode, or similar)
- Download and unzip or clone the [repository](https://github.com/camunda/camunda-platform-tutorials), then navigate to:  
  `camunda-platform-tutorials/quick-start/task-listeners/task-listener-java`

## Step 1: Create a process with a user task in Modeler

1. Launch **Camunda Modeler**.
2. Create a new BPMN file.
3. Add a user task named `Review application`.

:::note
In this guide, you can also use the example BPMN from the repo located in `camunda-platform-tutorials/quick-start/task-listeners/task-listener-java/src/main/resources/Quick_Start_Task_Listeners.bpmn`.
In that case, just explore the BPMN using the steps below, but do not adjust the model in steps 2-4.
:::

<!---![camunda modeler with user task](path-to-screenshot1.png)--->

## Step 2: Select the user task

1. Click the **user task** (e.g., “Review application”).
2. In the right-hand **properties panel**, scroll to **Task listeners**.

<!--- ![properties panel with user task details](path-to-screenshot2.png)--->

## Step 3: Define a task listener

We'll now add a new task listener to the user task and define its properties.

1. Click the plus sign in the **Task listeners** section to add a new task listener.
2. Under **Event type**, select **creating**.
3. Under **Listener type**, enter `assign_new_task`.

<!---![add task listener UI](path-to-screenshot3.png)--->

:::info
You've now defined a **creating** task listener for this user task.  
When a process instance arrives at this user task, the `creating` event is triggered, and a job of type `assign_new_task` is created.  
A job worker can then activate this job to execute the external logic and complete it, approving the creation of the user task.
:::

## Step 4: Create a cluster

<CreateCluster/>

## Step 5: Deploy the process

1. Click **Deploy current diagram**.
2. Select your **Camunda 8 cluster**.
3. Click **Deploy**.

<!-- ![deploy the process](path-to-screenshot4.png) -->

## Step 6: Start a process instance to create the user task

1. Start a new process instance by clicking on the blue **Run** button.
2. In the top left corner of the screen, click the square-shaped **Camunda components** button.
3. Navigate to Tasklist and notice that there is no task in Tasklist yet.
4. Navigate to Operate to see your process instance with a token waiting at the user task by clicking **View process instances**.
5. Click the user task and then click the **Listeners** tab to see that the **Creating** listener is **Active**.
6. Take a moment to understand the properties of the listener, for example verify that the listener type is what you defined in the process model. This listener is a job that can be activated and handled by a job worker.

## Step 7: Implement the listener

Next, we'll run the listener application to execute our external logic, and complete the listener job to continue the user task's creation.

### Create credentials for your Zeebe client

<CreateApiCredentials/>

### Create a job worker to implement the task listener

Next, we’ll create a worker that listens to the user task's events by associating it with the **Listener type** we specified on the task listener in the BPMN diagram.

1. Open the downloaded or cloned project ([repo](https://github.com/camunda/camunda-platform-tutorials), then `cd` into `camunda-platform-tutorials/quick-start/task-listeners/task-listener-java`) in your IDE.
2. Add your credentials to `application.properties`. Your client ID and client secret are available from the previous section in the credential text file you downloaded or copied. Go to the cluster overview page to find your **region Id** and **cluster Id** (in your client credentials under the **API** tab within your cluster).
3. In the `Listener.java` file, change the type to match what you specified in the BPMN diagram. If you followed the previous steps for this guide and entered “assign_new_task”, no action is required.
4. After making these changes, perform a Maven install, then run the Listener.java `main` method via your favorite IDE. If you prefer using a terminal, run `mvn package exec:java`.

## Step 8: Verify the result in **Operate** and **Tasklist**

Now that the task listener is running, the listener job will have been handled and completed. Let's see what effects this has had.

1. Navigate to Operate and see that the listener that was **Active** previously, has now been **Completed**.
2. Navigate to Tasklist and see that the task is available and assigned to the assignee or manager that you provided.

## Suggestions for further exploration

You can now play around with it, to build your understanding of task listeners:

- Stop the listener application.
- Start a new instance of the process, and notice that the task does not appear in Tasklist.
- Check Operate, and notice that a creating listener is active.
- Restart the listener application and notice that the listener is failed and an incident is raised.
- Set a variable `assignee` or `manager` in the process instance, and resolve the incident.
- Check Tasklist, and notice that the task is assigned to the assignee or manager that you provided.
- Add a lister for another event type.
- [Access the user task's data](../components/concepts/user-task-listeners.md#accessing-user-task-data) from the activated job.
- Adjust the code in Listener.java that completes the listener job, by adding a **job result** to the command that [**denies** the assignment](../components/concepts/user-task-listeners.md#denying-the-lifecycle-transition).
- Adjust the code in Listener.java that completes the listener job, by adding a job result to the command that [**corrects** the **assignee**](../components/concepts/user-task-listeners.md#correcting-user-task-data).

## Additional resources and next steps

- Learn more about Camunda 8 and what it can do by reading [What is Camunda 8](/components/components-overview.md) or watching our [Overview video](https://bit.ly/3TjNEm7) in Camunda Academy.
- Get your local environment ready for development with Camunda 8 by [setting up your first development project](setting-up-development-project.md).
