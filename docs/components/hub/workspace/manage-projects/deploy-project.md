---
id: deploy-project
title: Deploy your project
description: Deploy your project to a testing, staging, or production environment.
---

import DeployErrorImg from './img/deploy-error.png'

Deploy your project to a testing, staging, or production environment.

## Deployment stages

The deployment pipeline has the following stages:

| Stage       | Description                                                                                                     |
| :---------- | :-------------------------------------------------------------------------------------------------------------- |
| Development | Use to create and test new software features and changes.                                                       |
| Testing     | Use for quality checks, ensuring software meets defined standards before release.                               |
| Staging     | Use for controlled testing where changes are validated before deployment to production.                         |
| Production  | The live system with the latest software. Only administrators and organization owners can deploy to this stage. |

To define your deployment pipeline stages, follow the [connect clusters](./create-a-project.md#connect-clusters) instructions.

:::note

- For each stage, an administrator must define the cluster to deploy to. Deployments can only be made to the pre-defined set of approved clusters. An **Undefined stages** warning is shown if no cluster is selected for at least one stage.
- Each deployment action is logged with information on the user and stage it was deployed to.
  :::

### Prerequisites

Make sure you've [set up a project](./create-a-project.md), including at least one cluster.

Only users with correct privileges can deploy:

- If the target cluster has [authorizations](/components/admin/authorization.md) enabled, ensure deploying users have [`CREATE` permission to the `RESOURCE` resource type](/components/admin/authorization.md#create-an-authorization-in-admin).
- Configure your [deployment settings](/components/hub/workspace/modeler/modeler-settings.md#project-deployment)

## Deploy your project

Once you've [validated your process](./validate-project.md), deploy your project to cluster stages in your [development lifecycle](./manage-projects.md#project-development-lifecycle), such as testing, staging, or production. For example, deploy to your testing cluster to run automated tests or make it available for testing.

1. In your workspace, open a project.
1. At the top right of the project view, click the **Deploy & run** combo button, and select **Deploy latest changes**. This opens the deployment modal.
1. Select the cluster stage to deploy to. The next stage is not automatically selected. You must select the stage you want to promote to.
1. If the cluster is paused, you must resume it.
1. Click **Deploy** to deploy the project to the selected cluster.

When you deploy from the project homepage, all BPMN, DMN, and form files in the project are deployed as a single bundle.

In Self-Managed, you can deploy your project to the cluster defined in your Camunda Hub [configuration](/self-managed/components/hub/configuration/properties.md#clusters).

:::note
If any resource fails to deploy, the whole deployment [fails](#deployment-errors) and the cluster state remains unchanged. This safely ensures that a project cannot be deployed incompletely or in an inconsistent state.
:::

## Run your project

You can manually [run](/components/hub/workspace/modeler/run-or-publish-your-process.md#run-a-process) your project to test it after it has been deployed to a testing, staging, or production cluster.

:::note
Use [Test mode](/components/hub/workspace/modeler/validation/test-your-process.md) to validate and debug your project against any environment. Use Run to execute a full process instance of your already-deployed project, for example to exercise your real job workers and APIs on a testing, staging, or production cluster.
:::

To run your project:

1. In your workspace, open a project.
1. At the top right of the project view, click **Deploy & run** to open the **Deploy & run** modal.
1. Select the process for which you want to start a new instance in **Process to run**.
1. Select **Deploy & run** to start a new instance.
   - Before the process instance starts, all resources are redeployed if required so the new instance uses their latest state.
   - After the process instance starts, you will receive a notification with a link to the process instance view in [Operate](/components/operate/operate-introduction.md). Open this link to monitor the process instance.

If the target cluster has [authorizations](/components/admin/authorization.md) enabled, make sure you have the following permissions to be able to view the process instance in Operate:

| Resource type        | Permission                                            |
| :------------------- | :---------------------------------------------------- |
| `PROCESS_DEFINITION` | `READ_PROCESS_DEFINITION` and `READ_PROCESS_INSTANCE` |
| `COMPONENT`          | `operate`                                             |

## Deployment errors

If the deployment of a project fails (for example, because one or more of the contained resources has invalid implementation properties), a modal is shown containing the error message thrown by the Zeebe engine.

The message typically provides the name of the affected resource, the ID of the invalid diagram element, and the error details.

<p><img src={DeployErrorImg} style={{width: 680}} alt="project deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the project itself (external resources) from any process inside a project.
When you deploy the project, linked resources located outside the project are _not_ deployed with the project, so you must deploy them separately.

## Next steps

- [Run or publish a process](../modeler/run-or-publish-your-process.md)
- [Sync your Git repository](./git-sync.md)
