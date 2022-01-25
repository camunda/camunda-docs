---
title: "Testing Process Definitions"
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

Test your executable BPMN processes - they are software. If possible, do automated unit tests with a fast in-memory workflow engine. Before releasing, verify with integration tests close to your real-life environment, which might include human-driven, exploratory integration tests.



## Testing Scopes

There are basically three typical test scopes discssed when building process solutions:

1. Unit tests: Testing all programming code you developed for your process solution. This is typically pretty much independant of the process model and Camunda.
2. Process tests: Testing the expected behavior of the process model, including glue code and specicially the data flowing through the process model.
3. Integration tests: Testing the system in a close-to-real-life-environment to make sure it is really working. 

![Scopes](testing-process-definitions-assets/scopes.png)

## Unit tests (Scope 1)

Unit testing itself is not discussed here, as this is a common practice for software development.

## Process tests (Scope 2)

Test the execution behaviour of a process definition. To run those tests frequently, they should behave like unit tests, executed single threaded and in-memory without the need for an external resource. 

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


### Technical setup using Camunda Cloud

:::caution Camunda Cloud only
This section targets Camunda Cloud only. Please refer to the next section if you are looking for Camunda Platform 7.x. 
:::

TODO 

### Technical setup using Camunda Platform 7

:::caution Camunda Platform 7 only
This section targets Camunda Platform 7.x only. Please refer to the previous section if you are looking for Camunda Cloud. 
:::

:::caution Code examples target Camunda Cloud
All code examples in this best practice, outside of this section, are targeting Camunda Cloud and not Camunda Platform 7.x.
:::

Camunda Platform 7 has support for writing tests in Java:

