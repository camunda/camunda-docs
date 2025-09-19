---
id: migrate-to-camunda-process-test
title: Migrate to Camunda Process Test
sidebar_label: "Camunda Process Test"
description: "Learn how to migrate from Zeebe Process Test to Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Camunda Process Test](/apis-tools/testing/getting-started.md) (CPT) is a library to test your BPMN processes and your process applications. It is the successor to [Zeebe Process Test](/apis-tools/testing/zeebe-process-test.md) (ZPT).  
Starting with version **8.8**, ZPT is deprecated and will be removed in version **8.10**.  
See the [announcement](https://camunda.com/blog/2025/04/camunda-process-test-the-next-generation-testing-library/) for details.

This guide walks you through migrating your existing test cases from ZPT to CPT step-by-step.

:::note
Be aware that there are differences between ZPT and CPT in both API and behavior, which may increase migration effort depending on your existing test cases.

**Key differences:**

- **Underlying engine:** ZPT uses only Camunda’s workflow engine (Zeebe) with access to internal components, whereas CPT runs the full Camunda distribution and interacts with the Orchestration Cluster API.
- **Assertions and utilities:** CPT uses different names to align with the API, and not all ZPT assertions/utilities have equivalents in CPT.
- **Startup time:** CPT takes longer to start as it runs the full Orchestration Cluster distribution.

**Key advantages of CPT:**

- Access to Camunda’s Orchestration Cluster API and Connectors
- Support for Camunda user tasks
- Blocking assertions for asynchronous processing
- Enhanced mocking utilities
  :::

## Update your dependency

First, update your Maven dependency.

- **If you use ZPT with Camunda Spring Boot Starter integration**  
  (`artifactId: spring-boot-starter-camunda-test` or `spring-boot-starter-camunda-test-testcontainer`),  
  replace it with **CPT’s Spring integration module**.

- **If you use ZPT without Spring**  
  (`artifactId: zeebe-process-test-extension` or `zeebe-process-test-extension-testcontainer`),  
  replace it with **CPT’s Java module**.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
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

Next, choose how you want to run CPT, considering your environment. CPT can be used in two modes:

- CPT with Testcontainers (as equivalent to ZPT with Testcontainers)
- CPT with remote engine (as equivalent to ZPT's embedded runtime)

### ZPT with Testcontainers

If you use ZPT with Testcontainers (
`artifactId: zeebe-process-test-extension-testcontainer/spring-boot-starter-camunda-test-testcontainer`), then you can
use CPT's default Testcontainers runtime without
additional changes. Check the documentation on how to use CPT with Testcontainers [here](/apis-tools/testing/configuration.md#testcontainers-runtime)

### ZPT's embedded runtime

If you use ZPT’s **embedded runtime**  
(`artifactId: zeebe-process-test-extension` or `spring-boot-starter-camunda-test`),  
switch to CPT’s [remote runtime](/apis-tools/testing/configuration.md#remote-runtime).  
Choose this option only if you cannot install a Docker-API compatible container runtime (e.g., Docker on Linux or Docker Desktop).

In this mode, CPT connects to a remote runtime, such as a local Camunda 8 Run running on your machine.
Prepare your remote runtime:

1. **Install Camunda 8 Run**  
   Follow the [installation guide](/self-managed/quickstart/developer-quickstart/c8run.md#install-and-start-camunda-8-run) on your machine.

2. **Enable the management clock endpoint**  
   See [prerequisites](/apis-tools/testing/configuration.md#prerequisites-1):

   - Create an `application.yaml` file in the root `/c8run` directory.
   - Add:
     ```yaml
     zeebe.clock.controlled: true
     ```

3. **Start Camunda 8 Run**.

4. **Switch CPT’s runtime mode** to `remote` in your project configuration.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    runtime-mode: remote
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```
runtimeMode=remote
```

</TabItem>
</Tabs>

## Migrate your process tests

Now, it's time to migrate your process tests.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

First, migrate the general test class structure:

1. **Replace annotations and types**

   - Replace `@ZeebeSpringTest` with `@CamundaSpringProcessTest`
   - Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`

2. **Remove record stream fields**  
   CPT does not provide direct access to records. Instead, use the SDK to request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Below is an example of a ZPT test class:

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

First, migrate the general test class structure:

- Replace the annotation `@ZeebeProcessTest` with `@CamundaProcessTest`.
- Replace the type `ZeebeTestEngine` with `CamundaProcessTestContext`.
- Remove the field for `RecordStream`. CPT does not provide direct access to records; instead, use the SDK to request data from the [API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Below is an example of a ZPT test class:

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

This is the equivalent CPT test class:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
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

Then, review all test methods and migrate the assertions and utilities. See the following sections for detailed
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

ZPT provides the `InspectionUtility` to locate process instances and pass them to assertions. Some assertions also include methods to extract related entities, such as `extractingProcessInstance()` or `extractingLatestIncident()`.

CPT offers a similar utility via the [ProcessInstanceSelector](/apis-tools/testing/assertions.md#with-process-instance-selector`), which can be used with `CamundaAssert.assertThatProcessInstance()`. For other entities, you can use the Camunda client to search for the entity and implement a [custom assertion](/apis-tools/testing/assertions.md#custom-assertions).

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

ZPT provides the `ZeebeTestEngine` utilities to interact with the runtime, for example, to advance time.

CPT offers a similar utility via the [CamundaProcessTestContext](/apis-tools/testing/utilities.md), but the following utilities are **not supported**:

- `waitForIdleState(duration)`
- `waitForBusyState(duration)`

CPT does not require these utilities because it provides [blocking assertions](/apis-tools/testing/assertions.md) that wait until the expected condition is fulfilled.

```java
// ZPT
engine.waitForIdleState(duration);
engine.increaseTime(Duration.ofDays(1));

// CPT:
assertThat(processInstance).hasActiveElements("timer_event");

processTestContext.increaseTime(Duration.ofDays(1));
```

## Next steps

Congratulations! Your process tests should now be fully migrated to CPT and running successfully.

When you’re ready, take the next steps to continue your journey:

- Explore new [assertions](/apis-tools/testing/assertions.md)
- Simplify your tests with new [utilities](/apis-tools/testing/utilities.md)
- Generate process test coverage reports (coming soon)

## Troubleshooting

If you encounter issues with the migration or notice missing features, please report them in the [Camunda GitHub repository](https://github.com/camunda/camunda/issues).
