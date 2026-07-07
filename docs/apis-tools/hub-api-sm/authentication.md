---
id: authentication
title: "Authentication"
sidebar_position: 2
description: "Authenticate your requests to the Camunda Hub REST API."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## The process

Generate a [JSON Web Token (JWT)](https://jwt.io/introduction/), and include it in every request.

## Generate a token

1. [Add an M2M application in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/applications.md).
2. [Grant this application access](/self-managed/components/management-identity/access-management/manage-permissions.md#assign-a-permission-to-an-application) to the **Camunda Hub API** with the necessary permissions.
3. Capture the `Client ID` and `Client Secret` from the application in Management Identity.
4. [Generate a token](/self-managed/components/management-identity/authentication.md#generate-a-token), providing the previously-captured values as the `client_id` and `client_secret`. The token must be issued for the `web-modeler-public-api` audience:
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode "client_id=${CLIENT_ID}" \
   --data-urlencode "client_secret=${CLIENT_SECRET}" \
   --data-urlencode 'audience=web-modeler-public-api' \
   --data-urlencode 'grant_type=client_credentials'
   ```
   A successful authentication response looks like this:
   ```json
   {
     "access_token": "<TOKEN>",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```
5. Use the `access_token` in the next step.

## Authenticate with your token

Include the previously-captured token as an authorization header in every request: `Authorization: Bearer <TOKEN>`.

The token must carry both the correct audience and the resource roles granted to the application:

- A `401 Unauthorized` response means the token is missing the `web-modeler-public-api` audience.
- A `403 Forbidden` response means the application is missing the required resource role for the operation (for example, the `create`, `update`, or `delete` permission on the **Camunda Hub API**).

For example, send a request to the Camunda Hub API's `/files/search` endpoint:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${CAMUNDA_HUB_REST_URL}/api/v2/files/search
```

In this example, `${CAMUNDA_HUB_REST_URL}` represents the URL of the Camunda Hub API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8088`.

## Token expiration

Access tokens expire according to the `expires_in` property of an authenticated response. After this duration, in seconds, you must request a new access token.