1. Use [*JUnit*](http://junit.org) as unit test framework.
2. Use Camunda's [JUnit Rule](reference/javadoc/?org/camunda/bpm/engine/test/ProcessEngineRule.html) to ramp up an in-memory process engine where the [JobExecutor](user-guide/process-engine/the-job-executor/) is turned off.
3. Use Camunda's [@Deployment](reference/javadoc/?org/camunda/bpm/engine/test/Deployment.html) annotation to deploy and undeploy one or more process definitions under test for a single test method.
4. Use [camunda-bpm-assert]http://github.com/camunda/camunda-bpm-assert to easily check whether your expectations about the state of the process are met.
5. Use mocking of your choice, e.g. [Mockito](http://mockito.org) plus [PowerMock](https://github.com/jayway/powermock/) to mock service methods and verify that services are called as expected.
6. Use Camunda's [MockExpressionManager](reference/javadoc/?org/camunda/bpm/engine/test/mock/MockExpressionManager.html to resolve bean names used in your process definition without the need to ramp up the dependency injection framework (like CDI or Spring).

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

Last not least, use an [In-Memory H2 database](http://www.h2database.com/html/features.html#in_memory_databases) as default database to test processes on developer machines.

If required, yo can run the same tests on *multiple databases*, e.g. Oracle, DB2, or MS-SQL on a CI-Server. To achieve that, you can make use of (e.g. maven) profiles and Java properties files for database configuration.

Let's now take a deeper look into the parts of this process definition test.



### Focus on testing the wider process definition, but not more

With scope 1, we want to test the *wider process definition*: this is the executable BPMN process definition in a narrow sense plus all the wiring code which still "belongs" to the process definition in a wider sense:

<div bpmn="testing-process-definitions-assets/TwitterDemoProcess.bpmn" callouts="service_task_publish_on_twitter,user_task_review_tweet,service_task_send_rejection_notification" />

Consider expression language (like e.g. JUEL) and adapter logic (like e.g. java delegate code) as being part of this "wider" process definition. A number of such things might be referenced in the BPMN XML:

<span className="callout">1</span>

A *java delegate* or an (e.g. JUEL) *expression* is typically called by a service task.

<span className="callout">2</span>

A *task listener* sending an e-Mail to the boss might be defined behind the user task.

<span className="callout">3</span>

An *execution listener* logging the rejection mail into a folder might be defined behind the service task.

Consider services executing process engine independent business code as *not* belonging to the process definition in a wider sense anymore.



### Mock the Business Service Methods

Mock everything which does not belong to the "wider" process definition explained above, e.g. a business service method called by a *java delegate*. Consider the service task "Publish on Twitter" which delegates to java code:

```xml
<serviceTask id="service_task_publish_on_twitter" camunda:delegateExpression="#{tweetPublicationDelegate}" name="Publish on Twitter">
</serviceTask>
```

And this *java delegate* itself calls another "business service" method:

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

<span className="callout">1</span>

Retrieving the process variable belongs to the *wiring delegate code*, is therefore part of the "wider" process definition and *is not mocked*. (For an explanation of the variable accessor class used here, see [handling data in processes](../handling-data-in-processes/)).

<span className="callout">2</span>

This method is executing process engine independent *"business" code*, is therefore not part of the "wider" process definition anymore and *needs to be mocked*.

<span className="callout">3</span>

The process engine specific exception is typically not produced by your business service method. Therefore we need to *translate the business exception* to the exception needed to drive the process - again code being part of the "wider" process definition and *not mocked*.

Let's now look at how the mocking is wired in our test class:

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

<span className="callout">1</span>

Annotated mock is automatically instantiated (by PowerMockRunner).

<span className="callout">2</span>

Java Delegate is prepared to work with this mocked service.

<span className="callout">3</span>

Java Delegate is registered under the bean name used in the process definition (to be resolved by MockExpressionManager) and the registration is cleaned up after each test.

To stress it another time: please avoid to execute real business service methods within scope 1.



### Drive the Process and Assert the State

Now *drive* the process from waitstate to waitstate and *assert* that you see the expected process and variable states. Divide and conquer by *testing your process in chunks*.

- Fully test the *Happy Path* in one (big) test method, as this makes sure you have one consistent data flow in your process. Additionally it is easy to read and to understand, making it a great starting point for new developers to understand your process / process test case.
- Test *forks/detours* from the happy path as well as *errors/exceptional* pathes as chunks in seperate (smaller) test methods. This allows to unit test in meaningful units.

Consider the important chunks and pathes the Tweet Approval Process consists of:

<div bpmn="testing-process-definitions-assets/TwitterDemoProcess.bpmn" callouts="end_event_tweet_published,end_event_tweet_rejected,boundary_event_tweet_duplicated" />

<span className="callout">1</span>

It might be that the tweet just gets published. The *happy path*! 

<span className="callout">2</span>

It might also be that the tweet gets rejected. The tweeting employee has to live with that path! 

<span className="callout">3</span>

It might also happen that a duplicated tweet gets rejected by twitter. A seldomly happening error path! 

For bigger processes, conciously decide, whether you want to test the full *Happy Path as one long unit test* or not. On one hand, one long unit test can be easier to write and makes sure that the variables/data flow works for that path. On the other hand, if you want to follow a more "purist" unit testing approach, test the happy path in chunks, too. In this case it becomes absolutely crucial that you assert the expected variables/data state at the borders of your chunks.



#### Test the Happy Path

The test method `testTweetApproved()` tests the happy path to a published tweet:

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

<span className="callout">1</span>

Create a new process instance. You may want to use a submethod to start this process instance instead, as described in the next section.

<span className="callout">2</span>

Drive the process to its next waitstate, e.g. by completing a waiting user task. You may use convenience methods provided by camunda-bpm-assert, but you may also choose to directly use the process engine API.

<span className="callout">3</span>

Assert that your process is in the expected state.

<span className="callout">4</span>

Verify with your mocking library that your business service methods were called as expected.

Be careful not to "overspecify" your test method by asserting too much. Your process definition will most probably evolve in the future and such changes should break as little test code as possible, but just as much as necessary! As a rule of thumb *always* assert that the expected *external effects* of your process really took place (e.g. that business services were called as expected). On top of that, carefully choose, which aspects of *internal process state* are important enough so that you want your test method to warn about any related change later on.

#### Create submethods to start the process instance under test

When testing *chunks* it is a good practice to implement submethods to *navigate the process into the node(s)* needed for several of your test methods as start node(s). Here you see one such submethod which simply creates a new process instance at its start event:

```java
// create a new process instance
ProcessInstance newTweet(Map<String, Object> variables) {
  ProcessInstance processInstance = runtimeService().startProcessInstanceByKey( // 1
    "TwitterDemoProcess", variables
  );
  assertThat(processInstance) // 2
    .isStarted()
    .hasVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET);
  return processInstance;
}
```

<span className="callout">1</span>

*Create a new process* instance (here "by key") and *initialize* some needed *process variables*.

<span className="callout">2</span>

At the end of the submethod, consider to assert that you leave the process in the expected state.

And here you see a second submethod which creates a new process instance *right in the middle of the process*!

```java
// create a process instance directly at the point at which a tweet was rejected
ProcessInstance rejectedTweet(Map<String, Object> variables) {
  ProcessInstance processInstance = runtimeService()
    .createProcessInstanceByKey("TwitterDemoProcess") // 1
    .startBeforeActivity("service_task_publish_on_twitter")
    .setVariables(variables)
  .execute();
  assertThat(processInstance) // 3
    .isStarted()
    .hasPassed("service_task_publish_on_twitter")
    .hasVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET);
  return processInstance;
}
```

<span className="callout">1</span>

*Create a modified process* instance by key and *initialize* some needed *process variables*.

<span className="callout">2</span>

At the end of the submethod, consider to assert that you leave the process in the expected state.

As shown in the example, we use "Process Instance Modification" to implement such start methods. This allows to easily *test processes in chunks*, as shown in the next section.



#### Test the Exceptional Pathes in Chunks

There are two exceptional pathes we test as chunks in this example:

* The test method *testTweetRejected()* tests the path to a rejected tweet, the same four steps as already discussed occur again, just this time, the user task is completed with a tweet rejection:

```java
@Test
@Deployment(resources = "twitter/TwitterDemoProcess.bpmn")
public void testTweetRejected() {
  // given
  ProcessInstance processInstance = newTweet(withVariables(TwitterDemoProcessConstants.VAR_NAME_TWEET, TWEET)); // 1
  // when
  complete(task(), withVariables(TwitterDemoProcessConstants.VAR_NAME_APPROVED, false));  // 2
  // then
  assertThat(processInstance) // 3
    .hasPassed("end_event_tweet_rejected")
    .hasNotPassed("end_event_tweet_published")
    .isEnded();
  verifyZeroInteractions(tweetPublicationService);  // 4
}
```

* The test method *testTweetDuplicated()* tests what happens in case a tweet turns out to be a duplicate and is rejected by Twitter. For this case, we attached an error event to the service task "Publish on Twitter". In the BPMN XML we see an error event defined with an errorCode "duplicateMessage".

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

<span className="callout">1</span>

Initialise your mocked business service method to throw the business exception meant for that case.

<span className="callout">2</span>

Create a new process instance by calling a submethod starting the process "right in the middle" - as already xref:_create_submethods_to_start_the_process_instance_under_test[shown above].

<span className="callout">3</span>

Assert that your process is in the expected state. Again, be careful not to "overspecify" your test method by asserting too much, but there is a grey area of what you consider to be "just enough", of course.

<span className="callout">4</span>

Verify with your mocking library that your business service methods were called as expected.

<span className="callout">5</span>

You can move on and decide to test even more within that method. Here we complete the "Handle duplicate tweet" task in order ...

<span className="callout">6</span>

... to assert that the process moves again back to the "Review tweet" task and e.g. that this new task is assigned to the expected user etc.

In order to make  your test code better readable, use developer-friendly naming conventions for ids (see [Naming Technically Relevant IDs](../../modeling/naming-technial-relevant-ids). If you have a lot of process definitions to test, consider to generate constant classes (via e.g. XSLT) directly from BPMN XML.



### Monitor Your Process Test Coverage

Aim for *100% flow node test coverage* when testing process definitions in scope 1. That means, that basically all "flow nodes" (e.g. Tasks, Gateway, Events) are visited by at least one test case. We normally do *not* aim for 100% path coverage (meaning all possible pathes through the model are tested), as this is simply to much effort. And testing processes correctly in chunks is sufficient.

Consider to leverage the *visual* https://github.com/camunda/camunda-consulting/tree/master/snippets/process-test-coverage[Process Test Coverage] tool, currently made available as a Consulting Snippet. Add the following lines to your test class:

```java
@After
public void calculateProcessTestCoverage() {
  ProcessTestCoverage.calculate(processEngine());
}
```

Imagine you just implemented the test for the happy path, then your process test coverage file generated at `target/process-test-coverage/TwitterDemoProcess.html` would look like the following:

![Coverage](testing-process-definitions-assets/coverage.png)

When aiming for *100% flow node test coverage* all tasks, gateways and events should be green before you stop writing test methods. In our example, after having implemented all three test methods shown above, our process definition is fully covered and the whole process test coverage diagram is now colored in [white green-background]#green#.

The tool can also show you the specific pathes/chunks you test in your single test methods. Check out all the details in the [Process Test Coverage](https://github.com/camunda/camunda-consulting/tree/master/snippets/process-test-coverage) GitHub repository.



## Integration tests (Scope 3)

Test the process close to to a real-life environment by executing a *in-memory* test *within your container*, which is potentially *multi threaded*.

Now you want to have your environment available, like beans (e.g. CDI, Spring...), transactions, JPA, etc. If you are using Spring it is completly natural for you to have an own Spring configuration for your tests. When using Java EE consider to drive your tests by http://arquillian.org/[Arquillian] or a similar tool. In order to ease the bundling and versioning of your tests together with your production system, consider to use container provisioning with https://www.docker.com/[Docker].

Configure your tests to be dedicated integration tests. Invoke them separately from your (typically much faster running) scope 1 tests.


Avoid to turn off the [JobExecutor](xxx). By default it is *turned on* and we leave it like that for Scope 2. Also avoid to use the [MockExpressionManager](xxx). By default it is *not used* and just recommended for testing in Scope 1.






Verify that "it really works" before releasing a new version of your process definition, which includes *human-driven*, *exploratory* tests.

Clearly *define your goals* for scope 3! Goals could be

* end user & acceptance tests,
* complete end-to-end tests,
* performance & load tests, etc...

Carefully consider to *automate* tests on scope 3. You need to look at the overall effort spent on writing test automation code and maintaining it, when being compared with executing human-driven tests for your software project's lifespan. The best choice depends very much on the frequency of regression test runs!

Most effort is typically invested in setting up proper test data in surrounding systems.

Look at http://jmeter.apache.org/[JMeter] for load tests, http://www.soapui.org/[SoapUI] for functional tests of services, http://www.seleniumhq.org/[Selenium] for frontend tests and http://testlink.org/[TestLink] for test scenario descriptions. Also consider to use a JavaScript stack for frontend tests: we use http://mochajs.org/[Mocha], https://github.com/chaijs/chai[Chai], http://gruntjs.com/[Grunt], http://karma-runner.github.io[Karma], https://angular.github.io/protractor[Protractor].
