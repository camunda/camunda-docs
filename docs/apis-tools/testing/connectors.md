---
id: connectors
title: Connectors
description: "Run your process test with Connectors to verify the integration with external systems or the configuration of the Connector tasks in your processes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can run your process test with [Connectors](/components/connectors/introduction.md) to verify the integration with external systems or the configuration of the Connector tasks in your processes.

For more unit-focused tests, mock the interaction; for example, by completing Connector jobs with an expected result.

## Enable Connectors

By default, the Connectors are disabled. You need to change the runtime configuration to enable them.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Spring SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

Set the following property in your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        connectors-enabled: true
```

Or, set the property directly on your test class:

```java
@SpringBootTest(properties = {"io.camunda.process.test.connectors-enabled=true"})
@CamundaSpringProcessTest
public class MyProcessTest {
    //
}
```

</TabItem>

<TabItem value='java-client'>

Register the JUnit extension in your test class with enabled Connectors:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private final CamundaProcessTestExtension extension =
        new CamundaProcessTestExtension().withConnectorsEnabled(true);
}
```

</TabItem>

</Tabs>

## Connector secrets

If you use [Connectors secrets](/components/connectors/use-connectors/index.md#using-secrets) in your processes, you can define them in the test runtime.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Spring SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

Add your secrets under the following property in your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        connectors-enabled: true
        connectors-secrets:
          GITHUB_TOKEN: ghp_secret
          SLACK_TOKEN: xoxb-secret
```

Or, set the property directly on your test class:

```java
@SpringBootTest(
    properties = {
        "io.camunda.process.test.connectors-enabled=true",
        "io.camunda.process.test.connectors-secrets.GITHUB_TOKEN=ghp_secret",
        "io.camunda.process.test.connectors-secrets.SLACK_TOKEN=xoxb-secret"
    }
)
@CamundaSpringProcessTest
public class MyProcessTest {
    //
}
```

</TabItem>

<TabItem value='java-client'>

Add your secrets when you register the JUnit extension:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private final CamundaProcessTestExtension extension =
        new CamundaProcessTestExtension()
            .withConnectorsEnabled(true)
            .withConnectorsSecret("GITHUB_TOKEN", "ghp_secret")
            .withConnectorsSecret("SLACK_TOKEN", "xoxb-secret");
}
```

</TabItem>

</Tabs>

## Invoke an inbound Connector

You can retrieve the URL address to invoke an inbound Connector in your test from the `CamundaProcessTestContext`.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Spring SDK', value: 'spring-sdk' },
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
        // given: a process instance waiting at a Connector event

        // when
        final String inboundConnectorAddress =
            processTestContext.getConnectorsAddress() + "/inbound/" + CONNECTOR_ID;
        // invoke the connector address, for example, via HTTP request

        // then: verify that the Connector event is completed
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
        // given: a process instance waiting at a Connector event

        // when
        final String inboundConnectorAddress =
            processTestContext.getConnectorsAddress() + "/inbound/" + CONNECTOR_ID;
        // invoke the connector address, for example, via HTTP request

        // then: verify that the Connector event is completed
    }
}
```

</TabItem>

</Tabs>

:::tip
You might need to wrap the invocation of the Connector in a retry loop, for example, by using [Awaitility](http://www.awaitility.org/).

There can be a delay between verifying that the Connectors event is active and opening the Connectors inbound subscription.
:::

## Custom Connectors

To use a custom Connectors bundle, replace the Connectors in the test runtime.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={
[
{label: 'Spring SDK', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]
}>

<TabItem value='spring-sdk'>

Set the Docker image name and version of your custom Connector bundle under the following properties in your `application.yml` (or `application.properties`):

```yaml
io:
  camunda:
    process:
      test:
        connectors-enabled: true
        connectors-docker-image-name: my-org/my-connectors
        connectors-docker-image-version: 1.0.0
```

</TabItem>

<TabItem value='java-client'>

Set the Docker image name and version of your custom Connector bundle when you register the JUnit extension:

```java
// No annotation: @CamundaProcessTest
public class MyProcessTest {

    @RegisterExtension
    private final CamundaProcessTestExtension extension =
        new CamundaProcessTestExtension()
            .withConnectorsEnabled(true)
            .withConnectorsDockerImageName("my-org/my-connectors")
            .withConnectorsDockerImageVersion("1.0.0");
}
```

</TabItem>

</Tabs>
