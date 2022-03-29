---
id: connect-to-camunda-cloud
title: Connect to Camunda Platform 8
description: "Camunda Modeler can communicate directly with Camunda Platform 8."
---

Desktop Modeler can communicate directly with Camunda Platform 8.

Click the deployment icon:

![deployment icon](./img/deploy-icon.png)

There are two options to select a target:

- A self-hosted solution
- Configure Camunda Platform 8

![deployment configuration](./img/deploy-diagram-camunda-cloud.png)

To connect and deploy a diagram to Camunda Platform 8, follow the steps below:

:::note
The BPMN diagram must not only be valid, but also understood by the Zeebe engine. For example, if you model a service task but do not configure the element, you will get an error message during deployment.
:::

1. Select **Camunda Platform 8**.
2. For the communication, you need the `Cluster Id` of your cluster and the credentials (`Client Id`, `Client Secret`) of your [API client](../../cloud-console/manage-clusters/manage-api-clients.md).

![deployment via Camunda Platform 8](./img/deploy-diagram-camunda-cloud-remember.png)

3. Select the **Remember** checkbox if you want your connection data to be persisted.
4. Click **Deploy** to perform the actual deployment.

![deployment successful](./img/deploy-diagram-camunda-cloud-success.png)
