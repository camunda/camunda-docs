---
title: "Type Alias: GetProcessDefinitionStatisticsData"
sidebar_label: "GetProcessDefinitionStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionStatisticsData

```ts
type GetProcessDefinitionStatisticsData = object;
```

Defined in: [gen/types.gen.ts:12952](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12952)

## Properties

### body?

```ts
optional body: object;
```

Defined in: [gen/types.gen.ts:12956](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12956)

Process definition element statistics request.

#### filter?

```ts
optional filter: object & object;
```

Process definition statistics search filter.

##### Type Declaration

###### batchOperationId?

```ts
optional batchOperationId: StringFilterProperty;
```

The batch operation id.

###### elementId?

```ts
optional elementId: StringFilterProperty;
```

The element id associated with the process instance.

###### elementInstanceState?

```ts
optional elementInstanceState: ElementInstanceStateFilterProperty;
```

The state of the element instances associated with the process instance.

###### endDate?

```ts
optional endDate: DateTimeFilterProperty;
```

The end date.

###### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

The error message related to the process.

###### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident: boolean;
```

Whether the element instance has an incident or not.

###### hasIncident?

```ts
optional hasIncident: boolean;
```

Whether this process instance has a related incident or not.

###### hasRetriesLeft?

```ts
optional hasRetriesLeft: boolean;
```

Whether the process has failed jobs with retries left.

###### incidentErrorHashCode?

```ts
optional incidentErrorHashCode: IntegerFilterProperty;
```

The incident error hash code, associated with this process.

###### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKeyFilterProperty;
```

The parent element instance key.

###### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKeyFilterProperty;
```

The parent process instance key.

###### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

The key of this process instance.

###### startDate?

```ts
optional startDate: DateTimeFilterProperty;
```

The start date.

###### state?

```ts
optional state: ProcessInstanceStateFilterProperty;
```

The process instance state.

###### tags?

```ts
optional tags: TagSet;
```

###### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

The tenant id.

###### variables?

```ts
optional variables: VariableValueFilterProperty[];
```

The process instance variables.

##### Type Declaration

###### $or?

```ts
optional $or: BaseProcessInstanceFilterFields[];
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

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13063](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13063)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13069](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13069)

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:13070](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13070)
