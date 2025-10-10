---
id: task-testing
title: Task testing
description: Run a single BPMN task directly in the modeler to verify your implementation without executing the entire process.
---

Task testing lets you execute a single BPMN task directly from the modeler to verify your implementation without running the full process.

This feature provides immediate feedback on your task logic, variable mappings, and configuration — all within your modeling environment.

Task testing runs the task on the connected Camunda 8 engine, exactly as it would run during normal process execution.

## How task testing works

When you test a task, the following occurs:

1. The modeler deploys the process to the connected **Camunda 8.8+ orchestration cluster**.
2. You define the process context by providing **input variables**.
3. The engine executes the selected task:
   - Input mappings are applied as configured.
   - The actual task logic (connector, script, or external task) is executed by the engine.
   - Output mappings are applied as configured.
4. The modeler displays the **resulting process variables** and any incidents or errors for review.

:::warning
Task testing executes tasks with live data on the connected cluster. Any configured actions (emails, API calls, database updates, payments, etc.) will run as defined.

We **do not recommend** using a production environment.
:::

## Prerequisites

- A connection to an **active Camunda 8.8 or later** orchestration cluster.
- Appropriate credentials and permissions to deploy and run processes.

Once a test has run, you can view the resulting process instance in [**Operate**](../../components/operate/operate-introduction.md) for additional insights into execution details or incidents. Test instances are deployed as standard process instances and can be viewed, managed, or deleted as usual.

See the respective guides below for configuration steps:

- [Test a task in Web Modeler](/components/modeler/web-modeler/task-testing.md)
- [Test a task in Desktop Modeler](/components/modeler/desktop-modeler/task-testing.md)

## Supported elements

Task testing supports **single BPMN task elements**.

The following elements are **not supported**:

- Subprocesses and call activities
- Events (start, end, boundary)
- Multiple tasks or process segments

## Variable persistence

When a task test completes:

- Input variables are stored locally between your modeling session for reuse in subsequent test runs.
- Output variables are visible in the results panel but are **not persisted** to the cluster beyond the test instance.
- You can rerun tests with the same input set or modify them to test new values.

## Best practices

- Use a **staging cluster** or **sandbox environment** for testing live integrations.
- Mock external API calls and disable production credentials when possible.
- Review results in Operate to confirm behavior and variable mappings.
