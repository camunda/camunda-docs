---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
description: "Read details on the configuration variables of Console Self-Managed."
---

:::note
Console Self-Managed is available only to [enterprise customers](../../reference/licenses.md#console).
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


You can enable Telemetry and usage collection to help us improve our product by sending several telemetry metrics to Camunda. The information we collect will contribute to continuous product enhancement and help us understand how Camuna is used. We do not collect sensitive information and limit data points to several metrics. For more information, you can download collected data set metrics from the Telemetry page at anytime. You can find an example file (here)[link]

By enabling data collection and reporting, you can get a new page to introspect Camunda 8 components metrics. Usually accessible via Monitoring tools like Prometheus, you can now access these metrics directly in the Console.

To enable Usage collection, configure the parameters described in the next section.

## Configuration Parameters

To enable Telemetry, the following parameters need to be configured. Camunda will provide you with the customer ID (Camunda Docker user name) needed to send telemetry data to Camunda. 
| Parameter           | Description                                                 | Example value     |
| ------------------- | ----------------------------------------------------------- | ----------------- |
| `customerId`        | Unique identifier of the customer. This is also a Camunda   | `customername`    |
|                     | docker registry user name                                   |                   |
| `installationId`    | Unique installation id of the current customer installation | `my-deployment`   |
| `telemetry.enabled` | Boolean flag to enable telemetry for Console Self-Managed   | `true`            |


Console environment variables could be set in Helm. For more details, check [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).
For example:
```yaml
console:
  env:
    - name: CAMUNDA_CONSOLE_CUSTOMERID
      values: customername 
    - name: CAMUNDA_CONSOLE_INSTALLATIONID
      values: my-deployment
    - name: CAMUNDA_CONSOLE_TELEMETRY_ENABLED
      values: true
```

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
| Invalid parameter: redirect_uri          | Ensure the correct redirect URL is configured for the application Console in Identity. The redirect URL must match the Console URL.               |
| JWKS for authentication is not reachable | To verify a user's access token the JWKS needs to be reachable. Make sure the environment variable `KEYCLOAK_INTERNAL_BASE_URL` is set correctly. |
| Console shows error 401                  | Make sure the logged-in user has the role `Console` assigned in the Identity service.                                                             |
