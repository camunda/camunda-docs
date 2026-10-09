:::warning
If the partition count was scaled up after the backup was taken, the backup contains fewer partitions than the cluster, and the Restore API operation fails. To restore such a backup, align the cluster with the partition count of the backup first.
:::

Do this before you [switch the cluster into recovery mode](#1-switch-the-cluster-into-recovery-mode) and trigger the restore. To align the cluster with the partition count of the backup:

1. Stop all brokers. A running broker keeps its topology in memory and can overwrite your edit.
2. Change the static configuration (`camunda.cluster.partition-count`) to the partition count of the backup on every broker.
3. Update the cluster topology on every broker with the `topology` command of the [debug CLI](https://github.com/camunda/camunda/tree/main/debug-cli). Each broker stores its cluster topology in the `.topology.meta` file in its root data directory. Retrieve the topology file as JSON:

   ```bash
   debug-cli topology -f /usr/local/camunda/data/.topology.meta > topology.json
   ```

4. In `topology.json`, find the entry for the restored Physical Tenant under `partitionGroups`. In its `routingState`, set `requestHandling.allPartitions.partitionCount` and `messageCorrelation.hashMod.partitionCount` to the partition count of the backup. Also remove any partitions that no longer exist from the `activePartitions` array. For a backup with three partitions, the result looks like this:

   ```json
   "routingState": {
     "activePartitions": [1, 2, 3],
     "requestHandling": {
       "allPartitions": { "partitionCount": 3 }
     },
     "messageCorrelation": {
       "hashMod": { "partitionCount": 3 }
     }
   }
   ```

5. Save the edited JSON back to the topology file:

   ```bash
   debug-cli topology -s -f /usr/local/camunda/data/.topology.meta --source topology.json
   ```

6. Start all brokers. The static configuration and the edited topology file are read at startup, so the change takes effect with this restart. Then continue with the restore.
