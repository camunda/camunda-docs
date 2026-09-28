---
id: cross-region-cold-recovery
title: Cross-region cold recovery
sidebar_label: Cross-region cold recovery
description: Recover an Orchestration Cluster in a secondary region from replicated backups.
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

Cross-region cold recovery creates a new Orchestration Cluster in a secondary region and restores selected backup data after a primary-region outage. A warm standby cluster is not running before the outage.

Cross-region cold recovery is generally available starting from Camunda 8.7 or later. It is supported for AWS and GCP clusters, including AWS clusters that use a customer-managed [Bring Your Own Key (BYOK)](/components/saas/byok/index.md) configuration.

## Supported region pairs

Cross-region cold recovery is available only for specific region pairs marked **Failover supported** when you select your region and backup location in Console. Each pair supports failover in both directions.

| Cloud provider | Region pair                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| AWS            | US East (Ohio) (us-east-2) and US East (N. Virginia) (us-east-1)                |
| AWS            | US East (Ohio) (us-east-2) and US West (Oregon) (us-west-2)                     |
| GCP            | Council Bluffs, Iowa (us-central1) and Moncks Corner, South Carolina (us-east1) |

## Restored data

The failover flow restores backup buckets only. Document buckets follow the standard [backup and restore](./backup-restore-overview.md) process and are not part of the cross-region failover.

## Prepare for recovery

Before you can use cross-region cold recovery, ensure the following prerequisites are met:

- Dual-region backup is enabled when you create the cluster.
- The backup schedule is running and healthy. Backup interval will determine your expected RPO.
- Before starting failback, wait until Console indicates that backup synchronization is complete and failback is ready.
- Prepare the VPC infrastructure required to connect to a cluster in the recovery region. Pre-provisioning the required endpoints and security groups can reduce recovery time.
- After failover, re-establish private connectivity to the recovered cluster by creating or switching the regional VPC endpoint. This is the customer's responsibility.

## Fail over

Cross-region cold recovery is primarily designed for recovering from a primary-region outage, but you can also start failover proactively outside of a disaster recovery scenario, for example to move your cluster to a different region. Both cases follow the same cold recovery process, so the trade-offs described in [Limitations](#limitations) still apply, such as data loss since your last backup and the lack of an active-active or warm-standby configuration.

Follow these steps to fail over to your recovery region, restore a cluster from an available backup, and redirect client traffic to it:

1. Start failover in Console or API.
2. Select the backup to restore from those available in the recovery region.
3. Camunda creates a replacement cluster in the recovery region and prepares it to restore the selected backup.
4. (Optional) If your AWS cluster uses BYOK, configure the KMS key policies for the failover region. See [Restore external encryption](#restore-external-encryption).
5. Camunda copies and verifies the selected backup data before restore proceeds. You don't need to manually suspend or resume the target cluster during the restore process.
6. (Optional) If you use private connectivity on an AWS cluster, re-establish it to the recovered cluster. Use the endpoint service name shown in Console to create or switch your VPC endpoint.
7. Update your customer-managed DNS or routing configuration to direct client traffic to the recovered cluster.
8. Verify that your applications can connect to the recovered cluster and that requests are reaching it.

## Handle the original region after failover

After failover, use only the recovered cluster. The original cluster may still exist while the original region is unavailable. Even after the original region becomes reachable again, you cannot resume the original cluster or route traffic to it.

Camunda SaaS automatically attempts to suspend the original cluster when the region is reachable. This is a best-effort operation, so suspension might not happen immediately if the region or cluster remains unavailable. Console deletes the original cluster after a 30-day retention period.

:::warning Split-brain risk
Do not run both clusters at the same time. The original cluster may contain stale data and does not include changes made in the recovered cluster. Using it after failover can cause conflicting writes and data loss.
:::

## Restore private connectivity

This section applies only to AWS clusters that use private connectivity. If you don't use private connectivity, or your cluster is on GCP, skip this section.

You are responsible for establishing private connectivity to the recovered cluster. The secondary cluster runs in a different region with different VPC infrastructure.

### Prepare connectivity

To minimize your recovery time objective (RTO), pre-provision VPC infrastructure in the secondary region:

- VPC and security groups
- Private DNS configuration, if you're using Amazon Route 53 failover
- Any firewall rules or network policies

### Reconnect after failover

After failover:

1. Create or configure the VPC endpoint to use the recovered cluster's new endpoint service name.
2. Update DNS records or Amazon Route 53 failover rules to point to the new endpoint.
3. Test client connectivity before resuming application traffic.

Camunda does not create, manage, or modify customer VPC infrastructure.

## Restore external encryption

This section applies only to AWS clusters that use a customer-managed [Bring Your Own Key (BYOK)](/components/saas/byok/index.md) configuration. If you don't use BYOK, or your cluster is on GCP, skip this section.

You are responsible for configuring the KMS key policies for the recovered cluster.

### Configure the failover cluster's key

1. Open the failover cluster's **Encryption at rest** tab in Console.
2. Follow the instructions shown there to update the AWS KMS key policy for the failover region.

The failover cluster remains in a waiting state until this configuration is complete.

### Restore replication to the original region

If the original region is still unavailable, Console shows a warning that backup replication to that region isn't working. Update the KMS key policy for the original region once it's reachable to restore replication.

Camunda does not create, manage, or modify your AWS KMS keys or policies.

## Recovery objectives

You can configure a 15-minute backup schedule for the organization, but this schedule doesn't guarantee a 15-minute recovery point objective (RPO). The actual RPO depends on successful backup creation, completed replication, and the consistent restore point you select.

## After recovery

- Verify that the recovered cluster is serving traffic correctly.
- Treat the recovered cluster's primary backup bucket as the source for new backups while it is active.
- Before starting failback, wait for the backup bucket in the original region to be created and fully synchronized with the active cluster's primary backup bucket.
- Start failback only after the system reports that backup storage is ready.

## Limitations

- Cluster recovery from a backup restores only the Orchestration cluster state. It does not restore Intelligent Document Processing objects.
- Private connectivity must be re-established by the customer and is currently supported for AWS clusters only.
- Recovery is cold and creates a new cluster. It is not an active-active or warm-standby configuration.
- Failover and failback depend on backup replication and may be affected by replication lag.
- Failover requires at least one available backup in the recovery region. If none is available, failover cannot proceed.
- Bring Your Own Key (BYOK) failover is supported for AWS clusters only.
