---
id: install
sidebar_label: Install
title: Install Camunda with Helm
description: Install Camunda 8 Self-Managed on Kubernetes using Helm charts.
---

Use this guide to install Camunda 8 Self-Managed with the orchestration cluster, and optionally enable additional components.

<!-- TODO: add links to explain the orchestration cluster and management cluster -->

## Prerequisites

- **Kubernetes cluster**: A functioning Kubernetes cluster with [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) access and block-storage persistent volumes for stateful components. See [Cloud providers](/self-managed/installation-methods/helm/cloud-providers/index.md) for instructions to create a Kubernetes cluster.
- **Helm**: The Helm CLI installed. See [Installing Helm](https://helm.sh/docs/intro/install/).

## Install the orchestration cluster

1. Create a namespace to install the platform on Kubernetes:
   ```bash
   kubectl create namespace orchestration
   ```
   output:
   ```bash
   namespace/orchestration created
   ```
1. To install the Camunda 8 Self-Managed [Helm chart](https://helm.sh/docs/topics/charts/), add the [Helm repository](https://helm.sh/docs/topics/chart_repository/) with the following command:
   ```bash
   helm repo add camunda https://helm.camunda.io
   helm repo update
   ```
1. Install the Helm chart on your namespace:
   ```bash
   helm install camunda camunda/camunda-platform -n orchestration
   ```

### Install a specific version (optional)

The Camunda 8 Helm chart automatically selects the latest version of the [Camunda 8 applications](/reference/supported-environments.md). Because the Helm chart and application components are released independently, minor version differences may occur.

To install the latest version of the chart and its application dependencies, run the following command:

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION \
    --values https://helm.camunda.io/camunda-platform/values/values-latest.yaml
```

To install a previous version, run:

```shell
helm install camunda camunda/camunda-platform --version 8.7 \
    --values https://helm.camunda.io/camunda-platform/values/values-v8.7.yaml
```

### Access the orchestration cluster

Run the following command to locally port-forward the orchestration cluster pod to access the UI:

```bash
kubectl port-forward svc/camunda-core 8080:8080
```

Use the following URLs to access the orchestration cluster UIs:

```bash
http://localhost:8080/identity
http://localhost:8080/operate
http://localhost:8080/tasklist
```

By default, basic authentication is configured in the orchestration cluster. Use the default credentials:

```
username: demo
password: demo
```

### Access Camunda services

By default, Camunda services deployed in a Kubernetes cluster are not accessible from outside the cluster. You can expose these services externally in the following ways:

- **Port forwarding:** Direct traffic from your local machine to the cluster to access Camunda services. See [Access components without Ingress](/self-managed/installation-methods/helm/configure/accessing-components-without-ingress.md).
- **Ingress configuration:** Use the NGINX Ingress controller to manage external service access. See [Ingress setup](/self-managed/installation-methods/helm/configure/ingress-setup.md).
- **Amazon EKS installation:** If you are deploying Camunda 8 on an Amazon EKS cluster, see [Install Camunda 8 on EKS](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/eks-helm.md).

## Enable other components

:::note
This step is optional.
:::

<!-- TODO: Add links to doc pages that explain each component. -->

The following components run outside the orchestration cluster:

- Optimize
- Web Modeler
- Console
- Management Identity
- Keycloak

These components are disabled by default. They do not support basic authentication, so you must use another method such as Keycloak or OIDC. In this example, we use Keycloak.

<!-- TODO: Add a suitable link to explain what a values.yaml file is. -->

Because the default configuration of the Helm chart uses basic authentication, you need to create a [values.yaml](https://helm.sh/docs/chart_template_guide/values_files/) file to modify the default configuration to:

- Enable Keycloak to provide another method of authentication.
- Enable other Camunda components that run outside the orchestration cluster.

<!-- TODO: Remove setting existingSecret in favor of autoGenerate secrets -->

Create a file called `camunda-values.yaml` with the following content:

```yaml
global:
  identity:
    auth:
      enabled: true
      #needs to be added in base values.yaml
      publicIssuerUrl: "http://camunda-keycloak/auth/realms/camunda-platform"
      admin:
        enabled: true
        existingSecret:
          name: "integration-test-credentials"
      webModeler:
        redirectUrl: "http://camunda-modeler"
      console:
        redirectUrl: "http://camunda-console"
        existingSecret:
          name: "integration-test-credentials"
      optimize:
        redirectUrl: "http://camunda-optimize"
        existingSecret:
          name: "integration-test-credentials"
      #######################
      # Orchestration Group
      #######################
      orchestration:
        redirectUrl: "http://camunda-core:8080"
        existingSecret:
          name: "integration-test-credentials"
      connectors:
        existingSecret:
          name: "integration-test-credentials"
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    existingSecret: "integration-test-credentials"

identityKeycloak:
  enabled: true
  postgresql:
    auth:
      existingSecret: "integration-test-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "integration-test-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"

optimize:
  enabled: true

connectors:
  inbound:
    mode: oauth

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
    existingSecret: "integration-test-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

orchestration:
  enabled: true
  clusterSize: "1"
  partitionCount: "1"
  replicationFactor: "1"
  env:
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_MAPPINGID
      value: "demo-user-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_CLAIMNAME
      value: "preferred_username"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_CLAIMVALUE
      value: "demo"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_MAPPINGID
      value: "connectors-client-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_CLAIMNAME
      value: "client_id"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_CLAIMVALUE
      value: "connectors"
    - name: CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_MAPPINGS_0
      value: "demo-user-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_MAPPINGS_1
      value: "connectors-client-mapping"

console:
  enabled: true
```

Installing all components in a cluster requires downloading all related Docker images to the Kubernetes nodes. The time required depends on your cloud provider and network speed.

For more information about enabling other components, see [Enable Web Modeler, Console, and Connectors](/self-managed/installation-methods/helm/configure/web-modeler-console-connectors.md).

<!-- TODO: Add a section about port-forward. Currently, port-forward is not working because the redirect URIs are configured with the Kubernetes service names. If the redirect URIs are set to localhost, the orchestration cluster will be unhealthy since it cannot access Keycloak through localhost. -->

## Troubleshoot installation issues

Verify that each pod is running and ready. If a pod is pending, it cannot be scheduled onto a node. This usually happens when the cluster does not have enough resources. To check messages from the scheduler, run:

```shell
kubectl describe pods <POD_NAME>
```

If the `describe` output does not help, check the pod logs by running:

```shell
kubectl logs -f <POD_NAME>
```

## Notes and requirements

- **Zeebe gateway** is deployed as a stateless service. It supports Kubernetes startup and liveness probes. See [Gateway health probes](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway-health-probes.md).
- **Zeebe broker nodes** must be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to preserve cluster node identities. StatefulSets require persistent storage, which you must provision in advance. The type of storage depends on your cloud provider.
- **Docker pull limits** apply when downloading Camunda 8 images from Docker Hub. To avoid disruptions, authenticate with Docker Hub or use a mirror registry.
- **Air-gapped environments** require additional configuration. See [Helm chart air-gapped environment installation](/self-managed/installation-methods/helm/configure/air-gapped-installation.md).
- **Image sources**: By default, the Helm chart uses [open-source images from Bitnami](https://github.com/bitnami/containers). For enterprise installations, Camunda recommends using enterprise images. For instructions, see [Registry and images](/self-managed/installation-methods/helm/configure/registry-and-images.md).

## Additional resources

<!-- TODO: Add links to the following:
- Basic auth guide
- Enable Keycloak guide
- Enable OIDC guide
- Explanation of management/orchestration cluster -->

- [Helm chart Amazon OpenSearch service usage](/self-managed/installation-methods/helm/configure/database/using-existing-opensearch.md) — configure Camunda to use Amazon OpenSearch Service instead of the default Elasticsearch.
- [Getting started with document handling](/self-managed/concepts/document-handling/overview.md) — configure document storage and management in Camunda 8.

<!--## Next steps

If you would like to further customize the Camunda 8 Self-Managed Helm chart, please proceed to the following section:-->
