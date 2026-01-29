---
id: quick-install
sidebar_label: Quick install
title: Install Camunda with Helm for development
description: Install Camunda 8 Self-Managed on Kubernetes using the Helm chart with default settings, suitable for testing and development.
---

import { HelmInstallOverviewMethods } from "@site/src/components/HelmInstallOverviewMethods";

Install the Orchestration Cluster with Helm for testing and development.

## Prerequisites

- A functioning Kubernetes cluster with:
  - [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) access.
  - Block-storage persistent volumes for stateful components.
  - Resource requirements.
- The [Helm CLI](https://helm.sh/docs/intro/install/) installed.

## Install Orchestration Cluster

1. Create a namespace

```bash
kubectl create namespace orchestration
```

2. Add the Helm repository

```bash
helm repo add camunda https://helm.camunda.io
helm repo update
```

3. Install the Helm chart

```bash
helm install camunda camunda/camunda-platform -n orchestration
```

This installs the latest version of the Helm chart, by default. If you need another version, [use the `--version` flag](https://helm.sh/docs/helm/helm_install/#options).

Verify that each pod is running and ready:

```shell
kubectl describe pods <POD_NAME>
```

Now, you've deployed the Camunda Orchestration Cluster with **Basic Authentication**.

4. Set up port-forwarding:

```bash
# Zeebe Gateway (for gRPC and REST API)
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500 -n orchestration
kubectl port-forward svc/camunda-zeebe-gateway 8088:8080 -n orchestration

# Connectors
kubectl port-forward svc/camunda-connectors 8086:8080 -n orchestration
```

5. Log in with the default credentials:

- **Username:** demo
- **Password:** demo

## Verify

Test the Zeebe Gateway connection:

```bash
curl -u demo:demo http://localhost:8088/v2/topology
```

You'll see a JSON response with the cluster topology information.

Access the available services:

| Service              | URL                                                              |
| :------------------- | :--------------------------------------------------------------- |
| Operate              | [http://localhost:8088/operate](http://localhost:8088/operate)   |
| Tasklist             | [http://localhost:8088/tasklist](http://localhost:8088/tasklist) |
| Identity             | [http://localhost:8088/identity](http://localhost:8088/identity) |
| Connectors           | [http://localhost:8086](http://localhost:8086)                   |
| Zeebe Gateway (gRPC) | [http://localhost:26500](http://localhost:26500)                 |
| Zeebe Gateway (HTTP) | [http://localhost:8088](http://localhost:8088)                   |

## Next steps

- Explore the [Camunda Reference Architectures](/self-managed/reference-architecture/reference-architecture.md) to learn how to run Camunda 8 in production.
- [Configure and install the helm chart in a production environment](/self-managed/deployment/helm/install/production/index.md).
- [Customize your installation, by modifying the Helm chart configuration](/self-managed/deployment/helm/configure/index.md).
