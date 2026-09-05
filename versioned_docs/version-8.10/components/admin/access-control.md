---
id: access-control
title: Access control
description: "Grant users access to work with Admin."
---

If authorization control is enabled for your Orchestration Cluster, users require the following authorizations to work with Admin.

:::note
If you already have another administration user, they can assign these [in the Admin UI](components/admin/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for a list of all available authorizations.
:::

## Mandatory authorizations

The following mandatory authorizations are required to work with Admin:

| Authorization type     | Resource type | Resource ID                                                                  | Permission |
| :--------------------- | :------------ | :--------------------------------------------------------------------------- | :--------- |
| Admin component access | `Component`   | `admin` or `identity` (deprecated) or `*` (for access to all web components) | `ACCESS`   |

## Authorizations per resource

The following authorizations are required to manage each User, Group, Role, Authorization, Mapping Rule, and Tenant resource:

| Authorization type                 | Resource type                                                     | Resource ID                                                                     | Permission                                  |
| :--------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------ |
| Create/Read/Update/Delete resource | One of `User`, `Group`, `Authorization`, `Mapping Rule`, `Tenant` | ID of the resource or `*` (for access to all resources and to create resources) | Any of `CREATE`, `READ`, `UPDATE`, `DELETE` |

## Optional authorizations

The following optional authorizations can also be defined:

| Authorization type                 | Resource type     | Resource ID                        | Permission                                                                                   |
| :--------------------------------- | :---------------- | :--------------------------------- | :------------------------------------------------------------------------------------------- |
| View audit log entries.            | `AUDIT_LOG`       | `ADMIN` or `*` for all categories. | `READ`                                                                                       |
| Manage global user task listeners. | `GLOBAL_LISTENER` | `*`                                | `CREATE_TASK_LISTENER`, `READ_TASK_LISTENER`, `UPDATE_TASK_LISTENER`, `DELETE_TASK_LISTENER` |
