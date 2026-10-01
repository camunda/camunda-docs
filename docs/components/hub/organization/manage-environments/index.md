---
id: manage-environments
title: Manage environments
description: "View the environments in your organization, monitor their status, open their applications, and add new environments."
---

Environments are the places where your teams deploy and run their processes. Use the **Environments** page in Camunda Hub to view every environment in your organization, monitor its status, and open its applications.

Each environment runs on a [cluster](/components/concepts/clusters.md), which you administer on the [cluster pages](../manage-clusters/index.md). To learn how environments and clusters relate, see [environments](/components/concepts/environments.md).

## Permissions

What you see on the **Environments** page depends on your role:

| Role                               | What you can do                                                                                                               |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Organization owner or admin        | View all environments, add an environment, assign environments to workspaces, and resume a paused environment (SaaS only).    |
| DevOps                             | View all environments, open the cluster pages, and resume a paused environment (SaaS only). DevOps can't assign environments. |
| Editor or admin in a workspace     | View the environments assigned to the workspaces where you are an editor or workspace admin.                                  |
| Viewer or commenter in a workspace | No access to environments.                                                                                                    |

## View environments

To view the environments in your organization, click **Environments** in the left navigation.

Each environment is displayed as a card with the following details:

| Detail     | Description                                                                                                                                          |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name       | The [name of the environment](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure). Select it to open the details.        |
| Cluster    | The cluster that hosts the environment.                                                                                                              |
| Tags       | The tags of the cluster, for example `dev` or `prod`.                                                                                                |
| Version    | The Camunda version of the cluster.                                                                                                                  |
| Status     | The [status](#environment-statuses) of the environment.                                                                                              |
| Workspaces | The workspaces the environment is assigned to. Organization owners and admins see **Unassigned** if the environment isn't assigned to any workspace. |

### Search and filter

Use the toolbar to find an environment:

- **Search environments**: Search by the name of an environment or the name of its cluster.
- **Status**, **Version**, and **Tag**: Show only the environments that match the selected values. Each filter lists only the values that exist in your organization.

### Environment statuses

The status of an environment reflects the state of its cluster:

| Status       | Availability | Description                                                                                                                                                                      |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Healthy      | All          | The environment is running.                                                                                                                                                      |
| Unhealthy    | All          | The environment reports a problem.                                                                                                                                               |
| Unknown      | All          | Camunda Hub can't determine the status.                                                                                                                                          |
| Creating     | SaaS         | The cluster is being created. You can't deploy to the environment until the cluster is ready.                                                                                    |
| Updating     | SaaS         | The cluster is being updated. You can still deploy to the environment, but the deployment may fail.                                                                              |
| Unavailable  | SaaS         | The cluster is under maintenance or waiting for input. You can't deploy to the environment.                                                                                      |
| Paused       | SaaS         | The cluster is paused. You can [resume](#resume-a-paused-environment) the environment.                                                                                           |
| Resuming     | SaaS         | The cluster is starting after being resumed.                                                                                                                                     |
| Not reported | Self-Managed | The environment is assigned to a workspace, but its cluster or Physical Tenant is no longer in the Camunda Hub configuration. It shows no live data, and you can't deploy to it. |

In SaaS, the status updates automatically while the cluster changes state, and settles on the health of the cluster when the change completes. In Self-Managed, Camunda Hub determines the status from the readiness addresses of the components. See [environment status](/self-managed/components/hub/configuration/properties.md#environment-status).

#### Resume a paused environment

Pausing and resuming is available only in SaaS. Organization owners, admins, and DevOps users can resume a paused environment:

1. In the left navigation, click **Environments**.
2. On the card of the paused environment, open the actions menu next to the status, and click **Resume**. You can also click **Resume** in the **Status** row of the environment details.

The status changes to **Resuming** while the cluster starts. Environments in Self-Managed don't pause.

## Open an environment

Select an environment to open its details. The **Overview** tab contains the following sections:

| Section              | Description                                                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Applications         | Cards to open Operate, Tasklist, Admin, and Optimize (where it's configured). An application shows **Unavailable** if Camunda Hub can't resolve its address.                                                                                                                         |
| Environment details  | The status, version, region, cluster, and IDs of the environment. If the environment is backed by a Physical Tenant, the details include the **Physical tenant ID**, which applies to Self-Managed only. In SaaS, the details include the **REST API** and **Swagger UI** addresses. |
| Jobs (last 24 hours) | The number of jobs that were created, completed, and not completed. Select **View all job types** for details. For more information, see the [job dashboard](../analyze-operations/job-dashboard.md).                                                                                |

Use the **Workspaces** tab to see the workspaces the environment is assigned to. Organization owners and admins can open a workspace from this list.

## Add a new environment

Camunda Hub adds environments automatically for each cluster. To add an environment, click **Add new environment** on the **Environments** page. Only organization owners and admins see this button.

- **SaaS**: [Create a cluster](../../../saas/clusters/create-cluster.md). Every cluster has one environment, which Camunda Hub creates automatically. Then [assign the environment to a workspace](./assign-environments.md).
- **Self-Managed**: Provision the cluster, and add it to the Camunda Hub configuration. On Camunda 8.10 and later, declare additional [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) if you need more than one environment on the cluster. Camunda Hub reads the configuration only at startup, so perform a rolling restart. The environments of the cluster then appear automatically. See [physical tenants in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#physical-tenants).

## Next steps

- [Assign environments to a workspace](./assign-environments.md).
- [Manage clusters](../manage-clusters/index.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
