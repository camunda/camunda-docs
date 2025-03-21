---
id: managing-tenants
title: "Managing tenants"
sidebar_label: "Managing tenants"
description: "Manage tenants within Identity to support the logical separation of your infrastructure."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In this guide you will learn how to manage tenants in Identity and how to control the members who have access to them.

Multi-tenancy in the context of Camunda 8 refers to the ability of Camunda 8 to serve multiple distinct tenants or clients within a single installation. For details on multi-tenancy, visit our [multi-tenancy documentation](/self-managed/concepts/multi-tenancy.md).

## Managing tenants

:::note
The `<default>` tenant is automatically created during startup.
:::

1. Log in to the Identity UI and navigate to the **Tenants** tab.

![tenant-management-tab](../img/tenant-management-tab.png)

2. Click **Create Tenant** and a modal will open.

3. Enter the name, ID, and optionally a description for the tenant and click **Create tenant**:

![tenant-management-modal-1](../img/tenant-management-modal-1.png)

On creation, the modal closes and the table updates with your new tenant.

4. Click on your new tenant to view the details:

![tenant-management-details](../img/tenant-management-details.png)

### Assigning members

Users and groups can be assigned to a tenant. Below we show you how to assign members to a tenant.

<Tabs groupId="memberType" defaultValue="users" queryString values={[{label: 'Users', value: 'users', },{label: 'Groups', value: 'groups', }]} >
<TabItem value="users">

1. Click **Users** to view the users assigned to the tenant, and click **Assign user**:

![tenant-management-assign-users](../img/tenant-management-assign-users-tab.png)

2. Search and select the users to assign to the tenant. After selecting the users, click **Assign users**:

![tenant-management-assign-users-modal](../img/tenant-management-assign-users-modal.png)

On confirmation, the modal closes, the table updates, and the assigned users are shown:

![tenant-management-assign-users-refreshed](../img/tenant-management-assign-users-refreshed.png)
</TabItem>
<TabItem value="groups">

3. Click **Assigned groups** to view the groups assigned to the tenant, and click **Assign groups**:

![tenant-management-assign-groups](../img/tenant-management-assign-groups-tab.png)

4. Search and select the groups to assign to the tenant. After selecting the groups, click **Assign groups**:

![tenant-management-assign-groups-modal](../img/tenant-management-assign-groups-modal.png)

On confirmation, the modal closes, the table updates, and the assigned groups are shown:

![tenant-management-assign-groups-refreshed](../img/tenant-management-assign-groups-refreshed.png)

</TabItem>
</Tabs>
