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

:::info Prerequisites

You need a Docker-API compatible container runtime, such as Docker on Linux or Docker Desktop on Mac and Windows.
If you're experiencing issues with your Docker runtime, have a look at the [Testcontainers documentation](https://java.testcontainers.org/supported_docker_environment/).

:::

You can change the Docker images and other runtime properties in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
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
camunda.dockerImageVersion=8.8.0
```

For more configuration options, you can register the JUnit extension manually and use the fluent builder:

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

## Remote runtime

Instead of using the managed [Testcontainers runtime](#testcontainers-runtime), you can configure CPT to connect to a remote runtime, for example, to a local [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) running on your machine.

When to use it:

- You can't install a Docker-API compatible container runtime

:::info

You are in charge of the remote runtime. Make sure to start the runtime before running tests.

:::

Set the configuration to use a remote runtime in the following way. Change the connection to the runtime, if needed.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot SDK', value: 'spring-sdk' },
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
          client:
            rest-address: http://0.0.0.0:8080
            grpc-address: http://0.0.0.0:26500
            camunda-monitoring-api-address: http://0.0.0.0:9600
            connectors-rest-api-address: http://0.0.0.0:8085
```

</TabItem>

<TabItem value='java-client'>

Register the JUnit extension manually and use the fluent builder:

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
                .restAddress(URI.create("http://0.0.0.0:8080"))
                .grpcAddress(URI.create("http://0.0.0.0:26500"))
            )
            .withRemoteCamundaMonitoringApiAddress(URI.create("http://0.0.0.0:9600"))
            .withRemoteConnectorsRestApiAddress(URI.create("http://0.0.0.0:8085"));
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
