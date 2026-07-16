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

## Create a new application

Create an application with Web Modeler API permissions.

1. [Add an M2M application in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/applications.md#add-an-application).
2. [Grant this application access](/self-managed/components/management-identity/access-management/manage-permissions.md#assign-a-permission-to-an-application) to the **Web Modeler API** with the necessary permissions. This authorization also adds the required `web-modeler-public-api` audience to tokens issued for this application, so no `audience` parameter is needed in the token request.
3. Capture the `Client ID` and `Client Secret` from the application in Management Identity.

## Generate a token

After [creating a new application](#create-a-new-application), use its client ID and secret to [generate an access token](/self-managed/components/management-identity/authentication.md#generate-a-token):

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "client_id=${CLIENT_ID}" \
  --data-urlencode "client_secret=${CLIENT_SECRET}" \
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

With this `access_token`, you're ready to [authenticate with the Camunda Hub API](#authenticate-with-your-token).

## Authenticate with your token

Once you have [generated a token](#generate-a-token), use it in the authorization header in every Camunda Hub API request: `Authorization: Bearer <TOKEN>`.

For example, send a request to the Camunda Hub API's `/info` endpoint:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${CAMUNDA_HUB_REST_URL}/api/v2/info
```

In this example, `${CAMUNDA_HUB_REST_URL}` represents the URL of the Camunda Hub API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8088`.

The Camunda Hub API validates both the token's audience and the application's permissions:

- A `401 Unauthorized` response means the token is missing the `web-modeler-public-api` audience. This audience is added when the application is authorized for the **Camunda Hub API** (see step 2), so confirm that authorization is in place.
- A `403 Forbidden` response means the application is missing the permissions required for the operation on the **Camunda Hub API** (for example, `create`, `update`, or `delete`).

## Organization-level access

API tokens are granted to organization-level _applications_ rather than individual _users_. With an API token, you can read, edit, and delete all workspaces and workspace resources in the organization, as long as the application has the required permissions for the Camunda Hub API. This is true even if you aren't a member of the workspace and you can't see it in the Camunda Hub user interface.

## Token expiration

Access tokens expire according to the `expires_in` property of an authenticated response. After this duration, in seconds, you must request a new access token.
