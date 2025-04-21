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

## Camunda Identity SDK configuration

Below, find the names and values for the Identity SDK to ensure proper authentication and authorization with Identity and the Identity provider for all components.

| Environment variable                | Property                              | Description                                                                                                                           | Default value                 |
| ----------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `CAMUNDA_IDENTITY_ISSUERBACKENDURL` | `camunda.identity.issuer-backend-url` | The back-channel URL to the Identity provider, used for token verification.                                                           | -                             |
| `CAMUNDA_IDENTITY_AUDIENCE`         | `camunda.identity.audience`           | The required audience of the auth token.                                                                                              | -                             |
| `CAMUNDA_IDENTITY_TYPE`             | `camunda.identity.type`               | Define what kind of authentication type you will use (`KEYCLOAK`, `MICROSOFT`, `GENERIC`).                                            | `KEYCLOAK`                    |
| `CAMUNDA_IDENTITY_BASEURL`          | `camunda.identity.base-url`           | The base URL of the Camunda Identity instance.                                                                                        | -                             |
| `CAMUNDA_IDENTITY_ISSUER`           | `camunda.identity.issuer`             | The front-channel URL to the Identity provider, used for login redirect and fetching refresh tokens.                                  | -                             |
| `CAMUNDA_IDENTITY_JWKSURL`          | `camunda.identity.jwks-url`           | Defines the JWKS URL, which is used by the services to validate the JWT tokens. If nothing is set, it will use the WellKnownEndpoint. | -                             |
| `CAMUNDA_IDENTITY_CLIENTID`         | `camunda.identity.client-id`          | Defines the client ID, which is used by Zeebe in authentication flows.                                                                | -                             |
| `CAMUNDA_IDENTITY_CLIENTSECRET`     | `camunda.identity.client-secret`      | The client secret for the Identity client.                                                                                            | -                             |
| `CAMUNDA_IDENTITY_AUTHSCOPES`       | `camunda.identity.auth-scopes`        | defines the scopes that should be applied to the token, provided as list separated by spaces                                          | `openid email offline_access` |

## License configuration

import Licensing from '../../../self-managed/react-components/licensing.md'

<Licensing/>

## OIDC configuration

Claims are name/value pairs used to represent an individual identity. Configure your initial claim and value to match the claim used with your OIDC provider. For example, to use your Microsoft Entra unique account ID, set `IDENTITY_INITIAL_CLAIM_NAME` to `oid`, and `IDENTITY_INITIAL_CLAIM_VALUE` to the ID.

:::note
Once set, you cannot update your initial claim name and value using environment or Helm values. You must change these values directly in the database.
:::

| Environment variable           | Description                                                                                                                                     | Default value |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `IDENTITY_INITIAL_CLAIM_NAME`  | The type of claim to use for the initial user. Examples can include `oid`, `name` or `email`.                                                   | `oid`         |
| `IDENTITY_INITIAL_CLAIM_VALUE` | The value of the claim to use for the initial user. For the default `oid`, the value usually corresponds to the unique ID of your user account. |               |

## Component configuration

Identity supports component configuration using preset values. To configure a
component for use within Identity, set two variables:

| Environment variable                  | Description                                     | Default value |
| ------------------------------------- | ----------------------------------------------- | ------------- |
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

Identity requires a database to store information
about [resource authorization](/self-managed/concepts/access-control/resource-authorizations.md)
and [multi-tenancy](/self-managed/concepts/multi-tenancy.md).

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

| Environment variable           | Description                                                     | Default value |
| ------------------------------ | --------------------------------------------------------------- | ------------- |
| `RESOURCE_PERMISSIONS_ENABLED` | Controls the resource authorizations feature.                   | `false`       |
| `USER_RESTRICTIONS_ENABLED`    | Controls the user task access restrictions feature in Tasklist. | `true`        |

