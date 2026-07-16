---
id: authentication
title: "Authentication"
sidebar_position: 2
description: "Authenticate your requests to the Camunda Hub REST API."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## The process

Generate a [JSON Web Token (JWT)](https://jwt.io/introduction/), and include it in every request. If you already have a client or token for Web Modeler API v1, you can reuse it for this API.

## Prerequisites

Before you begin, make sure you have the **Admin** user role.

## Create new client credentials

Create an API client with Web Modeler API permissions.

1. In Camunda Hub, under **Organization overview**, click **Admin APIs**.
2. From the **Administration API** management page, click **Create new credentials**.
3. Name the client, and grant it access to the **Web Modeler API** with the necessary permissions.
4. Click **Create**, and capture the following values required to generate a token:
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

## Generate a token

After [creating new client credentials](#create-a-new-application), generate an access token:

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

With this `access_token`, you're ready to [authenticate with the Camunda Hub API](#authenticate-with-your-token).

## Authenticate with your token

Once you have [generated a token](#generate-a-token), use it in the authorization header in every Camunda Hub API request: `Authorization: Bearer <TOKEN>`.

For example, send a request to the Camunda Hub API's `/info` endpoint:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     https://hub.cloud.camunda.io/api/v2/info
```

## Organization-level access

API tokens are granted to organization-level _clients_ rather than individual _users_. A user with an API token can read, edit, and delete all workspaces and workspace resources in the organization if the token has the required Web Modeler API scopes. This is true even if the user is not a member of the workspace and can't see the workspace in the Camunda Hub user interface.

## Token expiration

Access tokens expire according to the `expires_in` property of an authenticated response. After this duration, in seconds, you must request a new access token.
