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

Use identity access control to provide secure access for authorized users and systems in Camunda 8.

## Identity types in Camunda 8

There are two types of identity in Camunda 8.

These identities serve different purposes: one controls access to process execution and runtime APIs, while the other controls access to management and modeling components.

<table className="table-callout">
<tr>
    <td width="30%">Orchestration Cluster Identity</td>
    <td><p>Used for authenticating and authorizing users and systems that interact with the Orchestration Cluster (such as Zeebe, Operate, Tasklist, and the Orchestration Cluster REST API).</p><p>Identity governs access to process execution, task management, and related runtime resources.</p></td>
</tr>
<tr style={{ backgroundColor: 'var(--ifm-table-background)'}}>
    <td width="30%">Management Identity</td>
    <td><p>Used for managing the components Web Modeler, Console, and Optimize.</p><p>Management Identity is typically required for platform administrators and developers, and is separate from the identities used for process orchestration.</p></td>
</tr>
</table>

:::tip
Understanding which identity is required for a given action helps you apply the correct access control policies.
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

Authentication verifies who a user or client is.
For example, you log in with a username and password or through SSO.

### Authorization

Authorization determines what an authenticated user or client is allowed to access in Camunda 8, and which actions they can perform on those resources.

For example, a user’s authorizations allow them to access Operate, view running or completed process instances, start new process instances, or claim and complete user tasks in Tasklist and through the Orchestration Cluster REST API.

| Identity type                  | Authorization model              | Description                                                                                                                                                                      | Management interface                   |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| Orchestration Cluster Identity | Fine-grained permissions         | Controls access to applications, APIs, and runtime resources through specific permissions for each resource type and action (for example, `PROCESS_DEFINITION` and `USER_TASK`). | Camunda Identity UI or API             |
| Management Identity            | Role-based access control (RBAC) | Uses predefined roles and permissions for users and groups to manage Console, Web Modeler, and Optimize.                                                                         | Keycloak admin console or external IdP |

### How authentication and authorization work together

1. Authentication happens first: The system verifies identity.
2. Authorization happens next: The system verifies permissions.

A user must be both authenticated and authorized to access protected resources.

## Authentication methods

Camunda 8 supports multiple authentication methods depending on the environment:

| Environment                                                                       | Authentication method    | Notes                                                                          |
| --------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)           | None / Basic Auth / OIDC | No auth or basic auth only for local development. OIDC optional if configured. |
| [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) | None / Basic Auth / OIDC | No auth or basic auth only for local development. OIDC optional if configured. |
| [Helm Self-Managed](/self-managed/deployment/helm/install/index.md)               | Basic Auth / OIDC        | Basic Auth default, OIDC optional if configured.                               |
| SaaS                                                                              | OIDC                     | OIDC required for all requests.                                                |

- No authentication: only for local development (Run, Docker Compose).
- Basic authentication: simple to set up; not recommended for production.
- OIDC-based authentication: recommended for production Self-Managed and required for SaaS.

For API documentation, link to the centralized authentication overview instead of repeating environment defaults.

:::warning
The Operate, Tasklist, and Zeebe REST APIs are deprecated and should not be used for new development. While they continue to function, new development should use the Orchestration Cluster REST API by referencing the [Orchestration Cluster REST API migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md).

Authentication for all these APIs works the same way. See [Orchestration Cluster REST API authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) for details.
:::

### Users and clients

Actions in an orchestration cluster can be executed by two kinds of authenticated entities (also known as principals): users and clients. [Users](/components/identity/user.md) typically interact with the cluster through a browser, while [clients](/components/identity/client.md) interact programmatically through the APIs.

Although both principal types can use web UIs and APIs, the distinction still matters. Users represent individuals who are granted access to an orchestration cluster, whereas clients represent systems or applications.

:::note
If you're using basic authentication to secure your cluster, both users and clients are treated as users. There is no dedicated client concept in this configuration.
:::

Distinguishing between users and clients aligns your access management with how identities are modeled in your identity provider. They are usually authenticated differently (for example, username and password for users versus a client certificate for applications), have different authorization requirements (such as administrator access versus deployment permissions). Separating them simplifies auditing and operational clarity.

## How to obtain tokens

For environments using OIDC:

1. Generate a JSON Web Token (JWT).
2. Include the token in each API request as: `Authorization: Bearer <TOKEN>`.

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

### Orchestration Cluster authentication and authorization

- [Set up OIDC-based authentication](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [Orchestration Cluster authorization](./authorizations.md)

### Legacy API authentication (deprecated)

- [Authentication for Operate API](/apis-tools/operate-api/authentication.md)
- [Authentication for Tasklist API](/apis-tools/tasklist-api-rest/tasklist-api-rest-authentication.md)

### Task access control

- [User task access restrictions](../../../tasklist/user-task-access-restrictions/)
