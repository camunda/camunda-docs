---
id: connector-sdk
title: Connector SDK
description: The Connector SDK allows you to develop custom Connectors using Java code. Focus on the logic of the Connector, test it locally, and reuse its runtime logic.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
The **Connector SDK** is in developer preview and subject to breaking changes. Use at your own risk.
:::

The **Connector SDK** allows you to [develop custom Connectors](#creating-a-custom-connector)
using Java code. You can focus on the logic of the Connector, test it locally, and
reuse its runtime logic in multiple environments. The SDK achieves this by abstracting from
Camunda Platform 8 internals that usually come with
[job workers](../../concepts/job-workers.md).

The SDK provides APIs for common Connector operations, such as:

- Fetching and deserializing input data
- Validating input data
- Replacing secrets in input data

Additionally, the SDK allows for convenient [testing](#testing) of your Connector behavior and
[executing it in the environments](#runtime-environments) that suit your use cases best.

## Creating a custom Connector

Using the Connector SDK, you can create environment-agnostic and reusable Connector runtime behavior.
This section outlines how to set up a Connector project, test it, and run it locally.

### Setup

When developing a new Connector, we recommend using our
[custom Connector template repository on GitHub](https://github.com/camunda/connector-template).
This template is a [Maven](https://maven.apache.org/)-based Java project, and can be used in various
ways such as:

- _Create your own GitHub repository_: Click **Use this template** and follow the prompted steps.
  You can manage code changes in your new repository afterward.
- _Experiment locally_: Check out the source code to your local machine using [Git](https://git-scm.com/).
  You won't be able to check in code changes to the repository due to restricted write access.
- _Fetch the source_: Download the source code as a ZIP archive using **Code** > **Download ZIP**.
  You can adjust and manage the code the way you like afterward, using your chosen source code
  management tools.

To manually set up your Connector project, include the following dependency to use the SDK.
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
  <version>0.3.0</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation 'io.camunda.connector:connector-core:0.3.0'
```

</TabItem>
</Tabs>

### Project outline

There are multiple parts of a Connector that enables it for reuse, as a
reusable building block, for modeling, and for the runtime behavior.
The following parts make up a Connector:

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
│       └── io.camunda.connector.api.outbound.OutboundConnectorFunction (6)
└── pom.xml (7)
```

For the modeling building blocks, the Connector provides
[Connector templates](./connector-templates.md) with **(1)**.

You provide the runtime logic as Java source code under a directory like **(2)**.
Typically, a Connector runtime logic consists of the following:

- Exactly one implementation of a `OutboundConnectorFunction` with **(3)**.
- At least one input data object like **(4)**.
- At least one result object like **(5)**.

For a detectable Connector function, you are required to expose your function class name in the
[`OutboundConnectorFunction` SPI implementation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ServiceLoader.html)
with **(6)**.

A configuration file like **(7)** manages the project setup, including dependencies.
In this example, we include a Maven project's `POM` file. Other build tools like
[Gradle](https://gradle.org/) can also be used.

### Connector template

To create reusable building blocks for modeling, you are required to provide a
domain-specific [Connector template](./connector-templates.md).

A Connector template defines the binding to your Connector runtime behavior via the following object:

```json
{
  "type": "Hidden",
  "value": "io.camunda:template:1",
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

This type definition `io.camunda:template:1` is the connection configuring which version of your Connector runtime behavior to use.
In technical terms, this defines the **Type** of jobs created for tasks in your process model that use this template.
Consult the [job worker](../../concepts/job-workers.md) guide to learn more.

Besides the type binding, Connector templates also define the input variables of your Connector as `zeebe:input` objects.
For example, you can create the input variable `message` of your Connector in the element template as follows:

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
Visit the [input data](#input-data) section for further details.

Connectors that offer any kind of result from their invocation should allow users to configure
how to map the result into their processes. Therefore, Connector templates can reuse the two
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
The Connector runtime environments pick up those two custom headers and translate them into process variables accordingly.
You can see an example of how to use this in the [out-of-the-box REST Connector](../out-of-the-box-connectors/rest.md#response).

All Connectors are recommended to offer exception handling to allow users to configure how to map results and technical errors into
BPMN errors. To provide this, Connector templates can reuse the recommended object **Result Expression**:

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

This object creates custom headers for the jobs created for the tasks that use this template.
The Connector runtime environments pick up this custom header and translate it into BPMN errors accordingly.
You can see an example of how to use this in the [BPMN errors in Connectors guide](../use-connectors.md#bpmn-errors).

### Runtime logic

To create a reusable runtime behavior for your Connector, you are required to implement
and expose an implementation of the `OutboundConnectorFunction` interface of the SDK. The Connector runtime
environments will call this function; it handles input data, executes the Connector's
business logic, and optionally returns a result. Exception handling is optional since the
Connector runtime environments handle this as a fallback.

The `OutboundConnectorFunction` interface consists of exactly one `execute` method. A minimal recommended
outline of a Connector function implementation looks as follows:

```java
package io.camunda.connector;

import io.camunda.connector.api.annotation.OutboundConnector;
import io.camunda.connector.api.error.ConnectorException;
import io.camunda.connector.api.outbound.OutboundConnectorContext;
import io.camunda.connector.api.outbound.OutboundConnectorFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@OutboundConnector(
    name = "MYCONNECTOR",
    inputVariables = {"myProperty", "authentication"},
    type = "io.camunda:template:1"
)
public class MyConnectorFunction implements OutboundConnectorFunction {

  private static final Logger LOGGER = LoggerFactory.getLogger(MyConnectorFunction.class);

  @Override
  public Object execute(OutboundConnectorContext context) throws Exception {
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
    String message = connectorRequest.getMessage();
    // (4)
    if (message != null && message.toLowerCase().startsWith("fail")) {
      throw new ConnectorException("FAIL", "My property started with 'fail', was: " + message);
    }
    var result = new MyConnectorResult();

    // (5)
    result.setMyProperty("Message received: " + message);
    return result;
  }
}
```

The `execute` method receives all necessary environment data via the `OutboundConnectorContext` object.
The Connector runtime environment initializes the context and allows the following to occur:

- Fetch and deserialize the input data as shown in **(1)**. See the [input data](#input-data) section for details.
- Validate the created request object as shown in **(2)**. See the [validation](#validation) section for details.
- Replace secrets in the request object as shown in **(3)**. See the [secrets](#secrets) section for details.

If the Connector handles exceptional cases, it can use any exception to express technical errors. If a technical
error should be associated with a specific error code, the Connector can throw a `ConnectorException` and define
a `code` as shown in **(4)**.
We recommend documenting the list of error codes as part of the Connector's API. Users can build on those codes
by creating [BPMN errors](../use-connectors.md#bpmn-errors) in their Connector configurations.

If the Connector has a result to return, it can create a new result data object and set
its properties as shown in **(5)**.

For best interoperability, Connector functions provide default meta-data via the `@OutboundConnector` annotation.
Connector runtime environments can use this data to auto-discover provided Connector runtime behavior.

Using this outline, you start the business logic of your Connector in the `executeConnector` method
and expand from there.

#### Input data

The input data of a Connector is provided by the process instance that executes the Connector.
You can either fetch this data as a raw JSON string using the context's `getVariables` method,
or deserialize the data into your own request object directly with the `getVariablesAsType`
method shown in **(1)**.

Using `getVariablesAsType` will attempt to deserialize the JSON string containing the input
data into Java objects. This deserialization depends on the Connector runtime environment your
Connector function runs in.

Thus, use this deserialization approach with caution.
While it works reliably for many input data types like string, boolean, integer, and nested
objects, you might want to consider deserializing your Connector's input data in a custom fashion
using `getVariables` and a library like [Gson](https://github.com/google/gson).

The `getVariablesAsType` method and tools like Gson can properly reflect nested data
objects. You can define nested structures by referencing other Java classes as attributes.
Looking at the `authentication` data input example described in the [Connector template](#connector-template),
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

Validating input data is a common task in a Connector function. The SDK provides an
API to help you ensure the data conforms to your Connector's input requirements. A
default implementation of the SDK's core validation API is provided in a separate,
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
  <version>0.3.0</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation 'io.camunda.connector:connector-validation:0.3.0'
```

</TabItem>
</Tabs>

To initiate the validation from the Connector function, use the `OutboundConnectorContext`
object's `validate` method as shown in the [runtime logic](#runtime-logic) section:

```java
...
  @Override
  public Object execute(OutboundConnectorContext context) throws Exception {
    ...
    // (2)
    context.validate(connectorRequest);
    ...
  }
...
```

This instructs the context to prepare a validator that is provided by an implementation
of the `ValidationProvider` interface. The `connector-validation` artifact brings along
such an implementation. It uses the [Jakarta Bean Validation API](https://beanvalidation.org/)
together with [Hibernate Validator](https://hibernate.org/validator/).

To validate your input object `connectorRequest` using the API, you need to annotate the input's
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
the central Connector function.

Beyond that, the Jakarta Bean Validation API supports more advanced constructs like
[groups](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#constraintdeclarationvalidationprocess-groupsequence)
for conditional validation and constraints on different types, i.e., attributes, methods, and classes,
to enable [cross-parameter validation](https://www.baeldung.com/javax-validation-method-constraints).
You can use the built-in constraints and create custom ones to define requirements exactly as
you need them.

If the validation approach that comes with `connector-validation` doesn't fit your needs, you
can provide your own SPI implementing the SDK's `ValidationProvider` interface. Have a look at
the [connector validation code](https://github.com/camunda/connector-sdk/tree/main/validation)
for a default implementation.

##### Conditional validation

Validating Connector input data can require to check different constraints, depending on the
specific input data itself. As an example, the following `authentication` input object requires
that `oauthToken` is only necessary when the `type` is `oauth`. If the type is `basic`, the
attribute `password` is required instead.

```java
public class Authentication {

  private String type;
  private String user;
  private String password;
  private String oauthToken;
}
```

Using the `connector-validation` module, there are three common options to achieve this conditional validation:

1. Write a [custom constraint](#custom-constraint) that allows to validate one attribute in relation to another attribute.
   This appraoch yields a reusable constraint that you can use in other classes as well. This approach also comes with the highest
   implementation effort.
1. Write [manual, imperative validation logic](#manual-validation-method) in a method with a boolean return value and annotate
   it with `@AssertTrue`. You require less code to take this appraoch but the result is also specifc to the respective class. You
   cannot reuse the logic in other classes as is. This approach also comes without further constraint annotation support. You have
   to write all validation logic manually in the method.
1. Define [validation groups dynamically](#dynamic-validation-groups) with Hibernate Validator's `@DefaultGroupSequenceProvider`.
   This appraoch allows to reuse existing constraint annotations and to only apply them for specific use cases. It has a
   higher complexity than an imperative validation method but allows to reuse existing constraints to avoid writing manual
   validation logic.

Each option has its own benefits and drawbacks, depending on what you need in your Connector. The following sections
cover each of the options in more detail.

###### Custom constraint

The [Bean Validation guide](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#constraintsdefinitionimplementation)
covers defining **custom constraints** extensively. For the use case described above, you could
write a custom constraint like the following:

```java
@Target({TYPE, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Repeatable(NotNullIfAnotherFieldHasValue.List.class)
@Constraint(validatedBy = NotNullIfAnotherFieldHasValueValidator.class)
@Documented
public @interface NotNullIfAnotherFieldHasValue {

    String fieldName();
    String fieldValue();
    String dependFieldName();

    String message() default "{NotNullIfAnotherFieldHasValue.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    @Target({TYPE, ANNOTATION_TYPE})
    @Retention(RUNTIME)
    @Documented
    @interface List {
        NotNullIfAnotherFieldHasValue[] value();
    }

}
```

You can use this constraint on the Connector input object as follows:

```java
@NotNullIfAnotherFieldHasValue(
    fieldName = "type",
    fieldValue = "oauth",
    dependFieldName = "oauthToken")
@NotNullIfAnotherFieldHasValue(
    fieldName = "type",
    fieldValue = "basic",
    dependFieldName = "password")
public class Authentication {

  @NotEmpty
  private String type;
  @NotEmpty
  private String user;
  private String password;
  private String oauthToken;
}
```

You can find more details and the `NotNullIfAnotherFieldHasValueValidator` implementation in
[this StackOverflow thread](https://stackoverflow.com/questions/9284450/jsr-303-validation-if-one-field-equals-something-then-these-other-fields-sho/9287796#9287796).

This approach is the most flexible and reusable one for writing conditional constraints. It is
independent from the parameters and classes involved. However, for simple use cases, one of the
following approaches might lead to more maintainable results that require less code.

###### Manual validation method

The Jakarta Bean Validation API comes with an
[AssertTrue](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#builtinconstraints-asserttrue)
constraint that you can use to ensure boolean attributes are enabled.

The nature of the bean validation API allows to also use this annotation on methods. Those usually
are the getter methods for boolean attributes. However, there doesn't have to be a related boolean
attribute in an object in order to validate a method constraint. Thus, you can use this constraint
to also write manual validation logic in a method that returns a boolean value and starts with `is`.

For the example use case, you can write a method that verifies the requirements as follows:

```java
public class Authentication {

  @NotEmpty private String type;
  @NotEmpty private String user;
  private String password;
  private String oauthToken;

  @AssertTrue(message = "Authentication must contain 'oauthToken' for type 'oauth' and 'password' for type 'basic'")
  public boolean isAuthValid() {
    return ("basic".equals(type) && password != null) ||
        ("oauth".equals(type) && oauthToken != null);
  }
}
```

This approach allows for concise conditional validation when the constraint logic is simple
and does not justify creating more complex, reusable interfaces and validators.

###### Dynamic validation groups

The Jakarta Bean Validation API allows to statically define validation
[groups](https://jakarta.ee/specifications/bean-validation/2.0/bean-validation_2.0.html#constraintdeclarationvalidationprocess-groupsequence)
for conditional constraint evaluation. However, to use those groups you have to define the
group to validate statically when starting the validation. To dynamically define the groups to
validate, you can use Hibernate Validator's
[DefaultGroupSequenceProvider](https://docs.jboss.org/hibernate/validator/6.2/reference/en-US/html_single/#_code_groupsequenceprovider_code).

Given the following validation groups:

```java
public interface BasicAuthValidation {}
public interface OAuthValidation {}
```

You can annotate the input object as follows:

```java
@GroupSequenceProvider(AuthenticationSequenceProvider.class)
public class Authentication {

  @NotEmpty private String type;
  @NotEmpty private String user;
  @NotEmpty(groups = BasicAuthValidation.class)
  private String password;
  @NotEmpty(groups = OAuthValidation.class)
  private String oauthToken;
```

The `AuthenticationSequenceProvider` needs to implement the `DefaultGroupSequenceProvider` to
dynamically add the validation groups you need:

```java
public class AuthenticationSequenceProvider implements DefaultGroupSequenceProvider<Authentication> {

  @Override
  public List<Class<?>> getValidationGroups(Authentication authentication) {

    List<Class<?>> sequence = new ArrayList<>();

    // Apply all validation rules from Default group, e.g. ensuring type is not empty
    sequence.add(Authentication.class);

    if ("basic".equals(authentication.getType())) {
      sequence.add(BasicAuthValidation.class);
    } else if ("oauth".equals(authentication.getType())) {
      sequence.add(OAuthValidation.class);
    }

    return sequence;
  }
}
```

Using this approach, you can reuse existing constraint annotations in your input objects.
The sequence provider is however bound to your specific input class and therefore less reusable
than writing custom constraints.

#### Secrets

Connectors that require confidential information to connect to external systems need to be able
to manage those securely. As described in the
[guide for creating secrets](../../console/manage-clusters/manage-secrets.md), secrets can be
controlled in a secure location and referenced in a Connector's properties using a placeholder
pattern `secrets.*`. To make this mechanism as robust as possible, secret handling comes with
the Connector SDK out of the box. That way, all Connectors can use the same standard way of
handling secrets in input data.

The SDK allows replacing secrets in input data as late as possible to avoid passing them around
in the environments that handle Connector invocation. We do not pass secrets into the
Connector function in clear text but only as placeholders that you can replace from
within the Connector function.

To initiate the secret replacement from the Connector function,
use the `OutboundConnectorContext` object's `replaceSecrets` method as shown in the
[runtime logic](#runtime-logic) section:

```java
...
  @Override
  public Object execute(OutboundConnectorContext context) throws Exception {
    ...
    // (3)
    context.replaceSecrets(connectorRequest);
    ...
  }
...
```

This will instruct the context to search for and replace secret placeholders in the object passed to it.
The secret store present in the Connector runtime environment that invokes the Connector function
takes care of that. Every environment can define its own way of providing such a secret store. Consult
the [runtime environments](#runtime-environments) section to learn more about them.

To replace secrets in the `connectorRequest` using the API, you need to annotate the object's
attributes that can hold secrets with `@Secret`. This instructs the SDK to search for and replace
secrets in the annotated properties. You can use the `@Secret` annotation on String fields
and container types. Using the annotation on container objects will lead to
graph traversal until either no further matching annotation is found or the annotated property
is of type String. Annotating properties that are neither a String nor a container will lead to runtime exceptions.

```java
package io.camunda.connector;

import io.camunda.connector.api.annotation.Secret;

public class MyConnectorRequest {

  private String message;
  @Secret private Authentication authentication;
}
```

```java
package io.camunda.connector;

import io.camunda.connector.api.annotation.Secret;

public class Authentication {

  private String user;
  @Secret private String token;
}
```

Using this approach, you can replace secrets in your whole input data structure with one
initial call from the central Connector function.

## Testing

Ensuring your Connector's business logic works as expected is vital to develop the Connector.
The SDK aims to make testing of Connectors convenient without imposing strict
requirements on your test development flow. The SDK is not enforcing any testing libraries.

By abstracting from Camunda Platform 8 internals, the SDK provides a good starting
ground for scoped testing. There is no need to test Camunda engine internals or provide related mocks.
You can focus on testing the business logic of your Connector and the associated objects.

We recommend testing at least the following parts of your Connector project:

- All data validation works as expected.
- All expected attributes support secret replacement.
- The core logic of your Connector works as expected until calling the external API or service.

The SDK provides a `OutboundConnectorContextBuilder` for test cases that lets you create a `OutboundConnectorContext`.
You can conveniently use that test context to test the secret replacement and validation routines.

Writing secret replacement tests can look similar to the following test case. You can write one test
case for each attribute that supports secret replacement:

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
  var context = OutboundConnectorContextBuilder.create()
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
  var context = OutboundConnectorContextBuilder.create().build();
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
  var context = OutboundConnectorContextBuilder.create().build();
  // when
  assertThatThrownBy(() -> context.validate(input))
    // then
    .isInstanceOf(IllegalArgumentException.class)
    .hasMessageContaining("Token must start with \"xobx\"");
}
```

Testing the business logic of your Connector can vary widely depending on the
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
  var context = OutboundConnectorContextBuilder.create()
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

The Connector SDK enables you to write environment-agnostic runtime behavior for Connectors.
This makes the Connector logic reusable in different setups without modifying your Connector
code. To invoke this logic, you need a runtime environment that knows the Connector function
and how to call it.

In Camunda Platform 8 SaaS, every cluster runs a component that knows the
[available out-of-the-box connectors](../out-of-the-box-connectors/available-connectors-overview.md)
and how to invoke them. This component is the runtime environment specific to Camunda's SaaS use case.

Regarding Self-Managed environments, you are responsible for providing the runtime environment that
can invoke the Connectors. The Connector SDK provides a
[pre-packaged environment](#pre-packaged-runtime-environment) and means to create a
[custom environment](#custom-runtime-environment) to make this situation as convenient as possible.

### Pre-packaged runtime environment

The SDK comes with a pre-packaged runtime environment that allows you to run select Connector runtimes
as local job workers out-of-the-box. You can find this Java application on
[Maven Central](https://search.maven.org/artifact/io.camunda/spring-zeebe-connector-runtime).

Refer to the [Self-Managed installation guide](/self-managed/connectors-deployment/install-and-start.md) for details on how to
set up this runtime environment.

### Custom runtime environment

If using the pre-packaged runtime environment that comes with the SDK does not fit your use case,
you can create a custom runtime environment. There are three options that come with the SDK:

- Create a custom job worker using Spring Zeebe.
- Wrap Connector functions as job workers using the `ConnectorJobHandler`.
- Implement your own Connector function wrapper.

#### Spring Zeebe

Being a Spring-wrapper around the [Zeebe Java client](/apis-clients/java-client/index.md), Spring Zeebe supports
[running outbound Connectors](https://github.com/camunda-community-hub/spring-zeebe/#run-outboundconnectors) out of the box.
You can expose them as Spring beans in your Spring application and Spring Zeebe picks them up and runs them automatically.
Using this approach, you can run multiple Connector functions in one Java application.

Spring Zeebe uses the `ConnectorJobHandler` and thus supports all functionality the [pre-packaged environment](#pre-packaged-runtime-environment)
provides as well. It allows you to reuse this functionality in your own Spring or Spring Boot-based setup.

#### Connector job handler

To wrap [Connector functions](#runtime-logic) as job workers, the SDK provides the wrapper class `ConnectorJobHandler`.
Spring Zeebe uses this handler as detailed above and the [pre-packaged environment](#pre-packaged-runtime-environment)
packages a Spring Zeebe application to provide its functionality.

The job handler wrapper provides the following benefits:

- Provides an `OutboundConnectorContext` that handles the Camunda-internal job worker API regarding variables.
- Handles secret management by defaulting to an environment variables-based secret store and
  allowing to provide a custom secret provider via an SPI for `io.camunda.connector.api.secret.SecretProvider`.
- Handles Connector result mapping for **Result Variable** and **Result Expression** as described
  in the [Connector template](#connector-template) section.
- Provides flexible BPMN error handling via **Error Expression** as described in the
  [Connector template](#connector-template) section.

Using the wrapper class, you can create a custom [Zeebe client](../../../apis-clients/working-with-apis-clients.md).
For example, you can spin up a custom client with the
[Zeebe Java client](../../../apis-clients/java-client/index.md) as follows:

```java
import io.camunda.connector.MyConnectorFunction
import io.camunda.connector.runtime.jobworker.outbound.ConnectorJobHandler;
import io.camunda.zeebe.client.ZeebeClient;

public class Main {

  public static void main(String[] args) {

    var zeebeClient = ZeebeClient.newClientBuilder().build();

    zeebeClient.newWorker()
        .jobType("io.camunda:template:1")
        .handler(new ConnectorJobHandler(new MyConnectorFunction()))
        .name("MESSAGE")
        .fetchVariables("authentication", "message")
        .open();
  }
}
```

#### Custom function wrapper

If the provided job handler wrapper does not fit your needs, you can extend or replace
it with your job handler implementation that handles invoking the Connector functions.

Your custom job handler needs to create a `OutboundConnectorContext` that the Connector
function can use to handle variables, secrets, and Connector results. You can extend the
provided `io.camunda.connector.impl.outbound.AbstractConnectorContext` to quickly gain access
to most of the common context operations.
