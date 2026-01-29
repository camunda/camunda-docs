---
id: new-quick-install
sidebar_label: Quick install
title: Install Camunda with Helm for development
description: Install Camunda 8 Self-Managed on Kubernetes using the Helm chart with default settings, suitable for testing and development.
---

import { HelmInstallOverviewMethods } from "@site/src/components/HelmInstallOverviewMethods";

Use this guide to install Camunda 8 Self-Managed with the orchestration cluster, and optionally enable additional components.

<!-- TODO: add links to explain the orchestration cluster and management cluster -->

## Prerequisites

- **Kubernetes cluster**: A functioning Kubernetes cluster with [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) access and block-storage persistent volumes for stateful components.
- **Helm**: The Helm CLI installed. See [Installing Helm](https://helm.sh/docs/intro/install/).

## Install Orchestration Cluster

By default, the Helm chart deploys the Camunda orchestration cluster with **basic authentication**, intended only for testing and development.

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
- **Pass**word: demo

## Verify install

Test the Zeebe Gateway connection:

```bash
curl -u demo:demo http://localhost:8088/v2/topology
```

You should see a JSON response with the cluster topology information.

Available services:

- **Operate:** [http://localhost:8088/operate](http://localhost:8088/operate) - Monitor process instances
- **Tasklist:** [http://localhost:8088/tasklist](http://localhost:8088/tasklist) - Complete user tasks
- **Identity:** [http://localhost:8088/identity](http://localhost:8088/identity) - User and permission management
- **Connectors:** [http://localhost:8086](http://localhost:8086) - External system integrations
- **Zeebe Gateway (gRPC):** localhost:26500 - Process deployment and execution
- **Zeebe Gateway (HTTP):** [http://localhost:8088](http://localhost:8088) - Zeebe REST API

## Troubleshoot installation issues

Verify that each pod is running and ready. If a pod is pending, it cannot be scheduled onto a node. This usually happens when the cluster does not have enough resources. To check messages from the scheduler, run:

```shell
kubectl describe pods <POD_NAME>
```

If `describe` does not help, check the pod logs by running:

```shell
kubectl logs -f <POD_NAME>
```

## Install a specific version

By default, the Camunda Helm chart installs the latest version of the [Camunda 8 applications](/reference/supported-environments.md). Because Helm chart and application versions are released independently, their version numbers differ. For details, see the [Camunda 8 Helm Chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

To install the latest version of the chart and its application dependencies, run:

```shell
helm install camunda camunda/camunda-platform \
    --values https://helm.camunda.io/camunda-platform/values/values-latest.yaml
```

To install a specific chart version, use the `--version` flag with the chart version number. For example, the chart version for Camunda 8.8 is `13`:

```shell
helm install camunda camunda/camunda-platform --version 13 \
    --values https://helm.camunda.io/camunda-platform/values/values-v8.8.yaml
```

Specifying only the major chart version (for example, `13`) installs the latest available `13.x.y` release. You can also specify a minor version (for example, `12.6`) to install the latest `12.6.y` release.

If you are unsure which chart version corresponds to your Camunda application version, run:

```shell
helm search repo -l camunda/camunda-platform
```

This command lists all available chart versions and their corresponding application versions.

## Notes and requirements

- **Zeebe** supports Kubernetes startup and liveness probes. See [Gateway health probes](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway-health-probes.md).
- **Zeebe** must be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to preserve cluster node identities. StatefulSets require persistent storage, which you must provision in advance. The type of storage depends on your cloud provider.
- **Docker pull limits** apply when downloading Camunda 8 images from Docker Hub. To avoid disruptions, authenticate with Docker Hub or use a mirror registry.
- **Air-gapped environments** require additional configuration. See [Helm chart air-gapped environment installation](/self-managed/deployment/helm/configure/registry-and-images/air-gapped-installation.md).
- **Image sources**: By default, the Helm chart uses Bitnami open-source images for infrastructure dependencies (PostgreSQL, Elasticsearch, Keycloak). For production environments, Camunda recommends using Bitnami Premium images for enhanced security and vendor support. For detailed information about image types, CVE handling policies, and installation procedures, see [Install Bitnami enterprise images](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).
- **Infrastructure deployment alternatives**: For production deployments, consider using [vendor-supported infrastructure deployment methods](/self-managed/deployment/helm/configure/vendor-supported-infrastructure.md) with official operators for PostgreSQL, Elasticsearch, and Keycloak.

## Next steps

- Explore the [Camunda Reference Architectures](/self-managed/reference-architecture/reference-architecture.md) to learn how to run Camunda 8 in production.

## Additional resources

<!-- TODO: Add links to the following:
- Basic auth guide
- Enable Keycloak guide
- Enable OIDC guide
- Explanation of management/orchestration cluster -->

- [Helm chart Amazon OpenSearch service usage](/self-managed/deployment/helm/configure/database/using-external-opensearch.md) — configure Camunda to use Amazon OpenSearch Service instead of the default Elasticsearch.
- [Getting started with document handling](/self-managed/concepts/document-handling/overview.md) — configure document storage and management in Camunda 8.
- [Production installation](/self-managed/deployment/helm/install/production/index.md) — configure and install the helm chart for production environments.
- [Helm Configuration](/self-managed/deployment/helm/configure/index.md) - customize your installation by modifying the Helm chart configuration.

<!--## Next steps

If you would like to further customize the Camunda 8 Self-Managed Helm chart, please proceed to the following section:-->
