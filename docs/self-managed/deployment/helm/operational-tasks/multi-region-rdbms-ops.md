---
id: multi-region-rdbms-operational-procedure
sidebar_label: Multi-Region RDBMS operational procedure
title: Multi-Region RDBMS operational procedure
description: "Handle a region loss, bring a region back, and activate a declared zone in a Multi-Region RDBMS setup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RegionLoss from './img/multi-region-rdbms-region-loss.svg';

import MultiRegionRdbmsCopy from '../\_partials/\_multi-region-rdbms-copy.md'

This runbook covers the day-2 operations of a [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md) setup. It covers losing a region, bringing it back, and activating a zone that was declared but never deployed.

:::caution
Develop, test, and rehearse these procedures in a non-production environment before you need them. The commands below are examples from the [reference implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md). Adapt them to your environment.
:::

## What is different from dual-region

In a [dual-region](./dual-region-ops.md) setup, losing a region costs the Zeebe quorum. Processing stops, and the failover procedure exists to restore it. That procedure removes the lost brokers, disables the exporter to the lost region, and later restores secondary storage from a snapshot.

With three or more zones, none of that applies. Every partition keeps a majority of its replicas, so **Zeebe keeps processing** and no Zeebe action is required to restore service. The failover procedure mostly reports. Its only real work is the database writer, and only when the writer was in the lost region.

<RegionLoss role="img" title="Side-by-side timelines of the same zone loss. In a two-zone cluster, Zeebe loses quorum and processing stops until an operator force-removes the lost brokers and disables the exporter, and failback also requires a secondary storage snapshot and restore, for four operator steps in total. In a three-zone cluster, quorum holds and processing continues, there is nothing to force-remove, disable, or restore, and two operator steps remain: promoting the database writer if it was in the lost zone, and redeploying the zone." />

| Step                             | Dual-region                             | Multi-Region RDBMS                              |
| :------------------------------- | :-------------------------------------- | :---------------------------------------------- |
| Restore processing               | Force-remove the lost brokers           | Nothing, processing never stopped               |
| Secondary storage after failover | Disable the exporter to the lost region | Nothing, there is one exporter and one database |
| Promote the database             | n/a                                     | Only if the writer was in the lost region       |
| Failback                         | Snapshot and restore secondary storage  | Redeploy the region                             |

In step count, the [dual-region procedure](./dual-region-ops.md) takes 10 operator steps: two to fail over and eight to fail back. Here, a region loss takes at most five, most of them checks, and bringing the region back is one redeploy.

:::warning Use this runbook only for Multi-Region RDBMS
This runbook applies only to a zone-aware cluster with three or more zones and RDBMS secondary storage. Don't run the [dual-region procedure](./dual-region-ops.md) on it: force-removing brokers or restoring secondary storage from a snapshot is unnecessary here and can lose data. For a two-region cluster with Elasticsearch, use the dual-region procedure instead.
:::

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

Check the cluster is healthy before you start, so you can tell what the procedure changed:

```bash
./check-cluster-topology.sh
```

## Handle a region loss

### 1. Confirm the quorum is intact

Losing one zone removes the replicas that lived in it. With three or more zones and a layout where no zone holds half the replicas, the remaining ones still form a majority. Partitions elect new leaders where needed and keep processing. Under the default `2-2-1` that means three replicas of five after losing a database region, or four of five after losing the tie-breaker.

This only holds when every declared zone is deployed. With one zone declared but not yet active, `2-2-1` runs four replicas of five. Losing either database region leaves two, so processing stops until you deploy that zone or the lost one returns.

Check this rather than assuming it. The script takes one lost slot and computes the surviving replicas without it, so its verdict only covers a single lost zone. If more than one zone is affected, don't rely on it: check the partition health of every surviving broker with `./check-cluster-topology.sh`.

```bash
./failover.sh <lost-region-slot> --dry-run
```

With `--dry-run`, the script reports the quorum state, prints the current cluster view, and warns if the surviving zones no longer hold a majority. It changes nothing, so you can read the verdict before deciding to act.

### 2. Promote the database writer if needed

If the writer was in the lost region, promote a surviving member. The mode depends on whether the lost region is still reachable:

<Tabs groupId="failover-mode" defaultValue="planned" queryString values={[{label: 'Planned', value: 'planned' }, {label: 'Unplanned', value: 'unplanned' }]}>

<TabItem value="planned">

The region is still reachable, for example during a scheduled evacuation. A switchover completes replication before promoting, so **no data is lost** in the RDBMS. A switchover also takes considerably less time than an unplanned failover.

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

Camunda needs no reconfiguration and no restart, as long as the JDBC URL keeps resolving to the current writer. The reference implementation gets that from the [AWS Advanced JDBC Wrapper](/self-managed/concepts/databases/relational-db/configuration.md#usage-with-aws-aurora-postgresql). Its `failover` plugin follows the writer on established connections, and on brokers that start after the promotion. This is not general JDBC behavior. With your own database, whether connections re-resolve the writer depends on your driver and endpoint. Check it or plan a restart.

If the writer was not in the lost region, no database action is required.

#### Move the Raft leaders to the new writer region

Once the writer moves, the zone priorities still favor the region that hosted the old one. Partition leaders keep exporting across regions and pay the inter-region round trip on every flush. Move the leaders next to the new writer:

1. Raise the priority of the zone that now hosts the writer. See [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) for the priority property, and the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md) for applying it to a running cluster.
1. Wait until the change reports `COMPLETED`. The cluster rejects a new change while one is still in progress.
1. Check the replication lag. A rebalance only succeeds when the intended leader is not lagging behind the current one.
1. Run a [rebalance](/self-managed/components/orchestration-cluster/zeebe/operations/rebalancing.md). Priorities apply at the next election and don't move existing leaders on their own.

