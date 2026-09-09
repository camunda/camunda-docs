---
id: create-cluster
title: Create a cluster
description: "Learn how to create a cluster and view its details."
---

To deploy and run your process, you must create a [cluster](/components/concepts/clusters.md) in Camunda 8.

## Create a cluster

To create a cluster in SaaS:

1. In Camunda Hub, in the left navigation under **Console**, click **Clusters**.
1. Click **Create cluster**.
1. Name your cluster.
1. Select your [region](/components/saas/regions.md).
1. Select a [cluster type](/components/concepts/clusters.md#cluster-type) and [cluster size](/components/concepts/clusters.md#cluster-size).
1. Assign a cluster tag to indicate what type of cluster it is.
1. Select your [encryption at rest protection level](/components/saas/encryption-at-rest.md) (enterprise only).
1. Select a channel and release. For the purpose of this guide, we recommend using the **Stable** channel and the latest generation.
1. If you are using a generation of version 8.8 or higher, select if you want to enable [authorization-based access control](/components/concepts/access-control/authorizations.md).
1. Click **Create cluster**.
1. Your cluster will take a few moments to create. Check the status on the **Clusters** page or by clicking into the cluster itself and looking at the **Applications** section.

If you haven't created a cluster yet, the **Clusters** page will be empty. You can start modeling even if the cluster shows a **Creating** status.

:::tip
In Self-Managed, review the [cluster configuration properties](/self-managed/components/hub/configuration/properties.md#clusters).
:::

## View the created cluster

After creating the cluster, you can view the new entry:

1. In the left navigation under **Console**, click **Clusters**.
1. The cluster is now being set up. During this phase, its state is **Creating**. After one or two minutes, the cluster is ready for use and changes its state to **Healthy**.
1. After the cluster is created, click the cluster name to visit the cluster detail page.

## Tag your cluster

You can tag your cluster for `dev`, `test`, `stage`, or `prod`:

1. In the left navigation under **Clusters**, select your cluster.
1. In the **Overview** tab under **Cluster Details**, click **Modify tag**.

Assigning a tag:

- Makes it easier for team members to clearly distinguish between different stages of the software development lifecycle.
- Has no impact on performance and can be changed later in the cluster details section of the cluster overview page.
- Disables [authorization-based access control](/components/concepts/access-control/authorizations.md) by default for `dev` and `test` clusters, and enables it for `stage` and `prod` clusters. You can change this setting during and after cluster creation.

See [clusters](/components/concepts/clusters.md) for more details.
