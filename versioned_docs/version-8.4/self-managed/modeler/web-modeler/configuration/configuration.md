---
id: configuration
title: "Configuration"
sidebar_label: "Overview"
description: "Read details on the configuration variables of Web Modeler Self-Managed, including components such as REST API, Identity, Keycloak, webapp, and WebSocket."
---

:::note
Web Modeler Self-Managed is available to [enterprise customers](../../../../reference/licenses.md#web-modeler) only.
:::

The different components of Web Modeler Self-Managed can be configured using environment variables. Each component's variables are described below.

- For a working example configuration showing how the components are correctly wired together, see the [Docker Compose file for Web Modeler](../../../platform-deployment/docker#web-modeler-1).
- If you are using the Camunda 8 [Helm chart](../../../platform-deployment/helm-kubernetes/deploy.md) to set up Web Modeler, read more about the different configuration options in the chart's [values docs](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

## Configuration of the `restapi` component

### Database

:::note
Web Modeler does not support the use of custom schemas in versions prior to `8.7.0`.
:::

Web Modeler requires a PostgreSQL database as persistent data storage (other database systems are currently not supported).

| Environment variable                  | Description                                           | Example value                                            |
| ------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| `SPRING_DATASOURCE_URL`               | JDBC URL of the database                              | `jdbc:postgresql://postgres.example.com:5432/modeler-db` |
| `SPRING_DATASOURCE_USERNAME`          | Database user name                                    | `modeler-user`                                           |
| `SPRING_DATASOURCE_PASSWORD`          | Database user password                                | \*\*\*                                                   |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | [optional]<br/>Java class name of the database driver | `software.amazon.jdbc.Driver`                            |

Refer to the [Advanced Database Configuration Guide](./database.md) for additional details on how to configure Web Modeler's database connection.

### SMTP / email

Web Modeler requires an SMTP server to send notification emails to users.

| Environment variable        | Description                                                                                            | Example value                 | Default value |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- |
| `RESTAPI_MAIL_HOST`         | SMTP server host name                                                                                  | `smtp.example.com`            | -             |
| `RESTAPI_MAIL_PORT`         | SMTP server port                                                                                       | `587`                         | -             |
| `RESTAPI_MAIL_USER`         | [optional]<br/>SMTP user name                                                                          | `modeler-user`                | -             |
| `RESTAPI_MAIL_PASSWORD`     | [optional]<br/>SMTP user password                                                                      | \*\*\*                        | -             |
| `RESTAPI_MAIL_ENABLE_TLS`   | Enforce TLS encryption for SMTP connections (using STARTTLS).                                          | `true`                        | `true`        |
| `RESTAPI_MAIL_FROM_ADDRESS` | Email address used as the sender of emails sent by Web Modeler.                                        | `noreply@example.com`         | -             |
| `RESTAPI_MAIL_FROM_NAME`    | [optional]<br/>Name displayed as the sender of emails sent by Web Modeler.                             | `Camunda`                     | `Camunda`     |
| `RESTAPI_SERVER_URL`        | URL at which users access Web Modeler in the browser (used to construct links in notification emails). | `https://modeler.example.com` | -             |

### WebSocket

The `restapi` component sends certain events (e.g. "file updated", "comment added") to the [WebSocket](#configuration-of-the-websocket-component) server.

| Environment variable    | Description                                                                            | Example value        |
| ----------------------- | -------------------------------------------------------------------------------------- | -------------------- |
| `RESTAPI_PUSHER_HOST`   | [Internal](#notes-on-host-names-and-port-numbers) host name of the WebSocket server.   | `modeler-websockets` |
| `RESTAPI_PUSHER_PORT`   | [Internal](#notes-on-host-names-and-port-numbers) port number of the WebSocket server. | `8060`               |
| `RESTAPI_PUSHER_APP_ID` | _must be the same as_ [`PUSHER_APP_ID`](#configuration-of-the-websocket-component)     | `web-modeler`        |
| `RESTAPI_PUSHER_KEY`    | _must be the same as_ [`PUSHER_APP_KEY`](#configuration-of-the-websocket-component)    | \*\*\*               |
| `RESTAPI_PUSHER_SECRET` | _must be the same as_ [`PUSHER_APP_SECRET`](#configuration-of-the-websocket-component) | \*\*\*               |

### Identity / Keycloak

Web Modeler integrates with Identity and Keycloak for authentication and authorization (using OAuth 2.0 + OpenID Connect) as well as user management.

| Environment variable                                   | Description                                                                                                                                                                                                                                                                             | Example value                                               |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `CAMUNDA_IDENTITY_BASEURL`                             | [Internal](#notes-on-host-names-and-port-numbers) base URL of the Identity API (used to fetch user data).                                                                                                                                                                               | `http://identity:8080`                                      |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` | URL of the token issuer (used for JWT validation).                                                                                                                                                                                                                                      | `https://keycloak.example.com/auth/realms/camunda-platform` |
| `RESTAPI_OAUTH2_TOKEN_ISSUER_BACKEND_URL`              | [optional]<br/>[Internal](#notes-on-host-names-and-port-numbers) URL used to request Keycloak's [OpenID Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig); if not set, `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` is used. | `http://keycloak:8080/auth/realms/camunda-platform`         |

Refer to the [advanced Identity configuration guide](./identity.md) for additional details on how to set up secure connections to an external Identity instance or connect a custom OpenID Connect (OIDC) authentication provider.

### Zeebe Client

Web Modeler uses the [Zeebe Java client](/docs/apis-tools/java-client/index.md) to connect to Zeebe.
To customize the client configuration, you can provide optional environment variables.

| Environment variable          | Description                                                                                              | Example value                    | Default Value                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------- |
| `ZEEBE_CA_CERTIFICATE_PATH`   | [optional]<br/>Path to a root CA certificate to be used instead of the certificate in the default store. | `/path/to/certificate`           | -                            |
| `ZEEBE_CLIENT_CONFIG_PATH`    | [optional]<br/>Path to the client's OAuth credential cache.                                              | `/path/to/credentials/cache.txt` | `$HOME/.camunda/credentials` |
| `ZEEBE_CLIENT_REQUESTTIMEOUT` | [optional]<br/>The request timeout used when communicating with a target Zeebe cluster.                  | `60000`                          | `10000`                      |
| `ZEEBE_AUTH_CONNECT_TIMEOUT`  | [optional]<br/>The connection timeout for requests to the OAuth server.                                  | `30000`                          | `5000`                       |
| `ZEEBE_AUTH_READ_TIMEOUT`     | [optional]<br/>The data read timeout for requests to the OAuth server.                                   | `30000`                          | `5000`                       |

For more details, [see the Zeebe connection troubleshooting section](/self-managed/modeler/web-modeler/troubleshooting/troubleshoot-zeebe-connection.md).

### Logging

| Environment variable | Description                                         | Example value                                  |
| -------------------- | --------------------------------------------------- | ---------------------------------------------- |
| `LOGGING_CONFIG`     | [optional]<br/>Path to custom logback configuration | `file:/full/path/to/custom-logback-config.xml` |

Refer to the [advanced logging configuration guide](./logging.md#logging-configuration-for-the-restapi-component) for additional details on how to customize the `restapi` logging output.

## Configuration of the `webapp` component

### General

| Environment variable      | Description                                                                                                                            | Example value                                                    | Default value |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- |
| `SERVER_URL`              | URL at which users access Web Modeler in the browser.<br/>_Note_: To use a sub path for Web Modeler, just include the path in the URL. | `https://modeler.example.com`,<br/>`https://example.com/modeler` | -             |
| `SERVER_HTTPS_ONLY`       | Enforce the usage of HTTPS when users access Web Modeler (by redirecting from `http://` to `https://`).                                | `true`                                                           | `false`       |
| `RESTAPI_HOST`            | [Internal](#notes-on-host-names-and-port-numbers) host name of the `restapi` application.                                              | `modeler-restapi`                                                | -             |
| `RESTAPI_PORT`            | [Internal](#notes-on-host-names-and-port-numbers) port number on which the `restapi` serves the regular API endpoints.                 | `8081`                                                           | `8081`        |
| `RESTAPI_MANAGEMENT_PORT` | [Internal](#notes-on-host-names-and-port-numbers) port number on which the `restapi` serves the management API endpoints.              | `8091`                                                           | `8091`        |

### Feature Flags

| Environment variable            | Description                                                                                                                                                                                                                                                    | Example value | Default value |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `PLAY_ENABLED`                  | [optional]<br/>Enables the [**Play** mode](../../../../components/modeler/web-modeler/play-your-process.md) in the BPMN editor, allowing users to test processes in a playground environment.                                                                  | `true`        | `false`       |
| `ZEEBE_BPMN_DEPLOYMENT_ENABLED` | [optional]<br/>Enables the [**Deploy** and **Run**](../../../../components/modeler/web-modeler/run-or-publish-your-process.md) actions in the BPMN editor.<br/>When disabled, it prevents users from deploying and starting instances of processes via the UI. | `false`       | `true`        |
| `ZEEBE_DMN_DEPLOYMENT_ENABLED`  | [optional]<br/>Enables the [**Deploy**](../../../../components/modeler/web-modeler/run-or-publish-your-process.md) action in the DMN editor.<br/>When disabled, it prevents users from deploying decisions via the UI.                                         | `false`       | `true`        |
| `MARKETPLACE_ENABLED`           | [optional]<br/>Enables the integration of the [Camunda Marketplace](https://marketplace.camunda.com). If enabled, users can browse the Marketplace and download [Connectors](../../../../components/connectors/introduction.md) directly inside Web Modeler.   | `false`       | `true`        |

### Identity / Keycloak

| Environment variable                      | Description                                                                                                                                                                                                                                                         | Example value                                                                     | Default value |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------- |
| `OAUTH2_CLIENT_ID`                        | Client ID of the Web Modeler application configured in Identity;<br/>_must be set to_ `web-modeler`.                                                                                                                                                                | `web-modeler`                                                                     | -             |
| `OAUTH2_CLIENT_FETCH_REQUEST_CREDENTIALS` | [optional]<br/>Configuration whether credentials should be sent along with requests to the OIDC provider, see [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#value). Use this if you are using a proxy that requires cookies. | `include`                                                                         | -             |
| `OAUTH2_JWKS_URL`                         | [Internal](#notes-on-host-names-and-port-numbers) URL used to request Keycloak's JSON Web Key Set (for JWT verification).                                                                                                                                           | `http://keycloak:8080/auth/realms/camunda-platform/protocol/openid-connect/certs` | -             |
| `OAUTH2_TOKEN_AUDIENCE`                   | Expected token audience (used for JWT validation);<br/>_must be set to_ `web-modeler`.                                                                                                                                                                              | `web-modeler`                                                                     | -             |
| `OAUTH2_TOKEN_ISSUER`                     | URL of the token issuer (used for JWT validation).                                                                                                                                                                                                                  | `https://keycloak.example.com/auth/realms/camunda-platform`                       | -             |
| `IDENTITY_BASE_URL`                       | [Internal](#notes-on-host-names-and-port-numbers) base URL of the Identity API (used to fetch user data).                                                                                                                                                           | `http://identity:8080`                                                            | -             |

Refer to the [advanced Identity configuration guide](./identity.md) for additional details on how to set up secure connections to an external Identity instance or connect a custom OpenID Connect (OIDC) authentication provider.

### WebSocket

The `webapp` component sends certain events (e.g. "user opened diagram", "user left diagram") to the [WebSocket server](#configuration-of-the-websocket-component) and can also react to such events (e.g. show a notification in the UI that a user left the diagram).

| Environment variable      | Description                                                                                                                                   | Example value        | Default value |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------- |
| `PUSHER_HOST`             | [Internal](#notes-on-host-names-and-port-numbers) host name of the WebSocket server.                                                          | `modeler-websockets` | -             |
| `PUSHER_PORT`             | [Internal](#notes-on-host-names-and-port-numbers) port number of the WebSocket server.                                                        | `8060`               | -             |
| `PUSHER_APP_ID`           | _must be the same as_ [`PUSHER_APP_ID`](#configuration-of-the-websocket-component)                                                            | `web-modeler`        | -             |
| `PUSHER_KEY`              | _must be the same as_ [`PUSHER_APP_KEY`](#configuration-of-the-websocket-component)                                                           | \*\*\*               | -             |
| `PUSHER_SECRET`           | _must be the same as_ [`PUSHER_APP_SECRET`](#configuration-of-the-websocket-component)                                                        | \*\*\*               | -             |
| `CLIENT_PUSHER_HOST`      | [External](#notes-on-host-names-and-port-numbers) host name on which the Web Modeler client accesses the WebSocket server from the browser.   | `ws.example.com`     | -             |
| `CLIENT_PUSHER_PORT`      | [External](#notes-on-host-names-and-port-numbers) port number on which the Web Modeler client accesses the WebSocket server from the browser. | `443`                | -             |
| `CLIENT_PUSHER_PATH`      | [optional]<br/>_must be the same as_ [`PUSHER_APP_PATH`](#configuration-of-the-websocket-component)                                           | `/modeler-ws`        | `/`           |
| `CLIENT_PUSHER_KEY`       | _must be the same as_ [`PUSHER_APP_KEY`](#configuration-of-the-websocket-component)                                                           | \*\*\*               | -             |
| `CLIENT_PUSHER_FORCE_TLS` | Enable TLS encryption for WebSocket connections initiated by the browser.                                                                     | `true`               | `false`       |

### Logging

| Environment variable | Description                                     | Example value                |
| -------------------- | ----------------------------------------------- | ---------------------------- |
| `LOG_FILE_PATH`      | [optional]<br/>Path to log file output          | `/full/path/to/log/file.log` |
| `LOG_LEVEL_CLIENT`   | [optional]<br/>Log level for the client         | `DEBUG`                      |
| `LOG_LEVEL_WEBAPP`   | [optional]<br/>Log level for the Node.js server | `DEBUG`                      |

The `LOG_LEVEL_*` options can be found [here](../../../operational-guides/troubleshooting/log-levels/#understanding-log-levels).
Refer to the [Advanced Logging Configuration Guide](./logging.md#logging-configuration-for-the-webapp-component) for additional details on how to customize the `webapp` logging output.

## Configuration of the `websocket` component

The [WebSocket](https://en.wikipedia.org/wiki/WebSocket) server shipped with Web Modeler Self-Managed is based on the [laravel-websockets](https://laravel.com/docs/10.x/broadcasting#open-source-alternatives-php) open source package and implements the [Pusher Channels Protocol](https://pusher.com/docs/channels/library_auth_reference/pusher-websockets-protocol/).

| Environment variable | Description                                                                                                                                                              | Example value | Default value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------- |
| `PUSHER_APP_ID`      | ID of the single application/tenant configured for Web Modeler.                                                                                                          | `web-modeler` | -             |
| `PUSHER_APP_KEY`     | A unique key used for authentication. Provide a random alphanumeric string of at least 20 characters.                                                                    | \*\*\*        | -             |
| `PUSHER_APP_SECRET`  | A unique secret used for authentication. Provide a random alphanumeric string of at least 20 characters.                                                                 | \*\*\*        | -             |
| `PUSHER_APP_PATH`    | [optional]<br/>Base path of the WebSocket endpoint. Can be used to expose the endpoint on a sub path instead of the domain root (e.g. `https://example.com/modeler-ws`). | `/modeler-ws` | `/`           |

### Logging

| Environment variable | Description                                                                                                                     | Example value | Default Value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| `LOG_CHANNEL`        | [optional]<br/>Log channel driver, see [Laravel documentation](https://laravel.com/docs/10.x/logging#available-channel-drivers) | `single`      | `stack`       |

Refer to the [Advanced Logging Configuration Guide](./logging.md#logging-configuration-for-the-websocket-component) for additional details on how to customize the `websocket` logging output.

## Notes on host names and port numbers

- _Internal_ refers to host names and port numbers that are only used inside a Docker Compose network or Kubernetes cluster for backend-to-backend communication.
- _External_ refers to host names and port numbers that are exposed to the outside and can be reached from a web browser.
