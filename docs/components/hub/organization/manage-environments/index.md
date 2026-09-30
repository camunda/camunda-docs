---
id: manage-environments
title: Manage Environments
description: "View the Environments in your organization, open their applications, resume a paused Environment, and learn how to add a new one."
---

Environments are the places where your teams deploy and run their processes. Use the **Environments** page in Camunda Hub to see every Environment in your organization, check its status, and open its applications.

An Environment runs on a [cluster](/components/concepts/clusters.md). Cluster administration stays on the [cluster pages](../manage-clusters/index.md). To learn how Environments and clusters relate, see [Environments](/components/concepts/environments.md).

## Permissions

What you see on the **Environments** page depends on your role:

| Role                               | What you can do                                                                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Organization owner or admin        | See every Environment, add a new Environment, resume a paused Environment, and assign Environments to workspaces.               |
| DevOps                             | See every Environment, resume a paused Environment, and open the cluster pages. DevOps can't assign Environments to workspaces. |
| Editor or admin in a workspace     | See the Environments assigned to workspaces where you're an editor or workspace admin.                                          |
| Viewer or commenter in a workspace | See no Environments.                                                                                                            |

## View Environments

To view the Environments in your organization, click **Environments** in the left navigation.

Each Environment appears as a card with the following details:

| Detail     | Description                                                                                                                 |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Name       | The [name of the Environment](/components/concepts/environments.md#environment-names). Select it to open the details.       |
| Cluster    | The cluster that hosts the Environment. Camunda Hub shows the cluster only when its name differs from the Environment name. |
| Tags       | The tags of the cluster, for example `dev` or `prod`.                                                                       |
| Version    | The Camunda version of the cluster.                                                                                         |
| Status     | The [status](#environment-statuses) of the Environment.                                                                     |
| Workspaces | The workspaces the Environment is assigned to. Organization owners and admins see **Unassigned** if there are none.         |

### Search and filter

Use the toolbar to find an Environment:

- **Search environments**: Search by the name of the Environment or the name of its cluster.
- **Status**, **Version**, and **Tag**: Show only the Environments that match. Each filter lists only the values that exist in your organization.

In Self-Managed, use the **Layout** toggle to switch between **Grid** and **By cluster**. **By cluster** groups Environments under the cluster that hosts them.

### Environment statuses

| Status       | Description                                                                                                                                                                                       |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Healthy      | The Environment is running.                                                                                                                                                                       |
| Unhealthy    | The Environment reports a problem.                                                                                                                                                                |
| Paused       | The cluster is paused. In SaaS, you can [resume](#resume-a-paused-environment) it.                                                                                                                |
| Resuming     | The cluster is starting after a resume.                                                                                                                                                           |
| Unknown      | Camunda Hub can't determine the status.                                                                                                                                                           |
| Not reported | In Self-Managed, the Environment is assigned to a workspace, but its cluster or Physical Tenant is no longer in the Camunda Hub configuration. It shows no live data, and you can't deploy to it. |

An Environment can also show **Creating**, **Updating**, or **Unavailable** while its cluster changes state. In Self-Managed, Camunda Hub determines the status from the readiness addresses of the components. See [Environment status](/self-managed/components/hub/configuration/properties.md#environment-status).

## Open an Environment

Select an Environment to open its details. The **Overview** tab has the following sections:

| Section              | Description                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Applications         | Cards to open Operate, Tasklist, Admin, and Optimize (where it's configured). An application shows **Unavailable** if Camunda Hub can't resolve its link.                                                       |
| Environment details  | The status, version, region, cluster, and IDs of the Environment. In Self-Managed 8.10 and later, this includes the **Physical tenant ID**. In SaaS, it includes the **REST API** and **Swagger UI** addresses. |
| Jobs (last 24 hours) | The number of jobs that were created, completed, and not completed. Select **View all job types** for details. See [job dashboard](../analyze-operations/job-dashboard.md).                                     |

Use the **Workspaces** tab to see the workspaces the Environment is assigned to. Organization owners and admins can open a workspace from this list.

## Resume a paused Environment

In SaaS, an organization owner, admin, or DevOps user can resume a paused Environment:

1. In the left navigation, click **Environments**.
2. On the card of the paused Environment, open the actions menu next to the status, and click **Resume**. You can also click **Resume** in the **Status** row of the Environment details.

The status changes to **Resuming** while the cluster starts. Self-Managed Environments don't pause.

## Add a new Environment

Camunda Hub adds Environments automatically when a cluster exists. To add one, click **Add new environment** on the **Environments** page. Only organization owners and admins see this button.

- **SaaS**: [Create a cluster](../manage-clusters/create-cluster.md). Every cluster gets one Environment automatically. Then [assign the Environment to a workspace](./assign-environments.md).
- **Self-Managed**: Provision the cluster. On Camunda 8.10 and later, declare additional [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) if you need more than one Environment on the cluster. Configure the cluster in Camunda Hub, and perform a rolling restart. Camunda Hub reads the configuration only at startup, and the Environments of the cluster then appear automatically. See [Environments in the Camunda Hub configuration](/self-managed/components/hub/configuration/properties.md#environments).

## Next steps

- [Assign Environments to a workspace](./assign-environments.md).
- [Manage clusters](../manage-clusters/index.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
