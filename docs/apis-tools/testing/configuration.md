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

## Logging

The test runtime uses [SLF4J](https://www.slf4j.org/) as the logging framework. If needed, you can enable the logging for the following packages:

- `io.camunda.process.test` - The test runtime (recommended level `info`)
- `tc.camunda` - The Camunda Docker container (recommended level `error`)
- `tc.connectors` - The connectors Docker container (recommended level `error`)
- `org.testcontainers` - The Testcontainers framework (recommended level `warn`)

## Accessing host ports

If you're running local servers such as wiremock, you will want the runtime to access them from outside of the containerized instance. A mock server
lets you test the functionality of your outbound connectors, for example.

Exposing the host ports is easily done using `TestContainers.exposeHostPorts(port)`. The following code demonstrates how
you can expose Wiremock's 9999 port to the running Testcontainers instance. 

```java
@WireMockTest(httpPort = 9999)
@SpringBootTest(
    classes = {CamundaProcessTestOutboundConnectorsMockIT.class},
    properties = {
      "io.camunda.process.test.connectors-enabled=true",
      "io.camunda.process.test.connectors-secrets.CONNECTORS_URL=http://connectors:8080/actuator/health/readiness"
    })
@CamundaSpringProcessTest
public class CamundaProcessTestOutboundConnectorsMockIT {
    
  // to be injected
  @Autowired private CamundaClient client;
  @Autowired private CamundaProcessTestContext processTestContext;

  @BeforeAll
  static void setup(final WireMockRuntimeInfo wireMockRuntimeInfo) {
    Testcontainers.exposeHostPorts(wireMockRuntimeInfo.getHttpPort());
  }
  @Test
  void testWithExposedPort() {
    // ...
  }
}
```

You also need to edit your process .bpmn file to ensure that the outbound connector URL references the special TestContainer
URL `http://host.testcontainers.internal`. This ensures the outgoing request is properly routed to your locally running server:

```XML
<!-- snip of a larger process .bpmn file -->
<bpmn:serviceTask id="mocked_outbound_connector" name="Mocked Outbound Connector" zeebe:modelerTemplate="io.camunda.connectors.HttpJson.v2" zeebe:modelerTemplateVersion="11" zeebe:modelerTemplateIcon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjAzMzUgOC45OTk5N0MxNy4wMzM1IDEzLjQ0NzUgMTMuNDI4MSAxNy4wNTI5IDguOTgwNjUgMTcuMDUyOUM0LjUzMzE2IDE3LjA1MjkgMC45Mjc3NjUgMTMuNDQ3NSAwLjkyNzc2NSA4Ljk5OTk3QzAuOTI3NzY1IDQuNTUyNDggNC41MzMxNiAwLjk0NzA4MyA4Ljk4MDY1IDAuOTQ3MDgzQzEzLjQyODEgMC45NDcwODMgMTcuMDMzNSA0LjU1MjQ4IDE3LjAzMzUgOC45OTk5N1oiIGZpbGw9IiM1MDU1NjIiLz4KPHBhdGggZD0iTTQuOTMxMjYgMTQuMTU3MUw2Ljc4MTA2IDMuNzE0NzFIMTAuMTM3NUMxMS4xOTE3IDMuNzE0NzEgMTEuOTgyNCAzLjk4MzIzIDEyLjUwOTUgNC41MjAyN0MxMy4wNDY1IDUuMDQ3MzYgMTMuMzE1IDUuNzMzNTggMTMuMzE1IDYuNTc4OTJDMTMuMzE1IDcuNDQ0MTQgMTMuMDcxNCA4LjE1NTIyIDEyLjU4NDEgOC43MTIxNUMxMi4xMDY3IDkuMjU5MTMgMTEuNDU1MyA5LjYzNzA1IDEwLjYyOTggOS44NDU5TDEyLjA2MTkgMTQuMTU3MUgxMC4zMzE1TDkuMDMzNjQgMTAuMDI0OUg3LjI0MzUxTDYuNTEyNTQgMTQuMTU3MUg0LjkzMTI2Wk03LjQ5NzExIDguNTkyODFIOS4yNDI0OEM5Ljk5ODMyIDguNTkyODEgMTAuNTkwMSA4LjQyMzc0IDExLjAxNzcgOC4wODU2MUMxMS40NTUzIDcuNzM3NTMgMTEuNjc0MSA3LjI2NTEzIDExLjY3NDEgNi42Njg0MkMxMS42NzQxIDYuMTkxMDYgMTEuNTI0OSA1LjgxODExIDExLjIyNjUgNS41NDk1OUMxMC45MjgyIDUuMjcxMTMgMTAuNDU1OCA1LjEzMTkgOS44MDkzNiA1LjEzMTlIOC4xMDg3NEw3LjQ5NzExIDguNTkyODFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K">
  <bpmn:extensionElements>
    <zeebe:taskDefinition type="io.camunda:http-json:1" retries="3" />
    <zeebe:ioMapping>
      <zeebe:input source="noAuth" target="authentication.type" />
      <zeebe:input source="GET" target="method" />
      <!-- Change the source to point to the internal testcontainers URL -->
      <zeebe:input source="http://host.testcontainers.internal:9999/test" target="url" />
      <zeebe:input source="={&#34;Accept&#34;:&#34;application/json&#34;,&#34;Content-Type&#34;:&#34;application/json&#34;}" target="headers" />
      <zeebe:input source="=false" target="storeResponse" />
      <zeebe:input source="=20" target="connectionTimeoutInSeconds" />
      <zeebe:input source="=20" target="readTimeoutInSeconds" />
      <zeebe:input source="=false" target="ignoreNullValues" />
    </zeebe:ioMapping>
    <zeebe:taskHeaders>
      <zeebe:header key="elementTemplateVersion" value="11" />
      <zeebe:header key="elementTemplateId" value="io.camunda.connectors.HttpJson.v2" />
      <zeebe:header key="retryBackoff" value="PT0S" />
    </zeebe:taskHeaders>
  </bpmn:extensionElements>
  <bpmn:incoming>Flow_01242ip</bpmn:incoming>
  <bpmn:outgoing>Flow_0krqrtv</bpmn:outgoing>
</bpmn:serviceTask>
```