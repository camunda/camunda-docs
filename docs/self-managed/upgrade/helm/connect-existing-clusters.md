---
id: connect-existing-clusters
sidebar_label: Connect existing clusters to Hub
title: Connect existing Orchestration Clusters to a Camunda 8.10 Hub
description: Convert existing Camunda 8.7, 8.8, and 8.9 Helm releases into orchestration releases managed by a Camunda 8.10 Hub release, without upgrading the clusters.
---

Connect Orchestration Clusters you already run on Camunda 8.7, 8.8, or 8.9 to an 8.10 Hub release, keeping each cluster on its current version.

Each existing release becomes an orchestration release in place. Its brokers keep their volumes and process state, and the release stops running its own Management Identity, Keycloak, Console, and Web Modeler. Afterwards, the Hub release runs Camunda Hub and Management Identity for every cluster.

Don't combine a version upgrade with this move. Upgrade a cluster later with the upgrade guide for its version.

## Choose your path

| Existing release                                                   | Path                                                                                                                                               |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.10 combined release                                              | [Move from a combined release to the split topology](./combined-to-split-topology.md). That procedure also creates the Hub release                 |
| 8.7, 8.8, or 8.9 release whose users and projects become the Hub's | [Move a release on an earlier chart](./combined-to-split-topology.md#move-a-release-on-an-earlier-chart). The Hub release takes over its databases |
| 8.7, 8.8, or 8.9 release, and the Hub release already exists       | [Convert an existing release](#convert-an-existing-release) on this page                                                                           |
| 8.6 or earlier                                                     | Upgrade the release to 8.7 or later first. An 8.10 Hub manages Orchestration Clusters from 8.7                                                     |

## Prerequisites

| Prerequisite               | Detail                                                                                                                                                                                                                                                                                                          |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum chart version      | Each existing release must run at least chart 12.14.0 for 8.7, 13.14.0 for 8.8, or 14.11.0 for 8.9. Upgrade to that chart patch first, as a separate `helm upgrade`. See [requirements by chart version](/self-managed/deployment/helm/install/topology/orchestration-release.md#requirements-by-chart-version) |
| A running Hub release      | See [install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md)                                                                                                                                                                                                                    |
| OIDC                       | Basic authentication isn't supported for Hub topology connections                                                                                                                                                                                                                                               |
| A plan for existing data   | Converting stops the release's Management Identity, Keycloak, and Web Modeler, and doesn't move their data into the Hub release                                                                                                                                                                                 |
| Tested backup and restore  | A verified restore of broker volumes, secondary storage, and every database the release uses                                                                                                                                                                                                                    |
| A non-production rehearsal | Run the procedure against a copy of the release's configuration before production                                                                                                                                                                                                                               |

## Convert an existing release

Convert one release at a time, and confirm each one in Camunda Hub before you start the next.

### Step 1: Inventory the release

From the release's values file and the cluster, record:

- The release name, namespace, hostnames, and context paths.
- Every OIDC client ID, audience, and redirect URL, and the Secret that holds each client secret.
- The OIDC issuer the release validates tokens against.
- Which components the release runs, and which bundled subcharts are enabled.
- Every Elasticsearch or OpenSearch index prefix in use.

### Step 2: Add the cluster record to the Hub release

Add a record for the cluster to `global.topology.clusters` in the Hub release's values:

- Give the record a unique `id`, and give its components client IDs and audiences specific to this cluster, such as `orchestration-<id>` and `orchestration-<id>-api`. The release's existing client IDs are often the chart defaults, which another cluster in the same realm already uses. See [the cluster record](/self-managed/deployment/helm/install/topology/hub-release.md#the-cluster-record).
- Set `version` to the Camunda version the release runs.
- For a chart 8.7 release, also set `architecture: legacy` and the names of the split services. See [describe a chart 8.7 cluster](/self-managed/deployment/helm/install/topology/hub-release.md#describe-a-chart-87-cluster).

You can keep the existing client secrets. Copy them into a Secret in the Hub namespace and reference it from the record. Kubernetes Secrets are namespace-scoped.

Run `helm upgrade` on the Hub release. With Keycloak, Management Identity creates the record's clients with those secrets.

### Step 3: Update the release's values

Set these values on the existing release. Keep the release name, namespace, broker configuration, secondary storage configuration, and every index prefix unchanged.

| Value                                   | Set to                                                              |
| :-------------------------------------- | :------------------------------------------------------------------ |
| `global.topology.mode`                  | `orchestration`                                                     |
| `global.identity.auth.enabled`          | `true`                                                              |
| `global.identity.service.url`           | The Management Identity service in the Hub namespace                |
| `global.identity.auth.issuerBackendUrl` | The issuer the Hub release uses, as reached from inside the cluster |
| `global.identity.auth.publicIssuerUrl`  | The issuer the Hub release uses, as reached from browsers           |
| `global.identity.keycloak.url`          | The Keycloak the Hub release uses, if it uses Keycloak              |
| `identity.enabled`                      | `false`                                                             |
| `console.enabled`, `webModeler.enabled` | `false`                                                             |

Disable the bundled identity and database subcharts. The 8.8 and 8.9 charts reject the PostgreSQL subcharts in the `orchestration` role, and the 8.7 chart rejects all four listed for it:

| Chart | Set to `false`                                                                                              |
| :---- | :---------------------------------------------------------------------------------------------------------- |
| 8.9   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.8   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.7   | `identityKeycloak.enabled`, `identityPostgresql.enabled`, `postgresql.enabled`, `executionIdentity.enabled` |

Then set each component's client ID and audience to the values in the cluster record:

| Chart    | Values                                                                                                                                                                                                                                                                                                                      |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.8, 8.9 | `orchestration.security.authentication.oidc.clientId`, `.audience`, and `.redirectUrl`; `connectors.security.authentication.oidc.clientId`; `global.identity.auth.optimize.clientId`, `.audience`, and `.redirectUrl`; and the Connectors client in `orchestration.security.initialization.defaultRoles.connectors.clients` |
| 8.7      | `global.identity.auth.zeebe`, `.operate`, and `.tasklist` to the record's orchestration client ID and audience; `global.identity.auth.connectors.clientId`; `global.identity.auth.optimize.clientId` and `.audience`                                                                                                        |

The `orchestration` role doesn't disable Optimize. To keep Optimize in this release, leave it enabled. To move it to its own release, see [install an Optimize release](/self-managed/deployment/helm/install/topology/optimize-release.md).

If a client that the release's own Management Identity created must keep working unchanged, see [keep existing clients working](./combined-to-split-topology.md#keep-existing-clients-working).

### Step 4: Check the rendered change

Render the change with `helm template` or `helm diff` before you apply it, using the release's current chart version.

:::warning
Confirm the rendered output still contains the broker StatefulSet, `<release>-zeebe`, with the same name and the same `volumeClaimTemplates`. If the StatefulSet is missing or renamed, stop: applying the change would detach the brokers from their storage.
:::

Also confirm the output contains no Management Identity, Keycloak, Console, or Web Modeler workload, and no bundled PostgreSQL StatefulSet.

### Step 5: Apply the change

Run `helm upgrade` on the existing release, with the same release name, namespace, and chart version. Wait until every pod is ready.

The upgrade restarts the brokers, Connectors, and Optimize, because their configuration changes. The brokers keep their volumes, so process state is kept, but the cluster is briefly unavailable.

The release's Management Identity, Keycloak, Console, and Web Modeler stop in this step. The chart doesn't delete the PersistentVolumeClaims of the bundled databases it stops rendering, or any external database.

Tokens from the release's previous identity provider stop working. Job workers and API clients need the new token URL, client ID, and client secret.

### Step 6: Verify the cluster

- Confirm Camunda Hub lists the cluster, and that its readiness endpoints respond from the Hub namespace.
- Deploy a test process to the cluster through Hub.
- Confirm existing process instances are still visible in Operate, and workers still poll and complete jobs.
- Confirm the release logs no authentication errors.

## Roll back a conversion

Run `helm rollback` on the converted release to its previous revision. Broker volumes are unchanged, and the release's own Management Identity, Keycloak, Console, and Web Modeler return against their existing databases and volumes. Clients authenticate against the release's own provider again.

Then remove the cluster's record from the Hub release. Identity initialization is additive, so the clients, permissions, and roles the record created remain until you remove them.

## Next steps

- [Install an Orchestration Cluster release](/self-managed/deployment/helm/install/topology/orchestration-release.md)
- [Camunda 8.10 deployment topology](/self-managed/reference-architecture/deployment-topology.md)
