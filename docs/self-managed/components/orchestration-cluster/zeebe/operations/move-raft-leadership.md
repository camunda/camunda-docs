---
id: move-raft-leadership
title: "Move Raft leadership between zones"
description: "Change zone priorities and rebalance a multi-region Zeebe cluster to move Raft partition leadership between zones."
---

You can move Raft partition leadership from one zone to another by reordering zone priorities and then rebalancing the cluster.

This procedure changes only the priorities used for leader election. It doesn't change the partition distribution or move replicas between zones.

Use this procedure to:

- Perform a planned zone switchover.
- Restore the preferred leadership placement after a zone failover.
- Follow the sun by moving leadership to the preferred active region.

## Align leadership with secondary storage

Raft leadership placement is especially important when the RDBMS secondary storage writer (for example, Amazon Aurora) and Raft leaders are in different regions. Cross-region communication with the secondary storage writer adds network round-trip latency. After the RDBMS secondary storage writer moves to another region, use this procedure to move Raft leadership to the same region when possible.

The placement of Elasticsearch or OpenSearch secondary storage has less impact on this decision. In a multi-region setup, records are exported to secondary storage in both regions concurrently, so exporting has less dependency on cross-region network round-trip latency. Consider the location of the RDBMS secondary storage writer first when choosing the preferred leader zone.

## Prerequisites

Before moving leadership, confirm the following conditions:

- The cluster is fully [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md).
- All brokers and partitions are healthy.
- The target zone's replicas are caught up with the current leaders.
- You can access the Zeebe Gateway [Management API](management-api.md) on its management port. The default port is `9600`.
- You have identified a low-load maintenance window. Rebalancing can cause temporary unavailability while partition leaders are re-elected.

The management port is typically not publicly exposed. Its access and TLS configuration are separate from the v2 REST API. If the gateway isn't reachable from the machine where you run these commands, use a private connection such as `kubectl port-forward svc/camunda-zeebe-gateway 9600:9600`, then use `localhost` for `{zeebe-gateway}`. For Amazon ECS deployments, use AWS Systems Manager port forwarding through ECS Exec, an SSH tunnel through a bastion host, or another private network path to reach port `9600`. You can also execute the commands from a broker task or pod that can reach the gateway. The examples use `http://` for a management endpoint without TLS. If your management endpoint uses TLS, use `https://` and the appropriate `curl` TLS options.

## Check the current zone priorities

Use the Management API to retrieve the current cluster topology and partition distribution:

```bash
curl \
  'http://{zeebe-gateway}:9600/actuator/cluster' \
  -H 'accept: application/json' \
  | jq '.partitionDistribution.zones[] | {name, priority}'
```

The command returns each configured zone's name and priority. If `partitionDistribution.zones` is missing or empty, the cluster isn't zone-aware and can't use this procedure. If `jq` isn't installed, omit the pipe to `jq` and manually inspect `partitionDistribution.zones` in the JSON response. You can also inspect `brokers[].partitions[]` in the full response to see the priority assigned to each partition replica.

A higher priority makes a replica the preferred leader during an election. The zone with the highest configured priority is therefore the preferred zone for Raft partition leaders. Recording the current order also ensures that you preserve the relative priorities of any zones you aren't swapping.

## Reorder the zone priorities

The [Partition distribution API](management-api.md#partition-distribution-api) accepts a `zonePriorities` list. The first zone in the list receives the highest existing priority, the second zone receives the next highest priority, and so on.

The request must list exactly the currently configured zones. If the list doesn't exactly match the currently configured zones, the request is rejected. The operation is idempotent. To exchange the priorities of two zones, reverse their positions and leave the other zones in their current order.

For example, if `zone-a` currently has the highest priority and `zone-b` has the next highest priority, use the following request to make `zone-b` the preferred leader zone:

```bash
curl -X PUT \
  'http://{zeebe-gateway}:9600/actuator/cluster/partition-distribution?dryRun=true' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "zonePriorities": ["zone-b", "zone-a"]
  }'
```

Review the `plannedChanges` and `expectedTopology` fields in the dry-run response. When the result matches the intended priority order, submit the same request without the `dryRun` parameter:

```bash
curl -X PUT \
  'http://{zeebe-gateway}:9600/actuator/cluster/partition-distribution' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "zonePriorities": ["zone-b", "zone-a"]
  }'
```

The priority change is asynchronous. Use the `changeId` from the response to poll that change every five seconds:

```bash
while true; do
  curl -s 'http://{zeebe-gateway}:9600/actuator/cluster/changes/{changeId}'
  echo
  sleep 5
done
```

Wait until `status` is `COMPLETED` before rebalancing. `GET /actuator/cluster` can also report a pending change for a cluster with only the default Physical Tenant, but use `GET /actuator/cluster/changes/{changeId}` for clusters with multiple Physical Tenants.

## Rebalance the cluster

Changing zone priorities doesn't trigger a leader election. After the priority change completes, [manually rebalance the cluster](rebalancing.md#manual-rebalancing) to move partition leadership to the newly preferred zone.

Before rebalancing, review the guide's [limitations](rebalancing.md#limitations), [impact](rebalancing.md#rebalancing-impact), and [readiness checks](rebalancing.md#when-to-rebalance). During rebalancing, partitions can be temporarily unavailable while new leaders are elected.

After rebalancing completes, use `GET /actuator/cluster` and your cluster metrics to verify that the expected brokers in the target zone lead the partitions.

You can also use the Orchestration Cluster REST API [`GET /v2/topology`](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx) endpoint to check the partition leaders. This endpoint uses the v2 API rather than the Management API and requires different access permissions. Ensure your credentials are authorized for the v2 API before using it.
