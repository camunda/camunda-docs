---
id: code-conversion
title: Code Conversion
sidebar_label: Code conversion
description: "Understand patterns to convert your code written for Camunda 7 to run on Camunda 8."
---

As Camunda 8 is a complete rewrite of Camunda 7, you must convert your models (BPMN and DMN) and some of your code to work with the Orchestration cluster API.

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

## API mapping guide

The Camunda 7 and Orchestration cluster APIs share many similarities, but several aspects have been modernized in Camunda 8. Some of these changes are structural:

- API endpoints for retrieving or searching resources are streamlined. Instead of separate endpoints (for example, `GET /resource` and `GET /resource/count`), Camunda 8 uses a single `POST /search` endpoint.
- In Camunda 8, the `tenantId` is passed in the request body rather than as a path parameter, reducing the need for multiple endpoint variants as seen in Camunda 7.
- Camunda 8 does not have separate API endpoints for historic data.

To help you understand the differences between the two APIs, the [Camunda 7 to 8 API Mapping Guide](https://camunda-community-hub.github.io/camunda-7-to-8-code-conversion/) maps the complete Camunda 7 REST API to its Camunda 8 counterparts and highlights key differences. For example, why a specific endpoint or parameter is no longer available, or if it is planned for future implementation.

Find the API mapping guide [here](https://camunda-community-hub.github.io/camunda-7-to-8-code-conversion/).

## Code conversion patterns

Because of the flexibility of Camunda 7, users leveraged different ways to write code, resulting in many possible conversion patterns.

- Our approach to collect these is to use a collaborative GitHub repository, where our consultants, partners, and users can add their own patterns to the catalog.
- You might still adapt the patterns to your situation, for example, if you use your own data handling or glue code abstractions.

Find the pattern catalog [here](https://github.com/camunda-community-hub/camunda-7-to-8-code-conversion).

## Refactoring recipes (using OpenRewrite)

[OpenRewrite](https://docs.openrewrite.org/) is an open-source framework that can automate refactorings by so-called recipes. It is provided with an Apache License, making it easy to adopt in any context. Technically, to [run recipes](https://docs.openrewrite.org/running-recipes), you need to add a Maven plugin to your build.

Those recipes might work out-of-the-box for your environment, but most often they need to be adjusted to your code patterns. In this case, use the existing patterns as a basis to make your own adjustments or extensions.

Find the existing recipes and documentation on how to use them [here](https://github.com/camunda-community-hub/camunda-7-to-8-code-conversion/tree/main/recipes).

## Diagram converter

Your BPMN and DMN models need to be adjusted.

The [Migration Analyzer & Diagram Converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration-analyzer) takes care of most changes. Depending on how you refactor your code and what elements of Camunda 7 you have used, you can extend or customize the diagram converter to suit your needs.

<!--
If your models also contain JUEL expressions, which are not supported in Camunda 8, they also need to be converted. Simple expressions are [directly converted by this code in the Diagram Converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration-analyzer/blob/d6fda97d00f27b23fc87fd741134225a527f3de1/core/src/main/java/org/camunda/community/migration/converter/expression/ExpressionTransformer.java#L4). This can be extended to suit your needs. You can use the [FEEL Copilot](/components/early-access/alpha/feel-copilot/feel-copilot.md) to rewrite more complex expressions for you.

TODO document the expression transformer instead of referencing code. Or probably do a complete rewamp of this section to extract details to the readme - it is a bit arbitrary what is mentioned here - and probably also not fully aligned with latest changes.
Might also make sense to describe that above patterns also inform diagram conversion
 -->

Find the diagram conversion tooling and its documentation [here](https://github.com/camunda-community-hub/camunda-7-to-8-migration-analyzer).

## Leveraging AI for refactoring

You can use any AI you have available to assist you with refactoring tasks. In our experiments with ChatGPT and GitHub Copilot for example, we had success by relatively simple prompts, but you needed to do a couple of rounds to make sure the AI refactors correctly and according to your target architecture whishes.

In the [migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example?tab=readme-ov-file#migrating-test-cases) we could let ChatGPT rewrite test cases for us with this sample prompt:

```
Please refactor the following Camunda 7 JUnit test case to Camunda 8 using the official migration pattern described in https://github.com/camunda-community-hub/camunda-7-to-8-code-conversion/blob/main/patterns/ALL_IN_ONE.md. The refactored test must:

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

See [end-to-end migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) on GitHub.
