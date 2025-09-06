---
id: configuration
title: "Configuration"
sidebar_label: "Overview"
description: "Read details on the configuration variables of Web Modeler Self-Managed, including components such as REST API, Identity, Keycloak, webapp, and WebSocket."
---

The different components of Web Modeler Self-Managed can be configured using environment variables. Each component's variables are described below.

- For a working example configuration showing how the components are correctly wired together, see the [Docker Compose file for Web Modeler](/self-managed/quickstart/developer-quickstart/docker-compose.md).
- If you are using the Camunda 8 [Helm chart](/self-managed/installation-methods/helm/install.md) to set up Web Modeler, read more about the different configuration options in the chart's [values docs](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

## Licensing

import Licensing from '../../../../../self-managed/react-components/licensing.md'

<Licensing/>

## Configuration of the `restapi` component

### Clusters

Clusters must be configured using the following options to access the cluster from within Web Modeler. If no clusters are configured, you will not be able to perform any actions that require a cluster (for example, deploy, start an instance, or Play a process).

The Camunda 8 [Helm](/self-managed/installation-methods/helm/install.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) distributions provide a local Zeebe cluster configured by default.

To add additional clusters, increment the `0` value for each variable (e.g. `CAMUNDA_MODELER_CLUSTERS_1_NAME`).

:::info Cluster version
The available configuration options depend on the version of the cluster:

