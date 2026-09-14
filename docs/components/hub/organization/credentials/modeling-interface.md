---
id: credentials-modeling-interface
title: Configure credentials in the modeling interface
description: "Select, create, edit, and upgrade a credential from the properties panel in the Camunda Hub modeling interface."
keywords: [credential, credentials, modeling, authentication]
---

Select an existing [credential](./index.md) on a connector task in the Camunda Hub modeling interface, or create a new one without leaving the properties panel.

:::note
This page covers credentials that authenticate connector tasks, such as an AWS Credential. It is unrelated to the [client credentials](/components/hub/workspace/modeler/run-or-publish-your-process.md#missing-client-credentials) required to deploy or run a process, which authenticate Camunda Hub against your cluster.
:::

## Select a credential

Connectors that support credentials show a credential field in the properties panel, such as **AWS Credential**. Select the field to open the credential chooser, which lists the credentials on the cluster that match the credential type the connector needs.

Selecting a credential stores only a reference to it in your diagram. The credential's values stay on the cluster.

If no credential matches, the chooser tells you so by name, for example `Cannot find AWS Credential with name AWS_PROD`. This usually means the credential does not exist on the cluster, or it was created for a different credential type.

## What you can do in the chooser

What the chooser offers depends on your permissions on the cluster. Camunda Hub checks your permissions once per cluster connection.

| Situation                                                                    | Available actions                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------- |
| Permission to create credentials                                             | Select a credential, or create a new one.         |
| Permission to update credentials, and the selected credential is compatible  | Select a credential, or edit the selected one.    |
| Permission to update credentials, and the selected credential is out of date | Select a credential, or upgrade the selected one. |
| No permission to create or update credentials                                | Select a credential only.                         |

A connector declares the minimum credential version it needs. A newer credential always satisfies an older requirement, so upgrading is only needed when a credential is older than the connector requires.

## Create a credential

To create a credential from the properties panel:

1. Open the credential field, then select the option to create a new credential.
2. Enter a **Credential name**. Camunda Hub suggests a **Credential ID** based on the name.
3. Change the **Credential ID** if you want a different one. You cannot change it after the credential is created.
4. Fill in the fields for this credential type. For a sensitive field, enter a reference to a secret that already exists on the cluster, using `camunda.secrets.` followed by the secret key, such as `camunda.secrets.AWS_SECRET_KEY`.
5. Save the credential. Camunda Hub creates it on the cluster and selects it on the connector task.

Camunda Hub checks whether the secret you referenced exists on the cluster, without revealing its value. If the secret is missing, you see a warning, but you can still save the credential. The connector fails at runtime until the secret exists.

:::note
You cannot create the secret itself here. Add the secret to the cluster first in [Connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md), then reference it from the credential.
:::

A credential you create here is managed in Camunda Hub immediately. It appears on the **Managed** tab of the [**Credentials** page](./index.md#managed-credentials).

## Edit or upgrade a credential

Editing a credential opens the same form, pre-filled with its current values. Saving replaces the credential's values on the cluster, which takes effect immediately for every process that references it.

Upgrading a credential opens the same form and shows the fields that the newer credential version adds. Fill them in and save to make the credential usable with the connector version you are modeling against.

## Additional resources

- [Credentials](./index.md)
- [Run or publish your process](/components/hub/workspace/modeler/run-or-publish-your-process.md)
