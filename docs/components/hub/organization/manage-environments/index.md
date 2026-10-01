---
id: manage-environments
title: Manage environments
description: "View the environments in your organization, open their applications, resume a paused environment, and learn how to add a new one."
---

Environments are the places where your teams deploy and run their processes. Use the **Environments** page in Camunda Hub to see every environment in your organization, check its status, and open its applications.

An environment runs on a [cluster](/components/concepts/clusters.md). Cluster administration stays on the [cluster pages](../manage-clusters/index.md). To learn how environments and clusters relate, see [environments](/components/concepts/environments.md).

## Permissions

What you see on the **Environments** page depends on your role:

| Role                               | What you can do                                                                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Organization owner or admin        | See every environment, add a new environment, resume a paused environment, and assign environments to workspaces.               |
| DevOps                             | See every environment, resume a paused environment, and open the cluster pages. DevOps can't assign environments to workspaces. |
| Editor or admin in a workspace     | See the environments assigned to workspaces where you're an editor or workspace admin.                                          |
| Viewer or commenter in a workspace | See no environments.                                                                                                            |

## View environments

To view the environments in your organization, click **Environments** in the left navigation.

Each environment appears as a card with the following details:

| Detail     | Description                                                                                                                                   |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Name       | The [name of the environment](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure). Select it to open the details. |
| Cluster    | The cluster that hosts the environment. Camunda Hub shows the cluster only when its name differs from the environment name.                   |
| Tags       | The tags of the cluster, for example `dev` or `prod`.                                                                                         |
| Version    | The Camunda version of the cluster.                                                                                                           |
| Status     | The [status](#environment-statuses) of the environment.                                                                                       |
| Workspaces | The workspaces the environment is assigned to. Organization owners and admins see **Unassigned** if there are none.                           |

### Search and filter

Use the toolbar to find an environment:

- **Search environments**: Search by the name of the environment or the name of its cluster.
- **Status**, **Version**, and **Tag**: Show only the environments that match. Each filter lists only the values that exist in your organization.

In Self-Managed, use the **Layout** toggle to switch between **Grid** and **By cluster**. **By cluster** groups environments under the cluster that hosts them.

### Environment statuses

| Status       | Description                                                                                                                                                                                       |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Healthy      | The environment is running.                                                                                                                                                                       |
| Unhealthy    | The environment reports a problem.                                                                                                                                                                |
| Paused       | The cluster is paused. In SaaS, you can [resume](#resume-a-paused-environment) it.                                                                                                                |
| Resuming     | The cluster is starting after a resume.                                                                                                                                                           |
| Unknown      | Camunda Hub can't determine the status.                                                                                                                                                           |
| Not reported | In Self-Managed, the environment is assigned to a workspace, but its cluster or Physical Tenant is no longer in the Camunda Hub configuration. It shows no live data, and you can't deploy to it. |

An environment can also show **Creating**, **Updating**, or **Unavailable** while its cluster changes state. In Self-Managed, Camunda Hub determines the status from the readiness addresses of the components. See [environment status](/self-managed/components/hub/configuration/properties.md#environment-status).

## Open an environment

Select an environment to open its details. The **Overview** tab has the following sections:

| Section              | Description                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Applications         | Cards to open Operate, Tasklist, Admin, and Optimize (where it's configured). An application shows **Unavailable** if Camunda Hub can't resolve its link.                                                       |
| Environment details  | The status, version, region, cluster, and IDs of the environment. In Self-Managed 8.10 and later, this includes the **Physical tenant ID**. In SaaS, it includes the **REST API** and **Swagger UI** addresses. |
| Jobs (last 24 hours) | The number of jobs that were created, completed, and not completed. Select **View all job types** for details. See [job dashboard](../analyze-operations/job-dashboard.md).                                     |

Use the **Workspaces** tab to see the workspaces the environment is assigned to. Organization owners and admins can open a workspace from this list.

## Resume a paused environment

In SaaS, an organization owner, admin, or DevOps user can resume a paused environment:

1. In the left navigation, click **Environments**.
2. On the card of the paused environment, open the actions menu next to the status, and click **Resume**. You can also click **Resume** in the **Status** row of the environment details.

The status changes to **Resuming** while the cluster starts. Self-Managed environments don't pause.

## Add a new environment

Camunda Hub adds environments automatically when a cluster exists. To add one, click **Add new environment** on the **Environments** page. Only organization owners and admins see this button.

- **SaaS**: [Create a cluster](../manage-clusters/create-cluster.md). Every cluster gets one environment automatically. Then [assign the environment to a workspace](./assign-environments.md).
- **Self-Managed**: Provision the cluster. On Camunda 8.10 and later, declare additional [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) if you need more than one environment on the cluster. Configure the cluster in Camunda Hub, and perform a rolling restart. Camunda Hub reads the configuration only at startup, and the environments of the cluster then appear automatically. See [environments in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environments).

## Next steps

- [Assign environments to a workspace](./assign-environments.md).
- [Manage clusters](../manage-clusters/index.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
