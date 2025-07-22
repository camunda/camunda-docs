---
id: configuration
title: "Configuration"
description: "Learn about the Identity configuration options available in your Orchestration cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

As a Spring Boot application, the Orchestration Cluster supports standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) methods.

The following configurations apply to all components within the Orchestration Cluster.

<!-- Updates must be made to ALL tables below. Tables are sorted alphabetically by property name. -->
<Tabs>
  <TabItem value="env" label="Environment variables" default>
  
| Environment variable                                 | Description                                                                                                    | Default value         |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------- |
| `CAMUNDA_PERSISTENT_SESSIONS_ENABLED`                | Stores session data in secondary storage so users stay logged in across cluster nodes.                         | `true`                |
| `CAMUNDA_SECURITY_AUTHENTICATION_METHOD`             | The authentication method to use. Options: `basic`, `oidc`, `none`.                                            | `basic`               |
| `CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI`     | If the API can be used without authentication.                                                                 | `false`               |
| `CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED`            | If authorizations are enabled.                                                                                 | `true`                |
| `CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED`        | Enables multi-tenancy checks. This requires the API to be protected.                                           | `false`               |
| `CAMUNDA_SECURITY_MULTITENANCY_APIENABLED`           | Enables the multi-tenancy API and UI independently from multi-tenancy checks.                                  | `true`                |
| `SPRING_PROFILES_ACTIVE`                             | **Note:** This property will be deprecated as additional authentication methods become available.              | `consolidated-auth`   |

  </TabItem>
  <TabItem value="application.yaml" label="application.yaml">

| Application.yaml property                         | Description                                                                                       | Default value       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| `camunda.persistent.sessions.enabled`             | Stores session data in secondary storage so users stay logged in across cluster nodes.            | `true`              |
| `camunda.security.authentication.method`          | The authentication method to use. Options: `basic`, `oidc`, `none`.                               | `basic`             |
| `camunda.security.authentication.unprotected-api` | If the API can be used without authentication.                                                    | `false`             |
| `camunda.security.authorizations.enabled`         | If authorizations are enabled.                                                                    | `true`              |
| `camunda.security.multitenancy.checks-enabled`    | Enables multi-tenancy checks. This requires the API to be protected.                              | `false`             |
| `camunda.security.multitenancy.api-enabled`       | Enables the multi-tenancy API and UI independently from multi-tenancy checks.                     | `true`              |
| `spring.profiles.active`                          | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth` |

  </TabItem>
  <TabItem value="helm" label="Helm values">

| Helm value key                                  | Description                                                                            | Default value |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| `global.persistent.sessions.enabled`            | Stores session data in secondary storage so users stay logged in across cluster nodes. | `true`        |
| `global.security.authentication.method`         | The authentication method to use. Options: `basic`, `oidc`, `none`.                    | `basic`       |
| `global.security.authentication.unprotectedApi` | If the API can be used without authentication.                                         | `false`       |
| `global.security.authorizations.enabled`        | If authorizations are enabled.                                                         | `true`        |
| `global.security.multiTenancy.checksEnabled`    | Enables multi-tenancy checks. This requires the API to be protected.                   | `false`       |
| `global.security.multiTenancy.apiEnabled`       | Enables the multi-tenancy API and UI independently from multi-tenancy checks.          | `true`        |

  </TabItem>
</Tabs>

## Initialization

The following variables are used to initialize users and mappings.

<Tabs>
  <TabItem value="init-env" label="Environment variables" default>

| Environment variable                                          | Description                                     | Default value |
| ------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_USERNAME`           | The username of the first user.                 |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_PASSWORD`           | The password of the first user.                 |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_NAME`               | The name of the first user.                     |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_EMAIL`              | The email address of the first user.            |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_USERS[0]` | Username assigned to the admin role by default. |               |

  </TabItem>
  <TabItem value="init-yaml" label="application.yaml">

| Application.yaml property                                     | Description                                     | Default value |
| ------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `camunda.security.initialization.users[0].username`           | The username of the first user.                 |               |
| `camunda.security.initialization.users[0].password`           | The password of the first user.                 |               |
| `camunda.security.initialization.users[0].name`               | The name of the first user.                     |               |
| `camunda.security.initialization.users[0].email`              | The email address of the first user.            |               |
| `camunda.security.initialization.defaultRoles.admin.users[0]` | Username assigned to the admin role by default. |               |

  </TabItem>
  <TabItem value="init-helm" label="Helm values">

| Helm value key                         | Description                                                              | Default value |
| -------------------------------------- | ------------------------------------------------------------------------ | ------------- |
| `global.security.initialization.users` | List of users to initialize (each with username, password, name, email). |               |

  </TabItem>
</Tabs>

## OIDC Configuration

The following variables are used when `oidc` is selected as the authentication method.

<Tabs>
  <TabItem value="oidc-env" label="Environment variables" default>

| Environment variable                                 | Description                                                      | Default value                        |
| ---------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID`      | The client ID for OIDC authentication.                           |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTSECRET`  | The client secret for OIDC authentication.                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI`     | The issuer URI for OIDC authentication.                          |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_REDIRECTURI`   | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM` | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM`   | The claim to use for groups in OIDC authentication.              |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES`     | Comma-separated list of audiences to validate in the OIDC token. |                                      |

  </TabItem>
  <TabItem value="oidc-yaml" label="application.yaml">

| Application.yaml property                             | Description                                                      | Default value                        |
| ----------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `camunda.security.authentication.oidc.client-id`      | The client ID for OIDC authentication.                           |                                      |
| `camunda.security.authentication.oidc.client-secret`  | The client secret for OIDC authentication.                       |                                      |
| `camunda.security.authentication.oidc.issuer-uri`     | The issuer URI for OIDC authentication.                          |                                      |
| `camunda.security.authentication.oidc.redirect-uri`   | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `camunda.security.authentication.oidc.username-claim` | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `camunda.security.authentication.oidc.groups-claim`   | The claim to use for groups in OIDC authentication.              |                                      |
| `camunda.security.authentication.oidc.audiences`      | Comma-separated list of audiences to validate in the OIDC token. |                                      |

  </TabItem>
  <TabItem value="oidc-helm" label="Helm values">

| Helm value key                                      | Description                                                      | Default value                        |
| --------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `global.security.authentication.oidc.clientId`      | The client ID for OIDC authentication.                           |                                      |
| `global.security.authentication.oidc.clientSecret`  | The client secret for OIDC authentication.                       |                                      |
| `global.security.authentication.oidc.issuerUri`     | The issuer URI for OIDC authentication.                          |                                      |
| `global.security.authentication.oidc.redirectUri`   | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `global.security.authentication.oidc.userNameClaim` | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `global.security.authentication.oidc.groupsClaim`   | The claim to use for groups in OIDC authentication.              |                                      |
| `global.security.authentication.oidc.audiences`     | Comma-separated list of audiences to validate in the OIDC token. |                                      |

  </TabItem>
</Tabs>
