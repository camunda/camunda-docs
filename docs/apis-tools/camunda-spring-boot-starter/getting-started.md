---
id: getting-started
title: Getting started
description: "Integrate Camunda 8 APIs (gRPC and REST) into your Spring Boot project for orchestration, automation, and data processing."
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
- REST is the default protocol (gRPC is configurable)
- Spring Zeebe SDK will be **removed in version 8.10**
- **Migrate before upgrading to 8.10** to avoid breaking changes

See the [migration guide](/reference/announcements-release-notes/880/880-announcements.md#camunda-java-client-and-camunda-spring-boot-starter) for details.
:::

## What you can build with it

With the Camunda Spring Boot Starter, you can build:

- **Job workers** that perform automated tasks and call external systems (APIs, databases, file systems)
- **Integration services** that connect Camunda processes with existing systems or third-party services
- **Data processing applications** that use process data for visualization, analytics, or business intelligence

## Version compatibility

| Camunda Spring Boot Starter version | JDK  | Camunda version | Bundled Spring Boot version | Compatible Spring Boot version(s) |
| ----------------------------------- | ---- | --------------- | --------------------------- | --------------------------------- |
| 8.8.x                               | ≥ 17 | 8.8.x           | 3.5.x                       |                                   |

## Get started

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

If you set up a [Self-Managed cluster with OIDC](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md), you must configure the accompanying client credentials:

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      method: oidc
      client-id: <your client id>
      client-secret: <your client secret>
      issuer-url: http://localhost:18080/auth/realms/camunda-platform
      audience: <your client id of Orchestration Cluster or configured audience>
      scope: <your client id of Orchestration Cluster or configured audience>
    grpc-address: https://my-grpc-address
    rest-address: https://my-rest-address
```

:::note
Ensure all addresses use absolute URI format: `scheme://host(:port)`.
:::

**Notes for Microsoft Entra ID**

- Use `scope: CLIENT_ID_OC + "/.default"` instead of `scope: CLIENT_ID_OC`.
- The `issuer-url` is typically in the format:

```
https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
```

:::note Audience validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camunda.security.authentication.oidc), the Orchestration Cluster will validate the audience claim in the token against the configured audiences.

Make sure your token includes the correct audience from the Orchestration Cluster configuration, or add your audience to the configuration. Often this is the client ID you used when setting up the Orchestration Cluster.
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
      region: <your region>
```

## Start building your process application

With your project configured, you are ready to build your process application. Below are the core operations you’ll typically perform, along with guidance on the next steps.

### Inject the Camunda client

You can inject the Camunda client and work with it to create new workflow instances, for example:

```java
@Autowired
private CamundaClient client;
```

## Implement the job worker

Declare a method like this on a bean:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // do whatever you need to do
}
```

To learn about all options you have with job workers, check out the [configuration](./configuration.md#job-worker-configuration-options) page.

## Deploy process models

To deploy process models on application start-up, use the `@Deployment` annotation:

```java
@SpringBootApplication
@Deployment(resources = "classpath:demoProcess.bpmn")
public class MySpringBootApplication {
```

To learn about all options about the usage of the `@Deployment` annotation, check out the [configuration](./configuration.md#deploying-resources-on-start-up) page.

**Need help?**

- [Camunda Community Forum](https://forum.camunda.io/) – Get help from the community.
- [GitHub repository](https://github.com/camunda/camunda) – Report issues and contribute.
