---
id: settings
title: Settings
description: "Manage your cluster settings using resource-based authorizations and automatic cluster updates, or permanently delete the cluster."
---

Manage your cluster settings using resource-based authorizations and automatic cluster updates, or permanently delete the cluster.

## Manage cluster settings

To manage your cluster settings:

1. Navigate to **Console**, and select the **Clusters** tab.
2. Select the cluster you want to manage, and select the **Settings** tab.
3. Enable/disable cluster settings as required, or delete the cluster.

![Cluster settings](./img/cluster-settings.png)

## Resource-based authorizations

You can enable resource-based authorization on a per-cluster basis to control the level of access users have over system resources.

- Enable this setting to use resource-based authorization in the cluster. You must define resource access for each user as users no longer have access to all process and decision definitions.
- Disable this setting if you do not want to use resource-based authorization in the cluster. You can still configure resource authorizations, but they are only applied to cluster users when you enable this setting.

:::tip
For more information on resource-based authorization, see [resource authorizations](/components/concepts/resource-authorizations.md) and [resource-based authorization](/components/console/manage-organization/manage-users.md#resource-based-authorizations).
:::

## Automatic cluster updates

You can set the cluster to automatically update to newer versions of Camunda 8 when they are released.

- Enable this setting to automatically update the cluster when a new patch release is available. During an update, the cluster may be unavailable for a short time. You can still manually update the cluster.
- Disable this setting if you do not want the cluster to automatically update. You must manually update the cluster.

:::tip
For more information on updating clusters, see [update your cluster](/components/console/manage-clusters/update-cluster.md).
:::

## Delete this cluster

You can _permanently_ delete the selected cluster. See [delete your cluster](/components/console/manage-clusters/delete-cluster.md).

:::caution
Deleting a cluster is permanent. You cannot reuse a cluster after it has been deleted.
:::
