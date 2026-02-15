---
id: test-scenario-dsl
title: Test Scenario DSL
description: "Write your process tests using the Test Scenario DSL."
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

## Reference: Instructions

Instructions define the actions and assertions to be performed in a test case. Each instruction has a `type` property that identifies the instruction, along with additional properties specific to that instruction type.

### ASSERT_DECISION

An instruction to assert the evaluation of a decision.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_DECISION"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>decisionSelector</td>
    <td>The selector to identify the decision.</td>
    <td><a href="#decision-selector">DecisionSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>output</td>
    <td>Expected output of the decision (any JSON type)</td>
    <td>any</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>matchedRules</td>
    <td>Expected matched rule indexes</td>
    <td>array of integer</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>notMatchedRules</td>
    <td>Expected not matched rule indexes</td>
    <td>array of integer</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>noMatchedRules</td>
    <td>Assert that no rules were matched</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_DECISION",
  "decisionSelector": {
    "decisionDefinitionId": "ChooseRocket"
  },
  "output": {
    "rocket": "Ariane 6"
  },
  "matchedRules": [3]
}
```

### ASSERT_ELEMENT_INSTANCE

An instruction to assert the state of an element instance.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_ELEMENT_INSTANCE"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>elementSelector</td>
    <td>The selector to identify the element.</td>
    <td><a href="#element-selector">ElementSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>state</td>
    <td>The expected state of the element instance.</td>
    <td>enum: IS_ACTIVE, IS_COMPLETED, IS_TERMINATED</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>amount</td>
    <td>The expected amount of element instances in the given state.</td>
    <td>integer (minimum: 1)</td>
    <td>No</td>
    <td>1</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_ELEMENT_INSTANCE",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "elementSelector": {
    "elementId": "LaunchRocket"
  },
  "state": "IS_COMPLETED"
}
```

### ASSERT_ELEMENT_INSTANCES

An instruction to assert the state of multiple element instances.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_ELEMENT_INSTANCES"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>elementSelectors</td>
    <td>The selectors to identify the elements.</td>
    <td>array of <a href="#element-selector">ElementSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>state</td>
    <td>The expected state of the element instances.</td>
    <td>enum: IS_ACTIVE, IS_COMPLETED, IS_TERMINATED, IS_NOT_ACTIVE, IS_NOT_ACTIVATED, IS_ACTIVE_EXACTLY, IS_COMPLETED_IN_ORDER</td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_ELEMENT_INSTANCES",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "elementSelectors": [
    { "elementId": "PrepareMission" },
    { "elementId": "LaunchRocket" },
    { "elementId": "LandOnMoon" }
  ],
  "state": "IS_COMPLETED_IN_ORDER"
}
```

### ASSERT_PROCESS_INSTANCE

An instruction to assert the state of a process instance.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_PROCESS_INSTANCE"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>state</td>
    <td>The expected state of the process instance.</td>
    <td>enum: IS_ACTIVE, IS_COMPLETED, IS_CREATED, IS_TERMINATED</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>hasActiveIncidents</td>
    <td>Whether the process instance has active incidents.</td>
    <td>boolean</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_PROCESS_INSTANCE",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "state": "IS_COMPLETED",
  "hasActiveIncidents": false
}
```

### ASSERT_PROCESS_INSTANCE_MESSAGE_SUBSCRIPTION

An instruction to assert the state of a process instance message subscription.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_PROCESS_INSTANCE_MESSAGE_SUBSCRIPTION"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>messageSelector</td>
    <td>The selector to identify the message.</td>
    <td><a href="#message-selector">MessageSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>state</td>
    <td>The expected state of the message subscription.</td>
    <td>enum: IS_WAITING, IS_NOT_WAITING, IS_CORRELATED</td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_PROCESS_INSTANCE_MESSAGE_SUBSCRIPTION",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "messageSelector": {
    "messageName": "AstronautReady"
  },
  "state": "IS_CORRELATED"
}
```

### ASSERT_USER_TASK

An instruction to assert the state of a user task.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_USER_TASK"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>userTaskSelector</td>
    <td>The selector to identify the user task.</td>
    <td><a href="#user-task-selector">UserTaskSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>state</td>
    <td>The expected state of the user task.</td>
    <td>enum: IS_CREATED, IS_COMPLETED, IS_CANCELED, IS_FAILED</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>The expected assignee of the user task.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>candidateGroups</td>
    <td>The expected candidate groups of the user task.</td>
    <td>array of string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>priority</td>
    <td>The expected priority of the user task.</td>
    <td>integer</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>elementId</td>
    <td>The expected element ID of the user task.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>name</td>
    <td>The expected name of the user task.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>dueDate</td>
    <td>The expected due date of the user task in ISO-8601 format.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>followUpDate</td>
    <td>The expected follow-up date of the user task in ISO-8601 format.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_USER_TASK",
  "userTaskSelector": {
    "elementId": "ReviewMissionPlan"
  },
  "state": "IS_CREATED",
  "assignee": "zee-astronaut",
  "priority": 100
}
```

