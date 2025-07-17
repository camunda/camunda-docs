---
id: orchestration-cluster-api-rest-data-fetching
title: "Data fetching"
description: "Learn about fetching data using the Orchestration Cluster API."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Many Orchestration Cluster API resources like process definitions, user tasks, users, and tenants provide endpoints to fetch related data.

Those resources can offer search endpoints to query by POST method and a given query request object where applicable. The structure of such [search requests](#search-requests) always follows the same schema and so do the [search responses](#search-responses), always returning a list of items matching the query criteria, accompanied by search result metadata.

Resources can also support querying subordinate resources. For example, for users and groups, with group search being available at `POST /v2/groups/search`, a group's users can be retrieved using `POST /v2/groups/{groupId}/users/search`. Each resource determines independently if subordinate resources can be accessed this way.

Search endpoints can also be used to access entity instances with a unique identifier directly. As an alternative, resources can also provide GET method endpoints for fetching the data of single instances. This is done by a specific key parameter in the URL path, for example `GET /v2/user-tasks/{userTaskKey}`.

All those data retrieval endpoints offer near-real-time data consistency guarantees, providing runtime and historic data that has been processed by the [Camunda Exporter](../../self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).

## Search requests

Search requests consist of the components for **filter**, **sort**, and **page**.

### Filter

The filter object defines which fields should match. Only items that match the given fields will be returned. The available fields vary by object and are described in the respective search endpoint. Filtering by a unique identifier is usually available in filtering options. Beyond that, the filter options don’t have to comprise all the returned items’ attributes.

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "filter": {
    "assignee": "demo",
    "processInstanceKey": "22456786958"
  }
}
```

This filters by the attributes `assignee` and `processInstanceKey`, looking for exact matches with the provided values.

</details>

### Sort

The sort array specifies by which `field`s to sort the result items and whether this happens in ascending (ASC) or descending (DESC) `order`.

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "sort": [
    { "field": "state", "order": "ASC" }
  ]
}
```

This sorts the overall result set by the `state` attribute in ascending order.

</details>

### Page

The page object details how to slice the result set. An initial search request can omit the page object or define the `limit`. This specifies the maximum number of results to retrieve per request. Subsequent requests can either use **cursor** or **offset pagination** to iterate through the result set.

Cursor pagination bases on the value of the [search response's](#search-responses) `startCursor` and `endCursor`. Copy `startCursor` into `before` or `endCursor` into `after` to page through results respectively. The [search example](#search-example) showcases how to use these attributes for cursor pagination.

Offset pagination uses the `from` attribute to define the starting point of the next set of items in the overall result set.

:::note
Choosing the right pagination type depends on the specific use case. The expected result set size and intended usage of the results have the biggest influence. The expected reliability and performance of the search request affect this decision as well.

Consider using cursor pagination for larger result sets and displaying result list that scroll infinitely.
Paged result sets can be realized with offset pagination in a straightforward way but come with performance penalties for larger result sets.
:::

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "page": {
    "limit": 3
  }
}
```

This limits the result set returned in the response to 3 items, no matter how many overall results exist.

</details>

### Advanced search filters

To provide an easy yet expressive way for users to search for and filter resources, search requests can contain more advanced filter criteria than fields being _equal_ to a target value.

For example, this allows searching using logical (and, in) and comparison operators (greater than, less than). The list of generally supported advanced filter operators is described below. The supported operators depend on the endpoint and the type of the filter attribute. All endpoints document available operators for each attribute in the Orchestration Cluster API specification.

#### Conditional Operators

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

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "filter": {
    "candidateGroups": { "$like": "external-*", "$neq": "external-supervisor" }
  }
}
```

This filters by `candidateGroups` that start with `"external-"` but do not match `"external-supervisor"`.

</details>

#### Logical Operators

