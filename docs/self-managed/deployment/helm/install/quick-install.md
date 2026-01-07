---
id: quick-install
sidebar_label: Quick install
title: Install Camunda with Helm for development
description: Install Camunda 8 Self-Managed on Kubernetes using the Helm chart with default settings, suitable for testing and development.
---

import { HelmInstallOverviewMethods } from "@site/src/components/HelmInstallOverviewMethods";

Use this guide to install Camunda 8 Self-Managed with the orchestration cluster, and optionally enable additional components.

<!-- TODO: add links to explain the orchestration cluster and management cluster -->

:::note
By default, the Camunda Helm chart uses Bitnami open-source images. For production environments, Camunda recommends switching to vendor-supported enterprise images. This guide explains how to create registry secrets and install [Camunda with enterprise images](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).
:::

## Prerequisites

- **Kubernetes cluster**: A functioning Kubernetes cluster with [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) access and block-storage persistent volumes for stateful components. See [Cloud providers](/self-managed/deployment/helm/cloud-providers/index.md) for instructions to create a Kubernetes cluster.
- **Helm**: The Helm CLI installed. See [Installing Helm](https://helm.sh/docs/intro/install/).

## Overview

<HelmInstallOverviewMethods/>

## Orchestration Cluster only

By default, the Helm chart deploys the Camunda orchestration cluster with **basic authentication**, intended only for testing and development. In production, Camunda 8 is typically deployed together with additional applications such as Optimize, Web Modeler, and Console, which require **OIDC-based authentication** (for example, using Keycloak). For details, see the [Full Cluster](#full-cluster) section.

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
   helm install camunda camunda/camunda-platform -n orchestration
   ```

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
   kubectl port-forward svc/camunda-zeebe-gateway 8088:8080 -n orchestration

   # Connectors
   kubectl port-forward svc/camunda-connectors 8086:8080 -n orchestration
   ```

   **Verify the installation:**

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

   :::note
   In Camunda 8.8+, Operate, Tasklist, and Identity are integrated into the Orchestration component and share the same endpoint (port 8088).
   :::

## Full Cluster

<!-- TODO: Add links to doc pages that explain each component. -->

The following components run outside the orchestration cluster and are disabled by default in Helm Charts:

- Optimize
- Web Modeler
- Console
- Management Identity
- Keycloak

These components do not support basic authentication, so you must use any OIDC provider. In the following example, we use Keycloak as a locally running OIDC provider. The values file will deploy all Camunda 8 components.

<!-- TODO: Add a suitable link to explain what a values.yaml file is. -->

Because the default configuration of the Helm chart uses basic authentication, you need to create a [values.yaml](https://helm.sh/docs/chart_template_guide/values_files/) file to modify the default configuration to:

- Enable Keycloak to provide another method of authentication via OIDC.
- Enable other Camunda components that run alongside the orchestration cluster.

<!-- TODO: Remove setting existingSecret in favor of autoGenerate secrets -->

Create a file called `camunda-values.yaml` with the following content:

```yaml
global:
  elasticsearch:
    enabled: true
  secrets:
    autoGenerated: true
    name: "camunda-credentials"
  identity:
    auth:
      enabled: true
      publicIssuerUrl: "http://localhost:18080/auth/realms/camunda-platform"
      webModeler:
        redirectUrl: "http://localhost:8070"
      console:
        redirectUrl: "http://localhost:8087"
      optimize:
        redirectUrl: "http://localhost:8083"
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"

      orchestration:
        redirectUrl: "http://localhost:8080"
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"
      connectors:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"

identityKeycloak:
  enabled: true
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"

optimize:
  enabled: true

connectors:
  enabled: true
  security:
    authentication:
      method: oidc
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"

webModeler:
  enabled: true
  restapi:
    mail:
      # This value is required, otherwise the restapi pod wouldn't start.
      fromAddress: noreply@example.com

# WebModeler Database.
webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

orchestration:
  enabled: true
  clusterSize: "1"
  partitionCount: "1"
  replicationFactor: "1"
  security:
    authentication:
      method: oidc
      oidc:
        redirectUrl: "http://localhost:8080"
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"

console:
  enabled: true

elasticsearch:
  enabled: true
  master:
    replicaCount: 1
    persistence:
      size: 10Gi
```

### Install and verify the deployment

Installing all components in a cluster requires downloading all related Docker images to the Kubernetes nodes. The time required depends on your cloud provider and network speed.

1. **Create the namespace:**

   ```bash
   kubectl create namespace camunda
   ```

2. **Install the Helm chart:**

   ```bash
   helm install camunda camunda-platform \
     --version 13.0.0 \
     --namespace camunda \
     -f camunda-values.yaml
   ```

3. **Wait for all pods to be ready:**

   Monitor the pod status until all pods show `Running` and `Ready`:

   ```bash
   kubectl get pods -n camunda -w
   ```

   Wait until you see output similar to:

   ```
   NAME                                          READY   STATUS    RESTARTS   AGE
   camunda-keycloak-0                           1/1     Running   0          5m
   camunda-identity-6c8b7f4d9-xyz123           1/1     Running   0          5m
   camunda-zeebe-0                              1/1     Running   0          5m
   camunda-web-modeler-webapp-abc456-def789    1/1     Running   0          5m
   ...
   ```

   Press `Ctrl+C` to stop monitoring once all pods are ready.

### Get started with Web Modeler

Follow this workflow to deploy your first process model and verify it works end-to-end:

#### 1. Set up port-forwarding

Open separate terminal windows and run these commands to access the required services:

```bash
# Terminal 1: Keycloak (for authentication)
kubectl port-forward svc/camunda-keycloak 18080:80 -n camunda

# Terminal 2: Web Modeler (for modeling)
kubectl port-forward svc/camunda-web-modeler-webapp 8070:80 -n camunda

# Terminal 3: Zeebe Gateway (for deployment and process execution)
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n camunda
```

#### 2. Get your credentials

Retrieve the password for the `demo` user:

```bash
kubectl get secret camunda-credentials -n camunda -o jsonpath='{.data.identity-firstuser-password}' | base64 -d
```

#### 3. Access Web Modeler

1. Open your browser and navigate to [http://localhost:8070](http://localhost:8070)
2. Log in with:
   - **Username:** `demo`
   - **Password:** (use the password retrieved in step 2)

#### 4. Create and deploy a process

1. In Web Modeler, create a new BPMN diagram
2. Design a simple process (or use the default process template)
3. Click **Deploy & Run** to deploy your process to the Zeebe cluster

#### 5. Verify in Operate

1. Set up port-forwarding for Operate in a new terminal:

   ```bash
   kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n camunda
   ```

2. Open [http://localhost:8080/operate](http://localhost:8080/operate) in your browser
3. Log in with the same `demo` credentials
4. Verify that your deployed process instance appears in the dashboard and shows the expected flow

### Access all components

For complete access to all Camunda components, set up port-forwarding for all services:

```bash
# Authentication
kubectl port-forward svc/camunda-keycloak 18080:80 -n camunda
kubectl port-forward svc/camunda-identity 18081:80 -n camunda

# Web interfaces
kubectl port-forward svc/camunda-optimize 8083:80 -n camunda
kubectl port-forward svc/camunda-web-modeler-webapp 8070:80 -n camunda
kubectl port-forward svc/camunda-console 8087:80 -n camunda

# Zeebe and Connectors
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500 -n camunda
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n camunda
kubectl port-forward svc/camunda-connectors 8085:8080 -n camunda
```

#### Available URLs

Once port-forwarding is active, access the UIs in your browser:

| Component                | URL                                                              | Description                                                  |
| ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **Zeebe Gateway (gRPC)** | [http://localhost:26500](http://localhost:26500)                 | Process deployment and execution                             |
| **Zeebe Gateway (HTTP)** | [http://localhost:8080/](http://localhost:8080/)                 | Zeebe REST API                                               |
| **Operate**              | [http://localhost:8080/operate](http://localhost:8080/operate)   | Monitor process instances                                    |
| **Tasklist**             | [http://localhost:8080/tasklist](http://localhost:8080/tasklist) | Complete user tasks                                          |
| **Web Modeler**          | [http://localhost:8070](http://localhost:8070)                   | Design and deploy processes                                  |
| **Console**              | [http://localhost:8087](http://localhost:8087)                   | Manage clusters and APIs                                     |
| **Identity**             | [http://localhost:8088/identity](http://localhost:8088/identity) | User and permission management for the orchestration cluster |
| **Management Identity**  | [http://localhost:18081](http://localhost:18081)                 | User and permission management                               |
| **Keycloak**             | [http://localhost:18080](http://localhost:18080)                 | Authentication server                                        |
| **Optimize**             | [http://localhost:8083](http://localhost:8083)                   | Process analytics                                            |
| **Connectors**           | [http://localhost:8085](http://localhost:8085)                   | External system integrations                                 |

#### Database access (for administration)

- **PostgreSQL (Management Identity):** `localhost:5432`
- **PostgreSQL (Web Modeler):** `localhost:5433`
- **Elasticsearch:** `localhost:9200`

:::tip
For a richer localhost experience (and to avoid managing many individual port-forward commands), you can use [kubefwd](https://github.com/txn2/kubefwd) to forward all Services in the target namespace and make them resolvable by their in-cluster DNS names on your workstation.

Example (requires `sudo` to bind privileged ports and modify `/etc/hosts`):

```shell
sudo kubefwd services -n "$CAMUNDA_NAMESPACE"
```

After this runs, you can reach services directly, for example:

- Identity: `http://$CAMUNDA_RELEASE_NAME-identity/managementidentity`
- Keycloak: `http://$CAMUNDA_RELEASE_NAME-keycloak`
- Zeebe Gateway gRPC: `$CAMUNDA_RELEASE_NAME-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily; it restores the file when it exits.
:::

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
