---
id: getting-started
title: Getting started
description: "Leverage Camunda APIs (gRPC and REST) in your Spring Boot project."
---

:::info Deprecated Spring Zeebe SDK
Starting with 8.8, the Camunda Spring Boot Starter replaces the Spring Zeebe SDK. The Camunda Spring Boot Starter will rely on the new Camunda Java client,
designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.

**Notes:**

- The new Camunda Client (which is used by the Camunda Spring Boot Starter) uses REST as the default communication protocol. gRPC is still supported but requires additional configuration.
- Spring Zeebe SDK will be removed in version 8.10. Please migrate to the new Camunda Spring Boot SDK before then.

For more information, visit [announcements](/reference/announcements-release-notes/880/880-announcements.md#camunda-java-client-and-camunda-spring-boot-starter).
:::

:::info Public API
The Camunda Spring Boot Starter is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for alpha features). Breaking changes will not be introduced in minor or patch releases.
:::

This project allows you to leverage Camunda APIs ([gRPC](/apis-tools/zeebe-api/grpc.md) and [REST](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)) in your Spring Boot project. Later on, we’ll expand the Camunda Spring Boot Starter to deliver an SDK that provides a unified experience for interacting with all Camunda APIs in Java Spring.

## Version compatibility

| Camunda Spring Boot Starter version | JDK  | Camunda version | Bundled Spring Boot version |
| ----------------------------------- | ---- | --------------- | --------------------------- |
| 8.8.x                               | ≥ 17 | 8.8.x           | 3.5.x                       |

## Add the Camunda Spring Boot Starter to your project

Add the following Maven dependency to your Spring Boot Starter project, replacing `x` with the latest patch level available:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-spring-boot-starter</artifactId>
    <version>8.8.x</version>
</dependency>
```

Additionally, you can find the [source on GitHub](https://github.com/camunda/camunda/tree/main/clients/spring-boot-starter-camunda-sdk/src/main).

## Enable the Java Compiler `-parameters`-flag

If you don't want to specify annotation values just as the process variable name on the [variable](configuration.md#using-variable) annotation, the Java compiler flag `-parameters` is required.

If you are using Maven you can enable this with the Compiler plugin:

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

## Configuring the Camunda 8 connection

The default properties for setting up all connection details are hidden in modes. Each connection mode has particular defaults to ease configuration.

The mode is set on `camunda.client.mode` and can be `self-managed` or `saas`. Further usage of each mode is explained below.

### Saas

Connections to Camunda SaaS can be configured by creating the following entries in `src/main/resources/application.yaml`:

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

### Self-Managed

:::note
Camunda is configured with URLs (`http://localhost:26500` instead of `localhost:26500` + plaintext connection flag).
:::

If you set up a [Self-Managed cluster with OIDC](https://docs.camunda.io/docs/self-managed/deployment/helm/configure/authentication-and-authorization/), you must configure the accompanying Spring profile and client credentials:

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      client-id: <your client id>
      client-secret: <your client secret>
```

If you have different endpoints for your applications or want to disable a client, configure the following:

```yaml
camunda:
  client:
    mode: self-managed
    tenant-id: <default>
    auth:
      client-id: <your client id>
      client-secret: <your client secret>
      token-url: https://my-oidc-provider/auth/realms/camunda-platform/protocol/openid-connect/token
    grpc-address: https://my-grpc-address
    rest-address: https://my-rest-address
```

## Obtain the Camunda client

You can inject the Camunda client and work with it to create new workflow instances, for example:

```java
@Autowired
private CamundaClient client;
```

## Implement the job worker

To implement a job worker, you need to declare a method like this on a bean:

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

## Writing test cases

Please refer to [Camunda Process Test](../testing/getting-started.md) to write test cases when using the Camunda Spring Boot Starter.
