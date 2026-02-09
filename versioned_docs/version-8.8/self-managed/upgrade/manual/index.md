---
id: index
sidebar_label: Manual upgrade
title: Manually upgrade a local Camunda installation
description: Manually upgrade a local, Self-Managed Camunda installation from an archive distribution.
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './assets/\_upgrade-card-data';

Upgrade a local, Self-Managed Camunda installation that was deployed from an archive distribution.

This guide applies to patch and minor version upgrades when Camunda is installed directly on a machine and managed manually.

## Upgrade overview

<ZeebeGrid zeebe={overviewCards} />

## Before you begin

Make sure you have the following:

- Administrative access to the machine running Camunda.
- Enough disk space to store both the existing installation and the new archive during the upgrade.
- A supported upgrade path that does not skip a minor version.

## Plan the upgrade

Before making any changes:

1. Identify the currently running Camunda version (for example, from startup logs or a `README.txt` file).
1. Identify the target version you want to upgrade to.
1. Confirm that the upgrade path does not skip a minor version. If it does, perform the required intermediate upgrades first. See [Upgrading from an earlier version](/self-managed/upgrade/overview.md#upgrading-from-an-earlier-version).
1. Review the component upgrade guide for any component-specific changes that apply to your setup. See [Upgrade Camunda components](/self-managed/upgrade/components/index.md).
1. Review the relevant release notes for behavioral changes or removed configuration options. See [Release notes overview](/reference/announcements-release-notes/overview.md).

## Back up your installation

Always take a full backup before upgrading.

See [Back up Camunda](/self-managed/operational-guides/backup-restore/backup.md) for detailed steps.

- **Patch upgrades**: A backup is recommended.
- **Minor upgrades**: A backup is strongly recommended, as schema or configuration changes may be involved.

Also back up any locally modified configuration files, for example:

```bash
cp application.yaml application.yaml.bak
```

## Run the upgrade

### Step 1: Stop Camunda

Stop all running Camunda processes on the machine before replacing files.

Upgrades replace files in place. Leaving Camunda running can result in corrupted or partially applied upgrades.

### Step 2: Clean up the existing installation

In the current installation directory, remove the `lib/` folder.

This prevents orphaned JAR files from older versions from causing classpath conflicts after the upgrade.

### Step 3: Apply the new version

1. Download the archive for the target Camunda version.
1. Extract the archive over the existing installation directory.
1. Review and merge changes in `application.yaml`.

As an alternative, you can extract the new version into a separate directory and copy files over manually.

Make sure you preserve:

- The `data/` directory, which contains Zeebe partition data.
- The `config/` directory, which contains your configuration files.

When upgrading, merge any new default configuration options introduced in the target version.

### Step 4: Start Camunda and verify

1. Start Camunda.
1. Monitor the startup logs and verify that:
   - No configuration errors occur.
   - Any migration or deprecation warnings are understood and addressed.

## Upgrade additional installations

If your environment includes multiple manual Camunda installations (for example, multiple nodes or connectors), repeat the same upgrade steps for each installation.

## Roll back

Camunda does not support rolling back to a previous minor version.

If you need to revert an upgrade, restore the latest backup using the [restore procedure](/self-managed/operational-guides/backup-restore/restore.md).
