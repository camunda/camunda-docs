---
id: deploy-project
title: Deploy your project
description: Deploy your project to an environment assigned to your workspace.
---

import DeployErrorImg from './img/deploy-error.png'

Deploy your project to an environment assigned to your workspace, for example a testing, staging, or production environment.

## Deployment Environments

You deploy a project to an [environment](/components/concepts/environments.md), not to a cluster. The deploy dialog lists the environments that are assigned to the workspace of the project. Each entry shows the following details:

| Detail  | Description                                                                                                           |
| :------ | :-------------------------------------------------------------------------------------------------------------------- |
| Name    | The [name of the environment](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure).        |
| Cluster | The cluster that hosts the environment. Camunda Hub shows the cluster only if it's needed to tell environments apart. |
| Version | The Camunda version of the cluster, for example **Camunda 8.9**.                                                      |
| Tags    | The tags of the cluster, for example `dev`, `test`, `stage`, or `prod`.                                               |
| Status  | The [status](#environment-status) of the environment.                                                                 |

An organization admin decides which environments a workspace can use. Camunda Hub doesn't offer any other targets, and it doesn't select the next environment for you when you promote a project. You choose the environment you want to deploy to.

### Prerequisites

Before you deploy a project:

- An organization admin has [assigned at least one environment to the workspace](../../organization/manage-environments/assign-environments.md).
- You're a **Workspace Admin** or **Editor** in the workspace.
- You have permission to deploy in the target environment. If the cluster or its Physical Tenant has [authorizations](/components/admin/authorization.md) enabled, ensure you have the [`CREATE` permission to the `RESOURCE` resource type](/components/admin/authorization.md#create-an-authorization-in-admin).

Camunda Hub doesn't check your permissions before you deploy. The cluster decides whether you can deploy, and Camunda Hub shows you the result.

## Deploy your project

Once you've [validated your process](./validate-project.md), deploy your project to an environment in your [development lifecycle](./manage-projects.md#project-development-lifecycle), such as testing, staging, or production. For example, deploy to your testing environment to run automated tests or make it available for testing.

1. In your workspace, open a project.
1. At the top right of the project view, click the **Deploy & run** combo button, and select **Deploy latest changes**. This opens the **Deploy project** dialog.
1. Under **Deployment environment**, select the environment to deploy to. Camunda Hub preselects the first one.
1. If the environment has [Logical Tenants](/self-managed/concepts/multi-tenancy/logical-tenants.md), select one under **Logical tenant**. In Self-Managed, you can enter a **Logical tenant ID**, which is optional.
1. In Self-Managed, if the cluster uses Basic authentication, enter your **Username** and **Password** under **Authentication**.
1. Click **Deploy** to deploy the project to the selected environment.

When you deploy from the project homepage, all BPMN, DMN, and form files in the project are deployed as a single bundle. Camunda Hub confirms a successful deployment with **Project deployed!**

:::note
If any resource fails to deploy, the whole deployment [fails](#deployment-errors) and the environment state remains unchanged. This safely ensures that a project cannot be deployed incompletely or in an inconsistent state.
:::

:::tip
If you don't want to deploy all resources in a project, you can [deploy an individual resource](../modeler/run-or-publish-your-process.md#deploy-a-process).
:::

### Logical Tenants

If multi-tenancy is enabled, provide a [Logical Tenant](/self-managed/concepts/multi-tenancy/logical-tenants.md) for the target environment. If the environment has more than one Logical Tenant, choose the one to deploy to. If it has exactly one, Camunda Hub selects it automatically. On SaaS, a cluster that doesn't support tenants doesn't need one.

### Environment status

The status of an environment decides whether you can deploy to it:

| Status                        | What the dialog shows                                                                   | Can you deploy?                   |
| :---------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------- |
| Healthy                       | No message.                                                                             | Yes                               |
| Unhealthy                     | **Deployment may fail**: The selected environment is unhealthy.                         | Yes                               |
| Updating                      | **Deployment may fail**: The selected environment is updating.                          | Yes                               |
| Paused                        | To deploy to this environment, it needs to be resumed.                                  | No. Resume the environment first. |
| Resuming                      | **Environment is resuming**: Wait until the environment is healthy before deploying.    | No                                |
| Creating                      | **Environment is being created**: Wait until the environment is ready before deploying. | No                                |
| Removed or no longer reported | **Environment unavailable**: Select another environment to deploy.                      | No                                |

These messages appear in the SaaS deploy dialog. To resume a paused environment, click **Resume** next to it. Only organization owners, admins, and DevOps users see this button. You can also [resume the environment from the environments page](../../organization/manage-environments/index.md#resume-a-paused-environment).

### No Environment available

If no environment is assigned to the workspace, the dialog shows **No deployment environments available**. An organization admin must assign an environment to the workspace. If you can manage the environments of the workspace, click **Manage workspace environments** in the dialog to open the workspace settings.

### Production Environments

Camunda Hub treats an environment as a production environment if its tags include `prod`. Your organization can require that a project snapshot is approved before anyone deploys it to a production environment. When this is enabled, and you select a production environment, the dialog shows one of the following messages:

| Message               | Meaning                                                                                                                                                                         |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Approval required** | The project snapshot must be approved by a reviewer before it can be deployed to a production environment.                                                                      |
| **Snapshot required** | Drafts can't be deployed to a production environment. Create a project snapshot, get it approved, and deploy it. Click **Show snapshots** to open the snapshots of the project. |

Organization admins configure this in the [project deployment settings](/components/hub/workspace/modeler/modeler-settings.md#project-deployment). Learn how to [request a review](./project-versioning.md#request-a-review).

## Run your project

You can manually [run](/components/hub/workspace/modeler/run-or-publish-your-process.md#run-a-process) your project to test it after it has been deployed to an environment.

:::note
Use [Test mode](/components/hub/workspace/modeler/validation/test-your-process.md) to validate and debug your project against any environment assigned to your workspace. Use Run to execute a full process instance of your already-deployed project, for example to exercise your real job workers and APIs on a testing, staging, or production environment.
:::

To run your project:

1. In your workspace, open a project.
1. At the top right of the project view, click **Deploy & run** to open the **Deploy & run** modal.
1. Select the process for which you want to start a new instance in **Process to run**.
1. Select **Deploy & run** to start a new instance.
   - Before the process instance starts, all resources are redeployed if required so the new instance uses their latest state.
   - After the process instance starts, you will receive an **Instance started!** notification. Click **View process instance** to open the process instance in the [Operate](/components/operate/operate-introduction.md) of the environment, and monitor it.

You can also open the **Deploy & run** modal from the details page of any BPMN file in the project. In that case, the current process is run and the modal includes an additional option to select the resources to deploy.

If the target environment has [authorizations](/components/admin/authorization.md) enabled, make sure you have the following permissions to be able to view the process instance in Operate:

| Resource type        | Permission                                            |
| :------------------- | :---------------------------------------------------- |
| `PROCESS_DEFINITION` | `READ_PROCESS_DEFINITION` and `READ_PROCESS_INSTANCE` |
| `COMPONENT`          | `operate`                                             |

## Deployment errors

If the deployment of a project fails (for example, because one or more of the contained resources has invalid implementation properties), a modal is shown containing the error message thrown by the Zeebe engine. If the cluster rejects the deployment because you lack the permissions to deploy to the environment, the message says so. Contact your organization admin to request them.

The message typically provides the name of the affected resource, the ID of the invalid diagram element, and the error details.

<p><img src={DeployErrorImg} style={{width: 680}} alt="project deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the project itself (external resources) from any process inside a project.
When you deploy the project, linked resources located outside the project are _not_ deployed with the project, so you must deploy them separately.

## Next steps

- [Run or publish a process](../modeler/run-or-publish-your-process.md)
- [Sync your Git repository](./git-sync.md)
