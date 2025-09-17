---
id: identity-application-user-group-role-management-overview
title: "Manage users, groups, roles, and applications"
sidebar_label: "Users, groups, roles, and applications"
description: "Learn more about how Management Identity makes use of users, groups, and roles for management and modeling components"
---

Manage and organize access to Camunda 8 management and modeling components ([Web Modeler](../../modeler/web-modeler/overview.md), [Console](../../console/overview.md), and [Optimize](../../optimize/overview.md)) using users, groups, roles, and applications.

## About managing users in Management Identity

In Management Identity, a user represents a human who interacts with Camunda 8 management and modeling components.

- You do not create or manage users in Management Identity itself. Users are managed in Keycloak or your connected IdP.
- Management Identity allows you to organize and manage access to the components for these users with groups and roles.

## Groups

Use groups to manage user access by organizing users into groups (group members) and assigning roles. Instead of assigning roles to individual users, map a set of roles to a group, with all group members automatically inheriting the role permissions.

- [Manage Groups](./manage-groups.md)

## Roles

Use roles to simplify and standardize access control across your system, help enforce consistent permission sets, reduce errors, and scale access management as your organization grows.

Roles define the actions a user or application can perform in Camunda 8 management and modeling components by grouping together a set of related [permissions](../access-management/manage-permissions.md).
You can assign roles [directly to a user](manage-roles.md#assign-a-role-to-a-user) or [using groups](/self-managed/components/management-identity/application-user-group-role-management/manage-groups.md#assign-roles-to-a-group).

- [Manage roles](./manage-roles.md)

## Applications

In Management Identity, an application represents an entity that can request Management Identity to authenticate a user or a service for accessing management and modeling components. Camunda 8 has a set of preconfigured applications, but as a user of Management Identity you can also add your own applications.

For example, you can provide a service with M2M access to management and modeling component APIs, such as a custom application that needs to access Optimize or Web Modeler APIs.

- [Manage applications](./applications.md)
