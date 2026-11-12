---
id: single-to-dual-region
title: "Grow to two regions"
sidebar_label: "One region to two"
description: "Add a second AWS region to a running single-region Camunda 8 deployment on Amazon ECS by adding a zone, without rebuilding the first region."
---

You can grow a single-region Camunda 8 deployment on Amazon ECS into two regions in place, by adding a zone to the running Orchestration Cluster. This page covers only what changes. It doesn't rebuild the first region.

## How the growth works

The single-region deployment already runs [zone-aware brokers](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): one zone with three brokers named `zone-a_0` to `zone-a_2`. Growing adds a second zone with its own brokers, through the management API. The brokers that already run keep their names and aren't restarted by the engine.

<!-- Editable source: ../img/single-to-dual-region.excalidraw -->

![Two AWS regions side by side. Region A, the existing one, holds the Orchestration Cluster with zone-a and three brokers, an internal load balancer for broker traffic on port 26502, and the primary Aurora cluster that is the writer of the global database. Region B, the new one, holds the Orchestration Cluster with zone-b and three brokers, an internal load balancer, and the secondary Aurora cluster as a read replica. A link labeled VPC peering connects the two internal load balancers, and an arrow labeled Replication points from the primary to the secondary Aurora cluster. A legend explains that the link has no request direction and the arrow shows replication direction.](.../img/single-to-dual-region.svg)

Two choices in the first region make this possible. First, the brokers are zone-aware from the start: adding a zone to a cluster that runs numbered brokers requires a separate, irreversible [migration](/self-managed/deployment/helm/operational-tasks/zone-aware-migration.md), which the guided deployment avoids. Second, each zone has its own node ID lease bucket, so the new zone's leases don't touch the first zone's.

## Prerequisites

| Prerequisite                                                                        | Why                                                                                                                               |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| The guided single-region deployment, with the default of one zone and three brokers | A zone is added to a running cluster, which numbered brokers don't support without migrating first.                               |
| `enable_raft_nlb = true` and `enable_raft_listener = true` from the start           | The second region's brokers join through the internal load balancer. The variables default to `false`, and the examples set them. |
| An Aurora instance class that supports global databases                             | Aurora Global Databases don't support `db.t3` or `db.t4g`. Resize in step 1.                                                      |
| A second VPC with a CIDR block that doesn't overlap the first                       | Peering requires non-overlapping address ranges.                                                                                  |
| Service quotas in the second region                                                 | The second region creates a VPC, NAT gateways, an Aurora cluster, load balancers, and an ECS cluster.                             |

You can increase the number of brokers later. You can't reduce the number of brokers without losing data.

## Know what changes in the first region

| Stage in region A                 | Change                                                                                     | Effect                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Secondary storage                 | A larger instance class, the global cluster identifier, and the second region's CIDR block | The resize is in place. Search is unavailable for a few minutes during it.                   |
| Compute                           | The second region's CIDR block                                                             | Security group rules are added. Nothing restarts.                                            |
| Exposure                          | Internal load balancer, if you didn't start with it                                        | A load balancer is added. Nothing restarts.                                                  |
| Camunda                           | The global database endpoint, then the full zone list                                      | The brokers restart twice, one at a time. Each environment change creates a task definition. |
| Network, object storage, identity | None                                                                                       | None.                                                                                        |

## Grow the deployment

### 1. Make the database global-capable

Set `db_instance_class` of the secondary storage stage to an r-class instance, such as `db.r6g.large`, and apply.

The resize is in place and takes about 8 minutes. Search in Camunda is unavailable for about four minutes while the single instance restarts. Zeebe keeps accepting writes and recovers on its own.

### 2. Create the network of the second region

