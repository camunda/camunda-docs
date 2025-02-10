---
id: deploy-process-application
title: Validate and deploy your process application
description: Validate your process application in development before deploying it to testing, staging, or production.
---

import DeployImg from './img/process-applications/define-stages-deploy.png'
import RunProcessApplicationImg from './img/process-applications/run-process-application.png'
import DeployErrorImg from './img/process-applications/deploy-error.png'

Validate your process application in development before deploying it to testing, staging, or production.

## Validate your process application

Use [Play mode](/components/modeler/web-modeler/play-your-process.md) to validate your process application in development.

1. Open the [main process](create-a-process-application.md#main-process).
1. Select the **Play** tab to play the process application using your selected development cluster.
1. Perform validation as required, for example, debug your process logic and test the process application.

:::info
To learn more about using Play for validation, see [Play mode for rapid validation](/components/modeler/web-modeler/play-your-process.md)
:::

## Deploy your process application

Once validation is complete, deploy your process application to cluster stages in your [development lifecycle](/components/modeler/web-modeler/process-application-pipeline.md), such as testing, staging, or production. For example, deploy to your testing cluster to run automated tests or make it available for testing.

1. Open the [main process](create-a-process-application.md#main-process).
1. Select the **Implement** tab.
1. Select **Deploy** to open the **Deploy process application** modal.
   <p><img src={DeployImg} alt="Deploy a process application" /></p>
1. Turn on the toggle for the cluster stage you want to deploy to. In Self-Managed, you may be prompted to enter your cluster details manually if no [configuration](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) is provided.
1. Perform any other actions as required, such as:
   - Unpausing the chosen cluster if it has been auto-paused. Select **Resume cluster** within the **Cluster Details**.
   - Managing the cluster. Select **Manage**.
   - [Defining the stages](process-application-pipeline.md#deployment-pipeline-stages) of your deployment pipeline. Select **Define stages**.
1. Select **Deploy** to deploy the process application to the selected cluster.

All BPMN, DMN, and form files contained in the process application folder are deployed as a single bundle.

In Self-Managed, you can deploy your diagram to the cluster defined in your Web Modeler [configuration](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters). You should have the `Zeebe` [role](/self-managed/identity/user-guide/roles/add-assign-role.md#add-a-role) assigned in Identity to be authorized to deploy.

:::note
If any resource fails to deploy, the whole deployment [fails](#deployment-errors) and the cluster state remains unchanged. This safely ensures that a process application cannot be deployed incompletely or in an inconsistent state.
:::

## Run your process application

You can manually [run](/components/modeler/web-modeler/run-or-publish-your-process.md#run-a-process) your process application to test it after it has been deployed to a testing, staging, or production cluster.

:::note
Use Play to validate your process application in a development cluster, and only use Run when interacting with other stages such as testing, staging, or production.
:::

To run your process application:

1. Open the [main process](create-a-process-application.md#main-process).
1. Select the **Implement** tab.
1. Select **Run** to open the **Start instance** modal.
   <p><img src={RunProcessApplicationImg} alt="Run a process application" /></p>
1. Select **Run** to start a new instance.<p><ul><li>Before the process instance starts, all resources are redeployed if required so the new instance uses their latest state.</li><li>After the process instance starts, you will receive a notification with a link to the process instance view in [Operate](../../operate/operate-introduction.md). Open this link to monitor the process instance.</li></ul></p>

:::note
Single-file deployment is not supported in a process application. If you select **Deploy** or **Run** in any diagram other than the main process, you are prompted to open the main process for deployment.
:::

## Deployment errors

If the deployment of a process application fails (for example, because one or more of the contained resources has invalid implementation properties), a modal is shown containing the error message thrown by the Zeebe engine.

The message typically provides the name of the affected resource, the ID of the invalid diagram element, and the error details.

<p><img src={DeployErrorImg} style={{width: 680}} alt="Process application deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the process application itself (external
resources) from any process inside a process application.

Note that when you deploy the process application:

- Linked external forms are deployed together with the process application.
- Linked external BPMN and DMN diagrams are _not_ deployed together. You must deploy these separately.
