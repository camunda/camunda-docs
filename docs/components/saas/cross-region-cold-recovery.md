---
id: cross-region-cold-recovery
title: Cross-region cold recovery
sidebar_label: Cross-region cold recovery
description: Recover an LPL AWS-hosted orchestration cluster in a secondary region from replicated backups.
---

:::warning Experimental, LPL and AWS only
This recovery flow is currently:

- Not generally available and not part of any alpha release
- Limited to LPL customers on AWS
- Subject to change before becoming generally available

This does not constitute a Camunda SaaS disaster recovery guarantee for other customers.
:::

Cross-region cold recovery creates a new orchestration cluster in a secondary AWS region and restores selected backup data after a primary-region outage. A warm standby cluster is not running before the outage.

## What is restored

The failover flow restores backup buckets only. Document buckets follow the standard [backup and restore](./backup-restore-overview.md) process and are not part of the cross-region failover.

## Prerequisites

Before you can use cross-region cold recovery:

1. Dual-region backup enabled at cluster creation time
2. Backup schedule running and healthy (15-minute cadence recommended)
3. Backup replication complete (verify `BackupStorageReady=True` on the cluster)
4. Secondary region VPC infrastructure pre-provisioned (recommended, not required)

## Failover flow

1. Confirm that the primary region is unavailable and initiate failover in Console.
2. Select the backups to copy and the backup to restore.
3. Console creates the target cluster and submits the required restore resources.
4. Camunda copies and verifies the selected backup data before restore proceeds.
5. The restore process manages the target cluster's suspended state automatically.
6. Verify the recovered cluster and redirect traffic to it.

You are responsible for re-establishing private connectivity to the recovered cluster. Traffic is not considered restored until the required customer-managed network configuration is working.

## Handling the original region after recovery

When the original region recovers:

1. Operator suspends the old cluster on a best-effort basis (if the region is reachable)
2. Console deletes the old cluster after a 30-day retention window

:::warning Split-brain risk
If the original region recovers while the secondary is serving traffic, do not resume the old cluster. It has no knowledge of data written to the secondary cluster after failover and represents stale state.

The old cluster is deleted automatically by Console. If automatic deletion fails, contact Camunda support to ensure the cluster is removed.
:::

## Establishing connectivity to the recovered cluster

Private connectivity to the recovered cluster is customer's responsibility. The secondary cluster runs in a different region with different VPC infrastructure.

### Pre-failover setup (recommended)

To minimize RTO, pre-provision VPC infrastructure in the secondary region:

- VPC and security groups
- Private DNS setup (if using Route53 failover)
- Any firewall rules or network policies

### Post-failover connectivity

After failover:

1. Create or configure the VPC endpoint to the recovered cluster's new endpoint service name
2. Update DNS records or Route53 failover rules to point to the new endpoint
3. Test client connectivity before resuming application traffic

Camunda does not create, manage, or modify customer VPC infrastructure.

## Recovery objectives

A 15-minute backup schedule can be configured for the relevant organization, but this does not by itself establish a 15-minute RPO. RPO depends on successful backup creation, replication completion, and the selected consistent restore point.

## After recovery

- Verify the recovered cluster is serving traffic correctly
- Monitor backup replication on the recovered cluster (becomes the new active)
- Allow the secondary bucket to synchronize on the recovered cluster before attempting failback
- Plan for failback using the same symmetric process (failover to the original region with its latest backups)

## Limitations

- This flow is currently limited to LPL and AWS-hosted clusters.
- It restores backup buckets only, document buckets are excluded.
- Private connectivity must be re-established by the customer.
- Recovery is cold and creates a new cluster. It is not an active-active or warm-standby configuration.
- Failover and failback depend on backup replication and may be affected by replication lag.
