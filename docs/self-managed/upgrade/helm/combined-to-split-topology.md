---
id: combined-to-split-topology
sidebar_label: Move to the split topology
title: Move from a combined release to the split topology
description: Plan and execute the move from a single combined Camunda 8.10 Helm release to separate Hub, Orchestration Cluster, and Optimize releases.
---

Move an existing single-release Camunda 8.10 deployment to the split topology: one Hub release, one release per Orchestration Cluster, and one Optimize release per Physical Tenant.

This is a topology change, not a version upgrade. It doesn't change any component version, and it isn't required. A `combined` release remains supported and remains the chart default.

:::warning
The hard part of this move is data, not values. Orchestration Cluster broker volumes hold active process state and don't move between releases. Read [what moves and what doesn't](#what-moves-and-what-doesnt) before you plan a cutover, and choose [keep the cluster in place](#strategy-1-keep-the-cluster-in-place-recommended) unless you have a specific reason not to.
:::

## When to make this move

Make it when you need something the combined release can't give you:

- Several Orchestration Clusters sharing one Camunda Hub and one Management Identity.
- Independent upgrade, scaling, or removal of a cluster without touching the management plane.
- Physical Tenants with a separate Optimize instance per tenant.

If none of those apply, staying on a combined release is a reasonable long-term choice.

## Prerequisites

| Prerequisite                | Detail                                                                                                                                                                                              |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Already on 8.10 and healthy | Complete [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md) first. Don't combine a version upgrade with a topology change                                          |
| External data services      | Management Identity and Camunda Hub databases, and Orchestration Cluster secondary storage, all externally managed                                                                                  |
| OIDC with a pinned issuer   | Basic authentication isn't supported for Hub topology connections or Physical Tenants. See [pin the issuer](/self-managed/deployment/helm/install/topology/orchestration-release.md#pin-the-issuer) |
| Tested backup and restore   | A verified restore of every data store: broker volumes, secondary storage, and both relational databases                                                                                            |
| A non-production rehearsal  | Run the whole procedure against a copy of your production configuration before you touch production                                                                                                 |

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

## Strategy 1: keep the cluster in place (recommended)

Keep the existing release and namespace as the orchestration release, and stand up a new Hub release alongside it. Broker storage and cluster identity never move, so there's no process-state cutover.

### Step 1: inventory what the combined release owns

Record, from your current values file and cluster:

- Every index prefix in use. See [isolate every index prefix family](/self-managed/deployment/helm/install/topology/physical-tenants.md#isolate-every-index-prefix-family).
- Every OIDC client ID, audience, redirect URL, and role, and which secret holds each client secret.
- The Management Identity and Camunda Hub database connection details.
- The release name, namespace, and Orchestration Cluster context paths and hostnames.

### Step 2: install the Hub release in a new namespace

Create `hub-values.yaml` with `global.topology.mode: hub`, and a `global.topology.clusters` record whose component client IDs, audiences, redirect URLs, and secrets exactly match what the existing combined release already uses. Reusing the existing identifiers is what lets Hub adopt the running cluster instead of registering a second one.

Follow [install the Hub release](/self-managed/deployment/helm/install/topology/hub-release.md), and install into a new namespace. Don't reuse the combined release's namespace.

Project the workload client secrets into the Hub namespace as well. Kubernetes Secrets are namespace-scoped.

At this point Hub and Management Identity are running twice: once in the combined release, once in the new Hub release. Both read the same external databases, so confirm your Hub database supports the concurrent connections before you continue.

### Step 3: verify the new Hub release

Sign in to the new Hub host. Confirm the Orchestration Cluster appears in its cluster list, is reachable, and reports healthy. Deploy a test process through the new Hub to the existing cluster.

Stop here and roll back if the cluster doesn't appear. Nothing has changed in the execution plane yet.

### Step 4: convert the combined release to an orchestration release

Update the existing release's values:

- Set `global.topology.mode: orchestration`.
- Set `identity.enabled: false`.
- Set `global.identity.service.url` to the Management Identity service in the Hub namespace.
- Set `camundaHub.enabled: false`.
- Remove `optimize` from this release if you intend to run Optimize as its own release.
- Keep the release name, namespace, `orchestration.*` values, secondary storage configuration, and every index prefix unchanged.

Run `helm upgrade` on the existing release, without changing its name or namespace. The Orchestration Cluster StatefulSet is preserved, so the brokers keep their volumes and their identity.

:::warning
Verify with `helm template` or `helm diff` before you apply this step. Confirm the rendered output still contains the Orchestration Cluster StatefulSet with the same name, and the same `volumeClaimTemplates`. If the StatefulSet is absent or renamed, stop: applying it will detach your brokers from their storage.
:::

### Step 5: move Optimize to its own release

If the combined release ran Optimize, install it as a separate release per Physical Tenant. Its reader prefix must exactly equal the exporter writer prefix already in use, or it starts against an empty record set.

See [install an Optimize release](/self-managed/deployment/helm/install/topology/optimize-release.md).

### Step 6: clean up

- Confirm no workload still resolves the old in-release Management Identity or Hub service names.
- Inventory the OIDC clients, resource servers, permissions, and roles. Identity initialization is additive, so the combined release's objects still exist. Remove only what no release uses.
- Retire the old Hub hostname and its TLS certificate, or redirect it.

## Strategy 2: drain and re-create

Use this only when the cluster must move to a different release name, namespace, or Kubernetes cluster, and in-place conversion isn't possible.

1. Stop new process instances at the application boundary.
2. Let running instances complete, or migrate them. See [process instance migration](/components/concepts/process-instance-migration.md).
3. Take a verified backup of the broker state and secondary storage. See [back up and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
4. Install the Hub release, then a new orchestration release with new index prefixes.
5. Redeploy your process definitions and repoint your clients and workers.
6. Retire the old release only after you've confirmed the new cluster is serving correctly.

This costs a process-state cutover. Any instance still running in the old cluster stays there.

## Roll back

| After step                 | To roll back                                                                                                                                                  |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Step 2, Hub installed      | Uninstall the Hub release. The combined release is untouched                                                                                                  |
| Step 3, Hub verified       | Same. Nothing in the execution plane has changed                                                                                                              |
| Step 4, release converted  | `helm rollback` the orchestration release to its previous revision. Broker volumes are unchanged, so the combined release's Hub and Identity workloads return |
| Step 5, Optimize separated | Uninstall the Optimize release and re-enable `optimize` in the orchestration release, with the same prefixes                                                  |
| Step 6, cleanup done       | Identity object deletion isn't reversible. Re-create any client, resource server, permission, or role you removed in error                                    |

Roll back before step 6. Once you've deleted Identity objects, recovery is manual.

## Verify the move

- Every pod is ready in all three releases.
- Camunda Hub lists the Orchestration Cluster, and it reports healthy.
- Deploying a process through Hub reaches the cluster.
- Existing process instances are still visible in Operate, and workers still poll and complete jobs.
- Optimize shows process data, which confirms its reader prefix matches the exporter writer prefix.
- Only one Management Identity is running, in the Hub release.
- No release logs authentication errors against an OIDC client that no longer exists.
