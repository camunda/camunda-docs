---
id: multi-region-rdbms-operational-procedure
sidebar_label: Multi-Region RDBMS operational procedure
title: Multi-Region RDBMS operational procedure
description: "Handle a region loss, bring a region back, and add a region to a Multi-Region RDBMS setup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RegionLoss from './img/multi-region-rdbms-region-loss.svg';
import PromoteWriter from './img/multi-region-rdbms-promote-writer.svg';
import Failback from './img/multi-region-rdbms-failback.svg';
import AddZone from '../../../concepts/multi-region/img/multi-region-rdbms-add-zone.svg';

import MultiRegionRdbmsCopy from '../\_partials/\_multi-region-rdbms-copy.md'

This runbook covers the day-2 operations of a [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md) setup: losing a region, bringing it back, and adding a region.

:::caution
Develop, test, and rehearse these procedures in a non-production environment before you need them. The commands below are examples from the [reference implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md). Adapt them to your environment.
:::

## What is different from dual-region

In a [dual-region](./dual-region-ops.md) setup, losing a region costs the Zeebe quorum. Processing stops, and the failover procedure exists to restore it. That procedure removes the lost brokers, disables the exporter to the lost region, and later restores secondary storage from a snapshot.

With three or more zones and no zone holding half the replicas or more, none of that applies. Every partition keeps a majority of its replicas. Zeebe keeps processing, and you need no Zeebe action to restore service. The [dry run](#1-confirm-the-quorum-is-intact) confirms this before you act. The failover procedure mostly reports. It only acts on the database writer, and only when the writer was in the lost region.

<RegionLoss role="img" title="Side-by-side timelines of the same zone loss. In a two-zone cluster, Zeebe loses quorum and processing stops until an operator force-removes the lost brokers and disables the exporter. Failback also requires a secondary storage snapshot and restore, for four operator steps in total. In a three-zone cluster, quorum holds and processing continues. Three operator steps remain: promoting the database writer if it was in the lost zone, removing the lost zone, which is recommended but not needed for quorum, and redeploying the zone at failback." />

| Step                             | Dual-region                             | Multi-Region RDBMS                              |
| :------------------------------- | :-------------------------------------- | :---------------------------------------------- |
| Restore processing               | Force-remove the lost brokers           | Nothing, processing never stopped               |
| Secondary storage after failover | Disable the exporter to the lost region | Nothing, there is one exporter and one database |
| Promote the database             | n/a                                     | Only if the writer was in the lost region       |
| Remove the lost zone             | Same step as restoring processing       | Recommended, not needed for quorum              |
| Failback                         | Snapshot and restore secondary storage  | Redeploy the region                             |

The [dual-region procedure](./dual-region-ops.md) takes 10 operator steps: two to fail over and eight to fail back. The diagram above counts three operator actions here: promote the writer if needed, remove the lost zone, and redeploy the region at failback. The runbook below adds confirmations around them, for five steps in total.

:::warning Use this runbook only for Multi-Region RDBMS
This runbook applies only to a zone-aware cluster with RDBMS secondary storage. Its region-loss procedures assume three or more zones. A cluster that starts on two zones uses only [Add a region](#add-a-region) until it runs three. Don't run the [dual-region procedure](./dual-region-ops.md) on it: force-removing brokers or restoring secondary storage from a snapshot is unnecessary here and can lose data. For a two-region cluster with Elasticsearch, use the dual-region procedure instead.
:::

## Terminology

| Term          | Meaning                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------- |
| Slot          | A position in the region list, numbered from `0`. Fixed when the cluster is bootstrapped. |
| Zone          | The Camunda-level name of a region, for example `london`. One zone per region.            |
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

Source them with the leading dot (`. ./script.sh`). These scripts export variables into your current shell, not into a subshell. For what each variable means, see [prepare the environment](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md#2-prepare-the-environment) in the deployment guide.

You also need the credentials and the CLI tools the deployment used: `kubectl` contexts for every active region, `helm`, `jq`, and your cloud provider's CLI. The [deployment guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md#requirements) lists them.

Confirm the cluster is healthy before you start, so you can tell what the procedure changed:

```bash
./check-cluster-topology.sh
```

## Handle a region loss

### 1. Confirm the quorum is intact

The surviving zones keep processing if they hold a majority of each partition's replicas. The [concept page](/self-managed/concepts/multi-region/multi-region-rdbms-region-loss.md) explains when this holds.

A cluster with only two zones, such as `2-2` before you add the third region, has no such margin. Losing either zone leaves two replicas of four, and processing stops.

Confirm this rather than assuming it. The script takes one lost slot and computes the surviving replicas without it. Its verdict only covers a single lost zone. If more than one zone is affected, the reference procedures don't cover the situation. Read the partition health of the surviving brokers from `GET /actuator/cluster` on a surviving region instead. Don't use `./check-cluster-topology.sh` here: it expects every active region to be up.

```bash
./failover.sh <lost-region-slot> --dry-run
```

With `--dry-run`, the script reports the quorum state, prints the current cluster view, and warns if the surviving zones no longer hold a majority. It changes nothing, so you can read the verdict before deciding to act.

### 2. Promote the database writer if needed

If the writer was in the lost region, promote a surviving member. The mode depends on whether the lost region is still reachable:

<PromoteWriter role="img" title="If the writer was not in the lost region, no database action is needed. If it was, a reachable region allows a planned switchover with ./failover.sh and no data loss, while a lost region needs the AWS global database recovery, which can lose records that were not replicated. Either way, the JDBC URL resolves to the new writer, and Camunda needs no reconfiguration and no restart. Then raise the priority of the zone with the new writer, wait for COMPLETED, and run POST /cluster/v2/rebalance." />

<Tabs groupId="failover-mode" defaultValue="planned" queryString values={[{label: 'Planned', value: 'planned' }, {label: 'Unplanned', value: 'unplanned' }]}>

<TabItem value="planned">

The region is still reachable, for example during a scheduled evacuation. A switchover completes replication before promoting, so no data is lost in the RDBMS. It also takes considerably less time than an unplanned failover.

Run the same script as in step 1, without `--dry-run`. It repeats the quorum report, then promotes a surviving member if the writer was in the lost region:

```bash
./failover.sh <lost-region-slot>
```

</TabItem>

<TabItem value="unplanned">

The region is gone. Follow the [Aurora Global Database unplanned recovery procedure](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html). The reference script doesn't automate this operation because detaching and promoting a member changes the global topology outside Terraform.

Whatever had not replicated at the time of the outage can be missing from the promoted database. With `LOG_SEQ`, recovery depends on promoting a standby whose replication was confirmed within the configured minimum. With `DELAY`, recovery depends on the actual lag staying below the configured delay. Restore the global database membership before running the Camunda failback procedure.

</TabItem>

</Tabs>

Camunda needs no reconfiguration and no restart, as long as the JDBC URL keeps resolving to the current writer. The reference implementation gets that from the [AWS Advanced JDBC Wrapper](/self-managed/concepts/databases/relational-db/configuration.md#usage-with-aws-aurora-postgresql). Its `failover` plugin follows the writer on established connections, and on brokers that start after the promotion. This is not general JDBC behavior. With your own database, whether connections re-resolve the writer depends on your driver and endpoint. Confirm it or plan a restart.

If the writer was not in the lost region, you need no database action.

#### Move the Raft leaders to the new writer region

Once the writer moves, the zone priorities still favor the region that hosted the old one. Partition leaders keep exporting across regions and pay the inter-region round trip on every flush. Move the leaders next to the new writer:

1. Raise the priority of the zone that now hosts the writer. See [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) for the priority property, and the [Partitioning API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partitioning-api) for applying it to a running cluster.
1. Wait until the change reports `COMPLETED`. The cluster rejects a new change while one is still in progress.
1. Run a [rebalance](/self-managed/components/orchestration-cluster/zeebe/operations/rebalancing.md) with `POST /cluster/v2/rebalance`. Priorities apply at the next election and don't move existing leaders on their own.

### 3. Route client traffic away from the lost region

Zeebe keeps processing, but the gateway in the lost region is unreachable. Update your DNS or load balancer to stop sending client traffic there. Traffic routing sits outside Camunda's control and depends on your own setup.

### 4. Remove the lost zone

Remove the brokers of the lost zone. One atomic change evicts them. It also drops the zone from the persisted partition distribution, so quorum stops counting replicas that cannot answer:

```bash
./failover.sh <lost-region-slot> --drain-brokers
```

This issues [`DELETE /actuator/cluster/zones/<zone>?force=true`](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#remove-a-zone) against a surviving region. Without `force=true`, the API tries a graceful drain, which fails when the zone is down. Only do this for a zone that is down and unreachable, and for one zone at a time. See the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).

In a planned evacuation, the zone is still reachable, so don't force-remove it. Drain it gracefully instead: send `DELETE /actuator/cluster/zones/<zone>` without `force=true` through the [Remove a zone API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#remove-a-zone). The engine moves the zone's partitions to the remaining zones before it removes the brokers. The request is asynchronous. Wait until `GET /actuator/cluster` reports the change as `COMPLETED` before you shut down the zone's brokers.

You must remove the zone when it held half the replicas or more. The replica count decides this, not the number of zones. See [step 1](#1-confirm-the-quorum-is-intact). An evenly split two-zone cluster always needs it, which is why [Dual-Region](/self-managed/concepts/multi-region/dual-region.md) has a failover runbook and this architecture does not.

The trade-off is failback cost. You must add a removed zone back when you bring the region back, and its brokers start empty.

### 5. Verify the degraded cluster

```bash
./verify-degraded-cluster.sh <lost-region-slot>
```

The cluster should report the surviving brokers, all partitions healthy, and processing continuing.

## Bring a region back

Failback is short by design. It has no secondary storage snapshot and restore step. The database holds a single copy of the exported data and replicates it itself. A returning region has nothing to catch up on at the Camunda level.

```bash
./failback.sh <recovered-region-slot>
```

<Failback role="img" title="./failback.sh redeploys Camunda in the region and re-exports its services. If the zone was not force-removed during failover, its brokers rejoin and catch up from the Raft log with no membership change. If it was removed, the script adds the zone back with POST /actuator/cluster/zones/<zone> and waits for COMPLETED while the brokers rebuild. Then run ./check-cluster-topology.sh. The --switch-writer option moves the writer back." />

The procedure does four things:

1. **Redeploys Camunda** in the recovered region: namespace, database secret, Helm values, and chart.
2. **Re-exports the region's services** to the ClusterSet, so brokers in other regions can resolve them again.
3. **Re-adds the zone** if you force-removed it during failover. If you left the zone in place, its brokers rejoin and catch up from the Raft log with no membership change at all.
4. **Reports the database state**, and stops if an unplanned recovery left the global topology incomplete.

Move the writer back to the recovered region if the other regions are further from the current writer:

```bash
./failback.sh <recovered-region-slot> --switch-writer
```

Leaving the writer where it is costs nothing but cross-region latency for the regions furthest from it.

:::note After an unplanned failover
An unplanned recovery can leave the promoted member detached from the global database. Restore a complete Aurora Global Database topology with the AWS recovery procedure before running `failback.sh`. The script refuses to continue while the global cluster has only one member.
:::

Confirm the topology when done:

```bash
./check-cluster-topology.sh
```

## Add a region

Adding a region to a running cluster is an online operation. The regions already running keep processing and are not restarted.

The new region's brokers start first. Then `activate-region.sh` adds its zone with `POST /actuator/cluster/zones/<zone>` and waits for the change to report `COMPLETED`. The engine places the zone's replicas and raises the replication factor in one change. It does not renumber any broker.

<AddZone role="img" title="Three stages of the same cluster. First, two zones, london and paris, hold two replicas each, for a replication factor of four. Second, the operator deploys the zurich brokers, adds the zone with POST /actuator/cluster/zones/zurich, and waits for COMPLETED. Third, three zones in a 2-2-1 layout at replication factor five, where losing a database zone leaves three of five replicas and processing continues." />

This section applies to a region slot that you provisioned but never ran. A zone that you removed during failover comes back through [Bring a region back](#bring-a-region-back) instead.

### 1. Provision the infrastructure

Raise `active_region_count` so the region's cluster, Transit Gateway attachments, and security group rules exist. Use the same variable file as the initial deployment:

```bash
cd ../terraform/clusters
terraform apply -var-file=terraform-cluster.tfvars -var active_region_count=3
```

### 2. Update the environment

Re-source the environment so `CAMUNDA_ACTIVE_REGIONS`, the cluster size, and the replication factor reflect the new count, and register a kubectl context for the new cluster:

```bash
cd ../../procedure
unset CAMUNDA_ACTIVE_REGIONS CAMUNDA_CLUSTER_SIZE CAMUNDA_REPLICATION_FACTOR
. ./export-terraform-outputs.sh
. ./export_environment_prerequisites.sh
./register-kubecontexts.sh
```

### 3. Activate the slot

```bash
./activate-region.sh <slot>
```

The procedure does the following:

1. Joins the new cluster to the ClusterSet.
1. Prepares its storage class, namespace, and database secret.
1. Renders the Helm values with the longer contact point and zone lists.
1. Installs only the new region.
1. Exports its services.
1. Adds the zone to the cluster.
1. Waits for the change to complete.

The regions already running keep their shorter contact point list, and they don't restart. The contact point list matters at bootstrap. Once a cluster forms, a newcomer only has to reach one member, and the rest learn about it by gossip. The running regions pick up the longer list on their next upgrade.

:::warning
`activate-region.sh` only adds the zone of a slot that was in `regions` when you bootstrapped the cluster. The reference implementation derives the partition count from that slot list, and the partition count can't change after bootstrap. List every region you may ever run in `regions` before the first deployment.
:::

The script rejects any slot outside the provisioned range, `0` to `CAMUNDA_REGION_SLOTS - 1`. Before you run it, apply the Terraform step above. Then re-source the environment and register the kubectl context, so `CAMUNDA_ACTIVE_REGIONS` and `CLUSTER_CONTEXTS` include the new slot.

## Upgrade the cluster

{/* TODO: multi-region upgrade paths are not tested yet. Document them once they are. */}

Upgrade **one region at a time**, and wait for the cluster to report healthy before starting the next:

```bash
./check-cluster-topology.sh
```

Upgrading several regions at the same time risks losing quorum.

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
