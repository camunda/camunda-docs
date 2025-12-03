---
id: identity-as-code
title: Identity as Code
description: Configure Identity as Code for a Camunda 8 Self-Managed Orchestration Cluster.
---

This page explains how to configure Identity as Code in the **Camunda 8 Self-Managed Orchestration Cluster**, which means creating users, roles, groups, authorizations, mapping rules, and tenants at application start.

## What can it be used for?

Identity as Code can be used to simplify configuring Self-Managed Orchestration Clusters e.g. across multiple stages.
It allows you to create [all Identity related entities](/components/identity/identity-introduction.md#manage-access) on one stage afterwards deploy them to other stages without further interaction and thus chance for error.
Another use case is local development setups, where a cluster might be recreated regularly.

It should be noted, that modifying entities in the configuration after they have already been created will not have any effect as they are checked for existence purely by id.

## Configuring Authorizations

```bash
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATION_0_OWNER_TYPE=USER
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATION_0_OWNER_ID=john.doe
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATION_0_RESOURCE_TYPE=DEPLOYMENT
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATION_0_RESOURCE_ID=*
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATION_0_PERMISSIONS=CREATE,READ
```

## Configuring Mapping Rules

```bash
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME=isAllowedToDoStuff
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE=true
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID=my-mapping-rule
```

## Configuring Users

When configuring users, the password should never be hardcoded and instead be resolved from a vault.

```bash
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=john.doe@example.com
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME="john doe"
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=*****
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=john.doe
```
