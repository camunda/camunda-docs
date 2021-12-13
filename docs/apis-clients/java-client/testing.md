---
id: testing
title: "Writing tests"
---

:::caution
This project is in very early stages of development. Using this in a production environment is not recommended
until a stable version has been published.
:::

You can use the `zeebe-process-test` library to write JUnit tests for your BPMN process. The library
will start an in-memory Zeebe engine and provide some basic assertions to verify your process behaves
as expected.

## Prerequisites

In order to use this library you will need:

- Java 11 or higher (in the future Java 8 will also be supported)
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

Annotate your test class with the `@ZeebeProcessTest` annotation. This annotation will do multiple things:

1. It will create and start the in memory engine. This will be a new engine for each test case.
2. It will create a client which can be used to interact with the engine.
3. It will (optionally) inject 3 fields in your test class:
    1. `InMemoryEngine` - This is the engine that will run your process. It will provide some basic functionality
       to help you write your tests, such as waiting for an idle state and increasing the time.
    2. `ZeebeClient` - This is the client that allows you to communicate with the engine.
       It allows you to send commands to the engine.
    3. `RecordStreamSource` - This gives you access to all the records that are processed by the engine.
       It is what the assertions are using to verify expectations. This grants you the freedom to create your own assertions.
4. It will take care of cleaning up the engine and client when the testcase is finished.

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

You can start an assertion by using of the following entry points.

### Deployment Assertions
```java
DeploymentEvent event = client.newDeployCommand()
  .addResourceFromClasspath("my-process.bpmn")
  .send()
  .join();
DeploymentAssert assertions = BpmnAssert.assertThat(event);
```

### Process Instance Assertions
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

### Job Assertions
```java
ActivateJobsResponse response = client.newActivateJobsCommand()
  .jobType("jobType")
  .maxJobsToActivate(1)
  .send()
  .join();
ActivatedJob activatedJob = response.getJobs().get(0);
JobAssert assertions = BpmnAssert.assertThat(activatedJob);
```

### Message Assertions
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
Waiting for idle state is a new feature. When the engine is detected to be idle itœ
will wait 10ms before checking again. If it is still idle at that stage it is considered to be in
an idle state.

**It is unknown if the 10ms delay is sufficient. Using it could result in flaky tests!**

Any feedback about the wait for idle state is highly appreciated! Please let us know if the delay should be higher, or configurable.
Please leave you feedback on our [GitHub page](https://github.com/camunda-cloud/zeebe-process-test/issues).
:::

The engine allows you to wait until it is idle before continuing with your test. It will provide you with 2 methods to achieve this:

1. `engine.waitForIdleState()` - This method will cause your test to stop executing until the engine has reached the idle state.
2. `engine.runOnIdleState(Runnable)` - This method will run your runnable once it has reached an idle state. Your test will continue executing without waiting.

An idle state is defined as a state in which the process engine makes no progress and is waiting for new commands or events to trigger.
Once the engine has detected it became idle it will wait for a fixed delay (10ms) and check if it is still idle.
If this is the case it is considered to be in idle state and continue your test / execute the runnables.

## Examples
For example tests, please refer to [GitHub](https://github.com/camunda-cloud/zeebe-process-test/tree/main/src/test/java/io/camunda/zeebe/process/test/assertions)