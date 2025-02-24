---
id: automation-anywhere
title: Automation Anywhere Connector
description: Orchestrate your Automation Anywhere queue items from your BPMN process.
sidebar_label: Automation Anywhere
---

The **Automation Anywhere Connector** allows you to orchestrate an Automation Anywhere queue from your BPMN process with [Automation Anywhere RPA](https://www.automationanywhere.com/) to add work items to the queue and obtain work item results.

To start using the Connector, you need an instance with a [license](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/dashboards/cloud-administration-licenses.html) we configured via an API service. Refer to the [official documentation page](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/aae-client/bot-creator/using-the-workbench/cloud-install.html) to learn more about installing and configuring the Automation Anywhere API service.

You also need a user account with the `AAE_Queue Admin` role to query and manage workload queues and work items in a Control Room. Read more about roles in the [official documentation](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/roles/cloud-system-created-roles.html).

## Create an Automation Anywhere Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Automation Anywhere Connector executable

To work with Automation Anywhere, choose the required operation type in the **Operation** section and authentication type in the **Authentication** section and complete the mandatory fields highlighted in red in the Connector properties panel on the right side of the screen.

:::note
All the mandatory and non-mandatory fields depending on the authentication and operation selections you choose are covered in the upcoming sections.
:::

## Authentication

You can choose among the available **Automation Anywhere Connector** authentication types according to your authentication requirements.

:::note
We advise you to keep your authentications and secrets data safe and avoid exposing it in the BPMN XML file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `AUTOMATION_ANYWHERE_PASSWORD`) so you can reference it later in the Connector.

:::

### _Authenticate (username and password)_ authentication

Select the **Automation Anywhere Connector** and fill out the following properties under the **Authentication** section:

1. Select **Authenticate (username and password)** in the **Authentication** section.
2. Set **Password** to `Password` to the secret you created (i.e. `{{secrets.AUTOMATION_ANYWHERE_PASSWORD}}`).
3. Set **Username** to `Username` to the secret you created (i.e. `{{secrets.AUTOMATION_ANYWHERE_UESRNAME}}`).
4. Select needed **Multiple login** type. If this value is set to `true`, you will be allowed multiple API sessions. For more information on multi-login, refer to [multi-login user](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/users/cloud-multi-login-user.html).

### _Authenticate (username and API key)_ authentication

Select the **Automation Anywhere Connector** and fill out the following properties under the **Authentication** section:

1. Select **Authenticate (username and API key)** in the **Authentication** section.
2. Set **Password** to `Password` to the secret you created (i.e. `{{secrets.AUTOMATION_ANYWHERE_PASSWORD}}`).
3. Set **API key** as `API key` to the secret you created (i.e. `{{secrets.AUTOMATION_ANYWHERE_API_KEY}}`). The API-Key is a 40-character string generated in the Control Room. Refer to [create and assign API key generation role documentation](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/roles/cloud-control-room-apikey-role.html) to learn more.

### _Authentication (refresh) token_ authentication

Select the **Automation Anywhere Connector** and fill out the following properties under the **Authentication** section:

1. Select **Authentication (refresh) token** in the **Authentication** section.
2. Set **Token** to `Token` to the secret you created (i.e. `{{secrets.AUTOMATION_ANYWHERE_TOKEN}}`). It can be an authentication or refresh token. Refer to [authentication API documentation](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/api-authentication.html) to learn how to generate an authentication token or observe the [refresh token API documentation](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/refresh-authentication-token.html) to learn how to generate a refresh token.

## Configuration

### Control Room URL

1. Set **Control Room URL** to `Control Room URL`. The Control Room URL is the URL you use to access the Automation Anywhere Control Room. The Control Room URL is typically provided by the Automation Anywhere administrator and is specific to the organization's instance of the platform (i.e. `https://domainname.myautomationanywhere.digital`).

## Operation types

The **Automation Anywhere Connector** currently supports two operation types in the **Operation type** dropdown list: _Add work item to the queue_ and _Get work item result from queue by ID_.

### Add work item to the queue

