---
id: getting-started
title: Getting started
description: "Leverage Camunda APIs (gRPC and REST) in your Spring Boot project."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Camunda Spring Boot Starter is the official way to integrate Camunda 8 APIs ([gRPC](/apis-tools/zeebe-api/grpc.md) and [REST](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)) into your Spring Boot project. It enables you to orchestrate microservices, manage human tasks, and interact with process data using idiomatic Spring Boot patterns.

:::info Public API
The Camunda Spring Boot Starter is part of the Camunda 8 [public API](/reference/public-api.md) and follows [Semantic Versioning](https://semver.org/) (except for alpha features). Minor and patch releases will not introduce breaking changes.
:::

:::info Migration from Spring Zeebe SDK
**The Camunda Spring Boot Starter replaces the Spring Zeebe SDK as of version 8.8.**

- Uses the new Camunda Java Client under the hood
- REST is the default protocol (gRPC configurable)
- Spring Zeebe SDK will be **removed in version 8.10**
- **Migrate before upgrading to 8.10** to avoid breaking changes

See our [migration guide](/reference/announcements-release-notes/880/880-announcements.md#camunda-java-client-and-camunda-spring-boot-starter) for details.
:::

## What can you build with it?

Use the Camunda Spring Boot Starter to build:

- **Job workers** that perform automated tasks and call external systems (APIs, databases, file systems)
- **Integration services** that connect Camunda processes with existing systems or third-party services
- **Data processing applications** that leverage process data for visualization, analytics, or business intelligence

## Version compatibility

| Camunda Spring Boot Starter version | JDK  | Camunda version | Bundled Spring Boot version |
| ----------------------------------- | ---- | --------------- | --------------------------- |
| 8.8.x                               | ≥ 17 | 8.8.x           | 3.5.x                       |

## Getting started in three steps

### Step 1: Add the dependency

Add the Camunda Spring Boot Starter to your project:

**Maven:**

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-spring-boot-starter</artifactId>
  <version>8.8.x</version>
</dependency>
```

### Step 2: Enable the Java Compiler `-parameters` flag (optional)

If you want to use parameter names for process variables without specifying annotation values, enable the Java compiler flag `-parameters`.

**Maven:**

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <configuration>
        <compilerArgs>
          <arg>-parameters</arg>
        </compilerArgs>
      </configuration>
    </plugin>
  </plugins>
</build>
```

If you are using Gradle:

```xml
tasks.withType(JavaCompile) {
    options.compilerArgs << '-parameters'
}
```

If you are using IntelliJ:

```agsl
Settings > Build, Execution, Deployment > Compiler > Java Compiler
```

### Step 3a: Configure the Orchestration Cluster connection for Self-Managed

Set up your connection and authentication in `application.yaml` as shown below. Choose the mode and authentication method for your environment.

Choose the authentication method and gRPC/REST address for your environment:

<Tabs groupId="authentication" defaultValue="no-auth" queryString values={[
{label: 'No Authentication', value: 'no-auth' },
{label: 'Basic Authentication', value: 'basic-auth' },
{label: 'OIDC-based Authentication', value: 'oidc' },
]}>

<TabItem value="no-auth">
By default, no authentication will be used.

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      method: none
    grpc-address: https://my-grpc-address
    rest-address: https://my-rest-address
```

</TabItem>
<TabItem value="basic-auth">
To activate basic authentication:

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      method: basic
      username: <your username>
      password: <your password>
    grpc-address: https://my-grpc-address
    rest-address: https://my-rest-address
```

</TabItem>
<TabItem value="oidc">
To activate OIDC-based authentication:

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      method: oidc
      client-id: <your client id>
      client-secret: <your client secret>
      token-url: http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
      audience: <your client id of Orchestration Cluster or configured audience>
      scope: <your client id of Orchestration Cluster or configured audience>
    grpc-address: https://my-grpc-address
    rest-address: https://my-rest-address
```

**Notes for Microsoft Entra ID**:

- Instead of `scope: CLIENT_ID_OC`, use: `scope: CLIENT_ID_OC + "/.default"`.
- The `token-url` is typically in the format: `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`.

:::note Audience Validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration), the Orchestration Cluster will validate the audience claim in the token against the configured audiences. Make sure your token has the correct audience from the Orchestration Cluster configuration, or add your audience in the Orchestration Cluster configuration. Often this is the client ID you used when configuring the Orchestration Cluster.
:::

</TabItem>
</Tabs>

### Step 3b: Configure the Orchestration Cluster connection for SaaS

Set up your connection and authentication in `application.yaml` as shown below:

```yaml
camunda:
  client:
    mode: saas
    auth:
      client-id: <your client id>
      client-secret: <your client secret>
    cloud:
      cluster-id: <your cluster id>
      region: <your cluster region id>
```

:::note
Ensure all addresses use absolute URI format: `scheme://host(:port)`.
:::

## Start building your process application

With your project configured, you are ready to build your process application. Below are the core operations you’ll typically perform, along with guidance on the next steps.

### Inject the Camunda client

You can inject the Camunda client and work with it to create new workflow instances, for example:

```java
@Autowired
private CamundaClient client;
```

### Deploy process models

Use the `@Deployment` annotation:

```java
@SpringBootApplication
@Deployment(resources = "classpath:demoProcess.bpmn")
public class MySpringBootApplication {
    // ...
}
```

This annotation uses [the Spring resource loader](https://docs.spring.io/spring-framework/reference/core/resources.html) and can deploy multiple files at once:

```java
@Deployment(resources = {"classpath:demoProcess.bpmn", "classpath:demoProcess2.bpmn"})
```

Or, define wildcard patterns:

```java
@Deployment(resources = "classpath*:/bpmn/**/*.bpmn")
```

### Implement a job worker

Declare a method like this on a bean:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // do whatever you need to do
}
```

See [the configuration documentation](/apis-tools/camunda-spring-boot-starter/configuration.md) for a more in-depth discussion on parameters and configuration options for job workers.

### Write test cases

Refer to [Camunda Process Test](../testing/getting-started.md) to write test cases when using the Camunda Spring Boot Starter.

## Key features and capabilities

- **Full Orchestration Cluster 8 API support:** Access all Orchestration Cluster API capabilities, including process deployment, management, job handling, and querying process data.
- **Multiple authentication methods:** Supports no authentication (development), basic authentication, and OIDC access tokens for production environments.
- **Automatic token management:** Handles authentication token acquisition and renewal automatically—no manual token management required.
- **Protocol flexibility:** Choose between REST and gRPC protocols depending on your requirements and infrastructure.

## Next steps and resources

**Learn the fundamentals**

- [Process testing](../testing/getting-started.md) – Test your processes with Camunda Process Test
- [Getting Started Tutorial](../../guides/getting-started-example.md) – Complete walkthrough with Modeler, Operate, and Spring SDK

**Need help?**

- [Camunda Community Forum](https://forum.camunda.io/) – Get help from the community
- [GitHub repository](https://github.com/camunda/camunda) – Report issues and contribute
