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

:::tip
If you trigger a BPMN timer event, you should assert that the BPMN timer event is active before manipulating the clock.
Otherwise, you may manipulate the clock too early and the BPMN timer event is not triggered.
:::

### Increase time

You can increase the time by a given duration. As a result, the clock is moved forward (i.e., in the future).

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

### Set time

You can set the clock to a given date and time.

```java
@Test
void shouldCreateProcessInstanceInTheMorning() {
    // given
    processTestContext.setTime(Instant.parse("2025-10-01T08:00:00Z"));

    // when: create a process instance
    // then: verify the behavior at the given time
}
```

## Mock job workers

You can mock a job worker to simulate its behavior without invoking the actual worker. The mock handles all jobs of the given job type.

When to use it:

- Test the process in isolation from the actual job workers
- Simulate different outcomes of a job worker (success, BPMN error)
- Mock disabled job workers or Connectors

:::tip
If you start the process application in your test case, you
should [disable the job workers](../camunda-spring-boot-starter/configuration.md#disable-a-job-worker) to avoid interferences with
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

### Complete with example data

The mock completes jobs with [example data](/components/modeler/data-handling.md#defining-example-data) that is defined
at the related BPMN element. If the BPMN element has no example data, the mock completes the job without variables.

```java
@Test
void shouldCompleteJobWithExampleData() {
    // given: mock job worker for the job type "fetch-weather-data"
    processTestContext.mockJobWorker("fetch-weather-data").thenCompleteWithExampleData();

    // when: create a process instance
    // then: verify that the process instance completed all tasks
}
```

:::tip

Add example data during modeling to provide context and make writing FEEL expressions easier. By using the same example
data for mocks, you keep the data in the BPMN process itself and avoid repeating them in the process tests. This can
simplify your tests and reducing the maintenance effort.

:::

### Throw BPMN error

The mock throws BPMN errors for jobs with the given error code and optional error message and variables.

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

    // 3) Throw BPMN errors with error code, error message, and variables
    processTestContext
        .mockJobWorker("validate-order")
        .thenThrowBpmnError("INVALID_ORDER", "Order validation failed", variables);

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

### Inspect mock invocations

You can inspect the invocations of a mock job worker to verify how many jobs were handled and to get the details of each
job.

```java
@Test
void shouldInspectMockInvocations() {
    // given: mock job worker for the job type "send-email"
    final JobWorkerMock mockJobWorker =
            processTestContext.mockJobWorker("send-email").thenComplete();

    // when: create a process instance that triggers the job worker

    // then: verify the number of invocations
    assertThat(mockJobWorker.getInvocations()).isEqualTo(1);
    // and: inspect the details of each invocation
    assertThat(mockJobWorker.getActivatedJobs())
        .hasSize(1)
        .flatExtracting(job -> job.getVariablesAsMap().entrySet())
        .contains(entry("receiver", "Zee"), entry("subject", "Greetings"));
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

Identify the job by its job type or using a [JobSelector](#job-selector). You can pass variables or complete the job
with the [example data](/components/modeler/data-handling.md#defining-example-data) from the related BPMN element.

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

    // 3) With example data from the BPMN element
    processTestContext.completeJobWithExampleData("send-notification");

    // 4) With job selector by element ID "task_sendNotification"
    processTestContext.completeJob(JobSelectors.byElementId("send_notification_task"));

    // then: verify that the process instance completed the task
}
```

### Ad-hoc sub-process jobs

You can simulate the behavior of
an [ad-hoc sub-process job worker](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md#job-worker-implementation),
for example, an AI agent, and control the execution of the ad-hoc sub-process. The job completion allows to
activate an element in the ad-hoc sub-process or to fulfill the completion condition.

```java
@Test
void shouldCompleteJobOfAdHocSubProcess() {
    // given: the ad-hoc sub-process is active

    // when: complete the job of the ad-hoc sub-process
    // 1) With activating an element with variables
    camundaProcessTestContext.completeJobOfAdHocSubProcess(
        JobSelectors.byElementId("ad-hoc-sub-process"),
        result -> result.activateElement("search-knowledge-base").variable("query", "launch rockets"));

    // 2) With job variables (for the ad-hoc sub-process)
    camundaProcessTestContext.completeJobOfAdHocSubProcess(
        JobSelectors.byElementId("ad-hoc-sub-process"),
        Map.of("agent", agentContext),
        result -> result.activateElement("search-knowledge-base").variable("query", "launch rockets"));

    // 3) With fulfilling the completion condition
    camundaProcessTestContext.completeJobOfAdHocSubProcess(
        JobSelectors.byElementId("ad-hoc-sub-process"),
        result -> result.completionConditionFulfilled(true));

    // then: verify that the ad-hoc sub-process completed the task
}
```

### User task listener jobs

You can simulate the behavior of
a [user task listener job worker](/components/concepts/user-task-listeners.md#implement-a-user-task-listener). The job
completion allows to correct the user task data or to deny the user task lifecycle transition.

```java
@Test
void shouldCompleteJobOfUserTaskListener() {
    // given: the process instance is waiting at a user task

    // when: complete the job of the user task listener
    // 1) With correcting user task data
    processTestContext.completeJobOfUserTaskListener(
        JobSelectors.byElementId("approve_request_task"),
        result -> result.correctAssignee("me").correctPriority(100));

    // 2) With denying the user task lifecycle transition
    processTestContext.completeJobOfUserTaskListener(
        JobSelectors.byElementId("approve_request_task"),
        result -> result.deny(true).deniedReason("Policy violation"));

    // then: verify that the user task is completed
}
```

## Throw BPMN errors from jobs

You can throw a BPMN error from an active job to simulate the behavior of a job worker without invoking the actual worker.
The command waits for the first job with the given job type and throw the BPMN error. If no job exists, the command fails.

Identify the job by its job type or using a [JobSelector](#job-selector). Optionally, you can pass variables and an
error message with the BPMN error.

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

    // 3) With error code, error message, and variables
    processTestContext.throwBpmnErrorFromJob(
        "validate-data",
        "VALIDATION_FAILED",
        "Data validation failed due to missing required fields",
        variables);

    // 4) With job selector by element ID "validate_data_task"
    processTestContext.throwBpmnErrorFromJob(
        JobSelectors.byElementId("validate_data_task"),
        "VALIDATION_FAILED");

    // then: verify that the process instance handled the error
}
```

## Complete user tasks

You can complete a user task to simulate the user behavior in Tasklist. The command waits for the first user task and
completes it. If no user task exists, the command fails.

Identify the user task by its BPMN element ID or using a [UserTaskSelector](#user-task-selector). You can pass variables
or complete the user task with the [example data](/components/modeler/data-handling.md#defining-example-data) from the
related BPMN element.

When to use it:

- Test a process with user tasks

```java
@Test
void shouldCompleteUserTask() {
    // given: a process instance is waiting at a user task

    // when: complete the user task
    // 1) With element ID "task_approveRequest"
    final Map<String, Object> variables = Map.of(
        "approved", true,
        "comment", "Request approved by manager",
        "approvedAmount", 5000.00
    );
    processTestContext.completeUserTask("task_approveRequest", variables);

    // 2) With selector by task name "Approve Request"
    processTestContext.completeUserTask(
        UserTaskSelectors.byTaskName("Approve Request"),
        variables);

    // 3) With example data from the BPMN element
    processTestContext.completeUserTaskWithExampleData(
        UserTaskSelectors.byElementId("task_approveRequest"));

    // then: verify that the process instance is completed
}
```

## Update variables

You can update the variables of a process instance, or local variables of a BPMN element, for example, to trigger a BPMN
conditional event.

To update the local variables of a BPMN element, you need to identify the element using
an [ElementSelector](#element-selector).

```java
@Test
void shouldTriggerConditionalEvent() {
    // given: a process instance is waiting at the conditional event

    // when: update the variables to trigger the conditional event
    // 1) Update process instance variables
    final Map<String, Object> variables = Map.of(
        "priority", 80,
        "riskLevel", "high"
    );
    processTestContext.updateVariables(
        ProcessInstanceSelectors.byKey(processInstanceKey),
        variables);

    // 2) Update local variables of the element with ID "sub-process"
    processTestContext.updateLocalVariables(
        ProcessInstanceSelectors.byKey(processInstanceKey),
        ElementSelectors.byId("sub-process"),
        variables);

    // then: verify that the conditional event is completed
}
```

## Resolve incidents

You can resolve an active incident. Use the [IncidentSelector](#incident-selector) to identify the incident based on
different criteria, for example, by the BPMN element ID where the incident occurred.

If the incident is caused by a job, the command increases the job retries by one before resolving the incident. If the
incident is caused by a missing variable, you should [update the variables](#update-variables) before resolving the
incident.

```java
@Test
void shouldResolveIncident() {
    // given: a process instance has an active incident

    // when: resolve the incident at the element with ID "validate-data"
    processTestContext.resolveIncident(IncidentSelectors.byElementId("validate-data"));

    // then: verify that the element is completed
}
```

## Selectors

CPT provides selectors to identify entities such as jobs, user tasks, process instances, and more based on different
criteria. You can use selectors in both utilities and assertions to target the entities you want to interact
with or verify. The selector targets the first matching entity.

CPT provides predefined selectors for common use cases. You can combine multiple selectors using `.and()` to create more
specific selection criteria.

```java
// Combine job selectors by job type and process instance key
processTestContext.completeJob(
    JobSelectors.byJobType("send-notification")
        .and(JobSelectors.byProcessInstanceKey(processInstanceKey))
);
```

Alternatively, you can implement your own custom selector when you need specialized selection logic.

```java
// Implement a custom selector to select a user task by its assignee
private static UserTaskSelector byAssignee(String assignee) {
    return new UserTaskSelectorByAssignee(assignee);
}

private static final class UserTaskSelectorByAssignee implements UserTaskSelector {

    private final String assignee;

    public UserTaskSelectorByAssignee(String assignee) {
        this.assignee = assignee;
    }

    @Override
    public boolean test(final UserTask userTask) {
        return assignee.equals(userTask.getAssignee());
    }

    @Override
    public String describe() {
        return "assignee: " + assignee;
    }

    @Override
    public void applyFilter(final UserTaskFilter filter) {
        filter.assignee(assignee);
    }
}
```

### Decision selector

You can use a decision selector to identify a DMN decision evaluation based on different criteria, such as decision ID
or decision name.

Predefined decision selectors are available in the `io.camunda.process.test.api.assertions.DecisionSelectors` class.

```java
// Assert the evaluation of a DMN decision with the ID "credit-score"
assertThatDecision(DecisionSelectors.byId("credit-score")).hasOutput(750);
```

### Element selector

You can use an element selector to identify a BPMN element based on different criteria, such as element ID or element
name.

Predefined element selectors are available in the `io.camunda.process.test.api.assertions.ElementSelectors` class.

```java
// Assert the BPMN element with the ID "approve_request_task"
assertThat(processInstance).hasActiveElements(ElementSelectors.byId("approve_request_task"));

// Assert the BPMN element with the name "Approve Request"
assertThat(processInstance).hasActiveElements(ElementSelectors.byName("Approve Request"));
```

### Incident selector

You can use an incident selector to identify an incident based on different criteria, such as BPMN element ID or process
instance key.

Predefined incident selectors are available in the `io.camunda.process.test.api.assertions.IncidentSelectors` class.

```java
// Resolve an incident by the BPMN element ID "approve_request_task"
processTestContext.resolveIncident(IncidentSelectors.byElementId("approve_request_task"));
```

### Job selector

You can use a job selector to identify a job based on different criteria, such as job type, BPMN element ID, or process
instance key.

Predefined job selectors are available in the `io.camunda.process.test.api.assertions.JobSelectors` class.

```java
// Complete a job by its BPMN element ID
processTestContext.completeJob(JobSelectors.byElementId("send_notification_task"));

// Throw a BPMN error from a job by its job type
processTestContext.throwBpmnErrorFromJob(JobSelectors.byJobType("validate-data"), "VALIDATION_FAILED");
```

### Process instance selector

You can use a process instance selector to identify a process instance based on different criteria, such as process
instance key or BPMN process ID.

Predefined process instance selectors are available in the
`io.camunda.process.test.api.assertions.ProcessInstanceSelectors` class.

```java
// Assert a process instance by its process instance key
assertThatProcessInstance(ProcessInstanceSelectors.byKey(processInstanceKey)).isCreated();
```

### User task selector

You can use a user task selector to identify a user task based on different criteria, such as element ID, task name, or
process instance key.

Predefined user task selectors are available in the `io.camunda.process.test.api.assertions.UserTaskSelectors` class.

```java
// Complete a user task by its task name
processTestContext.completeUserTask(UserTaskSelectors.byTaskName("Approve Request"), variables);
```
