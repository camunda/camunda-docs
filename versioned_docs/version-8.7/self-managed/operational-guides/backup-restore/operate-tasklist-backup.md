---
id: operate-tasklist-backup
title: Backup Management API - Operate / Tasklist
description: "Backup API to perform a backup of Operate and Tasklist data."
keywords: ["backup", "backups"]
---

Operate stores its data over multiple indices in Elasticsearch. Backup of Operate data includes several
Elasticsearch snapshots containing sets of Operate indices. Each backup is identified by `backupId`. For example, a backup with an ID of `123` may contain the following Elasticsearch snapshots:

```
camunda_operate_123_8.1.0_part_1_of_6
camunda_operate_123_8.1.0_part_2_of_6
camunda_operate_123_8.1.0_part_3_of_6
camunda_operate_123_8.1.0_part_4_of_6
camunda_operate_123_8.1.0_part_5_of_6
camunda_operate_123_8.1.0_part_6_of_6
```

Operate provides an API to perform a backup and manage backups (list, check state, delete). Restore a backup using the standard Elasticsearch API.

:::note
The backup API can be reached via the Actuator management port (defaults to 9600). The port may be reconfigured with the help of `management.server.port` configuration parameter.
:::

:::warning
Usage of this API requires the backup store to be configured for the component.

- [Operate configuration](/self-managed/operate-deployment/operate-configuration.md#backups)
- [Tasklist configuration](/self-managed/tasklist-deployment/tasklist-configuration.md#backups)

Additionally, it requires the same backup store to be configured on your chosen datastore.

- [Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)
  :::

## Create backup API

During backup creation Operate can continue running. To create the backup, call the following endpoint:

```
POST actuator/backups
{
  "backupId": <backupId>
}
```

Response:

| Code             | Description                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK           | Backup was successfully started, snapshots will be created asynchronously. List of snapshots is returned in the response body (see example below). This list must be persisted together with the backup ID to be able to restore it later. |
| 400 Bad Request  | In case something is wrong with `backupId`, e.g. the same backup ID already exists.                                                                                                                                                        |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to create a snapshot.                                                                                                                                                    |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                                                                                                                               |

Example request:

```shell
curl --request POST 'http://localhost:9600/actuator/backups' \
-H 'Content-Type: application/json' \
-d '{ "backupId": 123 }'
```

Example response:

```json
{
  "scheduledSnapshots": [
    "camunda_operate_123_8.2.0_part_1_of_6",
    "camunda_operate_123_8.2.0_part_2_of_6",
    "camunda_operate_123_8.2.0_part_3_of_6",
    "camunda_operate_123_8.2.0_part_4_of_6",
    "camunda_operate_123_8.2.0_part_5_of_6",
    "camunda_operate_123_8.2.0_part_6_of_6"
  ]
}
```

## Get backup state API

As a backup is created asynchronously, call the following endpoint to check the state of the backup:

```
GET actuator/backups/{backupId}
```

Response:

| Code             | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| 200 OK           | Backup state could be determined and is returned in the response body.                  |
| 404 Not Found    | Backup with given ID does not exist.                                                    |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query. |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.            |

For example, the request could look like this:

```shell
curl 'http://localhost:9600/actuator/backups/123'
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
      "snapshotName": "camunda_operate_123_8.2.0_part_1_of_6",
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
GET actuator/backups
```

Response:

| Code             | Description                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup list could be determined and is returned in the response body. Can be an empty response in case no backups were created yet. |
| 404 Not Found    | Backup repository is not configured.                                                                                                |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query.                                             |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                        |

For example, the request could look like this:

```shell
curl 'http://localhost:9600/actuator/backups'
```

Response will contain JSON with array of objects representing state of each backup (see [get backup state API endpoint](#get-backup-state-api)).

## Delete backup API

To delete all the Elasticsearch snapshots associated with the specific backup id, the following endpoint may be used:

```

DELETE actuator/backups/123

```

Response:

| Code             | Description                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 204 No Content   | All commands to delete corresponding ELS snapshots were successfully sent to ELS. ELS will continue deletion asynchronously. |
| 404 Not Found    | Not a single snapshot corresponding to given ID exist.                                                                       |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query.                                      |
| 502 Bad Gateway  | Elasticsearch is not accessible, the request can be retried when it is back.                                                 |
