---
title: Manage clusters
description: "View the clusters that host your deployment environments, and learn how clusters are created and managed in SaaS and Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

A cluster is the infrastructure that runs Camunda 8 and hosts your [environments](/components/concepts/environments.md). Learn how clusters relate to environments in [clusters](/components/concepts/clusters.md). How you work with clusters in Camunda Hub depends on your deployment.

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

## Permissions

Only organization owners, admins, and DevOps users see the **Clusters** page. Other users work with the environments assigned to their [workspace](/components/concepts/workspaces.md), and they don't see clusters.

## View clusters

To view your clusters, click **Environments** in the left navigation, and then click **Clusters** next to the page title.

The page lists your clusters. Each cluster shows the following details:

| Detail  | Description                                                                                              |
| :------ | :------------------------------------------------------------------------------------------------------- |
| Name    | The name of the cluster. Select it to open the cluster details.                                          |
| Status  | The [status](#cluster-statuses) of the cluster.                                                          |
| Version | The Camunda version of the cluster.                                                                      |
| Region  | The region where the cluster runs.                                                                       |
| Type    | The [cluster type](/components/saas/clusters.md#cluster-type): **Basic**, **Standard**, or **Advanced**. |

### Cluster statuses

The status of a cluster reflects its state. It updates automatically while the cluster changes state, and settles on the health of the cluster when the change completes.

| Status            | Description                                                                                               |
| :---------------- | :-------------------------------------------------------------------------------------------------------- |
| Healthy           | The cluster is running.                                                                                   |
| Unhealthy         | The cluster reports a problem.                                                                            |
| Unknown           | Camunda Hub can't determine the status.                                                                   |
| Creating          | The cluster is being created.                                                                             |
| Updating          | The cluster is being updated.                                                                             |
| Maintenance       | The cluster is under maintenance.                                                                         |
| Waiting for input | The cluster is waiting for input.                                                                         |
| Paused            | The cluster is paused. You can [resume](/components/saas/clusters/manage-cluster.md#resume-a-cluster) it. |
| Resuming          | The cluster is starting after being resumed.                                                              |

## Add a cluster

In SaaS, you create clusters in Camunda Hub. Every cluster you create gets one environment automatically. You choose the [cluster type and size](/components/saas/clusters.md), the region, the version, and a tag, such as `prod`, that appears on the environment of the cluster. Then an organization admin [assigns the environment to a workspace](../manage-environments/assign-environments.md) so teams can deploy to it.

See [create a cluster](/components/saas/clusters/create-cluster.md).

## View cluster details

Select a cluster to open its details. The header shows the name and status of the cluster.

### Overview

The overview summarizes the cluster in the following sections:

| Section         | Description                                                                                                                                                                                                                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Environments    | The environment the cluster hosts. Select the environment to open its details, and to open Operate, Tasklist, or Admin for it.                                                                                                                                |
| Cluster details | The status, type, size, generation, and tag of the cluster. From here you can resize the cluster, modify its tag, review an available update, and resume a paused cluster.                                                                                    |
| Components      | The health of the components of the cluster, such as the connector runtime. Click **Manage** on the **Connectors** tile to open [Connector Management](./manage-connectors.md).                                                                               |
| Jobs            | The jobs of the environment of the cluster for the last 24 hours: the number of jobs that were created, completed, and not completed. Select **View all job types** to see the jobs by type. See the [job dashboard](../analyze-operations/job-dashboard.md). |

### Cluster management actions

You can manage a cluster with the following actions:

| Task                                                   | Where to find it                                                            |
| :----------------------------------------------------- | :-------------------------------------------------------------------------- |
| Rename, resume, update, resize, or delete a cluster    | [Manage your cluster](/components/saas/clusters/manage-cluster.md)          |
| Create and manage API clients                          | [Manage API clients](/components/saas/clusters/manage-api-clients.md)       |
| Create secrets for your connectors                     | [Manage connector secrets](/components/saas/clusters/manage-secrets.md)     |
| Get notified when process instances stop with an error | [Create an alert](/components/saas/clusters/manage-alerts.md)               |
| Restrict access to the cluster                         | [Manage IP allowlists](/components/saas/clusters/manage-ip-allowlists.md)   |
| Back up the cluster                                    | [Create cluster backups](/components/saas/clusters/cluster-backups.md)      |
| Enable authorizations and other cluster settings       | [Manage cluster settings](/components/saas/clusters/settings.md)            |
| Record user and client operations                      | [Configure the audit log](/components/saas/clusters/configure-audit-log.md) |
| Check how well the cluster copes with its workload     | [Monitor cluster load](/components/saas/clusters/cluster-capacity.md)       |
| Fix common problems                                    | [Troubleshoot clusters](/components/saas/clusters/troubleshoot-clusters.md) |

To monitor and manage the connectors that run on a cluster, see [manage your connectors](./manage-connectors.md).

## Update a cluster

In SaaS, you update clusters in Camunda Hub. You can rename, resume, update, resize, and delete a cluster, and configure its settings. See [manage your cluster](/components/saas/clusters/manage-cluster.md) and [manage cluster settings](/components/saas/clusters/settings.md).

</TabItem>

<TabItem value='self-managed'>

## Permissions {#permissions-self-managed}

Only organization admins and DevOps users see the **Clusters** page. Other users work with the environments assigned to their [workspace](/components/concepts/workspaces.md), and they don't see clusters.

## View clusters {#view-clusters-self-managed}

To view your clusters, click **Environments** in the left navigation, and then click **Clusters** next to the page title.

Use the search box to find a cluster by name, and filter the list by status, version, and tag. Each cluster shows the following details:

| Detail       | Description                                                                           |
| :----------- | :------------------------------------------------------------------------------------ |
| Name         | The name of the cluster. Select it to open the cluster details.                       |
| Namespace    | The Kubernetes namespace of the cluster, if it's configured.                          |
| Version      | The Camunda version of the cluster.                                                   |
| Status       | The health of the cluster. See [cluster statuses](#cluster-statuses-self-managed).    |
| License      | The license of the cluster, if the cluster reports it.                                |
| Environments | The number of [environments](/components/concepts/environments.md) the cluster hosts. |

### Cluster statuses {#cluster-statuses-self-managed}

Camunda Hub monitors the health of the components of a cluster to determine its status. For details on how the status is determined, see the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environment-status).

| Status    | Description                                                                              |
| :-------- | :--------------------------------------------------------------------------------------- |
| Healthy   | The components of the cluster are healthy.                                               |
| Unhealthy | A component of the cluster reports a problem.                                            |
| Unknown   | Camunda Hub can't determine the status, for example because a component doesn't respond. |

## Add a cluster {#add-a-cluster-self-managed}

In Self-Managed, you provision and operate your clusters with your own platform tooling, outside Camunda Hub. Camunda Hub displays the clusters that are defined in its [configuration](/self-managed/components/hub/configuration/properties.md#clusters), and it is read-only for clusters, so you can't create, resize, update, or delete a cluster from it. To make a cluster you provision visible in Camunda Hub:

1. Provision the cluster with your platform tooling, as described in the [Self-Managed installation guide](/self-managed/setup/overview.md).
1. Add the cluster to the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters). Camunda Hub reads this configuration at startup, so perform a rolling restart of Camunda Hub to pick up the change.

Click **Register new cluster** on the **Clusters** page to see these steps in Camunda Hub. For the configuration options, see the [clusters](/self-managed/components/hub/configuration/properties.md#clusters) and [physical tenants](/self-managed/components/hub/configuration/properties.md#physical-tenants) sections of the Camunda Hub configuration.

After the restart, the cluster appears on the **Clusters** page, and each of its [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) appears as an environment. An organization admin can then [assign the environments to a workspace](../manage-environments/assign-environments.md).

## View cluster details {#view-cluster-details-self-managed}

Select a cluster to open its details. The header shows the status of the cluster and the number of environments it hosts.

### Overview {#overview-self-managed}

The overview summarizes the cluster in the following sections:

| Section         | Description                                                                                                                                                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Environments    | The environments the cluster hosts. Select an environment to open its details, and to open Operate, Tasklist, or Admin for it.                                                                                                                                 |
| Cluster details | The status, namespace, version, cluster ID, license, and the time Camunda Hub last synced with the cluster. It also shows any custom properties from the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters).       |
| Components      | The health and version of the components of the cluster, such as Zeebe, Operate, Tasklist, and Optimize.                                                                                                                                                       |
| Jobs            | The jobs of all environments of the cluster for the last 24 hours: the number of jobs that were created, completed, and not completed. Select **View all job types** to see the jobs by type. See the [job dashboard](../analyze-operations/job-dashboard.md). |
| Connectors      | The health and version of the connector runtime. Click **Manage** to open [Connector Management](./manage-connectors.md).                                                                                                                                      |

To monitor and manage the connectors that run on a cluster, see [manage your connectors](./manage-connectors.md).

## Update a cluster {#update-a-cluster-self-managed}

Updates to clusters happen outside Camunda Hub:

- To change how a cluster appears in Camunda Hub, for example its name, tags, [components](/self-managed/components/hub/configuration/properties.md#components), or Physical Tenants, update the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters), and perform a rolling restart.
- To upgrade or scale the cluster and its components, use your platform tooling. See the [upgrade guides](/self-managed/upgrade/index.md).

If you remove a cluster from the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters) but a workspace still uses its environments, they stay in the workspace with the status **Not reported**.

</TabItem>

</Tabs>

## Next steps

- Learn how to [manage environments](../manage-environments/index.md).
- Learn about [cluster types, sizes, and Free Trial clusters](/components/saas/clusters.md) in SaaS.
- Review the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#clusters) in Self-Managed.
- Learn how to [monitor connectors](./manage-connectors.md).
