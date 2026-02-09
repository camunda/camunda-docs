---
id: configuration
title: Configuration
description: "See how to configure Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

By default, CPT uses a runtime based on [Testcontainers](#testcontainers-runtime). You can customize the runtime to your
needs, or replace it with a [Remote runtime](#remote-runtime), for example, if you can't install a Docker runtime.

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

You can [configure Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md#configuration-options) by
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

By default, CPT connects to a remote Camunda 8 Run running on your local machine. You can change the connection in the
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
    runtime-mode: remote
    # Change the connection (default: Camunda 8 Run)
    remote:
      camunda-monitoring-api-address: http://0.0.0.0:9600
      connectors-rest-api-address: http://0.0.0.0:8085
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
remote.runtimeConnectionTimeout=PT1M
remote.client.grpcAddress=http://0.0.0.0:26500
remote.client.restAddress=http://0.0.0.0:8080
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
