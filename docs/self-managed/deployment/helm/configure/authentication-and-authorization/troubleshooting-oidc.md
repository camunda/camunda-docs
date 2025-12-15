---
id: troubleshooting-oidc
sidebar_label: Troubleshoot OIDC authentication
title: Troubleshoot OIDC authentication
description: "Common issues and solutions when configuring OIDC authentication for Camunda 8 Self-Managed."
---

This page provides solutions to common issues encountered when configuring OIDC authentication for Camunda 8 Self-Managed.

## Invalid redirect_uri

**Observed behavior:** During login, your OIDC provider shows "Invalid redirect_uri".

**Why this happens:** The `redirectUrl` in Helm values doesn't match an allowed redirect URI configured in your OIDC provider.

**How to fix:**

1. Open the browser's developer tools (F12) and check the `redirect_uri` parameter sent to your OIDC provider.
2. Ensure this exact URI is configured in your OIDC provider's allowed redirect URIs.
3. Update `redirectUrl` in Helm values to match how users actually access the component.

:::info Common misconfiguration
Use `http://localhost:8080` in Helm values when users access via `https://camunda.example.com/orchestration`.
:::

## Invalid audience

**Observed behavior:** Logs show "Invalid token" or "Audience mismatch" errors.

**Why this happens:** The `audience` parameter doesn't match the `aud` claim in tokens.

**How to fix:**

1. Obtain and decode a token:

   ```bash
   curl -X POST '<token-endpoint>' \
     -d 'client_id=<client-id>' \
     -d 'client_secret=<client-secret>' \
     -d 'grant_type=client_credentials' | jq -r '.access_token' | \
     cut -d'.' -f2 | base64 -d | jq '.aud'
   ```

2. Update the `audience` parameter in Helm values to match this value.
3. Redeploy Camunda.

:::note
Some providers, such as Keycloak, may not include the appropriate audience by default. Consult your provider's documentation on configuring token audiences. For Keycloak, see [External Keycloak](./external-keycloak.md).
:::

## Insufficient permissions

**Observed behavior:** You authenticate, but Camunda shows "Insufficient permissions".

**Why this happens:** Your account hasn't been granted access via mapping rules.

**How to fix:** In Management Identity, create a mapping rule that matches your claim values and assign the appropriate role. See [Managing mapping rules](/self-managed/components/management-identity/mapping-rules.md) for more details.

## Claim not found

**Observed behavior:** Logs show "Claim not found" or "Required claim missing" errors.

**Why this happens:** The configured claim name doesn't exist in tokens issued by your provider.

**How to fix:**

1. Decode a token to see available claims. See [JWT token claims reference](./jwt-token-claims.md) for instructions.
2. Update `usernameClaim` or `clientIdClaim` in Helm values to match the actual claim names.
3. Redeploy Camunda.

**Common alternatives:**

- User claims: `email`, `preferred_username`, `sub`
- Client claims: `client_id`, `azp`, `appid`.

For a complete list of common claim patterns by provider, see [JWT token claims reference](./jwt-token-claims.md#common-claim-patterns-by-provider).

## Pods not starting

**Observed behavior:** Pods remain in `Pending`, `CrashLoopBackOff`, or `Error` states.

**Why this happens:** Required secrets are missing, PostgreSQL is still initializing, or there are configuration typos in OIDC URLs.

**How to fix:**

1. Inspect pod events and status with `kubectl describe pod <pod-name> -n camunda` and `kubectl logs <pod-name> -n camunda`.
2. Check component logs with `kubectl logs -n camunda deployment/<component-name> -f` and search for keywords: `auth`, `token`, `oidc`, `401`, `403`.
