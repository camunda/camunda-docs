---
id: optimize-release
sidebar_label: "Install an Optimize release"
title: "Install an Optimize release"
description: "Install Optimize as its own Helm release with global.topology.mode set to optimize, one release per Physical Tenant."
---

An Optimize release deploys Optimize and no other Camunda component. Install one per Physical Tenant, including the default tenant.

The `optimize` role requires the 8.10 chart. The 8.7, 8.8, and 8.9 charts support `combined` and `orchestration` only, so an older Orchestration Cluster runs Optimize inside its own release.

Install these releases after their [Orchestration Cluster release](./orchestration-release.md) is healthy.

## Why Optimize is its own release

Optimize reads exported records from a single Elasticsearch or OpenSearch index prefix, so one instance serves exactly one Physical Tenant.

Running those instances inside the orchestration release would tie every tenant's Optimize lifecycle to the Orchestration Cluster's StatefulSet, and the workload release would have to describe tenants it doesn't own. A release whose job is to run one Optimize against one tenant's storage is a separate release.

This applies to a cluster with no additional tenants too. Its default Physical Tenant needs one Optimize release if you want analytics.

## Requirements

`global.topology.mode: optimize` gates off every component except Optimize, so you don't disable each one by hand. The chart fails the render with a `[camunda][error]` message naming any of the following that's missing.

| Requirement                                                                             | Reason                                                                                                                                                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `optimize.enabled: true`                                                                | This is the workload the release exists to run                                                                                                                                  |
| `global.noSecondaryStorage: false`                                                      | Optimize reads exported records from secondary storage                                                                                                                          |
| `optimize.database.elasticsearch.enabled` or `optimize.database.opensearch.enabled`     | The chart bundles no Elasticsearch. With neither backend enabled, Optimize reaches no storage at all                                                                            |
| A non-empty `url.host` for the enabled backend                                          | Without a host, Optimize renders an unusable connection node                                                                                                                    |
| `optimize.security.authentication.method: oidc` or `global.identity.auth.enabled: true` | Optimize requires authentication                                                                                                                                                |
| `optimize.identity.service.url` or `global.identity.service.url`                        | This release runs no Identity of its own, so the in-release default can't apply                                                                                                 |
| `optimize.contextPath`, when the chart renders this release's routing                   | The shared Ingress emits an Optimize rule only when the context path is set, and an HTTPRoute would match an empty path prefix                                                  |
| An OIDC issuer, when Optimize uses OIDC                                                 | Optimize validates the `iss` claim on every token. Set `optimize.security.authentication.oidc.issuer`, `global.identity.auth.issuer`, or `global.identity.auth.publicIssuerUrl` |

Elasticsearch takes precedence when both backends are enabled.

Optimize requires Elasticsearch or OpenSearch and can't use a relational database, even when the Orchestration Cluster uses one for its own secondary storage.

## Create `optimize-values.yaml`

This example is the Optimize release for the Physical Tenant `tenanta` in the cluster `production-a`. Use the OpenSearch equivalents where applicable.

```yaml
global:
  topology:
    mode: optimize
  noSecondaryStorage: false
  identity:
    service:
      url: http://camunda-identity.hub.svc.cluster.local:80/identity
    auth:
      # The exact "iss" claim your provider mints. Optimize validates it on every token.
      issuer: https://login.example.com/realms/camunda-platform
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs

optimize:
  enabled: true
  contextPath: /optimize-tenanta
  security:
    authentication:
      method: oidc
      oidc:
        clientId: optimize-production-a-tenanta
        audience: optimize-production-a-tenanta-api
        redirectUrl: https://production-a.example.com/optimize-tenanta
        secret:
          existingSecret: optimize-production-a-tenanta-oidc
          existingSecretKey: client-secret
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: https
        host: elasticsearch.example.com
        port: 9200
      auth:
        username: camunda
        secret:
          existingSecret: secondary-storage
          existingSecretKey: password
      # Must exactly equal this tenant's exporter writer prefix.
      prefix: production-a-tenanta-records
  env:
    # Optimize's own indices. Must differ from every writer prefix.
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: production-a-tenanta-optimize
```

## Match the prefixes exactly

`optimize.database.elasticsearch.prefix` is a reader prefix. It must exactly equal the writer prefix of the exporter for this tenant in the Orchestration Cluster.

A mismatch doesn't fail. Optimize starts successfully against the wrong or an empty record set, and displays no process data. Similar-looking prefixes are not sufficient.

`CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` is different: it names where Optimize writes its own indices, and must be unique per Optimize release and distinct from every writer prefix.

For the full prefix model across all releases, see [isolate every index prefix family](./physical-tenants.md#isolate-every-index-prefix-family).

## Give each release its own identity

Every Optimize release needs its own OIDC client ID, audience, role name, redirect URL, and secret, and the same values must appear in that tenant's record in the Hub release.

Setting a dedicated `roleName` in the Hub cluster record avoids adding this tenant's audience to the shared `Optimize` role, which would grant access across tenants.

:::warning
You can point several tenants at one shared audience. Those instances are then separated by client identity only, not by authorization. Neither separate credentials nor separate index prefixes make this arrangement authorization isolation.
:::

Distinct `roleName` values keep the Optimize role isolated per tenant, but Optimize's logical tenants are a separate mechanism with their own cross-tenant caveat. See [Optimize and Physical Tenants](/self-managed/concepts/physical-tenants/optimize.md#known-limitation-logical-tenants-with-the-same-id-across-physical-tenants) if you reuse the same logical tenant ID across Physical Tenants.

## Install the release

```sh
helm install camunda-optimize-tenanta camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace orchestration \
  --values optimize-values.yaml
```

Use a distinct release name per tenant. Place Optimize releases in the Orchestration Cluster namespace, or in their own namespace. Ingress resources are namespace-scoped, so a separate namespace needs its own Ingress and subdomain.

## High availability

Optimize can run multiple replicas, but its importer and archiver must be active on only one replica at a time. Enabling them on more than one replica may cause data inconsistencies. See [Optimize system configuration](/self-managed/components/optimize/configuration/system-configuration-platform-8.md#general-settings).

## Next steps

- [Configure Physical Tenants across releases](./physical-tenants.md)
- [Optimize and Physical Tenants](/self-managed/concepts/physical-tenants/optimize.md)
- [Optimize configuration](/self-managed/components/optimize/configuration/system-configuration-platform-8.md)
