---
id: combined-to-split-topology
sidebar_label: Move to the split topology
title: Move from a combined release to the split topology
description: Plan and execute the move from a single combined Camunda 8.10 Helm release to separate Hub, Orchestration Cluster, and Optimize releases.
---

Move an existing single-release Camunda 8.10 deployment to the split topology: one Hub release, one release per Orchestration Cluster, and one Optimize release per Physical Tenant.

This is a topology change, not a version upgrade. It doesn't change any component version, and it isn't required. A `combined` release remains both supported and the chart default.

:::warning
The hard part of this move is data, not values. Orchestration Cluster broker volumes hold active process state and don't move between releases. Read [what moves and what doesn't](#what-moves-and-what-doesnt) before you plan the move.
:::

## When to make this move

Make it when you need something the combined release can't give you:

- Several Orchestration Clusters sharing one Camunda Hub and one Management Identity.
- Independent upgrade, scaling, or removal of a cluster without touching the Hub plane.
- Physical Tenants with a separate Optimize instance per tenant.

If none of those apply, staying on a combined release is a fully supported long-term choice.

## Prerequisites

| Prerequisite                | Detail                                                                                                                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Already on 8.10 and healthy | Complete [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md) first. Don't combine a version upgrade with a topology change                                                  |
| External data services      | Management Identity and Camunda Hub databases, and Orchestration Cluster secondary storage, all externally managed. See [migrate off the bundled databases first](#migrate-off-the-bundled-databases-first) |
| OIDC with a pinned issuer   | Basic authentication isn't supported for Hub topology connections or Physical Tenants. See [pin the issuer](/self-managed/deployment/helm/install/topology/orchestration-release.md#pin-the-issuer)         |
| Tested backup and restore   | A verified restore of every data store: broker volumes, secondary storage, and both relational databases                                                                                                    |
| A non-production rehearsal  | Run the whole procedure against a copy of your production configuration before you touch production                                                                                                         |

To keep a release on the 8.7, 8.8, or 8.9 chart instead of upgrading it first, see [move a release on an earlier chart](#move-a-release-on-an-earlier-chart).

## Migrate off the bundled databases first

The Hub release takes over the Management Identity and Camunda Hub databases the combined release already uses, so those databases must live outside the Helm chart before you start. Camunda 8.10 removes the bundled Bitnami PostgreSQL subcharts.

If your release still runs Management Identity or Camunda Hub against a bundled Bitnami PostgreSQL (`identityPostgresql` or `webModelerPostgresql`), do the following for each database:

1. Migrate that data to a database the chart doesn't manage. This can be your own deployment of Bitnami PostgreSQL, a managed cloud database, or any other supported PostgreSQL. See [migrate from Bitnami charts](/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/index.md).
2. Point the combined release at the external database, and confirm Management Identity or Camunda Hub works against it.
3. Only then remove the bundled database.

:::danger Protect the bundled database's volume
Before you remove a bundled PostgreSQL, check the reclaim policy of its PersistentVolume and the `persistentVolumeClaimRetentionPolicy` of its StatefulSet. If either deletes the volume when the StatefulSet or its PVC is removed, you lose its data: for Management Identity, users, groups, roles, and permissions; for Camunda Hub, projects, files, and settings. Set the PersistentVolume's `persistentVolumeReclaimPolicy` to `Retain`, and take a verified backup, before you disable the subchart.
:::

The Hub release's Management Identity and Camunda Hub then use those external databases. See [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md#remove-keys-rejected-by-chart-15x).

## What moves and what doesn't

| Component             | Moves cleanly? | Why                                                                                                                       |
| :-------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Camunda Hub           | Yes            | Stateless at the workload layer; its state is in an external relational database                                          |
| Management Identity   | Yes            | Same. Its state is in an external relational database                                                                     |
| Connectors            | Yes            | Stateless                                                                                                                 |
| Optimize              | Yes            | Its state is in Elasticsearch or OpenSearch, reached by index prefix                                                      |
| Orchestration Cluster | **No**         | Broker PVCs are StatefulSet volume claim templates holding partition logs and snapshots, which are the live process state |

Secondary storage doesn't substitute for broker storage. Installing a fresh orchestration release creates a new, empty Orchestration Cluster: the Operate and Tasklist data in Elasticsearch describes process instances whose authoritative state lives in the broker volumes you left behind.

:::warning
Switching an existing release to `global.topology.mode: hub` suppresses its Orchestration Cluster StatefulSet. The PVCs remain, but the cluster stops. Never flip a release running your only Orchestration Cluster to `hub` mode.
:::

## Keep the cluster in place

Keep the existing release and namespace as the orchestration release, and then install a new Hub release that takes over the existing Management Identity and Camunda Hub databases. Broker storage and cluster identity never move, so there's no process-state cutover.

:::warning Run only one Management Identity per database
Camunda doesn't support running more than one Management Identity against the same database. That's why this procedure converts the combined release first, which removes its Management Identity, and only then installs the Hub release against the same database. Never have the combined release's Management Identity and the Hub release's Management Identity running at the same time.
:::

Plan a maintenance window. From step 2 until the Hub release is ready in step 3, Camunda Hub and Management Identity aren't running. During that window:

- **The Orchestration Cluster keeps running.** Brokers keep processing, the REST and gRPC APIs keep authenticating, and Operate and Tasklist sign-in keeps working. The Orchestration Cluster validates tokens against your OIDC provider and reads authorizations from its own secondary storage, so it doesn't call Management Identity. Pods that restart during the window start normally.
- **Connectors keep running.** Connectors get their tokens from your OIDC provider, not from Management Identity.
- **Optimize is degraded.** Its pods stay ready and restart normally, but Optimize reads tenant assignments and user details from Management Identity, so user lookups fail, and report and dashboard queries fail for multi-tenancy users whose tenants aren't cached. With Keycloak, Optimize reads the user's Optimize permission from the token. With any other OIDC provider, it checks the permission in Management Identity, so browser sessions can be refused during the window. Treat Optimize as unavailable for the window.
- **Your OIDC provider must stay up.** Every component authenticates against it. If Keycloak runs alongside Management Identity, make sure it isn't part of the outage.

### Step 1: Inventory what the combined release owns

From your current values file and cluster, record:

- Every index prefix in use. See [isolate every index prefix family](/self-managed/deployment/helm/install/topology/physical-tenants.md#isolate-every-index-prefix-family).
- Every OIDC client ID, audience, redirect URL, and role, and which secret holds each client secret.
- The Management Identity and Camunda Hub database connection details. The Hub release reuses these databases.
- The release name, namespace, and Orchestration Cluster context paths and hostnames.

Prepare `hub-values.yaml` now, so step 3 can follow step 2 without delay. Use `global.topology.mode: hub`, point Management Identity and Camunda Hub at the existing databases, and add a `global.topology.clusters` record whose component client IDs, audiences, redirect URLs, and secrets exactly match what the combined release already uses. Reusing the existing identifiers is what lets Hub adopt the running cluster instead of registering a second one. See [install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md).

### Step 2: Convert the combined release to an orchestration release

Update the existing release's values:

- Set `global.topology.mode: orchestration`. The role stops rendering Management Identity and Camunda Hub, so the combined release's Management Identity stops in this step.
- Set `identity.enabled: false`.
- Set `global.identity.service.url` to the Management Identity service the Hub release creates in step 3, in the Hub namespace.
- To run Optimize as its own release, set `optimize.enabled: false`. The `orchestration` role doesn't do this for you. The chart then stops rendering the legacy exporter Optimize reads, so enable it explicitly with the same writer prefix in the same `helm upgrade`. Optimize is unavailable from this step until its own release is running in step 5. To keep Optimize in this release instead, leave it enabled and skip step 5. See [export records for Optimize](/self-managed/deployment/helm/install/topology/orchestration-release.md#export-records-for-optimize).
- Keep the release name, namespace, `orchestration.*` values, secondary storage configuration, and every index prefix unchanged.

Run `helm upgrade` on the existing release, without changing its name or namespace. The Orchestration Cluster StatefulSet is preserved, so the brokers keep their volumes and their identity.

This `helm upgrade` restarts the Orchestration Cluster, Connectors, and Optimize pods even though their images don't change. Their configuration changes, for example the Management Identity service URL, and they read it only at startup. Each workload restarts according to its update strategy:

| Workload                                   | Update strategy                                                                     | Effect during the restart                                                                                                                                                                                                                                                                                                                                          |
| :----------------------------------------- | :---------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brokers, the `<release>-zeebe` StatefulSet | Rolling update, one broker at a time, each waiting for the previous one to be ready | With a replication factor of 1 or 2, each partition with a replica on the restarting broker loses quorum and is unavailable until that broker is ready again. With one broker, that means the whole cluster. With a replication factor of 3 or more, partitions keep quorum, but individual client requests can fail while leadership moves. Retry failed requests |
| Connectors                                 | Rolling update. The new pod starts before the old one stops                         | Stays available                                                                                                                                                                                                                                                                                                                                                    |
| Optimize                                   | `Recreate`, with one replica                                                        | Unavailable until the new pod is ready                                                                                                                                                                                                                                                                                                                             |
| Chart 8.7 only: Zeebe Gateway              | Rolling update. The new pod starts before the old one stops                         | Stays available                                                                                                                                                                                                                                                                                                                                                    |
| Chart 8.7 only: Operate and Tasklist       | `Recreate`, with one replica                                                        | Unavailable until the new pod is ready                                                                                                                                                                                                                                                                                                                             |

The brokers restart with the same volumes, so process state is kept.

:::warning
Verify with `helm template` or `helm diff` before you apply this step. Confirm the rendered output still contains the Orchestration Cluster StatefulSet with the same name, and the same `volumeClaimTemplates`, and no Management Identity Deployment. If the StatefulSet is absent or renamed, stop: applying it will detach your brokers from their storage.
:::

Before you continue, confirm the combined release's Management Identity pods have terminated.

### Step 3: Install the Hub release against the existing databases

Install the Hub release from the `hub-values.yaml` you prepared in step 1. Follow [install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md), and install into a new namespace. Don't reuse the orchestration release's namespace.

Project the workload client secrets into the Hub namespace as well. Kubernetes Secrets are namespace-scoped.

### Step 4: Verify the Hub release

Sign in to the new Hub host. Confirm the Orchestration Cluster appears in its cluster list, is reachable, and reports healthy. Deploy a test process through Hub to the cluster. Confirm your existing users, groups, roles, and Web Modeler projects are present, which shows the Hub release is using the existing databases.

If the cluster doesn't appear, see [roll back](#roll-back).

### Step 5: Move Optimize to its own release

If the combined release ran Optimize and you disabled it in step 2, install it as a separate release per Physical Tenant, and keep both of its existing prefixes:

- The reader prefix, `optimize.database.elasticsearch.prefix` or `optimize.database.opensearch.prefix`, must exactly equal the exporter writer prefix already in use, or Optimize starts against an empty record set.
- The application index prefix, `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` or `CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX`, must equal the value the combined release used. Optimize stores its reports, dashboards, and configuration there. A new value starts Optimize with none of them.

Route the Optimize host and path to the new release before users return. See [route traffic to Optimize](/self-managed/deployment/helm/install/topology/optimize-release.md#route-traffic-to-optimize).

See [install an Optimize release](/self-managed/deployment/helm/install/topology/optimize-release.md).

### Step 6: Clean up

- Confirm no workload still resolves the old in-release Management Identity or Hub service names.
- Inventory the OIDC clients, resource servers, permissions, and roles. Identity initialization is additive, so the combined release's objects still exist. Remove only what no release uses.
- Retire the old Hub hostname and its TLS certificate, or redirect it.

## Move a release on an earlier chart

An 8.10 Hub manages Orchestration Cluster releases on the 8.7, 8.8, and 8.9 charts, so you can move a combined release on one of those charts under a Hub without upgrading it. Follow [keep the cluster in place](#keep-the-cluster-in-place), with the differences in this section. Upgrade each cluster to 8.10 later, one at a time.

| Topic            | Difference                                                                                                                                                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release values   | In step 2, apply the requirements of that chart version. See [requirements by chart version](/self-managed/deployment/helm/install/topology/orchestration-release.md#requirements-by-chart-version) |
| Cluster record   | A chart 8.7 cluster needs `architecture: legacy`. See [describe a chart 8.7 cluster](/self-managed/deployment/helm/install/topology/hub-release.md#describe-a-chart-87-cluster)                     |
| Existing clients | Keep accepting the audience of the clients the release's own Management Identity created. See [keep existing clients working](#keep-existing-clients-working)                                       |

### Keep existing clients working

With Keycloak, clients that the release's own Management Identity created, such as the Connectors client, keep requesting tokens with the audience that Management Identity assigned, `orchestration-api` by default. A cluster record usually declares a cluster-specific audience, such as `orchestration-<id>-api`, and after step 2 the Orchestration Cluster accepts only the audiences it's configured with.

If the release doesn't accept the old audience, Connectors can't authenticate to the Orchestration Cluster and never becomes ready. Its log shows:

```text
io.grpc.StatusRuntimeException: UNAUTHENTICATED: Invalid bearer token
```

On the 8.8 and 8.9 charts, add the old audience in the same `helm upgrade` as step 2:

```yaml
orchestration:
  security:
    authentication:
      oidc:
        backwardsCompatibleAudiences:
          - orchestration-api
```

On the 8.10 chart, `backwardsCompatibleAudiences` is deprecated. List the old audience with the full default set in `camunda.security.authentication.oidc.audiences`. See [backwards-compatible audiences replace the audience list](/self-managed/upgrade/helm/890-to-8100.md#backwards-compatible-audiences-replace-the-audience-list).

On the 8.7 chart, Operate, Tasklist, and Connectors authenticate to Zeebe with the `zeebe` client the release's own Management Identity creates, set in `global.identity.auth.zeebe.clientId`. Don't change that value to the client ID in the cluster record before the Hub release has created that client. Until then, those components get `401 Unauthorized` from the token endpoint and don't become ready.

## Moving a cluster to a different release, namespace, or Kubernetes cluster

This procedure keeps the Orchestration Cluster in its existing release and namespace. Moving an Orchestration Cluster to a different release name, namespace, or Kubernetes cluster isn't covered: broker volumes hold the live process state and don't move between releases. If you need to do this, contact Camunda before you plan it.

## Roll back

| After step                         | To roll back                                                                                                                                                                                                             |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Step 2, release converted          | `helm rollback` the orchestration release to its previous revision. Broker volumes are unchanged, and the combined release's Management Identity and Camunda Hub return against their databases                          |
| Step 3 or 4, Hub release installed | Uninstall the Hub release and confirm its Management Identity pods have terminated, then `helm rollback` the orchestration release as for step 2. Don't roll back while the Hub release's Management Identity is running |
| Step 5, Optimize separated         | Uninstall the Optimize release, remove the explicit exporter, and re-enable `optimize` in the orchestration release with the same reader and application prefixes                                                        |
| Step 6, cleanup done               | Identity object deletion isn't reversible. Re-create any client, resource server, permission, or role you removed in error                                                                                               |

Roll back before step 6. Once you've deleted Identity objects, recovery is manual.

## Verify the move

- Every pod is ready in all three releases.
- Camunda Hub lists the Orchestration Cluster, and it reports healthy.
- Deploying a process through Hub reaches the cluster.
- Existing process instances are still visible in Operate, and workers still poll and complete jobs.
- Optimize shows process data, which confirms its reader prefix matches the exporter writer prefix.
- Only one Management Identity is running, in the Hub release.
- No release logs authentication errors against an OIDC client that no longer exists.
