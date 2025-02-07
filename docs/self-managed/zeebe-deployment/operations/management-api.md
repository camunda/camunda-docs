---
id: management-api
title: "Management API"
description: "The Zeebe Gateway also exposes an HTTP endpoint for cluster management operations."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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

<Tabs groupId="exporting" defaultValue="pause" queryString values={[{label: 'Pause exporting', value: 'pause' },{label: 'Resume exporting', value: 'resume' },{label: 'Soft pause exporting', value: 'softPause' }]} >

<TabItem value="pause">

To pause exporting on all partitions, send the following request to the gateway's management endpoint.

```
POST actuator/exporting/pause
```

When all partitions pause exporting, a successful response is received. If the request fails, some partitions may have paused exporting. Therefore, it is important to either retry until success or revert the partial pause by resuming exporting.

</TabItem>

<TabItem value="resume">

After exporting is paused, it must eventually be resumed. Otherwise, the cluster could become unavailable. To resume exporting, send the following request to the gateway's management endpoint:

```
POST actuator/exporting/resume
```

When all partitions have resumed exporting, a successful response is received. If the request fails, only some partitions may have resumed exporting. Therefore, it is important to retry until successful.

</TabItem>

<TabItem value="softPause">

The soft pause feature can be used when you want to continue exporting records, but don't want to delete those records (log compaction) from Zeebe. This is particularly useful during hot backups. Learn more about [using this feature for hot backups](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

```
POST actuator/exporting/pause?soft=true
```

When all partitions soft pause exporting, a successful response is received. If the request fails, some partitions may have soft paused exporting. Therefore, either retry until success or revert the partial soft pause by resuming the export.

</TabItem>
</Tabs>

## Exporters API

The Exporters API is used for [dual region deployment](/self-managed/operational-guides/multi-region/dual-region-ops.md) operations, and allows for enabling and disabling configured exporters. By default, all configured exporters are enabled.

When **enabled**, records are exported to the exporter. The log is compacted only after the records are exported. When **disabled**, records are _not_ exported to the exporter, and the log will be compacted.

The OpenAPI spec for this API can be found [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/exporter-api.yaml).

<Tabs groupId="exporters" defaultValue="enable" queryString values={[{label: 'Enable an exporter', value: 'enable' },{label: 'Disable an exporter', value: 'disable' }, {label: 'Monitor', value: 'monitor'}]} >

<TabItem value="enable">

When enabling an exporter, the exporter must be already configured in the cluster. To initialize an exporter's state, an existing exporter's ID can be provided in the optional `initializeFrom` field. Both exporters must be of the same type.

To enable a previously disabled exporter, send the following request to the gateway's management API:

```
POST actuator/exporters/{exporterId}/enable
{
    initializeFrom: {anotherExporterId}
}
```

New records written after the exporter is enabled will be exported to this exporter.

</TabItem>

<TabItem value="disable">

To disable an exporter, send the following request to the gateway's management API:

```
POST actuator/exporters/{exporterId}/disable
```

After disabling the exporter, no records will be exported to this exporter. Other exporters continue exporting.

</TabItem>

<TabItem value="monitor">

Both enable and disable requests are processed asynchronously. To monitor the status of the exporters, send the following request to the gateway's management API:

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

</TabItem>

</Tabs>
