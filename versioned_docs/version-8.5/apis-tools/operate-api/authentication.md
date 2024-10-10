---
id: operate-api-authentication
title: Authentication
description: "Authentication requirements for accessing the Operate REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Operate REST API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

## Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>
<TabItem value='saas'>

1. [Create client credentials](/guides/setup-client-connection-credentials.md) in the **Clusters > Cluster name > API** tab of [Camunda Console](https://console.camunda.io/).
2. Add permissions to this client for **Operate**.
3. Once you have created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `ZEEBE_CLIENT_ID`                | -                                            |
   | Client Secret            | `ZEEBE_CLIENT_SECRET`            | -                                            |
   | Authorization Server URL | `ZEEBE_AUTHORIZATION_SERVER_URL` | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 |                                  | `operate.camunda.io`                         |
   | Operate REST Address     | `CAMUNDA_OPERATE_BASE_URL`       | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::caution
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${ZEEBE_AUTHORIZATION_SERVER_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'audience=operate.camunda.io' \
       --data-urlencode "client_id=${ZEEBE_CLIENT_ID}" \
       --data-urlencode "client_secret=${ZEEBE_CLIENT_SECRET}"
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
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Operate API**.
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

See the [Operate Configuration - Authentication](/self-managed/operate-deployment/operate-authentication.md#identity) documentation for more information about this authentication method.

</TabItem>

</Tabs>

## Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Operate REST API's ["Search process instances"](./specifications/search-1.api.mdx) endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

:::tip
The `${CAMUNDA_OPERATE_BASE_URL}` variable below represents the URL of the Operate REST API. You can capture this URL when creating an API client. You can also construct it as `https://${REGION}.operate.camunda.io/${CLUSTER_ID}`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${CAMUNDA_OPERATE_BASE_URL}` variable below represents the URL of the Operate REST API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8081`.
:::

</TabItem>

</Tabs>

```shell
curl --request POST ${CAMUNDA_OPERATE_BASE_URL}/v1/process-instances/search \
   --header "Authorization: Bearer ${TOKEN}" \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

A successful response includes [matching process instances](./specifications/search-1.api.mdx). For example:

```json
{
  "items": [],
  "sortValues": [123456],
  "total": 0
}
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.

## Authentication via cookie (Self-Managed only)

You can also access the Operate API in a Self-Managed cluster by sending cookie headers in each request. You can obtain a cookie using the /api/login API endpoint. For example:

**Example:**

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`.

```shell
curl --request POST 'http://localhost:8080/api/login?username=demo&password=demo' \
   --cookie-jar cookie.txt
```

2. Send the cookie as a header in each API request. In this case, request all process definitions.

```shell
curl --request POST 'http://localhost:8080/v1/process-definitions/search' \
   --cookie cookie.txt \
   --header 'Content-Type: application/json' -d '{}'
```
