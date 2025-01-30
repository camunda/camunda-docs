---
id: camunda-api-rest-guidelines
title: "Guidelines"
description: "Learn about the basic guidelines, structures, and conventions of the Camunda 8 REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda follows a mix of proposed standards and best practices for RESTful design and consistent implementation across all components.

## Naming conventions

Naming is simple, intuitive, and consistent across Camunda 8 APIs to reduce friction when working across multiple APIs.

The API overall applies the following naming conventions:

- **Nouns** over verbs, for example, `assignment` over `assign`.
- **Plural terms** for top-level resources, for example, `user-tasks`.
- **Kebab-case** for multiple words in path parameters, and a hyphen (-) where a space would exist, for example, `user-tasks`.
- **camelCase** for multiple words in query parameters. Camunda capitalizes the first letter of words after the first. The first letter in the first word is lowercase, for example, `userTaskKey`.

These conventions can be observed in the following endpoint example:

`POST /user-tasks/{userTaskKey}/assignment`

For IDs or similar short 2- or 3-letter words or acronyms, Camunda only capitalizes the first letter. If standalone, all letters are lowercase.

| Term | Usage                                      |
| ---- | ------------------------------------------ |
| ID   | `id` (standalone) or `processDefinitionId` |
| URL  | `url` (standalone) or `externalUrl`        |
| UUID | `uuid` (standalone) or `clusterUuid`       |

Identifiers follow a naming rule in parameters and data attributes alike:

- Unique technical identifiers are suffixed with **key**, for example, `userTaskKey`, `processInstanceKey`, or `userKey`. These are numeric values in most cases.
- Other identifiers, such as copied identifiers from the BPMN XML, may be arbitrarily named but are usually suffixed with **id**, for example, `processDefinitionId`.

## Versioning

