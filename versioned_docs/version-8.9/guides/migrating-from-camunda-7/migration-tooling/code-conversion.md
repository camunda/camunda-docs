---
id: code-conversion
title: Code Conversion
sidebar_label: Code Conversion
description: "Understand patterns to convert your code written for Camunda 7 to run on Camunda 8."
---

As Camunda 8 is a complete rewrite of Camunda 7, you must convert your models (BPMN and DMN) and some of your code to work with the Orchestration Cluster REST API.

:::tip Easiest path: use the Camunda migration agent skill
If you use an [Agent Skills](https://agentskills.io/)-compatible AI coding agent (such as Claude Code), you can run an interactive end-to-end migration without copy-pasting prompts from this page. See [Camunda migration agent skill](#camunda-migration-agent-skill) under [Leverage AI for code migration](#leverage-ai-for-code-migration). The rest of this page describes the underlying tools and patterns the skill uses, which you can also apply manually.
:::

## Overview

You must especially rewrite code that does the following:

- Uses the Client API: Starting process instances, correlating messages, managing tasks, etc.
- Implements service tasks, including:
  - [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#the-external-task-pattern) where workers subscribe to the engine
  - [Java code attached to service tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) called directly by the engine (in-VM)

### Tools and resources

This guide covers tools and approaches to help with code conversion:

1. [API Mapping Guide](#api-mapping-guide): Understand how Camunda 7 REST API endpoints map to Camunda 8
2. [OpenRewrite Recipes](#refactoring-recipes-using-openrewrite): Automatically refactor Java code with configurable recipes
3. [Code Conversion Patterns](#code-conversion-patterns): Detailed technical reference for manual migration
4. [AI-Assisted Code Migration](#leverage-ai-for-code-migration): Use AI coding agents for interactive and agentic migration, including the [Camunda migration agent skill](#camunda-migration-agent-skill) for an end-to-end interactive workflow _(easiest)_

Additionally, you will find information about:

- [Diagram Converter](#diagram-converter) for BPMN and DMN model conversion
- [Complete migration example](#example-adjusting-a-spring-boot-application) showing all tools in action

### Choose your migration approach

You can combine these tools depending on your codebase complexity:

| Approach                   | Best for                                                    | How it works                                                                                                      |
| -------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **OpenRewrite only**       | Standard patterns, large codebases with many similar files  | Run batch recipes, review diffs, manually fix remaining TODOs                                                     |
| **AI agent only**          | Small codebases, complex custom code, exploratory migration | Give an AI agent your code and migration patterns, iterate on results                                             |
| **Combined (recommended)** | Most real-world projects                                    | Run OpenRewrite first for deterministic bulk changes, then use AI for TODOs, edge cases, tests, and configuration |

## API mapping guide

The Camunda 7 and Camunda 8 Orchestration Cluster APIs share many similarities, but several aspects have been modernized in Camunda 8.

### Key structural changes

Streamlined search endpoints:

- **Camunda 7**: Separate endpoints like `GET /resource` and `GET /resource/count`
- **Camunda 8**: Single `POST /search` endpoint with filtering capabilities

Tenant handling:

- **Camunda 7**: `tenantId` passed as path parameter with multiple endpoint variants
- **Camunda 8**: `tenantId` passed in request body, simplifying the API surface

History data:

- **Camunda 7**: Separate endpoints for historic data (for example, HistoryService)
- **Camunda 8**: No separate historic endpoints; history is managed through Operate

### Using the interactive mapping tool

To help you understand the differences between the two APIs, we provide an interactive web application that maps the complete Camunda 7 REST API to its Camunda 8 counterparts. The tool shows:

- Direct mappings: Camunda 7 endpoints that map one-to-one to Camunda 8
- Conceptual mappings: Functionality that exists in Camunda 8 but works differently
- Roadmap items: Features planned for future Camunda 8 releases
- Discontinued features: Camunda 7 endpoints that are no longer available and why

[Open the API Mapping Guide](https://camunda.github.io/camunda-7-to-8-migration-tooling/).

:::tip When to use this tool
Use the API mapping guide to:

- Quickly find Camunda 8 equivalents for Camunda 7 API calls
- Understand why certain parameters or endpoints changed
- Check if a planned feature is on the roadmap
- Plan your migration strategy based on API availability
  :::

## Code conversion patterns

Due to the flexibility of Camunda 7, there are many ways to write code and therefore many possible conversion patterns. We maintain a collaborative catalog of these patterns to serve as technical reference material for manual migration and recipe development.

### What are code conversion patterns?

Code conversion patterns are detailed, technical examples showing how specific Camunda 7 code constructs translate to Camunda 8. Each pattern includes:

- Side-by-side code comparisons between Camunda 7 and Camunda 8
- Explanations of conceptual differences
- Parameter mappings and method equivalents
- Notes on edge cases and limitations

### When to use the patterns

Use the code conversion patterns when:

- Manual migration is needed: The OpenRewrite recipes cannot handle your specific code structure
- Understanding changes: You want to understand what the recipes are doing under the hood
- Extending recipes: You're developing custom recipes for your organization's specific patterns
- Complex scenarios: Your code uses advanced features that require careful manual conversion

### Pattern categories

The catalog covers the following types of code:

General patterns:

- Maven dependencies and configuration
- Handling process variables

Client code (code that calls the Camunda API):

- Starting process instances
- Correlating messages
- Handling user tasks
- Managing process variables
- Searching process definitions
- Broadcasting signals
- Canceling process instances
- Raising incidents
- Handling resources
- Class-level changes

Glue code (code executed by the process engine):

- Converting JavaDelegates to Job Workers
- Converting ExecutionListeners to Job Workers
- Converting External Task Workers to Job Workers
- Converting expressions

Test code:

- Complete test cases
- Process instance assertions
- Process variable assertions
- User task assertions
- Message correlation
- Job execution

### Accessing the patterns

The complete pattern catalog with code examples is maintained on GitHub.

Browse the complete pattern catalog with code examples in the
[Migration Tooling repository](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion/patterns).

:::tip
The pattern catalog is actively maintained by Camunda consultants, partners, and community members. You can contribute your own patterns or request additions via GitHub issues and pull requests.
:::

### Using patterns with OpenRewrite

The patterns inform the OpenRewrite recipe development. If you find a pattern that's not yet covered by the recipes, you can:

1. Use the pattern for manual migration
2. Reference the pattern when [extending the recipes](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/recipes/developer_guide.md)
3. Contribute a new recipe based on the pattern

## Refactoring recipes (using OpenRewrite)

[OpenRewrite](https://docs.openrewrite.org/) is an open-source framework that can automate refactorings by so-called recipes. It is provided with an Apache License, making it easy to adopt in any context.

The Camunda 7 to 8 OpenRewrite recipes help you automatically refactor:

- Client code using the Camunda 7 Java API
- Java delegates and execution listeners (glue code)
- External task workers
- Unit tests (work in progress)

:::note
The recipes are still under development. Expect recipes to work out-of-the-box only in simple scenarios. For complex codebases, you may need to extend or customize them to suit your needs.
:::

### How the recipes work

The code transformation is performed in three phases to ensure your code remains compilable throughout the migration:

1. **Prepare**: Prepares the Camunda 7 code with minimal changes (e.g., converting TypedValue API to Java Object API, adding Maven dependencies).
2. **Migrate**: Replaces Camunda 7 methods with Camunda 8 equivalents. Comments are added where parameters were modified or removed.
3. **Cleanup**: Removes unnecessary dependencies and imports.

### Available recipes

The recipes are organized by code type and transformation phase:

| Type of change | Client code             | Java delegate             | External worker                 |
| -------------- | ----------------------- | ------------------------- | ------------------------------- |
| **Prepare**    | AllClientPrepareRecipes | AllDelegatePrepareRecipes | AllExternalWorkerPrepareRecipes |
| **Migrate**    | AllClientMigrateRecipes | AllDelegateMigrateRecipes | AllExternalWorkerMigrateRecipes |
| **Cleanup**    | AllClientCleanupRecipes | AllDelegateCleanupRecipes | AllExternalWorkerCleanupRecipes |
| **Combined**   | AllClientRecipes        | AllDelegateRecipes        | AllExternalWorkerRecipes        |

You can apply recipes individually by phase, or use the _combined_ recipes to run all three phases at once.

### Using the recipes

#### Prerequisites

- Maven-based Java project (Gradle is also supported via [OpenRewrite's documentation](https://docs.openrewrite.org/running-recipes/getting-started))
- Project under version control (to easily review refactorings)

#### Step 1: Add the OpenRewrite Maven plugin

Add the following to your `pom.xml`:

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.openrewrite.maven</groupId>
                <artifactId>rewrite-maven-plugin</artifactId>
                <version>6.29.0</version>
                <configuration>
                    <activeRecipes>
                        <recipe>io.camunda.migration.code.recipes.AllClientRecipes</recipe>
                        <recipe>io.camunda.migration.code.recipes.AllDelegateRecipes</recipe>
                        <recipe>io.camunda.migration.code.recipes.AllExternalWorkerRecipes</recipe>
                    </activeRecipes>
                    <skipMavenParsing>false</skipMavenParsing>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>io.camunda</groupId>
                        <artifactId>camunda-7-to-8-code-conversion-recipes</artifactId>
                        <version>0.2.0</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
</project>
```

:::warning Important
Always back up your code or use version control before running recipes. This ensures you can review and rollback changes if needed.
:::

:::note
The use of `camunda-7-to-8-code-conversion-recipes` artifact requires access to the Camunda Enterprise Maven repository. See the [Camunda 7 documentation](https://docs.camunda.org/get-started/apache-maven/#camunda-artifact-storage) for instructions on setting up the repository in your Maven configuration.
:::

Choose the recipes that match your codebase:

- Include `AllClientRecipes` if you have code that calls the Camunda API (starting processes, correlating messages, etc.)
- Include `AllDelegateRecipes` if you have Java delegates or execution listeners
- Include `AllExternalWorkerRecipes` if you have external task workers

#### Step 2: Run the recipes

Execute the following command:

```shell
mvn rewrite:run
```

#### Step 3: Review the changes

Carefully examine all changes using your version control system's diff tool. The recipes add comments where manual review is needed:

- Parameters that were removed or have different semantics in Camunda 8
- Methods with no direct one-to-one replacement (for example, executionId-based operations)
- Dummy literal strings that need to be replaced with actual values

:::warning Important
Always review the transformed code. Some concepts from Camunda 7 (like executionId) don't exist in Camunda 8, and recipes cannot automatically determine the correct replacement in all cases.
:::

### Recipe completeness and limitations

The recipes cover:

- Class structure and annotations
- Dependencies and imports
- Basic types and commonly used methods

However, they are incomplete in two aspects:

- Some Camunda 7 methods could be transformed but are not yet included
- Some Camunda 7 methods have no equivalent in Camunda 8

If Camunda 7 code remains after applying recipes:

1. Refer to the [code conversion patterns](#code-conversion-patterns) for manual migration guidance
2. Extend the recipes for your specific use case (see the [developer guide](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/recipes/developer_guide.md))
3. Remove or refactor the code if the functionality is no longer available

### Additional resources

- [Recipe source code and developer guide](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion/recipes)
- [OpenRewrite documentation](https://docs.openrewrite.org/)
- [Complete migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)

## Diagram converter

Your BPMN and DMN models need to be adjusted to work with Camunda 8.

The [Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) handles most common changes automatically. Depending on how you refactor your code and what elements of Camunda 7 you have used, you can extend or customize the Diagram Converter to suit your needs.

Find the diagram conversion tooling and its documentation in the [Migration Tooling – Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter).

## Leverage AI for code migration

AI can accelerate code migration by applying the [code conversion patterns](#code-conversion-patterns) interactively. This is especially valuable for code that OpenRewrite recipes cannot handle automatically, such as custom superclasses, complex test cases, or configuration files.

There are two equally valid ways to use AI for migration — pick whichever fits your tooling and access:

- **Use the [Camunda migration agent skill](#camunda-migration-agent-skill)** with an agentic AI coding tool such as Claude Code, GitHub Copilot, or Cursor. This is the easiest option if you have access to such a tool: the skill drives the full end-to-end workflow (assessment, OpenRewrite, AI cleanup, validation) interactively.
- **Drive AI yourself with the [example prompts](#set-up-an-ai-agent-for-migration)** below. This works with any AI tool, including standalone chat assistants such as ChatGPT or Claude.ai. Copy the prompts, paste your code, and apply the results manually.

### Camunda migration agent skill

For the fastest path, use the official Camunda migration [Agent Skill](https://agentskills.io/). It packages everything described on this page — assessment, OpenRewrite, AI cleanup, and validation — into an interactive workflow that runs inside your AI coding agent.

**Install with Claude Code:**

```bash
claude plugin marketplace add camunda/camunda-7-to-8-migration-tooling
claude plugin install camunda-migration
```

**Other agents** — the skill follows the open [Agent Skills](https://agentskills.io/) format and works with any compatible agent. See the [Agentic Migration Skills README](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/agentic-migration-skills) for manual installation.

**Run** from your Camunda 7 project directory:

```
/camunda-migration:migrate-c7-to-c8
```

The skill asks for your project path and migration approach, then guides you through:

| Approach                             | What it does                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **OpenRewrite + AI** _(recommended)_ | Runs OpenRewrite recipes for bulk transforms, then AI resolves remaining TODOs, configuration, and test code |
| **AI only**                          | AI migrates everything directly — for non-Maven/Gradle builds or when you want to review every change        |
| **Assessment only**                  | Scans the codebase and reports files, complexity, and effort estimate — no code changes                      |

The skill fetches the latest [pattern catalog](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md) at runtime, so it always reflects current migration guidance.

### Drive an AI agent yourself

If you do not have access to an agentic coding tool, or want full control over each step, you can drive any AI tool — including standalone chat assistants — with the prompts below.

You can use AI in three ways:

1. **Standalone**: Give the AI agent your Camunda 7 code and the conversion patterns, and let it produce Camunda 8 equivalents.
2. **Post-OpenRewrite cleanup**: Run OpenRewrite first, then use AI to fix remaining TODOs and compilation errors.
3. **Full agentic migration**: Let an AI agent assess your codebase, run OpenRewrite, and handle all remaining migration tasks.

### Recommended combined workflow

For most real-world projects, the combined approach gives the best results:

```
Step 1: Assess        →  AI agent scans the codebase, classifies files, creates plan
Step 2: OpenRewrite   →  Run batch recipes for deterministic bulk transformations
Step 3: AI cleanup    →  AI handles TODOs, edge cases, tests, and configuration
Step 4: Validate      →  Compile, run tests, and search for remaining C7 references
```

### Set up an AI agent for migration

When using an AI coding agent, provide it with the migration patterns as context so the agent can apply these patterns across your entire codebase.

:::tip Provide context to AI agents
Point the agent to the pattern catalog for best results:

- **URL reference**: `https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md`.
- **Local file**: If you have the migration tooling repository cloned, reference the local `ALL_IN_ONE.md` file directly.
- **Inline patterns**: For specific migration tasks, include the relevant patterns directly in your prompt.

Agents with access to browse URLs or read local files (like Claude Code or Copilot Agent Mode) can fetch the patterns automatically. For chat-based tools, paste the relevant code examples from the pattern catalog into your prompt.
:::

### Step 1: Assess your codebase

Before migrating, use AI to create an inventory of all Camunda 7 code in your project. This helps you plan the migration order and identify which tools to use for each file.

**Prompt: Codebase assessment**

```
Analyze this Camunda 7 codebase and create a migration inventory. For each Java file
that imports from org.camunda.bpm.*, classify it as one of:

1. Client code — Uses ProcessEngine, RuntimeService, TaskService, RepositoryService
2. JavaDelegate — Implements org.camunda.bpm.engine.delegate.JavaDelegate
3. ExecutionListener — Implements org.camunda.bpm.engine.delegate.ExecutionListener
4. External Task Worker — Implements ExternalTaskHandler or uses @ExternalTaskSubscription
5. JUEL Expression — Referenced in BPMN as camunda:expression
6. Test code — Uses BpmnAwareTests, ProcessEngineRule, or camunda-bpm-assert
7. Configuration — Spring config, application.properties/yml, processes.xml

Output a markdown table with columns: File, Type, Complexity (Low/Medium/High), Notes.

Complexity guidelines:
- Low: Standard patterns (simple delegate, basic startProcessInstance, simple test)
- Medium: Uses builder patterns, correlates messages, typed value API, multiple services
- High: Custom superclasses, JUEL expressions, complex queries, history service
```

### Step 2: Migrate client code

Client code is any code that calls the Camunda API from your application, for example, code that starts process instances, correlates messages, or manages tasks.

**Prompt: Client code migration**

```
Migrate the following Camunda 7 client code to Camunda 8 using the official migration
patterns from https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md

Apply these rules:

Class-level:
- Replace @Autowired ProcessEngine engine with @Autowired CamundaClient camundaClient
- Remove any @Autowired RuntimeService, TaskService, RepositoryService fields

Start Process Instance:
- engine.getRuntimeService().startProcessInstanceByKey(key, vars)
  → camundaClient.newCreateInstanceCommand().bpmnProcessId(key).latestVersion()
    .variables(vars).send().join()
- Return type: ProcessInstance → ProcessInstanceEvent

Cancel Process Instance:
- engine.getRuntimeService().deleteProcessInstance(id, reason)
  → camundaClient.newCancelInstanceCommand(processInstanceKey).send().join()

Message Correlation:
- engine.getRuntimeService().correlateMessage(name, businessKey, vars)
  → camundaClient.newCorrelateMessageCommand().messageName(name)
    .correlationKey(key).variables(vars).send().join()

Signal Broadcasting:
- engine.getRuntimeService().signalEventReceived(name, vars)
  → camundaClient.newBroadcastSignalCommand().signalName(name)
    .variables(vars).send().join()

User Tasks:
- engine.getTaskService().complete(taskId, vars)
  → camundaClient.newUserTaskCompleteCommand(userTaskKey).variables(vars).send().join()

Variables:
- engine.getRuntimeService().getVariable(execId, name)
  → camundaClient.newVariableSearchRequest()
    .filter(f -> f.processInstanceKey(key).name(name)).send().join().items().get(0)
- engine.getRuntimeService().setVariable(execId, name, value)
  → camundaClient.newSetVariablesCommand(elementInstanceKey)
    .variable(name, value).send().join()
- VariableMap / TypedValue API → Map<String, Object>

Type changes:
- String processInstanceId → Long processInstanceKey
- ProcessInstance → ProcessInstanceEvent
- VariableMap → Map<String, Object>
- Task → UserTask

Important: Parameter names are swapped in C8:
- "processDefinitionKey" (C7, the BPMN ID) → "bpmnProcessId" (C8)
- "processDefinitionId" (C7, deployment key) → "processDefinitionKey" (C8)

Here is the Camunda 7 client code to migrate:
[... paste code ...]
```

### Step 3: Migrate JavaDelegates to Job Workers

JavaDelegates are glue code that runs within the Camunda 7 engine. In Camunda 8, they become Job Workers, that is, Spring beans with `@JobWorker`-annotated methods.

**Prompt: JavaDelegate migration**

```
Migrate the following Camunda 7 JavaDelegate to a Camunda 8 Job Worker using the official
migration patterns from https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md

Apply these rules:

Class-level:
- Remove "implements JavaDelegate"
- Keep @Component annotation
- Add a @JobWorker annotated method:
  @JobWorker(type = "<beanName>")
  public Map<String, Object> handleJob(JobClient client, ActivatedJob job) { }
  The "type" should match the bean name (for delegateExpression)
  or camelCase of the class name (for camunda:class)
- Remove the old execute(DelegateExecution) method after migrating its body

Variable handling:
- execution.getVariable("name") → job.getVariablesAsMap().get("name")
- execution.setVariable("name", value) → return from the method: return Map.of("name", value)
- Multiple setVariable calls → collect into one Map and return it
- TypedValue API (Variables.integerValue(x), IntegerValue, etc.) → plain Java types

BPMN Error:
- throw new BpmnError(code, msg) → throw CamundaError.bpmnError(code, msg, variables)

Failure handling:
- throw new ProcessEngineException(msg)
  → throw CamundaError.jobError(msg, vars, job.getRetries() - 1, Duration.ofSeconds(30))

Incident (retries=0):
- execution.createIncident(type, config, msg)
  → throw CamundaError.jobError(msg, vars, 0, null, exception)

Here is the Camunda 7 JavaDelegate to migrate:
[... paste code ...]
```

### Step 4: Migrate external task workers to Job Workers

External task workers have a similar architecture to Camunda 8 Job Workers, which makes this migration relatively straightforward.

**Prompt: External task worker migration**

```
Migrate the following Camunda 7 External Task Worker to a Camunda 8 Job Worker using
the official migration patterns from https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md

Apply these rules:

Class-level:
- Change @Configuration to @Component
- Remove "implements ExternalTaskHandler"
- Remove @ExternalTaskSubscription("topicName")
- Add: @JobWorker(type = "topicName")
       public Map<String, Object> handleJob(JobClient client, ActivatedJob job) { }

If using lambda-style (multiple workers per class):
- Convert each @Bean @ExternalTaskSubscription("topic") method
  to a separate @JobWorker(type = "topic") method

Variable handling:
- externalTask.getVariable("name") → job.getVariablesAsMap().get("name")
- externalTaskService.complete(id, vars, null) → return vars from method

BPMN Error:
- externalTaskService.handleBpmnError(task, code, msg, vars)
  → throw CamundaError.bpmnError(code, msg, vars)

Failure/Incident:
- externalTaskService.handleFailure(id, msg, details, retries, timeout, vars, null)
  → throw CamundaError.jobError(msg, vars, job.getRetries() - 1, Duration.ofSeconds(30))
- With retries=0 → throw CamundaError.jobError(msg, vars, 0, null, exception)

Here is the Camunda 7 External Task Worker to migrate:
[... paste code ...]
```

### Step 5: Migrate test code

Test code migration requires updating the test framework, assertions, and the way processes are started and validated. AI agents are especially effective here because test patterns vary widely.

**Prompt: Test code migration**

```
Refactor the following Camunda 7 JUnit test case to Camunda 8 using the official migration
patterns from https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md

The refactored test must:

Test class setup:
- Use @SpringBootTest and @CamundaSpringProcessTest annotations
- Inject @Autowired CamundaClient client
- Inject @Autowired CamundaProcessTestContext processTestContext
- Remove ProcessEngine, RuntimeService, TaskService injections
- Remove @Deployment, ProcessEngineRule, ProcessEngineTestRule

Starting process instances:
- runtimeService().startProcessInstanceByKey("process-id", vars)
  → client.newCreateInstanceCommand().bpmnProcessId("process-id").latestVersion()
    .variables(vars).send().join()
- Return type: ProcessInstance → ProcessInstanceEvent
- Variables.createVariables().putValue("x", 7) → Map.of("x", 7) or new HashMap<>()

Process instance assertions:
- assertThat(pi).isNotEnded() → assertThat(pi).isActive()
- assertThat(pi).isEnded() → assertThat(pi).isCompleted()
- assertThat(pi).isWaitingAt("TaskId") → assertThat(pi).hasActiveElements("TaskId")
- assertThat(pi).isWaitingAt(findId("Name")) → assertThat(pi).hasActiveElements(byName("Name"))
- assertThat(pi).hasPassed("ElementId") → assertThat(pi).hasCompletedElements("ElementId")

Variable assertions:
- assertThat(pi).variables().containsEntry("key", value) → assertThat(pi).hasVariable("key", value)

User task assertions and completion:
- assertThat(task()).hasName("x").isAssignedTo("u")
  → assertThat(UserTaskSelectors.byTaskName("x")).isCreated().hasName("x").hasAssignee("u")
- complete(task()) → processTestContext.completeUserTask("TaskName")

Timer handling:
- Do NOT manually query and execute timer jobs
- managementService().createJobQuery()... + managementService().executeJob(jobId)
  → processTestContext.increaseTime(Duration.ofMinutes(6))

Message correlation in tests:
- runtimeService().correlateMessage("MsgName", correlationKeys)
  → client.newPublishMessageCommand().messageName("MsgName")
    .correlationKey("key").send().join()

Job workers in tests (optional):
- Disable workers: @SpringBootTest(properties = {"camunda.client.worker.defaults.enabled=false"})
- Complete manually: processTestContext.completeJob("jobType")
- Mock a worker: processTestContext.mockJobWorker("jobType").thenComplete(variables)

Static imports:
- Remove: import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.*
- Add: import static io.camunda.process.test.api.CamundaAssert.assertThat
- Add: import static io.camunda.process.test.api.assertions.ElementSelectors.byName
- Add: import io.camunda.process.test.api.assertions.UserTaskSelectors

Here is the Camunda 7 test case:
[... paste full test case code ...]
```

### Step 6: Migrate dependencies and configuration

**Prompt: Dependencies and configuration migration**

```
Migrate the Maven dependencies and Spring Boot configuration from Camunda 7 to Camunda 8.

pom.xml changes:
- Remove all Camunda 7 dependencies (camunda-bpm-spring-boot-starter, camunda-engine,
  camunda-bpm-assert, camunda-spin-*, etc.)
- Add the Camunda 8 Spring SDK:
  <dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-spring-boot-starter</artifactId>
    <version>{camunda8Version}</version>
  </dependency>
- For testing:
  <dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-process-test-spring</artifactId>
    <version>{camunda8Version}</version>
    <scope>test</scope>
  </dependency>

Application class:
- @EnableProcessApplication → @Deployment(resources = "classpath*:/bpmn/**/*.bpmn")
- Remove META-INF/processes.xml

application.yml / application.properties:
- Remove all camunda.bpm.* properties
- Add Camunda 8 connection configuration (see Spring SDK docs)

Here is my current pom.xml:
[... paste pom.xml ...]

Here is my current application.yml:
[... paste config ...]
```

### Step 7: Validate the migration

After migration, verify all Camunda 7 references have been removed and the code compiles and passes tests.

**Prompt: Post-migration validation**

```
Validate the Camunda 7 to 8 migration:

1. Compile: mvn compile — fix any errors
2. Find remaining Camunda 7 references: search for org.camunda.bpm.* imports
3. Find TODO comments left by OpenRewrite or manual migration
4. Check for common issues:
   - String process instance IDs that should now be Long keys
   - VariableMap usage that should be Map<String, Object>
   - History service or management service usage (no direct C8 equivalent)
   - Batch operations (C8 operates on single instances)
5. Run tests: mvn test — fix any failures
6. Review @JobWorker methods: verify type matches BPMN, check return types
```

### Full agentic migration prompt

For AI agents that can browse files and execute commands, you can use a single comprehensive prompt to migrate an entire project:

:::tip
The full agentic prompt works best with AI coding agents that have terminal access and can read/write files directly (for example, Claude Code, Copilot Agent Mode, Cursor). For chat-based tools, use the individual prompts from Steps 2–7 above, and provide the relevant code in each prompt.
:::

```
You are migrating a Camunda 7 Spring Boot application to Camunda 8. Use the official
migration patterns from https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md

STEP 1 — ASSESS:
Scan the codebase and classify every Java file that imports from org.camunda.bpm.* into:
client code, JavaDelegate, ExecutionListener, External Task Worker, test code, or configuration.
Create a migration plan as a numbered task list.

STEP 2 — DEPENDENCIES:
Update pom.xml: remove all org.camunda.bpm dependencies, add
io.camunda:camunda-spring-boot-starter and io.camunda:camunda-process-test-spring (test).

STEP 3 — CONFIGURATION:
Replace @EnableProcessApplication with @Deployment(resources = "classpath*:/bpmn/**/*.bpmn").
Remove camunda.bpm.* properties, add camunda.client.* config. Delete META-INF/processes.xml.

STEP 4 — MIGRATE CLIENT CODE:
For each file using ProcessEngine/RuntimeService/TaskService/RepositoryService:
- Replace autowired engine services with @Autowired CamundaClient camundaClient
- startProcessInstanceByKey(key, vars)
  → camundaClient.newCreateInstanceCommand().bpmnProcessId(key).latestVersion()
    .variables(vars).send().join()
- deleteProcessInstance(id, reason)
  → camundaClient.newCancelInstanceCommand(key).send().join()
- correlateMessage(name, businessKey, vars)
  → camundaClient.newCorrelateMessageCommand().messageName(name)
    .correlationKey(key).variables(vars).send().join()
- signalEventReceived(name, vars)
  → camundaClient.newBroadcastSignalCommand().signalName(name).variables(vars).send().join()
- taskService.complete(taskId, vars)
  → camundaClient.newUserTaskCompleteCommand(taskKey).variables(vars).send().join()
- Type changes: ProcessInstance→ProcessInstanceEvent, String id→Long key,
  VariableMap→Map<String,Object>

STEP 5 — MIGRATE JAVADELEGATES:
For each class implementing JavaDelegate:
- Remove implements JavaDelegate, keep @Component
- Replace execute(DelegateExecution) with @JobWorker(type="beanName") method
- execution.getVariable("x") → job.getVariablesAsMap().get("x")
- execution.setVariable("x", v) → return Map.of("x", v) from method
- BpmnError → CamundaError.bpmnError(code, msg, vars)
- ProcessEngineException → CamundaError.jobError(msg, vars, retries-1, backoff)
- Remove all TypedValue API usage, use plain Java types

STEP 6 — MIGRATE EXTERNAL TASK WORKERS:
For each class implementing ExternalTaskHandler:
- @Configuration→@Component, remove implements ExternalTaskHandler
- Replace execute(ExternalTask, ExternalTaskService) with @JobWorker method
- externalTask.getVariable → job.getVariablesAsMap().get
- externalTaskService.complete → return vars from method
- handleBpmnError → CamundaError.bpmnError
- handleFailure → CamundaError.jobError

STEP 7 — MIGRATE TESTS:
For each test class:
- Add @CamundaSpringProcessTest, inject CamundaClient and CamundaProcessTestContext
- Replace runtimeService().startProcessInstanceByKey with
  client.newCreateInstanceCommand
- isWaitingAt→hasActiveElements, hasPassed→hasCompletedElements, isEnded→isCompleted
- complete(task()) → processTestContext.completeUserTask("TaskName")
- Timer: managementService job query → processTestContext.increaseTime(Duration)
- Variables: .variables().containsEntry(k,v) → .hasVariable(k, v)

STEP 8 — VALIDATE:
- Compile: mvn compile
- Search for remaining org.camunda.bpm imports
- Run tests: mvn test
- List any remaining TODO items

After each step, report what was changed and any issues encountered.
```

### Key API mapping reference

These tables summarize the most important mappings between Camunda 7 and Camunda 8. They are useful as quick references when writing migration prompts or reviewing AI-generated code.

#### Type mappings

| Camunda 7                                      | Camunda 8                                         |
| ---------------------------------------------- | ------------------------------------------------- |
| `ProcessEngine`                                | `CamundaClient`                                   |
| `RuntimeService`                               | `CamundaClient` (methods directly on client)      |
| `TaskService`                                  | `CamundaClient` (user task methods)               |
| `RepositoryService`                            | `CamundaClient` (deployment/definition methods)   |
| `ProcessInstance`                              | `ProcessInstanceEvent`                            |
| `Task`                                         | `UserTask`                                        |
| `Deployment`                                   | `DeploymentEvent`                                 |
| `Batch`                                        | No direct equivalent (single instance operations) |
| `VariableMap`                                  | `Map<String, Object>`                             |
| `TypedValue` (IntegerValue, StringValue, etc.) | Plain Java types                                  |
| `DelegateExecution`                            | `ActivatedJob`                                    |
| `ExternalTask` + `ExternalTaskService`         | `JobClient` + `ActivatedJob`                      |
| `BpmnError`                                    | `CamundaError.bpmnError(...)`                     |
| `ProcessEngineException`                       | `CamundaError.jobError(...)`                      |

#### Parameter name changes

:::important
The terms `processDefinitionKey` and `processDefinitionId` have **swapped meanings** between Camunda 7 and Camunda 8. Review these carefully during migration.
:::

| Description                      | Camunda 7                  | Camunda 8                               |
| -------------------------------- | -------------------------- | --------------------------------------- |
| BPMN model identifier (from XML) | `processDefinitionKey`     | `bpmnProcessId` / `processDefinitionId` |
| Unique key from deployment       | `processDefinitionId`      | `processDefinitionKey`                  |
| Process instance identifier      | `String processInstanceId` | `Long processInstanceKey`               |

#### Test assertion mappings

| Camunda 7 (BpmnAwareTests)                      | Camunda 8 (CamundaAssert)                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| `assertThat(pi).isNotEnded()`                   | `assertThat(pi).isActive()`                                                             |
| `assertThat(pi).isEnded()`                      | `assertThat(pi).isCompleted()`                                                          |
| `assertThat(pi).isWaitingAt("id")`              | `assertThat(pi).hasActiveElements("id")`                                                |
| `assertThat(pi).isWaitingAt(findId("name"))`    | `assertThat(pi).hasActiveElements(byName("name"))`                                      |
| `assertThat(pi).hasPassed("id")`                | `assertThat(pi).hasCompletedElements("id")`                                             |
| `assertThat(pi).variables().containsEntry(k,v)` | `assertThat(pi).hasVariable(k, v)`                                                      |
| `assertThat(task()).hasName("x")`               | `assertThat(UserTaskSelectors.byTaskName("x")).hasName("x")`                            |
| `assertThat(task()).isAssignedTo("u")`          | `assertThat(UserTaskSelectors.byTaskName("x")).hasAssignee("u")`                        |
| `complete(task())`                              | `processTestContext.completeUserTask("name")`                                           |
| `managementService().executeJob(id)`            | `processTestContext.increaseTime(Duration)` or `processTestContext.completeJob("type")` |

#### Import replacements

| Remove                                                                    | Add                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `org.camunda.bpm.engine.*`                                                | `io.camunda.client.*`                                            |
| `org.camunda.bpm.engine.delegate.*`                                       | `io.camunda.client.api.worker.JobHandler`                        |
| `org.camunda.bpm.engine.variable.*`                                       | (plain Java collections)                                         |
| `org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.*`            | `io.camunda.process.test.api.CamundaAssert.*`                    |
| —                                                                         | `io.camunda.process.test.api.assertions.ElementSelectors.byName` |
| —                                                                         | `io.camunda.process.test.api.assertions.UserTaskSelectors`       |
| —                                                                         | `io.camunda.process.test.api.CamundaProcessTestContext`          |
| —                                                                         | `io.camunda.process.test.api.CamundaSpringProcessTest`           |
| `org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication` | `io.camunda.client.annotation.Deployment`                        |

## Example: Adjust a Spring Boot application

See the [end-to-end migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) on GitHub.
