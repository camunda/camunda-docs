---
id: authentication
title: Authentication
description: "Let's take a closer look at how Operate authenticates for use."
---

Operate provides three ways for authentication:

1. Authenticate with user information stored in [Elasticsearch](#user-in-elasticsearch).
2. Authenticate via [Camunda Cloud Single Sign-On](#camunda-cloud-single-sign-on).
3. Authenticate via [Lightweight Directory Access Protocol (LDAP)](#ldap).

By default, user storage in Elasticsearch is enabled.

## User in Elasticsearch

In this mode, the user authenticates with a username and password stored in Elasticsearch.

**Username** and **password** for one user may be set in `application.yml`:

```
camunda.operate:
  username: anUser
  password: aPassword
```

On startup of Operate, the user is created if they did not exist before.

By default, one user with **username**/**password** `demo`/`demo` is created.

More users can be added directly to Elasticsearch via the index `operate-user-<version>_`. The password must be encoded with BCrypt strong hashing function.

## Camunda Cloud single sign-on

Currently, Operate supports Single Sign On (SSO) in the Camunda Cloud environment. Camunda Cloud takes care of the configuration of Operate for SSO, so you don't need to normally adjust following subsections.

### Enable SSO

SSO may be enabled only by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `sso-auth`.

See the following example:

```
export SPRING_PROFILES_ACTIVE=sso-auth
```

### Configure SSO

SSO requires all of the following parameters:

Parameter name | Description
--------------|-------------
camunda.operate.auth0.domain | Defines the domain the user sees.
camunda.operate.auth0.backendDomain | Defines the domain which provides user information.
camunda.operate.auth0.clientId | Similar to a username for the application.
camunda.operate.auth0.clientSecret | Similar to a password for the application.
camunda.operate.auth0.claimName | The claim that will be checked by Operate. Similar to a permission name.
camunda.operate.auth0.organization | The given organization should be contained in the value of the claim name.

See the following example for setting parameters as environment variables:

```
export CAMUNDA_OPERATE_AUTH0_DOMAIN=A_DOMAIN
export CAMUNDA_OPERATE_AUTH0_BACKENDDOMAIN=A_BACKEND_DDOMAIN
export CAMUNDA_OPERATE_AUTH0_CLIENTID=A_CLIENT_ID
export CAMUNDA_OPERATE_AUTH0_CLIENTSECRET=A_SECRET
export CAMUNDA_OPERATE_AUTH0_CLAIMNAME=A_CLAIM
export CAMUNDA_OPERATE_AUTH0_ORGANIZATION=AN_ORGANIZATION
```

## LDAP

### Enable LDAP

LDAP can be enabled only by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `ldap-auth`

See the following example for setting spring profile as an environmental variable:

```
export SPRING_PROFILES_ACTIVE=ldap-auth
```

### Configuration of LDAP

A user can authenticate via LDAP.

The following parameters for a connection to a LDAP server should be given:

 Parameter name | Description | Example | Required
 --------------|------------|---------|--------
 camunda.operate.ldap.url | URL to a LDAP Server | ldaps://camunda.com/ | Yes
 camunda.operate.ldap.baseDn| Base domain name | dc=camunda,dc=com| Yes
 camunda.operate.ldap.managerDn| Manager domain used by Operate to log in to LDAP server to retrieve user informations | cn=admin,dc=camunda,dc=com| Yes
 camunda.operate.ldap.managerPassword| Password for manager| | Yes
 camunda.operate.ldap.userSearchFilter| Filter to retrieve user info, The pattern '{0}' is replaced by given username in login form| {0} | No, default is {0}
 camunda.operate.ldap.userSearchBase| Starting point for search | ou=Support,dc=camunda,dc=com | No

### Configuration of active directory-based LDAP

For **active directory**-based LDAP server, the following parameters should be given:

:::note
The Active Directory configuration will be applied only when `camunda.operate.ldap.domain` is given.
:::

 Parameter name | Description | Required |
 --------------|------------|---------
 camunda.operate.ldap.url | URL to an Active Directory LDAP Server | Yes
 camunda.operate.ldap.domain| Domain | Yes
 camunda.operate.ldap.baseDn| Root domain name | No
 camunda.operate.ldap.userSearchFilter| Used as search filter | No

