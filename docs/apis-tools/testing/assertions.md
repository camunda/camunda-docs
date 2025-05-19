---
id: assertions
title: Assertions
description: "Use assertions to verify the process instance state."
---

The class `CamundaAssert` is the entry point for all assertions. It is based on [AssertJ](https://github.com/assertj/assertj) and [Awaitility](http://www.awaitility.org/).

The assertions follow the style: `assertThat(object_to_test)` + expected property.

Use the assertions by adding the following static imports in your test class:

```java
import static io.camunda.process.test.api.CamundaAssert.assertThat;

// optional:
import static io.camunda.process.test.api.assertions.ElementSelectors.*;
import static io.camunda.process.test.api.assertions.ProcessInstanceSelectors.*;
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

By default, the element instance assertions identify the BPMN elements by their ID. You can change the element selector globally in `CamundaAssert`.

For example, the following identifies the BPMN elements by their name:

```java
CamundaAssert.setElementSelector(ElementSelectors::byName);
```

## Process instance assertions

You can verify the process instance state and other properties using `CamundaAssert.assertThat()`. Use the process instance creation event or a `ProcessInstanceSelector` to identify the process instance.

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

Use a predefined `ProcessInstanceSelector` from `io.camunda.process.test.api.assertions.ProcessInstanceSelectors` or a custom implementation to identify the process instance:

```java
// by process instance key
assertThat(byKey(processInstanceKey)).isActive();

// by process ID
assertThat(byProcessId("my-process")).isActive();

// custom selector implementation
assertThat(processInstance -> { .. }).isActive();
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

You can verify the element instance states and other properties using `CamundaAssert.assertThat(processInstance)`. Use the BPMN element ID or a `ElementSelector` to identify the elements.

### With BPMN element ID

Use the BPMN element ID to identify the elements:

```java
assertThat(processInstance).hasActiveElements("task_A");
```

You can customize how the elements are identified in the [configuration](#element-selector).

### With element selector

Use a predefined `ElementSelector` from `io.camunda.process.test.api.assertions.ElementSelectors` or a custom implementation to identify the elements:

```java
// by BPMN element ID
assertThat(processInstance).hasActiveElements(byId("task_A"));

// by BPMN element name
assertThat(processInstance).hasActiveElements(byName("A"));

// custom selector implementation
assertThat(processInstance).hasActiveElements(element -> { .. });
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

You can verify the process instance variables using `CamundaAssert.assertThat(processInstance)`. Local variables of BPMN elements are ignored.

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

## User task assertions

You can verify user tasks using `CamundaAssert.assertThat()`. Use a `UserTaskSelector` to identify the user task.

### With user task selector

Use a predefined `UserTaskSelector` from `io.camunda.process.test.api.assertions.UserTaskSelectors` or a custom implementation to identify the user task:

```java
// by user task id
assertThat(byElementId("user-task-id")).isCompleted();

// by user task name
assertThat(byTaskName("User Task")).isCompleted();

// you may optionally specify the process instance key:

assertThat(byElementId("user-task-id", processInstanceKey)).isCompleted();
assertThat(byTaskName("User Task", processInstanceKey)).isCompleted();
```

### Custom user task selector

To create a custom selector you must implement the `UserTaskSelector` interface. Refer to `io.camunda.process.test.api.assertions.UserTaskSelectors` to see how the interface was implemented for the `byElementId` and `byTaskName` selectors.

```java
/** A selector for BPMN user task elements. */
@FunctionalInterface
public interface UserTaskSelector {

  /**
   * Checks if the element matches the selector.
   *
   * @param userTask the BPMN element
   * @return {@code true} if the element matches, otherwise {@code false}
   */
  boolean test(UserTask userTask);

  /**
   * Returns a string representation of the selector. It is used to build the failure message of an
   * assertion. Default: {@link Object#toString()}.
   *
   * @return the string representation
   */
  default String describe() {
    return toString();
  }

  /**
   * Applies the given filter to limit the search of user task that match the selector. Default: no
   * filtering.
   *
   * @param filter the filter used to limit the user task search
   */
  default void applyFilter(final UserTaskFilter filter) {}
}
```

### isCreated

Asserts that the user task is created. The assertion fails if the task is in any other state.

```java
assertThat(userTaskSelector).isCreated();
```

### isCompleted

Asserts that the user task is completed. The assertion fails if the task is in any other state.

```java
assertThat(userTaskSelector).isCompleted();
```

### isCanceled

Asserts that the user task is canceled. The assertion fails if the task is in any other state.

```java
assertThat(userTaskSelector).isCanceled();
```

### isFailed

Asserts that the user task is failed. The assertion fails if the task is in any other state.

```java
assertThat(userTaskSelector).isFailed();
```

### hasAssignee

Asserts that the user task has the expected assignee.

```java
assertThat(userTaskSelector).hasAssignee("John Doe");
```

### hasPriority

Asserts that the user task has the expected priority.

```java
assertThat(userTaskSelector).hasPriority(100);
```

### hasElementId

Asserts that the user task has the expected BPMN element ID.

```java
assertThat(userTaskSelector).hasElementId("user-task-id");
```

### hasName

Asserts that the user task has the expected name.

```java
assertThat(userTaskSelector).hasName("User Task");
```

### hasProcessInstanceKey

Asserts that the user task has the expected process instance key.

```java
assertThat(userTaskSelector).hasProcessInstanceKey(1000L);
```

### hasDueDate

Asserts that the user task has the expected due date.

```java
assertThat(userTaskSelector).hasDueDate("2023-10-01T00:00:00Z");
```

### hasCompletionDate

Asserts that the user task has the expected completion date.

```java
assertThat(userTaskSelector).hasCompletionDate("2023-10-01T00:00:00Z");
```

### hasFollowUpDate

Asserts that the user task has the expected follow-up date.

```java
assertThat(userTaskSelector).hasFollowUpDate("2023-10-01T00:00:00Z");
```

### hasCreationDate

Asserts that the user task has the expected creation date.

```java
assertThat(userTaskSelector).hasCreationDate("2023-10-01T00:00:00Z");
```

### hasCandidateGroup

Asserts that the user task has the expected candidate group.

```java
assertThat(userTaskSelector).hasCandidateGroup("groupA");
```

### hasCandidateGroups

Asserts that the user task has the expected candidate groups.

```java
assertThat(userTaskSelector).hasCandidateGroups("groupA", "groupB", "groupC");
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
