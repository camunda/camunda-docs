---
id: cluster-connectors
title: Manage your connectors
description: "In Camunda Hub you can monitor and manage the connectors running on your cluster on the Connector Management page."
---

import ManageImg from './img/cluster-manage-connectors.png';
import ConnectorManagementImg from './img/cluster-connector-management-page.png';
import ConnectorDetailsImg from './img/cluster-connector-instance-details.png';
import ConnectorProcessDetailsImg from './img/cluster-connector-process-details.png';
import ConnectorProcessErrorImg from './img/cluster-connector-instance-error.png';
import OutboundConnectorManagementImg from './img/cluster-connector-outbound-management.png';
import OutboundConnectorDetailsImg from './img/cluster-connector-outbound-details.png';

Monitor and manage connectors running on your cluster.

## About connector management

Cluster connector management allows you to monitor and manage running connectors on your cluster. This includes inbound connectors, such as [webhooks, message queue subscriptions, and polling subscriptions](/reference/glossary.md#inbound-connector), and outbound connectors.

- Use this feature to review connector status and troubleshoot issues.
- For example, you can inspect connector details and use the [activity log](#activity-log) to investigate failures.

## Connector management

To open the **Connector Management** page, on the cluster **Overview** tab, click **Manage** on the Connectors component tile.

The **Connector Management** page provides an overview of the connectors running on a cluster.

- Each connector is shown on a separate row.
- Use this page to review connector status, inspect details, and troubleshoot issues.
- Available details depend on the connector type.

:::note
[Webhook connector](/components/connectors/protocol/http-webhook.md) names also include the names of any connector based on the webhook. For example, "_Webhook (aws:eventbridge, GitHubWebhook)_".
:::

## View inbound connectors

On the **Inbound connectors** tab, active inbound connector types are shown on separate rows.

<img src={ConnectorManagementImg} alt="Connector management page" />

The page header shows counts across all inbound connector instances:

| Field               | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| Unhealthy instances | The total number of unhealthy inbound connector instances across all connector types. |
| Unknown instances   | The total number of inbound connector instances with an unknown status.               |
| Total instances     | The total number of inbound connector instances running.                              |
| Connector types     | The number of distinct inbound connector types with active instances.                 |

Use the search box and status filter to narrow the list of active inbound connectors. Each connector type shows aggregated counts for its instances:

| Field              | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| Name               | The name and type ID of the inbound connector. Select it to view its running instances. |
| Unhealthy          | The number of instances currently unhealthy.                                            |
| Unknown            | The number of instances with an unknown status.                                         |
| Healthy            | The number of instances currently healthy.                                              |
| Triggers           | The total number of triggers recorded for this connector type.                          |
| Correlation failed | The total number of correlation failures recorded for this connector type.              |

## View inbound connector instances

Select an inbound connector to view its running instances.

<img src={ConnectorDetailsImg} alt="Connector management page" />

The page header shows counts for the selected connector:

| Field                        | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| Active inbound executables   | The number of active instances for this connector.                              |
| Triggers (total)             | The total number of triggers recorded since the last runtime start.             |
| Correlation failures (total) | The total number of correlation failures recorded since the last runtime start. |

By default, each inbound connector instance is shown on a separate row below the header counts.

| Field     | Description                                                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process   | The process ID and version associated with the connector instance. Select it to open the process in Operate.                                                                                                                                   |
| Elements  | The BPMN element where the connector is active. Use this to locate the connector in your diagram.                                                                                                                                              |
| Activated | When the connector instance was activated.                                                                                                                                                                                                     |
| Status    | The current health of the connector instance. `Healthy` means the connector is running without issues. `Unhealthy` means the connector requires attention. Open the instance details to review health details and recent activity log entries. |
| Restart   | If a connector instance fails to activate or is stuck in an unhealthy state, select **Restart** after you resolve the underlying issue to retry activation.                                                                                    |

Select **Show runtime breakdown** to open a breakdown of the header counts by runtime. Each runtime is shown in its own column, alongside a total:

| Field   | Description                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Event   | The type of event recorded, for example `Triggered`, `Correlated`, `Correlation failed`, or `Activation condition not met`. |
| Runtime | The count of this event recorded by a specific runtime deployment, identified by its deployment ID.                         |
| Total   | The sum of this event's count across all runtimes.                                                                          |

## View inbound connector instance details

Select a row to view additional details and troubleshoot issues.

The page header shows the process name and version, and the BPMN element, where the connector instance is active, for example **Process2 v1 › Event_0sb4klr**. If the instance fails to activate or is stuck in an unhealthy state, select **Restart** after you resolve the underlying issue to retry activation.

The following details are also shown:

| Field       | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| Instance ID | The ID of the connector instance.                                                                           |
| Connector   | The connector type ID.                                                                                      |
| Webhook URL | For webhook-based inbound connectors, the URL that triggers the connector. Select the copy icon to copy it. |

### Inbound connector runtimes

Each runtime reporting this connector instance is shown on a separate row.

| Field        | Description                                                |
| ------------ | ---------------------------------------------------------- |
| Runtime      | The runtime deployment reporting the connector instance.   |
| Status       | The health of the connector instance on this runtime.      |
| Last updated | When this runtime last reported a status for the instance. |

### Activity log

Shows recent activities recorded for the connector instance. Use these logs to troubleshoot connector issues.

Depending on the connector type, the activity log can include health changes, request details, and runtime events. Sensitive values are redacted where needed.

Use the filters to narrow the entries shown, and toggle the sort order between latest and oldest first:

| Field       | Description                                                                            |
| ----------- | -------------------------------------------------------------------------------------- |
| Tags        | Filter entries by tag, for example `Health`.                                           |
| Instance    | Filter entries by a specific instance, when deduplication groups multiple occurrences. |
| Severity    | Filter entries by severity.                                                            |
| Time window | Filter entries recorded within a specific time range.                                  |

Activity logs are available for active connectors and recent troubleshooting. When a connector is permanently removed, its activity log entries are also removed.

### Process info

For inbound connectors, shows detailed information about the BPMN process instance and its associated connector as a JSON object.
Use this information to review process metadata, the connector template, and connector configuration properties.

For example:

```json
[
  {
    "bpmnProcessId": "Process_0wjo4ez",
    "processName": "Order intake",
    "messageName": "order.received",
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

## View outbound connectors

On the **Outbound connectors** tab, active outbound connector types are shown on separate rows.

<img src={OutboundConnectorManagementImg} alt="Connector management page" />

The page header shows counts across all outbound connector invocations:

| Field               | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| Connector types     | The number of distinct outbound connector types available.             |
| Invocations (total) | The total number of invocations recorded since the last runtime start. |
| Max execution time  | The longest execution time recorded across all invocations.            |
| Failure rate        | The percentage of invocations that failed.                             |

Use the search box, status filter, and **With invocations** checkbox to narrow the list of outbound connectors. Each connector type shows aggregated counts:

| Field       | Description                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | The name and type ID of the outbound connector. Select it to view its details.                                                                             |
| Invocations | The total number of invocations recorded for this connector.                                                                                               |
| Max time    | The longest execution time recorded for this connector.                                                                                                    |
| Failed      | The number of failed invocations recorded for this connector.                                                                                              |
| Status      | The connectivity status of the connector, for example `All connected`. See [connectivity states](#outbound-connector-runtimes) for what each status means. |

## View outbound connector details

Select an outbound connector to view its details.

<img src={OutboundConnectorDetailsImg} alt="Connector management page" />

The connector name is shown with badges indicating its direction (`Outbound`), whether it's enabled, and its connectivity status.

The page header shows counts for the selected connector:

| Field        | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| Calls        | The sum of all invocations, across runtimes.                    |
| Total time   | The sum of execution time for all invocations, across runtimes. |
| Slowest call | The highest execution time recorded, across runtimes.           |
| Average time | The total time divided by the number of calls.                  |

The **Configuration** section shows the connector's setup:

| Field           | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| Input variables | The input variables used by the connector.                                             |
| Timeout         | The configured timeout for the connector. If none is set, this shows `Not configured`. |

### Outbound connector runtimes

The **Connector runtimes** section shows each runtime deployment reporting the connector, with its connectivity details and invocation metrics.

| Field             | Description                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Connector runtime | The runtime deployment reporting the connector, and its overall connectivity status, for example `All connected`.           |
| Connectivity type | The connectivity reported for this runtime, for example `Broker` or `Gateway`, along with its status and number of streams. |
| Stream IDs        | The stream IDs registered for this connectivity type. Select the copy icon to copy an ID.                                   |

Each broker or gateway connectivity type reports one of the following connectivity states:

| State               | Description                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All connected       | All client streams for this job type are registered as consumers on all broker remote streams.                                                                                                                                                                                                                                                        |
| Partially connected | Client streams exist on the gateway, but not all of them appear as consumers on every broker's remote stream. This can indicate a transient issue; if it persists, restart the gateway.                                                                                                                                                               |
| None                | Brokers were queried, but no client stream appears as a consumer on any broker's remote stream. This indicates a genuine connectivity problem.                                                                                                                                                                                                        |
| Unknown             | The broker state can't be determined. This can happen when broker monitoring isn't configured; broker monitoring is configured but the query failed and the gateway's remote streams are also empty; or the gateway is a standalone deployment with no embedded broker. Enable and configure broker monitoring to get an accurate connectivity state. |

Each runtime also shows its own invocation metrics:

| Field           | Description                                          |
| --------------- | ---------------------------------------------------- |
| Completed       | The number of invocations completed on this runtime. |
| Cumulative time | The total execution time recorded on this runtime.   |
| Slowest         | The highest execution time recorded on this runtime. |
| Mean time       | The average execution time recorded on this runtime. |

## Connector metrics

Connector metrics are available for inbound and outbound connectors.

For metric definitions, response fields, and endpoint details, use the connector observability reference.

## Connector management access

Access to connector management depends on your cluster and organization permissions. If you cannot open connector management or view connector details, contact your administrator.
