---
id: multi-region-rdbms-operational-procedure
sidebar_label: Multi-Region RDBMS operational procedure
title: Multi-Region RDBMS operational procedure
description: "Handle a region loss, bring a region back, and activate a declared zone in a Multi-Region RDBMS setup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RegionLoss from './img/multi-region-rdbms-region-loss.svg';

<!-- Diagrams: edit the .excalidraw source, then export SVG and strip the embedded font block,
     replace font-family with a monospace stack, and remove the root width/height so the SVG
     scales to the content column. A vanilla excalidraw.app export does none of these. -->

import MultiRegionRdbmsCopy from '../\_partials/\_multi-region-rdbms-copy.md'

This runbook covers the day-2 operations of a [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md) setup: losing a region, bringing it back, and activating a zone that was declared but never deployed.

:::caution
Develop, test, and rehearse these procedures in a non-production environment before you need them. The commands below are examples from the [reference implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md); adapt them to your environment.
:::

## What is different from dual-region

In a [dual-region](./dual-region-ops.md) setup, losing a region costs the Zeebe quorum. Processing stops, and the failover procedure exists to restore it: remove the lost brokers, disable the exporter to the lost region, and later restore secondary storage from a snapshot.

With three or more zones, none of that applies. Every partition keeps a majority of its replicas, so **Zeebe keeps processing** and no Zeebe action is required to restore service. The failover procedure mostly reports; its only real work is the database writer, and only when the writer was in the lost region.

<RegionLoss role="img" title="Side-by-side timelines of the same zone loss. In a two-zone cluster, Zeebe loses quorum and processing stops until an operator force-removes the lost brokers and disables the exporter, and failback also requires a secondary storage snapshot and restore, for four operator steps in total. In a three-zone cluster, quorum holds and processing continues, there is nothing to force-remove, disable, or restore, and two operator steps remain: promoting the database writer if it was in the lost zone, and redeploying the zone." />

| Step                             | Dual-region                             | Multi-Region RDBMS                              |
| :------------------------------- | :-------------------------------------- | :---------------------------------------------- |
| Restore processing               | Force-remove the lost brokers           | Nothing, processing never stopped               |
| Secondary storage after failover | Disable the exporter to the lost region | Nothing, there is one exporter and one database |
| Promote the database             | n/a                                     | Only if the writer was in the lost region       |
| Failback                         | Snapshot and restore secondary storage  | Redeploy the region                             |

## Terminology

| Term          | Meaning                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------- |
| Slot          | A position in the region list, numbered from `0`. Fixed when the cluster is bootstrapped. |
| Zone          | The Camunda-level name of a region, for example `london`. One zone per region.            |
| Declared zone | A zone present in the zone list, whether or not it is deployed.                           |
| Active region | A slot that is actually deployed.                                                         |
| Writer        | The single database instance accepting writes from every region.                          |

## Prerequisites

<MultiRegionRdbmsCopy />

Source the environment before running any procedure. The scripts derive everything from the Terraform state, and refuse to run against an inconsistent topology:

```bash
cd procedure
. ./export-terraform-outputs.sh
. ./export_environment_prerequisites.sh
```

The dot is required: these scripts export variables into your current shell, not into a subshell. For what each variable means, see [prepare the environment](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md#2-prepare-the-environment) in the deployment guide.

You also need the credentials and the CLI tools the deployment used: `kubectl` contexts for every active region, `helm`, `jq`, and your cloud provider's CLI. The [deployment guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md#requirements) lists them.

Verify the cluster is healthy before you start, so you can tell what the procedure changed:

```bash
./check-cluster-topology.sh
```

## Handle a region loss

### 1. Confirm the quorum is intact

Losing one zone out of three or more removes one replica of every partition. The remaining replicas still form a majority, so partitions elect new leaders where needed and keep processing.

Confirm this rather than assuming it, especially if more than one zone is affected:

```bash
./failover.sh <lost-region-slot>
```

The script reports the quorum state, prints the current cluster view, and warns if the surviving zones no longer hold a majority.

### 2. Promote the database writer if needed

If the writer was in the lost region, promote a surviving member. The mode depends on whether the lost region is still reachable:

<Tabs groupId="failover-mode" defaultValue="planned" queryString values={[{label: 'Planned', value: 'planned' }, {label: 'Unplanned', value: 'unplanned' }]}>

<TabItem value="planned">

The region is still reachable, for example during a scheduled evacuation. A switchover completes replication before promoting, so **no data is lost**.

```bash
./failover.sh <lost-region-slot>
```

</TabItem>

<TabItem value="unplanned">

The region is gone. The surviving member is detached and promoted, and whatever had not replicated at the time of the outage is **lost**. The bound on that loss is the replication lag your [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) strategy allows.

```bash
./failover.sh <lost-region-slot> --unplanned
```

An unplanned promotion detaches the member from the global database. The global topology must be rebuilt during failback.

</TabItem>

</Tabs>

Camunda needs no reconfiguration and no restart. The JDBC driver discovers the new writer, and connections in flight during the promotion are retried.

If the writer was not in the lost region, no database action is required.

### 3. Route client traffic away from the lost region

Zeebe keeps processing, but the gateway in the lost region is unreachable. Update your DNS or load balancer to stop sending client traffic there. This is outside Camunda's control and specific to your traffic management setup.

### 4. Decide whether to remove the zone

Removing the lost zone from the partition distribution is **optional** with three or more zones, and usually not worth it for a zone you expect back.

| Zones | After losing one                                            | Removing the zone                                                               |
| :---- | :---------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 2     | One replica of two, no majority, processing stops           | **Required**. Removing the zone restores a quorum the survivor can reach alone. |
| 3+    | Two replicas of three, majority holds, processing continues | **Optional**, and cheaper to skip.                                              |

The reason to leave a zone in place is failback cost. Brokers that stayed members rejoin and catch up from the Raft log, while a removed zone has to be added back explicitly and its brokers start from nothing.

If you do need to remove it, one atomic change evicts the zone's brokers and drops the zone from the persisted partition distribution, so quorum stops counting replicas that cannot answer:

```bash
./failover.sh <lost-region-slot> --drain-brokers
```

This issues `DELETE /actuator/cluster/zones/<zone>` against a surviving region. Only do this for a zone that is down and unreachable. See the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).

