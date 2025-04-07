---
id: identity-configuration-overview
title: "Authentication, KeyCloak and OIDC integration overview"
sidebar_label: "Overview"
description: "Learn more about how Identity plays together with KeyCloak and other OIDC IdP applications to provide authentication services"
---

The default deployment of Camunda 8 self-managed uses KeyCloak as IdP backend.

You have two options to configure Identity:

- Use the Camunda 8 self-managed KeyCloak, or an [already existing KeyCloak](./connect-to-an-existing-keycloak.md).
  - You can use KeyCloak to integrate with external IdP services (e.g., SAML, LDAP, or Active Directory): [configure an external identity provider](./configure-external-identity-provider.md)
  - KeyCloak is started as component in the Camunda 8 self-managed deployment when using [docker-compose](/self-managed/setup/deploy/local/docker-compose.md) or [HELM](/self-managed/setup/install.md).
- Replace KeyCloak by connecting to an [external OIDC provider](./connect-to-an-oidc-provider.md).
