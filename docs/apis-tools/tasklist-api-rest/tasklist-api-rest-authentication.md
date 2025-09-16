---
id: tasklist-api-rest-authentication
title: "Authentication"
sidebar_position: 2
description: "Describes authentication options that can be used to access Tasklist REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Tasklist REST API. It outlines when to use each method and how to configure your API requests for secure and appropriate access.

The Tasklist REST API supports three authentication methods depending on your environment and configuration:

- **No Authentication**
- **Basic Authentication**
- **OIDC-based Authentication**

## When to use each method

- **No Authentication**: Use only for local development with C8 Run or Docker Compose when security is not required. Never use in production environments.
- **Basic Authentication**: Use for simple username/password protection, typically in development or testing environments when authentication is enabled.
- **OIDC-based Authentication**: Use for production environments, SaaS, or any environment requiring secure, standards-based authentication. This method is required for SaaS and recommended for all Self-Managed clusters in production.

## Authentication support matrix

| Distribution                                                                           | Default Authentication | No Auth Support         | Basic Auth Support | OIDC-based Auth Support |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [C8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)                  | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](../../self-managed/installation-methods/helm/install.md)                        | Basic Auth             | ✅ (when Auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                                   | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

# Authenticate API calls

## No Authentication (Local Development)

By default, Camunda 8 Run and Docker Compose expose the Tasklist REST API without authentication for local development. You can make API requests directly:

```shell
curl --request POST http://localhost:8080/v1/tasks/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

## Basic Authentication

Basic Authentication uses username and password credentials. To set it up:

**For Camunda 8 Run:**
Enable Basic Auth by configuring authentication in your `application.yaml`. For detailed steps, see the [Camunda 8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:**
Basic Auth is enabled by default for the Tasklist REST API.

Once authentication is enabled, include your username and password in each API request. You can use an existing user or the default user `demo`/`demo`:

```shell
curl --user username:password \
   --request POST http://localhost:8080/v1/tasks/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

:::note
Basic Authentication only supports a very small number of API requests per second, and may not be suitable for production use.
Please see
[Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

## OIDC-based Authentication

To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

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
   | Name                     | Environment variable name   | Default value                                |
   | ------------------------ | --------------------------- | -------------------------------------------- |
   | Client ID                | `CAMUNDA_CLIENT_ID`         | -                                            |
   | Client Secret            | `CAMUNDA_CLIENT_SECRET`     | -                                            |
   | Authorization Server URL | `CAMUNDA_OAUTH_URL`         | `https://login.cloud.camunda.io/oauth/token` |
   | Tasklist REST Address    | `CAMUNDA_TASKLIST_BASE_URL` | -                                            |
   <!-- this comment convinces the markdown processor to still treat the table as a table, but without adding surrounding paragraphs. 🤷 -->
   :::note
   When client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
   :::
4. Execute an authentication request to the token issuer:
   ```bash
   curl --request POST ${CAMUNDA_OAUTH_URL} \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'audience=tasklist.camunda.io' \
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
   Make sure you have configured your Orchestration Cluster with your Identity Provider following the steps in [Set up OIDC-based Authentication](../../self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).

2. **Register a client in your Identity Provider.**  
   Create a client (application) in your Identity Provider for the Tasklist API.

3. **Use the credentials (client ID and secret) to request an Access Token.**  
   The example below shows Keycloak configuration (the endpoint URL will vary based on your Identity Provider):

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

4. **Capture the value of the `access_token` property and store it as your token.**

</TabItem>

</Tabs>

### Use a token

Include the previously captured token as an authorization header in each request: `Authorization: Bearer <TOKEN>`.

For example, to send a request to the Tasklist API's ["Search tasks"](./specifications/search-tasks.api.mdx) endpoint:

<Tabs groupId="environment" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

:::tip
The `${CAMUNDA_TASKLIST_BASE_URL}` variable below represents the URL of the Tasklist API. You can capture this URL when creating an API client. You can also construct it as `https://${REGION}.tasklist.camunda.io/${CLUSTER_ID}`.
:::

</TabItem>

<TabItem value='self-managed'>

:::tip
The `${CAMUNDA_TASKLIST_BASE_URL}` variable below represents the URL of the Tasklist API. You can configure this value in your Self-Managed installation. The default value is `http://localhost:8080`.
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
    "name": "Do something",
    ...
  }
]
```

### Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
