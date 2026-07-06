---
id: settings
title: Settings
description: "Manage your cluster settings using authorizations, automatic cluster updates, and user task restrictions, or permanently delete the cluster."
---

Manage your cluster settings using authorizations, automatic cluster updates, and user task restrictions, or permanently delete the cluster.

## Manage cluster settings

To manage your cluster settings:

1. Navigate to **Camunda Hub**, and select the **Clusters** tab.
2. Select the cluster you want to manage, and select the **Settings** tab.
3. Enable/disable cluster settings as required, or delete the cluster.

![Cluster settings](./img/cluster-settings.png)

## Authorizations

You can enable authorizations on a per-cluster basis to control the level of access users and clients have over Orchestration Cluster resources.

- Enable this setting to use [authorizations](/components/concepts/access-control/authorizations.md) in the cluster.
- Disable this setting if you do not want to use authorizations in the cluster. You can still configure authorizations in the Orchestration Cluster Admin, but they are only applied to cluster when you enable this setting.

:::tip
Learn more about [resource-based authorizations](/components/concepts/access-control/authorizations.md).
:::

## Multi-tenancy

You can enable multi-tenancy checks on a per-cluster basis to enforce tenant-level authorization for the cluster's Orchestration Cluster resources.

- Enable this setting to enforce tenant-level authorization checks. Users, groups, and roles not assigned to a tenant lose access to any resources scoped to that tenant.
- Disable this setting to allow tenants to be created and principals assigned without enforcing checks. All data maps to the `<default>` tenant.

This setting is disabled by default. Only organization admins can change it, and it is available for clusters running generation 8.8 and later. The setting is reversible: disabling it restores the implicit `<default>`-tenant behavior.

For details on creating tenants and managing assignments, see [tenant management](/components/admin/tenant.md).

<!-- TODO: Confirm the exact minimum cluster generation and the final in-UI toggle label ("Multi-tenancy" vs "Multi-Tenancy") with eng. The Console toggle is shown on clusters that ship MultiTenancyConfiguration (Zeebe 8.8.0-alpha7+)... -->

:::warning
Before you enable multi-tenancy checks, assign all users, groups, and roles that need access to their tenants and to the `<default>` tenant. Once checks are enforced, any principal not assigned to a tenant loses access to the resources scoped to that tenant.
:::

## Automatic cluster updates

You can set the cluster to automatically update to newer versions of Camunda 8 when they are released.

- Enable this setting to automatically update the cluster when a new patch release is available. During an update, the cluster may be unavailable for a short time. You can still manually update the cluster.
- Disable this setting if you do not want the cluster to automatically update. You must manually update the cluster.

:::tip
For more information on updating clusters, see [update your cluster](/components/hub/organization/manage-clusters/manage-cluster.md#update-a-cluster).
:::

## Enforce user task restrictions

Starting with Camunda 8.10, this cluster setting is no longer available because user task access restrictions were removed together with Tasklist V1.

:::note
Use [authorization-based access control](../../../concepts/access-control/authorizations.md) and [user task authorization](/components/tasklist/user-task-authorization.md) to control task visibility and operations in current Tasklist deployments.
:::

## Delete this cluster

You can _permanently_ delete the selected cluster. See [delete your cluster](/components/hub/organization/manage-clusters/manage-cluster.md#delete-a-cluster).

:::caution
Deleting a cluster is permanent. You cannot reuse a cluster after it has been deleted.
:::
