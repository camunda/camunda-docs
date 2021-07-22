---
id: index
title: "Java client"
sidebar_label: "Quick reference"
---

## Dependencies

To use the Java client library, declare the following Maven dependency in your project:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>zeebe-client-java</artifactId>
  <version>${zeebe.version}</version>
</dependency>
```

If you are using Gradle, declare the following:

```groovy
implementation 'io.camunda:zeebe-client-java:${zeebe.version}'
```

Use the latest released version from [Maven Central](https://search.maven.org/artifact/io.camunda/zeebe-client-java).

## Spring Integration

If you build a Spring or Spring Boot application, you might want to use [Spring Zeebe](../other-clients/spring) instead of handling the lifecycle and configuration of the Java client yourself (as described in the following paragraphs). 

## Bootstrapping

In Java code, instantiate the client as follows:

```java
  private static final String zeebeAPI = "[Zeebe API]";
  private static final String clientId = "[Client ID]";
  private static final String clientSecret = "[Client Secret]";
  private static final String oAuthAPI = "[OAuth API] ";

  public static void main(String[] args) {
    OAuthCredentialsProvider credentialsProvider =
        new OAuthCredentialsProviderBuilder()
            .authorizationServerUrl(oAuthAPI)
            .audience(zeebeAPI)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .build();

    ZeebeClient client =
        ZeebeClient.newClientBuilder()
            .gatewayAddress(zeebeAPI)
            .credentialsProvider(credentialsProvider)
            .build();

    client.newTopologyRequest().send().join();
  }
```

Let's go over this code snippet line by line:

- First we declare a couple of variables to define the connection properties. These values can be taken from the connection info on the _Client Credentials_ page. Note that `clientSecret` is only visible when you create the client credentials.
- Next we create the credentials provider for the OAuth protocol. This is needed to authenticate your client.
- Next we create the client passing in the address of the cluster we want to connect to as well as the credentials provider from the step above.
- Finally, we send a test request to verify that the connection was established.

See `io.camunda.zeebe.client.ZeebeClientBuilder` for a description of all available configuration properties.

Another, more compact, option is to pass in the connection settings via environment variables:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

When you create client credentials in Camunda Cloud you have the option to download a file with the lines above filled out for you.

Given these environment variables, you can instantiate the client as follows:

```java
ZeebeClient client =
    ZeebeClient.newClientBuilder()
        .gatewayAddress(System.getenv("ZEEBE_ADDRESS"))
        .build();
```

## Next Steps

- [Getting started guide](https://github.com/camunda-cloud/camunda-cloud-get-started) - Comprehensive tutorial that covers Camunda Modeler, Operate and the Java client.
- [Job worker](job-worker.md) - Introduction to the Java client's job worker
- [Logging](logging.md) - Introduction on how to configure logging for Zeebe client
- [Writing tests](testing.md) - Introduction to writing tests that use an embedded version of the workflow engine
- [Examples](../java-client-examples/index.md) - Collection of specific examples for different use cases
