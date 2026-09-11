---
id: version-upgrade
title: "Version upgrade"
sidebar_label: "Version upgrade"
description: "The principles of how the Camunda Hub (Self-Managed) application upgrades between versions."
---

This page explains the principles of how Camunda Hub upgrades from one version to another. For a practical guide on how to perform a Camunda version upgrade, consult the [upgrade guide](/self-managed/upgrade/index.md).

For a single instance of the Hub application, a version upgrade — whether between patch or minor versions — involves the following steps:

1. The current version stops
2. The new version starts
3. The new version applies any migrations to the database schema
4. HTTP traffic and background operations resume; the Hub application is fully functional again

## Upgrading the application

Upgrading the application requires starting the new version's executable, pointing it at the same database the old version used.

:::info
We strongly recommend taking a database backup before performing a version upgrade. If the migration does not complete successfully, a backup lets you restore the previous version's data. See [backup and restore](/self-managed/concepts/databases/relational-db/rdbms-setup-guide.md#step-7-backup-and-restore) for guidance on backing up the Camunda Hub database.
:::

## Database migration

Camunda Hub uses [Flyway](https://www.red-gate.com/products/flyway/community/) to migrate its database schema from one version to another. It applies changes incrementally, determined automatically from the specific version gap.

The migration is performed during application startup, before any HTTP traffic is served.

You can observe the applied changes and their progress in the application logs. Here is an example excerpt:

```text
[2026-09-11 15:05:05.794] [main] INFO
	org.flywaydb.core.internal.command.DbValidate - Successfully validated 167 migrations (execution time 00:00.116s)
[2026-09-11 15:05:05.808] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Current version of schema "public": 20260826.3
[2026-09-11 15:05:06.401] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Migrating schema "public" to version "20260827.1 - create hub projects and backfill"
[2026-09-11 15:05:06.427] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Migrating schema "public" to version "20260827.2 - drop process applications"
[2026-09-11 15:05:06.443] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Migrating schema "public" to version "20260827.3 - add hub project id indexes" [non-transactional]
[2026-09-11 15:05:06.460] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Migrating schema "public" to version "20260827.4 - add migration diff indexes" [non-transactional]
[2026-09-11 15:05:06.487] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Migrating schema "public" to version "20260828 - drop milestones legacy pa version fk idx and columns"
[2026-09-11 15:05:06.501] [main] INFO
	org.flywaydb.core.internal.command.DbMigrate - Successfully applied 33 migrations to schema "public", now at version v20260828 (execution time 00:00.380s)
```

Flyway logs initially which version the schema is on, then which migrations are applied, and lastly the outcome of the migration. Following these logs allows you to understand how far migration has advanced and whether it was successful. If migration fails, then the application will exit and not serve any traffic.

Since migration runs during application startup, the [readiness and liveness probes](/self-managed/components/hub/monitoring.md#restapi) only report healthy once the application has fully started — which happens only after migration completes successfully. If migration fails, the application exits before the probes become reachable at all. If you employ automated liveness checks that can trigger application restarts, take into account that database migrations can run for a time that exceeds your liveness probe's timeout. This depends on the concrete version gap as well as the size and resources of your database. We recommend performing a migration on a test system of similar specification if you believe an upgrade will be timing-sensitive.

Only one application instance needs to perform the database migration. Once the schema is migrated, any number of instances can work with it. To avoid that multiple instances of the application attempt the migration at the same time, Flyway acquires a pessimistic database lock before starting the migration. If two application instances attempt the migration at the same time, then the first one will acquire the lock and proceed with the migration procedure. The second one will block on the lock until the first instance has completed the migration.

## Rolling upgrades

Often, Hub's database migrations are backwards compatible, meaning that an old application version can temporarily keep working with the new database schema. This allows performing a rolling upgrade, where multiple instances of Hub are running in parallel and they migrate to the new version one after the other, so that some instances keep serving traffic at all times.

The [component upgrade guide](/self-managed/upgrade/components/index.md) informs whether the Hub upgrade between two specific minor versions requires downtime or can be performed in a rolling fashion. Make sure to review the guide before performing an upgrade between minor versions. If your upgrade spans multiple minor versions, make sure to consult the guide for all minor versions. For example, if you upgrade from version 8.8 to 8.10, read the upgrade guide from version 8.8 to 8.9, and the guide from version 8.9 to 8.10.
