---
id: cluster-connectors
title: Manage connectors
description: "Manage and view your connectors."
---

import ManageImg from './img/cluster-manage-connectors.png';
import ConnectorManagementImg from './img/cluster-connector-management-page.png';
import ConnectorDetailsImg from './img/cluster-connector-instance-details.png';
import ConnectorProcessDetailsImg from './img/cluster-connector-process-details.png';

Monitor and manage inbound connectors running on your cluster.

## About connector management

Cluster connector management allows you to monitor and manage your running webhooks, message queue subscriptions, and polling subscriptions. Use this feature to check your inbound connectors are healthy and running, and troubleshoot unhealthy connectors.

For example,

## Connector Management

To open the **Connector Management** page, on the cluster **Overview** tab, click **Manage** on the Connectors component tile.

<img src={ManageImg} alt="Manage connectors on the Connectors component tile" style={{marginTop: '0'}}/>

The **Connector Management** page provides an overview of the inbound connectors running on a cluster:

<img src={ConnectorManagementImg} alt="Connector management page" style={{marginTop: '0'}}/>

- Each inbound connector running on the cluster is shown on a separate row.
- **Name**: The name of the connector. Click to view details of the connector instances for this connector.
- **Active instances**: How many process instances are running for the connector. The icon indicates if the running connector instances are healthy or require attention.

:::note
[Webhook connector](/components/connectors/protocol/http-webhook.md) names also include the names of any connector used by the webhook. For example, "_Webhook (aws:eventbridge, GitHubWebhook, GitHubWebhook)_".
:::

## View connector instances

Drill down into an individual connector to view the running instances for the connector.

<img src={ConnectorDetailsImg} alt="Connector management page" style={{marginTop: '0'}}/>

- Each connector process instance is shown on a separate row.
- **Connectors instance ID**: The ID of the connector instance. Click to view further details for an individual connector instance.
- **Elements**: The element that the process instance is active for. This helps you locate the element in your BPMN diagram.
- **Process** The process instance ID and version.
- **Activation date**: The date and time when the instance was activated.
- **Status**: The health status of the connector instance.
  - **Healthy**: The connector is running without problems in the process.
  - **Unhealthy**: There are unresolved issues with the connector instance. View the details of the instance to troubleshoot the problem, for example by using the activity log to determine what the issue is and how to resolve it.

## View connectors instance details

Drill down into an individual running instance for the connector to view troubleshooting details.

<img src={ConnectorProcessDetailsImg} alt="Connector management page." style={{marginTop: '0'}}/>

### Process details

### Activity log

:::note
Only the last ten activities are shown in the activity log.
:::

### Properties

General properties as JSON

### Process info

More detailed info - as an array, if you are using deduplication you might have more

## Troubleshooting connectors
