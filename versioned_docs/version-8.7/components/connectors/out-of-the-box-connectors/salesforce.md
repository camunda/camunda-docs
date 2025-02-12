---
id: salesforce
title: Salesforce Connector
sidebar_label: Salesforce
description: Manage your Salesforce Instance from your BPMN process. Learn how to create a Salesforce Connector task, and get started.
---

The **Salesforce Connector** is an outbound protocol Connector that allows you to connect your BPMN service with [Salesforce](https://salesforce.com/) to interact with the [Salesforce APIs](https://developer.salesforce.com/docs/apis).

## Prerequisites

To use the **Salesforce Connector**, you must have a [Salesforce Connected App with OAuth 2.0 Client Credentials Flow](https://help.salesforce.com/s/articleView?id=sf.connected_app_client_credentials_setup.htm&type=5).

:::note
Use Camunda secrets to avoid exposing your _Salesforce Connected App_ client ID and client secret as plain text. Learn more in our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

## Create a Salesforce Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Instance

Each operation requires information about the **Salesforce Base URL**.

Example: `https://MyDomainName.my.salesforce.com`

The Salesforce API version should be the one you want to use. You can search for this information [in your Salesforce API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_versions.htm).

## Authentication

In the **Authentication** section, select **Bearer Token** to provide a static access token or **OAuth 2.0** to configure client credentials.

:::note
While the static access token is useful for getting started, it is recommended to provide the **OAuth 2.0** client credentials.
:::

## Operation

### Operation types

Currently, this Connector supports two types of operation:

- [SOQL Query](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm)
- [sObject records](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm)

### SOQL Query

The **SOQL Query** only requires the query itself as input. A query is useful for receiving data based on a structured query language. Take a closer look at some available [examples](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_examples.htm).

The response body looks like the following:

```json
{
  "totalSize": 1,
  "done": true,
  "records": [
    {
      "attributes": {
        "type": "<object>",
        "url": "/services/data/<API version>/sobjects/<object>/<object id>"
      },
      "<queried field name>": "<field value>",
      "...": "..."
    }
  ]
}
```

### sObject records

**sObject records** support **Create record**, **Get record**, **Update record**, and **Delete record**.

:::note
Every operation explanation contains a link to the Salesforce API docs which will explain the request and provide an example.
:::

#### Create record

- **Salesforce object:** The Salesforce object to create, e.g. _Account_.
- **Record fields:** Field values for the Salesforce object to create, e.g. `{ Name: "Express Logistics and Transport" }`.

Review an example including the response body format in the [Salesforce documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_create.htm).

#### Get record

- **Salesforce object:** The Salesforce object to create, e.g. _Account_.
- **Salesforce object ID:** Identifier of the Salesforce object, e.g. _001R0000005hDFYIA2_.
- **Relationship field name _(optional)_:** Name of the field that contains the relationship, e.g. _Opportunities_.
- **Query Parameters _(optional)_:** Additional query parameters that can be provided along with the request, e.g. `{ fields: "AccountNumber,BillingPostalCode" }`.

When omitting the **Relationship field name**, a [get request for a record](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_retrieve_get.htm) is performed. Otherwise, a [get request for records using sObject relationships](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_relationships_get.htm) is performed. In the documentation linked above, you can find the possible use case for **Query parameters**; for example, [filtering fields](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_get_field_values.htm).

The response body will contain the requested object as the root object:

```json
{
  "attributes": {
    "type": "<object>",
    "url": "/services/data/<API version>/sobjects/<object>/<object id>"
  },
  "<field name>": "<field value>",
  "...": "..."
}
```

Find another example [here](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_get_field_values.htm).

#### Update object

- **Salesforce object:** The Salesforce object to create, e.g. _Account_.
- **Salesforce object ID:** Identifier of the Salesforce object, e.g. _001R0000005hDFYIA2_.
- **Record fields:** Field values for the Salesforce object to update, e.g. `{ BillingCity : "San Francisco" }`.

[These update the record](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_retrieve_patch.htm) using the given fields.

As an update does not return a body, you will not be able to map any data from the response back to the process.

#### Delete object

- **Salesforce object:** The Salesforce object to create, e.g. _Account_.
- **Salesforce object ID:** Identifier of the Salesforce object, e.g. _001R0000005hDFYIA2_.

[These delete the record](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_retrieve_delete.htm).

As a delete does not return a body, you will not be able to map any data from the response back to the process.

## Handle Connector response

The **Salesforce Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**. Therefore,
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
