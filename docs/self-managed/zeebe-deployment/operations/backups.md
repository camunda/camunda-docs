---
id: backups
title: "Backups"
description: "Overview and Guide for taking Zeebe backups"
---

As Zeebe fully manages the state of your process instances you might want to consider taking backups of Zeebe data.
Zeebe is fault tolerant and replicates state internally.
Backups are only necessary if you want to protect against the loss of entire replica sets or data corruption bugs.

State of other components, such as Operate and Tasklist, is not managed by Zeebe and needs to be backed up separately.

Taking backups is a manual process that is highly dependent on your infrastructure and deployment.
We do not provide an automated backup mechanism or tool.

## Cold Backups

Cold backups, also called offline backups, require **downtime**.
During the downtime, processes don't make progress and clients can't communicate with Zeebe.
We recommend that you test how your clients behave during the downtime or that you shut down clients as well.

### Shutting down all brokers in the cluster
To take a consistent backup, all brokers must be shut down first.

As soon as brokers are shutting down, partitions become unhealthy and clients will lose connections to Zeebe or experience full backpressure.
To prevent unnecessary failovers during the shutdown process, we recommend to shut down all brokers at the same time instead of a gradual shutdown.

Wait for all brokers to be fully shut down before proceeding to the next step.

### Creating the backup
:::caution
The `data` folder contains symbolic and hard links which may require special attention when copying, depending on your environment.
:::

Each broker has a data folder where all state is persisted.
The location of the data folder is [configured](../configuration/configuration.md) via `zeebe.broker.data.directory`.
To save the the data folder you can either create an archive of the entire folder or take filesystem or volume snapshots.

Do not merge or otherwise modify data folders.
Additionally, you should save the broker configuration to ensure that the replacement cluster can process the backed up data.

Here is how a backup may look like:

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

### Prepare Replacement cluster

:::caution
Use the same or the next minor version of Zeebe that you were using when taking the backup.
See the [update guide](../../../guides/update-guide/introduction.md) for more details.
:::

Make sure that your new cluster has at least as many brokers as the backed up cluster.

### Shutting down all brokers in the replacement cluster

Before installing the backup, make sure that all brokers are fully shut down.

### Installing the backup

Delete the existing data folder on each broker of you replacement cluster.
For each broker, copy over the configuration and the data folder.
You may need to slightly adjust the configuration for you replacement cluster, for example to update IP addresses.

### Starting the Zeebe cluster

After replacing the data folders, brokers can be started again and will automatically resume with processing.