---
title: "Testing process definitions"
tags:
  - Test / Unit Test
  - Test / Integration Test
  - Mock
  - Exception
  - Java Delegate
  - JUnit
description: "Test your executable BPMN processes as they are software. If possible, do automated unit tests with a fast in-memory workflow engine."
---

Test your executable BPMN processes as you would any software. When possible, write fast automated unit tests using a localized and isolated workflow engine. Before releasing, verify your implementation with integration tests in an environment that closely mirrors your production setup, which may include human-driven, exploratory integration tests.

This best practice uses the following process example for incoming invoices that need to be approved:

<div bpmn="best-practices/testing-process-definitions-assets/TestingProcess.bpmn" callouts="UserTask_ApproveInvoice,ServiceTask_SendRejection,ServiceTask_ArchiveInvoice,TimerEvent_ApprovalTakesTooLong,ErrorEvent_Archive" />

<span className="callout">1</span>

Invoices need to be approved.

<span className="callout">2</span>

The invoice sender is notified about a rejection.

<span className="callout">3</span>

Approved invoices get processed.

<span className="callout">4</span>

If the approval task takes too long, the process takes an alternative path—in this case, the invoice is automatically approved.

<span className="callout">5</span>

If an error occurs while communicating with the archive system (assume you have an unreliable legacy system), the process takes a detour to handle this situation manually.

## Testing scopes

There are three typical test scopes used when building process solutions:

1. **Unit tests**: Testing glue code or programming code you developed for your process solution. How to unit test your software itself is not discussed here, as this is a common practice for software development.

2. **Process tests**: Testing the expected behavior of the process model, including glue code and specifically the data flowing through the process model. These tests should run frequently, so they should behave like unit tests (quick turnaround, no need for external resources).

3. **Integration tests**: Testing the system in a close-to-production environment to ensure it works correctly. This is typically done before releasing a new version of your system. These tests include _human-driven_, _exploratory_ tests.

![Scopes](testing-process-definitions-assets/scopes.png)

## Writing process tests in Java

This section describes how to write process tests as unit tests in Java. We are working on additional information for writing tests in other languages, such as Node.js or C#.

When using Java, most customers use Spring Boot, so we describe this approach in this best practice. While this is a common setup for customers, it is not the only one. Find more examples of plain Java process tests in [Getting Started with Camunda Process Test](/apis-tools/testing/getting-started/).

### Technical setup using Spring

:::caution

- Camunda Process Test was introduced with **Camunda 8.8**.
- You must use **JUnit 5** in every test class. The `@Test` annotation you import must be `org.junit.jupiter.api.Test`.
:::

