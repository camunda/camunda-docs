---
id: task-testing
title: Task testing
description: Run a BPMN activity directly in the modeler to verify your implementation without executing the entire process.
---

Test a BPMN activity directly from the modeler to verify your implementation without running the full process.

This feature provides immediate feedback on your implementation, variable mappings, and configuration — all within your modeling environment.

The selected element runs on the connected Camunda 8 engine, exactly as it would run during normal process execution.

![Testing](./img/task-testing.png)

## How it works

When you test an element, the following occurs:

1. The modeler deploys the process to the connected **Camunda 8.8+ orchestration cluster**.
2. You define the process context by providing **input variables**.
3. The engine executes the selected element:
   - Input mappings are applied as configured.
   - The actual task logic (connector, script, or external task) is executed by the engine.
   - Output mappings are applied as configured.
4. The modeler displays the **Result** tab containing the execution log, **process variables**, and **local variables**, as well as any incidents or errors.

:::warning
Testing executes elements with live data on the connected cluster. Any configured actions (emails, API calls, database updates, payments, etc.) will run as defined.

We **do not recommend** using a production environment.
:::

## Prerequisites

- A connection to an **active Camunda 8.8 or later** orchestration cluster.
- Appropriate credentials and permissions to deploy and run processes.

Once a test has run, you can view the resulting process instance in [**Operate**](../../components/operate/operate-introduction.md) for additional insights into execution details or incidents. Test instances are deployed as standard process instances and can be viewed, managed, or deleted as usual.

See the respective guides below for configuration steps:

- [Test in Web Modeler](./web-modeler/task-testing.md)
- [Test in Desktop Modeler](./desktop-modeler/task-testing.md)

## Supported elements

The following BPMN elements are supported:

- **Task elements** — service tasks, script tasks, user tasks, business rule tasks, and send tasks.
- **Subprocesses** — embedded subprocesses can be tested directly, executing all contained elements.
- **Tasks inside subprocesses** — individual tasks within a subprocess can also be tested.

The following elements are **not supported**:

- Call activities
- Events (start, end, boundary)
- Gateways

## Variable persistence

When a test completes:

- Input variables are stored locally for reuse in subsequent test runs.
- The last test result of an element is persisted, including output variables.
- You can rerun tests with the same input set or modify them to test new values.

## Best practices

- Use a **staging cluster** or **sandbox environment** for testing live integrations.
- Mock external API calls and disable production credentials when possible.
- Review results in Operate to confirm behavior and variable mappings.
