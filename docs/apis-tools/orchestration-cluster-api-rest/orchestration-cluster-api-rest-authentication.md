---
id: orchestration-cluster-api-rest-authentication
title: "Authentication"
description: "Step through authentication options for accessing the Orchestration Cluster REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes the available authentication methods for accessing the Orchestration Cluster REST API.

It explains when to use each method and how to configure your API requests for secure and appropriate access. When API authorizations are enabled, authenticated requests are evaluated against Orchestration Cluster authorizations, including the new process‑level and task‑level user task permissions.

The Orchestration Cluster REST API supports three authentication methods depending on your environment and configuration: none, basic, and OIDC-based.

## Authentication support matrix

| Distribution                                                                      | Default Authentication | No auth support         | Basic auth support | OIDC-based auth support |
| --------------------------------------------------------------------------------- | ---------------------- | ----------------------- | ------------------ | ----------------------- |
| [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)           | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) | None                   | ✅ (default)            | ✅ (when enabled)  | ✅ (when configured)    |
| [Helm](/self-managed/deployment/helm/install/quick-install.md)                    | Basic Auth             | ✅ (when auth disabled) | ✅ (default)       | ✅ (when configured)    |
| SaaS                                                                              | OIDC-based Auth        | ❌                      | ❌                 | ✅ (required)           |

:::info Authentication vs. authorization
Authentication establishes who is calling the Orchestration Cluster REST API (for example, using Basic authentication or an OIDC access token). Authorization determines what that caller can do, based on authorizations configured in Identity.

For user task endpoints, authorization is evaluated at two levels:

- Process-level permissions on the `PROCESS_DEFINITION` resource (for example, `READ_USER_TASK`, `UPDATE_USER_TASK`, `CLAIM_USER_TASK`, `COMPLETE_USER_TASK`) can grant access to all user tasks of a process definition.
- Task-level permissions on the `USER_TASK` resource (`READ`, `UPDATE`, `CLAIM`, `COMPLETE`) provide fine-grained access and can be scoped using property-based access control on attributes such as `assignee`, `candidateUsers`, and `candidateGroups`.

If a caller has `PROCESS_DEFINITION[READ_USER_TASK]` or `PROCESS_DEFINITION[UPDATE_USER_TASK]` for a process, these process-level permissions take precedence over `USER_TASK[READ, UPDATE]` for tasks in that process.
:::

## Authenticate API calls

### No authentication (local development)

By default, Camunda 8 Run and Docker Compose expose the Orchestration Cluster REST API without authentication for local development. You can make API requests directly:

```shell
curl http://localhost:8080/v2/topology
```

### Basic Authentication

Basic Authentication uses username and password credentials.

**For Camunda 8 Run:**  
Enable Basic Auth by configuring authentication in your `application.yaml`. See [Camunda 8 Run documentation](/self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization) for details.

**For Helm:**  
Basic Auth is enabled by default for the Orchestration Cluster API.

Include your username and password in each API request:

```shell
curl --user username:password \
     http://localhost:8080/v2/topology
```

:::note
Basic Authentication checks the password with every request, limiting the number of requests per second. It may not be suitable for production.  
See [Camunda components troubleshooting](/self-managed/operational-guides/troubleshooting.md)
:::

## Using a token (OIDC/JWT)

OIDC-based Authentication is recommended for production and required for SaaS. You must obtain an Access Token and pass it as an OAuth 2.0 Bearer Token in the `Authorization` header of each request. The token’s subject (user or client) must also have the necessary Orchestration Cluster authorizations (for example, `PROCESS_DEFINITION[READ_USER_TASK]` or `USER_TASK[READ]` for user task APIs), otherwise requests will fail with `403 Forbidden` even if authentication succeeds.

<Tabs groupId="environment" defaultValue="saas" queryString values={[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

1. [Create client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console.
2. Request an access token using the credentials:

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

</TabItem>

<TabItem value="self-managed">

**Prerequisites for OIDC-based authentication**

- Your Orchestration Cluster must already be configured with your Identity Provider. See [Set up OIDC-based Authentication](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).
- You must have a registered client in your IdP with a **client ID**, **client secret**, and authorization endpoint.
- Note the configured **audience** and **scope** for token requests (variables `OC_AUDIENCE` and `SCOPE`). Depends on IdP configuration.

**Request an access token using client credentials**

Example for Keycloak; adjust the authorization URI and parameters for your IdP:

```shell
curl --location --request POST 'http://<IDP_HOST>/auth/realms/<REALM>/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode "client_id=${CLIENT_ID}" \
--data-urlencode "client_secret=${CLIENT_SECRET}" \
--data-urlencode "audience=${OC_AUDIENCE}" \
--data-urlencode "scope=${SCOPE}" \
--data-urlencode 'grant_type=client_credentials'
```

> **Microsoft Entra ID**: Use `scope=${SCOPE}/.default` instead of `scope=${SCOPE}`. The Authorization URI is typically `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`.

**Use the access token in API requests**

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/topology
```

</TabItem>

</Tabs>

### OIDC-based authentication using X.509 client certificates

For advanced security scenarios, you can obtain OIDC access tokens using X.509 client certificates. This is typically required in Self-Managed environments where your IdP enforces mutual TLS (mTLS).

**For Java applications**  
The Java client supports automatic OIDC access token retrieval using X.509 client certificates. Configure the necessary keystore and truststore via code or environment variables. See [Java client authentication](../java-client/getting-started.md#oidc-access-token-authentication-with-x509-client-certificate) for details.

**For other clients**  
Refer to your IdP documentation for obtaining tokens using X.509 certificates.

### Automatic token management in official clients

Official Camunda clients (Java client or Spring Boot Starter) handle token acquisition and renewal automatically. You do not need to manually obtain or refresh tokens.

### Troubleshooting

- Check logs for authentication errors.
- Verify your access token includes the correct audience if audience validation is enabled.

### Learn more

- [Camunda Java client authentication and token management](../java-client/getting-started.md)
- [Camunda Spring Boot Starter: Configuring the Camunda 8 connection](../camunda-spring-boot-starter/getting-started.md#configuring-the-camunda-8-connection)
- [Orchestration Cluster authorization: resources, permissions, and configuration](../../components/concepts/access-control/authorizations.md)
