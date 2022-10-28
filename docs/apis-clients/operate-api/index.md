---
id: index
title: Operate API (REST)
description: "Operate API is a REST API and provides searching, getting, and changing Operate data.
Requests and responses are in JSON notation."
---

## Introduction

Operate API is a REST API and provides searching, getting, and changing Operate data.
Requests and responses are in JSON notation. Some objects have additional endpoints.
For example, `process-definitions` has an endpoint to get the process-definition as XML representation.
In case of errors, Operate API returns an error object.

## API documentation as Swagger

A detailed API description is also available as Swagger UI at `${base-url}/swagger-ui.html`.

For example: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Authentication

You need authentication to access the API endpoints.

### Authentication in the cloud

#### JWT token

To authorize in the cloud using a JWT token, take the steps in the following example:

**Example:**

1. Obtain a token to access the REST API.
   You need `client_id`, `client_secret`, `audience`, and the URL of the authorization server. For more information on how to get these for Camunda Platform 8, look
   at [Manage API Clients](/docs/components/console/manage-clusters/manage-api-clients/).

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

Take the `access_token` value from the response object and store it as your token.

2. Send the token as an authorization header in each request. In this case, request all process definitions.

```shell
curl -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhb...' -d '{}'
```

#### Cookies

Another way to access API is to use cookie headers in each request. The cookie can be obtained by using the API endpoint `/api/login`. Take the steps in the following example:

**Example:**

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`.

```shell
curl -c cookie.txt -X POST 'http://localhost:8080/api/login?username=demo&password=demo'
```

2. Send the cookie (as a header) in each API request. In this case, request all process definitions.

```shell
curl -b cookie.txt -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -d '{}'
```

### Authentication for Self-Managed cluster

The authentication is described in [Operate Configuration - Authentication](/docs/self-managed/operate-deployment/operate-authentication/#identity).

## Endpoints

| Endpoint (HTTP verb + URL path)         |                                                         Description |
| :-------------------------------------- | ------------------------------------------------------------------: |
| **Process definitions**                 |                                                                     |
| `POST /v1/process-definitions/search`   |                                      Search for process definitions |
| `GET /v1/process-definitions/{key}`     |                                       Get process definition by key |
| `GET /v1/process-definitions/{key}/xml` |                                Get process definition by key as XML |
| **Process instances**                   |                                                                     |
| `POST /v1/process-instances/search`     |                                        Search for process instances |
| `GET /v1/process-instances/{key}`       |                                         Get process instance by key |
| `DELETE /v1/process-instances/{key}`    |                 Delete process instance _and dependant_ data by key |
| **Incidents**                           |                                                                     |
| `POST /v1/incidents/search`             |                                                Search for incidents |
| `GET /v1/incidents/{key}`               |                                                 Get incident by key |
| **Flownode instances**                  |                                                                     |
| `POST /v1/flownode-instances/search`    |                                      Search for flow node instances |
| `GET /v1/flownode-instances/{key}`      |                                       Get flow node instance by key |
| **Variables**                           |                                                                     |
| `POST /v1/variables/search`             | Search for variables; results can contain truncated variable values |
| `GET /v1/variables/{key}`               |            Get variable by key; contains the full value of variable |

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

###### Examples

Return all items with field `processInstanceKey` equals `235`:

```json
{ "filter": { "processInstanceKey": 235 } }
```

Return all items with field `processInstanceKey` equals `235`, `state` equals `ACTIVE` and `incidents` equals `true`:

```json
{
  "filter": { "processInstanceKey": 235, "state": "ACTIVE", "incidents": true }
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
See also [results](#results).

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

See also [Elasticsearch max results](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules.html#index-max-result-window).

#### sortValues (Pagination)

Use the value (an array) of this field to get the next page of results in your next query.
Copy the value to `searchAfter` in your next query to get the next page.

See also [Elasticsearch search after](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/paginate-search-results.html#search-after).

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
      "processDefinitionKey": 2251799813695996
    },
    {
      "key": 2251799813699262,
      "processVersion": 2,
      "bpmnProcessId": "called-process",
      "startDate": "2022-03-17T11:53:41.853+0000",
      "state": "ACTIVE",
      "processDefinitionKey": 2251799813695996
    }
  ],
  "sortValues": ["called-process", 2251799813699262],
  "total": 654
}
```

## Get object by key

Every object has a `GET /v1/<object>/{key}` endpoint where `{key}` is the identifier of the object.
Every object has a `key` field.

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
  "processDefinitionKey": 2251799813695996
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
  "message": "1 process instance and dependant data was delete",
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
 "key":	           <number>
 "name":	       <string>
 "version":        <number>
 "bpmnProcessId":  <string>
}
```

### Process instance

```
{
 "key":	                 <number>
 "processVersion":       <number>
 "bpmnProcessId":        <string>
 "parentKey":	         <number>
 "startDate":	         <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "endDate":	             <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "state":	             <string>
 "processDefinitionKey": <number>
}
```

### Incident

```
{
 "key":	                 <number>
 "processDefinitionKey": <number>
 "processInstanceKey":	 <number>
 "type":	             <string>
 "message":	             <string>
 "creationTime":	     <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "state":	             <string>
}
```

### Flow node instance

```
{
 "key":                  <number>
 "processInstanceKey":	 <number>
 "startDate":            <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "endDate":	             <dateString: yyyy-MM-dd'T'HH:mm:ss.SSSZZ>
 "incidentKey":   	     <number>
 "type":	             <string>
 "state":	             <string>
 "incident":	         <boolean>
}
```

### Variable

```
{
 "key":	                <number>
 "processInstanceKey":	<number>
 "scopeKey":	        <number>
 "name":	            <string>
 "value":	            <string> - Always truncated if value is too big in "search" results. In "get object" result it is not truncated.
 "truncated":	        <boolean> - If true 'value' is truncated.
}
```

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
 "status":	     <number> - HTTP Status
 "message":	     <string> - Details about the error.
 "instance":	 <string> - UUID for look up eg. in log messages
 "type":         <string> - Type of error. Could be ServerException, ClientException, ValidationException, ResourceNotFoundException
}
```
