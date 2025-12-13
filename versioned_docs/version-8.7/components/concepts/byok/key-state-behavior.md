---
id: key-state-behavior
title: "Key state behavior"
description: "Understand how Camunda 8 SaaS behaves when an external Amazon KMS key used for BYOK is disabled, scheduled for deletion, deleted, or misconfigured."
keywords:
  [BYOK, encryption, KMS, key disabled, key deletion, SaaS, troubleshooting]
---

Learn how Camunda 8 SaaS responds when your external Amazon KMS encryption key (BYOK) becomes unavailable during cluster startup or runtime.

This page applies only to **external customer-managed keys** (AWS KMS). For encryption fundamentals, see the [encryption overview](/components/concepts/byok/index.md).

:::warning
If your external encryption key is disabled, deleted, or its permissions are revoked, your cluster becomes inaccessible and may enter a frozen state. Camunda cannot recover encrypted data if the key is permanently deleted.
:::

## Key state summary

The table below provides a high-level overview of how different KMS key states affect cluster startup, operation, and data availability.

| Key state                  | Cluster startup   | Cluster runtime                               | Data accessible? | Recovery possible?            |
| -------------------------- | ----------------- | --------------------------------------------- | ---------------- | ----------------------------- |
| **Enabled**                | ✔ Starts normally | ✔ Operates normally                           | Yes              | Not needed                    |
| **Disabled**               | ❌ Cannot start   | ❌ Freezes: no reads/writes, operations hang  | No               | ✔ Re-enable key               |
| **Scheduled for deletion** | ❌ Cannot start   | ❌ Same as disabled                           | No               | ✔ Cancel deletion + re-enable |
| **Permanently deleted**    | ❌ Cannot start   | ❌ Cluster remains non-functional permanently | No               | ❌ No — encrypted data lost   |
| **Incorrect key policy**   | ❌ Cannot start   | ❌ Behaves like disabled key                  | No               | ✔ Fix policy                  |

## What happens when a key becomes unavailable?

When a cluster loses access to its KMS key:

- All encryption/decryption requests fail immediately.
- Zeebe, Elasticsearch, and backup operations **freeze**.
- Console may still show the cluster as **Healthy**, even though no work can proceed.
- Within ~15 minutes, the **Encryption at rest** panel displays:
  > **External encryption key is not ready**

### Timeline of effects

1. **Immediate (0–1s):** Key becomes inaccessible.
2. **Seconds:** Storage reads/writes hang.
3. **Backup jobs:** Become stuck “In progress” indefinitely.
4. **Suspend/Resume:** Requests appear accepted but never execute.
5. **Console status:** May incorrectly continue to show “Healthy.”
6. **After re-enabling:** Automatic recovery occurs, but timing depends on reconciliation and exponential backoff.

## Component-level impact

| Component/feature      | Requires key for                | Behavior when key unavailable             |
| ---------------------- | ------------------------------- | ----------------------------------------- |
| **Zeebe brokers**      | State storage (encrypted disks) | Execution freezes; no read/write activity |
| **Elasticsearch**      | Persistent disk encryption      | Indexing and queries freeze               |
| **Backups**            | Encrypting/decrypting snapshots | Backup requests hang forever              |
| **Restore operations** | Decrypting snapshots            | Restore cannot proceed                    |
| **Document storage**   | Encrypting stored files         | Document reads/writes freeze              |
| **Suspend / resume**   | Changing cluster state          | Request is logged but not executed        |

## Behavior by key lifecycle state

### Disabled key

- Cluster cannot start.
- If cluster was running:
  - All operations freeze.
  - Suspend/resume does not complete.
  - Backup operations get stuck.
- Console eventually shows: **External encryption key is not ready**

**Recovery:**  
Re-enable the KMS key. Cluster resumes automatically, but recovery time increases the longer the key was disabled.

### Key scheduled for deletion

Scheduling deletion automatically **disables** the key.

Behavior is identical to a disabled key.

**Recovery:**  
Cancel deletion → Re-enable the key.

### Permanently deleted key

Once the AWS deletion waiting period passes:

- The key is irrecoverable.
- The cluster becomes permanently unusable.
- No encrypted data can be recovered.

**Recovery:**  
Not possible. Create a new cluster.

### Incorrect or missing key policy

If the KMS policy does not grant Camunda's AWS Role the required permissions:

- Cluster cannot start or becomes frozen.
- Behavior mirrors a disabled key.

**Recovery:**  
Update the KMS key policy using the Tenant Role ARN displayed in Console.

## Error handling and user-visible messages

Currently, Camunda displays a single unified message:

```yaml
External encryption key is not ready
```

More granular messaging is planned for future iterations.

## Operator responsibilities and best practices

### Customer responsibilities (BYOK model)

- Maintain and monitor the key lifecycle in AWS.
- Monitor for disable/delete events (CloudWatch & EventBridge).
- Ensure policies remain correct.
- Understand that deleting or disabling the key freezes the cluster.

### Recommended monitoring

Activate:

- **CloudWatch alerts** for key disabled, scheduled deletion, access denied
- **EventBridge** for policy changes
- **CloudTrail** for Encrypt/Decrypt failures and audit logs

## Related documentation

- [Encryption overview](/components/concepts/byok/index.md)
- [External encryption setup guide](/components/concepts/byok/aws-kms-setup.md)
- [FAQ & troubleshooting](/components/concepts/byok/faq-and-troubleshooting.md)
- [Key rotation and audit logging](/components/concepts/byok/key-rotation-audit-logging.md)
