---
id: hub-release
sidebar_label: "Install the Hub release"
title: "Install the Camunda Hub release"
description: "Install the management plane: a Helm release with global.topology.mode set to hub, running Camunda Hub and Management Identity."
---

The Hub release is the management plane. It runs Camunda Hub and Management Identity, and it owns the inventory of every Orchestration Cluster in the deployment.

Install it first. For the prerequisites, Secrets, and network policies this page assumes, see [install the deployment topology](./index.md).

## What a Hub release deploys

`global.topology.mode: hub` deploys Camunda Hub and Management Identity, and suppresses the chart's default Orchestration Cluster, Optimize, and Connectors workloads. You don't configure disabled components in this release.

The `hub` role requires the 8.10 chart. Camunda Hub and `global.topology.clusters` don't exist in the 8.7, 8.8, and 8.9 charts, so the Hub release is always the 8.10 chart even when it manages older clusters.

Camunda Hub contains Web Modeler and Console. Console isn't a separate deployment in 8.10.

| Requirement                                           | Reason                                                             |
| ----------------------------------------------------- | ------------------------------------------------------------------ |
| `identity.enabled: true`                              | Management Identity runs in this release, and only in this release |
| OIDC authentication                                   | Hub topology connections are represented with OIDC bearer tokens   |
| The only release declaring `global.topology.clusters` | One authoritative inventory prevents client and endpoint drift     |

The chart fails the render with a `[camunda][error]` message if any of these is missing.

## The cluster record

Each entry in `global.topology.clusters` is the single source for both Management Identity presets and Camunda Hub inventory, so client IDs, audiences, roles, and endpoints can't drift apart.

Each record declares a stable unique `id`, the enabled workload components with their client and audience identifiers, the context paths, and the namespace and release name used to derive service endpoints.

| Field                             | Purpose                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `id`                              | Stable unique identifier for the cluster. Changing it creates a new Hub inventory entry        |
| `name`                            | Display name in Camunda Hub                                                                    |
| `namespace`, `releaseName`        | Used to generate in-cluster service endpoints                                                  |
| `host`                            | Public hostname of the Orchestration Cluster                                                   |
| `version`                         | The Camunda version deployed by that release                                                   |
| `architecture`                    | `unified` (default) or `legacy`. Set `legacy` for a chart 8.7 cluster                          |
| `contextPaths`                    | Sub-paths each component is served on                                                          |
| `components.<component>`          | Enabled state, `clientId`, `audience`, `redirectUrl`, and `secret` for each workload component |
| `components.<component>.roleName` | A per-cluster role name, instead of the shared canonical role                                  |
| `physicalTenants`                 | One entry per Physical Tenant that runs its own Optimize release                               |

## Create `hub-values.yaml`

```yaml
global:
  host: hub.example.com
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: hub-tls
  security:
    authentication:
      method: oidc
  topology:
    mode: hub
    clusters:
      - id: orchestration
        name: Orchestration
        namespace: orchestration
        releaseName: camunda
        host: orchestration.example.com
        # Match this to the Camunda version deployed by your selected chart.
        version: "8.10.x"
        contextPaths:
          orchestration: /orchestration
          optimize: /optimize
          connectors: /connectors
        components:
          orchestration:
            enabled: true
            clientId: orchestration
            audience: orchestration-api
            redirectUrl: https://orchestration.example.com/orchestration
            secret:
              existingSecret: orchestration-oidc
              existingSecretKey: client-secret
          optimize:
            enabled: true
            clientId: optimize
            audience: optimize-api
            redirectUrl: https://orchestration.example.com/optimize
            secret:
              existingSecret: optimize-oidc
              existingSecretKey: client-secret
          connectors:
            enabled: true
            clientId: connectors
            secret:
              existingSecret: connectors-oidc
              existingSecretKey: client-secret
  identity:
    keycloak:
      url:
        protocol: https
        host: login.example.com
        port: 443
      contextPath: /
      realm: /realms/camunda-platform
      auth:
        adminUser: admin
        secret:
          existingSecret: keycloak-admin
          existingSecretKey: password
    auth:
      enabled: true
      type: KEYCLOAK
      publicIssuerUrl: https://login.example.com/realms/camunda-platform
      issuerBackendUrl: https://login.example.com/realms/camunda-platform
      authUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/auth
      tokenUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/token
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs
      camundaHub:
        redirectUrl: https://hub.example.com/modeler

identity:
  enabled: true
  contextPath: /identity
  firstUser:
    secret:
      existingSecret: identity-first-user
      existingSecretKey: password
  externalDatabase:
    enabled: true
    host: identity-postgresql.example.com
    port: 5432
    username: identity
    database: identity
    secret:
      existingSecret: identity-database
      existingSecretKey: password

camundaHub:
  enabled: true
  contextPath: /modeler
  restapi:
    mail:
      fromAddress: noreply@example.com
    externalDatabase:
      url: jdbc:postgresql://hub-postgresql.example.com:5432/hub
      username: hub
      secret:
        existingSecret: hub-database
        existingSecretKey: password
    pusher:
      client:
        secret:
          existingSecret: hub-pusher
          existingSecretKey: app-key
      secret:
        existingSecret: hub-pusher
        existingSecretKey: app-secret
```

