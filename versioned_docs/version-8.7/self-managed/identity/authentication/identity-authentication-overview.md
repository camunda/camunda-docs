---
id: identity-authentication-overview
title: "Overview of authentication, KeyCloak and OIDC integration"
description: "Learn more about how Identity plays together with KeyCloak and other OIDC IdP applications to provide authentication services"
---

The default deployment of Camunda 8 self-managed uses KeyCloak as IdP backend. KeyCloak is started as component in the Camunda 8 self-managed deployment.

You have two options to run Identity:

- Use the Camunda 8 self-managed KeyCloak, or an [already existing KeyCloak](./connect-to-an-existing-keycloak.md).
  - You can use KeyCloak to integrate with external IdP services (e.g., SAML, LDAP, or Active Directory): [configure an external identity provider](./configure-external-identity-provider.md)
- Replace KeyCloak by connecting to an [external OIDC provider](./connect-to-an-oidc-provider.md).

Based on this set-up, Users and Applications interacting with Camunda 8 self-managed will authentication via the respective IdP, either by using a log-in page or by using [M2M tokens](./generating-m2m-tokens.md).
