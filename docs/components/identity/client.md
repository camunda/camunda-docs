---
id: client
title: Clients
description: "Learn how to configure and manage client access to an orchestration cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Clients are applications that interact with an orchestration cluster through its APIs. Managing clients involves configuring their access to a cluster so client applications have the permissions they need.

This guide describes how to manage client access in SaaS and in Self-Managed environments that use an [external OpenID Connect (OIDC) provider](../concepts/access-control/connect-to-identity-provider.md) for authentication.

<Tabs groupId="deployment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas', },
{label: 'Self-Managed', value: 'sm', },
]
}>

<TabItem value='saas'>

## Manage clients on SaaS

In Camunda 8 SaaS, client credentials are created and managed in [Console](../console/introduction-to-console.md).

### 1. Create client credentials in Console

See the [guide for creating client credentials in Console](../console/manage-clusters/manage-api-clients.md#create-a-client).

### 2. Configure authorizations in Identity

If you have enabled [authorizations](/components/concepts/access-control/authorizations.md) on your cluster, the new client will have no permissions by default, even after assigning scopes in Console. You must grant fine-grained permissions in Identity:

1.  Navigate to the **Identity** application for your cluster.
2.  Go to the **Authorizations** tab.
3.  Click **Create authorization**.
4.  Set the **Owner type** to `Client`.
5.  In the **Owner ID** field, enter the **Client ID** of the client you just created.
6.  Select the **Resource type**, **Resource ID**, and permissions the client needs.
7.  Click **Create authorization**.

If authorizations are disabled, your client will have full access based on the scopes you selected during creation.

</TabItem>

<TabItem value='sm'>

## Manage clients on Self-Managed

Configuring a client application in a [Self-Managed environment with OIDC](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md) involves two main stages:

1. Registering your client application with your identity provider to obtain client credentials.
2. Configuring authorizations for the client in the Orchestration Cluster Identity to grant the necessary permissions.

The following steps will guide you through this process.

### 1. Create client credentials in your IdP

Before configuring access in Camunda 8, you must register your client application in your OIDC-compatible identity provider (e.g., EntraID, Keycloak, Okta).

During the registration process, your IdP will provide you with a **Client ID** and a **Client Secret**. Your application will use these credentials to authenticate and obtain an access token.

### 2. Configure authorizations in Identity

Once you have your client credentials, you can configure the required permissions in the Identity component of your cluster. Log in to Identity and choose one of the following methods to grant authorizations.

#### Simple authorization

This method is suitable when your client application requires a fixed set of permissions.

1.  Navigate to the **Authorizations** tab.
2.  Click **Create authorization**.
3.  Set the **Owner type** to `Client`.
4.  In the **Owner ID** field, enter the **Client ID** you obtained from your IdP.
5.  Select the desired **Resource type**, **Resource ID**, and permissions.
6.  Click **Create authorization**.

You can also assign the client to existing [groups](./group.md) or [roles](./role.md) to inherit their permissions.

#### Advanced authorization with mapping rules

This method is ideal when you need to dynamically assign permissions based on information from the OIDC token, such as scopes or custom claims.

1.  Navigate to the **Mapping rules** tab and create a new mapping rule that suits your needs.
2.  Assign permissions to the mapping rule. You can do this by:
    - Creating a new authorization and setting the **Owner type** to `Mapping rule`.
    - Assigning the mapping rule to existing [groups](./group.md) or [roles](./role.md).

Any client that authenticates with a token matching the criteria of the mapping rule will be granted the associated permissions.

### 3. Client application is configured

After completing these steps, your client application can authenticate with your IdP, obtain an access token, and use that token to make authorized API calls to the Camunda 8 orchestration cluster.

</TabItem>
</Tabs>
