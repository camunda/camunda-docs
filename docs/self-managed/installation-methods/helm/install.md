---
id: install
title: "Camunda 8 Helm installation"
sidebar_label: "Install"
description: "Camunda provides continuously improved Helm charts, of which are not cloud provider-specific so you can choose your Kubernetes provider."
---

This guide walks through how to perform a basic installation of Camunda 8 Self-Managed by installing the Orchestration Cluster and optionally the management cluster.

<!-- TODO: add links to explain the Orchestration Cluster and management cluster -->

## Prerequisites

- Kubernetes cluster: A functioning Kubernetes cluster with kubectl access and block storage persistent volumes for stateful components.
- Helm: Make sure the Helm CLI is installed.

## Installing the Orchestration Cluster

- First, create a namespace to install the platform on Kubernetes:
  ```bash
  kubectl create namespace orchestration
  ```
  output:
  ```bash
  namespace/orchestration created
  ```
- To install the Camunda 8 Self-Managed [Helm chart](https://helm.sh/docs/topics/charts/), you need to add the [Helm repository](https://helm.sh/docs/topics/chart_repository/). You can do this with the following command:
  ```bash
  helm repo add camunda https://helm.camunda.io
  helm repo update
  ```

To install the Helm chart on your namespace, run the following command:

```bash
helm install camunda camunda/camunda-platform -n orchestration
```

### Accessing the Orchestration Cluster

Run the following command to locally port-forward the Orchestration Cluster pod to access the UI:

```bash
kubectl port-forward svc/camunda-core 8080:8080
```

Use the following URLs to access the Orchestration Cluster UIs:

```bash
http://localhost:8080/identity
http://localhost:8080/operate
http://localhost:8080/tasklist
```

By default, basic auth is configured on the Orchestration Cluster. There is a default user configured:

```
username: demo
password: demo
```

## Enabling other components

:::note
This step is optional.
:::

<!-- TODO: Add links to doc pages that explain each component. -->

The following components live outside the Orchestration Cluster:

- Optimize
- Web Modeler
- Console
- Management Identity
- Keycloak

These components are disabled by default. They do not support basic auth, so another authentication/authorization mechanism should be used, such as Keycloak or OIDC. In this scenario, we will use Keycloak.

<!-- TODO: Add a suitable link to explain what a values.yaml file is. -->

Since the default configuration of the Helm chart uses basic auth, you need to create a [values.yaml](https://helm.sh/docs/chart_template_guide/values_files/) file to modify the default configuration to:

- Enable Keycloak to provide another method of authentication.
- Enable the rest of the Camunda components that live outside the Orchestration Cluster.

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
      core:
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

core:
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

<!-- TODO: Add a section about port-forward. Currently, port-forward is not working because the redirect URIs are configured with the Kubernetes service names. If the redirect URIs are set to localhost, the Orchestration Cluster will be unhealthy since it cannot access Keycloak through localhost. -->

## Additional resources

<!-- TODO: Add links to the following:
- Basic auth guide
- Enable Keycloak guide
- Enable OIDC guide
- Explanation of management/Orchestration Cluster -->

<!--## Next steps

If you would like to further customize the Camunda 8 Self-Managed Helm chart, please proceed to the following section:-->
