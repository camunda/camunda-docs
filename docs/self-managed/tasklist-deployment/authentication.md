---
id: authentication
title: Authentication
description: "Let's take a closer look at the authentication methods of Tasklist."
---

Tasklist provides two ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Camunda Cloud Single Sign-On](#camunda-cloud-single-sign-on)

By default, user storage in Elasticsearch is enabled.

## User in Elasticsearch

In this mode, the user authenticates with a username and password stored in Elasticsearch.

The **username**, **password** and **roles** for one user may be set in application.yml:

```
camunda.tasklist:
  username: anUser
  password: aPassword
  roles:
    - OWNER
    - USER
```

On Tasklist startup, the user is created if they did not exist before.

By default, two users are created:
* Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
* Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.

More users can be added directly to Elasticsearch, to the index `tasklist-user-<version>_`. The password must be encoded with a strong BCrypt hashing function.

## Camunda Cloud Single Sign-On

Currently, Tasklist supports Single Sign-On (SSO) in the Camunda Cloud environment. Camunda Cloud handles the configuration of Tasklist for SSO, so normally you don't need to adjust the following subsections.

### Enable Single Sign-On

SSO may be enabled only by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `sso-auth`.

See the following example to set your Spring profile as an environmental variable:

```
export SPRING_PROFILES_ACTIVE=sso-auth
```

### Configure Single Sign-On

SSO requires the following parameters:

Parametername | Description
--------------|-------------
camunda.tasklist.auth0.domain | Defines the domain the user sees.
camunda.tasklist.auth0.backendDomain | Defines the domain which provides user information.
camunda.tasklist.auth0.clientId | Similar to a username for the application.
camunda.tasklist.auth0.clientSecret | Similar to a password for the application.
camunda.tasklist.auth0.claimName | The claim checked by Tasklist. Similar to a permission name.
camunda.tasklist.auth0.organization | The given organization should be contained in the value of the claim name.

See the following example for setting parameters as environment variables:

```
export CAMUNDA_TASKLIST_AUTH0_DOMAIN=A_DOMAIN
export CAMUNDA_TASKLIST_AUTH0_BACKENDDOMAIN=A_BACKEND_DDOMAIN
export CAMUNDA_TASKLIST_AUTH0_CLIENTID=A_CLIENT_ID
export CAMUNDA_TASKLIST_AUTH0_CLIENTSECRET=A_SECRET
export CAMUNDA_TASKLIST_AUTH0_CLAIMNAME=A_CLAIM
export CAMUNDA_TASKLIST_AUTH0_ORGANIZATION=AN_ORGANIZATION
```

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
