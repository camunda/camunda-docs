---
id: access-control
title: Access Control
description: "Grant users access to work with Identity."
---

If authorization checks are enabled for your Orchestration Cluster, users need authorizations as described in this section to work with Identity. If you already have another administrative user, that user can assign those [in the Identity UI](components/identity/authorization.md#create-an-authorization). See [the introduction to authorizations](components/concepts/access-control/authorizations.md#available-resources) for an overview of all available authorizations.

## Mandatory authorizations

- Component access for Identity:
  - Resource type: `Component`
  - Resource id: `identity` or `*` (for access to all web components)
  - Permission: `ACCESS`

## Authorizations per resource

To manage each of the resources User, Group, Role, Authorization, Mapping Rule, Tenant, the user needs an authorization as follows:

- Create/Read/Update/Delete resource
  - Resource type: one of `User`, `Group`, `Authorization`, `Mapping Rule`, `Tenant`
  - Resource id: ID of the resource or `*` (for access to all resources and to create resources)
  - Permission: any of `CREATE`, `READ`, `UPDATE`, `DELETE`
