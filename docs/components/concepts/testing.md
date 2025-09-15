---
id: testing
title: "Testing"
description: "Test implementation of a single BPMN task."
---

You can run a single BPMN task directly from the modeler to test your implementation, without the overhead of executing an entire process. Get immediate feedback on your task logic, variable mappings, and configuration, right where you're modeling.

Task testing runs your task within the actual process diagram where it's modeled, preserving:

- Input/output variable mappings as configured
- Process context and variable scope
- Exact task configuration and implementation details
- Connection to the preceding and following tasks in the flow

**Important:** Task testing executes tasks with live data. Any configured actions (emails, API calls, database changes, payments) will actually run. Use caution in production environments.

To test a task, you need a connection to an orchestration cluster or other deployment target. The entire process will be deployed automatically prior to running the test. The connection requirements for Desktop Modeler and Web Modeler are slightly different; see the relevant pages for details.

Once you've run a test, you can view the deployed instance in Operate for further information about task execution.

## Related
- [Test a task in Web Modeler](../../components/modeler/web-modeler/testing.md)
- [Test a task in Desktop Modeler](../../components/modeler/desktop-modeler/testing.md)