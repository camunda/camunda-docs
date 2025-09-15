---
id: testing
title: Testing
description: "Test implementation of a single BPMN task in Web Modeler."
---

[Test a single task](../../concepts/testing.md) in Web Modeler.

## Task Tester and Play

Task Tester and Play have several significant differences, summarized in the table below. Task Tester is best for when you're implementing a diagram and want to quickly check whether a task is configured correctly. Play is best for when you want to run more formal end-to-end tests with mock data, to check test coverage, and to save test scenarios for reuse.

| | Task Tester | Play |
|---------|-------------|------|
| **Test scope** | Single task | Element, process segment, or entire diagram |
| **Best for** | Quick implementation verification | Formal end-to-end testing |
| **Data type** | Live data only | Live or mocked data |
| **Saves test scenarios** | No | Yes |
| **Separate mode required** | No, lets you stay in Implement mode | Yes, requires switching to Play mode |

## Setting up Task Tester

To run Task Tester, you'll need:
- An active Camunda 8.8+ cluster connection
- Process deployment permissions on the target environment
- A configured task with appropriate input/output variable mappings

## Testing a task

To use Task Tester:

1. Select and configure the task you want to test.
2. Open the **Test** tab in the bottom panel.
3. Enter the input variables in the left pane in JSON format.

**Tips for configuring input variables:**
- Use the Variables tab to see available variables from your process.
- Ensure that the task configuration includes any required input variable mappings.
- Ensure that variable types match what your task expects.
- Test with realistic data that represents actual use cases.

4. Click **Test task**.

## Understanding the results

The status of deployment and execution will be shown above the Results pane:

- **Successful execution:** Output variables appear in the Results pane.
- **Failed execution:** Error details and incident information are displayed.
- **Partial success:** Task completes without technical errors but produces unexpected results, such as incorrect variable values or actions that don't behave as intended.

Click **View in Operate** to see complete execution details, logs, and process instance information.

To reset the input variables to the preceding values, or to clear the Results area, click the **Refresh** button next to the respective pane name.

## Troubleshooting common issues

### Task fails with incident
- Check that variable mappings match expected input types.
- Verify that required variables are provided.
- Review the task configuration (connectors, scripts, etc.).

### Deployment fails
- Ensure the cluster connection is active.
- Verify your deployment permissions.
- Check for BPMN validation errors.

### Variables don't appear
- Confirm that variable mappings are configured on the task.
- Check that the input variables match the expected names and types.

# Test a task in Desktop Modeler

## Setting up Task Tester

## Using Task Tester