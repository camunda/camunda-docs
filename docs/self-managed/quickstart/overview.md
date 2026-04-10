---
id: overview
title: "Quickstart"
sidebar_label: "Quickstart"
description: "Get Camunda 8 up and running quickly in your local environment, whether you're a developer building process solutions or an administrator responsible for deploying and running Camunda clusters."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::note
These quickstarts are intended for local testing and learning purposes only. They are not designed for production deployments.
:::

## Quickstart for developers

Are you a developer looking to evaluate or build process solutions with Camunda 8? Get a minimal setup running quickly using:

- **Camunda 8 Run**: A lightweight distribution of the Camunda engine.
- **Docker Compose**: For spinning up required services like Zeebe, Operate, and Tasklist.

<p class="link-arrow">[Quickstart for developers](./developer-quickstart.md)</p>

## Quickstart for administrators

Are you an administrator wanting to explore how Camunda 8 runs in a Kubernetes-like environment? Learn how you can:

- Use **Kind** to simulate a Kubernetes cluster locally.
- Deploy the full Camunda 8 stack using Helm charts.

<p class="link-arrow">[Quickstart for administrators](/self-managed/deployment/helm/cloud-providers/kind.md)</p>

## What you’ll learn

In each quickstart, you will:

- Spin up a local environment with the core Camunda 8 components.
- Deploy a sample process definition.
- Interact with the Orchestration Cluster web applications (Operate and Tasklist).
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
