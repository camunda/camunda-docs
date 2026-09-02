---
id: credentials-desktop-modeler
title: Configure credentials in Desktop Modeler
description: "Select, create, edit, and upgrade connector credentials from the properties panel in Desktop Modeler."
keywords: [credential, credentials, desktop modeler, authentication]
---

Select an existing [connector credential](./index.md) on a connector task in Desktop Modeler, or create a new one without leaving the properties panel.

:::note
This page covers credentials that authenticate connector tasks, such as an AWS Credential. It is unrelated to the client ID and client secret you enter to [connect Desktop Modeler to a cluster](/components/modeler/desktop-modeler/connect-to-camunda-8.md), which authenticate Desktop Modeler itself.
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

A credential you create from Desktop Modeler is stored on the single cluster you are connected to. It is not created in Camunda Hub and does not appear on the **Managed** tab of the Hub **Credentials** page.

To manage it in Hub, scan for it on the [**Clusters only** tab](./index.md#clusters-only-credentials) and add it to Hub.

## Additional resources

- [Connector credentials](./index.md)
- [Configure credentials in Web Modeler](./web-modeler.md)
- [Use connectors in Desktop Modeler](/components/modeler/desktop-modeler/use-connectors.md)
- [Connect Desktop Modeler to Camunda 8](/components/modeler/desktop-modeler/connect-to-camunda-8.md)
