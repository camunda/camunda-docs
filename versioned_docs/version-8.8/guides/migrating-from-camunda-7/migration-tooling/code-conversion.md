---
id: code-conversion
title: Code Conversion
sidebar_label: Code conversion
description: "Understand patterns to convert your code written for Camunda 7 to run on Camunda 8."
---

As Camunda 8 is a complete rewrite of Camunda 7, you must convert your models (BPMN and DMN) and some of your code to work with the Orchestration Cluster REST API.

## Overview

You must especially rewrite code that does the following:

- Uses the Client API: Starting process instances, correlating messages, managing tasks, etc.
- Implements service tasks, including:
  - [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#the-external-task-pattern) where workers subscribe to the engine
  - [Java code attached to service tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) called directly by the engine (in-VM)

### Tools and resources

This guide covers three main tools to help with code conversion:

1. [API Mapping Guide](#api-mapping-guide): Understand how Camunda 7 REST API endpoints map to Camunda 8
2. [OpenRewrite Recipes](#refactoring-recipes-using-openrewrite): Automatically refactor Java code with configurable recipes
3. [Code Conversion Patterns](#code-conversion-patterns): Detailed technical reference for manual migration

Additionally, you will find information about:

- [Diagram Converter](#diagram-converter) for BPMN and DMN model conversion
- [Leveraging AI](#leveraging-ai-for-refactoring) to assist with refactoring tasks
- [Complete migration example](#example-adjusting-a-spring-boot-application) showing all tools in action

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
[Camunda 7 to 8 migration tooling repository](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion/patterns).

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
- Java delegates (glue code)
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
                <version>6.0.5</version>
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
                        <artifactId>camunda-7-to-8-rewrite-recipes</artifactId>
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

Choose the recipes that match your codebase:

- Include `AllClientRecipes` if you have code that calls the Camunda API (starting processes, correlating messages, etc.)
- Include `AllDelegateRecipes` if you have Java delegates
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

The [Migration Analyzer & Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/model-converter) handles most common changes automatically. Depending on how you refactor your code and what elements of Camunda 7 you have used, you can extend or customize the diagram converter to suit your needs.

Find the diagram conversion tooling and its documentation in the [Camunda 7 to 8 migration tooling – Migration Analyzer & Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/model-converter).

## Leveraging AI for refactoring

You can use AI tools such as ChatGPT, GitHub Copilot, or other AI assistants to help with refactoring tasks. In testing, simple prompts often produce correct results, although you may need several iterations to ensure the refactored code aligns with your target architecture.

In the [migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example?tab=readme-ov-file#migrating-test-cases), we used ChatGPT to rewrite test cases with the following sample prompt:

```
Please refactor the following Camunda 7 JUnit test case to Camunda 8 using the official migration pattern described in https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/code-conversion/patterns/ALL_IN_ONE.md. The refactored test must:

- Use `@SpringBootTest` and `@CamundaSpringProcessTest`
- Use `CamundaClient` to start the process
- Use `CamundaProcessTestContext.completeUserTask(...)` to complete user tasks
- Use `CamundaProcessTestContext.increaseTime(Duration)` to simulate timer events (no manual job execution)
- Use `CamundaAssert` with `byName(...)` selectors to check activity state
- Use `assertThat(processInstance).hasVariable(...)` to check process variables

Here is the Camunda 7 test case:
[... add full test case code...]
```

## Example: Adjusting a Spring Boot application

See the [end-to-end migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) on GitHub.
