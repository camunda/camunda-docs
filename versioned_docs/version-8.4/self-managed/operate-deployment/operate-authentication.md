---
id: operate-authentication
title: Authentication and authorization
description: "Let's take a closer look at how Operate authenticates for use."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Operate provides three ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Lightweight Directory Access Protocol (LDAP)](#ldap)
3. [Identity Authentication and Authorization](#identity)

By default, user storage in Elasticsearch is enabled.

<Tabs groupId="authentication" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch' },{label: 'LDAP', value: 'ldap' },{label: 'Identity', value: 'identity' }]} >

<TabItem value="elasticsearch">

In this mode, the user authenticates with a username and password stored in Elasticsearch.

The **Userid**, **displayName**, **password**, and **roles** for one user may be set in `application.yml`:

```
camunda.operate:
  userId: anUserId
  displayName: nameShownInWebpage
  password: aPassword
  roles:
    - OWNER
    - USER
```

Currently, `OPERATOR`, `OWNER`, and `USER` roles are available.

## Roles for users

| Name     | Description           |
| -------- | --------------------- |
| OWNER    | Full access           |
| OPERATOR | Read and write access |
| USER     | Read only access      |

On startup of Operate, the user is created if they did not exist before.

By default, three users are created:

- Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
- Role `OPERATOR` with **userId**/**displayName**/**password** `act`/`act`/`act`.
- Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.

Add more users directly to Elasticsearch via the index `operate-user-<version>_`. The password must be encoded with a
strong `bcrypt` hashing function.

</TabItem>

<TabItem value="ldap">

## Enable LDAP

LDAP can only be enabled by setting
the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `ldap-auth`.

See the following example for setting the Spring profile as an environmental variable:

```
export SPRING_PROFILES_ACTIVE=ldap-auth
```

## Configuration of LDAP

A user can authenticate via LDAP.

The following parameters for connection to an LDAP server should be given:

| Parameter name                           | Description                                                                                                                           | Example                      | Required           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| camunda.operate.ldap.url                 | URL to an LDAP Server                                                                                                                 | ldaps://camunda.com/         | Yes                |
| camunda.operate.ldap.baseDn              | Base domain name                                                                                                                      | dc=camunda,dc=com            | Yes                |
| camunda.operate.ldap.managerDn           | Manager domain used by Operate to log into LDAP server to retrieve user information.                                                  | cn=admin,dc=camunda,dc=com   | Yes                |
| camunda.operate.ldap.managerPassword     | Password for manager                                                                                                                  |                              | Yes                |
| camunda.operate.ldap.userSearchFilter    | Filter to retrieve user info. The pattern '{0}' is replaced by the given username in the login form.                                  | {0}                          | No, default is {0} |
| camunda.operate.ldap.userSearchBase      | The starting point for search.                                                                                                        | ou=Support,dc=camunda,dc=com | No                 |
| camunda.operate.ldap.userIdAttrName      | LDAP attribute used to extract user id.                                                                                               | userPrincipalName            | No                 |
| camunda.operate.ldap.displayNameAttrName | LDAP attribute used to extract username; the name the UI will show.                                                                   | userName                     | No                 |
| camunda.operate.ldap.userDnPatterns      | Pattern for retrieving user info, similar to userSearchFilter. The pattern '{0}' is replaced by the given username in the login form. | uid={0},ou=people            | No                 |

Example for standard LDAP server:

```shell
CAMUNDA_OPERATE_LDAP_BASEDN=dc=planetexpress,dc=com
CAMUNDA_OPERATE_LDAP_URL=ldap://localhost:10389
CAMUNDA_OPERATE_LDAP_MANAGERDN=cn=admin,dc=planetexpress,dc=com
CAMUNDA_OPERATE_LDAP_MANAGERPASSWORD=GoodNewsEveryone
CAMUNDA_OPERATE_LDAP_USERSEARCHFILTER=uid={0}
```

## Configuration of active directory-based LDAP

For an **active directory**-based LDAP server, an **additional** parameter should be given:

| Parameter name                        | Description                            | Required |
| ------------------------------------- | -------------------------------------- | -------- |
| camunda.operate.ldap.url              | URL to an active directory LDAP server | Yes      |
| camunda.operate.ldap.domain           | Domain                                 | Yes      |
| camunda.operate.ldap.baseDn           | Root domain name                       | No       |
| camunda.operate.ldap.userSearchFilter | Used as a search filter                | No       |

:::note
The active directory configuration will only be applied when `camunda.operate.ldap.domain` is given.
:::

Example for active directory:

```shell
CAMUNDA_OPERATE_LDAP_BASEDN=dc=dev,dc=camunda,dc=com
CAMUNDA_OPERATE_LDAP_URL=ldaps://ldap.dev.camunda.com/
CAMUNDA_OPERATE_LDAP_MANAGERDN=CN=Der Admin,OU=AADDC Users,DC=dev,DC=camunda,DC=com
CAMUNDA_OPERATE_LDAP_MANAGERPASSWORD=<PASSWORD>
CAMUNDA_OPERATE_LDAP_USERSEARCHFILTER=
CAMUNDA_OPERATE_LDAP_DOMAIN=dev.camunda.com
CAMUNDA_OPERATE_LDAP_USERIDATTRNAME=userPrincipalName
```

:::note
`userSearchFilter` can be empty, and active directory default implementation would
get `(&(objectClass=user)(userPrincipalName={0}))`.
:::

</TabItem>

<TabItem value="identity">

[Identity](../../identity/what-is-identity/) provides authentication and authorization functionality along with user
management.

## Enable Identity

Identity can only be enabled by setting
the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `identity-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=identity-auth
```

## Configure Identity

Identity requires the following parameters:

:::danger
These configuration variables are deprecated. To connect using the updated values, see [connecting to an OpenID Connect provider](../platform-deployment/helm-kubernetes/guides/connect-to-an-oidc-provider.md).
:::

| Property name                                       | Description                                                                                                                                   | Example value                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| camunda.operate.identity.issuerUrl                  | URL of issuer (Identity)                                                                                                                      | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.operate.identity.issuerBackendUrl           | Backend URL of issuer (Identity)                                                                                                              | http://localhost:18080/auth/realms/camunda-platform                               |
| camunda.operate.identity.redirectRootUrl            | Root URL to redirect users to after successful authentication. If the property is not provided, it will be derived from the incoming request. | http://localhost:8081                                                             |
| camunda.operate.identity.clientId                   | Similar to a username for the application                                                                                                     | operate                                                                           |
| camunda.operate.identity.clientSecret               | Similar to a password for the application                                                                                                     | XALaRPl...s7dL7                                                                   |
| camunda.operate.identity.audience                   | Audience for Operate                                                                                                                          | operate-api                                                                       |
| camunda.identity.redirectRootUrl                    | Root URL to redirect users to after successful authentication. If the property is not provided, it will be derived from the incoming request. | http://localhost:8081                                                             |
| spring.security.oauth2.resourceserver.jwt.issueruri | Token issuer URI                                                                                                                              | http://localhost:18080/auth/realms/camunda-platform                               |
| spring.security.oauth2.resourceserver.jwt.jwkseturi | Complete URI to get public keys for JWT validation                                                                                            | http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/certs |

## Use Identity JWT token to access Operate API

Operate provides a [REST API](/apis-tools/operate-api/overview.md) under the endpoint `/v1`. Clients can access this API
using a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

**Example:**

1. [Add an application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to an application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md)
   for Operate API.
3. Obtain a token to access the REST API.
   You will need:
   - `client_id` and `client_secret` from Identity application you created.
   - URL of the authorization server will look
     like: `http://<keycloak_host>:<port>/auth/realms/camunda-platform/protocol/openid-connect/token`, where host and
     port reference Keycloak URL (e.g. `localhost:18080`).

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

2. Send the token as an authorization header in each request. In this case, request all process definitions.

```shell
curl -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhb...' -d '{}'
```

## Resource-based permissions

:::note
Operate uses a caching mechanism where resource authorization changes can take 30 seconds to take effect.
:::

By default, when using Operate with Identity, one can assign a user "read" and/or "write" permissions for Operate. "
Read" allows read-only access to Operate. "Write" permission allows the user to perform all types of operations
modifying data (e.g. update the variables, resolve the incidents or cancel instances).

More detailed permissions may be enabled:

1. Resource authorizations must
   be [enabled in Identity](/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md).
2. Operate must be configured to use resource authorizations:

```yaml
camunda.operate.identity.resourcePermissionsEnabled: true
```

Resource-based permissions are defined per process definition or decision definition. Process definition is defined by
Process ID, which is present in BPMN XML. Decision definition is defined by Decision ID, which is present in DMN XML.

The user or user group can be assigned the following types of permissions:

| Permission name         | Resource type(s)                        | Allowed action(s) in Operate                                                                                                |
| ----------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| READ                    | process-definition, decision-definition | User can see the data related to defined process or decision definition.                                                    |
| UPDATE_PROCESS_INSTANCE | process-definition                      | User can retry the incident, add/update variable, cancel, or modify process instance related to defined process definition. |
| DELETE_PROCESS_INSTANCE | process-definition                      | User can delete process instance related to defined process definition.                                                     |

For more information, visit the [Identity documentation](../../concepts/access-control/resource-authorizations/).

## Zeebe client credentials

If the Zeebe Gateway is set up with Camunda Identity-based
authorization, [Zeebe client OAuth environment variables](../zeebe-deployment/security/client-authorization.md#environment-variables)
must be provided.

</TabItem>
</Tabs>
