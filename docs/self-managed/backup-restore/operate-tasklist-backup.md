---
id: operate-tasklist-backup
title: Backup & restore Operate and Tasklist data
description: "How to perform backup of Operate and Tasklist data and restore."
keywords: ["backup", "backups"]
---

:::note
This API is subject to change.
:::

Operate stores its data over multiple indices in Elasticsearch. Backup of Operate data includes several
Elasticsearch snapshots containing sets of Operate indices. Each backup is identified by `backupId`. E.g.
backup with id `backup1` may contain following Elasticsearch snapshots:

```
camunda_operate_backup1_8.1.0_part_1_of_6
camunda_operate_backup1_8.1.0_part_2_of_6
camunda_operate_backup1_8.1.0_part_3_of_6
camunda_operate_backup1_8.1.0_part_4_of_6
camunda_operate_backup1_8.1.0_part_5_of_6
camunda_operate_backup1_8.1.0_part_6_of_6
```

Operate provides a simple API to perform a backup and check the state of the backup. Restoring of backup can be performed
using the standard Elasticsearch API.

### Prerequisites

Before you can use the backup and restore feature:

1. Elasticsearch repository must be configured.
2. Operate and Tasklist must be configured with the repository name by using the following configuration parameters:

```yaml
for Operate:
camunda.operate.backup.repositoryName=<repository name>

for Tasklist:
camunda.tasklist.backup.repositoryName=<repository name>
```

### Create backup API

During backup creation Operate can continue running. To create the backup, the following endpoint can be called:

```
POST actuator/backup
{
  "backupId": <backupId>
}
```

Response:

| Code             | Description                                                                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup was successfully started, snapshots will be created asynchronously. List of snapshots is returned in response body (see example below). This list must be persisted together with the backup id to be able to restore it later. |
| 400 Bad Request  | In case smth is wrong with `backupId`, e.g. the same backup id already exists.                                                                                                                                                         |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting to create a snapshot.                                                                                                                                                |

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

As backup is created asynchronously, you can check the state of the backup by calling the following endpoint:

```
GET actuator/backup/{backupId}
```

Response:

| Code             | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup state could be determined and is returned in the response body, e.g.<br/> { "State": "COMPLETED" }. |
| 404 Not Found    | Backup with given id does not exist.                                                                       |
| 500 Server Error | All other errors, e.g. ES returned error response when attempting the execute the query.                   |

e.g. the request could look like this:

```
curl 'http://localhost:8080/actuator/backup/backup1'
```

Possible states of the backup:

- `COMPLETED`: backup can be used for restoring the data
- `IN_PROGRESS`: one should wait till it completes in order to use it for restore
- `FAILED`: something went wrong when creating this backup. To find our the exact problem, one can use [Elasticsearch Get snapshot status API](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-snapshot-status-api.html) for each of the snapshots included in given backup.
- `INCOMPATIBLE`: backup is incompatible with current Elasticsearch version
- `INCOMPLETE`: backup is incomplete (e.g. when backup process was interrupted)

### Restore backup

There is no Operate API to preform the backup restore, instead standard [Elasticsearch Restore snapshot API](https://www.elastic.co/guide/en/elasticsearch/reference/current/restore-snapshot-api.html) can be used.

:::note
Operate must NOT be running, while backup restore is taking place.
:::

To restore the backup with known backup id, you must restore all the snapshots this backup contains (check the response of [Create backup API](#create-backup-api)).

Example of Elasticsearch query:

```
curl --request POST `http://localhost:9200/_snapshot/test/camunda_operate_backup1_8.1.0-snapshot_part_1_of_6/_restore?wait_for_completion=true`
```

The whole process could look like:

1. Stop Operate.
2. Make sure there are no Operate indices present in Elastic (otherwise restore process will fail).
3. Iterate over all Elastic snapshots included in desired backup and restore them using Elasticsearch Restore snapshot API.
4. Start Operate.

## Backup and restore of Tasklist data

Backup and restore of Tasklist may be performed in exactly the same way as [for Operate data](#).
