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
      connectors-rest-api-address: http://0.0.0.0:8086
      # The connection timeout in ISO-8601 duration format (default: PT1M)
      runtime-connection-timeout: PT1M
  client:
    rest-address: http://0.0.0.0:8080
    grpc-address: http://0.0.0.0:26500
```

:::note
The properties `camunda.process-test.remote.client.rest-address` and `camunda.process-test.remote.client.grpc-address` are deprecated. Use `camunda.client.rest-address` and `camunda.client.grpc-address` instead.
:::

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
runtimeMode=remote
# Change the connection (default: Camunda 8 Run)
remote.camundaMonitoringApiAddress=http://0.0.0.0:9600
remote.connectorsRestApiAddress=http://0.0.0.0:8086
camunda.client.gateway.grpc.address=http://0.0.0.0:26500
camunda.client.gateway.rest.address=http://0.0.0.0:8080
# The connection timeout in ISO-8601 duration format (default: PT1M)
remote.runtimeConnectionTimeout=PT1M
```

:::note
The properties `remote.client.grpcAddress` and `remote.client.restAddress` are deprecated. Use `camunda.client.gateway.grpc.address` and `camunda.client.gateway.rest.address` instead.
:::

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
                    .withCamundaClientBuilderFactory(() -> CamundaClient.newClientBuilder()
                            .restAddress(URI.create("http://0.0.0.0:8080"))
                            .grpcAddress(URI.create("http://0.0.0.0:26500"))
                    )
                    .withRemoteCamundaMonitoringApiAddress(URI.create("http://0.0.0.0:9600"))
                    .withRemoteConnectorsRestApiAddress(URI.create("http://0.0.0.0:8086"))
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

## Client configuration

CPT configures the Camunda client automatically based on the runtime mode. You can customize the client
configuration beyond the connection addresses, for example, to set up authentication.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

CPT applies all [Camunda client configurations](/apis-tools/camunda-spring-boot-starter/configuration.md) from your
`application.yml`. For example, to configure Basic authentication for a remote runtime:

```yaml
camunda:
  client:
    grpc-address: http://localhost:26500
    rest-address: http://localhost:8080
    auth:
      method: basic
      username: demo
      password: demo
```

For full flexibility, provide a `CamundaClientBuilderFactory` bean:

```java

@Bean
public CamundaClientBuilderFactory customClientBuilderFactory() {
    return () ->
            CamundaClient.newClientBuilder()
                    .restAddress(URI.create("http://0.0.0.0:8080"))
                    .grpcAddress(URI.create("http://0.0.0.0:26500"))
                    .credentialsProvider(
                            CredentialsProvider.newBasicAuthCredentialsProviderBuilder()
                                    .username("demo")
                                    .password("demo")
                                    .build());
}
```

</TabItem>

<TabItem value='java-client'>

