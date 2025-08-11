---
id: migrate-to-camunda-process-test
title: Migrate to Camunda Process Test
description: "Learn how to migrate from Zeebe Process Test to Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Camunda Process Test](/apis-tools/testing/getting-started.md) (CPT) is the successor
of [Zeebe Process Test](/apis-tools/java-client/zeebe-process-test.md) (ZPT). Since version 8.8, CPT is available and
fully supported. ZPT is deprecated and will be removed with version 8.10. See
the [announcement](https://camunda.com/blog/2025/04/camunda-process-test-the-next-generation-testing-library/) for
details.

The following guide helps you to migrate your existing test cases step-by-step from ZPT to CPT.

:::note
Please be aware that there are differences between ZPT and CPT in their API and behavior that could lead to a bigger
effort for the migration depending on your existing test cases. Fundamentally, ZPT uses only Camunda's workflow engine
(aka Zeebe) with access to internal components. CPT uses the full Camunda distribution and interacts with the API.

- CPT has different assertion and utility names to align with the API
- CPT has no equivalent for all assertions and utilities because it is limited to the API
- CPT is slower because it runs the full Camunda distribution
  :::

## Update your dependency

First, you need to update your Maven dependency.

If you use
ZPT's [Camunda Spring Boot SDK integration](/apis-tools/java-client/zeebe-process-test.md#camunda-spring-boot-sdk-integration) (
`artifactId: spring-boot-starter-camunda-test/spring-boot-starter-camunda-test-testcontainer`), then replace it with
CPT's Spring integration module.

If you use ZPT without Spring (`artifactId: zeebe-process-test-extension/zeebe-process-test-extension-testcontainer`),
then replace it with CPT's Java module.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your Maven `pom.xml`, add the dependency:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-spring</artifactId>
  <scope>test</scope>
</dependency>
```

</TabItem>

<TabItem value='java-client'>

In your Maven `pom.xml`, add the dependency:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-java</artifactId>
  <scope>test</scope>
</dependency>
```

</TabItem>
</Tabs>

## Choose your runtime

Next, choose your CPT runtime depending on your environment.

If you use ZPT with Testcontainers (
`artifactId: zeebe-process-test-extension-testcontainer/spring-boot-starter-camunda-test-testcontainer`), then you can
use CPT's default [Testcontainers runtime](/apis-tools/testing/configuration.md#testcontainers-runtime). Skip the
following instructions and continue with the next step.

If you use ZPT's embedded runtime (`artifactId: zeebe-process-test-extension/spring-boot-starter-camunda-test`), then
you should use CPT's [Remote runtime](/apis-tools/testing/configuration.md#remote-runtime). Choose this option only if
you can't install a Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop.

Prepare your remote runtime:

