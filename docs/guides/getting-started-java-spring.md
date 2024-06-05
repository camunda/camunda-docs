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
