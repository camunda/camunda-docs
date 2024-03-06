---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
description: "Read details on the configuration variables of Console Self-Managed."
---

:::note
Console Self-Managed is available to [enterprise customers](../../reference/licenses.md#console) only.
:::

Console Self-Managed can be configured using environment variables and configuration parameters.

## Environment Variables

| Environment variable                | Description                                                 | Example value                            |
| ----------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| `KEYCLOAK_BASE_URL`                 | Base URL for Keycloak                                       | https://example.com/auth                 |
| `KEYCLOAK_INTERNAL_BASE_URL`        | Internal Base URL for Keycloak                              | http://camunda-platform-keycloak:80/auth |
| `KEYCLOAK_REALM`                    | Realm for Keycloak                                          | camunda-platform                         |
| `CAMUNDA_IDENTITY_AUDIENCE`         | Audience for Console client                                 | console                                  |
| `CAMUNDA_IDENTITY_CLIENT_ID`        | Client Id for Console client                                | console                                  |
| `CAMUNDA_CONSOLE_CONTEXT_PATH`      | Context path for Console                                    | console                                  |
| `CAMUNDA_CONSOLE_CUSTOMERID`        | Unique identifier of the customer                           | `customer-id`                            |
| `CAMUNDA_CONSOLE_INSTALLATIONID`    | Unique installation id of the current customer installation | `installation-id`                        |
| `CAMUNDA_CONSOLE_TELEMETRY_ENABLED` | Boolean flag to enable telemetry for Console Self-Managed   | `true`                                   |

Console environment variables could be set in Helm via the `console.env` key. For more details, check [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).

## Telemetry

You can enable Telemetry and usage collection to help us improve our product by sending several telemetry metrics to Camunda. The information we collect will contribute to continuous product enhancement and help us understand how Camuna is used. We do not collect sensitive information and limit data points to several metrics. You can download collected data set metrics from the Telemetry page anytime for more information. You can find an example file (here)[link]

By enabling data collection and reporting, you can get a new page to introspect Camunda 8 components metrics. Usually accessible via Montiroing tools like Prometheus, you can now access these metrics directly in the Console.

To enable Usage collection configure the parameters described in the next section.

## Configuration Parameters

To enable Telemetry the following parameters need to be configured. Camunda will provide you the API token that is needed for sending telemetry data to Camunda.

| Parameter           | Description                                                 | Example value     |
| ------------------- | ----------------------------------------------------------- | ----------------- |
| `customerId`        | Unique identifier of the customer                           | `customer-id`     |
| `installationId`    | Unique installation id of the current customer installation | `installation-id` |
| `telemetry.enabled` | Boolean flag to enable telemetry for Console Self-Managed   | `true`            |

Console environment variables could be set in Helm via the `console.configuration` key. For more details, check [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).

## Montioring

To help understand how the Console operates, we expose the following endpoints by default:

| Endpoint                                          | Port   | Path                |
| ------------------------------------------------- | ------ | ------------------- |
| Metrics endpoint with default Prometheus metrics. | `9100` | `/prometheus`       |
| Readiness Probe                                   | `9100` | `/health/readiness` |
| Liveness Probe                                    | `9100` | `/health/liveness`  |

## Troubleshooting

| Problem                                  | Solution                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invalid parameter: redirect_uri          | Make sure the correct redirect url is configured for application Console in Identity. The redirect url needs to exactly match the url of Console. |
| JWKS for authentication is not reachable | To verify a user's access token the JWKS needs to be reachable. Make sure the environment variable `KEYCLOAK_INTERNAL_BASE_URL` is set correctly. |
| Console shows error 401                  | Make sure the logged in user has the role `Console` assigned.                                                                                     |
