---
id: zeebe-backup-and-restore
title: "Backup Management API - Zeebe"
description: "Backup API to create a backup of a running Zeebe cluster comprised of a consistent snapshot of all partitions."
keywords: ["backup", "backups"]
---

A backup of a Zeebe cluster is comprised of a consistent snapshot of all partitions. The backup is taken asynchronously in the background while Zeebe is processing. Thus, the backups can be taken with minimal impact on typical processing. The backups can be used to restore a cluster in case of failures that lead to full data loss or data corruption.

Zeebe provides a REST API to create backups, query, and manage existing backups.
The backup management API is a custom endpoint `backups`, available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.7.x/reference/htmlsingle/#actuator.endpoints). This is accessible via the management port of the gateway. The API documentation is also available as [OpenApi specification](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/backup-management-api.yaml).

:::warning
Usage of this API requires the backup store to be configured for the component.

- [Zeebe configuration](/self-managed/zeebe-deployment/configuration/broker.md#zeebebrokerdatabackup)
  :::

## Create backup API

The following request can be used to start a backup.

### Request

```
POST actuator/backups
{
  "backupId": <backupId>
}
```

A `backupId` is an integer and must be greater than the ID of previous backups that are completed, failed, or deleted.
Zeebe does not take two backups with the same ids. If a backup fails, a new `backupId` must be provided to trigger a new backup.
The `backupId` cannot be reused, even if the backup corresponding to the backup ID is deleted.

<details>
  <summary>Example request</summary>

```shell
curl --request POST 'http://localhost:9600/actuator/backups' \
-H 'Content-Type: application/json' \
-d '{ "backupId": "100" }'
```

</details>

### Response

| Code             | Description                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 202 Accepted     | A Backup has been successfully scheduled. To determine if the backup process was completed, refer to the GET API.        |
| 400 Bad Request  | Indicates issues with the request, for example when the `backupId` is not valid or backup is not enabled on the cluster. |
| 409 Conflict     | Indicates a backup with the same `backupId` or a higher ID already exists.                                               |
| 500 Server Error | All other errors. Refer to the returned error message for more details.                                                  |
| 502 Bad Gateway  | Zeebe has encountered issues while communicating to different brokers.                                                   |
| 504 Timeout      | Zeebe failed to process the request within a pre-determined timeout.                                                     |

<details>
  <summary>Example response body with 202 Accepted</summary>

```json
{
  "message": "A backup with id 100 has been scheduled. Use GET actuator/backups/100 to monitor the status."
}
```

</details>

## Get backup info API

Information about a specific backup can be retrieved using the following request:

### Request

```
GET actuator/backups/{backupId}
```

<details>
  <summary>Example request</summary>

```shell
curl --request GET 'http://localhost:9600/actuator/backups/100'
```

</details>

### Response

| Code             | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 200 OK           | Backup state could be determined and is returned in the response body (see example below). |
| 400 Bad Request  | There is an issue with the request. Refer to the returned error message for details.       |
| 404 Not Found    | A backup with that ID does not exist.                                                      |
| 500 Server Error | All other errors. Refer to the returned error message for more details.                    |
| 502 Bad Gateway  | Zeebe has encountered issues while communicating to different brokers.                     |
| 504 Timeout      | Zeebe failed to process the request within a pre-determined timeout.                       |

When the response is 200 OK, the response body consists of a JSON object describing the state of the backup.

- `backupId`: ID in the request.
- `state`: Gives the overall status of the backup. The state can be one of the following:
  - `COMPLETED` if all partitions have completed the backup.
  - `FAILED` if at least one partition has failed. In this case, `failureReason` contains a string describing the reason for failure.
  - `INCOMPLETE` if at least one partition's backup does not exist.
  - `IN_PROGRESS` if at least one partition's backup is in progress.
- `details`: Gives the state of each partition's backup.
- `failureReason`: The reason for failure if the state is `FAILED`.

<details>
  <summary>Example response body with 200 OK</summary>

```json
{
  "backupId": 100,
  "details": [
    {
      "brokerVersion": "8.2.0-SNAPSHOT",
      "checkpointPosition": 5,
      "createdAt": "2022-12-08T13:00:55.344276672Z",
      "lastUpdatedAt": "2022-12-08T13:00:55.805351556Z",
      "partitionId": 1,
      "snapshotId": "2-1-3-2",
      "state": "COMPLETED"
    },
    {
      "brokerVersion": "8.2.0-SNAPSHOT",
      "checkpointPosition": 7,
      "createdAt": "2022-12-08T13:00:55.370965069Z",
      "lastUpdatedAt": "2022-12-08T13:00:55.84756566Z",
      "partitionId": 2,
      "snapshotId": "3-1-5-3",
      "state": "COMPLETED"
    }
  ],
  "state": "COMPLETED"
}
```

</details>

## List backups API

Information about all backups can be retrieved using the following request:

### Request

```
GET actuator/backups
```

<details>
  <summary>Example request</summary>

```shell
curl --request GET 'http://localhost:9600/actuator/backups'
```

</details>

### Response

| Code             | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 200 OK           | Backup state could be determined and is returned in the response body (see example below). |
| 400 Bad Request  | There is an issue with the request. Refer to returned error message for details.           |
| 500 Server Error | All other errors. Refer to the returned error message for more details.                    |
| 502 Bad Gateway  | Zeebe has encountered issues while communicating to different brokers.                     |
| 504 Timeout      | Zeebe failed to process the request with in a pre-determined timeout.                      |

When the response is 200 OK, the response body consists of a JSON object with a list of backup info.
See [get backup info API response](#response-1) for the description of each field.

<details>
  <summary>Example response body with 200 OK</summary>

```json
[
  {
    "backupId": 100,
    "details": [
      {
        "brokerVersion": "8.2.0-SNAPSHOT",
        "createdAt": "2022-12-08T13:00:55.344276672Z",
        "partitionId": 1,
        "state": "COMPLETED"
      },
      {
        "brokerVersion": "8.2.0-SNAPSHOT",
        "createdAt": "2022-12-08T13:00:55.370965069Z",
        "partitionId": 2,
        "state": "COMPLETED"
      }
    ],
    "state": "COMPLETED"
  },
  {
    "backupId": 200,
    "details": [
      {
        "brokerVersion": "8.2.0-SNAPSHOT",
        "createdAt": "2022-12-08T13:01:15.27750375Z",
        "partitionId": 1,
        "state": "COMPLETED"
      },
      {
        "brokerVersion": "8.2.0-SNAPSHOT",
        "createdAt": "2022-12-08T13:01:15.279995106Z",
        "partitionId": 2,
        "state": "COMPLETED"
      }
    ],
    "state": "COMPLETED"
  }
]
```

</details>

## Delete backup API

A backup can be deleted using the following request:

### Request

```
DELETE actuator/backups/{backupId}
```

<details>
  <summary>Example request</summary>

```shell
curl --request DELETE 'http://localhost:9600/actuator/backups/100'
```

</details>

### Response

| Code             | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| 204 No Content   | The backup has been deleted.                                                     |
| 400 Bad Request  | There is an issue with the request. Refer to returned error message for details. |
| 500 Server Error | All other errors. Refer to the returned error message for more details.          |
| 502 Bad Gateway  | Zeebe has encountered issues while communicating to different brokers.           |
| 504 Timeout      | Zeebe failed to process the request with in a pre-determined timeout.            |
