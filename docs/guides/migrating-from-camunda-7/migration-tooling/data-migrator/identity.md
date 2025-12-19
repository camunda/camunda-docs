---
id: identity
title: Identity migration (experimental)
sidebar_label: Identity migration
description: "Migrate identity data to Camunda 8."
---

Migrate identity data.

:::info
The identity migration mode of the Data Migrator is in an early development stage and will **not be released before Camunda 8.9 (April 2026)**. You can check the current state and track progress in the [GitHub repository](https://github.com/camunda/camunda-7-to-8-migration-tooling/).
:::

## About identity migration

Identity data refers to:

- Identities (users, groups and tenants).
- Authorizations.

## Requirements and limitations

As of today, the following requirements and limitations apply:

- The experimental feature **only** includes the migration of tenants (not including tenant memberships).
- Migration for other identity entities as well as retrying skipped entities are not yet implemented.
- Once migration has been triggered, it's strongly recommended not to create new identity data on Camunda 7. Even if migration is attempted again, the new data might not be migrated.

## Usage examples

```bash
# Run identity migration (experimental)
./start.sh --identity
```
