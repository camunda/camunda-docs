---
id: connectors
title: Connectors
description: "Run your process test with connectors to verify the integration with external systems or the configuration of the connector tasks in your processes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can run your process test with [Connectors](/components/connectors/introduction.md) to verify the integration with external systems or the configuration of the connector tasks in your processes.

For more unit-focused tests, mock the interaction; for example,
by [completing connector jobs](utilities.md#mock-job-workers) with an expected result.

:::note
The instructions on this page are based on the default Testcontainer runtime. If you are using a remote runtime, consult
the relevant distribution documentation, such
as [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md#use-built-in-and-custom-connectors).
:::

## Enable connectors

By default, the connectors are disabled. You need to change the configuration in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    # Enable connectors
    connectors-enabled: true
```

Or, directly on your test class:

```java
@SpringBootTest(properties = {"camunda.process-test.connectors-enabled=true"})
@CamundaSpringProcessTest
public class MyProcessTest {
    //
}
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
# Enable Connectors
connectorsEnabled=true
```

Or, register the JUnit extension manually and use the fluent builder:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            // Enable Connectors
            .withConnectorsEnabled(true);
}
```

</TabItem>

</Tabs>

## Connector secrets

If you use [Connectors secrets](/components/connectors/use-connectors/index.md#using-secrets) in your processes, you can
add the secrets to the test runtime in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    connectors-enabled: true
    connectors-secrets:
      GITHUB_TOKEN: ghp_secret
      SLACK_TOKEN: xoxb-secret
```

Or, on your test class:

```java
@SpringBootTest(
    properties = {
        "camunda.process-test.connectors-enabled=true",
        "camunda.process-test.connectors-secrets.GITHUB_TOKEN=ghp_secret",
        "camunda.process-test.connectors-secrets.SLACK_TOKEN=xoxb-secret"
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
connectorsEnabled=true

connectorsSecrets.GITHUB_TOKEN=ghp_secret
connectorsSecrets.SLACK_TOKEN=xoxb-secret
```

Or, via JUnit extension:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            .withConnectorsEnabled(true)
            .withConnectorsSecret("GITHUB_TOKEN", "ghp_secret")
            .withConnectorsSecret("SLACK_TOKEN", "xoxb-secret");
}
```

</TabItem>

</Tabs>

## Invoke an inbound connector

You can retrieve the URL address to invoke an inbound connector in your test from the `CamundaProcessTestContext`.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

```java
@SpringBootTest
@CamundaSpringProcessTest
public class MyProcessTest {

    @Autowired private CamundaClient client;
    @Autowired private CamundaProcessTestContext processTestContext;

    @Test
    void shouldInvokeConnector() {
        // given: a process instance waiting at a connector event

        // when
        final String inboundConnectorAddress =
            processTestContext.getConnectorsAddress() + "/inbound/" + CONNECTOR_ID;
        // invoke the connector address, for example, via HTTP request

        // then: verify that the connector event is completed
    }
}
```

</TabItem>

<TabItem value='java-client'>

```java
@CamundaProcessTest
public class MyProcessTest {

    // to be injected
    private CamundaClient client;
    private CamundaProcessTestContext processTestContext;

    @Test
    void shouldInvokeConnector() {
        // given: a process instance waiting at a connector event

        // when
        final String inboundConnectorAddress =
            processTestContext.getConnectorsAddress() + "/inbound/" + CONNECTOR_ID;
        // invoke the connector address, for example, via HTTP request

        // then: verify that the connector event is completed
    }
}
```

</TabItem>

</Tabs>

:::tip
You might need to wrap the invocation of the connector in a retry loop, for example, by using [Awaitility](http://www.awaitility.org/).

There can be a delay between verifying that the connectors event is active and opening the connectors inbound subscription.
:::

## Access host ports

By default, the connectors run inside the Testcontainers environment in isolation and can't access your local machine.
However, you can
expose [host ports](https://java.testcontainers.org/features/networking/#exposing-host-ports-to-the-container) to the
containers, for example, to invoke a mock HTTP server running on your local machine from an outbound REST connector.

Expose the host ports using `TestContainers.exposeHostPorts(port)`. Inside the container, the local machine is available
under the hostname `host.testcontainers.internal`.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

```java
@WireMockTest(httpPort = 9999)
@SpringBootTest(
    properties = {
        "camunda.process-test.connectors-enabled=true",
        "camunda.process-test.connectors-secrets.BASE_URL=http://host.testcontainers.internal:9999"
    })
@CamundaSpringProcessTest
public class MyProcessTest {

    @Autowired private CamundaClient client;

    @BeforeAll
    static void setup() {
        Testcontainers.exposeHostPorts(9999);
    }

    @Test
    void shouldInvokeUrlFromConnector() {
        // given: stub the HTTP server
        stubFor(
            get(urlPathMatching("/test"))
                .willReturn(
                    aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withStatus(200)
                        .withBody("{\"status\":\"okay\"}")));

        // when: a process instance invoked the outbound connector

        // then: verify the HTTP request
        CamundaAssert.assertThat(processInstance)
            .isCompleted()
            .hasVariable("status", "okay");

        verify(getRequestedFor(urlEqualTo("/test")));
    }
}
```

</TabItem>

<TabItem value='java-client'>

```java
@WireMockTest(httpPort = 9999)
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            .withConnectorsEnabled(true)
            .withConnectorsSecret("BASE_URL", "http://host.testcontainers.internal:9999");

    private CamundaClient client;

    @BeforeAll
    static void setup() {
        Testcontainers.exposeHostPorts(9999);
    }

    @Test
    void shouldInvokeUrlFromConnector() {
        // given: stub the HTTP server
        stubFor(
            get(urlPathMatching("/test"))
                .willReturn(
                    aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withStatus(200)
                        .withBody("{\"status\":\"okay\"}")));

        // when: a process instance invoked the outbound connector

        // then: verify the HTTP request
        CamundaAssert.assertThat(processInstance)
                .isCompleted()
                .hasVariable("status", "okay");

        verify(getRequestedFor(urlEqualTo("/test")));
    }
}
```

</TabItem>

</Tabs>

:::tip
You can configure the URL of an outbound connector in your BPMN process
using [Connectors secrets](/components/connectors/use-connectors/index.md#using-secrets) to replace it in the
tests, for example, setting the URL expression to `"{{secrets.BASE_URL}}" + "/test"`.
:::

## Custom connectors

By default, the runtime uses the built-in connectors bundle in the same version as the Maven module. You can change the
version or use a custom connectors bundle in the following way.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

In your `application.yml` (or `application.properties`):

```yaml
camunda:
  process-test:
    connectors-enabled: true
    connectors-docker-image-name: my-org/my-connectors
    connectors-docker-image-version: 1.0.0
```

</TabItem>

<TabItem value='java-client'>

In your `/camunda-container-runtime.properties` file:

```properties
connectorsEnabled=true

connectorsDockerImageName=my-org/my-connectors
connectorsDockerImageVersion=1.0.0
```

Or, via JUnit extension:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private static final CamundaProcessTestExtension EXTENSION =
        new CamundaProcessTestExtension()
            .withConnectorsEnabled(true)
            .withConnectorsDockerImageName("my-org/my-connectors")
            .withConnectorsDockerImageVersion("1.0.0");
}
```

</TabItem>

</Tabs>
