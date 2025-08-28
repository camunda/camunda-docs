---
id: getting-started
title: "Java client"
sidebar_label: "Getting started"
description: "Provide a job worker that handles polling for available jobs, use SLF4J for logging useful notes, and more."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Camunda Java Client is the official Java library for building process applications that integrate with Camunda 8. Whether you are orchestrating microservices, managing human tasks, or visualizing process data, this client provides everything needed to interact with the Orchestration Cluster programmatically.

The Camunda Java Client is part of the Camunda 8 [public API](/reference/public-api.md) and follows [Semantic Versioning](https://semver.org/) (except for alpha features). Minor and patch releases will not introduce breaking changes.

## What is the Camunda Java Client?

The Camunda Java Client is a comprehensive library enabling Java developers to:

- **Deploy processes and decisions** to Camunda 8 clusters
- **Start and manage processes** programmatically
- **Implement job workers** to handle automated tasks within your processes
- **Query and manage process data** via the Orchestration Cluster API

It supports both REST and gRPC protocols, authentication setup, and provides robust error handling with retry mechanisms.

:::info Migration from Zeebe Java Client
**The Camunda Java Client replaces the Zeebe Java Client as of version 8.8.**

- Provides improved structure and full Orchestration Cluster API support
- The Zeebe Java Client will be **removed in version 8.10**
- **Migrate before upgrading to 8.10** to avoid breaking changes

See our [migration guide](../migration-manuals/migrate-to-camunda-java-client.md) for details.
:::

## What can you build with it?

Use the Camunda Java Client to build:

- **Job workers** that perform automated tasks and call external systems (APIs, databases, file systems)
- **Integration services** that connect Camunda processes with existing systems or third-party services
- **Data processing applications** that leverage process data for visualization, analytics, or business intelligence

## Getting started in three steps

### Step 1: Add the dependency

Add the Camunda Java Client to your project:

**Maven:**

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-client-java</artifactId>
  <version>${camunda.version}</version>
</dependency>
```

**Gradle:**

```groovy
implementation 'io.camunda:camunda-client-java:${camunda.version}'
```

Use the latest version from [Maven Central](https://search.maven.org/artifact/io.camunda/camunda-client-java).

### Step 2: Connect to your Camunda 8 cluster

Instantiate a client to connect to your Camunda 8 cluster. Choose the [authentication method](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) based on your environment:

<Tabs groupId="authentication" defaultValue="no-auth" queryString values={[
{label: 'No Authentication', value: 'no-auth' },
{label: 'Basic Authentication', value: 'basic-auth' },
{label: 'OIDC Access Token Authentication - Self-Managed', value: 'oidc-self-managed' },
{label: 'OIDC Access Token Authentication - SaaS', value: 'oidc-saas' },
{label: 'OIDC Access Token Authentication with X.509 Client Certificate', value: 'x509' },
]}>

<TabItem value="no-auth">

**Use for:** Local development when security is not required.

```java
private static final String CAMUNDA_GRPC_ADDRESS = "[Address of Zeebe API (gRPC) - default: http://localhost:26500]";
private static final String CAMUNDA_REST_ADDRESS = "[Address of the Orchestration Cluster API - default: http://localhost:8080]";

public static void main(String[] args) {

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(CAMUNDA_GRPC_ADDRESS))
            .restAddress(URI.create(CAMUNDA_REST_ADDRESS))
            .usePlaintext()
            .build()) {

        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does**

1. **Creates a no-authentication provider** – Configures the client to skip authentication.
2. **Builds an unencrypted client** – Uses plaintext communication for local development.
3. **Connects to both APIs** – Configures access to the Zeebe gRPC and Orchestration Cluster REST APIs.
4. **Tests the connection** – Verifies connectivity by requesting cluster topology information.

**Environment variables option**  
You can also set connection details via environment variables to create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().usePlaintext().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note
Ensure addresses are in absolute URI format: `scheme://host(:port)`.
:::

</TabItem>

<TabItem value="basic-auth">

**Use for:** Development or testing environments with username/password protection.

```java
private static final String CAMUNDA_GRPC_ADDRESS = "[Address of Zeebe API (gRPC) - default: http://localhost:26500]";
private static final String CAMUNDA_REST_ADDRESS = "[Address of the Orchestration Cluster API - default: http://localhost:8080]";
private static final String CAMUNDA_BASIC_AUTH_USERNAME = "[Your username - default: demo]";
private static final String CAMUNDA_BASIC_AUTH_PASSWORD = "[Your password - default: demo]";

public static void main(String[] args) {

    CredentialsProvider credentialsProvider = new BasicAuthCredentialsProviderBuilder()
            .username(CAMUNDA_BASIC_AUTH_USERNAME)
            .password(CAMUNDA_BASIC_AUTH_PASSWORD)
            .build();

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(CAMUNDA_GRPC_ADDRESS))
            .restAddress(URI.create(CAMUNDA_REST_ADDRESS))
            // uncomment to use an unencrypted transport (plain http)
            // we advise to use encrypted connections to not leak credentials
            // .usePlaintext()
            .credentialsProvider(credentialsProvider)
            .build()) {

        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does**

1. **Sets up username/password authentication** – Configures the client to use basic credentials.
2. **Builds a secure client** – Establishes an encrypted connection to the cluster (default).
3. **Connects to both APIs** – Configures access to the Zeebe gRPC and Orchestration Cluster REST APIs.
4. **Tests the connection** – Verifies authentication by requesting cluster topology information.

**Environment variables option**  
You can also set connection details via environment variables to create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
export CAMUNDA_BASIC_AUTH_USERNAME='[Your username - default: demo]'
export CAMUNDA_BASIC_AUTH_PASSWORD='[Your password - default: demo]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note

- Ensure addresses use absolute URI format: `scheme://host(:port)`.
- By default, environment variables override any values provided in Java code. To give Java code values precedence, use the `.applyEnvironmentOverrides(false)` method on `BasicAuthCredentialsProviderBuilder`.
- The client adds an `Authorization` header to each request with the value `Basic username:password` (where `username:password` is base64 encoded).  
  :::

</TabItem>

<TabItem value="oidc-self-managed">

**Use for:** Self-Managed production environments with OIDC access token authentication.

```java
private static final String CAMUNDA_GRPC_ADDRESS = "[Address of Zeebe API (gRPC) - default: http://localhost:26500]";
private static final String CAMUNDA_REST_ADDRESS = "[Address of the Orchestration Cluster API - default: http://localhost:8080]";
private static final String CAMUNDA_AUTHORIZATION_SERVER_URL = "[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]";
private static final String AUDIENCE = "[Audience]";
private static final String CLIENT_ID = "[Client ID]";
private static final String CLIENT_SECRET = "[Client Secret]";

public static void main(String[] args) {

    CredentialsProvider credentialsProvider = new OAuthCredentialsProviderBuilder()
            .authorizationServerUrl(CAMUNDA_AUTHORIZATION_SERVER_URL)
            .audience(AUDIENCE)
            .clientId(CLIENT_ID)
            .clientSecret(CLIENT_SECRET)
            .build();

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(CAMUNDA_GRPC_ADDRESS))
            .restAddress(URI.create(CAMUNDA_REST_ADDRESS))
            .credentialsProvider(credentialsProvider)
            .build()) {

        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does**

1. **Sets up OAuth2 authentication** – Configures the client to use OAuth tokens from your identity provider.
2. **Builds a secure client** – Establishes an encrypted connection to your self-managed cluster (default).
3. **Connects to both APIs** – Configures access to the Zeebe gRPC and Orchestration Cluster REST APIs.
4. **Tests the connection** – Verifies OAuth authentication by requesting cluster topology information.

**Environment variables option**  
You can also set connection details via environment variables to create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
export CAMUNDA_AUTHORIZATION_SERVER_URL='[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]'
export CAMUNDA_TOKEN_AUDIENCE='[Audience]'
export CAMUNDA_CLIENT_ID='[Client ID]'
export CAMUNDA_CLIENT_SECRET='[Client Secret]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note

- Ensure addresses use absolute URI format: `scheme://host(:port)`.
- By default, environment variables override any values provided in Java code. To give Java code values precedence, use the `.applyEnvironmentOverrides(false)` method on `OAuthCredentialsProviderBuilder`.
- The client adds an `Authorization` header to each request with the value `Bearer <token>`. The token is obtained from the authorization server, cached to avoid unnecessary requests, and refreshed lazily upon expiration.  
  :::

</TabItem>

<TabItem value="oidc-saas">

**Use for:** Camunda 8 SaaS environments.
Get the values below from your [Camunda Console client credentials](/components/console/manage-clusters/setup-client-connection-credentials.md).

```java
private static final String CAMUNDA_CLUSTER_ID = "[Cluster ID from Console]";
private static final String CAMUNDA_CLIENT_ID = "[Client ID from Console]";
private static final String CAMUNDA_CLIENT_SECRET = "[Client Secret from Console]";
private static final String CAMUNDA_CLUSTER_REGION = "[Cluster Region from Console]";

public static void main(String[] args) {

    try (CamundaClient client = CamundaClient.newCloudClientBuilder()
            .withClusterId(CAMUNDA_CLUSTER_ID)
            .withClientId(CAMUNDA_CLIENT_ID)
            .withClientSecret(CAMUNDA_CLIENT_SECRET)
            .withRegion(CAMUNDA_CLUSTER_REGION)
            .build()) {

        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does**

1. **Sets up SaaS authentication** – Configures the client to connect to Camunda 8 SaaS using your cluster credentials.
2. **Builds a cloud client** – Creates a client optimized for SaaS with automatic endpoint discovery.
3. **Connects to your cluster** – Uses your cluster ID and region to locate and connect to the correct SaaS instance.
4. **Tests the connection** – Verifies SaaS authentication by requesting cluster topology information.

**Environment variables option**  
You can also set connection details via environment variables to create the client more simply:

```bash
export ZEEBE_GRPC_ADDRESS='[Zeebe gRPC Address from Console]'
export ZEEBE_REST_ADDRESS='[Zeebe REST Address from Console]'
export CAMUNDA_OAUTH_URL='[OAuth URL from Console]'
export CAMUNDA_TOKEN_AUDIENCE='[Audience from Console - default: zeebe.camunda.io]'
export CAMUNDA_CLIENT_ID='[Client ID from Console]'
export CAMUNDA_CLIENT_SECRET='[Client Secret from Console]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note
Ensure addresses are in absolute URI format: `scheme://host(:port)`.
:::

</TabItem>

<TabItem value="x509">

**Use for:** Production environments with X.509 certificate-based authentication.

Several identity providers, such as Keycloak, support client X.509 authentication as an alternative to the client credentials flow.

**Prerequisites**

- Properly configured KeyStore and TrustStore
- Both the Spring Camunda application and identity provider share the same CA trust certificates
- Certificates for both Spring Camunda and the identity provider are signed by a trusted CA
- The Spring Camunda application certificate has a proper Distinguished Name (DN), e.g., `CN=My Camunda Client, OU=Camunda Users, O=Best Company, C=DE`
- The application DN is registered in the identity provider client authorization details

```java
private static final String CAMUNDA_GRPC_ADDRESS = "[Address of Zeebe API (gRPC) - default: http://localhost:26500]";
private static final String CAMUNDA_REST_ADDRESS = "[Address of the Orchestration Cluster API - default: http://localhost:8080]";
private static final String OAUTH_URL = "[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]";
private static final String AUDIENCE = "[Audience - default: zeebe-api]";
private static final String CLIENT_ID = "[Client ID]";
private static final String CLIENT_SECRET = "[Client Secret]";
private static final Path KEYSTORE_PATH = Paths.get("/path/to/keystore.p12");
private static final String KEYSTORE_PASSWORD = "password";
private static final String KEYSTORE_KEY_PASSWORD = "password";
private static final Path TRUSTSTORE_PATH = Paths.get("/path/to/truststore.jks");
private static final String TRUSTSTORE_PASSWORD = "password";

public static void main(String[] args) {

    CredentialsProvider credentialsProvider = new OAuthCredentialsProviderBuilder()
            .authorizationServerUrl(OAUTH_URL)
            .audience(AUDIENCE)
            .clientId(CLIENT_ID)
            .clientSecret(CLIENT_SECRET)
            .keystorePath(KEYSTORE_PATH)
            .keystorePassword(KEYSTORE_PASSWORD)
            .keystoreKeyPassword(KEYSTORE_KEY_PASSWORD)
            .truststorePath(TRUSTSTORE_PATH)
            .truststorePassword(TRUSTSTORE_PASSWORD)
            .build();

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(CAMUNDA_GRPC_ADDRESS))
            .restAddress(URI.create(CAMUNDA_REST_ADDRESS))
            .credentialsProvider(credentialsProvider)
            .build()) {

        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does**

1. **Sets up X.509 certificate authentication** – Configures the client to authenticate using client certificates with OAuth.
2. **Builds a secure client** – Establishes an encrypted connection using mutual TLS authentication.
3. **Connects to both APIs** – Configures access to the Zeebe gRPC and Orchestration Cluster REST APIs.
4. **Tests the connection** – Verifies certificate authentication by requesting cluster topology information.

**Environment variables option**  
You can also set connection details via environment variables to create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
export CAMUNDA_OAUTH_URL='[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]'
export CAMUNDA_TOKEN_AUDIENCE='[Audience - default: zeebe-api]'
export CAMUNDA_CLIENT_ID='[Client ID]'
export CAMUNDA_CLIENT_SECRET='[Client Secret]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_PATH='[Keystore path]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_SECRET='[Keystore password]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_KEY_SECRET='[Keystore material password]'
export CAMUNDA_SSL_CLIENT_TRUSTSTORE_PATH='[Truststore path]'
export CAMUNDA_SSL_CLIENT_TRUSTSTORE_SECRET='[Truststore password]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client automatically reads environment variables and configures the appropriate authentication method.

Refer to your identity provider documentation for configuring X.509 authentication. For example, see [Keycloak](https://www.keycloak.org/server/mutual-tls).

:::note

- Ensure addresses use absolute URI format: `scheme://host(:port)`.
- By default, environment variables override any values provided in Java code. To give Java code values precedence, use the `.applyEnvironmentOverrides(false)` method on `OAuthCredentialsProviderBuilder`.  
  :::

</TabItem>

</Tabs>

### Step 3: Start building your process application

With a connected client, you are ready to build your process application. Below are the core operations you’ll typically perform, along with guidance on the next steps.

#### Essential operations

**Deploy a process:**

```java
final DeploymentEvent deploymentEvent = client.newDeployResourceCommand()
    .addResourceFromClasspath("process.bpmn")
    .send()
    .join();
```

This deploys your BPMN process definition to the cluster. Place your `.bpmn` files in `src/main/resources` and reference them by filename.

**Start a process instance:**

```java
final ProcessInstanceEvent processInstanceEvent = client.newCreateInstanceCommand()
    .bpmnProcessId("my-process")
    .latestVersion()
    .variables(Map.of("orderId", "12345", "amount", 100.0))
    .send()
    .join();
```

This creates a new instance of your process. The `bpmnProcessId` should match the Process ID from your BPMN file, and you can pass initial variables as a Map.

For a comprehensive example demonstrating these steps, see the [DeployAndComplete example](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/camunda-client-plain-java/src/main/java/io/camunda/example/e2e/process/DeployAndComplete.java) in the Camunda 8 examples repository. This example illustrates a complete workflow from process deployment to job completion.

## Key features and capabilities

- **Full Orchestration Cluster 8 API support:** Access all Orchestration Cluster API capabilities, including process deployment, management, job handling, and querying process data.
- **Multiple authentication methods:** Supports no authentication (development), basic authentication, and OIDC access tokens for production environments.
- **Automatic token management:** Handles authentication token acquisition and renewal automatically—no manual token management required.
- **Protocol flexibility:** Choose between REST and gRPC protocols depending on your requirements and infrastructure.

## Next steps and resources

**Learn the fundamentals**

- [Job worker implementation](job-worker.md) – Build workers to handle automated tasks
- [Process testing](../testing/getting-started.md) – Test your processes with Camunda Process Test
- [Getting Started Tutorial](../../guides/getting-started-example.md) – Complete walkthrough with Modeler, Operate, and Spring SDK

**Advanced topics**

- [Logging configuration](logging.md) – Set up proper logging for your application
- [Client documentation](https://javadoc.io/doc/io.camunda/camunda-client-java) – Complete Javadoc reference

**Need help?**

- [Camunda Community Forum](https://forum.camunda.io/) – Get help from the community
- [GitHub repository](https://github.com/camunda/camunda) – Report issues and contribute
