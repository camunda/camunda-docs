---
id: authentication
title: "Authentication"
sidebar_position: 2
description: "Authenticate your requests to the Camunda Hub REST API."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## The process

Generate a [JSON Web Token (JWT)](https://jwt.io/introduction/), and include it in every request. If you already have a Web Modeler API v1 token, you can use the same token for this API.

## Generate a token

1. In Camunda Hub, click **Organization > Administration API > Create API Client**.
2. Grant this client access to the **Camunda Hub API** with the necessary permissions.
3. Once you've created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_CONSOLE_CLIENT_ID`      | -                                            |
   | Client Secret            | `CAMUNDA_CONSOLE_CLIENT_SECRET`  | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`              | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 | `CAMUNDA_CONSOLE_OAUTH_AUDIENCE` | `api.cloud.camunda.io`                       |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::caution
   When you create client credentials, the client secret is only shown once. Save the client secret somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${CAMUNDA_OAUTH_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode "audience=${CAMUNDA_CONSOLE_OAUTH_AUDIENCE}" \
       --data-urlencode "client_id=${CAMUNDA_CONSOLE_CLIENT_ID}" \
       --data-urlencode "client_secret=${CAMUNDA_CONSOLE_CLIENT_SECRET}"
   ```
   A successful response looks like this:
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

For example, send a request to the Camunda Hub API's `/files/search` endpoint:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     https://hub.cloud.camunda.io/api/v2/files/search
```

## Token expiration

Access tokens expire according to the `expires_in` property of an authenticated response. After this duration, in seconds, you must request a new access token.
