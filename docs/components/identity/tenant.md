---
id: tenant
title: "Tenants"
sidebar_label: "Tenants"
description: "Manage tenants within the Orchestration Cluster Identity to support the logical separation of your infrastructure."
---

:::info
Multi-tenancy is currently only supported for Camunda 8 Self-Managed. It is not yet available on SaaS.
:::

Multi-tenancy in Camunda 8 allows a single installation to serve multiple distinct tenants, providing logical data isolation for different teams, departments, or clients. To learn more about multi-tenancy, refer to the [multi-tenancy concepts](../concepts/multi-tenancy.md).

Tenants for the Orchestration Cluster are managed directly in [Identity](identity-introduction.md).
By default, tenancy is enabled, but tenancy checks are disabled. All data is mapped to the `<default>` tenant. This allows administrators to manage tenants and their assignments without enforcing tenancy checks prematurely.

To enable multi-tenancy checks, refer to the [Self-Managed configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#multi-tenancy).

## Create a tenant

:::note
A `<default>` tenant is automatically created during Identity startup.
:::

1. Log in to Identity and navigate to the **Tenants** tab.

   ![tenant-management-tab](./img/tenant-management-tab.png)

2. Click to create a new tenant. In the modal, enter ID and name for the tenant, and optionally the description. Then confirm to **create the tenant**:

   ![tenant-management-create-tenant-modal](./img/tenant-management-create-tenant-modal.png)

3. The new tenant will be created. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-new-tenant-in-table](./img/tenant-management-new-tenant-in-table.png)

4. Click on the tenant to view the details and manage assignments:

   ![tenant-management-tenant-details-users-tab](./img/tenant-management-tenant-details-users-tab.png)

## Tenant assignments

Depending on your Self-Managed setup, you can assign [users](user.md), [groups](group.md), [roles](role.md), [mapping rules](./mapping-rules/manage-mapping-rules.md), and [clients](client.md) to a tenant as follows:

### Assign users to a tenant

From the **Users** tab you can see the assigned users and add new users to a tenant.

1. Click to assign a user. In the modal, enter the username that you'd like to assign. Confirm the assignment by clicking **Assign user**:

   ![tenant-management-assign-users-modal](./img/tenant-management-assign-users-modal.png)

2. The user will be assigned to the tenant. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-assigned-users](./img/tenant-management-assigned-users.png)

### Assign groups to a tenant

From the **Groups** tab you can see the assigned groups and add new groups to a tenant.

![tenant-management-tenant-details-groups-tab](./img/tenant-management-tenant-details-groups-tab.png)

1. Click to assign a group. In the modal, search for a group ID that you'd like to assign. Confirm the assignment by clicking **Assign group**:

   ![tenant-management-assign-groups-modal](./img/tenant-management-assign-groups-modal.png)

2. The group will be assigned to the tenant. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-assigned-groups](./img/tenant-management-assigned-groups.png)

### Assign roles to a tenant

From the **Roles** tab you can see the assigned roles and add new roles to a tenant.

![tenant-management-tenant-details-roles-tab](./img/tenant-management-tenant-details-roles-tab.png)

1. Click to assign a role. In the modal, search for a role ID that you'd like to assign. Confirm the assignment by clicking **Assign role**:

   ![tenant-management-assign-roles-modal](./img/tenant-management-assign-roles-modal.png)

2. The role will be assigned to the tenant. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-assigned-roles](./img/tenant-management-assigned-roles.png)

### Assign mapping rules to a tenant

From the **Mapping rules** tab you can see the assigned mapping rules and add new mapping rules to a tenant.

![tenant-management-tenant-details-mapping-rules-tab](./img/tenant-management-tenant-details-mapping-rules-tab.png)

1. Click to assign a mapping rule. In the modal, search for a mapping rule ID that you'd like to assign. Confirm the assignment by clicking **Assign mapping rule**:

   ![tenant-management-assign-mapping-rules-modal](./img/tenant-management-assign-mapping-rules-modal.png)

2. The mapping rule will be assigned to the tenant. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-assigned-mapping-rules](./img/tenant-management-assigned-mapping-rules.png)

### Assign clients to a tenant

From the **Clients** tab you can see the assigned clients and add new clients to a tenant.

![tenant-management-tenant-details-clients-tab](./img/tenant-management-tenant-details-clients-tab.png)

1. Click to assign a client. In the modal, enter the client ID that you'd like to assign. Confirm the assignment by clicking **Assign client**:

   ![tenant-management-assign-client-modal](./img/tenant-management-assign-client-modal.png)

2. The client will be assigned to the tenant. If it doesn't appear in the table right away, reload the page.

   ![tenant-management-assigned-clients](./img/tenant-management-assigned-clients.png)
