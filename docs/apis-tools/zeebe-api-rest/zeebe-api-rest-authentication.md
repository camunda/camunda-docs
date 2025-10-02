---
id: zeebe-api-rest-authentication
title: "Authentication"
description: "Describes authentication options that can be used to access Zeebe REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Zeebe REST API. It outlines when to use each method and how to configure your API requests for secure and appropriate access.

The Zeebe REST API supports three authentication methods depending on your environment and configuration:

- **No Authentication**
- **Basic Authentication**
- **OIDC-based Authentication**

## Authentication support matrix

| Distribution                                                                           | Default Authentication | No Auth Support         | Basic Auth Support | OIDC-based Auth Support |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [Camunda 8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)           | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](../../self-managed/installation-methods/helm/install.md)                        | Basic Auth             | ✅ (when Auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                                   | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

## Authenticate API calls

### No Authentication (Local Development)

By default, Camunda 8 Run and Docker Compose expose the Zeebe REST API without authentication for local development. You can make API requests directly:

```shell
curl http://localhost:8080/v1/topology
```

### Basic Authentication

Basic Authentication uses username and password credentials. To set it up:

**For Camunda 8 Run:**
Enable Basic Auth by configuring authentication in your `application.yaml`. For detailed steps, see the [Camunda 8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:**
Basic Auth is enabled by default for the Tasklist REST API.

Once authentication is enabled, include your username and password in each API request. You can use an existing user or the default user `demo`/`demo`:

```shell
curl --user username:password \
   http://localhost:8080/v1/topology
```

:::note
Basic Authentication checks the password with every request and is a costly operation. It therefore only supports a low number of API requests per second, and may not be fit your production requirements.
Please see
[Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

### OIDC-based Authentication

To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

#### Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>
<TabItem value='saas'>

1. [Create client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the **Clusters > Cluster name > API** tab of [Camunda Console](https://console.camunda.io/).
2. Add the **Orchestration Cluster REST API** scope to this client.
3. Once you have created the client, capture the following values required to generate a token:
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   | Name                     | Environment variable name | Default value                                |
   | ------------------------ | ------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_CLIENT_ID`       | -                                            |
   | Client Secret            | `CAMUNDA_CLIENT_SECRET`   | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`       | `https://login.cloud.camunda.io/oauth/token` |
   | Zeebe REST Address       | `ZEEBE_REST_ADDRESS`      | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::note
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${CAMUNDA_OAUTH_URL} \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'audience=zeebe.camunda.io' \
    --data-urlencode "client_id=${CAMUNDA_CLIENT_ID}" \
    --data-urlencode "client_secret=${CAMUNDA_CLIENT_SECRET}"
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

1. **Configure Orchestration Cluster for OIDC-based Authentication.**
   - Make sure you have configured your Orchestration Cluster with your Identity Provider following the steps in [Set up OIDC-based Authentication](../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).
   - Note the **client ID** or configured values of **audiences** of the Orchestration Cluster for audience validation (usually the same as the client ID you used when configuring the Orchestration Cluster) as **CLIENT_ID_OC**.
2. **Register a client in your Identity Provider (IdP).**
   - Create a new application/client in your IdP.
   - Configure the necessary scopes (for example, `openid`).
   - Create a new client secret.
   - Note the **client ID**, **client secret**, and **authorization URI** as these are required to obtain an access token.
3. **Use the credentials (client ID and secret) to request an Access Token.**  
   The example below shows Keycloak configuration (the authorization URI will vary based on your Identity Provider):

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode "client_id=${CLIENT_ID}" \
--data-urlencode "client_secret=${CLIENT_SECRET}" \
--data-urlencode "audience=${CLIENT_ID_OC}" \
--data-urlencode "scope=${CLIENT_ID_OC}" \
--data-urlencode 'grant_type=client_credentials'
```

**Note for Microsoft Entra ID**: Instead of `scope=${CLIENT_ID_OC}`, use: `scope=${CLIENT_ID_OC}/.default`. The Authorization URI is typically in the format: `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`.

4. **Capture the value of the `access_token` property and store it as your token.**

:::note Audience Validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration), the Orchestration Cluster will validate the audience claim in the token against the configured audiences. Make sure your token has the correct audience from the Orchestration Cluster configuration, or add your audience in the Orchestration Cluster configuration. Often this is the client ID you used when configuring the Orchestration Cluster.
:::

:::note Authorizations
If authorizations are enabled, your application will only be able to retrieve the topology, with other requests requiring you to configure [authorizations](/components/concepts/access-control/authorizations.md) for the client. You should use your `client id` when configuring authorizations.
:::

</TabItem>

</Tabs>

#### Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Zeebe REST API's `/topology` endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

:::tip
The `${ZEEBE_REST_ADDRESS}` variable below represents the URL of the Zeebe REST API. You can capture this URL when creating an API client. You can also construct it as `https://${REGION}.zeebe.camunda.io/${CLUSTER_ID}/`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${ZEEBE_REST_ADDRESS}` variable below represents the URL of the Zeebe REST API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8080/`.
:::

</TabItem>

</Tabs>

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${ZEEBE_REST_ADDRESS}/v1/topology
```

A successful response includes [information about the cluster](/apis-tools/zeebe-api-rest/specifications/get-cluster-topology.api.mdx). For example:

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

#### Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
