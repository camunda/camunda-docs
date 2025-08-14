---
id: upgrade
sidebar_label: Upgrade
title: Manually upgrade Camunda on a local machine
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './assets/\_upgrade-card-data';

This page explains how to perform a manual (archive-based) upgrade of a local, self-managed Camunda installation (downloaded distribution, not Docker or Kubernetes). Use it when you unpacked a previous Camunda version locally and now need to move to a newer patch or minor version.

## At a glance

<ZeebeGrid zeebe={overviewCards} />

## Prerequisites

- Administrative access to the machine running Camunda.
- Sufficient disk space to hold both the existing installation and the new archive during the swap.

## Plan

1. Identify your current version (for example via logs or the `README.txt` file, if present).
2. Determine the target version.
3. Confirm the path does not [skip a minor version](/self-managed/components/components-upgrade/introduction.md#update-procedure). If it does, do intermediate upgrades first.
4. Review the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) for each involved component (Zeebe, Operate, Tasklist, etc.) and execute required config changes or deprecated settings.
5. Read the [release changelog](/reference/announcements-release-notes/overview.md) for behavioral changes.
6. Always verify you meet any version-specific prerequisites described in the component upgrade documentation before starting.

## Back up

Take a **full backup** following the [backup procedure](/self-managed/operational-guides/backup-restore/backup.md).

- Patch upgrades: Backup is endorsed but component upgrades often straightforward.
- Minor upgrades: Backup is strongly recommended because schema/config changes are involved with no direct way to rollback outside of backups.

Also back up any locally modified configuration files (for example, copy `application.yaml` to `application.yaml.bak`).

## Execute

### 1. Stop Camunda

Gracefully stop Camunda on the machine you want to upgrade before manipulating files. Upgrades replace files in-place; leaving the system running can cause problems.

### 2. Prepare a clean target directory

In the current installation directory, delete the `lib/` folder. This prevents orphaned JARs from causing class version conflicts and wasting disk space.

### 3. Apply the upgrade

1. Download and unpack the new Camunda version archive over the old version folder.
2. While doing so merge and adjust potential changes in the `application.yaml`.

:::tip

You could also unpack Camunda into a separate folder and move files over individually.
It is especially important to preserve the `data` folder, as it contains the Zeebe partition data, and the `config` folder, which may include manually adjusted configuration files and may require merging with upstream config changes or minor version config adjustments.

:::

### 4. Start

1. Start Camunda.
2. Monitor startup logs for:
   - Deprecation or migration warnings.
   - Errors related to configuration keys.

## Repeat

Repeat the steps outlined in [Execute](#execute) for all manual Camunda installations that are part of the same Orchestration Cluster.

The same approach applies when upgrading Connectors.

## Rollback

Camunda does not support direct rollbacks between minor versions. To downgrade to a different minor version, use the latest backup of your previous version and follow the [restore procedure](/self-managed/operational-guides/backup-restore/restore.md).
