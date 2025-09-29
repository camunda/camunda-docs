---
id: orchestration-cluster-api-rest-authentication
title: "Authentication"
description: "Step through authentication options for accessing the Orchestration Cluster REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Orchestration Cluster REST API. It explains when to use each method and how to configure your API requests for secure and appropriate access.

The Orchestration Cluster REST API supports three authentication methods depending on your environment and configuration:

- **No authentication**
- **Basic authentication**
- **OIDC-based authentication**

## When to use each method

- **No authentication**: Use only for local development with Camunda 8 Run or Docker Compose when security is not required. Never use in production environments.
- **Basic authentication**: Use for simple username/password protection, typically in development or testing environments where authentication is enabled.
- **OIDC-based authentication**: Use for production environments, SaaS, or any environment requiring secure, standards-based authentication. This method is required for SaaS and recommended for all Self-Managed clusters in production.

## Authentication support matrix

| Distribution                                                                           | Default Authentication | No auth support         | Basic auth support | OIDC-based auth support |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [Camunda 8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)           | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](../../self-managed/installation-methods/helm/install.md)                        | Basic Auth             | ✅ (when auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                                   | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

## Authenticate API calls

### No authentication (local development)

By default, Camunda 8 Run and Docker Compose expose the Orchestration Cluster REST API without authentication for local development. You can make API requests directly:

```shell
curl http://localhost:8080/v2/topology
```

### Basic Authentication

Basic Authentication uses username and password credentials. To set it up:

**For Camunda 8 Run:**
Enable Basic Auth by configuring authentication in your `application.yaml`. For detailed steps, see the [Camunda 8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:**
Basic Auth is enabled by default for the Orchestration Cluster API.

Once authentication is enabled, include your username and password in each API request. You can use an existing user or the default user `demo`/`demo`:

```shell
curl --user username:password \
     http://localhost:8080/v2/topology
```

:::note
Basic Authentication checks the password with every request and is a costly operation. It therefore only supports a low number of API requests per second, and may not be fit your production requirements.
Please see
[Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

### OIDC-based Authentication using client credentials

OIDC-based Authentication is the recommended method for production and required for SaaS. You must obtain an Access Token and pass it as an OAuth 2.0 Bearer Token in the `Authorization` header of each request.

<Tabs groupId="environment" defaultValue="saas" queryString values={[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

1. [Create client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console.
2. Use the credentials to request an access token:

```shell
curl --request POST ${CAMUNDA_OAUTH_URL} \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode "audience=${CAMUNDA_TOKEN_AUDIENCE}" \
    --data-urlencode "client_id=${CAMUNDA_CLIENT_ID}" \
    --data-urlencode "client_secret=${CAMUNDA_CLIENT_SECRET}"
```

3. Use the access token from the response in your API requests:

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/topology
```

Replace the `${BASE_URL}` based on the address of your cluster. See the [context paths](orchestration-cluster-api-rest-overview.md#context-paths) for SaaS URL formats.

</TabItem>

<TabItem value="self-managed">

1. **Configure the Orchestration Cluster for OIDC-based authentication**
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

4. **Use the access token from the response in your API requests.**

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/topology
```

Replace `${BASE_URL}` with the address of your cluster. See the [context paths](orchestration-cluster-api-rest-overview.md#context-paths) for Self-Managed URL formats.

:::note Audience validation
If you have [configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`)](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration), the Orchestration Cluster will validate the audience claim in the token against the configured audiences.

Make sure your token includes the correct audience from the Orchestration Cluster configuration, or add your audience to the configuration. Often this is the client ID you used when setting up the Orchestration Cluster.
:::

:::note Authorizations
If authorizations are enabled, your application can only retrieve the topology. Other requests require you to configure [authorizations](/components/concepts/access-control/authorizations.md) for the client. Use your `client ID` when setting up authorizations.
:::

</TabItem>

</Tabs>

## OIDC-based authentication using X.509 client certificates

For advanced security scenarios, you can obtain OIDC access tokens using X.509 client certificates. This method is typically required in Self-Managed environments where your identity provider (such as Keycloak) is configured to use the [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523) standard.

**For Java applications**  
The Java client supports automatic OIDC access token retrieval using X.509 client certificates. Configure the necessary keystore and truststore settings via code or environment variables. See [Java client authentication](../java-client/getting-started.md#oidc-access-token-authentication-with-x509-client-certificate) for complete configuration details.

**For other clients**  
Refer to your identity provider's documentation for obtaining tokens using X.509 certificates.

## Automatic token management in official clients

When using official Camunda clients (Java client or Spring Boot Starter), token acquisition and renewal are handled automatically. You do not need to manually obtain or refresh tokens—the clients handle this based on your configuration.

## Troubleshooting

- Check logs for authentication errors.
- Verify your access token includes the correct audience if audience validation is enabled.

## Learn more

- [Camunda Java client authentication and token management](../java-client/getting-started.md)
- [Camunda Spring Boot Starter: Configuring the Camunda 8 connection](../camunda-spring-boot-starter/getting-started.md#configuring-the-camunda-8-connection)
