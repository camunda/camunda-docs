---
id: orchestration-cluster-api-rest-authentication
title: "Authentication"
description: "Step through authentication options that can be used to access Orchestration Cluster API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Orchestration Cluster API. It outlines when to use each method and how to configure your API requests for secure and appropriate access.

# Authentication methods for the Orchestration Cluster API

The Orchestration Cluster API supports three authentication methods depending on your environment and configuration:

- **No Authentication**
- **Basic Authentication**
- **OIDC Access Token Authentication**

## When to use each method

- **No Authentication**: Use only for local development with C8 Run or Docker Compose when security is not required. Never use in production environments.
- **Basic Authentication**: Use for simple username/password protection, typically in development or testing environments with C8 Run when authentication is enabled.
- **OIDC Access Token Authentication**: Use for production environments, SaaS, or any environment requiring secure, standards-based authentication. This method is required for SaaS and recommended for all Self-Managed clusters in production.

## Authentication support matrix

| Distribution                                                                           | Default Authentication | Supports No Auth        | Supports Basic Auth | Supports OIDC Access Token |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------- | -------------------------- |
| [C8 Run](../../self-managed/quickstart/developer-quickstart/c8run.md)                  | None                   | ✅ (default)            | ✅ (when enabled)   | ✅ (when configured)       |
| [Docker Compose](../../self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)   | ✅ (when configured)       |
| [Helm](../../self-managed/installation-methods/helm/install.md)                        | Basic Auth             | ✅ (when Auth disabled) | ✅ (default)        | ✅ (when configured)       |
| SaaS                                                                                   | OIDC Access Token      | ❌                      | ❌                  | ✅ (required)              |

# Authenticate API calls

## No Authentication (Local Development)

By default, Camunda 8 Run and Docker Compose expose the Orchestration Cluster API without authentication for local development. You can make API requests directly:

```shell
curl http://localhost:8080/v2/topology
```

## Basic Authentication

Basic Authentication uses username and password credentials. To set it up:

**For C8 Run:**
Enable Basic Auth by configuring authentication in your `application.yaml`. For detailed steps, see the [C8 Run documentation on enabling authentication](../../self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization).

**For Helm:**
Basic Auth is enabled by default for the Orchestration Cluster API.

Once authentication is enabled, include your username and password in each API request. You can use an existing user or the default user `demo`/`demo`:

```shell
curl --user username:password \
     http://localhost:8080/v2/topology
```

## OIDC Access Token Authentication using Client Credentials

OIDC Access Token Authentication is the recommended method for production and required for SaaS. You must obtain an Access Token and pass it as an OAuth 2.0 Bearer Token in the `Authorization` header of each request.

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

3. Use the Access Token from the response in your API requests:

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/topology
```

Replace the `${BASE_URL}` based on the address of your cluster. See the [Context paths](orchestration-cluster-api-rest-overview.md#context-paths) for SaaS URL formats.

</TabItem>

<TabItem value="self-managed">

1. Register a client in your Identity Provider (IdP). An IdP is a service that manages digital identities and authentication, such as Keycloak, Azure Entra (formerly Azure AD), Okta, or similar systems.
2. Use the credentials (client ID and secret) to request an Access Token. The example below shows Keycloak configuration (endpoint URL will vary based on your IdP):

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode "client_id=${CLIENT_ID}" \
--data-urlencode "client_secret=${CLIENT_SECRET}" \
--data-urlencode 'grant_type=client_credentials'
```

3. Use the Access Token from the response in your API requests:

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/topology
```

Replace the `${BASE_URL}` based on the address of your cluster. See the [Context paths](orchestration-cluster-api-rest-overview.md#context-paths) for Self-Managed URL formats.

</TabItem>

</Tabs>

## OIDC Access Token Authentication using X.509 Client Certificates

For advanced security scenarios, you can obtain OIDC Access Tokens using X.509 Client Certificates. This method is typically required in Self-Managed environments where your identity provider (such as Keycloak) enforces mutual TLS (mTLS).

**For Java applications:**
The Java client supports OIDC Access Token retrieval using X.509 Client Certificates automatically. Configure the necessary keystore and truststore settings via code or environment variables. See [Java client authentication](../java-client/authentication.md#oidc-with-x509) for complete configuration details.

**For other clients:**
Refer to your identity provider's documentation for obtaining tokens using X.509 certificates.

## Automatic token management in official clients

When using official Camunda clients (Java client or Spring Boot Starter), token acquisition and renewal are handled automatically. You don't need to manually obtain or refresh tokens—the clients handle this based on your configuration.

**Learn more:**
- [Camunda Java client authentication and token management](./../java-client/authentication.md)
- [Camunda Spring Boot Starter: Configuring the Camunda 8 connection](./../spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection)
