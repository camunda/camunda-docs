---
id: upgrade
sidebar_label: Upgrade
title: Camunda manual upgrade on local machine
---

Before performing any upgrade, always take a **full backup** using the Camunda [backup procedure](/self-managed/operational-guides/backup-restore/backup-and-restore.md). For **patch upgrades**, this is **endorsed**, while for **minor version upgrades**, it is **strongly recommended** to ensure you can restore your environment in case of any issues.

Upgrading between **minor versions** may require configuration changes. Always consult the [component upgrade guide](/self-managed/components/components-upgrade/introduction.md) to review changes between minor versions. The guide also links to the **release changelog** for the specific version you are upgrading to.

Additionally, follow the [update procedure](/self-managed/components/components-upgrade/introduction.md#update-procedure) carefully to ensure that **no minor versions are skipped** during the upgrade process.

1. **Backup your configuration**
   If you are overwriting the `application.yaml` with your own definition, make a copy first to avoid accidental loss.

2. **Stop the application**
   Since upgrades involve manual interaction with the packages (unlike Docker/Kubernetes image replacement), stop Camunda before proceeding. This prevents potential disruption of its capabilities during the upgrade.

3. **Clean the libraries**
   For **any upgrade**, delete the `lib/` folder to ensure only the libraries corresponding to the target Camunda release remain in the classpath. Leaving old libraries may cause **class version conflicts** and increased disk usage.

4. **Apply the upgrade**
   Replace the files with the downloaded upgrade version.

5. **Restart Camunda**
   Ensure that your `application.yaml` is restored or the necessary environment variables are set again before starting.
