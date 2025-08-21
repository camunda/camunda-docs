---
id: migrate-to-camunda-java-client
title: Migrate to the Camunda Java Client
description: "Migrate from Zeebe Java Client to the Camunda Java Client. This guide provides an overview of the migration process."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Migrate to the Camunda Java Client from the Zeebe Java Client.

## About this guide

This guide provides an overview of the process for migrating to the Camunda Java Client.

- The [Camunda Java Client](../java-client/java-client-getting-started.md) is the official Java library for connecting to Orchestration Cluster, automating processes, and implementing job workers.
- The Zeebe Java Client remains available until Camunda 8.10.

:::tip
Plan and start your migration early to ensure compatibility, access to latest features, and future support.
:::

## Before you begin

- Review project dependencies and identify where `io.camunda.zeebe:zeebe-client-java` is used.
- Catalog code referencing Zeebe classes, interfaces, and APIs (for example, ZeebeClient, Zeebe workers).

## Update Maven/Gradle dependencies

Replace the Zeebe Java Client dependency with the Camunda Java Client dependency in your `pom.xml` or `build.gradle` file.

Maven:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-client-java</artifactId>
  <version>${camunda.version}</version>
</dependency>
```

Gradle:

```groovy
implementation 'io.camunda:camunda-client-java:${camunda.version}'
```

:::info
The Camunda Java Client artifact still contains the deprecated Zeebe classes (for example, ZeebeClient) as deprecated types to ease migration, but all new features are available only for Camunda classes. Zeebe classes are planned for removal after 8.10.
:::

## Update imports

Update all imports statement in your Java files to use the new Camunda Java Client package structure.

Change from:

```java
import io.camunda.zeebe.client.*;
```

to:

```java
import io.camunda.client.*;
```

## Configuration and environment variable changes

- All old Java client property names are refactored to more general ones. For example, `zeebe.client.tenantId` to `camunda.client.tenantId`.
- Environment variables are also updated accordingly. For example, `ZEEBE_CLIENT_TENANT_ID` to `CAMUNDA_CLIENT_TENANT_ID`.
- Both `restAddress` and `grpcAddress` now **require explicit URI schemes** (for example, `http://` or `https://`).

## Update client initialization

Update the client initialization code to use the new `CamundaClient` class.

For example, change:

```java
ZeebeClient client = ZeebeClient.newClientBuilder()
    .gatewayAddress("localhost:26500")
    .usePlaintext()
    .build();
```

to:

```java
CamundaClient client = CamundaClient.newClientBuilder()
    .grpcAddress(URI.create("http://localhost:26500"))
    .restAddress(URI.create("http://localhost:8080"))
    .build();
```

:::info

- Refer to the [CamundaClientBuilder documentation](https://javadoc.io/doc/io.camunda/camunda-client-java/latest/io/camunda/client/CamundaClientBuilder.html) for more details on available configuration options.
- The construction for OAuth, Basic Auth, or custom providers remains conceptually the same, but you must ensure you use the classes from the new package. Refer to the [Camunda Java Client bootstrapping](../java-client/java-client-getting-started.md#bootstrapping) for more details.

:::

## Renamed API classes and commands

The following API classes have been changed in the Camunda Java Client:

| Old                             | New                               |
| :------------------------------ | :-------------------------------- |
| `ZeebeClientBuilder`            | `CamundaClientBuilder`            |
| `ZeebeClientClouldBuilderStep1` | `CamundaClientClouldBuilderStep1` |
| `ZeebeClientConfiguration`      | `CamundaClientConfiguration`      |
| `ZeebeFuture`                   | `CamundaFuture`                   |

The command `newUserCreateCommand()` is changed to `newCreateUserCommand()` in CamundaClient.

## Protocol and connection: REST vs gRPC selection

Zeebe Java Client used **gRPC by default**. The Camunda Java Client use **REST by default**. If you want to use gRPC, you need to explicitly set the `grpcAddress` in the client builder.
