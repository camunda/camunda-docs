---
id: optimize-api-authentication
title: "Authentication"
description: "Connect business process-related event data and variable data held in external systems from third-party systems to Optimize, and more."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Optimize API requests except [the health readiness](./health-readiness.md) endpoint require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

## Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>
<TabItem value='saas'>

1. [Create client credentials]($docs$/guides/setup-client-connection-credentials/) in the **Clusters > Cluster name > API** tab of [Camunda Console](https://console.camunda.io/).
2. Add permissions to this client for **Optimize**.
3. Once you have created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `ZEEBE_CLIENT_ID`                | -                                            |
   | Client Secret            | `ZEEBE_CLIENT_SECRET`            | -                                            |
   | Authorization Server URL | `ZEEBE_AUTHORIZATION_SERVER_URL` | `https://login.cloud.camunda.io/oauth/token` |
   | Optimize REST Address    | `CAMUNDA_OPTIMIZE_BASE_URL`      | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::caution
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${ZEEBE_AUTHORIZATION_SERVER_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'audience=optimize.camunda.io' \
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

1. [Configure the `api.audience` setting](/self-managed/optimize-deployment/configuration/system-configuration.md#public-api) in your Optimize installation to match the audience property of the **Optimize API** [API in Identity]($docs$/self-managed/identity/user-guide/additional-features/adding-an-api/).
2. [Add an M2M application in Identity]($docs$/self-managed/identity/user-guide/additional-features/incorporate-applications/).
3. [Add permissions to this application]($docs$/self-managed/identity/user-guide/additional-features/incorporate-applications/) for **Optimize API**.
4. Capture the `Client ID` and `Client Secret` from the application in Identity.
5. [Generate a token]($docs$/self-managed/identity/user-guide/authorizations/generating-m2m-tokens/) to access the REST API. Provide the `client_id` and `client_secret` from the values you previously captured in Identity.
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
6. Capture the value of the `access_token` property and store it as your token.

:::note
The Optimize API can also be configured in a Self-Managed environment to authenticate using a single shared access token. See [Public API Configuration](/self-managed/optimize-deployment/configuration/system-configuration.md#public-api) for the configuration required to access the public API using a specific token.
:::

</TabItem>

</Tabs>

## Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Optimize API's ["Get dashboard IDs"](./dashboard/get-dashboard-ids.md) endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

:::tip
The `${CAMUNDA_TASKLIST_BASE_URL}` variable below represents the URL of the Optimize API. You can capture this URL when creating an API client. You can also construct it as `https://${REGION}.optimize.camunda.io/${CLUSTER_ID}`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${CAMUNDA_OPTIMIZE_BASE_URL}` variable below represents the URL of the Optimize API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8083`.
:::

</TabItem>

</Tabs>

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     -G --data-urlencode "collectionId=${COLLECTION_ID}" \
     ${CAMUNDA_OPTIMIZE_BASE_URL}/api/public/dashboard
```

A successful response includes [dashboard IDs](./dashboard/get-dashboard-ids.md). For example:

```json
[
  {
    "id": "11111111-1111-1111-1111-111111111111"
  },
  {
    "id": "22222222-2222-2222-2222-222222222222"
  }
]
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
