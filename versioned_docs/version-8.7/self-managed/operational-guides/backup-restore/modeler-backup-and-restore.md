---
id: modeler-backup-and-restore
title: Backup and restore Web Modeler data
description: "How to perform a backup and restore of Web Modeler data."
keywords: ["backup", "backups"]
---

## Create backup

To create a backup of Web Modeler data, you must back up the database that Web Modeler uses by following the instructions of the official [PostgreSQL documentation](https://www.postgresql.org/docs/current/backup-dump.html).

For example, to create a backup of the database using `pg_dumpall`, use the following command:

```bash
pg_dumpall -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql --quote-all-identifiers
Password: <DATABASE_PASSWORD>
```

`pg_dumpall` may ask multiple times for the same password.
The database will be dumped into `dump.psql`.

:::note
Database dumps created with `pg_dumpall`/`pg_dump` can only be restored into a database with the same or later version of PostgreSQL, see [PostgreSQL documentation](https://www.postgresql.org/docs/current/app-pgdump.html#PG-DUMP-NOTES).
:::

## Restore

Backups can only be restored with downtime.
To restore the database dump, first ensure that Web Modeler is stopped.
Then, to restore the database use the following command:

```bash
psql -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql <DATABASE_NAME>
```

After the database has been restored, you can start Web Modeler again.

:::danger
When restoring Web Modeler data from a backup, ensure that the ids of the users stored in your OIDC provider (e.g. Keycloak) do not change in between the backup and restore.
Otherwise, users may not be able to access their projects after the restore (see [Web Modeler's troubleshooting guide](self-managed/modeler/web-modeler/troubleshooting/troubleshoot-missing-data.md)).
:::

:::tip
Some vendors provide tools that help with database backups and restores, such as [AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/) or [Cloud SQL backups](https://cloud.google.com/sql/docs/postgres/backup-recovery/backups).
:::
