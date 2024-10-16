---
id: authentication
title: Authentication
description: "Let's take a closer look at the authentication methods of Tasklist."
---

Tasklist provides two ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [IAM Authentication and Authorization](#iam)

By default, user storage in Elasticsearch is enabled.

## User in Elasticsearch

In this mode, the user authenticates with a username and password stored in Elasticsearch.

The **username**, **password**, and **roles** for one user may be set in application.yml:

```
camunda.tasklist:
  userId: anyUser
  displayName: anyDisplayName
  password: anyPassword
  roles:
    - OWNER
    - OPERATOR
```

On Tasklist startup, the user is created if they did not exist before.

By default, two users are created:

* Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
* Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.

More users can be added directly to Elasticsearch, to the index `tasklist-user-<version>_`. The password must be encoded with a strong BCrypt hashing function.

## IAM

[IAM](../../iam/what-is-iam/) provides authentication and authorization functionality along with user management.

### Enable IAM

IAM can only be enabled by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `iam-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=iam-auth
```

### Configure IAM

IAM requires the following parameters:

Parameter name | Description | Example value
---------------|-------------|---------------
camunda.tasklist.iam.issuer | Name/ID of issuer | http://app.iam.localhost
camunda.tasklist.iam.issuerUrl | Url of issuer (IAM) | http://app.iam.localhost
camunda.tasklist.iam.clientId | Similar to a username for the application | tasklist
camunda.tasklist.iam.clientSecret | Similar to a password for the application. | XALaRPl...s7dL7

We provide two different permissions over IAM: read or write.
To configure the authorization, you are required to create two different permissions:

Permission value | Description
----------------|-------------
`read:*` | Grants the user the permission to access, view, and read the data in the application.
`write:*` | Grants the user the permission to perform operations.

Note that the minimum permission needed is `read:*`. Any user without this permission will have access denied.
