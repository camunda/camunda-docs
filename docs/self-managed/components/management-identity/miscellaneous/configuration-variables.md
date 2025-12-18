---
id: configuration-variables
title: "Configuration variables"
sidebar_label: "Configuration variables"
description: "Learn more about core configuration, component configuration, database configuration, and feature flags."
---

As a Spring Boot application, Identity supports any standard [Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.

## Core configuration

The core configuration variables are as follows:

| Environment variable                 | Description                                                                         | Default value                                                                                                                                                            |
| :----------------------------------- | :---------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

## Camunda Identity SDK configuration

Use the following names and values for the Identity SDK to ensure proper authentication and authorization with Identity and the IdP for all components.

| Environment variable                 | Property                                | Description                                                                                                                           | Default value                 |
| :----------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `CAMUNDA_IDENTITY_ISSUERBACKENDURL`  | `camunda.identity.issuer-backend-url`   | The back-channel URL to the Identity provider, used for token verification.                                                           | -                             |
| `CAMUNDA_IDENTITY_AUDIENCE`          | `camunda.identity.audience`             | The required audience of the auth token.                                                                                              | -                             |
| `CAMUNDA_IDENTITY_TYPE`              | `camunda.identity.type`                 | Define what kind of authentication type you will use (`KEYCLOAK`, `MICROSOFT`, `GENERIC`).                                            | `KEYCLOAK`                    |
| `CAMUNDA_IDENTITY_BASEURL`           | `camunda.identity.base-url`             | The base URL of the Camunda Identity instance.                                                                                        | -                             |
| `CAMUNDA_IDENTITY_ISSUER`            | `camunda.identity.issuer`               | The front-channel URL to the Identity provider, used for login redirect, fetching refresh tokens and logout.                          | -                             |
| `CAMUNDA_IDENTITY_JWKSURL`           | `camunda.identity.jwks-url`             | Defines the JWKS URL, which is used by the services to validate the JWT tokens. If nothing is set, it will use the WellKnownEndpoint. | -                             |
| `CAMUNDA_IDENTITY_CLIENTID`          | `camunda.identity.client-id`            | Defines the client ID, which is used by Zeebe in authentication flows.                                                                | -                             |
| `CAMUNDA_IDENTITY_CLIENTSECRET`      | `camunda.identity.client-secret`        | The client secret for the Identity client.                                                                                            | -                             |
| `CAMUNDA_IDENTITY_AUTHSCOPES`        | `camunda.identity.auth-scopes`          | Defines the scopes that should be applied to the token, provided as list separated by spaces.                                         | `openid email offline_access` |
| `CAMUNDA_IDENTITY_USEBACKENDAUTHURL` | `camunda.identity.use-backend-auth-url` | Whether the fetching refresh tokens and logout will be performed against the `issuer` or the `issuer-backend-url`.                    | `false`                       |
| `CAMUNDA_IDENTITY_CLOCKSKEW`         | `camunda.identity.clock-skew`           | Sets the allowed clock skew when validating JWT issuance and expiration. Format: ISO 8601                                             | `60S`                         |

## License configuration

See [licensing](/self-managed/components/orchestration-cluster/core-settings/configuration/licensing.md).

## OIDC configuration

Claims are name/value pairs used to represent an individual identity. Configure your initial claim and value to match the claim used with your OIDC provider.

For example, to use your Microsoft Entra unique account ID, set `IDENTITY_INITIAL_CLAIM_NAME` to `oid`, and `IDENTITY_INITIAL_CLAIM_VALUE` to the ID.

:::caution
Once set, you cannot update your initial claim name and value using environment or Helm values. You must change these values directly in the database.
:::

| Environment variable           | Description                                                                                                                                     | Default value |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `IDENTITY_INITIAL_CLAIM_NAME`  | The type of claim to use for the initial user. Examples can include `oid`, `name` or `email`.                                                   | `oid`         |
| `IDENTITY_INITIAL_CLAIM_VALUE` | The value of the claim to use for the initial user. For the default `oid`, the value usually corresponds to the unique ID of your user account. |               |

## Component configuration

Identity supports component configuration using preset values. To configure a
component for use within Identity, set two variables:

| Environment variable                  | Description                                     | Default value |
| :------------------------------------ | :---------------------------------------------- | :------------ |
| `KEYCLOAK_INIT_<COMPONENT>_SECRET`    | The secret used for authentication flows.       | No default    |
| `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL`  | The root URL of where the component is hosted.  | No default    |
| `KEYCLOAK_INIT_<COMPONENT>_CLIENT_ID` | The client to create and use for the component. | `<COMPONENT>` |

:::note
Identity supports the following values for the `<COMPONENT>` placeholder: `OPERATE`, `OPTIMIZE`, `TASKLIST`,
and `WEBMODELER`.

For the `WEBMODELER` value, only the `KEYCLOAK_INIT_<COMPONENT>_ROOT_URL` variable is required to be set.

For the `KEYCLOAK_INIT_<COMPONENT>_CLIENT_ID` value, the default is the component name in lowercase except
for `WEBMODELER`, which is`web-modeler`.
:::

## Database configuration

Identity requires a database to store information about resource authorization and [multi-tenancy](/components/concepts/multi-tenancy.md).

| Environment variable         | Description                                         |
| :--------------------------- | :-------------------------------------------------- |
| `IDENTITY_DATABASE_HOST`     | The host of the database.                           |
| `IDENTITY_DATABASE_PORT`     | The port of the database.                           |
| `IDENTITY_DATABASE_NAME`     | The name of the database to connect to.             |
| `IDENTITY_DATABASE_USERNAME` | The username of a user with access to the database. |
| `IDENTITY_DATABASE_PASSWORD` | The password of a user with access to the database. |

:::note
There are no default values for the variables above. See
[supported environments](/reference/supported-environments.md#camunda-platform-8-self-managed) for a list of
supported databases. You may also review the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
:::

### Running Identity on Amazon Aurora PostgreSQL

Identity supports running on Amazon Aurora PostgreSQL.
To connect Identity with your Amazon Aurora PostgreSQL instance, make the following configuration adjustments:

1. Modify the `SPRING_DATASOURCE_URL` environment
   variable: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]`.
2. Add the environment variable `SPRING_DATASOURCE_DRIVER_CLASS_NAME` with the value `software.amazon.jdbc.Driver`.

For a full list of available driver parameters visit
the [AWS JDBC Driver documentation](https://github.com/awslabs/aws-advanced-jdbc-wrapper/wiki/UsingTheJdbcDriver#aws-advanced-jdbc-driver-parameters).

#### AWS IAM authentication

To use AWS Identity and Access Management (IAM) database authentication with your Amazon Aurora PostgreSQL
instance, in addition to the adjustments described [above](#running-identity-on-amazon-aurora-postgresql), follow these
steps:

1. Modify the `SPRING_DATASOURCE_URL` environment variable as
   follows: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam`.
2. Modify the `SPRING_DATASOURCE_USERNAME` environment variable to match the database user you configured for AWS IAM
   authentication as described in
   the [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).
3. Remove the `SPRING_DATASOURCE_PASSWORD` environment variable.

## Feature flags

Identity uses feature flag environment variables to enable and disable features; the supported flags are:

| Environment variable         | Description                                      | Default value |
| :--------------------------- | :----------------------------------------------- | :------------ |
| RESOURCE_PERMISSIONS_ENABLED | Controls the resource authorizations feature.    | false         |
| MULTITENANCY_ENABLED         | Controls the multi-tenancy feature for Optimize. | false         |

:::note
Setting either of the feature flags to `true` requires a database connection. To configure a database
connection, see [database configuration](#database-configuration).
:::

## Logging

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `IDENTITY_LOG_APPENDER=Stackdriver` on Identity.
