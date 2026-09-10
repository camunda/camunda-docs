---
id: add-remove-zone
title: "Add or remove a zone"
description: "Grow or shrink a zone-aware cluster by adding or gracefully removing a zone."
---

This guide walks through adding a new zone to a running [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) cluster, and gracefully removing an existing, healthy zone.

The cluster must already be zone-aware before following this guide. If your cluster is still bare or only partially zoned, first migrate it using [`PUT /cluster/partition-distribution`](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partition-distribution-api) and [`PUT /cluster/zones`](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#migrate-a-zone-to-a-zone-aware-topology).

:::note
If a zone is down and its brokers are unreachable, do not follow the [Remove a healthy zone](#remove-a-healthy-zone) steps below. Use [Remove a down or unreachable zone](#remove-a-down-or-unreachable-zone) instead — a separate, dangerous operation meant for that failure scenario.
:::

The management port is typically not publicly exposed. If the gateway isn't reachable from the machine where you run these commands, use a private connection such as `kubectl port-forward svc/camunda-zeebe-gateway 9600:9600`, then use `localhost` for `{zeebe-gateway}` in the examples below. The examples use `http://` for a management endpoint without TLS; if yours uses TLS, use `https://` and the appropriate `curl` TLS options.

## Add a zone

### 1. Start brokers in the new zone

Deploy the new zone's brokers (for example, a new Helm StatefulSet) using zone-aware broker IDs of the form `{zone}_{n}` (see the [broker ID naming scheme](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#broker-id-naming-scheme)). Point them at the existing cluster's contact points and set `cluster.size` to the new total broker count across all zones.

At this point, the new brokers join the cluster's gossip-based membership only. They are not yet part of the persisted partition distribution, so they hold no partitions and join no Raft groups.

### 2. Add the zone

Call the Zones API to register the new zone and its brokers, and to update the partition distribution:

```
POST actuator/cluster/zones/{zoneId}
{
  "numberOfReplicas": <integer>,
  "priority": <integer>,
  "brokers": [<brokerId1>, <brokerId2>, ...]
}
```

<details>
  <summary>Example request</summary>

```
curl -X 'POST' \
   'http://{zeebe-gateway}:9600/actuator/cluster/zones/zone-c' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "numberOfReplicas": 2,
        "priority": 500,
        "brokers": ["zone-c_0", "zone-c_1", "zone-c_2"]
      }'
```

</details>

This single request atomically adds the given brokers as members of the persisted partition distribution and schedules the partition-join operations that make them replicate the assigned partitions. Only once a partition-join operation is applied for a broker does it join that partition's Raft group.

You can do a dry run without executing the change by setting the `dryRun` request parameter to `true`. See the full [Zones API reference](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#zones-api) for response details.

### 3. Monitor progress

The change is asynchronous. Use the `changeId` from the `addZone` response to poll it:

```bash
while true; do
  curl -s 'http://{zeebe-gateway}:9600/actuator/cluster/changes/{changeId}'
  echo
  sleep 5
done
```

Wait until `status` is `COMPLETED`.

:::note
`GET /actuator/cluster` also reports a pending change, but only for the default [Physical Tenant](/self-managed/concepts/physical-tenants/index.md). On a cluster with multiple Physical Tenants, always poll `GET /actuator/cluster/changes/{changeId}` instead.
:::

### 4. Verify

Confirm the new zone's brokers now host partitions:

```bash
curl -s 'http://{zeebe-gateway}:9600/actuator/cluster' | jq '.partitionDistribution.zones[] | {name, priority}'
```

Check `partitionDistribution` and `brokers` in the full `GET actuator/cluster` response, or query `/v2/topology`.

## Remove a healthy zone

Removing a healthy zone drains its partitions to the remaining zones before shutting down its brokers.

### 1. Update the partition distribution to drop the zone

```
PUT actuator/cluster/partition-distribution
{
  "config": {
    "type": "ZONE_AWARE",
    "zones": [
      ...zones to keep, omitting the one being removed...
    ]
  }
}
```

<details>
  <summary>Example request</summary>

```
curl -X 'PUT' \
   'http://{zeebe-gateway}:9600/actuator/cluster/partition-distribution' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "config": {
          "type": "ZONE_AWARE",
          "zones": [
            {
              "name": "zone-a",
              "numberOfReplicas": 2,
              "priority": 1000
            }
          ]
        }
      }'
```

</details>

This computes and applies the partition leave and priority-reconfiguration operations needed to move replicas and leaders off the removed zone's brokers. See the [partition distribution API reference](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partition-distribution-api) for details.

### 2. Monitor progress

Use the `changeId` from the response to poll the change every five seconds:

```bash
while true; do
  curl -s 'http://{zeebe-gateway}:9600/actuator/cluster/changes/{changeId}'
  echo
  sleep 5
done
```

Wait until `status` is `COMPLETED`, then confirm through `partitionDistribution`/`brokers` that the zone's brokers no longer host any partitions.

### 3. Scale down the zone's brokers

Remove the zone's brokers from cluster membership using the [Reconfiguration or Scale API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#scale-down), then shut down the zone's brokers (for example, scale its StatefulSet to zero replicas).

:::note
This removal procedure is also referenced by dual-region and other failover runbooks when a zone needs to be permanently dropped from a cluster after a planned reconfiguration.
:::

## Remove a down or unreachable zone

:::note
Only use this procedure when the zone is down and its brokers are unreachable. It force-evicts the zone's brokers from cluster membership and drops the zone from the persisted configuration in a single step, without draining partitions or handing off leadership.
:::

Call the Zones API to force-remove the zone:

```
DELETE actuator/cluster/zones/{zoneId}
```

<details>
  <summary>Example request</summary>

```
curl -X 'DELETE' \
   'http://{zeebe-gateway}:9600/actuator/cluster/zones/zone-c' \
   -H 'accept: application/json'
```

</details>

Because the zone is already down, there are no partitions to drain. This single request atomically removes the zone's brokers from cluster membership and drops the zone from the persisted partition distribution. See [force-remove a zone](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#force-remove-a-zone) for the full API reference.