1. Install [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md#install-and-start-camunda-8-run) on
   your machine
2. [Enable the management clock endpoint](/apis-tools/testing/configuration.md#prerequisites-1)

- Create an `application.yaml` file in the root `/c8run` directory
- Add the property `zeebe.clock.controlled: true`

3. Start Camunda 8 Run

Then, switch CPT's runtime mode to `remote` in your project.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        runtime-mode: remote
```

</TabItem>

<TabItem value='java-client'>

In your process test class, register the JUnit extension in the following way:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import io.camunda.process.test.api.CamundaProcessTestRuntimeMode;
import org.junit.jupiter.api.extension.RegisterExtension;

public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE);
}
```

</TabItem>
</Tabs>

## Migrate your process tests

Now, it's time to migrate your process tests.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

First, migrate the general test class structure:

- Replace the annotation `@ZeebeSpringTest` with `@CamundaSpringProcessTest`
- Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`
- Remove the field for `RecordStream`. CPT has no access to the records directly. Instead, you can use the SDK to
  request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Look at the following example of a ZPT test class:

```java
import io.camunda.zeebe.process.test.extension.testcontainer.ZeebeProcessTest;

@SpringBootTest
@ZeebeSpringTest
class MyProcessTest {

    @Autowired private CamundaClient client;
    @Autowired private ZeebeTestEngine engine;
    @Autowired private RecordStream recordStream;

    @Test
    void shouldCompleteProcess() {
      // given
      final ProcessInstanceEvent processInstance = client
              .newCreateInstanceCommand()
              .bpmnProcessId("my-process")
              .latestVersion()
              .send()
              .join();

      // when: drive the process forward

      // then
      BpmnAssert.assertThat(processInstance)
              .hasPassedElementsInOrder("start", "task1", "task2", "task3", "end")
              .isCompleted();
    }

}
```

</TabItem>

<TabItem value='java-client'>

First, you migrate the general test class structure:

- Replace the annotation `@ZeebeProcessTest` with `@CamundaProcessTest`
- Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`
- Remove the field for `RecordStream`. CPT has no access to the records directly. However, you can use the SDK to
  request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Look at the following example of a ZPT test class:

```java
import io.camunda.zeebe.process.test.extension.testcontainer.ZeebeProcessTest;

@ZeebeProcessTest
class MyProcessTest {

    private CamundaClient client;
    private ZeebeTestEngine engine;
    private RecordStream recordStream;

    @Test
    void shouldCompleteProcess() {
      // given: the processes are deployed
      final ProcessInstanceEvent processInstance = client
              .newCreateInstanceCommand()
              .bpmnProcessId("my-process")
              .latestVersion()
              .send()
              .join();

      // when: drive the process forward

      // then
      BpmnAssert.assertThat(processInstance)
              .hasPassedElementsInOrder("start", "task1", "task2", "task3", "end")
              .isCompleted();
    }
}
```

</TabItem>
</Tabs>

And, here is the equivalent CPT test class:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

```java
import io.camunda.process.test.api.CamundaAssert;
import io.camunda.process.test.api.CamundaProcessTestContext;
import io.camunda.process.test.api.CamundaSpringProcessTest;

@SpringBootTest
@CamundaSpringProcessTest
class MyProcessTest {

    @Autowired private CamundaClient client;
    @Autowired private CamundaProcessTestContext processTestContext;

    @Test
    void shouldCompleteProcess() {
      // given
      final ProcessInstanceEvent processInstance = client
              .newCreateInstanceCommand()
              .bpmnProcessId("my-process")
              .latestVersion()
              .send()
              .join();

      // when: drive the process forward

      // then
      CamundaAssert.assertThat(processInstance)
              .hasCompletedElementsInOrder("start", "task1", "task2", "task3", "end")
              .isCompleted();
    }

}
```

</TabItem>

<TabItem value='java-client'>

```java
import io.camunda.process.test.api.CamundaAssert;
import io.camunda.process.test.api.CamundaProcessTest;
import io.camunda.process.test.api.CamundaProcessTestContext;

@CamundaProcessTest
class MyProcessTest {

    private CamundaClient client;
    private CamundaProcessTestContext processTestContext;

    @Test
    void shouldCompleteProcess() {
      // given: the processes are deployed
      final ProcessInstanceEvent processInstance = client
              .newCreateInstanceCommand()
              .bpmnProcessId("my-process")
              .latestVersion()
              .send()
              .join();

      // when: drive the process forward

      // then
      CamundaAssert.assertThat(processInstance)
              .hasCompletedElementsInOrder("start", "task1", "task2", "task3", "end")
              .isCompleted();
    }
}
```

</TabItem>
</Tabs>

Then, you go over all test methods and migrate the assertions and utilities. See the following sections for detailed
instructions.

### Process instance assertions

ZPT has assertions for a process instance using `BpmnAssert.assertThat()` with the `ProcessInstanceEvent` or the
`ProcessInstanceResult`.

CPT has equivalent assertions using `CamundaAssert.assertThat()`.

```java
// given
ProcessInstanceEvent processInstance = //

// ZPT:
BpmnAssert.assertThat(processInstance).isCompleted();

// CPT:
CamundaAssert.assertThat(processInstance).isCompleted();
```

Some of CPT's assertions have different method names or signatures. Check the following list for the equivalent CPT
assertion:

<table>
    <tr>
        <th>
            <div>ZPT: BpmnAssert.assertThat(processInstance)</div>
        </th>
        <th>
            <div>CPT: CamundaAssert.assertThat(processInstance)</div>
        </th>
    </tr>
    <tr>
        <td><code>isStarted()</code></td>
        <td>[isCreated()](/apis-tools/testing/assertions.md#iscreated)</td>
    </tr>
    <tr>
        <td><code>isActive()</code></td>
        <td>[isActive()](/apis-tools/testing/assertions.md#isactive)</td>
    </tr>
    <tr>
        <td><code>isCompleted()</code></td>
        <td>[isCompleted()](/apis-tools/testing/assertions.md#iscompleted)</td>
    </tr>
    <tr>
        <td><code>isNotCompleted()</code></td>
        <td>
            <div>Not supported</div>
            <small>
                Instead, use [isActive()](/apis-tools/testing/assertions.md#isactive) or [isTerminated()](/apis-tools/testing/assertions.md#isterminated).
            </small>
        </td>
    </tr>
    <tr>
        <td><code>isTerminated()</code></td>
        <td>[isTerminated()](/apis-tools/testing/assertions.md#isterminated)</td>
    </tr>
    <tr>
        <td><code>isNotTerminated()</code></td>
        <td>
            <div>Not supported</div>
            <small>
                Instead, use [isActive()](/apis-tools/testing/assertions.md#isactive) or [isCompleted()](/apis-tools/testing/assertions.md#iscompleted).
            </small>
        </td>
    </tr>
    <tr>
        <td><code>isWaitingAtElements()</code></td>
        <td>[hasActiveElements()](/apis-tools/testing/assertions.md#hasactiveelements)</td>
    </tr>
    <tr>
        <td><code>isWaitingExactlyAtElements()</code></td>
        <td>[hasActiveElementsExactly()](/apis-tools/testing/assertions.md#hasactiveelementsexactly)</td>
    </tr>
    <tr>
        <td><code>isNotWaitingAtElements()</code></td>
        <td>[hasNoActiveElements()](/apis-tools/testing/assertions.md#hasnoactiveelements)</td>
    </tr>
    <tr>
        <td><code>hasPassedElement()</code></td>
        <td>[hasCompletedElement()](/apis-tools/testing/assertions.md#hascompletedelement)</td>
    </tr>
    <tr>
        <td><code>hasPassedElementsInOrder()</code></td>
        <td>[hasCompletedElementsInOrder()](/apis-tools/testing/assertions.md#hascompletedelementsinorder)</td>
    </tr>
    <tr>
        <td><code>hasNotPassedElement()</code></td>
        <td>[hasNotActivatedElements()](/apis-tools/testing/assertions.md#hasnotactivatedelements)</td>
    </tr>
    <tr>
        <td><code>hasVariable()</code></td>
        <td>[hasVariableNames()](/apis-tools/testing/assertions.md#hasvariablenames)</td>
    </tr>
    <tr>
        <td><code>hasVariableWithValue()</code></td>
        <td>[hasVariable()](/apis-tools/testing/assertions.md#hasvariable)</td>
    </tr>
    <tr>
        <td><code>hasAnyIncidents()</code></td>
        <td>[hasActiveIncidents()](/apis-tools/testing/assertions.md#hasactiveincidents)</td>
    </tr>
    <tr>
        <td><code>hasNoIncidents()</code></td>
        <td>[hasNoActiveIncidents()](/apis-tools/testing/assertions.md#hasnoactiveincidents)</td>
    </tr>
    <tr>
        <td><code>isWaitingForMessages()</code></td>
        <td>Coming soon with 8.8</td>
    </tr>
    <tr>
        <td><code>isNotWaitingForMessages()</code></td>
        <td>Coming soon with 8.8</td>
    </tr>
    <tr>
        <td><code>hasCorrelatedMessageByName()</code></td>
        <td>Coming soon with 8.8</td>
    </tr>
    <tr>
        <td><code>hasCorrelatedMessageByCorrelationKey()</code></td>
        <td>Coming soon with 8.8</td>
    </tr>
    <tr>
        <td><code>hasCalledProcess()</code></td>
        <td>
            <div>Not supported</div>
            <small>
                Instead, use a [ProcessInstanceSelector](/apis-tools/testing/assertions.md#with-process-instance-selector) to assert the child process instance.
            </small>
        </td>
    </tr>
    <tr>
        <td><code>hasNotCalledProcess()</code></td>
        <td>
            <div>Not supported</div>
            <small>
                Instead, assert the call activity or the child process instance.
            </small>
        </td>
    </tr>
</table>

### Deployment assertions

ZPT has assertions for a deployment using `BpmnAssert.assertThat()` with the `DeploymentEvent`.

CPT has no equivalent assertions. Instead, you could write
a [custom assertion](/apis-tools/testing/assertions.md#custom-assertions) with AssertJ to verify the properties of the
deployment event.

```java
// given
DeploymentEvent deploymentEvent = //

// ZPT:
BpmnAssert.assertThat(deploymentEvent).containsProcessesByResourceName("my-process.bpmn");

// CPT:
Assertions.assertThat(deploymentEvent.getProcesses())
    .extracting(Process::getResourceName)
    .contains("my-process.bpmn");
```

### Job assertions

ZPT has assertions for an activated job using `BpmnAssert.assertThat()` with the `ActivatedJob`.

CPT has no equivalent assertions. Instead, you could write
a [custom assertion](/apis-tools/testing/assertions.md#custom-assertions) with AssertJ to verify the properties of the
activated job.

```java
// given
ActivatedJob activatedJob = //

// ZPT:
BpmnAssert.assertThat(activatedJob).hasElementId("elementId");

// CPT:
Assertions.assertThat(activatedJob.getElementId()).isEqualTo("elementId");
```

### Message assertions

ZPT has assertions for a published message using `BpmnAssert.assertThat()` with the `PublishMessageResponse`.

CPT has no equivalent assertions. Instead, you could use
a [ProcessInstanceSelector](/apis-tools/testing/assertions.md#with-process-instance-selector) to find the correlated
process instance, or use
the [correlate message API](/apis-tools/orchestration-cluster-api-rest/specifications/correlate-message.api.mdx) that
returns the process instance key.

```java
// ZPT:
final PublishMessageResponse publishMessageResponse = //

BpmnAssert.assertThat(publishMessageResponse)
    .hasCreatedProcessInstance()
    .extractingProcessInstance()
    .isCompleted();

// CPT:
final CorrelateMessageResponse correlateMessageResponse = //

// The correlate command would fail if the message could not be correlated
CamundaAssert.assertThatProcessInstance(byKey(correlateMessageResponse.getProcessInstanceKey()))
    .isCompleted();
```

### Inspection utilities

ZPT has the `InspectionUtility` to find process instances and pass them to the assertion. Additionally, some assertions
have methods to extract a related entity, for example, `extractingProcessInstance()` or `extractingLatestIncident()`.

CPT has an equivalent utility with
the [ProcessInstanceSelector](/apis-tools/testing/assertions.md#with-process-instance-selector) that can be used with
`CamundaAssert.assertThatProcessInstance()`. For other entities, you could use the Camunda client to search the entity
and implement a [custom assertion](/apis-tools/testing/assertions.md#custom-assertions).

```java
// ZPT:
InspectedProcessInstance childProcessInstance = InspectionUtility.findProcessInstances()
    .withBpmnProcessId("child-process")
    .findFirstProcessInstance()
    .get();

BpmnAssert.assertThat(childProcessInstance).isCompleted();

// CPT:
CamundaAssert.assertThatProcessInstance(byProcessId("child-process"))
    .isCompleted();
```

### ZeebeTestEngine utilities

ZPT has the `ZeebeTestEngine` utilities to interact with the runtime, for example, to increase the time.

CPT has an equivalent utility with the [CamundaProcessTestContext](/apis-tools/testing/utilities.md), except that the
following utilities are not supported:

- `waitForIdleState(duration)`
- `waitForBusyState(duration)`

ZPT has these utilities to handle Camunda's asynchronous processing, for example, to wait until the process instance
processed all commands before asserting the state, or before increasing the time to trigger a BPMN timer event. CPT
doesn't need these utilities because it has [blocking assertions](/apis-tools/testing/assertions.md) that wait a given
time until the expected property is fulfilled.

```java
// ZPT
engine.waitForIdleState(duration);
engine.increaseTime(Duration.ofDays(1));

// CPT:
assertThat(processInstance).hasActiveElements("timer_event");

processTestContext.increaseTime(Duration.ofDays(1));
```

## Next steps

You did it! Now, all process tests should be migrated to CPT and run successfully.

When you are ready, take the next steps to continue your journey:

- Discover new [assertions](/apis-tools/testing/assertions.md)
- Simplify your tests with new [utilities](/apis-tools/testing/utilities.md)
- Generate process test coverage reports (coming soon)

## Troubleshooting

If you run into issues with the migration or miss important features, please report them in
the [Camunda GitHub repository](https://github.com/camunda/camunda/issues).
