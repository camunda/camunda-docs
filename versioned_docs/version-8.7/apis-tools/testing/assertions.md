---
id: assertions
title: Assertions
description: "Use assertions to verify the process instance state."
---

The class `CamundaAssert` is the entry point for all assertions. It is based on [AssertJ](https://github.com/assertj/assertj) and [Awaitility](http://www.awaitility.org/).

The assertions follow the style: `assertThat(object_to_test)` + expected property.

Use the assertions by adding the following static import in your test class:

```java
import static io.camunda.process.test.api.CamundaAssert.assertThat;
```

:::info Assertions are blocking
Camunda executes BPMN processes asynchronously. For testing, this means that there might be a delay between creating a process instance and reaching the expected state.

The assertions handle the asynchronous behavior and wait until the expected property is fulfilled. Only if the property is not fulfilled within the given time, the assertion fails.

By default, the assertions wait 10 seconds. If needed, you can change the time using `CamundaAssert.setAssertionTimeout(Duration.ofMinutes(1))`.
:::

## Process instance assertions

You can verify the process instance state using the creation event of the process instance.

```java
// given/when
ProcessInstanceEvent processInstance =
        client.newCreateInstanceCommand().bpmnProcessId("my-process").latestVersion().send().join();
// or
ProcessInstanceResult processInstance =
        client.newCreateInstanceCommand().bpmnProcessId("my-process").latestVersion().withResult().send().join();

// then
assertThat(processInstance).isActive();
```

### Process instance state

Assert that the process instance is active, completed, or terminated.

```java
assertThat(processInstance).isActive();

assertThat(processInstance).isCompleted();

assertThat(processInstance).isTerminated();
```

### Element instance state

Assert that the given BPMN elements of the process instance are active, completed, or terminated. The elements are identified by their BPMN element name.

```java
assertThat(processInstance).hasActiveElements("A", "B");

assertThat(processInstance).hasCompletedElements("A", "B");

assertThat(processInstance).hasTerminatedElements("A", "B");
```

### Process instance variables

Assert that the process instance has the given variables. Local variables of BPMN elements are ignored.

```java
assertThat(processInstance).hasVariableNames("var1", "var2");

assertThat(processInstance).hasVariable("var1", 100);

Map<String, Object> expectedVariables = //
assertThat(processInstance).hasVariables(expectedVariables);
```
