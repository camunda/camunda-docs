---
id: mixpanel
title: Mixpanel connector
sidebar_label: Mixpanel
description: Record process milestones as Mixpanel events and read saved Insights reports from your BPMN process. Learn how to configure the Mixpanel connector and get started.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Connect your BPMN process with [Mixpanel](https://mixpanel.com/) to record process milestones as events and to read saved reports.

## About this connector

The Mixpanel connector is an outbound protocol connector built on top of the [REST connector](/components/connectors/protocol/rest.md). It calls the [Mixpanel API](https://docs.mixpanel.com/reference/ingestion-api) for you, so you select an operation and fill in its parameters instead of building the HTTP request yourself.

For example, use this connector to:

- Record a milestone, such as an order shipped, as an event with **Import event**, so it shows up next to your product analytics.
- Read a saved Insights report with **Query saved report**, for example in a scheduled process that checks a KPI and escalates when it drops.

## Prerequisites

To use the Mixpanel connector, you need:

| Prerequisite             | Description                                                                                                                                                                                                                                                                      |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8.11 or later    | The connector template requires Camunda 8.11 or later.                                                                                                                                                                                                                           |
| Mixpanel service account | A Mixpanel [service account](https://docs.mixpanel.com/reference/service-accounts) with access to the project, stored as [connector secrets](/components/saas/clusters/manage-secrets.md) or in a reusable credential. **Import event** needs an Owner or Admin service account. |
| Mixpanel project ID      | The ID of the Mixpanel project. It is the number after `/project/` in the Mixpanel URL.                                                                                                                                                                                          |
| Saved Insights report    | For **Query saved report**, a saved Insights report in the project.                                                                                                                                                                                                              |

:::note
Use secrets to avoid exposing your Mixpanel service account secret as plain text. Refer to our documentation on [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Operation

Select the operation to run in the **Operation** dropdown. Each operation is described in [operations](#operations).

| Property  | Type     | Required | Description                                        | Example      |
| :-------- | :------- | :------- | :------------------------------------------------- | :----------- |
| Operation | Dropdown | Yes      | One of **Import event** or **Query saved report**. | Import event |

### Authentication

Choose a reusable credential, or enter a service account in the task. The connector sends the service account username and secret with HTTP Basic authentication.

| Property                  | Type          | Required    | Description                                                                                                                                                                                                                                          | Example                                         |
| :------------------------ | :------------ | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| Authentication credential | Configuration | No          | A reusable **Mixpanel Authentication** credential. If you select a credential, its service account is used and the service account properties are hidden. See [using credentials](/components/connectors/use-connectors/index.md#using-credentials). |                                                 |
| Service account username  | String        | Conditional | The username of the service account. Required if you do not select an **Authentication credential**.                                                                                                                                                 | `{{secrets.MIXPANEL_SERVICE_ACCOUNT_USERNAME}}` |
| Service account secret    | String        | Conditional | The secret of the service account. Required if you do not select an **Authentication credential**. Use a secret to avoid exposing it.                                                                                                                | `{{secrets.MIXPANEL_SERVICE_ACCOUNT_SECRET}}`   |

### Project

| Property       | Type     | Required | Description                                                                                                                                                                                                                   | Example      |
| :------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| Project ID     | String   | Yes      | The ID of the Mixpanel project: the number after `/project/` in the Mixpanel URL. Both operations send it as the `project_id` query parameter.                                                                                | `12345`      |
| Data residency | Dropdown | Yes      | Where the project's data is stored: **US (default)**, **EU**, or **India**. Use **EU** or **India** only if the project is enrolled in that data residency. The connector calls the Mixpanel host for the selected residency. | US (default) |

The two operations use different Mixpanel hosts:

| Data residency | Import event                  | Query saved report                  |
| :------------- | :---------------------------- | :---------------------------------- |
| US (default)   | `https://api.mixpanel.com`    | `https://mixpanel.com/api/query`    |
| EU             | `https://api-eu.mixpanel.com` | `https://eu.mixpanel.com/api/query` |
| India          | `https://api-in.mixpanel.com` | `https://in.mixpanel.com/api/query` |

## Operations

### Import event

Records a process milestone as an event in Mixpanel. Uses the Mixpanel API operation [Import events](https://docs.mixpanel.com/reference/import-events).

The connector sends one event per task, with Mixpanel's `strict` mode on. If Mixpanel rejects the event as invalid, it answers with HTTP 400 and the task fails with an incident.

#### Input parameters

| Property         | Type   | Required | Description                                                                      | Example                              |
| :--------------- | :----- | :------- | :------------------------------------------------------------------------------- | :----------------------------------- |
| Event name       | String | Yes      | The name of the event in Mixpanel.                                               | `Order shipped`                      |
| Distinct ID      | String | Yes      | The ID of the user who did the event, as used in the rest of your Mixpanel data. | `user-123`                           |
| Event properties | String | No       | Extra properties of the event, as a FEEL context.                                | `={orderId: orderId, amount: total}` |

The connector adds two properties to every event:

- `time`: the current time in milliseconds since the Unix epoch.
- `$insert_id`: a unique ID (a UUID), which Mixpanel uses to remove duplicates. Events with the same event name, time, distinct ID, and `$insert_id` count as one.

Both are computed once, when the task starts. If the job is retried, it sends the same values, so Mixpanel drops the duplicate and counts the event once. Two separate imports get different `$insert_id` values, so Mixpanel counts both, even when the event name, user, and time match. To set either value yourself, add `time` or `$insert_id` to **Event properties**.

### Query saved report

Returns the results of a saved Insights report. Uses the Mixpanel API operation [Query saved report](https://docs.mixpanel.com/reference/insights-query).

:::note
The Mixpanel query API allows 60 queries per hour and 5 concurrent queries. A process that queries often can reach this limit.
:::

#### Input parameters

| Property     | Type   | Required | Description                                                                                                                                             | Example |
| :----------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Report ID    | String | Yes      | The ID of the saved Insights report, which Mixpanel calls the `bookmark_id`. In the report's URL, it is the number after `report-` in `editor-card-id`. | `678`   |
| Workspace ID | String | No       | The ID of the workspace, if the project uses workspaces: the number after `/view/` in the Mixpanel URL. If you leave it empty, it is not sent.          |         |

## Output

The Mixpanel connector is built on top of the REST connector, so the response is the HTTP response of the Mixpanel API call. In the **Result expression**, you can use `response.status`, `response.headers`, and `response.body`. Read the [REST connector response](/components/connectors/protocol/rest.md#response) for details.

**Import event** returns the number of imported events in `response.body.num_records_imported`. **Query saved report** returns the report in `response.body`, with `computed_at`, `date_range`, `headers`, and `series`. `series` maps each series name to its values by date.

The following result expressions show common mappings:

| Operation          | Result expression                                 |
| :----------------- | :------------------------------------------------ |
| Import event       | `={imported: response.body.num_records_imported}` |
| Query saved report | `={series: response.body.series}`                 |

To read a series whose name contains spaces, use `get value`. For example, `={signups: get value(response.body.series, ["Signed up", "2026-11-01T00:00:00Z"])}`.

## Example: record a milestone and check a KPI

The following processes use both operations:

1. A process records each shipped order. After the order is shipped, an **Import event** task has **Event name** `Order shipped`, **Distinct ID** `=customerId`, and **Event properties** `={orderId: orderId}`.
2. A scheduled process checks how many users signed up every morning. A **Query saved report** task reads the saved Insights report with its **Report ID**. A gateway then compares the value in the result expression with a threshold and escalates when it is too low.

<ErrorHandling />

## Further resources

- [Mixpanel service accounts](https://docs.mixpanel.com/reference/service-accounts)
- [Mixpanel Ingestion API](https://docs.mixpanel.com/reference/ingestion-api)
- [Mixpanel: Query saved report](https://docs.mixpanel.com/reference/insights-query)
