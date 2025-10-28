---
id: access-control-overview
title: Identity and access management in Camunda 8
sidebar_label: Identity and access management
description: Understand the difference between authentication and authorization in Camunda 8, and how they work together to secure your orchestration cluster.
keywords:
  [
    camunda 8,
    access control,
    authentication,
    authorization,
    security,
    orchestration cluster,
  ]
---

Use Identity access control to provide secure access for authorized users and systems in Camunda 8.

## Identity types in Camunda 8

There are two types of Identity in Camunda 8.

<table className="table-callout">
<tr>
    <td width="30%">**Orchestration Cluster Identity**</td>
    <td><p>Used for authenticating and authorizing users and systems that interact with the Orchestration Cluster (such as Zeebe, Operate, Tasklist, and the Orchestration Cluster REST API).</p><p>Identity governs access to process execution, task management, and related runtime resources.</p></td>
</tr>
<tr style={{ backgroundColor: 'var(--ifm-table-background)'}}>
    <td width="30%">**Management Identity**</td>
    <td><p>Used for managing the components Web Modeler, Console, and Optimize.</p><p>Management Identity is typically required for platform administrators and developers, and is separate from the Identities used for process orchestration.</p></td>
</tr>
</table>

:::tip
Understanding which Identity is required for a given action helps you apply the correct access control policies.
:::

## Identity provider (IdP) integration

In production setups, both the Orchestration Cluster Identity and the Management Identity can integrate with an external OIDC IdP (such as Entra ID) for unified user management, single sign-on (SSO), and consistent security policies.

| Identity type                  | Description                                                                                                                                          | Default IdP              | External IdP support                  |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------------------------------------ |
| Orchestration Cluster Identity | Built-in user management with support for external IdP integration via OIDC. Connects to enterprise IdPs such as Microsoft Entra ID, Okta, and more. | Built-in user management | OIDC integration with enterprise IdPs |
| Management Identity            | Uses Keycloak by default, but can be configured with an external IdP via OIDC.                                                                       | Keycloak                 | OIDC integration with external IdPs   |

## Authentication vs. authorization

Authentication and authorization are the two fundamental concepts for access control in Camunda 8.

### Authentication

Authentication verifies **who** a user or system is.  
Example: Logging in with a username/password or via SSO.

### Authorization

Authorization determines **what** an authenticated user or system is allowed to do.  
Example: Accessing Operate data, starting a process instance, or managing tasks.

| Identity type                  | Authorization model              | Description                                                                                                          | Management interface                   |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| Orchestration Cluster Identity | Fine-grained permissions         | Controls access to applications, APIs, and resources through specific permissions for each resource type and action. | Camunda Identity UI or API             |
| Management Identity            | Role-based access control (RBAC) | Uses predefined roles and permissions for users and groups.                                                          | Keycloak admin console or external IdP |

### How authentication and authorization work together

1. **Authentication** happens first: The system verifies identity.
2. **Authorization** happens next: The system verifies permissions.

A user must be both authenticated and authorized to access protected resources.

:::info
To learn more about authorization and how to configure permissions, see [Orchestration Cluster authorization](./authorizations.md).
:::

## Authentication methods overview

Camunda 8 supports multiple authentication methods depending on the environment:

| Environment                                                                       | Authentication method    | Notes                                                                          |
| --------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)           | None / Basic Auth / OIDC | No auth or basic auth only for local development. OIDC optional if configured. |
| [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) | None / Basic Auth / OIDC | No auth or basic auth only for local development. OIDC optional if configured. |
| [Helm Self-Managed](/self-managed/deployment/helm/install/index.md)               | Basic Auth / OIDC        | Basic Auth default, OIDC optional if configured.                               |
| SaaS                                                                              | OIDC                     | OIDC required for all requests.                                                |

- **No authentication:** only for local development (Run, Docker Compose).
- **Basic authentication:** simple to set up; not recommended for production.
- **OIDC-based authentication:** recommended for production Self-Managed and required for SaaS.

:::info
For API documentation, link to the centralized authentication overview instead of repeating environment defaults.
:::

:::warning
The Operate, Tasklist, and Zeebe REST APIs are **deprecated**. While they continue to function, new development should use the Orchestration Cluster REST API by referencing the [Orchestration Cluster REST API migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md).

Authentication for all these APIs works the same way; see the [Orchestration Cluster REST API authentication](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) page for details.
:::

## How to obtain tokens

For environments using OIDC:

1. Generate a **JSON Web Token (JWT)**.
2. Include it in each API request as: `Authorization: Bearer <TOKEN>`.

- [Generate a token (SaaS)](/components/console/manage-clusters/manage-api-clients.md#create-a-client)
- [Generate a token (Self-Managed)](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)

Example request using a token:

```shell
curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
     ${BASE_URL}/v1/process-instances/search
```

### Token expiration

Tokens expire according to the `expires_in` field returned by the IdP. After expiration, request a new token.

## Learn more

- [Authentication for Operate API](/apis-tools/operate-api/authentication.md)
- [Authentication for Tasklist API](/apis-tools/tasklist-api-rest/tasklist-api-rest-authentication.md)
- [Set up OIDC-based authentication](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [Orchestration Cluster authorization](./authorizations.md)
