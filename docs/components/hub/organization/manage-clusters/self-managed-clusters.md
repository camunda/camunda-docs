---
id: self-managed-clusters
title: Clusters in Self-Managed
description: "View the Self-Managed clusters that Camunda Hub shows, check their health and components, and learn how to make a cluster you provision visible in Camunda Hub."
---

In Self-Managed, you provision and operate your clusters with your own platform tooling, outside Camunda Hub. Camunda Hub displays the clusters that are defined in its [configuration](/self-managed/components/hub/configuration/properties.md#clusters), giving organization admins and DevOps users a central view of cluster health and of the [environments](/components/concepts/environments.md) each cluster hosts. Camunda Hub is read-only for clusters, so you can't create, resize, update, or delete a cluster from it.

## Permissions

Only organization owners, admins, and DevOps users see the **Clusters** page. Other users work with the Environments assigned to their [workspace](/components/concepts/workspaces.md), and they don't see clusters.

## View clusters

To view your clusters, click **Environments** in the left navigation, and then click **Clusters** next to the page title.

Use the search box to find a cluster by name, and filter the list by status, version, and tag. Each cluster shows the following details:

| Detail       | Description                                                                           |
| :----------- | :------------------------------------------------------------------------------------ |
| Name         | The name of the cluster. Select it to open the cluster details.                       |
| Namespace    | The Kubernetes namespace of the cluster, if it's configured.                          |
| Version      | The Camunda version of the cluster.                                                   |
| Status       | The health of the cluster. See [cluster status](#cluster-status).                     |
| License      | The license of the cluster, if the cluster reports it.                                |
| Environments | The number of [Environments](/components/concepts/environments.md) the cluster hosts. |

### Cluster status

Camunda Hub determines the status of a cluster from the readiness addresses of its components. A cluster is **Healthy** when its components are healthy, **Unhealthy** when a component reports a problem, and **Unknown** when Camunda Hub can't determine the status. See [Environment status](/self-managed/components/hub/configuration/properties.md#environment-status).

## Register a new cluster

Camunda Hub doesn't create clusters. To make a cluster you provision visible in Camunda Hub:

1. Provision the cluster with your platform tooling, as described in the [Self-Managed installation guide](/self-managed/setup/overview.md).
1. Add the cluster to the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters). Camunda Hub reads this configuration at startup, so perform a rolling restart of Camunda Hub to pick up the change.

Click **Register new cluster** on the **Clusters** page to see these steps in Camunda Hub. For the configuration options, see the [clusters](/self-managed/components/hub/configuration/properties.md#clusters) and [physical tenants](/self-managed/components/hub/configuration/properties.md#physical-tenants) sections of the Camunda Hub configuration.

After the restart, the cluster appears on the **Clusters** page, and each of its [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) appears as an [Environment](/components/concepts/environments.md). An organization admin can then [assign the Environments to a workspace](../manage-environments/assign-environments.md).

## View cluster details

Select a cluster to open its details. The header shows the status of the cluster and the number of Environments it hosts. The **Overview** has the following sections:

| Section         | Description                                                                                                                                                                                                                                              |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Environments    | The Environments the cluster hosts. Select an Environment to open its details, and to open Operate, Tasklist, or Admin for it.                                                                                                                           |
| Cluster details | The status, namespace, version, cluster ID, license, and the time Camunda Hub last synced with the cluster. It also shows any custom properties from the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters). |
| Components      | The health and version of the components of the cluster, such as Zeebe, Operate, Tasklist, and Optimize.                                                                                                                                                 |
| Jobs            | A summary of the jobs of the cluster, if the cluster supports it. See the [job dashboard](../analyze-operations/job-dashboard.md).                                                                                                                       |
| Connectors      | The health and version of the connector runtime. Click **Manage** to open [Connector Management](./manage-connectors.md).                                                                                                                                |

## Jobs

The details of a cluster summarize the jobs of all of its environments for the last 24 hours: the number of jobs that were created, completed, and not completed. Select **View all job types** to see the jobs by type. For more information, see the [job dashboard](../analyze-operations/job-dashboard.md).

## Update a cluster

Updates to clusters happen outside Camunda Hub:

- To change how a cluster appears in Camunda Hub, for example its name, tags, [components](/self-managed/components/hub/configuration/properties.md#components), or Physical Tenants, update the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters), and perform a rolling restart.
- To upgrade or scale the cluster and its components, use your platform tooling. See the [upgrade guides](/self-managed/upgrade/index.md).

If you remove a cluster from the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters) but a workspace still uses its Environments, they stay in the workspace with the status **Not reported**.

## Next steps

- Learn how to [manage Environments](../manage-environments/index.md).
- Review the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters).
- Learn how to [monitor connectors](./manage-connectors.md).
- Using Camunda 8 SaaS? See [clusters in SaaS](./saas-clusters.md).
