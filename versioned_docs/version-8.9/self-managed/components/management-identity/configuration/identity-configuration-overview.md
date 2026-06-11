---
id: identity-configuration-overview
title: "Configuration"
sidebar_label: "Configure Management Identity"
description: "Learn more about how Management Identity plays together with Keycloak and other OIDC IdP applications to provide authentication services"
---

Configure Management Identity for your Camunda 8 Self-Managed deployment. This guide covers application-level configuration, including environment variables and IdP settings.

:::info Deploying with Helm?
If you deploy Camunda 8 Self-Managed with Helm, use the [Helm chart authentication and authorization guides](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md) to configure OIDC and Management Identity:
:::

## Configure Management Identity IdP

The default Camunda 8 Self-Managed deployment uses built-in Keycloak as an identity provider (IdP).

You can configure your Management Identity IdP using the following options:

| IdP configuration                                                                     | Description                                                                                                      |
| :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| [Connect to an identity provider](./connect-to-an-oidc-provider.md)                   | Connect to an OpenID Connect (OIDC) authentication provider to replace Keycloak.                                 |
| [Connect to an existing Keycloak instance](./connect-to-an-existing-keycloak.md)      | Connect Management Identity to your existing Keycloak instance.                                                  |
| [Configure an external IdP using Keycloak](./configure-external-identity-provider.md) | Configure an external identity provider using Keycloak, such as OpenID Connect, SAML, LDAP, or Active Directory. |

:::note

- Management Identity relies on a PostgreSQL. When running Management Identity with an external OIDC provider, you can [connect to an alternative Database](./alternative-db.md) if your internal policies or compliance requirements prevent the use of PostgreSQL.
- Keycloak is started as a component in a [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) and [Helm](/self-managed/deployment/helm/install/quick-install.md) Camunda 8 self-managed deployment.

:::
