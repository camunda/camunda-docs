---
id: utilities
title: Utilities
description: "Use utilities to interact with the process instance."
---

There are different utilities that can help you to write your process test.

## Manipulate the clock

The Camunda runtime uses an internal clock to execute process instances and to calculate when a BPMN timer event is due. In a test, you can use `CamundaProcessTestContext` to manipulate the clock.

When to use it:

- Trigger an active BPMN timer event
- Test scenarios that require a specific date or time, for example, a leap year

```java
@Test
void shouldTriggerTimerEvent() {
    // given: a process instance waiting at a BPMN timer event

    // when
    assertThat(processInstance).hasActiveElements("wait_2_days");

    processTestContext.increaseTime(Duration.ofDays(2));

    // then
    assertThat(processInstance).hasCompletedElements("wait_2_days");
}
```

## Mock job workers

You can mock a job worker to simulate its behavior without invoking the actual worker. The mock handles all jobs of the given job type.

When to use it:

- Test the process in isolation from the actual job workers
- Simulate different outcomes of a job worker (success, BPMN error)
- Mock disabled job workers or Connectors

### Mock a job worker

```java
@Test
void shouldCompleteJob() {
    // given: mock a job worker
    processTestContext.mockJobWorker("send-email").thenComplete();

    // when: create a process instance
    ProcessInstanceEvent processInstance = client
        .newCreateInstanceCommand()
        .processDefinitionKey(processDefinitionKey)
        .send()
        .join();

    // then: the process completes successfully
    assertThat(processInstance).isCompleted();
}
```

### Mock a job worker with variables

```java
@Test
void shouldCompleteJobWithVariables() {
    // given: mock a job worker that completes with variables
    Map<String, Object> variables = Map.of(
        "emailSent", true,
        "timestamp", "2024-01-01T10:00:00Z"
    );
    processTestContext.mockJobWorker("send-email").thenComplete(variables);

    // when: create a process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the process has the expected variables
    assertThat(processInstance)
            .isCompleted()
            .hasVariables(variables);
}
```

### Throw BPMN error with an error code

```java
@Test
void shouldThrowBpmnError() {
    // given: mock a job worker that throws a BPMN error
    processTestContext.mockJobWorker("validate-order")
        .thenThrowBpmnError("INVALID_ORDER");

    // when: create a process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the process follows the error event path
    assertThat(processInstance).hasCompletedElements("handle-invalid-order");
}
```

### Throw BPMN errors with an error code and variables

```java
@Test
void shouldThrowBpmnErrorWithVariables() {
    Map<String, Object> variables = Map.of(
            "invalidItem", "Well done steak"
    );

    // given: mock a job worker that throws a BPMN error
    processTestContext.mockJobWorker("validate-order")
        .thenThrowBpmnError("INVALID_ORDER", variables);

    // when: create a process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: verify that the process instance handled the BPMN error
    assertThat(processInstance)
            .hasCompletedElements("handle-invalid-order")
            .hasVariables(variables);
}
```

:::note
When throwing BPMN errors with variables, make sure that you map them using an output expression or they won't be available in the parent scope.
:::

### Custom job handler

For more complex scenarios, you can implement a custom job handler using `withHandler`:

```java
@Test
void shouldCompleteJobWithCustomHandler() {
    // given: mock a job worker with custom logic
    processTestContext.mockJobWorker("calculate-discount")
        .withHandler((jobClient, job) -> {
            final Map<String, Object> variables = job.getVariablesAsMap();
            final double orderAmount = (double) variables.get("orderAmount");
            final double discount = orderAmount > 100 ? 0.1 : 0.0;

            jobClient.newCompleteCommand(job)
                .variable("discount", discount)
                .send()
                .join();
        });

    // when: create a process instance with order amount
    ProcessInstanceEvent processInstance = client
        .newCreateInstanceCommand()
        .processDefinitionKey(processDefinitionKey)
        .variable("orderAmount", 150.0)
        .send()
        .join();

    // then: the discount is calculated correctly
    assertThat(processInstance)
            .isCompleted()
            .hasVariable("discount", 0.1);
}
```

