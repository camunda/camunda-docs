---
id: camunda-api-rest-authentication
title: "Authentication"
description: "Step through authentication options that can be used to access Camunda 8 REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Camunda 8 REST API requests require authentication. To authenticate, generate a JWT token depending on your environment and pass it in each request.

## Generating a token

<Tabs groupId="authentication" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

1. Create client credentials by clicking **Console > Organization > Administration API > Create new credentials**.
2. Add permissions to this client for **Zeebe**.
3. Upon creating the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name        | Default value                                |
   | ------------------------ | -------------------------------- | -------------------------------------------- |
   | Client ID                | `ZEEBE_CLIENT_ID`                | -                                            |
   | Client Secret            | `ZEEBE_CLIENT_SECRET`            | -                                            |
   | Authorization Server URL | `ZEEBE_AUTHORIZATION_SERVER_URL` | `https://login.cloud.camunda.io/oauth/token` |
   | Audience                 | `ZEEBE_TOKEN_AUDIENCE`           | `zeebe.camunda.io`                           |
   | Zeebe REST Address       | `ZEEBE_REST_ADDRESS`             | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::tip
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST 'https://login.cloud.camunda.io/oauth/token' \
       --header "Content-Type: application/x-www-form-urlencoded" \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'audience=zeebe.camunda.io' \
       --data-urlencode 'client_id=<client id>' \
       --data-urlencode 'client_secret=<client_secret>'
   ```
5. A successful authentication response looks like the following:
   ```json
   {
     "access_token": "eyJhbG...",
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
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Camunda 8 REST API**.
3. Capture the `Client ID` and `Client Secret` from the application in Identity.
4. [Generate a token](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md) to access the REST API. Provide the `client_id` and `client_secret` from the values you captured in Identity.
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'client_id=<client id>' \
   --data-urlencode 'client_secret=<client_secret>' \
   --data-urlencode 'grant_type=client_credentials'
   ```
5. A successful authentication response looks like the following:
   ```json
   {
     "access_token": "eyJhbG...",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```
6. Capture the value of the `access_token` property and store it as your token.

</TabItem>

</Tabs>

## Using a token

Send the captured token as an authorization header in each request: `Authorization: Bearer <Token>`.

For example, to call the Camunda 8 REST API's `/topology` endpoint, use the following command depending on your environment:

<Tabs groupId="using-a-token" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

```shell
curl --header 'Authorization: Bearer <TOKEN>' \
     '<ZEEBE_REST_ADDRESS>/v2/topology'
```

</TabItem>

<TabItem value='self-managed'>

```shell
curl --header 'Authorization: Bearer <TOKEN>' \
     'http://localhost:8080/v2/topology'
```

</TabItem>

</Tabs>

A successful response would include [information about the cluster](/apis-tools/camunda-api-rest/specifications/get-cluster-topology.api.mdx). For example:

```json
{
  "brokers": [
    ...
  ],
  "clusterSize": 3,
  "partitionsCount": 3,
  "replicationFactor": 3,
  "gatewayVersion": "8.6.0"
}
```

## Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, a new access token must be requested.
