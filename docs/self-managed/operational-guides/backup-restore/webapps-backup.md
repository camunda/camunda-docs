---
id: webapps-backup
title: Backup Management API - Web Applications
description: "Backup API to perform a backup of web application (Operate and Tasklist) data."
sidebar_label: "Operate and Tasklist"
keywords: ["backup", "backups"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::warning breaking changes
As of the Camunda 8.8 release, the `/actuator` endpoints for backups have been moved to `/actuator/backupHistory`. The previous `/actuator/backups` endpoint is still active only if the applications are deployed standalone (each application is running in its own process).
:::

:::note
This page refers to the components Operate and Tasklist as "web applications".

Optimize is not backed up as part of this process. Optimize is a dedicated application with its own backup system. Please see the [documentation for Optimize](./optimize-backup.md) to perform a backup.
:::

## About this API

The Camunda web applications store their data over multiple indices in Elasticsearch. A backup of web application data includes several Elasticsearch snapshots containing sets of different indices. Each backup is identified by a `backupId`. For example, a backup with an ID of `123` may contain the following Elasticsearch snapshots:

```
camunda_webapps_123_8.8.0_part_1_of_6
camunda_webapps_123_8.8.0_part_2_of_6
camunda_webapps_123_8.8.0_part_3_of_6
camunda_webapps_123_8.8.0_part_4_of_6
camunda_webapps_123_8.8.0_part_5_of_6
camunda_webapps_123_8.8.0_part_6_of_6
```

All web applications provide the same API to perform a backup and manage backups (list, check state, delete). Restore a backup using the standard Elasticsearch API.

:::note
The backup API can be reached via the Actuator management port, which default defaults to port 9600.
:::

:::warning
Usage of this API requires the backup store to be configured with the **same** repository name.

- [Operate configuration](/self-managed/operate-deployment/operate-configuration.md#backups)
- [Tasklist configuration](/self-managed/tasklist-deployment/tasklist-configuration.md#backups)

Additionally, it requires the same backup store to be configured on your chosen datastore.

- [Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

Web applications must have the right to take snapshots.
:::

## Create backup API

During backup creation, web applications can continue running. To create the backup, call the following endpoint:

```
POST actuator/backupHistory
{
  "backupId": <backupId>
}
```

:::note
For backward compatibility, the endpoint `actuator/backups` is available if the component is running standalone.
:::

Response:

| Code             | Description                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK           | Backup was successfully started, snapshots will be created asynchronously. List of snapshots is returned in the response body (see example below). This list must be persisted together with the backup ID to be able to restore it later. |
| 400 Bad Request  | In case something is wrong with `backupId`, e.g. the same backup ID already exists.                                                                                                                                                        |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to create a snapshot.                                                                                                                                                    |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                                                                                                                               |

Example request:

```shell
curl --request POST 'http://localhost:9600/actuator/backupHistory' \
-H 'Content-Type: application/json' \
-d '{ "backupId": 123 }'
```

Example response:

```json
{
  "scheduledSnapshots": [
    "camunda_webapps_123_8.8.0_part_1_of_6",
    "camunda_webapps_123_8.8.0_part_2_of_6",
    "camunda_webapps_123_8.8.0_part_3_of_6",
    "camunda_webapps_123_8.8.0_part_4_of_6",
    "camunda_webapps_123_8.8.0_part_5_of_6",
    "camunda_webapps_123_8.8.0_part_6_of_6"
  ]
}
```

## Get backup state API

As a backup is created asynchronously, call the following endpoint to check the state of the backup:

```
GET actuator/backupHistory/{backupId}
```

:::note
For backward compatibility, the endpoint `actuator/backups` is available if the component is running standalone.
:::

Response:

| Code             | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| 200 OK           | Backup state could be determined and is returned in the response body.                  |
| 404 Not Found    | Backup with given ID does not exist.                                                    |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query. |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.            |

For example, the request could look like this:

```shell
curl 'http://localhost:9600/actuator/backupHistory/123'
```

Example response:

```json
{
  "backupId": 123,
  "state": "COMPLETED",
  "failureReason": null,
  "details":  [
    //here goes the list of all Elasticsearch snapshots included in the backup
    {
      "snapshotName": "camunda_webapps_123_8.8.0_part_1_of_6",
      "state": "SUCCESS",
      "startTime": "2023-01-01T10:10:10.100+0000",
      "failures": []
    },
    <..>
  ]
}
```

Possible **states** of the backup:

- `COMPLETED`: Backup can be used for restoring the data.
- `IN_PROGRESS`: Wait until the backup completes to use it for restore.
- `FAILED`: Something went wrong when creating this backup. To find out the exact problem, use the [Elasticsearch get snapshot status API](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-snapshot-status-api.html) for each of the snapshots included in the given backup.
- `INCOMPATIBLE`: Backup is incompatible with the current Elasticsearch version.
- `INCOMPLETE`: Backup is incomplete (e.g. when backup process was interrupted).

**State** of the individual snapshot is a copy of [Elasticsearch state](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/get-snapshot-api.html#get-snapshot-api-response-state).

## Get backups list API

To get the list of existing backups, the following endpoint can be used:

```
GET actuator/backupHistory
```

:::note
For backward compatibility, the endpoint `actuator/backups` is available if the component is running standalone.
:::

Response:

| Code             | Description                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup list could be determined and is returned in the response body. Can be an empty response in case no backups were created yet. |
| 404 Not Found    | Backup repository is not configured.                                                                                                |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query.                                             |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                        |

For example, the request could look like this:

```shell
curl 'http://localhost:9600/actuator/backupHistory'
```

Response will contain JSON with array of objects representing state of each backup (see [get backup state API endpoint](#get-backup-state-api)).

## Delete backup API

To delete all the Elasticsearch snapshots associated with the specific backup id, the following endpoint may be used:

```

DELETE actuator/backupHistory/123

```

:::note
For backward compatibility, the endpoint `actuator/backups` is available if the component is running standalone.
:::

Response:

| Code             | Description                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 204 No Content   | All commands to delete corresponding ELS snapshots were successfully sent to ELS. ELS will continue deletion asynchronously. |
| 404 Not Found    | Not a single snapshot corresponding to given ID exist.                                                                       |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query.                                      |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                 |
