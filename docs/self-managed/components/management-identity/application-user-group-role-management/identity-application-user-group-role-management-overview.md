---
id: identity-application-user-group-role-management-overview
title: "Manage users, groups, roles, and applications"
sidebar_label: "Users, groups, roles, and applications"
description: "Learn more about how Identity makes use of users, groups, and roles"
---

Manage and organize your users and applications using groups and roles.

## About managing users in Identity

In Identity, a user represents a human who interacts with any Camunda 8 user interface (such as a web application).

- You do not create or manage users in Identity itself. Users are managed in Keycloak or your connected IdP.
- Identity allows you to organize and manage these users with groups and roles.

## Groups

Use groups to manage user access by organizing users into groups (group members) and assigning roles. Instead of assigning roles to individual users, map a set of roles to a group, with all group members automatically inheriting the role permissions.

- [Manage Groups](./manage-groups.md)

## Roles

Use roles to simplify and standardize access control across your system, help enforce consistent permission sets, reduce errors, and scale access management as your organization grows.

Roles define the actions a user or application can perform in Camunda 8 by grouping together a set of related [permissions](../access-management/manage-permissions.md).
You can assign roles [directly to a user](manage-roles.md#assign-a-role-to-a-user) or [using groups](/self-managed/components/management-identity/application-user-group-role-management/manage-groups.md#assign-roles-to-a-group).

- [Manage roles](./manage-roles.md)

## Applications

In Identity, an application represents an entity that can request Identity to authenticate a user or a service. Camunda 8 has a set of preconfigured applications, but as a user of Identity you can also add your own Applications.

For example, you can provide a service with M2M access to a Orchestration cluster API, such as a custom job worker.

- [Manage applications](./applications.md)
