---
id: identity-application-user-group-role-management-overview
title: "Overview of users, applications, groups, and roles"
description: "Learn more about how Identity makes use of users, groups, and roles"
---

Identity allows you to manage:

- **Users** that represent Camunda 8 users (e.g., `Joe Doe`).
  - Users are taken from KeyCloak or your integrated IdP. They cannot be created/edited/deleted in Identity itself.
- [**Applications**](./incorporate-applications.md) that represent applications interacting with Camunda 8 (e.g., a custom job worker)

For more effective organization, users can be managed as part of:

- [Groups](./manage-groups.md)
- [Roles](./manage-roles.md)
