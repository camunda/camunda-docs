---
id: jwt-token-claims
sidebar_label: JWT token claims reference
title: JWT token claims reference
description: "Reference for identifying and decoding JWT token claims when configuring OIDC authentication for Camunda 8 Self-Managed."
---

This reference explains how to obtain and decode JWT tokens to identify the claims your OIDC provider uses. You'll need this information when configuring Camunda to authenticate with an external identity provider.

## Obtain a test token

Use your OIDC client credentials to request an access token:

```bash
curl -X POST 'https://your-provider.example.com/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=<your-client-id>' \
  -d 'client_secret=<your-client-secret>' \
  -d 'grant_type=client_credentials'
```

This returns a JSON response containing an `access_token`.

## Decode the token

Decode the JWT to inspect its claims.

### Command line (Linux/macOS)

```bash
echo "<access-token>" | cut -d'.' -f2 | base64 -d | jq
```

### Online tools

You can use online tools like [jwt.io](https://jwt.io) to decode tokens by pasting the token value.

:::caution Security warning
Only use online JWT decoders with tokens from **test or development environments**. Never paste production tokens or tokens containing sensitive information into online tools, as they could be logged or leaked.
:::

## Required claims

When configuring Camunda, you need to identify three types of claims in your tokens:

### User identification claim

Identifies users uniquely during web login.

- **Helm configuration:** `usernameClaim`
- **Common claim names:** `email`, `preferred_username`, `sub`, `upn`, `unique_name`

### Client identification claim

Identifies the calling client application for machine-to-machine authentication.

- **Helm configuration:** `clientIdClaim`
- **Common claim names:** `client_id`, `azp`, `appid`, `clientId`

### Audience claim

Specifies the intended audience for the token.

- **Helm configuration:** `audience`
- **Claim name:** `aud`
- **Value:** Often contains the client ID or a custom value configured in your provider.

## Common claim patterns by provider

| Provider        | User claim                      | Client claim         | Audience default       |
| --------------- | ------------------------------- | -------------------- | ---------------------- |
| Microsoft Entra | `preferred_username`            | `azp`                | Client ID              |
| Keycloak        | `email` or `preferred_username` | `azp` or `client_id` | May need configuration |
| Auth0           | `email`                         | `client_id`          | Client ID              |
| Okta            | `email`                         | `client_id`          | Client ID              |

## Verify audience configuration

1. Decode a test token as shown above.
2. Check the `aud` claim value.
3. Use that value for the `audience` parameter in your Camunda Helm configuration.

:::warning
The audience claim is critical for token validation. Camunda will reject tokens that don't include the expected audience value.
:::

### If tokens don't include an appropriate audience

- Check your OIDC provider's documentation on configuring token audiences.
- Some providers require explicit audience configuration in client settings.
- Keycloak specifically may default to `aud: "account"` and require additional configuration. See [External Keycloak](./external-keycloak.md) for details.
