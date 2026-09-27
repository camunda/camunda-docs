---
id: ping-identity
sidebar_label: Ping Identity
title: Connect Camunda to Ping Identity (PingFederate or PingOne)
description: Learn how to configure Camunda 8 Self-Managed to authenticate with PingFederate or PingOne Advanced Identity Cloud.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide covers connecting Camunda 8 Self-Managed to PingFederate or PingOne Advanced Identity Cloud. Where the two products differ, both variants are noted.

:::note
This page covers only what's specific to Ping. For the shared setup steps, including creating secrets, configuring each Camunda component through Helm, and identifying token claims, see [Generic OIDC provider](./generic-oidc-provider.md). Complete that guide's steps alongside the Ping-specific steps on this page.
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

1. Go to **Applications > OAuth Clients > Create Client**.
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

1. Go to **Connections > Applications > Add Application > OIDC Web App**.
2. Set the application name and save.
3. Under **Configuration**, set the redirect URI from the [redirect URI table](./generic-oidc-provider.md#redirect-uri-table).
4. Under **Resources**, grant the `openid`, `profile`, and `email` scopes.
5. Under **Configuration > Token Endpoint Auth Method**, select **Client Secret Post** or **Client Secret Basic**.
6. Note the **Client ID** and **Client Secret** from the **Configuration** tab.

For Web Modeler API, add a **Worker** (machine-to-machine) application instead, and note its client ID and secret.

For the two public clients, add an application using PingOne's public/native client type.

</TabItem>
</Tabs>

## Determine whether you need separate signing keys

PingFederate deployments commonly sign access tokens with a different key than ID tokens. This is a standard enterprise PingFederate pattern rather than an edge case, so confirm which case applies to your deployment before you deploy Camunda.

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

Go to **Authorization Server > Token Settings** and compare the signing certificate under **JWT Access Token** against the one under **OpenID Connect Policy Management**. If they match, your deployment uses a single key and you can skip the dual-key configuration. If they differ, or if you're unsure, assume dual keys.

To find the access token JWKS endpoint, go to **Security > Certificate & Key Management > Runtime Keys**. The key set is published at `https://<pingfederate-host>/pf/JWKS`. Compare this against the `jwks_uri` in your discovery document. If the URLs differ, you have two distinct key sets.

</TabItem>
<TabItem value="pingone" label="PingOne">

Go to **Connections > Applications > your app > Configuration > Token Management**. If a custom access token signing key is configured separately from the OIDC settings, note its JWKS URL. This is your access token JWKS endpoint, distinct from the ID token JWKS in the discovery document.

</TabItem>
</Tabs>

If your two JWKS URLs differ, follow [Handle separate access token and ID token signing keys](./generic-oidc-provider.md#handle-separate-access-token-and-id-token-signing-keys) using the access token JWKS URL you found above.

## Configure Camunda components

Follow [Configure Camunda components](./generic-oidc-provider.md#configure-camunda-components) using the endpoint URLs from your discovery document. A few Ping-specific notes:

- Set `global.identity.auth.type` to `"GENERIC"`.
- Ping's `client_id` claim in access tokens identifies the calling client for both PingFederate and PingOne. The `clientIdClaim` default already matches this, so you typically don't need to override it. Confirm by decoding a real client-credentials token, as described in the [JWT token claims reference](./jwt-token-claims.md).
- `sub` is a stable, unique per-user identifier and a safe default for `initialClaimName`. Decode a test token first to confirm which user-identifying claims your Ping deployment populates, as described in [Identify token claims](./generic-oidc-provider.md#identify-token-claims).

### Audience configuration requires Ping-side setup

Unlike some providers, Ping doesn't automatically populate the `aud` claim with the requesting client's ID. Set this up in Ping before the `audience` values in your Helm configuration can validate correctly.

<Tabs groupId="ping-product" queryString>
<TabItem value="pingfederate" label="PingFederate" default>

In PingFederate, the `aud` claim comes from an Access Token Manager's **Audience Claim Value** field. This field holds a single static string and doesn't template from the requesting client, so `${client_id}` is taken literally rather than resolved. A shared Access Token Manager therefore can't produce a different `aud` per client.

To give each of the six Camunda components an audience matching its own client ID, create one Access Token Manager per component, each with **Audience Claim Value** hardcoded to that component's client ID, then point each OAuth client's default Access Token Manager at its own. Without this, tokens either carry no `aud` claim or carry the wrong one from a shared Access Token Manager, and Camunda's audience check fails in both cases.

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
Ping returned an error exchanging the authorization code for tokens. Verify the client authentication method configured in Ping, either **Client Secret Post** or **Client Secret Basic**, matches what Camunda sends. PingFederate defaults to **Client Secret Basic**, so check your client configuration if you changed it.

**`aud` claim mismatch, or missing entirely**
See [Audience configuration requires Ping-side setup](#audience-configuration-requires-ping-side-setup). This is the most common cause with PingFederate, since a shared Access Token Manager can't produce a per-client audience.

**Token signature validation fails on API calls, but interactive login succeeds**
The access token and ID token are signed with different keys. See [Determine whether you need separate signing keys](#determine-whether-you-need-separate-signing-keys).

**PingFederate: `error=server_error, error_description=There are no authentication methods available for OAuth on the authorization redirect`**
PingFederate has no IdP adapter registered as an authentication source for the OAuth authorization server. Check **System > OAuth Settings > Authorization Server > IdP Adapter Mapping**, and confirm the same adapter is also listed under **Authentication Policies > Default Authentication Sources**. Only authorization code login redirects are affected, because a client credentials grant doesn't need an authentication source. This error typically appears only on a PingFederate instance configured from scratch, since an existing deployment already has a working authentication policy.
