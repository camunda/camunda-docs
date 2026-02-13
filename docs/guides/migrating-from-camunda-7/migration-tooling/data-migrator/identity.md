---
id: identity
title: Identity migration
sidebar_label: Identity migration
description: "Copy identity data from Camunda 7 to 8."
---

Use the Identity Data Migrator to copy authorizations and tenants to Camunda 8.

:::info
The identity migration mode of the Data Migrator is still in the development stage and will **not be released before Camunda 8.9 (April 2026)**. You can check the current state and track progress in the [GitHub repository](https://github.com/camunda/camunda-7-to-8-migration-tooling/).
:::

## About identity migration

Identity data in Camunda includes:

- **Identities**: Users, groups, tenants, and their related memberships
- **Authorizations**: Permission rules that control access to resources

Please also have a look at the [limitations](./limitations.md#identity) of the Identity Data Migrator.

### Users, groups, and memberships

- The Identity Data Migrator does **not** migrate Camunda 7 internally managed users, groups, and group memberships to Camunda 8.
- We recommend integrating Camunda 8 with your organization's external Identity Provider (IdP) instead.
- Most organizations already use an IdP to manage users, groups, and group memberships centrally, making manual migration unnecessary.

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
| `Deployment`                       | [Yes\*](#deployment-compatibility)              | -                                  |
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

The `Tenant Membership` resource type does not exist in Camunda 8, but its functionality is covered by the `Tenant` resource type in combination with the `UPDATE` permission. However, only the `ALL` permission from Camunda 7 is supported for migration, as individual `CREATE` and `DELETE` permissions would result in a more permissive authorization.

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

As historic definitions are migrated with a prefixed ID to Camunda 8 to avoid collisions between native and migrated definitions ([ref](../data-migrator/limitations.md#history)), authorizations for `Decision Definition` resources are migrated twice: once for the original ID and once for the prefixed ID. This guarantees that authorizations remain effective after migration.

| C7 Permission     | Migration supported | C8 Permission equivalent                                                                                     |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `READ`            | Yes                 | `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`                                                         |
| `UPDATE`          | No                  | -                                                                                                            |
| `CREATE_INSTANCE` | Yes                 | `CREATE_DECISION_INSTANCE`                                                                                   |
| `READ_HISTORY`    | No                  | -                                                                                                            |
| `ALL`             | Yes                 | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE` |

### `Process Definition` compatibility

As historic definitions are migrated with a prefixed ID to Camunda 8 to avoid collisions between native and migrated definitions ([ref](../data-migrator/limitations.md#history)), authorizations for `Process Definition` resources are migrated twice: once for the original ID and once for the prefixed ID. This guarantees that authorizations remain effective after migration.

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

### `Deployment` compatibility

As `Deployment` maps to `Resource` in Camunda 8, when migrating a `Deployment` authorization to Camunda 8, one authorization per resource contained in the deployment is created in Camunda 8, with the same permissions as the original `Deployment` authorization.
This operates in combination with the prefix principle described for [Process Definition](#process-definition-compatibility) and [Decision Definition](#decision-definition-compatibility), which also applies for forms.

In practice, this means that, if a deployment contains process definitions, decision definitions, and forms, for each of these resources two authorizations are created in Camunda 8: one for the original ID and one for the prefixed ID.

| C7 Permission | Migration supported | C8 Permission equivalent                                                           |
| ------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `READ`        | Yes                 | `READ`                                                                             |
| `CREATE`      | Yes                 | `CREATE`                                                                           |
| `DELETE`      | Yes                 | `DELETE_RESOURCE`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_DRD`                   |
| `ALL`         | Yes                 | `CREATE`, `READ`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_RESOURCE` |

### `ALL` permissions compatibility

:::info
As illustrated in the tables above, the `ALL` permission in Camunda 7 maps to **all the existing permissions in Camunda 8** for the given resource type, independently of whether these exist in Camunda 7 or not. This is true for all resource types.
:::

## Executing identity migration

```bash
# Run identity migration
./start.sh --identity

# List all skipped identity entities
./start.sh --identity --list-skipped

# Retry skipped identity entities
./start.sh --identity --retry-skipped
```

:::warning
After migration has been completed, it is strongly recommended to verify the results in Camunda 8 before using the system in production.
:::
