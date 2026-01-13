---
id: set-up-cluster-metrics-endpoint
title: Set up the Cluster Metrics endpoint
description: Learn how to set up the Cluster Metrics endpoint in Camunda 8 SaaS, manage credentials, and obtain the connection details required to integrate with your monitoring system.
---

Set up and manage the Cluster Metrics endpoint for a Camunda 8 SaaS Orchestration cluster, including how to activate and deactivate the endpoint and obtain the connection details required to integrate it with an external monitoring system.

## Before you begin

Before enabling the Cluster Metrics endpoint, ensure that:

- You are using Camunda 8 SaaS.
- You have access to Console and have permission to manage cluster-level settings.
- If allowlisting is configured for your cluster, the monitoring system’s source IP addresses are added to the cluster IP allowlist.

## Enable Cluster Metrics endpoint

Enable the Cluster Metrics endpoint per Orchestration cluster via either the Camunda Console or API. When the endpoint is enabled, Camunda provisions a secure, cluster-scoped metrics endpoint for external scraping.

To activate the endpoint:

1. Sign in to Camunda Console.
1. Navigate to **Clusters**.
1. Select an existing cluster, or create a new one.
1. Open the **Monitoring** tab for the cluster.
1. Click **Activate monitoring endpoint**.
1. Enter a **username** for the monitoring credentials.
1. Click **Activate**.

### Capture connection details

When the Cluster Metrics endpoint is activated, the Console displays a dialog containing the authentication credentials.

1. Copy and store the password securely.
1. Click **Got it** to close the dialog.

After closing the dialog, you can find the metrics endpoint URL in the **Monitoring** tab for the cluster.

:::warning
Copy and safely store the password when it is displayed. The password is not shown again after you close the dialog. If you lose it, generate a new password.
:::

The following information is required to connect your monitoring system:

- **Metrics endpoint URL**: HTTPS endpoint used by your monitoring system to scrape metrics.
- **Username**: Used for Basic Authentication.
- **Password**: Used for Basic Authentication.

## Manage authentication credentials

Authentication credentials are created and managed in Camunda Console.

### Create additional credentials

You can create up to 20 credentials per cluster.

To create additional credentials:

1. On the **Monitoring** tab, click **Create new credentials**.
1. Enter a username.
1. Generate and copy the password when it is displayed.

### Rotate credentials

Ƭo rotate a password:

1. On the **Monitoring** tab, locate the credential.
1. Click the **Generate password** icon next to the username.
1. Generate and copy the new password when prompted.

When credentials are removed or rotated, previously issued credentials may continue to work briefly. Access may persist for up to five minutes before the credentials are fully invalidated.

To avoid interruptions during credential rotation, you can create multiple credentials for the same cluster and update your monitoring system to switch between credentials, rather than rotating a single credential in place.

## Authentication and IP allowlisting

The Cluster Metrics endpoint enforces both authentication and network restrictions.

| Restriction     | Description                                                                                                                                                                                                                                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication  | The endpoint uses Basic Authentication.                                                                                                                                                                                                                                                                          |
| IP allowlisting | The endpoint enforces the cluster-level IP allowlist. <ul><li><p>Requests from non-allowlisted IP addresses are rejected.</p></li><li><p>If an IP allowlist is configured for the cluster, you must add the source IP addresses of your monitoring system to the allowlist to access the endpoint.</p></li></ul> |

### Error responses

The Cluster Metrics endpoint returns standard HTTP status codes to indicate access and availability issues:

| Scenario                                       | HTTP status code          |
| :--------------------------------------------- | :------------------------ |
| Request from a non-allowlisted IP address.     | `403 Forbidden`           |
| Invalid or missing authentication credentials. | `401 Unauthorized`        |
| Request rate exceeds allowed limits.           | `429 Too Many Requests`   |
| Metrics endpoint is temporarily unavailable.   | `503 Service Unavailable` |
| Request times out due to high load.            | `504 Gateway Timeout`     |

## Disable the Cluster Metrics endpoint

If you no longer want to expose cluster metrics externally, you can disable the Cluster Metrics endpoint:

- Click **Deactivate** in the **Monitoring** tab, or
- Delete all credentials associated with the endpoint

When the Cluster Metrics endpoint is disabled:

- The monitoring endpoint is shut down almost immediately (typically within a few seconds).
- All existing credentials are deleted and are not retained if the endpoint is reactivated.
- Monitoring systems can no longer scrape metrics from the cluster.

To use the endpoint again, you must reactivate it and create new credentials. Disabling the Cluster Metrics endpoint does not affect cluster operation or workload execution.

## Next steps

- To configure Prometheus to scrape metrics from the Cluster Metrics endpoint, see [Configure monitoring systems to scrape metrics](/components/saas/monitoring/cluster-metrics-endpoint/configure-monitoring-systems-to-scrape-metrics.md).
- If your monitoring system does not support Prometheus scraping, see [Integrate non-Prometheus monitoring systems](/components/saas/monitoring/cluster-metrics-endpoint/configure-monitoring-systems-to-scrape-metrics.md#integrate-non-prometheus-monitoring-systems).
