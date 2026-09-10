---
id: manage-secrets
title: Manage connector secrets
description: Create secrets and reference them in your connectors without exposing sensitive information in your BPMN processes.
---

Create [SaaS-managed secrets](/reference/glossary.md#saas-managed-secret) and reference them in your connectors without exposing sensitive information in your BPMN processes.

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

Secrets are used inside connector tasks in your BPMN model. Add a connector task, then reference the secret key with a [legacy secret reference](/reference/glossary.md#secret-reference-legacy) in a field that supports secrets.

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

## Reference connector secrets as `camunda.secrets.<name>`

In SaaS, you can also reference the connector secrets you create here through centralized secret resolution by using `camunda.secrets.<key>`. You can use these references in process models, input mappings, FEEL expressions, and Connector fields, in addition to the legacy `{{secrets.KEY}}` syntax.

To learn how to use these references, see [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings). To understand how Camunda resolves a reference before job activation, see [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

In SaaS, the secret store is provisioned and managed for you. You don't configure a store type, path, or credentials. Add and update values on the **Connector secrets** tab; the cluster can resolve them without additional setup.

In Self-Managed, an operator must [configure the secret store](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).

A reference name must match `[\p{Alnum}_-]+`. Only keys that contain letters, digits, `_`, and `-` can therefore be referenced as `camunda.secrets.<key>`. A key that contains a period (`.`), such as one used in a file extension, is stored but cannot be referenced this way. A key with a `-` must be backtick-escaped in FEEL (for example, `` =camunda.secrets.`db-password` ``), because a bare `-` is FEEL's minus operator.
