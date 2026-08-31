---
id: task-testing
title: Task testing
description: Test and debug a single BPMN task directly in Camunda Hub using live data from your connected Camunda 8 cluster.
---

You can test a single task directly within Camunda Hub to validate its configuration and logic without executing the entire process.  
Task testing lets you quickly debug mappings, inputs, and outputs without leaving your implementation context.

## Task testing vs. Test mode

While both task testing and Test mode let you validate your BPMN models, they serve different purposes:

| Feature / capability | Task testing (Implement mode)     | Test mode                         |
| -------------------- | --------------------------------- | --------------------------------- |
| Test scope           | Single task or sub-process        | Process segment or full diagram   |
| Best for             | Quick implementation checks       | End-to-end test validation        |
| Data type            | Live data only                    | Live or mocked data               |
| Saves test cases     | No                                | Yes                               |
| Mode required        | Runs directly in _Implement_ mode | Requires switching to _Test_ mode |

Use task testing during implementation for quick feedback, and use Test mode for structured testing with mock data or reusable test cases.

## Prerequisites

Before running task testing, ensure you have:

- A connection to an active Camunda 8.8 or later orchestration cluster
- Permissions to deploy and run processes in the target environment

## Run a task test

To test a task in Camunda Hub:

1. In your BPMN diagram, click the task you want to test.
2. Open the **Details** panel on the right side of the modeling interface.
3. Select the **Test** tab.
4. Under **Input**, define the process variables in JSON format to simulate the process context.

### Define process variables

- Use the **Variables** panel to review available variables in your process.
- Confirm that input mappings for your task are configured correctly.
- Match variable names and types to those expected by the task.
- Provide realistic sample data to reflect actual execution conditions.

5. Click **Run test** to execute the task.

Camunda Hub automatically deploys the process before running the test. The task executes on the connected cluster using your defined input data.

During execution, the log displays each step in real time, including any states where the test is waiting for an external action to complete.

## View results

After the test completes, results appear in the **Details** panel in the **Test** tab under **Result**:

| Status                    | Result description                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------- |
| Successful execution      | The **Result** section displays the resulting process variables and any updates.       |
| Incident during execution | Details are shown along with the relevant variable context to help diagnose the issue. |
| Execution error           | The error message and response details are displayed.                                  |

## Related documentation

- [Test a task in Desktop Modeler](../../../../modeler/desktop-modeler/task-testing.md)
- [Learn about task testing concepts](../../../../modeler/task-testing.md)
- [Working with variables](../../../../concepts/variables.md)
- [Using Test mode](test-your-process.md)
