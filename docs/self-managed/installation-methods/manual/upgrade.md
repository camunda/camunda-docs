---
id: upgrade
sidebar_label: Upgrade
title: Manually upgrade a local Camunda installation
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './assets/\_upgrade-card-data';

This page explains how to manually upgrade a local, Self-Managed Camunda installation from an archive distribution. Use this guide if you unpacked a previous version locally and now need to move to a newer patch or minor version.

:::note
For Docker or Kubernetes upgrades, see the respective guides.
:::

## Upgrade overview

<ZeebeGrid zeebe={overviewCards} />

## Prerequisites

- Administrative access to the machine running Camunda.
- Sufficient disk space to hold both the existing installation and the new archive during the upgrade.

## Upgrade plan

1. Identify your current version (for example, from the logs or the `README.txt` file, if present).
2. Determine the target version.
3. Confirm the upgrade path does not skip a minor version. If it does, perform intermediate upgrades first. See the [update procedure](/self-managed/components/components-upgrade/introduction.md#update-procedure).
4. Review the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) for each involved component (Zeebe, Operate, Tasklist, etc.) and apply any required configuration changes or remove deprecated settings.
5. Read the [release changelog](/reference/announcements-release-notes/overview.md) for behavioral changes.
6. Verify you meet any version-specific prerequisites described in the component upgrade documentation before starting.

## Back up

Take a full backup before upgrading. See the [backup procedure](/self-managed/operational-guides/backup-restore/backup.md) for steps.

- **Patch upgrades**: A backup is recommended, although component upgrades are usually straightforward.
- **Minor upgrades**: A backup is strongly recommended because schema or configuration changes may be involved, and there is no direct way to roll back without one.

Also back up any locally modified configuration files (for example, copy `application.yaml` to `application.yaml.bak`).

## Run the upgrade

### 1. Stop Camunda

Gracefully stop Camunda on the machine you want to upgrade before replacing files. Because upgrades replace files in-place, leaving the system running can cause errors during the upgrade.

### 2. Prepare a clean target directory

In the current installation directory, delete the `lib/` folder. This prevents orphaned JAR files from causing class version conflicts and wasting disk space.

### 3. Apply the upgrade

1. Download and unpack the new Camunda version archive over the old version folder.
2. Merge and adjust any changes in the `application.yaml` file.

:::tip
You can also unpack Camunda into a separate folder and move files over individually.

Be sure to preserve:

- The `data` folder, which contains Zeebe partition data.
- The `config` folder, which may include custom configuration files.

For minor upgrades, the `config` folder may also need to be merged with upstream changes.
:::

### 4. Start Camunda

1. Start Camunda.
2. Monitor startup logs for:
   - Deprecation or migration warnings.
   - Errors related to configuration keys.

## Repeat for all installations

Repeat the steps in [run the upgrade](#run-the-upgrade) for all manual Camunda installations that are part of the same orchestration cluster. The same approach applies when upgrading connectors.

## Roll back

Camunda does not support direct rollbacks between minor versions.
To downgrade to a different minor version, restore the latest backup of your previous version using the [restore procedure](/self-managed/operational-guides/backup-restore/restore.md).
