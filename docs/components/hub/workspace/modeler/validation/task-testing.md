---
id: task-testing
title: Validate
description: Validate and debug a single BPMN task directly in Camunda Hub using live data from your connected environment.
---

import TaskTestingProductionWarningImg from './img/task-testing-production-warning.png';

You can execute a single task directly within Camunda Hub to validate its configuration and logic without running the entire process.  
The **Validate** tab lets you quickly debug mappings, inputs, and outputs without leaving your implementation context.

## Validate vs. Test mode

While both the **Validate** tab and Test mode let you check your BPMN models, they serve different purposes:

| Feature / capability | Validate (Implement mode)         | Test mode                         |
| -------------------- | --------------------------------- | --------------------------------- |
| Scope                | Single task or sub-process        | Process segment or full diagram   |
| Best for             | Quick implementation checks       | End-to-end test validation        |
| Data type            | Live data only                    | Live or mocked data               |
| Saves test cases     | No                                | Yes                               |
| Mode required        | Runs directly in _Implement_ mode | Requires switching to _Test_ mode |

Use the **Validate** tab during implementation for quick feedback, and use Test mode for structured testing with mock data or reusable test cases.

## Prerequisites

Before you validate a task, ensure you have:

- A [runtime connection](../modeling/connect-to-a-runtime.md) to an environment, hosted on an active Camunda 8.8 or later Orchestration Cluster
- Permissions to deploy and run processes in the target environment

## Validate a task

To validate a task in Camunda Hub:

1. In your BPMN diagram, click the task you want to validate.
2. Open the **Details** panel on the right side of the modeling interface.
3. Select the **Validate** tab.
4. Under **Input**, define the process variables in JSON format to simulate the process context.
   - Use the **Variables** panel to review available variables in your process.
   - Confirm that input mappings for your task are configured correctly.
   - Match variable names and types to those expected by the task.
   - Provide realistic sample data to reflect actual execution conditions.
5. Click **Execute** to run the task.

Camunda Hub automatically deploys the process before executing the task. The task executes on the environment or cluster selected in the **Runtime** selector, using your defined input data. To execute against a different runtime, [change the runtime connection](../modeling/connect-to-a-runtime.md#change-the-runtime-connection). If you're connected to a production runtime, the **Validate** tab shows **You are connected to a production cluster** (or **production environment**), because executing a task there uses production data and can cause real side effects.

<img src={TaskTestingProductionWarningImg} width="400px" alt="Validate tab of the Details panel showing the warning You are connected to a production cluster above the Execute button" />

During execution, the log displays each step in real time, including any states where the execution is waiting for an external action to complete. Click **Cancel** to stop waiting. The process instance keeps running on the cluster.

## View results

After the execution completes, results appear in the **Details** panel in the **Validate** tab:

| Status                    | Result description                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------- |
| Successful execution      | The **Result** section displays the resulting process variables and any updates.       |
| Incident during execution | Details are shown along with the relevant variable context to help diagnose the issue. |
| Execution error           | The error message and response details are displayed.                                  |

## Related documentation

- [Validate a task in Desktop Modeler](../../../../modeler/desktop-modeler/task-testing.md)
- [Connect to a runtime](../modeling/connect-to-a-runtime.md)
- [Learn how Validate works](../../../../modeler/task-testing.md)
- [Working with variables](../../../../concepts/variables.md)
- [Using Test mode](test-your-process.md)
