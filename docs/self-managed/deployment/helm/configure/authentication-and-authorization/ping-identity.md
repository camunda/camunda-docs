---
id: ping-identity
sidebar_label: Ping Identity
title: Connect Camunda to Ping Identity (PingFederate or PingOne)
description: Learn how to configure Camunda 8 Self-Managed to authenticate with PingFederate or PingOne Advanced Identity Cloud.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide covers connecting Camunda 8 Self-Managed to PingFederate or PingOne Advanced Identity Cloud. Where the two products differ, both variants are noted.

:::info
This page covers only what's specific to Ping. For the shared setup steps — creating secrets, configuring each Camunda component through Helm, and identifying token claims — see [Generic OIDC provider](./generic-oidc-provider.md). Complete that guide's steps alongside this page's Ping-specific steps.
:::

## Prerequisites

In addition to the [prerequisites for any OIDC provider](./generic-oidc-provider.md#prerequisites), you'll need:

- Administrator access to your Ping environment with permission to create OAuth/OIDC applications.
- Your authorization server's discovery document URL:
  - **PingFederate:** `https://<pingfederate-host>/.well-known/openid-configuration`
  - **PingOne:** `https://auth.pingone.com/<environment-id>/as/.well-known/openid-configuration`

## Create OAuth/OIDC applications in Ping

The [generic OIDC provider guide](./generic-oidc-provider.md#create-oidc-clients) lists the six clients Camunda needs. Create each one as follows.

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

For each confidential client (Management Identity, Optimize, Orchestration Cluster, Web Modeler API):

1. Go to **Applications → OAuth Clients → Create Client**.
2. Set a descriptive **Client ID** (for example, `camunda-identity`).
3. Under **Client Authentication**, select **Client Secret** and generate a secret. Record the value.
4. Under **Redirect URIs**, add the component's redirect URI from the [redirect URI table](./generic-oidc-provider.md#redirect-uri-table). Skip this for Web Modeler API, which uses client credentials only.
5. Under **Grant Types**, select **Authorization Code** (skip for Web Modeler API; select **Client Credentials** instead).
6. Under **Scopes Allowed**, add `openid`, `profile`, `email`, `offline_access`.
7. Save the client.

For the two public clients (Web Modeler UI, Console), create a client the same way but without a client secret, using whichever public/PKCE client type your PingFederate version supports.

</TabItem>
<TabItem value="pingone" label="PingOne">

For each confidential client:

1. Go to **Connections → Applications → Add Application → OIDC Web App**.
2. Set the application name and save.
3. Under **Configuration**, set the redirect URI from the [redirect URI table](./generic-oidc-provider.md#redirect-uri-table).
4. Under **Resources**, grant the `openid`, `profile`, and `email` scopes.
5. Under **Configuration → Token Endpoint Auth Method**, select **Client Secret Post** or **Client Secret Basic**.
6. Note the **Client ID** and **Client Secret** from the **Configuration** tab.

For Web Modeler API, add a **Worker** (machine-to-machine) application instead, and note its client ID and secret.

For the two public clients, add an application using PingOne's public/native client type.

</TabItem>
</Tabs>

## Determine whether you need separate signing keys

PingFederate deployments commonly sign access tokens with a different key than ID tokens — this is a standard enterprise PingFederate pattern, not an edge case. Confirm which case you're in before deploying:

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

Go to **Authorization Server → Token Settings**, and compare the signing certificate under **JWT Access Token** against the one under **OpenID Connect Policy Management**. If they match, your deployment uses a single key and you can skip the dual-key configuration below. If they differ (or you're unsure), assume dual keys.

To find the access token JWKS endpoint, go to **Security → Certificate & Key Management → Runtime Keys** — the key set is published at `https://<pingfederate-host>/pf/JWKS`. Compare this against the `jwks_uri` in your discovery document; if the URLs differ, you have two distinct key sets.

</TabItem>
<TabItem value="pingone" label="PingOne">

Go to **Connections → Applications → your app → Configuration → Token Management**. If a custom access token signing key is configured separately from the OIDC settings, note its JWKS URL — this is your access token JWKS endpoint, distinct from the ID token JWKS in the discovery document.

</TabItem>
</Tabs>

If your two JWKS URLs differ, follow [Handle separate access token and ID token signing keys](./generic-oidc-provider.md#handle-separate-access-token-and-id-token-signing-keys) using the access token JWKS URL you found above.

## Configure Camunda components

Follow [Configure Camunda components](./generic-oidc-provider.md#configure-camunda-components) using the endpoint URLs from your discovery document. A few Ping-specific notes:

- Set `global.identity.auth.type` to `"GENERIC"`.
- Ping's `client_id` claim in access tokens identifies the calling client for both PingFederate and PingOne — the `clientIdClaim` default already matches this, so you typically don't need to override it. Confirm by decoding a real client-credentials token (see [JWT token claims reference](./jwt-token-claims.md)).
- `sub` is a stable, unique per-user identifier and a safe default for `initialClaimName`. Decode a test token first to confirm which user-identifying claims your Ping deployment actually populates — see [Identify token claims](./generic-oidc-provider.md#identify-token-claims).

### Audience configuration requires Ping-side setup

Unlike some providers, Ping doesn't automatically populate the `aud` claim with the requesting client's ID — this needs explicit setup in Ping before the `audience` values in your Helm config will validate correctly.

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

In PingFederate, the `aud` claim comes from an Access Token Manager's **Audience Claim Value** field — a single static string that does not template from the requesting client (`${client_id}` is taken literally, not resolved). A shared Access Token Manager therefore can't produce a different `aud` per client.

To get "audience = own client ID" for each of the six Camunda components, create one Access Token Manager per component, each with **Audience Claim Value** hardcoded to that component's client ID, and point each OAuth client's default Access Token Manager at its own. Without this, tokens validate but either have no `aud` claim at all, or the wrong one if a shared Access Token Manager is reused — and Camunda's audience check fails either way.

</TabItem>
<TabItem value="pingone" label="PingOne">

Confirm your PingOne resource/scope configuration issues an `aud` claim matching each component's client ID, and adjust the `audience` values in your Helm config to match what you find in a decoded token.

</TabItem>
</Tabs>

## Assign users

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

User access is controlled by access policies. Ensure your PingFederate access policy permits your admin user to authenticate to the Camunda Identity and Camunda Orchestration Cluster clients before first startup.

</TabItem>
<TabItem value="pingone" label="PingOne">

In the PingOne admin console, open each application, and under **Access**, ensure the admin user's population or the relevant group is assigned. Confirm the user is in the **Active** state.

</TabItem>
</Tabs>

## Troubleshooting

For issues common to any OIDC provider, see [Troubleshoot OIDC authentication](./troubleshooting-oidc.md). The following are specific to Ping:

**`invalid_client` during code exchange**
Ping returned an error exchanging the authorization code for tokens. Verify the client authentication method configured in Ping (**Client Secret Post** vs. **Client Secret Basic**) matches what Camunda sends. PingFederate defaults to **Client Secret Basic** — check your client configuration if you changed it.

**`aud` claim mismatch, or missing entirely**
See [Audience configuration requires Ping-side setup](#audience-configuration-requires-ping-side-setup) above — this is the most common cause with PingFederate specifically, since a shared Access Token Manager can't produce a per-client audience.

**Token signature validation fails on API calls, but interactive login succeeds**
The access token and ID token are signed with different keys. See [Determine whether you need separate signing keys](#determine-whether-you-need-separate-signing-keys) above.

**PingFederate: `error=server_error, error_description=There are no authentication methods available for OAuth on the authorization redirect`**
This means PingFederate has no IdP adapter registered as an authentication source for the OAuth authorization server — check **System → OAuth Settings → Authorization Server → IdP Adapter Mapping**, and confirm the same adapter is also listed under **Authentication Policies → Default Authentication Sources**. A client-credentials grant works regardless, since it doesn't need one; only authorization-code login redirects are affected.

:::note
Customers evaluating this guide almost always already have a working PingFederate authentication policy — this is basic PingFederate setup unrelated to Camunda, so it's unlikely to come up in practice. It's included here because it was encountered once during testing against a from-scratch PingFederate instance and wasn't fully resolved; if you hit it, it may be specific to your PingFederate version or build.
:::
