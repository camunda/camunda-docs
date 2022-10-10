---
id: zeebe-backup-and-restore
title: "Zeebe Backups"
description: "A guide to creating backup of a running Zeebe cluster."
keywords: ["backup", "backups"]
---

:::note
The API is subject to change.
:::

A backup of a zeebe cluster consists of a consistent snapshot of all partitions. The backup is stored in an external storage. Backup is taken asynchronously in the background while Zeebe is processing. Thus, the backups can be taken with minimal impact to the normal processing.

Backup of a running Zeebe cluster can be taken using the following rest APIs. The API is accessible via management port of the gateway.

- [Trigger Backup](#trigger-backup)
- [Monitor Backup](#monitor-backup)

In case of a catastrophic situation that leads to full data loss or corrupted data, a new Zeebe cluster can be created from an available backup.

- [Restore from a backup](#restore)

To take a backup of the cluster, backup storage must be configured.

- [Configuration](#configuration)

## Backup management API

### Trigger Backup

##### Request

```
POST http://{zeebe-gateway}:9600/actuator/backups/{backupId}
```

A `backupId` is an integer and must be greater than the id of previous backups. Zeebe does not take two backups with the same Ids. If a backup fails, then a new `backupId` must be provided to trigger a new backup.

##### Response

- 200 OK, with response body
- 500 Server error

##### Response Body

```
{
  id: <backupId>
}
```

The response is sent after Zeebe has started taking the backup of all partitions, but before the backup is completed. The backup is taken asynchronously and can take a long time depending on the size. To monitor the backup, use the get backup status api.

### Monitor backup

##### Request

```
GET http://{zeebe-gateway}:9600/actuator/backups/{BackupId}
```

##### Response

- 200 OK, with response body
- 500 Server error

##### Response Body

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

`status` gives the overall status of the backup. It is

- `COMPLETED` if all partitions have completed the backup
- `FAILED` if at least one partition have failed. In this case `failureReason` contains a string describing the reason for failure.
- `DOES_NOT_EXIST` if at least one partition's backup does not exist
- `IN_PROGRESS` if at least one partition's backup is in progress

## Restore

A new Zeebe cluster can be created from a specific backup. We provide a standalone app which must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

To restore a zeebe cluster, run the following in each node where the broker will be running.

```
tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
./bin/restore <backupId>
```

If restore was successful, the app exits with a log message `Successfully restored broker from backup`.

Restore fails if:

- There is no valid backup with the given backupId.
- Backup store is not configured correctly.
- The configured data directory is not empty.
- Any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

:::note
When restoring, provide the same configuration (node id, data directory, cluster size and replication count) as for the broker that will be running in this node. The partition count must be same as in the backup.
:::

## Configuration

- Enable backups by setting the flag ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEBACKUP to `true`.
- The backup management api is available via management port of the gateway. Ensure the configuration `MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE` include "backups". Set `MANAGEMENT_ENDPOINTS_BACKUPS_ENABLED` to true.
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

Alternatively, you can configure backup store using environment variables.

- `ZEEBE_BROKER_DATA_BACKUP_STORE` - Specify which storage to use as the backup storage. Currently, only S3 is supported. You can use any S3 compatible storage.
- `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME` - The backup will be stored in this bucket. The bucket must already exist. The bucket must not be shared with other Zeebe clusters.
- `ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT` - If no endpoint is provided, it will be determined based on the configured region.
- `ZEEBE_BROKER_DATA_BACKUP_S3_REGION` - If no region is provided it will be determined [from the environment](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html#automatically-determine-the-aws-region-from-the-environment)
- `ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY` -If either accessKey or secretKey is not provided, the credentials will be determined [from the environment](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain)
- `ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY`

Same configuration must be provided to all brokers in a cluster.
