---
id: getting-started
title: Getting started
description: "Leverage Zeebe APIs (gRPC and REST) in your Spring Boot project."
---

This project allows you to leverage Zeebe APIs ([gRPC](docs/apis-tools/zeebe-api/grpc.md) and [REST](docs/apis-tools/zeebe-api-rest/zeebe-api-rest-overview.md)) in your Spring Boot project. Later on, we’ll expand the Spring Zeebe SDK to deliver a Camunda Spring SDK that provides a unified experience for interacting with all Camunda APIs in Java Spring.

## Version compatibility

| Camunda Spring SDK version | JDK    | Camunda version | Bundled Spring Boot version |
| -------------------------- | ------ | --------------- | --------------------------- |
| 8.5.x                      | \>= 17 | 8.5.x           | 3.2.x                       |

## Add the Spring Zeebe SDK to your project

Add the following Maven dependency to your Spring Boot Starter project:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>spring-boot-starter-camunda-sdk</artifactId>
  <version>8.5.0</version>
</dependency>
```

## Enable the Java Compiler `-parameters`-flag

If you don't want to specify annotation values just as the process variable name on the [variable](#using-variable) annotation, the Java compiler flag `-parameters` is required.

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

## Configuring the Zeebe cluster connection

Connections to Camunda 8 SaaS can be configured by creating the following entries in `src/main/resources/application.properties`:

```properties
zeebe.client.cloud.clusterId=xxx
zeebe.client.cloud.clientId=xxx
zeebe.client.cloud.clientSecret=xxx
zeebe.client.cloud.region=bru-2
```

You can also configure the connection to a Self-Managed Zeebe broker:

```properties
zeebe.client.broker.grpcAddress=https://127.0.0.1:26500
zeebe.client.broker.restAddress=https://127.0.0.1:8080
zeebe.client.security.plaintext=true
```

You can enforce the right connection mode, for example if multiple contradicting properties are set:

```properties
zeebe.client.connection-mode=CLOUD
zeebe.client.connection-mode=ADDRESS
```

You can specify credentials in the following way:

```properties
common.clientId=xxx
common.clientSecret=xxx
```

## Obtain the Zeebe client

You can inject the Zeebe client and work with it to create new workflow instances, for example:

```java
@Autowired
private ZeebeClient client;
```

## Deploy process models

Use the `@Deployment` annotation:

```java
@SpringBootApplication
@Deployment(resources = "classpath:demoProcess.bpmn")
public class MySpringBootApplication {
```

This annotation internally uses [the Spring resource loader](#resources-resourceloader) mechanism. This is powerful, and can also deploy multiple files at once, for example:

```java
@Deployment(resources = {"classpath:demoProcess.bpmn" , "classpath:demoProcess2.bpmn"})
```

Or, define wildcard patterns:

```java
@Deployment(resources = "classpath*:/bpmn/**/*.bpmn")
```

## Implement the job worker

```java
@JobWorker(type = "foo")
public void handleJobFoo(final ActivatedJob job) {
  // do whatever you need to do
}
```

See [the configuration documentation](/docs/apis-tools/spring-zeebe-sdk/configuration.md) for a more in-depth discussion on parameters and configuration options of job workers.