## Mock child processes

You can mock a child process for a call activity to simulate its output without executing the actual child process.
The mock deploys a dummy process with the given process ID that returns the given variables.

When to use it:

- Test the parent process in isolation from the actual child process
- Simulate different outcomes of a child process
- Mock a non-existing child process

### Mock a child process

```java
@Test
void shouldMockChildProcess() {
    // given: mock a child process
    processTestContext.mockChildProcess("payment-process");

    // when: create a parent process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the parent process completes without executing the actual child process
    assertThat(processInstance).isCompleted();
}
```

### Mock a child process with variables

```java
@Test
void shouldMockChildProcessWithVariables() {
    // given: mock a child process that returns variables
    Map<String, Object> variables = Map.of(
        "paymentStatus", "completed",
        "transactionId", "TXN-12345"
    );
    processTestContext.mockChildProcess("payment-process", variables);

    // when: create a parent process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the parent process receives the child process variables
    assertThat(processInstance)
            .isCompleted()
            .hasVariables(childProcessOutput);
}
```

## Mock DMN decisions

You can mock a DMN decision for a business rule task to simulate its output without evaluating the actual DMN decision.
The mock deploys a dummy DMN decision with the given decision ID that returns the given variables.

When to use it:

- Test the process with the business rule task in isolation from the actual DMN decision
- Simulate different outcomes of a DMN decision
- Mock a non-existing DMN decision

```java
@Test
void shouldMockDmnDecision() {
    // given: mock a DMN decision
    Map<String, Object> decisionResult = Map.of(
        "approved", true,
        "riskLevel", "low",
        "creditLimit", 5000
    );
    processTestContext.mockDmnDecision("credit-check-decision", decisionResult);

    // when: create a process instance
    ProcessInstanceEvent processInstance = client
        .newCreateInstanceCommand()
        .processDefinitionKey(processDefinitionKey)
        .variable("customerId", "CUST-123")
        .send()
        .join();

    // then: the process receives the mocked decision result
    assertThat(processInstance).hasVariables(decisionResult);
}
```

:::note
When mocking DMN decisions, the mock replaces any existing decision with the same ID. The mocked decision returns the specified variables regardless of the input provided to the business rule task.
:::

## Complete jobs

Sometimes you need to complete a job that is already active in a process instance without mocking the job worker.

When to use it:

- Complete an active job to continue process execution
- Test process behavior from a specific state

:::note
Job completion methods wait for the job to become active before completing it. If the job is not found within a timeout period, the test will fail.
:::

### Complete a job

```java
@Test
void shouldCompleteJob() {
    // given: a process instance with an active job
    ProcessInstanceEvent processInstance = createProcessInstance();

    assertThat(processInstance).hasActiveElements("send-notification");

    // when: complete the job
    processTestContext.completeJob("send-email");

    // then: the process continues
    assertThat(processInstance)
            .isCompleted()
            .hasCompletedElements("send-notification");
}
```

### Complete a job with variables

```java
@Test
void shouldCompleteJobWithVariables() {
    // given: a process instance with an active job
    ProcessInstanceEvent processInstance = createProcessInstance();

    // when: complete the job with variables
    Map<String, Object> variables = Map.of(
        "notification-sent", true,
        "recipients", List.of("user1@example.com", "user2@example.com")
    );
    processTestContext.completeJob("send-notification", variables);

    // then: the process has the new variables
    assertThat(processInstance)
            .isCompleted()
            .hasVariables(variables);
}
```

## Throw BPMN errors from jobs

You can throw BPMN errors from active jobs to test error handling paths in your process.

When to use it:

- Test error boundary events without mocking the job worker
- Simulate failures in running process instances
- Verify error handling logic

:::note
Error methods wait for the job to become active before raising an error. If the job is not found within a timeout period, the test will fail.
:::

### Throw BPMN error