This operation provides the ability to add a work queue item in the specified queue.
It corresponds directly to the respective Automation Anywhere API - [`Add Work Items to the queue API`](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/add-work-item-data-to-queue-api.html).

#### Usage

1. Select **Add work item to the queue** from the **Operation type** dropdown in the **Operation** section.
2. Populate **Authentication section** as described in the [respective section](#authentication).
3. In the **Configuration** section, set the **Control Room URL** field as described in the [respective section](#control-room-url).
4. In the **Input** section, set **Work queue ID**. This is the identifier of a queue, where an item will be fetched from.
5. In the **Input** section, set **Work Item json Data** that you want to pass together with the item. The **Data** has to comply with the Automation Anywhere API, and must contain the following semantics:

```json
{
  "coll_name": "your value",
  "last_name": "Doe",
  "email": "jane.doe@example.com"
}
```

#### Add work item to the queue response

The operation **Add work item to the queue** returns information about the newly created item in the queue.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `={itemId:response.body.list[1].id}`. To use operation _Get work item result from queue by ID_, you need an `itemId`. This expression will add it to the context for you. Learn more in [get work item result from queue by ID](#get-work-item-result-from-queue-by-id).

Response example:

```json
{
  "list": [
    {
      "id": "40957",
      "createdBy": "25",
      "createdOn": "2021-11-24T01:53:10.175335900Z",
      "updatedBy": "25",
      "updatedOn": "2021-11-24T01:53:10.175335900Z",
      "version": "0",
      "json": {
        "TRN_ID": "A11",
        "DATA": "mydata"
      },
      "result": "",
      "deviceId": "0",
      "status": "NEW",
      "col1": "A11",
      "col2": "",
      "deviceUserId": "0",
      "queueId": "0",
      "comment": "",
      "automationId": "0",
      "totalPausedTime": "0",
      "error": "",
      "col6": "",
      "jobExecutionId": ""
    }
  ]
}
```

### Get work item result from queue by ID

This operation provides the ability to return the details of the specified work item from the work queue.
It corresponds directly to the respective Automation Anywhere API - [`List Work Items in queue with filter by work item ID`](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/control-room-api/cloud-api-list-wlm-workitems.html).

#### Usage

1. Select **Get work item result from queue by ID** from the **Operation type** dropdown in the **Operation** section.
2. Populate **Authentication section** as described in the [respective section](#authentication).
3. In the **Configuration** section, set the **Control Room URL** field as described in the [respective section](#control-room-url).
4. In the **Input** section, set **Work queue ID**. This is the identifier of a queue, where an item will be fetched from.
5. In the **Input** section, set **Work item ID**. This is the identifier of the item to be fetched.

#### Get work item result from queue by ID response

Given you have a queue work item ID previously added to a queue, the operation **Get work item result from queue by ID** returns information about a certain work item.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `={itemState:response.body.list[1].status}`. You will observe the `itemState` in the process variables. Its value will let you know if the item was processed or not.

Response example:

```json
{
  "page": {
    "offset": 0,
    "total": 5,
    "totalFilter": 1
  },
  "list": [
    {
      "id": "11804",
      "createdBy": "24",
      "createdOn": "2020-05-26T10:19:34.786711300Z",
      "updatedBy": "24",
      "updatedOn": "2020-05-26T10:19:34.786711300Z",
      "version": "1",
      "json": {},
      "result": "",
      "deviceId": "0",
      "status": "NEW",
      "col1": "Brian",
      "col2": "Matthews",
      "col3": "bmatthews0@example.com",
      "deviceUserId": "0",
      "queueId": "20",
      "comment": "",
      "automationId": "0",
      "totalPausedTime": "0",
      "error": "",
      "col6": "",
      "col10": ""
    }
  ]
}
```

## Using Automation Anywhere Connector best practice

There is no guarantee a queue item will be processed right away. In that case, we suggest building your BPMN diagram to periodically retry polling.
To learn more, refer to an entry _Solution with Timer and Loop_ on the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, it is recommended to limit the number of loop retries.
:::
