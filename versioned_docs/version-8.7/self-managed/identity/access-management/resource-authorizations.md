---
id: resource-authorizations
title: "Resource Authorizations"
sidebar_label: "Resource Authorizations"
description: "Learn about the methods to control resource access."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Resource Authorizations** allow you to configure resource-level access to entities in Camunda 8. The following **resource authorizations** are currently supported:

| Resource type | Permissions               | Resource ID                   | Description                                                       |
| ------------- | ------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| Process       | `Read`                    | Process ID or `*` (wildcard)  | Show Process Definition and Process Instance Data in Operate UI   |
| Process       | `Delete`                  | Process ID or `*` (wildcard)  | Delete Process Definitions via Operate UI                         |
| Process       | `Update process instance` | Process ID or `*` (wildcard)  | Update Process Instance data via Operate UI                       |
| Process       | `Delete process instance` | Process ID or `*` (wildcard)  | Delete Process Instance via Operate UI                            |
| Process       | `Start process instance`  | Process ID or `*` (wildcard)  | Start Process Instance via Tasklist UI                            |
| Decision      | `Read`                    | Decision ID or `*` (wildcard) | Show Decision Definition and Decision Instance Data in Operate UI |
| Decision      | `Delete`                  | Decision ID or `*` (wildcard) | Delete Decision Definitions via Operate UI                        |

:::note
Resource authorizations are disabled by default and can be enabled by the use of environment variables. This feature must be enabled in all required components, see:

- [Identity feature flags](/self-managed/identity/deployment/configuration-variables/#feature-flags)
- [Operate resource based permissions](/self-managed/operate-deployment/operate-authentication/?authentication=identity#resource-based-permissions)
- [Tasklist resource based permissions](/self-managed/tasklist-deployment/tasklist-authentication/?authentication=identity#resource-based-permissions)

Also a [database must be configured](<(/self-managed/identity/deployment-troubleshooting/configuration-variables.md#database-configuration)>) for Identity.

:::

**Resource Authorizations** are only supported when running Identity with KeyCloak as IdP.

## Managing resource authorizations

Resource authorizations can be configured for an individual user or a group. Below we show you how to create authorizations
for both:

<Tabs groupId="entityType" defaultValue="groups" queryString values={[{label: 'Groups', value: 'groups', }, {label: 'Users', value: 'users', },]} >
<TabItem value="groups">

1. Log in to the Identity UI and navigate to the **Groups** tab. Select the group you would like to create an authorization for from the table, and click on the **Authorizations** tab:

![create-authorization-for-group-tab](../img/create-authorization-for-group-tab.png)

2. Click **Create resource authorization** and a modal will open. Select the type of resource you are creating an authorization for, and click **Next**:

![create-authorization-for-group-modal-1](../img/create-authorization-for-group-modal-1.png)

3. Input the ID of the resource you would like to create an authorization for, select the resource from the list, and click **Next**:

![create-authorization-for-group-modal-2](../img/create-authorization-for-group-modal-2.png)

:::tip
Want to apply an authorization to a wide range of resources? We support a wildcard character `*` to match any resource.

Partial matching, for example `my-resource*`, is not supported.
:::

4. Select the permissions you would like to assign, and click **Create**:

![create-authorization-for-group-modal-3](../img/create-authorization-for-group-modal-3.png)

On confirmation, the modal closes, the table updates, and your authorization is shown:

![create-authorization-for-group-refreshed-modal](../img/create-authorization-for-group-refreshed-table.png)

</TabItem>
<TabItem value="users">

1. Log in to the Identity UI and navigate to the **Users** tab. Select the user you would like to create an authorization for from the table, and click on the **Authorizations** tab:

![create-authorization-for-user-tab](../img/create-authorization-for-user-tab.png)

2. Click **Create resource authorization** and a modal will open. Select the type of resource you are creating an authorization for, and click **Next**:

![create-authorization-for-user-modal-1](../img/create-authorization-for-user-modal-1.png)

3. Input the ID of the resource you would like to create an authorization for, select the resource from the list, and click **Next**:

![create-authorization-for-user-modal-2](../img/create-authorization-for-user-modal-2.png)

:::tip
Want to apply an authorization to a wide range of resources? We support a wildcard character `*` to match any resource.

Partial matching, for example `my-resource*`, is not supported.
:::

4. Select the permissions you would like to assign, and click **Create**:

![create-authorization-for-user-modal-3](../img/create-authorization-for-user-modal-3.png)

On confirmation, the modal closes, the table updates, and your authorization is shown:

![create-authorization-for-user-refreshed-modal](../img/create-authorization-for-user-refreshed-table.png)

</TabItem>
</Tabs>
