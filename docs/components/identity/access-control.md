---
id: access-control
title: Access control
description: "If authorization control is enabled for your Orchestration Cluster, users require the following authorizations to work with Identity."
---

If authorization control is enabled for your Orchestration Cluster, users require the following authorizations to work with Identity.

:::note
If you already have another administration user, they can assign these [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for a list of all available authorizations.
:::

## Mandatory authorizations

The following mandatory authorizations are required to work with Identity:

| Authorization type        | Resource type | Resource ID                                          | Permission |
| :------------------------ | :------------ | :--------------------------------------------------- | :--------- |
| Identity component access | `Component`   | `identity` or `*` (for access to all web components) | `ACCESS`   |

## Authorizations per resource

The following authorizations are required to manage each User, Group, Role, Authorization, Mapping Rule, and Tenant resource:

| Authorization type                 | Resource type                                                     | Resource ID                                                                     | Permission                                  |
| :--------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------ |
| Create/Read/Update/Delete resource | One of `User`, `Group`, `Authorization`, `Mapping Rule`, `Tenant` | ID of the resource or `*` (for access to all resources and to create resources) | Any of `CREATE`, `READ`, `UPDATE`, `DELETE` |
