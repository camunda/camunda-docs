---
id: connect-existing-clusters
sidebar_label: Connect existing clusters to Hub
title: Connect existing Orchestration Clusters to a Camunda 8.10 Hub
description: Convert existing Camunda 8.7, 8.8, and 8.9 Helm releases into orchestration releases managed by a Camunda 8.10 Hub release, without upgrading the clusters.
---

Connect Orchestration Clusters you already run on Camunda 8.7, 8.8, or 8.9 to an 8.10 Hub release, keeping each cluster on its current version.

Each existing release becomes an orchestration release in place. Its brokers keep their volumes and process state, and the release stops running its own Management Identity, Console, and Web Modeler, and its bundled Keycloak if it has one. Afterwards, the Hub release runs Camunda Hub and Management Identity for every cluster.

This page applies to every identity provider. Where steps differ, they distinguish a Keycloak that Management Identity administers from an external OIDC provider such as Microsoft Entra ID, Okta, or Auth0, which you administer yourself.

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
| One identity provider      | The release must trust the identity provider the Hub release uses. A release with its own bundled Keycloak moves to that provider in step 3                                                                                                                                                                     |
| A plan for existing data   | Converting stops the release's Management Identity and Web Modeler. See [plan for existing users, roles, and modeling data](#plan-for-existing-users-roles-and-modeling-data)                                                                                                                                   |
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

Set these values on the existing release. Keep the release name, namespace, broker configuration, secondary storage configuration, and every index prefix unchanged.

