---
id: authentication
title: Authentication and authorization
description: "Overview of authentication and authorization for Orchestration Cluster components."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Orchestration Cluster components provide multiple ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Lightweight Directory Access Protocol (LDAP)](#ldap)
3. [Identity Authentication and Authorization](#identity)

By default, user storage in Elasticsearch is enabled.

<Tabs groupId="authentication" defaultValue="elasticsearch" queryString values={[
{label: 'Elasticsearch', value: 'elasticsearch'},
{label: 'LDAP', value: 'ldap'},
{label: 'Identity', value: 'identity'}
]}>

<TabItem value="elasticsearch">

## User storage in Elasticsearch

In this mode, users authenticate with a username and password stored in Elasticsearch.

You may configure a user in `application.yml`:

```yaml
userId: anUser
displayName: nameShownInWebpage
password: aPassword
roles:
  - OWNER
  - OPERATOR
  - USER
```

| Name     | Description           |
| -------- | --------------------- |
| OWNER    | Full access           |
| OPERATOR | Read and write access |
| USER     | Read-only access      |

On startup, default users are created if they do not exist:

- `OWNER`: `demo`/`demo`/`demo`
- `OPERATOR`: `act`/`act`/`act`
- `USER`: `view`/`view`/`view`

Add additional users directly to Elasticsearch indices (e.g., `*-user-<version>_`) with passwords hashed using `bcrypt`.

User restrictions are not supported with Elasticsearch. For user restrictions, use Identity.

</TabItem>

<TabItem value="ldap">

## Enable LDAP

LDAP can only be enabled via the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `ldap-auth`.

```shell
export SPRING_PROFILES_ACTIVE=ldap-auth
```

### LDAP configuration

| Parameter                | Description                                                 | Example                      | Required |
| ------------------------ | ----------------------------------------------------------- | ---------------------------- | -------- |
| ldap.url                 | URL to LDAP server                                          | ldaps\://example.com/        | Yes      |
| ldap.baseDn              | Base domain                                                 | dc=example,dc=com            | Yes      |
| ldap.managerDn           | Manager DN for retrieving user info                         | cn=admin,dc=example,dc=com   | Yes      |
| ldap.managerPassword     | Password for manager DN                                     |                              | Yes      |
| ldap.userSearchFilter    | Filter for retrieving user info; `{0}` replaced by username | {0}                          | No       |
| ldap.userSearchBase      | Base search point                                           | ou=Support,dc=example,dc=com | No       |
| ldap.userIdAttrName      | Attribute used for user ID                                  | userPrincipalName            | No       |
| ldap.displayNameAttrName | Attribute used for display name                             | userName                     | No       |
| ldap.userDnPatterns      | Pattern for retrieving user info                            | uid={0},ou=people            | No       |

#### Active Directory LDAP

Additional parameters:

| Parameter             | Description               | Required |
| --------------------- | ------------------------- | -------- |
| ldap.url              | Active Directory LDAP URL | Yes      |
| ldap.domain           | Domain                    | Yes      |
| ldap.baseDn           | Root domain               | No       |
| ldap.userSearchFilter | Search filter             | No       |

Active Directory configuration is applied only if `ldap.domain` is provided.

</TabItem>

<TabItem value="identity">

## Enable Identity

Identity can be enabled via the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `identity-auth`.

```shell
export SPRING_PROFILES_ACTIVE=identity-auth
```

### Identity configuration

These variables are deprecated. Use [OpenID Connect provider configuration](/self-managed/installation-methods/helm/configure/connect-to-an-oidc-provider.md) instead.

| Property                                            | Description         | Example                                                                                                                                                                |
| --------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| identity.issuerUrl                                  | URL of issuer       | [http://localhost:18080/auth/realms/camunda-platform](http://localhost:18080/auth/realms/camunda-platform)                                                             |
| identity.issuerBackendUrl                           | Backend URL         | [http://localhost:18080/auth/realms/camunda-platform](http://localhost:18080/auth/realms/camunda-platform)                                                             |
| identity.baseUrl                                    | Base URL            | [http://localhost:8084](http://localhost:8084)                                                                                                                         |
| identity.clientId                                   | Client ID           | cluster-component                                                                                                                                                      |
| identity.clientSecret                               | Client secret       | XALaRPl...s7dL7                                                                                                                                                        |
| identity.audience                                   | Audience            | cluster-component-api                                                                                                                                                  |
| identity.redirectRootUrl                            | Redirect URL        | [http://localhost:8080](http://localhost:8080)                                                                                                                         |
| spring.security.oauth2.resourceserver.jwt.issueruri | Token issuer URI    | [http://localhost:18080/auth/realms/camunda-platform](http://localhost:18080/auth/realms/camunda-platform)                                                             |
| spring.security.oauth2.resourceserver.jwt.jwkseturi | URI for public keys | [http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/certs](http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/certs) |

### Use Identity JWT token

Access the REST API (`/v1`) using a JWT token in the `Authorization` header:

```shell
curl -X POST 'http://<host>:<port>/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=<client id>' \
--data-urlencode 'client_secret=<secret>' \
--data-urlencode 'grant_type=client_credentials'
```

Send the `access_token` in API requests:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" http://localhost:8080/v1/tasks/search
```

### User task access restrictions

Enabled by default. Restricts visible tasks based on candidate groups, candidate users, and assignee.

User groups are managed by Identity; this feature is available only when Identity authentication is enabled.

### Zeebe client credentials

If using Identity-based authorization, provide Zeebe client OAuth environment variables.

</TabItem> </Tabs>