:::note
Setting either of the feature flags to `true` requires a database connection. To configure a database
connection, see [database configuration](#database-configuration).
:::

## Multi-tenancy

Multi-tenancy in the context of Camunda 8 refers to the ability of Camunda 8 to serve multiple distinct tenants or clients within a single installation. For more information, including additional configuration requirements, see the [multi-tenancy documentation](/docs/self-managed/operational-guides/configure-multi-tenancy.md).

The following configuration is required to enable multi-tenancy in Identity:

| Environment variable   | Description                                                                                                               | Default value |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `MULTITENANCY_ENABLED` | Controls the multi-tenancy feature within Identity. This can be set in helm via `camunda.tasklist.multi-tenancy.enabled`. | `false`       |

With multi-tenancy enabled, the following variables can be used to configure additional [tenants](/self-managed/identity/user-guide/tenants/managing-tenants.md). To add additional tenants, increment the `0` value for each variable (for example, `IDENTITY_TENANTS_1_NAME`).

| Environment variable                         | Description                                                                                                                                                                                                                                        | Default value |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `IDENTITY_TENANTS_0_NAME`                    | A human-readable name for the tenant.                                                                                                                                                                                                              | Default       |
| `IDENTITY_TENANTS_0_TENANTID`                | The tenant ID. The `<default>` tenant is automatically created during Identity startup.                                                                                                                                                            | `<default>`   |
| `IDENTITY_TENANTS_0_MEMBERS_0_TYPE`          | The type of member to add to the tenant, one of `GROUP`, `USER`, or `APPLICATION`. Additional members can be added by incrementing the second `0` value (for example, `IDENTITY_TENANTS_0_MEMBERS_1_TYPE`.)                                        | `APPLICATION` |
| `IDENTITY_TENANTS_0_MEMBERS_0_APPLICATIONID` | If adding an **application** as a member of the tenant, the application ID. If additional members have been added to the tenant, ensure the second `0` value matches that of its type (for example, `IDENTITY_TENANTS_0_MEMBERS_1_APPLICATIONID`). | `zeebe`       |
| `IDENTITY_TENANTS_0_MEMBERS_0_USERNAME`      | If adding a **user** as a member of the tenant, the username. If additional members have been added to the tenant, ensure the second `0` value matches that of its type (for example, `IDENTITY_TENANTS_0_MEMBERS_1_USERNAME`).                    | `user-name`   |
| `IDENTITY_TENANTS_0_MEMBERS_0_GROUPNAME`     | If adding a **group** as a member of the tenant, the name of the group. If additional members have been added to the tenant, ensure the second `0` value matches that of its type (for example, `IDENTITY_TENANTS_0_MEMBERS_1_GROUPNAME`).         | `group-name`  |
| `IDENTITY_ENVIRONMENT_TENANTS_0_NAME`        | Needs description.                                                                                                                                                                                                                                 | Default       |
| `IDENTITY_ENVIRONMENT_TENANTS_0_TENANTID`    | Needs description.                                                                                                                                                                                                                                 | `<default>`   |

When converting the above variables for use in the Helm chart, ensure multiple tenants or members are added as a list. For example, a valid `application.yaml` configuration might look like the following:

```
identity:
   tenants:
    - name: Tenant Name
      tenantId: tenant-name
      members:
        - type: GROUP
          group-name: "Test Group"
        - type: USER
          username: test-user
        - type: APPLICATION
          application-id: test-application
```

## Configure applications

The following variables can be used to configure [applications](/self-managed/identity/user-guide/additional-features/incorporate-applications.md). To add additional applications, increment the `0` value for each variable (for example, `KEYCLOAK_CLIENTS_1_NAME`).

| Environment variable                                  | Description                                                           | Default value            |
| ----------------------------------------------------- | --------------------------------------------------------------------- | ------------------------ |
| `KEYCLOAK_CLIENTS_0_NAME`                             | A human-readable name for the client.                                 | zeebe                    |
| `KEYCLOAK_CLIENTS_0_ID`                               | The client ID.                                                        | `${ZEEBE_CLIENT_ID}`     |
| `KEYCLOAK_CLIENTS_0_SECRET`                           | The client secret.                                                    | `${ZEEBE_CLIENT_SECRET}` |
| `KEYCLOAK_CLIENTS_0_TYPE`                             | The type of client, one of `CONFIDENTIAL`, `PUBLIC`, or `M2M`.        | `M2M`                    |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_0_RESOURCE_SERVER_ID` | The ID of the first resource that defined permissions will apply to.  | `zeebe-api`              |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_0_DEFINITION`         | The permissions to apply to the first resource.                       | `write:*`                |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_1_RESOURCE_SERVER_ID` | The ID of the second resource that defined permissions will apply to. | `operate-api`            |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_1_DEFINITION`         | The permissions to apply to the second resource.                      | `write:*`                |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_2_RESOURCE_SERVER_ID` | The ID of the third resource that defined permissions will apply to.  | `tasklist-api`           |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_2_DEFINITION`         | The permissions to apply to the third resource.                       | `write:*`                |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_3_RESOURCE_SERVER_ID` | The ID of the fourth resource that defined permissions will apply to. | `optimize-api`           |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_3_DEFINITION`         | The permissions to apply to the fourth resource.                      | `write:*`                |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_4_RESOURCE_SERVER_ID` | The ID of the fifth resource that defined permissions will apply to.  | `tasklist-api`           |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_4_DEFINITION`         | The permissions to apply to the fifth resource.                       | `read:*`                 |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_5_RESOURCE_SERVER_ID` | The ID of the sixth resource that defined permissions will apply to.  | `operate-api`            |
| `KEYCLOAK_CLIENTS_0_PERMISSIONS_5_DEFINITION`         | The permissions to apply to the sixth resource.                       | `read:*`                 |

When converting the above variables for use in the Helm chart, ensure multiple clients or permissions are added as a list. For example, a valid `application.yaml` configuration might look like the following:

```
keycloak:
  clients:
    - name: "Test Application"
      id: test-application
      secret: your-secret
      type: M2M
      permissions:
        - resource-server-id: zeebe-api
          definition: write:*
```

## Logging

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `IDENTITY_LOG_APPENDER=Stackdriver` on Identity.
