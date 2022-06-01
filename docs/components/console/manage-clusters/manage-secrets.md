---
id: manage-secrets
title: Manage Secrets
description: Manage Secrets for connectors
---

Create Secrets and reference them in your connectors without exposing sensitive information in your BPMN processes.

:::note Warning
**Connector Secrets** are managed at the cluster level, so ensure you deploy your processes to the cluster that contains the necessary Secrets.
If you deploy and the Secret is missing, Operate will show an incident.
:::

To create a new Secret, go to your cluster and take the following steps:

1. Select the **Connector Secrets** tab.

![secrets](./img/cluster-detail-secrets.png)

1. Click **Create**.
2. Provide a **Key** for your Secret that you will use to reference your Secret from your Connector.
3. Provide the **Secret** that will be assigned to the **Key**.

![secrets-create](./img/cluster-detail-secrets-create.png)

4. Click **Create** and view your new Secret in the list.

![secrets-view](./img/cluster-detail-secrets-view.png)

Now you can reference your Secret like this: `secrets.MY_API_KEY` in any connector field in the properties panel that is marked with the FEEL Expression icon: ![feel-icon](./img/feel-icon.png).

:::note Warning
`secrets.*` is a reserved syntax. Don't use this for other purposes than referencing your Secrets in any of your variables or FEEL expressions.
If you use the syntax and deploy, the engine will search a Secret and Operate will show an incident.
:::
