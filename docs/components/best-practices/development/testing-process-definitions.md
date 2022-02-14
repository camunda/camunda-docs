---
title: "Testing process definitions"
stakeholders: Development
tags:
    - Test / Unit Test
    - Test / Integration Test
    - Mock
    - Exception
    - Java Delegate
    - JUnit
topics:
    - Customer Success Path
weight: 130

booksection: "D. Automation"
bookchapter: 5
---

Test your executable BPMN processes, they are software. If possible, do automated unit tests with a fast in-memory workflow engine. Before releasing, verify with integration tests close to your real-life environment, which might include human-driven, exploratory integration tests.



## Testing Scopes

There are basically three typical test scopes disced when building process solutions:

1. **Unit tests**: Testing all programming code you developed for your process solution. This is typically pretty much independant of the process model and Camunda.
2. **Process tests**: Testing the expected behavior of the process model, including glue code and specicially the data flowing through the process model.
3. **Integration tests**: Testing the system in a close-to-real-life-environment to make sure it is really working. 

![Scopes](testing-process-definitions-assets/scopes.png)

### Unit tests (Scope 1)

Unit testing itself is not discussed here, as this is a common practice for software development.

### Process tests (Scope 2)

Test the execution behaviour of a process definition. To run those tests frequently, they should behave like unit tests, executed single threaded and in-memory without the need for an external resource. 


### Integration tests (Scope 3)

Test the process close to to a real-life environment, which is potentially *multi threaded*.

Verify that "it really works" before releasing a new version of your process definition, which includes *human-driven*, *exploratory* tests.

Clearly *define your goals* for scope 3! Goals could be

* end user & acceptance tests,
* complete end-to-end tests,
* performance & load tests, etc...

Carefully consider to *automate* tests on scope 3. You need to look at the overall effort spent on writing test automation code and maintaining it, when being compared with executing human-driven tests for your software project's lifespan. The best choice depends very much on the frequency of regression test runs!

Most effort is typically invested in setting up proper test data in surrounding systems.


Configure your tests to be dedicated integration tests, and seperate them from unit or process tests.


