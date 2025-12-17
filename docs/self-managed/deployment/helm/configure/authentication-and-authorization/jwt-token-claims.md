---
id: jwt-token-claims
sidebar_label: JWT token claims reference
title: JWT token claims reference
description: Reference for identifying and decoding JWT token claims when configuring OIDC authentication for Camunda 8 Self-Managed.
---

Use this reference to understand the structure of JWT access tokens and identify the claims your OIDC provider uses. This information is required when configuring Camunda 8 to authenticate with an external identity provider.

## Obtain a test token

Request an access token using your OIDC client credentials:

```bash
curl -X POST 'https://your-provider.example.com/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=<your-client-id>' \
  -d 'client_secret=<your-client-secret>' \
  -d 'grant_type=client_credentials'
```

The response includes an `access_token` field containing the JWT.

## Decode the token

Decode the JWT to inspect its claims.

### Command line (Linux/macOS)

```bash
echo "<access-token>" | cut -d'.' -f2 | base64 -d | jq
```

### Online tools

You can also use online tools such as [jwt.io](https://jwt.io) by pasting the token value.

:::caution Security warning
Only decode tokens from **test or development environments** using online tools.  
Never paste production tokens or tokens containing sensitive information into third-party sites, as they may be logged or leaked.
:::

## Required claims

When configuring OIDC authentication, Camunda requires you to identify the following claims in the token.

### User identification claim

Used to uniquely identify users during interactive login.

- **Helm configuration:** `usernameClaim`
- **Common claim names:** `email`, `preferred_username`, `sub`, `upn`, `unique_name`

### Client identification claim

Used for machine-to-machine authentication to identify the calling client.

- **Helm configuration:** `clientIdClaim`
- **Common claim names:** `client_id`, `azp`, `appid`, `clientId`

### Audience claim

Specifies the intended audience of the token.

- **Helm configuration:** `audience`
- **Claim name:** `aud`
- **Typical value:** Client ID or a custom value configured in the provider

## Common claim patterns by provider

| Provider        | User claim                      | Client claim         | Audience default          |
| --------------- | ------------------------------- | -------------------- | ------------------------- |
| Microsoft Entra | `preferred_username`            | `azp`                | Client ID                 |
| Keycloak        | `email` or `preferred_username` | `azp` or `client_id` | May require configuration |
| Auth0           | `email`                         | `client_id`          | Client ID                 |
| Okta            | `email`                         | `client_id`          | Client ID                 |

## Verify audience configuration

1. Decode a test token.
2. Inspect the value of the `aud` claim.
3. Use that value for the `audience` setting in your Camunda Helm configuration.

:::warning
The audience claim is required for token validation.  
Camunda rejects tokens that do not include the expected audience value.
:::

### If the token does not include the expected audience

- Review your OIDC provider’s documentation for configuring token audiences.
- Some providers require explicit audience configuration on the client.
- Keycloak may default to `aud: "account"` and require additional setup. See [External Keycloak](./external-keycloak.md) for details.
