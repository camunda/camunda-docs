---
id: orchestration-release
sidebar_label: "Install an Orchestration Cluster release"
title: "Install an Orchestration Cluster release"
description: "Install an execution plane: a Helm release with global.topology.mode set to orchestration, running one Orchestration Cluster and Connectors."
---

An orchestration release is an execution plane. It runs one Orchestration Cluster and Connectors, and connects to the Management Identity service in the Hub release.

Install it after the [Hub release](./hub-release.md) is healthy. You can install any number of orchestration releases against one Hub.

## What an orchestration release deploys

`global.topology.mode: orchestration` deploys the Orchestration Cluster and Connectors, and suppresses the local Management Identity workload.

An orchestration release is self-contained. Its existing component values remain authoritative for its enabled state, authentication, storage, scaling, and Kubernetes configuration. `global.topology.mode` selects the release role; it doesn't duplicate component configuration, and the release never declares sibling clusters.

| Requirement                               | Reason                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `orchestration.enabled: true`             | This is the workload the release exists to run                            |
| `global.identity.auth.enabled: true`      | Enables OIDC authentication for the orchestration workloads               |
| `identity.enabled: false`                 | Management Identity runs only in the Hub release                          |
| A non-empty `global.identity.service.url` | This release runs no Identity of its own, so it must be told where one is |

The chart fails the render with a `[camunda][error]` message if any of these is missing.

The component client IDs, audiences, redirect URLs, and secrets must match the clients declared in the matching Hub cluster record. A mismatch authenticates against a client Hub doesn't know about.

## Requirements by chart version

An orchestration release can deploy from the 8.7, 8.8, 8.9, or 8.10 chart against an 8.10 Hub. The role is the same; the values it requires differ, because the older charts predate the unified Orchestration Cluster and still bundle Hub-plane dependencies.

Every version requires `global.identity.auth.enabled: true`, `identity.enabled: false`, and a reachable `global.identity.service.url`. Beyond that:

| Chart | Workload to enable                             | Also required                                                                                                                           |
| :---- | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 8.10  | `orchestration.enabled: true`                  | Nothing further                                                                                                                         |
| 8.9   | `orchestration.enabled: true`                  | `identityPostgresql.enabled: false`, `webModelerPostgresql.enabled: false`                                                              |
| 8.8   | `orchestration.enabled: true`                  | `identityPostgresql.enabled: false`, `webModelerPostgresql.enabled: false`                                                              |
| 8.7   | `zeebe.enabled: true`, `operate.enabled: true` | `identityKeycloak.enabled: false`, `identityPostgresql.enabled: false`, `postgresql.enabled: false`, `executionIdentity.enabled: false` |

The Hub-plane databases belong to the Hub release, which is why the 8.7, 8.8, and 8.9 charts reject them here: leaving them enabled would deploy a second Management Identity or Hub database beside the one the Hub release already owns.

These keys default to `false`, so a fresh install is unaffected. The check matters when you convert an existing combined release, whose values file may already enable them.

