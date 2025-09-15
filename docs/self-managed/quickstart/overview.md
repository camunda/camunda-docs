---
id: overview
title: "Quickstart"
sidebar_label: "Quickstart"
description: ""
---

Welcome to the **Quickstart** section for Camunda 8 Self-Managed. This guide is designed to help you get up and running quickly with Camunda 8 in a local environment—whether you're a developer building process solutions or an administrator responsible for deploying and running Camunda clusters.

You’ll find two tailored quickstart paths:

- A **developer quickstart** using lightweight tools like **Camunda 8 Run** and **Docker Compose**.
- An **administrator quickstart** using **Kind (Kubernetes in Docker)** to simulate real-world infrastructure.

:::note
These quickstarts are intended for local testing and learning purposes only. They are not designed for production deployments.
:::

## Quickstart for developers

If you're a developer looking to evaluate or build process solutions with Camunda 8, this path is for you. It focuses on getting a minimal setup running quickly using:

- **Camunda 8 Run**: A lightweight distribution of the Camunda engine.
- **Docker Compose**: For spinning up required services like Zeebe, Operate, and Tasklist.

[Get started with the developer quickstart](./developer-quickstart.md)

## Quickstart for administrators

If you're an administrator exploring how Camunda 8 runs in a Kubernetes-like environment, this guide walks you through:

- Using **Kind** to simulate a Kubernetes cluster locally.
- Deploying the full Camunda 8 stack using Helm charts.

[Get started with the administrator quickstart](./administrator-quickstart.md)

## What you’ll learn

In each quickstart, you will:

- Spin up a local environment with the core Camunda 8 components.
- Deploy a sample process definition.
- Interact with the platform using Operate and Tasklist.
- Understand the responsibilities associated with your chosen role (developer or administrator).

## Prerequisites

Each quickstart guide lists the required tools and setup steps. In general, you’ll need:

- Docker and Docker Compose (for developers).
- Kind, kubectl, and Helm (for administrators).
- A basic understanding of BPMN and distributed systems is helpful but not required.

## Next steps

After completing a quickstart, you can:

- Dive deeper into platform components like Zeebe, Operate, and Identity.
- Learn about production deployment options.
- Explore real-world examples and best practices.
