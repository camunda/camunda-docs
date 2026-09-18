---
id: topology-physical-tenants
sidebar_label: "Configure Physical Tenants across releases"
title: "Configure Physical Tenants across releases"
description: "Map Physical Tenants across the Hub, Orchestration Cluster, and Optimize releases, isolate their index prefixes, and operate tenant lifecycle changes in order."
---

A Physical Tenant spans three releases: it's declared in an Orchestration Cluster release, mapped in the Hub release, and served by its own Optimize release.

This page covers the release-level work. For what a Physical Tenant is, how its isolation model works, and the full application configuration reference, see [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) and the [configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md).

This procedure applies to fresh Camunda 8.10 topology deployments. It doesn't define migration from a combined production release to split releases.

## Prerequisites

- A [Hub release](./hub-release.md) and at least one [Orchestration Cluster release](./orchestration-release.md).
- OIDC authentication. Physical Tenants don't support basic authentication.
- A pinned issuer on the orchestration release, set in `global.identity.auth.issuer` or `orchestration.security.authentication.oidc.issuer`. `publicIssuerUrl` and `issuerBackendUrl` don't satisfy this, because they're network routes rather than the `iss` claim. The Orchestration Cluster rejects a provider without `issuerUri` once tenants exist, and the chart fails the render rather than deploying a cluster that can't validate tokens. See [pin the issuer](./orchestration-release.md#pin-the-issuer).
- Elasticsearch or OpenSearch, if you want Optimize per tenant.

## Where each part of a tenant is configured

| Concern                                           | Release       | Configured with                                                          |
| ------------------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| The tenant itself, its storage, and its exporters | Orchestration | `orchestration.extraConfiguration`, as `camunda.physical-tenants.<id>.*` |
| Per-tenant secret store overrides                 | Orchestration | `orchestration.secretStore.physicalTenants`                              |
| The tenant's Optimize client and resource server  | Hub           | `global.topology.clusters[].physicalTenants[]`                           |
| The tenant's Optimize workload                    | Optimize      | A release with `global.topology.mode: optimize`                          |

The tenant ID must be identical in all three places.

:::note
The chart exposes no `orchestration.physicalTenants` values schema. A tenant's own configuration is application configuration, so it's delivered through `extraConfiguration` rather than typed chart values. The chart detects that tenants are declared only to enforce its own input constraints. See [Helm and application configuration responsibilities](/self-managed/deployment/helm/configure/configuration-responsibilities.md).
:::

## Declare tenants in the Orchestration Cluster release

Add a `camunda.physical-tenants` block through `orchestration.extraConfiguration`. For the delivery options, including a single `orchestration.configuration` block or environment variables, see [configure Physical Tenants in Helm chart](/self-managed/deployment/helm/configure/configure-physical-tenants.md).

:::warning
Declaring any Physical Tenant stops the `default` tenant inheriting the release's root exporters. Define an exporter for `default` explicitly, as well as one for every other tenant. Omitting it stops the default tenant exporting, with no error: Operate, Tasklist, and Optimize simply show no new data for that tenant.
:::

## Map tenants in the Hub release

In the Hub release, map the default tenant through the cluster-level `components.optimize` record, and map each non-default Physical Tenant through a `physicalTenants` entry. The tenant ID must exactly match the ID under `camunda.physical-tenants` in the Orchestration Cluster configuration.

```yaml
global:
  topology:
    mode: hub
    clusters:
      - id: production-a
        # namespace, releaseName, host, version, contextPaths, and other components omitted
        components:
          optimize: # Optimize for the default tenant
            enabled: true
            clientId: optimize-production-a-default
            audience: optimize-production-a-default-api
            roleName: Optimize production-a default
            redirectUrl: https://production-a.example.com/optimize-default
            secret:
              existingSecret: optimize-production-a-default-oidc
              existingSecretKey: client-secret
        physicalTenants:
          - id: tenanta
            components:
              optimize:
                enabled: true
                clientId: optimize-production-a-tenanta
                audience: optimize-production-a-tenanta-api
                roleName: Optimize production-a tenanta
                redirectUrl: https://production-a.example.com/optimize-tenanta
                secret:
                  existingSecret: optimize-production-a-tenanta-oidc
                  existingSecretKey: client-secret
```

