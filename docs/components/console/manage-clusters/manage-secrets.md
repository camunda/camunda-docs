---
id: manage-secrets
title: Manage secrets
description: Manage secrets for connectors.
---

Create secrets and reference them in your connectors without exposing sensitive information in your BPMN processes.

:::note Warning
**Connector Secrets** are managed at the cluster level, so ensure you deploy your processes to the cluster that contains the necessary secrets.
If you deploy and the secret is missing, Operate will show an incident.
:::

To create a new secret, go to your cluster and take the following steps:

1. Select the **Connector Secrets** tab.

![secrets](./img/cluster-detail-secrets.png)

1. Click **Create**.
2. Provide a **Key** for your secret that you will use to reference your secret from your connector.
3. Provide the **Secret** that will be assigned to the **Key**.

![secrets-create](./img/cluster-detail-secrets-create.png)

4. Click **Create** and view your new secret in the list.

![secrets-view](./img/cluster-detail-secrets-view.png)

Now you can reference your secret like this: `secrets.MY_API_KEY` in any connector field in the properties panel that is marked with the FEEL Expression icon: ![feel-icon](./img/feel-icon.png). Keep in mind secrets are not variables and must be wrapped in double quotes as follows:

```
= { myHeader: "secrets.MY_API_KEY"}
```

:::note Warning
`secrets.*` is a reserved syntax. Don't use this for other purposes than referencing your secrets in any of your variables or FEEL expressions.
If you use the syntax and deploy, the engine will search a secret and Operate will show an incident.
:::
