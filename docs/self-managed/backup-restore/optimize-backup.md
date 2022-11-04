---
id: optimize-backup
title: Backup and restore Optimize data
description: "How to perform a backup of Optimize data and restore the backup."
keywords: ["backup", "backups"]
---

:::note
This API is subject to change.
:::

Optimize stores its data over multiple indices in Elasticsearch. To ensure data integrity across indices, a backup of Optimize data consists of two Elasticsearch snapshots, each containing a different set of Optimize indices. Each backup is identified by a backup ID. For example, a backup with id `backup1` consists of the following Elasticsearch snapshots:

```
camunda_optimize_backup1_3.9.0_part_1_of_2
camunda_optimize_backup1_3.9.0_part_2_of_2
```

Optimize provides an API to trigger a backup and retrieve information about a given backup's state. During backup creation Optimize can continue running. The backed up data can later be restored using the standard Elasticsearch snapshot restore API.

## Prerequisites

The following prerequisites must be set up before using the backup API:

1. A snapshot repository of your choice must be registered with Elasticsearch.
2. The repository name must be specified using the `CAMUNDA_OPTIMIZE_BACKUP_REPOSITORY_NAME` environment variable or by adding it to your Optimize configuration:

```yaml
backup:
  repositoryName: <repository name>
```

## Create backup API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.  
The following endpoint can be used to trigger the backup process:

```
POST actuator/backup
{
  "backupId": <backupId>
}
```

### Response

| Code             | Description                                                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK           | Backup was successfully started. List of snapshot names is returned in response body (see example below). We recommend storing this information to be able to refer to it later when, for example, checking the backup state or restoring specific snapshots. |
| 400 Bad Request  | Indicates issues with the request, for example when the `backupId` contains invalid characters.                                                                                                                                                               |
| 409 Conflict     | Indicates that a backup with the same `backupId` already exists.                                                                                                                                                                                              |
| 500 Server Error | All other errors, e.g. issues communicating with Elasticsearch for snapshot creation. Refer to the returned error message for more details.                                                                                                                   |

### Example request

```
curl --request POST 'http://localhost:8092/actuator/backup' \
-H 'Content-Type: application/json' \
-d '{ "backupId": "backup1" }'
```

### Example response

```json
{
  "scheduledSnapshots": [
    "camunda_optimize_backup1_3.9.0_part_1_of_2",
    "camunda_optimize_backup1_3.9.0_part_2_of_2"
  ]
}
```

## Check backup state API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.  
As the backup is created asynchronously, the current state of the backup can be checked by calling the following endpoint:

```
GET actuator/backup/{backupId}
```

### Response

| Code             | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK           | Backup state could be determined and is returned in the response body (see example below)                                                                                |
| 400 Bad Request  | There is an issue with the request, for example the repository name specified in the Optimize configuration does not exist. Refer to returned error message for details. |
| 404 Not Found    | Backup with given id does not exist.                                                                                                                                     |
| 500 Server Error | All other errors, e.g. issues communicating with Elasticsearch for snapshot state retrieval. Refer to the returned error message for more details.                       |

### Example request

```
curl ---request GET 'http://localhost:8092/actuator/backup/backup1'
```

### Example response

```json
{
  "State": "COMPLETED"
}
```

Possible states of the backup:

- `COMPLETED`: The backup can be used for restoring data.
- `IN_PROGRESS`: The backup process for this backup ID is still in progress.
- `FAILED`: Something went wrong when creating this backup. To find out the exact problem, use the [Elasticsearch get snapshot status API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/get-snapshot-status-api.html) for each of the snapshots included in the given backup.
- `INCOMPATIBLE`: The backup is incompatible with the current Elasticsearch version.
- `INCOMPLETE`: The backup is incomplete (this could occur when the backup process was interrupted or individual snapshots were deleted).

## Delete backup API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.  
An existing backup can be deleted using the below API which deletes all Optimize snapshots associated with the supplied backupID.

```
DELETE actuator/backup/{backupId}
```

### Response

| Code             | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 204 No Content   | The delete request for the associated snapshots was submitted to Elasticsearch successfully.                                                                             |
| 400 Bad Request  | There is an issue with the request, for example the repository name specified in the Optimize configuration does not exist. Refer to returned error message for details. |
| 500 Server Error | An error occurred, for example the snapshot repository does not exist. Refer to the returned error message for details.                                                  |

### Example request

```
curl ---request DELETE 'http://localhost:8092/actuator/backup/backup1'
```

## Restore backup

There is no Optimize API to perform the backup restore. Instead, the standard [Elasticsearch restore snapshot API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/restore-snapshot-api.html) can be used. Note that the Optimize versions of your backup snapshots must match the currently running version of Optimize. You can identify the version at which the backup was taken by the version tag included in respective snapshot names; for example, a snapshot with the name`camunda_optimize_backup1_3.9.0_part_1_of_2` was taken of Optimize version `3.9.0`.

:::note
Optimize must NOT be running while a backup is being restored.
:::

To restore an existing backup, all the snapshots this backup contains (as listed in the response of the [create backup API request](#example-response)) must be restored using the Elasticsearch API.

To restore a given backup, the following steps must be performed:

1. Stop Optimize.
2. Ensure no Optimize indices are present in Elasticsearch (or the restore process will fail).
3. Iterate over all Elasticsearch snapshots included in the desired backup and restore them using the Elasticsearch restore snapshot API.
4. Start Optimize.

Example Elasticsearch request:

```
curl --request POST `http://localhost:9200/_snapshot/repository_name/camunda_optimize_backup1_3.9.0_part_1_of_2/_restore?wait_for_completion=true`
```
