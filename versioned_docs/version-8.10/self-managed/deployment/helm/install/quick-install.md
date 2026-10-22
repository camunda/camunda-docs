---
id: quick-install
sidebar_label: Quick developer install
title: Install Camunda with Helm for development
description: Install Camunda 8 Self-Managed on Kubernetes using the Helm chart with default settings, suitable for testing and development.
---

Use this guide to quickly install the Camunda 8 orchestration cluster for testing and development.

<!-- TODO: add links to explain the Orchestration Cluster and management plane -->

:::tip Recommended local setup
For local development, use the [kind tutorial](/self-managed/deployment/helm/cloud-providers/kind.md) by default. Camunda tests that setup automatically.

Use this guide when you need only the Orchestration Cluster on an existing Kubernetes cluster, with no external database and no identity provider. For example, use it to try the Helm chart or to follow a training course.
:::

:::note
In this guide, you deploy the Orchestration Cluster with Basic authentication and RDBMS (embedded H2) as secondary storage. For a full deployment with all components (Optimize, Web Modeler, Console, Management Identity, and Keycloak), follow our [kind tutorial](/self-managed/deployment/helm/cloud-providers/kind.md). For production environments, see the [production installation guide](/self-managed/deployment/helm/install/production/index.md).
:::

## Prerequisites

