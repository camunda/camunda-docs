---
id: blueprism
title: Blue Prism Connector
description: Orchestrate your Blue Prism queue items from your BPMN process.
sidebar_label: Blue Prism
---

The **Blue Prism Connector** allows you to orchestrate a Blue Prism queue from your BPMN process with [Blue Prism RPA](https://www.blueprism.com/).

To start using the Connector, you must have a running Blue Prism instance configured API service. Refer to the [official documentation page](https://bpdocs.blueprism.com/bp-7-1/en-us/Guides/bp-api/api-introduction.htm) to learn more about how to install and configure Blue Prism API service.

## Create a Blue Prism Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

You can choose among the available **Blue Prism Connector** authentication types according to your authentication requirements.

### Bearer token authentication

#### Create a new Connector secret

We advise you to keep your **Bearer Token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `BLUE_PRISM_BEARER_TOKEN`) so you can reference it later in the Connector.

#### Configure the bearer token

Select the **Blue Prism Connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer Token** in the **Authentication** section.
2. Set **Bearer** to the secret you created (i.e. `{{secrets.BLUE_PRISM_BEARER_TOKEN}}`).

### OAuth Client Credentials Flow

#### Create a new Connector secret

We advise you to keep your **Client ID** and **Client secret** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `BLUE_PRISM_CLIENT_ID`) so you can reference it later in the Connector.

#### Configure the OAuth Token

Select the **Blue Prism Connector** and fill out the following properties under the **Authentication** section:

1. Select **OAuth 2.0 client credentials** in the **Authentication** section.
2. Set **Identity token provider URL** to identity provider configured for your Blue Prism instance.
3. Set **Client ID** to the secret you created (i.e. `{{secrets.BLUE_PRISM_CLIENT_ID}}`).
4. Set **Client secret** to the secret you created (i.e. `{{secrets.BLUE_PRISM_CLIENT_SECRET}}`).

Find more information about the OAuth client credentials flow in the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

## Operation types

The **Blue Prism Connector** currently supports two operation types in the **Operation type** dropdown list: _Get item from a queue by ID_ and _Create work queue item_.

### Get item from a queue by ID

This operation allows you to return details of a specified item from a work queue.
It matches directly to respective Blue Prism API endpoint - [`Return details of a specified item from a work queue`](https://bpdocs.blueprism.com/bp-7-1/en-us/api-spec-7-1-2.html#tag/Work-Queues/paths/~1api~1v7~1workqueues~1%7BworkQueueId%7D~1items~1%7BworkQueueItemId%7D/get).

#### Usage

1. Select **Get item from a queue by ID** from the **Operation** dropdown.
2. Populate **Authentication section** as described in the [respective section](#authentication).
3. In the **Configuration** section, set **Blue Prism API base URL** field. E.g., `http://my.bp.host.com:9876`.
4. In the **Input** section, set **Work queue ID**. This is the identifier of a queue, where the item is fetched from.
5. In the **Input** section, set **Queue item ID**. This is the identifier of the item to be fetched.

#### Get item from a queue by ID response

Given you have a queue item ID previously added to a queue, the operation **Get item from a queue by ID response** returns information about a certain item.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `={itemState:response.body.state}`. You will observe the `itemState` in the process variables. Its value will let you know if the item was processed or not.

Response example:

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "priority": 3,
  "ident": 123,
  "state": "Completed",
  "keyValue": "Example value",
  "status": "Example status",
  "tags": ["Example tag 1", "Example tag 2"],
  "attemptNumber": 1,
  "loadedDate": "2020-10-02T12:34:56+01:00",
  "deferredDate": "2020-10-02T12:34:56+01:00",
  "lockedDate": "0001-01-01T00:00:00Z",
  "completedDate": "2020-10-02T13:00:00+01:00",
  "exceptionedDate": "0001-01-01T00:00:00Z",
  "exceptionReason": "Example reason",
  "lastUpdated": "2020-10-02T13:00:00+01:00",
  "workTimeInSeconds": 123,
  "attemptWorkTimeInSeconds": 123,
  "resource": "Example resource",
  "data": {
    "rows": []
  },
  "sla": 7200,
  "sladatetime": "0001-01-01T00:00:00Z",
  "processname": "Example process name",
  "issuggested": false
}
```

### Create work queue item

This operation allows you to create work queue items in the specified queue.
It matches directly to respective Blue Prism API endpoint - [`Create work queue items`](https://bpdocs.blueprism.com/bp-7-1/en-us/api-spec-7-1-2.html#tag/Work-Queues/paths/~1api~1v7~1workqueues~1%7BworkQueueId%7D~1items~1batch/post).

#### Usage

1. Select **Create work queue item** from the **Operation** dropdown.
2. Populate the **Authentication section** as described in the [respective section](#authentication).
3. In the **Configuration** section, set **Blue Prism API base URL** field. E.g., `http://my.bp.host.com:9876`.
4. In the **Input** section, set **Work queue ID**. This is the identifier of a queue, where item will be fetched from.
5. In the **Input** section, set **Item type** of the data entry you wish to submit to the queue.
6. In the **Input** section, set **Item value** of the data entry you wish to submit to the queue.
7. In the **Input** section, set **Defer date**. This field is the earliest time and date that this item is deferred until.
8. In the **Input** section, set **Priority**. This field is the priority value assigned to the item.
9. In the **Input** section, set **Status**. This is the user-supplied status value. _Note: Do not confuse this with queue item 'state' property._

#### Create work queue item response

The operation **Create work queue item** returns information about the newly created item in the queue.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `={itemId:response.body.ids[1]}`. To use operation _Get queue item result by ID_, you need an `itemId`. This expression will add it in the context for you. Learn more in [get queue item result by ID](#get-item-from-a-queue-by-id).

Response example:

```json
{
  "ids": ["497f6eca-6276-4993-bfeb-53cbbbba6f08"]
}
```

### Using Blue Prism Connector best practice

There is no guarantee a queue item will be processed right away. In that case, we suggest building your BPMN diagram to periodically retry polling.
To learn more, refer to an entry _Solution with Timer and Loop_ at [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, it is recommended to limit the number of loop retries.
:::
