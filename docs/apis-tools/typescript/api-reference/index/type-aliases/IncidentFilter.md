---
title: "Type Alias: IncidentFilter"
sidebar_label: "IncidentFilter"
mdx:
  format: md
---

# Type Alias: IncidentFilter

```ts
type IncidentFilter = object;
```

Defined in: [gen/types.gen.ts:3375](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3375)

Incident search filter.

## Properties

### creationTime?

```ts
optional creationTime?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:3395](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3395)

Date of incident creation.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3391](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3391)

The element ID associated to this incident.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3419](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3419)

The element instance key associated to this incident.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3387](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3387)

The error message of this incident.

---

### errorType?

```ts
optional errorType?: IncidentErrorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:3383](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3383)

Incident error type with a defined set of values.

---

### incidentKey?

```ts
optional incidentKey?: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:3407](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3407)

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey?

```ts
optional jobKey?: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3423](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3423)

The job key, if exists, associated with this incident.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3379](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3379)

The process definition ID associated to this incident.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3411](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3411)

The process definition key associated to this incident.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3415](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3415)

The process instance key associated to this incident.

---

### state?

```ts
optional state?: IncidentStateFilterProperty;
```

Defined in: [gen/types.gen.ts:3399](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3399)

State of this incident with a defined set of values.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3403](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3403)

The tenant ID of the incident.
