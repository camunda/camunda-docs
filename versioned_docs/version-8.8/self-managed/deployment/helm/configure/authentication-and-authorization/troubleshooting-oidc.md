---
id: troubleshooting-oidc
sidebar_label: Troubleshooting OIDC
title: Troubleshooting OIDC authentication
description: "Common issues and solutions when configuring OIDC authentication for Camunda 8 Self-Managed."
---

This page provides solutions to common issues encountered when configuring OIDC authentication for Camunda 8 Self-Managed.

## Invalid redirect_uri error

**Symptom:** OIDC provider shows "Invalid redirect_uri" error during login.

**Cause:** The `redirectUrl` in Helm values doesn't match the allowed redirect URIs in your OIDC provider.

**Solution:**

1. Open browser developer tools (F12) and check the `redirect_uri` parameter sent to your OIDC provider
2. Ensure this exact URI is configured in your OIDC provider's allowed redirect URIs
3. Update the `redirectUrl` parameter in Helm values to match how users actually access the component

**Common mismatch:** Using `http://localhost:8080` in Helm values when users access via `https://camunda.example.com/orchestration`

## Invalid audience or token validation fails

**Symptom:** Logs show "Invalid token" or "Audience mismatch" errors.

**Cause:** The `audience` parameter doesn't match the `aud` claim in tokens.

**Solution:**

1. Obtain and decode a token:

   ```bash
   curl -X POST '<token-endpoint>' \
     -d 'client_id=<client-id>' \
     -d 'client_secret=<client-secret>' \
     -d 'grant_type=client_credentials' | jq -r '.access_token' | \
     cut -d'.' -f2 | base64 -d | jq '.aud'
   ```

2. Update the `audience` parameter in Helm values to match this value
3. Redeploy Camunda

:::note
Some providers (notably Keycloak) may not include an appropriate audience by default. Consult your provider's documentation on configuring token audiences. For Keycloak, see the [External Keycloak guide](./external-keycloak.md).
:::

## User cannot log in - Insufficient permissions

**Symptom:** User authenticates but sees "Insufficient permissions" in Camunda.

**Cause:** User not granted access via mapping rules.

**Solution:** In Management Identity, create a mapping rule matching the user's claim values and assign the appropriate role. See [Managing Mapping Rules](/self-managed/components/management-identity/mapping-rules.md).

## Claim not found errors

**Symptom:** Logs show "Claim not found" or "Required claim missing" errors.

**Cause:** The configured claim name doesn't exist in tokens from your provider.

**Solution:**

1. Decode a token to see available claims: `echo "<token>" | cut -d'.' -f2 | base64 -d | jq`
2. Update `usernameClaim` or `clientIdClaim` in Helm values to match actual claim names
3. Redeploy Camunda

**Common alternatives:** User claims: `email`, `preferred_username`, `sub` | Client claims: `client_id`, `azp`, `appid`

## Pods not starting

**Symptom:** Pods remain in `Pending`, `CrashLoopBackOff`, or `Error` states.

**Solution:** Check pod status with `kubectl describe pod <pod-name> -n camunda` and `kubectl logs <pod-name> -n camunda`

**Common causes:** Missing secrets, PostgreSQL still initializing, or configuration typos in OIDC URLs

For further assistance, check component logs with `kubectl logs -n camunda deployment/<component-name> -f` and search for keywords: `auth`, `token`, `oidc`, `401`, `403`