A chart 8.7 release also needs `architecture: legacy` in its Hub cluster record, so the inventory addresses its split Zeebe, Zeebe Gateway, Operate, and Tasklist services. See [describe a chart 8.7 cluster](./hub-release.md#describe-a-chart-87-cluster).

The examples on this page use the 8.10 chart.

## Create `orchestration-values.yaml`

```yaml
global:
  host: orchestration.example.com
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: orchestration-tls
  security:
    authentication:
      method: oidc
  topology:
    mode: orchestration
  identity:
    service:
      url: http://camunda-identity.hub.svc.cluster.local:80/identity
    auth:
      enabled: true
      type: KEYCLOAK
      # Must be the exact "iss" claim your provider mints. See Pin the issuer.
      issuer: https://login.example.com/realms/camunda-platform
      publicIssuerUrl: https://login.example.com/realms/camunda-platform
      issuerBackendUrl: https://login.example.com/realms/camunda-platform
      authUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/auth
      tokenUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/token
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs

identity:
  enabled: false

orchestration:
  enabled: true
  contextPath: /orchestration
  security:
    authentication:
      oidc:
        clientId: orchestration
        audience: orchestration-api
        redirectUrl: https://orchestration.example.com/orchestration
        secret:
          existingSecret: orchestration-oidc
          existingSecretKey: client-secret
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: https://elasticsearch.example.com:9200
        auth:
          username: camunda
          secret:
            existingSecret: secondary-storage
            existingSecretKey: password
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: zeebe.orchestration.example.com
      tls:
        enabled: true
        secretName: orchestration-grpc-tls

connectors:
  enabled: true
  contextPath: /connectors
  security:
    authentication:
      oidc:
        clientId: connectors
        secret:
          existingSecret: connectors-oidc
          existingSecretKey: client-secret
```

This example uses Elasticsearch as secondary storage, and the `secondary-storage` Secret must exist in the orchestration namespace. For OpenSearch, relational database, and TLS configuration, see [database configuration](/self-managed/deployment/helm/configure/database/index.md).

Optimize isn't part of this release. It's deployed separately, one release per Physical Tenant. See [install an Optimize release](./optimize-release.md).

## Choose which applications run

`orchestration.profiles` selects which parts of the Orchestration Cluster are active in the single StatefulSet:

```yaml
orchestration:
  profiles:
    broker: true
    admin: true
    operate: true
    tasklist: true
```

Disabling a profile removes that application from the running cluster. Keep `broker` enabled in any release that executes processes.

## Pin the issuer

Set `global.identity.auth.issuer`, or `orchestration.security.authentication.oidc.issuer`, to the exact `iss` claim your identity provider mints. This value can't be derived from `publicIssuerUrl` or `issuerBackendUrl`, because those are network routes: a Keycloak started without a pinned hostname mints a different `iss` per route, so in-cluster callers and browsers would present different issuers. Setting only `publicIssuerUrl` doesn't satisfy the requirement.

Pin your provider to one issuer. For Keycloak, set `KC_HOSTNAME`.

:::warning
A pinned issuer is optional for a single-tenant cluster but required as soon as you declare Physical Tenants. The Orchestration Cluster rejects a provider without `issuerUri` once tenants exist, and the chart fails the render rather than deploying a cluster that can't validate tokens.
:::

## Install the release

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace orchestration \
  --create-namespace \
  --values orchestration-values.yaml
```

Confirm the cluster appears in Camunda Hub's cluster list before you install its Optimize releases.

## Add another Orchestration Cluster

Add another entry to `global.topology.clusters` in the Hub release, then install another orchestration release configured to match that entry. Use unique client IDs, audiences, and secrets so the clusters are isolated from each other.

:::warning
If orchestration releases share Elasticsearch or OpenSearch, every cluster needs its own index prefixes. Reusing a prefix mixes one cluster's records into another cluster's Operate, Tasklist, or Optimize data. See [index prefixes](./physical-tenants.md#isolate-every-index-prefix-family).
:::

For Keycloak, Management Identity creates every declared client. For another OIDC provider, provision the clients before applying the Helm releases.

Generated internal service URLs in the Hub inventory use Kubernetes service DNS, so this pattern supports multiple namespaces in the same Kubernetes cluster. For workloads in another Kubernetes cluster, provide equivalent cross-cluster DNS and routing, or configure explicit `grpcUrl`, `restUrl`, `readinessUrl`, `operateUrl`, `tasklistUrl`, `adminUrl`, and component web application URL overrides. Set each orchestration release's `global.identity.service.url` to an address from which it can reach Management Identity.

## Declare Physical Tenants

Physical Tenants are application configuration, not chart values. There's no `orchestration.physicalTenants` values key. Declare tenants as `camunda.physical-tenants.*` through `orchestration.extraConfiguration`:

```yaml
orchestration:
  extraConfiguration:
    - file: physical-tenants.yaml
      content: |
        camunda:
          physical-tenants:
            default:
              # An explicit default entry is required once any tenant is declared.
            riskprod:
              # Tenant configuration.
```

Declaring any tenant changes the behavior of the default tenant, and each tenant needs its own Optimize release and index prefixes. Read [configure Physical Tenants across releases](./physical-tenants.md) before you add your first tenant.

## Next steps

- [Install an Optimize release](./optimize-release.md)
- [Configure Physical Tenants across releases](./physical-tenants.md)
- [Orchestration Cluster configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md)
