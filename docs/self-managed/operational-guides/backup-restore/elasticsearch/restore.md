---
id: es-restore
title: "Restore a backup"
sidebar_label: "Restore a backup"
keywords: ["backup", "backups", "restore", "elasticsearch", "opensearch"]
description: "Learn how to restore a Camunda 8 Self-Managed backup using Elasticsearch or OpenSearch."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../../../components/zeebe/react-components/\_zeebe-card';
import { esRestoreCards } from '../react-components/\_card-data';

Restore a previous backup of your Camunda 8 Self-Managed components and cluster.

<ZeebeGrid zeebe={esRestoreCards} />

## About restoring a backup

To restore a backup you must complete the following main steps:

1. [Restore Elasticsearch/OpenSearch snapshot](./restore-snapshot.md)
2. [Restore Zeebe Cluster](#restore-zeebe-cluster)
3. [Start all Camunda 8 components](#start-all-camunda-8-components)

:::note
When restoring Camunda 8 from a backup, all components must be restored from their backup that corresponds to the same backup ID.
:::

## Prerequisites

The following general prerequisites are required before you can restore a backup:

| Prerequisite          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component clean state | The restore process assumes a **clean state** for all components, including Elasticsearch/OpenSearch. This means **no prior persistent volumes** or **component state** should exist - all data is restored from scratch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Camunda version       | <p>**Backups must be restored** using the **exact Camunda version** they were created with. As noted during the backup process, the version is embedded in the backup name.</p><p>This is essential because starting a component with a mismatched version may result in startup failures due to schema incompatibilities with Elasticsearch/OpenSearch and the component itself. Although schema changes are generally avoided in patch releases, they can still occur.</p><p>When using the Camunda Helm chart, this means figuring out the corresponding version. For this the [Camunda Helm chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/) can help. Click on the `major.minor` release and then search for the backed up patch release of your component. The other components would typically fit in there as well.</p> |

<details>
   <summary>Example: Work out your correct Camunda version</summary>
   <summary>

Our Backups look as follows:

```bash
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_webapps_1748937221_8.8.0_part_1_of_5
camunda_webapps_1748937221_8.8.0_part_2_of_5
camunda_webapps_1748937221_8.8.0_part_3_of_5
camunda_webapps_1748937221_8.8.0_part_4_of_5
camunda_webapps_1748937221_8.8.0_part_5_of_5
camunda_zeebe_records_backup_1748937221
```

From this, we know:

- Optimize: 8.8.0
- Web Applications (Operate / Tasklist): 8.8.0

Based on this, we can look in the [matrix versioning of 8.8](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.8) and see the corresponding Camunda Helm chart version is `13.0.0`.

   </summary>
</details>

## Step 2: Restore Zeebe Cluster {#restore-zeebe-cluster}

### Prerequisites

The following specific prerequisites are required when restoring the Zeebe Cluster:

| Prerequisite       | Description                                                                                                                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-existing data  | Persistent volumes or disks must not contain any pre-existing data.                                                                                                                              |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                                                                                  |
| Components stopped | It’s critical that no Camunda components are running during a Zeebe restore. Restored components may propagate an incorrect cluster configuration, potentially disrupting cluster communication. |

### Restore Zeebe Cluster

In Camunda 8.10 and later, you can restore Zeebe partitions on the running brokers instead, without deploying the standalone restore application. See [Restore a cluster in place](../in-process-restore.md).

:::note
During the restoration of the Elasticsearch / OpenSearch state, we had to temporarily deploy Zeebe. This will have resulted in persistent volumes on Kubernetes and a filled data directory on each Zeebe Broker in case of a manual deployment.

In the case of Kubernetes to remove all related persistent volumes.

```bash
kubectl get pvc -o custom-columns=NAME:.metadata.name --no-headers \
  | grep zeebe \
  | while read pvc; do
      kubectl delete pvc "$pvc"
    done
```

New persistent volumes will be created on a new Camunda Helm chart upgrade and install.

In case of a manual deployment, this means to remove the data directory of each Zeebe Broker.
:::

Camunda provides a standalone app which must be run on each node where a Zeebe Broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count **must be same** as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe, see [how to figure out available backups](./restore-snapshot.md#available-backups-of-zeebe-partitions).
If brokers were dynamically scaled between backup and restore, this is not an issue - as long as the partition count remains unchanged.
:::

<Tabs>
   <TabItem value="kubernetes" label="Kubernetes" default>

Assuming you're using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.

It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
It's important that the backup is configured for Zeebe to be able to restore from the backup!

```yaml
orchestration:
  enabled: true
  env:
    # Environment variables to overwrite the Zeebe startup behavior
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "$BACKUP_ID" # Change the $BACKUP_ID to your actual value
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
    ...

# If you use Elasticsearch from the embedded Helm chart, set this to true. Otherwise, set it to false.
elasticsearch:
  enabled: true
connectors:
  enabled: false
optimize:
  enabled: false
```

:::note Alternative overwrite

Use this alternative approach to restore Zeebe partitions:

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=$BACKUP_ID" # Change the $BACKUP_ID to your actual value.
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
   # All the envs related to the backup store as outlined in the prerequisites
   ...
```

If you're not using the Camunda Helm chart, you can use a similar approach natively with Kubernetes to overwrite the command.
:::

The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command or unsetting the `ZEEBE_RESTORE` and related backup ID environment variable to restore Zeebe’s default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip

In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe Broker logs during restore, and use `--previous` if a pod has already restarted.

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.

:::

   </TabItem>
   <TabItem value="manual" label="Manual" default>

To restore a Zeebe Cluster, run the following in each node where the broker will be running:

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --backupId=<backupId>
```

   </TabItem>
</Tabs>

### Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup with the given backupId.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

#### Data directory is not empty

If the data directory is not empty, the restore will fail with an error message:

```
Brokers's data directory /usr/local/camunda/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted.
In such cases, the restore application can be configured to ignore the presence of these files and folders.
The config `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore.
By default, it ignores `lost+found` folder found on ext4 filesystems.
To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

## Step 3: Start all Camunda 8 components {#start-all-camunda-8-components}

Now that you have actively restored Elasticsearch/OpenSearch and the Zeebe cluster partitions, you can start all components again and use Camunda 8 as normal.

For example:

- For Kubernetes, apply Helm values for normal startup and explicitly set `ZEEBE_RESTORE=false`. Also, keep your backup-store environment variables configured as outlined in the prerequisites.

```yaml
orchestration:
  enabled: true
  env:
    - name: ZEEBE_RESTORE
      value: "false"
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
```

Ensure restore-only settings are not present in this final configuration (for example, `SPRING_PROFILES_ACTIVE=restore`, `ZEEBE_RESTORE_FROM_BACKUP_ID`, or a temporary restore command override).

- For a manual setup, execute the broker and all other components in their normal way.

## (Optional) Restore a Camunda Hub data backup

If you have previously backed up your Camunda Hub data, you can restore this backup.

Backups can only be restored with downtime.
To restore the database dump, first ensure that Camunda Hub is stopped.
Then, to restore the database use the following command:

```bash
psql -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql <DATABASE_NAME>
```

After the database has been restored, you can start Camunda Hub again.

:::danger
When restoring Camunda Hub data from a backup, ensure that the ids of the users stored in your OIDC provider (e.g. Keycloak) do not change in between the backup and restore.
Otherwise, users may not be able to access their projects after the restore (see [Camunda Hub's troubleshooting guide](/self-managed/components/hub/troubleshooting/troubleshoot-missing-data.md)).
:::

:::tip
Some vendors provide tools that help with database backups and restores, such as [AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/) or [Cloud SQL backups](https://cloud.google.com/sql/docs/postgres/backup-recovery/backups).
:::
