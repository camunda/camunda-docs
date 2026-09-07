---
id: restore-troubleshooting
title: Restore troubleshooting
description: "Troubleshoot restore failures by phase, symptom, and corrective action."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

Use this guide to diagnose and recover from restore failures.

:::note Related pages

- [Backup and restore overview](./backup-restore-overview.md)
- [Restore a cluster from backup](./how-to-restore.md)
- [Restore scenarios](./restore-scenarios.md)

:::

## Common restore phases

Restore operations pass through these phases:

- `VALIDATING`
- `DeleteData`
- `EnterRestoreMode`
- `RestoreSnapshots`
- `ExitRestoreMode`

## Failure modes and actions

| Phase              | Typical symptom                                                      | Likely cause                                                                                                                  | Recommended action                                                                                                                |
| ------------------ | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `VALIDATING`       | Restore request fails quickly with validation error                  | Backup is not complete, backup is legacy (missing `generationUuid`), partition count mismatch, or restore already in progress | Select a completed non-legacy backup, confirm partition compatibility, and retry after any active restore reaches terminal state. |
| `DeleteData`       | Restore fails after initiation and cluster returns to previous state | Internal destructive phase could not complete safely                                                                          | Retry once after verifying cluster health; if repeated, contact support with restore ID and timestamps.                           |
| `EnterRestoreMode` | Cluster remains unavailable and restore does not progress            | Controller/operator state transition did not complete                                                                         | Check cluster status history and activity context, then contact support with restore ID.                                          |
| `RestoreSnapshots` | Restore progresses but fails before completion                       | Snapshot restore failure, backend storage issue, or compatibility issue                                                       | Retry with a different backup if available. If all fail, contact support and provide failed restore IDs.                          |
| `ExitRestoreMode`  | Restore appears complete but final healthy state is delayed or fails | Post-restore reconciliation did not complete                                                                                  | Wait for reconciliation window, then re-check cluster health. If still degraded, contact support with restore metadata.           |

<!-- TODO(restore-from-backup): Add exact user-visible error messages and final API error payload examples per phase once backend/frontend error mapping is finalized. -->

## API error reference

| Code  | Meaning                                                                                             |
| ----- | --------------------------------------------------------------------------------------------------- |
| `400` | Invalid restore input (for example, legacy backup, backup not complete, compatibility check failed) |
| `404` | Cluster or backup was not found                                                                     |
| `409` | Another restore is already in progress                                                              |
| `501` | Restore feature flag is not enabled                                                                 |
| `500` | Internal server or Kubernetes API error                                                             |

## Activity and audit interpretation

For each restore, capture:

- Who initiated the restore
- Which backup was selected
- Start and completion timestamps
- Final terminal state (`COMPLETED`, `FAILED`, or `ABORTED`)

Use this record for incident timelines and post-incident review.

## Common mistakes

- Restoring a backup without confirming partition count compatibility.
- Starting restore during other cluster mutation activities.
- Assuming restore is non-destructive for current cluster data.
- Running restore without a validated rollback/runbook plan.

## When to contact support

Contact support when:

- Restore repeatedly fails with the same backup and a newer valid backup is not available.
- Cluster does not return to healthy status after terminal restore state.
- You suspect data integrity issues after a reported successful restore.

Include restore ID, cluster ID, selected backup ID, timeframe, and screenshots of status and errors.
