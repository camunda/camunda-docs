---
id: authentication
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
* Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
* Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.
* Role `OPERATOR` with **userId**/**displayName**/**password** `act`/`act`/`act`/.

More users can be added directly to Elasticsearch, to the index `tasklist-user-<version>_`. The password must be encoded with a strong BCrypt hashing function.

## Identity

<!-- TODO: insert link to identity when available [Identity](../../self-managed/identity) -->
Identity provides authentication and authorization functionality along with user management.

### Enable Identity

Identity can only be enabled by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `identity-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=identity-auth
```

### Configure Identity

Identity requires the following parameters:

| Parameter name | Description | Example value |
| -- | -- | -- |
| camunda.tasklist.identity.issuerUrl | URL of issuer (Identity) | http://localhost:18080/auth/realms/camunda-platform |
| camunda.tasklist.identity.issuerBackendUrl | Backend URL of issuer (Identity) | http://localhost:18080/auth/realms/camunda-platform |
| camunda.tasklist.identity.clientId | Similar to a username for the application | tasklist |
| camunda.tasklist.identity.clientSecret | Similar to a password for the application | XALaRPl...s7dL7 |
| camunda.tasklist.identity.audience | Audience for Tasklist | tasklist-api |
