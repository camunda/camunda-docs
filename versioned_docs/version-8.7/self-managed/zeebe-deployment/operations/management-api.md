---
id: management-api
title: "Management API"
description: "The Zeebe Gateway also exposes an HTTP endpoint for cluster management operations."
---

Besides the [REST](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) and [gRPC API](/apis-tools/zeebe-api/grpc.md) for process instance execution, the Zeebe Gateway also exposes an HTTP endpoint for cluster management operations. This API is not expected to be used by a typical user, but by a privileged user such as a cluster administrator. It is exposed via a different port and configured using configuration `management.server.port` (or via environment variable `MANAGEMENT_SERVER_PORT`). By default, this is set to `9600`.

The API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints). For additional configurations such as security, refer to the Spring Boot documentation.

The following operations are currently available:

- [Rebalancing](/self-managed/zeebe-deployment/operations/rebalancing.md)
- [Pause and resume exporting](#exporting-api)
- [Enable and disable exporter](#exporters-api)

## Exporting API

Exporting API is used:

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
The enable and disable functionality is specifically useful for [dual region deployment](/self-managed/operational-guides/multi-region/dual-region-ops.md) operations.

When **enabled**, records are exported to the exporter. The log is compacted only after the records are exported. When **disabled**, records are _not_ exported to the exporter, and the log will be compacted.

The OpenAPI spec for this API can be found [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/exporter-api.yaml).

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

### Delete an exporter

:::note
Starting from version 8.7.12, this API is available. In earlier versions, removing an exporter from the configuration will result in its deletion.
:::

To delete an exporter permanently from the system, first remove the configuration of the exporter from the application. Then send the following request to the gateway's management API:

```
DELETE actuator/exporters/{exporterId}
```

If the configuration is deleted, the exporter remains in the system but enters a blocked state. This prevents log compaction and thus increases the disk usage. To fully remove the exporter, it must be deleted using the management API, which ensures that no references to the exporter persist. If you wish to re-add the exporter, restore its configuration in the application properties and restart the system.

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
