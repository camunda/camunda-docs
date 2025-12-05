---
id: external-idp-via-internal-keycloak
sidebar_label: External IdP via Internal Keycloak
title: Set up the Helm chart with an external IdP through the internal Keycloak
description: Learn how to configure an external identity provider to authenticate users while using the internal Keycloak as an identity broker.
---

This guide shows you how to configure the internal Keycloak instance to act as an identity broker, delegating authentication to an external identity provider (IdP) such as a corporate OIDC provider, SAML, LDAP, or Active Directory.

This setup allows you to:

- Use your organization's existing identity provider for user authentication
- Retain the internal Keycloak for Camunda's OIDC integration
- Manage user authorization through Camunda's identity systems

## Prerequisites

- A Camunda 8 deployment with internal Keycloak enabled. See [Set up the Helm chart with the internal Keycloak instance](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md).
- Access to your external IdP's configuration (client credentials, endpoints, etc.)

## Configure the external identity provider

Complete the following steps to integrate your external IdP:

1. [Add your external IdP to Keycloak](#add-your-external-idp-to-keycloak)
1. [Configure identity provider mappers](#configure-identity-provider-mappers)
1. [Configure Orchestration Cluster Identity](#configure-orchestration-cluster-identity)
1. [Configure Management Identity access](#configure-management-identity-access-optional) (optional)

### Add your external IdP to Keycloak

Configure Keycloak to use your external identity provider by following the [Configure an external IdP using Keycloak](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md) guide.

### Configure identity provider mappers

After adding the identity provider, configure mappers in the **Camunda realm** (default: `camunda-platform`) to import user attributes and assign users to a group for authorization.

:::tip
For details on Keycloak identity provider mappers, see the [Keycloak documentation on identity broker mappers](https://www.keycloak.org/docs/latest/server_admin/index.html#_mappers).
:::

#### Create attribute mappers

Attribute mappers import user profile information from the external IdP into Keycloak user accounts.

In Keycloak Admin Console, navigate to **Identity Providers** > select your IdP > **Mappers** tab.

Create attribute mappers to import user profile information:

| Name        | Mapper Type        | Claim         | User Attribute |
| ----------- | ------------------ | ------------- | -------------- |
| `email`     | Attribute Importer | `email`       | `email`        |
| `firstName` | Attribute Importer | `given_name`  | `firstName`    |
| `lastName`  | Attribute Importer | `family_name` | `lastName`     |

#### Create username mapper

The username mapper determines how Keycloak assigns usernames to federated users based on claims from the external IdP.

Create a username mapper:

- **Name**: `username`
- **Mapper Type**: Username Template Importer
- **Template**: `${CLAIM.preferred_username}`

#### Create group for external IdP users

Navigate to **Groups** > **Create group** and create a group:

- **Name**: `external-idp-users`

#### Assign users to the group

The hardcoded group mapper automatically assigns all users authenticating through this IdP to a specified group. This group membership is then included in the user's access token.

Create a mapper to assign federated users to this group:

- **Name**: `assign-external-idp-group`
- **Mapper Type**: Hardcoded Group
- **Group**: `external-idp-users`

### Configure Orchestration Cluster Identity

External IdP users can now authenticate, but require authorization to access Camunda components.

:::tip Alternative: Direct group authorization
If you have configured the groups claim feature (`orchestration.security.authentication.oidc.groups-claim`), you can create authorizations directly for the `external-idp-users` group without creating mapping rules. This is enabled by default when using the internal Keycloak with the Helm chart. Navigate to **Authorizations** > **Component** > **Create authorization**, select **Owner type**: `Group`, and **Owner ID**: `external-idp-users`.
:::

Log in to **Orchestration Cluster Identity** as an administrator.

#### Create a mapping rule

Create a mapping rule to identify external IdP users:

1. Navigate to **Mapping Rules** > **Create a mapping rule**.
1. Configure the mapping rule:
   - **Mapping Rule ID**: `external-idp-users-rule`
   - **Mapping Rule name**: `External IdP Users`
   - **Claim name**: `groups`
   - **Claim value**: `external-idp-users`

#### Grant component access

Grant access to Orchestration Cluster components:

1. Navigate to **Authorizations** > select **Component** > **Create authorization**.
1. Configure the authorization:
   - **Owner type**: `Mapping rule`
   - **Owner ID**: `external-idp-users-rule`
   - **Resource ID**: `*`
   - **Permissions**: `ACCESS`

#### Grant additional permissions (optional)

Grant additional permissions as needed. For example, to allow users to view processes and complete tasks:

| Resource Type      | Resource ID | Permissions                                                          |
| ------------------ | ----------- | -------------------------------------------------------------------- |
| Process Definition | `*`         | `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK` |
| Process Definition | `*`         | `UPDATE_USER_TASK`                                                   |

:::info
For more details on authorizations, see [Orchestration Cluster authorization](/components/concepts/access-control/authorizations.md).
:::

### Configure Management Identity access (Optional)

For access to Console, Web Modeler, and Optimize, external IdP users need the corresponding realm roles assigned in Keycloak. The recommended approach is to assign users to groups that have these roles.

:::note
The hardcoded group mappers in this section grant access to **all users** authenticating through the external IdP. For more granular access control based on groups or attributes from your external IdP, see the [Keycloak documentation on identity provider mappers](https://www.keycloak.org/docs/latest/server_admin/index.html#_mappers).
:::

#### Verify or create groups

1. In Keycloak Admin Console, navigate to **Groups**.
1. Verify that groups exist for each component (e.g., `Console`, `Optimize`, `Web Modeler`). If not, create them.

#### Assign roles to groups

Ensure each group has the corresponding realm role assigned:

1. Select the group > **Role Mappings** tab.
1. Click **Assign role** and add the role with the same name (e.g., `Console`).

#### Create group mappers

Create mappers to assign federated users to these groups:

1. Navigate to **Identity Providers** > select your IdP > **Mappers** tab.
1. Click **Add mapper** for each component:

| Mapper Name               | Mapper Type     | Group         |
| ------------------------- | --------------- | ------------- |
| `assign-console-group`    | Hardcoded Group | `Console`     |
| `assign-optimize-group`   | Hardcoded Group | `Optimize`    |
| `assign-webmodeler-group` | Hardcoded Group | `Web Modeler` |

:::tip
You can also assign roles directly to users in Keycloak, or use [mapping rules in Management Identity](/self-managed/components/management-identity/mapping-rules.md) to map token claims to roles.
:::

## Understanding the two identity systems

Camunda 8.8 uses two separate identity systems: Orchestration Cluster Identity and Management Identity. Each system manages access to different components and uses different configuration methods.

For a detailed explanation of the differences between these identity systems, see [Identity types in Camunda 8](/components/concepts/access-control/access-control-overview.md#identity-types-in-camunda-8).

:::note
Orchestration Cluster Identity does not automatically recognize Keycloak groups. You must create mapping rules that match JWT claims and then assign authorizations to those mapping rules.
:::

## Next steps

- To learn more about mapping rules, see [Mapping rules](/components/concepts/access-control/mapping-rules.md).
- To configure additional authorizations, see [Orchestration Cluster authorization](/components/concepts/access-control/authorizations.md).
- To use an external IdP without the internal Keycloak, see [Set up the Helm chart with an external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md).
