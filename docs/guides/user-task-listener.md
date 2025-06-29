---
id: incorporate-user-task-listener
title: Incorporate a user task listener
description: "In Camunda 8, user task listeners allow you to run custom logic when a user task is created, assigned, or completed."
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

In Camunda 8, **user task listeners** allow you to run custom logic when a user task is created, assigned, or completed.

Camunda 8 user task listeners facilitate integration of custom logic into your workflows. Whether assigning tasks dynamically or triggering events, listeners give you control without requiring an external worker or service.

This guide walks you through setting up a task listener using **Camunda Modeler**, and verifying the result in **Operate** and **Tasklist**, using a real-world HR assignment example.

**Goal**: When the **“Review application”** user task is created in your hiring process, automatically assign it to the HR team lead using a process variable.

## Prerequisites

- Camunda 8 account (SaaS or Self-Managed)
- Access to **Operate**, **Tasklist**, and **Web Modeler**
- A simple BPMN process with at least one user task
<!--- Add a downloadable BPMN diagram here--->

## Configuring a user task listener

### Step 1: Open your process in Modeler

1. Launch **Camunda Modeler**.
2. Open your BPMN file (e.g., `hiring-process.bpmn`).

<!---![camunda modeler with user task selected](path-to-screenshot1.png)--->

### Step 2: Select the user task

1. Click the **user task** (e.g., “Review application”).
2. In the right-hand **properties panel**, scroll to **User Task**.

<!--- ![properties panel with user task details](path-to-screenshot2.png)--->

### Step 3: Add a task listener

1. Scroll down to **Listeners**
2. Click **Add Task Listener**

<!---![add task listener UI](path-to-screenshot3.png)--->

3. Under **Event**, select **create**.
4. Under **Implementation Type**, choose **Script**.
5. Set **Script Format** to `javascript`.
6. In the **Script** box, enter the following code:

```javascript
const hrLead = task.variables.get("hrGroupLead");
task.setAssignee(hrLead);
```

:::note
For testing, you can replace task.variables.get("hrGroupLead") with a hardcoded value like "john.doe"
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
