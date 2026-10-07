---
id: connect-existing-clusters
sidebar_label: Connect existing clusters to Hub
title: Connect existing Orchestration Clusters to a Camunda 8.10 Hub
description: Convert existing Camunda 8.7, 8.8, and 8.9 Helm releases into orchestration releases managed by a Camunda 8.10 Hub release, without upgrading the clusters.
---

Connect Orchestration Clusters you already run on Camunda 8.7, 8.8, or 8.9 to an 8.10 Hub release, keeping each cluster on its current version.

Each existing release becomes an orchestration release in place. Its brokers keep their volumes and process state, and the release stops running its own Management Identity, Console, Web Modeler, and bundled Keycloak, if it has one. Afterwards, the Hub release runs Camunda Hub and Management Identity for every cluster.

This page applies to every identity provider. Where steps differ, they distinguish a Keycloak that Management Identity administers from an external OIDC provider such as Microsoft Entra ID, Okta, or Auth0, which you administer yourself.

Don't combine a minor version upgrade with this move. Upgrade the release to the latest patch of its current minor version first, as described in the [prerequisites](#prerequisites), and upgrade to a later minor version only after the conversion, with the upgrade guide for that version.

## Choose your path

| Existing release         | Path                                                                                                                                                                                                             |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.10 combined release    | [Move from a combined release to the split topology](./combined-to-split-topology.md). That procedure also creates the Hub release                                                                               |
| 8.7, 8.8, or 8.9 release | [Install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md) with its own databases if you don't have one yet. Then [convert the release](#convert-an-existing-release) on this page |
| 8.6 or earlier           | Upgrade the release to 8.7 or later first. An 8.10 Hub manages Orchestration Clusters from 8.7                                                                                                                   |

## Prerequisites

