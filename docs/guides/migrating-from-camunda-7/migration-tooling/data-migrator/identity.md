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

- Identities (users, groups, tenants and related memberships).
- Authorizations.

## Requirements and limitations

As of today, the following requirements and limitations apply:

- The experimental feature **only** includes the migration of:
  - Tenants (temporarily excluding tenant memberships)
  - Some authorizations.
- Migration for other identity entities as well as retrying skipped entities are either not yet implemented or not supported (detailed in the [Supported entities](#supported-entities) section below).
- Once migration has been triggered, it's strongly recommended not to create new identity data on Camunda 7. Even if migration is attempted again, the new data might not be migrated.

## Supported entities

### Identities

| Identity type      | Migration supported |
| ------------------ | ------------------- |
| Users              | Yes                 |
| Groups             | Not yet             |
| Tenants            | Not yet             |
| Group Memberships  | Not yet             |
| Tenant Memberships | Not yet             |

### Authorizations

Not all authorizations can be migrated from Camunda 7 to Camunda 8 due to differences in the authorization models of both systems.

When identity migration is executed, authorizations that are not supported are skipped and the reason for incompatibility is logged by the migrator. If an authorization contains at least one unsupported permission, the whole authorization is skipped.

The following tables provide an overview of the supported authorizations.

#### By Authorization Type

Camunda 8 only supports `GRANT` authorizations. `REVOKE` and `GLOBAL` authorizations from Camunda 7 are not supported for migration.

Because in Camunda 7 `GRANT` authorizations take precedence over `REVOKE` authorizations, skipping (and therefore ignoring) `REVOKE` authorizations does not lead to a loss of effective permissions when migrating to Camunda 8.

| Authorization Type | Migration supported |
| ------------------ | ------------------- |
| `GRANT`            | Yes                 |
| `REVOKE`           | No                  |
| `GLOBAL`           | No                  |

#### By Resource Type

| C7 Resource Type                   | Migration supported                             | C8 Resource Type equivalent        |
| ---------------------------------- | ----------------------------------------------- | ---------------------------------- |
| `Application`                      | Yes                                             | `Component`                        |
| `Authorization`                    | [Partial\*](#authorization-compatibility)       | `Authorization`                    |
| `Batch`                            | [Partial\*](#batch-compatibility)               | `Batch`                            |
| `Dashboard`                        | No                                              | -                                  |
| `Decision Definition`              | [Partial\*](#decision-definition-compatibility) | `Decision Definition`              |
| `Decision Requirements Definition` | Yes                                             | `Decision Requirements Definition` |
| `Deployment`                       | Not yet                                         | -                                  |
| `Filter`                           | No                                              | -                                  |
| `Group`                            | Yes                                             | `Group`                            |
| `Group Membership`                 | [Partial\*](#group-membership-compatibility)    | `Group`                            |
| `Historic Process Instance`        | No                                              | -                                  |
| `Historic Process Instance`        | No                                              | -                                  |
| `Historic Task`                    | No                                              | -                                  |
| `Process Definition`               | [Partial\*](#process-definition-compatibility)  | `Process Definition`               |
| `Process Instance`                 | No                                              | -                                  |
| `Report`                           | No                                              | -                                  |
| `System`                           | [Partial\*](#system-compatibility)              | `System`                           |
| `Task`                             | No                                              | -                                  |
| `Tenant`                           | Yes                                             | `Tenant`                           |
| `Tenant Membership`                | [Partial\*](#tenant-membership-compatibility)   | `Tenant`                           |
| `User`                             | Yes                                             | `User`                             |
| `User Operation Log Category`      | No                                              | -                                  |

Details for partial migration can be found below.

## Partial migration

Some resource types only support partial migration due to differences in the Camunda 7 and Camunda 8 authorization models, which means some permissions (or some combination of permissions) are not supported for migration. The following sections provide details on the supported permissions for these resource types.

### `Authorization` compatibility

In Camunda 7, authorizations for `Authorization` resources can be fine-grained to specific resource IDs (`authorizationId`). Camunda 8 only supports the wildcard (`*`) resource ID for the `Authorization` type. Therefore, only authorizations with the wildcard resource ID are migrated.

Migration support for individual permissions:

| C7 Permission | Migration supported | C8 Permission equivalent             |
| ------------- | ------------------- | ------------------------------------ |
| `READ`        | Yes                 | `READ`                               |
| `UPDATE`      | Yes                 | `UPDATE`                             |
| `CREATE`      | Yes                 | `CREATE`                             |
| `DELETE`      | Yes                 | `DELETE`                             |
| `ALL`         | Yes                 | `READ`, `UPDATE`, `CREATE`, `DELETE` |

### `Batch` compatibility

In Camunda 7, authorizations for `Batch` resources can be fine-grained to specific resource IDs (`batchId`). Camunda 8 only supports the wildcard (`*`) resource ID for the `Batch` type. Therefore, only authorizations with the wildcard resource ID are migrated.

| C7 Permission                                     | Migration supported | C8 Permission equivalent                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `READ`                                            | Yes                 | `READ`                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `UPDATE`                                          | Yes                 | `UPDATE`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `CREATE`                                          | Yes                 | `CREATE`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `DELETE`                                          | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `READ_HISTORY`                                    | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `DELETE_HISTORY`                                  | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_MIGRATE_PROCESS_INSTANCES`          | Yes                 | `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_MODIFY _PROCESS_INSTANCES`          | Yes                 | `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`                                                                                                                                                                                                                                                                                                                                                                                            |
| `CREATE_BATCH_RESTART_PROCESS_INSTANCES`          | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_DELETE_RUNNING_PROCESS _INSTANCES`  | Yes                 | `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`                                                                                                                                                                                                                                                                                                                                          |
| `CREATE_BATCH_DELETE_FINISHED_PROCESS _INSTANCES` | Yes                 | `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`                                                                                                                                                                                                                                                                                                                                                                                            |
| `CREATE_BATCH_DELETE_DECISION_INSTANCES`          | Yes                 | `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_SET_JOB_RETRIES`                    | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_SET_REMOVAL_TIME`                   | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_SET_EXTERNAL_TASK_RETRIES`          | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_UPDATE_PROCESS_INSTANCES _SUSPEND`  | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CREATE_BATCH_SET_VARIABLES`                      | No                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ALL`                                             | Yes                 | `CREATE`, `READ`, `UPDATE`, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_RESOLVE_INCIDENT`, `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_DECISION_DEFINITION`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_DEFINITION`, |

### `Group Membership` compatibility

The `Group Membership` resource type does not exist in Camunda 8, but its functionality is covered by the `Group` resource type in combination with the `UPDATE` permission. However, only the `ALL` permission from Camunda 7 is supported for migration, as individual `CREATE` and `DELETE` permissions would result in a more permissive authorization.

| C7 Permission | Migration supported | C8 Resource Type equivalent | C8 Permission equivalent |
| ------------- | ------------------- | --------------------------- | ------------------------ |
| `CREATE`      | No                  | -                           | -                        |
| `DELETE`      | No                  | -                           | -                        |
| `ALL`         | Yes                 | `GROUP`                     | `UPDATE`                 |

### `Tenant Membership` compatibility

Behaves the same as `Group Membership`.

| C7 Permission | Migration supported | C8 Resource Type equivalent | C8 Permission equivalent |
| ------------- | ------------------- | --------------------------- | ------------------------ |
| `CREATE`      | No                  | -                           | -                        |
| `DELETE`      | No                  | -                           | -                        |
| `ALL`         | Yes                 | `TENANT`                    | `UPDATE`                 |

### `System` compatibility

| C7 Permission | Migration supported | C8 Permission equivalent                                 |
| ------------- | ------------------- | -------------------------------------------------------- |
| `READ`        | Yes                 | `READ`, `READ_USAGE_METRIC`                              |
| `SET`         | No                  | -                                                        |
| `DELETE`      | No                  | -                                                        |
| `ALL`         | Yes                 | `READ`, `READ_USAGE_METRIC`, `UPDATE`, `READ_JOB_METRIC` |

### `Decision Definition` compatibility

| C7 Permission     | Migration supported | C8 Permission equivalent                                                                                     |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `READ`            | Yes                 | `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`                                                         |
| `UPDATE`          | No                  | -                                                                                                            |
| `CREATE_INSTANCE` | Yes                 | `CREATE_DECISION_INSTANCE`                                                                                   |
| `READ_HISTORY`    | No                  | -                                                                                                            |
| `ALL`             | Yes                 | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE` |

### `Process Definition` compatibility

| C7 Permission              | Migration supported | C8 Permission equivalent                                                                                                                                                                                                        |
| -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `READ`                     | Yes                 | `READ_PROCESS_DEFINITION`                                                                                                                                                                                                       |
| `UPDATE`                   | No                  | -                                                                                                                                                                                                                               |
| `DELETE`                   | No                  | -                                                                                                                                                                                                                               |
| `SUSPEND`                  | No                  | -                                                                                                                                                                                                                               |
| `CREATE_INSTANCE`          | Yes                 | `CREATE_PROCESS_INSTANCE`                                                                                                                                                                                                       |
| `READ_INSTANCE`            | Yes                 | `READ_PROCESS_INSTANCE`                                                                                                                                                                                                         |
| `UPDATE_INSTANCE`          | Yes                 | `UPDATE_PROCESS_INSTANCE`                                                                                                                                                                                                       |
| `RETRY_JOB`                | No                  | -                                                                                                                                                                                                                               |
| `SUSPEND_INSTANCE`         | No                  | -                                                                                                                                                                                                                               |
| `DELETE_INSTANCE`          | Yes                 | `DELETE_PROCESS_INSTANCE`                                                                                                                                                                                                       |
| `MIGRATE_INSTANCE`         | No                  | -                                                                                                                                                                                                                               |
| `READ_TASK`                | Yes                 | `READ_USER_TASK`                                                                                                                                                                                                                |
| `UPDATE_TASK`              | Yes                 | `UPDATE_USER_TASK`                                                                                                                                                                                                              |
| `TASK_ASSIGN`              | No                  | -                                                                                                                                                                                                                               |
| `TASK_WORK`                | No                  | -                                                                                                                                                                                                                               |
| `READ_TASK_VARIABLE`       | No                  | -                                                                                                                                                                                                                               |
| `READ_HISTORY`             | No                  | -                                                                                                                                                                                                                               |
| `READ_HISTORY_VARIABLE`    | No                  | -                                                                                                                                                                                                                               |
| `DELETE_HISTORY`           | No                  | -                                                                                                                                                                                                                               |
| `READ_INSTANCE_VARIABLE`   | No                  | -                                                                                                                                                                                                                               |
| `UPDATE_INSTANCE_VARIABLE` | No                  | -                                                                                                                                                                                                                               |
| `UPDATE_TASK_VARIABLE`     | No                  | -                                                                                                                                                                                                                               |
| `UPDATE_HISTORY`           | No                  | -                                                                                                                                                                                                                               |
| `ALL`                      | Yes                 | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE`, `UPDATE_USER_TASK`, `MODIFY_PROCESS_INSTANCE`, `CANCEL_PROCESS_INSTANCE`, `DELETE_PROCESS_INSTANCE` |

### `ALL` permissions compatibility

:::info
As illustrated in the tables above, the `ALL` permission in Camunda 7 maps to **all the existing permissions in Camunda 8** for the given resource type, independently of whether these exist in Camunda 7 or not. This is true for all resource types.
:::

## Executing identity migration

```bash
# Run identity migration (experimental)
./start.sh --identity
```

:::warning
After migration has been completed, it is strongly recommended to verify the results in Camunda 8 before using the system in production.
:::
