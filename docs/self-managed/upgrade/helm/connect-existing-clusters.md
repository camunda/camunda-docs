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

## Plan for existing users, roles, and modeling data

Plan what happens to the data in each release's Management Identity, Keycloak, and Web Modeler before you convert it. Converting stops them, and doesn't copy or merge their data into the Hub release.

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

Re-create in the Hub release's identity provider and Management Identity what each converted release's Management Identity and Keycloak held, if you still need it:

- Users and groups, unless they come from a provider the Hub release also uses.
- Role assignments. See [role assignment across clusters](/self-managed/deployment/helm/install/topology/hub-release.md#role-assignment-across-clusters).
- Mapping rules, for an identity provider other than Keycloak.
- Tenants and their assignments, with the same tenant IDs, if the release uses multi-tenancy.

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

## Connect several existing clusters

Connect several existing releases to one Hub release by moving them to one identity provider, and then converting them one at a time.

### Use one identity provider for every release

Every release the Hub release manages must trust the identity provider that Management Identity and Camunda Hub use. Existing releases often each run their own bundled Keycloak, so choose the shared provider before you convert anything:

| Existing setup                                 | What to do                                                                                                                                                                                                                                                                                                                |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| All releases already use one external provider | Use the same issuer in the Hub release                                                                                                                                                                                                                                                                                    |
| Each release runs its own bundled Keycloak     | Choose one external Keycloak or OIDC provider for the Hub release. See [external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md) or [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) |
| Releases use different external providers      | Choose one of them for the Hub release, and move the others to it                                                                                                                                                                                                                                                         |

A release that moves to a different provider changes its token issuer in step 5 of the conversion:

- Signed-in users must sign in again.
- Tokens from the old provider are rejected. Give job workers and API clients the new token URL, client ID, and client secret before step 5.
- Users from the old provider exist in the new one only if you create or federate them.

### Grant access to each newly connected cluster

Adding a cluster record creates the clients it declares and adds the cluster's permissions to the shared canonical roles, or to the record's per-cluster roles. Clients that already exist in the Hub release's provider with directly assigned permissions, such as API clients, don't receive the new cluster's audience. The new cluster rejects their tokens with `401 Unauthorized` until you grant them its permissions in Management Identity.

After each Hub `helm upgrade` that adds a record, grant the new cluster's permissions to the existing clients that need it, and assign the record's per-cluster roles if you use them. See [role assignment across clusters](/self-managed/deployment/helm/install/topology/hub-release.md#role-assignment-across-clusters).

### Convert the releases in order

1. Set up the shared identity provider, and create or federate the users who need access.
2. Create the Hub release, either from the release whose data you keep, or against empty databases. See [decide which databases the Hub release uses](#decide-which-databases-the-hub-release-uses).
3. Convert the non-production releases first, one at a time. Confirm each one before you start the next.
4. Convert the production releases last, each in its own maintenance window.
5. After every release is converted, remove clients, roles, and databases that no release uses. Identity initialization is additive, so it doesn't remove them for you.

Each release keeps its own chart version. When you upgrade a converted release later, update the `version` in its Hub cluster record in the same change window.

## Roll back a conversion

Run `helm rollback` on the converted release to its previous revision. Broker volumes are unchanged, and the release's own Management Identity, Keycloak, Console, and Web Modeler return against their existing databases and volumes. Clients authenticate against the release's own provider again.

Then remove the cluster's record from the Hub release. Identity initialization is additive, so the clients, permissions, and roles the record created remain until you remove them.

## Next steps

- [Install an Orchestration Cluster release](/self-managed/deployment/helm/install/topology/orchestration-release.md)
- [Camunda 8.10 deployment topology](/self-managed/reference-architecture/deployment-topology.md)
