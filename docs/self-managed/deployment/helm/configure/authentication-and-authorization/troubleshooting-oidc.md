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

1. Decode a token to see available claims: `echo "<token>" | cut -d'.' -f2 | base64 -d | jq`.
2. Update `usernameClaim` or `clientIdClaim` in Helm values to match the actual claim names.
3. Redeploy Camunda.

**Common alternatives:**

- User claims: `email`, `preferred_username`, `sub`
- Client claims: `client_id`, `azp`, `appid`.

## Pods not starting

**Observed behavior:** Pods remain in `Pending`, `CrashLoopBackOff`, or `Error` states.

**Why this happens:** Required secrets are missing, PostgreSQL is still initializing, or there are configuration typos in OIDC URLs.

**How to fix:**

1. Inspect pod events and status with `kubectl describe pod <pod-name> -n camunda` and `kubectl logs <pod-name> -n camunda`.
2. Check component logs with `kubectl logs -n camunda deployment/<component-name> -f` and search for keywords: `auth`, `token`, `oidc`, `401`, `403`.

## Request header is too large

**Observed behavior:** Logging in to Management Identity fails and the browser shows a Tomcat error page, for example `HTTP Status 400 – Bad Request`.

Management Identity logs contain messages similar to:

```text
o.a.coyote.http11.Http11Processor : Error parsing HTTP request header
Note: further occurrences of HTTP request parsing errors will be logged at DEBUG level.

java.lang.IllegalArgumentException: Request header is too large
    at org.apache.coyote.http11.Http11InputBuffer.fill(Http11InputBuffer.java:765)
    ...
```

**Why this happens:** When using an external OIDC provider (for example, Microsoft Entra ID), the access token and related cookies (such as `IDENTITY_JWT`, `IDENTITY_REFRESH_JWT`, and Optimize cookies) can make the HTTP request header larger than the default limit of the embedded application server (Tomcat).

By default, Tomcat rejects requests whose headers exceed this limit (typically 8 KB). As a result, the request never reaches Camunda, and the login fails with Request header is too large.

**How to fix:**

Increase the maximum allowed HTTP request header size for the Identity service.

1. Configure the Spring Boot property server.max-http-request-header-size (via the `SERVER_MAXHTTPREQUESTHEADERSIZE` environment variable) to a value higher than the default, for example 40KB.

2. If you are using the Helm chart, set this environment variable on the Identity deployment in your values.yaml, similar to other Identity environment variables:

```yaml
identity:
  env:
    - name: SERVER_MAXHTTPREQUESTHEADERSIZE
      value: "40KB"
```

3. Upgrade or redeploy the release so the new environment variable takes effect.
