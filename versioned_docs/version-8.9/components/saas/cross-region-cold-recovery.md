---
id: cross-region-cold-recovery
title: Cross-region cold recovery
sidebar_label: Cross-region cold recovery
description: Recover an LPL AWS-hosted Orchestration Cluster in a secondary region from replicated backups.
---

:::warning Experimental, LPL and AWS only
This recovery flow is currently:

- Not generally available and not part of any alpha release
- Limited to LPL customers on AWS
- Subject to change before becoming generally available

This does not constitute a Camunda SaaS disaster recovery guarantee for other customers.
:::

Cross-region cold recovery creates a new Orchestration Cluster in a secondary AWS region and restores selected backup data after a primary-region outage. A warm standby cluster is not running before the outage.

## Restored data

The failover flow restores backup buckets only. Document buckets follow the standard [backup and restore](./backups.md) process and are not part of the cross-region failover.

## Prepare for recovery

Before you can use cross-region cold recovery, ensure the following prerequisites are met:

- Dual-region backup is enabled when you create the cluster.
- The backup schedule is running and healthy. A 15-minute cadence is recommended.
- Backup replication is complete. Verify `BackupStorageReady=True` on the cluster.
- VPC infrastructure in the secondary region is pre-provisioned. This setup is recommended but not required.

## Fail over

1. Confirm that the primary region is unavailable and initiate failover in Console.
2. Select one or more backups to copy to the secondary region, and select the backup you want to restore.
3. Console creates the target cluster and submits the required restore resources.
4. Camunda copies and verifies the selected backup data before restore proceeds.
5. You don't need to manually suspend or resume the target cluster during the restore process.
6. Verify the recovered cluster and redirect traffic to it.

You are responsible for re-establishing private connectivity to the recovered cluster. Traffic is not considered restored until the required customer-managed network configuration is working.

## Handle the original region

When the original region becomes available again:

1. The Camunda Operator automatically attempts to suspend the old cluster. This is best effort and works only if the region is reachable.
2. Console deletes the old cluster after the 30-day retention period.

:::warning Split-brain risk
If the original region recovers while the secondary is serving traffic, do not resume the old cluster. The old cluster doesn't contain data written to the secondary cluster after failover and therefore contains stale data.

The old cluster is deleted automatically by Console. If automatic deletion fails, contact Camunda support to ensure the cluster is removed.
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

- This flow is currently limited to LPL and AWS-hosted clusters.
- It restores backup buckets only. Document buckets are excluded.
- Private connectivity must be re-established by the customer.
- Recovery is cold and creates a new cluster. It is not an active-active or warm-standby configuration.
- Failover and failback depend on backup replication and may be affected by replication lag.
