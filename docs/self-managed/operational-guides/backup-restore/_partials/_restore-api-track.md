While a restore is in flight, query [the restore status](/apis-tools/orchestration-cluster-api-rest/specifications/get-restore-status.api.mdx) to track progress per broker and per partition:

```bash
curl "${ORCHESTRATION_CLUSTER_API}/restore"
```

<details>
<summary>Example response</summary>

```json
{
  "status": "IN_PROGRESS",
  "changeId": "8",
  "startedAt": "2026-01-01T10:00:00Z",
  "brokers": [
    {
      "brokerId": "1",
      "partitionsRestored": 1,
      "partitionsToRestore": 2,
      "partitions": [
        {
          "partitionId": 1,
          "state": "RESTORED",
          "backupIds": [1748937221],
          "completedAt": "2026-01-01T10:02:00Z"
        },
        {
          "partitionId": 2,
          "state": "RESTORING",
          "backupIds": [1748937221],
          "completedAt": null
        }
      ]
    }
  ]
}
```

</details>

The overall `status` reports the state of the cluster change that performs the restore:

| Status        | Meaning                                                              |
| :------------ | :------------------------------------------------------------------- |
| `IN_PROGRESS` | The restore is running.                                              |
| `COMPLETED`   | Every partition was restored and the brokers returned to processing. |
| `FAILED`      | The restore change failed and did not complete.                      |
| `CANCELLED`   | The restore change was canceled.                                     |

Each partition entry reports the progress of a single broker's copy of that partition:

| State       | Meaning                                                             |
| :---------- | :------------------------------------------------------------------ |
| `PENDING`   | The partition is queued and its restore has not started yet.        |
| `RESTORING` | The partition is being restored from its backups.                   |
| `RESTORED`  | The partition was restored and validated, and `completedAt` is set. |

At most one restore is in flight at any time. Once the restore has finished, this endpoint returns `404` and the per-partition detail is no longer retained, so use the [cluster monitoring API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#monitoring-api) to confirm that the restore's `changeId` completed.
