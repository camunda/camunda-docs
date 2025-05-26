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

Job workers are external systems that execute jobs for service tasks. In a test, you can mock a job worker to simulate its behavior without implementing the actual worker logic.

When to use it:

- Test process flows without implementing the actual service task logic
- Simulate different outcomes from a service task (success, BPMN errors, failures)
- Verify that your process correctly handles service task results

### Basic job worker mocking

```java
@Test
void shouldCompleteServiceTask() {
    // given: mock a job worker that completes jobs
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

### Complete jobs with variables

```java
@Test
void shouldCompleteServiceTaskWithVariables() {
    // given: mock a job worker that completes jobs with variables
    Map<String, Object> variables = Map.of(
        "emailSent", true,
        "timestamp", "2024-01-01T10:00:00Z"
    );
    processTestContext.mockJobWorker("send-email").thenComplete(variables);

    // when: create a process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the process has the expected variables
    assertThat(processInstance).hasVariables(variables);
}
```

### Throw BPMN errors

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

### Custom job handler

For more complex scenarios, you can provide a custom job handler:

```java
@Test
void shouldUseCustomJobHandler() {
    // given: mock a job worker with custom logic
    processTestContext.mockJobWorker("calculate-discount")
        .withHandler((jobClient, job) -> {
            Map<String, Object> variables = job.getVariablesAsMap();
            double orderAmount = (double) variables.get("orderAmount");
            double discount = orderAmount > 100 ? 0.1 : 0.0;

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
    assertThat(processInstance).hasVariable("discount", 0.1);
}
```

## Mock child processes

Call activities invoke child processes. In a test, you can mock a child process to avoid deploying and executing the actual child process.

When to use it:

- Test parent processes in isolation without their child processes
- Simulate different outcomes from child processes
- Speed up tests by avoiding complex child process execution

### Basic child process mocking

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

### Mock child process with output variables

```java
@Test
void shouldMockChildProcessWithVariables() {
    // given: mock a child process that returns variables
    Map<String, Object> childProcessOutput = Map.of(
        "paymentStatus", "completed",
        "transactionId", "TXN-12345"
    );
    processTestContext.mockChildProcess("payment-process", childProcessOutput);

    // when: create a parent process instance
    ProcessInstanceEvent processInstance = createProcessInstance();

    // then: the parent process receives the child process variables
    assertThat(processInstance).hasVariables(childProcessOutput);
}
```

## Mock DMN decisions

Business rule tasks evaluate DMN decisions. In a test, you can mock a DMN decision to return predefined results without deploying the actual decision table.

When to use it:

- Test processes with business rule tasks without implementing complex decision logic
- Simulate different decision outcomes
- Focus on testing the process flow rather than the decision logic

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
