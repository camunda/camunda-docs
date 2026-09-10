---
id: manage-secrets
title: Manage connector secrets
description: Create secrets and reference them in your connectors without exposing sensitive information in your BPMN processes.
---

Create secrets and reference them in your connectors without exposing sensitive information in your BPMN processes.

:::warning
**Connector secrets** are managed at the cluster level, so ensure you deploy your processes to the cluster that contains the necessary secrets.
If you deploy and the secret is missing, [Operate](../../../operate/operate-introduction.md) will show an incident.
:::

## Create a secret

To manage secrets in SaaS:

1. In the left navigation under **Clusters**, select a cluster.
1. On the **Connector secrets** tab, click **Create new secret**.
1. Provide a **Key** for your secret that you will use to reference your secret from your connector.
1. Provide the **Value** that will be assigned to the **Key**.
1. Click **Create** and view your new secret in the list.

:::tip
In Self-Managed, review [connector secrets configuration](/self-managed/components/connectors/connectors-configuration.md).
:::

## Use secrets in a workflow

Secrets are used inside connector tasks in your BPMN model. Add a connector task, then reference the secret key in a field that supports secrets.

Example for a plain text field (for example, an authorization header value):

```txt
Bearer {{secrets.MY_API_KEY}}
```

Example for a FEEL expression (note the double quotes around the placeholder):

```feel
= { myHeader: "{{secrets.MY_API_KEY}}" }
```

For more details on where secrets are supported, see the [Connectors guide](/components/connectors/use-connectors/index.md#using-secrets).

Now you can reference your secret in any connector as described in the [Connectors guide](/components/connectors/use-connectors/index.md#using-secrets).

To reuse a complete set of authentication and connection settings, rather than a single value, see [credentials](/components/hub/organization/credentials/index.md). A credential's sensitive fields reference secrets you create here.