Some tools that are interessting to look at involve [JMeter](http://jmeter.apache.org/) for load tests, [SoapUI](http://www.soapui.org/) for functional tests of services, [Selenium](http://www.seleniumhq.org/) for frontend tests and [TestLink](http://testlink.org/) for test scenario descriptions. Also consider to use a JavaScript stack for frontend tests: we use [Mocha](http://mochajs.org/), [Chai](https://github.com/chaijs/chai), [Grunt](http://gruntjs.com/), [Karma](http://karma-runner.github.io), [Protractor](https://angular.github.io/protractor).


## Writing process tests in Java

:::caution Camunda Cloud only
This section targets Camunda Cloud. Please refer to the specific section below if you are looking for Camunda Platform 7.x. 
:::

This section describes how to write process tests as unit tests in Java. Later in this best practice you will find some information on writing tests in other languages like NodeJs or C#.

When using Java, most customers use Spring Boot. While this is a common setup of customers, it is of course not the only one. You find some more examples on plan Java process tests in the readme of the [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test) project.


### Technical setup using Spring

:::caution JUnit 5
You need to use JUnit 5. Please double check that you really use JUnit 5 in every test class: the `@Test` annotation you import needs to be `org.junit.jupiter.api.Test`.
:::

1. Use [*JUnit 5*](http://junit.org) as unit test framework.
2. Use [spring-zeebe](https://github.com/camunda-community-hub/spring-zeebe)
3. Use `@ZeebeSpringTest` to to ramp up an in-memory process engine.
4. Use annotations from [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test/) to check whether your expectations about the state of the process are met.
5. Use mocking of your choice, e.g. [Mockito](http://mockito.org) to mock service methods and verify that services are called as expected.

A test can now look like the following example:

```java
@SpringBootTest
@ZeebeSpringTest
public class TestTwitterProcess {

    @Autowired
    private ZeebeClient zeebe;

    @MockBean
    private TweetPublicationService tweetPublicationService;

    @Test
    public void testTweetApproved() {
        TwitterProcessVariables variables = new TwitterProcessVariables()
            .setTweet("Hello world")
            .setApproved(true);

        ProcessInstanceEvent processInstance = zeebe.newCreateInstanceCommand() //
            .bpmnProcessId("TwitterDemoProcess").latestVersion() //
            .variables(variables).send().join();

        waitForProcessInstanceCompleted(processInstance);
        Mockito.verify(tweetPublicationService).tweet("Hello world");
    }
}
```

### Test scope and mocking

In such a test case, you want to test the the executable BPMN process definition plus all the glue code which logically belongs to the process definition in a wider sense.  Typical examples of glue code you want to include in a process test are:

* Worker code, typically connected to a service task
* Expressions (FEEL) used in your process model for gateway decisions or input/output mappings
* Other glue code, for example a REST API, that just does data mapping and delegates to the workflow engine

In the example above, this is the worker code and the REST API:

![Process test scope example](testing-process-definitions-assets/process-test-scope-example.png)

Workflow engine independent business code should *not* be included in the tests. In the twitter example, the `TwitterService` will be mocked, and the `TwitterWorker` will still read process variables and call this mock. This way you can make test the process model, the glue code, and the data flow in your process test.


The following code examples highlights the important aspects around mocking.

The `PublishTweetWorker` is executed as part of the test. It does input data mapping **(1)** and also translates a specific business exception into a BPMN error **(2)**:

```java
@Autowired
private TwitterService twitterService;

@ZeebeWorker( type = "publish-tweet", autoComplete = true)
public void handleTweet(@ZeebeVariablesAsType TwitterProcessVariables variables) throws Exception {
    try {
        twitterService.tweet(
          variables.getTweet() // 1
        ); 
    } catch (DuplicateTweetException ex) { // 2
        throw new ZeebeBpmnError("duplicateMessage", "Could not post tweet, it is a duplicate.");
    }
}
```

The `TwitterService` is considered a business service (it could for example wrap the twitter4j API) and shall *not* be executed during the test. This is why this interface is mocked:


```java
@MockBean
private TwitterService tweetPublicationService;

@Test
public void testTweetApproved() throws Exception {
    // ...
    // Using Mockito you can make sure a business method was called with the expected parameter
    Mockito.verify(tweetPublicationService).tweet("Hello world"); 
}

@Test
public void testDuplicate() throws Exception {
    // Using Mockito you can define what should happen if a method is called, in this case an exception is thrown to simulate a business error
    Mockito.doThrow(new DuplicateTweetException("DUPLICATE")).when(tweetPublicationService).tweet(anyString());
    //...
```


### Drive the process and assert the state

For tests, you drive the process from waitstate to waitstate and assert that you see the expected process and variable states. The test method `testTweetApproved()` tests the happy path to a published tweet:

```java
@Test
public void testTweetApproved() throws Exception {
    TwitterProcessVariables variables = new TwitterProcessVariables()
        .setTweet("Hello world")
        .setApproved(true); // TODO: Add Human Task to the test

    ProcessInstanceEvent processInstance = zeebe.newCreateInstanceCommand() //
        .bpmnProcessId("TwitterDemoProcess").latestVersion() //
        .variables(variables) //
        .send().join();

    waitForProcessInstanceCompleted(processInstance);

    assertThat(processInstance)
            .hasPassedElement("end_event_tweet_published")
            .hasNotPassedElement("end_event_tweet_rejected")
            .isCompleted();

    Mockito.verify(twitterService).tweet("Hello world");
    Mockito.verifyNoMoreInteractions(twitterService);
}
```

Be careful not to "overspecify" your test method by asserting too much. Your process definition will most probably evolve in the future and such changes should break as little test code as possible, but just as much as necessary! As a rule of thumb *always* assert that the expected *external effects* of your process really took place (e.g. that business services were called as expected). On top of that, carefully choose, which aspects of *internal process state* are important enough so that you want your test method to warn about any related change later on.


:::caution Testing Human Tasks
Asserting human tasks is currently under development in `zeebe-process-test` and will be added soon. At the moment, you cannot yet assert human tasks in your test cases.
:::




 ### Testing your process in chunks 

Divide and conquer by *testing your process in chunks*.

- Fully test the *Happy Path* in one (big) test method. This makes sure you have one consistent data flow in your process. Additionally it is easy to read and to understand, making it a great starting point for new developers to understand your process / process test case.
- Test *forks/detours* from the happy path as well as *errors/exceptional* pathes as chunks in seperate test methods. This allows to unit test in meaningful units.

Consider the important chunks and pathes the Tweet Approval Process consists of:

<div bpmn="testing-process-definitions-assets/TwitterDemoProcess.bpmn" callouts="end_event_tweet_published,end_event_tweet_rejected,boundary_event_tweet_duplicated" />

<span className="callout">1</span>

The *happy path*: The tweet just gets published. 

<span className="callout">2</span>

The tweet gets rejected.

<span className="callout">3</span>

A duplicated tweet gets rejected by twitter.


The tests for the exceptional paths are basically very similar to the happy path in our example:

```java
@Test
public void testRejectionPath() throws Exception {
    TwitterProcessVariables variables = new TwitterProcessVariables();
    variables.setTweet("Hello world");
    variables.setApproved(false);

    ProcessInstanceEvent processInstance = zeebe.newCreateInstanceCommand() //
            .bpmnProcessId("TwitterDemoProcess").latestVersion() //
            .variables(variables) //
            .send().join();

    waitForProcessInstanceCompleted(processInstance);
    waitForProcessInstanceHasPassedElement(processInstance, "end_event_tweet_rejected");
    Mockito.verify(twitterService, never()).tweet(anyString());
}
```

and: 

```java
@Test
public void testDuplicate() throws Exception {
    // throw exception simulating duplicateM
    Mockito.doThrow(new DuplicateTweetException("DUPLICATE")).when(twitterService).tweet(anyString());

    TwitterProcessVariables variables = new TwitterProcessVariables()
            .setTweet("Hello world")
            .setApproved(true);

    ProcessInstanceEvent processInstance = zeebe.newCreateInstanceCommand() //
            .bpmnProcessId("TwitterDemoProcess").latestVersion() //
            .variables(variables) //
            .send().join();

    waitForProcessInstanceHasPassedElement(processInstance, "boundary_event_tweet_duplicated");
    // TODO: Add human task to test case
}
```





## Writing polyglot process tests

TODO








## Technical setup and example using Camunda Platform 7

:::caution Camunda Platform 7 only
This section targets Camunda Platform 7.x only. Please refer to the previous sections if you are looking for Camunda Cloud. 
:::

Camunda Platform 7 also has support for writing tests in Java:

1. Use [*JUnit*](http://junit.org) as unit test framework.
2. Use Camunda's [JUnit Rule](reference/javadoc/?org/camunda/bpm/engine/test/ProcessEngineRule.html) to ramp up an in-memory process engine where the [JobExecutor](user-guide/process-engine/the-job-executor/) is turned off.
3. Use Camunda's [@Deployment](reference/javadoc/?org/camunda/bpm/engine/test/Deployment.html) annotation to deploy and undeploy one or more process definitions under test for a single test method.
4. Use [camunda-bpm-assert](http://github.com/camunda/camunda-bpm-assert) to easily check whether your expectations about the state of the process are met.
5. Use mocking of your choice, e.g. [Mockito](http://mockito.org) plus [PowerMock](https://github.com/jayway/powermock/) to mock service methods and verify that services are called as expected.
6. Use Camunda's [MockExpressionManager](reference/javadoc/?org/camunda/bpm/engine/test/mock/MockExpressionManager.html) to resolve bean names used in your process definition without the need to ramp up the dependency injection framework (like CDI or Spring).
7. Use an [In-Memory H2 database](http://www.h2database.com/html/features.html#in_memory_databases) as default database to test processes on developer machines. If required, you can run the same tests on *multiple databases*, e.g. Oracle, DB2, or MS-SQL on a CI-Server. To achieve that, you can make use of (e.g. maven) profiles and Java properties files for database configuration.



To give an example we now test the *Tweet Approval Process* - a simple example process we use in various situations.

<div bpmn="testing-process-definitions-assets/TwitterDemoProcess.bpmn" callouts="user_task_review_tweet,service_task_send_rejection_notification,service_task_publish_on_twitter,user_task_handle_duplicate" />

<span className="callout">1</span>

New tweets need to be reviewed before publication.

<span className="callout">2</span>

The tweeting employee is notified about rejected tweets.

<span className="callout">3</span>

Approved tweets get published.

<span className="callout">4</span>

Duplicate tweets need to be dealt with, e.g. rephrased, and then reviewed again.

A typical test case looks like this:

```java
// ...
import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*; // <4>
import static org.mockito.Mockito.*; // <5>

@RunWith(PowerMockRunner.class) // <1> <5>
public class TwitterTest {

  @Rule
  public ProcessEngineRule processEngineRule = new ProcessEngineRule(); // <2>

  @Mock // Mockito mock instantiated by PowerMockRunner <5>
  private TweetPublicationService tweetPublicationService;

  @Before
  public void setup() {
	// ...
    Mocks.register("tweetPublicationDelegate", tweetPublicationDelegate); // <6>
  }

  @Test // <1>
  @Deployment(resources = "twitter/TwitterDemoProcess.bpmn") // <3>
  public void testTweetApproved() {
	// ...
  }
// ...
}
```

The service task "Publish on Twitter" delegates to java code:

```xml
<serviceTask id="service_task_publish_on_twitter" camunda:delegateExpression="#{tweetPublicationDelegate}" name="Publish on Twitter">
</serviceTask>
```

And this *java delegate* itself calls a business method

```java
@Named
public class TweetPublicationDelegate implements JavaDelegate {

  @Inject
  private TweetPublicationService tweetPublicationService;

  public void execute(DelegateExecution execution) throws Exception {
    String tweet = new TwitterDemoProcessVariables(execution).getTweet();  // 1
    // ...
    try {
      tweetPublicationService.tweet(tweet); // 2
    } catch (DuplicateTweetException e) {
      throw new BpmnError("duplicateMessage"); // 3
    }
  }
// ...
```

The TweetPublicationService is mocked:

```java
@Mock // 1
private TweetPublicationService tweetPublicationService;

@Before
public void setup() {
  // set up java delegate to use the mocked tweet service
  TweetPublicationDelegate tweetPublicationDelegate = new TweetPublicationDelegate();  // 2
  tweetPublicationDelegate.setTweetService(tweetPublicationService);
  // register a bean name with mock expression manager
  Mocks.register("tweetPublicationDelegate", tweetPublicationDelegate); // 3
}

@After
public void teardown() {
  Mocks.reset();  // 3
}
```

Now you can test the happy path to a published tweet:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
public void testTweetApproved() {
  // given
  ProcessInstance processInstance = runtimeService().startProcessInstanceByKey(
    "TwitterDemoProcess",
    withVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET, TWEET)); // 1
  assertThat(processInstance).isStarted();
  // when
  complete(task(), withVariables(TwitterDemoProcessConstants.VAR_NAME_APPROVED, true)); //2 
  // then
  assertThat(processInstance) // 3
    .hasPassed("end_event_tweet_published")
    .hasNotPassed("end_event_tweet_rejected")
    .isEnded();
  verify(tweetPublicationService).tweet(TWEET); // 4
  verifyNoMoreInteractions(tweetPublicationService);
```

Then you can test the path where a tweet gets rejected. You don't have to start at the start event, but can start anywhere in your process:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
public void testTweetRejected() {

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
  complete(task(), withVariables(TwitterDemoProcessConstants.VAR_NAME_APPROVED, false));  // 2

  // then
  assertThat(processInstance) 
    .hasPassed("end_event_tweet_rejected")
    .hasNotPassed("end_event_tweet_published")
    .isEnded();
  verifyZeroInteractions(tweetPublicationService);  
}
```

You could also implement another `testTweetDuplicated()` to verify the logic  in case a tweet turns out to be a duplicate and is rejected by Twitter. For this case, we attached an error event to the service task "Publish on Twitter". In the BPMN XML we see an error event defined with an errorCode "duplicateMessage".

```xml
  <boundaryEvent id="boundary_event_tweet_duplicated" name="Tweet duplicated" attachedToRef="service_task_publish_on_twitter">
    <errorEventDefinition id="error_event_definition_tweet_duplicated" errorRef="error_tweet_duplicated"/>
  </boundaryEvent>
<error id="error_tweet_duplicated" errorCode="duplicateMessage" name="Tweet duplicated"/>
```

Above, we already saw the java delegate code throwing the BpmnError expcetion with that code "duplicateMessage". And here comes the method testing for the case a tweet is duplicated:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
public void testTweetDuplicated() {
  // given
  doThrow(new DuplicateTweetException()) // 1
    .when(tweetPublicationService).tweet(anyString());
  // when
  ProcessInstance processInstance = rejectedTweet(withVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET, TWEET));  // 2
  // then
  assertThat(processInstance) // 3
    .hasPassed("boundary_event_tweet_duplicated")
    .hasNotPassed("end_event_tweet_rejected").hasNotPassed("end_event_tweet_published")
    .isWaitingAt("user_task_handle_duplicate");
  verify(tweetPublicationService).tweet(TWEET);  // 4
  verifyNoMoreInteractions(tweetPublicationService);
  // when
  complete(task()); // 5
  // then
  assertThat(processInstance)  // 6
    .isWaitingAt("user_task_review_tweet")
    .hasVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET)
    .task().isAssignedTo("demo");
}
```
