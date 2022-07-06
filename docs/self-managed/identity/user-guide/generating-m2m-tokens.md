---
id: generating-m2m-tokens
title: "Generating machine-to-machine tokens"
sidebar_label: "Generating machine-to-machine (M2M) tokens"
---

In this guide, we'll show you how to generate your own **machine-to-machine (M2M)** tokens.

:::tip Want to learn more about M2M tokens?
Head over to our documentation on [M2M tokens](/self-managed/concepts/authentication/m2m-tokens.md) to find out more.
:::

### Prerequisites

- A running [Identity](/self-managed/identity/what-is-identity.md) service
- An [application](/self-managed/concepts/access-control/applications.md) for your service
- The client ID of your application
- The client secret of your application
- A REST client of your choice

### Generate token

In our example, the Keycloak instance that supports Identity can be found via `http://localhost:18080`.
This may be different for you, so adjust the host name (and port if required) as appropriate.

To request a token, use the following cURL command replacing the placeholders with your applications
details:

```
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT_ID]' \
--data-urlencode 'client_secret=[CLIENT_SECRET]' \
--data-urlencode 'grant_type=client_credentials'
```
