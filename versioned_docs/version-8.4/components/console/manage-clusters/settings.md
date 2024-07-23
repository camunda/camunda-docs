---
id: settings
title: Settings
description: "Manage your cluster settings or permanently delete the cluster."
---

Manage your cluster settings or permanently delete the cluster.

![Cluster settings](./img/cluster-settings.png)

## Resource-based authorizations

You can enable resource-based authorization on a per-cluster basis to control the level of access users have to system resources.

- Enable this setting to use resource-based authorization in the cluster. You must define resource access for each user as users no longer have access to all process and decision definitions.
- Disable this setting if you do not want to use resource-based authorization in the cluster. You can still configure resource authorizations, but they are only applied to cluster users when you enable this setting.

:::tip
For more information on resource-based authorization, see [Resource authorizations](/components/concepts/resource-authorizations.md) and [resource-based authorization](/components/console/manage-organization/manage-users.md/#resource-based-authorizations).
:::

## Delete this cluster

You can _permanently_ delete the selected cluster.

- To delete the cluster, see [Delete your cluster](/components/console/manage-clusters/delete-cluster.md).

:::caution
Deleting a cluster is permanent. You cannot reuse a cluster after it has been deleted.
:::
