---
id: automation-anywhere
title: Automation Anywhere connector
description: Orchestrate your Automation Anywhere queue items from your BPMN process.
sidebar_label: Automation Anywhere
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Add work items to an Automation Anywhere queue and get their results from your BPMN process.

## About this connector

The Automation Anywhere connector orchestrates an Automation Anywhere queue from your BPMN process with [Automation Anywhere RPA](https://www.automationanywhere.com/). Use it to hand work to your bots by adding work items to a queue, and to check the state and result of a work item after a bot processes it.

## Prerequisites

| Prerequisite                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Automation Anywhere instance                 | An instance with a [license](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/dashboards/cloud-administration-licenses.html), configured via an API service. Refer to the [official documentation](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/aae-client/bot-creator/using-the-workbench/cloud-install.html) to learn how to install and configure the API service. |
| User account with the `AAE_Queue Admin` role | A user account that can query and manage workload queues and work items in the Control Room. Learn more about [roles](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/roles/cloud-system-created-roles.html).                                                                                                                                                                                     |

<OutboundConnectorBasics />

## Configuration

### Control Room credential

Select a reusable credential, or enter the Control Room URL and authentication settings on the task.

| Property                | Type          | Required | Description                                                                                                                                                                                                                                                                                                                                          | Example |
| :---------------------- | :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Control Room credential | Configuration | No       | A reusable **Automation Anywhere Control Room** credential. If you select a credential, the **Control room URL** and the **Authentication** properties are hidden. Learn how to [use credentials](/components/connectors/use-connectors/index.md#using-credentials) and [create and manage them](/components/hub/organization/credentials/index.md). |         |

### Connection

| Property         | Type   | Required                  | Description                                                                                                                                                                             | Example                                           |
| :--------------- | :----- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| Control room URL | String | Yes, without a credential | The URL you use to access the Automation Anywhere Control Room. Your Automation Anywhere administrator provides it, and it is specific to your organization's instance of the platform. | `https://domainname.myautomationanywhere.digital` |

### Authentication

Select an authentication type from the **Type** dropdown in the **Authentication** section. These properties are hidden if you select a **Control Room credential**.

:::note
Store passwords, API keys, and tokens as secrets to avoid exposing them in the BPMN XML file. Follow the [guide for creating secrets](/components/saas/clusters/manage-secrets.md), then reference the secret in the property, for example `{{secrets.AUTOMATION_ANYWHERE_PASSWORD}}`.
:::

#### Authenticate (username and password)

| Property       | Type     | Required | Description                                                                                                                                                                                                                                              | Example                                    |
| :------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| Username       | String   | Yes      | The username of the Control Room user.                                                                                                                                                                                                                   | `{{secrets.AUTOMATION_ANYWHERE_USERNAME}}` |
| Password       | String   | Yes      | The password of the Control Room user.                                                                                                                                                                                                                   | `{{secrets.AUTOMATION_ANYWHERE_PASSWORD}}` |
| Multiple login | Dropdown | Yes      | Select `TRUE` to allow multiple API sessions for the user. Learn more about [multi-login users](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/users/cloud-multi-login-user.html). |                                            |

#### Authenticate (username and API key)

| Property | Type   | Required | Description                                                                                                                                                                                                                                                                                                                            | Example                                    |
| :------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| Username | String | Yes      | The username of the Control Room user.                                                                                                                                                                                                                                                                                                 | `{{secrets.AUTOMATION_ANYWHERE_USERNAME}}` |
| API key  | String | Yes      | The API key of the Control Room user. The API key is a 40-character string generated in the Control Room. Learn how to [create and assign an API key generation role](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/control-room/administration/roles/cloud-control-room-apikey-role.html). | `{{secrets.AUTOMATION_ANYWHERE_API_KEY}}`  |

#### Authentication (refresh) token

| Property | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Example                                 |
| :------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| Token    | String | Yes      | An authentication token or a refresh token. Learn how to generate an authentication token in the [authentication API documentation](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/api-authentication.html), or a refresh token in the [refresh token API documentation](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/refresh-authentication-token.html). | `{{secrets.AUTOMATION_ANYWHERE_TOKEN}}` |

### Timeout

| Property                      | Type   | Required | Description                                                                                             | Example |
| :---------------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------ | :------ |
| Connection timeout in seconds | Number | No       | The timeout in seconds to establish a connection. Set `0` for an infinite timeout. The default is `20`. | `30`    |

## Operations

Select an operation from the **Type** dropdown in the **Operation** section. The connector supports two operations.

### Add work item to the queue

Add a work item to a queue. This operation corresponds to the Automation Anywhere [Add work items to the queue API](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/add-work-item-data-to-queue-api.html).

#### Input parameters

| Property            | Type   | Required | Description                                                                                                                              | Example    |
| :------------------ | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Work queue ID       | String | Yes      | The identifier of the queue to add the work item to.                                                                                     | `20`       |
| Work item json data | Text   | Yes      | JSON data for the work item, mapping queue column names to values. The data must comply with the Automation Anywhere API. Supports FEEL. | See below. |

Example for **Work item json data**:

```json
{
  "coll_name": "your value",
  "last_name": "Doe",
  "email": "jane.doe@example.com"
}
```

#### Output

The connector returns the HTTP response of the Control Room, with the response data in `response.body`. The response contains information about the newly created work item:

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

To use the [Get work item result from queue by ID](#get-work-item-result-from-queue-by-id) operation later, you need the ID of the new work item. Use a **Result expression** to store it in a process variable:

```feel
= {
  itemId: response.body.list[1].id
}
```

### Get work item result from queue by ID

Get the details of a work item from a queue. This operation corresponds to the Automation Anywhere [List work items in queue with filter by work item ID API](https://docs.automationanywhere.com/bundle/enterprise-v11.3/page/enterprise/topics/control-room/control-room-api/get-all-work-items-in-queues-api.html).

#### Input parameters

| Property      | Type   | Required | Description                                                                                          | Example |
| :------------ | :----- | :------- | :--------------------------------------------------------------------------------------------------- | :------ |
| Work queue ID | String | Yes      | The identifier of the queue the work item is in.                                                     | `20`    |
| Work item ID  | Number | Yes      | The identifier of the work item to fetch, for example the one you stored after adding the work item. | `40957` |

#### Output

The connector returns the HTTP response of the Control Room, with the response data in `response.body`. The response contains information about the work item:

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

To check whether a bot processed the work item, store its status in a process variable with a **Result expression**. The `itemState` variable then tells you whether the item was processed:

```feel
= {
  itemState: response.body.list[1].status
}
```

## Wait for a work item to be processed

Automation Anywhere does not guarantee that a bot processes a work item right away. Model your BPMN diagram to poll periodically, for example with a timer and a loop. To learn more, refer to the entry _Solution with Timer and Loop_ on the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, limit the number of loop retries.
:::

<ErrorHandling />
