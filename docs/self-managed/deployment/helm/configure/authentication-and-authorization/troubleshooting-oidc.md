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

## Standard flow is disabled for the client

**Observed behavior:** Logging in to the Orchestration Cluster fails, and you see an error similar to:

```text
{"type":"about:blank","title":"Internal Server Error","status":500,"detail":"[unauthorized_client] Client is not allowed to initiate browser login with given response_type. Standard flow is disabled for the client.","instance":"/orchestration/sso-callback"}
```

**Why this happens:** The OIDC client configured for the Orchestration Cluster doesn't have the Authorization Code Flow enabled. Orchestration Cluster web applications require this flow for browser-based user login. This often occurs after upgrading from 8.7, where the reused `zeebe` client handled only machine-to-machine access and didn't need the flow.

**How to fix:**

1. In your identity provider, open the client used for the Orchestration Cluster OIDC configuration.
2. Enable the Authorization Code Flow for the client. In Keycloak, enable the **Standard flow** option for the client.
3. Retry the login.

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

2. Confirm the `aud` value matches the audience you assigned to that component in [Assign a unique audience to each component](./generic-oidc-provider.md#assign-a-unique-audience-to-each-component). Update either the Helm value or your provider's client configuration so the two agree.
3. Redeploy Camunda.

:::note
Some providers, such as Keycloak, may not include the appropriate audience by default. Consult your provider's documentation on configuring token audiences. For Keycloak, see [External Keycloak](./external-keycloak.md).
:::

## UserInfo endpoint rejects the access token

**Observed behavior:** Login succeeds, but logs show a warning similar to:

```text
OIDC /userinfo call failed for registration '<registration-id>' (invalid_user_info_response); continuing login with ID-token-only claims. Set user-info-required=true for this provider to fail login instead, or adjust the requested scope so the access token is accepted at this IdP's userinfo endpoint.
```

Any claims that would normally come from the `/userinfo` response, and aren't already present in the ID token, are missing from the session.

**Why this happens:** Your identity provider's `/userinfo` endpoint rejected the access token Camunda sent it, most often because of an audience mismatch. This is structural for several identity providers, not a misconfiguration:

- **Microsoft Entra:** UserInfo is served by Microsoft Graph, which requires an access token whose audience is Microsoft Graph, never the Camunda client. The documented Entra scopes include `<CLIENT_UUID>/.default`, which always produces this mismatch. See [Ensure Entra prerequisites](./microsoft-entra.md#ensure-entra-prerequisites).
- **Auth0, Okta, and PingFederate:** The same rejection occurs whenever the access token is bound to an `audience` other than the provider's own UserInfo endpoint.

**How to fix:**

1. By default, no fix is needed. Login continues using only the claims from the ID token.
2. If this provider's authorization-relevant claims (for example, group membership) are only available from UserInfo, set `user-info-required: true` for that provider so a rejected call fails login loudly instead of silently continuing without those claims. See [`camunda.security.authentication.oidc.user-info-required`](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecurityauthenticationoidc).
3. To skip the UserInfo call entirely instead, for example if you don't need any claims from it, set `user-info-enabled: false` for that provider.

## Shared audience between components

**Observed behavior:** A token issued for one Camunda component is also accepted by another component that should not recognize it.

**Why this happens:** Both components are configured to accept the same audience. This can be required when Connectors calls the Orchestration Cluster or when Camunda Hub forwards a user's token to the cluster with `BEARER_TOKEN` authentication. In other cases, a shared audience can allow unintended cross-component access.

**How to fix:**

1. Compare the audience configured for each component against [Assign a unique audience to each component](./generic-oidc-provider.md#assign-a-unique-audience-to-each-component).
2. Check whether the shared audience supports one of the documented integrations. If it doesn't, give each component a distinct resource audience, and configure your provider to issue it.
3. Redeploy Camunda.

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

## TLS handshake failure connecting to the IdP

**Observed behavior:** Identity or another component fails to reach the OIDC provider, and logs show an error similar to:

```text
javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

**Why this happens:** Your OIDC provider's certificate (or the internal Keycloak instance's certificate) is signed by a private or internal certificate authority that isn't in the JVM truststore Camunda components use by default.

**How to fix:** Add your CA to the trust bundle Camunda components use to validate the connection. See [configure TLS](/self-managed/deployment/helm/configure/tls.md#external-oidc-issuer-with-private-ca) for the Helm chart's `global.tls.caBundle` overlay, which covers this exact scenario.

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

By default, Tomcat rejects requests whose headers exceed this limit (typically 8 KB). As a result, the request never reaches Camunda, and the login fails with request header is too large.

**How to fix:**

Increase the maximum allowed HTTP request header size for the Identity service.

1. Configure the Spring Boot property `server.max-http-request-header-size` (via the `SERVER_MAX_HTTP_REQUEST_HEADER_SIZE` environment variable) to a value higher than the default, for example 40KB.

2. If you are using the Helm chart, set this environment variable on the Identity deployment in your `values.yaml`, similar to other Identity environment variables:

   ```yaml
   identity:
     env:
       - name: SERVER_MAX_HTTP_REQUEST_HEADER_SIZE
         value: "40KB"
   ```

3. Upgrade or redeploy the release so the new environment variable takes effect.

The Orchestration Cluster can hit the same limit when its session cookies and authorization code grow large enough, for example with Microsoft Entra. If Operate or Tasklist login fails with the same symptom, set `SERVER_MAX_HTTP_REQUEST_HEADER_SIZE` under `orchestration.env` instead.
