---
id: operate-api-overview
title: Overview
slug: /apis-tools/operate-api/overview
description: "Operate API is a REST API and provides searching, getting, and changing Operate data. Requests and responses are in JSON."
---

## Introduction

Operate API is a REST API and provides searching, getting, and changing Operate data.
Requests and responses are in JSON notation. Some objects have additional endpoints.
For example, `process-definitions` has an endpoint to get the process-definition as XML representation.
In case of errors, Operate API returns an error object.

## API documentation as Swagger

A detailed API description is also available as Swagger UI at `https://${base-url}/swagger-ui/index.html`.

For SaaS: `https://${REGION}.operate.camunda.io/${CLUSTER_ID}/swagger-ui.html`, and for Self-Managed installations: `http://localhost:8080/swagger-ui.html`.

:::note
Find your region and cluster id under connection information in your client credentials.
:::

## Authentication

You need authentication to access the API endpoints.

### Authentication for SaaS

#### Authentication via JWT access token

You must pass an access token as a header in each request to the SaaS Operate API. When you create an Operate [client](/guides/setup-client-connection-credentials.md), you get all the information needed to connect to Operate.

The following settings are needed to request a token:

| Name                     | Description                                     | Default value        |
| ------------------------ | ----------------------------------------------- | -------------------- |
| client id                | Name of your registered client                  | -                    |
| client secret            | Password for your registered client             | -                    |
| audience                 | Permission name; if not given use default value | `operate.camunda.io` |
| authorization server url | Token issuer server                             | -                    |

:::note
For more information on how to get these values for Camunda 8, read [Manage API Clients](/docs/components/console/manage-clusters/manage-api-clients/).
:::

Send a token issue _POST_ request to the authorization server with the required settings:

```shell
curl -X POST -H 'content-type: application/json' -d '{"client_id": "RgVdPv...", "client_secret":"eDS1~Hg...","audience":"operate.camunda.io","grant_type":"client_credentials"}' https://login.cloud.camunda.io/oauth/token
```

You will get something like the following:

```json
{
  "access_token": "eyJhbG...",
  "scope": "f408ca38-....",
  "expires_in": 58847,
  "token_type": "Bearer"
}
```

Capture the `access_token` value from the response object. In each request to the Operate API, include it as an authorization header:

```
Authorization: Bearer eyJHb...
```

### Authentication for Self-Managed cluster

#### Authentication via Identity JWT access token

