---
id: initialize-tenants
title: "Initialize tenants for Optimize"
sidebar_label: "Initialize tenants"
description: "Learn how to configure Management Identity with initial tenants for Optimize."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure initial [tenants](/components/concepts/multi-tenancy.md) for Optimize in Camunda 8 Self-Managed.

## About Optimize tenants

Tenants managed within Management Identity only apply to [Optimize](../../optimize/overview.md). Furthermore, they're only effective when the following conditions are met:

- You've [enabled multi-tenancy checks for your Orchestration Cluster](/components/identity/tenant.md).
- Your tenants have the same identifiers in the Orchestration Cluster and Management Identity.

In this guide, you'll learn how to initialize tenants in your app configuration.

## Before you begin

Before you begin, [configure a database](../miscellaneous/configuration-variables.md#database-configuration). Management Identity requires a database to support multi-tenancy

When deploying Camunda 8 with Docker, you can programmatically configure tenants in Management Identity in two ways:

- `application.yaml`
- Environment variables

When using Helm to deploy Camunda 8, you must configure tenants using environment variables. Configuration using [Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters) is not supported.

## Initialize tenants in Management Identity

First, enable the Management Identity multi-tenancy flag:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'application.yaml', value: 'yaml'},{label: 'Environment variables', value: 'env' }]} >
<TabItem value="yaml">

```yaml
identity:
  flags:
    multi-tenancy: "true"
```

</TabItem>
<TabItem value="env">

```sh
MULTITENANCY_ENABLED=true
```

</TabItem>
</Tabs>

With multi-tenancy enabled, initialize your tenants:

<Tabs groupId="optionsType" className="tabs-hidden" defaultValue="env" queryString values={[{label: 'application.yaml', value: 'yaml'},{label: 'Environment variables', value: 'env' }]} >
<TabItem value="yaml">

```yaml
identity:
  tenants:
    - name: My tenant
      tenantId: my-tenant
      members:
        - type: USER
          username: username
        - type: GROUP
          group-name: group name
        - type: APPLICATION
          application-id: application-id
```

Each member type has a corresponding property you use to set the member identifier:

| Member type   | Property         |
| ------------- | ---------------- |
| `USER`        | `username`       |
| `GROUP`       | `group-name`     |
| `APPLICATION` | `application-id` |

In some contexts, like the Management Identity UI, the "Application ID" is referred to as the "Client ID".

</TabItem>
<TabItem value="env">

```sh
IDENTITY_TENANTS_0_NAME="My tenant"
IDENTITY_TENANTS_0_TENANTID="my-tenant"
IDENTITY_TENANTS_0_MEMBERS_0_TYPE="USER"
IDENTITY_TENANTS_0_MEMBERS_0_USERNAME="username"
IDENTITY_TENANTS_0_MEMBERS_1_TYPE="GROUP"
IDENTITY_TENANTS_0_MEMBERS_1_GROUPNAME="group name"
IDENTITY_TENANTS_0_MEMBERS_2_TYPE="APPLICATION"
IDENTITY_TENANTS_0_MEMBERS_2_APPLICATIONID="application-id"
```

Each member type has a corresponding property you use to set the member identifier:

| Member type   | Property                                     |
| ------------- | -------------------------------------------- |
| `USER`        | `IDENTITY_TENANTS_0_MEMBERS_0_USERNAME`      |
| `GROUP`       | `IDENTITY_TENANTS_0_MEMBERS_0_GROUPNAME`     |
| `APPLICATION` | `IDENTITY_TENANTS_0_MEMBERS_0_APPLICATIONID` |

In some contexts, like the Management Identity UI, the "Application ID" is referred to as the "Client ID".

</TabItem>
</Tabs>

## Next steps

- [Enable multi-tenancy checks for your Orchestration Cluster](/components/identity/tenant.md)
- [Manage tenants in the Management Identity application](../manage-tenants.md)
