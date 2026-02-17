---
id: assertions
title: Assertions
description: "Use assertions to verify the process instance state."
---

The class `CamundaAssert` is the entry point for all assertions. It is based on [AssertJ](https://github.com/assertj/assertj) and [Awaitility](http://www.awaitility.org/).

The assertions follow the style: `assertThat(object_to_test)` + expected property.

Use the assertions by adding the following static import in your test class:

```java
import static io.camunda.process.test.api.CamundaAssert.*;
```

:::info Assertions are blocking
Camunda executes BPMN processes asynchronously. For testing, this means that there might be a delay between creating a process instance and reaching the expected state.

The assertions handle the asynchronous behavior and wait until the expected property is fulfilled. Only if the property is not fulfilled within the given time, the assertion fails.
:::

:::tip
CPT provides the most common assertions. However, if you miss an assertion you can implement a [custom assertion](#custom-assertions) yourself.
:::

## Configuration

Assertions can be configured globally using `CamundaAssert`.

### Assertion timeout

By default, assertions wait 10 seconds for the expected property to be fulfilled. You can change the time globally in `CamundaAssert`.

For example, the following sets the timeout to 1 minute:

```java
CamundaAssert.setAssertionTimeout(Duration.ofMinutes(1));
```

### Element selector

By default, the element instance assertions identify the BPMN elements by their ID. You can change
the [ElementSelector](utilities.md#element-selector) globally in `CamundaAssert`.

For example, the following identifies the BPMN elements by their name:

```java
CamundaAssert.setElementSelector(ElementSelectors::byName);
```

## Process instance assertions

You can verify the process instance state and other properties using `CamundaAssert.assertThat()` or
`CamundaAssert.assertThatProcessInstance()`. Use the process instance creation event or
a [ProcessInstanceSelector](utilities.md#process-instance-selector) to identify the process instance.

### With process instance event

Use the creation event of the create instance command to identify the process instance:

```java
// given/when
ProcessInstanceEvent processInstance =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId("my-process")
        .latestVersion()
        .send()
        .join();

// then
assertThat(processInstance).isActive();
```

### With process instance result

Use the result event of the create instance command to identify the process instance:

```java
// given/when
ProcessInstanceResult processInstance =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId("my-process")
        .latestVersion()
        .withResult()
        .send()
        .join();

// then
assertThat(processInstance).isActive();
```

### With process instance selector

Use a [ProcessInstanceSelector](utilities.md#process-instance-selector) to identify the process instance.

```java
// by process instance key
assertThatProcessInstance(ProcessInstanceSelectors.byKey(processInstanceKey)).isActive();

// by process ID
assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("my-process")).isActive();
```

### isActive

Assert that the process instance is active. The assertion fails if the process instance is completed, terminated, or not created.

```java
assertThat(processInstance).isActive();
```

### isCompleted

Assert that the process instance is completed. The assertion fails if the process instance is active, terminated, or not created.

```java
assertThat(processInstance).isCompleted();
```

### isTerminated

Assert that the process instance is terminated. The assertion fails if the process instance is active, completed, or not created.

```java
assertThat(processInstance).isTerminated();
```

### isCreated

Assert that the process instance is created and either active, completed, or terminated. The assertion fails if the process instance is not created.

```java
assertThat(processInstance).isCreated();
```

### hasActiveIncidents

Assert that the process instance has at least one active incident. The assertion fails if there is no active incident.

```java
assertThat(processInstance).hasActiveIncidents();
```

### hasNoActiveIncidents

Assert that the process instance has no active incidents. The assertion fails if there is any active incident.

```java
assertThat(processInstance).hasNoActiveIncidents();
```

## Element instance assertions

You can verify the element instance states and other properties using `CamundaAssert.assertThat(processInstance)`. Use
the BPMN element ID or a [ElementSelector](utilities.md#element-selector) to identify the elements.

### With BPMN element ID

Use the BPMN element ID to identify the elements:

```java
assertThat(processInstance).hasActiveElements("task_A");
```

You can customize how the elements are identified in the [configuration](#element-selector).

### With element selector

Use a [ElementSelector](utilities.md#element-selector) to identify the elements:

```java
// by BPMN element ID
assertThat(processInstance).hasActiveElements(ElementSelectors.byId("task_A"));

// by BPMN element name
assertThat(processInstance).hasActiveElements(ElementSelectors.byName("A"));
```

### hasActiveElements

Assert that the given BPMN elements of the process instance are active. The assertion fails if at least one element is completed, terminated, or not entered.

```java
assertThat(processInstance).hasActiveElements("task_A", "task_B");
```

### hasActiveElement

Assert that the BPMN element of the process instance is active the given amount of times. The assertion fails if the element is not active or not exactly the given amount of times.

```java
assertThat(processInstance).hasActiveElement("task_A", 2);
```

### hasActiveElementsExactly

Assert that only the given BPMN elements are active. The assertion fails if at least one element is not active, or other elements are active.

```java
assertThat(processInstance).hasActiveElementsExactly("task_A", "task_B");
```

### hasNoActiveElements

Assert that the given BPMN elements are not active. The assertion fails if at least one element is active.

```java
assertThat(processInstance).hasNoActiveElements("task_A", "task_B");
```

### hasNotActivatedElements

Assert that the given BPMN elements are not activated (i.e. not entered). The assertion fails if at least one element is active, completed, or terminated.

This assertion does not wait for the given activities.

```java
assertThat(processInstance).hasNotActivatedElements("task_A", "task_B");
```

### hasCompletedElements

Assert that the given BPMN elements of the process instance are completed. The assertion fails if at least one element is active, terminated, or not entered.

```java
assertThat(processInstance).hasCompletedElements("task_A", "task_B");
```

### hasCompletedElement

Assert that the BPMN element of the process instance is completed the given amount of times. The assertion fails if the element is not completed or not exactly the given amount of times.

```java
assertThat(processInstance).hasCompletedElement("task_A", 2);
```

### hasCompletedElementsInOrder

Assert that the given BPMN elements are completed in order. Elements that do not match any of the given element IDs are ignored. The assertion fails if at least one of the elements is not completed,
or the order is not correct.

```java
assertThat(processInstance).hasCompletedElementsInOrder("task_A", "task_B");
```

### hasTerminatedElements

Assert that the given BPMN elements of the process instance are terminated. The assertion fails if at least one element is active, completed, or not entered.

```java
assertThat(processInstance).hasTerminatedElements("task_A", "task_B");
```

### hasTerminatedElement

Assert that the BPMN element of the process instance is terminated the given amount of times. The assertion fails if the element is not terminated or not exactly the given amount of times.

```java
assertThat(processInstance).hasTerminatedElement("task_A", 2);
```

## Variable assertions

You can verify the process variables using `CamundaAssert.assertThat(processInstance)`.

### hasVariableNames

Assert that the process instance has the given variables. The assertion fails if at least one variable doesn't exist.

```java
assertThat(processInstance).hasVariableNames("var1", "var2");
```

### hasVariable

Assert that the process instance has the variable with the given value. The assertion fails if the variable doesn't exist or has a different value.

```java
assertThat(processInstance).hasVariable("var1", 100);
```

### hasVariables

Assert that the process instance has the given variables. The assertion fails if at least one variable doesn't exist or has a different value.

```java
Map<String, Object> expectedVariables = //
assertThat(processInstance).hasVariables(expectedVariables);
```

### hasVariableSatisfies

Assert that the process instance has a variable with a value that satisfies the given requirements. The assertion
transforms the value into the given type. In the consumer, you can use [AssertJ](https://github.com/assertj/assertj) to
verify the value.

The assertion fails if the variable doesn't exist, the value is of a different type, or the value doesn't satisfy the
requirements.

```java
assertThat(processInstance).hasVariableSatisfies("order", Order.class, order -> {
    Assertions.assertThat(order.status()).isEqualTo("approved");
    Assertions.assertThat(order.items())
        .hasSize(3)
        .extracting("name", "quantity")
        .containsExactlyInAnyOrder(
            tuple("Helmet", 1),
            tuple("Flag", 1),
            tuple("Oxygen tank", 3)
        );
});
```

### hasLocalVariableNames

Assert that the process instance has the local variables in the scope of the given element. Use the BPMN element ID or a
[ElementSelector](utilities.md#element-selector) to identify the element. The assertion fails if at least one variable
doesn't exist.

```java
assertThat(processInstance).hasVariableNames(ElementSelectors.byId("task_A"), "var1", "var2");
```

### hasLocalVariable

Assert that the process instance has the local variable with the value in the scope of the given element. Use the BPMN
element ID or a [ElementSelector](utilities.md#element-selector) to identify the element. The assertion fails if the
variable doesn't exist or has a different value.

```java
assertThat(processInstance).hasLocalVariable(ElementSelectors.byId("task_A"), "var1", 100);
```

### hasLocalVariables

Assert that the process instance has the local variables in the scope of the given element. Use the BPMN element ID or a
[ElementSelector](utilities.md#element-selector) to identify the element. The assertion fails if at least one variable
doesn't exist or has a different value.

```java
Map<String, Object> expectedVariables = //
assertThat(processInstance).hasLocalVariables(ElementSelectors.byId("task_A"), expectedVariables);
```

### hasLocalVariableSatisfies

Assert that the process instance has a local variable in the scope of the given element with a value that satisfies the
given requirements. Use the BPMN element ID or a [ElementSelector](utilities.md#element-selector) to identify the
element. The assertion transforms the value into the given type. In the consumer, you can
use [AssertJ](https://github.com/assertj/assertj) to verify the value.

The assertion fails if the variable doesn't exist, the value is of a different type, or the value doesn't satisfy the
requirements.

```java
assertThat(processInstance).hasLocalVariableSatisfies(
    ElementSelectors.byId("send-email"),
    "to",
    EmailTo.class,
    emailTo -> {
        Assertions.assertThat(emailTo.name()).isEqualTo("Zee");
        Assertions.assertThat(emailTo.email()).isEqualTo("zee@camunda.com");
    });
```

## Process instance message assertions

You can verify the message subscriptions of a process instance using `CamundaAssert.assertThat(processInstance)`.

### isWaitingForMessage

Assert that the process instance is waiting for the given message. The assertion fails if the process instance has no
active message subscription for the given message name and optional correlation key.

```java
// 1) By message name
assertThat(processInstance).isWaitingForMessage("message-name");

// 2) By message name and correlation key
assertThat(processInstance).isWaitingForMessage("message-name", "correlation-key");
```

### isNotWaitingForMessage

Assert that the process instance is not waiting for the given message. The assertion fails if the process instance has
an active message subscription for the given message name and optional correlation key.

```java
// 1) By message name
assertThat(processInstance).isNotWaitingForMessage("message-name");

// 2) By message name and correlation key
assertThat(processInstance).isNotWaitingForMessage("message-name", "correlation-key");
```

### hasCorrelatedMessage

Assert that the given message was correlated to the process instance. The assertion fails if the process instance has no
correlated message subscription for the given message name and optional correlation key.

```java
// 1) By message name
assertThat(processInstance).hasCorrelatedMessage("message-name");

// 2) By message name and correlation key
assertThat(processInstance).hasCorrelatedMessage("message-name", "correlation-key");
```

## User task assertions

You can verify the user task states and other properties using `CamundaAssert.assertThat()` or
`CamundaAssert.assertThatUserTask()`. Use a [UserTaskSelector](utilities.md#user-task-selector) to identify the user
task.

### With user task selector

Use a [UserTaskSelector](utilities.md#user-task-selector) to identify the user task:

```java
// by BPMN element ID
assertThatUserTask(UserTaskSelectors.byElementId("user-task-id")).isCompleted();

// by user task name
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).isCompleted();

// by process instance key
assertThatUserTask(UserTaskSelectors.byProcessInstanceKey(processInstanceKey)).isCompleted();
```

### isCreated

Asserts that the user task is created. The assertion fails if the task is in any other state.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).isCreated();
```

### isCompleted

Asserts that the user task is completed. The assertion fails if the task is in any other state.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).isCompleted();
```

### isCanceled

Asserts that the user task is canceled. The assertion fails if the task is in any other state.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).isCanceled();
```

### isFailed

Asserts that the user task is failed. The assertion fails if the task is in any other state.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).isFailed();
```

### hasAssignee

Asserts that the user task has the expected assignee.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasAssignee("John Doe");
```

### hasPriority

Asserts that the user task has the expected priority.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasPriority(100);
```

### hasElementId

Asserts that the user task has the expected BPMN element ID.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasElementId("user-task-id");
```

### hasName

Asserts that the user task has the expected name.

```java
assertThatUserTask(UserTaskSelectors.byElementId("user-task-id")).hasName("User Task");
```

### hasProcessInstanceKey

Asserts that the user task has the expected process instance key.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasProcessInstanceKey(processInstanceKey);
```

### hasDueDate

Asserts that the user task has the expected due date.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasDueDate("2023-10-01T00:00:00Z");
```

### hasCompletionDate

Asserts that the user task has the expected completion date.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasCompletionDate("2023-10-01T00:00:00Z");
```

### hasFollowUpDate

Asserts that the user task has the expected follow-up date.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasFollowUpDate("2023-10-01T00:00:00Z");
```

### hasCreationDate

Asserts that the user task has the expected creation date.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasCreationDate("2023-10-01T00:00:00Z");
```

### hasCandidateGroup

Asserts that the user task has the expected candidate group.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasCandidateGroup("groupA");
```

### hasCandidateGroups

Asserts that the user task has the expected candidate groups.

```java
assertThatUserTask(UserTaskSelectors.byTaskName("User Task")).hasCandidateGroups("groupA", "groupB", "groupC");
```

## Decision assertions

You can verify the decision evaluation state and other properties using `CamundaAssert.assertThat()` or
`CamundaAssert.assertThatDecision()`. Use the evaluate decision response or
a [DecisionSelector](utilities.md#decision-selector) to identify the decision instance.

### With evaluate decision response

Use the response of the evaluate decision command to identify the decision instance:

```java
// given/when
EvaluateDecisionResponse response =
    client
        .newEvaluateDecisionCommand()
        .decisionId(decisionId)
        .variables(variables)
        .send()
        .join();

// then
assertThat(response).isEvaluated();
```

### With decision selector

Use a [DecisionSelector](utilities.md#decision-selector) to identify the decision instance:

```java
// by decision ID
assertThatDecision(DecisionSelectors.byId("decision-id")).isEvaluated();

// by decision name
assertThatDecision(DecisionSelectors.byName("Decision Name")).isEvaluated();

// by process instance key
assertThatDecision(DecisionSelectors.byProcessInstanceKey(processInstanceKey)).isEvaluated();
```

### isEvaluated

Asserts that the decision is evaluated. The assertion fails if the evaluation failed and outputs the evaluation failure message.

```java
assertThatDecision(DecisionSelectors.byId("decision-id")).isEvaluated();
```

### hasOutput

Asserts that the decision is evaluated with the expected output. The verification fails if the decision evaluation failed or the output does not match.

```java
// With primitive value
assertThatDecision(DecisionSelectors.byId("decision-id")).hasOutput("output");

// With a map of values
Map<String, Object> expectedOutput = //
assertThatDecision(DecisionSelectors.byId("decision-id")).hasOutput(expectedOutput);

// With a list of values
List<Object> expectedOutput = //
assertThatDecision(DecisionSelectors.byId("decision-id")).hasOutput(expectedOutput);
```

### hasMatchedRules

Asserts that the decision table has matched the given rule indices. The evaluation fails if the decision evaluation failed or at least one of the expected matched rules didn't match.

The assertion will pass if the expected indexes are a subset of the total matches, e.g. `hasMatchedRules(1, 2)` will pass if rules [1, 2, 3] matched.

```java
// Single rule
assertThatDecision(DecisionSelectors.byId("decision-id")).hasMatchedRules(1);

// Multiple rules
assertThatDecision(DecisionSelectors.byId("decision-id")).hasMatchedRules(1, 3);
```

### hasNotMatchedRules

Asserts that the decision table has not matched the given rule indices. The assertion will fail if the decision evaluation has failed or at least one of the rules indexes has matched.

```java
// Single rule
assertThatDecision(DecisionSelectors.byId("decision-id")).hasNotMatchedRules(2);

// Multiple rules
assertThatDecision(DecisionSelectors.byId("decision-id")).hasNotMatchedRules(2, 4);
```

### hasNoMatchedRules

Asserts that the decision table matched no rules. The assertion will fail if the decision evaluation has failed or at least one rule matched.

```java
assertThatDecision(DecisionSelectors.byId("decision-id")).hasNoMatchedRules();
```

## Custom assertions

You can build your own assertions similar to the assertions from CPT.

- Use the preconfigured Camunda client to retrieve the process data.
- Use [AssertJ](https://github.com/assertj/assertj)'s assertions to verify the expected properties.
- Use [Awaitility](http://www.awaitility.org/) around verifications to compensate delays until the data is available.

```java
@Test
void shouldCreateUserTask() {
    // given: the process is deployed
    // when: create a process instance

    // then
    Awaitility.await()
        .ignoreException(ClientException.class)
        .untilAsserted(
            () -> {
                final List<UserTask> userTasks = getUserTasks(processInstanceKey);
                assertThat(userTasks).hasSize(1);

                final UserTask userTask = userTasks.getFirst();
                assertThat(userTask)
                    .returns("task", UserTask::getName)
                    .returns("me", UserTask::getAssignee);
            });
}

// helper method
private List<UserTask> getUserTasks(final long processInstanceKey) {
    return client
        .newUserTaskSearchRequest()
        .filter(filter -> filter.processInstanceKey(processInstanceKey).state(UserTaskState.CREATED))
        .send()
        .join()
        .items();
}
```
