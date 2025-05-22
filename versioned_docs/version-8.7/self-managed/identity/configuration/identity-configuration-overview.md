---
id: identity-configuration-overview
title: "Configure Identity"
sidebar_label: "Configure Identity"
description: "Learn more about how Identity plays together with Keycloak and other OIDC IdP applications to provide authentication services"
---

Authentication, Keycloak and OIDC integration overview

The default deployment of Camunda 8 self-managed uses Keycloak as IdP (Identity Provider) backend.

You have two options to configure Identity:

- Use the Camunda 8 self-managed Keycloak, or an [already existing Keycloak](./connect-to-an-existing-keycloak.md).
  - You can use Keycloak to integrate with external IdP services (e.g., SAML, LDAP, or Active Directory): [configure an external identity provider through Keycloak](./configure-external-identity-provider.md)
  - Keycloak is started as component in the Camunda 8 self-managed deployment when using [docker-compose](/self-managed/setup/deploy/local/docker-compose.md) or [HELM](/self-managed/setup/install.md).
- Replace Keycloak by connecting to an [external OIDC provider](./connect-to-an-oidc-provider.md).
