---
id: manage-cluster
title: Manage your cluster
description: "Follow these steps to rename, resume, update, or delete your cluster."
---

Read through the following sections to rename, resume, update, or delete your cluster.

## Rename a cluster

A cluster can be renamed at any time. To rename your cluster, follow the steps below:

1. Open the cluster details by clicking on the cluster name.
2. Select the three vertical dots next to the cluster name near the top of the page to open the cluster's menu.
3. Click **Rename**.

![cluster-rename](./img/cluster-rename.png)

## Resume a cluster

**Cluster auto-pause** is not yet available and only applies to non-Enterprise clusters. Development clusters will be paused if they go unused for two hours.

When a cluster is paused, not all functionality will be limited, including the execution of BPMN timers and BPMN message catch events.

To resume your cluster, navigate to the **Clusters** tab in Console, select the cluster name, and click **Resume cluster** within the **Cluster Details**.

## Update a cluster

:::note
This action cannot be undone. Updated clusters cannot be reverted to the previous version.
:::

Clusters can be updated to new versions of Camunda 8 manually or automatically.

Clusters eligible for updates will show a button on the UI.

At this time, updates do not trigger backups, however, manual backups can be initiated through the Console Backups tab.

### Update a cluster manually

When an update is available, an **Update** button will appear. This button is not available for clusters enrolled in [automatic updates](/reference/auto-updates.md).

### Automated cluster updates

You can decide if you want to have [automated updates](/reference/auto-updates.md) to new versions of Camunda 8 activated. You can also toggle this feature anytime later in the **Settings** tab of your cluster.

## Delete a cluster

:::note
This action cannot be undone.
:::

A cluster can be deleted at any time. To delete your cluster, navigate to the **Clusters** tab in the top navigation and click **Delete** to the far right of the cluster name.
