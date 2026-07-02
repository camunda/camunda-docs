---
id: properties
title: "Property reference"
description: "Read details on the configuration variables of Camunda Hub Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda Hub Self-Managed consists of two components: [`restapi`](#configuration-of-the-restapi-component) and [`websocket`](#configuration-of-the-websocket-component).
Each component is configured separately as described below.

- The `restapi` component is a Spring Boot application. Its configuration is stored in a YAML file (`application.yml`) by default. All Camunda Hub-specific settings are prefixed with `camunda.modeler`.
- The `websocket` (PHP/Laravel) component is configured via environment variables.

:::note Configuration methods
The two components support configuration through environment variables.
For the `restapi` component, environment variables can be used as an alternative to `application.yml` following [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables): convert the property to uppercase, remove any dashes, and replace any delimiters (`.`) with `_`.

For example, the property `camunda.modeler.clusters[0].name` is represented by the environment variable `CAMUNDA_MODELER_CLUSTERS_0_NAME`.

If you are using the Camunda 8 Helm chart, read more about the different configuration options in the chart's [Helm chart values documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).
You can pass environment variables to each component via `webModeler.restapi.env` and `webModeler.websocket.env` in your `values.yaml`.
:::

For a working example configuration showing how the components are correctly wired together, see the [Docker Compose file for Web Modeler](/self-managed/quickstart/developer-quickstart/docker-compose.md).

## Licensing

import Licensing from '../../../../self-managed/react-components/licensing.md'

<Licensing/>

## Configuration of the `restapi` component

