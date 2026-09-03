---
id: management-api
title: "Management API"
description: "The Zeebe Gateway also exposes an HTTP endpoint for cluster management operations."
---

As well as the [REST](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) and [gRPC API](/apis-tools/zeebe-api/grpc.md) for process instance execution, the Zeebe Gateway exposes an HTTP endpoint for cluster management operations.

## About this API

This API is not expected to be used by a typical user, but by a privileged user such as a cluster administrator.

It is exposed via a different port, and configured using configuration `management.server.port` (or via environment variable `MANAGEMENT_SERVER_PORT`). By default, this is set to `9600`.

The API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints).

:::info
For additional configurations such as security, refer to the official [Spring Boot documentation](https://spring.io/guides).
:::

### Operations

This API currently supports the following operations:

- [Rebalancing](/self-managed/components/orchestration-cluster/zeebe/operations/rebalancing.md)
- [Pause and resume exporting](#exporting-api)
- [Enable and disable exporter](#exporters-api)
- [Update partition distribution](#partition-distribution-api)
- [Force-remove, re-add, and migrate a zone](#zones-api)

## Exporting API

Use the Exporting API for the followings:

- As a debugging tool.
- When taking a backup of Camunda 8 (see [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md)).

:::warning
This endpoint always returns HTTP `200`. Check the `status` field in the response body to determine whether the operation succeeded: `204` indicates success and `500` indicates failure.

If the request fails, verify that all brokers are running and retry.
:::

The operation requires a complete cluster topology. If a broker is unavailable, the request fails entirely — no partitions are paused or resumed. Retry when all brokers are available.

**Success response:**

```json
{
  "body": null,
  "status": 204,
  "contentType": null
}
```

**Failure response:**

```json
{
  "body": {
    "message": "Expected 3 members of partition 1 but found 2, current topology: ..."
  },
  "status": 500,
  "contentType": null
}
```

### Pause exports

To pause exporting on all partitions, send the following request to the gateway's management endpoint.

```
POST actuator/exporting/pause
```

When all partitions pause exporting, the response contains `"status": 204`. If the request fails, some partitions may have paused exporting. Therefore, it is important to either retry until success or revert the partial pause by resuming exporting.

### Resume exports

After exporting is paused, it must eventually be resumed. Otherwise, the cluster could become unavailable. To resume exporting, send the following request to the gateway's management endpoint:

```
POST actuator/exporting/resume
```

When all partitions have resumed exporting, the response contains `"status": 204`. If the request fails, only some partitions may have resumed exporting. Therefore, it is important to retry until successful.

### Soft pause exports

The soft pause feature can be used when you want to continue exporting records, but don't want to delete those records (log compaction) from Zeebe. This is particularly useful during hot backups. Learn more about [using this feature for hot backups](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

```
POST actuator/exporting/pause?soft=true
```

When all partitions soft pause exporting, the response contains `"status": 204`. If the request fails, some partitions may have soft paused exporting. Therefore, either retry until success or revert the partial soft pause by resuming the export.

:::warning
Broker disk usage grows throughout the soft-pause window because log compaction is blocked. Keep the window as short as possible and resume exporting promptly once the backup completes.

Avoid restarting brokers while soft pause is active. After a restart, exporters resume from the last persisted position (before soft-pausing started) and re-export all records from the soft-pause window. Recovery time is proportional to how long soft pause was active.

For a real-world example of disk growth and recovery, see the [full-disk chaos day report](https://camunda.github.io/zeebe-chaos/2026/06/18/Full-disk-due-to-soft-pause-exporters).
:::

## Exporters API

The Exporters API allows for enabling, disabling or deleting configured exporters. By default, all configured exporters are enabled.

The enable and disable functionality is specifically useful for [dual region deployment](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) operations.

- **Enabled**: Records are exported to the exporter. The log is compacted only after the records are exported.
- **Disabled**: Records are _not_ exported to the exporter, and the log is compacted.

:::info
You can find the OpenAPI spec for this API in the [GitHub repository](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/exporter-api.yaml).
:::

:::note
The `camunda‐zeebe‐gateway` service on port 9600 exposes the exporter endpoints.
:::

### Enable an exporter

Enable a configured, disabled exporter:

```bash
POST actuator/exporters/{exporterId}/enable
```

When you enable the exporter, you can also optionally initialize it from another exporter using `initializeFrom`:

```bash
POST actuator/exporters/{exporterId}/enable
{
    initializeFrom: {anotherExporterId}
}
```

`initializeFrom` accepts an existing exporter's ID. Both the exporter you're enabling and the exporter you're initializing from must be the same [type](../exporters/exporters.md). For example, you can't use an Elasticsearch exporter's ID to initialize an OpenSearch exporter.

After you enable the exporter, new records will be exported to it.

### Disable an exporter

To disable an exporter, send the following request to the gateway's management API:

```
POST actuator/exporters/{exporterId}/disable
```

After disabling the exporter, no records will be exported to this exporter. Other exporters continue exporting.

Removing an exporter from the cluster configuration through Helm values only drops it from the static configuration. For example, disabling Optimize removes the Elasticsearch or OpenSearch exporter. The exporter is still declared in the dynamic cluster configuration, which prevents log compaction and increases disk usage. To fully deactivate it, explicitly disable it using the request above, and confirm that every broker reports the exporter as `DISABLED` (see [Monitor an exporter](#monitor-an-exporter)).

### Delete an exporter

To delete an exporter permanently from the system, first remove the configuration of the exporter from the application. Then send the following request to the gateway's management API:

```
DELETE actuator/exporters/{exporterId}
```

If the configuration is deleted, the exporter remains in the system but enters a blocked state. This prevents log compaction and thus increases the disk usage.

- To fully remove the exporter, it must be deleted using the Management API to ensure all references to it are removed.
- To re-add the exporter, restore its configuration in the application properties and restart the system.

Alternatively, if you no longer wish to use an exporter, you can disable it using the management API. The exporter can be re-enabled at any time without requiring a system restart.

### Monitor an exporter

All requests to change the state of the exporters are processed asynchronously. To monitor the status of the exporters, send the following request to the gateway's management API:

```
GET actuator/exporters/
```

The response is a JSON object that lists all configured exporters with their status:

```json
[
  {
    "exporterId": "elasticsearch0",
    "status": "ENABLED"
  },
  {
    "exporterId": "elasticsearch1",
    "status": "DISABLED"
  }
]
```

## Cluster API

You can find the OpenAPI spec for this API in the [GitHub repository](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml).

### Monitoring API

Use the Monitoring API to retrieve the current cluster topology and monitor ongoing scaling operations.

#### Request

```
GET actuator/cluster
```

#### Response

The response is a JSON object. See the [OpenAPI spec](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml) for details:

```
{
  "version": <version>,
  "brokers": [
    {
      "id": <brokerId>,
      "state": "ACTIVE",
      "version": <brokerVersion>,
      "lastUpdatedAt": "<timestamp>",
      "partitions": [
        {
          "id": <partitionId>,
          "state": "ACTIVE",
          "priority": <priority>
        }
      ]
    }
  ],
  "lastChange": {
    "id": <changeId>,
    "status": "COMPLETED",
    "startedAt": "<timestamp>",
    "completedAt": "<timestamp>"
  },
  "pendingChange": {
    "id": <changeId>,
    "status": "IN_PROGRESS",
    "completed": [],
    "pending": [
      {
        "operation": "BROKER_ADD",
        "brokerId": <brokerId>
      }
    ]
  },
  "partitionDistribution": {
    ...
  },
  "routingState": {
    ...
  }
}
```

- `version`: The version of the current cluster topology. The version is updated when the cluster is scaled up or down.
- `brokers`: A list of current brokers. Each broker includes its ID, state, version, last update timestamp, and partition distribution.
- `partitions`: A list of partitions assigned to a broker, including each partition's ID, state, and priority.
- `lastChange`: Details about the last completed scaling operation, including its ID, status, and start and completion timestamps.
- `pendingChange`: Details about the ongoing scaling operation, including completed and pending operations. Pending operations can include broker additions, partition joins, partition leaves, and partition priority reconfigurations.
- `partitionDistribution`: The cluster's partition distribution configuration.
- `routingState`: The current routing state of the cluster.

### Partition distribution API

Use this endpoint to update the [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) partition distribution configuration. Exactly one of `config` or `zonePriorities` must be set in the request body.

- Setting `config` persists a new partition distribution configuration and applies it immediately, computing the necessary partition join, leave, and priority-reconfiguration operations. When migrating a bare or partially zoned cluster to zone-aware, list zones in `config.zones` in the order they should receive the existing (bare) nodes: the first zone receives node `0`, the second node `1`, and so on, wrapping around by zone count. This order only matters for that one-time migration; once all zones are migrated, every other operation addresses zones by name.
- Setting `zonePriorities` reorders the zones' priorities on a fully zone-aware cluster. The existing priority values are reused and reassigned to a different zone based on the order of the zones in the request: the first zone gets the highest existing priority value, the second zone the next highest, and so on. No new priority values are introduced. This only updates the priorities; it does not itself move partition leaders — leaders move to the newly-preferred zone on the next election (for example, one triggered by a separate rebalance). The request must list exactly the currently configured zones, and is idempotent.

#### Request

```
PUT actuator/cluster/partition-distribution
```

<details>
  <summary>Example request: set partition distribution config</summary>

```
curl -X 'PUT' \
   'http://localhost:9600/actuator/cluster/partition-distribution' \
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
            },
            {
              "name": "zone-b",
              "numberOfReplicas": 1,
              "priority": 500
            }
          ]
        }
      }'
```

</details>

<details>
  <summary>Example request: reorder zone priorities</summary>

```
curl -X 'PUT' \
   'http://localhost:9600/actuator/cluster/partition-distribution' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "zonePriorities": ["zone-b", "zone-a"]
      }'
```

</details>

##### Dry run

You can do a dry run without executing the change by setting the `dryRun` request parameter to `true`. By default, `dryRun` is set to `false`.

#### Response

The response is a JSON object. See the [OpenAPI spec](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml) for details:

```
{
  "changeId": <changeId>,
  "currentTopology": [...],
  "plannedChanges": [...],
  "expectedTopology": [...]
}
```

- `changeId`: The ID of the changes initiated by this request. This can be used to monitor the progress of the operation.
- `currentTopology`: A list of current brokers and the partition distribution.
- `plannedChanges`: A sequence of operations that must be executed to reach the new configuration.
- `expectedTopology`: The expected list of brokers and the partition distribution once the change has completed.

### Zones API

Use this endpoint to force-remove a zone from a [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) cluster, to add back a previously force-removed zone, or to migrate a zone of a bare or partially zoned cluster to a zone-aware topology.

#### Force-remove a zone

:::caution
This is a dangerous operation and must be used with caution. Use it only when a zone is down and its brokers are unreachable.
:::

Force-evicts the given zone's brokers from the cluster and drops the zone from the persisted partition distribution configuration, in one atomic change.

##### Request

```
DELETE actuator/cluster/zones/{zoneId}
```

<details>
  <summary>Example request</summary>

```
curl -X 'DELETE' \
   'http://localhost:9600/actuator/cluster/zones/zone-b' \
   -H 'accept: application/json'
```

</details>

###### Dry run

You can do a dry run without executing the change by setting the `dryRun` request parameter to `true`. By default, `dryRun` is set to `false`.

##### Response

The response is a JSON object with the same shape as the [partition distribution response](#response).

#### Add back a previously force-removed zone

Re-adds the zone's brokers and re-includes the given zone in the persisted partition distribution configuration, with the supplied replica count and priority, in one atomic change.

##### Request

```
POST actuator/cluster/zones/{zoneId}
{
  "numberOfReplicas": <integer>,
  "priority": <integer>,
  "numberOfBrokers": <integer>,
  "brokers": [<brokerId1>, <brokerId2>, ...]
}
```

Name the zone's brokers either by count with `numberOfBrokers`, or one by one with
`brokers`. Exactly one of the two must be set; setting both, or neither, is rejected with
`400`.

`numberOfBrokers` is the number of brokers deployed in the zone, from which the broker IDs
`<zoneId>_0` through `<zoneId>_<numberOfBrokers - 1>` are derived. These are the IDs the
brokers of a zone-aware cluster assign themselves, so a zone whose brokers are numbered
from zero without gaps needs nothing else.

Use `brokers` when they are not: a zone that comes back with a subset of its brokers has
IDs that are not contiguous, and only the explicit list can express that.

<details>
  <summary>Example requests</summary>

```
curl -X 'POST' \
   'http://localhost:9600/actuator/cluster/zones/zone-b' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "numberOfReplicas": 2,
        "priority": 500,
        "numberOfBrokers": 3
      }'
```

The same request naming the brokers explicitly:

```
curl -X 'POST' \
   'http://localhost:9600/actuator/cluster/zones/zone-b' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "numberOfReplicas": 2,
        "priority": 500,
        "brokers": ["zone-b_0", "zone-b_1", "zone-b_2"]
      }'
```

Note that the IDs in `brokers` must be zone-aware, meaning they contain the zone in the name.

</details>

###### Dry run

You can do a dry run without executing the change by setting the `dryRun` request parameter to `true`. By default, `dryRun` is set to `false`.

##### Response

The response is a JSON object with the same shape as the [partition distribution response](#response).

#### Migrate a zone to a zone-aware topology

Migrates one zone of a bare or partially zoned cluster to a zone-aware topology. The request contains only the zone name. Before migrating a zone, update the persisted partition distribution with [`PUT /cluster/partition-distribution`](#partition-distribution-api), using a zone-aware partition distribution.

:::note
For dual-region clusters, migrate the secondary zone first (odd-numbered nodes), then migrate the primary zone.
:::

The zone must already exist in the persisted partition-distribution configuration. When all configured zones have been migrated, the cluster becomes fully zoned and subsequent operations address zones by name.

##### Request

```
PUT actuator/cluster/zones
{
  "zone": <string>
}
```

<details>
  <summary>Example request</summary>

```
curl -X 'PUT' \
   'http://localhost:9600/actuator/cluster/zones' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "zone": "zone-b"
      }'
```

</details>

###### Dry run

You can do a dry run without executing the change by setting the `dryRun` request parameter to `true`. By default, `dryRun` is set to `false`.

##### Response

The response is a JSON object with the same shape as the [partition distribution response](#response).
