---
id: client
title: Clients
description: "Learn how to configure and manage client access to an orchestration cluster."
---

Configure and manage client access to a cluster so the client application has the permissions it requires.

## About client application access

A client is an application that interacts with an Orchestration Cluster via its APIs.

This guide describes how to manage client access in SaaS and in Self-Managed environments that use an [external OpenID Connect (OIDC) identity provider](../concepts/access-control/connect-to-identity-provider.md) for authentication.

If you are using the Orchestration Cluster with [basic authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication), both end users and machine-to-machine (m2m) applications are treated as users and must be [managed accordingly](user.md). The Identity UI does not display dedicated client options in basic authentication setups for this reason.

## Manage clients in SaaS

In Camunda 8 SaaS, client credentials are created and managed in [Console](../console/introduction-to-console.md).

### Step 1: Create client credentials in Console

Follow the [guide for creating client credentials in Console](../console/manage-clusters/manage-api-clients.md#create-a-client).

Copy the **client id** shown in the variables after you have created your client as this is required in the next step.

### Step 2: Configure authorizations in Identity

If you have enabled [authorizations](/components/concepts/access-control/authorizations.md) on your cluster, the new client has no permissions by default, even after assigning scopes in Console. You must grant fine-grained permissions in Identity:

1.  Open the **Identity** application for your cluster.
2.  Open the **Authorizations** tab.
3.  Click **Create authorization**.
4.  Set the **Owner type** to `Client`.
5.  In the **Owner ID** field, enter the **Client ID** of the client you just created and copied.
6.  Select the **Resource type**, **Resource ID**, and permissions the client needs.
7.  Click **Create authorization**.

If authorizations are disabled, your client will have full access based on the scopes you selected during creation.

## Manage clients in Self-Managed with OIDC authentication

To configure a client application in a [Self-Managed environment with OIDC](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md), complete the following two steps:

1. Register your client application with your identity provider to obtain client credentials.
2. Configure authorizations for the client in the Orchestration Cluster Identity to grant the necessary permissions.

After completing these steps, your client application can then authenticate with your IdP, obtain an access token, and use that token to make authorized API calls to the Camunda 8 orchestration cluster.

### Prerequisites

Your Orchestration Cluster must be [configured to use a token claim as the client id](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md#step-1-configure-the-oidc-client-id-claim).

### Step 1: Create client credentials in your IdP

Before configuring access in the Orchestration Cluster, you must register your client application in your OIDC-compatible identity provider (for example, EntraID, Keycloak, Okta).

During the registration process, your identity provider will provide you with a **Client ID** and a **Client Secret**. Your application will use these credentials to authenticate and obtain an access token.

### Step 2: Configure authorizations in Identity

Once you have your client credentials, you can configure the required permissions in the Identity component of your cluster. Log in to Identity and choose one of the following methods to grant authorizations.

#### Authorization based on client ID

This method is suitable when your client application requires a fixed set of permissions. Follow [the steps on how to create authorizations](/components/identity/authorization.md#create-an-authorization) with the following specifics:

- As the **Owner type**, select `Client`.
- In the **Owner ID** field, enter the **Client ID** that matches your client's value for the configured client id claim.

You can also assign the client to existing [groups](./group.md) or [roles](./role.md) to inherit their permissions.

#### Flexible authorization based on JWT claims with mapping rules

This method is ideal when you need to dynamically assign permissions based on claims in the OIDC access token, such as scopes or custom claims.

1. [Create a mapping rule](/components/identity/mapping-rules.md#add-a-mapping-rule) that matches a claim from your client's access token.
2. [Create authorizations](/components/identity/authorization.md#create-an-authorization) for the mapping rule with the following specifics:
   - As the **Owner type**, select `Mapping Rule`.
   - In the **Owner ID** field, enter the **Mapping Rule ID** that you chose in the previous step.

Alternatively, you can assign the mapping rule to [groups](./group.md) or [roles](./role.md) to inherit their permissions.

Any client that authenticates with a token matching the criteria of the mapping rule will be granted the associated permissions.
