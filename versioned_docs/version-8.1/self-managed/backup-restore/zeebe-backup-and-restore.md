---
id: zeebe-backup-and-restore
title: "Backup and restore Zeebe data"
description: "A guide to creating backup of a running Zeebe cluster."
keywords: ["backup", "backups"]
---

:::note
This API is subject to change.
:::

A backup of a Zeebe cluster consists of a consistent snapshot of all partitions. The backup is stored externally. The backup is taken asynchronously in the background while Zeebe is processing. Thus, the backups can be taken with minimal impact on typical processing.

Backup of a running Zeebe cluster can be taken using the following rest APIs. The API is accessible via the management port of the gateway.

- [Trigger backup](#trigger-backup)
- [Monitor backup](#monitor-backup)

In case of a catastrophic situation that leads to full data loss or corrupted data, a new Zeebe cluster can be created from an available backup.

- [Restore from a backup](#restore)

To take a backup of the cluster, backup storage must be configured.

- [Configuration](#configuration)

## Backup management API

### Trigger backup

##### Request

```
POST http://{zeebe-gateway}:9600/actuator/backups/{backupId}
```

A `backupId` is an integer and must be greater than the id of previous backups that are completed, failed, or deleted.
Zeebe does not take two backups with the same ids. If a backup fails, a new `backupId` must be provided to trigger a new backup.
The `backupId` cannot be reused, even if the backup corresponding to the backup id is deleted.

##### Response

- 200 OK, with response body
- 500 Server error

##### Response body

```
{
  id: <backupId>
}
```

The response is sent after Zeebe has started taking the backup of all partitions, but before the backup is complete. The backup is taken asynchronously and can take a long time depending on the size. To monitor the backup, use the get backup status API.

### Monitor backup

##### Request

```
GET http://{zeebe-gateway}:9600/actuator/backups/{BackupId}
```

##### Response

- 200 OK, with response body
- 500 Server error

##### Response body

```
{
    "backupId": 6,
    "status": "COMPLETED", // COMPLETED | IN_PROGRESS | FAILED | DOES_NOT_EXIST
    "failureReason": null,
    "partitions": [
        {
            "partitionId": 1,
            "status": "COMPLETED",
            "description": {
                "snapshotId": "16-10-7-8",
                "checkpointPosition": 9,
                "brokerId": 1,
                "brokerVersion": "8.1.0"
            },
            "failureReason": null,
            "createdAt": "2022-09-26T14:57:17.914044812Z",
            "lastUpdatedAt": "2022-09-26T14:57:19.107670926Z"
        },
        {
            "partitionId": 2,
            "status": "COMPLETED",
            "description": {
                "snapshotId": "18-12-7-8",
                "checkpointPosition": 9,
                "brokerId": 0,
                "brokerVersion": "8.1.0"
            },
            "failureReason": null,
            "createdAt": "2022-09-26T14:57:17.914367447Z",
            "lastUpdatedAt": "2022-09-26T14:57:18.887925972Z"
        }
    ]
}

```

`status` gives the overall status of the backup. The status can be one of the following:

- `COMPLETED` if all partitions have completed the backup.
- `FAILED` if at least one partition has failed. In this case, `failureReason` contains a string describing the reason for failure.
- `DOES_NOT_EXIST` if at least one partition's backup does not exist.
- `IN_PROGRESS` if at least one partition's backup is in progress.

## Restore

A new Zeebe cluster can be created from a specific backup. Camunda provides a standalone app which must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

To restore a Zeebe cluster, run the following in each node where the broker will be running:

```
tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
./bin/restore --backupId=<backupId>
```

If restore was successful, the app exits with a log message of `Successfully restored broker from backup`.

Restore fails if:

- There is no valid backup with the given backupId.
- Backup store is not configured correctly.
- The configured data directory is not empty.
- Any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

:::note
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count must be same as in the backup.
:::

## Configuration

- Enable backups by setting the flag `ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEBACKUP` to `true`.
- The backup management API is available via management port of the gateway. Ensure the configuration `MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE` include "backups". By default, this is set to "\*" which included backups. Set `MANAGEMENT_ENDPOINTS_BACKUPS_ENABLED` to `true`.
- Backup is stored in an external storage. This must be configured before starting the Zeebe cluster.

Configure backup store in the configuration file as follows.

```
zeebe:
  broker:
    data:
      backup:
        store: S3
        s3:
          bucketName:
          region:
          endpoint:
          accessKey:
          secretKey:
```

Alternatively, you can configure backup store using environment variables:

- `ZEEBE_BROKER_DATA_BACKUP_STORE` - Specify which storage to use as the backup storage. Currently, only S3 is supported. You can use any S3-compatible storage.
- `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME` - The backup will be stored in this bucket. The bucket must already exist. The bucket must not be shared with other Zeebe clusters.
- `ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT` - If no endpoint is provided, it will be determined based on the configured region.
- `ZEEBE_BROKER_DATA_BACKUP_S3_REGION` - If no region is provided, it will be determined [from the environment](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html#automatically-determine-the-aws-region-from-the-environment).
- `ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY` - If either `accessKey` or `secretKey` is not provided, the credentials will be determined [from the environment](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain).
- `ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY`

The same configuration must be provided to all brokers in a cluster.
