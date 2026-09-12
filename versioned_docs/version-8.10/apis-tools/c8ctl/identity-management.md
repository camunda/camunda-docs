---
id: identity-management
title: "Identity management"
sidebar_label: "Identity management"
description: "Use c8ctl to manage users, roles, groups, tenants, authorizations, and mapping rules in a Camunda 8 cluster."
---

<!-- This page is maintained in the c8ctl repository (https://github.com/camunda/c8ctl, in docs/) and
     is synced to camunda-docs automatically. Do not edit it in camunda-docs — changes will be
     overwritten. Edit the source in the c8ctl repo instead. -->

`c8ctl` provides commands to manage identity resources through the Orchestration Cluster API. You can list, search, get, create, and delete users, roles, groups, tenants, authorizations, and mapping rules. Membership management is handled with the `assign` and `unassign` verbs.

| Resource           | Alias  | Available verbs                             |
| :----------------- | :----- | :------------------------------------------ |
| `user(s)`          | —      | `list`, `search`, `get`, `create`, `delete` |
| `role(s)`          | —      | `list`, `search`, `get`, `create`, `delete` |
| `group(s)`         | —      | `list`, `search`, `get`, `create`, `delete` |
| `tenant(s)`        | —      | `list`, `search`, `get`, `create`, `delete` |
| `authorization(s)` | `auth` | `list`, `search`, `get`, `create`, `delete` |
| `mapping-rule(s)`  | `mr`   | `list`, `search`, `get`, `create`, `delete` |

:::tip
All commands respect the active profile and tenant. Pass `--profile` to override the profile for a single command:

```bash
c8 list users --profile=prod
c8 search roles --profile=staging
```

:::

## Users

### List users

```bash
c8 list users
```

### Search users

```bash
c8 search users --name=John
c8 search users --email='john@example.com'
c8 search users --name=John --email='john@example.com'
```

### Get a user

```bash
c8 get user john
```

### Create a user

```bash
c8 create user --username=john --name='John Doe' --email=john@example.com --password=changeme
```

### Delete a user

```bash
c8 delete user john
```

## Roles

### List roles

```bash
c8 list roles
```

### Search roles

```bash
c8 search roles --name=admin
```

### Get a role

```bash
c8 get role admin
```

### Create a role

```bash
c8 create role --roleId=my-role --name='My role'
```

### Delete a role

```bash
c8 delete role my-role
```

## Groups

### List groups

```bash
c8 list groups
```

### Search groups

```bash
c8 search groups --name=developers
```

### Get a group

```bash
c8 get group developers
```

### Create a group

```bash
c8 create group --groupId=developers --name=Developers
```

### Delete a group

```bash
c8 delete group developers
```

## Tenants

### List tenants

```bash
c8 list tenants
```

### Search tenants

```bash
c8 search tenants --name=Production
```

### Get a tenant

```bash
c8 get tenant prod
```

### Create a tenant

```bash
c8 create tenant --tenantId=prod --name='Production'
```

### Delete a tenant

```bash
c8 delete tenant prod
```

## Authorizations

### List authorizations

```bash
c8 list auth
c8 list authorizations
```

### Search authorizations

```bash
c8 search auth --ownerId=john --resourceType=process-definition
```

### Create an authorization

```bash
c8 create auth --ownerId=john --ownerType=USER --resourceType=process-definition --resourceId='*' --permissions=READ,CREATE
```

### Delete an authorization

```bash
c8 delete auth 2251799813685260
```

## Mapping rules

### List mapping rules

```bash
c8 list mr
c8 list mapping-rules
```

### Search mapping rules

```bash
c8 search mr --name=my-rule
```

### Create a mapping rule

```bash
c8 create mr --mappingRuleId=my-rule --name='My Rule' --claimName=email --claimValue=user@example.com
```

### Delete a mapping rule

```bash
c8 delete mr my-rule
```

## Assign and unassign

The `assign` and `unassign` verbs manage membership between identity resources. You can assign users to roles, groups, or tenants, and assign groups to tenants.

### Assign a user to a role

```bash
c8 assign role admin --to-user=john
```

### Unassign a user from a role

```bash
c8 unassign role admin --from-user=john
```

### Assign a user to a group

```bash
c8 assign user john --to-group=developers
```

### Unassign a user from a group

```bash
c8 unassign user john --from-group=developers
```

### Assign a group to a tenant

```bash
c8 assign group developers --to-tenant=prod
```

### Unassign a group from a tenant

```bash
c8 unassign group developers --from-tenant=prod
```
