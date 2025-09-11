---
id: configuration
title: Configuration
description: "See how to configure Camunda Process Test"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

By default, CPT uses a runtime based on [Testcontainers](#testcontainers-runtime). You can customize the runtime to your needs, or replace it with a [Remote runtime](#remote-runtime), for example, if you can't install a Docker runtime.

## Testcontainers runtime

The default runtime of CPT is based on [Testcontainers](https://java.testcontainers.org/). It uses the Camunda Docker image and includes the following components:

- Camunda
- Connectors

### Prerequisites

- A Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop on Mac and Windows.
  If you're experiencing issues with your Docker runtime, have a look at the [Testcontainers documentation](https://java.testcontainers.org/supported_docker_environment/).

### Usage

You can change the Docker images and other runtime properties in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

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

In your `/camunda-container-runtime.properties` file:

```properties
camundaDockerImageVersion=8.8.0
camundaDockerImageName=camunda/camunda
camundaEnvVars.env_1=value_1
camundaEnvVars.env_2=value_2
camundaExposedPorts[0]=4567
camundaExposedPorts[1]=5678

connectorsEnabled=true
connectorsDockerImageVersion=8.8.0
connectorsDockerImageName=camunda/connectors
connectorsEnvVars.env_1=value_1
connectorsEnvVars.env_2=value_2
connectorsSecrets.secret_1=value_1
connectorsSecrets.secret_2=value_2
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

Multi-tenancy is disabled by default. If your tests require multi-tenancy, you must enable it in the following way:

<Tabs groupId="config_multitenancy" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        multitenancy-enabled: true
```

</TabItem>

<TabItem value='java-client'>

You can register the JUnit extension manually and use the fluent builder to enable multi-tenancy:

```java
package com.example;

import io.camunda.process.test.api.CamundaProcessTestExtension;
import org.junit.jupiter.api.extension.RegisterExtension;

// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
                .withMultitenancyEnabled();
}
```

</TabItem>

</Tabs>

Enabling multi-tenancy secures the runtime with Basic Auth and creates a default user for it:

```
- Username: demo
- Name: demo
- Password: demo
- Email: demo@example.com
```

:::info
The user is deleted during the cluster purge in-between tests. There is a brief window during the purge where
the user hasn't been recreated yet and requests to the runtime will fail because of it. The CamundaManagementClient will
wait for the user to be re-created as part of the purge process, but any custom implementations making use of the purge
endpoint must take that behavior into consideration.
:::

## Remote runtime

Instead of using the managed [Testcontainers runtime](#testcontainers-runtime), you can configure CPT to connect to a remote runtime, for example, to a local [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) running on your machine.

When to use it:

- You can't install a Docker-API compatible container runtime

:::info
You are in charge of the remote runtime. Make sure to start the runtime before running tests.
:::

### Prerequisites

- Expose the management API port (`9600`) to delete the data between the test runs (default for a local Camunda 8 Run)
- Enable the management clock endpoint to manipulate the clock

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

Set the configuration to use a remote runtime in the following way. Change the connection to the runtime, if needed.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        # Switch from a managed to a remote runtime
        runtime-mode: remote
        # Change the connection (default: Camunda 8 Run)
        remote:
          camunda-monitoring-api-address: http://0.0.0.0:9600
          connectors-rest-api-address: http://0.0.0.0:8085
          client:
            rest-address: http://0.0.0.0:8080
            grpc-address: http://0.0.0.0:26500
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
runtimeMode=remote
remote.camundaMonitoringApiAddress=http://0.0.0.0:9600
remote.connectorsRestApiAddress=http://0.0.0.0:8085
remote.client.grpcAddress=http://0.0.0.0:26500
remote.client.restAddress=http://0.0.0.0:8080
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
            .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE)
            // Change the connection (default: Camunda 8 Run)
            .withRemoteCamundaClientBuilderFactory(() -> CamundaClient.newClientBuilder()
                .usePlaintext()
                .restAddress(URI.create("http://0.0.0.0:8080"))
                .grpcAddress(URI.create("http://0.0.0.0:26500"))
            )
            .withRemoteCamundaMonitoringApiAddress(URI.create("http://0.0.0.0:9600"))
            .withRemoteConnectorsRestApiAddress(URI.create("http://0.0.0.0:8085"));
}
```

</TabItem>

</Tabs>

### Configuring the Camunda Client's CredentialProvider

It's possible to change the client's CredentialProvider, thereby changing how the client authenticates against the
Camunda runtime. You can find a detailed breakdown of how to implement basic or OIDC authentication in
[the Java Client/Authentication section.](/apis-tools/camunda-spring-boot-starter/configuration.md)

<Tabs groupId="clientOptions" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        # Switch from a managed to a remote runtime
        runtime-mode: remote
        # Change the connection (default: Camunda 8 Run)
        remote:
          camunda-monitoring-api-address: http://0.0.0.0:9600
          connectors-rest-api-address: http://0.0.0.0:8085
          client:
            rest-address: http://0.0.0.0:8080
            grpc-address: http://0.0.0.0:26500
            request-timeout: PT20S
            auth:
              # Choose from 'basic', 'oidc', or 'none'
              method: basic
              username: admin
              password: admin
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
runtimeMode=remote
remote.connectorsRestApiAddress=http://0.0.0.0:8085
remote.client.grpcAddress=http://0.0.0.0:26500
remote.client.restAddress=http://0.0.0.0:8080
remote.client.auth.requestTimeout=PT20S
remote.client.auth.method=basic
remote.client.auth.username=admin
remote.client.auth.password=admin
```

Alternatively, you can configure the CredentialsProvider per test class via the extension:

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
            .withRuntimeMode(CamundaProcessTestRuntimeMode.REMOTE)
            // Change the connection (default: Camunda 8 Run)
            .withRemoteCamundaClientBuilderFactory(() -> CamundaClient.newClientBuilder()
                .usePlaintext()
                .restAddress(URI.create("http://0.0.0.0:8080"))
                .grpcAddress(URI.create("http://0.0.0.0:26500"))
            )
            .withRemoteCamundaMonitoringApiAddress(URI.create("http://0.0.0.0:9600"))
            .withRemoteConnectorsRestApiAddress(URI.create("http://0.0.0.0:8085"))
            .withClientRequestTimeout(Duration.ofSeconds(20))
            .withRemoteCamundaClientCredentialsProvider(
                    CredentialsProvider.newBasicAuthCredentialsProviderBuilder()
                            .username("admin")
                            .password("admin"));
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
