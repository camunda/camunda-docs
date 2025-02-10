---
id: tasklist-authentication
title: Authentication
description: "Let's take a closer look at the authentication methods of Tasklist."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Tasklist provides two ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Identity Authentication and Authorization](#identity)

By default, user storage in Elasticsearch is enabled.

<Tabs groupId="authentication" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch' },{label: 'Identity', value: 'identity' }]} >

<TabItem value="elasticsearch">

:::note
User restrictions are not supported when using Elasticsearch for user storage. If you want to use user restrictions, [Identity](/self-managed/identity/what-is-identity.md) is required.
:::

In this mode, the user authenticates with a username and password stored in Elasticsearch.

The **userId**, **password**, and **roles** for one user may be set in application.yml:

```
camunda.tasklist:
  userId: aUser
  password: aPassword
  displayName: aDisplayName
  roles:
    - OWNER
    - OPERATOR
```

On Tasklist startup, the user is created if they did not exist before.

By default, three users are created:

- Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`. To change userId, password, displayName or role for user `demo` use the above configuration.

- Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`. To change userId, displayName or password for this user the below configuration can be used:

```
camunda.tasklist:
  readerUserId: aUser
  readerPassword: aPassword
  readerDisplayName: aDisplayName
```

- Role `OPERATOR` with **userId**/**displayName**/**password** `act`/`act`/`act`/. To change userId, displayName or password for this user the below configuration can be used:

```
camunda.tasklist:
  operatorUserId: aUser
  operatorPassword: aPassword
  operatorDisplayName: aDisplayName
```

More users can be added directly to Elasticsearch, to the index `tasklist-user-<version>_`. The password must be encoded with a strong BCrypt hashing function.

</TabItem>

<TabItem value="identity">

[Identity](/self-managed/identity/what-is-identity.md) provides authentication and authorization functionality along with user management.

## Enable Identity

Identity can only be enabled by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `identity-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=identity-auth
```

## Configure Identity

:::danger
These configuration variables are deprecated. To connect using the updated values, see [Connecting to an OpenID Connect provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md).
:::

Identity requires the following parameters:

| Parameter name                                       | Description                                                                                                                                   | Example value                                                                     |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| camunda.tasklist.identity.issuerUrl                  | URL of issuer (Identity)                                                                                                                      | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.tasklist.identity.issuerBackendUrl           | Backend URL of issuer (Identity)                                                                                                              | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.tasklist.identity.clientId                   | Similar to a username for the application                                                                                                     | tasklist                                                                          |
| camunda.tasklist.identity.clientSecret               | Similar to a password for the application                                                                                                     | XALaRPl...s7dL7                                                                   |
| camunda.tasklist.identity.audience                   | Audience for Tasklist                                                                                                                         | tasklist-api                                                                      |
| camunda.tasklist.identity.baseUrl                    | Base URL for Identity                                                                                                                         | http://localhost:8084                                                             |
| camunda.tasklist.identity.redirectRootUrl            | Root URL to redirect users to after successful authentication. If the property is not provided, it will be derived from the incoming request. | http://localhost:8082                                                             |
| camunda.tasklist.identity.resourcePermissionsEnabled | Enable/disable Resource Permissions                                                                                                           | true                                                                              |
| camunda.tasklist.identity.userRestrictionsEnabled    | Enable/disable User Restrictions                                                                                                              | true                                                                              |
| spring.security.oauth2.resourceserver.jwt.issueruri  | Token issuer URI                                                                                                                              | http://localhost:18080/auth/realms/camunda-platform                               |
| spring.security.oauth2.resourceserver.jwt.jwkseturi  | Complete URI to get public keys for JWT validation                                                                                            | http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/certs |

## Resource-based permissions

1. Resource authorizations must be [enabled in Identity](/self-managed/concepts/access-control/resource-authorizations.md).
2. Tasklist must be configured to use resource authorizations (see above configurations) and `camunda.tasklist.identity.resourcePermissionsEnabled` must be enabled.

Resource-based permissions are defined per process definition. Process definition is defined by **Process ID**, which is present in BPMN XML.

The user or user group can be assigned the following permission:

| Permission name        | Resource type(s)   | Allowed action(s) in Operate                    |
| ---------------------- | ------------------ | ----------------------------------------------- |
| START_PROCESS_INSTANCE | process-definition | User can start this process ad hoc on Tasklist. |

For more information, visit the [Identity documentation](/self-managed/concepts/access-control/resource-authorizations.md).

## Use Identity JWT token to access Tasklist API

Tasklist provides a [GraphQL API](/apis-tools/tasklist-api/tasklist-api-overview.md) under the endpoint `/graphql`. Clients can access this API using a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

:::note
Be aware a JWT token is intended to be used for M2M communication and is therefore issued for the relevant application, not for the user.
:::

**Example:**

1. [Add an application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to an application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for Tasklist API.
3. Obtain a token to access the GraphQL API.
   You will need:
   - `client_id` and `client_secret` from Identity application you created.
   - URL of the authorization server will look like: `http://<keycloak_host>:<port>/auth/realms/camunda-platform/protocol/openid-connect/token`, where host and port reference Keycloak URL (e.g. `localhost:18080`).

```shell
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=<client id>' \
--data-urlencode 'client_secret=<secret>' \
--data-urlencode 'grant_type=client_credentials'
```

You will get something like the following:

```json
{
  "access_token": "eyJhbG...",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0
}
```

Take the `access_token` value from the response object and store it as your token.

4. Send the token as an authorization header in each request. In this case, request all tasks.

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"query": "{tasks(query:{}){id name}}"}' http://localhost:8080/graphql
```

### User task access restrictions

To use this resource, the **User Task Access Restrictions** feature must be [enabled on Identity](/self-managed/concepts/access-control/user-task-access-restrictions.md). When it is active, Tasklist applies additional security measures to filter tasks based on user identity and authorization. The tasks displayed are restricted based on the candidate groups, candidate users, and assignee associated with the logged-in user. The benefits of this resource are:

- Enhanced security: Users only see tasks for which they have the necessary permissions, improving security and preventing unauthorized access.
- Tasklist customization: The Tasklist interface is tailored to display only relevant tasks for each user, providing a personalized and streamlined experience.

### Candidate groups

- Tasks will be filtered to include only those associated with candidate groups to which the logged-in user belongs.
- If a task is configured with candidate groups, only users belonging to those groups will see the task in their task list.

### Candidate users

- Tasks will be filtered based on candidate users specified for each task.
- If a task is configured with candidate users, only those users will see the task in their task list.

### Assignees

- Tasks assigned to a specific user will only be visible to that assigned user and to the users that belong to the candidate groups/users associated with the task.
- If the active user is assigned to a task, the task is displayed in their task list regardless of their candidate group or user status

### All users

- Tasks without candidate groups or candidate users will be visible to all users.

:::note
User groups are managed by Identity, and this resource is only available when Identity authentication is enabled.
:::

## Zeebe client credentials

If the Zeebe Gateway is set up with Camunda Identity-based authorization, [Zeebe client OAuth environment variables](../zeebe-deployment/security/client-authorization.md#environment-variables) must be provided.

</TabItem>
</Tabs>