Give every Optimize release its own OIDC client ID, audience, role name, redirect URL, and secret. Set the same client ID, audience, redirect URL, and secret on that tenant's Optimize release under `optimize.security.authentication.oidc`. Setting a dedicated `roleName` avoids adding the audience to the shared `Optimize` role.

A tenant record that's mapped in Hub but has no Optimize release deployed shows an unreachable Optimize in Hub.

## Isolate every index prefix family

Authentication doesn't isolate shared Elasticsearch or OpenSearch storage. Assign unique prefixes for every cluster and tenant.

| Prefix family                     | Configuration                                                                                                                                                             | Requirement                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Orchestration application indices | Default: `orchestration.index.prefix`. Physical Tenant: `camunda.physical-tenants.<id>.data.secondary-storage.<backend>.index-prefix`                                     | Unique per cluster and tenant                                       |
| Legacy exporter writer            | Default: `orchestration.exporters.zeebe.index.prefix` and an explicit `default` exporter in `camunda.physical-tenants`. Physical Tenant: its exporter `args.index.prefix` | Unique per cluster and tenant                                       |
| Optimize reader                   | `optimize.database.elasticsearch.prefix` or `optimize.database.opensearch.prefix`                                                                                         | Must exactly equal that tenant's Legacy exporter writer prefix      |
| Optimize application indices      | `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` or `CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX` in `optimize.env`                                           | Unique per Optimize release, and different from every writer prefix |

Two failure modes follow from getting this wrong, and neither announces itself:

- **Reusing a prefix** mixes one cluster's or tenant's records into another's Operate, Tasklist, or Optimize data.
- **A writer and reader mismatch** starts Optimize against the wrong or an empty record set. Similar-looking prefixes are not sufficient; the values must be equal.

See [configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).

## Override the secret store per tenant

`orchestration.secretStore.physicalTenants` deep-overlays the root secret store for a named tenant. Tenant IDs here may contain letters, digits, underscores, and hyphens.

A tenant must use the same provider and the same `default` store ID as the root store it overrides. Exactly one default store applies per tenant.

## Operate releases in dependency order

Use these orders for both Helm and GitOps reconciliation.

| Operation                  | Order                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Install                    | Hub, each Orchestration Cluster, then its default and Physical Tenant Optimize releases                                           |
| Add a tenant               | Add its Hub record, add its Orchestration tenant and exporter, then install its Optimize release                                  |
| Disable or remove a tenant | Stop or uninstall its Optimize release, remove its Orchestration tenant and exporter, then disable or remove its Hub record       |
| Re-enable a tenant         | Restore its Hub record, restore its Orchestration tenant and exporter, then reinstall its Optimize release with the same prefixes |
| Upgrade                    | Hub first, then Orchestration Clusters, then their Optimize releases. Complete and verify each layer before continuing            |
| Uninstall the topology     | All Optimize releases, all Orchestration Cluster releases, then the Hub release                                                   |

Adding a Physical Tenant requires a rolling restart of the Orchestration Cluster. See [provisioning and lifecycle](/self-managed/concepts/physical-tenants/provisioning-and-lifecycle.md).

## What removal leaves behind

Identity and Keycloak initialization is additive. Removing or disabling a cluster or tenant record doesn't delete its client, resource server, permissions, or role. Inventory and clean those objects explicitly after dependent releases have stopped. Don't delete an object still used by another release.

Helm uninstall also leaves Elasticsearch and OpenSearch indices intact. This permits re-enabling a tenant with the same prefixes, but it can expose old data to a newly mapped tenant if prefixes are reused. Apply your storage system's retention and deletion process separately, after confirming no release reads or writes those indices.

## Scope and limits

- Hub topology connections and Physical Tenants require OIDC. Basic authentication isn't covered.
- The chart doesn't configure cross-cluster DNS, routing, TLS trust, firewall rules, or external identity-provider objects. Every configured URL must be reachable from the release that uses it.
- One Optimize release serves one tenant. Sharing an Optimize release between the default tenant and Physical Tenants is out of scope.
- Separate OIDC credentials don't isolate storage. Prefixes and backend access controls remain your responsibility.
- Supported cluster and tenant scale limits haven't been established. Validate your target scale before committing to it.
- There's no migration path from Logical Tenants to Physical Tenants. See [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md).

## Next steps

- [Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md)
- [Physical Tenant configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md)
- [Back up and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
