---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
---

As Identity is a Spring Boot application, you may use the standard
Spring [configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
methods.

### Core configuration

| Environment variable                 | Description                                                                        | Default value                                                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IDENTITY_AUTH_PROVIDER_BACKEND_URL` | Used to support container to container communication                               | http://localhost:18080/auth/realms/camunda-platform                                                                                                                      |
| `IDENTITY_AUTH_PROVIDER_ISSUER_URL`  | Used to denote the token issuer                                                    | http://localhost:18080/auth/realms/camunda-platform                                                                                                                      |
| `IDENTITY_BASE_PATH`                 | Used to configure Identity to run on a subpath (Requires HTTPs for `IDENTITY_URL`) |                                                                                                                                                                          |
| `IDENTITY_CLIENT_ID`                 | The client ID for the Identity client                                              | camunda-identity                                                                                                                                                         |
| `IDENTITY_CLIENT_SECRET`             | The client secret for the Identity client                                          |                                                                                                                                                                          |
| `IDENTITY_LOG_LEVEL`                 | The level of which to log messages at                                              | INFO                                                                                                                                                                     |
| `IDENTITY_LOG_PATTERN`               | The pattern to use when logging                                                    | `%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx` |
| `IDENTITY_URL`                       | The URL of the Identity service                                                    | http://localhost:8080                                                                                                                                                    |
| `KEYCLOAK_REALM`                     | The name of the Keycloak Realm to connect to                                       | camunda-platform                                                                                                                                                         |
| `KEYCLOAK_SETUP_USER`                | The username of a user with admin access to Keycloak                               | admin                                                                                                                                                                    |
| `KEYCLOAK_SETUP_PASSWORD`            | The password of a user with admin access to Keycloak                               | admin                                                                                                                                                                    |
| `KEYCLOAK_SETUP_REALM`               | The realm that the setup user is in                                                | master                                                                                                                                                                   |
| `KEYCLOAK_SETUP_CLIENT_ID`           | The client to use for authentication during setup of the provided Keycloak         | admin-cli                                                                                                                                                                |
| `KEYCLOAK_URL`                       | The URL of the Keycloak instance to use                                            | http://localhost:18080/auth                                                                                                                                              |

### Component configuration

Identity supports component configuration using preset values. This means to configure a
component for use within Identity, all that is required is to set two variables:

| Environment variable                 | Description                                   |
| ------------------------------------ | --------------------------------------------- |
| `KEYCLOAK_INIT_<COMPONENT>_SECRET`   | The secret used for authentication flows      |
| `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` | The root URL of where the component is hosted |

:::note
Identity supports the following values for the `<COMPONENT>` placeholder: `OPERATE`, `OPTIMIZE`, `TASKLIST`,
and `WEBMODELER`.

For the `WEBMODELER` value, only the `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` variable is required to be set.
:::

### Database configuration

| Environment variable         | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `IDENTITY_DATABASE_HOST`     | The host of the database                           |
| `IDENTITY_DATABASE_PORT`     | The port of the database                           |
| `IDENTITY_DATABASE_NAME`     | The name of the database to connect to             |
| `IDENTITY_DATABASE_USERNAME` | The username of a user with access to the database |
| `IDENTITY_DATABASE_PASSWORD` | The password of a user with access to the database |

### Feature flags

Identity uses feature flag environment variables to enable and disable features, the supported flags are:

| Environment variable         | Description                                 | Default value |
| ---------------------------- | ------------------------------------------- | ------------- |
| RESOURCE_PERMISSIONS_ENABLED | Controls the resource autorizations feature | false         |

:::note
Setting the `RESOURCE_PERMISSIONS_ENABLED` flag to `true` requires a database connection. To configure a database
connection, see [database configuration](#database-configuration).
:::
