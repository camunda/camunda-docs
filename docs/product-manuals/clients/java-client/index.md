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

1. First, we declare a few variables to define the connection properties. These values can be taken from the connection information on the **Client Credentials** page. Note that `clientSecret` is only visible when you create the client credentials.
2. Next, we create the credentials provider for the OAuth protocol. This is needed to authenticate your client.
3. Next, we create the client by passing in the address of the cluster we want to connect to and the credentials provider from the step above.
4. Finally, we send a test request to verify the connection was established.

See **io.camunda.zeebe.client.ZeebeClientBuilder** for a description of all available configuration properties.

[//]:# (Can we link to the location above?)

Another—more compact—option is to pass in the connection settings via environment variables:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

When you create client credentials in Camunda Cloud, you have the option to download a file with the lines above filled out for you.

Given these environment variables, you can instantiate the client as follows:

```java
ZeebeClient client =
    ZeebeClient.newClientBuilder()
        .gatewayAddress(System.getenv("ZEEBE_ADDRESS"))
        .build();
```

## Next Steps

- [Getting Started Guide](https://github.com/camunda-cloud/camunda-cloud-get-started): A comprehensive tutorial that covers Camunda Modeler, Operate, and the Java client.
- [Job Worker](job-worker.md): An introduction to the Java client's job worker.
- [Logging](logging.md): An introduction to configuring logging for a Zeebe client.
- [Writing Tests](testing.md): An introduction to writing tests that use an embedded version of the workflow engine.
- [Examples](../java-client-examples/index.md): A collection of specific examples for different use cases.
