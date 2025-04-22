---
id: uipath
title: UiPath Connector
sidebar_label: UiPath
description: Orchestrate your UiPath Bots with Camunda to create new queue items and get the result from it.
---

The **UiPath Connector** allows you to orchestrate a UiPath bot from your BPMN process with [UiPath](https://cloud.uipath.com).

## Prerequisites

To use the **UiPath Connector**, you need to have a [UiPath](https://cloud.uipath.com) account and configure your organization settings. See the [automation cloud guide](https://docs.uipath.com/automation-cloud/docs/introduction) to learn more.

## Create a UiPath Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Operation types

The UiPath Connector currently supports two operation types in the **Operation type** dropdown list: _Add queue item_ and _Get queue item result by ID_.

### Authentication

You can choose among the available UiPath Connector authentication types according to your authentication requirements.

### UiPath Connector (bearer token)

#### Create a new Connector secret

We advise you to keep your **Bearer Token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `BEARER_TOKEN_UIPATH`) so you can reference it later in the Connector.

#### Configure the bearer token

Select the **UiPath Connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer Token** in the **Authentication** section.
2. Set **Bearer** to the secret you created (i.e. `{{secrets.UIPATH_BEARER_TOKEN}}`).

### UiPath Connector (OAuth token)

#### Create a new Connector secret

We advise you to keep your **Client ID** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `UIPATH_CLIENT_ID`) so you can reference it later in the Connector.

#### Configure the OAuth Token

Select the **UiPath Connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0** in the **Authentication** section.
2. Set **Client ID** to the secret you created (i.e. `{{secrets.UIPATH_CLIENT_ID}}`).
3. Set **Client secret** to the secret you created (i.e. `{{secrets.UIPATH_CLIENT_SECRET}}`).
4. Choose **Client Authentication** from the dropdown menu (i.e. `{{Send client credentials in body}}`).

Find more information about the OAuth client credentials flow in the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

### Add queue item

This operation allows you to create a new item and add it to a queue from UiPath Orchestrator. To execute it, take the following steps:

1. Select the operation **Add queue item** from the **Operation type** dropdown list.
2. Configure authentication as described in the [authentication](#authentication) section.
3. Fill out the input fields as described in the [configuration](#configuration) section.
4. Fill out the input fields as described in the [input](#input) section.
5. Fill out the response mapping as described in the [add queue item response](#add-queue-item-response) section.

#### Configuration

For this section, you must fill out the following fields:

1. **Cloud URL**: Comes with a default value of `cloud.uipath.com`. You can always change it, if needed. To use a Connector secret, use a double curly braces notation, e.g. `{{secrets.MY_SECRET_VALUE}}`.
2. **Cloud organization**: The name of your organization. See [about organizations](https://docs.uipath.com/automation-cloud/docs/about-organizations) to learn more. To use a Connectors secret, use a double curly braces notation, e.g. `{{secrets.MY_SECRET_VALUE}}`.
3. **Cloud tenant**: The name of the tenant. See [about tenants](https://docs.uipath.com/automation-cloud/docs/about-tenants) to learn more. To use a Connectors secret, use a double curly braces notation, e.g. `{{secrets.MY_SECRET_VALUE}}`.
4. **Organization Unit ID**: Click **Orchestrator** and you will find the ID in the URL. For example, `https://cloud.uipath.com/MyOrg/MyTenant/orchestrator_/?tid=26929&fid=112233` where the **Organization Unit ID** is `112233`. To use a Connectors secret, use a double curly braces notation, e.g. `{{secrets.MY_SECRET_VALUE}}`.

#### Input

For this section, fill out the following fields:

1. **Queue Name**: The queue where the QueueItem object is to be added. Check [queues and transactions](https://docs.uipath.com/orchestrator/docs/about-queues-and-transactions) to learn more.
2. _(Optional)_ **Defer date**: The earliest date and time at which the item is available for processing. If empty, the item can be processed as soon as possible. Expected date format is `yyyy-MM-dd`.
3. _(Optional)_ **Due date**: The latest date and time at which the item should be processed. If empty, the item can be processed at any given time. Expected date format is `yyyy-MM-dd`.
4. _(Optional)_ **Priority**: Select a value from the dropdown list to represent the priority level of the queue item to be added. This property is a criterion for the prioritization of queue items, alongside **Deadline** and **Postpone**.
5. _(Optional)_ **Specific Content for UiPath Job**: Data that will be passed in to the job. This must be in JSON format.

```
= {
   "Name":"testItemName",
   "Value":"testItemValue"
 }
```

6. _(Optional)_ **Reference**: A string reference for the queue item.

#### Add queue item response

The operation **Add Queue Item** returns information about the newly created item in the queue.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `= {itemId: response.body.Id}`. To use operation _Get queue item result by ID_, you need an `itemId`. This expression will add it in the context for you. Learn more in [get queue item result by ID](#get-queue-item-result-by-id).

Response example:

```
= {
   "status":201,
   "headers":{
      "date":"Fri, 20 Jan 2023 10:13:20 GMT",
      "content-length":878,
      "server":"cloudflare",
      "expires":"-1",
      "cf-ray":"78c70973ce68153b-CDG",
      "api-supported-versions":"15.0",
      "x-frame-options":"Deny",
      "x-download-options":"noopen",
      "x-correlation-id":"7a211afe-53f1-4225-b77c-0fa477912685",
      "cf-cache-status":"DYNAMIC",
      "x-uipath-correlation-id":"undefined",
      "pragma":"no-cache",
      "strict-transport-security":"max-age=15724800; includeSubDomains",
      "request-context":"appId=cid-v1:354c7cb9-ae5a-4d16-84a7-f13242bbac6d",
      "content-security-policy":"default-src 'self';script-src 'self' https://orch-cdn.uipath.com https://use.typekit.net/ https://d2c7xlmseob604.cloudfront.net https://platform-cdn.uipath.com https://*.uipath.com https://*.pendo.io;style-src 'self' 'unsafe-inline' https://orch-cdn.uipath.com https://fonts.googleapis.com/css https://use.typekit.net https://p.typekit.net/ https://platform-cdn.uipath.com https://content.usage.uipath.com;img-src 'self' data: https://orch-cdn.uipath.com https://s.gravatar.com https://secure.gravatar.com https://*.wp.com https://*.googleusercontent.com https://i.ytimg.com https://platform-cdn.uipath.com https://*.pendo.io https://*.blob.core.windows.net https://*.amazonaws.com blob:;frame-src 'self' https://*.uipath.com https://*.pendo.io;font-src 'self' https://orch-cdn.uipath.com https://use.typekit.net/ https://fonts.gstatic.com https://platform-cdn.uipath.com data:;connect-src 'self' wss: https://orch-cdn.uipath.com https://primer.typekit.net https://use.typekit.net/ https://sentry.io https://studio-feedback.azure-api.net https://app.launchdarkly.com https://clientstream.launchdarkly.com https://events.launchdarkly.com https://api.smartling.com https://platform-cdn.uipath.com https://*.service.signalr.net https://*.uipath.com https://*.pendo.io https://cloud.uipath.com https://storage.googleapis.com https://*.blob.core.windows.net https://*.amazonaws.com dc.services.visualstudio.com;worker-src 'self' blob:",
      "x-xss-protection":"1",
      "x-content-type-options":"nosniff",
      "x-robots-tag":"noindex,nofollow",
      "content-type":"application/json; odata.metadata=minimal; odata.streaming=true",
      "location":"https://cloud.uipath.com/MyOrg/MyTenant/orchestrator_/odata/QueueItems(436141352)",
      "connection":"keep-alive",
      "cache-control":"no-cache, no-store, must-revalidate",
      "odata-version":"4.0"
   },
   "body":{
      "@odata.context":"https://cloud.uipath.com/MyOrg/MyTenant/orchestrator_/odata/$metadata#QueueItems/$entity",
      "QueueDefinitionId":165001,
      "Encrypted":false,
      "Status":"New",
      "ReviewStatus":"None",
      "Key":"2196eb07-c96a-4f47-a734-326dd5d58a9d",
      "Reference":"test",
      "Priority":"Low",
      "DeferDate":"2023-01-12T00:00:00Z",
      "SecondsInPreviousAttempts":0,
      "RetryNumber":0,
      "SpecificData":"{\"DynamicProperties\":{\"test\":\"test\"}}",
      "CreationTime":"2023-01-20T10:13:20.6603953Z",
      "RowVersion":"AAAAAE2f4GY=",
      "OrganizationUnitId":112233,
      "Id":436141352,
      "SpecificContent":{
         "test":"test"
      }
   }
}
```

### Get queue item result by ID

This operation allows you get an item from your UiPath Orchestrator. To execute it, take the following steps:

1. Select the operation **Get Queue Item result by ID** from the dropdown list **Operation type**.
2. Configure authentication as described in the [authentication](#authentication) section.
3. Fill out the **Item ID** field. This field supports FEEL, so you're able to fetch an item ID from the process context; for example, if you exported it while [adding a new queue item](#add-queue-item).

#### Get queue item result by ID response

Given you have a queue item ID previously added to a queue, the operation **Get queue item result by ID** returns information about a certain item.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `= {itemStatus: response.body.value[1].Status}`. You will see the `itemStatus` in the process variables. Its value will let you know if the item was processed or not.

Response example:

```
{
   "status":200,
   "headers":{
      "date":"Fri, 20 Jan 2023 10:13:21 GMT",
      "server":"cloudflare",
      "expires":"-1",
      "transfer-encoding":"chunked",
      "cf-ray":"78c709774a112a34-CDG",
      "api-supported-versions":"15.0",
      "x-frame-options":"Deny",
      "x-download-options":"noopen",
      "x-correlation-id":"8db50244-5f55-4598-82d3-1d6a00f806b0",
      "cf-cache-status":"DYNAMIC",
      "x-uipath-correlation-id":"undefined",
      "pragma":"no-cache",
      "strict-transport-security":"max-age=15724800; includeSubDomains",
      "request-context":"appId=cid-v1:354c7cb9-ae5a-4d16-84a7-f13242bbac6d",
      "content-security-policy":"default-src 'self';script-src 'self' https://orch-cdn.uipath.com https://use.typekit.net/ https://d2c7xlmseob604.cloudfront.net https://platform-cdn.uipath.com https://*.uipath.com https://*.pendo.io;style-src 'self' 'unsafe-inline' https://orch-cdn.uipath.com https://fonts.googleapis.com/css https://use.typekit.net https://p.typekit.net/ https://platform-cdn.uipath.com https://content.usage.uipath.com;img-src 'self' data: https://orch-cdn.uipath.com https://s.gravatar.com https://secure.gravatar.com https://*.wp.com https://*.googleusercontent.com https://i.ytimg.com https://platform-cdn.uipath.com https://*.pendo.io https://*.blob.core.windows.net https://*.amazonaws.com blob:;frame-src 'self' https://*.uipath.com https://*.pendo.io;font-src 'self' https://orch-cdn.uipath.com https://use.typekit.net/ https://fonts.gstatic.com https://platform-cdn.uipath.com data:;connect-src 'self' wss: https://orch-cdn.uipath.com https://primer.typekit.net https://use.typekit.net/ https://sentry.io https://studio-feedback.azure-api.net https://app.launchdarkly.com https://clientstream.launchdarkly.com https://events.launchdarkly.com https://api.smartling.com https://platform-cdn.uipath.com https://*.service.signalr.net https://*.uipath.com https://*.pendo.io https://cloud.uipath.com https://storage.googleapis.com https://*.blob.core.windows.net https://*.amazonaws.com dc.services.visualstudio.com;worker-src 'self' blob:",
      "x-xss-protection":"1",
      "x-content-type-options":"nosniff",
      "x-robots-tag":"noindex,nofollow",
      "content-type":"application/json; odata.metadata=minimal; odata.streaming=true",
      "connection":"keep-alive",
      "cache-control":"no-cache, no-store, must-revalidate",
      "odata-version":"4.0"
   },
   "body":{
      "@odata.context":"https://cloud.uipath.com/MyOrg/MyTenant/orchestrator_/odata/$metadata#QueueItems",
      "@odata.count":1,
      "value":[
         {
            "QueueDefinitionId":165001,
            "Encrypted":false,
            "Status":"New",
            "ReviewStatus":"None",
            "Key":"2196eb07-c96a-4f47-a734-326dd5d58a9d",
            "Reference":"test",
            "Priority":"Low",
            "DeferDate":"2023-01-12T00:00:00Z",
            "SecondsInPreviousAttempts":0,
            "RetryNumber":0,
            "SpecificData":"{\"DynamicProperties\":{\"test\":\"test\"}}",
            "CreationTime":"2023-01-20T10:13:20.66Z",
            "RowVersion":"AAAAAE2f4GY=",
            "OrganizationUnitId":1964413,
            "OrganizationUnitFullyQualifiedName":"MyCorporateWorkspace",
            "Id":436141352,
            "SpecificContent":{
               "test":"test"
            }
         }
      ]
   }
}
```

## Appendix

### Using UiPath Connector best practice

There is no guarantee a queue item will be processed right away. In that case, we suggest building your BPMN diagram to periodically retry polling.
To learn more, see an entry _Solution with Timer and Loop_ at [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, it is recommended to limit the number of loop retries.
:::
