---
id: connector-sdk
title: Connector SDK
description: The Connector SDK allows you to develop custom connectors using Java code. Focus on the logic of the connector, test it locally, and reuse its runtime logic.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The **Connector SDK** allows you to [develop custom connectors](#creating-a-custom-connector)
using Java code.

You can focus on the logic of the connector, test it locally, and
reuse its runtime logic in multiple [runtime environments](#runtime-environments). The SDK achieves this by abstracting from
Camunda 8 internals that usually come with
[job workers](/components/concepts/job-workers.md).

You can find the latest **Connector SDK** version source code [here](https://github.com/camunda/connectors).

The SDK provides APIs for common connector operations, such as:

- Fetching and deserializing input data
- Validating input data
- Replacing secrets in input data

Additionally, the SDK allows for convenient [testing](#testing) of your connector behavior and
[executing it in the environments](#runtime-environments) that suit your use cases best.

## Creating a custom connector

Using the Connector SDK, you can create environment-agnostic and reusable connector runtime behavior.
This section outlines how to set up a connector project, test it, and run it locally.

### Setup

When developing a new **Connector**, we recommend using one of our custom connector
templates for custom [outbound](https://github.com/camunda/connector-template-outbound) and
[inbound](https://github.com/camunda/connector-template-inbound) connectors.
These templates are [Maven](https://maven.apache.org/)-based Java projects, and can be used in various
ways such as:

- **Create your own GitHub repository**: Click **Use this template** and follow the prompted steps. You can manage code changes in your new repository afterward.
- **Experiment locally**: Check out the source code to your local machine using [Git](https://git-scm.com/). You won't be able to check in code changes to the repository due to restricted write access.
- **Fetch the source**: Download the source code as a ZIP archive using **Code > **Download ZIP\*\*.
  You can adjust and manage the code the way you like afterward using your chosen source code
  management tools.

To manually set up your connector project, include the following dependency to use the SDK.
Ensure you adhere to the project outline detailed in the next section.

<Tabs groupId="dependency" defaultValue="maven" values={
[
{label: 'Maven dependency', value: 'maven' },
{label: 'Gradle dependency', value: 'gradle' }
]
}>

<TabItem value='maven'>

```xml
<dependency>
  <groupId>io.camunda.connector</groupId>
  <artifactId>connector-core</artifactId>
  <version>${version.connectors}</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation "io.camunda.connector:connector-core:${version.connectors}"
```

</TabItem>
</Tabs>

### Outbound connector project outline

There are multiple parts of a connector that enable it for reuse, modeling, and the runtime behavior.
For example, the following parts make up an outbound connector:

```
my-connector
├── element-templates/
│   └── connector.json                 (1)
├── src/main
│   ├── java/io/camunda/example        (2)
│   │   ├── MyConnector.java           (3)
│   └── resources/META-INF/services
│       └── io.camunda.connector.api.outbound.OutboundConnectorProvider (4)
└── pom.xml (5)
```

For the modeling building blocks, the connector provides
[Connector templates](/components/connectors/custom-built-connectors/connector-templates.md) with **(1)**.

You provide the runtime logic as Java source code under a package like **(2)** including an implementation of your connector, in this case `MyConnector` with **(3)**.

For a detectable connector, you are required to expose your function class name in the
[`OutboundConnectorProvider` SPI implementation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ServiceLoader.html)
with **(4)**.

A configuration file like **(5)** manages the project setup, including dependencies.
In this example, we include a Maven project's `POM` file. Other build tools like
[Gradle](https://gradle.org/) can also be used.

### Outbound connector element template

[Connector templates](/components/connectors/custom-built-connectors/connector-templates.md) act as
the modeling interface for the users of your connector.

The template can be written manually but we recommend to use the `element-template-generator` which generates the
element template for your connector as part of your build process.

Element templates define the data and configuration bindings to your connector on the BPMN element via properties Properties have different types that define their visual representation. The can also be hidden
in the modeling UI but still applied to the BPMN:

```json
{
    ...
    "properties" : [ {
    "type": "Hidden",
    "value": "io.camunda:template:1",
    "binding": {
      "type": "zeebe:taskDefinition",
      "property": "type"
    }
  }
}
```

This type definition `io.camunda:template:1` is the connection configuring which version of your connector runtime behavior to use.
In technical terms, this defines the **Type** of jobs created for tasks in your process model that use this template.
Consult the [job worker](/components/concepts/job-workers.md) guide to learn more.

Besides the type binding, connector templates also define the input variables of your connector as `zeebe:input` objects.
For example, you can create the input variable `message` of your connector in the element template as follows:

```json
{
  "label": "Message",
  "type": "Text",
  "feel": "optional",
  "binding": {
    "type": "zeebe:input",
    "name": "message"
  }
}
```

You can also define nested data structures to reflect domain objects that group attributes.
For example, you can create the domain object `authentication` that contains the properties
`user` and `token` as follows:

```json
{
  "label": "Username",
  "description": "The username for authentication.",
  "type": "String",
  "binding": {
    "type": "zeebe:input",
    "name": "authentication.user"
  }
},
{
  "label": "Token",
  "description": "The token for authentication.",
  "type": "String",
  "binding": {
    "type": "zeebe:input",
    "name": "authentication.token"
  }
}
```

You can deserialize these authentication properties into a domain object using the SDK.
Visit the [input data](#outbound-connector-input-data) section for further details.

Connectors that offer any kind of result from their invocation should allow users to configure
how to map the result into their processes. Therefore, connector templates can reuse the two
recommended objects, **Result Variable** and **Result Expression**:

```json
{
  "label": "Result Variable",
  "description": "Name of variable to store the response in",
  "type": "String",
  "binding": {
    "type": "zeebe:taskHeader",
    "key": "resultVariable"
  }
},
{
  "label": "Result Expression",
  "description": "Expression to map the response into process variables",
  "type": "Text",
  "feel": "required",
  "binding": {
    "type": "zeebe:taskHeader",
    "key": "resultExpression"
  }
}
```

These objects create custom headers for the jobs created for the tasks that use this template.
The connector runtime environments pick up those two custom headers and translate them into process variables accordingly.
You can find an example of how to use this in the [out-of-the-box REST connector](/components/connectors/protocol/rest.md#response).

All connectors are recommended to offer exception handling to allow users to configure how to map results and technical errors into
BPMN errors. To provide this, connector templates can provide an **Error Expression**:

```json
{
  "label": "Error Expression",
  "description": "Expression to define BPMN Errors to throw",
  "group": "errors",
  "type": "Text",
  "feel": "required",
  "binding": {
    "type": "zeebe:taskHeader",
    "key": "errorExpression"
  }
}
```

This object creates a custom header for the jobs created for the tasks that use this template.
The connector runtime environments pick up this custom header and translate it into BPMN errors accordingly.
You can observe an example of how to use this in the [BPMN errors in connectors guide](/components/connectors/use-connectors/index.md#bpmn-errors-and-failing-jobs).

### Outbound connector runtime logic

The connector implements the `OutboundConnectorProvider` interface of the SDK. This allows the Connector runtime to
discover and invoke your Connector. It introspects the `@OutboundConnector` annotation and uses the `type` to register the Connector as a job worker to fetch jobs.

A Connector implementation can now declare

```java
package io.camunda.example;

import io.camunda.connector.api.annotation.Header;
import io.camunda.connector.api.annotation.Operation;
import io.camunda.connector.api.annotation.OutboundConnector;
import io.camunda.connector.api.annotation.Variable;
import io.camunda.connector.api.error.ConnectorException;
import io.camunda.connector.api.outbound.OutboundConnectorProvider;
import jakarta.validation.constraints.NotNull;

@OutboundConnector( // (1)
  name = "MyConnector",
  type = "io.camunda:my-connector:1"
)
@ElementTemplate( // (2)
  id = "my-connector-template:1",
  name = "My Connector Template"
)
public class MyConnector implements OutboundConnectorProvider {

  @Operation(id = "operation1") // (3)
  public String operation1(@Variable(name = "input") String input) { // (4)
    System.out.println("Received input: " + input);
    return "Test operation executed successfully!";
  }

  public record MyInput(@NotNull Integer a, @NotNull int b) {}

  public record MyOutput(int result) {}

  @Operation(id = "operation2")
  public MyOutput operation2(@Variable MyInput input) { // (5)
    return new MyOutput(input.a() + input.b());
  }

  @Operation(id = "operation3")
  public String operation3(@Header(name = "name") String name) { // (6)
    System.out.println("Received name: " + name);
    return name;
  }

  @Operation(id = "operation4")
  public String operation4() {
    throw new ConnectorException(("MY_ERROR"), "This is a test exception"); // (7)
  }
}
```

A single `@OutboundConnector` annotated connector (**(1)**) can declare one or multiple operations. The element template generation can be configured using the `@ElementTemplate` annotation (**(2)**)

Every declared operation (**(3)**) can accept one or multiple inputs as parameters.

Using the `@Variable` annotation, a primitive type has to specify the variable name for example `input` as shown in (**(4)**). Binding to a complex type will use the property names (`a`, `b`) of the type for variable mapping (**(5)**).

Types can use [Jakarta Validation](https://beanvalidation.org/) annotations. Validation will be applied during binding.

Its also possible to bind job headers using the `@Header` annotation (**(6)**) but this is only recommended for static config data defined at modeling time.

If the connector handles exceptional cases, it can use any exception to express technical errors. If a technical
error should be associated with a specific error code, the connector can throw a `ConnectorException` and define
a `code` as shown in **(7)**.

We recommend documenting the list of error codes as part of the connector's API. Users can build on those codes
by creating [BPMN errors](/components/connectors/use-connectors/index.md#bpmn-errors-and-failing-jobs) in their connector configurations.

### Inbound connector project outline

There are multiple parts of a connector that enables it for reuse, as a
reusable building block, for modeling, and for the runtime behavior.
For example, the following parts make up an inbound connector:

```
my-connector
├── element-templates
│   └── inbound-template-connector.json                                     (1)
├── pom.xml
├── src
│   ├── main
│   │   ├── java/io/camunda/connector
│   │   │   └── inbound
│   │   │       ├── MyConnectorExecutable.java                              (2)
│   │   │       ├── MyConnectorEvent.java                                   (3)
│   │   │       ├── MyConnectorProperties.java                              (4)
│   │   │       └── subscription
│   │   │           ├── MockSubscription.java
│   │   │           └── MockSubscriptionEvent.java
│   │   └── resources/META-IN/services
│   │       └── io.camunda.connector.api.inbound.InboundConnectorExecutable (5)
```

For the modeling building blocks, the connector provides
[Connector element templates](./connector-templates.md) with **(1)**.

You provide the runtime logic as Java source code.
Typically, a connector runtime logic consists of exactly one implementation of
a `InboundConnectorExecutable` with **(2)** and at least one input object like **(3)**, and connector's
properties like **(4)**

For a detectable connector function, you are required to expose your function class name in the
[`InboundConnectorExecutable` SPI implementation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ServiceLoader.html)
with **(5)**.

A configuration file like **(5)** manages the project setup, including dependencies.
In this example, we include a Maven project's `POM` file. Other build tools like
[Gradle](https://gradle.org/) can also be used.

### Inbound connector element template

To create reusable building blocks for modeling, you are required to provide a
domain-specific [Connector element template](./connector-templates.md).

A connector template defines the binding to your connector runtime behavior via the following object:

```json
{
  "type": "Hidden",
  "value": "io.camunda:mytestinbound:1",
  "binding": {
    "type": "zeebe:property",
    "name": "inbound.type"
  }
}
```

This type definition `io.camunda:mytestinbound:1` is the connection configuring which version of your connector runtime
behavior to use. In technical terms, this defines the **Type** of jobs created for tasks in your process model that use
this template. Consult the [job worker](../../concepts/job-workers.md) guide to learn more.

Besides the type binding, connector templates also define the properties of your connector as `zeebe:property` objects.
For example, you can create the input variable `sender` of your connector in the element template as follows:

```json
{
  "type": "String",
  "label": "Sender",
  "description": "Message sender name",
  "value": "Alice",
  "binding": {
    "type": "zeebe:property",
    "name": "sender"
  }
}
```

### Inbound connector runtime logic

To create a reusable runtime behavior for your connector, you are required to implement
and expose an implementation of the `InboundConnectorExecutable` interface of the SDK. The connector runtime
environments will call this function; it handles input data, executes the connector's
business logic. Exception handling is optional since the connector runtime environments handle this as a fallback.

The `InboundConnectorExecutable` interface consists of two methods: `activate` and `deactivate`.
A minimal recommended outline of a connector function implementation looks as follows:

```java
package io.camunda.connector.inbound;

import io.camunda.connector.api.annotation.InboundConnector;
import io.camunda.connector.api.inbound.InboundConnectorContext;
import io.camunda.connector.api.inbound.InboundConnectorExecutable;
import io.camunda.connector.inbound.subscription.MockSubscription;
import io.camunda.connector.inbound.subscription.MockSubscriptionEvent;

@InboundConnector(name = "MYINBOUNDCONNECTOR", type = "io.camunda:mytestinbound:1")
public class MyConnectorExecutable implements InboundConnectorExecutable {

    private MockSubscription subscription;
    private InboundConnectorContext connectorContext;

    @Override
    public void activate(InboundConnectorContext connectorContext) {
        MyConnectorProperties props = connectorContext.bindProperties(MyConnectorProperties.class);

        this.connectorContext = connectorContext;

        subscription = new MockSubscription(
                props.getSender(), props.getMessagesPerMinute(), this::onEvent);
    }

    @Override
    public void deactivate() {
        subscription.stop();
    }

    private void onEvent(MockSubscriptionEvent rawEvent) {
        MyConnectorEvent connectorEvent = new MyConnectorEvent(rawEvent);
        var result = connectorContext.correlateWithResult(connectorEvent);
        handleResult(result);
    }

    private void handleResult(CorrelationResult result) {
      switch (result) {
        case Success ignored -> LOG.debug("Message correlated successfully");
        case Failure failure -> {
          switch (failure.handlingStrategy()) {
            case ForwardErrorToUpstream ignored -> {
              LOG.error("Correlation failed, reason: {}", failure.message());
              // forward error to upstream
            }
            case Ignore ignored -> {
              LOG.debug("Correlation failed but no action required, reason: {}", failure.message());
              // ignore
            }
          }
        }
      }
    }
}
```

The `activate` method is a trigger function to start listening to inbound events. The implementation of this method
has to be asynchronous. Once activated, the inbound connector execution is considered active and running.
From this point, it should use the respective methods of `InboundConnectorContext` to communicate with the connector
runtime (e.g. to correlate the inbound event or signal the interrupt).

The `deactivate` method is just a graceful shutdown hook for inbound connectors.
The implementation must release all resources used by the subscription.

The `onEvent` method is a callback function that is triggered by the subscription whenever a new event is received.
This method is responsible for passing the event to the connector runtime environment for correlation.

The `handleResult` method is a helper method to handle the result of the correlation. The `CorrelationResult` object contains the result of the correlation and the handling strategy. The handling strategy defines how the connector implementation should handle the result.

Depending on the strategy, the connector implementation should either forward the error to the upstream system or ignore it. The handling strategy is derived by the connector runtime based on user configuration.

#### Validation

Validating input data is a common task in a connectors. The SDK provides
an out-of-the-box solution for input validation.

A default implementation of the SDK's core validation API is provided in a separate,
optional artifact `connector-validation`. If you want to use validation in your
Connector, add the following dependency to your project:

<Tabs groupId="dependency" defaultValue="maven" values={
[
{label: 'Maven dependency', value: 'maven' },
{label: 'Gradle dependency', value: 'gradle' }
]
}>

<TabItem value='maven'>

```xml
<dependency>
  <groupId>io.camunda.connector</groupId>
  <artifactId>connector-validation</artifactId>
  <version>${version.connectors}</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation "io.camunda.connector:connector-validation:${version.connectors}"
```

</TabItem>
</Tabs>

Validation is performed automatically when binding variables to parameters.

This instructs the context to prepare a validator that is provided by an implementation
of the `ValidationProvider` interface. The `connector-validation` artifact brings along
such an implementation. It uses the [Jakarta Bean Validation API](https://beanvalidation.org/)
together with [Hibernate Validator](https://hibernate.org/validator/).

For your input object to be validated, you need to annotate the input's
attributes to define your requirements:

```java
package io.camunda.connector;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class MyConnectorRequest {

  @NotEmpty private String message;
  @NotNull @Valid private Authentication authentication;
}
```

The Jakarta Bean Validation API comes with a long list of
[supported constraints](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#builtinconstraints).
It also allows to
[validate entire object graphs](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#constraintdeclarationvalidationprocess-validationroutine-graphvalidation)
using the `@Valid` annotation. Thus, the `authentication` object will also be validated.

```java
package io.camunda.connector;


import javax.validation.constraints.NotEmpty;

public class Authentication {

  @NotEmpty private String user;

  @NotEmpty @Pattern(regexp = "^xobx") private String token;
}
```

Using this approach, you can validate your whole input data structure with one initial call from
the central connector function.

#### Secrets

Connectors that require confidential information to connect to external systems need to be able
to manage those securely. As described in the
[guide for creating secrets](/components/console/manage-clusters/manage-secrets.md), secrets can be
controlled in a secure location and referenced in a connector's properties using a placeholder
pattern `{{secrets.*}}`. To make this mechanism as robust as possible, secret handling comes with
the connector SDK out of the box. That way, all connectors can use the same standard way of
handling secrets in input data.

The SDK allows replacing secrets in input data as late as possible to avoid passing them around
in the environments that handle connector invocation. We do not pass secrets into the
Connector function in clear text but only as placeholders that you can replace from
within the connector function.

Secrets are replaced automatically in the connector input when you use the variable binding or properties access methods of the `InboundConnectorContext`. You will always receive inputs with secrets replaced.

The Runtime automatically replaces secrets in String fields or in container types. Using the
placeholder pattern `{{secrets.*}}` in a String field will replace the placeholder with the secret
value. Using the placeholder pattern in a container type will replace the placeholder in all
String fields of the container type.

## Runtime environments

To integrate connectors with your business use case, you need a runtime environment to act as the intermediary between
your business and connectors space.

The Connector SDK enables you to write environment-agnostic runtime behavior for connectors.
This makes the connector logic reusable in different setups without modifying your connector
code. To invoke this logic, you need a runtime environment that knows the connector function
and how to call it.

In Camunda 8 SaaS, every cluster runs a component that knows the
[available out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
and how to invoke them. This component is the runtime environment specific to Camunda's SaaS use case.

Regarding Self-Managed environments, you are responsible for providing the runtime environment that
can invoke the connectors.

There are several runtime options provided by Camunda:

- [Spring Boot Starter runtime](#spring-boot-starter-runtime)
- [Docker runtime image](#docker-runtime-image)

### Spring Boot Starter runtime

This option is applicable for Spring Boot users. All you need to do is to include respective starter:

```xml
<dependency>
    <groupId>io.camunda.connector</groupId>
    <artifactId>spring-boot-starter-camunda-connectors</artifactId>
    <version>${version.connectors}</version>
</dependency>
<dependency>
    <groupId>org.myorg</groupId>
    <artifactId>connector-my-awesome</artifactId>
    <version>${version.connector-my-awesome}</version>
</dependency>
```

Upon starting your Spring Boot application, you will have a job worker connected to Zeebe, waiting to
receive jobs for your connectors.

### Docker runtime image

This option is applicable for those users who prefer Docker.

Make sure to have an orchestration cluster running. A good start is the [Camunda Distributions](https://github.com/camunda/camunda-distributions/tree/main/docker-compose) docker compose repository.

Clone the repository. Switch into the version folder you would like to run and start the cluster:

```shell
docker compose -f docker-compose.yaml up
```

The latest Connectors Docker images can be found at the [Docker Hub](https://hub.docker.com/r/camunda/connectors).

You can start the runtime including your Connector jar by running:

```shell
docker run --rm -i \
  -v $PWD/your-connector.jar:/opt/app/connector.jar \         # Add a connector jar to the classpath
  --network=camunda \                                         # Optional: Attach to the orchestration cluster Docker network
  -e CAMUNDA_CLIENT_GRPC_ADDRESS=http://orchestration:26500 \ # Specify cluster GRPC API address
  -e CAMUNDA_CLIENT_REST_ADDRESS=http://orchestration:8080 \  # Specify cluster REST API address
  camunda/connectors:X.Y.Z                                    # Connector docker image version
```

If you would like to disable inbound connectors, you can do so by setting `CAMUNDA_CONNECTOR_POLLING_ENABLED=false`.
