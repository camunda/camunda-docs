---
id: getting-started-java-spring
title: Getting started as a Java developer using Spring
sidebar_label: Getting started as a Java developer using Spring
description: "Use Spring Boot and the Spring Zeebe SDK to interact with your local Self-Managed Camunda 8 installation."
keywords: [java, spring, spring zeebe, getting started, user guide, tutorial]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">TBD</span>

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

To confirm Camunda 8 Self-Managed is installed, click into Docker Desktop. Here, you will see the `camunda-platform` container. Alternatively, navigate to the different components and log in with the username `demo` and password `demo`. For example, Operate can be accessed at [http://localhost:8081](http://localhost:8081).

Find additional guidance in the repository [README](https://github.com/camunda/camunda-platform?tab=readme-ov-file#using-docker-compose).

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
5. Download the project and add it to your desired location.
6. Run `mvn spring-boot:run` to confirm your Spring project builds.
7. (Optional) Run `git init` if you'd like to commit milestones along the way, and add a `.gitignore` file with `target/` to ignore build artifacts.

## Step 3: Create a new BPMN diagram

Next, we'll create a BPMN diagram to represent the transaction model shown at the beginning of this guide:

1. Open Desktop Modeler.
2. Click **Create a new diagram**, and name your diagram `Process payments` with an id of `process-payments`.
3. Add a start event, and name it `Payment request received`.
4. Add a task named `Prepare transaction` and configure the following properties:
   1. **Type**: `script`.
   2. **Implementation**: `FEEL expression`
   3. **Script/Result variable**: `totalWithTax`
   4. **Script/FEEL expression**: `total * 1.1` (this represents the tax applied to the transaction.)
5. Add a task named `Charge credit card` and configure the following properties:
   1. **Type**: `Service task`
   2. **Task definition/Type**: `charge-credit-card`
6. Add an end event named `Payment executed`.
7. Save this BPMN file in the location of your Spring project.
