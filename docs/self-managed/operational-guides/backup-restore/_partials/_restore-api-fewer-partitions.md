:::warning
If the partition count was scaled up after the backup was taken, the backup contains fewer partitions than the cluster, and the Restore API operation fails.

To restore such a backup, you must manually align the cluster with the partition count of the backup:

- Change the static configuration (`camunda.cluster.partition-count`) to the partition count of the backup.
- Update the cluster topology with the debug CLI, setting the routing state of the restored Physical Tenant to the partition count of the backup.

:::

:::note Update the topology with the debug CLI
Each broker stores its cluster topology in the `.topology.meta` file in its root data directory. Use the `topology` command of the [debug CLI](https://github.com/camunda/camunda/tree/main/debug-cli) to edit it on every broker:

1. Retrieve the topology file as JSON:

   ```bash
   debug-cli topology -f /usr/local/camunda/.topology.meta > topology.json
   ```

2. In `topology.json`, find the entry for the restored Physical Tenant under `partitionGroups`. In its `routingState`, set the `requestHandling.allPartitions.partitionCount` and `messageCorrelation.hashMod.partitionCount` to the partition count of the backup. Additionally, remove any no longer present partitions from the `activePartitions` array.

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

3. Save the edited JSON back to the topology file:

   ```bash
   debug-cli topology -s -f /usr/local/camunda/.topology.meta --source topology.json
   ```

:::
