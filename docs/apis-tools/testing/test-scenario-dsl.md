---
id: test-scenario-dsl
title: Test Scenario DSL
description: "Learn about Test Scenario DSL including key features, configuration, and implementation details. This guide provides detailed information for your deployment."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can write your process tests using the Test Scenario DSL instead of coding the test logic in Java. The DSL is a
JSON-based format to describe test cases with instructions that align with CPT's assertions and utilities.

:::note
CPT's Test Scenario DSL files are not compatible with
the [Test scenario files](/components/modeler/web-modeler/validation/test-scenario-files.md) from the Web Modeler/Play.
:::

## Write a DSL test case

The DSL is defined in the JSON
schema [test-scenario-dsl.schema.json](https://github.com/camunda/camunda/blob/main/testing/camunda-process-test-dsl/src/main/resources/schema/test-scenario-dsl.schema.json).
It defines the following structure:

- `testCases`: An array of test cases to be executed.
  - `name`: The name of the test case.
  - `description`: A description of the test case.
  - `instructions`: An array of instructions to execute the test case.
    - Each instruction has a `type` that defines the action to be performed (e.g., `CREATE_PROCESS_INSTANCE`).
    - Additional properties depend on the instruction type (e.g., process definition ID, variables, etc.).

Start by creating a new JSON file and placing it in your test resources folder (e.g.
`src/test/resources/scenarios/invoice-approval-scenario.json`). Add your test cases and use the available instructions
to define the behavior of your process test.

An example test scenario DSL file could look like this:

```json
{
  "testCases": [
    {
      "name": "Happy path",
      "description": "The invoice should be approved.",
      "instructions": [
        {
          "type": "CREATE_PROCESS_INSTANCE",
          "processDefinitionSelector": {
            "processDefinitionId": "Process_InvoiceApproval"
          },
          "variables": {
            "id": "INV-1001",
            "amount": 12000,
            "currency": "EUR",
            "supplier": {
              "id": "0815",
              "name": "Acme GmbH"
            },
            "contactEmail": "accounting@acme.com"
          }
        }
      ]
    }
  ]
}
```

:::tip
Use AI to support the generation of your test scenario DSL files. Provide the JSON schema, a description of your
test case, and your BPMN processes to get a first draft of your test scenario DSL file.

Or, use an IDE with JSON schema support to get auto-completion and validation while writing your test scenario DSL
files, for example [IntelliJ IDEA](https://www.jetbrains.com/help/idea/json.html#ws_json_schema_add_custom).
:::

## Run a DSL test case

You can run your test scenario DSL files as a parameterized JUnit test. Add the `@TestScenarioSource` annotation to your
test method to read the files and provide their test cases as arguments. Then, execute the test cases using the
`TestScenarioRunner` provided by CPT.

The runner executes the test case instructions by leveraging CPT's assertions and utilities. If an assertion instruction
fails, the runner throws an assertion error, causing the test to fail. If all instructions pass, the test case is
considered successful.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

```java
@SpringBootTest
@CamundaSpringProcessTest
public class MyProcessTest {

    @Autowired private TestScenarioRunner testScenarioRunner;

    @ParameterizedTest
    @TestScenarioSource
    void shouldPass(final TestCase testCase, final String scenarioFile) {
        // given: the process definitions are deployed

        // when/then: run and verify the test case
        testScenarioRunner.run(testCase);
    }
}
```

</TabItem>
<TabItem value='java-client'>

```java
@CamundaProcessTest
public class MyProcessTest {

    private TestScenarioRunner testScenarioRunner;

    @ParameterizedTest
    @TestScenarioSource
    void shouldPass(final TestCase testCase, final String scenarioFile) {
        // given: the process definitions are deployed

        // when/then: run and verify the test case
        testScenarioRunner.run(testCase);
    }
}
```

</TabItem>
</Tabs>

You can set the following fields in the `@TestScenarioSource` annotation to configure which files to load:

- `directory`: The classpath directory to scan for test scenario DSL files. Defaults to `/scenarios`.
- `fileNames`: An array of specific file names to load from the directory. If not set, all files in the directory are
  loaded.
- `fileExtension`: The file extension to filter files in the directory. Defaults to `json`. The filter is ignored if
  `fileNames` is set.

## Connect your process application

The `TestScenarioRunner` integrates seamlessly with CPT's [test lifecycle](getting-started.md#test-lifecycle) and connects
to your process application and starts the job workers, if enabled.

You can add additional steps before and after running the test case, for example to deploy additional resources, or to
mock external services of your process application.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

```java
@SpringBootTest
@CamundaSpringProcessTest
public class MyProcessTest {

    @Autowired private CamundaClient client;
    @Autowired private CamundaProcessTestContext processTestContext;
    @Autowired private TestScenarioRunner testScenarioRunner;

    @MockitoBean private AccountingService accountingService;

    @ParameterizedTest
    @TestScenarioSource
    void shouldPass(final TestCase testCase, final String scenarioFile) {
        // given: the process definitions are deployed via @Deployment on the process application
        // optionally: set up mocks, job workers, etc.

        // when/then: run and verify the test case
        testScenarioRunner.run(testCase);

        // optionally: verify mock invocations, external resources, etc.
        Mockito.verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
    }
}
```

</TabItem>

<TabItem value='java-client'>

```java
@CamundaProcessTest
@ExtendWith(MockitoExtension.class)
public class MyProcessTest {

    private CamundaClient client;
    private CamundaProcessTestContext processTestContext;
    private TestScenarioRunner testScenarioRunner;

    // Inject the mock in the process application
    @Mock private AccountingService accountingService;

    @ParameterizedTest
    @TestScenarioSource
    @TestDeployment(resources = "invoice-approval.bpmn")
    void shouldPass(final TestCase testCase, final String scenarioFile) {
        // given: the process definitions are deployed via @TestDeployment
        // optionally: set up mocks, job workers, etc.

        // when/then: run and verify the test case
        testScenarioRunner.run(testCase);

        // optionally: verify mock invocations, external resources, etc.
        Mockito.verify(accountingService).addInvoiceToAccount("0815", "INV-1001");
    }
}
```

</TabItem>

</Tabs>

## Examples

You can find some example process tests using the Test Scenario DSL
on [GitHub](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-example).
