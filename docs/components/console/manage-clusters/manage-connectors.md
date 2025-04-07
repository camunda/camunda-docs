---
id: cluster-connectors
title: Manage your connectors
description: "In Console you can monitor and manage the connectors you have running on your cluster on the Connector Management page."
---

import ManageImg from './img/cluster-manage-connectors.png';
import ConnectorManagementImg from './img/cluster-connector-management-page.png';
import ConnectorDetailsImg from './img/cluster-connector-instance-details.png';
import ConnectorProcessDetailsImg from './img/cluster-connector-process-details.png';
import ConnectorProcessErrorImg from './img/cluster-connector-instance-error.png';

Monitor and manage inbound connectors running on your cluster.

## About connector management

Cluster connector management allows you to monitor and manage your running inbound connector [webhooks, message queue subscriptions, and polling subscriptions](/reference/glossary.md#inbound-connector).

- Use this feature to check your inbound connectors are healthy and running, and troubleshoot unhealthy connectors.
- For example, you can see if a connector instance is unhealthy, and use the [activity log](#activity-log) to troubleshoot and resolve issues.

## Connector Management

To open the **Connector Management** page, on the cluster **Overview** tab, click **Manage** on the Connectors component tile.

<img src={ManageImg} alt="Manage connectors on the Connectors component tile" style={{marginTop: '0'}}/>

The **Connector Management** page provides an overview of the inbound connectors running on a cluster:

<img src={ConnectorManagementImg} alt="Connector management page" style={{marginTop: '0'}}/>

- Each inbound connector running on the cluster is shown on a separate row.
- **Name**: The name of the connector. Click to view details of the connector instances for this connector.
- **Active instances**: How many process instances are running for the connector. The icon indicates if the running connector instances are healthy or require attention.

:::note
[Webhook connector](/components/connectors/protocol/http-webhook.md) names also include the names of any connector based on the webhook. For example, "_Webhook (aws:eventbridge, GitHubWebhook)_".
:::

## View connector instances

Select an individual connector to view the running instances for the connector.

<img src={ConnectorDetailsImg} alt="Connector management page" style={{marginTop: '0'}}/>

- Each connector process instance is shown on a separate row.
- **Connectors instance ID**: The ID of the connector instance. Click to view further details for an individual connector instance.
- **Elements**: The element that the process instance is active for. This helps you locate the element in your BPMN diagram.
- **Process** The process instance ID and version.
- **Activation date**: The date and time when the instance was activated.
- **Status**: The health of the connector instance.
  - **Healthy**: The connector is running without problems in the process.
  - **Unhealthy**: There are unresolved issues with the connector instance. View the details of the instance to troubleshoot the problem, for example by using the activity log to determine what the issue is and how to resolve it.

## View connectors instance details

Select an individual connector running instance to view additional details and troubleshoot issues.

<img src={ConnectorProcessDetailsImg} alt="Connector management page." style={{marginTop: '0'}}/>

### Activity log

Shows details of the last ten activities recorded for the connector, such as an API method (GET, POST, PUT, and DELETE) or message subscription. You can use these logs to troubleshoot unhealthy connector instances.

For example, the following activity log shows that there is an exception caused by an invalid URL in a Kafka connector.

<img src={ConnectorProcessErrorImg} alt="Connector management page" style={{marginTop: '0', width: '600px'}}/>

### Properties

Shows general properties for the connector template as a JSON object.

For example:

```json
{
  "deduplicationModeManualFlag": "false",
  "schemaStrategy.type": "noSchema",
  "topic.topicName": "rereer",
  "authenticationType": "credentials",
  "correlationRequired": "notRequired",
  "topic.bootstrapServers": "eererreer",
  "autoOffsetReset": "latest"
}
```

### Process info

Shows more detailed information of the BPMN process instance and its associated connector as a JSON object. You can view additional metadata about the process, the connector template, and the connector's configuration properties.

For example:

```json
[
  {
    "bpmnProcessId": "Process_0wjo4ez",
    "version": 1,
    "processDefinitionKey": 2251799813686169,
    "elementId": "StartEvent_1",
    "elementName": null,
    "elementType": "startEvent",
    "tenantId": "<default>",
    "elementTemplateDetails": {
      "id": "io.camunda.connectors.inbound.KafkaMessageStart.v1",
      "version": "6",
      "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgnIGhlaWdodD0nMTgnIHZpZXdCb3g9JzAgMCAyNTYgNDE2JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaWRZTWlkJz4KICAgIDxwYXRoIGQ9J00yMDEuODE2IDIzMC4yMTZjLTE2LjE4NiAwLTMwLjY5NyA3LjE3MS00MC42MzQgMTguNDYxbC0yNS40NjMtMTguMDI2YzIuNzAzLTcuNDQyIDQuMjU1LTE1LjQzMyA0LjI1NS0yMy43OTcgMC04LjIxOS0xLjQ5OC0xNi4wNzYtNC4xMTItMjMuNDA4bDI1LjQwNi0xNy44MzVjOS45MzYgMTEuMjMzIDI0LjQwOSAxOC4zNjUgNDAuNTQ4IDE4LjM2NSAyOS44NzUgMCA1NC4xODQtMjQuMzA1IDU0LjE4NC01NC4xODQgMC0yOS44NzktMjQuMzA5LTU0LjE4NC01NC4xODQtNTQuMTg0LTI5Ljg3NSAwLTU0LjE4NCAyNC4zMDUtNTQuMTg0IDU0LjE4NCAwIDUuMzQ4LjgwOCAxMC41MDUgMi4yNTggMTUuMzg5bC0yNS40MjMgMTcuODQ0Yy0xMC42Mi0xMy4xNzUtMjUuOTExLTIyLjM3NC00My4zMzMtMjUuMTgydi0zMC42NGMyNC41NDQtNS4xNTUgNDMuMDM3LTI2Ljk2MiA0My4wMzctNTMuMDE5QzEyNC4xNzEgMjQuMzA1IDk5Ljg2MiAwIDY5Ljk4NyAwIDQwLjExMiAwIDE1LjgwMyAyNC4zMDUgMTUuODAzIDU0LjE4NGMwIDI1LjcwOCAxOC4wMTQgNDcuMjQ2IDQyLjA2NyA1Mi43Njl2MzEuMDM4QzI1LjA0NCAxNDMuNzUzIDAgMTcyLjQwMSAwIDIwNi44NTRjMCAzNC42MjEgMjUuMjkyIDYzLjM3NCA1OC4zNTUgNjguOTR2MzIuNzc0Yy0yNC4yOTkgNS4zNDEtNDIuNTUyIDI3LjAxMS00Mi41NTIgNTIuODk0IDAgMjkuODc5IDI0LjMwOSA1NC4xODQgNTQuMTg0IDU0LjE4NCAyOS44NzUgMCA1NC4xODQtMjQuMzA1IDU0LjE4NC01NC4xODQgMC0yNS44ODMtMTguMjUzLTQ3LjU1My00Mi41NTItNTIuODk0di0zMi43NzVhNjkuOTY1IDY5Ljk2NSAwIDAgMCA0Mi42LTI0Ljc3NmwyNS42MzMgMTguMTQzYy0xLjQyMyA0Ljg0LTIuMjIgOS45NDYtMi4yMiAxNS4yNCAwIDI5Ljg3OSAyNC4zMDkgNTQuMTg0IDU0LjE4NCA1NC4xODQgMjkuODc1IDAgNTQuMTg0LTI0LjMwNSA1NC4xODQtNTQuMTg0IDAtMjkuODc5LTI0LjMwOS01NC4xODQtNTQuMTg0LTU0LjE4NHptMC0xMjYuNjk1YzE0LjQ4NyAwIDI2LjI3IDExLjc4OCAyNi4yNyAyNi4yNzFzLTExLjc4MyAyNi4yNy0yNi4yNyAyNi4yNy0yNi4yNy0xMS43ODctMjYuMjctMjYuMjdjMC0xNC40ODMgMTEuNzgzLTI2LjI3MSAyNi4yNy0yNi4yNzF6bS0xNTguMS00OS4zMzdjMC0xNC40ODMgMTEuNzg0LTI2LjI3IDI2LjI3MS0yNi4yN3MyNi4yNyAxMS43ODcgMjYuMjcgMjYuMjdjMCAxNC40ODMtMTEuNzgzIDI2LjI3LTI2LjI3IDI2LjI3cy0yNi4yNzEtMTEuNzg3LTI2LjI3MS0yNi4yN3ptNTIuNTQxIDMwNy4yNzhjMCAxNC40ODMtMTEuNzgzIDI2LjI3LTI2LjI3IDI2LjI3cy0yNi4yNzEtMTEuNzg3LTI2LjI3MS0yNi4yN2MwLTE0LjQ4MyAxMS43ODQtMjYuMjcgMjYuMjcxLTI2LjI3czI2LjI3IDExLjc4NyAyNi4yNyAyNi4yN3ptLTI2LjI3Mi0xMTcuOTdjLTIwLjIwNSAwLTM2LjY0Mi0xNi40MzQtMzYuNjQyLTM2LjYzOCAwLTIwLjIwNSAxNi40MzctMzYuNjQyIDM2LjY0Mi0zNi42NDIgMjAuMjA0IDAgMzYuNjQxIDE2LjQzNyAzNi42NDEgMzYuNjQyIDAgMjAuMjA0LTE2LjQzNyAzNi42MzgtMzYuNjQxIDM2LjYzOHptMTMxLjgzMSA2Ny4xNzljLTE0LjQ4NyAwLTI2LjI3LTExLjc4OC0yNi4yNy0yNi4yNzFzMTEuNzgzLTI2LjI3IDI2LjI3LTI2LjI3IDI2LjI3IDExLjc4NyAyNi4yNyAyNi4yN2MwIDE0LjQ4My0xMS43ODMgMjYuMjcxLTI2LjI3IDI2LjI3MXonCiAgICAgICAgICBzdHlsZT0nZmlsbDojMjMxZjIwJy8+Cjw"
    },
    "properties": {
      "deduplicationMode": "AUTO",
      "deduplicationModeManualFlag": "false",
      "schemaStrategy.type": "noSchema",
      "topic.topicName": "rereer",
      "consumeUnmatchedEvents": "true",
      "inbound.type": "io.camunda:connector-kafka-inbound:1",
      "authenticationType": "credentials",
      "correlationRequired": "notRequired",
      "topic.bootstrapServers": "eererreer",
      "autoOffsetReset": "latest"
    }
  }
]
```

:::note
If you are using deduplication, each connector occurrence in the BPMN diagram is shown in the array.
:::
