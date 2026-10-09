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

Configure Camunda Hub's OIDC authentication with the properties documented under [Identity / Keycloak](./properties.md#identity--keycloak), not with the Orchestration Cluster's `camunda.security.authentication.oidc.*` settings. For the one exception, the user ID claim, see [change the user ID claim](#change-the-user-id-claim).

## Change the user ID claim

Camunda Hub identifies users by the `sub` claim of the access token. To use a different claim, for example `oid` in Microsoft Entra ID, set `camunda.security.authentication.oidc.username-claim`, or alternatively `CAMUNDA_HUB_OAUTH2_TOKEN_USERIDCLAIM` (`camunda.hub.oauth2.token.user-id-claim`). Despite its name, `username-claim` defines how Camunda Hub identifies users, not the name it displays. Choose a claim that:

- Never changes for a user, like `sub` or `oid`. If the value changes, for example when a user's email address changes, the user gets a new, empty account.
- Is present in every user access token and contains a non-empty string of at most 255 characters. Otherwise, the user can't log in.

With Helm, use [`camundaHub.restapi.extraConfiguration`](/self-managed/deployment/helm/configure/application-configs.md#componentnameextraconfiguration):

```yaml
camundaHub:
  restapi:
    extraConfiguration:
      - file: user-id-claim.yaml
        content: |
          camunda:
            security:
              authentication:
                oidc:
                  username-claim: oid
```

If you change the user ID claim for an existing installation, users keep their account. On their next login, Camunda Hub moves accounts stored under `sub` to the new claim.

:::warning
Moving accounts is a one-way operation. If you change the claim again, Camunda Hub doesn't move accounts back, and affected users get a new, empty account.
:::

## Use a different OIDC provider than Keycloak

By default, Camunda Hub uses the built-in Keycloak instance as its identity provider. To use a different OIDC provider, follow the steps in the [OIDC connection guide](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).
