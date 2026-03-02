---
title: "Type Alias: BaseProcessInstanceFilterFields"
sidebar_label: "BaseProcessInstanceFilterFields"
mdx:
  format: md
---

# Type Alias: BaseProcessInstanceFilterFields

```ts
type BaseProcessInstanceFilterFields = object;
```

Defined in: [gen/types.gen.ts:5624](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5624)

Base process instance search filter.

## Properties

### batchOperationId?

```ts
optional batchOperationId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5664](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5664)

The batch operation id.

---

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5680](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5680)

The element id associated with the process instance.

---

### elementInstanceState?

```ts
optional elementInstanceState: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:5676](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5676)

The state of the element instances associated with the process instance.

---

### endDate?

```ts
optional endDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5632](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5632)

The end date.

---

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5668](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5668)

The error message related to the process.

---

### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident: boolean;
```

Defined in: [gen/types.gen.ts:5684](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5684)

Whether the element instance has an incident or not.

---

### hasIncident?

```ts
optional hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:5640](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5640)

Whether this process instance has a related incident or not.

---

### hasRetriesLeft?

```ts
optional hasRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:5672](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5672)

Whether the process has failed jobs with retries left.

---

### incidentErrorHashCode?

```ts
optional incidentErrorHashCode: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:5688](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5688)

The incident error hash code, associated with this process.

---

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5660](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5660)

The parent element instance key.

---

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5656](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5656)

The parent process instance key.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5652](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5652)

The key of this process instance.

---

### startDate?

```ts
optional startDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5628](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5628)

The start date.

---

### state?

```ts
optional state: ProcessInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:5636](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5636)

The process instance state.

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:5689](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5689)

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5644](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5644)

The tenant id.

---

### variables?

```ts
optional variables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:5648](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5648)

The process instance variables.
