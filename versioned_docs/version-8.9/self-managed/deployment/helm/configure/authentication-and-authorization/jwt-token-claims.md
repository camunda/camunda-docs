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

| Provider        | User claim                        | Client claim                                  | Audience default                            |
| --------------- | --------------------------------- | --------------------------------------------- | ------------------------------------------- |
| Microsoft Entra | `preferred_username`              | `azp`                                         | Client ID                                   |
| Keycloak        | `sub`                             | `client_id`                                   | May require configuration                   |
| Auth0           | a custom claim added by an Action | `azp`, or `client_id` on the RFC 9068 profile | Client ID                                   |
| Okta            | `uid`                             | `cid`                                         | Client ID                                   |
| PingFederate    | `sub`                             | `client_id`                                   | Shared Access Token Manager for all clients |

Notes on the table:

- **Keycloak.** Do not use `azp` as the client claim. A Keycloak user token carries `azp` as well, so `clientIdClaim: azp` makes every user a client. Keycloak adds `client_id` to a service account token only, through the `service_account` client scope. `sub` is the stable identifier of the user. The chart default is `preferred_username`, which an administrator can change, and `email` is mutable in the same way. A change to `usernameClaim` changes the username of every user that already exists, so plan it as a migration.
- **Okta.** A custom authorization server emits `cid` for the client that requested the token, and `uid` for the user. Okta leaves `uid` out when no user is bound to the token, which is every client credentials token. `email` is not a reserved claim of an Okta access token. It reaches the access token only if you add it as a custom claim.
- **Auth0.** An Auth0 access token carries no claim that only a user has. Add an Auth0 Action that writes a custom claim for user logins, and put the stable `user_id` in it. The name of the client claim follows the JSON Web Token (JWT) profile of the API: the Auth0 profile emits `azp`, and the RFC 9068 profile emits `client_id`.
- **Microsoft Entra.** `preferred_username` is mutable. Read [Entra cannot do both at once](#entra-cannot-do-both-at-once) before you use this row.
- **PingFederate.** Every claim of a PingFederate access token comes from the attribute contract that you define on the access token manager. The table shows one such mapping, not a fixed token shape.

## Tell a user token from a client token

A Camunda client application such as c8ctl or Desktop Modeler signs a user in itself, and then calls the API with the access token of that user. A machine client calls the same API with a token of the client credentials flow. Both arrive as `Authorization: Bearer <token>`, so Camunda reads the claims of the token to tell the two apart:

1. If the client claim is present, the caller is a client.
2. If the client claim is absent and the user claim is present, the caller is a user.
3. With `preferUsernameClaim: true`, steps 1 and 2 change places.
4. If neither claim is present, Camunda refuses the token.

The two settings must therefore name a claim that only one kind of token carries.

The claim that `usernameClaim` names also becomes the identity of the person. Every group membership and every authorization is keyed to it. Prefer a claim that the provider never rewrites and never gives to another account. If the provider later gives the same value to a new account, that account inherits every authorization that is still keyed to the old value.

Set `clientIdClaim` only if the deployment must recognize machine tokens as well. If you leave it unset, every token becomes a user, which is the behavior of earlier releases.

### Minimal configuration per provider

Put the three settings under the Orchestration Cluster:

```yaml
orchestration:
  security:
    authentication:
      oidc:
        audience: "<audience>"
        usernameClaim: <user claim>
        clientIdClaim: <client claim>
        preferUsernameClaim: <true or false>
```

| Provider                           | `usernameClaim`                    | `clientIdClaim`                               | `preferUsernameClaim` | Evidence                                                                                                                    |
| ---------------------------------- | ---------------------------------- | --------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Keycloak                           | `sub`                              | `client_id`                                   | `false`               | Measured against Keycloak 26.4 by an automated test on every Camunda build                                                  |
| Microsoft Entra                    | `preferred_username`               | `azp`                                         | `true`                | Measured on a Camunda development tenant in November 2026, and the configuration that the Camunda Entra guide already ships |
| Auth0                              | the custom claim of your Action    | `azp`, or `client_id` on the RFC 9068 profile | `true`                | Measured on a Camunda development tenant in November 2026, plus the provider documentation                                  |
| Okta (custom authorization server) | `uid`                              | `cid`                                         | `true`                | Provider documentation only. Not measured against a tenant                                                                  |
| PingFederate                       | the user attribute of the contract | `client_id`                                   | `true`                | Provider documentation only. Not measured against a tenant                                                                  |

Do not treat a row that says "not measured" as verified. Decode the first token that your own deployment issues, and confirm the claims before you rely on them.

### Entra cannot do both at once

Microsoft Entra is the one provider where the two goals pull apart.

The stable identifiers of a person in Entra, `sub` and `oid`, also appear in an app-only token, where they name the service principal. Neither can separate the two kinds of token. The user-only claims that identify the person are `preferred_username`, `upn`, `name` and `email`, and Microsoft states that every one of them is mutable and must not drive authorization decisions. Which of them a token carries depends on the account and on the optional claims the application requests.

A real token pair carries two further user-only claims, and neither can serve as `usernameClaim`. `scp` holds the scopes that were requested and consented to, so it describes what the token may do and not who holds it, and any number of people share one value. `sid` is the session identifier, so it changes at every sign-in.

The kind of account changes the shape as well. In tokens measured against a Camunda development tenant in November 2026, a member carried `upn` while a guest invited from another tenant carried `email` and `idp` and no `upn`. That is not a rule for every tenant: the optional claim `include_externally_authenticated_upn` puts a `upn` in a guest token, and the claim configuration of the application changes the rest. Decode one token of each kind that your own tenant issues before you choose the claim.

An Entra deployment therefore picks one of two:

- **Recognize machine tokens.** Use the row above. The identity of a person is then `preferred_username`, and a rename in Entra gives that person a new identity in Camunda, with no groups and no authorizations until an operator creates them again.
- **Keep a stable identity.** Leave `clientIdClaim` unset and set `usernameClaim: oid`. Every token then becomes a user, and the API cannot tell a machine token from a user token.

A deployment that needs both at once is not served by these settings today.

These settings, and the evidence behind each row, come from [ADR-0048 in the Camunda Security Library](https://github.com/camunda/camunda-security-library/blob/main/docs/adr/0048-recognising-user-tokens-on-the-api-chains.md).

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