| Prerequisite                             | Detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Latest patch                             | Upgrade each existing release to the latest Helm chart patch and the latest Camunda patch of its minor version, as a separate `helm upgrade`, and confirm it's healthy before you convert it. Use the Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to find the latest patch. The minimum chart versions that support the `orchestration` role are 12.14.0 for 8.7, 13.14.0 for 8.8, and 14.11.0 for 8.9, but they aren't the recommended versions. See [requirements by chart version](/self-managed/deployment/helm/install/topology/orchestration-release.md#requirements-by-chart-version) |
| A running Hub release                    | See [install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| OIDC                                     | Basic authentication isn't supported for Hub topology connections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| An identity provider outside the release | The release must trust the identity provider the Hub release uses. Step 5 removes a bundled Keycloak, because the `orchestration` role doesn't allow it. A release that signs in with its bundled Keycloak moves to the Hub release's provider in step 5                                                                                                                                                                                                                                                                                                                                                                               |
| Existing data                            | Converting stops the release's Management Identity and Web Modeler, and its bundled Keycloak if it has one. Their data isn't moved into the Hub release, and this page doesn't cover migrating it. Keep their databases and backups                                                                                                                                                                                                                                                                                                                                                                                                    |
| Tested backup and restore                | A verified restore of broker volumes, secondary storage, and every database the release uses                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| A non-production rehearsal               | Run the procedure against a copy of the release's configuration before production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

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

- Give the record a unique `id`.
- Give its components client IDs and audiences that no other record uses. The chart rejects a duplicate client ID or audience across records, for every identity provider. If several clusters share one client or app registration today, split it before you add their records. See [the cluster record](/self-managed/deployment/helm/install/topology/hub-release.md#the-cluster-record).
- Set `version` to the Camunda version the release runs.
- For a chart 8.7 release, also set `architecture: legacy` and the names of the split services. See [describe a chart 8.7 cluster](/self-managed/deployment/helm/install/topology/hub-release.md#describe-a-chart-87-cluster).

How the clients are created depends on the identity provider:

| Identity provider                            | Clients                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keycloak administered by Management Identity | The Hub `helm upgrade` creates the record's clients. The record needs a secret for each component. You can reuse the release's existing client secrets: copy them into a Secret in the Hub namespace and reference it from the record                                                                                                                |
| External OIDC provider                       | Register the clients in the provider before the Hub `helm upgrade`, including client secrets, redirect URLs, and the audience each component's tokens carry, and then copy their identifiers into the record. See [provider setup outside the chart](/self-managed/deployment/helm/install/topology/hub-release.md#provider-setup-outside-the-chart) |

Run `helm upgrade` on the Hub release.

### Step 3: Update the release's values

Set these values on the existing release. Leave the release name, namespace, broker configuration, secondary storage configuration, and every index prefix unchanged.

| Value                                                                                          | Set to                                                                                                                                                                                               |
| :--------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.topology.mode`                                                                         | `orchestration`                                                                                                                                                                                      |
| `global.identity.auth.enabled`                                                                 | `true`                                                                                                                                                                                               |
| `global.identity.service.url`                                                                  | The Management Identity service in the Hub namespace                                                                                                                                                 |
| `global.identity.auth.type`, and the issuer, token, and JWKS URLs under `global.identity.auth` | The same provider type and endpoints as the Hub release. See [authentication and authorization](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md) for your provider |
| `global.identity.keycloak.url`                                                                 | With Keycloak only: the Keycloak the Hub release uses                                                                                                                                                |
| `identity.enabled`                                                                             | `false`                                                                                                                                                                                              |
| `console.enabled`, `webModeler.enabled`                                                        | `false`                                                                                                                                                                                              |

Disable the bundled identity and database subcharts. The 8.8 and 8.9 charts reject all three listed for them in the `orchestration` role, and the 8.7 chart rejects all four. On the 8.7 chart, keep `zeebe.enabled`, `operate.enabled`, and `tasklist.enabled` set to `true`:

| Chart | Set to `false`                                                                                              |
| :---- | :---------------------------------------------------------------------------------------------------------- |
| 8.9   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.8   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.7   | `identityKeycloak.enabled`, `identityPostgresql.enabled`, `postgresql.enabled`, `executionIdentity.enabled` |

Then set each component's client ID, audience, client secret, and redirect URL to the values in the cluster record. For the client secret, set `existingSecret` and `existingSecretKey` to the Secret the record uses for that component:

| Chart    | Values                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.8, 8.9 | `orchestration.security.authentication.oidc.clientId`, `.audience`, `.redirectUrl`, and `.secret`; `connectors.security.authentication.oidc.clientId` and `.secret`; `global.identity.auth.optimize.clientId`, `.audience`, `.redirectUrl`, and the secret keys; and the Connectors client ID in `orchestration.security.initialization.defaultRoles.connectors.clients`                                                                  |
| 8.7      | `global.identity.auth.zeebe`, `.operate`, and `.tasklist`: the record's orchestration client ID, audience, and secret keys, the same in all three. `.operate.redirectUrl` and `.tasklist.redirectUrl`: the record's orchestration `redirectUrl` followed by `/operate` and `/tasklist`. `global.identity.auth.connectors`: client ID and secret keys. `global.identity.auth.optimize`: client ID, audience, secret keys, and redirect URL |

On chart 8.7, a record with `architecture: legacy` registers only `/operate/identity-callback` and `/tasklist/identity-callback` under its orchestration `redirectUrl`. Serve Operate and Tasklist at `/operate` and `/tasklist` on that host, or browser sign-in fails.

On the 8.7, 8.8, and 8.9 charts, Optimize stays in this release. The `optimize` role that runs it as its own release needs the 8.10 chart. Move Optimize to its own release after you upgrade the cluster to 8.10.

Whether the release's client IDs change depends on the chart:

- On the 8.8 and 8.9 charts, the record can reuse the release's `orchestration` client ID and `orchestration-api` audience, if no other record uses them. If the release also keeps its identity provider, existing clients then keep working. A release that moves off its bundled Keycloak loses the clients that Keycloak held, so its clients need new credentials either way. See step 5. If the record uses new IDs, keep accepting the old audience. See [keep existing clients working](./combined-to-split-topology.md#keep-existing-clients-working).
- On the 8.7 chart, the client IDs always change, because the release's separate `zeebe`, `operate`, and `tasklist` clients become the record's one orchestration client.

### Step 4: Check the rendered change

Render the change with `helm template` or `helm diff` before you apply it, using the release's current chart version.

:::warning
Confirm the rendered output still contains the broker StatefulSet, `<release>-zeebe`, with the same name and the same `volumeClaimTemplates`. If the StatefulSet is missing or renamed, stop: applying the change would detach the brokers from their storage.
:::

Also confirm the output contains no Management Identity, bundled Keycloak, Console, or Web Modeler workload, and no bundled PostgreSQL StatefulSet.

### Step 5: Apply the change

Run `helm upgrade` on the existing release, with the same release name, namespace, and chart version. Wait until every pod is ready.

On the 8.8 and 8.9 charts, the upgrade restarts the brokers, Connectors, and Optimize, because their configuration changes. On the 8.7 chart, it restarts the Zeebe Gateway, Operate, Tasklist, Connectors, and Optimize, and the brokers keep running, because their configuration doesn't change. Brokers that restart do so one at a time with the same volumes, so process state is kept. Optimize, and on chart 8.7 Operate and Tasklist, are unavailable until their new pod is ready. For how each workload restarts and when clients see failed requests, see [step 2 of keep the cluster in place](./combined-to-split-topology.md#step-2-convert-the-combined-release-to-an-orchestration-release).

The release's Management Identity, Console, and Web Modeler, and its bundled Keycloak if it has one, stop in this step. The chart doesn't delete the PersistentVolumeClaims of the bundled databases it stops rendering, or any external database.

What job workers and API clients need afterwards depends on what changed:

- If the release moved to a different identity provider, tokens from the old provider are rejected. Clients need the new token URL, client ID, and client secret.
- If the provider stayed the same, clients keep working as long as their tokens carry an audience the cluster accepts. Clients whose audience the cluster no longer accepts get `401 Unauthorized`. See [keep existing clients working](./combined-to-split-topology.md#keep-existing-clients-working).

### Step 6: Verify the cluster

- Confirm Camunda Hub lists the cluster, and that its readiness endpoints respond from the Hub namespace.
- Deploy a test process to the cluster through Hub.
- Confirm existing process instances are still visible in Operate, and workers still poll and complete jobs.
- Confirm the release logs no authentication errors.

## Roll back a conversion

Run `helm rollback` on the converted release to its previous revision. Broker volumes are unchanged, and the release's own Management Identity, Console, and Web Modeler, and its bundled Keycloak if it had one, return against their existing databases and volumes. Clients authenticate with the release's previous client IDs and provider again.

Then remove the cluster's record from the Hub release. Identity initialization is additive, so the clients, permissions, and roles the record created remain until you remove them.

## Next steps

- [Install an Orchestration Cluster release](/self-managed/deployment/helm/install/topology/orchestration-release.md)
- [Camunda 8.10 deployment topology](/self-managed/reference-architecture/reference-architecture.md#deployment-topology)
