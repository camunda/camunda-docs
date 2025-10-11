---
id: tasklist-api-rest-authentication
title: "Authentication"
sidebar_position: 2
description: "Authentication options for accessing the Tasklist REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes authentication methods for accessing the Tasklist REST API and explains how to configure your API requests for secure access.

The Tasklist REST API supports three authentication methods depending on your environment:

- **No authentication**
- **Basic authentication**
- **OIDC-based authentication**

## Authentication support matrix

| Distribution                                                                           | Default Authentication | No auth support         | Basic auth support | OIDC-based auth support |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [Camunda 8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)           | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](/self-managed/deployment/helm/install/index.md)                                 | Basic Auth             | ✅ (when auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                                   | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

## Authenticate API calls

### No authentication (local development)

By default, Camunda 8 Run and Docker Compose expose the Tasklist REST API without authentication. You can make API requests directly:

```shell
curl --request POST http://localhost:8080/v1/tasks/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

### Basic authentication

Basic authentication uses username and password credentials. To set it up:

**For Camunda 8 Run:**  
Enable Basic Auth in your `application.yaml`. For details, see [Camunda 8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:**  
Basic Auth is enabled by default for the Tasklist REST API.

Include your username and password in each API request. You can use an existing user or the default user `demo/demo`:

```shell
curl --user username:password \
   --request POST http://localhost:8080/v1/tasks/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

:::note
Basic authentication checks the password with every request, which is resource-intensive. It may not meet production requirements for high request volumes. See [Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md).
:::

### OIDC-based authentication

To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

#### Generate a token

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas'},
{label: 'Self-Managed', value: 'self-managed'},
]}>
<TabItem value='saas'>

1. [Create client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the **Clusters > Cluster name > API** tab of [Camunda Console](https://console.camunda.io/).
2. Add the **Orchestration Cluster REST API** scope to the client.
3. Capture the following values required to generate a token:

| Name                     | Environment variable name   | Default value                                |
| ------------------------ | --------------------------- | -------------------------------------------- |
| Client ID                | `CAMUNDA_CLIENT_ID`         | -                                            |
| Client Secret            | `CAMUNDA_CLIENT_SECRET`     | -                                            |
| Authorization Server URL | `CAMUNDA_OAUTH_URL`         | `https://login.cloud.camunda.io/oauth/token` |
| Tasklist REST Address    | `CAMUNDA_TASKLIST_BASE_URL` | -                                            |

:::note
The `Client Secret` is only shown once. Save it securely.
:::

4. Execute an authentication request:

```bash
curl --request POST ${CAMUNDA_OAUTH_URL} \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode 'audience=tasklist.camunda.io' \
     --data-urlencode "client_id=${CAMUNDA_CLIENT_ID}" \
     --data-urlencode "client_secret=${CAMUNDA_CLIENT_SECRET}"
```

A successful response looks like:

```json
{
  "access_token": "<TOKEN>",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0
}
```

5. Capture the `access_token` value as your token.

</TabItem>

<TabItem value='self-managed'>

1. **Configure the Orchestration Cluster for OIDC-based authentication**
   - Follow [Set up OIDC-based Authentication](../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).
   - Note the **client ID** or configured **audiences** of the Orchestration Cluster for audience validation (`CLIENT_ID_OC`).

2. **Register or configure a client in your identity provider (IdP)**
   - Create a new application/client in your IdP (or use an existing one).
   - Configure required scopes (for example, `openid`).
   - Create a new client secret.
   - Capture the **client ID**, **client secret**, and **authorization URI**.

   :::note
   If you're using **Camunda Identity**, follow these steps instead:
   1. [Add an M2M application in Identity](/self-managed/components/management-identity/application-user-group-role-management/applications.md).
   2. [Add permissions to this application](/self-managed/components/management-identity/application-user-group-role-management/applications.md) for **Tasklist API** (or any other API you want to access).
   3. Capture the `Client ID` and `Client Secret` from the application in Identity.
      :::

3. **Request an access token using the client credentials**

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode "client_id=${CLIENT_ID}" \
--data-urlencode "client_secret=${CLIENT_SECRET}" \
--data-urlencode "audience=${CLIENT_ID_OC}" \
--data-urlencode "scope=${CLIENT_ID_OC}" \
--data-urlencode 'grant_type=client_credentials'
```

A successful authentication response looks like the following:

```
{
  "access_token": "<TOKEN>",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0
}
```

**Note for Microsoft Entra ID:**
Use `scope=${CLIENT_ID_OC}/.default` instead of `scope=${CLIENT_ID_OC}`. The Authorization URI is typically in the format:  
`https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`.

4. **Capture the access token**
   - Store the value of the `access_token` property to use as your token in API requests.

:::note Audience validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration), the Orchestration Cluster will validate the audience claim in the token against the configured audiences. Make sure your token has the correct audience from the Orchestration Cluster configuration, or add your audience in the Orchestration Cluster configuration. Often this is the client ID you used when configuring the Orchestration Cluster.
:::

:::note Authorizations
If authorizations are enabled, your application will only be able to retrieve the topology, with other requests requiring you to configure [authorizations](/components/concepts/access-control/authorizations.md) for the client. Use your `client id` when configuring authorizations.
:::

</TabItem>
  
</Tabs>

#### Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Tasklist API's ["Search tasks"](./specifications/search-tasks.api.mdx) endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas'},
{label: 'Self-Managed', value: 'self-managed'},
]}>

<TabItem value='saas'>

:::tip
The `${CAMUNDA_TASKLIST_BASE_URL}` variable represents the URL of the Tasklist API. You can capture this URL when creating an API client. You can also construct it as `https://${REGION}.tasklist.camunda.io/${CLUSTER_ID}`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${CAMUNDA_TASKLIST_BASE_URL}` variable represents the URL of the Tasklist API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8080`.
:::

</TabItem>

</Tabs>

```shell
curl --request POST ${CAMUNDA_TASKLIST_BASE_URL}/v1/tasks/search \
   --header "Authorization: Bearer ${TOKEN}" \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

A successful response includes [matching tasks](./specifications/search-tasks.api.mdx). For example:

```json
[
  {
    "id": "12345",
    "name": "Do something"
  }
]
```

#### Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
