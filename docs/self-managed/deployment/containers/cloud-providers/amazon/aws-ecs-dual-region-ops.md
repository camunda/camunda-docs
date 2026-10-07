---
id: aws-ecs-dual-region-ops
title: "Dual-region operational procedure (ECS Fargate)"
sidebar_label: "Dual-region operational procedure (ECS Fargate)"
description: "Fail over from a lost region and fail back to both regions in the Camunda 8 dual-region reference architecture on AWS ECS Fargate."
---

This procedure removes a lost region from a [dual-region ECS Fargate deployment](./aws-ecs-dual-region.md) and adds it back once it recovers. It uses the [`failover.sh`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-dual-region-fargate/procedure/failover.sh) and [`failback.sh`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-dual-region-fargate/procedure/failback.sh) scripts from the reference repository. Failover is manual. No automated, health-check-driven failover is included.

## Zones API operations the scripts run

The Zeebe cluster is [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md), with one zone per AWS region, so the scripts restore [quorum after a region loss](/self-managed/concepts/multi-region/dual-region.md#region-failure-and-recovery) by removing and re-adding a whole zone through the [Zones API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#zones-api):

| Script        | Request                                              |
| ------------- | ---------------------------------------------------- |
| `failover.sh` | `DELETE /actuator/cluster/zones/{zoneId}?force=true` |
| `failback.sh` | `POST /actuator/cluster/zones/{zoneId}`              |

## Prerequisites

- A deployment created with the [dual-region ECS Fargate guide](./aws-ecs-dual-region.md).
- `jq` and the `session-manager-plugin` installed (see [Tooling](./aws-ecs-dual-region.md#tooling)). The scripts reach the management API through a [Session Manager port-forward](./aws-ecs-dual-region.md#method-b--session-manager-port-forward), which ECS Exec already supports in this reference architecture.
- The environment variables the scripts read from the Terraform outputs. Export them from `aws/containers/ecs-dual-region-fargate`:

  ```bash
  source ./procedure/export_environment_prerequisites.sh
  ```

  Set `AWS_PROFILE` if you don't use the default credential chain.

Both scripts take `--failed-region 0|1` to name the region being failed away from and restored. The default is `0`.

## Fail over to the surviving region

Run `failover.sh` against the region you lost:

```bash
./procedure/failover.sh --failed-region 0
```

The script:

1. Checks that the surviving region's gateway answers on `/v2/topology`, and prints the topology before the change.
1. Scales every ECS service in the failed region to zero tasks, then waits 30 seconds for its brokers to drop out of cluster membership.
1. Sends `DELETE /actuator/cluster/zones/<failed-region>?force=true` through the tunnel and waits for the change to complete.
1. If the Aurora writer is in the failed region, runs a planned switchover to the surviving region and returns only after the global cluster reports the switchover complete. See [Recover when the Aurora writer's region is lost](#recover-when-the-aurora-writers-region-is-lost) if that region's Aurora cluster is gone too.
1. Confirms the zone is gone from the partition distribution and that every partition has a leader.

After a successful failover, the cluster runs on the four brokers of the surviving region, with `clusterSize` 4 and `replicationFactor` 2.

| Option          | Effect                                                                                                                                                                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--dry-run`     | Sends the zone request with `dryRun=true` and prints the planned operations. ECS, the cluster, and Aurora aren't changed.                                                                                                                                                                                |
| `--keep-tasks`  | Skips the ECS scale-down and makes no AWS calls to the failed region, so the zone is removed directly through the Camunda management API. Use it when the failed region's tasks are already down or its AWS API doesn't respond. The surviving region's ECS and Systems Manager APIs must still respond. |
| `--keep-writer` | Skips the Aurora writer switchover. Use it when the failed region's Aurora cluster is gone.                                                                                                                                                                                                              |

`failover.sh` [forces the zone removal](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#remove-a-zone), so run it only when the failed region's brokers are stopped or can't reach the rest of the cluster, which `--keep-tasks` doesn't ensure.

## Recover when the Aurora writer's region is lost

A planned switchover needs the failed region's Aurora cluster to still be available. If the region is gone, its Aurora cluster included, run `failover.sh` with `--keep-writer`:

```bash
./procedure/failover.sh --failed-region 0 --keep-tasks --keep-writer
```

The script removes the zone, leaves the writer where it is, and finishes. Camunda keeps processing in the surviving region, and exporting to secondary storage waits until a writer is available again.

Without `--keep-writer`, `failover.sh` still removes the zone, then stops with one of these errors instead of switching the writer:

```text
[<time>] ERROR: The Aurora writer in <failed-region> is <status>, so a planned switchover cannot run.
[<time>] ERROR: The planned switchover to <surviving-region> did not complete.
```

The second one appears when AWS still reports the old writer as available early in an outage, then rejects the switchover or doesn't finish it.

In both cases, promote the surviving region's Aurora cluster with the [Aurora Global Database unplanned recovery procedure](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover). The scripts don't automate it, because it can lose data that hasn't replicated yet:

1. List the global cluster members and copy the ARN of the surviving region's cluster:

   ```bash
   aws rds describe-global-clusters \
     --global-cluster-identifier "${AURORA_GLOBAL_CLUSTER_ID}" \
     --query "GlobalClusters[0].GlobalClusterMembers[*].{Cluster:DBClusterArn,Writer:IsWriter}" \
     --output table
   ```

1. Promote that cluster with `aws rds failover-global-cluster`. Run the command in the surviving region and pass `--allow-data-loss`. Without the flag, Aurora runs a switchover, which needs a healthy writer and fails when the writer's region is lost.

   ```bash
   aws rds failover-global-cluster \
     --region <surviving-region> \
     --global-cluster-identifier "${AURORA_GLOBAL_CLUSTER_ID}" \
     --target-db-cluster-identifier <surviving-cluster-arn> \
     --allow-data-loss
   ```

1. Run the command from the first step again and confirm that the surviving cluster shows `Writer` as `True`.

The Orchestration Cluster connects through the global writer endpoint, and the AWS JDBC Wrapper `failover` plugin reconnects to the new writer once the promotion completes. As described in [Secondary storage replication lag](./aws-ecs-dual-region.md#secondary-storage-replication-lag), the promoted cluster may be missing records that hadn't replicated yet. Zeebe replays that gap from its log.

## Fail back to both regions

When the lost region is available again, restore it:

1. If you failed over with `--keep-tasks`, scale the failed region's ECS services to zero once its AWS API responds again. `failback.sh` scales them back up in a later step.

   ```bash
   # Use REGION_1 and CLUSTER_1 if region 1 failed
   FAILED_REGION="${REGION_0}"
   FAILED_CLUSTER="${CLUSTER_0}"

   for service in $(aws ecs list-services --region "${FAILED_REGION}" --cluster "${FAILED_CLUSTER}" --query 'serviceArns[]' --output text); do
     aws ecs update-service --region "${FAILED_REGION}" --cluster "${FAILED_CLUSTER}" \
       --service "${service}" --desired-count 0 --no-cli-pager > /dev/null
   done
   ```

1. Run `failback.sh` against the recovered region:

   ```bash
   # Restore region 0 and re-add its zone
   ./procedure/failback.sh --failed-region 0

   # Also switch the Aurora writer back to region 0
   ./procedure/failback.sh --failed-region 0 --switch-writer
   ```

The script:

1. Prints the topology before the change.
1. Makes sure the recovered region's Aurora cluster is a member of the Aurora Global Database. If an unplanned recovery left it detached but intact, the script reattaches it. If the cluster was destroyed, recreate it with `terraform apply` in `terraform/infra` and run the script again.
1. Scales the recovered region's ECS services back up, to four orchestration cluster tasks and one Connectors task.
1. Waits for the recovered brokers to rejoin cluster membership.
1. Sends `POST /actuator/cluster/zones/<recovered-region>` with `numberOfReplicas`, `priority`, and `numberOfBrokers`, then waits for the partition redistribution to complete.
1. Verifies the expected broker count, that every partition has a leader, and that none of the recovered brokers is idle.
1. With `--switch-writer`, moves the Aurora writer back to the recovered region with a planned switchover.

| Option            | Default                                 | Effect                                                                                                                    |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--switch-writer` | Off                                     | Moves the Aurora writer back to the recovered region after the zone is restored.                                          |
| `--dry-run`       | Off                                     | Sends the zone request with `dryRun=true` and prints the planned operations. ECS, the cluster, and Aurora aren't changed. |
| `--replicas N`    | `2`                                     | `numberOfReplicas` for the zone. Matches `replication_factor / 2` in `terraform/app/locals.tf`.                           |
| `--brokers N`     | `4`                                     | `numberOfBrokers` for the zone. Also sets the task count of the orchestration cluster service.                            |
| `--priority N`    | `1000` for region 0, `500` for region 1 | Zone `priority`. Matches `CAMUNDA_CLUSTER_PARTITIONING_ZONEAWARE_ZONES_*_PRIORITY` in `terraform/app/locals.tf`.          |

Keep the defaults unless you changed the cluster sizing in `terraform/app/locals.tf`.

After a successful failback, the topology summary that `failback.sh` prints shows eight brokers, eight partitions, 32 partition replicas, and a leader for every partition. Confirm the deployment is healthy in both regions:

```bash
./procedure/verify_dual_region.sh
```
