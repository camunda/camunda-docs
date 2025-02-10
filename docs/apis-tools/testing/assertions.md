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

## Configuration

You can configure the assertions in the following ways.

### Assertion timeout

By default, the assertions wait 10 seconds till the expected property is fulfilled. You can change the time globally in `CamundaAssert`, for example, to set the timeout to 1 minute.

```java
CamundaAssert.setAssertionTimeout(Duration.ofMinutes(1));
```

### Element selector

By default, the element instance assertions identify the BPMN elements by their ID. You can change the element selector globally in `CamundaAssert`, for example, to identity the BPMN elements by their name.

```java
CamundaAssert.setElementSelector(ElementSelectors::byName);
```

## Process instance assertions

You can verify the process instance state and other properties using `CamundaAssert.assertThat()`. Use the process instance creation event or a `ProcessInstanceSelector` to identify the process instance.

### With process instance event

Use the creation event of the create instance command to identify the process instance.

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

Use the result event of the create instance command to identify the process instance.

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

Use a predefined `ProcessInstanceSelector` from `ProcessInstanceSelectors` or a custom implementation to identify the process instance.

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

## Element instance assertions

You can verify the element instance states and other properties using `CamundaAssert.assertThat(processInstance)`. Use the BPMN element ID or a `ElementSelector` to identify the elements.

### With BPMN element ID

Use the BPMN element ID to identify the elements.

```java
assertThat(processInstance).hasActiveElements("task_A");
```

You can customize how the elements are identified in the [configuration](#element-selector).

### With element selector

Use a predefined `ElementSelector` from `ElementSelectors` or a custom implementation to identify the elements.

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

### hasCompletedElements

Assert that the given BPMN elements of the process instance are completed. The assertion fails if at least one element is active, terminated, or not entered.

```java
assertThat(processInstance).hasCompletedElements("task_A", "task_B");
```

### hasTerminatedElements

Assert that the given BPMN elements of the process instance are terminated. The assertion fails if at least one element is active, completed, or not entered.

```java
assertThat(processInstance).hasTerminatedElements("task_A", "task_B");
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