| Operator | Syntax                                                        | Description                                                                                                                   |
| -------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `$or`    | `"$or": [ { condition1 }, { condition2 }, ... ]`              | Filter where at least one of the conditions is true.                                                                          |
| and      | `{ field: { "$lt": value1 }, field: { "$gt": value2 }, ... }` | All conditions outside of `$or` operators will be considered as combined by an `AND` operator. There is no explicit operator. |

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "filter": {
    "assignee": "demo",
    "processInstanceKey": "22456786958",
    "candidateGroups": { "$neq": "external-supervisor", "$like": "external-*" }
  }
}
```

The top-level filters `assignee`, `processInstanceKey`, and `candidateGroups` are connected by an AND operator. Likewise, the `$neq` and `$like` advanced filter operators inside the top-level `candidateGroups` filter are combined by an AND operator.

</details>

#### Variables

Search endpoints can support filtering by variable values. This allows querying for process-related resources based on the values of specific variables that exist in their respective scope. For example, user task search supports filtering using the `localVariables` array and defining filter criteria for specific variables.

For variable values, the advanced filter criteria outlined above for fields apply.

<details>
<summary>Example</summary>

```
POST /v2/user-tasks/search

{
  "filter": {
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "price", "value": { "$lt": "500" } },
      { "name": "skipped", "value": { "$exists": false } }
    ]
  }
}
```

This filters for user tasks containing at least the variables `orderVolume` with a value of `10000` and `price` with a value lower than `500`, not containing variable `skipped`.

</details>

## Search responses

Search responses consist of two components: **`items`** and **`page`**.

- The **`items`** array contains instances of the respective endpoint’s resource.  
  The structure and attributes of these instances vary by endpoint and are detailed in the corresponding endpoint documentation.

- The **`page`** object includes pagination details for navigating through results in subsequent search requests:
  - **`totalItems`**: Indicates the total number of results for the query.
    > **Note:** In Elasticsearch/OpenSearch, this value is capped at **10,000**, even if more results are available.
  - **`startCursor`**: A reference to the **first** entry on the current page.  
    Use this value in the `before` parameter to page **backward** in a subsequent [search request](#search-requests).
  - **`endCursor`**: A reference to the **last** entry on the current page.  
    Use this value in the `after` parameter to page **forward** in a subsequent [search request](#search-requests).

<details>
<summary>Example</summary>

```
{
  "items": [
    {
      "state": "CREATED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786345",
      ...
    },
    {
      "state": "CREATED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786456",
      ...
    },
    {
      "state": "COMPLETED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786678",
      ...
    }
  ],
  "page": {
    "totalItems":  345,
    "startCursor": "jfenj8vhekgj98uzfafhu7",
    "endCursor": "negbkjeh84tzh4gk0kwegj"
  }
}
```

</details>

## Search example

Querying for the first three user tasks with certain criteria and sorted by state could look as follows:

```
POST /v2/user-tasks/search

{
  "filter": {
    "assignee": "demo",
    "processInstanceKey": "22456786958",
    "candidateGroups": { "$like": "external-*", "$neq": "external-supervisor" },
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "price", "value": { "$lt": "500" } },
      { "name": "skipped", "value": { "$exists": false } }
    ],
  },
  "sort": [
    { "field": "state", "order": "ASC" }
  ],
  "page": {
    "limit": 3
  }
}
```

This could yield the following example result:

```
200 OK

{
  "items": [
    {
      "state": "CREATED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786345",
      ...
    },
    {
      "state": "CREATED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786456",
      ...
    },
    {
      "state": "COMPLETED",
      "processInstanceKey": "22456786958",
      "userTaskKey": "22456786678",
      ...
    }
  ],
  "page": {
    "totalItems":  345,
    "startCursor": "jfenj8vhekgj98uzfafhu7",
    "endCursor": "negbkjeh84tzh4gk0kwegj"
  }
}
```

A follow-up request to receive the next three items could then look as follows:

```
POST /v2/user-tasks/search

{
  "filter": {
    "assignee": "demo",
    "processInstanceKey": "22456786958",
    "candidateGroups": { "$like": "external-*", "$neq": "external-supervisor" },
    "localVariables" :  [
      { "name": "orderVolume", "value": "10000" },
      { "name": "price", "value": { "$lt": "500" } },
      { "name": "skipped", "value": { "$exists": false } }
    ],
  },
  "sort": [
    { "field": "state", "order": "ASC" }
  ],
  "page": {
    "limit":  3,
    "after": "negbkjeh84tzh4gk0kwegj"
  }
}
```

This yields the next three user task instances after the last one from the first search request’s result.
