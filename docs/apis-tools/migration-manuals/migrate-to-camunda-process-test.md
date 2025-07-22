---
id: migrate-to-camunda-process-test
title: Migrate to Camunda Process Test
description: "Learn how to migrate from Zeebe Process Test to Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Camunda Process Test](/apis-tools/testing/getting-started.md) (CPT) is the successor
of [Zeebe Process Test](/apis-tools/java-client/zeebe-process-test.md) (ZPT). Since version 8.8, CPT is available and
fully supported. ZPT is deprecated and will be removed with version 8.10.

The following guide helps you to migrate your existing test cases from ZPT to CPT.

## Plain Java vs. Spring

CPT has two variations with differences in the code and the configuration:

- For Camunda's Java client (i.e. plain Java without Spring)
- For Camunda's Spring Boot SDK

Choose the variation depending on if you use ZPT with
the [Camunda Spring Boot SDK integration](/apis-tools/java-client/zeebe-process-test.md#camunda-spring-boot-sdk-integration) (
`spring-boot-starter-camunda-test`/`spring-boot-starter-camunda-test-testcontainer`) or not.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your Maven `pom.xml`, replace the ZPT dependency with:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-spring</artifactId>
  <scope>test</scope>
</dependency>
```

</TabItem>

<TabItem value='java-client'>

In your Maven `pom.xml`, replace the ZPT dependency with:

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

CPT supports two different runtimes:

- [Testcontainers runtime](/apis-tools/testing/configuration.md#testcontainers-runtime) (default)
- [Remote runtime](/apis-tools/testing/configuration.md#remote-runtime)

If you use [ZPT's Testcontainers runtime](/apis-tools/java-client/zeebe-process-test.md#testcontainers-jdk-8), you can
use CPT without additional configuration and skip this step.

If you use [ZPT's Embedded runtime](/apis-tools/java-client/zeebe-process-test.md#embedded-jdk-21) and can't install a
Docker-API compatible container runtime (e.g., Docker on Linux, Docker Desktop), you can apply the following steps to
use CPT's remote runtime:

1. Install [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) on your machine
2. Adjust the Camunda 8 Run configuration (TODO: link to docs)
3. Start Camunda 8 Run
4. Change the CPT configuration:

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
        # Switch from a managed to a remote runtime
        runtime-mode: remote
```

</TabItem>

<TabItem value='java-client'>

Register CPT's JUnit extension in your test class using the fluent builder:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            // Switch from a managed to a remote runtime
            .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE);
}
```

</TabItem>
</Tabs>

## Migrate your process tests

The general structure of CPT test classes is similar to ZPT, but the names are different. Let's migrate the following
ZPT test class as an example:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

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

Into the equivalent CPT test class:

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

Apply the following steps:

- Replace the annotation `@ZeebeSpringTest` with `@CamundaSpringProcessTest`
- Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`
- Remove the field for `RecordStream`. CPT has no access to the records directly. Instead, you can use the SDK to
  request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

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

Apply the following steps:

- Replace the annotation `@ZeebeProcessTest` with `@CamundaProcessTest`
- Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`
- Remove the field for `RecordStream`. CPT has no access to the records directly. However, you can use the SDK to
  request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

</TabItem>
</Tabs>

### Assertions

CPT provides assertions via [CamundaAssert](/apis-tools/testing/assertions.md) similar to ZPT's `BpmnAssert` class. Most
of the process instance assertions are supported, but with a different name or method signature. The other ZPT
assertions are not supported. However, you could
write [custom assertions](/apis-tools/testing/assertions.md#custom-assertions) for these case. See the following
sections for detailed instructions.

#### Process instance assertions

ZPT's process instance assertions in the form of `BpmnAssert.assertThat(ProcessInstanceEvent)` and
`BpmnAssert.assertThat(ProcessInstanceResult)` are supported, but not for all properties.

```java
// given
ProcessInstanceEvent processInstance = //

// ZPT:
BpmnAssert.assertThat(processInstance).isCompleted();

