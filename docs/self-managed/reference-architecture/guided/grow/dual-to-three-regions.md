---
id: dual-to-three-regions
title: "Grow to three regions"
sidebar_label: "Two regions to three"
description: "Add a third AWS region to a running two-region Camunda 8 deployment on Amazon ECS by adding a zone, so that losing one region doesn't stop processing."
---

You can add a third region to a running two-region deployment by adding a third zone, the same way you added the second. This page covers only what differs from [growing to two regions](./single-to-dual-region.md).

## Know what the third region changes

With two zones, losing a region leaves half of the replicas, and processing stops until you remove the failed zone. With three zones in a layout where no zone holds half of the replicas, the cluster keeps processing when one region fails.

| Zones | Layout (replicas) | Replication factor | After losing one zone                                 |
| ----- | ----------------- | ------------------ | ----------------------------------------------------- |
| Two   | `3-3`             | 6                  | Three of six replicas: processing stops               |
| Three | `3-3-1`           | 7                  | Four of seven replicas at worst: processing continues |

The rule is that no single zone holds half of the replicas or more. A zone with one replica carries a vote without carrying a full copy, which suits a small third region. A layout of two, two, and one replicas, with a replication factor of five, follows the same rule. See [grow a multi-region RDBMS cluster](/self-managed/concepts/multi-region/multi-region-rdbms-growth.md) for the placement concepts.

Adding the zone doesn't renumber the brokers that run, and it doesn't change the partition count.

## Plan the changes

| Part                       | Change                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Network                    | A third VPC with a CIDR block that doesn't overlap the other two.                                     |
| Interconnect               | Replace the peering connection with an AWS Transit Gateway. A full mesh of peerings doesn't scale.    |
| Object storage             | A lease bucket for the third zone, in the third region.                                               |
| Secondary storage          | Optional. Add a secondary cluster in the third region, or leave the region without a database member. |
| Compute, exposure, Camunda | The stages run again in the third region, with `zone = "zone-c"`.                                     |
| First and second regions   | The CIDR block of the third region, the full zone list, and the contact points.                       |

## Add the third region

1. Create the network of the third region with the network stage, with a new VPC or with [an existing VPC](../network.md#choose-the-vpc-source). Use a separate state key, for example `STATE_KEY_PREFIX=region-c/`.
1. Connect the three networks with a transit gateway in each region, one peering attachment for each pair of regions, and routes to the other two CIDR blocks in every private route table. The [dual-region reference](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md#networking-mode) describes the transit gateway option and its cost. Neither peering nor a transit gateway encrypts traffic at the network stage.
1. Forward the service discovery domain of each region to the other two with Route 53 Resolver rules, as the interconnect root does for two regions.
1. Pass the CIDR blocks of the other two regions as `additional_cidr_blocks` to the compute stages of all three regions, and to the storage stage of the region that holds the database writer.
1. Apply the object storage stage in the third region with `zones = ["zone-c"]`. Never reuse a lease bucket of another zone.
1. Apply the exposure stage in the third region with `enable_raft_nlb = true`.
1. Decide whether the third region gets a database member:
   - Without a member, the region carries a Zeebe vote and no database. The Camunda stage of the third region uses the global writer endpoint of the global database.
   - With a member, add another secondary cluster with the `aurora-global-member` module in the third region, and add its cluster resource ID to the database connect policy, so that tasks can connect to it after a failover.
1. Apply the Camunda stage of the third region:

   | Setting                  | Value                                                                                        |
   | ------------------------ | -------------------------------------------------------------------------------------------- |
   | `zone`                   | `zone-c`                                                                                     |
   | `zones`                  | All three zones, with the layout that you chose                                              |
   | `initial_contact_points` | Its own Service Connect name, then the internal load balancer names of the other two regions |
   | Basic authentication     | The `admin_user_password` and `connectors_user_password` of the first region                 |

   The brokers of the third region join the cluster and host no partitions yet.

1. Add the zone from a broker of an existing region:

   ```bash
   ./procedure/add-zone.sh --region eu-west-1 --ecs-cluster camunda-demo-cluster \
     --prefix camunda-demo-oc --zone zone-c --brokers 1 --replicas 1 --priority 100 --dry-run
   ```

   Run the same command without `--dry-run` to apply it, and wait until the change reports `COMPLETED`. Set the priorities so that the order of the zones matches where you want the leaders: the highest priority first.

1. Apply the Camunda stages of the first and second regions with the full zone list and the contact points of the third region. The brokers restart one at a time.
1. Verify the cluster. `GET /actuator/cluster` lists the brokers of all three zones as active, and `GET /v2/topology` shows replicas of every partition in the zones that hold replicas.

## Use the stages' inputs for the third region

| Stage          | Variable                  | Value                                                                    |
| -------------- | ------------------------- | ------------------------------------------------------------------------ |
| Compute        | `additional_cidr_blocks`  | The CIDR blocks of the other two regions                                 |
| Object storage | `zones`                   | `["zone-c"]`                                                             |
| Exposure       | `enable_raft_nlb`         | `true`                                                                   |
| Camunda        | `zone`, `zones`           | `zone-c`, and all three zones                                            |
| Camunda        | `initial_contact_points`  | Own name, then the internal load balancer names of the other two regions |
| Camunda        | `cross_region_membership` | `true`                                                                   |

## Troubleshoot the third region

### zone must be one of the names in zones.

The third region's Camunda stage has a `zone` that isn't in `zones`. Add `zone-c` to the list of every region, and set `zone = "zone-c"` in the third region.

### The two VPCs must not use the same CIDR block.

Two of your networks overlap. Peering and transit gateway routes need distinct CIDR blocks. Use a different `cidr` for the third region's network stage.

### Each region needs at least two private subnets for the resolver endpoints.

A region has fewer than two private subnets, which the Route 53 Resolver endpoints need. Pass at least three private subnets in distinct availability zones to the network stage.

### Processing stops after one region fails

The layout holds half of the replicas or more in the failed zone. Check the replicas of each zone. With the `3-3-1` layout, losing either of the two large zones leaves four of seven replicas, which is a quorum.

## Next steps

- [Operate dual-region on Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region-ops.md)
- [Multi-region resilience](/self-managed/concepts/multi-region/resilience-tiers.md)
