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

See the [OIDC configuration properties reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecurityauthenticationoidc) for the full list and defaults.

Note the following:

- `issuer-uri` must match the issuer your IdP puts in the `id_token`.
- `audiences` must contain every audience your IdP issues for Optimize, plus the audience of any other application that calls Optimize on a user's behalf, such as Camunda Hub. See [legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the audiences the legacy keys covered.

:::note
If you deploy with the Camunda Helm chart, you don't need to set these directly. The chart continues to read the same `global.identity.auth.optimize.*` values you already use, and renders them into the properties above for you.
:::

## Legacy configuration keys are deprecated

The Optimize login and API security keys used through 8.9 (`CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL`, `CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID`, `CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET`, `CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE`, `CAMUNDA_OPTIMIZE_AUTH0_*`, and related keys) are deprecated in favor of `camunda.security.*`. Optimize maps recognized legacy keys automatically and logs a deprecation warning naming the replacement.

Keep `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` set. It is not deprecated, and Optimize still uses it to look up users, for example when adding users to a collection.

If you're deploying Camunda 8.10 for the first time, none of this applies to you: configure the `camunda.security.*` properties above and skip this section and the next one.

See [Upgrade Camunda components from 8.9 to 8.10](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full key mapping, precedence rules, and the keys that no longer have any effect.

## Fall back to the 8.9 security stack

If the 8.10 authentication changes cause a regression in your deployment, you can temporarily revert Optimize to its 8.9 behavior:

```yaml
optimize:
  security:
    csl:
      enabled: false
```

Treat this as a temporary escape hatch, not a supported long-term mode. `optimize.security.csl.enabled=false`, the 8.9 behavior it restores, and the legacy configuration keys are all removed in Camunda 8.11. If you rely on this fallback in 8.10, migrate to the `camunda.security.*` settings before upgrading to 8.11.
