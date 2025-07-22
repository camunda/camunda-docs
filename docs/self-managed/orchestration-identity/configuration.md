---
id: configuration
title: "Configuration"
description: "Learn about the Identity configuration options available in your Orchestration cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
As a Spring Boot application, Camunda 8 supports any standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.
:::

The following variables apply globally to all components within the Camunda Orchestration core: Zeebe, Operate,
Tasklist, and Identity.

:::note
The default configuration available below is for Camunda 8 Run. Helm installations have API authentication and
authorizations enabled by default.
:::

<!-- updates must be made to BOTH tables. Note that they are sorted in alphabetical order! -->
<Tabs>
  <TabItem value="env" label="Environment variables" default>

| Environment variable                                             | Description                                                                                                           | Default value (Camunda 8 Run) |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `CAMUNDA_PERSISTENT_SESSIONS_ENABLED`                            | Enables shared authentication between the Orchestration Cluster web applications (Operate and Tasklist).              | `true`                        |
| `CAMUNDA_SECURITY_AUTHENTICATION_METHOD`                         | The authentication method to use.                                                                                     | `basic`                       |
| `CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI`                 | If the API can be used without authentication.                                                                        | `true`                        |
| `CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED`                        | If authorizations are enabled.                                                                                        | `true`                        |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL`                  | The email address of the first user.                                                                                  | `demo@demo.com`               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME`                   | The name of the first user.                                                                                           | Demo                          |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD`               | The password of the first user.                                                                                       | `demo`                        |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME`               | The username of the first user.                                                                                       | `demo`                        |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS_0`    | The users assigned by default to the role named `<role>` (replace with your desired role name in capital letters).    | `demo` for role `admin`       |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_CLIENTS_0`  | The clients assigned by default to the role named `<role>` (replace with your desired role name in capital letters).  |                               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_GROUPS_0`   | The groups assigned by default to the role named `<role>` (replace with your desired role name in capital letters).   |                               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_MAPPINGS_0` | The mappings assigned by default to the role named `<role>` (replace with your desired role name in capital letters). |                               |
| `CAMUNDA_SECURITY_MULTITENANCY_ENABLED`                          | Enables multi-tenancy. This requires the API to be protected.                                                         | `false`                       |
| `SPRING_PROFILES_ACTIVE`                                         | **Note:** This property will be deprecated as additional authentication methods become available.                     | `consolidated-auth`           |

  </TabItem>
  <TabItem value="helm" label="Spring properties">

| Spring property                                     | Description                                                                                       | Default value (Camunda 8 Run) |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------- |
| `camunda.persistent.sessions.enabled`               | Enables shared authentication between the Orchestration web applications (Operate and Tasklist).  | `true`                        |
| `camunda.security.authentication.method`            | The authentication method to use.                                                                 | `basic`                       |
| `camunda.security.authentication.unprotected-api`   | If the API can be used without authentication.                                                    | `true`                        |
| `camunda.security.authorizations.enabled`           | If authorizations are enabled.                                                                    | `true`                        |
| `camunda.security.initialization.users[0].email`    | The email address of the first user.                                                              | `demo@demo.com`               |
| `camunda.security.initialization.users[0].name`     | The name of the first user.                                                                       | `Demo`                        |
| `camunda.security.initialization.users[0].password` | The password of the first user.                                                                   | `demo`                        |
| `camunda.security.initialization.users[0].username` | The username of the first user.                                                                   | `demo`                        |
| `camunda.security.multitenancy.enabled`             | Enables multi-tenancy. This requires the api to be protected.                                     | `false`                       |
| `spring.profiles.active`                            | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth`           |

  </TabItem>
</Tabs>
