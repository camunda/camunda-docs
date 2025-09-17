---
id: authentication-to-management-components
title: Authentication to Management and Modeling Components on Self-Managed
sidebar_label: "Authentication to Management and Modeling Components"
description: "Learn about authentication methods for Management and Modeling Components on Self-Managed and how to choose the right one for your environment."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Authentication to the Camunda 8 management and modeling components and their resources is managed by [Management Identity](/self-managed/components/management-identity/overview.md). This includes components like [Web Modeler](/self-managed/components/modeler/web-modeler/overview.md), [Console](/self-managed/components/console/overview.md), and [Optimize](/self-managed/components/optimize/overview.md).

Management Identity relies on the **OpenID Connect (OIDC)** and **OAuth 2.0** protocols for secure authentication and authorization. It supports three primary scenarios:

- Use Keycloak as the default built-in Identity Provider (IdP).
- Configure the built-in Keycloak to connect to an external IdP.
- Connect directly to an external OIDC IdP.

## Use Keycloak as Default (built-in) IdP

This is the default authentication setup for Self-Managed installation methods, including [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), [Helm charts](/self-managed/installation-methods/helm/index.md) and [Manual installation](/self-managed/installation-methods/manual/install.md). It comes with a pre-packaged Keycloak instance that acts as the Identity Provider.

In this scenario:

- **User authentication:** Users log in through the Keycloak's login page.
- **Application authentication:** Applications authenticate using Machine-to-Machine (M2M) tokens.
- **User management:** Administrators manage users, groups, roles, and permissions within Keycloak.

This method is convenient for getting started quickly and is suitable for environments that do not need to integrate with an existing corporate identity management system.

For details, see the guide on how to [connect to an existing Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).

## Connect to External IdP via Keycloak

You can configure the built-in Keycloak to act as an identity broker, connecting to an external corporate Identity Provider. This allows you to leverage your existing user base from providers that support protocols like **SAML**, **LDAP**, or **OpenID Connect**.

In this scenario, Keycloak remains the direct IdP for Camunda management and modeling components, but it delegates the authentication process to your configured external provider.

- **User authentication:** Users are redirected from Keycloak's login page to your external IdP.
- **User management:** Users are managed in your external IdP and federated into Keycloak.
- **Application authentication:** Applications use M2M tokens issued by Keycloak.

This method is useful when you need to integrate with an IdP that does not use OIDC, or when you want to use Keycloak's advanced features to manage roles and map claims from your external provider.

For details, see the guide on how to [configure an external IdP using Keycloak](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md).

## Connect to External OIDC IdP

You can connect Management Identity to an external Identity Provider (IdP) that supports **OpenID Connect (OIDC)** (e.g., Microsoft Entra ID, Keycloak, Auth0, Okta).

In this scenario:

- Users are managed in your external IdP.
- User groups from your IdP can be used to manage permissions.
- Clients for M2M authentication are managed in your external IdP.

:::info[Recommendation]
If you have configured the [authentication to Orchestration Cluster](authentication-to-orchestration-cluster.md#oidc) with an external OIDC provider, we recommend using the same provider for Management Identity. This will create a unified authentication experience and allow for centralized user management across all Camunda 8 components.
:::

For details, see the guide on how to [connect Management Identity to an external IdP](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).