```java
@Test
void shouldThrowBpmnError() {
    // given: a process instance with an active job
    ProcessInstanceEvent processInstance = createProcessInstance();
    assertThat(processInstance).hasActiveElements("validate-user");

    // when: throw a BPMN error from the job
    processTestContext.throwBpmnErrorFromJob("validate-job", "VALIDATION_FAILED");

    // then: the error is caught and handled
    assertThat(processInstance)
            .isCompleted()
            .hasCompletedElements("handle-validation-error");
}
```

### Throw BPMN error with variables

```java
@Test
void shouldThrowBpmnErrorWithVariables() {
    // given: a process instance with an active job
    ProcessInstanceEvent processInstance = createProcessInstance();

    // when: throw a BPMN error with variables
    Map<String, Object> errorVariables = Map.of(
        "error-message", "Invalid customer data",
        "error-code", "ERR_VALIDATION_001"
    );
    processTestContext.throwBpmnErrorFromJob("validate-data", "VALIDATION_FAILED", errorVariables);

    // then: the error handler receives the variables
    assertThat(processInstance)
            .isCompleted()
            .hasVariables(errorVariables);
}
```

:::note
When throwing BPMN errors with variables, make sure that you map them using an output expression or they won't be available in the parent scope.
:::

## Complete user tasks

You can mock a User Task to simulate manual input programmatically.

When to use it:

- Complete tasks that require manual input.
- Verify edge cases resulting from user errors.

:::note
User task completion methods wait for the user task to become active before completing it. If the user task is not found within a timeout period, the test will fail.
:::

### Complete user task

```java
@Test
void shouldCompleteUserTaskByName() {
    // given: a process instance with an active user task
    ProcessInstanceEvent processInstance = createProcessInstance();
    assertThat(processInstance).hasActiveElements("approve-request");

    // when: complete the user task by name
    processTestContext.completeUserTask("Approve Request");

    // then: the process continues
    assertThat(processInstance)
            .isCompleted()
            .hasCompletedElements("approve-request");
}
```

### Complete user task with variables

```java
@Test
void shouldCompleteUserTaskWithVariables() {
    // given: a process instance with an active user task
    ProcessInstanceEvent processInstance = createProcessInstance();

    // when: complete the user task with variables
    Map<String, Object> variables = Map.of(
        "approved", true,
        "comment", "Request approved by manager",
        "approvedAmount", 5000.00
    );
    processTestContext.completeUserTask("Approve Request", variables);

    // then: the process has the form data
    assertThat(processInstance)
            .isCompleted()
            .hasVariables(variables);
}
```

### Complete user task by selector

For more precise user task selection, you can use one of the following selectors (for more information see [User Task Assertions](/apis-tools/testing/assertions/#user-task-assertions):

- `UserTaskSelectors.byTaskName(String taskName)`
- `UserTaskSelectors.byTaskName(String taskName, long processInstanceKey)`
- `UserTaskSelectors.byElementId(String elementId)`
- `UserTaskSelectors.byElementId(String elementId, long processInstanceKey)`

```java
@Test
void shouldCompleteUserTaskByElementId() {
    // given: a process instance with user tasks
    ProcessInstanceEvent processInstance = createProcessInstance();

    // when: complete a specific user task by element ID
    processTestContext.completeUserTask(
        UserTaskSelectors.byElementId("approve-request-task")
    );

    // then: the correct task is completed
    assertThat(processInstance).hasCompletedElements("approve-request-task");
}
```

### Complete user task by selector with variables

```java
@Test
void shouldCompleteUserTaskByCustomSelector() {
    // given: multiple process instances with user tasks
    ProcessInstanceEvent targetInstance = createProcessInstance();
    ProcessInstanceEvent otherInstance = createProcessInstance(); // another instance

    // when: complete user task in specific instance
    Map<String, Object> variables = Map.of("decision", "approved");
    processTestContext.completeUserTask(
        UserTaskSelectors.byTaskName("Approve Request", targetInstance.getProcessInstanceKey()),
        variables
    );

    // then: only the target instance is affected
    assertThat(targetInstance)
            .isCompleted()
            .hasVariable("decision", "approved");
    assertThat(otherInstance)
            .isActive()
            .hasVariables(Collections.emptyMap());
}
```
