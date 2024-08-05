---
id: console-sm-api-authentication
title: "Authentication"
sidebar_position: 2
description: "Console SM API is a REST API and provides access to Console SM data. Requests and responses are in JSON notation."
---

To authenticate for the API, generate a JWT token and pass it in each request:

1. [Add an M2M application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Console SM API**.
3. [Generate a token](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md) to access the REST API. You will need the `client_id` and `client_secret` from the Identity application you created.
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'client_id=<client id>' \
   --data-urlencode 'client_secret=<client_secret>' \
   --data-urlencode 'grant_type=client_credentials'
   ```
4. You will get something like the following:
   ```json
   {
     "access_token": "eyJhbG...",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```

## Example usage

1. Take the **access_token** value from the response object and store it as your token.
2. Send the token as an authorization header in each request.

   ```shell
   curl -o - 'http://localhost:8080/admin-api/clusters' -H 'Authorization: Bearer eyJhb...'
   ```
