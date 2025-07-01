---
id: restore
title: "Restore a backup"
sidebar_label: "Restore a backup"
keywords: ["backup", "backups", "restore"]
description: "Learn how to restore a Camunda 8 Self-Managed backup."
---

## About restoring a backup

## Restore a Web Modeler data backup

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
