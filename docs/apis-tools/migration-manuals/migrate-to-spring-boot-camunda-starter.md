---
id: migrate-to-spring-boot-camunda-starter
title: Migrate to Spring Boot Camunda Starter
description: "Migrate to the Spring Boot Camunda Starter, a drop-in replacement for the Zeebe Spring SDK."
sidebar_label: Spring Boot Camunda Starter
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate to the Spring Boot Camunda Starter from the Zeebe Spring SDK.

## About this guide

This guide provides an overview of the process for migrating to the Spring Boot Camunda Starter.

- The [Spring Boot Camunda Starter](../spring-zeebe-sdk/getting-started.md) is the official Spring library for connecting to Orchestration Cluster, automating processes, and implementing job workers.

:::tip
Plan and start your migration early to ensure compatibility, access to latest features, and future support.
:::

## Maven/Gradle dependencies

There is no need to change the Maven or Gradle dependencies, as the Spring Boot Camunda Starter is a drop-in replacement for the Zeebe Spring SDK.

Maven:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>spring-boot-starter-camunda-sdk</artifactId>
    <version>8.8.x</version>
</dependency>
```

Gradle:

```groovy
implementation 'io.camunda:spring-boot-starter-camunda-sdk:${8.8.x}'
```

## Deprecated classes and methods

Please refer to the [Camunda Java Client migration guide](migrate-to-camunda-java-client.md) for details on deprecated classes and methods.
