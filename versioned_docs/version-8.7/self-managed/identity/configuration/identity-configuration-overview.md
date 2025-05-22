---
id: identity-configuration-overview
title: "Configure Identity"
sidebar_label: "Configure Identity"
description: "Learn more about how Identity plays together with Keycloak and other OIDC IdP applications to provide authentication services"
---

Configure your Camunda 8 Self-Managed Identity deployment.

## About Identity Keycloak IdP configuration

The default Camunda 8 Self-Managed deployment uses Keycloak as an IdP (Identity Provider). You can choose to:

- **Use Keycloak** as an IdP, using the Camunda 8 self-managed Keycloak, your own existing Keycloak setup, or using Keycloak to integrate with external IdP services (for example, SAML, LDAP, or Active Directory).

- **Replace Keycloak** and connect to an external OIDC provider.

:::note
Keycloak is started as a component in a [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md) and [Helm](/self-managed/setup/install.md) Camunda 8 self-managed deployment.
:::

## Configure an external IdP using Keycloak

You can configure an external identity provider such as OpenID Connect, SAML, LDAP, or Active Directory using Keycloak.

- [Configure an external IdP using Keycloak](./configure-external-identity-provider.md)

## Connect to an existing Keycloak instance

In this guide, we'll demonstrate how to connect Identity to your existing Keycloak instance.

- [already existing Keycloak](./connect-to-an-existing-keycloak.md)

## Connect to an external OIDC provider

To enable a smoother integration with your existing systems, Camunda supports connecting to an OpenID Connect (OIDC) authentication provider. A full list of supported and unsupported features when using an OIDC provider is available in the OIDC features table.

- [external OIDC provider](./connect-to-an-oidc-provider.md)
