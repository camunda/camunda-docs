---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
---

### Feature control

Name | Description | Default value
-----|-------------|--------------
feature.ldap | Toggle LDAP support within IAM | false

### LDAP 

All LDAP properties are prefixed with `ldap.`

Name | Description | Default value
-----|-------------|--------------
default-username | The username of a default user to initialize IAM with |  -
server-url | The URL at which the LDAP server is reachable |  -
domain | The domain of an Active Directory (AD) LDAP server. (Only to be set if AD is used) |  -
manager-dn | The credentials for binding the Camunda Account service to the LDAP server. (Must be empty if connecting to an AD server) |  -
manager-password | The credentials for binding the Camunda Account service to the LDAP server. (Must be empty if connecting to an AD server) |  -
base-dn | The start location for LDAP search. If AD is used and this property is empty, this property is determined from configured domain. |  -
user-search-base | The start location for user search. Relative to base-dn. (Must be empty if AD is used) |  -
user-search-filter | A filter to restrict the group of users to search in |  -
uuid-attribute | The attribute names used on the LDAP server. Must be set to an attribute holding a universally unique identifier (UUID) of a user. |  -
user-first-name-attribute | Used to build the full name of the user |  -
user-last-name-attribute | Used to build the full name of the user |  -
user-email-attribute | Used to determine a user's email address that is also used for log in |  -