### ASSERT_VARIABLES

An instruction to assert the variables of a process instance.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "ASSERT_VARIABLES"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>elementSelector</td>
    <td>The selector to identify the element for local variables.</td>
    <td><a href="#element-selector">ElementSelector</a></td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variableNames</td>
    <td>The expected variable names.</td>
    <td>array of string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The expected variables with their values.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "ASSERT_VARIABLES",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "variables": {
    "missionStatus": "completed",
    "astronautName": "Zee"
  }
}
```

### BROADCAST_SIGNAL

An instruction to broadcast a signal.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "BROADCAST_SIGNAL"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>signalName</td>
    <td>The name of the signal to broadcast.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to broadcast with the signal.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "BROADCAST_SIGNAL",
  "signalName": "EmergencyEvacuation",
  "variables": {
    "reason": "meteor-shower",
    "destination": "space-station"
  }
}
```

### COMPLETE_JOB

An instruction to complete a job.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "COMPLETE_JOB"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobSelector</td>
    <td>The selector to identify the job to complete.</td>
    <td><a href="#job-selector">JobSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to complete the job with.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>useExampleData</td>
    <td>Whether to complete the job with example data from the BPMN element. This property has precedence over variables.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "COMPLETE_JOB",
  "jobSelector": {
    "jobType": "analyze-moon-samples"
  },
  "variables": {
    "analysisResult": "high-mineral-content"
  }
}
```

### COMPLETE_JOB_AD_HOC_SUB_PROCESS

An instruction to complete a job of an ad-hoc sub-process.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "COMPLETE_JOB_AD_HOC_SUB_PROCESS"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobSelector</td>
    <td>The selector to identify the job to complete.</td>
    <td><a href="#job-selector">JobSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to complete the job with.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>activateElements</td>
    <td>The elements to activate in the ad-hoc sub-process.</td>
    <td>array of objects with elementId (string, required) and variables (object, optional)</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>cancelRemainingInstances</td>
    <td>Whether to cancel remaining instances of the ad-hoc sub-process.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
  <tr>
    <td>completionConditionFulfilled</td>
    <td>Whether the completion condition of the ad-hoc sub-process is fulfilled.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "COMPLETE_JOB_AD_HOC_SUB_PROCESS",
  "jobSelector": {
    "jobType": "conduct-experiment"
  },
  "variables": {
    "experimentResult": "success"
  },
  "completionConditionFulfilled": true
}
```

### COMPLETE_JOB_USER_TASK_LISTENER

An instruction to complete a job of a user task listener.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "COMPLETE_JOB_USER_TASK_LISTENER"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobSelector</td>
    <td>The selector to identify the job to complete.</td>
    <td><a href="#job-selector">JobSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>denied</td>
    <td>Whether the worker denies the work.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
  <tr>
    <td>deniedReason</td>
    <td>The reason for denying the job.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>corrections</td>
    <td>The corrections to apply to the user task. Only applicable if denied is false.</td>
    <td>object with properties: assignee (string), dueDate (string), followUpDate (string), candidateUsers (array of string), candidateGroups (array of string), priority (integer)</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "COMPLETE_JOB_USER_TASK_LISTENER",
  "jobSelector": {
    "jobType": "validate-astronaut-assignment"
  },
  "corrections": {
    "assignee": "zee-senior-astronaut",
    "priority": 50
  }
}
```

### COMPLETE_USER_TASK

An instruction to complete a user task.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "COMPLETE_USER_TASK"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>userTaskSelector</td>
    <td>The selector to identify the user task to complete.</td>
    <td><a href="#user-task-selector">UserTaskSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to set when completing the user task. Ignored if useExampleData is true.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>useExampleData</td>
    <td>Whether to complete the user task with example data from the BPMN element. If true, the variables property is ignored.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "COMPLETE_USER_TASK",
  "userTaskSelector": {
    "elementId": "ReviewMissionPlan"
  },
  "variables": {
    "approved": true,
    "comments": "Mission plan looks good for moon exploration"
  }
}
```

### CORRELATE_MESSAGE

