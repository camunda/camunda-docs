---
id: external-oidc-provider
sidebar_label: External OIDC provider
title: Helm chart setup with an external OIDC provider
description: "Learn how to set up the Helm Chart so that it connects to an external OIDC provider (such as MS Entra or a separate Keycloak instance)"
---

Instead of using internal Keycloak, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

The Helm chart offers these options:

- [External Keycloak](./external-keycloak.md): An externally running Keycloak instance with a realm that you would like Camunda's Management Identity component to populate for you.
- [Microsoft Entra](./microsoft-entra.md)
- [Generic OIDC provider](./generic-oidc-provider.md): Any OIDC provider that is not Microsoft Entra. Also use this guide if you'd like to set up Keycloak without Management Identity setup support.
