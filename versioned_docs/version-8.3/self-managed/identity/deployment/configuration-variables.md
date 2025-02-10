---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
description: "Learn more about core configuration, component configuration, database configuration, and feature flags."
---

As a Spring Boot application, Identity supports any standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.

## Core configuration

| Environment variable                 | Description                                                                         | Default value                                                                                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IDENTITY_AUTH_PROVIDER_BACKEND_URL` | Used to support container to container communication.                               | http://localhost:18080/auth/realms/camunda-platform                                                                                                                      |
| `IDENTITY_AUTH_PROVIDER_ISSUER_URL`  | Used to denote the token issuer.                                                    | http://localhost:18080/auth/realms/camunda-platform                                                                                                                      |
| `IDENTITY_BASE_PATH`                 | Used to configure Identity to run on a subpath (Requires HTTPs for `IDENTITY_URL`). |                                                                                                                                                                          |
| `IDENTITY_CLIENT_ID`                 | The client ID for the Identity client.                                              | camunda-identity                                                                                                                                                         |
| `IDENTITY_CLIENT_SECRET`             | The client secret for the Identity client.                                          |                                                                                                                                                                          |
| `IDENTITY_LOG_LEVEL`                 | The level of which to log messages at.                                              | INFO                                                                                                                                                                     |
| `IDENTITY_LOG_PATTERN`               | The pattern to use when logging.                                                    | `%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx` |
| `IDENTITY_URL`                       | The URL of the Identity service.                                                    | http://localhost:8080                                                                                                                                                    |
| `KEYCLOAK_REALM`                     | The name of the Keycloak Realm to connect to.                                       | camunda-platform                                                                                                                                                         |
| `KEYCLOAK_SETUP_USER`                | The username of a user with admin access to Keycloak.                               | admin                                                                                                                                                                    |
| `KEYCLOAK_SETUP_PASSWORD`            | The password of a user with admin access to Keycloak.                               | admin                                                                                                                                                                    |
| `KEYCLOAK_SETUP_REALM`               | The realm that the setup user is in.                                                | master                                                                                                                                                                   |
| `KEYCLOAK_SETUP_CLIENT_ID`           | The client to use for authentication during setup of the provided Keycloak.         | admin-cli                                                                                                                                                                |
| `KEYCLOAK_URL`                       | The URL of the Keycloak instance to use.                                            | http://localhost:18080/auth                                                                                                                                              |

## Component configuration

Identity supports component configuration using preset values. To configure a
component for use within Identity, set two variables:

| Environment variable                 | Description                                    | Default value |
| ------------------------------------ | ---------------------------------------------- | ------------- |
| `KEYCLOAK_INIT_<COMPONENT>_SECRET`   | The secret used for authentication flows.      | No default    |
| `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` | The root URL of where the component is hosted. | No default    |

:::note
Identity supports the following values for the `<COMPONENT>` placeholder: `OPERATE`, `OPTIMIZE`, `TASKLIST`,
and `WEBMODELER`.

For the `WEBMODELER` value, only the `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` variable is required to be set.
:::

## Database configuration

Identity requires a database to store information about [resource authorization](/self-managed/concepts/access-control/resource-authorizations.md) and [multi-tenancy](/self-managed/concepts/multi-tenancy.md).

| Environment variable         | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| `IDENTITY_DATABASE_HOST`     | The host of the database.                           |
| `IDENTITY_DATABASE_PORT`     | The port of the database.                           |
| `IDENTITY_DATABASE_NAME`     | The name of the database to connect to.             |
| `IDENTITY_DATABASE_USERNAME` | The username of a user with access to the database. |
| `IDENTITY_DATABASE_PASSWORD` | The password of a user with access to the database. |

:::note
There are no default values for the variables above. See
[supported environments](/reference/supported-environments.md#camunda-platform-8-self-managed) for a list of
supported databases.
:::

## Feature flags

Identity uses feature flag environment variables to enable and disable features; the supported flags are:

| Environment variable         | Description                                   | Default value |
| ---------------------------- | --------------------------------------------- | ------------- |
| RESOURCE_PERMISSIONS_ENABLED | Controls the resource authorizations feature. | false         |
| MULTITENANCY_ENABLED         | Controls the multi tenancy feature.           | false         |

:::note
Setting either of the feature flags to `true` requires a database connection. To configure a database
connection, see [database configuration](#database-configuration).
:::

## Logging

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `IDENTITY_LOG_APPENDER=Stackdriver` on Identity.
