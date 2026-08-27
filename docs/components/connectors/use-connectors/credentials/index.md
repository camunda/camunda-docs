---
id: credentials
title: Connector credentials
description: "Create reusable connector credentials in Camunda Hub, then select them in your connector tasks instead of repeating authentication settings in every diagram."
keywords: [credential, credentials, authentication, reusable, connection]
---

A credential stores the authentication information a connector needs to reach an external service, so you can reuse it across connector tasks instead of entering the same values in every diagram.

## About credentials

Without credentials, you configure a connector's authentication and connection settings directly on each connector task. If ten tasks call the same REST API, you configure the same authentication ten times, and you update all ten when something changes.

A credential moves those settings out of the diagram:

1. You create a credential once, choosing a credential type such as **AWS Credential** or **JDBC Connection**.
2. You select that credential on a connector task in the properties panel.
3. At runtime, the credential is passed to the connector as a whole, and the connector reads the fields it needs from it.

Only a reference to the credential is stored in your BPMN diagram. The credential's values stay on the cluster, and sensitive fields hold references to [secrets](/components/hub/organization/manage-clusters/manage-secrets.md) rather than the secret values themselves.

You can create and select credentials in Camunda Hub, [Desktop Modeler](./desktop-modeler.md), and [Web Modeler](./web-modeler.md).

## Terminology

| Term            | Meaning                                                                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Credential      | The reusable object you create and then select on a connector task.                                                                                                                                                                                                           |
| Credential type | The shape of a credential, such as **AWS Credential**, **REST Authentication**, or **JDBC Connection**. A credential type defines which fields a credential of that type has.                                                                                                 |
| Configuration   | The underlying element template property type that renders the credential picker. A credential is a configuration whose kind is `CREDENTIAL`. Connector authors can read more in [element template properties](/components/modeler/element-templates/template-properties.md). |

## Credentials and connector secrets

Credentials and [connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) work together rather than replacing each other:

|         | Connector secret                             | Credential                                                      |
| ------- | -------------------------------------------- | --------------------------------------------------------------- |
| Stores  | A single sensitive value, such as an API key | A complete, typed set of authentication and connection settings |
| Scope   | One cluster                                  | One or more clusters, managed from your organization            |
| Used by | Any connector field that supports secrets    | A connector's credential field                                  |

A credential's sensitive fields reference secrets, so the secret is still where the sensitive value lives. Create the secret first, then reference it from the credential.

To reference a secret from a credential field, use `camunda.secrets.` followed by the secret key. For example, reference a secret with the key `AWS_SECRET_KEY` as follows:

```
camunda.secrets.AWS_SECRET_KEY
```

