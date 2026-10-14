---
id: connect-external-identity-provider
title: Connect an external identity provider
sidebar_label: Connect an external identity provider
description: "Register a custom OpenID Connect (OIDC) identity provider for a Camunda 8 SaaS cluster so your users can sign in with your organization's own IdP."
---

Register one custom OpenID Connect (OIDC) identity provider for a cluster so your users can sign in with your organization's own identity provider (IdP), alongside Camunda's built-in provider.

This setting requires a cluster on Camunda 8.10.1 or any later version. Only organization admins can change it.

:::note
This configures sign-in to the Orchestration Cluster (Operate, Tasklist, Admin, and the APIs) only. Camunda Hub, Console, and Web Modeler continue to use Camunda's built-in provider. To connect an IdP for your whole organization instead, see [connect to an identity provider](/components/concepts/access-control/connect-to-identity-provider.md).
:::

## Prerequisites

- Organization admin access to the cluster in Console.
- A cluster on Camunda 8.10.1 or any later version.
- An OIDC-compliant identity provider (for example, Microsoft Entra ID, Okta, Ping Identity, or Keycloak) with administrative access to register a new application, and a public (internet-reachable) issuer URL.

## Step 1: Get the cluster's redirect URI

1. In Console, in the left navigation under **Clusters**, select the cluster.
2. On the **Settings** tab, under **External identity provider**, click **Configure** (or **Edit** if a provider is already configured).
3. Copy the **Redirect URI** shown at the top of the dialog. Copy the entire value, including the query string: it identifies this specific cluster to your IdP.

Keep this dialog open, or copy the redirect URI somewhere safe. You need it in the next step.

## Step 2: Register an application in your IdP

1. Register a new application/client for this cluster in your IdP.
2. Set the application's redirect URI (sometimes called a callback URL) to the value you copied in [step 1](#step-1-get-the-clusters-redirect-uri).
3. Enable OIDC support and configure the scopes you plan to use (Camunda defaults to `openid profile`).
4. Ensure the client is allowed to access user information.
5. Note the **client ID**, **client secret**, and **issuer URL**. You need these in the next step.

## Step 3: Configure the identity provider in Console

Back in the configuration dialog, fill in the following fields:

