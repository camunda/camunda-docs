---
id: orchestration-release
sidebar_label: "Install an Orchestration Cluster release"
title: "Install an Orchestration Cluster release"
description: "Install an execution plane: a Helm release with global.topology.mode set to orchestration, running one Orchestration Cluster and Connectors."
---

An orchestration release is an execution plane. It runs one Orchestration Cluster and Connectors, and connects to the Management Identity service in the Hub release.

Install it after the [Hub release](./hub-release.md) is healthy. The same Hub can serve orchestration releases in different environments.

## What an orchestration release deploys

`global.topology.mode: orchestration` deploys the Orchestration Cluster and Connectors, and never renders Management Identity or Camunda Hub, even if a converted values file still enables them.

Optimize is different. If `optimize.enabled: true` is set, the release still runs Optimize, and the chart then also renders the exporter Optimize reads. In the split topology, set `optimize.enabled: false` here and run Optimize as its [own release](./optimize-release.md).

An orchestration release is self-contained. Its existing component values remain authoritative for its enabled state, authentication, storage, scaling, and Kubernetes configuration. `global.topology.mode` selects the release role; it doesn't duplicate component configuration, and the release never declares sibling clusters.

| Requirement                               | Reason                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `orchestration.enabled: true`             | This is the workload the release exists to run                            |
| `global.identity.auth.enabled: true`      | Enables OIDC authentication for the orchestration workloads               |
| `identity.enabled: false`                 | Management Identity runs only in the Hub release                          |
| A non-empty `global.identity.service.url` | This release runs no Identity of its own, so it must be told where one is |

The chart fails the render with a `[camunda][error]` message if any of the first three is missing. The 8.7, 8.8, and 8.9 charts also check `global.identity.service.url`. The 8.10 chart doesn't, so set it yourself.

The component client IDs, audiences, redirect URLs, and secrets must match the clients declared in the matching Hub cluster record. A mismatch authenticates against a client Hub doesn't know about.

## Requirements by chart version

An orchestration release can deploy from the 8.7, 8.8, 8.9, or 8.10 chart against an 8.10 Hub. The role is the same; the values it requires differ, because the older charts predate the unified Orchestration Cluster and still bundle management plane dependencies.

