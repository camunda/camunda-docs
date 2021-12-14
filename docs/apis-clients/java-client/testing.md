---
id: testing
title: "Writing tests"
---

:::caution
This project is in very early stages of development. Using this in a production environment is not recommended
until a stable version is published.
:::

You can use the `zeebe-process-test` library to write JUnit tests for your BPMN process. The library starts an in-memory Zeebe engine and provides some basic assertions to verify your process behaves
as expected.

## Prerequisites

This library requires the following:

- Java 11 or higher (in the future, Java 8 will also be supported)
- JUnit 5 (Jupiter)

## Dependency

Add `zeebe-process-test` as a Maven test dependency to your project:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>zeebe-process-test</artifactId>
  <version>X.Y.Z</version>
  <scope>test</scope>
</dependency>
```

## Annotation

Annotate your test class with the `@ZeebeProcessTest` annotation. This annotation does multiple things:

1. Creates and starts the in-memory engine. This will be a new engine for each test case.
2. Creates a client which can be used to interact with the engine.
3. Optionally, injects three fields in your test class:
    1. `InMemoryEngine` - The engine that will run your process and provides some basic functionality
       to help you write your tests, such as waiting for an idle state and increasing the time.
    2. `ZeebeClient` - The client that allows you to communicate with the engine.
       It allows you to send commands to the engine.
    3. `RecordStreamSource` - Gives you access to all the records processed by the engine.
       It is what the assertions are using to verify expectations. This grants you the freedom to create your own assertions.
4. Cleans up the engine and client when the test case is finished.

```java
@ZeebeProcessTest
class ExampleTest {
  // Optionally inject these 3 fields
  private InMemoryEngine engine;
  private ZeebeClient client;
  private RecordStreamSource recordStreamSource;
}
```

## Assertions

Start an assertion using the following entry points:

### Deployment assertions

```java
DeploymentEvent event = client.newDeployCommand()
  .addResourceFromClasspath("my-process.bpmn")
  .send()
  .join();
DeploymentAssert assertions = BpmnAssert.assertThat(event);
```

### Process instance assertions

Started by manually sending an event:
```java
ProcessInstanceEvent event = client.newCreateInstanceCommand()
  .bpmnProcessId("processId")
  .latestVersion()
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
  .withBpmnProcessId("calledProcessId")
  .findFirstProcessInstance();
ProcessInstanceAssert assertions = BpmnAssert.assertThat(firstProcessInstance.get());
```

### Job assertions

```java
ActivateJobsResponse response = client.newActivateJobsCommand()
  .jobType("jobType")
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
  .messageName("messageName")
  .correlationKey("correlationKey")
  .send()
  .join();
MessageAssert assertions = BpmnAssert.assertThat(response);
```

## Waiting for idle state

:::caution
Waiting for idle state is a new feature. When the engine is detected to be idle, it
will wait 10ms before checking again. If it is still idle at that stage, it is considered to be in
an idle state.

**It is unknown if the 10ms delay is sufficient. Using it could result in flaky tests!**

Any feedback about the wait for idle state is highly appreciated. Let us know if the delay should be higher or configurable.
Leave your feedback on our [GitHub page](https://github.com/camunda-cloud/zeebe-process-test/issues).
:::

The engine allows you to wait until it is idle before continuing with your test. It will provide you with two methods to achieve this:

1. `engine.waitForIdleState()` - This method causes your test to stop executing until the engine reaches the idle state.
2. `engine.runOnIdleState(Runnable)` - This method runs your runnable once it reaches an idle state. Your test will continue executing without waiting.

An idle state is defined as a state in which the process engine makes no progress and is waiting for new commands or events to trigger.
Once the engine detects it is idle, it waits for a fixed delay (10ms) and checks if it is still idle.
If this is the case, it is considered to be in idle state, continues your tests, and executes the runnables.

## Examples

For example tests, refer to [GitHub](https://github.com/camunda-cloud/zeebe-process-test/tree/main/src/test/java/io/camunda/zeebe/process/test/assertions).