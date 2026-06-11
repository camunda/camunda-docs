---
id: legacy-cluster-config
title: "Legacy cluster configurations"
description: "Configure clusters using legacy settings. This method of configuring clusters is deprecated and will be removed in a later version of Camunda Hub Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note DEPRECATED
This method of configuring clusters is deprecated and will be removed in a later version of Camunda Hub Self-Managed.

<!--- TODO: Link to migration guide --->

:::

Clusters must be configured using the following options to access the cluster from within Camunda Hub. If no clusters are configured, you will not be able to perform any actions that require a cluster (for example, deploy, start an instance, or Play a process).

The Camunda 8 [Helm](/self-managed/deployment/helm/install/quick-install.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) distributions provide a local Zeebe cluster configured by default.

To add additional clusters, increment the `0` value for each entry (for example `clusters[1]` or `CAMUNDA_MODELER_CLUSTERS_1_NAME`).

:::info Cluster version
The available configuration options depend on the version of the cluster:

- [Common configuration (all cluster versions)](#common-configuration-all-cluster-versions)
- [Additional configuration for cluster versions >= 8.8](#additional-configuration-for-cluster-versions--88)
- [Additional configuration for cluster versions < 8.8](#additional-configuration-for-cluster-versions--88-1)

:::

#### Common configuration (all cluster versions)

<Tabs groupId="cluster-common" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                        | Description                                                                       | Example value    |
| ------------------------------------------- | --------------------------------------------------------------------------------- | ---------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_ID`             | A unique identifier to use for your cluster.                                      | `test-cluster-1` |
| `CAMUNDA_MODELER_CLUSTERS_0_NAME`           | The name of your cluster.                                                         | `Test Cluster 1` |
| `CAMUNDA_MODELER_CLUSTERS_0_VERSION`        | The Camunda version used by this cluster.                                         | `8.8.0`          |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION` | The [authentication](#available-authentication-methods) to use with your cluster. | `BEARER_TOKEN`   |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.clusters:
  - id: test-cluster-1
    name: Test Cluster 1
    version: 8.8.0
    authentication: BEARER_TOKEN # See "Available authentication methods" below
```

</TabItem>

</Tabs>

#### Additional configuration for cluster versions >= 8.8

<Tabs groupId="cluster-88" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                                | Description                                                                                                                                                                                                                                                                      | Example value                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_GRPC`               | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Zeebe gRPC API](/apis-tools/zeebe-api/grpc.md) can be reached.                                                                                                                                  | `grpc://camunda:26500`,<br/>`grpcs://camunda.example.com:26500` |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_REST`               | [Internal or external](#notes-on-host-names-and-port-numbers) address where the cluster's REST APIs can be reached. Used as the base URL for requests to the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). | `http://camunda:8080`,<br/>`https://camunda.example.com`        |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_WEBAPP`             | [External](#notes-on-host-names-and-port-numbers) address where the cluster's web applications can be reached in a browser.                                                                                                                                                      | `https://camunda.example.com`                                   |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHORIZATIONS_ENABLED` | Indicates if [authorizations are enabled](/self-managed/components/orchestration-cluster/admin/overview.md#enable-api-authentication-and-authorizations) for the cluster. If `true`, users will see a hint when they deploy from Camunda Hub.                                    | `true`                                                          |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.clusters:
  - # ...common configuration from above
    url:
      grpc: "grpc://camunda:26500" # or grpcs://camunda.example.com:26500
      rest: "http://camunda:8080" # or https://camunda.example.com
      webapp: "https://camunda.example.com"
    authorizations:
      enabled: true
```

</TabItem>

</Tabs>

#### Additional configuration for cluster versions < 8.8

<Tabs groupId="cluster-pre88" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                        | Description                                                                                                                                                                                                 | Example value                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_ZEEBE_GRPC` | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Zeebe gRPC API](/versioned_docs/version-8.7/apis-tools/zeebe-api/grpc.md) can be reached.                                  | `grpc://camunda-zeebe-gateway:26500`,<br/>`grpcs://zeebe.example.com:26500` |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_ZEEBE_REST` | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Camunda 8 REST API](/versioned_docs/version-8.7/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) can be reached.  | `http://camunda-zeebe-gateway:8080`,<br/>`https://zeebe.example.com`        |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_OPERATE`    | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Operate REST API](/versioned_docs/version-8.7/apis-tools/operate-api/overview.md) can be reached.                          | `http://camunda-operate:80`,<br/>`https://operate.example.com`              |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_TASKLIST`   | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Tasklist REST API](/versioned_docs/version-8.7/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) can be reached. | `http://camunda-tasklist:80`,<br/>`https://tasklist.example.com`            |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.clusters:
  - # ...common configuration from above
    url:
      zeebe-grpc: "grpc://camunda-zeebe-gateway:26500"
      zeebe-rest: "http://camunda-zeebe-gateway:8080"
      operate: "http://camunda-operate:80"
      tasklist: "http://camunda-tasklist:80"
```

</TabItem>

</Tabs>

#### Available authentication methods

| Method         | Description                                                                                                                             | When to use?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BEARER_TOKEN` | Camunda Hub sends the authenticated user's token in the `Authorization` header with every request to the cluster.                       | **Cluster version >= 8.8**<br/>The cluster uses [OIDC authentication](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md) with the same identity provider as Camunda Hub.<br/>_Note_: You need to ensure that the cluster [accepts Camunda Hub's token audience](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md#step-4-configure-the-oidc-connection-details).<br/><br/>**Cluster version < 8.8**<br/>The cluster uses [Camunda Identity-based authentication](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization) and the external identity provider supports access tokens with multiple audiences (example provider: Keycloak).<br/>_Note_: For the token to be accepted by the different cluster components, it must contain each component's audience. |
| `BASIC`        | Camunda Hub sends a username and password with every request to the cluster. The credentials have to be provided by the user in the UI. | **Cluster version >= 8.8**<br/>The cluster uses Basic authentication.<br/><br/>**Cluster version < 8.8**<br/>not supported                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `NONE`         | Camunda Hub does not send any authentication information.                                                                               | **Cluster version >= 8.8**<br/>The cluster API is [configured as unprotected](/self-managed/components/orchestration-cluster/admin/overview.md#enable-api-authentication-and-authorizations) and can be used without authentication.<br/><br/>**Cluster version < 8.8**<br/>The authentication / token validation in the Zeebe Gateway is [disabled](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization).                                                                                                                                                                                                                                                                                                                                                                                                                                       |
