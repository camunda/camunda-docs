---
id: authentication
title: "Authentication"
sidebar_position: 2
description: "Camunda Hub REST API Authentication."
---

import PageDescription from '@site/src/components/PageDescription';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<PageDescription />

To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) depending on your environment and include it in each request.

## Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

1. In Camunda Hub, click **Organization > Administration API > Create API Client**.
2. Add permissions to this client for **Camunda Hub API** with the needed CRUD permissions.
3. Once you've created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name    | Default value                                |
   | ------------------------ | ---------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_HUB_CLIENT_ID`      | -                                            |
   | Client Secret            | `CAMUNDA_HUB_CLIENT_SECRET`  | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`          | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 | `CAMUNDA_HUB_OAUTH_AUDIENCE` | `api.cloud.camunda.io`                       |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::caution
   When you create client credentials, the client secret is only shown once. Save this client secret somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${CAMUNDA_OAUTH_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode "audience=${CAMUNDA_HUB_OAUTH_AUDIENCE}" \
       --data-urlencode "client_id=${CAMUNDA_HUB_CLIENT_ID}" \
       --data-urlencode "client_secret=${CAMUNDA_HUB_CLIENT_SECRET}"
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
5. Capture the value of the `access_token` property, and store it as your token.

</TabItem>
<TabItem value='self-managed'>

1. [Add an M2M application in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/applications.md).
2. [Add permissions to this application](/self-managed/components/management-identity/application-user-group-role-management/applications.md) for **Web Modeler API** with the needed [CRUD permissions](/self-managed/components/management-identity/access-management/access-management-overview.md#preset-permissions).
3. Capture the `Client ID` and `Client Secret` from the application in Management Identity.
4. [Generate a token](/self-managed/components/management-identity/authentication.md) to access the Web Modeler REST API. Provide the `client_id` and `client_secret` from the values you previously captured in Management Identity.
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

Include the previously-captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Web Modeler API's `/info` endpoint:

<Tabs groupId="environment" defaultValue="saas" className="tabs-hidden" queryString values={
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

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${CAMUNDA_HUB_REST_URL}/api/v2/info
```

In this example, `${CAMUNDA_HUB_REST_URL}` represents the URL of the Camunda Hub API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8088`.

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
