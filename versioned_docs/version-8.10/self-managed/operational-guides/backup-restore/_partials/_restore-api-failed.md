If a single partition fails to restore, for example because its backup is corrupted or the backup store is temporarily unreachable, the partial data of that partition is dropped and the failed step is retried automatically with a backoff. The restore change stays pending, and the restore status keeps reporting the partition as `RESTORING`.

Because the retry is automatic, first try to fix the root cause instead of sending a new restore request. Once the cause is resolved, the pending change continues on its own and completes.

Automatic retries can't help if the problem is the backup itself, for example if the selected backup is corrupted or turns out to be the wrong restore point. In that case, retry from the outside:

1. Cancel the pending restore change on the management API, using the `changeId` the restore returned:

   ```bash
   curl -X DELETE "${ORCHESTRATION_CLUSTER_MANAGEMENT_API}/actuator/cluster/changes/8"
   ```

   The restore status reports the change as `CANCELLED`, and the cluster stays in recovery mode.

2. Send a new [restore request](#trigger-the-restore). Because each restore drops the local partition data before it writes the backup data, the new attempt does not build on the partial result of the canceled one, and you can select a different backup target.

:::warning
Don't leave a partially failed restore unfinished. Between canceling a restore and completing a new one, Zeebe's internal data is a mix of restored and pre-restore state and cannot be trusted. Keep the cluster in recovery mode and retry until every partition reaches `RESTORED`. If you switch the cluster back to `PROCESSING` in that state, treat it as unrecoverable and restore again from a clean state.
:::
