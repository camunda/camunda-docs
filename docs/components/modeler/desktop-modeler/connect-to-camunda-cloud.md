---
id: connect-to-camunda-cloud
title: Connect to Camunda Cloud
description: "Camunda Modeler can communicate directly with Camunda Cloud."
---

Desktop Modeler can directly deploy diagrams and start process instances in Camunda Cloud. Follow the steps below, to deploy a diagram:

1. Click the deployment icon:

![deployment icon](./img/deploy-icon.png)

2. Click **Camunda Cloud SaaS**, or alternatively, select **Camunda Cloud Self-Managed** if you for example want to deploy to a [local installation](../../../../self-managed/zeebe-deployment/local/install/):

![deployment configuration](./img/deploy-diagram-camunda-cloud.png)

3. Input the `Cluster URL` and the credentials (`Client ID`, `Client Secret`) of your [API client](../../cloud-console/manage-clusters/manage-api-clients.md):

![deployment via camunda cloud](./img/deploy-diagram-camunda-cloud-remember.png)

4. Select the **Remember** checkbox if you want to locally store the connection information.

5. Click **Deploy** to perform the actual deployment.

![deployment successful](./img/deploy-diagram-camunda-cloud-success.png)
