---
id: tasklist-authentication
title: Authentication
description: "Let's take a closer look at the authentication methods of Tasklist."
---

Tasklist provides two ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Identity Authentication and Authorization](#identity)

By default, user storage in Elasticsearch is enabled.

## User in Elasticsearch

In this mode, the user authenticates with a username and password stored in Elasticsearch.

The **username**, **password**, and **roles** for one user may be set in application.yml:

```
camunda.tasklist:
  username: anUser
  password: aPassword
  roles:
    - OWNER
    - OPERATOR
```

On Tasklist startup, the user is created if they did not exist before.

By default, three users are created:

- Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
- Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.
- Role `OPERATOR` with **userId**/**displayName**/**password** `act`/`act`/`act`/.

More users can be added directly to Elasticsearch, to the index `tasklist-user-<version>_`. The password must be encoded with a strong BCrypt hashing function.

## Identity

[Identity](../../identity/what-is-identity/) provides authentication and authorization functionality along with user management.

### Enable Identity

Identity can only be enabled by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `identity-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=identity-auth
```

### Configure Identity

Identity requires the following parameters:

| Parameter name                                       | Description                                        | Example value                                                                     |
| ---------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| camunda.tasklist.identity.issuerUrl                  | URL of issuer (Identity)                           | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.tasklist.identity.issuerBackendUrl           | Backend URL of issuer (Identity)                   | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.tasklist.identity.clientId                   | Similar to a username for the application          | tasklist                                                                          |
| camunda.tasklist.identity.clientSecret               | Similar to a password for the application          | XALaRPl...s7dL7                                                                   |
| camunda.tasklist.identity.audience                   | Audience for Tasklist                              | tasklist-api                                                                      |
| camunda.tasklist.identity.baseUrl                    | Base URL for Identity                              | http://localhost:8084                                                             |
| camunda.tasklist.identity.resourcePermissionsEnabled | Enable/disable Resource Permissions                | true                                                                              |
| spring.security.oauth2.resourceserver.jwt.issueruri  | Token issuer URI                                   | http://localhost:18080/auth/realms/camunda-platform                               |
| spring.security.oauth2.resourceserver.jwt.jwkseturi  | Complete URI to get public keys for JWT validation | http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/certs |

### Resource based permissions

1. Resource authorizations must be [enabled in Identity](../../identity/user-guide/authorizations/managing-resource-authorizations/).
2. Tasklist must be configured to use resource authorizations (please see above configurations) and `camunda.tasklist.identity.resourcePermissionsEnabled` should be enabled.

Resource based permissions are defined per process definition. Process definition is defined by Process ID, which is present in BPMN XML.

The user or user group can be assigned following permission:

| Permission name        | Resource type(s)   | Allowed action(s) in Operate                   |
| ---------------------- | ------------------ | ---------------------------------------------- |
| START_PROCESS_INSTANCE | process-definition | User can start this process adhoc on Tasklist. |

For more information please check [Identity docs](../../concepts/access-control/resource-authorizations/).

### Use Identity JWT token to access Tasklist API

Tasklist provides a [GraphQL API](../../../apis-clients/tasklist-api/) under the endpoint `/graphql`. Clients can access this API using a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

:::note
Be aware a JWT token is intended to be used for M2M communication and is therefore issued for the relevant application, not for the user.
:::

**Example:**

1. [Add an application in Identity](../../identity/user-guide/adding-an-application/).
2. [Add permissions to an application](../../identity/user-guide/assigning-a-permission-to-an-application/) for Tasklist API.
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

2. Send the token as an authorization header in each request. In this case, request all tasks.

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"query": "{tasks(query:{}){id name}}"}' http://localhost:8080/graphql
```
