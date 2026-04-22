---
id: identity-as-code
title: Identity as Code
description: Configure Identity as Code for a Camunda 8 Self-Managed Orchestration Cluster.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to configure Identity as Code in the Camunda 8 Self-Managed Orchestration Cluster.
Use Identity as Code to create users, roles, groups, authorizations, mapping rules, and tenants at application start.

## Use cases

Identity as Code simplifies configuring Self-Managed orchestration clusters across multiple stages.
You can create [all Identity-related entities](/components/identity/identity-introduction.md#manage-access) on one stage and then deploy them to other stages without further interaction, reducing the chance of error.

Another use case is local development, where a cluster might be recreated regularly.

After Identity creates an entity, changing its configuration does not update the existing entity.
Identity checks only the ID to decide whether an entity already exists.

## Configure authorizations

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNERTYPE=USER
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNERID=john.doe
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCETYPE=RESOURCE
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCEID=*
CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_PERMISSIONS=CREATE,READ
```

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  security:
    initialization:
      authorizations:
        - ownerType: USER
          ownerId: john.doe
          resourceType: RESOURCE
          resourceId: "*"
          permissions:
            - CREATE
            - READ
```

</TabItem>
</Tabs>

## Configure groups

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_GROUP_ID=test-group
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_NAME="Test Group"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_DESCRIPTION="A cool test group!"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_CLIENTS="ClientA,ClientB,ClientC"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_MAPPING_RULES="RuleA,RuleB,RuleC"
CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_USERS="UserA,UserB,UserC"
```

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  env:
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_GROUP_ID
      value: "test-group"
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_NAME
      value: "Test Group"
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_DESCRIPTION
      value: "A cool test group!"
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_CLIENTS
      value: "ClientA,ClientB,ClientC"
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_MAPPING_RULES
      value: "RuleA,RuleB,RuleC"
    - name: CAMUNDA_SECURITY_INITIALIZATION_GROUPS_0_USERS
      value: "UserA,UserB,UserC"
```

</TabItem>
</Tabs>

## Configure mapping rules

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME=isAllowedToDoStuff
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE=true
CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID=my-mapping-rule
```

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  security:
    initialization:
      mappingRules:
        - claimName: isAllowedToDoStuff
          claimValue: "true"
          mappingRuleId: my-mapping-rule
```

</TabItem>
</Tabs>

## Configure roles

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_ROLE_ID=test-role
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_NAME="Test Role"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_DESCRIPTION="A cool test role!"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_CLIENTS="client1,client2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_GROUPS="group1,group2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_MAPPING_RULES="m1,m2"
CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_USERS="UserA,UserB,UserC"
```

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  env:
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_ROLE_ID
      value: "test-role"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_NAME
      value: "Test Role"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_DESCRIPTION
      value: "A cool test role!"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_CLIENTS
      value: "client1,client2"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_GROUPS
      value: "group1,group2"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_MAPPING_RULES
      value: "m1,m2"
    - name: CAMUNDA_SECURITY_INITIALIZATION_ROLES_0_USERS
      value: "UserA,UserB,UserC"
```

</TabItem>
</Tabs>

## Configure tenants

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

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

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  env:
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_TENANT_ID
      value: "tenantId"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_NAME
      value: "test tenant"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_DESCRIPTION
      value: "test tenant descriptioon"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_CLIENTS
      value: "R1,R2,R3,R4"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_GROUPS
      value: "R1,R2,R3,R4"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_MAPPING_RULES
      value: "R1,R2,R3,R4"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_ROLES
      value: "R1,R2,R3,R4"
    - name: CAMUNDA_SECURITY_INITIALIZATION_TENANTS_0_USERS
      value: "UserA,UserB,UserC"
```

</TabItem>
</Tabs>

## Configure users

When configuring users, never hardcode the password. Resolve it from a vault instead.

<Tabs groupId="config-method">
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=john.doe@example.com
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME="john doe"
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=*****
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=john.doe
```

</TabItem>
<TabItem value="helm" label="Helm values">

```yaml
orchestration:
  security:
    initialization:
      users:
        - email: john.doe@example.com
          name: john doe
          password: "*****"
          username: john.doe
```

</TabItem>
</Tabs>
