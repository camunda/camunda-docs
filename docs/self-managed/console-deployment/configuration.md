---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
description: "Read details on the configuration variables of Console Self-Managed."
---

:::note
Console Self-Managed is available to [enterprise customers](../../reference/licenses.md#web-modeler) only.
:::

Console Self-Managed can be configured using environment variables and configuration parameters.

## Environment Variables

| Environment variable           | Description                  | Example value            |
| ------------------------------ | ---------------------------- | ------------------------ |
| `KEYCLOAK_BASE_URL`            | Base URL for Identity        | https://example.com/auth |
| `KEYCLOAK_REALM`               | Realm for Identity           | camunda-platform         |
| `CAMUNDA_IDENTITY_AUDIENCE`    | Audience for Console client  | console                  |
| `CAMUNDA_IDENTITY_CLIENT_ID`   | Client Id for Console client | console                  |
| `CAMUNDA_CONSOLE_CONTEXT_PATH` | Context path for Console     | console                  |

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

## Montioring

To help understand how the Console operates, we expose the following endpoints by default:

| Endpoint                                          | Port   | Path                |
| ------------------------------------------------- | ------ | ------------------- |
| Metrics endpoint with default Prometheus metrics. | `9100` | `/prometheus`       |
| Readiness Probe                                   | `9100` | `/health/readiness` |
| Liveness Probe                                    | `9100` | `/health/liveness`  |
