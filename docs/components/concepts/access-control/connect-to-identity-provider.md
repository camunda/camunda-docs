---
title: Connect to an Identity Provider
sidebar_label: Connect to an identity provider
description: Learn how to connect Camunda 8 components to an external Identity Provider (IdP) for authentication and user management.
---

# Connect to an identity provider

Integrate with an external identity provider (IdP) for single sign-on (SSO), centralized user management, and secure authentication.

## About IdP integration

Connecting Camunda 8 to an external IdP allows you to:

- Use enterprise authentication (for example, Microsoft EntraID, Okta, Keycloak, Auth0).
- Centrally manage users in your IdP.
- Enable SSO for Camunda components.
- Enforce organization-wide security policies.

## Self-Managed

Self-Managed deployments only support external IdP integration using **OpenID Connect (OIDC)** (for example, Keycloak, Auth0, Okta, EntraID via OIDC).

You can integrate an IdP with both Identity (for the Orchestration Cluster) and Management Identity (for Web Modeler, Console, and Optimize).

- [Connect Identity to an identity provider](../../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [Connect Management Identity to an identity provider](../../../../self-managed/components/management-identity/configuration/connect-to-an-oidc-provider/)

### SaaS

Camunda 8 SaaS currently only supports external IdP integration using **SAML** or **Azure Active Directory (EntraID)**.

- [Connect to an identity provider](../../console/manage-organization/external-sso.md)
