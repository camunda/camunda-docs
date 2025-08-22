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
private static final String CAMUNDA_CLIENT_USERNAME = "[Your username - default: demo]";
private static final String CAMUNDA_CLIENT_PASSWORD = "[Your password - default: demo]";

public static void main(String[] args) {
    
    CredentialsProvider credentialsProvider = new BasicAuthCredentialsProviderBuilder()
            .username(CAMUNDA_CLIENT_USERNAME)
            .password(CAMUNDA_CLIENT_PASSWORD)
            .build();

    try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(grpcAddress))
            .restAddress(URI.create(restAddress))
            .credentialsProvider(credentialsProvider)
            .build()) {
        
        // Test the connection
        client.newTopologyRequest().send().join();
        System.out.println("Connected to Camunda 8!");
    }
}
```

**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
export CAMUNDA_CLIENT_USERNAME='[Your username - default: demo]'
export CAMUNDA_CLIENT_PASSWORD='[Your password - default: demo]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note
Ensure addresses are in absolute URI format: `scheme://host(:port)`.
:::

</TabItem>

<TabItem value="oidc-self-managed">

**Use for:** Self-managed production environments with OIDC Access Token authentication.

```java
private static final String CAMUNDA_GRPC_ADDRESS = "[Address of Zeebe API (gRPC) - default: http://localhost:26500]";
private static final String CAMUNDA_REST_ADDRESS = "[Address of the Orchestration Cluster API - default: http://localhost:8080]";
private static final String OAUTH_URL = "[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]";
private static final String AUDIENCE = "[Audience - default: zeebe-api]";
private static final String CLIENT_ID = "[Client ID]";
private static final String CLIENT_SECRET = "[Client Secret]";

public static void main(String[] args) {
    
    CredentialsProvider credentialsProvider = new OAuthCredentialsProviderBuilder()
            .authorizationServerUrl(OAUTH_URL)
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
**Environment variables option:**
You can set the connection details via environment variables and create the client more simply:

```bash
export CAMUNDA_GRPC_ADDRESS='[Address of Zeebe API (gRPC) - default: http://localhost:26500]'
export CAMUNDA_REST_ADDRESS='[Address of the Orchestration Cluster API - default: http://localhost:8080]'
export CAMUNDA_OAUTH_URL='[OAuth URL e.g. http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token]'
export CAMUNDA_TOKEN_AUDIENCE='[Audience - default: zeebe-api]'
export CAMUNDA_CLIENT_ID='[Client ID]'
export CAMUNDA_CLIENT_SECRET='[Client Secret]'
```

```java
CamundaClient client = CamundaClient.newClientBuilder().build();
```

The client will automatically read the environment variables and configure the appropriate authentication method.

:::note
Ensure addresses are in absolute URI format: `scheme://host(:port)`.
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

</Tabs>

**What this code does:**
1. **Defines connection addresses** - Get these from your Camunda Console or cluster configuration
2. **Sets up authentication** - Choose the appropriate method based on your environment
3. **Creates the client** - Establishes connection to your Camunda 8 cluster
4. **Tests the connection** - Sends a topology request to verify connectivity

### Step 3: Start building your process application

Once connected, you can start using the client to build your process application:

**Deploy a process:**
```java
final DeploymentEvent deploymentEvent = client.newDeployResourceCommand()
    .addResourceFromClasspath("process.bpmn")
    .send()
    .join();
```

**Start a process instance:**
```java
final ProcessInstanceEvent processInstanceEvent = client.newCreateInstanceCommand()
    .bpmnProcessId("my-process")
    .latestVersion()
    .variables(Map.of("orderId", "12345"))
    .send()
    .join();
```

**Implement a job worker:**
```java
final String jobType = "send-email";

try (final JobWorker workerRegistration = client.newWorker()
        .jobType(jobType)
        .handler(new ExampleJobHandler())
        .timeout(Duration.ofSeconds(10))
        .open()) {
    
    System.out.println("Job worker opened and receiving jobs.");
    
    // run until System.in receives exit command
    waitUntilSystemInput("exit");
}

private static class ExampleJobHandler implements JobHandler {
        @Override
        public void handle(final JobClient client, final ActivatedJob job) {
            // here: business logic that is executed with every job
            System.out.println(job);
            client.newCompleteCommand(job.getKey()).send().join();
        }
    }
```

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
- [Authentication setup](authentication.md) - Configure secure connections to your cluster
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
- [GitHub Repository](https://github.com/camunda/camunda-platform) - Report issues and contribute