### 3. Route client traffic away from the lost region

Zeebe keeps processing, but the gateway in the lost region is unreachable. Update your DNS or load balancer to stop sending client traffic there. This is outside Camunda's control and specific to your traffic management setup.

### 4. Decide whether to remove the zone

Removing the lost zone from the partition distribution is **optional** whenever the surviving zones still hold a majority of each partition's replicas. It is usually not worth it for a zone you expect back.

What decides it is the replica count of the zone you lost, not the number of zones:

| Replicas held by the lost zone | After losing it                                              | Removing the zone                                                                |
| :----------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Fewer than half the total      | A majority of the replicas survives, so processing continues | **Optional**, and cheaper to skip.                                               |
| Half the total or more         | The survivors are not a majority, so processing stops        | **Required**. Removing the zone restores a quorum the survivors can reach alone. |

The default `2-2-1` across three zones always lands in the first row, whichever zone is lost. An asymmetric layout such as `4-1-1` lands in the second when its four-replica zone is the one lost. An evenly split two-zone cluster lands in the second whichever zone it loses. That is why [Dual-Region](/self-managed/concepts/multi-region/dual-region.md) has a failover runbook and this architecture does not.

The reason to leave a zone in place is failback cost. Brokers that stayed members rejoin and catch up from the Raft log. You have to add a removed zone back explicitly, and its brokers start from nothing.

If you do need to remove it, one atomic change evicts the zone's brokers. It also drops the zone from the persisted partition distribution, so quorum stops counting replicas that cannot answer:

```bash
./failover.sh <lost-region-slot> --drain-brokers
```

This issues `DELETE /actuator/cluster/zones/<zone>?force=true` against a surviving region. Without `force=true`, the API tries a graceful drain, which fails when the zone is down. Only do this for a zone that is down and unreachable, and for one zone at a time. See the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).

### 5. Verify the degraded cluster

```bash
./verify-degraded-cluster.sh <lost-region-slot>
```

The cluster should report the surviving brokers, all partitions healthy, and processing continuing.

## Bring a region back

Failback is short, and deliberately so. There is no secondary storage snapshot and restore step. The database holds a single copy of the exported data and replicates it itself. A returning region has nothing to catch up on at the Camunda level.

```bash
./failback.sh <recovered-region-slot>
```

The procedure does four things:

1. **Redeploys Camunda** in the recovered region: namespace, database secret, Helm values, and chart.
2. **Re-exports the region's services** to the ClusterSet, so brokers in other regions can resolve them again.
3. **Re-adds the zone** if it was force-removed during failover. If the zone was left in place, its brokers rejoin and catch up from the Raft log with no membership change at all.
4. **Reports the database state**, and stops if an unplanned recovery left the global topology incomplete.

To move the writer back to the recovered region, which is worth doing if the other regions are further from the current writer:

```bash
./failback.sh <recovered-region-slot> --switch-writer
```

Leaving the writer where it is costs nothing but cross-region latency for the regions furthest from it.

:::note After an unplanned failover
An unplanned recovery can leave the promoted member detached from the global database. Restore a complete Aurora Global Database topology with the AWS recovery procedure before running `failback.sh`. The script refuses to continue while the global cluster has only one member.
:::

Verify when done:

```bash
./check-cluster-topology.sh
```

## Activate a declared zone

Activating a zone that was declared in the zone list but never deployed is an **online** operation.

The distinction that makes it online is that the zone already exists as far as the cluster is concerned. It was in the zone list every region was deployed with. So the partition distribution already assigned it replicas, and every partition runs one replica short of its full count. Deploying the zone starts brokers that claim replicas already reserved for them. Nothing else changes:

- No broker is renumbered.
- No partition is redistributed.
- No running region is restarted.
- No cluster management API call is needed.

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
unset CAMUNDA_ACTIVE_REGIONS
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
1. Renders the Helm values with the longer contact point list.
1. Installs only the new region.
1. Exports its services.
1. Waits for the new brokers to join.

The regions already running keep their shorter contact point list and are not restarted. The contact point list matters at bootstrap. Once a cluster forms, a newcomer only has to reach one member, and the rest learn about it by gossip. The running regions pick up the longer list on their next upgrade.

:::warning
`activate-region.sh` fills a slot that already exists in the zone list. It does not add a new zone. Adding a zone that was never declared changes the zone list in every region and redistributes partitions. That is a migration rather than an online operation.
:::

The script refuses a slot that is not yet part of the deployed topology. Run the Terraform step above first. The script rejects any slot at or beyond `CAMUNDA_ACTIVE_REGIONS` and reports the valid range. It does not deploy into a zone the cluster does not expect.

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
