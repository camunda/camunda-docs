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

Defined in: [gen/types.gen.ts:6297](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6297)

Base process instance search filter.

## Properties

### batchOperationId?

```ts
optional batchOperationId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6337](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6337)

The batch operation id.

***

### businessId?

```ts
optional businessId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6366](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6366)

The business id associated with the process instance.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6353](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6353)

The element id associated with the process instance.

***

### elementInstanceState?

```ts
optional elementInstanceState: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6349](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6349)

The state of the element instances associated with the process instance.

***

### endDate?

```ts
optional endDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6305](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6305)

The end date.

***

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6341](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6341)

The error message related to the process.

***

### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident: boolean;
```

Defined in: [gen/types.gen.ts:6357](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6357)

Whether the element instance has an incident or not.

***

### hasIncident?

```ts
optional hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:6313](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6313)

Whether this process instance has a related incident or not.

***

### hasRetriesLeft?

```ts
optional hasRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:6345](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6345)

Whether the process has failed jobs with retries left.

***

### incidentErrorHashCode?

```ts
optional incidentErrorHashCode: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:6361](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6361)

The incident error hash code, associated with this process.

***

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6333](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6333)

The parent element instance key.

***

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6329](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6329)

The parent process instance key.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6325](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6325)

The key of this process instance.

***

### startDate?

```ts
optional startDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6301](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6301)

The start date.

***

### state?

```ts
optional state: ProcessInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6309](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6309)

The process instance state.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6362](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6362)

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6317](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6317)

The tenant id.

***

### variables?

```ts
optional variables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:6321](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6321)

The process instance variables.