In the `camunda-container-runtime.properties` file, you can set any
[`ClientProperties`](https://javadoc.io/doc/io.camunda/camunda-client-java/latest/io/camunda/client/ClientProperties.html).
For example, to configure the connection to a remote runtime:

```properties
camunda.client.gateway.rest.address=http://0.0.0.0:8080
camunda.client.gateway.grpc.address=http://0.0.0.0:26500
```

For more flexibility, use the fluent builder to set a client builder factory:

```java

@RegisterExtension
private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
                .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE)
                .withCamundaClientBuilderFactory(
                        () ->
                                CamundaClient.newClientBuilder()
                                        .restAddress(URI.create("http://0.0.0.0:8080"))
                                        .grpcAddress(URI.create("http://0.0.0.0:26500")));
```

To override specific client properties, for example to configure a credential provider, use
`withCamundaClientBuilderOverrides`. This works together with the client builder factory and the configuration file:

```java

@RegisterExtension
private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
                .withCamundaClientBuilderOverrides(
                        camundaClientBuilder ->
                                camundaClientBuilder
                                        .credentialsProvider(
                                                CredentialsProvider.newBasicAuthCredentialsProviderBuilder()
                                                        .username("demo")
                                                        .password("demo")
                                                        .build()));
```

</TabItem>

</Tabs>

## Process Test Coverage

CPT generates an HTML and JSON coverage report of your BPMN processes and DMN decision tables. You can configure the
report generation in the following way.

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
      # Exclude processes from the report by their process definition ID
      excludedProcesses:
        - process_1
        - process_2
      # Exclude decisions from the report by their decision definition ID
      excludedDecisions:
        - decision_1
        - decision_2
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Change the directory where the report is generated
coverage.reportDirectory=target/coverage-report
# Exclude processes from the report by their process definition ID
excludedProcesses[0]=process_1
excludedProcesses[1]=process_2
# Exclude decisions from the report by their decision definition ID
excludedDecisions[0]=decision_1
excludedDecisions[1]=decision_2
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

[Judge assertions](assertions.md#hasvariablesatisfiesjudge) use a configured LLM to score process variables (or plain values) against
natural language expectations. This section covers how to set up the LLM provider and tune the judge behavior.

### Prerequisites

CPT provides an optional [LangChain4j](https://docs.langchain4j.dev/) integration module that ships with preconfigured
support for major LLM providers: OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and OpenAI-compatible APIs.
LangChain4j requires Java 17+. You can provide your own LLM integration through a
custom `ChatModelAdapter` instead (see [custom ChatModelAdapter](#custom-chatmodeladapter)).

:::tip
For a guided walkthrough of setting up and testing AI agents, see [test your AI agents](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md).
:::

<Tabs groupId="client" defaultValue="spring-sdk-pre" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-pre' },
{label: 'Java client', value: 'java-client-pre' },
]}>

<TabItem value='spring-sdk-pre'>

Camunda Process Test Spring includes the LangChain4j providers as a transitive dependency. No additional
dependency is needed.

</TabItem>

<TabItem value='java-client-pre'>

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

If you provide a custom `ChatModelAdapter` (see [custom ChatModelAdapter](#custom-chatmodeladapter)), this dependency
is not required.

### Property reference

All judge properties are nested under `camunda.process-test.judge` in Spring configuration. In Java properties files,
use the `judge.` prefix with camelCase keys (for example, `judge.chat-model.api-key` becomes `judge.chatModel.apiKey`).

For configuration examples, see [Step 2: configure the LLM provider and connectors](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md#step-2-configure-the-llm-provider-and-connectors).

Unless noted otherwise, properties in the provider tables are required.

#### Judge settings

| Property                 | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `judge.threshold`        | `double`  | `0.5`   | Confidence threshold (0.0 to 1.0) for the judge to pass.                                                                                                                                                                                                                                                                                      |
| `judge.custom-prompt`    | `string`  |         | Custom evaluation prompt replacing the default criteria.                                                                                                                                                                                                                                                                                      |
| `judge.attach-documents` | `boolean` | `false` | When `true`, resolves Camunda document references in the evaluated variable and attaches their content to the judge. Disabled by default to avoid unnecessary token cost. To evaluate attached content, use a multimodal-capable model; otherwise, CPT evaluates only the raw variable JSON. See [document attachment](#document-attachment). |

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
{label: 'Custom/SPI', value: 'custom' },
]}>

<TabItem value='openai'>

| Property                       | Required | Type       | Description                                               |
| ------------------------------ | -------- | ---------- | --------------------------------------------------------- |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `openai`.                                          |
| `judge.chat-model.model`       | Yes      | `string`   | Model name (for example `gpt-4o`).                        |
| `judge.chat-model.api-key`     | Yes      | `string`   | API key.                                                  |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`). |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).         |

**Example:**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai"
        model: "gpt-4o"
        api-key: ${OPENAI_API_KEY}
```

</TabItem>

<TabItem value='anthropic'>

| Property                       | Required | Type       | Description                                               |
| ------------------------------ | -------- | ---------- | --------------------------------------------------------- |
| `judge.chat-model.provider`    | Yes      | `string`   | Set to `anthropic`.                                       |
| `judge.chat-model.model`       | Yes      | `string`   | Model name (for example `claude-sonnet-4-20250514`).      |
| `judge.chat-model.api-key`     | Yes      | `string`   | API key.                                                  |
| `judge.chat-model.timeout`     | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`). |
| `judge.chat-model.temperature` | No       | `double`   | Temperature for response randomness (0.0 to 2.0).         |

**Example:**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "anthropic"
        model: "claude-sonnet-4-20250514"
        api-key: ${ANTHROPIC_API_KEY}
```

</TabItem>

<TabItem value='amazon-bedrock'>

Supports Bedrock long-term API keys or AWS IAM credentials. Falls back to the
[AWS default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html).

:::note
The AWS principal must be authorized to perform [`bedrock:InvokeModel`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html) on the configured model ARN. The model must also be [enabled for access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) in the chosen region. If you configure both a chat model and an embedding model through Bedrock, each model requires its own `bedrock:InvokeModel` grant — access to one does not imply access to the other.
:::

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

**Example:**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "amazon-bedrock"
        model: "eu.anthropic.claude-haiku-4-5-20251001-v1:0"
        region: "eu-central-1"
        credentials:
          access-key: ${AWS_BEDROCK_ACCESS_KEY}
          secret-key: ${AWS_BEDROCK_SECRET_KEY}
```

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

**Example:**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "azure-openai"
        model: "my-gpt4o-deployment"
        endpoint: "https://my-resource.openai.azure.com/"
        api-key: ${AZURE_OPENAI_API_KEY}
```

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

**Example (Ollama):**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai-compatible"
        model: "llama3"
        base-url: "http://localhost:11434/v1"
```

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

**Example:**

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "my-custom-provider"
        model: "my-model"
        custom-properties:
          endpoint: "https://my-llm.example.com/v1"
```

</TabItem>

</Tabs>

### Document attachment

When `judge.attach-documents` is enabled, CPT scans the serialized variable JSON for [Camunda document](/components/document-handling/getting-started.md) references, downloads their content, and passes it to the judge alongside the text prompt as structured content blocks. This lets the judge evaluate document content, such as generated PDFs, images, or text files.

Document attachment is disabled by default. Enable it globally:

<Tabs groupId="client" defaultValue="spring-sdk-attach" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-attach' },
{label: 'Java client', value: 'java-client-attach' },
]}>

<TabItem value='spring-sdk-attach'>

```yaml
camunda:
  process-test:
    judge:
      attach-documents: true
```

</TabItem>

<TabItem value='java-client-attach'>

```properties
judge.attachDocuments=true
```

</TabItem>

</Tabs>

You can also enable it per assertion using `withJudgeConfig`:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config.withAttachDocuments(true))
    .hasVariableSatisfiesJudge("report", "Contains an executive summary with at least three key findings.");
```

#### Content type handling

How the document is passed to the judge depends on its MIME content type:

| Content type                                                                                                                                            | Passed to judge as                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `image/*`                                                                                                                                               | Inline image block                                                      |
| `application/pdf`                                                                                                                                       | PDF file block                                                          |
| `text/*`, `application/json`, `application/xml`, `application/yaml`, `application/x-yaml`, or types with a structured suffix (`+json`, `+xml`, `+yaml`) | Inline text block (UTF-8)                                               |
| All other types                                                                                                                                         | Placeholder text only; content is not inspectable. A warning is logged. |

#### Behavior

- Built-in LangChain4j providers implement `MultimodalChatModelAdapter`. Custom `ChatModelAdapter` implementations must implement `MultimodalChatModelAdapter` to receive documents. Otherwise, document attachment does not take effect and the judge evaluates only the raw variable JSON.
- Documents with the same document ID and store ID are deduplicated and downloaded only once.
- If a document fails to download, the assertion fails with an `IllegalStateException`.

### Custom prompt

You can replace the default evaluation criteria with a custom prompt. The custom prompt replaces only the evaluation
criteria (the "You are an impartial judge..." preamble). The system still controls the expectation and value injection,
the scoring rubric, and the JSON output format.

By default, CPT uses an internal prompt that instructs the model to act as an impartial judge, compare the provided
value against the natural language expectation, apply the documented scoring rubric, and return the result in the
expected JSON structure.

<Tabs groupId="client" defaultValue="spring-sdk-custom" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-custom' },
{label: 'Java client', value: 'java-client-custom' },
]}>

<TabItem value='spring-sdk-custom'>

```yaml
camunda:
  process-test:
    judge:
      custom-prompt: "You are a domain expert evaluating financial data accuracy."
```

</TabItem>

<TabItem value='java-client-custom'>

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

<Tabs groupId="client" defaultValue="spring-sdk-chat" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-chat' },
{label: 'Java client', value: 'java-client-chat' },
]}>

<TabItem value='spring-sdk-chat'>

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

<TabItem value='java-client-chat'>

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

#### Multimodal support

To use [document attachment](#document-attachment) with a custom adapter, implement `MultimodalChatModelAdapter` instead of `ChatModelAdapter`. `MultimodalChatModelAdapter` extends `ChatModelAdapter` and adds a second `generate` overload that receives the resolved documents.

Each `ResolvedDocument` provides the binary content via `getContent()` and metadata via `getDocumentId()`, `getFileName()`, and `getContentType()`. Pass each document to the provider as a native structured content block (image block, file block, or text block depending on the content type). Prefix each block with a text content header containing the document metadata so the judge can correlate the block back to the document reference in `<actual_value>`:

```java
public class MyMultimodalAdapter implements MultimodalChatModelAdapter {

    @Override
    public String generate(String prompt) {
        return myClient.chat(prompt);
    }

    @Override
    public String generate(String prompt, List<ResolvedDocument> documents) {
        List<Object> parts = new ArrayList<>();
        parts.add(new TextPart(prompt));

        for (ResolvedDocument doc : documents) {
            // text header identifying this document block
            parts.add(new TextPart(
                "--- documentId=\"" + doc.getDocumentId()
                + "\" fileName=\"" + doc.getFileName()
                + "\" contentType=\"" + doc.getContentType() + "\" ---"));
            // binary content as a native structured block
            parts.add(new BinaryPart(doc.getContent(), doc.getContentType()));
        }

        return myClient.chat(parts);
    }
}
```

Replace `TextPart` and `BinaryPart` with the content-block types your provider's SDK defines. If document attachment is enabled but the adapter only implements `ChatModelAdapter`, document attachment does not take effect and the judge evaluates only the raw variable JSON.

## Semantic similarity configuration

[Semantic similarity assertions](assertions.md#hasvariablesimilarto) use a configured embedding model to compare process variables (or plain values) to an expected string using vector embeddings.
The assertion converts both values to embeddings and compares them using cosine similarity.

This section covers how to set up the embedding model provider and tune the similarity behavior.

### Prerequisites

CPT provides an optional [LangChain4j](https://docs.langchain4j.dev/) integration module that ships with preconfigured support for major embedding model providers, such as OpenAI, Azure OpenAI, Amazon Bedrock, and OpenAI-compatible APIs.

:::note
LangChain4j requires Java 17+.
:::

<Tabs groupId="client" defaultValue="spring-sdk-similarity-pre" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-similarity-pre' },
{label: 'Java client', value: 'java-client-similarity-pre' },
]}>

<TabItem value='spring-sdk-similarity-pre'>

Camunda Process Test Spring includes the LangChain4j providers as a transitive dependency. No additional
dependency or configuration is needed.

</TabItem>

<TabItem value='java-client-similarity-pre'>

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

:::important
You can provide your own embedding integration through a custom `EmbeddingModelAdapter`. In that case, this dependency is not required. See [custom EmbeddingModelAdapter](#custom-embeddingmodeladapter) for more details.
:::

### Property reference

All semantic similarity properties are nested under `camunda.process-test.similarity` in Spring configuration.
In Java properties files, use the `similarity.` prefix with camelCase keys. For example, `similarity.embedding-model.api-key` becomes `similarity.embeddingModel.apiKey`.

:::note
Unless noted otherwise, properties in the provider tables are required.
:::

#### Similarity settings

| Property                                   | Type      | Default | Description                                                                                                                  |
| ------------------------------------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `similarity.threshold`                     | `double`  | `0.5`   | Cosine similarity threshold (0.0 to 1.0) for the assertion to pass.                                                          |
| `similarity.default-preprocessors-enabled` | `boolean` | `true`  | When `true`, applies the default text preprocessors (lowercase, Unicode NFC, and whitespace normalization) before embedding. |

The default threshold of 0.5 treats two strings as similar when their cosine similarity is at least 0.5. This is a practical default for AI-generated text, where wording and phrasing may vary between runs even when the meaning is the same.
Increase the threshold when your assertion needs stricter semantic agreement.

#### Embedding model settings

<Tabs groupId="provider" defaultValue="openai-embedding" queryString values={[
{label: 'OpenAI', value: 'openai-embedding' },
{label: 'Amazon Bedrock', value: 'amazon-bedrock-embedding' },
{label: 'Azure OpenAI', value: 'azure-openai-embedding' },
{label: 'OpenAI-compatible', value: 'openai-compatible-embedding' },
{label: 'Custom/SPI', value: 'custom-embedding' },
]}>

<TabItem value='openai-embedding'>

| Property                                | Required | Type       | Description                                                            |
| --------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------- |
| `similarity.embedding-model.provider`   | Yes      | `string`   | Set to `openai`.                                                       |
| `similarity.embedding-model.model`      | Yes      | `string`   | Model name (for example `text-embedding-3-small`).                     |
| `similarity.embedding-model.api-key`    | Yes      | `string`   | API key.                                                               |
| `similarity.embedding-model.dimensions` | No       | `integer`  | Number of output dimensions for models that support custom dimensions. |
| `similarity.embedding-model.timeout`    | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).              |

**Example:**

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "openai"
        model: "text-embedding-3-small"
        api-key: ${OPENAI_API_KEY}
```

</TabItem>

<TabItem value='amazon-bedrock-embedding'>

It supports Bedrock long-term API keys or AWS IAM credentials. It falls back to the
[AWS default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html).

:::note
The AWS principal must be authorized to perform [`bedrock:InvokeModel`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html) on the configured embedding model ARN. The model must also be [enabled for access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) in the chosen region. If you use Bedrock for both the judge chat model and the embedding model, each model requires a separate `bedrock:InvokeModel` grant — access to one does not imply access to the other.
:::

| Property                                            | Required                       | Type       | Description                                                                                    |
| --------------------------------------------------- | ------------------------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `similarity.embedding-model.provider`               | Yes                            | `string`   | Set to `amazon-bedrock`.                                                                       |
| `similarity.embedding-model.model`                  | Yes                            | `string`   | Model name (for example `amazon.titan-embed-text-v2:0`).                                       |
| `similarity.embedding-model.region`                 | No                             | `string`   | AWS region (for example `eu-central-1`).                                                       |
| `similarity.embedding-model.api-key`                | No                             | `string`   | Bedrock long-term API key. Optional if using IAM credentials or the default credentials chain. |
| `similarity.embedding-model.credentials.access-key` | Conditionally, with secret key | `string`   | AWS IAM access key. Optional if using an API key or the default credentials chain.             |
| `similarity.embedding-model.credentials.secret-key` | Conditionally, with access key | `string`   | AWS IAM secret key. Optional if using an API key or the default credentials chain.             |
| `similarity.embedding-model.dimensions`             | No                             | `integer`  | Number of output dimensions for models that support custom dimensions.                         |
| `similarity.embedding-model.normalize`              | No                             | `boolean`  | Whether to normalize the output embeddings.                                                    |
| `similarity.embedding-model.timeout`                | No                             | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                      |

**Example:**

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "amazon-bedrock"
        model: "amazon.titan-embed-text-v2:0"
        region: "eu-central-1"
        credentials:
          access-key: ${AWS_BEDROCK_ACCESS_KEY}
          secret-key: ${AWS_BEDROCK_SECRET_KEY}
```

</TabItem>

<TabItem value='azure-openai-embedding'>

It supports API key authentication. It falls back to
[`DefaultAzureCredential`](https://learn.microsoft.com/en-us/java/api/com.azure.identity.defaultazurecredential).

| Property                                | Required | Type       | Description                                                                                                                |
| --------------------------------------- | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `similarity.embedding-model.provider`   | Yes      | `string`   | Set to `azure-openai`.                                                                                                     |
| `similarity.embedding-model.model`      | Yes      | `string`   | Azure [deployment name](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource#deploy-a-model). |
| `similarity.embedding-model.endpoint`   | Yes      | `string`   | Azure OpenAI resource URL (for example `https://my-resource.openai.azure.com/`).                                           |
| `similarity.embedding-model.api-key`    | No       | `string`   | API key. Optional; if omitted, falls back to `DefaultAzureCredential`.                                                     |
| `similarity.embedding-model.dimensions` | No       | `integer`  | Number of output dimensions for models that support custom dimensions.                                                     |
| `similarity.embedding-model.timeout`    | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                                                  |

**Example:**

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "azure-openai"
        model: "my-embedding-deployment"
        endpoint: "https://my-resource.openai.azure.com/"
        api-key: ${AZURE_OPENAI_API_KEY}
```

</TabItem>

<TabItem value='openai-compatible-embedding'>

For local models, such as [Ollama](https://ollama.com/), or any third-party API that implements the
[OpenAI embeddings format](https://platform.openai.com/docs/api-reference/embeddings).

| Property                                | Required | Type       | Description                                                              |
| --------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------ |
| `similarity.embedding-model.provider`   | Yes      | `string`   | Set to `openai-compatible`.                                              |
| `similarity.embedding-model.model`      | Yes      | `string`   | Model name (for example `nomic-embed-text`).                             |
| `similarity.embedding-model.base-url`   | Yes      | `string`   | Base URL for the API endpoint (for example `http://localhost:11434/v1`). |
| `similarity.embedding-model.api-key`    | No       | `string`   | API key. Optional for local providers.                                   |
| `similarity.embedding-model.headers.*`  | No       | `map`      | Custom HTTP headers.                                                     |
| `similarity.embedding-model.dimensions` | No       | `integer`  | Number of output dimensions for models that support custom dimensions.   |
| `similarity.embedding-model.timeout`    | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                |

**Example (Ollama):**

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "openai-compatible"
        model: "nomic-embed-text"
        base-url: "http://localhost:11434/v1"
```

</TabItem>

<TabItem value='custom-embedding'>

For providers not listed above, use a custom provider name and pass arbitrary properties. See
[custom EmbeddingModelAdapter](#custom-embeddingmodeladapter) for implementation details.

| Property                                         | Required | Type       | Description                                                                                   |
| ------------------------------------------------ | -------- | ---------- | --------------------------------------------------------------------------------------------- |
| `similarity.embedding-model.provider`            | Yes      | `string`   | Custom provider name matching your SPI implementation.                                        |
| `similarity.embedding-model.model`               | Yes      | `string`   | Model name.                                                                                   |
| `similarity.embedding-model.custom-properties.*` | No       | `map`      | Arbitrary key-value pairs passed to SPI providers via `ProviderConfig.getCustomProperties()`. |
| `similarity.embedding-model.timeout`             | No       | `duration` | Request timeout (ISO-8601 duration, for example `PT30S`).                                     |

**Example:**

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "my-custom-provider"
        model: "my-model"
        custom-properties:
          endpoint: "https://my-embeddings.example.com/v1"
```

</TabItem>
</Tabs>

### Text preprocessors

By default, CPT applies a set of text preprocessors to both the actual and expected values before computing embeddings.
This improves stability of similarity scores by reducing noise from formatting differences. The default preprocessors are:

- **Lowercase normalization**: converts text to lowercase.
- **Unicode normalization**: applies Unicode NFC normalization.
- **Whitespace normalization**: collapses repeated whitespace and trims leading/trailing whitespace.

To disable the default preprocessors, set `similarity.default-preprocessors-enabled` to `false`:

<Tabs groupId="client" defaultValue="spring-sdk-preprocessors" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-preprocessors' },
{label: 'Java client', value: 'java-client-preprocessors' },
]}>

<TabItem value='spring-sdk-preprocessors'>

```yaml
camunda:
  process-test:
    similarity:
      default-preprocessors-enabled: false
```

</TabItem>

<TabItem value='java-client-preprocessors'>

```properties
similarity.defaultPreprocessorsEnabled=false
```

</TabItem>

</Tabs>

You can also configure preprocessors programmatically using `SemanticSimilarityConfig`:

```java
SemanticSimilarityConfig.of(myEmbeddingAdapter, 0.7)
    .withoutPreprocessors();
```

### Custom EmbeddingModelAdapter

You can provide your own `EmbeddingModelAdapter` implementation without depending on the `camunda-process-test-langchain4j`
module.

An `EmbeddingModelAdapter` is a functional interface that takes a string and returns a vector of floating-point numbers representing the text's semantic embedding.

<Tabs groupId="client" defaultValue="spring-sdk-embed" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk-embed' },
{label: 'Java client', value: 'java-client-embed' },
]}>

<TabItem value='spring-sdk-embed'>

If you have a single `EmbeddingModelAdapter` bean and no `provider` property is set, CPT auto-detects and uses it:

```java

@TestConfiguration
class SimilarityTestConfig {

    @Bean
    EmbeddingModelAdapter embeddingModelAdapter() {
        return text -> myEmbeddingClient.embed(text);
    }
}
```

When you have multiple beans, set `provider` to the bean name you want to use. In Spring, the bean name defaults to
the method name:

```java

@TestConfiguration
class SimilarityTestConfig {

    @Bean
    EmbeddingModelAdapter openAiEmbeddingAdapter() { /* ... */ }

    @Bean
    EmbeddingModelAdapter ollamaEmbeddingAdapter() { /* ... */ }
}
```

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "ollamaEmbeddingAdapter" # matches the bean method name
```

