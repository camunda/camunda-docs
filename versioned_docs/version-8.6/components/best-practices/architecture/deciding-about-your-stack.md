---
title: Deciding about your stack
tags:
  - Architecture
  - Stack
  - Database
  - Application Server
  - Spring Boot
  - Maven
---

:::caution Camunda 8
This best practice targets Camunda 8. For Camunda 7, please refer to [Deciding about your Camunda 7 stack](../deciding-about-your-stack-c7/).
:::

Our greenfield stack recommendation is a result of extensive discussions and evaluations. While not the only option, it is a solid choice if there are no specific reasons to choose an alternative.

Your choice of programming language should align with your team's expertise; we suggest Java or JavaScript for their broad applicability and support, and have outlined the Java greenfield stack below with Camunda 8 SaaS.

## The Java greenfield stack

![greenfield stack architecture diagram](deciding-about-your-stack-assets/greenfield-architecture.png)

This architecture diagram illustrates the flow of requests from a user's browser through Camunda SaaS, where workflows and decisions are orchestrated. The process then moves to the Spring Boot application, which is responsible for executing business logic, handling database interactions with PostgreSQL, and managing various components such as custom REST endpoints, BPMN/DMN definitions, and external task workers.

### Why this stack?

- SaaS simplifies workflow engine integration.
- Spring Boot is widely adopted for Java application development.
- Flexible for both on-premises and cloud environments.

Discover more in our [getting started guide for microservices orchestration](/guides/getting-started-orchestrate-microservices.md) or the [Spring Zeebe SDK instructions](../../../apis-tools/spring-zeebe-sdk/getting-started.md).

### Set up the stack

For a Java-based setup using Camunda 8 SaaS and Spring Boot, use the following stack:

#### Camunda 8 SaaS account and cluster

If you're new to Camunda SaaS, check out our [getting started guide](/guides/introduction-to-camunda-8.md#getting-started) to set up your environment.

After signing up, create a cluster by following [creating a cluster in Camunda 8](/guides/create-cluster.md), which provides step-by-step instructions on setting up a new cluster in the Camunda 8 environment.

#### Spring Boot

Develop your own process solutions as [Spring Boot](https://spring.io/projects/spring-boot) applications. This involves setting up a new Spring Boot project, either manually or using tools like [Spring Initializr](https://start.spring.io/).

Integrate the [Spring Zeebe SDK](../../../apis-tools/spring-zeebe-sdk/getting-started.md) into the Spring Boot project by adding necessary dependencies to the project’s `pom.xml` file, and configure the application to use Camunda services.

#### Maven

Use [Maven](https://maven.apache.org/) to manage the build lifecycle of the application.

#### IDE selection

Select an Integrated Development Environment (IDE) that supports Java development, Maven, and Spring Boot. Frequently used options include Visual Studio Code, IntelliJ IDEA, or Eclipse.

#### Java runtime

Install and use OpenJDK 17 as your Java runtime environment. Download it from the [official JDK 17 download page](https://jdk.java.net/17/).

#### Modeling

Download and use Camunda Modeler for designing and modeling business processes. Modeler is available [here](https://camunda.org/download/modeler/).

#### Code integration

Incorporate all Java code and BPMN process models into the Spring Boot project, ensuring that they are structured correctly and referenced properly within the application.

### Run the process application:

To run the process application, transfer the `jar` to the desired server.

Start the application using the command `java -jar YourProcessApplication.jar`. Frequently, this deployment process is managed through Docker for ease of use.

For a practical implementation, refer to our [example application on GitHub](https://github.com/camunda-community-hub/camunda-cloud-examples/tree/main/twitter-review-java-springboot), which demonstrates a typical setup for a Spring Boot-based process application with Camunda.

<!-- This should be moved from the Community Hub -->

## Customize your stack

### Polyglot stacks

You can develop process solutions as described with Java above also in any other programming language, including JavaScript. Use the [existing language clients and SDKs](/apis-tools/working-with-apis-tools.md) for doing this.

### Run Camunda 8 Self-Managed

Run Camunda 8 on your Kubernetes cluster. For local development, a [Docker Compose configuration is available](/self-managed/setup/deploy/other/docker.md), though not for production use. Learn more in the [deployment docs](/self-managed/setup/install.md).
