---
id: getting-started-java-spring
title: Getting started as a Java developer using Spring
sidebar_label: Getting started as a Java developer using Spring
description: "Use Spring Boot and the Spring Zeebe SDK to interact with your local Self-Managed Camunda 8 installation."
keywords: [java, spring, spring zeebe, getting started, user guide, tutorial]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">1 hour</span>

In this guide, we'll step through using Spring Boot and the [Spring Zeebe SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) with Desktop Modeler to interact with your local Self-Managed Camunda 8 installation.

:::note
This guide specifically uses Java and Spring because the two, in combination with Camunda 8, is our default technology stack recommendation. Learn more in the [Java greenfield documentation](/components/best-practices/architecture/deciding-about-your-stack.md#the-java-greenfield-stack).
:::

By the end of this tutorial, you'll be able to use Spring and Java code with Zeebe to:

- Deploy a process model.
- Initiate a process instance.
- Handle a service task.

For example, in this guide we will outline a BPMN model to receive a payment request, prepare a transaction, charge a credit card, and execute a payment:

![example BPMN model to receive a payment request, prepare a transaction, charge a credit card, and execute a payment](./img/prepare-transaction-example.png)

:::note
While stepping through this guide, you can visit our [sample repository](https://github.com/camunda/camunda-8-get-started-spring/blob/main/src/main/java/io/camunda/demo/process_payments/ChargeCreditCardWorker.java) with the completed code to check your work.
:::

:::note
This tutorial is not intended for production purposes.
:::

## Prerequisites

Before getting started, ensure you:

- Can access your preferred code editor or IDE.
- Have Java [installed locally](https://www.java.com/en/download/). Currently, the Spring Initializr supports Java versions 17, 21, and 22.
- Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed locally.
- Install [Desktop Modeler](https://camunda.com/download/modeler/).

## Step 1: Install Camunda 8 Self-Managed

If you haven't already, follow [this guide](/self-managed/setup/deploy/local/docker-compose.md) to install Camunda 8 Self-Managed locally via Docker Compose:

1. Use the `docker-compose.yaml` file in [this repository](https://github.com/camunda/camunda-platform).
2. Clone this repo and run `docker compose up -d` in your terminal to start your environment.

:::note
For Camunda versions earlier than 8.6, the `docker compose up -d` command is only available to enterprise customers with access to Camunda's private registry. From version 8.6 onwards, `docker compose up -d` is available for all users, as Web Modeler images are publicly available.
:::

To confirm Camunda 8 Self-Managed is installed, click into Docker Desktop. Here, you will see the `camunda-platform` container. Alternatively, navigate to the different components and log in with the username `demo` and password `demo`. For example, Operate can be accessed at [http://localhost:8081](http://localhost:8081) (as noted under **Port(s)** in the Docker container). Find additional guidance in the repository [README](https://github.com/camunda/camunda-platform?tab=readme-ov-file#using-docker-compose).

## Step 2: Create a new Spring Boot project

Next, create a new Spring Boot project:

1. Go to [https://start.spring.io/](https://start.spring.io/) to get started.
2. Under **Project**, select **Maven**. Under **Language**, select **Java**. Under **Spring Boot**, select the latest non-SNAPSHOT version (currently 3.3.0).
3. Under **Project Metadata**, configure the following:
   1. **Group**: `io.camunda.demo`
   2. **Artifact**: `process_payments`
   3. **Name**: `Process payments`
   4. **Description**: `Process payments with Camunda`
   5. **Package name**: `io.camunda.demo.process_payments`
   6. **Packaging**: `Jar`
   7. **Java**: Select the Java version you have installed.
   8. For this tutorial, we will not install any dependencies.
4. Click **Generate**.
5. Download the project, extract the `.zip` file, and add the contents to your desired location.
6. Open this project in your preferred code editor.
7. Run `mvn spring-boot:run` in your terminal to confirm your Spring project builds.
8. (Optional) Run `git init` if you'd like to commit milestones along the way, and add a `.gitignore` file containing `target/` to ignore build artifacts.

## Step 3: Create a new BPMN diagram

Next, we'll create a BPMN diagram to represent the transaction model shown at the beginning of this guide:

1. Open Desktop Modeler.
2. Click **Create a new diagram** in Camunda 8, and name your diagram `Process payments` with an id of `process-payments`.
3. Add a start event, and name it `Payment request received`.
4. Append a task named `Prepare transaction`.
5. Click the wrench-shaped change type context menu icon to change the type of task to a script task, and configure the following properties:
   1. **Implementation**: `FEEL expression`
   2. **Script/Result variable**: `totalWithTax`
   3. **Script/FEEL expression**: `total * 1.1` (this represents the tax applied to the transaction.)
6. Append a task named `Charge credit card`.
7. Click on the task and click the wrench-shaped icon to change the type of task to a service task. In the properties panel, change the **Task definition/Type** to `charge-credit-card`.
8. Append an end event named `Payment executed`.
9. Save this BPMN file to your Spring project in `src/main/resources`, and name it `process-payments.bpmn`.

## Step 4: Deploy your process

To deploy your process, take the following steps:

1. Open Desktop Modeler and click the rocket icon in the bottom left corner.
2. Change the **Deployment name** to `process-payments`, and ensure the **Target** is `Camunda 8 Self-Managed`.
3. Change the **Cluster endpoint** to `http://localhost:26500/`, with no authentication.
4. Click **Deploy**.

When you open Operate at http://localhost:8081/, you should now note the process deployed to your local Self-Managed setup.

## Step 5: Run your process from Modeler

To run your process, take the following steps:

1. From Desktop Modeler, click the "play" icon (next to the rocket icon to deploy) in the bottom left corner.
2. In **Variables**, insert the JSON object `{"total": 100}`.
3. Click **Start**.

From Operate, you should now notice a process instance running. You'll notice the process instance is waiting at **Charge credit card**, because we'll need to configure a job worker.

## Step 6: Implement a service task

To implement a service task, take the following steps:

### Configure Spring Boot Starter

Add the following Maven dependency to your Spring Boot Starter project, replacing `x` with the latest patch level available:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>spring-boot-starter-camunda-sdk</artifactId>
    <version>8.5.x</version>
</dependency>
```

### Configure the Zeebe client

Open your `src/main/resources/application.properties` file, and paste the following snippet to connect to the Self-Managed Zeebe broker:

```
zeebe.client.broker.grpcAddress=http://127.0.0.1:26500
zeebe.client.broker.restAddress=http://127.0.0.1:8080
zeebe.client.security.plaintext=true
```

:::note
Ensure you provide `grpcAddress` and `restAddress` in absolute URI format: `scheme://host(:port)`.
:::

### Create a worker

1. In `src/main/java/io/camunda/demo/process_payments/`, create a file called `ChargeCreditCardWorker.java`.
2. In the file created above, paste the following dependencies and package `package io.camunda.demo.process_payments`:

```java
package io.camunda.demo.process_payments;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.camunda.zeebe.spring.client.annotation.JobWorker;
import io.camunda.zeebe.spring.client.annotation.Variable;
```

3. Next, we can add a `ChargeCreditCardWorker` class decorated with `@Component` and instantiate a logger. Additionally, we will add a `chargeCreditCard` method and decorate it with `@JobWorker`, specifying the type of service tasks it will handle. The method takes a `@Variable(name = "totalWithTax") Double totalWithTax` argument to indicate which variables it needs from the task. The implementation of the method will log the `totalWithTax`, and return a map, to indicate to Zeebe that the task has been handled:

```java
@Component
public class ChargeCreditCardWorker {
  private final static Logger LOG = LoggerFactory.getLogger(ChargeCreditCardWorker.class);
  @JobWorker(type = "charge-credit-card")
  public Map<String, Double> chargeCreditCard(@Variable(name = "totalWithTax") Double totalWithTax) {
    LOG.info("charging credit card: {}", totalWithTax);
    return Map.of("amountCharged", totalWithTax);
  }
}
```

:::note
To check your work, visit our [sample repository](https://github.com/camunda/camunda-8-get-started-spring/blob/main/src/main/java/io/camunda/demo/process_payments/ChargeCreditCardWorker.java) with the completed code.
:::

In your terminal, run `mvn spring-boot:run`, where you should see the `charging credit card` output. In Operate, refresh if needed, and note the payment has executed.

## Step 7: Start a process instance

To start a process instance programmatically, take the following steps:

1. In `ProcessPaymentsApplication.java`, add the following dependencies after the package definition:

```java
package io.camunda.demo.process_payments;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.spring.client.annotation.Deployment;
```

2. Convert the application to a `CommandLineRunner`, by adding `implements CommandLineRunner` to the `ProcessPaymentsApplication` class declaration. Instantiate a static `Logger` variable, and an instance variable named `zeebeClient` with the `@Autowired` annotation.

```java
@SpringBootApplication
public class ProcessPaymentsApplication implements CommandLineRunner {

	private static final Logger LOG = LoggerFactory.getLogger(ProcessPaymentsApplication.class);

	@Autowired
	private ZeebeClient zeebeClient;

	public static void main(String[] args) {
		SpringApplication.run(ProcessPaymentsApplication.class, args);
	}
}
```

3. Implement an overriding `run` method in `ProcessPaymentsApplication`. When the application runs, it will create a new `process-payments` process instance, of the latest version, with specified variables, and send it to our local Self-Managed instance:

```java
	@Override
	public void run(final String... args) {
		var bpmnProcessId = "process-payments";
		var event = zeebeClient.newCreateInstanceCommand()
				.bpmnProcessId(bpmnProcessId)
				.latestVersion()
				.variables(Map.of("total", 100))
				.send()
				.join();
		LOG.info("started a process instance: {}", event.getProcessInstanceKey());
	}
```

:::note
To check your work, visit our [sample repository](https://github.com/camunda/camunda-8-get-started-spring/blob/main/src/main/java/io/camunda/demo/process_payments/ProcessPaymentsApplication.java) with the completed code.
:::

Re-run the application in your terminal with `mvn spring-boot:run` to see the process run, and note the instance history in Operate.

## Step 8: Deploy the process

To deploy your process, take the following steps:

1. Decorate the `ProcessPaymentsApplication` class with `@Deployment(resources = "classpath:process-payments.bpmn")` in `ProcessPaymentsApplication.java`:

```java
@SpringBootApplication
@Deployment(resources = "classpath:process-payments.bpmn")
```

2. In Desktop Modeler, change the tax amount calculated to `total * 1.2` under **FEEL expression** and save your changes.

Re-run the application in your terminal with `mvn spring-boot:run` to see the process run. In Operate, note the new version `2` when filtering process instances, and the tax amount has increased for the most recent process instance.
