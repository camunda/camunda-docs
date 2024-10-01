---
id: deploy-process-application
title: Deploy and run your process application
description: You can deploy your process application to a cluster, and run your process application to test, debug, and observe how it performs in a live environment.
---

import DeployImg from './img/process-applications/define-stages-deploy.png'
import RunProcessApplicationImg from './img/process-applications/run-process-application.png'
import DeployErrorImg from './img/process-applications/deploy-error.png'

You can deploy your process application to a cluster, and run your process application to test, debug, and observe how it performs in a live environment.

## Deploy your process application

To deploy your process application:

1. Open the [main process](create-a-process-application.md#main-process).
1. Select **Deploy** to open the **Deploy process application** modal.
   <p><img src={DeployImg} alt="Deploy a process application" /></p>
1. Turn on the toggle for the cluster stage you want to deploy to. In Self-Managed, you may be prompted to enter your cluster details manually if no [configuration](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) is provided.
1. Perform any other actions as required, such as:
   - Unpausing the chosen cluster if it has been auto-paused. Select **Resume cluster** within the **Cluster Details**.
   - Managing the cluster. Select **Manage**.
   - [Defining the stages](process-application-pipeline.md#deployment-pipeline-stages) of your deployment pipeline. Select **Define stages**.
1. Select **Deploy** to deploy the process application to the selected cluster.

All BPMN, DMN, and form files contained in the process application folder are deployed as a single bundle.

:::note
If any resource fails to deploy, the whole deployment [fails](#deployment-errors) and the cluster state remains unchanged. This safely ensures that a process application cannot be deployed incompletely or in an inconsistent state.
:::

## Run a process application

You can run your process application to test, debug, and observe how it performs in a live environment.

To run your process application:

1. Open the [main process](create-a-process-application.md#main-process).
1. Select **Run** to open the **Start instance** modal.
   <p><img src={RunProcessApplicationImg} alt="Run a process application" /></p>
1. Select **Run** to start a new instance.<p><ul><li>Before the actual process instance is started, all resources are redeployed if required so the new instance
   always uses their latest state.</li><li>After the process instance is started, you will receive a notification with a link to the process instance view in
   [Operate](../../operate/operate-introduction.md). Open this link to monitor the process instance.</li></ul></p>

:::info
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
