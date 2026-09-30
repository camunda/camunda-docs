---
id: combined-to-split-topology
sidebar_label: Move to the split topology
title: Move from a combined release to the split topology
description: Plan and execute the move from a single combined Camunda 8.10 Helm release to separate Hub, Orchestration Cluster, and Optimize releases.
---

Move an existing single-release Camunda 8.10 deployment to the split topology: one Hub release, one release per Orchestration Cluster, and one Optimize release per Physical Tenant.

This is a topology change, not a version upgrade. It doesn't change any component version, and it isn't required. A `combined` release remains both supported and the chart default.

:::warning
The hard part of this move is data, not values. Orchestration Cluster broker volumes hold active process state and don't move between releases. Read [what moves and what doesn't](#what-moves-and-what-doesnt) before you plan a cutover, and choose [keep the cluster in place](#strategy-1-keep-the-cluster-in-place-recommended) unless you have a specific reason not to.
:::

## When to make this move

Make it when you need something the combined release can't give you:

- Several Orchestration Clusters sharing one Camunda Hub and one Management Identity.
- Independent upgrade, scaling, or removal of a cluster without touching the management plane.
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

## Migrate off the bundled databases first

The Hub release takes over the Management Identity and Camunda Hub databases the combined release already uses, so those databases must live outside the Helm chart before you start. Camunda 8.10 removes the bundled Bitnami PostgreSQL subcharts.

If your release still runs Management Identity against the bundled Bitnami PostgreSQL:

1. Migrate that data to a database the chart doesn't manage. This can be your own deployment of Bitnami PostgreSQL, a managed cloud database, or any other supported PostgreSQL. See [migrate from Bitnami charts](/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/index.md).
2. Point the combined release at the external database, and confirm Management Identity works against it.
3. Only then remove the bundled database.

:::danger Protect the bundled database's volume
Before you remove the bundled PostgreSQL, check the reclaim policy of its PersistentVolume and the `persistentVolumeClaimRetentionPolicy` of its StatefulSet. If either deletes the volume when the StatefulSet or its PVC is removed, you lose the Management Identity data, including users, groups, roles, and permissions. Set the PersistentVolume's `persistentVolumeReclaimPolicy` to `Retain`, and take a verified backup, before you disable the subchart.
:::

The Hub release's Management Identity then uses that external database. See [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md#remove-keys-rejected-by-chart-15x).

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

## Strategy 1: Keep the cluster in place (recommended)

Keep the existing release and namespace as the orchestration release, and then install a new Hub release that takes over the existing Management Identity and Camunda Hub databases. Broker storage and cluster identity never move, so there's no process-state cutover.

:::warning Run only one Management Identity per database
Camunda doesn't support running more than one Management Identity against the same database. That's why this procedure converts the combined release first, which removes its Management Identity, and only then installs the Hub release against the same database. Never have the combined release's Management Identity and the Hub release's Management Identity running at the same time.
:::

Plan a maintenance window. From step 2 until the Hub release is ready in step 3, Camunda Hub and Management Identity aren't running.

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

## Strategy 2: Drain and recreate

Use this only when the cluster must move to a different release name, namespace, or Kubernetes cluster, and in-place conversion isn't possible.

1. Stop new process instances at the application boundary.
2. Let running instances complete, or migrate them. See [process instance migration](/components/concepts/process-instance-migration.md).
3. Take a verified backup of the broker state and secondary storage. See [back up and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
4. Install the Hub release, then a new orchestration release with new index prefixes.
5. Redeploy your process definitions and repoint your clients and workers.
6. Retire the old release only after you've confirmed the new cluster is serving correctly.

This costs a process-state cutover. Any instance still running in the old cluster stays there.

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
