---
id: operate-tasklist-backup
title: Backup and restore Operate and Tasklist data
description: "How to perform a backup and restore of Operate and Tasklist data."
keywords: ["backup", "backups"]
---

:::note
This API is subject to change.
:::

Operate stores its data over multiple indices in Elasticsearch. Backup of Operate data includes several
Elasticsearch snapshots containing sets of Operate indices. Each backup is identified by `backupId`. For example, a backup with an id of `backup1` may contain the following Elasticsearch snapshots:

```
camunda_operate_backup1_8.1.0_part_1_of_6
camunda_operate_backup1_8.1.0_part_2_of_6
camunda_operate_backup1_8.1.0_part_3_of_6
camunda_operate_backup1_8.1.0_part_4_of_6
camunda_operate_backup1_8.1.0_part_5_of_6
camunda_operate_backup1_8.1.0_part_6_of_6
```

Operate provides an API to perform a backup and check the state of the backup. Restore a backup using the standard Elasticsearch API.

### Prerequisites

Before you can use the backup and restore feature:

1. The Elasticsearch repository must be configured.
2. Operate and Tasklist must be configured with the repository name using the following configuration parameters:

```yaml
for Operate:
camunda.operate.backup.repositoryName=<repository name>

for Tasklist:
camunda.tasklist.backup.repositoryName=<repository name>
```

### Create backup API

During backup creation Operate can continue running. To create the backup, call the following endpoint:

```
POST actuator/backup
{
  "backupId": <backupId>
}
```

Response:

| Code             | Description                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK           | Backup was successfully started, snapshots will be created asynchronously. List of snapshots is returned in the response body (see example below). This list must be persisted together with the backup id to be able to restore it later. |
| 400 Bad Request  | In case something is wrong with `backupId`, e.g. the same backup id already exists.                                                                                                                                                        |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to create a snapshot.                                                                                                                                                    |

Example request:

```
curl --request POST 'http://localhost:8080/actuator/backup' \
-H 'Content-Type: application/json' \
-d '{ "backupId": "backup1" }'
```

Example response:

```json
{
  "scheduledSnapshots": [
    "camunda_operate_backup1_8.1.0-snapshot_part_1_of_6",
    "camunda_operate_backup1_8.1.0-snapshot_part_2_of_6",
    "camunda_operate_backup1_8.1.0-snapshot_part_3_of_6",
    "camunda_operate_backup1_8.1.0-snapshot_part_4_of_6",
    "camunda_operate_backup1_8.1.0-snapshot_part_5_of_6",
    "camunda_operate_backup1_8.1.0-snapshot_part_6_of_6"
  ]
}
```

### Check backup state API

As a backup is created asynchronously, call the following endpoint to check the state of the backup:

```
GET actuator/backup/{backupId}
```

Response:

| Code             | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup state could be determined and is returned in the response body, e.g.<br/> { "State": "COMPLETED" }. |
| 404 Not Found    | Backup with given id does not exist.                                                                       |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to execute the query.                    |

For example, the request could look like this:

```
curl 'http://localhost:8080/actuator/backup/backup1'
```

Possible states of the backup:

- `COMPLETED`: Backup can be used for restoring the data.
- `IN_PROGRESS`: Wait until the backup completes to use it for restore.
- `FAILED`: Something went wrong when creating this backup. To find out the exact problem, use the [Elasticsearch get snapshot status API](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-snapshot-status-api.html) for each of the snapshots included in the given backup.
- `INCOMPATIBLE`: Backup is incompatible with the current Elasticsearch version.
- `INCOMPLETE`: Backup is incomplete (e.g. when backup process was interrupted).

### Restore backup

There is no Operate API to preform the backup restore. Instead, use the [Elasticsearch restore snapshot API](https://www.elastic.co/guide/en/elasticsearch/reference/current/restore-snapshot-api.html).

:::note
Operate must **not** be running while a backup restore is taking place.
:::

To restore the backup with a known backup id, you must restore all the snapshots this backup contains (check the response of the [create backup API](#create-backup-api)).

Example of Elasticsearch query:

```
curl --request POST `http://localhost:9200/_snapshot/test/camunda_operate_backup1_8.1.0-snapshot_part_1_of_6/_restore?wait_for_completion=true`
```

To summarize, the process may look as follows:

1. Stop Operate.
2. Ensure there are no Operate indices present in Elasticsearch (otherwise the restore process will fail).
3. Iterate over all Elasticsearch snapshots included in the desired backup and restore them using the Elasticsearch restore snapshot API.
4. Start Operate.

## Backup and restore of Tasklist data

Backup and restore of Tasklist may be performed in exactly the same way as [Operate data](#).
