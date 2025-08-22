---
id: index
title: "Java client"
sidebar_label: "Getting started"
description: "Provide a job worker that handles polling for available jobs, use SLF4J for logging useful notes, and more."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Camunda Java Client

The Camunda Java Client is the official Java library for building process applications that integrate with Camunda 8. Whether you're orchestrating microservices, building human task orchestration, or visualising process data, this Client provides everything you need to interact with the Orchestration Cluster programmatically.

The Camunda Java client is part of the Camunda 8 [public API](/reference/public-api.md) and follows [Semantic Versioning](https://semver.org/) (except for alpha features). No breaking changes will be introduced in minor or patch releases.

## What is the Camunda Java Client?

The Camunda Java Client is a comprehensive library that enables Java developers to:

- **Deploy processes and decisions** to Camunda 8 clusters
- **Start and manage process** programmatically  
- **Implement job workers** to handle automated tasks in your processes
- **Query and manage process data** using the Orchestration Cluster API

The client supports both REST and gRPC protocols, handles authentication automatically, and provides robust error handling and retry mechanisms.

:::info Migration from Zeebe Java Client
**The Camunda Java Client replaces the Zeebe Java Client as of version 8.8.**

- Offers improved structure and full Orchestration Cluster API support
- The Zeebe Java Client will be **removed in version 8.10**
- **Migrate before upgrading to 8.10** to avoid breaking changes

See our [migration guide](/reference/announcements-release-notes/880/880-announcements.md#camunda-java-client-and-camunda-spring-boot-sdk) for details.
:::

## What can you build with it?

Use the Camunda Java Client to build:

- **Job workers** that perform automated tasks and call external systems (APIs, databases, file systems)
- **Integration services** that connect Camunda processes with your existing systems and third-party services
- **Data processing applications** that use process data in external systems for visualisation, analytics, and business intelligence

## Getting started in 3 steps

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
    
    CredentialsProvider credentialsProvider = new NoopCredentialsProvider();

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(CAMUNDA_GRPC_ADDRESS))
            .usePlaintext()
            .restAddress(URI.create(CAMUNDA_REST_ADDRESS))
            .credentialsProvider(credentialsProvider)
            .build()) {
        
        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does:**
1. **Creates a no-authentication provider** - Configures the client to skip authentication entirely
2. **Builds an unencrypted client** - Sets up plaintext communication for local development
3. **Connects to both APIs** - Configures access to both Zeebe gRPC and Orchestration Cluster REST APIs
4. **Tests the connection** - Verifies connectivity by requesting cluster topology information

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

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
            .credentialsProvider(credentialsProvider)
            .build()) {
        
        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**What this code does:**
1. **Sets up username/password authentication** - Configures the client to authenticate using basic credentials
2. **Builds a secure client** - Creates an encrypted connection to the cluster
3. **Connects to both APIs** - Configures access to both Zeebe gRPC and Orchestration Cluster REST APIs
4. **Tests the connection** - Verifies authentication works by requesting cluster topology information

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

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
- Ensure addresses are in absolute URI format: `scheme://host(:port)`.
- Environment variables will by default override any values provided in Java code. You can enforce that Java code values have precedence via the `.applyEnvironmentOverrides(false)` API on the `BasicAuthCredentialsProviderBuilder`.
- The client will add an `Authorization` header to each request with the value `Basic username:password` (where `username:password` is base64 encoded).
:::

</TabItem>

<TabItem value="oidc-self-managed">

**Use for:** Self-managed production environments with OIDC Access Token authentication.

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

**What this code does:**
1. **Sets up OAuth2 authentication** - Configures the client to authenticate using OAuth tokens from your identity provider
2. **Builds a secure client** - Creates an encrypted connection to your self-managed cluster
3. **Connects to both APIs** - Configures access to both Zeebe gRPC and Orchestration Cluster REST APIs
4. **Tests the connection** - Verifies OAuth authentication works by requesting cluster topology information

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

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
- Ensure addresses are in absolute URI format: `scheme://host(:port)`.
- Environment variables will, by default, override any values provided in Java code. You can enforce that Java code values have precedence via the `.applyEnvironmentOverrides(false)` API on the `OAuthCredentialsProviderBuilder`.
- The client will add an `Authorization` header to each request with the value `Bearer <token>`. The token is obtained by making a request to the authorisation server and is cached to avoid unnecessary requests. The token is lazily refreshed once it expires.
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

**What this code does:**
1. **Sets up SaaS authentication** - Configures the client to connect to Camunda 8 SaaS using your cluster credentials
2. **Builds a cloud client** - Creates a client optimised for SaaS with automatic endpoint discovery
3. **Connects to your cluster** - Uses your cluster ID and region to find and connect to the right SaaS instance
4. **Tests the connection** - Verifies SaaS authentication works by requesting cluster topology information

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

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

Several identity providers, such as Keycloak, support client X.509 authentication as an alternative to client credentials flow.

**Prerequisites:**
- Proper KeyStore and TrustStore configured
- Both the Spring Camunda application and identity provider share the same CA trust certificates
- Both the Spring Camunda and identity provider own certificates signed by trusted CA
- Your Spring Camunda application certificate has proper Distinguished Name (DN), e.g. `CN=My Camunda Client, OU=Camunda Users, O=Best Company, C=DE`
- Your application DN registered in the identity provider client authorization details

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

**What this code does:**
1. **Sets up X.509 certificate authentication** - Configures the client to authenticate using client certificates with OAuth
2. **Builds a secure client** - Creates an encrypted connection using mutual TLS authentication
3. **Connects to both APIs** - Configures access to both Zeebe gRPC and Orchestration Cluster REST APIs
4. **Tests the connection** - Verifies certificate authentication works by requesting cluster topology information

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

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

The client will automatically read the environment variables and configure the appropriate authentication method.

Refer to your identity provider documentation on how to configure X.509 authentication. For example, [Keycloak](https://www.keycloak.org/server/mutual-tls).

:::note
- Ensure addresses are in absolute URI format: `scheme://host(:port)`.
- Environment variables will by default override any values provided in Java code. You can enforce that Java code values have precedence via the `.applyEnvironmentOverrides(false)` API on the `OAuthCredentialsProviderBuilder`.
:::

</TabItem>

</Tabs>

### Step 3: Start building your process application

Now that you have a connected client, you're ready to build your process application. Here are the core operations you'll typically perform, along with guidance on what to do next.

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

**Implement a job worker:**
```java
final String jobType = "send-email";

try (final JobWorker workerRegistration = client.newWorker()
        .jobType(jobType)
        .handler(new EmailJobHandler())
        .timeout(Duration.ofSeconds(10))
        .open()) {

        System.out.println("Job worker opened and receiving jobs of type: " + jobType);

// Keep the worker running
                Thread.sleep(Duration.ofMinutes(10));
        } catch (InterruptedException e) {
        throw new RuntimeException(e);
            }

private static class EmailJobHandler implements JobHandler {
    @Override
    public void handle(final JobClient client, final ActivatedJob job) {
        // Extract variables from the job
        final Map<String, Object> variables = job.getVariablesAsMap();
        
        // Perform your business logic here
        System.out.println("Processing job: " + job.getType());
        System.out.println("Variables: " + variables);
        
        // Complete the job (or use client.newFailCommand() if something goes wrong)
        client.newCompleteCommand(job.getKey())
            .variables(Map.of("emailSent", true))
            .send()
            .join();
    }
}
```
Job workers handle automated tasks in your processes. Each worker subscribes to specific job types and processes them as they become available.

For a comprehensive example that demonstrates all the above steps, see the [DeployAndComplete example](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/camunda-client-plain-java/src/main/java/io/camunda/example/e2e/process/DeployAndComplete.java) in the Camunda 8 examples repository. This example shows a complete workflow from process deployment to job completion.

## Key features and capabilities

**Full Orchestration Cluster 8 API Support**
Access all Orchestration Cluster API capabilities including process deployment, process management, job handling, and querying process data.

**Multiple Authentication Methods**
Supports no authentication (development), basic authentication, and OIDC Access Tokens for production environments.

**Automatic Token Management**
Handles authentication token acquisition and renewal automatically—no manual token management required.

**Protocol Flexibility**
Choose between REST and gRPC protocols based on your requirements and infrastructure.

## Next steps and resources

### **Learn the fundamentals:**
- [Job worker implementation](job-worker.md) - Build workers to handle automated tasks
- [Process testing](../testing/getting-started.md) - Test your processes with Camunda Process Test

### **Explore examples:**
- [Java client examples](../java-client-examples/index.md) - Real-world code samples for common scenarios
- [Getting Started Tutorial](../../guides/getting-started-example.md) - Complete walkthrough with Modeler, Operate, and Spring SDK

### **Advanced topics:**
- [Logging configuration](logging.md) - Set up proper logging for your application
- [Client Documentation](https://javadoc.io/doc/io.camunda/camunda-client-java) - Complete Javadoc reference

### **Need help?**
- [Camunda Community Forum](https://forum.camunda.io/) - Get help from the community
- [GitHub Repository](https://github.com/camunda/camunda) - Report issues and contribute