This authentication method is described in [Operate Configuration - Authentication](/docs/self-managed/operate-deployment/operate-authentication/#identity).

#### Authentication via cookie

Another way to access the Operate API in a Self-Managed cluster is to send cookie headers in each request. The cookie can be obtained by using the API endpoint `/api/login`. Take the steps in the following example:

**Example:**

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`.

```shell
curl -c cookie.txt -X POST 'http://localhost:8080/api/login?username=demo&password=demo'
```

2. Send the cookie (as a header) in each API request. In this case, request all process definitions.

```shell
curl -b cookie.txt -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -d '{}'
```

## Endpoints

| Endpoint (HTTP verb + URL path)                  |                                                         Description | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------------------------------------------- | ------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Process definitions**                          |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/process-definitions/search`            |                                      Search for process definitions |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/process-definitions/{key}`              |                                       Get process definition by key |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/process-definitions/{key}/xml`          |                                Get process definition by key as XML |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Process instances**                            |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/process-instances/search`              |                                        Search for process instances | New field added: `processDefinitionKey` <br/>New field added: `parentFlowNodeInstanceKey` <br/><br/>**Warning**<br/>1. New fields could break deserialization, so ignore fields not used.<br/>2. The `processDefinitionKey` field will only contain data from version 8.1.8 onward                                                                                                                                                            |
| `GET /v1/process-instances/{key}`                |                                         Get process instance by key | New field added: `processDefinitionKey` <br/>New field added: `parentFlowNodeInstanceKey` <br/><br/>**Warning**<br/>1. New fields could break deserialization, so ignore fields not used.<br/>2. The `processDefinitionKey` field will only contain data from version 8.1.8 onward                                                                                                                                                            |
| `DELETE /v1/process-instances/{key}`             |                 Delete process instance _and dependent_ data by key |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/process-instances/{key}/statistics`     |                     Get flow node statistic by process instance key | New endpoint                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `GET /v1/process-instances/{key}/sequence-flows` |                       Get sequence flows of process instance by key | New endpoint                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Incidents**                                    |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/incidents/search`                      |                                                Search for incidents |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/incidents/{key}`                        |                                                 Get incident by key |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Flownode instances**                           |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/flownode-instances/search`             |                                      Search for flow node instances | New fields added: <br/>`flowNodeId`<br/>`flowNodeName`<br/>`processDefinitionKey` <br/><br/>**Warning**<br/>1. New fields could break deserialization, so ignore fields not used.<br/>2. The `processDefinitionKey` field will only contain data from version 8.1.8 onward<br/>3. The field `flowNodeName` is only returned if set in the BPMN diagram, so no flowNodeName is returned for flow nodes that do not have it set in the diagram. |
| `GET /v1/flownode-instances/{key}`               |                                       Get flow node instance by key | New fields added: <br/>`flowNodeId`<br/>`flowNodeName`<br/>`processDefinitionKey` <br/><br/>**Warning**<br/>1. New fields could break deserialization, so ignore fields not used.<br/>2. The `processDefinitionKey` field will only contain data from version 8.1.8 onward<br/>3. The field `flowNodeName` is only returned if set in the BPMN diagram, so no flowNodeName is returned for flow nodes that do not have it set in the diagram. |
| **Variables**                                    |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/variables/search`                      | Search for variables; results can contain truncated variable values |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/variables/{key}`                        |            Get variable by key; contains the full value of variable |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Decision definitions**                         |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/decision-definitions/search`           |                                     Search for decision definitions |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/decision-definitions/{key}`             |                                      Get decision definition by key |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Decision requirements**                        |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/drd/search`                            |                                    Search for decision requirements |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/drd/{key}`                              |                                    Get decision requirements by key |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/drd/{key}/xml`                          |                             Get decision requirements by key as XML |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Decision instances**                           |                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `POST /v1/decision-instances/search`             |                                       Search for decision instances |                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `GET /v1/decision-instances/{id}`                |                                         Get decision instance by id | The field `id` must be used here as path variable, because the `key` field is not unique for decision instances                                                                                                                                                                                                                                                                                                                               |

## Multi-tenancy

:::note
The [multi-tenancy feature](../../self-managed/operate-deployment/operate-configuration.md#multi-tenancy) is available in Self-Managed setups only.
:::

All Operate endpoints for which tenant assignment is relevant will:

- Return `tenantId` field in response
- Provide `tenantId` search parameter

Review the Swagger documentation for the exact request and response structure.

## Search

Every object has a search `/v1/<object>/search` endpoint which can be requested by `POST` and a given query request.

### Query

The query request consists of components for **filter**, **size**, **sort**, and **pagination**.

```
{
   "filter": { object fields to match },
   "size": <number of items to return>,
   "sort": [ {"field":"<name of field to sort on>", "order": "<ASC|DESC>" ],
   "searchAfter": [ <identifier of item from which next search should start> ]
}
```

#### Filter

Specifies which fields should match. Only items that match the given fields will be returned.
The section on [object schemas](#object-schemas) lists all available fields for each object.

##### Filter strings, numbers, and booleans

Fields of type string, number, and boolean need the exact value to match.

:::note
When filtering process instances, `parentProcessInstanceKey` can be used instead of `parentKey` in the request JSON. The response JSON for a process instance will contain the field `parentKey`, even when `parentProcessInstanceKey` is used during input filtering.
:::

###### Examples

Return all items with field `processInstanceKey` equals `235`:

```json
{ "filter": { "processInstanceKey": 235 } }
```

Return all items with field `parentKey` equals `123`. Note: `parentProcessInstanceKey` can also be used as an alias for `parentKey` and filters identically:

```json
{ "filter": { "parentKey": 123 } }
```

```json
{ "filter": { "parentProcessInstanceKey": 123 } }
```

A filter that could be used to search for all flow node instances with field `processInstanceKey` equals `235`, `state` equals `ACTIVE` and `incident` equals `true`:

```json
{
  "filter": { "processInstanceKey": 235, "state": "ACTIVE", "incident": true }
}
```

##### Filter dates

Date fields need to be specified in format: `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`; for example, `2022-03-17T11:50:25.729+0000`.

You can use modifier to match date ranges:

| Modifier | Description     |
| -------- | --------------- |
| \|\|/y   | Within a year   |
| \|\|/M   | Within a month  |
| \|\|/w   | Within a week   |
| \|\|/d   | Within a day    |
| \|\|/h   | Within an hour  |
| \|\|/m   | Within a minute |
| \|\|/s   | Within a second |

###### Example

Return all items with field `startDate` within a minute (`||/m`) for `2022-03-17 11:50:25`.

```json
{
  "filter": {
    "startDate": "2022-03-17T11:50:25.729+0000||/m"
  }
}
```

#### Size

Maximum items should be returned and must be a number.

##### Example

Return maximum `23` items:

```json
{ "size": 23 }
```

#### Sort

Specify which field of the object should be sorted and whether ascending (`ASC`) or descending (`DESC`).

##### Example

Sort by `name` **desc**ending:

```json
{ "sort": [{ "field": "name", "order": "DESC" }] }
```

#### Pagination

Specify the item where the next search should start. For this, you need the values from previous results.
Copy the values from `sortValues` field from the previous results into the `searchAfter` value of query.
Refer also to [results](#results).

##### Example

Get next 10 results for previous query by copying the value of `sortValues` of the previous results object.
Assuming the `sortValues` value was `["the-name",12345]`, put it as value for `searchAfter` in the next query.

```json
{
  "sort": [{ "field": "name", "order": "DESC" }],
  "searchAfter": ["the-name", 12345]
}
```

#### Query components combined

The query components `filter`, `size`, `sort`, and `searchAfter` can be combined.

Default values are:

| Component   | Default value                     | Description                  |
| ----------- | --------------------------------- | ---------------------------- |
| filter      | null                              | Empty (all fields match)     |
| size        | 10                                |                              |
| sort        | `[{"field":"key","order":"ASC"}]` | Sorted ascending by key      |
| searchAfter | null                              | First items will be returned |

##### Example

Get max `50` process instances with `processVersion` equals `2` sorted `asc`ending by `bpmnProcessId`:

`POST /v1/process-instances/search`

```json
{
  "filter": {
    "processVersion": 2
  },
  "size": 50,
  "sort": [
    {
      "field": "bpmnProcessId",
      "order": "ASC"
    }
  ]
}
```

Results are:

```json
  ...
  {
      "key": 2251799813699162,
      "processVersion": 2,
      "bpmnProcessId": "called-process",
      "startDate": "2022-03-17T11:53:41.581+0000",
      "state": "ACTIVE",
      "processDefinitionKey": 2251799813695996
    }
  ],
  "sortValues": [
    "called-process",
    2251799813699162
  ],
  "total": 654
}
```

Take the value of `sortValues` and copy it to `searchAfter` for the next `50` items:

```json
{
  "filter": {
    "processVersion": 2
  },
  "size": 50,
  "sort": [
    {
      "field": "bpmnProcessId",
      "order": "ASC"
    }
  ],
  "searchAfter": ["called-process", 2251799813699162]
}
```

### Results

The API responds with a `Results` object. It contains an `items` array, `total` amount of found items,
and `sortValues` for pagination.

```
{
  "items": [ { item 1 } , { item 2 } ... ],
  "total": <number of found items>,
  "sortValues": [<array of values to retrieve next page of results>]
}
```

#### Items

An array of objects that matches the query.

#### Total

The total amount of found objects. This is an exact value until 10,000. If more than this, try to make your query more specific.

Refer also to [Elasticsearch max results](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules.html#index-max-result-window).

#### sortValues (Pagination)

Use the value (an array) of this field to get the next page of results in your next query.
Copy the value to `searchAfter` in your next query to get the next page.

Refer also to [Elasticsearch search after](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/paginate-search-results.html#search-after).

##### Example

Results for `process-instances`:

```json
{
  "items": [
    {
      "key": 2251799813699213,
      "processVersion": 2,
      "bpmnProcessId": "called-process",
      "startDate": "2022-03-17T11:53:41.758+0000",
      "state": "ACTIVE",
      "processDefinitionKey": 2251799813695996,
      "parentKey": 4503599627370497,
      "parentFlowNodeInstanceKey": 4503599627370535
    },
    {
      "key": 2251799813699262,
      "processVersion": 2,
      "bpmnProcessId": "called-process",
      "startDate": "2022-03-17T11:53:41.853+0000",
      "state": "ACTIVE",
      "processDefinitionKey": 2251799813695996,
      "parentKey": 4503599627370497,
      "parentFlowNodeInstanceKey": 4503599627370535
    }
  ],
  "sortValues": ["called-process", 2251799813699262],
  "total": 654
}
```

## Get object by key

Every object has a `GET /v1/<object>/{key}` endpoint where `{key}` is the identifier of the object.
Every object has a `key` field. One special case is for decision instances, where the identifier is the `id` field, because the `key` field is not unique.

### Example

Get the data for process instance with key `2251799813699213`:

`GET /v1/process-instances/2251799813699213`

#### Result:

```json
{
  "key": 2251799813699213,
  "processVersion": 2,
  "bpmnProcessId": "called-process",
  "startDate": "2022-03-17T11:53:41.758+0000",
  "state": "ACTIVE",
  "processDefinitionKey": 2251799813695996,
  "parentKey": 4503599627370497,
  "parentFlowNodeInstanceKey": 4503599627370535
}
```

## Change objects

Some objects can be changed (for example, deleted).
The endpoint is the same as getting the object, but with HTTP `DELETE` instead of HTTP `GET`.
The response is a `ChangeStatus` object which describes what happened and how many objects were changed.

### Example

Delete the data for process instance (and all dependant data) with key `2251799813699213`:

`DELETE /v1/process-instances/2251799813699213`

#### Result

```json
{
  "message": "1 process instance and dependant data was deleted",
  "deleted": 1
}
```

## Object schemas

Each object has a set of fields with values.
These values could be of type `string`, `number`, `boolean`, and `dateString`.

| Type       | Example                        |
| ---------- | ------------------------------ | ----- |
| string     | "Operate"                      |
| number     | 235                            |
| boolean    | true                           | false |
| dateString | "2022-03-23T11:50:25.729+0000" |

### Process definition

```
{
 "key":             <number>
 "name":            <string>
 "version":         <number>
 "bpmnProcessId":   <string>
}
```

### Process instance

```
{
 "key":                       <number>
 "processVersion":            <number>
 "bpmnProcessId":             <string>
 "parentKey":                 <number>
 "startDate":                 <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "endDate":                   <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "state":                     <string>
 "processDefinitionKey":      <number>
 "parentFlowNodeInstanceKey": <number>
}
```

### Incident

```
{
 "key":                     <number>
 "processDefinitionKey":    <number>
 "processInstanceKey":      <number>
 "type":                    <string>
 "message":                 <string>
 "creationTime":            <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "state":                   <string>
}
```

### Flow node instance

```
{
 "key":                     <number>
 "processInstanceKey":	    <number>
 "processDefinitionKey":    <number>
 "startDate":               <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "endDate":                 <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "flowNodeId":              <string>
 "flowNodeName":            <string>
 "incidentKey":             <number>
 "type":                    <string>
 "state":                   <string>
 "incident":                <boolean>
}
```

The field flowNodeName is only returned if set in the BPMN diagram, so no flowNodeName is returned for flow nodes that do not have it set in the diagram.

### Variable

```
{
 "key":                 <number>
 "processInstanceKey":  <number>
 "scopeKey":            <number>
 "name":                <string>
 "value":               <string> - Always truncated if value is too big in "search" results. In "get object" result it is not truncated.
 "truncated":           <boolean> - If true 'value' is truncated.
}
```

### Decision definition

```
{
 "id":                          <string>
 "key":                         <number> - Same as "id"
 "decisionId":                  <string>
 "name":                        <string>
 "version":                     <number>
 "decisionRequirementsId":      <string>
 "decisionRequirementsKey":     <number>
 "decisionRequirementsName":    <string>
 "decisionRequirementsVersion": <number>
}
```

### Decision requirements

```
{
 "id":                          <string>
 "key":                         <number> - Same as "id"
 "decisionRequirementsId":      <string>
 "name":                        <string>
 "version":                     <number>
 "resourceName":                <string>
}
```

### Decision instance

```
{
 "id":                   <string> - Unique identifier
 "key":                  <number> - Not unique for decision instances
 "state":                <string> - Possible values are "FAILED", "EVALUATED", "UNKNOWN", "UNSPECIFIED"
 "evaluationDate":       <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "evaluationFailure":    <string>
 "processDefinitionKey": <number>
 "processInstanceKey":   <number>
 "decisionId":           <string>
 "decisionDefinitionId": <string>
 "decisionName":         <string>
 "decisionVersion":      <number>
 "decisionType":         <string> - Possible values are "DECISION_TABLE", "LITERAL_EXPRESSION", "UNKNOWN", "UNSPECIFIED"
 "result":               <string>
 "evaluatedInputs":      <array> - See note below
 "evaluatedOutputs":     <array> - See note below
}
```

The field `evaluatedInputs` is an array of objects, where each object has the following fields:

```
{
 "id":    <string>
 "name":  <string>
 "value": <string>
}
```

The field `evaluatedOutputs` is an array of objects, where each object has the following fields:

```
{
 "id":        <string>
 "name":      <string>
 "value":     <string>
 "ruleId":    <string>
 "ruleIndex": <number>
}
```

The fields `evaluatedInputs` and `evaluatedOutputs` are not returned in search results, because they can be very large. They are only returned when requesting a specific decision instance by identifier.
The fields `result`, `evaluatedInputs`, and `evaluatedOutputs` cannot be used to filter the search results.

### Change status

```
{
 "message":	<string> - What was changed
 "deleted":	<number> - How many items were deleted
}
```

### Error

```
{
 "status":      <number> - HTTP Status
 "message":     <string> - Details about the error.
 "instance":    <string> - UUID for look up eg. in log messages
 "type":        <string> - Type of error. Could be ServerException, ClientException, ValidationException, ResourceNotFoundException
}
```
