---
id: deploy-to-self-managed
title: Deploy diagram
description: "Desktop Modeler can directly deploy diagrams and start process instances in Camunda Platform 8 Self-Managed."
---

Desktop Modeler can directly deploy diagrams and start process instances in Camunda Platform 8 Self-Managed. Follow the steps below to deploy a diagram:

1. Click the rocket-shaped deployment icon:

![deployment icon](./img/deploy-icon.png)

2. Click **Camunda Platform 8 Self-Managed**:

![deployment configuration](./img/deploy-empty.png)

3. Input the `Cluster endpoint`:

![deployment via Camunda Platform 8](./img/deploy-endpoint.png)

4. Select **OAuth**, and input the credentials in case your gateway requires authentication:

:::note
OAuth for gateway can be implemented with [zeebe-keycloak-interceptor](https://github.com/camunda-community-hub/zeebe-keycloak-interceptor).
:::

![oauth configuration](./img/deploy-with-oauth.png)

5. Select the **Remember** checkbox if you want to locally store the connection information.

6. Click **Deploy** to perform the actual deployment.

![deployment successful](./img/deploy-success.png)
