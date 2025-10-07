---
id: task-testing
title: "Task Testing"
description: "Test implementation of a single BPMN task."
---

You can run a single BPMN task directly from the modeler to test your implementation, without the overhead of executing an entire process. Get immediate feedback on your task logic, variable mappings, and configuration, right where you're modeling.

Task testing runs a single task, on the engine, exactly as it would later run during process execution:

* You define the process context (process variables) the task is executed within
* Inputs are mapped in accordance with defined input mappings
* Actual task behaviors is executed by the engine
* Outputs are mapped in accordance with defined output mappings
* The results (updated process variables) are displayed to you so you can inspect them

- Input/output variable mappings as configured
- Process context and variable scope
- Exact task configuration and implementation details
- Connection to the preceding and following tasks in the flow

**Important:** Task testing executes tasks with live data. Any configured actions (emails, API calls, database changes, payments) will actually run. Use caution in production environments.

## Prerequesites

To test a task, you need a connection to an active Camunda 8.8 or above orchestration cluster. The entire process will be deployed automatically prior to running the test. The connection requirements for Desktop Modeler and Web Modeler are slightly different; see the relevant pages for details.

Once you've run a test, you can view the deployed instance in Operate for further information about task execution.

## Supported elements

Task testing supports running a single BPMN task. It doesn't support subprocesses, call activities or events.

## Related

- [Test a task in Web Modeler](../../components/modeler/web-modeler/task-testing.md)
- [Test a task in Desktop Modeler](../../components/modeler/desktop-modeler/task-testing.md)