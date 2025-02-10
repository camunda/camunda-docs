---
title: "Testing process definitions in Camunda 7"
tags:
  - Test / Unit Test
  - Test / Integration Test
  - Mock
  - Exception
  - Java Delegate
  - JUnit
description: "Camunda supports writing tests in Java. Step through an example, the basic ideas of test scopes, and testing in chunks with Camunda 7."
---

Camunda 7 also has support for writing tests in Java. This section gives you an example, the basic ideas of test scopes and testing in chunks are also valid with Camunda 7.

The technical setup for Camunda 7:

1. Use [_JUnit_](http://junit.org) as unit test framework.
2. Use Camunda's [JUnit Extension](https://github.com/camunda/camunda-bpm-platform/tree/7.17.0/test-utils/junit5-extension) to ramp up an in-memory process engine where the [JobExecutor](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.17/org/camunda/bpm/engine/test/Deployment.html) is turned off.
3. Use Camunda's [@Deployment](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.17/org/camunda/bpm/engine/test/Deployment.html) annotation to deploy and un-deploy one or more process definitions under test for a single test method.
4. Use [camunda-bpm-assert](http://github.com/camunda/camunda-bpm-assert) to easily check whether your expectations about the state of the process are met.
5. Use mocking of your choice, e.g. [Mockito](http://mockito.org) to mock service methods and verify that services are called as expected.
6. Use Camunda's [MockExpressionManager](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.17/org/camunda/bpm/engine/test/mock/MockExpressionManager.html) to resolve bean names used in your process definition without the need to ramp up the dependency injection framework (like CDI or Spring).
7. Use an [In-Memory H2 database](http://www.h2database.com/html/features.html#in_memory_databases) as default database to test processes on developer machines. If required, you can run the same tests on _multiple databases_, e.g. Oracle, DB2, or MS-SQL on a CI-Server. To achieve that, you can make use of (e.g. Maven) profiles and Java properties files for database configuration.

Let's use the same example as above.

A typical test case will look like this:

```java
// ...
import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*; // <4>
import static org.mockito.Mockito.*; // <5>

@ExtendWith({ProcessEngineExtension.class, MockitoExtension.class}) // <1> <5>
class TwitterTest {

  @Mock // Mockito mock instantiated by MockitoExtension <5>
  private TweetPublicationService tweetPublicationService;

  @BeforeEach
  void setup() {
	// ...
    TweetPublicationDelegate tweetPublicationDelegate = new TweetPublicationDelegate(tweetPublicationService);
    Mocks.register("tweetPublicationDelegate", tweetPublicationDelegate); // <6>
  }

  @Test // <1>
  @Deployment(resources = "twitter/TwitterDemoProcess.bpmn") // <3>
  void testTweetApproved() {
	// ...
  }
// ...
}
```

The service task **Publish on Twitter** delegates to Java code:

```xml
<serviceTask id="service_task_publish_on_twitter" camunda:delegateExpression="#{tweetPublicationDelegate}" name="Publish on Twitter">
</serviceTask>
```

And this _Java delegate_ itself calls a business method:

```java
@Named
public class TweetPublicationDelegate implements JavaDelegate {

  private final TweetPublicationService tweetPublicationService;

  @Inject
  public TweetPublicationDelegate(TweetPublicationService tweetPublicationService) {
    this.tweetPublicationService = tweetPublicationService;
  }

  public void execute(DelegateExecution execution) throws Exception {
    String tweet = new TwitterDemoProcessVariables(execution).getTweet();  // <1>
    // ...
    try {
      tweetPublicationService.tweet(tweet); // <2>
    } catch (DuplicateTweetException e) {
      throw new BpmnError("duplicateMessage"); // <3>
    }
  }
// ...
```

The TweetPublicationService is mocked:

```java
@Mock // 1
private TweetPublicationService tweetPublicationService;

@BeforeEach
void setup() {
  // set up java delegate to use the mocked tweet service
  TweetPublicationDelegate tweetPublicationDelegate = new TweetPublicationDelegate(tweetPublicationService);  // <2>
  // register a bean name with mock expression manager
  Mocks.register("tweetPublicationDelegate", tweetPublicationDelegate); // <3>
}

@AfterEach
void teardown() {
  Mocks.reset();  // <3>
}
```

Now you can test the happy path to a published tweet:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
void testTweetApproved() {
  // given
  ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
    "TwitterDemoProcess",
    withVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET, TWEET)); // <1>
  assertThat(processInstance).isStarted();
  // when
  complete(task(), withVariables(TwitterDemoProcessConstants.VAR_NAME_APPROVED, true)); // <2>
  // then
  assertThat(processInstance) // <3>
    .hasPassed("end_event_tweet_published")
    .hasNotPassed("end_event_tweet_rejected")
    .isEnded();
  verify(tweetPublicationService).tweet(TWEET); // <4>
  verifyNoMoreInteractions(tweetPublicationService);
}
```

As a next step, you might want to test the path where a tweet gets rejected. You don't have to start at the start event, but can start anywhere in your process:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
void testTweetRejected() {

  // create a process instance directly at the point at which a tweet was rejected
  ProcessInstance processInstance = runtimeService()
    .createProcessInstanceByKey("TwitterDemoProcess")
    .startBeforeActivity("service_task_publish_on_twitter")
    .setVariables(variables)
  .execute();
  assertThat(processInstance)
    .isStarted()
    .hasPassed("service_task_publish_on_twitter")
    .hasVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET);

  // when
  complete(task(), withVariables(TwitterDemoProcessConstants.VAR_NAME_APPROVED, false));  // <2>

  // then
  assertThat(processInstance)
    .hasPassed("end_event_tweet_rejected")
    .hasNotPassed("end_event_tweet_published")
    .isEnded();
  verifyZeroInteractions(tweetPublicationService);
}
```

You could also implement another `testTweetDuplicated()` to verify the logic in case a tweet turns out to be a duplicate and is rejected by Twitter. For this case, we attached an error event to the service task **Publish on Twitter**. In the BPMN XML we observe an error event defined with an errorCode `duplicateMessage`.

```xml
  <boundaryEvent id="boundary_event_tweet_duplicated" name="Tweet duplicated" attachedToRef="service_task_publish_on_twitter">
    <errorEventDefinition id="error_event_definition_tweet_duplicated" errorRef="error_tweet_duplicated"/>
  </boundaryEvent>
<error id="error_tweet_duplicated" errorCode="duplicateMessage" name="Tweet duplicated"/>
```

Above, we already saw the Java delegate code throwing the BPMN error exception with that code `duplicateMessage`. Here is the method testing for the case a tweet is duplicated:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
void testTweetDuplicated() {
  // given
  doThrow(new DuplicateTweetException()) // <1>
    .when(tweetPublicationService).tweet(anyString());
  // when
  ProcessInstance processInstance = rejectedTweet(withVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET, TWEET));  // <2>
  // then
  assertThat(processInstance) // <3>
    .hasPassed("boundary_event_tweet_duplicated")
    .hasNotPassed("end_event_tweet_rejected").hasNotPassed("end_event_tweet_published")
    .isWaitingAt("user_task_handle_duplicate");
  verify(tweetPublicationService).tweet(TWEET);  // <4>
  verifyNoMoreInteractions(tweetPublicationService);
  // when
  complete(task()); // <5>
  // then
  assertThat(processInstance)  // <6>
    .isWaitingAt("user_task_review_tweet")
    .hasVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET)
    .task().isAssignedTo("demo");
}
```