Camunda uses the term “major version number” from [semantic versioning](https://semver.org/), but does not follow semantic versioning for APIs outright. Instead, Camunda provides updates to the API in place and only increments the version number for a major, breaking change.

:::note
New attributes and endpoints are not considered breaking changes.
:::

The API version number does not match the product version (8.x.x). An API’s version is rather defined by the API version number and the product version, for example, `_POST /v2/user-tasks/search_ in Camunda 8.7.0`.

Camunda does API versioning rather than endpoint versioning, for example, the version changes for all endpoints if there is a breaking change in at least one endpoint. Multiple versions of an API can exist in a product version to allow for a migration period, for example, `POST /v2/user-tasks/search and POST /v3/user-tasks/search in Camunda 8.7.0`.

## HTTP status codes & error handling

Handling errors is consistent across all endpoints, using well-known HTTP status codes and clear descriptions. This includes the information about errors and the use of a problem details object.

Camunda follows the proposed standard from [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) for problem details. The problem object contains at least the following members:

- Type
- Status
- Title
- Detail
- Instance

Camunda uses the following error codes and descriptions across our APIs:

| Error code | Meaning                                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200        | OK                                                                                                                                                                         |
| 204        | No content                                                                                                                                                                 |
| 400        | Bad request. Generic error that contains further description in the problem detail.                                                                                        |
| 401        | Unauthorized. The client is not authenticated yet. The client should try again with a modified authorization header.                                                       |
| 403        | Forbidden. The client has incorrect or insufficient permissions for the request.                                                                                           |
| 404        | Not found                                                                                                                                                                  |
| 409        | Conflict. The request is trying to modify a resource that is currently not in the right state.                                                                             |
| 412        | Precondition failed. The client should check the cluster status.                                                                                                           |
| 429        | Rate limit exceeded. The client exceeds a defined limit of requests, for example, Zeebe signaling backpressure due to more requests than the broker can currently process. |
| 500        | Internal server error. Generic error that contains further description in the problem detail.                                                                              |

## Data fetching

Most resources provide at least one endpoint to fetch related data. Most of those endpoints provide data with near-real time consistency queried from exported records, if records for the respective resource are exported by the engine. If resources are not based on exported records, for example license data or topology information, the data returned by those endpoints can reflect real time insights or static content.

For most resources, there are search endpoints to query by POST method and a given query request object where applicable. The structure of such query requests always follows the same schema and so does the response, always returning a list of items matching the query criteria.

[Search requests](#search-requests) are forwarded as queries to the datastores that hold the exported records and the query results are returned in the format described in [search responses](#search-responses).

Resources can also support querying subordinate resources. For example, for users and groups, with user search being available at `POST /v2/users/search`, a user's groups can be retrieved using `POST /v2/users/{userKey}/groups/search`. Each resource determines independently if subordinate resources can be accessed this way.

Search endpoints can also be used to directly access entity instances with a unique identifier. As an alternative, resources can also provide GET method endpoints for fetching the data of single instances. In most cases, this is done by a specific key parameter in the URL path, for example `GET /v2/users/{userKey}`.

### Search requests

Query requests consist of the components for **filter**, **sort**, and **page**.

<Tabs groupId="requestComponents" defaultValue="filter" queryString values={[{label: 'Filter', value: 'filter', },{label: 'Sort', value: 'sort', },{label: 'Page', value: 'page', },]} >

<TabItem value="filter">

The filter object defines which fields should match. Only items that match the given fields will be returned. The available fields vary by object and are described in the respective search endpoint. Filtering by a unique identifier is usually available in filtering options. Beyond that, the filter options don’t have to comprise all the returned items’ attributes.
</TabItem>
<TabItem value="sort">
The sort object specifies which fields of the object should be sorted and whether they are sorted in ascending (ASC) or descending (DESC) order.
</TabItem>
<TabItem value="page">
The page object details how to slice the result set. An initial search request can omit the page object or define the limit. This specifies the maximum number of results to retrieve per request. Subsequent requests can use the value of the returned firstItemSortValues and lastItemSortValues of the [search responses](#search-responses) to page through the items by copying that array into one of the attributes searchAfter or searchBefore.
</TabItem>
</Tabs>

<details>
  <summary><h4>Example</h4></summary>
  <p>

```
{
  "filter":  {
    <entity-specific  filter  options>
  },
  "sort":  [
    {  "<field>":  "<order>"  },
    {  "<field>":  "<order>"  }
  ],
  "page":  {
    "searchAfter":  [  …  ,  …  ],
    "searchBefore":  [  …  ,  …  ],
    "limit":  <limit>
  }
}
```

  </p>
</details>

### Search responses

Query responses consist of the components **items** and **page**.

The **items** object is an array of instances of the respective endpoint’s resource. The attributes of those instances vary by endpoint and are described in the endpoint’s documentation.

The **page** object contains the pagination information that can be used for subsequent search requests to page through the results. The `totalItems` attribute specifies the overall number of results for the query to be retrieved (note: for ES/OS, this is limited to 10,000, even if more results are available).

The `firstSortValues` field lists the criteria identifying the **first** entry of this page to allow paging backward in the result set by copying them into a respective page attribute like `searchBefore` in a [search request](#search-requests). The `lastSortValues` field provides the same for the **last** entry of this page to allow paging forward using `searchAfter`. In detail, those arrays contain the values of the first or last item’s attributes corresponding to the attributes defined in the request’s `sort` object, in the same order. The last element of the array is the item’s value of our internal tiebreaker attribute, typically the internal record’s key.

```
{
  "items": [
    { <field1>: <value1>, <field2>: ... }
    { <field1>: <value1>, <field2>: ... }
  ],
  "page": {
    "totalItems": <total  hits>,
    "firstSortValues": [
      <sort field1 value>,
      <sort field2 value>,
      ... ,
      <internal tiebreaker value>
    ],
    "lastSortValues": [
      <sort field1 value>,
      <sort field2 value>,
      ... ,
      <internal tiebreaker value>
    ]
  }
}
```

### Search example

Querying for the first three user tasks with certain criteria sorted by state could look as follows:

<details>
  <summary><h4>POST /v2/user-tasks/search</h4></summary>
  <p>

```
{
  "filter": {
    "assignee": "demo",
    "variables" : {
      "orderVolume": 10000
    }
  },
  "sort": [
    { "state": "ASC" }
  ],
  "page": {
    "limit": 3
  }
}
```

  </p>
</details>

This could yield the following example result:

<details>
  <summary><h4>200 OK</h4></summary>
  <p>

```
{
  "items": [
    {
      "state": "CREATED",
      "processInstanceKey": 22456786958,
      "userTaskKey": 22456786345,
      ...
    },
    {
      "state": "CREATED",
      "processInstanceKey": 22456786958,
      "userTaskKey": 22456786456,
      ...
    },
    {
      "state": "COMPLETED",
      "processInstanceKey": 22456786958,
      "userTaskKey": 22456786678,
      ...
    }
  ],
  "page": {
    "totalItems":  345,
    "firstSortValues": [ "CREATED", 22456786345 ]
    "lastSortValues": [ "COMPLETED", 22456786678 ]
  }
}
```

  </p>
</details>

A follow-up request to receive the next three items could then look as follows:

<details>
  <summary><h4>POST /v2/user-tasks/search</h4></summary>
  <p>

```
{
  "filter": {
    "assignee": "demo",
    "variables" : {
      "orderVolume": 10000
    }
  },
  "sort": [
    { "state": "ASC" }
  ],
  "page": {
    "limit":  3,
    "searchAfter": [ "COMPLETED", 22456786678 ]
  }
}
```

  </p>
</details>

This yields the next three user task items after the last one from the first search request’s result.

## Date values

All date values in the REST API endpoints follow the [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) notation. This includes all requests and responses. Endpoints must validate requests and transform responses accordingly.

## Variables

Variables in the REST API endpoints are proper JSON objects, where the key defines the variable name and the value specifies the variable value. This includes all requests and responses. Endpoints must validate requests and transform responses accordingly.
