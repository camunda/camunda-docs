---
id: create-cluster
title: Create a cluster
description: "Learn how to create a cluster and view its details."
---

To deploy and run your process, you must create a [cluster](/components/concepts/clusters.md) in Camunda 8. Every cluster you create in SaaS gets one [environment](/components/concepts/environments.md) automatically, and you [assign it to a workspace](../../hub/organization/manage-environments/assign-environments.md) so teams can deploy to it.

:::note
This page applies to Camunda 8 SaaS. For clusters in Self-Managed, see [clusters in Self-Managed](/components/hub/organization/manage-clusters/index.md).
:::

## Create a cluster

To create a cluster, click **Environments** in the left navigation of Camunda Hub, click **Clusters**, and then click **Create cluster**. Then complete the following steps:

1. Name your cluster.
1. Select your [region](/components/saas/regions.md).
1. Select a [cluster type](/components/saas/clusters.md#cluster-type) and [cluster size](/components/saas/clusters.md#cluster-size).
1. Assign a cluster tag that represents the lifecycle phase of the cluster: `dev`, `test`, `stage`, or `prod`. See [tag your cluster](#tag-your-cluster).
1. Select your [encryption at rest protection level](/components/saas/encryption-at-rest.md) (enterprise only).
1. Select a channel and a release. The channel decides which releases you can choose from:
   - The **Stable** channel provides generally available releases that are ready for most users. See the [stable channel](/reference/announcements-release-notes/release-policy.md#stable-channel).
   - The **Alpha** channel provides alpha releases, which let you try the upcoming minor release and give feedback before it reaches the stable channel. See the [alpha channel](/reference/announcements-release-notes/release-policy.md#alpha-channel).

   A release is identified by its [generation](/reference/glossary.md#generation), the set of component versions that the cluster runs. See [generation names](/reference/announcements-release-notes/release-policy.md#generation-names). For the purpose of this guide, we recommend using the **Stable** channel and the latest generation.

1. If you are using a generation of version 8.8 or higher, select if you want to enable [authorization-based access control](/components/concepts/access-control/authorizations.md).
1. Click **Create cluster**.
1. Your cluster will take a few moments to create. Check the status on the **Clusters** page or by clicking into the cluster itself.

If you haven't created a cluster yet, the **Clusters** page will be empty. You can start modeling even if the cluster shows a **Creating** status.

## View the created cluster

After creating the cluster, click **Environments** in the left navigation, and then click **Clusters** to view the new entry.

The cluster is now being set up. During this phase, its state is **Creating**. After one or two minutes, the cluster is ready for use and changes its state to **Healthy**.

After the cluster is created, click the cluster name to open the cluster details.

## Tag your cluster

A cluster tag represents the lifecycle phase of the cluster. Tag your cluster as `dev`, `test`, `stage`, or `prod`:

1. In the left navigation, click **Environments**, click **Clusters**, and then select your cluster.
1. On the **Overview** tab under **Cluster Details**, click **Modify tag**.

Assigning a tag:

- Makes it easier for team members to distinguish between the lifecycle phases of your clusters.
- Shows the tag on each [environment](/components/concepts/environments.md#environment-tags) of the cluster.
- Has no impact on performance and can be changed later in the cluster details section of the cluster overview page.
- Disables [authorization-based access control](/components/concepts/access-control/authorizations.md) by default for `dev` and `test` clusters, and enables it for `stage` and `prod` clusters. You can change this setting during and after cluster creation.

See [clusters](/components/concepts/clusters.md) for more details.
