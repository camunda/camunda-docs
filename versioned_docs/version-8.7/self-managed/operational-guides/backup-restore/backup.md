---
id: backup
title: "Create a backup"
sidebar_label: "Create a backup"
keywords: ["backup", "backups"]
description: "Learn how to back up your Camunda 8 Self-Managed components."
---

## About creating a backup

## Back up Web Modeler data

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
