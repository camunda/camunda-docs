---
sidebar_label: Authentication and authorization
title: Helm chart authentication and authorization configuration
description: Learn how to configure authentication and authorization for Camunda 8 Self-Managed deployments using Helm chart.
---

Camunda 8 Self-Managed supports multiple authentication methods for securing access to components deployed with Helm charts. This section provides an overview of available authentication options and links to configuration guides for each method.

## Overview

By default, Camunda uses basic authentication with predefined demo users. Alternatively, you can configure OpenID Connect (OIDC) authentication, either through an internal Keycloak instance deployed with Camunda or an external OIDC provider.

### Authentication options

TODO: adjust "recommended for" to user journeys

| Method                                                | Description                                                                                         | Recommended for                             |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Basic authentication](./basic-authentication.md)     | Default authentication with preconfigured demo users. No external identity provider (IdP) required. | Local development and testing               |
| [Internal Keycloak](./internal-keycloak.md)           | Deploys a Keycloak pod with the Helm release, preconfigured by Management Identity.                 | Small teams or self-contained environments  |
| [External Keycloak](./using-external-keycloak.md)     | Connects Camunda to a separately deployed Keycloak instance for centralized identity management.    | Enterprise or production setups             |
| [External OIDC provider](./external-oidc-provider.md) | Integrates Camunda with external IdPs such as Microsoft Entra ID or Okta via OpenID Connect.        | Existing enterprise identity infrastructure |

### Limitations of OIDC setups

Due to technical limitations regarding [third party content](https://openid.net/specs/openid-connect-frontchannel-1_0.html#ThirdPartyContent),
front channel single sign out is not supported. This means that when a user logs out of one component, they will not be logged out of the OIDC provider or the other components.

## References

TODO: does this make sense here?

- [Helm chart OpenID Connect provider setup](/self-managed/deployment/helm/configure/authentication-and-authorization/connect-to-an-oidc-provider.md)
- [Connect Identity to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [Using external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/using-external-keycloak.md)
- Management Identity:
  - [Connect Management Identity to an identity provider](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md)
  - [Connect to an existing Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md)
  - [Configure an external IdP provider](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md)

TODO: Decide what to do with the guides in the Management Identity config section (do we want to keep the non-Helm part?) and OC Identity config section
