The examples below use the following variables:

```bash
export ORCHESTRATION_CLUSTER_API=http://localhost:8080/v2
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

Before you start, be aware of the following. Entering recovery mode stops all processing in the cluster, so plan the restore as a downtime window. The Restore API then deletes the local partition data on every broker before it writes the data from the backup, and this cannot be undone. Run the Restore API only against a cluster whose current primary storage data you intend to replace.
