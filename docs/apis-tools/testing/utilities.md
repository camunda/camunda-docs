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

:::tip
If you trigger a BPMN timer event, you should assert that the BPMN timer event is active before manipulating the clock.
Otherwise, you may manipulate the clock too early and the BPMN timer event is not triggered.
:::

## Mock job workers

You can mock a job worker to simulate its behavior without invoking the actual worker. The mock handles all jobs of the given job type.

When to use it:

- Test the process in isolation from the actual job workers
- Simulate different outcomes of a job worker (success, BPMN error)
- Mock disabled job workers or Connectors

:::tip
If you start the process application in your test case, you
should [disable the job workers](../spring-zeebe-sdk/configuration.md#disable-a-job-worker) to avoid interferences with
the mocks, for example, by setting the following configuration:

```java
@SpringBootTest(properties = {"camunda.client.worker.defaults.enabled=false"})
@CamundaSpringProcessTest
class MyProcessTest { .. }
```

:::

### Complete job

The mock completes jobs with/without variables.

```java
@Test
void shouldCompleteJob() {
    // given: mock job worker for the job type "send-email"
    // 1) Complete jobs without variables
    processTestContext.mockJobWorker("send-email").thenComplete();

    // 2) Complete jobs with variables
    final Map<String, Object> variables = Map.of(
        "emailSent", true,
        "timestamp", "2024-01-01T10:00:00Z"
    );
    processTestContext.mockJobWorker("send-email").thenComplete(variables);

    // when: create a process instance
    // then: verify that the process instance completed all tasks
}
```

### Throw BPMN error

The mock throws BPMN errors for jobs with the given error code and with/without variables.

```java
@Test
void shouldThrowBpmnError() {
    // given: mock job worker for the job type "validate-order"
    // 1) Throw BPMN errors with error code "INVALID_ORDER"
    processTestContext.mockJobWorker("validate-order").thenThrowBpmnError("INVALID_ORDER");

    // 2) Throw BPMN errors with error code "INVALID_ORDER" and variables
    final Map<String, Object> variables = Map.of(
        "reason", "The order exceeds the item limit."
    );
    processTestContext
        .mockJobWorker("validate-order")
        .thenThrowBpmnError("INVALID_ORDER", variables);

    // when: create a process instance
    // then: verify that the process instance handled the BPMN error
}
```

### Custom handler

You can implement a custom handler to mock more complex behaviors.

```java
@Test
void shouldUseCustomHandler() {
    // given: mock job worker for the job type "calculate-discount"
    processTestContext
        .mockJobWorker("calculate-discount")
        .withHandler(
            (jobClient, job) -> {
                final Map<String, Object> variables = job.getVariablesAsMap();
                final double orderAmount = (double) variables.get("orderAmount");
                final double discount = orderAmount > 100 ? 0.1 : 0.0;

                jobClient.newCompleteCommand(job).variable("discount", discount).send().join();
            });

    // when: create a process instance
    // then: verify that the process instance has the expected variables
}
```

## Mock child processes

You can mock a child process for a call activity to simulate its output without executing the actual child process.
The mock deploys a dummy process with the given process ID that returns the given variables.

When to use it:

- Test the parent process in isolation from the actual child process
- Simulate different outcomes of a child process
- Mock a non-existing child process

```java
@Test
void shouldMockChildProcess() {
    // given: mock child process with the process ID "payment-process"
    // 1) Complete the child process without variables
    processTestContext.mockChildProcess("payment-process");

    // 2) Complete the child process with variables
    final Map<String, Object> variables = Map.of(
        "paymentStatus", "completed",
        "transactionId", "TXN-12345"
    );
    processTestContext.mockChildProcess("payment-process", variables);

    // when: create a process instance
    // then: verify that the process instance completed the call activity
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
    // given: mock DMN decision with the decision ID "credit-check-decision"
    final Map<String, Object> variables = Map.of(
        "approved", true,
        "riskLevel", "low",
        "creditLimit", 5000
    );
    processTestContext.mockDmnDecision("credit-check-decision", variables);

    // when: create a process instance
    // then: verify that the process instance completed the business rule task
}
```

## Complete jobs

You can complete an active job to simulate the behavior of a job worker without invoking the actual worker.
The command waits for the first job with the given job type and completes it. If no job exists, the command fails.

When to use it:

- Test the process with full control over the job completion
- Complete a repeated task with different outcomes

```java
@Test
void shouldCompleteJob() {
    // given: a process instance is waiting at a task

    // when: complete the job with type "send-notification"
    // 1) Without variables
    processTestContext.completeJob("send-notification");

    // 2) With variables
    final Map<String, Object> variables = Map.of(
        "notification-sent", true,
        "recipients", List.of("user1@example.com", "user2@example.com")
    );
    processTestContext.completeJob("send-notification", variables);

    // then: verify that the process instance completed the task
}
```

## Throw BPMN errors from jobs

You can throw a BPMN error from an active job to simulate the behavior of a job worker without invoking the actual worker.
The command waits for the first job with the given job type and throw the BPMN error. If no job exists, the command fails.

When to use it:

- Test the error paths in the process
- Simulate different behaviors of a repeated task (success, BPMN error)

```java
@Test
void shouldThrowBpmnErrorFromJob() {
    // given: a process instance is waiting at a task

    // when: throw a BPMN error for the job with type "validate-data"
    // 1) With error code "VALIDATION_FAILED" and no variables
    processTestContext.throwBpmnErrorFromJob("validate-data", "VALIDATION_FAILED");

    // 2) With error code "VALIDATION_FAILED" and variables
    final Map<String, Object> variables = Map.of(
        "error-message", "Invalid customer data",
        "error-code", "ERR_VALIDATION_001"
    );
    processTestContext.throwBpmnErrorFromJob("validate-data", "VALIDATION_FAILED", variables);

    // then: verify that the process instance handled the error
}
```

## Complete user tasks

You can complete a user task to simulate the user behavior in Tasklist. The command waits for the first user task and completes it.
If no user task exists, the command fails.

You can identify the user task by name or using a [UserTaskSelector](assertions.md#user-task-assertions).

When to use it:

- Test a process with user tasks

```java
@Test
void shouldCompleteUserTask() {
    // given: a process instance is waiting at a user task

    // when: complete the user task
    // 1) With name "Approve Request"
    final Map<String, Object> variables = Map.of(
        "approved", true,
        "comment", "Request approved by manager",
        "approvedAmount", 5000.00
    );
    processTestContext.completeUserTask("Approve Request", variables);

    // 2) With selector by element id "task_approveRequest"
    processTestContext.completeUserTask(byElementId("task_approveRequest"), variables);

    // then: verify that the process instance is completed
}
```