| Field                    | Description                                                                                                                                                                                                                                | Required                   |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| **Name (identifier)**    | A unique internal identifier for this provider. Lowercase letters and digits, starting with a letter (for example, `acmesso`). `oidc` is reserved for Camunda's built-in provider. You can't change this after you save the configuration. | Yes                        |
| **Display name**         | The name shown to users on the cluster's sign-in screen, alongside Camunda's built-in provider (labeled **Camunda**).                                                                                                                      | Yes                        |
| **Issuer URL**           | Your IdP's OIDC issuer URL. Camunda validates this against your provider's discovery document when you save. The issuer must be reachable from the public internet.                                                                        | Yes                        |
| **Client ID**            | The client ID from [step 2](#step-2-register-an-application-in-your-idp).                                                                                                                                                                  | Yes                        |
| **Client secret**        | The client secret from [step 2](#step-2-register-an-application-in-your-idp). Stored securely and never displayed again. When you edit an existing configuration, leave this blank to keep the current secret.                             | Yes on first configuration |
| **Scopes**               | Space-separated OIDC scopes to request. Defaults to `openid profile`.                                                                                                                                                                      | No                         |
| **Username claim**       | The access token claim Camunda uses as the username. Defaults to `sub`.                                                                                                                                                                    | No                         |
| **Client ID claim**      | The access token claim Camunda uses to identify machine-to-machine (M2M) clients. See [considerations for Microsoft Entra ID](#considerations-for-microsoft-entra-id) before you set this.                                                 | No                         |
| **Audiences**            | Space-separated audience (`aud`) values Camunda accepts in tokens from this provider.                                                                                                                                                      | No                         |
| **Additional JWKS URLs** | Space-separated HTTPS URLs, for providers that publish more than one JSON Web Key Set (JWKS) endpoint (for example, Ping Identity).                                                                                                        | No                         |

Confirm the checkbox acknowledging the lockout risk, then click **Save**.

:::warning
A misconfigured identity provider can prevent its users from signing in. Camunda's built-in provider remains available as a fallback on the sign-in screen, so test your configuration with a non-critical account before relying on it for all users.
:::

## Enable, edit, or remove the configuration

- **Enable** the toggle to let users sign in through the configured provider. Enabling or disabling this setting restarts your cluster; your cluster is briefly unavailable while it restarts.
- **Disable** the toggle to stop accepting sign-ins from your provider. Camunda retains the configuration and client secret, so you can re-enable it later without entering the details again.
- **Edit** the configuration to change any field. Leave **Client secret** blank to keep the current secret. Saving an edit doesn't immediately restart the cluster: the new secret syncs to the cluster in the background, which can take up to a minute.
- **Delete configuration** permanently removes the provider configuration and its client secret, and restarts your cluster. To use the provider again, enter the full configuration and a new client secret.

## Map claims to roles, groups, and authorizations

The external identity provider configuration has no groups claim. Instead, use [mapping rules](/components/admin/mapping-rules.md) in the Orchestration Cluster Admin UI to map claims from your provider's access tokens to [roles](/components/admin/role.md), [groups](/components/admin/group.md), [tenants](/components/admin/tenant.md), or [authorizations](/components/concepts/access-control/authorizations.md). Mapping rules become available in Admin as soon as you configure an external identity provider for the cluster.

## Considerations for Microsoft Entra ID

Console doesn't let you change the order Camunda uses to resolve a token to a user or to a client. By default, Camunda checks the **Client ID claim** first: if the claim is present in a token, Camunda treats the request as coming from a client; otherwise, it falls back to the **Username claim**.

Microsoft Entra ID includes an `azp` (authorized party) claim in both user and application tokens. If you set **Client ID claim** to `azp`, user sign-ins can be misidentified as client authentications. Leave **Client ID claim** blank unless you specifically need machine-to-machine (M2M) authentication through this provider, and if you do set it, use a claim that only appears in your application tokens.

## Known limitations

- **Same username across providers resolves to the same principal.** If a user has an account with the same username in your IdP and in Camunda's built-in provider, Operate, Tasklist, and Admin treat them as the same principal for authorization purposes. User-tied setups (one role or authorization per specific username) work as expected. Group- or mapping-rule-based assignments that assume the two providers' users are distinct may not behave as expected.
- **Built-in mapping rules remain editable.** Mapping rules that Camunda manages for internal purposes, such as the **Support Access** mapping rule, remain visible and editable by cluster admins once you configure an external identity provider. Changes to these rules either self-restore on the next pod restart, or require Camunda Support to use the built-in provider to sign in and revert them. Avoid editing these rules.
- **Issuer URL must be a public, plain HTTPS address.** Camunda requires an issuer URL that's reachable from the public internet, uses `https`, and contains no credentials, query string, or fragment. An internal, VPN-only, or non-routable address, or a URL that doesn't meet this format, is rejected before Camunda attempts to contact your provider.

## Troubleshooting

### "The issuer did not answer at its discovery endpoint. Make sure that the URL is correct, and that the provider is reachable from the internet."

Camunda couldn't reach the discovery endpoint derived from your issuer URL. Confirm the issuer URL is correct and that your provider's discovery endpoint is reachable from the internet.

### "The issuer URL does not match the provider's configuration..."

The issuer that your provider's discovery document returns doesn't exactly match the issuer URL you entered. A common cause is copying a URL from the wrong tenant or environment. Copy the issuer URL directly from your provider, including its exact path.

### "The provider's configuration is missing authorization_endpoint, token_endpoint, jwks_uri."

Your provider's discovery document doesn't include one or more endpoints OIDC discovery requires. Confirm your IdP fully supports OIDC discovery, and that the issuer URL points at the correct tenant or realm.

### The issuer URL is rejected before Camunda even checks for a provider

Camunda also rejects an issuer URL that doesn't use `https`, contains credentials, or contains a query string or a fragment. Remove these from the URL and try again.

## Further resources

- [Connect Admin to an identity provider](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md): the Self-Managed equivalent configuration, including concepts like redirect URI resolution and principal identification that also apply here.
- [Mapping rules](/components/admin/mapping-rules.md)
- [Authorizations](/components/concepts/access-control/authorizations.md)
- [Connect to an identity provider](/components/concepts/access-control/connect-to-identity-provider.md): organization-level SSO for Camunda Hub, Console, and Web Modeler.