:::note
Credential fields use `camunda.secrets.MY_API_KEY`, without braces. This is not the same as the `{{secrets.MY_API_KEY}}` syntax you use in a [connector field](../index.md#using-secrets). Use `camunda.secrets.` inside a credential, and `{{secrets.}}` in connector fields that support secrets.
:::

## Credential types

Camunda provides a credential type for each family of connectors that supports credentials. The following types are available:

| Credential type     | Bound to the connector's input | Example connectors                                                              |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| AWS Credential      | `awsCredential`                | Amazon SQS, Amazon S3, Amazon Bedrock, and other Amazon Web Services connectors |
| REST Authentication | `authenticationConfiguration`  | HTTP Polling, HTTP REST, and GraphQL connectors                                 |
| JDBC Connection     | `configuration`                | Execute SQL Statement on Database                                               |

More connectors gain credential support over time, so this list grows. Each credential type card in the **Create a credential** wizard lists the connectors that currently use that type under **Used by**.

## Manage credentials in Hub

Camunda Hub provides a **Credentials** page for your organization. It has two tabs:

- **Managed**: credentials that Hub creates and manages. Use this tab to create, edit, and delete credentials.
- **Clusters only**: credentials that exist on a cluster but are not managed in Hub, typically because they were created from Desktop Modeler or directly through the cluster API.

### Managed credentials

Before you create your first credential, the **Managed** tab shows an empty state with a **Create credential** button.

![Managed tab of the Credentials page in Camunda Hub, showing the message "Your organization has no credentials yet" and a Create credential button](./img/credentials-managed-empty.png)

Once credentials exist, this tab lists them with their name, credential type, state, and when they were last modified.

### Create a credential

To create a credential, select **Create credential** and complete the three steps of the wizard.

1. **Choose credential**: select the credential type for the connector you want to authenticate. Each card describes the credential type and lists the connectors that use it. Use the search field to search by credential type or by connector name.

   ![Step 1 of the Create a credential wizard, showing cards for AWS Credential, REST Authentication, and JDBC Connection, each listing the connectors that use it](./img/credentials-choose-credential.png)

2. **Configure**: name the credential, choose which clusters it applies to, and fill in the fields for the credential type you selected.

   Camunda suggests an ID for the credential based on the name you enter. You can change the ID while you are creating the credential, but not afterwards. For a sensitive field, enter a reference to an existing secret, such as `camunda.secrets.AWS_SECRET_KEY`, rather than the value itself.

   If you select more than one cluster, keep **Use same credentials for all clusters** enabled to apply one set of values everywhere, or disable it to configure each cluster separately.

3. **Review**: check the summary, then select **Create** to save the credential and deploy it to the clusters you selected.

You can also save the credential as a draft at any step. A draft is saved in Hub but is not deployed to any cluster.

:::note
You cannot create a secret while creating a credential. Add the secret to the cluster first in [Connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md), then reference it here. A credential's ID also cannot be changed after you create it, so to rename a credential, delete it and create a new one.
:::

### Credential states

The **Managed** tab shows a state for each credential. Hub checks the state in the background after the list loads, so a state can take a moment to appear. Refresh the list to check again.

| State        | Meaning                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Active       | The credential is deployed to every cluster you selected, and every secret it references exists on those clusters.                    |
| Warning      | The credential is deployed to at least one cluster, but it is missing from another cluster, or a secret it references does not exist. |
| Not deployed | The credential is not present on any cluster. Drafts always have this state.                                                          |

A credential in the **Warning** state is still deployed. Processes that use it can fail at runtime if the missing secret or cluster is the one they rely on.

### Edit a credential

Select a credential from the **Managed** tab to open it, then edit its values. The credential's ID is shown but cannot be changed. Saving your changes redeploys the credential to its clusters.

### Delete a credential

Deleting a credential removes it from Hub and from every cluster it is deployed to. Hub asks you to confirm, and lists the clusters that are affected.

:::warning
Editing or deleting a credential takes effect immediately for every process that references it. Running process instances can fail if the credential no longer works or no longer exists.
:::

### Clusters only credentials

A credential created outside Hub, such as one created from [Desktop Modeler](./desktop-modeler.md#credential-scope), exists on its cluster but is not tracked in Hub. The **Clusters only** tab finds these credentials so you can bring them under Hub management.

1. Under **Clusters**, select the clusters you want to scan. You can select up to 10 clusters.
2. Select **Scan clusters**. Hub scans each selected cluster for global variables that are tagged as credentials and that match a known credential type.
3. Select **Add to Hub** on a result to manage that credential in Hub. Hub reads the credential's configuration only when you open the **Add to Hub** dialog.

Select **Rescan clusters** to run the scan again, for example after creating a credential from Desktop Modeler.

![Clusters only tab of the Credentials page, with one cluster selected, a Rescan clusters button, and the message "No cluster-only credentials found"](./img/credentials-clusters-only.png)

If the scan returns no results, no cluster you selected has a credential-tagged variable that matches a known credential type and version. Clusters that are paused, or that run a Camunda version without credential support, are marked as such and cannot be scanned.

## Permissions

Anyone with read access to your organization in Hub can see the **Credentials** page and the credentials it lists, including their configuration.

Creating, editing, and deleting a credential requires the same permission as deploying a diagram to a cluster. There is no separate credential permission.

## Known limitations

:::note
In this release:

- You cannot create a secret from a credential. Create secrets in [Connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) first.
- Hub does not show which processes use a given credential, so check the impact yourself before you edit or delete one.
- Credentials are visible to everyone with read access to your organization. You cannot restrict a credential to a project or a subset of users.
- A credential's ID cannot be changed after creation.
- Credentials are edited in place, with no history of previous values.

:::

## Next steps

- [Configure credentials in Desktop Modeler](./desktop-modeler.md)
- [Configure credentials in Web Modeler](./web-modeler.md)
