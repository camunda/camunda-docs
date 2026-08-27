---
id: authentication-to-management-components
title: Management and modeling component authentication in Self-Managed
sidebar_label: "Management and modeling component authentication"
description: "Learn about authentication methods for management and modeling components in Self-Managed and how to choose the right one for your environment."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Authentication to the Camunda 8 management and modeling components uses the same mechanism as the [Orchestration Cluster](authentication-to-orchestration-cluster.md), the Camunda Security Library (CSL), configured under `camunda.security.*`. This includes components such as [Camunda Hub](/self-managed/components/hub/index.md) and [Optimize](/self-managed/components/optimize/overview.md).

In 8.10, CSL provides authentication only for these components. User, group, role, and permission management for Camunda Hub and Optimize stays in [Management Identity](/self-managed/components/management-identity/overview.md). The Orchestration Cluster is not affected, because it manages its own users, groups, roles, and authorizations.

## Authentication and user management

Authentication and user management are handled separately:

| Concern                                        | Handled by                                                                      |
| :--------------------------------------------- | :------------------------------------------------------------------------------ |
| Authenticating users and clients               | The component itself, configured under `camunda.security.authentication.*`      |
| Managing users, groups, roles, and permissions | [Management Identity](/self-managed/components/management-identity/overview.md) |
| Storing user identities and issuing tokens     | Your Identity Provider (IdP)                                                    |

Management Identity is still required for the management and modeling components. For more information, see [manage access and permissions](/self-managed/components/management-identity/access-management/access-management-overview.md).

For the Camunda Hub authentication settings, see [authentication](/self-managed/components/hub/configuration/identity.md).

## Choose an Identity Provider setup

Authentication relies on the **OpenID Connect (OIDC)** and **OAuth 2.0** protocols. Where your user identities live, and which IdP issues tokens, is a separate choice from how authentication is configured.

Three primary setups are supported:

- Use Keycloak as the default built-in Identity Provider (IdP).
- Configure the built-in Keycloak to connect to an external IdP.
- Connect directly to an external OIDC IdP.

## Use Keycloak as default (built-in) IdP

This is the default authentication setup for Self-Managed installation methods, including [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), [Helm charts](/self-managed/deployment/helm/index.md) and [Manual installation](/self-managed/deployment/manual/install.md). It comes with a pre-packaged Keycloak instance that acts as the Identity Provider.

In this setup:

- **User authentication:** Users log in through the Keycloak's login page.
- **Application authentication:** Applications authenticate using Machine-to-Machine (M2M) tokens.
- **User management:** Administrators manage users, groups, roles, and permissions within Keycloak.

This method is convenient for getting started quickly and is suitable for environments that do not need to integrate with an existing corporate identity management system.

:::info
For more information, see [connect to an existing Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).
:::

## Connect to an external IdP via Keycloak

You can configure the built-in Keycloak to act as an identity broker, connecting to an external corporate Identity Provider. This allows you to leverage your existing user base from providers that support protocols like **SAML**, **LDAP**, or **OpenID Connect**.

In this setup, Keycloak remains the direct IdP for Camunda management and modeling components, but it delegates the authentication process to your configured external provider.

- **User authentication:** Users are redirected from Keycloak's login page to your external IdP.
- **User management:** Users are managed in your external IdP and federated into Keycloak.
- **Application authentication:** Applications use M2M tokens issued by Keycloak.

This method is useful when you need to integrate with an IdP that does not use OIDC, or when you want to use Keycloak's advanced features to manage roles and map claims from your external provider.

:::info
For more information, see [configure an external IdP using Keycloak](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md).
:::

## Connect to an external OIDC IdP

You can connect the management and modeling components to an external Identity Provider (IdP) that supports **OpenID Connect (OIDC)** (e.g., Microsoft Entra ID, Keycloak, Auth0, Okta).

In this setup:

- Users are managed in your external IdP.
- User groups from your IdP can be used to manage permissions.
- Clients for M2M authentication are managed in your external IdP.

:::tip Recommendation
If you have configured the [authentication to Orchestration Cluster](authentication-to-orchestration-cluster.md#oidc) with an external OIDC provider, we recommend using the same provider for the management and modeling components. Both read the same `camunda.security.authentication.oidc.*` settings, so you maintain one authentication configuration and manage users in one place.
:::

:::info
For more information, see [connect Management Identity to an external IdP](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).
:::
