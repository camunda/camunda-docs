---
id: cross-region-cold-recovery
title: Cross-region cold recovery
sidebar_label: Cross-region cold recovery
description: Recover an Orchestration Cluster in a secondary region from replicated backups.
---

:::warning Experimental feature
This recovery flow is currently:

- Not generally available and not part of any alpha release
- Subject to change before becoming generally available
  :::

Cross-region cold recovery creates a new Orchestration Cluster in a secondary AWS region and restores selected backup data after a primary-region outage. A warm standby cluster is not running before the outage.

## Restored data

The failover flow restores backup buckets only. Document buckets follow the standard [backup and restore](../concepts/backups.md) process and are not part of the cross-region failover.

## Prepare for recovery

Before you can use cross-region cold recovery, ensure the following prerequisites are met:

- Dual-region backup is enabled when you create the cluster.
- The backup schedule is running and healthy. Backup interval will determine your expected RPO.
- Before starting failback, wait until Console indicates that backup synchronization is complete and failback is ready.
- Prepare the VPC infrastructure required to connect to a cluster in the recovery AWS region. Pre-provisioning the required endpoints and security groups can reduce recovery time.
- After failover, re-establish private connectivity to the recovered cluster by creating or switching the regional VPC endpoint. This is the customer's responsibility.

## Fail over

1. Confirm that the primary region is unavailable and start failover in Console or API.
2. Select one or more backups available in the recovery region, and select the backup to restore.
3. Select one of those backups to restore.
4. Camunda creates a replacement cluster in the recovery region and prepares it to restore the selected backup.
5. Camunda copies and verifies the selected backup data before restore proceeds.
6. You don't need to manually suspend or resume the target cluster during the restore process.
7. Re-establish private connectivity to the recovered cluster. Use the endpoint service name shown in Console to create or switch your VPC endpoint.
8. Update your customer-managed DNS or routing configuration to direct client traffic to the recovered cluster.
9. Verify that your applications can connect to the recovered cluster and that requests are reaching it.

## Handle the original region after failover

After failover, use only the recovered cluster. The original cluster may still exist while the original region is unavailable. If the original region becomes reachable again, do not resume the original cluster or route traffic to it.

Camunda SaaS automatically attempts to suspend the original cluster when the region is reachable. This is a best-effort operation, so suspension might not happen immediately if the region or cluster remains unavailable. Console deletes the original cluster after a 30-day retention period.

:::warning Split-brain risk
Do not run both clusters at the same time. The original cluster may contain stale data and does not include changes made in the recovered cluster. Using it after failover can cause conflicting writes and data loss.
:::

## Restore private connectivity

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

## Recovery objectives

You can configure a 15-minute backup schedule for the organization, but this schedule doesn't guarantee a 15-minute recovery point objective (RPO). The actual RPO depends on successful backup creation, completed replication, and the consistent restore point you select.

## After recovery

- Verify that the recovered cluster is serving traffic correctly.
- Treat the recovered cluster's primary backup bucket as the source for new backups while it is active.
- Before starting failback, wait for the backup bucket in the original region to be created and fully synchronized with the active cluster's primary backup bucket.
- Start failback only after the system reports that backup storage is ready.

## Limitations

- Cluster recovery from a backup restores only the Orchestration cluster state. It does not restore Intelligent Document Processing objects.
- Private connectivity must be re-established by the customer.
- Recovery is cold and creates a new cluster. It is not an active-active or warm-standby configuration.
- Failover and failback depend on backup replication and may be affected by replication lag.
