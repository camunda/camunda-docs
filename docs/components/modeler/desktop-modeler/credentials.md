---
id: credentials
title: Use credentials
description: "Select, create, edit, and upgrade a credential from the properties panel in Desktop Modeler."
keywords: [credential, credentials, desktop modeler, authentication]
---

Select an existing credential on a connector task in Desktop Modeler, or create a new one without leaving the properties panel. A credential stores authentication and connection configuration you create once and reuse, instead of entering the same values on every task. See [Credentials](/components/hub/organization/credentials/index.md) for the concept and for how credentials are managed centrally.

:::note
This page covers credentials that authenticate connector tasks, such as an AWS Credential. It is unrelated to the cluster credentials (client ID and client secret) you enter to [connect Desktop Modeler to a cluster](./connect-to-camunda-8.md), which authenticate Desktop Modeler itself.
:::

## Select a credential

Connectors that support credentials show a credential field in the properties panel, such as **AWS Credential**. Select the field to open the credential picker, which lists the credentials on the connected cluster that match the credential type the connector needs.

Selecting a credential stores only a reference to it in your diagram. The credential's values stay on the cluster.

If no credential matches, the picker tells you so by name, for example `Cannot find AWS Credential with name AWS_PROD`. This usually means the credential does not exist on the cluster you are connected to, or it was created for a different credential type.

## What you can do in the picker

What the picker offers depends on whether Desktop Modeler is connected to a cluster, and on your permissions on that cluster. Desktop Modeler checks your permissions once per connection.

| Situation                                                                                    | Available actions                                                                                                       |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| No cluster connection                                                                        | Select a credential that is already referenced in the diagram. You cannot browse, create, edit, or upgrade credentials. |
| Connected, with permission to create credentials                                             | Select a credential, or create a new one.                                                                               |
| Connected, with permission to update credentials, and the selected credential is compatible  | Select a credential, or edit the selected one.                                                                          |
| Connected, with permission to update credentials, and the selected credential is out of date | Select a credential, or upgrade the selected one.                                                                       |
| Connected, without permission to create or update credentials                                | Select a credential only.                                                                                               |

A connector declares the minimum credential version it needs. A newer credential always satisfies an older requirement, so upgrading is only needed when a credential is older than the connector requires.

## Create a credential

To create a credential from the properties panel:

1. Open the credential field, then select the option to create a new credential.
2. Enter a **Credential name**. Desktop Modeler suggests a **Credential ID** based on the name.
3. Change the **Credential ID** if you want a different one. You cannot change it after the credential is created.
4. Fill in the fields for this credential type. For a sensitive field, enter a reference to a secret that already exists on the cluster, using `camunda.secrets.` followed by the secret key, such as `camunda.secrets.AWS_SECRET_KEY`.
5. Save the credential. Desktop Modeler creates it on the connected cluster and selects it on the connector task.

Desktop Modeler checks whether the secret you referenced exists on the cluster, without revealing its value. If the secret is missing, you see a warning, but you can still save the credential. The connector fails at runtime until the secret exists.

:::note
Desktop Modeler cannot create the secret itself. Add the secret to the cluster's secret store first, then reference it from the credential.
:::

## Edit or upgrade a credential

Editing a credential opens the same form, pre-filled with its current values. Saving replaces the credential's values on the cluster, which takes effect immediately for every process that references it.

Upgrading a credential opens the same form and shows the fields that the newer credential version adds. Fill them in and save to make the credential usable with the connector version you are modeling against.

## Credential scope {#credential-scope}

A credential you create from Desktop Modeler is stored on the single cluster you are connected to, and is not registered centrally. It does not appear on the **Managed** tab of the [**Credentials** page](/components/hub/organization/credentials/index.md#managed-credentials).

To manage it centrally, find it on the [**Clusters only** tab](/components/hub/organization/credentials/index.md#clusters-only-credentials) and add it.

## Additional resources

- [Credentials](/components/hub/organization/credentials/index.md)
- [Use connectors](./use-connectors.md)
- [Connect to Camunda 8](./connect-to-camunda-8.md)