Run the network stage in the second region, with a new VPC or with [an existing VPC](../network.md#choose-the-vpc-source). Use a separate state key for the second region, for example with `STATE_KEY_PREFIX=region-b/`.

### 3. Connect the two networks

Apply the `interconnect` root. It adds a VPC peering connection, routes in the private route tables of both VPCs, and Route 53 Resolver rules that forward each region's service discovery domain to the other. It doesn't change the VPCs themselves.

Use a transit gateway instead of peering when you connect three or more regions. The [dual-region reference](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md#networking-mode) has an implementation. Neither option encrypts traffic at the network stage.

### 4. Open the ports in the first region

Pass the second region's CIDR block as `additional_cidr_blocks` to the compute and secondary storage stages of the first region, and apply. This only adds security group rules.

### 5. Prepare the first region for the other brokers

If you started from the examples, the internal load balancer and the Raft listener already exist. Skip to step 6.

Otherwise, apply the exposure stage with `enable_raft_nlb = true`, then the Camunda stage with `enable_raft_listener = true`. Registering a load balancer on an existing ECS service can make Terraform replace the `orchestration-cluster` service, which takes the cluster down while it's recreated. Read the plan before you apply, and enable both settings from the start to avoid it.

### 6. Create the global database

1. Apply the `global-database` root with the outputs of the secondary storage stage. It creates the global cluster from your existing cluster. The existing cluster isn't replaced, and Camunda keeps running.
1. The same root creates the secondary cluster in the second region. This takes about nine minutes, and Camunda keeps running.
1. Set `global_cluster_identifier` on the secondary storage stage to the output of the `global-database` root, and apply. Without it, a plan shows the attribute going back to `null`, which would detach the cluster from the global database.

### 7. Point the first region at the global endpoint

Apply the Camunda stage of the first region with the outputs of the `global-database` root as its `secondary_storage` and `rds_db_connect_policy_arn`. Camunda restarts and connects through the global writer endpoint.

The connection URL uses the AWS JDBC wrapper with the `initialConnection`, `iam`, and `failover` plugins, because IAM authentication through a global endpoint requires them. The policy names both clusters, because after a failover the writer is the other cluster.

### 8. Deploy the stages in the second region

Run the compute, object storage, exposure, identity, and Camunda stages in the second region. Don't run the secondary storage stage: the database is the global one.

Set these values in the Camunda stage of the second region:

| Setting                                           | Value                                                                             | Why                                                                                                                                        |
| ------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `zone`                                            | `zone-b`                                                                          | The name of the new zone.                                                                                                                  |
| `zones`                                           | Both zones, with three brokers and three replicas each                            | A broker looks its zone up in this list at startup and fails if it's missing.                                                              |
| `initial_contact_points`                          | Its own Service Connect name, then the first region's internal load balancer name | Brokers join the cluster through the load balancer across the peering link.                                                                |
| `admin_user_password`, `connectors_user_password` | The values of the first region, from the outputs of its Camunda stage             | With Basic authentication, the users exist in the cluster, not in each region. A different password makes Connectors fail to authenticate. |
| The lease bucket                                  | A new bucket for `zone-b`                                                         | Never share a lease bucket between zones.                                                                                                  |

The brokers of the second region start and join the cluster. They host no partitions yet.

### 9. Add the zone

Validate the change with a dry run first:

```bash
./procedure/add-zone.sh --region eu-west-1 --ecs-cluster camunda-demo-cluster \
  --prefix camunda-demo-oc --zone zone-b --brokers 3 --replicas 3 --priority 500 --dry-run
```

Then run the same command without `--dry-run` to apply it. The script stops if the new brokers aren't listed by the cluster yet. Wait for them to join, or pass `--force` if they run but aren't listed. It opens a tunnel to a broker of the first region through ECS Exec and calls [Add or re-add a zone](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#add-or-re-add-a-zone). It waits until the change reports `COMPLETED`.

The replication factor becomes the sum of the zones' replicas. With three brokers and three replicas in each zone, that's six, and each region holds a full copy of every partition. The partition count doesn't change. To raise it, see [partition scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#2c-scaling-only-partitions).

Choose the layout before you run the command. With three plus three replicas, losing a region leaves three of six replicas, and processing stops until you remove the failed zone. That's the dual-region trade-off. To survive the loss of a region, use three zones. See [grow a multi-region RDBMS cluster](/self-managed/concepts/multi-region/multi-region-rdbms-growth.md) for the layouts.

### 10. Update the first region's configuration

Apply the Camunda stage of the first region with the full zone list, the cross-region membership timeouts, and the async replication monitoring. The brokers restart one at a time. This makes a broker that starts later see the same configuration as the other zone.

### 11. Verify the deployment

1. Call `GET /actuator/cluster` through the tunnel. Both zones must be present, with brokers `zone-a_0` to `zone-a_2` and `zone-b_0` to `zone-b_2` active.
1. Call `GET /v2/topology`. Every partition must have replicas in both zones.
1. Start a process instance through the load balancer of each region.
1. Check that the exporter lag of the async replication monitoring stays low.

## Back out

1. Remove the zone: `DELETE /actuator/cluster/zones/zone-b`. The zone drains gracefully when its brokers are healthy.
1. Wait for the change to complete.
1. Destroy the stages of the second region in reverse order, then the interconnect.

The global database isn't reversible in place. You can detach the secondary cluster, but turning the global cluster back into a standalone cluster isn't covered here.

## Next steps

- [Dual-region setup on Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md)
- [Operate dual-region on Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region-ops.md)
- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md)
