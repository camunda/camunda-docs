---
id: code-conversion
title: Code Conversion
sidebar_label: Code Conversion
description: "Understand patterns to convert your code written for Camunda 7 to run on Camunda 8."
---

As Camunda 8 is a complete rewrite of Camunda 7, you must convert your models (BPMN and DMN), Camunda 7 forms (`.form`), and some of your code to work with the Orchestration Cluster REST API.

:::tip Agentic migration
The [Camunda migration agent skill](./index.md#agentic-migration) uses the Diagram Converter CLI as the default for BPMN, DMN, and Camunda 7 form conversion. After it inventories Java code, select either the AI-first, pattern-guided path or the optional recipe-assisted path. Review every conversion and rearchitect your solution where needed.
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
2. [Code Conversion Patterns](#code-conversion-patterns): Apply documented patterns in manual or AI-assisted migration
3. [AI-assisted migration](#leverage-ai-for-migration): Use the Camunda migration agent skill for a guided Java migration
4. [OpenRewrite Recipes](#refactoring-recipes-using-openrewrite): Optionally create a deterministic first diff for repeated, supported, primarily syntactic transformations

Additionally, you will find information about:

- [Diagram Converter](#diagram-converter) for BPMN, DMN, and Camunda 7 form conversion
- [Complete migration example](#example-adjust-a-spring-boot-application) showing all tools in action

### Choose your migration approach

Choose a Java migration path after you inventory your codebase. Before you use a path across a broad migration, run both paths on representative Java code and compare the results. Review is mandatory for both paths.

| Approach                                                | Use when                                                                                               | What to expect                                                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI-first, pattern-guided** (preferred starting point) | You have a capable coding model and can review its output.                                             | The agent reads source code and migration patterns directly. Model quality materially affects the output, so review source-to-output mappings and behavior. |
| **Recipe-assisted** (optional)                          | You have repeated, supported, primarily syntactic transformations, or need a deterministic first diff. | Run OpenRewrite, then use AI or manual work to finish the migration. Expect scaffolding, generated names, TODOs, and cleanup.                               |

Neither path guarantees lower token use, cost, or migration time.

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

- Starting an AI-first migration: Provide the relevant patterns and source context to the coding model
- Reviewing a recipe-assisted migration: Check that the generated diff implements the relevant patterns
- Manual migration is needed: The recipes cannot handle your specific code structure
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

Use OpenRewrite as an optional recipe-assisted path for repeated, supported, primarily syntactic Java transformations. It creates a deterministic first diff, but it does not complete a migration.

For semantic, cross-cutting, or mixed delegate/client transformations, recipes can be neutral or add rework by constraining downstream AI or manual work.

The Camunda 7 to 8 OpenRewrite recipes help you automatically refactor:

- Client code using the Camunda 7 Java API
- Java delegates and execution listeners (glue code)
- External task workers
- Unit tests (work in progress)

:::note
The recipes are still under development. Expect recipes to work out-of-the-box only in simple scenarios. For complex codebases, you may need to extend or customize them to suit your needs.
:::

### How the recipes work

When you select the recipe-assisted path, the code transformation is performed in three phases:

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
                        <version>0.3.7</version>
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

Carefully examine all changes using your version control system's diff tool. Recipes can add scaffolding, generated names, and TODO comments that need AI or manual cleanup. The recipes add comments where manual review is needed:

- Parameters that were removed or have different semantics in Camunda 8
- Methods with no direct one-to-one replacement (for example, executionId-based operations)
- Dummy literal strings that need to be replaced with actual values

:::warning Important
A successful recipe run, including a successful compile, does not demonstrate a complete migration. Review source-to-output mappings and behavior. Some concepts from Camunda 7 (like executionId) don't exist in Camunda 8, and recipes cannot automatically determine the correct replacement in all cases.
:::

### Recipe completeness and limitations

The recipes cover:

- Class structure and annotations
- Dependencies and imports
- Basic types and commonly used methods

However, they are incomplete in two aspects:

- Some Camunda 7 methods could be transformed but are not yet included
- Some Camunda 7 methods have no equivalent in Camunda 8

Recipes do not resolve migration design decisions such as business behavior, eventual consistency, transaction boundaries, or architectural separation.

If Camunda 7 code remains after applying recipes:

1. Refer to the [code conversion patterns](#code-conversion-patterns) for manual migration guidance
2. Extend the recipes for your specific use case (see the [developer guide](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/recipes/developer_guide.md))
3. Remove or refactor the code if the functionality is no longer available

### Additional resources

- [Recipe source code and developer guide](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion/recipes)
- [OpenRewrite documentation](https://docs.openrewrite.org/)
- [Complete migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)

## Diagram Converter

Your BPMN and DMN models need to be adjusted to work with Camunda 8.

Use the [Diagram Converter](./diagram-converter.md) as the default for BPMN, DMN, and static Camunda 7 `.form` conversion. For generated task forms, use the [Camunda migration agent skill](./index.md#agentic-migration), which creates or adapts standard Camunda 8 forms after review. AI-generated model conversion depends materially on model capability and can silently change model semantics, so do not use AI-only model conversion as the default. Review converted models and findings before deployment.

:::tip
The [Camunda migration agent skill](./index.md#agentic-migration) runs the Diagram Converter CLI as the default and can use AI to help investigate findings.
:::

For full documentation, see the [Diagram Converter guide](./diagram-converter.md).

## Leverage AI for migration

Use the [Camunda migration agent skill](./index.md#agentic-migration) to migrate Java code. The skill inventories your source code, then lets you select an AI-first, pattern-guided path or an optional recipe-assisted path.

[Set up and run the skill](./index.md#set-up-and-run) from your Camunda 7 project directory. Use a capable coding model and review every conversion. Before migrating a broad codebase, compare both Java paths with representative code.

### Key API mapping reference

These tables summarize common mappings between Camunda 7 and Camunda 8. Use them to understand and review migration output.

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
| N/A                                                                       | `io.camunda.process.test.api.assertions.ElementSelectors.byName` |
| N/A                                                                       | `io.camunda.process.test.api.assertions.UserTaskSelectors`       |
| N/A                                                                       | `io.camunda.process.test.api.CamundaProcessTestContext`          |
| N/A                                                                       | `io.camunda.process.test.api.CamundaSpringProcessTest`           |
| `org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication` | `io.camunda.client.annotation.Deployment`                        |

## Example: Adjust a Spring Boot application

See the [end-to-end migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) on GitHub.
