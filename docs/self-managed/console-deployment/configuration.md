---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
description: "Read details on the configuration variables of Console Self-Managed."
---

Console Self-Managed can be configured using environment variables, configuration parameters, or a combination of both. When configuring your Console setup, keep in mind the following:

- If both configuration files and environment variables are present, environment variables overwrite settings in configuration files.
- The existing configuration is applied at startup, and changes made to the configuration will not be applied at runtime.

For more information on Self-Managed configuration options, see [configuring components](/self-managed/operational-guides/application-configs.md).

## Configuration options

### Environment variables

:::note
Underscores in environment variables correspond to configuration file key levels.
:::

| Environment variable             | Description                                                                                                                                                                                                                                                                        | Example value                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `KEYCLOAK_BASE_URL`              | Base URL for Keycloak                                                                                                                                                                                                                                                              | https://example.com/auth                 |
| `KEYCLOAK_INTERNAL_BASE_URL`     | Internal Base URL for Keycloak                                                                                                                                                                                                                                                     | http://camunda-platform-keycloak:80/auth |
| `KEYCLOAK_REALM`                 | Realm for Keycloak                                                                                                                                                                                                                                                                 | camunda-platform                         |
| `CAMUNDA_IDENTITY_AUDIENCE`      | Audience for Console client                                                                                                                                                                                                                                                        | console                                  |
| `CAMUNDA_IDENTITY_CLIENT_ID`     | Client ID for Console client                                                                                                                                                                                                                                                       | console                                  |
| `CAMUNDA_CONSOLE_CONTEXT_PATH`   | Context path for Console                                                                                                                                                                                                                                                           | console                                  |
| `CAMUNDA_CONSOLE_CUSTOMERID`     | Unique identifier of the customer                                                                                                                                                                                                                                                  | `customer-id`                            |
| `CAMUNDA_CONSOLE_INSTALLATIONID` | Unique installation ID of the current customer installation                                                                                                                                                                                                                        | `installation-id`                        |
| `CAMUNDA_CONSOLE_TELEMETRY`      | Telemetry config for Console Self-Managed: `disabled`, `online`, or `download`                                                                                                                                                                                                     | `online`                                 |
| `CAMUNDA_CONSOLE_DISABLE_AUTH`   | Disables authentication for Console. With this option, set users don't have to log in to use Console and API requests can be executed without an Authorization header. <br /> By disabling authentication all `CAMUNDA_IDENTITY`, variables won't be used.                         | `true`                                   |
| `CAMUNDA_LICENSE_KEY`            | Your Camunda 8 license key, if your installation requires a license. For Helm installations, license keys can be configured globally in your `values.yaml` file. See the [Helm installation documentation](/self-managed/setup/install.md#configure-license-key) for more details. | N/A                                      |

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on Console startup or functionality. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### Helm configuration

Console environment variables can also be set via Helm using the `console.env` key. For more information, see the available [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).

## Telemetry

You can enable telemetry and usage collection to help us improve our product by sending several telemetry metrics to Camunda. The information we collect will contribute to continuous product enhancement and help us understand how Camunda is used. We do not collect sensitive information and limit data points to several metrics. For more information, you can download collected data set metrics from the telemetry page at anytime.

By enabling data collection and reporting, you can get a new page to introspect Camunda 8 component metrics. Usually accessible via monitoring tools like Prometheus, you can now access these metrics directly in Console. By default, telemetry collection is disabled and no data is collected.
When `CAMUNDA_CONSOLE_TELEMETRY` env var or `telemetry` parameter is set to `online`, the telemetry feature is activated and the collected data is sent once every 24 hours via HTTPS.
When `CAMUNDA_CONSOLE_TELEMETRY` env var or `telemetry` parameter is set to `download`, the telemetry feature is activated. Data collected **will not** be sent to Camuda automatically, but could be downloaded from Console and shared with us on request.

To enable usage collection, configure the parameters described in the next section.

### Configuration parameters

To enable telemetry, the following parameters need to be configured. Camunda will provide you with the customer ID (Camunda Docker username) needed to send telemetry data to Camunda.

| Parameter        | Description                                                                         | Example value   |
| ---------------- | ----------------------------------------------------------------------------------- | --------------- |
| `customerId`     | Unique identifier of the customer. This is also a Camunda Docker registry user name | `customername`  |
| `installationId` | Unique installation ID of the current customer installation                         | `my-deployment` |
| `telemetry`      | Telemetry config for Console Self-Managed: `disabled`, `online` or `download`       | `online`        |

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

## Configure an OpenID Connect (OIDC) provider other than Keycloak

By default, Console uses Keycloak to provide authentication. Use a different OIDC provider by following the steps described in the [OIDC connection guide](/self-managed/setup/guides/connect-to-an-oidc-provider.md).

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
