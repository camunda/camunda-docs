---
id: configuration
title: "Console configuration"
sidebar_label: "Overview"
description: "Read details on the configuration variables of Console Self-Managed."
---

Console Self-Managed can be configured using environment variables and configuration parameters.

:::note
Underscores in environment variables correspond to configuration file key levels.
:::

## Environment variables

| Environment variable                            | Description                                                                                                                                                                                                                                                                        | Example value                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `KEYCLOAK_BASE_URL`                             | Base URL for Keycloak                                                                                                                                                                                                                                                              | https://example.com/auth                 |
| `KEYCLOAK_INTERNAL_BASE_URL`                    | Internal base URL for Keycloak                                                                                                                                                                                                                                                     | http://camunda-platform-keycloak:80/auth |
| `KEYCLOAK_REALM`                                | Realm for Keycloak                                                                                                                                                                                                                                                                 | camunda-platform                         |
| `CAMUNDA_IDENTITY_AUDIENCE`                     | Audience for Console client                                                                                                                                                                                                                                                        | console                                  |
| `CAMUNDA_IDENTITY_CLIENT_ID`                    | Client ID for Console client                                                                                                                                                                                                                                                       | console                                  |
| `CAMUNDA_CONSOLE_CONTEXT_PATH`                  | Context path for Console                                                                                                                                                                                                                                                           | console                                  |
| `CAMUNDA_CONSOLE_CUSTOMERID`                    | Unique identifier of the customer                                                                                                                                                                                                                                                  | `customer-id`                            |
| `CAMUNDA_CONSOLE_INSTALLATIONID`                | Unique installation ID of the current customer installation                                                                                                                                                                                                                        | `installation-id`                        |
| `CAMUNDA_CONSOLE_TELEMETRY`                     | Telemetry config for Console Self-Managed: `disabled`, `online`, or `download`                                                                                                                                                                                                     | `online`                                 |
| `CAMUNDA_CONSOLE_DISABLE_AUTH`                  | Disables authentication for Console. With this option, set users don't have to log in to use Console and API requests can be executed without an authorization header. <br /> By disabling authentication, all `CAMUNDA_IDENTITY` variables won't be used.                         | `true`                                   |
| `CAMUNDA_LICENSE_KEY`                           | Your Camunda 8 license key, if your installation requires a license. For Helm installations, license keys can be configured globally in your `values.yaml` file. See the [Helm installation documentation](/self-managed/setup/install.md#configure-license-key) for more details. | N/A                                      |
| `SERVER_SSL_ENABLED`                            | [optional]<br/>Whether to enable SSL support.<br/>Default: `false`                                                                                                                                                                                                                 | `true`                                   |
| `SERVER_SSL_CERTIFICATE`                        | [optional]<br/>Path to a PEM-encoded SSL certificate file.                                                                                                                                                                                                                         | `file:/full/path/to/certificate.pem`     |
| `SERVER_SSL_CERTIFICATE_PRIVATE_KEY`            | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.                                                                                                                                                                                                     | `file:/full/path/to/key.pem`             |
| `SERVER_SSL_PASSPHRASE`                         | [optional]<br/>Passphrase for the key.                                                                                                                                                                                                                                             | `passphrase`                             |
| `MANAGEMENT_SERVER_SSL_ENABLED`                 | [optional]<br/>Whether to enable SSL support for the management server routes.<br/>Default: `false`                                                                                                                                                                                | `true`                                   |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE`             | [optional]<br/>Path to a PEM-encoded SSL certificate file.                                                                                                                                                                                                                         | `file:/full/path/to/certificate.pem`     |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY` | [optional]<br/>Path to a PEM-encoded private key file for the SSL certificate.                                                                                                                                                                                                     | `file:/full/path/to/key.pem`             |
| `MANAGEMENT_SERVER_SSL_PASSPHRASE`              | [optional]<br/>Passphrase for the key.                                                                                                                                                                                                                                             | `passphrase`                             |

Console environment variables could be set in Helm via the `console.env` key. For more details, check [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on Console startup or functionality. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

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

## Telemetry

You can enable telemetry and usage collection to help us improve our product by sending several telemetry metrics to Camunda. The information we collect will contribute to continuous product enhancement and help us understand how Camunda is used. We do not collect sensitive information and limit data points to several metrics. For more information, you can download collected data set metrics from the telemetry page at anytime.

By enabling data collection and reporting, you can get a new page to introspect Camunda 8 component metrics. Usually accessible via monitoring tools like Prometheus, you can now access these metrics directly in Console. By default, telemetry collection is disabled and no data is collected.
When `CAMUNDA_CONSOLE_TELEMETRY` env var or `telemetry` parameter is set to `online`, the telemetry feature is activated and the collected data is sent once every 24 hours via HTTPS.
When `CAMUNDA_CONSOLE_TELEMETRY` env var or `telemetry` parameter is set to `download`, the telemetry feature is activated. Data collected **will not** be sent to Camuda automatically, but could be downloaded from Console and shared with us on request.

To enable usage collection, configure the parameters described in the next section.

## Configuration parameters

To enable telemetry, the following parameters need to be configured. Camunda will provide you with the customer ID (Camunda Docker username) needed to send telemetry data to Camunda.

| Parameter                            | Description                                                                                                                                          | Example value                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `customerId`                         | Unique identifier of the customer. This is also a Camunda Docker registry username.                                                                  | `customername`                |
| `installationId`                     | Unique installation ID of the current customer installation.                                                                                         | `my-deployment`               |
| `telemetry`                          | Telemetry config for Console Self-Managed: `disabled`, `online`, or `download`.                                                                      | `online`                      |
| `managed.releases.tags`              | Assign cluster tags to indicate what type of cluster it is. Default tags are `dev`, `stage`, `test`, or `prod`, but users can assign any custom tag. | `- dev` (list of strings)     |
| `managed.releases.custom-properties` | List of custom properties users can add to their cluster with custom descriptions and custom links on the cluster details page.                      | See custom properties section |

Console environment variables could be set in Helm. For more details, check [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).
For example:

```yaml
console:
  env:
    - name: CAMUNDA_CONSOLE_CUSTOMERID
      values: customername
    - name: CAMUNDA_CONSOLE_INSTALLATIONID
      values: my-deployment
    - name: CAMUNDA_CONSOLE_TELEMETRY
      value: online
```

### Override configuration parameters

Configuration parameters formerly replaced the complete configuration. Even if you only changed the `customerId`, the complete configuration still had to be added.

This is no longer the case with the override parameters. A subset of parameters can be set so individual parameters can be adjusted. If a parameter must be changed for a specific cluster, the `name` and `namespace` fields must be set with the exact values so correlations can be made accordingly.

#### Example

Given the following configuration provided by Helm:

```yaml
camunda:
  console:
    customerId: customer-id
    installationId: camunda-platform-id-dev-console-sm-main
    telemetry: disabled
    managed:
      method: plain
      releases:
        - name: camunda-platform
          namespace: camunda-platform-namespace
          version: 9.1.2
          components:
            - name: Console
              id: console
              version: ...
              url: https://...
              readiness: https://...
              metrics: https://...
            - name: Keycloak
              id: keycloak
              version: ...
              url: https://...
            - name: Identity
              id: identity
              version: ...
              url: https://...
              readiness: https://...
              metrics: https://...
            - name: WebModeler WebApp
              id: webModelerWebApp
              version: ...
              url: https://...
            - name: Zeebe Gateway
              id: zeebeGateway
              version: ...
              urls:
                grpc: grpc://...
                http: https://...
              readiness: https://...
              metrics: https://...
            - name: Zeebe
              id: zeebe
              version: ...
```

The following example of an `overrideConfiguration` changes the `customerId` and adds `tags` and `custom-properties` for the cluster with name `camunda-platform` in namespace `camunda-platform-namespace`:

```yaml
console:
  overrideConfiguration:
    camunda:
      console:
        customerId: "new-customer-id"
        managed:
          releases:
            - name: camunda-platform
              namespace: camunda-platform-namespace
              tags:
                - production
              custom-properties:
                - description: "This is a custom description of the cluster."
                  links:
                    - name: "Camunda"
                      url: "https://camunda.com"
                    - name: "Camunda Docs"
                      url: "https://docs.camunda.io"
                    - name: "Grafana"
                      url: "https://..."
```

### Custom properties

Custom properties are useful to add custom information to the **Cluster details** page in Console. A custom property contains a description and multiple links.

The following example shows one custom property for a cluster:

```yaml
console:
  overrideConfiguration:
    camunda:
      console:
        customerId: "new-customer-id"
        managed:
          releases:
            - name: camunda-platform
              namespace: camunda-platform
              custom-properties:
                - description: "Useful links to Camunda resources."
                  links:
                    - name: "Camunda Blog"
                      url: "https://camunda.com/blog/"
                    - name: "Camunda Docs"
                      url: "https://docs.camunda.io"
```

## Using a different OpenID Connect (OIDC) authentication provider than Keycloak

By default, Console uses Keycloak to provide authentication.
You can use a different OIDC provider by following the steps described in the [OIDC connection guide](/self-managed/setup/guides/connect-to-an-oidc-provider.md).

## Monitoring

To help understand how Console operates, we expose the following endpoints by default:

| Endpoint                                         | Port   | Path                |
| ------------------------------------------------ | ------ | ------------------- |
| Metrics endpoint with default Prometheus metrics | `9100` | `/prometheus`       |
| Readiness probe                                  | `9100` | `/health/readiness` |
| Liveness probe                                   | `9100` | `/health/liveness`  |

## Troubleshooting

| Problem                                  | Solution                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invalid parameter: redirect_uri          | Ensure the correct redirect URL is configured for the application Console in Identity. The redirect URL must match the Console URL.               |
| JWKS for authentication is not reachable | To verify a user's access token the JWKS needs to be reachable. Make sure the environment variable `KEYCLOAK_INTERNAL_BASE_URL` is set correctly. |
| Console shows error 401                  | Make sure the logged-in user has the role `Console` assigned in the Identity service.                                                             |
