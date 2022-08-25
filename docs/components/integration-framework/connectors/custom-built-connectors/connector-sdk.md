---
id: connector-sdk
title: Connector SDK
description: Introduction to the Connector SDK.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
The **connector SDK** is in developer preview and subject to breaking changes. Use at your own risk.
:::

The **connector SDK** allows you to [develop custom connectors](#creating-a-custom-connector)
using Java code. You can focus on the logic of the connector, conveniently test it locally, and
reuse its runtime logic in multiple environments. The SDK achieves this by abstracting from
Camunda Platform 8 internals that usually come with
[job workers](../../../concepts/job-workers.md).

The SDK provides APIs for common connector operations, such as:

- Fetching and deserializing input data
- Validating input data
- Replacing secrets in input data

Beyond that, the SDK allows for [convenient testing](#testing) of your connector behavior and
[executing it in the environments](#runtime-environments) that suit your use cases best.

## Creating a custom connector

Using the connector SDK, you can create environment-agnostic, reusable connector runtime behavior.
This section will outline how to set up a connector project, test it, and run it locally.

### Setup

When developing a new connector we recommend using our
[custom connector template repository on GitHub](https://github.com/camunda/connector-template).
This template is a [Maven](https://maven.apache.org/)-based Java project, and you can use it the
way that fits best into your development flow:

- _Create your own GitHub repository_: Click the **Use this template** button and follow the steps.
  You can manage code changes in your new repository afterward.
- _Experiment locally_: Check out the source code to your local machine using [Git](https://git-scm.com/).
  You won't be able to check in code changes to the repository due to restricted write access.
- _Fetch the source_: Download the source code as a ZIP archive using **Code** > **Download ZIP**.
  You can adjust and manage the code the way you like afterward, using your chosen source code
  management tools.

If you want to manualy set up your connector project, include the following dependency to use the SDK.
Make sure to adhere to the project outline detailed in the next section.

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
  <version>0.1.0</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation 'io.camunda.connector:connector-core:0.1.0'
```

</TabItem>
</Tabs>

### Project outline

There are multiple parts to a connector that enable it to be reused, as a
reusable building block, for modeling and for the runtime behavior.
The following parts make up a connector:

```
my-connector
├── element-templates/
│   └── template-connector.json        (1)
├── src/main
│   ├── java/io/camunda/connector      (2)
│   │   ├── MyConnectorFunction.java   (3)
│   │   ├── MyConnectorRequest.java    (4)
│   │   └── MyConnectorResult.java     (5)
│   └── resources/META-INF/services
│       └── io.camunda.connector.api.ConnectorFunction (6)
└── pom.xml (7)
```

For the modeling building blocks, the connector provides at least one
[connector template](./connector-templates.md) with **(1)**.

You provide the runtime logic as Java source code under a directory like **(2)**.
Typically a connector runtime logic consists of

- Exactly one implementation of a `ConnectorFunction` with **(3)**
- At least one input data object like **(4)**
- At least one result object like **(5)**

For your connector function to be detectable you are required to expose your function class name in the
[`ConnectorFunction` SPI implementation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ServiceLoader.html)
with **(6)**.

A configuration file like **(7)** manages the project setup, including dependencies.
In this example, we include a Maven project's `POM` file. Other build tools like
[Gradle](https://gradle.org/) can also be used.

### Connector template

To create reusable building blocks for modeling, you must provide at least one
domain-specific [connector template](./connector-templates.md).

A connector template defines the binding to your connector runtime behavior via the following object:

```json
{
  "type": "Hidden",
  "value": "io.camunda:my-connector:1",
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

This type definition is the connection configuring which version of your connector runtime behavior to use.
In technical terms, this defines the **Type** of jobs created for tasks in your process model that use this template.
Consult the [job worker](../../../concepts/job-workers.md) guide to learn more.

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

You can easily deserialize these authentication properties into a domain object using the SDK.
Have a look at the [input data](#input-data) section for further insights.

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

These objects will create custom headers for the jobs created for the tasks that use this template.
The connector runtime environments will pick up those two custom headers and translate them into process variables accordingly.
You can see an example of how to use this in the [out-of-the-box REST connector](../out-of-the-box-connectors/rest.md#response).

### Runtime logic

To create a reusable runtime behavior for your connector, you are required to implement
and expose an implementation of the `ConnectorFunction` interface of the SDK. The connector runtime
environments will call this function. It handles input data, executes the connector's
business logic, and optionally returns a result. Exception handling is optional since the
connector runtime environments take care of this as a fallback.

The `ConnectorFunction` interface consists of exactly one `execute` method. A minimal recommended
outline of a connector function implementation looks as follows:

```java
package io.camunda.connector;

import io.camunda.connector.api.ConnectorContext;
import io.camunda.connector.api.ConnectorFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyConnectorFunction implements ConnectorFunction {

  private static final Logger LOGGER = LoggerFactory.getLogger(MyConnectorFunction.class);

  @Override
  public Object execute(ConnectorContext context) throws Exception {
    // (1)
    var connectorRequest = context.getVariablesAsType(MyConnectorRequest.class);

    // (2)
    context.validate(connectorRequest);
    // (3)
    context.replaceSecrets(connectorRequest);

    return executeConnector(connectorRequest);
  }

  private MyConnectorResult executeConnector(final MyConnectorRequest connectorRequest) {
    LOGGER.info("Executing my connector with request {}", connectorRequest);
    var result = new MyConnectorResult();
    // (4)
    result.setMyProperty("Message received: " + connectorRequest.getMessage());
    return result;
  }
}
```

The `execute` method receives all necessary environment data via the `ConnectorContext` object.
The connector runtime environment initializes the context. It allows to

- Fetch and deserialize the input data as shown in **(1)**. See [input data](#input-data) section for details.
- Validate the created request object as shown in **(2)**. See [validation](#validation) section for details.
- Replace secrets in the request object as shown in **(3)**. See [secrets](#secrets) section for details.

If the connector has a result to return, it can create a new result data object and set
its properties as shown in **(4)**.

Using this outline, you start the business logic of your connector in the `executeConnector` method
and expand from there.

#### Input data

The input data of a connector is provided by the process instance that executes the connector.
You can either fetch this data as a raw JSON String using the context's `getVariables` method
or deserialize the data into your own request object directly with the `getVariablesAsType`
method shown in **(1)**.

Using `getVariablesAsType` will attempt to deserialize the JSON String containing the input
data into Java objects. This deserialization depends on the connector runtime environment your
connector function runs in. Thus, use this deserialization approach with caution.
While it works reliably for many input data types like String, Boolean, Integer, and nested
objects, you might want to consider deserializing your connector's input data in a custom fashion
using `getVariables` and a library like [Gson](https://github.com/google/gson).

The `getVariablesAsType` method and tools like Gson can properly reflect nested data
objects. You can define nested structures by referencing other Java classes as attributes.
Looking at the `authentication` data input example described in the [connector template](#connector-template),
you can create the following input data objects to reflect the structure properly:

```java
package io.camunda.connector;

public class MyConnectorRequest {

  private String message;
  private Authentication authentication;
}
```

```java
package io.camunda.connector;

public class Authentication {

  private String user;
  private String token;
}
```

#### Validation

Validating input data is a common task in a connector function. Therefore, the SDK provides an
API to ensure the data conforms to the connector's requirements. To initiate the
validation from the connector function, use the `ConnectorContext` object's `validate` method
as shown in the [runtime logic](#runtime-logic) section:

```java
...
  @Override
  public Object execute(ConnectorContext context) throws Exception {
    ...
    // (2)
    context.validate(connectorRequest);
    ...
  }
...
```

This will instruct the context to prepare a validator and pass it to the object that needs
validation. To validate your input object `connectorRequest` using the API, it needs
to implement the `ConnectorInput` interface. Using this interface's `validateWith` method,
you can use the provided validator to ensure the data conforms to your requirements:

```java
package io.camunda.connector;

import io.camunda.connector.api.ConnectorInput;
import io.camunda.connector.api.Validator;

public class MyConnectorRequest implements ConnectorInput {

  private String message;
  private Authentication authentication;

  @Override
  public void validateWith(final Validator validator) {
    validator.require(message, "message");
    validateIfNotNull(authentication, validator);
  }
}
```

The validator contains convenience methods like `require` to allow for basic validations.
Furthermore, the `ConnectorInput` interface comes with convenience methods to allow handling
nested objects with `validateIfNotNull`. You can also integrate custom validations, adding
custom errors to the validator's list of errors.

```java
package io.camunda.connector;

import io.camunda.connector.api.ConnectorInput;
import io.camunda.connector.api.SecretStore;
import io.camunda.connector.api.Validator;
import java.util.Objects;

public class Authentication implements ConnectorInput {

  private String user;
  private String token;

  @Override
  public void validateWith(final Validator validator) {
    validator.require(user, "user");
    validator.require(token, "token");
    if (token != null && !token.startsWith("xobx")) {
      validator.addErrorMessage("Token must start with \"xobx\"");
    }
  }
}
```

Using this approach, you can validate your whole input data structure with one initial call from
the central connector function.

#### Secrets

Connectors that require confidential information to connect to external systems need to be able
to manage those securely. As described in the
[guide for creating secrets](../../../console/manage-clusters/manage-secrets.md), secrets can be
controlled in a secure location and referenced in a connector's properties using a placeholder
pattern `secrets.*`. To make this mechanism as robust as possible, secret handling comes with
the connector SDK out of the box. That way, all connectors can use the same standard way of
handling secrets in input data.

The SDK allows replacing secrets in input data as late as possible to avoid passing them around
in the environments that handle connector invocation. Therefore, we do not pass secrets into the
connector function in clear text but only as placeholders that you can replace from
within the connector function. To initiate the secret replacement from the connector function,
use the `ConnectorContext` object's `replaceSecrets` method as shown in the
[runtime logic](#runtime-logic) section:

```java
...
  @Override
  public Object execute(ConnectorContext context) throws Exception {
    ...
    // (3)
    context.replaceSecrets(connectorRequest);
    ...
  }
...
```

This will instruct the context to search for and replace secret placeholders in the object passed to it.
The secret store that is present in the connector runtime environment that invokes the connector function
takes care of that. Every environment can define its own way of providing such a secret store. Consult
the [runtime environments](#runtime-environments) section to learn more about them.

To replace secrets for the `connectorRequest` using the API, the object needs to implement the
`ConnectorInput` interface. Using this interface's `replaceSecrets` method, you can use the provided
`SecretStore` to search for and replace secrets in the properties that should support this in your
connector. Furthermore, the `ConnectorInput` interface comes with convenience methods to allow handling
nested objects as well with `replaceSecretsIfNotNull`:

```java
package io.camunda.connector;

import io.camunda.connector.api.ConnectorInput;
import io.camunda.connector.api.SecretStore;

public class MyConnectorRequest implements ConnectorInput {

  private String message;
  private Authentication authentication;

  @Override
  public void replaceSecrets(final SecretStore secretStore) {
    replaceSecretsIfNotNull(authentication, secretStore);
  }
}
```

```java
package io.camunda.connector;

import io.camunda.connector.api.ConnectorInput;
import io.camunda.connector.api.SecretStore;
import java.util.Objects;

public class Authentication implements ConnectorInput {

  private String user;
  private String token;

  @Override
  public void replaceSecrets(final SecretStore secretStore) {
    token = secretStore.replaceSecret(token);
  }
}
```

Using this approach, you can replace secrets in your whole input data structure with one
initial call from the central connector function.

## Testing

Ensuring your connector's business logic works as expected is vital to developing the connector.
The SDK aims to make testing of connectors convenient without imposing strict
requirements on your test development flow. The SDK is not enforcing any testing libraries.

By abstracting from Camunda Platform 8 internals, the SDK provides a good starting
ground for scoped testing. There is no need to test Camunda engine internals or provide related mocks.
You can focus on testing the business logic of your connector and the associated objects.

We recommend testing at least the following parts of your connector project:

- All data validation works as expected.
- All expected attributes support secret replacement.
- The core logic of your connector works as expected until calling the external API or service.

The SDK provides a `ConnectorContextBuilder` for test cases that lets you create a `ConnectorContext`.
You can conveniently use that test context to test the secret replacement and validation routines.

Writing secret replacement tests can look similar to the following test case. You can write one test
case for each attribute that supports secret replacement.

```java
@Test
void shouldReplaceTokenSecretWhenReplaceSecrets() {
  // given
  var input = new MyConnectorRequest();
  var auth = new Authentication();
  input.setMessage("Hello World!");
  input.setAuthentication(auth);
  auth.setToken("secrets.MY_TOKEN");
  auth.setUser("testuser");
  // (1)
  var context = ConnectorContextBuilder.create()
    .secret("MY_TOKEN", "token value")
    .build();
  // when
  context.replaceSecrets(input);
  // then
  assertThat(input)
    .extracting("authentication")
    .extracting("token")
    .isEqualTo("token value");
}
```

Ensuring validation routines work as expected can be written similarly for every attribute
that is required:

```java
@Test
void shouldFailWhenValidate_NoAuthentication() {
  // given
  var input = new MyConnectorRequest();
  input.setMessage("Hello World!");
  var context = ConnectorContextBuilder.create().build();
  // when
  assertThatThrownBy(() -> context.validate(input))
    // then
    .isInstanceOf(IllegalArgumentException.class)
    .hasMessageContaining("authentication");
}
```

Testing custom validations works in the same way:

```java
@Test
void shouldFailWhenValidate_TokenWrongPattern() {
  // given
  var input = new MyConnectorRequest();
  var auth = new Authentication();
  input.setMessage("foo");
  input.setAuthentication(auth);
  auth.setUser("testuser");
  auth.setToken("test");
  var context = ConnectorContextBuilder.create().build();
  // when
  assertThatThrownBy(() -> context.validate(input))
    // then
    .isInstanceOf(IllegalArgumentException.class)
    .hasMessageContaining("Token must start with \"xobx\"");
}
```

Testing the business logic of your connector can, of course, vary widely, depending on the
functionality it provides. For our example logic, the following test would be a good start:

```java
@Test
void shouldReturnReceivedMessageWhenExecute() throws Exception {
  // given
  var input = new MyConnectorRequest();
  var auth = new Authentication();
  input.setMessage("Hello World!");
  input.setAuthentication(auth);
  auth.setToken("xobx-test");
  auth.setUser("testuser");
  var function = new MyConnectorFunction();
  var context = ConnectorContextBuilder.create()
    .variables(input)
    .build();
  // when
  var result = function.execute(context);
  // then
  assertThat(result)
    .isInstanceOf(MyConnectorResult.class)
    .extracting("myProperty")
    .isEqualTo("Message received: Hello World!");
}
```

## Runtime environments

The connector SDK enables you to write environment-agnostic runtime behavior for connectors.
This makes the connector logic reusable in different setups without modifying your connector
code. To invoke this logic, you need a runtime environment that knows the connector function
and how to call it.

In Camunda Platform 8 SaaS, every cluster runs a component that knows the
[available out-of-the-box connectors](../out-of-the-box-connectors/available-connectors-overview.md)
and how to invoke them. This component is the runtime environment specific to Camunda's SaaS use case.

Regarding Self-Managed environments, you are responsible for providing the runtime environment that
can invoke the connectors. The connector SDK provides a
[pre-packaged environment](#pre-packaged-runtime-environment) and a
[connector job handler](#connector-job-handler) to make this situation as convenient as possible.

### Pre-packaged runtime environment

The SDK comes with a pre-packaged runtime environment that allows you to run select connector runtimes
as local job workers out-of-the-box. You can find this Java application in the
[SDK's GitHub repository](https://github.com/camunda/connector-sdk/tree/main/runtime-job-worker),
in [our artifact store](https://artifacts.camunda.com/ui/native/connectors/io/camunda/connector/connector-runtime-job-worker/),
and on [Maven Central](https://search.maven.org/artifact/io.camunda.connector/connector-runtime-job-worker).

You can start an instance of this runtime environment with the following command line, given that you
defined a Java runtime environment in your system under `java`:

```bash
ZEEBE_CONNECTOR_MESSAGE_TYPE=io.camunda:my-connector:1
ZEEBE_CONNECTOR_MESSAGE_VARIABLES=authentication,message
ZEEBE_CONNECTOR_MESSAGE_FUNCTION=io.camunda.connector.MyConnectorFunction

java -cp 'connector-runtime-job-worker.jar;connector-template.jar' \
    io.camunda.connector.runtime.jobworker.Main
```

The `ZEEBE_CONNECTOR_*` environment variables define the connectors that this application can invoke.
Those variables always come in triples, grouped by `<NAME>`:

- `ZEEBE_CONNECTOR_<NAME>_TYPE` - The job type this connector handles. You define this in the
  [connector template](#connector-template).
- `ZEEBE_CONNECTOR_<NAME>_VARIABLES` - The process variables to pass to the connector function.
  This usually maps to the attributes that your [input data](#input-data) object defines.
- `ZEEBE_CONNECTOR_<NAME>_FUNCTION` - The fully qualified class name of your
  [connector function](#runtime-logic).

You can pass all the JAR files of the connector runtimes that should be invokable by the environment
in the `-cp` argument of the Java call.

This starts a Zeebe client, registering the defined connectors as job workers. By default, it
connects to a local Zeebe instance at port `26500`. You can configure the Zeebe client using
the [standard Zeebe environment variables](../../../../apis-clients/java-client/index.md#bootstrapping).

Providing secrets to the environment can be achieved in two ways:

- Define secrets as environment variables, e.g., via command line `export MY_SECRET='foo'`.
- Create your own implementation of the `io.camunda.connector.api.SecretProvider` interface that
  comes with the SDK. Package this class as a JAR, including a file
  `META-INF/services/io.camunda.connector.api.SecretProvider` that contains the fully qualified
  class name of your secret provider implementation. Add this JAR to the `-cp` argument of the
  Java call. Your secret provider will serve secrets as implemented.

### Connector job handler

If using the pre-packaged runtime environment that comes with the SDK does not fit your use case,
you can create a custom runtime environment. To wrap [connector functions](#runtime-logic) as job
workers conveniently, the SDK provides the wrapper class `ConnectorJobHandler`.

The job handler wrapper provides the following benefits:

- Provides a `ConnectorContext` that handles the Camunda-internal job worker API regarding variables.
- Handles secret management by defaulting to an environment variables-based secret store and
  allowing to provide a custom secret provider via an SPI for `io.camunda.connector.api.SecretProvider`.
- Handles connector result mapping for **Result Variable** and **Result Expression** as described
  in the [connector template](#connector-template) section.

Using the wrapper class, you can create a custom [Zeebe client](../../../../apis-clients/working-with-apis-clients.md).
For example, you can spin up a custom client with the
[Zeebe Java client](../../../../apis-clients/java-client/index.md) as follows:

```java
import io.camunda.connector.MyConnectorFunction
import io.camunda.connector.runtime.jobworker.ConnectorJobHandler;
import io.camunda.zeebe.client.ZeebeClient;

public class Main {

  public static void main(String[] args) {

    var zeebeClient = ZeebeClient.newClientBuilder().build();

    zeebeClient.newWorker()
        .jobType("io.camunda:my-connector:1")
        .handler(new ConnectorJobHandler(new MyConnectorFunction()))
        .name("MESSAGE")
        .fetchVariables("authentication", "message")
        .open();
  }
}
```

If the provided job handler wrapper does not fit your needs, you can easily extend or replace
it with your job handler implementation that takes care of invoking the connector functions.
Your custom job handler needs to create a `ConnectorContext` that the connector function can use
to handle variables, secrets, and connector results.
