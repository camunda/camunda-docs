---
id: manage-environments
title: Manage environments
description: "View the environments in your organization, monitor their status, open their applications, and learn how new environments are added."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Environments are the places where your teams deploy and run their processes. Use the **Environments** page in Camunda Hub to view every environment in your organization, monitor its status, and open its applications.

Each environment runs on a [cluster](/components/concepts/clusters.md), which you administer on the [cluster pages](../manage-clusters/index.md). To learn how environments and clusters relate, see [environments](/components/concepts/environments.md).

## Permissions

Your role determines which environments you can see and what you can do with them across Camunda Hub, for example on the organization's **Environments** page, in workspaces, and projects:

| Role                               | What you can do                                                                                                               |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Organization owner or admin        | View all environments, assign environments to workspaces, and resume a paused environment (SaaS only).                        |
| DevOps                             | View all environments, open the cluster pages, and resume a paused environment (SaaS only). DevOps can't assign environments. |
| Editor or admin in a workspace     | View the environments assigned to the workspaces where you are an editor or workspace admin.                                  |
| Viewer or commenter in a workspace | No access to environments.                                                                                                    |

## Environment details

Camunda Hub provides details for each environment. Select an environment on the **Environments** page to open them. The details depend on your deployment:

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

| Detail     | Description                                                                                                                                          |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name       | The [name of the environment](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure).                                       |
| Cluster    | The cluster that hosts the environment.                                                                                                              |
| Tags       | The tags of the cluster, for example `dev` or `prod`.                                                                                                |
| Version    | The Camunda version of the cluster.                                                                                                                  |
| Region     | The region where the cluster runs.                                                                                                                   |
| Status     | The [status](#environment-statuses) of the environment.                                                                                              |
| IDs        | The IDs of the environment.                                                                                                                          |
| Addresses  | The **REST API** and **Swagger UI** addresses of the environment.                                                                                    |
| Workspaces | The workspaces the environment is assigned to. Organization owners and admins see **Unassigned** if the environment isn't assigned to any workspace. |

### Environment statuses

The status of an environment reflects the state of its cluster. In SaaS, the status updates automatically while the cluster changes state, and settles on the health of the cluster when the change completes.

| Status      | Description                                                                                         |
| :---------- | :-------------------------------------------------------------------------------------------------- |
| Healthy     | The environment is running.                                                                         |
| Unhealthy   | The environment reports a problem.                                                                  |
| Unknown     | Camunda Hub can't determine the status.                                                             |
| Creating    | The cluster is being created. You can't deploy to the environment until the cluster is ready.       |
| Updating    | The cluster is being updated. You can still deploy to the environment, but the deployment may fail. |
| Unavailable | The cluster is under maintenance or waiting for input. You can't deploy to the environment.         |
| Paused      | The cluster is paused. You can [resume](#resume-a-paused-environment) the environment.              |
| Resuming    | The cluster is starting after being resumed.                                                        |

#### Resume a paused environment

Organization owners, admins, and DevOps users can resume a paused environment wherever Camunda Hub shows its status, for example on the **Environments** page, in the environment details, or when you select an environment to deploy to. The status changes to **Resuming** while the cluster starts, and then to **Healthy**.

</TabItem>

<TabItem value='self-managed'>

| Detail             | Description                                                                                                                                          |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name               | The [name of the environment](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure).                                       |
| Cluster            | The cluster that hosts the environment.                                                                                                              |
| Tags               | The tags of the cluster, for example `dev` or `prod`.                                                                                                |
| Version            | The Camunda version of the cluster.                                                                                                                  |
| Status             | The [status](#environment-statuses-self-managed) of the environment.                                                                                 |
| Physical tenant ID | The ID of the Physical Tenant, if the environment is backed by one.                                                                                  |
| IDs                | The IDs of the environment.                                                                                                                          |
| Workspaces         | The workspaces the environment is assigned to. Organization owners and admins see **Unassigned** if the environment isn't assigned to any workspace. |

### Environment statuses {#environment-statuses-self-managed}

The status of an environment reflects the state of its cluster. In Self-Managed, Camunda Hub monitors the health of the components of each environment to determine its status. For details on how the status is determined, see the [Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environment-status).

| Status       | Description                                                                                                                                                                      |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Healthy      | The environment is running.                                                                                                                                                      |
| Unhealthy    | The environment reports a problem.                                                                                                                                               |
| Unknown      | Camunda Hub can't determine the status, for example because a component doesn't respond.                                                                                         |
| Not reported | The environment is assigned to a workspace, but its cluster or Physical Tenant is no longer in the Camunda Hub configuration. It shows no live data, and you can't deploy to it. |

</TabItem>

</Tabs>

## Search and filter environments

To find relevant environments, go to the **Environments** page of your Hub organization. Use the toolbar to narrow down the list:

- **Search environments**: Search by the name of an environment or the name of its cluster.
- **Status**, **Version**, and **Tag**: Show only the environments that match the selected values. Each filter lists only the values that exist in your organization.

## Environment applications

Each environment has its own instances of the Camunda applications. Open an application from the details of the environment. An application shows **Unavailable** if Camunda Hub can't resolve its address.

| Application | Description                                                                                                                         |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Operate     | Monitor and troubleshoot the process instances of the environment. See [Operate](/components/operate/operate-introduction.md).      |
| Tasklist    | Work on the user tasks of the environment. See [Tasklist](/components/tasklist/introduction-to-tasklist.md).                        |
| Admin       | Manage authentication, authorization, and administration for the environment. See [Admin](/components/admin/admin-introduction.md). |
| Optimize    | Analyze and improve your processes, where Optimize is configured. See [Optimize](/components/optimize/what-is-optimize.md).         |

## Jobs

The details of an environment summarize its jobs for the last 24 hours: the number of jobs that were created, completed, and not completed. Select **View all job types** to see the jobs by type. For more information, see the [job dashboard](../analyze-operations/job-dashboard.md).

## Workspaces assigned to an environment

The details of an environment list the workspaces that the environment is assigned to. Organization owners and admins can open a workspace from this list. An environment that isn't assigned to any workspace is shown as **Unassigned**.

To change the assignment, see [assign environments to a workspace](./assign-environments.md).

## Add a new environment

<Tabs groupId="edition" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

In SaaS, you add an environment by creating a cluster. Every SaaS cluster has one environment, which Camunda Hub creates automatically when the cluster is created.

1. [Create a cluster](../../../saas/clusters/create-cluster.md). The environment of the cluster appears on the **Environments** page.
1. [Assign the environment to a workspace](./assign-environments.md) so that teams can deploy to it.

</TabItem>

<TabItem value='self-managed'>

In Self-Managed, you add an environment by adding a cluster or a [Physical Tenant](/self-managed/concepts/multi-tenancy/physical-tenants.md) to the Camunda Hub configuration. You provision clusters outside Camunda Hub. A cluster has an environment for its `default` Physical Tenant, and, on Camunda 8.10 and later, one for each additional Physical Tenant you declare.

1. Provision the cluster with your platform tooling.
1. Add the cluster to the Camunda Hub configuration, and declare any additional Physical Tenants. See [physical tenants in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#physical-tenants).
1. Perform a rolling restart of Camunda Hub. Camunda Hub reads the configuration at startup. After the restart, the environments appear on the **Environments** page.
1. [Assign the environments to a workspace](./assign-environments.md) so that teams can deploy to them.

</TabItem>

</Tabs>

## Next steps

- [Assign environments to a workspace](./assign-environments.md).
- [Manage clusters](../manage-clusters/index.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