An instruction to correlate a message.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "CORRELATE_MESSAGE"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the message.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>correlationKey</td>
    <td>The correlation key of the message.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to correlate with the message.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "CORRELATE_MESSAGE",
  "name": "AstronautReady",
  "correlationKey": "mission-001",
  "variables": {
    "astronautName": "Zee",
    "status": "ready-for-launch"
  }
}
```

### CREATE_PROCESS_INSTANCE

An instruction to create a new process instance.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "CREATE_PROCESS_INSTANCE"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processDefinitionSelector</td>
    <td>The selector to identify the process definition to create the process instance for.</td>
    <td><a href="#process-definition-selector">ProcessDefinitionSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to create the process instance with.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>startInstructions</td>
    <td>The instructions to execute when starting the process instance.</td>
    <td>array of objects with elementId (string, required)</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>runtimeInstructions</td>
    <td>The instructions to affect the runtime behavior of the process instance.</td>
    <td>array of objects with type (string, required) and afterElementId (string, required for TERMINATE_PROCESS_INSTANCE)</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "CREATE_PROCESS_INSTANCE",
  "processDefinitionSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "variables": {
    "missionName": "Artemis-Zee",
    "destination": "Moon",
    "astronautCount": 4
  }
}
```

### EVALUATE_CONDITIONAL_START_EVENT

An instruction to evaluate conditional start events.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "EVALUATE_CONDITIONAL_START_EVENT"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to evaluate the conditional start events with.</td>
    <td>object</td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "EVALUATE_CONDITIONAL_START_EVENT",
  "variables": {
    "weatherCondition": "clear",
    "fuelLevel": 100
  }
}
```

### EVALUATE_DECISION

An instruction to evaluate a DMN decision.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "EVALUATE_DECISION"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>decisionDefinitionSelector</td>
    <td>The selector to identify the decision definition to evaluate.</td>
    <td><a href="#decision-definition-selector">DecisionDefinitionSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to evaluate the decision with.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "EVALUATE_DECISION",
  "decisionDefinitionSelector": {
    "decisionDefinitionId": "ChooseRocket"
  },
  "variables": {
    "payload": 5000,
    "destination": "Moon"
  }
}
```

### INCREASE_TIME

An instruction to increase the time.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "INCREASE_TIME"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>duration</td>
    <td>The duration to increase the time by, in ISO 8601 duration format (e.g., "PT1H", "P2D").</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "INCREASE_TIME",
  "duration": "P3D"
}
```

### MOCK_CHILD_PROCESS

An instruction to mock a child process.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "MOCK_CHILD_PROCESS"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>The ID of the child process to mock.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to set for the mocked child process.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "MOCK_CHILD_PROCESS",
  "processDefinitionId": "AstronautTrainingProcess",
  "variables": {
    "trainingCompleted": true,
    "grade": "excellent"
  }
}
```

### MOCK_DMN_DECISION

An instruction to mock a DMN decision.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "MOCK_DMN_DECISION"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>The decision definition ID to mock.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to set as the decision output.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "MOCK_DMN_DECISION",
  "decisionDefinitionId": "ChooseRocket",
  "variables": {
    "rocket": "Falcon Heavy"
  }
}
```

### MOCK_JOB_WORKER_COMPLETE_JOB

An instruction to mock a job worker who completes jobs.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "MOCK_JOB_WORKER_COMPLETE_JOB"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobType</td>
    <td>The job type to mock. This should match the zeebeJobType in the BPMN model.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to complete the job with.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>useExampleData</td>
    <td>Whether to use example data from the BPMN element. If true, the variables property is ignored.</td>
    <td>boolean</td>
    <td>No</td>
    <td>false</td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "MOCK_JOB_WORKER_COMPLETE_JOB",
  "jobType": "calculate-trajectory",
  "variables": {
    "trajectory": "optimal",
    "fuelConsumption": 450
  }
}
```

### MOCK_JOB_WORKER_THROW_BPMN_ERROR

An instruction to mock a job worker who throws BPMN errors.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "MOCK_JOB_WORKER_THROW_BPMN_ERROR"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobType</td>
    <td>The job type to mock. This should match the zeebeJobType in the BPMN model.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>errorCode</td>
    <td>The error code to throw. This should match the error code in an error catch event.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>The error message to include when throwing the error.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to include when throwing the error.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "MOCK_JOB_WORKER_THROW_BPMN_ERROR",
  "jobType": "launch-rocket",
  "errorCode": "WEATHER_UNSUITABLE",
  "errorMessage": "High winds detected"
}
```

### PUBLISH_MESSAGE

An instruction to publish a message.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "PUBLISH_MESSAGE"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the message.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>correlationKey</td>
    <td>The correlation key of the message.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to publish with the message.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>timeToLive</td>
    <td>The time-to-live of the message in milliseconds.</td>
    <td>integer</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>messageId</td>
    <td>The message ID for uniqueness.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "PUBLISH_MESSAGE",
  "name": "LaunchApproved",
  "correlationKey": "mission-001",
  "variables": {
    "approvedBy": "mission-control",
    "launchWindow": "2026-03-15T10:00:00Z"
  }
}
```

### RESOLVE_INCIDENT

