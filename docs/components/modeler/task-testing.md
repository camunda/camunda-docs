---
id: task-testing
title: Validate
description: Run a BPMN activity directly in the modeler to verify your implementation without executing the entire process.
---

Validate a BPMN activity directly from the modeler to verify your implementation without running the entire process:

1. In a BPMN diagram, open the **Details** panel.
2. On the **Validate** tab, optionally define process variables under **Input**, and click **Execute**.
3. See the results on the **Validate** tab.

Validating gives immediate feedback on your implementation, variable mappings, and configuration within the modeler.

The selected element runs on the connected Camunda 8 engine, as it does during normal process execution.

## How it works

When you execute an element, the following occurs:

1. The modeler deploys the process to the connected Camunda 8.8+ orchestration cluster.
2. You define the process context by providing input variables.
3. The engine executes the selected element:
   - Input mappings are applied as configured.
   - The actual task logic (connector, script, or external task) is executed by the engine.
   - Output mappings are applied as configured.
4. The modeler displays the result, containing the execution log, process variables, and local variables, as well as any incidents or errors.

:::warning
Validating executes elements with live data on the connected cluster. Any configured actions (emails, API calls, database updates, payments, etc.) will run as defined.

Do not use a production environment.
:::

## Prerequisites

- A connection to an active Camunda 8.8 or later orchestration cluster.
- Appropriate credentials and permissions to deploy and run processes.

After an execution, you can view the resulting process instance in [Operate](../../components/operate/operate-introduction.md) for additional insights into execution details or incidents. These instances are deployed as standard process instances and can be viewed, managed, or deleted as usual.

For configuration steps, see:

- [Validate in Camunda Hub](../hub/workspace/modeler/validation/task-testing.md)
- [Validate in Desktop Modeler](./desktop-modeler/task-testing.md)

## Supported elements

You can validate the following BPMN elements:

- **Task elements** — service tasks, script tasks, user tasks, business rule tasks, and send tasks.
- **Sub-processes** — embedded sub-processes can be executed directly, including all contained elements.
- **Tasks inside sub-processes** — individual tasks within a sub-process can also be executed.
- **Call activities** — call activities can be executed directly, running the deployed called process.

The following elements are not supported:

- Events (start, end, boundary)
- Gateways

## Variable persistence

When an execution completes:

- Input variables are stored locally for reuse in subsequent executions.
- The last result of an element is persisted, including output variables.
- You can execute again with the same input set or modify it to try new values.

## Best practices

- Use a staging cluster or sandbox environment for testing live integrations.
- Mock external API calls and disable production credentials when possible.
- Review results in Operate to confirm behavior and variable mappings.