### 5. Verify the degraded cluster

```bash
./verify-degraded-cluster.sh <lost-region-slot>
```

The cluster should report the surviving brokers, all partitions healthy, and processing continuing.

## Bring a region back

Failback is short, and deliberately so. There is no secondary storage snapshot and restore step: the database holds a single copy of the exported data and replicates it itself, so a returning region has nothing to catch up on at the Camunda level.

```bash
./failback.sh <recovered-region-slot>
```

The procedure does four things:

1. **Redeploys Camunda** in the recovered region: namespace, database secret, Helm values, and chart.
2. **Re-exports the region's services** to the ClusterSet, so brokers in other regions can resolve them again.
3. **Re-adds the zone** if it was force-removed during failover. If the zone was left in place, its brokers rejoin and catch up from the Raft log with no membership change at all.
4. **Reports the database state**, and rebuilds the global topology if an unplanned failover detached a member.

To move the writer back to the recovered region, which is worth doing if the other regions are further from the current writer:

```bash
./failback.sh <recovered-region-slot> --switch-writer
```

Leaving the writer where it is costs nothing but cross-region latency for the regions furthest from it.

:::note After an unplanned failover
An unplanned failover detaches the promoted member from the global database, leaving it with a single member. Rebuilding the global topology is a Terraform operation, not a script one: re-run `terraform apply` so the missing members are recreated and re-attached, then re-run the failback if you also want to switch the writer.
:::

Verify when done:

```bash
./check-cluster-topology.sh
```

## Activate a declared zone

Activating a zone that was declared in the zone list but never deployed is an **online** operation. The partition layout already reserved that zone's replicas, so activating it only fills them in. No broker is renumbered, no partition is redistributed, and the running regions are not restarted.

### 1. Provision the infrastructure

Raise `active_region_count` so the region's cluster, Transit Gateway attachments, and security group rules exist:

```bash
cd ../terraform/clusters
terraform apply -var cluster_name=camunda -var active_region_count=3
```

### 2. Update the environment

Re-source the environment so `CAMUNDA_ACTIVE_REGIONS` reflects the new count, and register a kubectl context for the new cluster:

```bash
cd ../../procedure
. ./export-terraform-outputs.sh
. ./export_environment_prerequisites.sh
./register-kubecontexts.sh
```

### 3. Activate the slot

```bash
./activate-region.sh <slot>
```

The procedure joins the new cluster to the ClusterSet, prepares its storage class, namespace, and database secret, renders the Helm values with the longer contact point list, installs only the new region, exports its services, and waits for the new brokers to join.

The regions already running keep their shorter contact point list and are not restarted. The contact point list matters at bootstrap; once a cluster is formed, a newcomer only has to reach one member and the rest learn about it by gossip. The running regions pick up the longer list on their next upgrade.

:::warning
`activate-region.sh` fills a slot that already exists in the zone list. It does not add a new zone. Adding a zone that was never declared changes the zone list in every region and redistributes partitions, which is a migration rather than an online operation.
:::

## Upgrade the cluster

Upgrade **one region at a time**, and wait for the cluster to report healthy before starting the next:

```bash
./check-cluster-topology.sh
```

Upgrading several regions simultaneously risks losing the quorum the architecture exists to preserve.

Follow the general [upgrade guidance](/self-managed/upgrade/index.md) and create a [backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md) first.

## Diagnose problems

| Symptom                                 | Start here                                                                      |
| :-------------------------------------- | :------------------------------------------------------------------------------ |
| Brokers do not reach the expected count | `./submariner/verify-submariner.sh`, then `./submariner/diagnose-submariner.sh` |
| Cross-region traffic is dropped         | `./verify-cross-region-connectivity.sh`                                         |
| Export latency is higher than expected  | `./measure-rdbms-latency.sh`                                                    |
| Partition distribution looks wrong      | `./check-cluster-topology.sh`                                                   |

For the underlying causes and the AWS commands that confirm them, see [troubleshooting in the EKS guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md#troubleshooting).

## Related resources

- [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md): the architecture and its trade-offs.
- [Multi-region setup with RDBMS on Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md): the reference implementation.
- [Cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md): the endpoints these procedures call.
- [Dual-region operational procedure](./dual-region-ops.md): the equivalent runbook for two regions.
