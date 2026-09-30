---
id: identity
title: "Authentication"
description: "Configure how Camunda Hub authenticates users, and connect Camunda Hub to an OIDC provider other than Keycloak."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda Hub authenticates users with OpenID Connect (OIDC), using the same configuration settings as the Orchestration Cluster.

## Authentication and user management

In 8.10, Camunda Hub authenticates users with the same `camunda.security.*` settings as the Orchestration Cluster, while Management Identity keeps managing users and their access. For how the responsibilities are split, see [management and modeling component authentication](/self-managed/concepts/authentication/authentication-to-management-components.md#authentication-and-user-management).

Management Identity is still required for Camunda Hub in 8.10. For more information, see [manage access and permissions](/self-managed/components/management-identity/access-management/access-management-overview.md).

## Configure OIDC authentication

Camunda Hub uses the following settings to validate tokens and identify users:

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  security:
    authentication:
      oidc:
        issuer-uri: https://keycloak.example.com/auth/realms/camunda-platform
        client-id: web-modeler
        username-claim: oid # optional, default: sub
        audiences: web-modeler-api,web-modeler-public-api # optional
```

</TabItem>
<TabItem value="env" label="Environment variables">

| Environment variable                                 | Description                                                                                                                                                                                                                    | Example value                                               | Default value |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI`     | URL of the token issuer, used for JWT validation. Individual endpoints are fetched from the provider's [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).         | `https://keycloak.example.com/auth/realms/camunda-platform` | -             |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID`      | Client ID of the Camunda Hub application configured in your identity provider.                                                                                                                                                 | `web-modeler`                                               | -             |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM` | [optional]<br/>The access token claim that uniquely identifies a user. See [change the user ID claim](#change-the-user-id-claim).                                                                                              | `oid`                                                       | `sub`         |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES`     | [optional]<br/>Comma-separated list of accepted audience claim values, used for JWT validation. Includes the audiences for both user access tokens and the [public Camunda Hub API](/apis-tools/hub-api-sm/authentication.md). | `web-modeler-api,web-modeler-public-api`                    | -             |

</TabItem>
</Tabs>

## Change the user ID claim

Camunda Hub identifies users by the `sub` claim of their access token. To use a different claim, for example `oid` in Microsoft Entra ID, set `camunda.security.authentication.oidc.username-claim`. Despite its name, this setting defines how Camunda Hub identifies users, not the name it displays. The claim must:

- Never change for a user, such as `sub` or `oid`. If the value changes, for example when a user's email address changes, the user gets a new, empty account.
- Be present in every user access token and contain a non-empty string of at most 255 characters. Otherwise, the user can't log in.

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

Existing users keep their account. On their next login, Camunda Hub moves accounts stored under `sub` to the new claim.

:::warning
Moving accounts is a one-way operation. If you change the claim again, Camunda Hub doesn't move the accounts back, and affected users get a new, empty account.
:::

## Upgrading from 8.9

If you configured Camunda Hub authentication in 8.9, no action is required to upgrade to 8.10. Camunda Hub translates your existing settings to the settings above at startup. Those 8.9 settings are deprecated, however, and are removed in 8.11, so migrate to the `camunda.security.authentication.oidc.*` settings before upgrading to 8.11.

If you set more than one of the three 8.9 audience properties, they merge into the single `camunda.security.authentication.oidc.audiences` list. Set `camunda.security.authentication.oidc.audiences` explicitly so the resulting list is the one you intend.

If you changed the user ID claim in 8.9 with `camunda.modeler.oauth2.token.user-id-claim` or `CAMUNDA_IDENTITY_USERIDCLAIM`, set `camunda.security.authentication.oidc.username-claim` to the same claim before you upgrade to 8.11. Otherwise, Camunda Hub falls back to `sub`, and users whose accounts were moved to the configured claim get new, empty accounts.

For the mapping between the 8.9 and 8.10 settings, see [upgrade Camunda components from 8.9 to 8.10](/self-managed/upgrade/components/890-to-8100.md#authentication-configuration).

## Use a different OIDC provider than Keycloak

By default, Camunda Hub uses the built-in Keycloak instance as its identity provider. To use a different OIDC provider, follow the steps in the [OIDC connection guide](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).

:::tip
If you connect the [Orchestration Cluster to an external identity provider](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md), use the same provider for Camunda Hub. Both components read the same `camunda.security.authentication.oidc.*` settings, which gives you one authentication configuration to maintain and one place to manage users.
:::
