---
id: index
sidebar_label: Kubernetes with Helm
title: Camunda Helm chart
description: Learn how to install Camunda 8 Self-Managed using Kubernetes with Helm.
page_rank: 80
---

import { HelmChartInstall } from "@site/src/components/CamundaDistributions";

:::note
The `13.0.0-alpha4.1` Helm chart released with Camunda 8.8.0-alpha4 introduces a new default setup to support the 8.8 [Identity management updates](/reference/announcements-release-notes/880/880-release-notes.md#identity-management-updates-saasself-managed). Currently, this setup is limited to the following components:

- The Orchestration core (Zeebe, Operate, Tasklist, and Orchestration Cluster Identity)
- Connectors

This limitation will be resolved in a future alpha release.
:::

We recommend using Kubernetes and Helm to deploy and run Camunda 8 Self-Managed in production environments.

There are many ways to provision and configure a Kubernetes cluster, and several architectural decisions to consider. For example, will your workers run inside the Kubernetes cluster or externally? You'll need to configure the cluster accordingly and tailor the setup to your architecture.

Camunda provides continuously improved Helm charts that are not tied to any specific cloud provider allowing you to choose your preferred Kubernetes platform. These charts are available in the [Camunda Helm repository](https://artifacthub.io/packages/helm/camunda/camunda-platform). To provide feedback or report issues, use the [Helm GitHub repository](https://github.com/camunda/camunda-platform-helm/issues).

## What is Helm?

[Helm](https://helm.sh/) is a package manager for Kubernetes resources. It lets you install a set of components by referencing a chart name and overriding configurations to suit various deployment scenarios.

Helm also manages dependencies between charts, so that multiple components can be installed and configured with a single command.

For details, see the full list of [Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters).

## Reference architecture

For guidance on sizing and deployment patterns, see the [Kubernetes reference architecture](/self-managed/reference-architecture/kubernetes.md).

![Camunda 8 Self-Managed Architecture Diagram](./assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

When you install the [camunda-platform](https://artifacthub.io/packages/helm/camunda/camunda-platform) Helm chart, all components shown in the architecture diagram are installed.

## Versioning

Starting with Camunda 8.4 (January 2024), the Helm chart version is independent of the application version. For example, the chart version may be `9.0.0` while the application version is `8.4.x`.

To see which application versions are included in a specific Helm chart, see the [Camunda 8 Helm Chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

## Get started

To install Camunda with the default orchestration cluster, see [Install Camunda with Helm](/self-managed/installation-methods/helm/install.md).
