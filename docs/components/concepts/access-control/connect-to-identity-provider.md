---
title: Connect to an Identity Provider
sidebar_label: Connect to an Identity Provider
description: Learn how to connect Camunda 8 components to an external Identity Provider (IdP) for authentication and user management.
---

# Connect to an Identity Provider

Camunda 8 supports integration with external Identity Providers (IdPs). This enables single sign-on (SSO), centralized user management, and secure authentication for Camunda 8.

## Overview

Connecting Camunda 8 to an external IdP allows you to:

- Use enterprise authentication (e.g., Microsoft EntraID, Okta, Keycloak, Auth0)
- Manage users centrally in your Identity Provider
- Enable SSO across Camunda components
- Enforce organization-wide security policies

## Supported Identity Provider Integrations

The way you connect Camunda 8 to an external Identity Provider depends on your deployment type.

### Self-Managed

Camunda 8 Self-Managed supports integration with external IdPs using **OpenID Connect (OIDC)** only (e.g., Keycloak, Auth0, Okta, EntraID via OIDC). Follow the individual guides for each component:

- Orchestration Cluster: [Connect Orchestration Cluster Identity to an OpenID Connect provider](../../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- Web Modeler, Console, Optimize: [Connect Management Identity to an OpenID Connect provider](../../../self-managed/components/management-identity/configuration/connect-to-an-oidc-provider/)

### SaaS

Camunda 8 SaaS currently supports integration with external IdPs via **SAML** and **Azure Active Directory (EntraID)**. Follow the following guide:

- [Connect Console to an external Identity Provider (SAML or EntraID)](../../console/manage-organization/external-sso.md)
