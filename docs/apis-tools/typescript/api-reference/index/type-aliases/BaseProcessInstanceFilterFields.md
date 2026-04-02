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

Defined in: [gen/types.gen.ts:6300](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6300)

Base process instance search filter.

## Properties

### ~~batchOperationId?~~

```ts
optional batchOperationId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6344](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6344)

The batch operation id.
**Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error.

#### Deprecated

---

### batchOperationKey?

```ts
optional batchOperationKey?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6348](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6348)

The batch operation key.

---

### businessId?

```ts
optional businessId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6377](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6377)

The business id associated with the process instance.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6364](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6364)

The element id associated with the process instance.

---

### elementInstanceState?

```ts
optional elementInstanceState?: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6360](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6360)

The state of the element instances associated with the process instance.

---

### endDate?

```ts
optional endDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6308](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6308)

The end date.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6352](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6352)

The error message related to the process.

---

### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident?: boolean;
```

Defined in: [gen/types.gen.ts:6368](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6368)

Whether the element instance has an incident or not.

---

### hasIncident?

```ts
optional hasIncident?: boolean;
```

Defined in: [gen/types.gen.ts:6316](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6316)

Whether this process instance has a related incident or not.

---

### hasRetriesLeft?

```ts
optional hasRetriesLeft?: boolean;
```

Defined in: [gen/types.gen.ts:6356](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6356)

Whether the process has failed jobs with retries left.

---

### incidentErrorHashCode?

```ts
optional incidentErrorHashCode?: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:6372](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6372)

The incident error hash code, associated with this process.

---

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6336](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6336)

The parent element instance key.

---

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6332](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6332)

The parent process instance key.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6328](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6328)

The key of this process instance.

---

### startDate?

```ts
optional startDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6304](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6304)

The start date.

---

### state?

```ts
optional state?: ProcessInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6312](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6312)

The process instance state.

---

### tags?

```ts
optional tags?: TagSet;
```

Defined in: [gen/types.gen.ts:6373](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6373)

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6320](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6320)

The tenant id.

---

### variables?

```ts
optional variables?: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:6324](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6324)

The process instance variables.
