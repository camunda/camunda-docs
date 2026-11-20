---
id: migrate-to-camunda-spring-boot-starter
title: Migrate to Camunda Spring Boot Starter
description: "Learn how to migrate to the Camunda Spring Boot Starter, the replacement for the Zeebe Spring SDK."
sidebar_label: Camunda Spring Boot Starter
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::note Have you already migrated?
You do not need to perform this migration again if you already did this when upgrading to version 8.8. This guide remains in the 8.9 documentation for customers who did not perform this migration during their 8.8 upgrade. See [API and SDK changes to migrate before Camunda 8.10](../migration-manuals/migrate-to-89.md#api-and-sdk-changes-to-migrate-before-camunda-810).
:::

## About

This guide provides an overview of the process for migrating to the Camunda Spring Boot Starter.

- The [Camunda Spring Boot Starter](../camunda-spring-boot-starter/getting-started.md) is the official Spring library for connecting to Orchestration Cluster, automating processes, and implementing job workers.

:::tip
Plan and start your migration early to ensure compatibility, access to latest features, and future support.
:::

## Maven/Gradle dependencies

Replace the Zeebe Spring SDK dependency with the Camunda Spring Boot Starter dependency in your `pom.xml` or `build.gradle` file.

Maven:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-spring-boot-starter</artifactId>
    <version>8.8.x</version>
</dependency>
```

Gradle:

```groovy
implementation 'io.camunda:camunda-spring-boot-starter:${8.8.x}'
```

## Configuration properties

The Camunda Spring Boot Starter reads `camunda.client.*` properties. Replace `zeebe.client.*` and `camunda.client.zeebe.*` properties with their `camunda.client.*` equivalents.

The starter still reads the legacy properties if you don't set the replacement, but they're deprecated. See [legacy property names](/apis-tools/camunda-spring-boot-starter/configuration.md#legacy-property-names) for the most common renames, and [deprecated properties](/apis-tools/camunda-spring-boot-starter/properties-reference.md#deprecated-properties) for the complete list.

## Deprecated classes and methods

Please refer to the [Camunda Java Client migration guide](migrate-to-camunda-java-client.md) for details on deprecated classes and methods.