:::note Resolution order
When using `@CamundaSpringProcessTest`, CPT resolves the embedding adapter in the following order:

1. If a single `EmbeddingModelAdapter` bean exists and no `provider` property is configured, that bean is used automatically.
2. If the `provider` property is configured and a bean with a matching name exists, that bean is selected.
3. If no matching bean is found, CPT falls back to the built-in LangChain4j implementations, provided that `camunda-process-test-langchain4j` is on the classpath.
4. If a `provider` is configured but no matching implementation can be resolved at all, CPT throws an exception.

:::

Alternatively, you can configure semantic similarity programmatically. Set the configuration globally
using `CamundaAssert.setSemanticSimilarityConfig()`:

```java
CamundaAssert.setSemanticSimilarityConfig(
        SemanticSimilarityConfig.of(text -> myEmbeddingClient.embed(text), 0.8));
```

</TabItem>

<TabItem value='java-client-embed'>

Implement `EmbeddingModelAdapterProvider` and register it through `META-INF/services`:

```java
public class MyCustomEmbeddingProvider implements EmbeddingModelAdapterProvider {

    @Override
    public String getProviderName() {
        return "my-provider";
    }

    @Override
    public EmbeddingModelAdapter create(ProviderConfig config) {
        String endpoint = config.getCustomProperties().get("endpoint");
        return text -> callEndpoint(endpoint, text);
    }
}
```

Register the provider in `META-INF/services/io.camunda.process.test.api.similarity.EmbeddingModelAdapterProvider`:

```
com.example.MyCustomEmbeddingProvider
```

Alternatively, you can configure semantic similarity programmatically. Set the configuration globally
using `CamundaAssert.setSemanticSimilarityConfig()`:

```java
CamundaAssert.setSemanticSimilarityConfig(
        SemanticSimilarityConfig.of(text -> myEmbeddingClient.embed(text), 0.8));
```

Or register the JUnit extension manually with a semantic similarity configuration:

```java

@RegisterExtension
CamundaProcessTestExtension extension = new CamundaProcessTestExtension()
        .withSemanticSimilarityConfig(
                SemanticSimilarityConfig.of(text -> myEmbeddingClient.embed(text), 0.8));
```

</TabItem>

</Tabs>
