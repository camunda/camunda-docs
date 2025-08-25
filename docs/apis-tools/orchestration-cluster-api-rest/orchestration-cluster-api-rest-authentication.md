---
id: orchestration-cluster-api-rest-authentication
title: "Authentication"
description: "Step through authentication options that can be used to access the Orchestration Cluster REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Orchestration Cluster REST API. It outlines when to use each method and how to configure your API requests for secure and appropriate access.

# Authentication methods for the Orchestration Cluster REST API

The Orchestration Cluster REST API supports three authentication methods depending on your environment and configuration:

- **No Authentication**
- **Basic Authentication**
- **OIDC Access Token Authentication**

## When to use each method

- **No Authentication**: Use for local development only, with C8 Run or Docker Compose, when security is not required. Not recommended for production.
- **Basic Authentication**: Use for simple username/password protection, typically in C8 Run with authentication enabled.
- **OIDC Access Token Authentication**: Use for production, SaaS, or any environment where secure, standards-based authentication is required. Required for SaaS and recommended for Self-Managed clusters in production.

## Authentication support matrix

| Distribution                                                                           | Default Authentication | Supports No Auth        | Supports Basic Auth | Supports OIDC Access Token |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------- | -------------------------- |
| [C8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)                  | None                   | ✅ (default)            | ✅ (when enabled)   | ✅ (when configured)       |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)   | ✅ (when configured)       |
| [Helm](../../self-managed/installation-methods/helm/install.md)                        | Basic Auth             | ✅ (when Auth disabled) | ✅ (default)        | ✅ (when configured)       |
| SaaS                                                                                   | OIDC Access Token      | ❌                      | ❌                  | ✅ (required)              |

# Authenticate API calls

## No Authentication (Local Development)

By default, Camunda 8 Run and Docker Compose expose the Orchestration Cluster REST API without authentication for local development. You can make API requests directly:

```shell
curl http://localhost:8080/v2/topology
```

## Basic Authentication

Enable Basic Auth in C8 Run by configuring authentication in your `application.yaml`. For detailed steps, see the [C8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

On Helm, Basic Auth is enabled by default for the Orchestration Cluster REST API.

Once authentication is enabled, you can use Basic Authentication with your username and password. Make sure a user is created for this purpose, or use the default user: `demo`/`demo`. Include your username and password in each API request:

```shell
curl --user username:password \
     http://localhost:8080/v2/topology
```

:::note
Basic Authentication only supports a very small number of API requests per second, and may not be suitable for production use.
Please see
[Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

## OIDC Access Token Authentication using Client Credentials

OIDC Access Token Authentication is the recommended method for production and required for SaaS. You must obtain an Access Token and pass it as an OAuth 2.0 Bearer Token it in the `Authorization` header of each request.

<Tabs groupId="environment" defaultValue="saas" queryString values={[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

1. [Create client credentials](/components/console/manage-clusters/setup-client-connection-credentials.md) in the Camunda Console.
2. Use the credentials to request an Access Token:

```shell
curl --request POST ${CAMUNDA_OAUTH_URL} \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode "audience=${CAMUNDA_TOKEN_AUDIENCE}" \
    --data-urlencode "client_id=${CAMUNDA_CLIENT_ID}" \
    --data-urlencode "client_secret=${CAMUNDA_CLIENT_SECRET}"
```

3. Use the `access_token` from the response in your API requests:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${BASE_URL}/topology
```

Replace the `${BASE_URL}` based on the address of your cluster. See the [Context paths](orchestration-cluster-api-rest-overview.md#context-paths) for SaaS URL formats.

</TabItem>

<TabItem value="self-managed">

1. [Register an application in Identity](/self-managed/components/management-identity/application-user-group-role-management/applications.md) and assign permissions.
2. Use the credentials to request a token:

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode "client_id=${CLIENT_ID}" \
--data-urlencode "client_secret=${CLIENT_SECRET}" \
--data-urlencode 'grant_type=client_credentials'
```

3. Use the `access_token` from the response in your API requests:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${BASE_URL}/topology
```

Replace the `${BASE_URL}` based on the address of your cluster. See the [Context paths](orchestration-cluster-api-rest-overview.md#context-paths) for Self-Managed URL formats.

</TabItem>

</Tabs>

## OIDC Access Token Authentication using X.509 Client Certificates

For advanced security scenarios, you can use OIDC Access Tokens from your IdP obtained using X.509 Client Certificates. This is typically required in Self-Managed environments where mutual TLS (mTLS) is enforced by your identity provider (such as Keycloak).

- The Java client supports OIDC Access Token retrieval using X.509 Client Certificates out of the box. You can configure the necessary keystore and truststore settings either via code or environment variables. See [Java client authentication](../java-client/authentication.md#oidc-with-x509) for a full example and configuration details.
- For other clients or custom integrations, refer to your identity provider's documentation for how to obtain tokens using X.509 certificates.

## Token management in clients

When using official clients such as the Java client or Spring SDK, token acquisition and renewal are handled automatically. You do not need to manually obtain or refresh tokens as these clients will request and refresh tokens as needed based on your configuration.

- For details on Java client authentication and token management, see [Java client authentication](./../java-client/authentication.md).
- For Spring SDK configuration, see [Spring SDK: Configuring the Camunda 8 connection](./../spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection).