- **Kubernetes cluster**: A functioning Kubernetes cluster with [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) access and block-storage persistent volumes for stateful components.
- **Helm**: The Helm CLI v4 installed. See [Installing Helm](https://helm.sh/docs/intro/install/).

## Orchestration Cluster only

The Helm chart deploys the Camunda Orchestration Cluster with **Basic authentication** and **RDBMS** as secondary storage (embedded H2), intended only for testing and development. No external database or identity provider is required.

:::warning H2 topology limitations
Embedded H2 is non-production only and valid only with a single broker and a single partition.

Do not run embedded H2 with a multi-broker Helm topology. H2 is local to each broker and does not provide shared secondary storage, which can cause incomplete or inconsistent query results.
:::

In production, Camunda 8 is typically deployed together with additional components such as Optimize, Web Modeler, and Console, which require OIDC-based authentication and external databases. For a full local deployment with all components, follow our [kind tutorial](/self-managed/deployment/helm/cloud-providers/kind.md).

1. **Create a namespace to install the platform on Kubernetes:**

   ```bash
   kubectl create namespace orchestration
   ```

   Output:

   ```bash
   namespace/orchestration created
   ```

2. **Add the Helm repository:**

   To install the Camunda 8 Self-Managed [Helm chart](https://helm.sh/docs/topics/charts/), add the [Helm repository](https://helm.sh/docs/topics/chart_repository/) with the following command:

   ```bash
   helm repo add camunda https://helm.camunda.io
   helm repo update
   ```

3. **Install the Helm chart:**

   ```bash
   helm install camunda camunda/camunda-platform \
     --values https://helm.camunda.io/camunda-platform/values/camunda-8.10/values-quick-install.yaml \
     -n orchestration
   ```

The Helm chart provides the [`values-quick-install.yaml`](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.10/values-quick-install.yaml) file. This file enables the RDBMS exporter and sets a file-based embedded H2 database as secondary storage. It also sets a single broker and a single partition.

The file contains the following values:

```yaml reference referenceLinkText="Source" title="values-quick-install.yaml"
https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.10/values-quick-install.yaml
```

If you need multiple brokers, switch to a shared external backend (for example, PostgreSQL) instead of H2.

If you already have an invalid H2 setup:

1. For local/dev use, reduce to `clusterSize=1`, `partitionCount=1`, `replicationFactor=1` and use file-based H2.
2. For clustered use, migrate secondary storage to an external persistent backend.

Starting with Camunda 8.9, the Helm chart no longer provisions Elasticsearch by default. You must explicitly enable a secondary storage backend (RDBMS, Elasticsearch, or OpenSearch) in your Helm values.

4. **Access the components:**

   Use the default credentials:

   ```
   username: demo
   password: demo
   ```

   Set up port-forwarding to access the services:

   ```bash
   # Zeebe Gateway (for gRPC and REST API)
   kubectl port-forward svc/camunda-zeebe-gateway 26500:26500 -n orchestration
   kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n orchestration

   # Connectors
   kubectl port-forward svc/camunda-connectors 8088:8080 -n orchestration
   ```

   **Verify the installation:**

Test the [Zeebe Gateway](/reference/glossary.md#zeebe-gateway) HTTP endpoint (Orchestration Cluster REST API):

```bash
curl -u demo:demo http://localhost:8080/v2/topology
```

You should see a JSON response with the cluster topology information.

Available services:

- **Operate:** [http://localhost:8080/operate](http://localhost:8080/operate) - Monitor process instances
- **Tasklist:** [http://localhost:8080/tasklist](http://localhost:8080/tasklist) - Complete user tasks
- **Admin:** [http://localhost:8080/admin](http://localhost:8080/admin) - User and permission management
- **Connectors:** [http://localhost:8088](http://localhost:8088) - External system integrations
- **Zeebe Gateway (gRPC):** localhost:26500 - Process deployment and execution
- **Zeebe Gateway (HTTP):** [http://localhost:8080](http://localhost:8080) - Orchestration Cluster REST API

:::note
In Camunda 8.8+, Operate, Tasklist, and Admin are integrated into the Orchestration Cluster and share the same endpoint (port 8080).
:::

## Full Cluster

To deploy the full Camunda 8 platform with all components (Optimize, Web Modeler, Console, Management Identity, and Keycloak), follow our [kind tutorial](/self-managed/deployment/helm/cloud-providers/kind.md). The full deployment requires OIDC-based authentication and [deploying required dependencies with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) for PostgreSQL, Elasticsearch, and Keycloak.

## Troubleshoot installation issues

### A pod stays in `Pending` state

**Observed behavior:** `kubectl get pods` shows a pod stuck in `Pending` and it never starts.

**Why this happens:** The scheduler couldn't place the pod onto any node, most often because the cluster doesn't have enough CPU, memory, or persistent volume capacity to satisfy the pod's requests.

**How to fix:**

1. Check the scheduler's reason for the pending pod:
   ```shell
   kubectl describe pods <POD_NAME>
   ```
2. Look for `Events` entries such as `Insufficient cpu`, `Insufficient memory`, or an unbound `PersistentVolumeClaim`.
3. Add node capacity, or reduce resource requests in your values file, to match what's actually available.

### The Orchestration Cluster fails with `Cannot determine the database vendor`

**Observed behavior:** The orchestration pod restarts, and its log shows `Cannot determine the database vendor ... from JDBC URL ''`.

**Why this happens:** You enabled the RDBMS exporter, but `orchestration.data.secondaryStorage.rdbms.url` is empty. The Helm chart does not set a default URL, and Camunda 8.10 and later do not select embedded H2 for an empty URL.

**How to fix:** Install with the values file from step 3 of [Orchestration Cluster only](#orchestration-cluster-only), or set `orchestration.data.secondaryStorage.rdbms.url` to a JDBC URL. For embedded H2, use `jdbc:h2:file:/usr/local/camunda/data/h2db`.

### A pod is running but never becomes ready

**Observed behavior:** `kubectl get pods` shows a pod in `Running` state, but it doesn't reach `Ready`, or it restarts repeatedly.

**Why this happens:** The container starts but fails its readiness or liveness probe, commonly due to a misconfiguration (wrong database URL, missing secret) or a dependency (secondary storage, Keycloak) that isn't available yet.

**How to fix:**

1. Check the container's logs for the actual error:
   ```shell
   kubectl logs -f <POD_NAME>
   ```
2. If the pod is restarting, check the log from the previous crashed instance:
   ```shell
   kubectl logs <POD_NAME> --previous
   ```
3. Cross-reference the error against your values file for the affected component.

## Install a specific version

By default, the Camunda Helm chart installs the latest version of the [Camunda 8 applications](/reference/supported-environments.md). Because Helm chart and application versions are released independently, their version numbers differ. For details, see the [Camunda 8 Helm Chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

To install the latest version of the chart and its application dependencies, run:

```shell
helm install camunda camunda/camunda-platform \
    --values https://helm.camunda.io/camunda-platform/values/values-latest.yaml
```

This command sets only the application image versions. Because the chart doesn't provision a secondary storage backend by default, also enable one, for example with the values file from step 3 of [Orchestration Cluster only](#orchestration-cluster-only).

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
- **Full deployment**: To deploy all Camunda 8 components with OIDC authentication and Kubernetes operators, follow our [kind tutorial](/self-managed/deployment/helm/cloud-providers/kind.md) or the [cloud provider guides](/self-managed/deployment/helm/cloud-providers/index.md).

## Next steps

- Explore the [Camunda Reference Architectures](/self-managed/reference-architecture/reference-architecture.md) to learn how to run Camunda 8 in production.

## Additional resources

<!-- TODO: Add links to the following:
- Basic authentication guide
- Enable Keycloak guide
- Enable OIDC guide
- Explanation of management/orchestration cluster -->

- [Deploy infrastructure with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) — deploy PostgreSQL, Elasticsearch, and Keycloak using official Kubernetes operators for the full platform.
- [Helm chart Amazon OpenSearch service usage](/self-managed/deployment/helm/configure/database/using-external-opensearch.md): configure Camunda to use Amazon OpenSearch Service instead of Elasticsearch.
- [Getting started with document handling](/self-managed/concepts/document-handling/overview.md) — configure document storage and management in Camunda 8.
- [Production installation](/self-managed/deployment/helm/install/production/index.md) — configure and install the helm chart for production environments.
- [Helm Configuration](/self-managed/deployment/helm/configure/index.md) - customize your installation by modifying the Helm chart configuration.

<!--## Next steps

If you would like to further customize the Camunda 8 Self-Managed Helm chart, please proceed to the following section:-->