An instruction to resolve an incident.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "RESOLVE_INCIDENT"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>incidentSelector</td>
    <td>The selector to identify the incident to resolve.</td>
    <td><a href="#incident-selector">IncidentSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "RESOLVE_INCIDENT",
  "incidentSelector": {
    "elementId": "LaunchRocket"
  }
}
```

### SET_TIME

An instruction to set the time.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "SET_TIME"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>time</td>
    <td>The time to set, in ISO 8601 instant format (e.g., "2026-01-19T13:00:00Z").</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "SET_TIME",
  "time": "2026-03-15T10:00:00Z"
}
```

### THROW_BPMN_ERROR_FROM_JOB

An instruction to throw a BPMN error from a job.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "THROW_BPMN_ERROR_FROM_JOB"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>jobSelector</td>
    <td>The selector to identify the job to throw the error from.</td>
    <td><a href="#job-selector">JobSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>errorCode</td>
    <td>The error code to throw.</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>The error message to throw.</td>
    <td>string</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to set when throwing the error.</td>
    <td>object</td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "THROW_BPMN_ERROR_FROM_JOB",
  "jobSelector": {
    "jobType": "deploy-satellite"
  },
  "errorCode": "DEPLOYMENT_FAILED",
  "errorMessage": "Insufficient orbital velocity"
}
```

### UPDATE_VARIABLES

An instruction to create or update process instance variables.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Instruction type, must be "UPDATE_VARIABLES"</td>
    <td>string</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>processInstanceSelector</td>
    <td>The selector to identify the process instance.</td>
    <td><a href="#process-instance-selector">ProcessInstanceSelector</a></td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>variables</td>
    <td>The variables to create or update.</td>
    <td>object</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>elementSelector</td>
    <td>The selector to identify the element for local variables.</td>
    <td><a href="#element-selector">ElementSelector</a></td>
    <td>No</td>
    <td></td>
  </tr>
</tbody></table>

Example:

```json
{
  "type": "UPDATE_VARIABLES",
  "processInstanceSelector": {
    "processDefinitionId": "MoonExplorationProcess"
  },
  "variables": {
    "currentPhase": "landing",
    "fuelRemaining": 75
  }
}
```

## Reference: Selectors

Selectors are used to identify specific resources in your process tests. Each selector must contain at least one of the specified properties.

### Decision Definition Selector

A selector to identify a decision definition.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>ID of the decision definition</td>
    <td>string</td>
  </tr>
</tbody></table>

### Decision Selector

A selector to identify a decision. The selector must contain at least one of the following properties:

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>ID of the decision definition</td>
    <td>string</td>
  </tr>
  <tr>
    <td>decisionDefinitionName</td>
    <td>Name of the decision definition</td>
    <td>string</td>
  </tr>
</tbody></table>

### Element Selector

A selector to identify a BPMN element. The selector must contain at least one of the following properties:

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>elementId</td>
    <td>ID of the BPMN element</td>
    <td>string</td>
  </tr>
  <tr>
    <td>elementName</td>
    <td>Name of the BPMN element</td>
    <td>string</td>
  </tr>
</tbody></table>

### Incident Selector

A selector to identify an incident. The selector must contain at least one of the following properties:

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>elementId</td>
    <td>ID of the BPMN element where the incident occurred</td>
    <td>string</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Process definition ID of the incident</td>
    <td>string</td>
  </tr>
</tbody></table>

### Job Selector

A selector to identify a job. The selector must contain at least one of the following properties:

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>jobType</td>
    <td>Type of the job</td>
    <td>string</td>
  </tr>
  <tr>
    <td>elementId</td>
    <td>ID of the BPMN element</td>
    <td>string</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Process definition ID of the job</td>
    <td>string</td>
  </tr>
</tbody></table>

### Message Selector

A selector to identify a message.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>messageName</td>
    <td>Name of the message (required)</td>
    <td>string</td>
  </tr>
  <tr>
    <td>correlationKey</td>
    <td>Correlation key of the message (optional)</td>
    <td>string</td>
  </tr>
</tbody></table>

### Process Definition Selector

A selector to identify a process definition.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>ID of the process definition</td>
    <td>string</td>
  </tr>
</tbody></table>

### Process Instance Selector

A selector to identify a process instance.

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Process definition ID of the process instance</td>
    <td>string</td>
  </tr>
</tbody></table>

### User Task Selector

A selector to identify a user task. The selector must contain at least one of the following properties:

<table>
  <tbody><tr>
    <th>Property</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>elementId</td>
    <td>ID of the BPMN element</td>
    <td>string</td>
  </tr>
  <tr>
    <td>taskName</td>
    <td>Name of the user task</td>
    <td>string</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Process definition ID of the user task</td>
    <td>string</td>
  </tr>
</tbody></table>
