---
id: testing
title: Testing
description: "Test implementation of a single BPMN task in Web Modeler."
---

[Test a single task](../../concepts/testing.md) in Web Modeler.

## Task Testing and Play

Task Testing and Play have several significant differences, summarized in the table below. Task Testing is best for when you're implementing a diagram and want to quickly check whether a task is configured correctly. Play is best for when you want to run more formal end-to-end tests with mock data, to check test coverage, and to save test scenarios for reuse.

|                            | Task Testing                        | Play                                        |
| -------------------------- | ----------------------------------- | ------------------------------------------- |
| **Test scope**             | Single task                         | Element, process segment, or entire diagram |
| **Best for**               | Quick implementation verification   | Formal end-to-end testing                   |
| **Data type**              | Live data only                      | Live or mocked data                         |
| **Saves test scenarios**   | No                                  | Yes                                         |
| **Separate mode required** | No, lets you stay in Implement mode | Yes, requires switching to Play mode        |

## Setting up Task Testing

To run Task Testing, you'll need:

- An active Camunda 8.8+ cluster connection
- Process deployment permissions on the target environment

## Testing a task

To use Task Testing:

1. Select and configure the task you want to test.
2. Open the **Test** tab in the bottom panel.
3. Enter the [process variables](../../concepts/variables.md) in the left pane in JSON format.

**Tips for configuring process variables:**

- Use the Variables tab to see available variables from your process.
- Ensure that the task configuration includes any required input variable mappings.
- Ensure that variable types match what your task expects.
- Test with realistic data that represents actual use cases.

4. Click **Test task**.

## Test results

After running a task, you'll see one of the following outcomes:

### Successful execution

When the task completes successfully, the results panel displays the process variables the task executed with.

### Task incident

If an incident occurs during the execution, you will see its details as well as the process variables.

### Error

If the task execution fails due to an error, you will see the response message.

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