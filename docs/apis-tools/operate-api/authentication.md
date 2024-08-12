---
id: operate-api-authentication
title: Authentication
description: "Authentication requirements for accessing the Operate REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Operate REST API requests require authentication. To authenticate, generate a JWT token and pass it in each request.

## Generating a token

<Tabs groupId="authentication" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>
<TabItem value='saas'>

1. [Create client credentials](/guides/setup-client-connection-credentials.md) in the **Clusters > Cluster name > API** tab of [Camunda Console](https://console.camunda.io/).
2. Add permissions to this client for **Operate**.
3. Upon creating the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `ZEEBE_CLIENT_ID`                | -                                            |
   | Client Secret            | `ZEEBE_CLIENT_SECRET`            | -                                            |
   | Authorization Server URL | `ZEEBE_AUTHORIZATION_SERVER_URL` | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 |                                  | `operate.camunda.io`                         |
   | Operate REST Address     | `CAMUNDA_OPERATE_BASE_URL`       | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::tip
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
5. A successful authentication response looks like the following:
   ```json
   {
     "access_token": "<TOKEN>",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```
6. Capture the value of the `access_token` property and store it as your token.

</TabItem>

<TabItem value='self-managed'>

1. [Add an M2M application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Operate API**.
3. Capture the `Client ID` and `Client Secret` from the application in Identity.
4. [Generate a token](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md) to access the REST API. Provide the `client_id` and `client_secret` from the values you captured in Identity.
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode "client_id=${CLIENT_ID}" \
   --data-urlencode "client_secret=${CLIENT_SECRET}" \
   --data-urlencode 'grant_type=client_credentials'
   ```
5. A successful authentication response looks like the following:
   ```json
   {
     "access_token": "<TOKEN>",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```
6. Capture the value of the `access_token` property and store it as your token.

See the [Operate Configuration - Authentication](/self-managed/operate-deployment/operate-authentication.md#identity) documentation for more information about this authentication method.

</TabItem>

</Tabs>

## Using a token

Send the captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to call the Operate REST API's ["Search process instances" endpoint](./specifications/search-1.api.mdx), make the following request against the target Operate environment:

<Tabs groupId="using-a-token" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

:::tip
The URL of the Operate REST API, represented below by the `${CAMUNDA_OPERATE_BASE_URL}` variable, can be captured when creating an API client. It can also be constructed as `https://${REGION}.operate.camunda.io/${CLUSTER_ID}`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The URL of the Operate REST API, represented below by the `${CAMUNDA_OPERATE_BASE_URL}` variable, is configured in your Self-Managed installation. The default value is `http://localhost:8081`.
:::

</TabItem>

</Tabs>

```shell
curl --request POST ${CAMUNDA_OPERATE_BASE_URL}/v1/process-instances/search \
   --header "Authorization: Bearer ${TOKEN}" \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

A successful response would include [matching process instances](./specifications/search-1.api.mdx). For example:

```json
{
  "items": [],
  "sortValues": [123456],
  "total": 0
}
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, a new access token must be requested.

## Authentication via cookie (Self-Managed only)

Another way to access the Operate API in a Self-Managed cluster is to send cookie headers in each request. The cookie can be obtained by using the API endpoint `/api/login`. Take the steps in the following example:

**Example:**

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`.

```shell
curl --request POST 'http://localhost:8080/api/login?username=demo&password=demo' \
   --cookie-jar cookie.txt
```

2. Send the cookie (as a header) in each API request. In this case, request all process definitions.

```shell
curl --request POST 'http://localhost:8080/v1/process-definitions/search' \
   --cookie cookie.txt \
   --header 'Content-Type: application/json' -d '{}'
```
