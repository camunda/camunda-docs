---
id: manage-tenants
title: "Tenants for Optimize"
sidebar_label: "Tenants for Optimize"
description: "Manage tenants within Identity to support the logical separation of your infrastructure."
---

Multi-tenancy in Camunda 8 allows a single installation to host multiple tenants — such as departments, teams, or external clients — while maintaining per-tenant isolation of data and processes in a shared environment. To learn more, refer to the [multi-tenancy concepts](/components/concepts/multi-tenancy.md).

Tenants managed within Management Identity apply **only to Optimize**, allowing you to isolate data access for reports and dashboards.

If you are using multi-tenancy for an Orchestration Cluster, you can also enable and configure tenants in Management Identity to ensure data isolation in Optimize. For information on managing tenants for the Orchestration Cluster, see the [Orchestration Cluster tenants documentation](/components/identity/tenant.md).

## Enabling multi-tenancy for Optimize

**Precondition**: Multi-tenancy is disabled by default. To enable multi-tenancy for Optimize, you must:

1. Enable [`MULTITENANCY_ENABLED` feature flag](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#feature-flags).
2. [Configure a database](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#database-configuration).

## Create a tenant

:::note
A `<default>` tenant is automatically created during Identity startup.
:::

1. Log in to Management Identity and navigate to the **Tenants** tab.

   ![tenant-management-tab](./img/tenant-management-tab.png)

2. Click **Create Tenant** and a modal will open.

3. Enter a name and ID for the tenant, and click **Create tenant**:

   ![tenant-management-modal-1](./img/tenant-management-modal-1.png)

   On creation, the modal closes and the table updates with your new tenant.

4. Click on your new tenant to view the details:

   ![tenant-management-details](./img/tenant-management-details.png)

## Tenant assignments

You can assign [users, groups and applications](./application-user-group-role-management/identity-application-user-group-role-management-overview.md) to a tenant as follows:

### Assign users to a tenant

1. Click **Assigned users** to view the users assigned to the tenant, and click **Assign users**:

   ![tenant-management-assign-users](./img/tenant-management-assign-users-tab.png)

1. Search and select the users to assign to the tenant. After selecting the users, click **Assign users**:

   ![tenant-management-assign-users-modal](./img/tenant-management-assign-users-modal.png)

   On confirmation, the modal closes, the table updates, and the assigned users are shown:

   ![tenant-management-assign-users-refreshed](./img/tenant-management-assign-users-refreshed.png)

### Assign groups to a tenant

1. Click **Assigned groups** to view the groups assigned to the tenant, and click **Assign groups**:

   ![tenant-management-assign-groups](./img/tenant-management-assign-groups-tab.png)

1. Search and select the groups to assign to the tenant. After selecting the groups, click **Assign groups**:

   ![tenant-management-assign-groups-modal](./img/tenant-management-assign-groups-modal.png)

   On confirmation, the modal closes, the table updates, and the assigned groups are shown:

   ![tenant-management-assign-groups-refreshed](./img/tenant-management-assign-groups-refreshed.png)

### Assign applications to a tenant

1. Click **Assigned applications** to view the applications assigned to the tenant, and click **Assign applications**:

   ![tenant-management-assign-applications](./img/tenant-management-assign-applications-tab.png)

1. Search and select the applications to assign to the tenant. After selecting the applications, click **Assign applications**:

   ![tenant-management-assign-applications-modal](./img/tenant-management-assign-applications-modal.png)

   On confirmation, the modal closes, the table updates, and the assigned applications are shown:

   ![tenant-management-assign-applications-refreshed](./img/tenant-management-assign-applications-refreshed.png)
