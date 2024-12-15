---
id: index
title: "Authentication"
slug: /apis-tools/web-modeler-api/authentication
sidebar_position: 2
description: "Web Modeler API is a REST API and provides access to Web Modeler data. Requests and responses are in JSON notation."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Web Modeler API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) depending on your environment and include it in each request.

## Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

1. Create client credentials by clicking **Console > Organization > Administration API > Create new credentials**.
2. Add permissions to this client for **Web Modeler API**.
3. Once you have created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_CONSOLE_CLIENT_ID`      | -                                            |
   | Client Secret            | `CAMUNDA_CONSOLE_CLIENT_SECRET`  | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`              | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 | `CAMUNDA_CONSOLE_OAUTH_AUDIENCE` | `api.cloud.camunda.io`                       |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::caution
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
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

</TabItem>

<TabItem value='self-managed'>

1. [Add an M2M application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Web Modeler API**.
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

</TabItem>

</Tabs>

## Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Web Modeler API's `/info` endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     https://modeler.cloud.camunda.io/api/v1/info
```

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${WEB_MODELER_REST_URL}` variable below represents the URL of the Web Modeler API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8070`.
:::

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${WEB_MODELER_REST_URL}/api/v1/info
```

</TabItem>
</Tabs>

A successful response includes [information about the environment](https://modeler.camunda.io/swagger-ui/index.html#/Info/getInfo). For example:

```json
{
  "version": "v1",
  "authorizedOrganization": "12345678-ABCD-DCBA-ABCD-123456789ABC",
  "createPermission": true,
  "readPermission": true,
  "updatePermission": true,
  "deletePermission": false
}
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
