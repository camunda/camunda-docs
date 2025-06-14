---
id: getting-started
title: Getting started
description: "Integrate the Camunda Process Test library in your project."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

[Camunda Process Test](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-java) (CPT) is a Java library to test your BPMN processes and your process application.

CPT is based on [JUnit 5](https://junit.org/junit5/) and [Testcontainers](https://java.testcontainers.org/). It provides a managed isolated runtime to execute your process tests on your local machine. The runtime uses the Camunda Docker images and includes the following components:

- Camunda
- Connectors

:::danger Disclaimer
CPT is in an [alpha version](/components/early-access/alpha/alpha-features.md#alpha).

For a mature testing library, take a look at [Zeebe Process Test](/apis-tools/java-client/zeebe-process-test.md).
:::

## Prerequisites

- Java 8+ / 17+ (for Camunda Spring Boot SDK)
- JUnit 5
- A Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop on Mac and Windows. If you have issues with your Docker runtime, have a look at the [Testcontainers documentation](https://java.testcontainers.org/supported_docker_environment/).

## Install

We have two variations of CPT: for the [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) and the [Camunda Java client](/apis-tools/java-client/index.md). Choose the one depending on which library you use in your process application.

Add the following dependency to your Maven project:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

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

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

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

Read more about `CamundaAssert` and the available assertions [here](assertions.md).

## Configure the runtime

By default, the test runtime uses the Camunda Docker images in the same version as the test library. You can change the version or customize the runtime to your needs.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

Set the following properties in your `application.yml` (or `application.properties`) to override the defaults:

```yaml
io:
  camunda:
    process:
      test:
        # Change the version of the Camunda Docker image
        camunda-docker-image-version: 8.8.0
        # Change the Camunda Docker image
        camunda-docker-image-name: camunda/camunda
        # Set additional Camunda environment variables
        camunda-env-vars:
          env_1: value_1
        # Expose additional Camunda ports
        camunda-exposed-ports:
          - 4567
        # Enable Connectors
        connectors-enabled: true
        # Change the Connectors Docker image
        connectors-docker-image-name: camunda/connectors
        # Change version of the Connectors Docker image
        connectors-docker-image-version: 8.8.0
        # Set additional Connectors environment variables
        connectors-env-vars:
          env_1: value_1
        # Set Connectors secrets
        connectors-secrets:
          secret_1: value_1
```

</TabItem>

<TabItem value='java-client'>

You can change the version by setting the following properties in a `/camunda-container-runtime.properties` file:

```properties
camunda.dockerImageVersion=8.8.0
```

For more configuration options, you can register the JUnit extension manually and use the fluent builder to override the defaults:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            // Change the version of the Camunda Docker image
            .withCamundaDockerImageVersion("8.8.0")
            // Change the Camunda Docker image
            .withCamundaDockerImageName("camunda/camunda")
            // Set additional Camunda environment variables
            .withCamundaEnv("env_1", "value_1")
            // Expose additional Camunda ports
            .withCamundaExposedPort(4567)
            // Enable Connectors
            .withConnectorsEnabled(true)
            // Change the Connectors Docker image
            .withConnectorsDockerImageName("camunda/connectors")
            // Change version of the Connectors Docker image
            .withConnectorsDockerImageVersion("8.8.0")
            // Set additional Connectors environment variables
            .withConnectorsEnv("env_1", "value_1")
            // Set Connectors secrets
            .withConnectorsSecret("secret_1", "value_1");
}
```

</TabItem>

</Tabs>

## Logging

The test runtime uses [SLF4J](https://www.slf4j.org/) as the logging framework. If needed, you can enable the logging for the following packages:

- `io.camunda.process.test` - The test runtime (recommended level `info`)
- `tc.camunda` - The Camunda Docker container (recommended level `error`)
- `tc.connectors` - The connectors Docker container (recommended level `error`)
- `org.testcontainers` - The Testcontainers framework (recommended level `warn`)

## Examples

Take a look at the example project on [GitHub](https://github.com/camunda/camunda/tree/main/testing/camunda-process-test-example). This demonstrates the usage of the library for a demo Spring Boot process application.
