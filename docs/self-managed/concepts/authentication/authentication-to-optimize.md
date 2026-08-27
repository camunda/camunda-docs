---
id: authentication-to-optimize
title: Optimize authentication in Self-Managed
sidebar_label: "Optimize authentication"
description: "Learn how Optimize authenticates users and API requests in Self-Managed, and what changes when upgrading from Camunda 8.9 to 8.10."
---

## About Optimize authentication

[Optimize](/self-managed/components/optimize/overview.md) authenticates against an external OIDC identity provider (IdP). Optimize doesn't offer Basic authentication as a login method.

Starting with Camunda 8.10, Optimize authenticates through the Camunda Security Library (CSL): the same session-based OIDC login the [Orchestration Cluster](authentication-to-orchestration-cluster.md) uses. Through 8.9, Optimize used its own stateless, self-signed JWT cookie instead. See [ADR-0038](https://github.com/camunda/camunda-security-library/blob/main/docs/adr/0038-optimize-reuses-stateful-oidc-webapp-chain.md) for the design decision behind this change.

:::tip Recommendation
If you've already configured [OIDC for the Orchestration Cluster](authentication-to-orchestration-cluster.md#oidc), use the same identity provider for Optimize. This gives your users a single login experience across both components.
:::

## Configure OIDC for Optimize

Set the following properties, shared with the rest of the Camunda Security Library:

- `camunda.security.authentication.oidc.issuer-uri`
- `camunda.security.authentication.oidc.client-id`
- `camunda.security.authentication.oidc.client-secret`
- `camunda.security.authentication.oidc.audiences`

See the [OIDC configuration properties reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecurityauthenticationoidc) for the full list and defaults.

:::note
If you deploy with the Camunda Helm chart, you don't need to set these directly. The chart continues to read the same `global.identity.auth.optimize.*` values you already use, and renders them into the properties above for you.
:::

## Session cookie replaces the legacy JWT cookie

In 8.10, a standard session cookie replaces Optimize's self-signed JWT cookie, and session state moves from the cookie itself into a session store on the same Elasticsearch or OpenSearch cluster Optimize already uses.

|                 | Optimize 8.9                                                                   | Optimize 8.10                                                                                           |
| --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Session carrier | Self-signed JWT split across `X-Optimize-Authorization[_n]` cookies when large | Standard session cookie; no cookie splitting                                                            |
| Session state   | Stateless; revocation checked against a terminated-session list                | Session document stored server-side, in a new Optimize index (Elasticsearch and OpenSearch)             |
| Login           | Identity SDK / Auth0 login code inside Optimize                                | Spring `oauth2Login` against your configured OIDC provider                                              |
| Logout          | Cookie cleared; session ID added to the terminated-session list                | `POST /logout` clears the server-side session and calls your IdP's end-session endpoint                 |
| Load balancing  | Affinity-free                                                                  | Affinity-free; sessions live in the shared Elasticsearch or OpenSearch store, not in application memory |

The new session index is created automatically by the same schema manager that creates Optimize's other indices, using the same Elasticsearch or OpenSearch credentials. You don't need to provision it manually, run a migration, or grant additional privileges.

Because the session cookie format changes, an active 8.9 session isn't valid after the upgrade. Your users log in again the first time they open Optimize on 8.10.

## API-consumer behavior changes

### CSRF protection on cookie-authenticated requests

Optimize uses the same CSRF mechanism as the Orchestration Cluster: after login, Optimize sets a `X-CSRF-TOKEN` cookie, and state-changing requests (POST, PUT, PATCH, DELETE) that authenticate with the session cookie must echo that value in an `X-CSRF-TOKEN` request header. See [CSRF protection](/self-managed/components/orchestration-cluster/core-settings/configuration/csrf-protection.md) for the full mechanism.

Requests that authenticate with a bearer token only, without a session cookie, are exempt from this check, so scripted API clients that don't use the session cookie are unaffected.

### Bearer tokens now work against the internal API

Optimize's internal API is the set of endpoints its own UI calls, such as `/api/dashboard/**`, `/api/report/**`, and `/api/collection/**`. Through 8.9, only the public API (`/api/public/**`) and ingestion endpoints accepted bearer tokens; the internal API required the session cookie. In 8.10, Optimize also accepts bearer tokens on the internal API.

The token's `aud` claim must be listed in `camunda.security.authentication.oidc.audiences`.

:::note
The internal API is not a supported public contract. Its shape can change between Camunda releases, even patch releases.
:::

`/api/authentication/**` is unchanged and still serves the login callback.

### OIDC id_token validation

Optimize always validates the login `id_token`'s audience against your configuration, and validates its issuer when `camunda.security.authentication.oidc.issuer-uri` is configured. If you migrated from a legacy setup that configured OIDC endpoints individually rather than through `issuer-uri` (for example, a Keycloak back-channel setup), no issuer validator is registered, and tokens are accepted on signature, audience, and expiry alone. Confirm that:

- If you set `camunda.security.authentication.oidc.issuer-uri`, it matches the issuer your IdP puts in the `id_token`.
- `camunda.security.authentication.oidc.audiences` contains every value your IdP puts in the audience claim for the Optimize application, including whatever the legacy `CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE` and `CAMUNDA_OPTIMIZE_API_AUDIENCE` variables previously covered. The same list validates both the login `id_token` and any bearer token sent to Optimize, so it must also include the audience of any other application that calls Optimize on a user's behalf. For example, if Camunda Hub is enabled, its client API audience must be included, or the requests it forwards to Optimize on the signed-in user's behalf are rejected. See [legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full mapping.

## Legacy configuration keys are deprecated

The Optimize security configuration keys used through 8.9 (`CAMUNDA_OPTIMIZE_IDENTITY_*`, `CAMUNDA_OPTIMIZE_AUTH0_*`, and related keys) are deprecated in favor of `camunda.security.*`. A compatibility bridge maps recognized legacy keys automatically and logs a deprecation warning naming the replacement.

If you're deploying Camunda 8.10 for the first time, none of this applies to you: configure the `camunda.security.*` properties above and skip this section and the next one.

See [Upgrade Camunda components from 8.9 to 8.10](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full key mapping, precedence rules, and the keys that no longer have any effect.

## Fall back to the 8.9 security stack

If CSL causes a regression in your deployment, you can temporarily revert Optimize to the 8.9 security stack:

```yaml
optimize:
  security:
    csl:
      enabled: false
```

Treat this as a temporary escape hatch, not a supported long-term mode. `optimize.security.csl.enabled=false`, the legacy security stack it restores, and the legacy configuration keys are all removed in Camunda 8.11. If you rely on this fallback in 8.10, migrate to CSL before upgrading to 8.11.

Falling back also reverts the security posture CSL introduced:

- CSRF protection on cookie-authenticated requests is removed.
- The `id_token` issuer and audience are no longer validated.
- Sessions revert from server-side session state to a self-signed, stateless JWT cookie.