// CPT:
CamundaAssert.assertThat(processInstance).isCompleted();
```

A list of ZPT assertions with their equivalent CPT assertions:

<table>
    <tr>
        <th>
            <div>ZPT process instance assertion</div>
        </th>
        <th>
            <div>CPT process instance assertion</div>
        </th>
    </tr>
    <tr>
        <td><code>isStarted()</code></td>
        <td><code>isActive()</code></td>
    </tr>
    <tr>
        <td><code>isCreated()</code></td>
        <td><code>isActive()</code></td>
    </tr>
    <tr>
        <td><code>isCompleted()</code></td>
        <td><code>isCompleted()</code></td>
    </tr>
    <tr>
        <td><code>isNotCompleted()</code></td>
        <td>Not supported</td>
    </tr>
    <tr>
        <td><code>isTerminated()</code></td>
        <td><code>isTerminated()</code></td>
    </tr>
    <tr>
        <td><code>isNotTerminated()</code></td>
        <td>Not supported</td>
    </tr>
    <tr>
        <td><code>isWaitingAtElements()</code></td>
        <td><code>hasActiveElements()</code></td>
    </tr>
    <tr>
        <td><code>isNotWaitingAtElements()</code></td>
        <td><code>hasNoActiveElements()</code></td>
    </tr>
    <tr>
        <td><code>isWaitingExactlyAtElements()</code></td>
        <td><code>hasActiveElementsExactly()</code></td>
    </tr>
    <tr>
        <td><code>hasPassedElement()</code></td>
        <td><code>hasCompletedElement()</code></td>
    </tr>
    <tr>
        <td><code>hasNotPassedElement()</code></td>
        <td><code>hasNotActivatedElements()</code></td>
    </tr>
    <tr>
        <td><code>hasPassedElementsInOrder()</code></td>
        <td><code>hasCompletedElementsInOrder()</code></td>
    </tr>
    <tr>
        <td><code>hasVariable()</code></td>
        <td><code>hasVariableNames()</code></td>
    </tr>
    <tr>
        <td><code>hasVariableWithValue()</code></td>
        <td><code>hasVariable()</code></td>
    </tr>
    <tr>
        <td><code>hasAnyIncidents()</code></td>
        <td><code>hasActiveIncidents()</code></td>
    </tr>
    <tr>
        <td><code>hasNoIncidents()</code></td>
        <td><code>hasNoActiveIncidents()</code></td>
    </tr>
    <tr>
        <td><code>isWaitingForMessages()</code></td>
        <td>Not yet supported</td>
    </tr>
    <tr>
        <td><code>isNotWaitingForMessages()</code></td>
        <td>Not yet supported</td>
    </tr>
    <tr>
        <td><code>hasCorrelatedMessageByName()</code></td>
        <td>Not yet supported</td>
    </tr>
    <tr>
        <td><code>hasCorrelatedMessageByCorrelationKey()</code></td>
        <td>Not yet supported</td>
    </tr>
    <tr>
        <td><code>hasCalledProcess()</code></td>
        <td>Not supported</td>
    </tr>
    <tr>
        <td><code>hasNotCalledProcess()</code></td>
        <td>Not supported</td>
    </tr>
</table>

#### Deployment assertions

ZPT's deployment assertions in the form of `BpmnAssert.assertThat(DeploymentEvent)` are **not support**. Instead, you can
use AssertJ to verify the properties of the deployment event.

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

#### Job assertions

ZPT's job assertions in the form of `BpmnAssert.assertThat(ActivatedJob)` are **not support**. Instead, you can
use AssertJ to verify the properties of the job event.

```java
// given
ActivatedJob activatedJob = //

// ZPT:
BpmnAssert.assertThat(activatedJob).hasElementId("elementId");

// CPT:
Assertions.assertThat(activatedJob.getElementId()).isEqualTo("elementId");
```

#### Message assertions

ZPT's message assertions in the form of `BpmnAssert.assertThat(PublishMessageResponse)` are **not support**. Instead,
you could use a [ProcessInstanceSelector](/apis-tools/testing/assertions.md#with-process-instance-selector) to find the
correlated process instance, or use
the [correlate message API](/apis-tools/orchestration-cluster-api-rest/specifications/correlate-message.api.mdx)
that returns the process instance key.

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

CamundaAssert.assertThat(ProcessInstanceSelectors.byKey(correlateMessageResponse.getProcessInstanceKey()))
    .isCompleted();
```

### Inspection utilities

Use selectors

```java
CamundaAssert.assertThat(ProcessInstanceSelectors.byProcessId("PROCESS_ID"));
```

### ZeebeTestEngine utilities

- `ZeebeTestEngine.increaseTime(duration);` to `CamundaProcessTestContext.increaseTime(duration);` + assert that the BPMN timer event is active

- Remove `ZeebeTestEngine.waitForIdleState(duration)`
- Remove `ZeebeTestEngine.waitForBusyState(duration)`

## Next steps

- Migrate to the Camunda SDK

## FAQ

- No embedded engine
- Slow
- No wait for idle
- Process Test Coverage
