---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
---

:::caution
IAM has been replaced with Identity for version 1.4+. Please refer to the
[Identity documentation](../../identity/what-is-identity.md) for ongoing support.
:::

As IAM is a Spring Boot application, you may use the standard Spring [configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config) methods.

### Feature control

| Environment variable | Description | Default value |
| -- | -- | -- |
| FEATURE_LDAP | Toggle LDAP support within IAM. | false |

### Functionality

| Environment variable | Description | Default value |
| -- | -- | -- |
| ENFORCE_ACCESS_CONTROL | Controls enforcement of permissions for the IAM component. If set to false, all users can access user, role, and permission management. | false |
| ENFORCE_HTTPS | Controls if the URLs specified for client configuration must be `https://`. | true |

### LDAP

All LDAP properties are prefixed with `LDAP_`.

| Environment variable | Description | Default value |
| -- | -- | -- |
| DEFAULT_USERNAME | The username of a default user to initialize IAM with. | - |
| SERVER_URL | The URL at which the LDAP server is reachable. | - |
| DOMAIN | The domain of an Active Directory (AD) LDAP server; only to be set if AD is used. | - |
| MANAGER_DN | The credentials to bind the Camunda Account service to the LDAP server; must be empty if connecting to an AD server. | - |
| MANAGER_PASSWORD | The credentials to bind the Camunda Account service to the LDAP server; must be empty if connecting to an AD server. | - |
| BASE_DN | The start location for LDAP search. If AD is used and this property is empty, this property is determined from configured domain. | - |
| USER_SEARCH_BASE | The start location for user search. Relative to base-dn; must be empty if AD is used. | - |
| USER_SEARCH_FILTER | A filter to restrict the group of users to search in. | - |
| UUID_ATTRIBUTE | The attribute names used on the LDAP server; must be set to an attribute holding a universally unique identifier (UUID) of a user. | - |
| USER_FIRST_NAME_ATTRIBUTE | Used to build the full name of the user. | - |
| USER_LAST_NAME_ATTRIBUTE | Used to build the full name of the user. | - |
| USER_EMAIL_ATTRIBUTE | Used to determine a user's email address used for log in. | - |
