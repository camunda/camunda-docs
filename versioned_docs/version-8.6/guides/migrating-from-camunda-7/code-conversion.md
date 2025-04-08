---
id: code-conversion
title: Code Conversion
sidebar_label: Code conversion
description: "Understand patterns to convert your code written for Camunda 7 to run on Camunda 8."
---

As Camunda 8 is a complete rewrite of Camunda 7, you must convert your models (BPMN and DMN) and some of your code to work with the Camunda 8 API.

## Overview

You must especially rewrite code that does the following:

- Uses the Client API (to start process instances for example).
- Implements [service tasks](/components/modeler/bpmn/service-tasks/service-tasks.md), which can be:
  - [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/#the-external-task-pattern), where workers subscribe to the engine.
  - [Java code attached to a service task](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) and called by the engine directly (in-VM).

This guide helps you do this if your code is written in Java, and covers the following:

- [Typical code conversion patterns](#code-conversion-patterns).
- [OpenRewrite recipes](#openrewrite-recipes) as a possibility to automate refactoring.
- [Diagram Converter](#diagram-converter) to convert your BPMN and DMN models.
- [Leveraging AI to ease refactoring](#leveraging-ai-for-refactoring).

## Code conversion patterns

Because of the flexibility of Camunda 7, users leveraged different ways to write code, resulting in many possible conversion patterns.

- Our approach to collect these is to use a collaborative GitHub repository, where our consultants, partners, and users can add their own patterns to the catalog.
- You might still adapt the patterns to your situation, for example, if you use your own data handling or glue code abstractions.

You can find the pattern catalog [here](https://github.com/camunda-community-hub/camunda-7-to-8-code-conversion).

:::info
The pattern catalog was kicked off and will be filled in Q2 of 2025.
:::

## OpenRewrite recipes

:::info
First recipes will be delivered throughout Q2 of 2025, and Camunda plans a first release **with Camunda 8.8 (October 2025)**. Iterative improvements will follow after.
:::

[OpenRewrite](https://docs.openrewrite.org/) is an open-source framework that can automate refactorings by so-called recipes. It is provided with an Apache License, making it easy to adopt in any context. Technically, to [run recipes](https://docs.openrewrite.org/running-recipes), you need to add a Maven plugin to your build.

For example, to run a recipe to convert JavaDelegates to Spring-based Job Workers:

```xml
<plugin>
    <groupId>org.openrewrite.maven</groupId>
    <artifactId>rewrite-maven-plugin</artifactId>
    <version>6.1.4</version>
    <configuration>
      <activeRecipes>
        <recipe>org.camunda.migration.rewrite.recipes.ConvertJavaDelegateToZeebeWorker</recipe>
      </activeRecipes>
      <skipMavenParsing>true</skipMavenParsing>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.camunda.community</groupId>
            <artifactId>camunda-7-to-8-rewrite-recipes</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
</plugin>
```

Those recipes might work out-of-the-box for your environment, but most often they need to be adjusted to your code patterns. In this case, use the existing patterns as a basis to make your own adjustments or extensions.

You can find the existing recipes on [GitHub](https://github.com/camunda-community-hub/camunda-7-to-8-code-conversion).

## Diagram converter

Your BPMN and DMN models need to be adjusted.

The [Diagram Converter](../migration-tooling/) takes care of most changes. Depending on how you refactor your code and what elements of Camunda 7 you have used, you can extend or customize the diagram converter to suit your needs.

If your models also contain JUEL expressions, which are not supported in Camunda 8, they also need to be converted.

Simple expressions are [directly converted by this code in the Diagram Converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/backend-diagram-converter/core/src/main/java/org/camunda/community/migration/converter/expression/ExpressionTransformer.java). This can be extended to suit your needs.

You can use the [FEEL copilot](https://feel-copilot.camunda.com/) to rewrite more complex expressions for you.

## Leveraging AI for refactoring

You can use any AI you have available to assist you with refactoring tasks. In our experiments with ChatGPT and GitHub Copilot for example, we had success by simply telling it:

```
Please adjust this codebase, written for Camunda 7, to run with Camunda 8.
```

## Example: Adjusting a Spring Boot application

<!-- :::warning
This paragraph needs improvement - it is slightly outdated.
::: -->

For example, to migrate an existing Spring Boot application, take the following steps:

1. Adjust Maven dependencies:

   - Remove Camunda 7 Spring Boot Starter and all other Camunda dependencies.
   - Add the [Spring Zeebe SDK](../../apis-tools/spring-zeebe-sdk/getting-started.md).

2. Adjust configuration:

   - Set [Camunda 8 credentials](/apis-tools/spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection) (for example, in `src/main/resources/application.yaml`) and point it to an existing Zeebe cluster.
   - Remove existing Camunda 7 settings.

3. Add `@Deployment(resources = "classpath*:**/*.bpmn")` to automatically deploy all BPMN models.

4. Adjust your source code and process model as described below.

### Client API

The Zeebe API (for example, the workflow engine API - start process instances, subscribe to tasks, or complete them) has been completely redesigned and is not compatible with Camunda 7. While conceptually similar, the API uses different method names, data structures, and protocols.

If this affects large parts of your code base, you could write a small abstraction layer implementing the Camunda 7 API delegating to Camunda 8, probably marking unavailable methods as deprecated. We welcome community extensions that facilitate this but have not yet started our own efforts.

### Service tasks as external tasks

[External task workers](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) in Camunda 7 are conceptually comparable to [job workers](/components/concepts/job-workers.md) in Camunda 8. This means they are generally easier to migrate.

The "external task topic" from Camunda 7 is directly translated into a "task type name" in Camunda 8, therefore `camunda:topic` becomes `zeebe:taskDefinition type` in your BPMN model.

The [Camunda 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) picks up your `@ExternalTaskHandler` beans, wraps them into a JobWorker, and subscribes to the `camunda:topic` you defined as `zeebe:taskDefinition type`.

### Service tasks with attached Java code (Java delegates, expressions)

In Camunda 7, there are three ways to attach Java code to service tasks in the BPMN model using different attributes in the BPMN XML:

- Specify a class that implements a JavaDelegate or ActivityBehavior: `camunda:class`.
- Evaluate an expression that resolves to a delegation object: `camunda:delegateExpression`.
- Invoke a method or value expression: `camunda:expression`.

Camunda 8 cannot directly execute custom Java code. Instead, there must be a [job worker](/components/concepts/job-workers.md) executing code.

The [Camunda 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) implements such a job worker using the [Spring Zeebe SDK](../../apis-tools/spring-zeebe-sdk/getting-started.md). It subscribes to the task type `camunda-7-adapter`. [Task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers) are used to configure a delegation class or expression for this worker.

![Service task in Camunda 7 and Camunda 8](../img/migration-service-task.png)

You can use this worker directly, but more often it might serve as a starting point or simply be used for inspiration.

The [Camunda 7 to Camunda 8 Converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter) will adjust the service tasks in your BPMN model automatically for this adapter.

The topic `camunda-7-adapter` is set and the following attributes/elements are migrated and put into a task header:

- `camunda:class`
- `camunda:delegateExpression`
- `camunda:expression` and `camunda:resultVariable`
