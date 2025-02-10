---
id: administration-sm-api-authentication
title: "Authentication"
sidebar_position: 2
description: "The Administration API for Self-Managed is a REST API and provides access to Console Self-Managed data. Requests and responses are in JSON notation."
---

All Administration Self-Managed API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

## Generate a token

1. [Add an M2M application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Administration Self-Managed API**.
3. Capture the `Client ID` and `Client Secret` from the application in Identity.
4. [Generate a token](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md) to access the REST API. Provide the `client_id` and `client_secret` from the values you previously captured in Identity.
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode "client_id=${CLIENT_ID}" \
   --data-urlencode "client_secret=${CLIENT_SECRET}" \
   --data-urlencode 'grant_type=client_credentials'
   ```
   A successful authentication response looks like the following:
   ```json
   {
     "access_token": "<TOKEN>",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```
5. Capture the value of the `access_token` property and store it as your token.

## Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the ["Get current clusters"](./specifications/get-clusters.api.mdx) endpoint:

:::tip
The `${CAMUNDA_BASE_URL}` variable below represents the URL of the Self-Managed environment. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8080`.
:::

```shell
curl --request GET ${CAMUNDA_BASE_URL}/admin-api/clusters \
   --header "Authorization: Bearer ${TOKEN}"
```

A successful response includes [cluster information](./specifications/get-clusters.api.mdx). For example:

```json
[
  {
    "uuid": "12345",
    "name": "cluster-1",
    "status": "healthy",
    ...
  }
]
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
