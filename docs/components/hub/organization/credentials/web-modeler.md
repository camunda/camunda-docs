---
id: credentials-web-modeler
title: Configure credentials in Web Modeler
description: "Select, create, edit, and upgrade connector credentials from the properties panel in Web Modeler."
keywords: [credential, credentials, web modeler, authentication]
---

Select an existing [connector credential](./index.md) on a connector task in Web Modeler, or create a new one without leaving the properties panel.

:::note
This page covers credentials that authenticate connector tasks, such as an AWS Credential. It is unrelated to the [client credentials](/components/hub/workspace/modeler/run-or-publish-your-process.md#missing-client-credentials) required to deploy or run a process, which authenticate Web Modeler against your cluster.
:::

## Select a credential

Connectors that support credentials show a credential field in the properties panel, such as **AWS Credential**. Select the field to open the credential picker, which lists the credentials on the cluster that match the credential type the connector needs.

Selecting a credential stores only a reference to it in your diagram. The credential's values stay on the cluster.

The picker behaves as described in [Configure credentials in Desktop Modeler](./desktop-modeler.md#what-you-can-do-in-the-picker), with the differences below.

## Differences from Desktop Modeler

- Web Modeler always works against an authenticated Camunda 8 cluster, so what you can do always comes from that cluster's authorization configuration. There is no offline state where the picker cannot reach a cluster.
- A credential you create in Web Modeler is managed in Camunda Hub immediately. It appears on the **Managed** tab of the [**Credentials** page](./index.md#managed-credentials) without the **Clusters only** discovery step that a credential created from Desktop Modeler requires.

## Create, edit, or upgrade a credential

Creating, editing, and upgrading a credential works the same as in Desktop Modeler. See [Create a credential](./desktop-modeler.md#create-a-credential) for the fields and the steps.

:::note
You cannot create a secret from the credential form. Add the secret to the cluster first in [Connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md), then reference it from the credential.
:::

## Additional resources

- [Connector credentials](./index.md)
- [Configure credentials in Desktop Modeler](./desktop-modeler.md)
- [Run or publish your process](/components/hub/workspace/modeler/run-or-publish-your-process.md)