As a Spring Boot application, the `restapi` component supports any standard [Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.

The examples below show configuration in two formats:

- **Environment variables** – suitable for Docker Compose or direct shell usage.
- **`application.yml`** – the native Spring Boot configuration file format.

:::tip Passing JVM options
When running the `restapi` component in a container (Docker / Kubernetes), use the `JAVA_TOOL_OPTIONS` environment variable to pass JVM arguments, for example for trust store settings or proxy configuration.
:::

### General

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler.server:
  url: https://modeler.example.com # or https://example.com/modeler
  https-only: true # optional, default: true

server:
  servlet:
    context-path: /modeler # optional; required if server-url does not point to root path
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable         | Description                                                                                                                                                   | Example value                                                    | Default value |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- |
| `RESTAPI_SERVER_URL`         | URL at which users access Camunda Hub in the browser (used to construct redirect URLs in the client-side login flow as well as links in notification emails). | `https://modeler.example.com`,<br/>`https://example.com/modeler` | -             |
| `SERVER_SERVLET_CONTEXTPATH` | [optional]<br/>Context path of the URL. Must be set if `RESTAPI_SERVER_URL` does not point to the root path of a (sub-)domain.                                | `/modeler`                                                       | -             |
| `SERVER_HTTPS_ONLY`          | [optional]<br/>Enforce the usage of HTTPS when users access Camunda Hub (by redirecting from `http://` to `https://`).                                        | `true`                                                           | `true`        |

</TabItem>
</Tabs>

### Clusters

To show your Orchestration Clusters in Camunda Hub, use the following configuration options available from Camunda 8.10. If you're migrating from an older version of Camunda Self-Managed, refer to the deprecated [legacy configurations](./legacy-cluster-config.md) and the [migration guide](../../../upgrade/components/890-to-8100.md#camunda-hub).

:::note
Only Web Modeler admins (users with the [`admin:*` permission](/self-managed/components/management-identity/access-management/access-management-overview.md#permissions)) can access the cluster pages in Camunda Hub.
:::

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

| Property                                             | Description                                                                                                         | Example value                                |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| `camunda.modeler.clusters[0].id`                     | An identifier for the cluster.                                                                                      | `camunda-platform`                           |
| `camunda.modeler.clusters[0].name`                   | A readable name for the cluster.                                                                                    | `Camunda Platform`                           |
| `camunda.modeler.clusters[0].version`                | The cluster version.                                                                                                | `8.10.0`                                     |
| `camunda.modeler.clusters[0].tags`                   | A list of tags.                                                                                                     | `['dev', 'test']`                            |
| `camunda.modeler.clusters[0].authentication`         | The [authentication method](#available-authentication-methods).                                                     | `BEARER_TOKEN`                               |
| `camunda.modeler.clusters[0].authorizations.enabled` | Enables or disables authorizations for the cluster. If enabled, users see a hint when they deploy from Camunda Hub. | `true`                                       |
| `camunda.modeler.clusters[0].custom-properties`      | A list of custom properties.                                                                                        | See [custom properties](#custom-properties). |
| `camunda.modeler.clusters[0].components`             | A list of components for the clusters.                                                                              | See [components](#components).               |

</TabItem>
<TabItem value="env" label="Environment variables">

| Environment variable                                | Description                                                                                                         | Example value                                |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_ID`                     | An identifier for the cluster.                                                                                      | `camunda-platform`                           |
| `CAMUNDA_MODELER_CLUSTERS_0_NAME`                   | A readable name for the cluster.                                                                                    | `Camunda Platform`                           |
| `CAMUNDA_MODELER_CLUSTERS_0_VERSION`                | The cluster version.                                                                                                | `8.10.0`                                     |
| `CAMUNDA_MODELER_CLUSTERS_0_TAGS`                   | A list of tags.                                                                                                     | `['dev', 'test']`                            |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION`         | The [authentication method](#available-authentication-methods).                                                     | `BEARER_TOKEN`                               |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHORIZATIONS_ENABLED` | Enables or disables authorizations for the cluster. If enabled, users see a hint when they deploy from Camunda Hub. | `true`                                       |
| `CAMUNDA_MODELER_CLUSTERS_0_CUSTOM_PROPERTIES`      | A list of custom properties.                                                                                        | See [custom properties](#custom-properties). |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS`             | A list of components for the cluster.                                                                               | See [components](#components).               |

</TabItem>
</Tabs>

#### Available authentication methods

Clusters must be configured using the following options to access the cluster from within Camunda Hub:

| Method         | Description                                                                                                                             | When to use?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BEARER_TOKEN` | Camunda Hub sends the authenticated user's token in the `Authorization` header with every request to the cluster.                       | **Cluster version >= 8.8**<br/>The cluster uses [OIDC authentication](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md) with the same identity provider as Camunda Hub.<br/>_Note_: You need to ensure that the cluster [accepts Camunda Hub's token audience](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md#step-4-configure-the-oidc-connection-details).<br/><br/>**Cluster version < 8.8**<br/>The cluster uses [Camunda Identity-based authentication](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization) and the external identity provider supports access tokens with multiple audiences (example provider: Keycloak).<br/>_Note_: For the token to be accepted by the different cluster components, it must contain each component's audience. |
| `BASIC`        | Camunda Hub sends a username and password with every request to the cluster. The credentials have to be provided by the user in the UI. | **Cluster version >= 8.8**<br/>The cluster uses Basic authentication.<br/><br/>**Cluster version < 8.8**<br/>not supported<br/><br/>**Console limitation**<br/>Console pages in Camunda Hub don't support clusters configured with Basic authentication. Console requests to the Orchestration Cluster are made automatically in the background, so there is no UI to collect credentials. Clusters using Basic authentication _will not work correctly_ with Console functionality.<br/>                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `NONE`         | Camunda Hub does not send any authentication information.                                                                               | **Cluster version >= 8.8**<br/>The cluster API is [configured as unprotected](/self-managed/components/orchestration-cluster/admin/overview.md#enable-api-authentication-and-authorizations) and can be used without authentication.<br/><br/>**Cluster version < 8.8**<br/>The authentication / token validation in the Zeebe Gateway is [disabled](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization).                                                                                                                                                                                                                                                                                                                                                                                                                                       |

#### Custom properties

Use custom properties to include helpful links in the **Clusters** user interface:

<Tabs groupId="configType" className="tabs-hidden" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

| Property                                                         | Description                           |
| :--------------------------------------------------------------- | :------------------------------------ |
| `camunda.modeler.clusters[0].custom-properties[0].description`   | A description of the custom property. |
| `camunda.modeler.clusters[0].custom-properties[0].links`         | A list of links.                      |
| `camunda.modeler.clusters[0].custom-properties[0].links[0].name` | A name for the link.                  |
| `camunda.modeler.clusters[0].custom-properties[0].links[0].url`  | The link's URL.                       |

Example configuration:

```yaml
camunda:
  modeler:
    clusters:
      - id: camunda-platform
        # other fields...
        custom-properties:
          - description: This is the integration environment for the Camunda platform.
            links:
              - name: Camunda
                url: https://camunda.com/
              - name: Documentation
                url: https://docs.camunda.io/
```

</TabItem>
<TabItem value="env" label="Environment variables">

| Environment variable                                          | Description                           |
| :------------------------------------------------------------ | :------------------------------------ |
| `CAMUNDA_MODELER_CLUSTERS_0_CUSTOM_PROPERTIES_0_DESCRIPTION`  | A description of the custom property. |
| `CAMUNDA_MODELER_CLUSTERS_0_CUSTOM_PROPERTIES_0_LINKS_0_NAME` | A name for the indexed link.          |
| `CAMUNDA_MODELER_CLUSTERS_0_CUSTOM_PROPERTIES_0_LINKS_0_URL`  | The link's URL.                       |

Example configuration:

```bash
CAMUNDA.MODELER.CLUSTERS_0_CUSTOM_PROPERTIES_0_DESCRIPTION=This is the integration environment for the Camunda platform.
CAMUNDA.MODELER.CLUSTERS_0_CUSTOM_PROPERTIES_0_LINKS_0_NAME=Camunda
CAMUNDA.MODELER.CLUSTERS_0_CUSTOM_PROPERTIES_0_LINKS_0_URL=https://camunda.com/
```

</TabItem>
</Tabs>

#### Components

<Tabs groupId="configType" className="tabs-hidden" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

Use `components` to set up components in the cluster:

| Property                                                   | Description                                                                                                  |
| :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `camunda.modeler.clusters[0].components[0].name`           | The component's name.                                                                                        |
| `camunda.modeler.clusters[0].components[0].type`           | The component's type.                                                                                        |
| `camunda.modeler.clusters[0].components[0].version`        | The component's version.                                                                                     |
| `camunda.modeler.clusters[0].components[0].urls.webapp`    | The API base URL for all components with a web app: Admin, Management Identity, Optimize, Tasklist, Operate. |
| `camunda.modeler.clusters[0].components[0].urls.rest`      | The REST API base URL for Connectors and the Orchestration Cluster.                                          |
| `camunda.modeler.clusters[0].components[0].urls.grpc`      | The [address](#notes-on-host-names-and-port-numbers) of the [Zeebe gRPC API](/apis-tools/zeebe-api/grpc.md). |
| `camunda.modeler.clusters[0].components[0].urls.readiness` | The address of the health check endpoint.                                                                    |

</TabItem>
<TabItem value="env" label="Environment variables">

Use `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS` to set up components in the cluster:

| Environment variable                                     | Description                                                                                                  |
| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_NAME`           | The component's name.                                                                                        |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_TYPE`           | The component's type.                                                                                        |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_VERSION`        | The component's version.                                                                                     |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_WEBAPP`    | The API base URL for all components with a web app: Admin, Management Identity, Optimize, Tasklist, Operate. |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_REST`      | The REST API base URL for Connectors and the Orchestration Cluster.                                          |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_GRPC`      | The [address](#notes-on-host-names-and-port-numbers) of the [Zeebe gRPC API](/apis-tools/zeebe-api/grpc.md). |
| `CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_READINESS` | The address of the health check endpoint.                                                                    |

</TabItem>
</Tabs>

Available component types and requirements:

| Configuration value | Component             | Requirements                                   |
| :------------------ | :-------------------- | :--------------------------------------------- |
| `connectors`        | Connectors            | REST URL                                       |
| `identity`          | Management Identity   | -                                              |
| `hub`               | Camunda Hub           | -                                              |
| `operate`           | Operate               | -                                              |
| `optimize`          | Optimize              | -                                              |
| `orchestration`     | Orchestration Cluster | Cluster version >= 8.8, gRPC URL, and REST URL |
| `admin`             | Admin                 | -                                              |
| `tasklist`          | Tasklist              | -                                              |
| `zeebe`             | Zeebe Broker          | Cluster version < 8.8, gRPC URL, and REST URL  |
| `zeebeGateway`      | Zeebe Gateway         | Cluster version < 8.8                          |

:::note Backwards compatibility
The old values `webModelerWebApp` (replaced by `hub`) and `orchestrationIdentity` (replaced by `admin`) are still accepted for backwards compatibility.
:::

Example configuration:

<Tabs groupId="configType" className="tabs-hidden" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  modeler:
    clusters:
      - id: camunda-platform
        # other fields...
        components:
          - name: "Orchestration Cluster"
            type: "orchestration"
            version: "8.10-SNAPSHOT"
            urls:
              grpc: "grpcs://camunda.example.com:26500"
              rest: "https://camunda.example.com"
              readiness: "https://camunda.example.com:9600/core/actuator/health/readiness"
          - name: "Orchestration Admin"
            type: "admin"
            version: "8.10-SNAPSHOT"
            urls:
              webapp: "https://camunda.example.com"
              readiness: "https://camunda.example.com:9600/core/actuator/health/readiness"
```

</TabItem>
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_NAME='Orchestration Cluster'
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_TYPE=orchestration
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_VERSION=8.10-SNAPSHOT
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_GRPC=grpcs://camunda.example.com:26500
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_REST=https://camunda.example.com
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_0_URLS_READINESS=https://camunda.example.com:9600/core/actuator/health/readiness

CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_1_NAME='Orchestration Admin'
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_1_TYPE=admin
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_1_VERSION=8.10-SNAPSHOT
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_1_URLS_WEBAPP=https://camunda.example.com
CAMUNDA_MODELER_CLUSTERS_0_COMPONENTS_1_URLS_READINESS=https://camunda.example.com:9600/core/actuator/health/readiness
```

</TabItem>
</Tabs>

### Database

Camunda Hub currently supports PostgreSQL, Oracle, Microsoft SQL Server (MSSQL), MySQL, MariaDB, and H2 as persistent data storage.

:::info Oracle and MySQL driver
The Oracle and MySQL drivers are not provided by default and must be downloaded and supplied for the application to load.
Refer to the [Oracle](database.md#oracle) and [MySQL](database.md#mysql) database configuration section for details.
:::

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
spring:
  datasource:
    url: jdbc:postgresql://postgres.example.com:5432/modeler-db
    username: modeler-user
    password: "***"
    # driver-class-name: software.amazon.jdbc.Driver  # optional
    hikari:
      schema: custom_schema # optional; only supported for PostgreSQL
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                  | Description                                                                                                                                                                                                                                                                                                        | Example value                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `SPRING_DATASOURCE_URL`               | JDBC URL of the database                                                                                                                                                                                                                                                                                           | `jdbc:postgresql://postgres.example.com:5432/modeler-db` |
| `SPRING_DATASOURCE_USERNAME`          | Database user name                                                                                                                                                                                                                                                                                                 | `modeler-user`                                           |
| `SPRING_DATASOURCE_PASSWORD`          | Database user password                                                                                                                                                                                                                                                                                             | \*\*\*                                                   |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | [optional]<br/>Java class name of the database driver                                                                                                                                                                                                                                                              | `software.amazon.jdbc.Driver`                            |
| `SPRING_DATASOURCE_HIKARI_SCHEMA`     | [optional; only supported for PostgreSQL]<br/>Database schema.<br/>Defaults to the default schema of the database user (usually `public`) if not set.<br/>Refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) for naming restrictions. | `custom_schema`                                          |

</TabItem>
</Tabs>

Refer to the [Advanced Database Configuration Guide](./database.md) for additional details on how to configure Camunda Hub's database connection.

### SMTP / email

Camunda Hub requires an SMTP server to send notification emails to users.

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler.mail:
  from-address: noreply@example.com
  from-name: Camunda # optional, default: Camunda

spring:
  mail:
    host: smtp.example.com
    port: 587
    user: modeler-user # optional
    password: "***" # optional
    properties:
      mail.smtp.auth: true # set to true if user and password are provided
      mail.smtp.starttls.enable: true # default: true; set to false to disable STARTTLS encryption
      mail.smtp.starttls.required: true # default: true; set to false to avoid enforcing STARTTLS
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable        | Description                                                                | Example value         | Default value |
| --------------------------- | -------------------------------------------------------------------------- | --------------------- | ------------- |
| `RESTAPI_MAIL_HOST`         | SMTP server host name                                                      | `smtp.example.com`    | -             |
| `RESTAPI_MAIL_PORT`         | SMTP server port                                                           | `587`                 | -             |
| `RESTAPI_MAIL_USER`         | [optional]<br/>SMTP user name                                              | `modeler-user`        | -             |
| `RESTAPI_MAIL_PASSWORD`     | [optional]<br/>SMTP user password                                          | \*\*\*                | -             |
| `RESTAPI_MAIL_ENABLE_TLS`   | Enforce TLS encryption for SMTP connections (using STARTTLS).              | `true`                | `true`        |
| `RESTAPI_MAIL_FROM_ADDRESS` | Email address used as the sender of emails sent by Camunda Hub.            | `noreply@example.com` | -             |
| `RESTAPI_MAIL_FROM_NAME`    | [optional]<br/>Name displayed as the sender of emails sent by Camunda Hub. | `Camunda`             | `Camunda`     |

</TabItem>
</Tabs>

### WebSocket

Camunda Hub uses a [WebSocket server](#configuration-of-the-websocket-component) to send events (e.g. "file updated", "comment added", "user opened diagram") between the backend and the client application in the browser.
This enables features like real-time notifications and immediate UI updates.

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler:
  pusher:
    host: modeler-websockets
    port: 8060 # default: 8060
    app-id: web-modeler
    key: "***"
    secret: "***"
    client:
      host: ws.example.com
      port: 443 # default: 80
      path: /modeler-ws # optional, default: /
      force-tls: true # default: false
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable      | Description                                                                                                                                   | Example value        | Default value |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_PUSHER_HOST`     | [Internal](#notes-on-host-names-and-port-numbers) host name of the WebSocket server.                                                          | `modeler-websockets` | -             |
| `RESTAPI_PUSHER_PORT`     | [Internal](#notes-on-host-names-and-port-numbers) port number of the WebSocket server.                                                        | `8060`               | `8060`        |
| `RESTAPI_PUSHER_APP_ID`   | _must be the same as_ [`PUSHER_APP_ID`](#configuration-of-the-websocket-component)                                                            | `web-modeler`        | -             |
| `RESTAPI_PUSHER_KEY`      | _must be the same as_ [`PUSHER_APP_KEY`](#configuration-of-the-websocket-component)                                                           | \*\*\*               | -             |
| `RESTAPI_PUSHER_SECRET`   | _must be the same as_ [`PUSHER_APP_SECRET`](#configuration-of-the-websocket-component)                                                        | \*\*\*               | -             |
| `CLIENT_PUSHER_HOST`      | [External](#notes-on-host-names-and-port-numbers) host name on which the Camunda Hub client accesses the WebSocket server from the browser.   | `ws.example.com`     | -             |
| `CLIENT_PUSHER_PORT`      | [External](#notes-on-host-names-and-port-numbers) port number on which the Camunda Hub client accesses the WebSocket server from the browser. | `443`                | `80`          |
| `CLIENT_PUSHER_PATH`      | [optional]<br/>_must be the same as_ [`PUSHER_APP_PATH`](#configuration-of-the-websocket-component)                                           | `/modeler-ws`        | `/`           |
| `CLIENT_PUSHER_FORCE_TLS` | Enable TLS encryption for WebSocket connections initiated by the browser.                                                                     | `true`               | `false`       |

</TabItem>
</Tabs>

### Identity / Keycloak

Camunda Hub uses Keycloak as the default authentication provider (using OAuth 2.0 + OpenID Connect) and integrates with [Management Identity](/self-managed/components/management-identity/overview.md) for user management and authorization (see [Manage access and permissions](/self-managed/components/management-identity/access-management/access-management-overview.md)).

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  identity:
    base-url: http://identity:8080
    issuer-backend-url: http://keycloak:18080/auth/realms/camunda-platform # optional

  modeler:
    security:
      jwt:
        issuer:
          backend-url: http://keycloak:18080/auth/realms/camunda-platform # optional
        audience:
          internal-api: web-modeler-api # default: web-modeler-api
          public-api: web-modeler-public-api # default: web-modeler-public-api
    oauth2:
      client-id: web-modeler
      client:
        fetch-request-credentials: include # optional
        scope: openid email profile # optional
      token.username-claim: name # optional, default: name

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://keycloak.example.com/auth/realms/camunda-platform
          jwk-set-uri: https://keycloak.example.com/auth/realms/camunda-platform/protocol/openid-connect/certs # optional
          jws-algorithms: ES256 # optional
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                                       | Description                                                                                                                                                                                                                                                                             | Example value                                                                             | Default value            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------ |
| `CAMUNDA_IDENTITY_BASEURL`                                 | [Internal](#notes-on-host-names-and-port-numbers) base URL of the Identity API (used to fetch user data).                                                                                                                                                                               | `http://identity:8080`                                                                    | -                        |
| `CAMUNDA_MODELER_OAUTH2_TOKEN_USERNAMECLAIM`               | ID token claim used to assign usernames.                                                                                                                                                                                                                                                | `preferred_username`                                                                      | `name`                   |
| `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API`       | Expected value of the audience claim in user access tokens (used for JWT validation).                                                                                                                                                                                                   | `web-modeler-api`                                                                         | `web-modeler-api`        |
| `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_PUBLIC_API`         | Expected value of the audience claim in M2M access tokens required for [Web Modeler's API](/apis-tools/web-modeler-api/authentication.md?environment=self-managed) (used for JWT validation).                                                                                           | `web-modeler-public-api`                                                                  | `web-modeler-public-api` |
| `RESTAPI_OAUTH2_TOKEN_ISSUER_BACKEND_URL`                  | [optional]<br/>[Internal](#notes-on-host-names-and-port-numbers) URL used to request Keycloak's [OpenID Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig); if not set, `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` is used. | `http://keycloak:18080/auth/realms/camunda-platform`                                      | -                        |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI`     | URL of the token issuer (used for JWT validation).                                                                                                                                                                                                                                      | `https://keycloak.example.com/auth/realms/camunda-platform`                               | -                        |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI`    | [optional] URL of the JWK Set endpoint (used for JWT validation). Only necessary if URL cannot be derived from the OIDC configuration endpoint.                                                                                                                                         | `https://keycloak.example.com/auth/realms/camunda-platform/protocol/openid-connect/certs` | -                        |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWS_ALGORITHMS` | [optional] List of trusted JWS algorithms used for JWT validation. Only necessary if the algorithms cannot be derived from the JWK Set response.                                                                                                                                        | `ES256`                                                                                   | -                        |
| `OAUTH2_CLIENT_ID`                                         | Client ID of the Camunda Hub application configured in Identity.                                                                                                                                                                                                                        | `web-modeler`                                                                             | -                        |
| `OAUTH2_CLIENT_SCOPE`                                      | [optional]<br/>OIDC scopes requested during authentication, determining what user information is included in the token.                                                                                                                                                                 | `full`                                                                                    | `openid email profile`   |
| `OAUTH2_CLIENT_FETCH_REQUEST_CREDENTIALS`                  | [optional]<br/>Configuration whether credentials should be sent along with requests to the OIDC provider, see [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#value). Use this if you are using a proxy that requires cookies.                     | `include`                                                                                 | -                        |

</TabItem>
</Tabs>

:::note Helm behavior
The `restapi` component default for `CAMUNDA_MODELER_OAUTH2_TOKEN_USERNAMECLAIM` is `name`.
In Helm-based setups, OIDC configuration commonly uses `preferred_username`, so usernames may appear as email-style identifiers unless you explicitly set `CAMUNDA_MODELER_OAUTH2_TOKEN_USERNAMECLAIM=name` for the Camunda Hub `restapi` environment.
:::

Refer to the [advanced Identity configuration guide](./identity.md) for additional details on how to connect a custom OpenID Connect (OIDC) authentication provider.

### Camunda client

Camunda Hub uses the [Camunda Java client](/apis-tools/java-client/getting-started.md) to connect to Zeebe.
To customize the client configuration, you can provide optional properties.

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  ca-certificate-path: /path/to/certificate # optional
  client:
    config-path: /path/to/credentials/cache.txt # optional; when unset, OAuth credentials are cached in memory only
    request-timeout: 60000 # optional, default: 10000
  auth:
    connect-timeout: 30000 # optional, default: 5000
    read-timeout: 30000 # optional, default: 5000
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable            | Description                                                                                                                            | Example value                    | Default value    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------- |
| `CAMUNDA_CA_CERTIFICATE_PATH`   | [optional]<br/>Path to a root CA certificate to be used instead of the certificate in the default store.                               | `/path/to/certificate`           | -                |
| `CAMUNDA_CLIENT_CONFIG_PATH`    | [optional]<br/>Path to a file used to cache the client's OAuth credentials on disk. When unset, credentials are cached in memory only. | `/path/to/credentials/cache.txt` | _in-memory only_ |
| `CAMUNDA_CLIENT_REQUESTTIMEOUT` | [optional]<br/>The request timeout used when communicating with a target Zeebe cluster.                                                | `60000`                          | `10000`          |
| `CAMUNDA_AUTH_CONNECT_TIMEOUT`  | [optional]<br/>The connection timeout for requests to the OAuth server.                                                                | `30000`                          | `5000`           |
| `CAMUNDA_AUTH_READ_TIMEOUT`     | [optional]<br/>The data read timeout for requests to the OAuth server.                                                                 | `30000`                          | `5000`           |

</TabItem>
</Tabs>

For more details, [see the Zeebe connection troubleshooting section](/self-managed/components/hub/troubleshooting/troubleshoot-zeebe-connection.md).

### Logging

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler.client.logging.level: DEBUG # optional, default: WARN

logging:
  config: file:/full/path/to/custom-log4j2-spring.xml # optional
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                | Description                                                          | Example value                                 | Default value |
| ----------------------------------- | -------------------------------------------------------------------- | --------------------------------------------- | ------------- |
| `LOGGING_CONFIG`                    | [optional]<br/>Path to custom Log4j2 configuration.                  | `file:/full/path/to/custom-log4j2-spring.xml` | -             |
| `CAMUNDA_MODELER_LOG_LEVEL`         | [optional]<br/>Defines the log level for the Camunda Hub components. | `DEBUG`                                       | `INFO`        |
| `CAMUNDA_LOG_FILE_APPENDER_ENABLED` | [optional]<br/>To enable logging to a file.                          | `true`                                        | `false`       |
| `CAMUNDA_MODELER_LOG_APPENDER`      | [optional]<br/>Defines which appender to use for logging.            | `Stackdriver`                                 | `Console`     |
| `LOG_LEVEL_CLIENT`                  | [optional]<br/>Log level for the client.                             | `DEBUG`                                       | `WARN`        |

</TabItem>
</Tabs>

Refer to the [advanced logging configuration guide](./logging.md#logging-configuration-for-the-restapi-component) for additional details on how to customize the `restapi` logging output.

:::info

- For `LOG_LEVEL_*` options, see [understanding log levels](/self-managed/operational-guides/monitoring/log-levels.md#understanding-log-levels).

:::

### SSL

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
server:
  ssl:
    enabled: true # optional, default: false
    certificate: file:/full/path/to/certificate.pem
    certificate-private-key: file:/full/path/to/key.pem

management:
  server:
    ssl:
      enabled: true # optional, default: false
      certificate: file:/full/path/to/certificate.pem
      certificate-private-key: file:/full/path/to/key.pem

camunda.modeler:
  pusher:
    ssl-enabled: true # optional, default: false; enables SSL to the websocket component
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                            | Description                                                                          | Example value                        | Default value |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------ | ------------- |
| `SERVER_SSL_ENABLED`                            | [optional]<br/>Whether to enable SSL support.                                        | `true`                               | `false`       |
| `SERVER_SSL_CERTIFICATE`                        | [optional]<br/>Path to a PEM-encoded SSL certificate file.                           | `file:/full/path/to/certificate.pem` | -             |
| `SERVER_SSL_CERTIFICATE_PRIVATE_KEY`            | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.       | `file:/full/path/to/key.pem`         | -             |
| `MANAGEMENT_SERVER_SSL_ENABLED`                 | [optional]<br/>Whether to enable SSL support for the management server routes.       | `true`                               | `false`       |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE`             | [optional]<br/>Path to a PEM-encoded SSL certificate file.                           | `file:/full/path/to/certificate.pem` | -             |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY` | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.       | `file:/full/path/to/key.pem`         | -             |
| `RESTAPI_PUSHER_SSL_ENABLED`                    | [optional]<br/>Whether to enable communication via SSL to the `websocket` component. | `true`                               | `false`       |

</TabItem>
</Tabs>

Refer to the [advanced SSL configuration guide](./ssl.md) for additional details on how to set up secure connections (incoming & outgoing) to the Camunda Hub components.

### Monitoring and health probes {#monitoring}

The `restapi` component is a Spring Boot application that includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready), providing health check and metrics endpoints out of the box.
These endpoints are served on a separate management port (default: `8091`).

By default, Camunda Hub uses the following actuator configuration:

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
management:
  server:
    port: 8091

  endpoints:
    access:
      default: none
    web:
      exposure:
        include: health, info, prometheus, loggers
      base-path: /
      path-mapping:
        health: health
        prometheus: metrics

  endpoint:
    prometheus:
      access: read-only
    health:
      access: read-only
      probes:
        enabled: true
      # make readiness endpoint additionally available on main server port, so that it gets publicly exposed
      group:
        readiness:
          additional-path: "server:/health"
    info:
      access: read-only
    loggers:
      access: unrestricted
  info:
    git:
      enabled: false

  health:
    defaults:
      enabled: false

  metrics:
    distribution:
      percentiles:
        http.server.requests:
          - 0.5
          - 0.9
          - 0.99
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                                               | Description                                                                                     | Example value        | Default value                       |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| `MANAGEMENT_SERVER_PORT`                                           | [optional]<br/>Port for the management server (health and metrics endpoints).                   | `8091`               | `8091`                              |
| `MANAGEMENT_ENDPOINTS_ACCESS_DEFAULT`                              | [optional]<br/>Default access level for all actuator endpoints.                                 | `read-only`          | `none`                              |
| `MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE`                        | [optional]<br/>Comma-separated list of actuator endpoints to expose over the web.               | `health, prometheus` | `health, info, prometheus, loggers` |
| `MANAGEMENT_ENDPOINTS_WEB_BASE_PATH`                               | [optional]<br/>Base path for all web-exposed actuator endpoints.                                | `/actuator`          | `/`                                 |
| `MANAGEMENT_ENDPOINTS_WEB_PATH_MAPPING_HEALTH`                     | [optional]<br/>Custom path mapping for the health endpoint.                                     | `/health`            | `health`                            |
| `MANAGEMENT_ENDPOINTS_WEB_PATH_MAPPING_PROMETHEUS`                 | [optional]<br/>Custom path mapping for the Prometheus endpoint.                                 | `/prometheus`        | `metrics`                           |
| `MANAGEMENT_ENDPOINT_PROMETHEUS_ACCESS`                            | [optional]<br/>Access level for the Prometheus endpoint.                                        | `unrestricted`       | `read-only`                         |
| `MANAGEMENT_ENDPOINT_HEALTH_ACCESS`                                | [optional]<br/>Access level for the health endpoint.                                            | `unrestricted`       | `read-only`                         |
| `MANAGEMENT_ENDPOINT_HEALTH_PROBES_ENABLED`                        | [optional]<br/>Whether Kubernetes-style readiness and liveness probes are enabled.              | `true`               | `true`                              |
| `MANAGEMENT_ENDPOINT_HEALTH_GROUP_READINESS_ADDITIONAL_PATH`       | [optional]<br/>Expose the readiness probe on an additional path (e.g. on the main server port). | `server:/health`     | `server:/health`                    |
| `MANAGEMENT_ENDPOINT_INFO_ACCESS`                                  | [optional]<br/>Access level for the info endpoint.                                              | `unrestricted`       | `read-only`                         |
| `MANAGEMENT_ENDPOINT_LOGGERS_ACCESS`                               | [optional]<br/>Access level for the loggers endpoint.                                           | `read-only`          | `unrestricted`                      |
| `MANAGEMENT_INFO_GIT_ENABLED`                                      | [optional]<br/>Whether Git info is exposed via the info endpoint.                               | `true`               | `false`                             |
| `MANAGEMENT_HEALTH_DEFAULTS_ENABLED`                               | [optional]<br/>Whether default health indicators are enabled.                                   | `true`               | `false`                             |
| `MANAGEMENT_METRICS_DISTRIBUTION_PERCENTILES_HTTP_SERVER_REQUESTS` | [optional]<br/>Comma-separated list of percentiles to publish for HTTP server request metrics.  | `0.5, 0.9, 0.99`     | `0.5, 0.9, 0.99`                    |

</TabItem>
</Tabs>

#### Available endpoints

| Endpoint                         | Description        |
| -------------------------------- | ------------------ |
| `<server>:8091/metrics`          | Prometheus metrics |
| `<server>:8091/health/readiness` | Readiness probe    |
| `<server>:8091/health/liveness`  | Liveness probe     |

For more details, including Kubernetes probe configuration examples and `websocket` health endpoints, see the [Monitoring](../monitoring.md) page.

### Git Sync

Camunda Hub supports syncing files via [Git Sync](/components/hub/workspace/manage-projects/git-sync.md). Provide the base URL for your provider if you are using a self-hosted GitLab, GitHub, or Azure DevOps Server instance.

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler:
  gitsync:
    max-files: 50 # default
    max-in-memory-size: 4MB # default
    github:
      base-url: https://api.github.com # default
    gitlab:
      base-url: https://gitlab.com/api/v4 # default
    azure:
      base-url: https://dev.azure.com # default
      api-version: "7.1" # default
      authority-base-path: https://login.microsoftonline.com # default
      scope: https://app.vssps.visualstudio.com/.default # default
    bitbucket:
      base-url: https://api.bitbucket.org/2.0/repositories # default
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Provider      | Environment variable                                | Description                                                                                                                   | Default value                                 |
| ------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAXFILES`                  | Maximum number of allowed files for sync operations.                                                                          | `50`                                          |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAXINMEMORYSIZE`           | Maximum memory size that can be processed by calls to the Git provider. This limits the maximum file size that can be synced. | `4MB`                                         |
| GitHub        | `CAMUNDA_MODELER_GITSYNC_GITHUB_BASEURL`            | The base URL of your self-hosted GitHub instance.                                                                             | `https://api.github.com`                      |
| GitLab        | `CAMUNDA_MODELER_GITSYNC_GITLAB_BASEURL`            | The base URL of your self-hosted GitLab instance.                                                                             | `https://gitlab.com/api/v4`                   |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_BASEURL`             | The base URL of your self-hosted Azure DevOps Server instance.                                                                | `https://dev.azure.com`                       |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_API_VERSION`         | The Azure DevOps API versions to use.                                                                                         | `7.1`                                         |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_AUTHORITY_BASE_PATH` | URL used to access authentication and authorization services for Microsoft cloud identities.                                  | `https://login.microsoftonline.com`           |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_SCOPE`               | OAuth scope requested for Azure DevOps authentication.                                                                        | `https://app.vssps.visualstudio.com/.default` |
| Bitbucket     | `CAMUNDA_MODELER_GITSYNC_BITBUCKET_BASEURL`         | The base URL of Bitbucket Cloud.                                                                                              | `https://api.bitbucket.org/2.0/repositories`  |

</TabItem>
</Tabs>

### Feature flags

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

| Property                                                     | Description                                                                                                                                                                                                                                                                            | Example value | Default value |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `camunda.modeler.feature.play-enabled`                       | [optional]<br/>Enables the [**Play** mode](../../../../components/hub/workspace/modeler/validation/play-your-process.md) in the BPMN editor, allowing users to test processes in a playground environment.                                                                             | `true`        | `true`        |
| `camunda.modeler.feature.bpmn-deployment-enabled`            | [optional]<br/>Enables the [**Deploy** and **Run**](../../../../components/hub/workspace/modeler/run-or-publish-your-process.md) actions in the BPMN editor.<br/>When disabled, it prevents users from deploying and starting instances of processes via the UI.                       | `false`       | `true`        |
| `camunda.modeler.feature.dmn-deployment-enabled`             | [optional]<br/>Enables the [**Deploy**](../../../../components/hub/workspace/modeler/run-or-publish-your-process.md) action in the DMN editor.<br/>When disabled, it prevents users from deploying decisions via the UI.                                                               | `false`       | `true`        |
| `camunda.modeler.feature.dynamic-cluster-management-enabled` | [optional]<br/>Enables or disables [dynamic cluster management](#dynamic-cluster-management).                                                                                                                                                                                          | `true`        | `false`       |
| `camunda.marketplace.enabled`                                | [optional]<br/>Enables the integration of the [Camunda Marketplace](https://marketplace.camunda.com). If enabled, users can browse the Marketplace and download [resources](../../../../components/hub/workspace/modeler/modeling/camunda-marketplace.md) directly inside Camunda Hub. | `false`       | `true`        |

Example configuration:

```yaml
camunda:
  modeler.feature:
    play-enabled: true
    bpmn-deployment-enabled: true
    dmn-deployment-enabled: true
    dynamic-cluster-management-enabled: false

  marketplace:
    enabled: true
```

</TabItem>
<TabItem value="env" label="Environment variables">

| Environment variable                 | Description                                                                                                                                                                                                                                                                            | Example value | Default value |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `PLAY_ENABLED`                       | [optional]<br/>Enables the [**Play** mode](../../../../components/hub/workspace/modeler/validation/play-your-process.md) in the BPMN editor, allowing users to test processes in a playground environment.                                                                             | `true`        | `true`        |
| `ZEEBE_BPMN_DEPLOYMENT_ENABLED`      | [optional]<br/>Enables the [**Deploy** and **Run**](../../../../components/hub/workspace/modeler/run-or-publish-your-process.md) actions in the BPMN editor.<br/>When disabled, it prevents users from deploying and starting instances of processes via the UI.                       | `false`       | `true`        |
| `ZEEBE_DMN_DEPLOYMENT_ENABLED`       | [optional]<br/>Enables the [**Deploy**](../../../../components/hub/workspace/modeler/run-or-publish-your-process.md) action in the DMN editor.<br/>When disabled, it prevents users from deploying decisions via the UI.                                                               | `false`       | `true`        |
| `DYNAMIC_CLUSTER_MANAGEMENT_ENABLED` | [optional]<br/>Enables or disables [dynamic cluster management](#dynamic-cluster-management).                                                                                                                                                                                          | `true`        | `false`       |
| `MARKETPLACE_ENABLED`                | [optional]<br/>Enables the integration of the [Camunda Marketplace](https://marketplace.camunda.com). If enabled, users can browse the Marketplace and download [resources](../../../../components/hub/workspace/modeler/modeling/camunda-marketplace.md) directly inside Camunda Hub. | `false`       | `true`        |

</TabItem>
</Tabs>

#### Dynamic cluster management

Use dynamic cluster management to automatically create records for your clusters within Camunda Hub.

By default, clusters shown in Camunda Hub are strictly managed by your [configuration](#clusters). Cluster records are created, updated, and deleted when you change your cluster configuration values.

Dynamic cluster management changes this behavior to a hybrid model that makes use of both your cluster configuration—if provided—and the following cluster management API endpoints that are only exposed when dynamic cluster management is enabled:

| Name                           | Path                                  |
| :----------------------------- | :------------------------------------ |
| **Create cluster (discovery)** | `POST /api/v1/clusters`               |
| **Delete cluster**             | `DELETE /api/v1/clusters/{clusterId}` |

In this mode, you:

1. [Configure your Orchestration Clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#camunda-hub-ping-configuration) to send license information directly to the create cluster endpoint. If you didn't define the clusters in your configuration, new cluster records with minimal information and no management functionality in the user interface will be created by a request to this endpoint.
2. Delete stale cluster records from Camunda Hub with the delete cluster endpoint.

While not required, you can still define new clusters in your configuration. Newly defined clusters are automatically registered in Camunda Hub with all [available settings](#clusters) and management functionality in the Camunda Hub interface.

If you remove a cluster configuration, you need to manually delete the cluster record with the delete cluster endpoint. With dynamic cluster management, you can't update cluster records. Instead, delete the record and either:

- Allow the cluster to ping Camunda Hub with new information.
- Update your configuration, and let the cluster record be recreated.

:::note
If you use dynamic cluster management, do not manually call the create cluster endpoint—only configure your clusters to do so. This endpoint doesn't currently support creating clusters with all configurable settings.
:::

### Unstable configuration options

These are unstable options that are not officially supported and may be removed without deprecation in future releases. They are intended for testing and feedback purposes only.

<Tabs groupId="configType" defaultValue="application.yaml" queryString>
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda.modeler.resource-import.allow-private-ip-address: true # default: false; enabling this option weakens server-side request forgery (SSRF) protections and can significantly increase security exposure.
```

</TabItem>
<TabItem value="env"  label="Environment variables">

| Environment variable                                       | Description                                                                                                                                                                                                | Example value | Default value |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `CAMUNDA_MODELER_RESOURCE_IMPORT_ALLOW_PRIVATE_IP_ADDRESS` | Allow importing resources from a host that resolves to a private IP address. Enabling this option weakens server-side request forgery (SSRF) protections and can significantly increase security exposure. | `true`        | `false`       |

</TabItem>
</Tabs>

## Configuration of the `websocket` component

The [WebSocket](https://en.wikipedia.org/wiki/WebSocket) server shipped with Camunda Hub Self-Managed is based on the [laravel-websockets](https://laravel.com/docs/10.x/broadcasting#open-source-alternatives-php) open source package and implements the [Pusher Channels Protocol](https://pusher.com/docs/channels/library_auth_reference/pusher-websockets-protocol/).

The `websocket` component is configured via environment variables.
When using the Camunda Helm chart, you can pass these variables via `webModeler.websocket.env` in your `values.yaml`.
See the [Helm chart values docs](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters) for all available configuration options.

| Environment variable | Description                                                                                                                                                              | Example value | Default value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------- |
| `PUSHER_APP_ID`      | ID of the single application/tenant configured for Camunda Hub.                                                                                                          | `web-modeler` | -             |
| `PUSHER_APP_KEY`     | A unique key used for authentication. Provide a random alphanumeric string of at least 20 characters.                                                                    | \*\*\*        | -             |
| `PUSHER_APP_SECRET`  | A unique secret used for authentication. Provide a random alphanumeric string of at least 20 characters.                                                                 | \*\*\*        | -             |
| `PUSHER_APP_PATH`    | [optional]<br/>Base path of the WebSocket endpoint. Can be used to expose the endpoint on a sub path instead of the domain root (e.g. `https://example.com/modeler-ws`). | `/modeler-ws` | `/`           |

### Logging

| Environment variable | Description                                                                                                                     | Example value | Default value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `LOG_CHANNEL`        | [optional]<br/>Log channel driver, see [Laravel documentation](https://laravel.com/docs/10.x/logging#available-channel-drivers) | `single`      | `stack`       |

Refer to the [Advanced Logging Configuration Guide](./logging.md#logging-configuration-for-the-websocket-component) for additional details on how to customize the `websocket` logging output.

### SSL

| Environment variable    | Description                                                                    | Example value                   | Default value |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------- | ------------- |
| `PUSHER_SSL_CERT`       | [optional]<br/>Path to a PEM-encoded SSL certificate file.                     | `/full/path/to/certificate.pem` | -             |
| `PUSHER_SSL_KEY`        | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate. | `/full/path/to/key.pem`         | -             |
| `PUSHER_SSL_PASSPHRASE` | [optional]<br/>Passphrase for the private key file.                            | `change-me`                     | -             |

Refer to the [advanced SSL configuration guide](./ssl.md) for additional details on how to set up secure connections (incoming & outgoing) to the Camunda Hub components.

## Notes on host names and port numbers

- _Internal_ refers to host names and port numbers that are only used inside a Docker Compose network or Kubernetes cluster for backend-to-backend communication.
- _External_ refers to host names and port numbers that are exposed to the outside and can be reached from a web browser.
