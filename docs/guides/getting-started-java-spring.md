---
id: getting-started-java-spring
title: Getting started as a Java developer using Spring
sidebar_label: Getting started as a Java developer using Spring
description: "Use Spring Boot and the Spring Zeebe SDK to interact with your local Self-Managed Camunda 8 installation."
keywords: [java, spring, spring zeebe, getting started, user guide, tutorial]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">1 hour</span>

In this guide, we'll step through using Spring Boot and the [Spring Zeebe SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) to interact with your local Self-Managed Camunda 8 installation.

By the end of this tutorial, you'll be able to use Spring and Java code with Zeebe to:

- Deploy a process model.
- Initiate a process instance.
- Handle a service task.

For example, in this guide we will outline a BPMN model to receive a payment request, prepare a transaction, charge a credit card, and execute a payment:

![example BPMN model to receive a payment request, prepare a transaction, charge a credit card, and execute a payment](./img/prepare-transaction-example.png)

:::note
This tutorial is not intended for production purposes.
:::

## Prerequisites

Before getting started, ensure you:

- Can access to your preferred code editor or IDE.
- Have Java [installed locally](https://www.java.com/en/download/).
- Have Docker Compose installed on your desktop. For additional guidance, visit our [Docker Compose documentation](/self-managed/setup/deploy/local/docker-compose.md) and [related GitHub respository](https://github.com/camunda/camunda-platform?tab=readme-ov-file#using-docker-compose).
- Install [Desktop Modeler](https://camunda.com/download/modeler/).

## Step 1: Install Camunda 8 Self-Managed

If you haven't already, ensure you have Camunda 8 Self-Managed installed locally:

1. To spin up a Camunda 8 Self-Managed environment locally, you can use the `docker-compose.yaml` file in [this repository](https://github.com/camunda/camunda-platform).
2. Clone this repo and run `docker compose up -d` in your terminal to start your environment.

To confirm Camunda 8 Self-Managed is installed, click into Docker Desktop. Here, you will see the `camunda-platform` container. Alternatively, navigate to the different components and log in with the username `demo` and password `demo`. For example, Operate can be accessed at [http://localhost:8081](http://localhost:8081) (as noted under **Port(s)** in the Docker container). Find additional guidance in the repository [README](https://github.com/camunda/camunda-platform?tab=readme-ov-file#using-docker-compose).

## Step 2: Create a new Spring Boot project

Next, create a new Spring Boot project:

1. Go to [https://start.spring.io/](https://start.spring.io/) to get started.
2. Under **Project**, select **Maven**. Under **Launguage**, select **Java** is selected.Under **Spring Boot**, select the latest non-SNAPSHOT version.
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
5. Download the project, click into the `.zip` file, and add it to your desired location.
6. Open this project in your preferred code editor.
7. Run `mvn spring-boot:run` in your terminal to confirm your Spring project builds.
8. (Optional) Run `git init` if you'd like to commit milestones along the way, and add a `.gitignore` file with `target/` to ignore build artifacts.

## Step 3: Create a new BPMN diagram

Next, we'll create a BPMN diagram to represent the transaction model shown at the beginning of this guide:

1. Open Desktop Modeler.
2. Click **Create a new diagram**in Camunda 8, and name your diagram `Process payments` with an id of `process-payments`.
3. Add a start event, and name it `Payment request received`.
4. Add a task named `Prepare transaction`. Click the wrench-shaped icon to change the type of task to a script task, and configure the following properties:
   1. **Implementation**: `FEEL expression`
   2. **Script/Result variable**: `totalWithTax`
   3. **Script/FEEL expression**: `total * 1.1` (this represents the tax applied to the transaction.)
5. Add a task named `Charge credit card`.
6. Click on the task and click the wrench-shaped icon to change the type of task to a service task. In the properties panel, change the **Task definition/Type** to `charge-credit-card`.
7. Add an end event named `Payment executed`.
8. Save this BPMN file to your Spring project in `src/main/resources`, and name it `process-payments.bpmn`.

## Step 4: Deploy your process

To deploy your process, take the following steps:

1. Open Desktop Modeler and click the rocket icon in the bottom left corner.
2. Change the **Deployment name** to `process-payments`, and ensure the **Target** is `Camunda 8 Self-Managed`.
3. Change the **Cluster endpoint** to `http://localhost:26500/`, with no authentication.
4. Click **Deploy**.

When you open Operate, you should now note the process deployed to your local Self-
Managed setup.

## Step 5: Run your process from Modeler

To run your process, take the following steps:

1. From Desktop Modeler, click the "play" icon (next to the rocket icon to deploy) in the bottom left corner.
2. In **Variables**, insert the JSON object `{"total": 100}`.
3. Click **Start**.

From Operate, you should now notice a process instance running. You'll notice the process has stopped at **Charge credit card**, because we'll need to configure a job worker.

## Step 6: Implement a service task

To implement a service task, take the following steps:

### Configure Spring Boot Starter

See our documentation on [adding the Spring Zeebe SDK to your project](/apis-tools/spring-zeebe-sdk/getting-started.md#add-the-spring-zeebe-sdk-to-your-project) for more details, also described below:

1. Copy the following code snippet into the `pom.xml` file of your Spring project, below properties and above dependencies:

```
<repositories>
   <repository>
      <releases>
         <enabled>true</enabled>
      </releases>
      <snapshots>
         <enabled>false</enabled>
      </snapshots>
      <id>identity</id>
      <name>Camunda Identity</name>
      <url>https://artifacts.camunda.com/artifactory/camunda-identity/</url>
   </repository>
</repositories>
```

2. Add the following dependency to your `pom.xml` file:

```
<dependency>
   <groupId>io.camunda</groupId>
   <artifactId>spring-boot-starter-camunda-sdk</artifactId>
   <version>8.5.0</version>
</dependency>
```

### Configure the Zeebe client

Open your `src/main/resources/application.properties` file, and paste the following snippet to connect to a Self-Managed Zeebe broker:

```
zeebe.client.broker.grpcAddress=http://127.0.0.1:26500
zeebe.client.broker.restAddress=http://127.0.0.1:8080
zeebe.client.security.plaintext=true
```

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

3. Next, we can decorate our class with `@Component` and instantiate a logger:

```java
@Component
public class ChargeCreditCardWorker {

  private final static Logger LOG = LoggerFactory.getLogger(ChargeCreditCardWorker.class);
```

4. Add the following method and decorate the `chargeCreditCard` method with `@JobWorker`:

```java
  @JobWorker(type = "charge-credit-card")
```

5. Specify a `@Variable(name = "totalWithTax") Double totalWithTax` argument into the `chargeCreditCard` method:

```java
  public Map<String, Double> chargeCreditCard(@Variable(name = "totalWithTax") Double totalWithTax) {
```

6. Lastly, implement the `chargeCreditCard` method:

```java
   LOG.info("charging credit card: {}", totalWithTax);
    return Map.of("amountCharged", totalWithTax);
```

:::note
If you want to check your work, visit our [sample repository](https://github.com/camunda/camunda-8-get-started-spring/blob/main/src/main/java/io/camunda/demo/process_payments/ChargeCreditCardWorker.java) with the completed code.
:::

In your terminal, run `mvn spring-boot:run`, where you should see the `charging credit card` output. In Operate, refresh if needed, and note the payment has executed.

## Step 7: Start a process instance

To kick off your process instance, take the following steps:

1. In `ProcessPaymentsApplication.java`, instantiate a static logger:

```java
@SpringBootApplication

private static final Logger LOG = LoggerFactory.getLogger(ProcessPaymentsApplication.class);
```

2. Declare an autowired `ZeebeClient`:

```java
	@Autowired
	private ZeebeClient zeebeClient;

	public static void main(String[] args) {
		SpringApplication.run(ProcessPaymentsApplication.class, args);
	}
```

3. To convert the application to a `CommandLineRunner`, add `implements CommandLineRunner` to the class declaration `public class ProcessPaymentsApplication implements CommandLineRunner`.
4. Implement an overriding run method:

```java
	@Override
	public void run(final String... args) {
		var processDefinitionKey = "process-payments"; // or whatever the key is
		var event = zeebeClient.newCreateInstanceCommand()
				.bpmnProcessId(processDefinitionKey)
				.latestVersion()
				.variables(Map.of("total", 100))
				.send()
				.join();
		LOG.info(String.format("started a process: %d", event.getProcessInstanceKey()));
	}
```

:::note
If you want to check your work, visit our [sample repository](https://github.com/camunda/camunda-8-get-started-spring/blob/main/src/main/java/io/camunda/demo/process_payments/ProcessPaymentsApplication.java) with the completed code.
:::

Re-run the application in your terminal with `mvn spring-boot:run` to see the process run, and note the instance history in Operate.

## Step 8: Deploy the process

To deploy your process, take the following steps:

1. Add `@Deployment(resources = "classpath:process-payments.bpmn")` to `ProcessPaymentsApplication.java`:
2. In Desktop Modeler, change the tax amount calculated to `total * 1.2` under **FEEL expression**.

Re-run the application in your terminal with `mvn spring-boot:run` to see the process run. In Operate, note the new version `2` when filtering process instances.
