---
id: configuration
title: Configuration
description: "See how to configure Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

By default, CPT uses a runtime based on [Testcontainers](#testcontainers-runtime). You can customize the runtime to your
needs, or replace it with a [Remote runtime](#remote-runtime), for example, if you can't install a Docker runtime.

## Configuration files

CPT properties can be set directly in a configuration file or resolved from environment variables. The file location and resolution mechanism depend on your setup:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

Configure CPT in your `application.yml` (or `application.properties`). Properties also support [Spring's external configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html), so you can set them through environment variables, system properties, or additional profiles.

</TabItem>

<TabItem value='java-client'>

Configure CPT in a `camunda-container-runtime.properties` file. Properties support automatic environment variable resolution. If a property is not explicitly set, it is resolved from an environment variable by prepending `CAMUNDA_PROCESSTEST_`, replacing dots with underscores, removing hyphens, and converting to uppercase.

For example, `judge.chatModel.apiKey` resolves to `CAMUNDA_PROCESSTEST_JUDGE_CHATMODEL_APIKEY`.

</TabItem>

</Tabs>

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

## Judge configuration

[Judge assertions](assertions.md#hasvariablesatisfiesjudge) use a configured LLM to score process variables against
natural language expectations. This section covers how to set up the LLM provider and tune the judge behavior.

### Prerequisites

CPT provides an optional [LangChain4j](https://docs.langchain4j.dev/) integration module that ships with preconfigured
support for major LLM providers: OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and OpenAI-compatible APIs.
LangChain4j requires Java 17+. You can provide your own LLM integration through a
custom `ChatModelAdapter` instead (see [Custom ChatModelAdapter](#custom-chatmodeladapter)).

:::tip
For a guided walkthrough of setting up and testing AI agents, see [Test your AI agents](/components/agentic-orchestration/test-ai-agents.md).
:::

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

Camunda Process Test Spring includes the LangChain4j providers as a transitive dependency. No additional
dependency is needed.

</TabItem>

<TabItem value='java-client'>

Add the `camunda-process-test-langchain4j` dependency to your project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-process-test-langchain4j</artifactId>
    <scope>test</scope>
</dependency>
```

</TabItem>

</Tabs>

If you provide a custom `ChatModelAdapter` (see [Custom ChatModelAdapter](#custom-chatmodeladapter)), this dependency
is not required.

### Property reference

All judge properties are nested under `camunda.process-test.judge` in Spring configuration. In Java properties files,
use the `judge.` prefix with camelCase keys (for example, `judge.chat-model.api-key` becomes `judge.chatModel.apiKey`).

For configuration examples, see [Step 2: Configure the LLM provider and connectors](/components/agentic-orchestration/test-ai-agents.md#step-2-configure-the-llm-provider-and-connectors).

Unless noted otherwise, properties in the provider tables are required.

#### Judge settings

| Property              | Type     | Default | Description                                              |
| --------------------- | -------- | ------- | -------------------------------------------------------- |
| `judge.threshold`     | `double` | `0.5`   | Confidence threshold (0.0 to 1.0) for the judge to pass. |
| `judge.custom-prompt` | `string` |         | Custom evaluation prompt replacing the default criteria. |

The default threshold of `0.5` treats a response as acceptable when it is at least partially satisfied according to the
judge rubric. This is a practical default for AI-generated output, where wording and level of detail may vary between
runs even when the response is still useful. Increase the threshold when your assertion needs stricter semantic
agreement.

#### Chat model settings

<Tabs groupId="provider" defaultValue="openai" queryString values={[
{label: 'OpenAI', value: 'openai' },
{label: 'Anthropic', value: 'anthropic' },
{label: 'Amazon Bedrock', value: 'amazon-bedrock' },
{label: 'Azure OpenAI', value: 'azure-openai' },
{label: 'OpenAI-compatible', value: 'openai-compatible' },
{label: 'Custom/SPI', value: 'custom' }
]}>

<TabItem value='openai'>

| Property                       | Required | Type       | Description                                               |
| ------------------------------ | -------- | ---------- | --------------------------------------------------------- |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `openai`.                                          |
| `judge.chat-model.model`       | Yes      | `string`   | Model name (for example `gpt-4o`).                        |
| `judge.chat-model.api-key`     | Yes      | `string`   | API key.                                                  |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`). |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).         |

</TabItem>

<TabItem value='anthropic'>

| Property                       | Required | Type       | Description                                               |
| ------------------------------ | -------- | ---------- | --------------------------------------------------------- |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `anthropic`.                                       |
| `judge.chat-model.model`       | Yes      | `string`   | Model name (for example `claude-sonnet-4-20250514`).      |
| `judge.chat-model.api-key`     | Yes      | `string`   | API key.                                                  |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`). |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).         |

</TabItem>

<TabItem value='amazon-bedrock'>

Supports Bedrock long-term API keys or AWS IAM credentials. Falls back to the
[AWS default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html).

| Property                                  | Required                       | Type       | Description                                                                                    |
| ----------------------------------------- | ------------------------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `judge.chat-model.provider`               | Yes                            | `string`   | Set to `amazon-bedrock`.                                                                       |
| `judge.chat-model.model`                  | Yes                            | `string`   | Model name (for example `eu.anthropic.claude-haiku-4-5-20251001-v1:0`).                        |
| `judge.chat-model.region`                 | No                             | `string`   | AWS region (for example `eu-central-1`).                                                       |
| `judge.chat-model.api-key`                | No                             | `string`   | Bedrock long-term API key. Optional if using IAM credentials or the default credentials chain. |
| `judge.chat-model.credentials.access-key` | Conditionally, with secret key | `string`   | AWS IAM access key. Optional if using an API key or the default credentials chain.             |
| `judge.chat-model.credentials.secret-key` | Conditionally, with access key | `string`   | AWS IAM secret key. Optional if using an API key or the default credentials chain.             |
| `judge.chat-model.timeout`                | No                             | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                      |
| `judge.chat-model.temperature`            | No                             | `double`   | Temperature for response randomness (0.0 to 2.0).                                              |

</TabItem>

<TabItem value='azure-openai'>

Supports API key authentication. Falls back to
[`DefaultAzureCredential`](https://learn.microsoft.com/en-us/java/api/com.azure.identity.defaultazurecredential).

| Property                       | Required | Type       | Description                                                                                                                |
| ------------------------------ | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `azure-openai`.                                                                                                     |
| `judge.chat-model.model`       | Yes      | `string`   | Azure [deployment name](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource#deploy-a-model). |
| `judge.chat-model.endpoint`    | Yes      | `string`   | Azure OpenAI resource URL (for example `https://my-resource.openai.azure.com/`).                                           |
| `judge.chat-model.api-key`     | No       | `string`   | API key. Optional; if omitted, falls back to `DefaultAzureCredential`.                                                     |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                                                  |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).                                                                          |

</TabItem>

<TabItem value='openai-compatible'>

For local models (such as [Ollama](https://ollama.com/)) or any third-party API that implements the
[OpenAI chat completions format](https://platform.openai.com/docs/api-reference/chat).

| Property                       | Required | Type       | Description                                                              |
| ------------------------------ | -------- | ---------- | ------------------------------------------------------------------------ |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `openai-compatible`.                                              |
| `judge.chat-model.model`       | Yes      | `string`   | Model name (for example `llama3`).                                       |
| `judge.chat-model.base-url`    | Yes      | `string`   | Base URL for the API endpoint (for example `http://localhost:11434/v1`). |
| `judge.chat-model.api-key`     | No       | `string`   | API key. Optional for local providers.                                   |
| `judge.chat-model.headers.*`   | No       | `map`      | Custom HTTP headers.                                                     |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).                        |

</TabItem>

<TabItem value='custom'>

For providers not listed above, use a custom provider name and pass arbitrary properties. See
[Custom ChatModelAdapter](#custom-chatmodeladapter) for implementation details.

| Property                               | Required | Type       | Description                                                                                   |
| -------------------------------------- | -------- | ---------- | --------------------------------------------------------------------------------------------- |
| `judge.chat-model.provider`            | Yes      | `string`   | Custom provider name matching your SPI implementation.                                        |
| `judge.chat-model.model`               | Yes      | `string`   | Model name.                                                                                   |
| `judge.chat-model.custom-properties.*` | No       | `map`      | Arbitrary key-value pairs passed to SPI providers via `ProviderConfig.getCustomProperties()`. |
| `judge.chat-model.timeout`             | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                     |
| `judge.chat-model.temperature`         | No       | `double`   | Temperature for response randomness (0.0 to 2.0).                                             |

</TabItem>

</Tabs>

### Custom prompt

You can replace the default evaluation criteria with a custom prompt. The custom prompt replaces only the evaluation
criteria (the "You are an impartial judge..." preamble). The system still controls the expectation and value injection,
the scoring rubric, and the JSON output format.

By default, CPT uses an internal prompt that instructs the model to act as an impartial judge, compare the provided
value against the natural language expectation, apply the documented scoring rubric, and return the result in the
expected JSON structure.

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
JudgeConfig.of(prompt -> myChatModelAdapter.generate(prompt))
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

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

If you have a single `ChatModelAdapter` bean and no `provider` property is set, CPT auto-detects and uses it:

```java
@TestConfiguration
class JudgeTestConfig {

    @Bean
    ChatModelAdapter chatModelAdapter() {
        return prompt -> myChatModelAdapter.generate(prompt);
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
When using `@CamundaSpringProcessTest`, CPT resolves the judge adapter in the following order:

1. If a single `ChatModelAdapter` bean exists and no `provider` property is configured, that bean is used automatically.
2. If the `provider` property is configured and a bean with a matching name exists, that bean is selected.
3. If no matching bean is found, CPT falls back to the built-in LangChain4j implementations, provided that `camunda-process-test-langchain4j` is on the classpath.
4. If a `provider` is configured but no matching implementation can be resolved at all, CPT throws an exception.

:::

Alternatively, you can configure the judge programmatically. Set the configuration globally
using `CamundaAssert.setJudgeConfig()`:

```java
CamundaAssert.setJudgeConfig(
    JudgeConfig.of(prompt -> myChatModelAdapter.generate(prompt))
        .withThreshold(0.8));
```

</TabItem>

<TabItem value='java-client'>

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

Alternatively, you can configure the judge programmatically. Set the configuration globally
using `CamundaAssert.setJudgeConfig()`:

```java
CamundaAssert.setJudgeConfig(
    JudgeConfig.of(prompt -> myChatModelAdapter.generate(prompt))
        .withThreshold(0.8));
```

Or register the JUnit extension manually with a judge configuration:

```java
@RegisterExtension
CamundaProcessTestExtension extension = new CamundaProcessTestExtension()
    .withJudgeConfig(JudgeConfig.of(prompt -> myChatModelAdapter.generate(prompt))
        .withThreshold(0.8));
```

</TabItem>

</Tabs>