The `optimize` record under `components` describes the Optimize instance for the cluster's default Physical Tenant. To map additional tenants, add a `physicalTenants` list. See [configure Physical Tenants across releases](./physical-tenants.md).

Adapt the Keycloak endpoints and client configuration for your environment. See [external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md).

## Describe a chart 8.7 cluster

An 8.10 Hub manages Orchestration Cluster releases on the 8.7, 8.8, 8.9, and 8.10 charts. Records for 8.8, 8.9, and 8.10 clusters all take the standard shape shown above.

Chart 8.7 predates the unified Orchestration Cluster, so it runs Zeebe, Zeebe Gateway, Operate, and Tasklist as separate workloads on separate services. Its record needs `architecture: legacy` and the names of those services:

```yaml
global:
  topology:
    mode: hub
    clusters:
      - id: legacy-a
        name: Legacy A
        namespace: orchestration-legacy
        releaseName: camunda
        host: legacy-a.example.com
        version: "8.7.38"
        architecture: legacy
        contextPaths:
          orchestration: ""
          optimize: /optimize
          connectors: /connectors
        components:
          orchestration:
            enabled: true
            clientId: orchestration-legacy-a
            audience: orchestration-legacy-a-api
            redirectUrl: https://legacy-a.example.com
            serviceName: camunda-zeebe
            gatewayServiceName: camunda-zeebe-gateway
            operateServiceName: camunda-operate
            tasklistServiceName: camunda-tasklist
            restUrl: http://camunda-zeebe-gateway.orchestration-legacy.svc.cluster.local:8080/zeebe
            readinessUrl: http://camunda-zeebe-gateway.orchestration-legacy.svc.cluster.local:9600/zeebe/actuator/health/readiness
            secret:
              existingSecret: orchestration-legacy-a-oidc
              existingSecretKey: client-secret
```

`architecture: legacy` changes two things in the generated inventory. It addresses the split Operate, Tasklist, and Zeebe Gateway services instead of one Orchestration Cluster service, and it omits the Orchestration Admin component, which chart 8.7 doesn't have. It also omits the cluster's `authorizations` block.

The service names depend on that release's own release name, so adjust them if it isn't `camunda`.

For the workload side of a chart 8.7 release, see [requirements by chart version](./orchestration-release.md#requirements-by-chart-version).

## Provider setup outside the chart

Management Identity can administer clients only in an external Keycloak instance, and only when you provide Keycloak administrator credentials.

For Microsoft Entra ID or a generic OIDC provider, first complete the provider setup, including Management Identity's confidential client, initial administrator claims, Hub clients, mapping rules, and each workload client. Then add the matching client IDs and audiences to the topology records. Management Identity initializes only its permission and role model from those records. See [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md).

## Role assignment across clusters

By default, every cluster contributes permissions to the canonical `Orchestration` and `Optimize` roles. Assigning either role grants access to every declared cluster of that component type. Set `components.<component>.roleName` to a unique value in each Hub topology entry when users must be authorized per cluster.

:::warning
Identity preset initialization is additive. Removing or renaming a topology entry doesn't delete the corresponding clients, resource servers, permissions, or roles from Keycloak or Management Identity. Remove obsolete resources explicitly after the related workload is retired.
:::

Existing Keycloak users don't automatically receive roles added by a later topology update. Assign the canonical roles or configured per-cluster roles through your normal access-management process.

## Install the release

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace hub \
  --create-namespace \
  --values hub-values.yaml
```

Confirm the Hub and Management Identity pods are ready, and that you can sign in to Camunda Hub, before you install an Orchestration Cluster release.

## Next steps

- [Install an Orchestration Cluster release](./orchestration-release.md)
- [Camunda Hub configuration properties](/self-managed/components/hub/configuration/properties.md)