| Value                                                                                          | Set to                                                                                                                                                                                               |
| :--------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.topology.mode`                                                                         | `orchestration`                                                                                                                                                                                      |
| `global.identity.auth.enabled`                                                                 | `true`                                                                                                                                                                                               |
| `global.identity.service.url`                                                                  | The Management Identity service in the Hub namespace                                                                                                                                                 |
| `global.identity.auth.type`, and the issuer, token, and JWKS URLs under `global.identity.auth` | The same provider type and endpoints as the Hub release. See [authentication and authorization](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md) for your provider |
| `global.identity.keycloak.url`                                                                 | With Keycloak only: the Keycloak the Hub release uses                                                                                                                                                |
| `identity.enabled`                                                                             | `false`                                                                                                                                                                                              |
| `console.enabled`, `webModeler.enabled`                                                        | `false`                                                                                                                                                                                              |

Disable the bundled identity and database subcharts. The 8.8 and 8.9 charts reject the PostgreSQL subcharts in the `orchestration` role, and the 8.7 chart rejects all four listed for it:

| Chart | Set to `false`                                                                                              |
| :---- | :---------------------------------------------------------------------------------------------------------- |
| 8.9   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.8   | `identityPostgresql.enabled`, `webModelerPostgresql.enabled`, and `identityKeycloak.enabled`                |
| 8.7   | `identityKeycloak.enabled`, `identityPostgresql.enabled`, `postgresql.enabled`, `executionIdentity.enabled` |

Then set each component's client ID, audience, and client secret to the values in the cluster record:

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

Also confirm the output contains no Management Identity, bundled Keycloak, Console, or Web Modeler workload, and no bundled PostgreSQL StatefulSet.

### Step 5: Apply the change

Run `helm upgrade` on the existing release, with the same release name, namespace, and chart version. Wait until every pod is ready.

The upgrade restarts the brokers, Connectors, and Optimize, because their configuration changes. On chart 8.7, it also restarts the Zeebe Gateway, Operate, and Tasklist. The brokers restart one at a time with the same volumes, so process state is kept. Optimize, and on chart 8.7 Operate and Tasklist, are unavailable until their new pod is ready. For how each workload restarts and when clients see failed requests, see [step 2 of keep the cluster in place](./combined-to-split-topology.md#step-2-convert-the-combined-release-to-an-orchestration-release).

The release's Management Identity, Console, and Web Modeler, and its bundled Keycloak if it has one, stop in this step. The chart doesn't delete the PersistentVolumeClaims of the bundled databases it stops rendering, or any external database.

What job workers and API clients need afterwards depends on what changed:

- If the release moved to a different identity provider, tokens from the old provider are rejected. Clients need the new token URL, client ID, and client secret.
- If the provider stayed the same, clients keep working as long as their tokens carry an audience the cluster accepts. Clients whose audience the cluster no longer accepts get `401 Unauthorized`. See [keep existing clients working](./combined-to-split-topology.md#keep-existing-clients-working).

### Step 6: Verify the cluster

- Confirm Camunda Hub lists the cluster, and that its readiness endpoints respond from the Hub namespace.
- Deploy a test process to the cluster through Hub.
- Confirm existing process instances are still visible in Operate, and workers still poll and complete jobs.
- Confirm the release logs no authentication errors.

## Plan for existing users, roles, and modeling data

Plan what happens to the data in each release's Management Identity, bundled Keycloak if it has one, and Web Modeler before you convert it. Converting stops them, and doesn't copy or merge their data into the Hub release.

### Decide which databases the Hub release uses

The Hub release uses one Management Identity database and one Camunda Hub database:

| Option                     | When to use it                                                                 | How                                                                                                                                                                                       |
| :------------------------- | :----------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adopt one release's data   | One existing release holds most of your users, roles, and Web Modeler projects | Create the Hub release from that release with [move a release on an earlier chart](./combined-to-split-topology.md#move-a-release-on-an-earlier-chart). Convert the others with this page |
| Start with empty databases | No release's data is worth keeping as a base                                   | Install the [Hub release](/self-managed/deployment/helm/install/topology/hub-release.md) against new, empty databases, and convert every release with this page                           |

The Hub release can take over a Web Modeler database from 8.9 only. See [bring Web Modeler projects into the Hub](./combined-to-split-topology.md#bring-web-modeler-projects-into-the-hub).

:::warning Run only one Management Identity per database
Camunda doesn't support running more than one Management Identity against the same database. Never point the Hub release at a Management Identity database that a release you haven't converted still uses.
:::

### Move users, groups, roles, and tenants

Re-create in the Hub release what each converted release's Management Identity held, if you still need it. What that includes depends on the identity provider:

| What to re-create                                         | Keycloak, where each release had its own                     | External OIDC provider shared by every release         |
| :-------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------- |
| Users and groups                                          | Yes, in the Hub release's provider, unless you federate them | No. They stay in the provider                          |
| Mapping rules from token claims, such as groups, to roles | Only if you used them                                        | Yes, in the Hub release's Management Identity          |
| Role assignments                                          | Yes                                                          | Yes, for users and groups not covered by mapping rules |
| Tenants and their assignments, with the same tenant IDs   | If the release uses multi-tenancy                            | If the release uses multi-tenancy                      |

See [role assignment across clusters](/self-managed/deployment/helm/install/topology/hub-release.md#role-assignment-across-clusters).

What stays with each cluster depends on its chart:

| Chart    | Stays with the cluster                                                                                 | Granted through the Hub release                                        |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| 8.8, 8.9 | Orchestration Cluster users, groups, roles, tenants, and authorizations, held in its secondary storage | Client access to the cluster's API audience, Optimize, and Camunda Hub |
| 8.7      | Process data                                                                                           | Access to Zeebe, Operate, Tasklist, and Optimize, and to Camunda Hub   |

Do this before step 5 of the conversion, so users keep access when the release's own Management Identity stops.

### Move Web Modeler projects and files

Export each converted release's Web Modeler projects before step 5, while its Web Modeler still runs, and import them into Camunda Hub afterwards:

- If a project uses Git sync, sync it, and then connect a Camunda Hub project to the same repository. See [Git sync](/components/hub/workspace/manage-projects/git-sync.md).
- Otherwise, download the files and upload them to a Camunda Hub project. See [import resources](/components/hub/workspace/modeler/modeling/importing-resources.md).

Keep the exported files, and the old database, until you've confirmed the projects in Camunda Hub.

## Roll back a conversion

Run `helm rollback` on the converted release to its previous revision. Broker volumes are unchanged, and the release's own Management Identity, Console, and Web Modeler, and its bundled Keycloak if it had one, return against their existing databases and volumes. Clients authenticate with the release's previous client IDs and provider again.

Then remove the cluster's record from the Hub release. Identity initialization is additive, so the clients, permissions, and roles the record created remain until you remove them.

## Next steps

- [Install an Orchestration Cluster release](/self-managed/deployment/helm/install/topology/orchestration-release.md)
- [Camunda 8.10 deployment topology](/self-managed/reference-architecture/deployment-topology.md)
