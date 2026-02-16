---
title: "Type Alias: SearchProcessInstancesData"
sidebar_label: "SearchProcessInstancesData"
mdx:
  format: md
---

# Type Alias: SearchProcessInstancesData

```ts
type SearchProcessInstancesData = object;
```

Defined in: [gen/types.gen.ts:13623](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13623)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:13627](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13627)

Process instance search request.

#### Type Declaration

##### filter?

```ts
optional filter: BaseProcessInstanceFilterFields & object & object;
```

Process instance search filter.

###### Type Declaration

###### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

The process definition id.

###### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

The process definition key.

###### processDefinitionName?

```ts
optional processDefinitionName: StringFilterProperty;
```

The process definition name.

###### processDefinitionVersion?

```ts
optional processDefinitionVersion: IntegerFilterProperty;
```

The process definition version.

###### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag: StringFilterProperty;
```

The process definition version tag.

###### Type Declaration

###### $or?

```ts
optional $or: BaseProcessInstanceFilterFields & object[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "state": "ACTIVE",
  "tenantId": 123,
  "$or": [
    { "processDefinitionId": "process_v1" },
    { "processDefinitionId": "process_v2", "hasIncident": true }
  ]
}
```

This matches process instances that:

- are in _ACTIVE_ state
- have tenant id equal to _123_
- and match either:

- `processDefinitionId` is _process_v1_, or
- `processDefinitionId` is _process_v2_ and `hasIncident` is _true_

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13720](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13720)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13721](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13721)

---

### url

```ts
url: "/process-instances/search";
```

Defined in: [gen/types.gen.ts:13722](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13722)
