---
id: testing
title: Testing
description: "Test implementation of a single BPMN task in Desktop Modeler."
---

[Test a single task](../../concepts/testing.md) in Desktop Modeler.

## Prerequisites

Task testing requires a REST connection to Camunda 8.8+ cluster. gRPC connections are not supported.

When configuring a connection, make sure to **Remember credentials** or task testing won't be able to deploy the process.

## Testing a single activity

Select a task that you want to test, then go to the Test tab in the bottom panel.

![Test tab](./img/testing/testing-tab.png)

Configure the [input variables](../../concepts/variables.md). The initial values are based on the task's [input mappings](../../concepts/variables.md#input-mappings). 

As you type, the editor provides autocompletion for all the variables available in the scope, as well as the output variables from the tasks you previously executed.

![Test tab](./img/testing/testing-input-variables.png)

Click the **Test Task** button to execute the selected activity. 

## Test results

After running a task, you'll see one of the following outcomes:

### Successful execution

When the task completes successfully, the results panel displays the process variables the task executed with.

![Test tab](./img/testing/testing-success.png)

### Task incident

If an incident occurs during the execution, you will see its details as well as the process variables.

![Test result with incident](./img/testing/testing-incident.png)

### Error

If the task execution fails due to an error, you will see the response message.

![Test error result](./img/testing/testing-incident.png)