---
id: operate
title: Camunda Operate Connector
sidebar_label: Camunda Operate
description: Fetch process execution data from Camunda Operate, a monitoring solution for Camunda 8.
---

The **Camunda Operate Connector** allows you to interact with [Camunda Operate](https://camunda.com/platform/operate/) in your BPMN process to fetch process execution data.

## Prerequisites

To use the **Camunda Operate Connector**, you need to have an active Camunda 8 cluster with Operate.
This Connector is compatible with both Camunda 8 SaaS and Camunda 8 Self-Managed.

:::note
Password authentication with Operate is currently not supported.
If you are using Camunda 8 Self-Managed, you can only authenticate using [Identity](/self-managed/operate-deployment/operate-authentication.md#identity).
:::

You also need to obtain the Operate API client credentials. Follow the links below to learn more about API client configuration.

- [API client configuration in Camunda 8 SaaS](/components/console/manage-clusters/manage-api-clients.md)
- [Authentication with a Self-Managed Operate deployment](/self-managed/operate-deployment/operate-authentication.md#identity)

:::note
Use Camunda secrets to store credentials so you don't expose sensitive information directly from the process. See [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Operate Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Enter your cluster information

Choose between **Camunda 8 SaaS** and **Camunda 8 Self-Managed** depending on your Camunda 8 installation type. The input fields will update accordingly.

### SaaS clusters

If you are using a SaaS cluster, you will be required to provide your **region Id** and **cluster Id**. You will see these values when you [create an API client](/guides/setup-client-connection-credentials.md) for your cluster.

### Self-Managed clusters

If you are using a Self-Managed cluster, you need to provide two URLs:

- URL of your OAuth token endpoint
- Operate URL

If you are testing this Connector on your local machine with the Camunda 8 Docker Compose setup, set the following URLs:

- OAuth Token endpoint: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- Operate URL: `http://localhost:8081`

## Configure authentication

For both SaaS and Self-Managed clusters, you need to provide **clientId** and **clientSecret**.
You will see these values when you [create an API client](/guides/setup-client-connection-credentials.md) for your cluster.

For Self-Managed clusters, you can additionally specify the Operate **audience**.
If you are using the default Identity configuration, leave the default `operate-api` value.

## Choose endpoint and operation

In the **Endpoint** dropdown list, select the API entity. You can choose between **Process instances**, **Process definitions**, **Variables**, **Flownode instances**, and **Incidents**.

In the **Operation** dropdown list, select one of the supported operations: **Get by key** or **Search**.

Refer to the Operate [API documentation](/apis-tools/operate-api/overview.md) for more details on the specific operations.

:::note Unsupported operations
The following API operations are currently not supported by the **Operate Connector**:

- Delete process instance
- Get process definition XML

:::

## Configure operation parameters

For **Get by key** operation, you must provide a single input, the entity **key**.

For **Search** operation, the following search parameters can be configured:

- **Filter**: Allows you to filter objects by fields, e.g. the following filter will return active process instance with key 235 if it contains incidents:

  `{ "processInstanceKey": 235, "state": "ACTIVE", "incidents": true }`

  If one of the fields doesn't match, an empty response will be returned for this request. Refer to the [Operate API documentation](/apis-tools/operate-api/overview.md#filter) for more detailed information.

- **Sort**: Sorting properties in Operate format, e.g. `[{ "field": "name", "order": "DESC" }]`. You need to provide a list of sort objects in this field.
- **Results**: Number of results to return.
- **Pagination**: Identifier of an item from which the search should start. Copy this `sortValues` value from the previous Operate response here, or leave this field blank if you don't need pagination. See the [API reference](/apis-tools/operate-api/overview.md#pagination) for details.

## Handle the API response

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable.
2. Use **Result Expression** to map fields from the response into process variables.

Response example:

```
{
    "status": 200,
    "headers": {
      # response headers
    },
    "body": {
        "items": [
            {
                "key": 2251799814052469,
                "processVersion": 1,
                "bpmnProcessId": "Process_1ea5d26b-27dd-4335-bd2a-d1e39c5ce1e3",
                "startDate": "2023-03-21T08:25:04.499+0000",
                "endDate": "2023-03-21T08:25:12.093+0000",
                "state": "COMPLETED",
                "processDefinitionKey": 2251799814052467
            },
            {
                "key": 2251799814052613,
                "processVersion": 2,
                "bpmnProcessId": "Process_1ea5d26b-27dd-4335-bd2a-d1e39c5ce1e3",
                "startDate": "2023-03-21T08:27:49.784+0000",
                "endDate": "2023-03-21T08:27:58.838+0000",
                "state": "COMPLETED",
                "processDefinitionKey": 2251799814052610
            }
        ],
        "sortValues": [
            2251799814052613
        ],
        "total": 55
    }
}
```
