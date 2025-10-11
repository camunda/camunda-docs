---
id: operate-api-authentication
title: Authentication
description: "Authentication requirements for accessing the Operate REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All Operate REST API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.  
This page describes the available authentication methods for accessing the Operate REST API and when to use each method.

The Operate REST API supports three authentication methods based on your environment and configuration:

- **No authentication**
- **Basic authentication**
- **OIDC-based authentication**

## When to use each method

- **No authentication**: Only for local development with Camunda 8 Run or Docker Compose. Never use in production.
- **Basic authentication**: For username/password protection in development or testing environments.
- **OIDC-based authentication**: Required for SaaS and recommended for Self-Managed production clusters.

## Authentication support matrix

| Distribution                                                                           | Default Authentication | No Auth Support         | Basic Auth Support | OIDC-based Auth Support |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [Camunda 8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)           | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](/self-managed/deployment/helm/install/index.md)                                 | Basic Auth             | ✅ (when Auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                                   | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

## Authenticate API calls

### No Authentication (Local Development)

By default, Camunda 8 Run and Docker Compose expose the Operate REST API without authentication for local development. You can make API requests directly:

```shell
curl --request POST http://localhost:8080/v1/process-instances/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

### Basic Authentication

Basic Authentication uses username and password credentials.

**For Camunda 8 Run:** Enable Basic Auth in your `application.yaml`. See [Camunda 8 Run docs](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:** Basic Auth is enabled by default for the Operate REST API.

Once authentication is enabled, include your username and password in each API request. You can use an existing user or the default `demo/demo`:

```shell
curl --user username:password \
   --request POST http://localhost:8080/v1/process-instances/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

:::note
Basic Authentication checks the password with every request, which can limit API request throughput. It may not be suitable for production.  
See [Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

### OIDC-based Authentication

All production environments (SaaS or Self-Managed) require OIDC-based authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

### Generate a token

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
   | Name                     | Environment variable name  | Default value                                |
   | ------------------------ | -------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_CLIENT_ID`        | -                                            |
   | Client Secret            | `CAMUNDA_CLIENT_SECRET`    | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`        | `https://login.cloud.camunda.io/oauth/token` |
   | Operate REST Address     | `CAMUNDA_OPERATE_BASE_URL` | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::note
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${CAMUNDA_OAUTH_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'audience=operate.camunda.io' \
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

1. **Configure Orchestration Cluster for OIDC-based authentication**
   - Configure your Orchestration Cluster with your identity provider by following the steps in [Set up OIDC-based authentication](../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).
   - Note the **client ID** or configured **audiences** values for audience validation. This is usually the same as the client ID used when configuring the Orchestration Cluster and will be referred to as **CLIENT_ID_OC**.

2. **Register a client in your identity provider (IdP)**
   - Create a new application or client in your IdP.
   - Configure the required scopes (for example, `openid`).
   - Create a new client secret.
   - Note the **client ID**, **client secret**, and **authorization URI**—these are required to obtain an access token.

3. **Use the credentials (client ID and secret) to request an access token**  
   The example below shows Keycloak configuration. The authorization URI will vary based on your identity provider:

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

:::note Audience validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration), the Orchestration Cluster will validate the audience claim in the token against the configured audiences.

Make sure your token includes the correct audience from the Orchestration Cluster configuration, or add your audience to the configuration. Often this is the client ID you used when setting up the Orchestration Cluster.
:::

:::note Authorizations
If authorizations are enabled, your application can only retrieve the topology. Other requests require you to configure [authorizations](/components/concepts/access-control/authorizations.md) for the client. Use your `client ID` when setting up authorizations.
:::

For more information, see the deprecated [authentication configuration for Operate](/versioned_docs/version-8.7/self-managed/operate-deployment/operate-authentication.md).

</TabItem>

</Tabs>

### Use a token

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
The `${CAMUNDA_OPERATE_BASE_URL}` variable below represents the URL of the Operate REST API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8080`.
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

### Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
