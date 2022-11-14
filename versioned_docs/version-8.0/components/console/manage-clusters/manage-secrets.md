---
id: manage-secrets
title: Manage secrets
description: Manage secrets for Connectors.
---

Create secrets and reference them in your Connectors without exposing sensitive information in your BPMN processes.

:::note Warning
**Connector Secrets** are managed at the cluster level, so ensure you deploy your processes to the cluster that contains the necessary secrets.
If you deploy and the secret is missing, Operate will show an incident.
:::

To create a new secret, go to your cluster and take the following steps:

1. Select the **Connector Secrets** tab.

![secrets](./img/cluster-detail-secrets.png)

1. Click **Create**.
2. Provide a **Key** for your secret that you will use to reference your secret from your Connector.
3. Provide the **Secret** that will be assigned to the **Key**.

![secrets-create](./img/cluster-detail-secrets-create.png)

4. Click **Create** and view your new secret in the list.

![secrets-view](./img/cluster-detail-secrets-view.png)

Now you can reference your secret with `secrets.MY_API_KEY` in any Connector field in the properties panel that supports this.
Each of the [out-of-the-box Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md) details which fields support secrets.

Keep in mind that secrets are **not variables** and must be wrapped in double quotes as follows when used in a FEEL expression:

```
= { myHeader: "secrets.MY_API_KEY"}
```

Using the secrets placeholder syntax, you can use secret in any part of a text, like in the following FEEL expression.
This example assumes there is a process variable `baseUrl` and a configured secret `TENANT_ID`:

```
= "https://" + baseUrl + "/{{secrets.TENANT_ID}}/accounting"
```

The engine will resolve the `baseUrl` variable and pass on the secrets placeholder to the Connector. Assuming the `baseUrl` variable resolves to `my.company.domain`,
the Connector receives the input `"https://my.company.domain/{{secrets.TENANT_ID}}/accounting"`. The Connector then replaces the secrets placeholder upon execution.
For further details on how secrets are implemented in Connectors, consult our [Connector SDK documentation](../../connectors/custom-built-connectors/connector-sdk.md#secrets).

:::note Warning
`secrets.*` is a reserved syntax. Don't use this for other purposes than referencing your secrets in Connector fields.
Using this in other areas can lead to unexpected results and incidents.
:::
