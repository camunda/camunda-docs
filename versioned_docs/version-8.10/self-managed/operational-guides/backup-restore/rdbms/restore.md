---
id: rdbms-restore
title: "Restore a backup (RDBMS)"
sidebar_label: "Restore a backup"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "rdbms",
    "postgresql",
    "mariadb",
    "oracle",
    "sql server",
    "mysql",
    "time range restore",
    "point in time restore",
    "backup range",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup using a relational database, including all restore options and RDBMS-aware restore."
---

import ZeebeGrid from '../../../../components/zeebe/react-components/\_zeebe-card';
import { rdbmsRestoreApproachCards } from '../react-components/\_card-data';

Restore a previous backup of your Camunda 8 Self-Managed Orchestration cluster components (Zeebe, Operate, Tasklist, and Admin) when using a relational database management system (RDBMS) as secondary storage.

## Choosing a restore approach

Restore the Zeebe partitions with one of two approaches. In both, you restore the RDBMS with your database vendor's native tools, and Camunda aligns the Zeebe restore point with it.

<ZeebeGrid zeebe={rdbmsRestoreApproachCards} />

:::tip
This procedure is the recovery step of [Cold Recovery](../../../concepts/multi-region/cold-recovery.md) when restoring into a secondary region after primary-region loss.
:::

## How RDBMS restore works

As described in the [architecture overview](./backup.md#architecture-overview), backups involve two independent systems: **primary storage backups** (Zeebe's log stream and snapshots in a blob store) and the **secondary storage backup** (the RDBMS).

During restore, Zeebe reads the **exporter position** from the restored RDBMS — the last log stream position that was successfully exported — and uses it to determine which primary storage backup, or backups, to restore from. This ensures that Zeebe's state is at least as advanced as what the RDBMS contains. After restart, Zeebe re-exports any events between the RDBMS position and its restored checkpoint position, bringing the secondary storage up to date.
