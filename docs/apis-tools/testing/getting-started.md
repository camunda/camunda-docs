---
id: getting-started
title: Getting started
description: "Integrate the Camunda Process Test library in your project."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Camunda Process Test](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-java) (CPT) is a Java library to test your BPMN processes and your process application.

:::info Public API
Camunda Process Test is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for alpha features). Breaking changes will not be introduced in minor or patch releases.
:::

:::info
CPT is the successor of [Zeebe Process Test](/apis-tools/java-client/zeebe-process-test.md). Our previous testing library is deprecated and will be removed with version 8.10.
:::

CPT provides different runtimes to execute your process tests:

- [Testcontainers runtime](configuration.md#testcontainers-runtime) (default) - A managed runtime based on [Testcontainers](https://java.testcontainers.org/) and Docker.
- [Remote runtime](configuration.md#remote-runtime) - Your own runtime, such as, [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)

## Prerequisites

- Java 8+ / 17+ (for Camunda Spring Boot SDK)
- [JUnit 5](https://junit.org/junit5/)

For the default [Testcontainers runtime](configuration.md#testcontainers-runtime):

- A Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop on Mac and Windows.

## Install

We have two variations of CPT: for the [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) and the [Camunda Java client](/apis-tools/java-client/index.md). Choose the one depending on which library you use in your process application.

Add the following dependency to your Maven project:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-spring</artifactId>
  <scope>test</scope>
</dependency>
```

</TabItem>

<TabItem value='java-client'>

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-java</artifactId>
  <scope>test</scope>
</dependency>
```

</TabItem>

</Tabs>

## Write a test

Create a new Java class with the following structure:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```java
package com.example;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.ProcessInstanceEvent;
import io.camunda.process.test.api.CamundaAssert;
import io.camunda.process.test.api.CamundaProcessTestContext;
import io.camunda.process.test.api.CamundaSpringProcessTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@CamundaSpringProcessTest
public class MyProcessTest {

    @Autowired private CamundaClient client;
    @Autowired private CamundaProcessTestContext processTestContext;

    @Test
    void shouldCompleteProcessInstance() {
        // given: the processes are deployed

        // when
        final ProcessInstanceEvent processInstance =
            client
                .newCreateInstanceCommand()
                .bpmnProcessId("my-process")
                .latestVersion()
                .send()
                .join();

        // then
        CamundaAssert.assertThat(processInstance).isCompleted();
    }
}
```

- `@SpringBootTest` is the standard Spring annotation for tests.
- `@CamundaSpringProcessTest` registers the Camunda test execution listener that starts and stops the test runtime.
- `@Test` is the standard JUnit 5 annotation for a test case.
- (_optional_) Inject a preconfigured `CamundaClient` to interact with the Camunda runtime.
- (_optional_) Inject a `CamundaProcessTestContext` to interact with the test runtime.
- (_optional_) Use `CamundaAssert` to verify the process instance state.

</TabItem>

<TabItem value='java-client'>

```java
package com.example;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.ProcessInstanceEvent;
import io.camunda.process.test.api.CamundaAssert;
import io.camunda.process.test.api.CamundaProcessTest;
import io.camunda.process.test.api.CamundaProcessTestContext;
import org.junit.jupiter.api.Test;

@CamundaProcessTest
public class MyProcessTest {

    // to be injected
    private CamundaClient client;
    private CamundaProcessTestContext processTestContext;

    @Test
    void shouldCompleteProcessInstance() {
        // given
        client
            .newDeployResourceCommand()
            .addResourceFromClasspath("my-process.bpmn")
            .send()
            .join();

        // when
        final ProcessInstanceEvent processInstance =
            client
                .newCreateInstanceCommand()
                .bpmnProcessId("my-process")
                .latestVersion()
                .send()
                .join();

        // then
        CamundaAssert.assertThat(processInstance).isCompleted();
    }
}
```

- `@CamundaProcessTest` registers the Camunda JUnit extension that starts and stops the test runtime.
- `@Test` is the standard JUnit 5 annotation for a test case.
- (_optional_) Get a preconfigured `CamundaClient` injected to interact with the Camunda runtime.
- (_optional_) Get a `CamundaProcessTestContext` injected to interact with the test runtime.
- (_optional_) Use `CamundaAssert` to verify the process instance state.

</TabItem>

</Tabs>

Next, read more about:

- `CamundaAssert` and [assertions](assertions.md)
- `CamundaProcessTestContext` and [utilities](utilities.md)
- How to [configure the runtime](configuration.md)

## Examples

Take a look at the example project on [GitHub](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-example). This demonstrates the usage of the library for a demo Spring Boot process application.
