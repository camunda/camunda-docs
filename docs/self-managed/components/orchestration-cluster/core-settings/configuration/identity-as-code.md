---
id: identity-as-code
title: Identity as Code
description: Configure Identity as Code for a Camunda 8 Self-Managed Orchestration Cluster.
---

This page explains how to configure Identity as Code in the Camunda 8 Self-Managed Orchestration Cluster.
Use Identity as Code to create users, roles, groups, authorizations, mapping rules, and tenants at application start.

## Use cases

Identity as Code simplifies configuring Self-Managed orchestration clusters across multiple stages.
You can create [all Identity-related entities](/components/identity/identity-introduction.md#manage-access) on one stage and then deploy them to other stages without further interaction, reducing the chance of error.

Another use case is local development, where a cluster might be recreated regularly.

After Identity creates an entity, changing its configuration does not update the existing entity.
Identity checks only the ID to decide whether an entity already exists.

## Configure authorizations

```bash
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNER_TYPE=USER
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNER_ID=john.doe
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCE_TYPE=RESOURCE
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCE_ID=*
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_PERMISSIONS=CREATE,READ
```

## Configure mapping rules

```bash
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME=isAllowedToDoStuff
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE=true
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID=my-mapping-rule
```

## Configure users

When configuring users, never hardcode the password. Resolve it from a vault instead.

```bash
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=john.doe@example.com
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME="john doe"
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=*****
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=john.doe
```
