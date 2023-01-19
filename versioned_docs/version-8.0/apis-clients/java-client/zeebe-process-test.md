---
id: zeebe-process-test
title: "Zeebe Process Test"
---

[Zeebe Process Test](https://github.com/camunda-cloud/zeebe-process-test) allows you to unit test your Camunda Platform 8 BPMN
processes. It will start a Zeebe test engine and provide you with a set of assertions you can use to verify your process
behaves as expected.

## Prerequisites

This library requires the following:

- Java 17+ when running with an embedded engine (`zeebe-process-test-extension`)
- Java 8+ and Docker when running using testcontainers (`zeebe-process-test-extension-testcontainer`)
- JUnit 5

## Dependency

Zeebe Process Test provides you with two dependencies. Which one you need to use is dependent on the
Java version you are using.

#### Testcontainers (JDK 8+)

If you are building your project with a JDK lower than 17, you need to use the `testcontainer` dependency. It
starts a `testcontainer` in which a Zeebe test engine is running. The advantage of using this version
instead of the embedded version is that your code can be implemented independently of the Java
version that is used by the Zeebe engine. The downside is that `testcontainers` provide some
overhead, which means tests will be slower. There is also the extra requirement that Docker must be
running to execute the tests.

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>zeebe-process-test-extension-testcontainer</artifactId>
  <version>X.Y.Z</version>
  <scope>test</scope>
</dependency>
```

#### Embedded (JDK 17+)

If you are building your project with JDK 17+, you can make use of an embedded Zeebe test engine. The
advantage of using this instead of the `testcontainer` version is that this is the faster solution.
This also does not require Docker to be running. The downside to this solution is that the JDK
requirement is bound to the Java version of the Zeebe engine. Whenever this Java version changes,
you'd either have to [switch to the testcontainer version](#switching-between-testcontainers-and-embedded),
or upgrade your own JDK to match the Zeebe engine.

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>zeebe-process-test-extension</artifactId>
    <version>X.Y.Z</version>
    <scope>test</scope>
</dependency>
```

## Annotation

Annotate your test class with the `@ZeebeProcessTest` annotation. This annotation will do a couple of things:

1. It will manage the lifecycle of the testcontainer/embedded test engine.
2. It will create a client which can be used to interact with the engine.
3. It will (optionally) inject three fields in your test class:
   1. `ZeebeTestEngine` - This is the engine that will run your process. It will provide some basic functionality
      to help you write your tests, such as waiting for an idle state and increasing the time.
   2. `ZeebeClient` - This is the client that allows you to send commands to the engine, such as
      starting a process instance. The interface of this client is identical to the interface you
      use to connect to a real Zeebe engine.
   3. `RecordStream` - This gives you access to all the records processed by the engine.
      Assertions use the records for verifying expectations. This grants you the freedom to create your own assertions.

```java
// When using the embedded test engine (Java 17+)
import io.camunda.zeebe.process.test.extension.ZeebeProcessTest;

// When using testcontainers (Java 8+)
import io.camunda.zeebe.process.test.extension.testcontainer.ZeebeProcessTest;

@ZeebeProcessTest
class DeploymentAssertTest {
    private ZeebeTestEngine engine;
    private ZeebeClient client;
    private RecordStream recordStream;
}
```

## Switching between testcontainers and embedded

Switching between testcontainers and embedded requires just two steps:

1. Switch to the relevant dependency.

   - Testcontainers: `zeebe-process-test-extension-testcontainer`
   - Embedded: `zeebe-process-test-extension`

2. Change the import of `@ZeebeProcessTest`.
   - Testcontainers: `import io.camunda.zeebe.process.test.extension.testcontainer.ZeebeProcessTest;`
   - Embedded: `import io.camunda.zeebe.process.test.extension.ZeebeProcessTest;`

## Assertions

Start an assertion using the following entry points:

### Deployment assertions

```java
DeploymentEvent event = client.newDeployResourceCommand()
  .addResourceFromClasspath("my-process.bpmn")
  .send()
  .join();
DeploymentAssert assertions = BpmnAssert.assertThat(event);
```

### Process instance assertions

Started by manually sending an event:

```java
ProcessInstanceEvent event = client.newCreateInstanceCommand()
  .bpmnProcessId("<processId>")
  .latestVersion()
  .send()
  .join();
ProcessInstanceAssert assertions = BpmnAssert.assertThat(event);
```

```java
ProcessInstanceResult event = client.newCreateInstanceCommand()
  .bpmnProcessId("<processId>")
  .latestVersion()
  .withResult()
  .send()
  .join();
  ProcessInstanceAssert assertions = BpmnAssert.assertThat(event);
```

Started by a timer:

```java
Optional<InspectedProcessInstance> firstProcessInstance = InspectionUtility.findProcessEvents()
  .triggeredByTimer(ProcessPackTimerStartEvent.TIMER_ID)
  .findFirstProcessInstance();
ProcessInstanceAssert assertions = BpmnAssert.assertThat(firstProcessInstance.get());
```

Started by a call activity:

```java
Optional<InspectedProcessInstance> firstProcessInstance = InspectionUtility.findProcessInstances()
  .withParentProcessInstanceKey(<key>)
  .withBpmnProcessId("<called process id>")
  .findFirstProcessInstance();
ProcessInstanceAssert assertions = BpmnAssert.assertThat(firstProcessInstance.get());
```

### Job assertions

```java
ActivateJobsResponse response = client.newActivateJobsCommand()
  .jobType("<jobType>")
  .maxJobsToActivate(1)
  .send()
  .join();
ActivatedJob activatedJob = response.getJobs().get(0);
JobAssert assertions = BpmnAssert.assertThat(activatedJob);
```

### Message assertions

```java
PublishMessageResponse response = client
  .newPublishMessageCommand()
  .messageName("<messageName>")
  .correlationKey("<correlationKey>")
  .send()
  .join();
MessageAssert assertions = BpmnAssert.assertThat(response);
```

### Incident assertions

Via a process instance

```java
ProcessInstanceEvent event = client.newCreateInstanceCommand()
  .bpmnProcessId("<processId>")
  .latestVersion()
  .send()
  .join();
IncidentAssert assertions = BpmnAssert.assertThat(event)
  .extractingLatestIncident();
```

Via a job:

```java
ActivateJobsResponse response = client.newActivateJobsCommand()
  .jobType("<jobType>")
  .maxJobsToActivate(1)
  .send()
  .join();
ActivatedJob activatedJob = response.getJobs().get(0);
IncidentAssert assertions = BpmnAssert.assertThat(activatedJob)
  .extractingLatestIncident();
```

## Waiting for idle state

:::caution
Waiting for idle state is a new feature. When the engine is detected to be idle, it
will wait 30ms before checking again. If it is still idle at that stage, it is considered to be in
an idle state.

**It is unknown if the 30ms delay is sufficient. Using it could result in flaky tests!**

Any feedback about the wait for idle state is highly appreciated. Let us know if the delay should be higher or configurable.
Leave your feedback on our [GitHub page](https://github.com/camunda-cloud/zeebe-process-test/issues).
:::

`engine.waitForIdleState(timeout)` will cause your test to stop executing until the engine has
reached an idle state. If the engine does not reach an idle state within the specified timeout, a
`TimeoutException` will be thrown.

We have defined an idle state as a state in which the engine makes no progress and is waiting for
new commands or events to trigger. Once the engine has detected it has become idle, it will wait for
a delay (30ms) and check if it is still idle. If this is the case, it is considered to be in idle
state and continue your test.

## Wait for busy state

`engine.waitForBusyState(timeout)` will cause your test to stop executing until the engine has
reached a busy state. If the engine does not reach a busy state within the specified timeout, a
`TimeoutException` is thrown.

We consider the engine to have reached a busy state when any new record/command is processed since
we've started waiting.

Waiting for a busy state is useful in scenarios where you're expecting the engine to start doing
something, without explicitly triggering it yourself. An example of this would be a process with a
timer event. We can increase the time of the engine, but we cannot trigger the timer explicitly.
Because of this, we should wait for a busy state after increasing the engine time.

## Examples

For example tests, refer to [GitHub](https://github.com/camunda-cloud/zeebe-process-test).
