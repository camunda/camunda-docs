---
id: identity-as-code
title: Identity as Code
description: Configure Identity as Code for a Camunda 8 Self-Managed Orchestration Cluster.
---

This page explains how to configure Identity as Code in the Camunda 8 Self-Managed Orchestration Cluster.
Use Identity as Code to create users, roles, groups, authorizations, mapping rules, and tenants at application start.

## Use cases

Identity as Code simplifies configuring Self-Managed orchestration clusters across multiple stages.
You can create [all Identity-related entities](/components/admin/admin-introduction.md#manage-access) on one stage and then deploy them to other stages without further interaction, reducing the chance of error.

Another use case is local development, where a cluster might be recreated regularly.

After Identity creates an entity, changing its configuration does not update the existing entity.
Identity checks only the ID to decide whether an entity already exists.

## Configure authorizations

```bash
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNERTYPE=USER
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNERID=john.doe
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCETYPE=RESOURCE
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCEID=*
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_PERMISSIONS=CREATE,READ
```

## Configure groups

```bash
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_GROUP_ID=test-group
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_NAME="Test Group"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_DESCRIPTION="A cool test group!"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_CLIENTS="ClientA,ClientB,ClientC"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_MAPPING_RULES="RuleA,RuleB,RuleC"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_ROLES="RoleA,RoleB,RoleC"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_USERS="UserA,UserB,UserC"
```

## Configure mapping rules

```bash
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME=isAllowedToDoStuff
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE=true
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID=my-mapping-rule
```

## Configure Roles

```bash
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_ROLE_ID=test-role
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_NAME="Test Role"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_DESCRIPTION="A cool test role!"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_CLIENTS="client1,client2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_GROUPS="group1,group2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_MAPPING_RULES="m1,m2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_USERS="UserA,UserB,UserC"
```

## Configure tenants

```bash
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_TENANT_ID=tenantId
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_NAME="test tenant"
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_DESCRIPTION="test tenant descriptioon"
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_CLIENTS='R1,R2,R3,R4'
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_GROUPS='R1,R2,R3,R4'
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_MAPPING_RULES='R1,R2,R3,R4'
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_ROLES='R1,R2,R3,R4'
CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_USERS='UserA,UserB,UserC'
```

## Configure users

When configuring users, never hardcode the password. Resolve it from a vault instead.

```bash
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=john.doe@example.com
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME="john doe"
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=*****
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=john.doe
```
