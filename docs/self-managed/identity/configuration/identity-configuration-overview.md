---
id: identity-configuration-overview
title: "Configuration"
sidebar_label: "Configure Identity"
description: "Learn more about how Identity plays together with Keycloak and other OIDC IdP applications to provide authentication services"
---

Configure your Camunda 8 Self-Managed Identity deployment.

## Configure Identity IdP

The default Camunda 8 Self-Managed deployment uses Keycloak as an identity provider (IdP).

You can choose how to configure your Identity IdP from the following options:

| IdP configuration                                                                     | Description                                                                                                      |
| :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| [Configure an external IdP using Keycloak](./configure-external-identity-provider.md) | Configure an external identity provider using Keycloak, such as OpenID Connect, SAML, LDAP, or Active Directory. |
| [Connect to an existing Keycloak instance](./connect-to-an-existing-keycloak.md)      | Connect Identity to your existing Keycloak instance.                                                             |
| [Connect to an external OIDC provider](./connect-to-an-oidc-provider.md)              | Connect to an OpenID Connect (OIDC) authentication provider to replace Keycloak.                                 |

:::note
Identity relies on a PostgreSQL. When running Identity with an external OIDC provider, you can [connect to an alternative Database](./alternative-db.md) if your internal policies or compliance requirements prevent the use of PostgreSQL.
:::

:::note
Keycloak is started as a component in a [Docker Compose](/self-managed/setup/deploy/local/docker-compose.md) and [Helm](/self-managed/setup/install.md) Camunda 8 self-managed deployment.
:::
