---
id: camunda-api-rest-guidelines
title: "Guidelines"
description: "Learn about the basic guidelines, structures, and conventions of the Camunda 8 REST API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda follows a mix of proposed standards and best practices for RESTful design and consistent implementation across all components.
This guide details some of the foundations Camunda uses to build their C8 APIs.

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
- Key and id fields contain the entity as a prefix, for example, `userTaskKey` or `processDefinitionId`. This also applies when referencing other resources like `formKey` in the user task entity and the respective entities themselves like `userTaskKey` in the user task entity.
- The full entity is the prefix to avoid confusion, for example, `processDefinitionKey` instead of `processKey`; the latter could be interpreted as process instance or process definition.
- Other attributes of entities have no prefix to avoid clutter, such as `version` in the process definition entity. However, other resources have to be referenced with a prefix, like `processDefinitionVersion` in the process instance entity.

## Versioning

Camunda uses the term “major version number” from [semantic versioning](https://semver.org/), but does not follow semantic versioning for APIs outright. Instead, Camunda provides updates to the API in place and only increments the version number for a major, breaking change.

:::note
New attributes and endpoints are not considered breaking changes.
:::

The API version does not match the product version (8.x.x). An API’s version is rather defined by the API version number (e.g., `v2`) and the product version, for example, `POST /v2/user-tasks/search` in Camunda 8.8.0.

Camunda does API versioning rather than endpoint versioning. For example, the version changes for all endpoints if there is a breaking change in at least one endpoint. Multiple versions of an API can exist in one product version to support a migration period, for example, `POST /v2/user-tasks/search` and `POST /v3/user-tasks/search` in Camunda 8.x.x.

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

All persistent resources like process definitions, user tasks, users, or tenants provide at least one endpoint to fetch related data. Most of those endpoints provide data with **near-real time consistency** queried from exported records, if records for the respective resource are exported by the engine. If resources are not based on exported records, such as license data or topology information, the data returned by those endpoints can reflect real time insights or static content. For resources like messages, signals, or the engine's internal clock, the engine does not persist any specific data and thus there is no API to fetch them.

Many resources offer search endpoints to query by POST method and a given query request object where applicable. The structure of such search requests always follows the same schema and so does the response, always returning a list of items matching the query criteria, accompanied by search result metadata.

[Search requests](#search-requests) are forwarded as queries to the data stores that hold the exported records and the search results are returned in the format described in [search responses](#search-responses).

Resources can also support querying subordinate resources. For example, for users and groups, with group search being available at `POST /v2/groups/search`, a group's users can be retrieved using `POST /v2/groups/{groupId}/users/search`. Each resource determines independently if subordinate resources can be accessed this way.

Search endpoints can also be used to access entity instances with a unique identifier directly. As an alternative, resources can also provide GET method endpoints for fetching the data of single instances. This is done by a specific key parameter in the URL path, for example `GET /v2/user-tasks/{userTaskKey}`.

### Search requests

Search requests consist of the components for **filter**, **sort**, and **page**. The [search example](#search-example) details how to use these attributes.

#### Filter

The filter object defines which fields should match. Only items that match the given fields will be returned. The available fields vary by object and are described in the respective search endpoint. Filtering by a unique identifier is usually available in filtering options. Beyond that, the filter options don’t have to comprise all the returned items’ attributes.

#### Sort

The sort object specifies by which fields to sort the result items and whether this happens in ascending (ASC) or descending (DESC) order.

#### Page

The page object details how to slice the result set. An initial search request can omit the page object or define the `limit`. This specifies the maximum number of results to retrieve per request. Subsequent requests can either use keyset or offset pagination to iterate through the result set.

Keyset pagination bases on the value of the [search response's](#search-responses) `firstSortValues` and `lastSortValues`. Copy `firstSortValues` into `searchBefore` or `lastSortValues` into `searchAfter` to page through results respectively. The [search example](#search-example) showcases how to use these attributes for keyset pagination.

Offset pagination uses the `from` attribute to define the starting point of the next set of items in the overall result set.

:::note
Choosing the right pagination type depends on the specific use case. The expected result set size and intended usage of the results have the biggest influence. The expected reliability and performance of the search request affect this decision as well.

Consider using keyset pagination for larger result sets and displaying result list that scroll infinitely.
Paged result sets can be realized with offset pagination in a straightforward way but come with performance penalties for larger result sets.
:::

#### Advanced search filters

To provide an easy yet expressive way for users to search for and filter resources, search requests can contain more advanced filter criteria than fields being _equal_ to a target value.

For example, this allows searching using logical (and, in) and comparison operators (greater than, less than). The list of generally supported advanced filter operators is described below. The supported operators depend on the endpoint and the type of the filter attribute. All endpoints document available operators for each attribute in the API specification. Examples of advanced operators are shown in the [search example](#search-example).

<Tabs groupId="advancedSearch" defaultValue="conditionalOperators" queryString values={[{label: 'Conditional operators', value: 'conditionalOperators', },{label: 'Logical operators', value: 'logicalOperators', },{label: 'Variable filtering', value: 'variableFiltering', },]} >

<TabItem value="conditionalOperators">

| Operator  | Syntax                                         | Description                                                                                                                                                                                                                      |
| --------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$eq`     | `field: { "$eq": value }`                      | Filter where `field` is equal to `value`. Abbreviated form `field: value` is also allowed.                                                                                                                                       |
| `$neq`    | `field: { "$neq": value }`                     | Filter where `field` is not equal to `value`.                                                                                                                                                                                    |
| `$exists` | `field: { "$exists": value }`                  | Filter where `field` does or does not exist. The `value` is a boolean and can be either `true` or `false`.                                                                                                                       |
| `$gt`     | `field: { "$gt": value }`                      | Filter where `field` is greater than `value`.                                                                                                                                                                                    |
| `$gte`    | `field: { "$gte": value }`                     | Filter where `field` is greater than or equal to `value`.                                                                                                                                                                        |
| `$lt`     | `field: { "$lt": value }`                      | Filter where `field` is less than `value`.                                                                                                                                                                                       |
| `$lte`    | `field: { "$lte": value }`                     | Filter where `field` is less than or equal to `value`.                                                                                                                                                                           |
| `$like`   | `field: { "$like": value }`                    | Filter where `field` contains a string like `value`. The wildcard characters `*` (zero, one, or multiple characters) and `?` (a single character) are allowed in `value`. They can be escaped with a backslash, like in `my \*`. |
| `$in`     | `field: { "$in": [ value1, value2, ... ] }`    | Filter where `field` is equal to at least one of the `value`s in the provided array.                                                                                                                                             |
| `$notIn`  | `field: { "$notIn": [ value1, value2, ... ] }` | Filter where `field` is not equal to any one of the `value`s in the provided array.                                                                                                                                              |

</TabItem>

<TabItem value="logicalOperators">

| Operator | Syntax                                                        | Description                                                                                                               |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `$or`    | `"$or": [ { condition1 }, { condition2 }, ... ]`              | Filter where at least one of the conditions is true.                                                                      |
| and      | `{ field: { "$lt": value1 }, field: { "$gt": value2 }, ... }` | All conditions outside of $or operators will be considered as combined by an and operator. There is no explicit operator. |

</TabItem>

<TabItem value="variableFiltering">

Search endpoints can support filtering by variable values. This allows querying for process-related resources based on the values of specific variables that exist in their respective scope. For example, user task search supports filtering using the `localVariables` array and defining filter criteria for specific variables.

Generally, the syntax looks as follows:

```
POST /v2/user-tasks/search

{
  "filter": {
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "foo", "value": { "$lt": "500" } },
      { "name": "bar", "value": { "$exists": false } }
    ]
  }
}
```

This filters for user tasks containing at least the variables `orderVolume` with a value of `10000` and `foo` with a value lower than `500`, not containing variable `bar`.

For variable values, the advanced filter criteria outlined above for fields apply.

</TabItem>
</Tabs>

### Search responses

Search responses consist of the components **items** and **page**.

The **items** array contains instances of the respective endpoint’s resource. The attributes of those instances vary by endpoint and are described in the endpoint’s documentation.

The **page** object contains the pagination information that can be used in subsequent search requests to page through the results. The `totalItems` attribute specifies the overall number of results for the query to be retrieved (note: for ES/OS, this is limited to 10,000, even if more results are available).

The `firstSortValues` field lists the criteria identifying the **first** entry of this page. This allows paging backward in the result set by copying them into the `searchBefore` attribute in a subsequent [search request](#search-requests). The `lastSortValues` field provides the same for the **last** entry of this page to allow paging forward using `searchAfter`. In detail, those arrays contain the values of the first or last item’s attributes, in the order defined in the search request’s `sort` object. The last element of the array is the item’s value of our internal tiebreaker attribute, typically the internal record’s key.

The arrays `firstSortValues` and `lastSortValues` must not be altered and don't need to be interpreted by API consumers. For pagination to work as expected, they must be copied as they are into subsequent requests.

```
{
  "items": [
    { <field1>: <value1>, <field2>: <value2>, ... }
    { <field1>: <value1>, <field2>: <value2>, ... }
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
    "assignee": {"$eq": "demo"},
    "candidateGroups": { "$in": ["groupA", "groupB"] },
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "foo", "value": { "$lt": "500" } },
      { "name": "bar", "value": { "$exists": false } }
    ],
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
    "assignee": {"$eq": "demo"},
    "candidateGroups": { "$in": ["groupA", "groupB"] },
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "foo", "value": { "$lt": "500" } },
      { "name": "bar", "value": { "$exists": false } }
    ],
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

This yields the next three user task instances after the last one from the first search request’s result.

## Date values

Date values in the REST API endpoints follow the [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) notation. This includes all requests and responses. The API endpoints validate requests and transform responses accordingly.

## Variables

Variables in the API endpoints are proper JSON objects, where the `key` defines the variable name and the `value` specifies the variable value. The endpoints validate requests and transform responses accordingly.

In search requests, filtering by variables works as documented in [search requests](#search-requests).
