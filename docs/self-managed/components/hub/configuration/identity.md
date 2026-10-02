---
id: identity
title: "Authentication"
description: "Configure how Camunda Hub authenticates users, and connect Camunda Hub to an OIDC provider other than Keycloak."
---

Camunda Hub authenticates users with OpenID Connect (OIDC).

## Authentication and user management

Camunda Hub authenticates users with its own properties (see [Identity / Keycloak](./properties.md#identity--keycloak)), while Management Identity keeps managing users and their access. For how the responsibilities are split, see [management and modeling component authentication](/self-managed/concepts/authentication/authentication-to-management-components.md#authentication-and-user-management).

Management Identity is still required for Camunda Hub in 8.10. For more information, see [manage access and permissions](/self-managed/components/management-identity/access-management/access-management-overview.md).

## Configure OIDC authentication

Configure Camunda Hub's OIDC authentication with the properties documented under [Identity / Keycloak](./properties.md#identity--keycloak).

Camunda Hub does not use the Orchestration Cluster's `camunda.security.authentication.oidc.*` properties for authentication, with one exception: Camunda Hub also reads `camunda.security.authentication.oidc.username-claim` directly, as an alternative to `CAMUNDA_HUB_OAUTH2_TOKEN_USERNAMECLAIM`.

Camunda Hub internally translates its own properties to their `camunda.security.authentication.oidc.*` equivalents at startup, but this translation currently has no other practical effect.

## Use a different OIDC provider than Keycloak

By default, Camunda Hub uses the built-in Keycloak instance as its identity provider. To use a different OIDC provider, follow the steps in the [OIDC connection guide](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).
