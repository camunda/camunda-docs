---
id: optimize-backup
title: Backup Management API - Optimize
description: "Backup API to perform a backup of Optimize data."
sidebar_label: "Optimize"
keywords: ["backup", "backups"]
---

Back up your Optimize data using the Backup Management API.

## About this API

Optimize is a dedicated application that stores its data over multiple indices in the database. To ensure data integrity across indices, a backup of Optimize data consists of two Elasticsearch/OpenSearch snapshots, each containing a different set of Optimize indices. Each backup is identified by a positive integer backup ID. For example, a backup with ID `123456` consists of the following snapshots:

```
camunda_optimize_123456_8.8.0_part_1_of_2
camunda_optimize_123456_8.8.0_part_2_of_2
```

Optimize provides an API to trigger a backup and retrieve information about a given backup's state. During backup creation Optimize can continue running. The backed up data can later be restored using the standard ElasticSearch/OpenSearch snapshot restore API.

:::warning
Usage of this API requires the backup store to be configured for the component.

- Optimize configuration
  - [Elasticsearch](/self-managed/components/optimize/configuration/system-configuration.md#elasticsearch-backup-settings)
  - [OpenSearch](/self-managed/components/optimize/configuration/system-configuration.md#opensearch-backup-settings)

Additionally, it requires the same backup store to be configured on your chosen datastore.

- [Elasticsearch snapshot repository](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/manage-snapshot-repositories)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)
  :::

## Create backup API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.
The configured context path does not apply to the management port.

The following endpoint can be used to trigger the backup process:

```
POST actuator/backups
{
  "backupId": <backupId>
}
```

### Response

| Code             | Description                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 202 Accepted     | Backup process was successfully initiated. To determine whether backup process was completed refer to the GET API.                         |
| 400 Bad Request  | Indicates issues with the request, for example when the `backupId` contains invalid characters.                                            |
| 409 Conflict     | Indicates that a backup with the same `backupId` already exists.                                                                           |
| 500 Server Error | All other errors, e.g. issues communicating with the database for snapshot creation. Refer to the returned error message for more details. |
| 502 Bad Gateway  | Optimize has encountered issues while trying to connect to the database.                                                                   |

### Example request

```shell
curl --request POST 'http://localhost:8092/actuator/backups' \
-H 'Content-Type: application/json' \
-d '{ "backupId": 123456 }'
```

### Example response

```json
{
  "message": "Backup creation for ID 123456 has been scheduled. Use the GET API to monitor completion of backup process"
}
```

## Get backup info API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.
The configured context path does not apply to the management port.

Information about a specific backup can be retrieved using the following request:

```
GET actuator/backups/{backupId}
```

Information about all existing Optimize backups can be retrieved by omitting the optional `backupId` parameter:

```
GET actuator/backups
```

### Response

| Code             | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK           | Backup state could be determined and is returned in the response body (see example below).                                                                               |
| 400 Bad Request  | There is an issue with the request, for example the repository name specified in the Optimize configuration does not exist. Refer to returned error message for details. |
| 404 Not Found    | If a backup ID was specified, no backup with that ID exists.                                                                                                             |
| 500 Server Error | All other errors, e.g. issues communicating with the database for snapshot state retrieval. Refer to the returned error message for more details.                        |
| 502 Bad Gateway  | Optimize has encountered issues while trying to connect to the database.                                                                                                 |

### Example request

```shell
curl --request GET 'http://localhost:8092/actuator/backups/123456'
```

### Example response

```json
  {
    "backupId": 123456,
    "failureReason": null,
    "state": "COMPLETE",
    “details”: [
      {
          "snapshotName": "camunda_optimize_123456_8.8.0_part_1_of_2",
          "state": "SUCCESS",
          "startTime": "2024-11-09T10:11:36.978+0100",
          "failures": []
      },
      {
          "snapshotName": "camunda_optimize_123456_8.8.0_part_2_of_2",
          "state": "SUCCESS",
          "startTime": "2024-11-09T10:11:37.178+0100",
          "failures": []
      }
    ]
  }
```

Note that the endpoint will return a single item when called with a `backupId` and a list of items when called without specifying a `backupId`.

Possible states of the backup:

- `COMPLETE`: The backup can be used for restoring data.
- `IN_PROGRESS`: The backup process for this backup ID is still in progress.
- `FAILED`: Something went wrong when creating this backup. To find out the exact problem, use the [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/get-snapshot-status-api.html)/[OpenSearch](https://opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/) get snapshot status API for each of the snapshots included in the given backup.
- `INCOMPATIBLE`: The backup is incompatible with the current ElasticSearch/OpenSearch version.
- `INCOMPLETE`: The backup is incomplete (this could occur when the backup process was interrupted or individual snapshots were deleted).

## Delete backup API

Note that the backup API can be reached via the `/actuator` management port, which by default is `8092`.
The configured context path does not apply to the management port.

An existing backup can be deleted using the below API which deletes all Optimize snapshots associated with the supplied backupID.

```
DELETE actuator/backups/{backupId}
```

### Response

| Code             | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 204 No Content   | The delete request for the associated snapshots was submitted to the database successfully.                                                                              |
| 400 Bad Request  | There is an issue with the request, for example the repository name specified in the Optimize configuration does not exist. Refer to returned error message for details. |
| 500 Server Error | An error occurred, for example the snapshot repository does not exist. Refer to the returned error message for details.                                                  |
| 502 Bad Gateway  | Optimize has encountered issues while trying to connect to ElasticSearch/OpenSearch.                                                                                     |

### Example request

```shell
curl --request DELETE 'http://localhost:8092/actuator/backups/123456'
```
