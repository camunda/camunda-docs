---
id: settings
title: Settings
description: "Manage your cluster settings using authorizations, automatic cluster updates, and user task restrictions, or permanently delete the cluster."
---

Manage your cluster settings using authorizations, automatic cluster updates, and user task restrictions, or permanently delete the cluster.

## Manage cluster settings

To manage your cluster settings:

1. Navigate to **Console**, and select the **Clusters** tab.
2. Select the cluster you want to manage, and select the **Settings** tab.
3. Enable/disable cluster settings as required, or delete the cluster.

![Cluster settings](./img/cluster-settings.png)

## Authorizations

You can enable authorizations on a per-cluster basis to control the level of access users and clients have over Orchestration Cluster resources.

- Enable this setting to use [authorizations](/components/concepts/access-control/authorizations.md) in the cluster.
- Disable this setting if you do not want to use authorizations in the cluster. You can still configure authorizations in the Orchestration Cluster Identity, but they are only applied to cluster when you enable this setting.

:::tip
For more information, see [authorizations](/components/concepts/access-control/authorizations.md).
:::

## Automatic cluster updates

You can set the cluster to automatically update to newer versions of Camunda 8 when they are released.

- Enable this setting to automatically update the cluster when a new patch release is available. During an update, the cluster may be unavailable for a short time. You can still manually update the cluster.
- Disable this setting if you do not want the cluster to automatically update. You must manually update the cluster.

:::tip
For more information on updating clusters, see [update your cluster](/components/console/manage-clusters/manage-cluster.md#update-a-cluster).
:::

## Enforce user task restrictions

You can enable user task access restrictions in the cluster to restrict Tasklist task access to assigned/candidate users and groups.

:::caution Tasklist V1 only
User task access restrictions are supported only by the Tasklist V1 API and are not available in Tasklist V2.
From Camunda 8.8, Tasklist runs in V2 mode by default.

To continue using user task access restrictions, see
[switching between V1 and V2 modes](components/tasklist/api-versions.md#switching-between-v1-and-v2-modes)
to enable Tasklist V1 mode.

In Tasklist V2, task visibility is controlled by authorization-based access control rather than user task access
restrictions. This includes:

- Process-level permissions that allow managers to see and act on user tasks of a process (for example, `READ_USER_TASK`, `UPDATE_USER_TASK`, and, where configured, `CLAIM_USER_TASK` and `COMPLETE_USER_TASK`).
- Task-level permissions that provide fine-grained control over individual user tasks.
- Property-based access control on task attributes such as `assignee`, `candidateUsers`, and `candidateGroups`.

For a conceptual overview of authorization, see
[authorization-based access control](../../concepts/access-control/authorizations.md).

For details on how the REST APIs apply authorization when handling requests, see
[Authentication and authorization](../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).
:::

- Enable this setting to use user task access restrictions in the cluster. Tasks assigned to users or candidate groups are only visible to assigned users or respective group members.
- Disable this setting if you do not want to use user task access restrictions in the cluster. Any user can see any task, regardless of the assignment. Use this mode in development environments to test assignment rules.

Changes to this setting can take a few minutes to be applied, as it requires a Tasklist restart.

:::tip
For more information on user task access restrictions, see [user task access restrictions](/components/tasklist/user-task-access-restrictions.md).
:::

## Delete this cluster

You can _permanently_ delete the selected cluster. See [delete your cluster](/components/console/manage-clusters/manage-cluster.md#delete-a-cluster).

:::caution
Deleting a cluster is permanent. You cannot reuse a cluster after it has been deleted.
:::
