---
id: key-state-behavior
title: "Key state behavior"
description: "Understand how Camunda 8 SaaS behaves when an external Amazon KMS key used for BYOK is disabled, scheduled for deletion, deleted, or misconfigured."
keywords:
  [BYOK, encryption, KMS, key disabled, key deletion, SaaS, troubleshooting]
---

Learn how Camunda 8 SaaS responds when your external Amazon KMS encryption key (BYOK) becomes unavailable during cluster startup or runtime.

This page applies only to **external customer-managed keys** (AWS KMS). For encryption fundamentals, see the [encryption overview](/components/saas/byok/index.md).

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
- Within ~15 minutes, the **Encryption at rest** tab shows the status of each key, and what to do. See [key statuses](#key-statuses).

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
- Console eventually shows the status **Your key is disabled** or **Your key cannot be used** for the key. See [key statuses](#key-statuses).

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

## Key statuses {#key-statuses}

The **Encryption at rest** tab of the cluster in Console shows one card for each external key. A single-region cluster has one key, the primary key. A dual-region cluster also has a secondary key.

Each card shows the status of the key. If Camunda cannot use the key, the card also shows what to do, and a **Details** line. The **Details** line gives the exact request that failed, for example `Grant for StorageReplicationSource: KMS denied kms:CreateGrant on the key`. When you contact Camunda support, give them the cluster ID and this line.

| Status                                     | Meaning                                                                   | Action                                    |
| ------------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------- |
| **Ready**                                  | Camunda can use the key and all its grants.                               | None.                                     |
| **Camunda is checking your key**           | Camunda checks that it can use the key. This usually takes a few minutes. | None.                                     |
| **Camunda is not allowed to use your key** | AWS KMS denied a request from Camunda to the key.                         | [Fix the key policy](#key-access-denied). |
| **Your key cannot be used**                | The key exists, but AWS KMS cannot use it for the request of Camunda.     | [Fix the key](#key-not-usable).           |
| **Your key is disabled**                   | The key is disabled or scheduled for deletion.                            | [Enable the key](#key-not-enabled).       |
| **AWS KMS is temporarily unavailable**     | AWS KMS did not answer in time, or limited the rate of requests.          | None. Camunda retries automatically.      |
| **Camunda cannot check your key**          | A problem on the side of Camunda stops the check.                         | None.                                     |

If the status **AWS KMS is temporarily unavailable** or **Camunda cannot check your key** stays for more than one hour, contact Camunda support.

If you changed the key or its policy, wait a few minutes. AWS KMS can take several minutes to apply a change, so the status usually clears within 10 minutes.

### Camunda is not allowed to use your key {#key-access-denied}

The key policy must allow the tenant role of the cluster to use the key and to create grants on it. The cluster has one tenant role for all its keys. The **Encryption at rest** tab shows the ARN of the tenant role.

1. Make sure that the key policy contains both Camunda statements from the [key policy template](/components/saas/byok/aws-kms-setup.md), with the tenant role ARN:
   - "Allow Camunda tenant IAM Role basic key access"
   - "Allow Camunda tenant IAM Role to create grants for provisioning encrypted EBS volumes"
2. Make sure that no resource control policy in your AWS organization denies the tenant role access to the key.
3. Find the denied request in AWS CloudTrail, in the account and Region of the key. The event shows the policy that denied the request.
4. Make sure that the key ARN points to an existing key. AWS KMS gives the same denial for a key that does not exist.

A deleted key also shows this status. If the key was deleted, AWS cannot restore it, and Camunda cannot recover the data that it encrypts. See [permanently deleted key](#permanently-deleted-key).

If the key policy is correct and nothing in your organization denies the request, contact Camunda support.

### Your key cannot be used {#key-not-usable}

The key must be enabled, symmetric, and below its quota for grants. The **Details** line tells you which condition failed.

1. Make sure that the key is enabled. If the key is scheduled for deletion, cancel the deletion, then enable the key.
2. Make sure that the key is a symmetric key for encryption and decryption. In the AWS KMS console, the key type is **Symmetric** and the key usage is **Encrypt and decrypt**.
3. Make sure that the key has not reached its AWS KMS quota for grants. If it has, contact Camunda support.

A disabled key can show this status or **Your key is disabled**. For both, enable the key.

### Your key is disabled {#key-not-enabled}

The cluster cannot read or write its data until the key is enabled again.

1. If the key is scheduled for deletion, cancel the deletion.
2. Enable the key in AWS KMS.

The cluster recovers automatically after the key is enabled.

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

- [Encryption overview](/components/saas/byok/index.md)
- [External encryption setup guide](/components/saas/byok/aws-kms-setup.md)
- [FAQ & troubleshooting](/components/saas/byok/faq-and-troubleshooting.md)
- [Key rotation and audit logging](/components/saas/byok/key-rotation-audit-logging.md)
