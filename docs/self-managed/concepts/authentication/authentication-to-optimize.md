---
id: authentication-to-optimize
title: Optimize authentication in Self-Managed
sidebar_label: "Optimize authentication"
description: "Learn how Optimize authenticates users and API requests in Self-Managed, and what changes when upgrading from Camunda 8.9 to 8.10."
---

## About Optimize authentication

[Optimize](/self-managed/components/optimize/overview.md) authenticates against an external OIDC identity provider (IdP). Optimize doesn't offer Basic authentication as a login method.

Starting with Camunda 8.10, authentication is unified across the Camunda components: Optimize is configured with the same `camunda.security.*` settings as the [Orchestration Cluster](authentication-to-orchestration-cluster.md).

:::tip Recommendation
If you've already configured [OIDC for the Orchestration Cluster](authentication-to-orchestration-cluster.md#oidc), use the same identity provider for Optimize. This gives your users a single login experience across both components.
:::

## Configure OIDC for Optimize

Set the following properties, shared with the other Camunda components:

- `camunda.security.authentication.oidc.issuer-uri`
- `camunda.security.authentication.oidc.client-id`
- `camunda.security.authentication.oidc.client-secret`
- `camunda.security.authentication.oidc.audiences`
- `camunda.security.authentication.oidc.username-claim`
- `camunda.security.authentication.oidc.client-id-claim`

See the [OIDC configuration properties reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecurityauthenticationoidc) for the full list and defaults.

Note the following:

- `issuer-uri` must match the issuer your IdP puts in the `id_token`.
- `audiences` must contain every audience your IdP issues for Optimize, plus the audience of any other application that calls Optimize on a user's behalf, such as Camunda Hub. See [component-specific configuration keys](/self-managed/upgrade/components/890-to-8100.md#component-specific-security-configuration-keys-are-deprecated) for the audiences the component-specific keys covered.
- Optimize classifies each bearer token as belonging to a user or a machine-to-machine (M2M) client, using `username-claim` and `client-id-claim`, and enforces your configured Optimize permission only on tokens it classifies as a user's. A token it can't classify as an M2M client's is treated as a user's, and checked against your configured Optimize permission.

:::note
If you deploy with the Camunda Helm chart, you don't need to set `issuer-uri`, `client-id`, `client-secret`, or `audiences` directly. The chart continues to read the same `global.identity.auth.optimize.*` values you already use, and renders them into the properties above for you.
:::

The chart doesn't set `username-claim` or `client-id-claim` for Optimize. Left unset, `username-claim` falls back to its software default of `sub`, and `client-id-claim` has no default at all, so Optimize can't classify any client token as M2M until you set it — every bearer token is then checked against your configured Optimize permission. Set both explicitly through `optimize.extraConfiguration`, matching the values your identity provider uses (for example, `preferred_username` and `client_id` for Keycloak). See the [setup instructions for your identity provider](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md) for other providers:

```yaml
optimize:
  extraConfiguration:
    - file: security.yaml
      content: |
        camunda:
          security:
            authentication:
              oidc:
                username-claim: preferred_username
                client-id-claim: client_id
```

## Authenticate API requests

The Optimize API accepts OIDC bearer tokens. For the client steps, see [Optimize API authentication](/apis-tools/optimize-api/optimize-api-authentication.md).

Camunda 8.10 no longer accepts the static token `api.accessToken` on this API. The token works only if you opt into the [8.9 component-specific configuration fallback](#fall-back-to-the-89-component-specific-configuration), which Camunda plans to remove in a future release. Migrate the affected API clients to OIDC bearer tokens during 8.10.

## Component-specific configuration keys are deprecated

The Optimize login and API security keys used through 8.9 are deprecated in favor of `camunda.security.*`. Optimize maps recognized component-specific keys automatically and logs a deprecation warning naming the replacement.

Keep `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` set. It is not deprecated, and Optimize still uses it to look up users, for example when adding users to a collection.

If you're deploying Camunda 8.10 for the first time, none of this applies to you: configure the `camunda.security.*` properties above and skip this section and the next one.

See [Upgrade Camunda components from 8.9 to 8.10](/self-managed/upgrade/components/890-to-8100.md#component-specific-security-configuration-keys-are-deprecated) for the full key mapping, precedence rules, and the keys that no longer have any effect.

## Fall back to the 8.9 component-specific configuration

If the 8.10 authentication changes cause a regression in your deployment, you can temporarily revert Optimize to its 8.9 behavior. Use this only if your integrations depend on the static API access token that the 8.9 stack accepted, or if your migration to the `camunda.security.*` keys was misconfigured and you need a working deployment while you fix it:

```yaml
optimize:
  security:
    csl:
      enabled: false
```

Treat this as a temporary escape hatch, not a supported long-term mode. Camunda plans to remove `optimize.security.csl.enabled=false`, the 8.9 behavior it restores, and the component-specific configuration keys in a future release. Falling back doesn't pause the migration, it only delays it, so the same `camunda.security.*` migration is still required.
