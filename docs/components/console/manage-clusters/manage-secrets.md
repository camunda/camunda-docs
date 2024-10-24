---
id: manage-secrets
title: Connector secrets
description: Create secrets and reference them in your Connectors without exposing sensitive information in your BPMN processes.
---

Create secrets and reference them in your Connectors without exposing sensitive information in your BPMN processes.

:::caution
**Connector secrets** are managed at the cluster level, so ensure you deploy your processes to the cluster that contains the necessary secrets.
If you deploy and the secret is missing, [Operate](../../operate/operate-introduction.md) will show an incident.
:::

To create a new secret, go to your cluster and take the following steps:

1. Select the **Connector secrets** tab.

![secrets](./img/cluster-detail-secrets.png)

1. Click **Create new secret**.
2. Provide a **Key** for your secret that you will use to reference your secret from your Connector.
3. Provide the **Secret** that will be assigned to the **Key**.

![secrets-create](./img/cluster-detail-secrets-create.png)

4. Click **Create** and view your new secret in the list.

![secrets-view](./img/cluster-detail-secrets-view.png)

Now you can reference your secret in any Connector as described in the [Connectors guide](/components/connectors/use-connectors/index.md#using-secrets).

:::note
Find more information on managing [Connector secrets](/self-managed/connectors-deployment/connectors-configuration.md).
:::