- [Common configuration (all cluster versions)](#common-configuration-all-cluster-versions)
- [Additional configuration for cluster versions >= 8.8](#additional-configuration-for-cluster-versions--88)
- [Additional configuration for cluster versions < 8.8](#additional-configuration-for-cluster-versions--88-1)

:::

#### Common configuration (all cluster versions)

| Environment variable                        | Description                                                                                   | Example value                    |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_ID`             | A unique identifier to use for your cluster.                                                  | `test-cluster-1`                 |
| `CAMUNDA_MODELER_CLUSTERS_0_NAME`           | The name of your cluster.                                                                     | `Test Cluster 1`                 |
| `CAMUNDA_MODELER_CLUSTERS_0_VERSION`        | The Camunda version used by this cluster.                                                     | `8.8.0`                          |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION` | The [authentication](#available-authentication-methods) to use with your cluster.             | `BEARER_TOKEN`                   |
| `CAMUNDA_MODELER_CLUSTERS_0_OAUTH_URL`      | The address of your token issuer. Only required for authentication type `CLIENT_CREDENTIALS`. | `https://auth.example.com/token` |
| `CAMUNDA_MODELER_CLUSTERS_0_OAUTH_SCOPE`    | [optional]<br/>A list of the scopes to use with this cluster separated by spaces.             | `openid email profile`           |

#### Additional configuration for cluster versions >= 8.8

| Environment variable                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Example value                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_GRPC`               | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Zeebe gRPC API](/apis-tools/zeebe-api/grpc.md) can be reached.                                                                                                                                                                                                                                                                                                                     | `grpc://camunda:26500`,<br/>`grpcs://camunda.example.com:26500` |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_REST`               | [Internal or external](#notes-on-host-names-and-port-numbers) address where the cluster's REST APIs can be reached. Used as the base URL for requests to the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) (`/v2` endpoints) as well as the [Operate](/apis-tools/operate-api/overview.md) and [Tasklist](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) APIs (`/v1` endpoints). | `http://camunda:8080`,<br/>`https://camunda.example.com`        |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_WEBAPP`             | [External](#notes-on-host-names-and-port-numbers) address where the cluster's web applications can be reached in a browser.                                                                                                                                                                                                                                                                                                                                         | `https://camunda.example.com`                                   |
| `CAMUNDA_MODELER_CLUSTERS_0_AUTHORIZATIONS_ENABLED` | Indicates if [authorizations are enabled](/self-managed/components/orchestration-cluster/identity/overview.md#enable-api-authentication-and-authorizations) for the cluster. If `true`, users will see a hint when they deploy from Web Modeler.                                                                                                                                                                                                                    | `true`                                                          |

#### Additional configuration for cluster versions < 8.8

| Environment variable                                 | Description                                                                                                                                                                                                 | Example value                                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_ZEEBE_GRPC`          | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Zeebe gRPC API](/versioned_docs/version-8.7/apis-tools/zeebe-api/grpc.md) can be reached.                                  | `grpc://camunda-zeebe-gateway:26500`,<br/>`grpcs://zeebe.example.com:26500` |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_ZEEBE_REST`          | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Camunda 8 REST API](/versioned_docs/version-8.7/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) can be reached.  | `http://camunda-zeebe-gateway:8080`,<br/>`https://zeebe.example.com`        |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_OPERATE`             | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Operate REST API](/versioned_docs/version-8.7/apis-tools/operate-api/overview.md) can be reached.                          | `http://camunda-operate:80`,<br/>`https://operate.example.com`              |
| `CAMUNDA_MODELER_CLUSTERS_0_URL_TASKLIST`            | [Internal or external](#notes-on-host-names-and-port-numbers) address where the [Tasklist REST API](/versioned_docs/version-8.7/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) can be reached. | `http://camunda-tasklist:80`,<br/>`https://tasklist.example.com`            |
| `CAMUNDA_MODELER_CLUSTERS_0_OAUTH_AUDIENCE_ZEEBE`    | The OAuth token audience for Zeebe. Only required for authentication type `CLIENT_CREDENTIALS`.                                                                                                             | `zeebe-api`                                                                 |
| `CAMUNDA_MODELER_CLUSTERS_0_OAUTH_AUDIENCE_OPERATE`  | The OAuth token audience for Operate. Only required for authentication type `CLIENT_CREDENTIALS`.                                                                                                           | `operate-api`                                                               |
| `CAMUNDA_MODELER_CLUSTERS_0_OAUTH_AUDIENCE_TASKLIST` | The OAuth token audience for Tasklist. Only required for authentication type `CLIENT_CREDENTIALS`.                                                                                                          | `tasklist-api`                                                              |

#### Available authentication methods

| Method                                                                                                                                                                                                | Description                                                                                                                                                                                            | When to use?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BEARER_TOKEN`                                                                                                                                                                                        | Web Modeler sends the authenticated user's token in the `Authorization` header with every request to the cluster.                                                                                      | **Cluster version >= 8.8**<br/>The cluster uses [OIDC authentication](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).<br/>_Note_: You need to ensure that the cluster [accepts Web Modeler's token audience](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md#step-4-configure-the-oidc-connection-details).<br/><br/>**Cluster version < 8.8**<br/>The cluster uses [Camunda Identity-based authentication](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization) and the external identity provider supports access tokens with multiple audiences (example provider: Keycloak).<br/>_Note_: For the token to be accepted by the different cluster components, it must contain each component's audience. |
| `CLIENT_CREDENTIALS`<br/><br/>([deprecated](/reference/announcements-release-notes/870/870-announcements.md#deprecated-web-modeler-cluster-authentication-oauth-and-client_credentials-self-managed)) | Web Modeler requests an M2M token using the client credentials flow and sends this token with every request to the cluster. The client ID and client secret have to be provided by the user in the UI. | **Cluster version >= 8.8**<br/>not recommended<br/><br/>**Cluster version < 8.8**<br/>The external identity provider does not support access tokens with multiple audiences (example provider: [Microsoft Entra ID](/versioned_docs/version-8.7/self-managed/identity/configuration/connect-to-an-oidc-provider.md?authPlatform=microsoftEntraId#configuration)).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `BASIC`                                                                                                                                                                                               | Web Modeler sends a username and password with every request to the cluster. The credentials have to be provided by the user in the UI.                                                                | **Cluster version >= 8.8**<br/>The cluster uses basic authentication.<br/><br/>**Cluster version < 8.8**<br/>not supported                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `NONE`                                                                                                                                                                                                | Web Modeler does not send any token.                                                                                                                                                                   | **Cluster version >= 8.8**<br/>The cluster API is [configured as unprotected](/self-managed/components/orchestration-cluster/identity/overview.md#enable-api-authentication-and-authorizations) and can be used without authentication.<br/><br/>**Cluster version < 8.8**<br/>The authentication / token validation in the Zeebe Gateway is [disabled](/versioned_docs/version-8.7/self-managed/zeebe-deployment/security/client-authorization.md#camunda-identity-authorization).                                                                                                                                                                                                                                                                                                                                                                                           |

### Database

Web Modeler requires a PostgreSQL database as persistent data storage (other database systems are currently not supported).

| Environment variable                  | Description                                                                                                                                                                                                                                                                         | Example value                                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `SPRING_DATASOURCE_URL`               | JDBC URL of the database                                                                                                                                                                                                                                                            | `jdbc:postgresql://postgres.example.com:5432/modeler-db` |
| `SPRING_DATASOURCE_USERNAME`          | Database user name                                                                                                                                                                                                                                                                  | `modeler-user`                                           |
| `SPRING_DATASOURCE_PASSWORD`          | Database user password                                                                                                                                                                                                                                                              | \*\*\*                                                   |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | [optional]<br/>Java class name of the database driver                                                                                                                                                                                                                               | `software.amazon.jdbc.Driver`                            |
| `SPRING_DATASOURCE_HIKARI_SCHEMA`     | [optional]<br/>Database schema.<br/>Defaults to the default schema of the database user (usually `public`) if not set.<br/>Refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) for naming restrictions. | `custom_schema`                                          |

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

| Environment variable                                       | Description                                                                                                                                                                                                                                                                             | Example value                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `CAMUNDA_IDENTITY_BASEURL`                                 | [Internal](#notes-on-host-names-and-port-numbers) base URL of the Identity API (used to fetch user data).                                                                                                                                                                               | `http://identity:8080`                                                                    |
| `RESTAPI_OAUTH2_TOKEN_ISSUER_BACKEND_URL`                  | [optional]<br/>[Internal](#notes-on-host-names-and-port-numbers) URL used to request Keycloak's [OpenID Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig); if not set, `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` is used. | `http://keycloak:18080/auth/realms/camunda-platform`                                      |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI`     | URL of the token issuer (used for JWT validation).                                                                                                                                                                                                                                      | `https://keycloak.example.com/auth/realms/camunda-platform`                               |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI`    | [optional] URL of the JWK Set endpoint (used for JWT validation). Only necessary if URL cannot be derived from the OIDC configuration endpoint.                                                                                                                                         | `https://keycloak.example.com/auth/realms/camunda-platform/protocol/openid-connect/certs` |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWS_ALGORITHMS` | [optional] List of trusted JWS algorithms used for JWT validation. Only necessary if the algorithms cannot be derived from the JWK Set response.                                                                                                                                        | `ES256`                                                                                   |

Refer to the [advanced Identity configuration guide](./identity.md) for additional details on how to connect a custom OpenID Connect (OIDC) authentication provider.

### Camunda Client

Web Modeler uses the [Camunda Java client](/apis-tools/java-client/getting-started.md) to connect to Zeebe.
To customize the client configuration, you can provide optional environment variables.

| Environment variable            | Description                                                                                              | Example value                    | Default Value                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------- |
| `CAMUNDA_CA_CERTIFICATE_PATH`   | [optional]<br/>Path to a root CA certificate to be used instead of the certificate in the default store. | `/path/to/certificate`           | -                            |
| `CAMUNDA_CLIENT_CONFIG_PATH`    | [optional]<br/>Path to the client's OAuth credential cache.                                              | `/path/to/credentials/cache.txt` | `$HOME/.camunda/credentials` |
| `CAMUNDA_CLIENT_REQUESTTIMEOUT` | [optional]<br/>The request timeout used when communicating with a target Zeebe cluster.                  | `60000`                          | `10000`                      |
| `CAMUNDA_AUTH_CONNECT_TIMEOUT`  | [optional]<br/>The connection timeout for requests to the OAuth server.                                  | `30000`                          | `5000`                       |
| `CAMUNDA_AUTH_READ_TIMEOUT`     | [optional]<br/>The data read timeout for requests to the OAuth server.                                   | `30000`                          | `5000`                       |

For more details, [see the Zeebe connection troubleshooting section](/self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-zeebe-connection.md).

### Logging

| Environment variable | Description                                         | Example value                                  |
| -------------------- | --------------------------------------------------- | ---------------------------------------------- |
| `LOGGING_CONFIG`     | [optional]<br/>Path to custom logback configuration | `file:/full/path/to/custom-logback-config.xml` |

Refer to the [advanced logging configuration guide](./logging.md#logging-configuration-for-the-restapi-component) for additional details on how to customize the `restapi` logging output.

### SSL

| Environment variable                            | Description                                                                          | Example value                        | Default value |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------ | ------------- |
| `SERVER_SSL_ENABLED`                            | [optional]<br/>Whether to enable SSL support.                                        | `true`                               | `false`       |
| `SERVER_SSL_CERTIFICATE`                        | [optional]<br/>Path to a PEM-encoded SSL certificate file.                           | `file:/full/path/to/certificate.pem` | -             |
| `SERVER_SSL_CERTIFICATE_PRIVATE_KEY`            | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.       | `file:/full/path/to/key.pem`         | -             |
| `MANAGEMENT_SERVER_SSL_ENABLED`                 | [optional]<br/>Whether to enable SSL support for the management server routes.       | `true`                               | `false`       |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE`             | [optional]<br/>Path to a PEM-encoded SSL certificate file.                           | `file:/full/path/to/certificate.pem` | -             |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY` | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.       | `file:/full/path/to/key.pem`         | -             |
| `RESTAPI_PUSHER_SSL_ENABLED`                    | [optional]<br/>Whether to enable communication via SSL to the `websocket` component. | `true`                               | `false`       |

Refer to the [advanced SSL configuration guide](./ssl.md) for additional details on how to set up secure connections (incoming & outgoing) to the Web Modeler components.

### Git Sync

Web Modeler supports syncing files via [Git Sync](../../../../../components/modeler/web-modeler/git-sync.md). Provide the base URL for your provider if you are using a self-hosted GitLab, GitHub, or Azure DevOps Server instance.

| Provider      | Environment variable                                | Description                                                                                                                   | Default value                                |
| ------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAXFILES`                  | Maximum number of allowed files for sync operations.                                                                          | `50`                                         |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAXINMEMORYSIZE`           | Maximum memory size that can be processed by calls to the Git provider. This limits the maximum file size that can be synced. | `4MB`                                        |
| GitHub        | `CAMUNDA_MODELER_GITSYNC_GITHUB_BASEURL`            | The base URL of your self-hosted GitHub instance.                                                                             | `https://api.github.com`                     |
| GitLab        | `CAMUNDA_MODELER_GITSYNC_GITLAB_BASEURL`            | The base URL of your self-hosted GitLab instance.                                                                             | `https://gitlab.com/api/v4`                  |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_BASEURL`             | The base URL of your self-hosted Azure DevOps Server instance.                                                                | `https://dev.azure.com`                      |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_API_VERSION`         | The Azure DevOps API versions to use.                                                                                         | `7.1`                                        |
| Azure DevOps  | `CAMUNDA_MODELER_GITSYNC_AZURE_AUTHORITY_BASE_PATH` | URL used to access authentication and authorization services for Microsoft cloud identities.                                  | `https://login.microsoftonline.com`          |
| Bitbucket     | `CAMUNDA_MODELER_GITSYNC_BITBUCKET_BASEURL`         | The base URL of Bitbucket Cloud.                                                                                              | `https://api.bitbucket.org/2.0/repositories` |

## Configuration of the `webapp` component

### General

| Environment variable      | Description                                                                                                                            | Example value                                                    | Default value |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- |
| `SERVER_URL`              | URL at which users access Web Modeler in the browser.<br/>_Note_: To use a sub path for Web Modeler, just include the path in the URL. | `https://modeler.example.com`,<br/>`https://example.com/modeler` | -             |
| `SERVER_HTTPS_ONLY`       | Enforce the usage of HTTPS when users access Web Modeler (by redirecting from `http://` to `https://`).                                | `true`                                                           | `false`       |
| `RESTAPI_HOST`            | [Internal](#notes-on-host-names-and-port-numbers) host name of the `restapi` application.                                              | `modeler-restapi`                                                | -             |
| `RESTAPI_PORT`            | [Internal](#notes-on-host-names-and-port-numbers) port number on which the `restapi` serves the regular API endpoints.                 | `8081`                                                           | `8081`        |
| `RESTAPI_MANAGEMENT_PORT` | [Internal](#notes-on-host-names-and-port-numbers) port number on which the `restapi` serves the management API endpoints.              | `8091`                                                           | `8091`        |

### Proxy

These settings are useful when the application needs to make outgoing network requests in environments that require traffic to pass through a proxy server.

| Environment variable | Description                                                                                    | Example value                         | Default value |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- | ------------- |
| `http_proxy`         | Specifies the proxy server to be used for outgoing HTTP requests.                              | `http://proxy.example.com:8080`       | -             |
| `https_proxy`        | Specifies the proxy server to be used for outgoing HTTPS requests.                             | `https://secureproxy.example.com:443` | -             |
| `no_proxy`           | A comma-separated list of domain names or IP addresses for which the proxy should be bypassed. | `localhost,127.0.0.1,.example.com`    | -             |

:::note
The proxy-related environment variables are lowercase because they follow a widely accepted convention used in many system environments and tools.
:::

### Feature Flags

| Environment variable            | Description                                                                                                                                                                                                                                                                    | Example value | Default value |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------- |
| `PLAY_ENABLED`                  | [optional]<br/>Enables the [**Play** mode](../../../../../components/modeler/web-modeler/play-your-process.md) in the BPMN editor, allowing users to test processes in a playground environment.                                                                               | `true`        | `true`        |
| `ZEEBE_BPMN_DEPLOYMENT_ENABLED` | [optional]<br/>Enables the [**Deploy** and **Run**](../../../../../components/modeler/web-modeler/run-or-publish-your-process.md) actions in the BPMN editor.<br/>When disabled, it prevents users from deploying and starting instances of processes via the UI.              | `false`       | `true`        |
| `ZEEBE_DMN_DEPLOYMENT_ENABLED`  | [optional]<br/>Enables the [**Deploy**](../../../../../components/modeler/web-modeler/run-or-publish-your-process.md) action in the DMN editor.<br/>When disabled, it prevents users from deploying decisions via the UI.                                                      | `false`       | `true`        |
| `MARKETPLACE_ENABLED`           | [optional]<br/>Enables the integration of the [Camunda Marketplace](https://marketplace.camunda.com). If enabled, users can browse the Marketplace and download [resources](../../../../../components/modeler/web-modeler/camunda-marketplace.md) directly inside Web Modeler. | `false`       | `true`        |

### Identity / Keycloak

| Environment variable                      | Description                                                                                                                                                                                                                                                         | Example value                                                                      | Default value |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| `OAUTH2_CLIENT_ID`                        | Client ID of the Web Modeler application configured in Identity;<br/>_must be set to_ `web-modeler`.                                                                                                                                                                | `web-modeler`                                                                      | -             |
| `OAUTH2_CLIENT_FETCH_REQUEST_CREDENTIALS` | [optional]<br/>Configuration whether credentials should be sent along with requests to the OIDC provider, see [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#value). Use this if you are using a proxy that requires cookies. | `include`                                                                          | -             |
| `OAUTH2_JWKS_URL`                         | [Internal](#notes-on-host-names-and-port-numbers) URL used to request Keycloak's JSON Web Key Set (for JWT verification).                                                                                                                                           | `http://keycloak:18080/auth/realms/camunda-platform/protocol/openid-connect/certs` | -             |
| `OAUTH2_TOKEN_AUDIENCE`                   | Expected value of the access token's audience claim (used for JWT validation);<br/>_must be set to_ `web-modeler`.                                                                                                                                                  | `web-modeler`                                                                      | -             |
| `OAUTH2_TOKEN_ISSUER`                     | URL of the token issuer (used for JWT validation).                                                                                                                                                                                                                  | `https://keycloak.example.com/auth/realms/camunda-platform`                        | -             |
| `CAMUNDA_IDENTITY_USERNAMECLAIM`          | ID token claim used to assign usernames.                                                                                                                                                                                                                            | `preferred_username`                                                               | `name`        |
| `IDENTITY_BASE_URL`                       | [Internal](#notes-on-host-names-and-port-numbers) base URL of the Identity API (used to fetch user data).                                                                                                                                                           | `http://identity:8080`                                                             | -             |

Refer to the [advanced Identity configuration guide](./identity.md) for additional details on how to connect a custom OpenID Connect (OIDC) authentication provider.

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

:::info

- For `LOG_LEVEL_*` options, see [understanding log levels](/self-managed/operational-guides/monitoring/log-levels.md#understanding-log-levels).
- For details on customizing the `webapp` logging output, see [logging configuration for the webapp component](./logging.md#logging-configuration-for-the-webapp-component).

:::

### SSL

| Environment variable             | Description                                                                                            | Example value                   | Default value |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------- | ------------- |
| `SSL_ENABLED`                    | [optional]<br/>Whether to enable SSL support.                                                          | `true`                          | `false`       |
| `SSL_CERT`                       | [optional]<br/>Path to a PEM-encoded SSL certificate file.                                             | `/full/path/to/certificate.pem` | -             |
| `SSL_KEY`                        | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.                         | `/full/path/to/key.pem`         | -             |
| `SSL_PASSPHRASE`                 | [optional]<br/>Passphrase for the private key file.                                                    | `change-me`                     | -             |
| `MANAGEMENT_SSL_ENABLED`         | [optional]<br/>Whether to enable SSL support for management server routes.                             | `true`                          | `false`       |
| `MANAGEMENT_SSL_CERT`            | [optional]<br/>Path to a PEM-encoded SSL certificate file.                                             | `/full/path/to/certificate.pem` | -             |
| `MANAGEMENT_SSL_KEY`             | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.                         | `/full/path/to/key.pem`         | -             |
| `MANAGEMENT_SSL_PASSPHRASE`      | [optional]<br/>Passphrase for the private key file.                                                    | `change-me`                     | -             |
| `RESTAPI_SSL_ENABLED`            | [optional]<br/>Whether to enable communication via SSL to the `restapi` component.                     | `true`                          | `false`       |
| `RESTAPI_MANAGEMENT_SSL_ENABLED` | [optional]<br/>Whether to enable communication via SSL to the `restapi` component's management routes. | `true`                          | `false`       |

Refer to the [advanced SSL configuration guide](./ssl.md) for additional details on how to set up secure connections (incoming & outgoing) to the Web Modeler components.

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

### SSL

| Environment variable    | Description                                                                    | Example value                   | Default Value |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------- | ------------- |
| `PUSHER_SSL_CERT`       | [optional]<br/>Path to a PEM-encoded SSL certificate file.                     | `/full/path/to/certificate.pem` | -             |
| `PUSHER_SSL_KEY`        | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate. | `/full/path/to/key.pem`         | -             |
| `PUSHER_SSL_PASSPHRASE` | [optional]<br/>Passphrase for the private key file.                            | `change-me`                     | -             |

Refer to the [advanced SSL configuration guide](./ssl.md) for additional details on how to set up secure connections (incoming & outgoing) to the Web Modeler components.

## Notes on host names and port numbers

- _Internal_ refers to host names and port numbers that are only used inside a Docker Compose network or Kubernetes cluster for backend-to-backend communication.
- _External_ refers to host names and port numbers that are exposed to the outside and can be reached from a web browser.
