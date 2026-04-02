---
id: deploy-process-application
title: Validate and deploy your process application
description: Validate your process application in development before deploying it to testing, staging, or production.
---

import DeployImg from './img/deploy-process-application.png'
import DeployFileImg from './img/deploy-file.png'
import DeployErrorImg from './img/deploy-error.png'
import ResourcesToDeployImg from './img/resources-to-deploy.png'
import RunProcessApplicationImg from './img/run-process-application.png'

Validate your process application in development before deploying it to testing, staging, or production.

## Validate your process application

Use [Play mode](../validation/play-your-process.md) to validate your process application in development.

1. Open the main process.
1. Select the **Play** tab to play the process application using your selected development cluster.
1. Perform validation as required, for example, debug your process logic and test the process application.

:::info
To learn more about using Play for validation, see [Play mode for rapid validation](../validation/play-your-process.md)
:::

## Deploy your process application

### Before deploying a process application

- If the target cluster has [authorizations](/components/admin/authorization.md) enabled, make sure that the deploying users have `CREATE` permission to the `RESOURCE` resource type.

Once validation is complete, deploy your process application to cluster stages in your [development lifecycle](./process-application-pipeline.md), such as testing, staging, or production. For example, deploy to your testing cluster to run automated tests or make it available for testing.

1. Open the [process application homepage](create-a-process-application.md#process-application-homepage).
1. Select the **Deploy latest changes** option from the **Deploy & run** combo button to open the **Deploy process application** modal.
   <p><img src={DeployImg} alt="Deploy a process application" /></p>
1. Turn on the toggle for the cluster stage you want to deploy to. In Self-Managed, you may be prompted to enter your cluster details manually if no [configuration](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) is provided.
1. Perform any other actions as required, such as:
   - Unpausing the chosen cluster if it has been auto-paused. Select **Resume cluster** within the **Cluster Details**.
   - Managing the cluster. Select **Manage**.
1. Select **Deploy** to deploy the process application to the selected cluster.

All BPMN, DMN, and form files contained in the process application are deployed as a single bundle.

In Self-Managed, you can deploy your diagram to the cluster defined in your Web Modeler [configuration](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters).

:::note
If any resource fails to deploy, the whole deployment [fails](#deployment-errors) and the cluster state remains unchanged. This safely ensures that a process application cannot be deployed incompletely or in an inconsistent state.
:::

You can also open the deployment modal from the details page of any deployable file in the process application. In that case, the modal includes an additional option to select the resources to deploy.

<p><img src={DeployFileImg} alt="Deploy a process application" /></p>

## Run your process application

You can manually [run](/components/modeler/web-modeler/run-or-publish-your-process.md#run-a-process) your process application to test it after it has been deployed to a testing, staging, or production cluster.

:::note
Use Play to validate your process application in a development cluster, and only use Run when interacting with other stages such as testing, staging, or production.
:::

To run your process application:

1. Open the [process application homepage](create-a-process-application.md#process-application-homepage).
1. Select **Deploy & run** to open the **Deploy & run process application** modal.
   <p><img src={RunProcessApplicationImg} alt="Run a process application" /></p>
1. Select the process for which you want to start a new instance in **Process to run**.
1. Select **Deploy & run** to start a new instance.<p><ul><li>Before the process instance starts, all resources are redeployed if required so the new instance uses their latest state.</li><li>After the process instance starts, you will receive a notification with a link to the process instance view in [Operate](../../../operate/operate-introduction.md). Open this link to monitor the process instance. If the target cluster has [authorizations](/components/admin/authorization.md) enabled, make sure you have the following permissions to be able to view the process instance in Operate:<ul><li>`READ_PROCESS_DEFINITION` and `READ_PROCESS_INSTANCE` permissions on the `PROCESS_DEFINITION` resource type</li><li>`operate` permission to the `COMPONENT` resource type</li></ul></li></ul></p>

You can also open the **Deploy & run** modal from the details page of any BPMN file in the process application. In that case, the current process is run and the modal includes an additional option to select the resources to deploy.

<p><img src={ResourcesToDeployImg} alt="Resources to deploy" /></p>

## Deployment errors

If the deployment of a process application fails (for example, because one or more of the contained resources has invalid implementation properties), a modal is shown containing the error message thrown by the Zeebe engine.

The message typically provides the name of the affected resource, the ID of the invalid diagram element, and the error details.

<p><img src={DeployErrorImg} style={{width: 680}} alt="Process application deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the process application itself (external
resources) from any process inside a process application. When you deploy the process application, linked external resources are _not_ deployed with it. Deploy them separately.
