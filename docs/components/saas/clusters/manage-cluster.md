---
id: manage-cluster
title: Manage your cluster
description: "Follow these steps to rename, resume, update, resize, or delete your cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Learn how to rename, resume, update, resize, or delete your cluster.

:::note
This page applies to Camunda 8 SaaS. For clusters in Self-Managed, see [clusters in Self-Managed](/components/hub/organization/manage-clusters/index.md).
:::

## View clusters

To view your clusters in Camunda Hub, click **Environments** in the left navigation, and then click **Clusters** next to the page title. You only see **Clusters** if you're an organization owner, admin, or DevOps user.

The cluster page lists the environments that a cluster hosts. To manage the environments themselves, see [manage environments](../../hub/organization/manage-environments/index.md).

## Rename a cluster

You can safely rename a cluster at any time.

To rename a cluster:

1. In the left navigation, click **Environments**, click **Clusters**, and then select a cluster.
2. At the top of the view, next to the cluster name, open the vertical ellipsis menu.
3. Click **Rename**.

## Resume a cluster

If a cluster is paused, you can resume it during deployment or from the cluster details view.

### Resume during deployment

To resume the cluster during deployment:

1. While deploying a [project](/components/hub/workspace/manage-projects/deploy-project.md) or a [file](/components/hub/workspace/modeler/run-or-publish-your-process.md), select a paused cluster.
2. In the **Paused cluster** notification, click **Resume**.

### Resume from cluster details

You can resume your paused cluster from Camunda Hub at any time.

1. In the left navigation, click **Environments**, click **Clusters**, and then select the paused cluster.
2. On the **Overview** tab, under **Cluster details**, click **Resume cluster**.

## Update a cluster

:::warning
Updating a cluster is permanent. Updated clusters cannot be reverted to the previous version.
:::

To update a cluster:

1. On the cluster's **Overview** tab, find the **Cluster details** section.
1. If an update is available, you'll see a **Review Update** button in the **Generation** row.

Currently, updates do not automatically trigger backups. Camunda recommends [creating a manual backup](./cluster-backups.md#create-a-manual-backup) before updating.

### Minor updates

If you update a cluster to another minor version, you cannot immediately update the cluster again until a 24-hour period has elapsed. This ensures all background processes have completed and the cluster is ready for further updates.

This does not apply when upgrading between generations of the same minor version.

| Example scenario           | Time limit applied?                                        |
| :------------------------- | :--------------------------------------------------------- |
| `8.8 gen22` to `8.9 gen1`  | 24 hours required before the cluster can be updated again. |
| `8.8 gen22` to `8.8 gen23` | No time limit applied.                                     |

:::note
Clusters must be healthy before an update can be performed.
:::

### Automated cluster updates

You can enable [automated patch updates](/components/saas/auto-updates.md).

## Resize a cluster

You can increase or decrease the [cluster size](/components/saas/clusters.md#cluster-size) at any time. For example, increase the cluster size to improve performance and add capacity, or decrease the cluster size to free up reservations for another cluster.

1. In the left navigation, click **Environments**, click **Clusters**, and then select your cluster.
1. On the **Overview** tab, next to the cluster type, click **Resize cluster**.
1. Select the new cluster size from the available sizes.
1. Click **Confirm** to resize the cluster, or **Cancel** to close the modal without resizing the cluster.

:::note
To increase the cluster size beyond the maximum 4x size, [reach out to Camunda](https://camunda.com/contact-us/). This requires custom sizing and pricing.
:::

## Delete a cluster

:::caution
Deleting a cluster is **permanent** and cannot be undone.
:::

Deleting a cluster also removes the environments it hosts, so they're no longer available to any workspace.

You can delete a cluster at any time:

1. In the left navigation, click **Environments**, click **Clusters**, and then select your cluster.
1. On the **Settings** tab, click **Delete**.
1. If you're sure you want to _permanently_ delete the cluster, confirm the deletion.