Chart versions earlier than the minimum versions in [release roles](./index.md#release-roles) ignore `global.topology.mode` and deploy a combined release. From the minimum versions, the `orchestration` role stops rendering Console and Web Modeler on the 8.7, 8.8, and 8.9 charts, even if `console.enabled` or `webModeler.enabled` is `true`. Every version requires `global.identity.auth.enabled: true`, `identity.enabled: false`, and a reachable `global.identity.service.url`. Beyond that:

| Chart | Workload to enable                                                       | Also required                                                                                                                           |
| :---- | :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 8.10  | `orchestration.enabled: true`                                            | Nothing further                                                                                                                         |
| 8.9   | `orchestration.enabled: true`                                            | `identityPostgresql.enabled: false`, `webModelerPostgresql.enabled: false`, `identityKeycloak.enabled: false`                           |
| 8.8   | `orchestration.enabled: true`                                            | `identityPostgresql.enabled: false`, `webModelerPostgresql.enabled: false`, `identityKeycloak.enabled: false`                           |
| 8.7   | `zeebe.enabled: true`, `operate.enabled: true`, `tasklist.enabled: true` | `identityKeycloak.enabled: false`, `identityPostgresql.enabled: false`, `postgresql.enabled: false`, `executionIdentity.enabled: false` |

Before you convert an existing release, upgrade it to the latest chart version and the latest Camunda patch version.

The management plane databases belong to the Hub release. The 8.7, 8.8, and 8.9 charts therefore reject them here. If you leave them enabled, the release deploys a second Management Identity or Hub database beside the one the Hub release already owns.

The 8.8 and 8.9 charts reject `identityKeycloak.enabled: true` because Management Identity is off in this role, and they don't run Keycloak without it.

These keys default to `false`, except `identityKeycloak.enabled` on the 8.7 chart, which defaults to `true`. The check matters when you convert an existing combined release, whose values file may already enable them. See [connect existing clusters to Hub](/self-managed/upgrade/helm/connect-existing-clusters.md).

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

`orchestration.security.authentication.oidc.redirectUrl` is deprecated and logs a deprecation warning, but it's used here because one value sets three properties: the OIDC callback (`<redirectUrl>/sso-callback`) and the Operate and Tasklist redirect roots. To remove the warning, set `camunda.security.authentication.oidc.redirect-uri`, `camunda.operate.identity.redirectRootUrl`, and `camunda.tasklist.identity.redirectRootUrl` in `orchestration.extraConfiguration` instead. The key is removed in chart v16 (Camunda 8.11).

This example uses Elasticsearch as secondary storage, and the `secondary-storage` Secret must exist in the orchestration namespace. For OpenSearch, relational database, and TLS configuration, see [database configuration](/self-managed/deployment/helm/configure/database/index.md).

Optimize isn't part of this release. It's deployed separately, one release per Physical Tenant. See [install an Optimize release](./optimize-release.md).

## Export records for Optimize

Optimize reads the records written by the legacy Elasticsearch or OpenSearch exporter, not the Orchestration Cluster's own indices. The chart renders that exporter automatically only when Optimize runs in the same release. With Optimize in its own release, the example above writes no records Optimize can read until you enable the exporter here.

If the cluster uses Elasticsearch or OpenSearch secondary storage, enable the exporter with chart values. It writes to the secondary storage endpoint:

```yaml
orchestration:
  exporters:
    zeebe:
      enabled: true
      index:
        # Must exactly equal optimize.database.elasticsearch.prefix
        # in this cluster's default-tenant Optimize release.
        prefix: production-a-default-records

optimize:
  enabled: false
  database:
    elasticsearch:
      # Required for the exporter to send the secondary storage credentials.
      external: true
```

If the cluster uses RDBMS secondary storage, or the records must go to a different Elasticsearch or OpenSearch instance, configure the exporter directly as broker configuration:

```yaml
orchestration:
  env:
    - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_AUTHENTICATION_PASSWORD
      valueFrom:
        secretKeyRef:
          name: optimize-records-store
          key: password
  extraConfiguration:
    - file: optimize-exporter.yaml
      content: |
        zeebe:
          broker:
            exporters:
              elasticsearch:
                className: io.camunda.zeebe.exporter.ElasticsearchExporter
                args:
                  url: https://elasticsearch.example.com:9200
                  authentication:
                    username: camunda
                  index:
                    prefix: production-a-default-records
```

For OpenSearch, use the `opensearch` exporter with `io.camunda.zeebe.exporter.opensearch.OpensearchExporter`. The Orchestration Cluster keeps using its own secondary storage; the exporter writes the separate record stream Optimize reads. Every prefix must be unique per cluster and tenant. See [isolate every index prefix family](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md#prefixes-in-the-split-topology).

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
  --version "$ORCHESTRATION_CHART_VERSION" \
  --namespace orchestration \
  --create-namespace \
  --values orchestration-values.yaml
```

Confirm the cluster appears in Camunda Hub's cluster list before you install its Optimize releases.

## Add another Orchestration Cluster

Add another entry to `global.topology.clusters` in the Hub release, then install another orchestration release configured to match that entry. Use unique client IDs, audiences, and secrets so each cluster has its own client registration. To also authorize users per cluster, set a distinct `components.<component>.roleName` in each record. See [role assignment across clusters](./hub-release.md#role-assignment-across-clusters).

:::warning
If orchestration releases share Elasticsearch or OpenSearch, every cluster needs its own index prefixes. Reusing a prefix mixes one cluster's records into another cluster's Operate, Tasklist, or Optimize data. See [index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md#prefixes-in-the-split-topology).
:::

For Keycloak, Management Identity creates every declared client. For another OIDC provider, provision the clients before applying the Helm releases.

Generated internal service URLs in the Hub inventory use Kubernetes service DNS, so this pattern supports multiple namespaces in the same Kubernetes cluster. For workloads in another Kubernetes cluster, provide equivalent cross-cluster DNS and routing, or configure explicit `grpcUrl`, `restUrl`, `readinessUrl`, `operateUrl`, `tasklistUrl`, `adminUrl`, and component web application URL overrides. Set each orchestration release's `global.identity.service.url` to an address from which it can reach Management Identity.

## Declare Physical Tenants

Physical Tenants are application configuration, not chart values. There's no `orchestration.physicalTenants` values key. Declare tenants as `camunda.physical-tenants.*` through `orchestration.extraConfiguration`. For why this is application configuration, see [Helm and application configuration responsibilities](/self-managed/deployment/helm/configure/configuration-responsibilities.md).

```yaml
orchestration:
  extraConfiguration:
    - file: physical-tenants.yaml
      content: |
        camunda:
          physical-tenants:
            # Optional. Without a default entry, the default tenant is
            # synthesized from the root configuration and keeps its root exporters.
            default:
            riskprod:
              # Tenant configuration.
```

Declaring the `default` tenant explicitly changes how it gets its exporters, and each tenant needs its own Optimize release and index prefixes. Read [configure Physical Tenants across releases](./physical-tenants.md) before you add your first tenant.

## Next steps

- [Install an Optimize release](./optimize-release.md)
- [Configure Physical Tenants across releases](./physical-tenants.md)
- [Orchestration Cluster configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md)
