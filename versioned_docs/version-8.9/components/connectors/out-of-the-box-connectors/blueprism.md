---
id: blueprism
title: Blue Prism connector
description: Orchestrate your Blue Prism queue items from your BPMN process.
sidebar_label: Blue Prism
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Orchestrate Blue Prism work queue items from your BPMN process with the Blue Prism connector.

## About this connector

The Blue Prism connector integrates your process with [Blue Prism RPA](https://www.blueprism.com/) through the Blue Prism API. Use it to create work queue items for your robots and to check the state of a queue item after a robot has processed it.

The connector supports two operations: **Get item from a queue by ID** and **Create work queue item**.

## Prerequisites

You need a running Blue Prism instance with the Blue Prism API service installed and configured. To learn how to install and configure the API service, see the [Blue Prism API documentation](https://documentation.blueprism.com/bp-7-5/en-us/Guides/bp-api/api-introduction.htm?tocpath=Installation%7CInstall%20the%20Blue%20Prism%20API%7C_____0).

<OutboundConnectorBasics />

## Configuration

### Authentication

Select an authentication type from the **Type** dropdown.

:::tip
Keep credentials out of the BPMN XML by storing them in [connector secrets](../../console/manage-clusters/manage-secrets.md) and referencing them, for example `{{secrets.BLUE_PRISM_BEARER_TOKEN}}`.
:::

#### Bearer token

| Property     | Type   | Required | Description                                           | Example                               |
| :----------- | :----- | :------- | :---------------------------------------------------- | :------------------------------------ |
| Bearer token | String | Yes      | The bearer token to authenticate with Blue Prism API. | `{{secrets.BLUE_PRISM_BEARER_TOKEN}}` |

#### OAuth 2.0 client credentials

Authenticates with the [OAuth 2.0 client credentials flow](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

| Property                    | Type   | Required | Description                                                            | Example                                |
| :-------------------------- | :----- | :------- | :--------------------------------------------------------------------- | :------------------------------------- |
| Identity token provider URL | String | Yes      | The token endpoint of the identity provider configured for Blue Prism. | `https://auth-server/connect/token`    |
| Client ID                   | String | Yes      | The Blue Prism OAuth 2.0 client ID.                                    | `{{secrets.BLUE_PRISM_CLIENT_ID}}`     |
| Client secret               | String | Yes      | The Blue Prism OAuth 2.0 client secret.                                | `{{secrets.BLUE_PRISM_CLIENT_SECRET}}` |

### Connection

| Property                | Type   | Required | Description                                                                                              | Example                      |
| :---------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------- | :--------------------------- |
| Blue Prism API base URL | String | Yes      | The base URL of your Blue Prism API service.                                                             | `http://my.bp.host.com:9876` |
| Connection timeout      | String | No       | The time in seconds to wait to establish a connection, or `0` for an infinite timeout. Defaults to `20`. | `20`                         |

## Operations

Select the operation from the **Operation type** dropdown.

### Get item from a queue by ID

Returns the details of a specified item from a work queue. This operation maps to the Blue Prism API endpoint [Return details of a specified item from a work queue](https://documentation.blueprism.com/bp-7-5/en-us/bp-api/bpe-7-5-0-api-spec.html#tag/Work-Queues/operation/getWorkQueueItemFromWorkQueue).

#### Input parameters

| Property      | Type   | Required | Description                                                                                                | Example |
| :------------ | :----- | :------- | :--------------------------------------------------------------------------------------------------------- | :------ |
| Work queue ID | String | Yes      | The identifier of the queue the item is fetched from.                                                      |         |
| Queue item ID | String | Yes      | The identifier of the item to fetch. Modeler does not enforce this property, but the request URL needs it. |         |

#### Output

The connector returns the Blue Prism API response, with the item details in `response.body`. The **Result expression** is pre-filled with `={itemState:response.body.state}`, which stores the processing state of the item in an `itemState` process variable. Use it to check whether the item was processed.

The full response follows the Blue Prism API for [getting a work queue item](https://documentation.blueprism.com/bp-7-5/en-us/bp-api/bpe-7-5-0-api-spec.html#tag/Work-Queues/operation/getWorkQueueItemFromWorkQueue). The connector relies only on the `state` field of the response body:

```json
{
  "body": {
    "state": "Completed"
  }
}
```

### Create work queue item

Creates a work queue item in the specified queue. This operation maps to the Blue Prism API endpoint [Create work queue items](https://documentation.blueprism.com/bp-7-5/en-us/bp-api/bpe-7-5-0-api-spec.html#tag/Work-Queues/operation/createWorkQueueItems).

#### Input parameters

| Property      | Type     | Required | Description                                                                                                                                 | Example      |
| :------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| Work queue ID | String   | Yes      | The identifier of the queue the item is created in.                                                                                         |              |
| Item type     | Dropdown | Yes      | The data type of the value you submit to the queue item: `Text`, `Number`, `Date`, `Flag`, `Password`, or `Collection`. Defaults to `Text`. | `Text`       |
| Item value    | String   | No       | The data value you submit to the queue item. Its value is typed by the **Item type** dropdown. Omitted from the request when empty.         |              |
| Defer date    | String   | No       | The date the item is deferred until. Format: `yyyy-MM-dd`.                                                                                  | `2026-01-31` |
| Priority      | String   | No       | The priority value assigned to the item. Must be an integer. Defaults to `3`.                                                               | `3`          |
| Status        | String   | No       | A user-supplied status value. Do not confuse it with the queue item `state` property, which Blue Prism sets.                                |              |

#### Output

The connector returns the IDs of the newly created items in `response.body.ids`. The **Result expression** is pre-filled with `={itemId:response.body.ids[1]}`, which stores the ID of the new item in an `itemId` process variable. Use this `itemId` as the **Queue item ID** of the **Get item from a queue by ID** operation.

Response example:

```json
{
  "ids": ["497f6eca-6276-4993-bfeb-53cbbbba6f08"]
}
```

## Poll the queue item state

A queue item is not guaranteed to be processed right away. Build your BPMN diagram to poll the item periodically: create the item, then loop with a timer and the **Get item from a queue by ID** operation until `itemState` shows the item is processed. To learn more, see the _Solution with Timer and Loop_ entry on the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, limit the number of loop retries.
:::

<ErrorHandling />

## Further resources

- [Blue Prism API documentation](https://documentation.blueprism.com/bp-7-5/en-us/Guides/bp-api/api-introduction.htm?tocpath=Installation%7CInstall%20the%20Blue%20Prism%20API%7C_____0)
