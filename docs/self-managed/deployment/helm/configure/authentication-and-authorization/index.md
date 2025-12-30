---
sidebar_label: Authentication and authorization
title: Helm chart authentication and authorization configuration
description: "Camunda 8 Self-Managed supports multiple authentication methods for securing access to components deployed with the Helm chart."
---

Camunda 8 Self-Managed supports multiple authentication methods for securing access to components deployed with the Helm chart. This section provides an overview of available authentication options and links to configuration guides for each method.

## Overview

By default, Camunda uses basic authentication with predefined demo users. Alternatively, you can configure OpenID Connect (OIDC) authentication, either through an internal Keycloak instance deployed with Camunda or an external OIDC provider.

### Authentication options

| Method                                                                        | Description                                                                                                         | Recommended for                                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Basic authentication](./basic-authentication.md)                             | Authentication using preconfigured demo users. No external identity provider (IdP) required.                        | Local development and testing, as well as smaller-scale production setups.                 |
| [Internal Keycloak](./internal-keycloak.md)                                   | Deploys an internal Keycloak instance with the Helm release, preconfigured by Management Identity.                  | Small teams or self-contained environments.                                                |
| [External IdP via Internal Keycloak](./external-idp-via-internal-keycloak.md) | Uses the internal Keycloak as an identity broker, delegating authentication to an external identity provider (IdP). | Organizations with existing identity infrastructure that want to retain Keycloak features. |
| [External OIDC provider](./external-oidc-provider.md)                         | Integrates Camunda with an external identity provider, such as Microsoft Entra ID or Okta, via OpenID Connect.      | Organizations with an existing enterprise identity infrastructure.                         |

### Limitations of OIDC setups

Due to technical limitations regarding [third party content](https://openid.net/specs/openid-connect-frontchannel-1_0.html#ThirdPartyContent),
front channel single sign out is not supported. This means that when a user logs out of one component, they will not be logged out of the OIDC provider or the other components.

## References

- [Basic authentication guide](./basic-authentication.md)
- [Internal Keycloak guide](./internal-keycloak.md)
- [External IdP via Internal Keycloak guide](./external-idp-via-internal-keycloak.md)
- [External Keycloak guide](./external-keycloak.md)
- [Microsoft Entra guide](./microsoft-entra.md)
- [Generic OIDC provider](./generic-oidc-provider.md)
- Management Identity: [Configure an external IdP using Keycloak](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md)
