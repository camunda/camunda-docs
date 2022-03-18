---
id: authentication
title: Authentication
description: "Let's take a closer look at how Operate authenticates for use."
---

Operate provides three ways to authenticate:

1. User information stored in [Elasticsearch](#user-in-elasticsearch)
2. [Lightweight Directory Access Protocol (LDAP)](#ldap)
3. [IAM Authentication and Authorization](#iam)

By default, user storage in Elasticsearch is enabled.

## User in Elasticsearch

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

### Roles for users
Name | Description 
-----|-------------
OWNER| Full access
OPERATOR| Read and write access
USER | Read only access

On startup of Operate, the user is created if they did not exist before.

By default, three users are created:
* Role `OWNER` with **userId**/**displayName**/**password** `demo`/`demo`/`demo`.
* Role `OPERATOR` with **userId**/**displayName**/**password** `act`/`act`/`act`.
* Role `USER` with **userId**/**displayName**/**password** `view`/`view`/`view`.

Add more users directly to Elasticsearch via the index `operate-user-<version>_`. The password must be encoded with a strong `bcrypt` hashing function.

## LDAP

### Enable LDAP

LDAP can only be enabled by setting the [Spring profile](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-profiles): `ldap-auth`.

See the following example for setting the Spring profile as an environmental variable:

```
export SPRING_PROFILES_ACTIVE=ldap-auth
```

### Configuration of LDAP

A user can authenticate via LDAP.

The following parameters for connection to an LDAP server should be given:

<<<<<<< HEAD
 Parameter name | Description | Example | Required |
 | -- | -- | -- | -- |
 | camunda.operate.ldap.url | URL to an LDAP Server | ldaps://camunda.com/ | Yes |
 | camunda.operate.ldap.baseDn | Base domain name | dc=camunda,dc=com | Yes |
 | camunda.operate.ldap.managerDn | Manager domain used by Operate to log into LDAP server to retrieve user information. | cn=admin,dc=camunda,dc=com | Yes |
 | camunda.operate.ldap.managerPassword| Password for manager | | Yes |
 | camunda.operate.ldap.userSearchFilter | Filter to retrieve user info. The pattern '{0}' is replaced by the given username in the login form. | {0} | No, default is {0} |
 | camunda.operate.ldap.userSearchBase | The starting point for search.| ou=Support,dc=camunda,dc=com | No |
 | camunda.operate.ldap.userIdAttrName | LDAP attribute used to extract user id. | userPrincipalName | No |
 | camunda.operate.ldap.displayNameAttrName| LDAP attribute used to extract username; the name the UI will show. | userName | No |
 | camunda.operate.ldap.userDnPatterns| Pattern for retrieving user info, similar to userSearchFilter. The pattern '{0}' is replaced by the given username in the login form. | uid={0},ou=people | No |

Example for standard LDAP server:
```shell
CAMUNDA_OPERATE_LDAP_BASEDN=dc=planetexpress,dc=com
CAMUNDA_OPERATE_LDAP_URL=ldap://localhost:10389
CAMUNDA_OPERATE_LDAP_MANAGERDN=cn=admin,dc=planetexpress,dc=com
CAMUNDA_OPERATE_LDAP_MANAGERPASSWORD=GoodNewsEveryone
CAMUNDA_OPERATE_LDAP_USERSEARCHFILTER=uid={0}
```
=======
| Parameter name | Description | Example | Required |
| -- | -- | -- | -- |
| camunda.operate.ldap.url | URL to an LDAP Server | ldaps://camunda.com/ | Yes |
| camunda.operate.ldap.baseDn| Base domain name | dc=camunda,dc=com| Yes |
| camunda.operate.ldap.managerDn| Manager domain used by Operate to log into LDAP server to retrieve user information | cn=admin,dc=camunda,dc=com | Yes |
| camunda.operate.ldap.managerPassword| Password for manager| | Yes |
| camunda.operate.ldap.userSearchFilter| Filter to retrieve user info. The pattern '{0}' is replaced by the given username in the login form. | {0} | No, default is {0} |
| camunda.operate.ldap.userSearchBase | Starting point for search | ou=Support,dc=camunda,dc=com | No |
>>>>>>> master

### Configuration of active directory-based LDAP

For an **active directory**-based LDAP server, an **additional** parameter should be given:

 Parameter name | Description | Required |
 --------------|------------|---------
 camunda.operate.ldap.domain| Domain | Yes

:::note
The active directory configuration will only be applied when `camunda.operate.ldap.domain` is given.
:::

<<<<<<< HEAD
Example for active directory:

````shell
CAMUNDA_OPERATE_LDAP_BASEDN=dc=dev,dc=camunda,dc=com
CAMUNDA_OPERATE_LDAP_URL=ldaps://ldap.dev.camunda.com/
CAMUNDA_OPERATE_LDAP_MANAGERDN=CN=Der Admin,OU=AADDC Users,DC=dev,DC=camunda,DC=com
CAMUNDA_OPERATE_LDAP_MANAGERPASSWORD=<PASSWORD>
CAMUNDA_OPERATE_LDAP_USERSEARCHFILTER=
CAMUNDA_OPERATE_LDAP_DOMAIN=dev.camunda.com
CAMUNDA_OPERATE_LDAP_USERIDATTRNAME=userPrincipalName
````

:::note
`userSearchFilter` can be empty, and active directory default implementation would get `(&(objectClass=user)(userPrincipalName={0}))`.
:::
=======
| Parameter name | Description | Required |
| -- | -- | -- |
| camunda.operate.ldap.url | URL to an active directory LDAP server | Yes |
| camunda.operate.ldap.domain| Domain | Yes |
| camunda.operate.ldap.baseDn| Root domain name | No |
| camunda.operate.ldap.userSearchFilter| Used as a search filter | No |
>>>>>>> master

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

| Parameter name | Description | Example value |
| -- | -- | -- |
| camunda.operate.iam.issuer | Name/ID of issuer | http://app.iam.localhost |
| camunda.operate.iam.issuerUrl | URL of issuer (IAM) | http://app.iam.localhost |
| camunda.operate.iam.clientId | Similar to a username for the application | operate |
| camunda.operate.iam.clientSecret | Similar to a password for the application | XALaRPl...s7dL7 |

We provide two different permissions over IAM: read or write.
To configure the authorization, you are required to create two different permissions:

| Permission value | Description |
| -- | -- |
| `read:*` | Grants the user the permission to access, view, and read the data in the application. |
| `write:*` | Grants the user the permission to perform operations. |

:::note
The minimum permission needed is `read:*`. Any user without this permission will have access denied to the application.
::::
