---
id: backup-and-restore
title: Back up and restore
sidebar_label: Back up and restore
description: "Learn how backups and restores work across Camunda 8 Self-Managed components, including when to use hot or cold backups."
keywords: ["backup", "restore", "recovery", "self-managed"]
---

Use backup and restore procedures to protect data across your **Camunda 8 Self-Managed** components and ensure recoverability after data loss, corruption, or migration.

## Overview

Camunda 8 stores data across several independent components:

| Component              | Storage           | Description                                                 |
| ---------------------- | ----------------- | ----------------------------------------------------------- |
| **Zeebe**              | Primary storage   | Executes workflows and stores partition data.               |
| **Operate / Tasklist** | Secondary storage | Exported workflow and task data for visualization and APIs. |
| **Optimize**           | Secondary storage | Analytics and metrics across processes and decisions.       |
| **Identity**           | External          | Manages authentication; not part of backups.                |

A consistent backup must include **all components** under the same backup ID and within the same backup window.

:::warning Consistency requirement
All Camunda components must be backed up under the **same backup ID** and **within the same time window**.  
Running or restoring backups out of sync may cause data inconsistencies or unrecoverable states.
:::

## Why backups matter

Each Camunda component writes to different datastores and indices. To ensure a coherent recovery point, initiate backups through the components’ APIs rather than taking direct snapshots of storage or Elasticsearch/OpenSearch indices.

This guarantees that:

- Zeebe partition data aligns with exported records.
- Operate, Tasklist, and Optimize can restore consistent views.
- Restored environments reflect accurate process and decision histories.

## Backup types

Camunda supports two backup strategies:

| Type               | Downtime | Description                                            | When to use                                        |
| ------------------ | -------- | ------------------------------------------------------ | -------------------------------------------------- |
| **Standard (hot)** | None     | Backups occur while all components remain operational. | Default for production.                            |
| **Cold**           | Required | Backups occur while components are stopped.            | For migrations or environments without automation. |

:::note
Standard (hot) backups are recommended for most setups.  
Cold backups are only required when downtime is acceptable or external orchestration is needed.
:::

## Backup sequence and dependencies

Backup and restore operations must follow a strict order:

| Step | Component              | Role                                        |
| ---- | ---------------------- | ------------------------------------------- |
| 1    | **Zeebe**              | Primary source of truth for workflow state. |
| 2    | **Operate / Tasklist** | Mirrors Zeebe records for visualization.    |
| 3    | **Optimize**           | Aggregates historical and decision data.    |
| 4    | **Identity**           | Not backed up; must reconnect post-restore. |

:::warning Restore dependency
Always restore **Zeebe first**, followed by **Operate / Tasklist**, then **Optimize**.  
Starting web applications before Zeebe is restored can result in crash loops.
:::

## Prerequisites

Before performing any backup or restore:

| Prerequisite                 | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| **Snapshot repository**      | Configure repositories in Elasticsearch or OpenSearch.                          |
| **Backup locations**         | Define backup storage for Zeebe, Operate, Tasklist, and Optimize.               |
| **Consistent configuration** | Ensure repository names, `indexPrefix`, and backup IDs match across components. |
| **Access permissions**       | Grant read/write privileges to snapshot repositories.                           |
| **Identity dependency**      | Confirm Identity reconnects correctly after restore.                            |

For setup details, see:

- [Zeebe backup configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackup)
- [Operate backup configuration](/self-managed/components/orchestration-cluster/operate/operate-configuration.md#backups)
- [Tasklist backup configuration](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#backups)
- [Optimize backup configuration](/self-managed/components/optimize/configuration/system-configuration.md#elasticsearch-backup-settings)

## Cloud provider specifics

The procedure is identical across providers; only storage setup differs.

:::note Cloud storage configuration

- **AWS:** Use S3 with IRSA-based access for Elasticsearch/OpenSearch.
- **Azure:** Use Blob Storage with a managed identity.
- **GCP:** Use a service account with `roles/storage.admin` for GCS.
  :::

## Verification

A backup or restore is complete only after verification:

- Use each component’s management API to confirm backup state is `COMPLETED`.
- After restore, verify in **Operate** that:
  - Process and decision definitions are visible.
  - Historical instances are restored.
  - Tasklist and Optimize show synchronized data.

:::tip
Include both API checks and visual inspection as part of your automated validation workflow.
:::

## Next steps

- [Create a backup](./backup.md)
- [Restore a backup](./restore.md)
- [Perform a cold backup](./cold-backup.md) _(optional)_
