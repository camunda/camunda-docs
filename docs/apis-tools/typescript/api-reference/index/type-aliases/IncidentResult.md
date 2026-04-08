---
title: "Type Alias: IncidentResult"
sidebar_label: "IncidentResult"
mdx:
  format: md
---

# Type Alias: IncidentResult

```ts
type IncidentResult = object;
```

Defined in: [gen/types.gen.ts:3519](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3519)

## Properties

### creationTime

```ts
creationTime: string;
```

Defined in: [gen/types.gen.ts:3539](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3539)

The creation time of the incident.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3535](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3535)

The element ID associated to this incident.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3570)

The element instance key associated to this incident.

---

### errorMessage

```ts
errorMessage: string;
```

Defined in: [gen/types.gen.ts:3531](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3531)

Error message which describes the error in more detail.

---

### errorType

```ts
errorType: IncidentErrorTypeEnum;
```

Defined in: [gen/types.gen.ts:3527](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3527)

The type of the incident error.

---

### incidentKey

```ts
incidentKey: IncidentKey;
```

Defined in: [gen/types.gen.ts:3551](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3551)

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey

```ts
jobKey: JobKey | null;
```

Defined in: [gen/types.gen.ts:3574](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3574)

The job key, if exists, associated with this incident.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3523](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3523)

The process definition ID associated to this incident.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3555](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3555)

The process definition key associated to this incident.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3559](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3559)

The process instance key associated to this incident.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:3566](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3566)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3543](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3543)

The incident state.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3547](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3547)

The tenant ID of the incident.
