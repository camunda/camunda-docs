---
id: index
title: "Java client"
sidebar_label: "Quick reference"
description: "Provide a job worker that handles polling for available jobs, use SLF4J for logging useful notes, and more."
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
  private static final String zeebeGrpc = "[Zeebe Address e.g. grpcs://f887f1a6-7c2b-48ce-809a-e11e5a6ba31a.dsm-1.zeebe.camunda.io:443]";
  private static final String zeebeRest = "[Zeebe Address e.g. https://dsm-1.zeebe.camunda.io/f887f1a6-7c2b-48ce-809a-e11e5a6ba31a]";
  private static final String audience = "[Zeebe Token Audience, e.g., zeebe.camunda.io]";
  private static final String clientId = "[Client ID, e.g., FmT7K8gVv_FcwiUhc8U-fAJ9wph0Kn~P]";
  private static final String clientSecret = "[Client Secret]";
  private static final String oAuthAPI = "[OAuth API, e.g., https://login.cloud.camunda.io/oauth/token] ";
  private static final String resourceIndicator = "[optional resource indicator]";

  public static void main(String[] args) {
    OAuthCredentialsProvider credentialsProvider =
        new OAuthCredentialsProviderBuilder()
            .authorizationServerUrl(oAuthAPI)
            .audience(audience)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .resource(resourceIndicator)
            .build();

    try (ZeebeClient client = ZeebeClient.newClientBuilder()
            .grpcAddress(URI.create(zeebeGrpc))
            .restAddress(URI.create(zeebeRest))
            .credentialsProvider(credentialsProvider)
            .build()) {
      client.newTopologyRequest().send().join();
    }
  }
```

Let's go over this code snippet line by line:

1. Declare a few variables to define the connection properties. These values can be taken from the connection information on the **Client Credentials** page. Note that `clientSecret` is only visible when you create the client credentials.
2. Create the credentials provider for the OAuth protocol. This is needed to authenticate your client.
3. Create the client by passing in the address of the cluster we want to connect to and the credentials provider from the step above. Note that a client should be closed after usage, which is easily achieved by the try-with-resources statement.
4. Send a test request to verify the connection was established.

Refer to [io.camunda.zeebe.client.ZeebeClientBuilder](https://javadoc.io/doc/io.camunda/zeebe-client-java/latest/io/camunda/zeebe/client/ZeebeClientBuilder.html) for a description of all available configuration properties.

Another (more compact) option is to pass in the connection settings via environment variables:

```bash
export ZEEBE_GRPC_ADDRESS='[Zeebe gRPC Address]'
export ZEEBE_REST_ADDRESS='[Zeebe REST Address]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
export ZEEBE_TOKEN_RESOURCE='[optional resource indicator]'
```

When you create client credentials in Camunda 8, you have the option to download a file with the lines above filled out for you.

Given these environment variables, you can instantiate the client as follows:

```java
ZeebeClient client =
    ZeebeClient.newClientBuilder()
        .grpcAddress(System.getenv("ZEEBE_GRPC_ADDRESS"))
        .restAddress(System.getenv("ZEEBE_REST_ADDRESS"))
        .build();
```

:::note
Ensure you provide `grpcAddress` and `restAddress` in absolute URI format: `scheme://host(:port)`.
:::

## Javadoc

The official Java client library API documentation can be found [here](https://javadoc.io/doc/io.camunda/zeebe-client-java). These are standard Javadocs, so your favorite JVM IDE will be able to install them locally as well.

## Next steps

- [Getting Started Guide](https://github.com/camunda/camunda-platform-get-started): A comprehensive tutorial that covers Camunda Modeler, Operate, and the Java client.
- [Job worker](job-worker.md): An introduction to the Java client's job worker.
- [Logging](logging.md): An introduction to configuring logging for a Zeebe client.
- [Writing tests](zeebe-process-test.md): An introduction to unit testing processes.
- [Examples](apis-tools/java-client-examples/index.md): A collection of specific examples for different use cases.
