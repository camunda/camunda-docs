---
id: backups
title: "Backups"
description: "A guide to creating and installing Zeebe backups."
keywords: ["backup", "backups"]
---

:::note
Refer [Backup & Restore](/self-managed/backup-restore/backup-and-restore.md) to learn about how to take backup without downtime.
:::

As Zeebe fully manages the state of your process instances, consider taking backups of Zeebe data; this is crucial to prevent data loss, roll back application-level errors, and more.

Zeebe is fault-tolerant and replicates state internally. Backups are only necessary if you'd like to protect against the loss of entire replica sets or data corruption bugs.

State of other components, such as Operate and Tasklist, is not managed by Zeebe and must be backed up separately.

Taking backups is a manual process that is highly dependent on your infrastructure and deployment. Camunda does not provide an automated backup mechanism or tool. However, we do offer the following guidance to create and execute a successful backup.

## Cold backups

Cold backups, also called offline backups, require **downtime**.

During the downtime, processes don't make progress and clients can't communicate with Zeebe.
To make sure that the downtime doesn't cause issues for your clients, you should test how your clients behave during the downtime, or shut them down as well.

### Shutting down all brokers in the cluster

To take a consistent backup, all brokers must be shut down first.

As soon as brokers shut down, partitions become unhealthy and clients lose connections to Zeebe or experience full backpressure.
To prevent unnecessary failovers during the shutdown process, we recommend shutting down all brokers at the same time instead of a gradual shutdown.

Wait for all brokers to fully shut down before proceeding to the next step.

### Creating the backup

:::note
The `data` folder contains symbolic and hard links which may require special attention when copying, depending on your environment.
:::

To create the backup, take the following steps:

1. Each broker has a data folder where all state is persisted. The location of the data folder is [configured](../configuration/configuration.md) via `zeebe.broker.data.directory`. Create a copy of the data folder and store it in a safe location.

If you have direct access to the broker, for example in a bare-metal setup, you can do this by creating a tarball like this: `tar caf backup.tar.gz data/`.

You may also use filesystem snapshots or [Kubernetes volume snapshots](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) if that fits your environment better

2. Double-check that your tool of choice supports symbolic and hard links.
3. Do not merge or otherwise modify data folders as this might result in data loss and unrestorable backups.
4. Save the broker configuration to ensure the replacement cluster can process the backed-up data.

See the following example on how a backup may look:

```bash
$ tree zeebe-backup-*
zeebe-backup-2021-01-31
├── zeebe-broker-0-config.yml
├── zeebe-broker-0-data.tar.gz
├── zeebe-broker-1-config.yml
├── zeebe-broker-1-data.tar.gz
├── zeebe-broker-2-config.yml
└── zeebe-broker-2-data.tar.gz
```

### Resuming

After taking the backup, brokers can be started again and will automatically resume with processing.

## Restore from backup

### Prepare replacement cluster

:::note Caution
Always use the same or the next minor version of Zeebe that you were using when taking the backup.
Using a different version may result in data corruption or data loss.
See the [update guide](/guides/update-guide/introduction.md) for more details.
:::

Ensure your replacement cluster has the same number of brokers as the old cluster and uses the [same node IDs](setting-up-a-cluster.md#configuration).

### Shutting down all brokers in the replacement cluster

Before installing the backup, ensure all brokers are fully shut down.

### Installing the backup

To install the backup, take the following steps:

1. Delete the existing data folder on each broker of your replacement cluster.
2. For each broker, copy over the configuration and the data folder.
3. You may need to slightly adjust the configuration for your replacement cluster, for example to update IP addresses.

### Starting the Zeebe cluster

After replacing the data folders, brokers can be started again and will automatically resume with processing.
