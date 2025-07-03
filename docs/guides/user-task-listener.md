---
id: incorporate-user-task-listener
title: Incorporate a user task listener
description: "In Camunda 8, user task listeners allow you to run custom logic when a user task is created, assigned, or completed."
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

import SaasPrereqs from './react-components/\_saas-prerequisites.md'

In Camunda 8, **user task listeners** allow you to run custom logic in response to changes to a user task, for example when it's creating, assigning, or completing.

Camunda 8 user task listeners facilitate integration of custom logic into your workflows. For more details about user task listeners, please check the [user task listeners concept](../components/concepts/user-task-listeners).

This guide walks you through defining a task listener using **Camunda Modeler**, implementing a task listener as a job worker, and verifying the result in **Operate** and **Tasklist**.

**Goal**: When the **“Review application”** user task is created in your hiring process, automatically assign it to the HR team lead using a process variable.

## Prerequisites

You must have access to a Camunda 8 SaaS account.

<details>
   <summary>Have you signed up for Camunda yet?</summary>
   <SaasPrereqs/>
</details>

You must also know how to model a process with a user task. If you haven't done this before, please first follow the steps in our guide to [get started with human task orchestration](./orchestrate-human-tasks/).

Additionally, you need the following:

- Java ≥ 8
- Maven
- IDE (IntelliJ, VSCode, or similar)
- Download and unzip or clone the [repo](https://github.com/camunda/camunda-platform-tutorials), then `cd` into `camunda-platform-tutorials/quick-start/task-listeners/task-listener-java`

## Configuring a user task listener

### Step 1: Create a process with a user task in Modeler

1. Launch **Camunda Modeler**.
2. Create a new BPMN file.
3. Add a user task named `Review application`.

:::note
In this guide, you can also use the example BPMN from the repo located in `camunda-platform-tutorials/quick-start/task-listeners/task-listener-java/src/main/resources/Quick_Start_Task_Listeners.bpmn`.
In that case, just explore the BPMN using the steps below, but do not adjust the model in steps 2-4.
:::

<!---![camunda modeler with user task](path-to-screenshot1.png)--->

### Step 2: Select the user task

1. Click the **user task** (e.g., “Review application”).
2. In the right-hand **properties panel**, scroll to **Task listeners**.

<!--- ![properties panel with user task details](path-to-screenshot2.png)--->

### Step 3: Define a task listener

We'll now add a new task listener to the user task and define it's properties.

1. Add a new task listener by clicking on the plus sign in the **Task listeners** section.
2. Under **Event type**, select **creating**.
3. Under **Listener Type**, enter `assign_new_task`.

<!---![add task listener UI](path-to-screenshot3.png)--->

:::info
You've now defined a creating task listener for this user task.
When a process instance arives at this user task, the `creating` event triggers and a job of type `assign_new_task` is created.
A job worker can activate this job to execute the external logic and complete it to approve the creation of the user task.
:::

### Step 4: Deploy the process

Click Deploy current diagram

Select your Camunda 8 cluster or create a new deployment target

Click Deploy

### Step 5: Start a process instance with test data

Use either the Console UI or REST API to start a new process instance with the following variables:

```json
{
  "variables": {
    "hrGroupLead": {
      "value": "john.doe"
    }
  }
}
```

You can use the Swagger UI, Zeebe CLI, or REST API client like Postman to initiate this.

### Step 6: Check assignment in Operate

Open Operate

Find the process instance you started

Click on the user task node

Confirm the assignee is set to "john.doe"

### Step 7: Verify task in Tasklist

Go to Tasklist

Log in as john.doe

You should see the “Review application” task assigned to you

## Suggestions for further development

- Task listeners run inside the engine — keep them short and avoid long I/O
- Use task.variables.get("...") to safely access process variables
- Assignee must be a valid user from your Camunda identity provider
- You can add other listener types (e.g., complete) using the same method

## Additional resources

Insert related text