1. Use [_JUnit 5_](http://junit.org) as your unit test framework.
2. Use the [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md).
3. Use `@CamundaSpringProcessTest` to start a process engine.
4. Ensure you have Docker installed locally to use [TestContainers](/apis-tools/testing/getting-started/#prerequisites), which is the easiest way to run tests (Camunda is developing a test environment that runs in-memory).
5. Use assertions from [Camunda Process Test](/apis-tools/testing/assertions) to verify that your expectations about the process state are met.
6. Use a mocking framework of your choice (such as [Mockito](http://mockito.org)) to mock service methods and verify that services are called as expected.
7. Use utilities from [Camunda Process Test](/testing/utilities) to mock job workers you don't want to run (for example, connectors).

The following code shows an example test:

```java
@SpringBootTest(
    properties = {
      "camunda.client.worker.defaults.enabled=false", // disable job workers and enable them selectively
      "camunda.client.worker.override.archive-invoice.enabled=true",
    })
@CamundaSpringProcessTest
public class InvoiceApprovalTest {

  @Autowired
  private CamundaClient client;
  @Autowired
  private CamundaProcessTestContext processTestContext;
  @Autowired
  private ObjectMapper objectMapper;

  // Mock services that are called from the job workers
  @MockitoBean
  private ArchiveService archiveService;
  @MockitoBean
  private AccountingService accountingService;

  // Sample data used
  private final String invoiceJson =
      """
      {
        "id": "INV-1001",
        "amount": 12000,
        "currency": "EUR",
        "supplier": {
          "id": "0815",
          "name": "Acme GmbH"
        },
        "contactEmail": "accounting@acme.com"
      }""";

  @Test
  public void happyPath() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    // After all preparations, start the process instance
    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // assert the User Task was created
    assertThat(byElementId("UserTask_ApproveInvoice")).isCreated().hasAssignee("Zee");
    // and simulate the user completing it
    processTestContext.completeUserTask(byElementId("UserTask_ApproveInvoice"),
        Map.of("approved", true));

    // This should make the process instance execute to completion
    assertThat(processInstance)
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("UserTask_ApproveInvoice"),
            byId("ServiceTask_ArchiveInvoice"),
            byId("ServiceTask_AddInvoiceAccounting"),
            byId("EndEvent_InvoiceApproved"))
        .isCompleted();

    // verify that side effects have happened
    Mockito.verify(archiveService).archiveInvoice("INV-1001", objectMapper.readTree(invoiceJson));
    Mockito.verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
  }
```

:::note
The complete source code for this example test is available on [GitHub](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-example/src/test/java/io/camunda/InvoiceApprovalTest.java).
:::

### Test scope and mocking

In a test case like this, you want to test the executable BPMN process definition, plus all the glue code that logically belongs to the process definition in a broader sense. Typical examples of glue code you want to include in a process test are:

- Worker code, typically connected to a service task
- Expressions (FEEL) used in your process model for gateway decisions or input/output mappings
- Other glue code, for example, your own Client API (probably exposed via REST) that performs data mapping before calling the Camunda Client.

The following illustration shows this for the invoice approval example:

![Process test scope example](testing-process-definitions-assets/process-test-scope-example.png)

Workflow engine-independent business code should _not_ be included in the tests. In the invoice approval example, the `ArchiveService` will be mocked, and the `ArchiveInvoiceWorker` will read and transform process variables and call this mock. This way, you can test the process model, the glue code, and the data flow in your process test without calling out to the real archive system.

The following code examples highlight the important aspects around mocking.

The `ArchiveInvoiceWorker` is executed as part of the test. It does input data mapping **(1)** and also translates a specific business exception into a BPMN error **(2)**:

```java
@Component
public class ArchiveInvoiceWorker {

  private final ArchiveService service;
  public ArchiveInvoiceWorker(final ArchiveService service) {
    this.service = service;
  }

  @JobWorker(type = "archive-invoice")
  public void handleJob(
      @Variable("invoiceId") final String invoiceId, // <1>
      @Variable("invoice") final JsonNode invoiceJson) {
    try {
      service.archiveInvoice(invoiceId, invoiceJson);
    } catch (WiredLegacyException e) { // <2>
      throw new BpmnError(
          "LEGACY_ERROR_ARCHIVE", "The archive system had a problem: " + e.getMessage());
    }
  }
}
```

The `ArchiveService` is considered a business service (it could, for example, wrap the archive system client SDK to make the appropriate remote calls) and should _not_ be executed during the test. This is why this interface is mocked in the test case:

```java
@MockitoBean
private ArchiveService archiveService;

@Test
public void happyPath() throws Exception {
  // ...
  // Using Mockito you can verify a business method was called with the expected parameters
  Mockito.verify(archiveService).archiveInvoice("INV-1001", objectMapper.readTree(invoiceJson));
}

@Test
void testArchiveSystemError() throws Exception {
  // Using Mockito you can define what should happen when a method is called, in this case an exception is thrown to simulate a business error
  doThrow(new WiredLegacyException()).when(archiveService).archiveInvoice(anyString(), any());
  //...
}
```

Some workers might not delegate to a proper service class, which you can easily mock. The prime example is connectors. The invoice process uses the REST connector to trigger the invoice rejection via some REST API. To avoid calling the REST endpoint, you can mock the job worker that would be provided by the connector runtime:

```java
@Test
public void testRejectionPath() throws Exception {
  processTestContext.mockJobWorker("io.camunda:http-json:1").thenComplete();
  // ...
}
```

You could also mock the REST endpoint, which we touch on later discussing integration tests. Some projects consider REST mocking part of the unit test scope, and this is generally also fine, even if we see it as integration test scope by default.

You can use the same [utilities from Camunda Process Test](/apis-tools/testing/utilities) to mock other workers, where you simply do not want to run the job worker itself. Maybe the implementation is not clean, but beyond your control. However, we advise to use a proper service interface whenever possible instead of job worker mocking.

```java
// Define the mock
final AtomicBoolean addInvoiceJobWorkerCalled = new AtomicBoolean(false);
processTestContext
.mockJobWorker("add-invoice-to-accounting")
.withHandler(
    (jobClient, job) -> {
        addInvoiceJobWorkerCalled.set(true);
        // check input mapping
        assertEquals("INV-1001", job.getVariablesAsMap().get("invoiceId"));
        jobClient
            .newCompleteCommand(job)
            // .variables(null) //  We could now also simulate setting some response values
            .send()
            .join();
    });

// ... drive the process ...

// and assert:
assertThat(addInvoiceJobWorkerCalled.get())
.as("add-invoice-to-accounting job worker called")
.isTrue();
```


### Drive the process and assert the state

For tests, you drive the process from waitstate to waitstate and assert that you observe the expected process and variable states. For example, you might implement a test for the scenario when an invoice gets approved and processed without errors:

```java
@Test
public void happyPath() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    // Kick off the process instance // <1>
    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // assert the User Task and simulate a human decision // <2>
    assertThat(byElementId("UserTask_ApproveInvoice")).isCreated().hasAssignee("Zee");
    processTestContext.completeUserTask(
        byElementId("UserTask_ApproveInvoice"), Map.of("approved", true));

    // This should make the process instance execute till the end // <3>
    assertThat(processInstance)
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("UserTask_ApproveInvoice"),
            byId("ServiceTask_ArchiveInvoice"),
            byId("ServiceTask_AddInvoiceAccounting"),
            byId("EndEvent_InvoiceApproved"))
        .isCompleted();

    // verify that side effects have happened // <4>
    verify(archiveService).archiveInvoice("INV-1001", objectMapper.readTree(invoiceJson));
    verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
  }
```

1. Create a new process instance. You may want to use some glue code to start your process (e.g. the REST API facade), or also create helper methods within your test class.

2. Drive the process through its waitstates, e.g. by completing a waiting user task.

3. Assert that your process is in the expected state.

4. Verify with your mocking library that your business service methods were called as expected.

Be careful not to "overspecify" your test method by asserting too much. Your process definition will likely evolve in the future and such changes should break as little test code as possible, but just as much as necessary!

As a rule of thumb _always_ assert that the expected _external effects_ of your process really took place (e.g. that business services were called as expected). Additionally, carefully choose which aspects of _internal process state_ are important enough so that you want your test method to warn about any related change later on.

### Testing your process in chunks

Divide and conquer by _testing your process in chunks_. Consider the important chunks and paths the invoice approval process consists of:

<div bpmn="best-practices/testing-process-definitions-assets/TestingProcess.bpmn" callouts="EndEvent_InvoiceApproved,EndEvent_InvoiceRejected,TimerEvent_ApprovalTakesTooLong,ErrorEvent_Archive," />


<span className="callout">1</span>

The _happy path_: The invoice gets approved.

<span className="callout">2</span>

The invoice gets rejected.

<span className="callout">3</span>

A timeout on waiting for approval leads to an automatic approval.

<span className="callout">4</span>

An approved invoice can't get archived.

#### Testing the happy path

The happy path is kind of the default scenario with a positive outcome, so no exceptions or errors or deviations are experienced.

Fully test the happy path in one (big) test method. This makes sure you have one consistent data flow in your process. Additionally, it is easy to read and to understand, making it a great starting point for new developers to understand your process and process test case.

You were already exposed to the happy path in our example, which is the scenario that the tweet gets approved:

```java
@Test
public void happyPath() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    // Kick off the process instance // <1>
    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // assert the User Task and simulate a human decision // <2>
    assertThat(byElementId("UserTask_ApproveInvoice")).isCreated().hasAssignee("Zee");
    processTestContext.completeUserTask(
        byElementId("UserTask_ApproveInvoice"), Map.of("approved", true));

    // This should make the process instance execute till the end // <3>
    assertThat(processInstance)
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("UserTask_ApproveInvoice"),
            byId("ServiceTask_ArchiveInvoice"),
            byId("ServiceTask_AddInvoiceAccounting"),
            byId("EndEvent_InvoiceApproved"))
        .isCompleted();

    // verify that side effects have happened // <4>
    verify(archiveService).archiveInvoice("INV-1001", objectMapper.readTree(invoiceJson));
    verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
  }
```

#### Testing detours

Test _forks/detours_ from the happy path as well as _errors/exceptional_ paths as chunks in separate test methods. This allows to unit test in meaningful units.

The tests for the exceptional paths are basically very similar to the happy path in our example.

<span className="callout">2</span>

The invoice gets rejected:

```java
@Test
public void testRejectionPath() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    // We skip HTTP for the simple unit test - mock the http connector
    processTestContext.mockJobWorker("io.camunda:http-json:1").thenComplete();

    // Kick of the process instance
    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // assert the User Task and simulate a human decision
    assertThat(byElementId("UserTask_ApproveInvoice")).isCreated().hasAssignee("Zee");
    processTestContext.completeUserTask(
        byElementId("UserTask_ApproveInvoice"),
        Map.of( //
            "approved",
            false, //
            "rejectionReason",
            "it is a test case :-)"));

    // This should make the process instance execute till the end
    assertThat(processInstance)
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("UserTask_ApproveInvoice"),
            byId("Gateway_Approved"),
            byId("ServiceTask_SendRejection"),
            byId("EndEvent_InvoiceRejected"))
        .isCompleted();
  }
```

<span className="callout">3</span>

A timeout on waiting for approval leads to an automatic approval:

```java
@Test
public void testApprovalTimeout() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // assert the User Task and simulate the timeout
    assertThat(processInstance).hasActiveElements("UserTask_ApproveInvoice");
    processTestContext.increaseTime(Duration.ofDays(5));

    // This should make the process instance auto approve and run till the end
    assertThat(processInstance)
        .isCompleted()
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("ServiceTask_ArchiveInvoice"),
            byId("ServiceTask_AddInvoiceAccounting"),
            byId("EndEvent_InvoiceApproved"))
        .hasTerminatedElements(byId("UserTask_ApproveInvoice"));
  }
```

<span className="callout">4</span>

An approved invoice can't get archived:

```java
@Test
  public void testArchiveSystemError() throws Exception {
    final HashMap<String, Object> variables = new HashMap<String, Object>();
    variables.put("approver", "Zee");
    variables.put("invoice", objectMapper.readTree(invoiceJson));

    doThrow(new WiredLegacyException()).when(archiveService).archiveInvoice(anyString(), any());

    final var processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("Process_InvoiceApproval")
            .latestVersion()
            .variables(variables)
            .send()
            .join();

    // approve the request
    assertThat(byElementId("UserTask_ApproveInvoice")).isCreated();
    processTestContext.completeUserTask(byElementId("UserTask_ApproveInvoice"),
      Map.of("approved", true));

    // This should lead to the exception being thrown, causing the process to end up in the user task designed to handle the problem.
    assertThat(byElementId("UserTask_ManuallyArchiveInvoice"))
        .isCreated();
        // The test for .hasCandidateGroup("archive-team") is probably not worth implementing
        // as it limits flexibility in model changes.
    processTestContext.completeUserTask(byElementId("UserTask_ManuallyArchiveInvoice"));

    assertThat(processInstance)
        .isCompleted()
        .hasCompletedElementsInOrder(
            byId("StartEvent_InvoiceReceived"),
            byId("UserTask_ApproveInvoice"),
            byId("UserTask_ManuallyArchiveInvoice"),
            byId("ServiceTask_AddInvoiceAccounting"),
            byId("EndEvent_InvoiceApproved"))
        .hasTerminatedElements(byId("ServiceTask_ArchiveInvoice"));
    verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
  }
```

<!--
## Writing polyglot process tests

TODO

* How to provision / cleanup engine (API to create cluster)
* Use the API / Language client to drive your process
* No assertions available at the moment (probably use history API?)
* Assert side effects / workers

* Example in Node.js?
-->

## Integration tests

Test the process in a close-to-real-life environment. This verifies that it really works before releasing a new version of your process definition, which includes _human-driven_, _exploratory_ tests.

Clearly _define your goals_ for integration tests! Goals could be:

- End user & acceptance tests
- Complete end-to-end tests
- Performance & load tests, etc.

Carefully consider _automating_ tests on scope 3. You need to look at the overall effort spent on writing test automation code and maintaining it when compared with executing human-driven tests for your software project's lifespan. The best choice depends very much on the frequency of regression test runs.

Most effort is typically invested in setting up proper test data in surrounding systems.

Configure your tests to be dedicated integration tests, and separate them from unit or process tests.

You can use typical industry standard tools for integration testing together with Camunda.

### Mocking REST calls

Especially when using the Connector framework, there might be relevant logic to test in configuration of a connector, especially the input and output data mapping. To test those, you typically want to mock the endpoint, rather than the job worker.

In the invoice approval example, the `Send invoice rejection` task leverages an outbound REST connector. The service task might look like this in the BPMN XML:

```xml
<bpmn:serviceTask id="ServiceTask_SendRejection" name="Send invoice rejection" zeebe:modelerTemplate="io.camunda.connectors.HttpJson.v2">
      <bpmn:extensionElements>
        <zeebe:taskDefinition type="io.camunda:http-json:1" retries="3" />
        <zeebe:ioMapping>
          <zeebe:input target="method" source="POST" />
          <zeebe:input target="url"    source="{{secrets.INVOICE_REJECTION_URL}}/reject" />
          <zeebe:input target="body"   source="={ &#10;  &#34;invoiceId&#34; : invoice.id, &#10;  &#34;rejectionReason&#34;: rejectionReason&#10;}" />
          <!--. .. -->
      </bpmn:extensionElements>
    </bpmn:serviceTask>
```

Now you can run a Mock for the REST endpoint. Because CPT uses Testcontainers, you also need to run a container for the mock - the connector runtime cannot access any mock directly spun up in the JUnit test. You can use [Testcontainers Mockserver Module](https://java.testcontainers.org/modules/mockserver/). Therefore:

1. Add the required [Testcontainers Mockserver Module](https://java.testcontainers.org/modules/mockserver/) dependencies to your test case (`org.testcontainers:mockserver` and `org.mock-server:mockserver-client-java` at the time of writing) .
2. Start the mockserver early in the test lifecycle, so that you can capture the URL for the mock (which typically gets a random PORT).
3. Use the secrets in Camunda to configure the endpoint of the REST call, which is best practice anyway to configure the URL in the environment. In the test you need to set it to the URL of the mock
4. Make sure the connector runtime is enabled in the test case, so that the out-of-the-box REST connector is executed.

Here is the relevant source code:

```java
@SpringBootTest(
    properties = {
      "camunda.client.worker.defaults.enabled=false",
      "io.camunda.process.test.connectors-enabled=true"
    })
@CamundaSpringProcessTest
@Testcontainers
public class InvoiceApprovalIntegrationTest {

  public static final DockerImageName MOCKSERVER_IMAGE =
      DockerImageName.parse("mockserver/mockserver")
          .withTag("mockserver-" + MockServerClient.class.getPackage().getImplementationVersion());
  static MockServerContainer mockServer = new MockServerContainer(MOCKSERVER_IMAGE);
  static {  // ensures it's ready before property injection in overrideSecrets() - @Container comes too late
    mockServer.start();
  }

  @DynamicPropertySource
  static void overrideSecrets(DynamicPropertyRegistry registry) {
    final String baseUrl = "http://" + mockServer.getHost() + ":" + mockServer.getServerPort();
    registry.add("io.camunda.process.test.connectors-secrets.INVOICE_REJECTION_URL", () -> baseUrl);
  }

  @Test
  public void testRejectionPath() throws Exception {
    // configure mock behavior
    final MockServerClient mockServerClient = new MockServerClient(mockServer.getHost(), mockServer.getServerPort());
    mockServerClient
        .when(request().withMethod("POST").withPath("/reject"))
        .respond(response().withStatusCode(200).withBody("ok"));

    // Now drive the test case as in a unit test shown above ...

    // Verify the mock was called
    mockServerClient.verify(
        request()
            .withMethod("POST")
            .withBody(
                json(
                    """
            {
              "invoiceId": "INV-1001",
              "rejectionReason": "it is a test case :-)"
            }
          """,
                    MediaType.APPLICATION_JSON))
            .withPath("/reject"),
        VerificationTimes.once());
  }
```