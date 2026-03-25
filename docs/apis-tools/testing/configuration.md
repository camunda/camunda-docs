---
id: configuration
title: Configuration
description: "See how to configure Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

By default, CPT uses a runtime based on [Testcontainers](#testcontainers-runtime). You can customize the runtime to your
needs, or replace it with a [Remote runtime](#remote-runtime), for example, if you can't install a Docker runtime.

Configuration is provided through `application.yml` (or `application.properties`) when using the Camunda Spring Boot
Starter, or through a `camunda-container-runtime.properties` file when using the Java client.

:::tip Environment variable resolution (Java client)
When using the Java client, properties in `camunda-container-runtime.properties` support automatic environment variable resolution. If a property is not explicitly set, it is resolved from an environment variable. The variable name is derived by prepending the `CAMUNDA_PROCESSTEST_` prefix, replacing dots with underscores, removing hyphens, and converting everything to uppercase.

For example, `judge.chatModel.apiKey` resolves to `CAMUNDA_PROCESSTEST_JUDGE_CHATMODEL_APIKEY`.
:::

## Testcontainers runtime

The default runtime of CPT is based on [Testcontainers](https://java.testcontainers.org/). It uses the Camunda Docker
image and includes the following components:

- Camunda
- Connectors

:::note Why Testcontainers?
CPT follows a common practice by using Testcontainers to provide an isolated, reproducible, and easily configurable
environment using Docker containers. This ensures consistent test results, simplifies setup across different platforms,
and allows integration with Camunda and other components without manual installation or complex dependencies.
:::

:::tip Shared runtime
If you use the same runtime configuration for all test classes, then you can use a [shared runtime](#shared-runtime) to
speed up the test execution.
:::

### Prerequisites

- A Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop on Mac and Windows.
  If you're experiencing issues with your Docker runtime, have a look at
  the [Testcontainers documentation](https://java.testcontainers.org/supported_docker_environment/).

### Usage

By default, the runtime uses the same version of the Camunda Docker images as the Maven module. You can change the
Docker images and other runtime properties in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    # Change the version of the Camunda Docker image
    camunda-docker-image-version: 8.8.0
    # Change the Camunda Docker image
    camunda-docker-image-name: camunda/camunda
    # Set additional Camunda environment variables
    camunda-env-vars:
      env_1: value_1
    # Expose additional Camunda ports
    camunda-exposed-ports:
      - 9000
    # Change the Camunda logger name
    camunda-logger-name: tc.camunda
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
    # Expose additional Connectors ports
    connectors-exposed-ports:
      - 9010
    # Change the Connectors logger name
    connectors-logger-name: tc.connectors
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Change the version of the Camunda Docker image
camundaDockerImageVersion=8.8.0
# Change the Camunda Docker image
camundaDockerImageName=camunda/camunda
# Set additional Camunda environment variables
camundaEnvVars.env_1=value_1
camundaEnvVars.env_2=value_2
# Expose additional Camunda ports
camundaExposedPorts[0]=9000
camundaExposedPorts[1]=9001
# Change the Camunda logger name
camundaLoggerName=tc.camunda
# Enable Connectors
connectorsEnabled=true
# Change version of the Connectors Docker image
connectorsDockerImageVersion=8.8.0
# Change the Connectors Docker image
connectorsDockerImageName=camunda/connectors
# Set additional Connectors environment variables
connectorsEnvVars.env_1=value_1
connectorsEnvVars.env_2=value_2
# Set Connectors secrets
connectorsSecrets.secret_1=value_1
connectorsSecrets.secret_2=value_2
# Expose additional Connectors ports
connectorsExposedPorts[0]=9010
connectorsExposedPorts[1]=9011
# Change the Connectors logger name
connectorsLoggerName=tc.connectors
```

Alternatively, you can register the JUnit extension manually and use the fluent builder:

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

### Shared runtime

By default, CPT creates a new runtime for each test class. You can change this behavior and use a shared Testcontainers
runtime for all test classes to speed up the test execution. You can enable the shared runtime in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    # Switch from a managed to a shared runtime
    runtime-mode: shared
```

All test classes using the shared runtime will use the same runtime configuration. You can't change the runtime
configuration for individual test classes, such as enabling connectors or setting connector secrets. However, you can
switch to a managed runtime for individual test classes and override the runtime configuration.

```java

@SpringBootTest(
        properties = {
                // Use a managed runtime for a different configuration
                "camunda.process-test.runtime-mode=managed",
                "camunda.process-test.connectors-enabled=true",
        }
)
@CamundaSpringProcessTest
public class MyProcessTest {
    //
}
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Switch from a managed to a shared runtime
runtimeMode=shared
```

All test classes using the shared runtime will use the same runtime configuration. You can't change the runtime
configuration for individual test classes, such as enabling connectors or setting connector secrets. However, you can
switch to a managed runtime for individual test classes and override the runtime configuration.

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
            new CamundaProcessTestExtension()
                    // Use a managed runtime for a different configuration
                    .withRuntimeMode(CamundaProcessTestRuntimeMode.MANAGED)
                    .withConnectorsEnabled(true);
}
```

</TabItem>

</Tabs>

### Multi-tenancy

Multi-tenancy is disabled by default. You can enable multi-tenancy in the following way:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    # Enable multi-tenancy
    multi-tenancy-enabled: true
```

By enabling multi-tenancy, the runtime enables Basic Auth security and creates a default user with username/password
`demo` with admin rights to interact with the runtime.

A process test using multi-tenancy could look like the following example:

```java

@SpringBootTest
@CamundaSpringProcessTest
public class MyProcessTest {

    private static final String DEFAULT_USERNAME = "demo";

    private static final String TENANT_ID_1 = "tenant-1";
    private static final String TENANT_ID_2 = "tenant-2";

    @Autowired
    private CamundaClient client;
    @Autowired
    private CamundaProcessTestContext processTestContext;

    private CamundaClient clientForTenant1;

    @BeforeEach
    void setupTenants() {
        // create tenants
        client.newCreateTenantCommand().tenantId(TENANT_ID_1).name(TENANT_ID_1).send().join();
        client.newCreateTenantCommand().tenantId(TENANT_ID_2).name(TENANT_ID_2).send().join();

        // assign the default user to the tenants
        client
                .newAssignUserToTenantCommand()
                .username(DEFAULT_USERNAME)
                .tenantId(TENANT_ID_1)
                .send()
                .join();
        client
                .newAssignUserToTenantCommand()
                .username(DEFAULT_USERNAME)
                .tenantId(TENANT_ID_2)
                .send()
                .join();

        // create a client for tenant 1
        clientForTenant1 =
                processTestContext.createClient(
                        clientBuilder -> clientBuilder.defaultTenantId(TENANT_ID_1));
    }

    @Test
    void createProcessInstance() {
        // given
        clientForTenant1
                .newDeployResourceCommand()
                .addResourceFromClasspath("bpmn/order-process.bpmn")
                .send()
                .join();

        // when
        final var processInstance =
                clientForTenant1
                        .newCreateInstanceCommand()
                        .bpmnProcessId("order-process")
                        .latestVersion()
                        .variable("order_id", "order-1")
                        .send()
                        .join();

        // then
        assertThatProcessInstance(processInstance).isCreated();

        Assertions.assertThat(processInstance.getTenantId()).isEqualTo(TENANT_ID_1);
    }
}
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Enable multi-tenancy
multiTenancyEnabled=true
```

Alternatively, you can register the JUnit extension manually and use the fluent builder:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
            new CamundaProcessTestExtension()
                    // Enable multi-tenancy
                    .withMultiTenancyEnabled(true);
}
```

By enabling multi-tenancy, the runtime enables Basic Auth security and creates a default user with username/password
`demo` with admin rights to interact with the runtime.

A process test using multi-tenancy could look like the following example:

```java

@CamundaProcessTest
public class MyProcessTest {

    private static final String DEFAULT_USERNAME = "demo";

    private static final String TENANT_ID_1 = "tenant-1";
    private static final String TENANT_ID_2 = "tenant-2";

    private CamundaClient client;
    private CamundaProcessTestContext processTestContext;

    private CamundaClient clientForTenant1;

    @BeforeEach
    void setupTenants() {
        // create tenants
        client.newCreateTenantCommand().tenantId(TENANT_ID_1).name(TENANT_ID_1).send().join();
        client.newCreateTenantCommand().tenantId(TENANT_ID_2).name(TENANT_ID_2).send().join();

        // assign the default user to the tenants
        client
                .newAssignUserToTenantCommand()
                .username(DEFAULT_USERNAME)
                .tenantId(TENANT_ID_1)
                .send()
                .join();
        client
                .newAssignUserToTenantCommand()
                .username(DEFAULT_USERNAME)
                .tenantId(TENANT_ID_2)
                .send()
                .join();

        // create a client for tenant 1
        clientForTenant1 =
                processTestContext.createClient(
                        clientBuilder -> clientBuilder.defaultTenantId(TENANT_ID_1));
    }

    @Test
    void createProcessInstance() {
        // given
        clientForTenant1
                .newDeployResourceCommand()
                .addResourceFromClasspath("bpmn/order-process.bpmn")
                .send()
                .join();

        // when
        final var processInstance =
                clientForTenant1
                        .newCreateInstanceCommand()
                        .bpmnProcessId("order-process")
                        .latestVersion()
                        .variable("order_id", "order-1")
                        .send()
                        .join();

        // then
        assertThatProcessInstance(processInstance).isCreated();

        Assertions.assertThat(processInstance.getTenantId()).isEqualTo(TENANT_ID_1);
    }
}
```

</TabItem>

</Tabs>

:::info
You should assign the default user (`demo`) to all tenants to ensure that the assertions can access all data.
:::

### Custom containers

You can add custom containers to the managed or shared Testcontainers runtime, for example, to add a database, an MCP
server, or a mock service.

The CPT runtime manages the lifecycle of the custom containers and ensures that they are started before the tests and
stopped after the tests. The custom containers are added to the same network as the Camunda and Connectors containers to
allow communication between the containers.

You can add a custom container in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

Implement a `CamundaProcessTestContainerProvider` bean that creates the custom container.

In this example, we create a WireMock container to mock external HTTP calls in the tests.

```java
@Configuration
public class TestConfig {

    @Bean
    public CamundaProcessTestContainerProvider wireMockProvider() {
        return containerContext -> new WireMockContainer();
    }

    // A WireMock container to mock external HTTP calls in the tests
    private static final class WireMockContainer extends GenericContainer<WireMockContainer> {
        public WireMockContainer() {
            // Configure the Docker image
            super("wiremock/wiremock:3.13.0");
            // Configure the network alias for communication between the containers
            withNetworkAliases("wiremock");
            // Configure the ports to expose
            withExposedPorts(8080);
            // Configure the logger
            withLogConsumer(new Slf4jLogConsumer(LoggerFactory.getLogger("tc.wiremock"), true));
            // Configure the wait strategy to ensure that the container is ready before running the tests
            waitingFor(
                    Wait.forHttp("/__admin/mappings").forPort(8080).withMethod("GET").forStatusCode(200));
            // Custom container-specific configuration
            withCopyFileToContainer(
                    // Copy the WireMock mapping file for the HTTP stubs to the container
                    MountableFile.forClasspathResource("/wiremock/mapping.json"),
                    "/home/wiremock/mappings/mapping.json");
        }
    }
}
```

In the `application.yml` configuration, we use a connector secret to bind the connector task to the WireMock container
using its network alias `wiremock` and the exposed port `8080`.

```yaml
camunda:
  process-test:
    connectors-enabled: true
    connectors-secrets:
      BASE_URL: http://wiremock:8080
```

</TabItem>

<TabItem value='java-client'>

Implement the `CamundaProcessTestContainerProvider` interface that creates the custom container.

In this example, we create a WireMock container to mock external HTTP calls in the tests.

```java
public class WireMockContainerProvider implements CamundaProcessTestContainerProvider {

    @Override
    public GenericContainer<?> createContainer(final CamundaProcessTestContainerContext containerContext) {
        return new WireMockContainer();
    }

    // A WireMock container to mock external HTTP calls in the tests
    private static final class WireMockContainer extends GenericContainer<WireMockContainer> {
        public WireMockContainer() {
            // Configure the Docker image
            super("wiremock/wiremock:3.13.0");
            // Configure the network alias for communication between the containers
            withNetworkAliases("wiremock");
            // Configure the ports to expose
            withExposedPorts(8080);
            // Configure the logger
            withLogConsumer(new Slf4jLogConsumer(LoggerFactory.getLogger("tc.wiremock"), true));
            // Configure the wait strategy to ensure that the container is ready before running the tests
            waitingFor(
                    Wait.forHttp("/__admin/mappings").forPort(8080).withMethod("GET").forStatusCode(200));
            // Custom container-specific configuration
            withCopyFileToContainer(
                    // Copy the WireMock mapping file for the HTTP stubs to the container
                    MountableFile.forClasspathResource("/wiremock/mapping.json"),
                    "/home/wiremock/mappings/mapping.json");
        }
    }
}
```

Register the container provider using the Java ServiceLoader mechanism by creating a file
`io.camunda.process.test.api.runtime.CamundaProcessTestContainerProvider` in the `src/test/resources/META-INF/services`
directory of your project and adding the fully qualified name of the container provider implementation:

```
com.example.WireMockContainerProvider
```

In the `/camunda-container-runtime.properties` configuration file, we use a connector secret to bind the connector task
to the WireMock container using its network alias `wiremock` and the exposed port `8080`.

```properties
connectorsEnabled=true
connectorsSecrets.BASE_URL=http://wiremock:8080
```

Alternatively, you can register the container provider on the JUnit extension using the fluent builder:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

  @RegisterExtension
  private static final CamundaProcessTestExtension EXTENSION =
          new CamundaProcessTestExtension()
                  .withContainerProvider(new WireMockContainerProvider())
                  .withConnectorsEnabled(true)
                  .withConnectorsSecret("BASE_URL", "http://wiremock:8080");
}
```

</TabItem>

</Tabs>

## Remote runtime

Instead of using the managed [Testcontainers runtime](#testcontainers-runtime), you can configure CPT to connect to a
remote runtime, for example, to a local [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) running
on your machine.

When to use it:

- You can't install a Docker-API compatible container runtime
- Debugging of test case on your local machine

:::info
You are responsible for configuring and managing the remote runtime. Ensure the runtime is running before executing
tests. Keep in mind that CPT automatically deletes all data between test runs to maintain a clean state.
:::

### Prerequisites

- Install a Camunda 8 runtime, for example, [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)
- Expose the management API port (`9600`) to delete the data between test runs (by default for a local Camunda 8 Run)
- Enable the management clock endpoint to allow clock manipulations

You can [configure Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run/configuration.md#configuration-options) by
defining a `application.yaml` file with:

```yaml
zeebe.clock.controlled: true
```

By default, Camunda 8 Run loads the `application.yaml` from the distribution's root directory. If you use a different
path, then you need to set the path when starting the application with the command line argument
`--config=application.yaml`:

```
./start.sh --config=application.yaml
```

### Usage

You need to set the following property to switch to a remote runtime.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    # Switch from a managed to a remote runtime
    runtime-mode: remote
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Switch from a managed to a remote runtime
runtimeMode=remote
```

Alternatively, you can register the JUnit extension manually and use the fluent builder:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
            new CamundaProcessTestExtension()
                    // Switch from a managed to a remote runtime
                    .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE);
}
```

</TabItem>

</Tabs>

### Change the connection

By default, CPT connects to a remote Camunda 8 Run running on your local machine. CPT checks if the remote runtime is
available and ready, before running the tests. It waits up to 1 minute for the remote runtime to become ready.

You can change the connection to the remote runtime and the connection time in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    runtime-mode: remote
    # Change the connection (default: Camunda 8 Run)
    remote:
      camunda-monitoring-api-address: http://0.0.0.0:9600
      connectors-rest-api-address: http://0.0.0.0:8085
      # The connection timeout in ISO-8601 duration format (default: PT1M)
      runtime-connection-timeout: PT1M
      client:
        rest-address: http://0.0.0.0:8080
        grpc-address: http://0.0.0.0:26500
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
runtimeMode=remote
# Change the connection (default: Camunda 8 Run)
remote.camundaMonitoringApiAddress=http://0.0.0.0:9600
remote.connectorsRestApiAddress=http://0.0.0.0:8085
remote.client.grpcAddress=http://0.0.0.0:26500
remote.client.restAddress=http://0.0.0.0:8080
# The connection timeout in ISO-8601 duration format (default: PT1M)
remote.runtimeConnectionTimeout=PT1M
```

Alternatively, register the JUnit extension manually and use the fluent builder:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
            new CamundaProcessTestExtension()
                    .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE)
                    // Change the connection (default: Camunda 8 Run)
                    .withRemoteCamundaClientBuilderFactory(() -> CamundaClient.newClientBuilder()
                            .restAddress(URI.create("http://0.0.0.0:8080"))
                            .grpcAddress(URI.create("http://0.0.0.0:26500"))
                    )
                    .withRemoteCamundaMonitoringApiAddress(URI.create("http://0.0.0.0:9600"))
                    .withRemoteConnectorsRestApiAddress(URI.create("http://0.0.0.0:8085"))
                    // Change the connection timeout (default: PT1M)
                    .withRemoteRuntimeConnectionTimeout(Duration.ofMinutes(1));
}
```

</TabItem>

</Tabs>

### Debugging of test cases

You can use a remote runtime to debug your test cases on your local machine. Set breakpoints in your test case and run
the test in debug mode from your IDE.

When the test execution stops at a breakpoint, you can inspect the process instance state using Operate and the user
task state using Tasklist. You can also use the Camunda client to interact with the runtime from the debugger console.

## Process Test Coverage

CPT generates an HTML and JSON coverage report of your BPMN processes. You can configure the report generation in the
following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    coverage:
      # Change the directory where the report is generated
      reportDirectory: target/coverage-report
      # Exclude processes from the report
      excludedProcesses:
        - process_1
        - process_2
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Change the directory where the report is generated
coverage.reportDirectory=target/coverage-report
# Exclude processes from the report
excludedProcesses[0]=process_1
excludedProcesses[1]=process_2
```

</TabItem>

</Tabs>

## Logging

The test runtime uses [SLF4J](https://www.slf4j.org/) as the logging framework. If needed, you can enable the logging
for the following packages:

- `io.camunda.process.test` - The test runtime (recommended level `info`)
- `tc.camunda` - The Camunda Docker container (recommended level `error`)
- `tc.connectors` - The connectors Docker container (recommended level `error`)
- `org.testcontainers` - The Testcontainers framework (recommended level `warn`)

## Judge configuration <span class="badge badge--alpha">Alpha</span>

:::important
Judge configuration is an [alpha feature](/components/early-access/alpha/alpha-features.md). APIs, dependencies, and configuration are likely to change.
:::

CPT supports LLM-based assertions that evaluate process variables against natural-language expectations. To use
[judge assertions](assertions.md#judge-assertions), configure a judge with an LLM provider.

### Prerequisites

Camunda Process Test Spring includes the built-in LLM providers as a transitive dependency. No additional
dependency is needed.

If you use the Java client without Spring, add the `camunda-process-test-langchain4j` dependency to your project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-process-test-langchain4j</artifactId>
    <scope>test</scope>
</dependency>
```

This module provides out-of-the-box support for OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and OpenAI-compatible providers
via [LangChain4j](https://docs.langchain4j.dev/). If you provide a custom `ChatModelAdapter`
(see [Custom ChatModelAdapter](#custom-chatmodeladapter)), this dependency is not required.

### Supported providers

The following built-in providers are available:

| Provider          | `provider` value    | Required properties | Notes                                                                           |
| ----------------- | ------------------- | ------------------- | ------------------------------------------------------------------------------- |
| OpenAI            | `openai`            | `model`, `api-key`  | —                                                                               |
| Anthropic         | `anthropic`         | `model`, `api-key`  | —                                                                               |
| Amazon Bedrock    | `amazon-bedrock`    | `model`, `region`   | `api-key` optional. See [more details](#amazon-bedrock).                        |
| Azure OpenAI      | `azure-openai`      | `model`, `endpoint` | `api-key` optional. See [more details](#azure-openai).                          |
| OpenAI-compatible | `openai-compatible` | `model`, `base-url` | For local models or OpenAI-format APIs. See [more details](#openai-compatible). |

For OpenAI and Anthropic, the [quick start](#quick-start) example applies directly — change the `provider` and
`model` values. The providers below have additional configuration.

#### Amazon Bedrock

If no authentication properties are set, the provider defaults to the
[AWS default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html).

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "amazon-bedrock"
        model: "eu.anthropic.claude-haiku-4-5-20251001-v1:0"
        region: "eu-central-1"
        # Optional: authenticate with an API key
        api-key: "your-api-key"
        # Or use AWS credentials instead of api-key:
        # credentials:
        #   access-key: "your-access-key"
        #   secret-key: "your-secret-key"
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.chatModel.provider=amazon-bedrock
judge.chatModel.model=eu.anthropic.claude-haiku-4-5-20251001-v1:0
judge.chatModel.region=eu-central-1
# Optional: authenticate with an API key
judge.chatModel.apiKey=your-api-key
# Or use AWS credentials instead of apiKey:
# judge.chatModel.credentials.accessKey=your-access-key
# judge.chatModel.credentials.secretKey=your-secret-key
```

</TabItem>

</Tabs>

#### OpenAI-compatible

Use this provider for local models (such as [Ollama](https://ollama.com/)) or any API that follows the OpenAI format.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai-compatible"
        model: "llama3"
        base-url: "http://localhost:11434/v1"
        # api-key is optional for local providers
        # Optional: custom HTTP headers
        headers:
          X-Custom-Header: "custom-value"
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.chatModel.provider=openai-compatible
judge.chatModel.model=llama3
judge.chatModel.baseUrl=http://localhost:11434/v1
# judge.chatModel.apiKey is optional for local providers
# Optional: custom HTTP headers
judge.chatModel.headers.X-Custom-Header=custom-value
```

</TabItem>

</Tabs>

:::tip
If both `api-key` and a custom `Authorization` header are set for the `openai-compatible` provider, the custom header takes precedence.
:::

#### Azure OpenAI

The `model` property corresponds to your Azure deployment name. If no API key is provided, the provider falls back to
[`DefaultAzureCredential`](https://learn.microsoft.com/en-us/java/api/com.azure.identity.defaultazurecredential)
for Azure managed identity authentication.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "azure-openai"
        model: "my-gpt-4o-deployment"
        endpoint: "https://my-resource.openai.azure.com/"
        # api-key is optional; if omitted, DefaultAzureCredential is used
        api-key: "your-api-key"
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.chatModel.provider=azure-openai
judge.chatModel.model=my-gpt-4o-deployment
judge.chatModel.endpoint=https://my-resource.openai.azure.com/
# api-key is optional; if omitted, DefaultAzureCredential is used
judge.chatModel.apiKey=your-api-key
```

</TabItem>

</Tabs>

#### Custom or generic providers

For providers not listed above, use a custom provider name and pass arbitrary properties.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "my-generic"
        model: "custom-model"
        custom-properties:
          endpoint: "http://localhost:8080"
          api-version: "2024-01"
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.chatModel.provider=my-generic
judge.chatModel.model=custom-model
judge.chatModel.customProperties.endpoint=http://localhost:8080
judge.chatModel.customProperties.api-version=2024-01
```

</TabItem>

</Tabs>

These properties are available to SPI implementations through `ProviderConfig.getCustomProperties()`.

### Property reference

The table below lists all available judge configuration properties. In Spring, these are nested under
`camunda.process-test.judge`. In Java properties files, use the `judge.` prefix with camelCase keys
(for example, `chat-model.api-key` becomes `judge.chatModel.apiKey`).

#### Judge settings

| Property        | Type     | Default | Description                                              |
| --------------- | -------- | ------- | -------------------------------------------------------- |
| `threshold`     | `double` | `0.5`   | Confidence threshold (0.0–1.0) for the judge to pass.    |
| `custom-prompt` | `string` | —       | Custom evaluation prompt replacing the default criteria. |

#### Chat model settings

| Property                            | Type       | Default | Providers           | Description                                                          |
| ----------------------------------- | ---------- | ------- | ------------------- | -------------------------------------------------------------------- |
| `chat-model.provider`               | `string`   | —       | —                   | LLM provider name (see [Supported providers](#supported-providers)). |
| `chat-model.model`                  | `string`   | —       | All                 | Model name (or Azure deployment name for `azure-openai`).            |
| `chat-model.api-key`                | `string`   | —       | All                 | API key. Optional for providers that support default credentials.    |
| `chat-model.base-url`               | `string`   | —       | `openai-compatible` | Base URL for the API endpoint.                                       |
| `chat-model.endpoint`               | `string`   | —       | `azure-openai`      | Azure OpenAI resource URL.                                           |
| `chat-model.region`                 | `string`   | —       | `amazon-bedrock`    | AWS region.                                                          |
| `chat-model.timeout`                | `duration` | —       | All                 | Request timeout (ISO-8601 duration, e.g. `PT30S`).                   |
| `chat-model.temperature`            | `double`   | —       | All                 | Temperature for response randomness (0.0–2.0).                       |
| `chat-model.headers.*`              | `map`      | —       | `openai-compatible` | Custom HTTP headers.                                                 |
| `chat-model.credentials.access-key` | `string`   | —       | `amazon-bedrock`    | AWS access key.                                                      |
| `chat-model.credentials.secret-key` | `string`   | —       | `amazon-bedrock`    | AWS secret key.                                                      |
| `chat-model.custom-properties.*`    | `map`      | —       | Custom/SPI          | Arbitrary key-value pairs passed to SPI providers.                   |

### Custom prompt

You can replace the default evaluation criteria with a custom prompt. The custom prompt replaces only the evaluation
criteria (the "You are an impartial judge..." preamble). The system still controls the expectation and value injection,
the scoring rubric, and the JSON output format.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      custom-prompt: "You are a domain expert evaluating financial data accuracy."
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.customPrompt=You are a domain expert evaluating financial data accuracy.
```

Or programmatically:

```java
JudgeConfig.of(prompt -> myLlmClient.chat(prompt))
    .withCustomPrompt("You are a domain expert evaluating financial data accuracy.");
```

</TabItem>

</Tabs>

You can also override the custom prompt for a single assertion chain:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config
        .withCustomPrompt("You are a domain expert evaluating financial data accuracy."))
    .hasVariableSatisfiesJudge("result", "Contains valid totals.");
```

### Custom ChatModelAdapter

You can provide your own `ChatModelAdapter` implementation without depending on the `camunda-process-test-langchain4j`
module. A `ChatModelAdapter` is a functional interface that takes a prompt string and returns a response string.

#### Spring: register as a bean

If you have a single `ChatModelAdapter` bean and no `provider` property is set, CPT auto-detects and uses it:

```java
@TestConfiguration
class JudgeTestConfig {

    @Bean
    ChatModelAdapter chatModelAdapter() {
        return prompt -> myLlmClient.chat(prompt);
    }
}
```

When you have multiple beans, set `provider` to the bean name you want to use. In Spring, the bean name defaults to
the method name:

```java
@TestConfiguration
class JudgeTestConfig {

    @Bean
    ChatModelAdapter openAiAdapter() { /* ... */ }

    @Bean
    ChatModelAdapter ollamaAdapter() { /* ... */ }
}
```

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "ollamaAdapter" # matches the bean method name
```

:::note Resolution order
When using `@CamundaSpringProcessTest`, the judge is bootstrapped in this order:

1. **Single `ChatModelAdapter` bean** with no `provider` configured: used automatically.
2. **`provider` configured** and a bean name matches: that bean is selected.
3. **No matching bean**: falls back to SPI resolution through `ChatModelAdapterProvider` implementations.
4. **SPI also fails**: throws `IllegalStateException` if a provider was configured.

:::

#### Java: SPI via ChatModelAdapterProvider

Implement `ChatModelAdapterProvider` and register it through `META-INF/services`:

```java
public class MyCustomProvider implements ChatModelAdapterProvider {

    @Override
    public String getProviderName() {
        return "my-provider";
    }

    @Override
    public ChatModelAdapter create(ProviderConfig config) {
        String endpoint = config.getCustomProperties().get("endpoint");
        return prompt -> callEndpoint(endpoint, prompt);
    }
}
```

Register the provider in `META-INF/services/io.camunda.process.test.api.judge.ChatModelAdapterProvider`:

```
com.example.MyCustomProvider
```

#### Programmatic configuration

You can configure the judge programmatically instead of using properties files. Set the configuration globally
using `CamundaAssert.setJudgeConfig()`:

```java
CamundaAssert.setJudgeConfig(
    JudgeConfig.of(prompt -> myLlmClient.chat(prompt))
        .withThreshold(0.8));
```

Or register the JUnit extension manually with a judge configuration:

```java
@RegisterExtension
CamundaProcessTestExtension extension = new CamundaProcessTestExtension()
    .withJudgeConfig(JudgeConfig.of(prompt -> myLlmClient.chat(prompt))
        .withThreshold(0.8));
```
