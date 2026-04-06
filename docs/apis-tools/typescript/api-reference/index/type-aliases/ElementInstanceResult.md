---
title: "Type Alias: ElementInstanceResult"
sidebar_label: "ElementInstanceResult"
mdx:
  format: md
---

# Type Alias: ElementInstanceResult

```ts
type ElementInstanceResult = object;
```

Defined in: [gen/types.gen.ts:2637](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2637)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:2653](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2653)

The element ID for this element instance.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:2677](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2677)

The assigned key, which acts as a unique identifier for this element instance.

---

### elementName

```ts
elementName: string;
```

Defined in: [gen/types.gen.ts:2657](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2657)

The element name for this element instance.

---

### endDate

```ts
endDate: string | null;
```

Defined in: [gen/types.gen.ts:2649](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2649)

Date when element instance finished.

---

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:2669](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2669)

Shows whether this element instance has an incident. If true also an incidentKey is provided.

---

### incidentKey

```ts
incidentKey: IncidentKey | null;
```

Defined in: [gen/types.gen.ts:2696](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2696)

Incident key associated with this element instance.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2641](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2641)

The process definition ID associated to this element instance.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2692](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2692)

The process definition key associated to this element instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2681](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2681)

The process instance key associated to this element instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:2688](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2688)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:2645](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2645)

Date when element instance started.

---

### state

```ts
state: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2665](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2665)

State of element instance as defined set of values.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2673](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2673)

The tenant ID of the incident.

---

### type

```ts
type:
  | "UNSPECIFIED"
  | "PROCESS"
  | "SUB_PROCESS"
  | "EVENT_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS_INNER_INSTANCE"
  | "START_EVENT"
  | "INTERMEDIATE_CATCH_EVENT"
  | "INTERMEDIATE_THROW_EVENT"
  | "BOUNDARY_EVENT"
  | "END_EVENT"
  | "SERVICE_TASK"
  | "RECEIVE_TASK"
  | "USER_TASK"
  | "MANUAL_TASK"
  | "TASK"
  | "EXCLUSIVE_GATEWAY"
  | "INCLUSIVE_GATEWAY"
  | "PARALLEL_GATEWAY"
  | "EVENT_BASED_GATEWAY"
  | "SEQUENCE_FLOW"
  | "MULTI_INSTANCE_BODY"
  | "CALL_ACTIVITY"
  | "BUSINESS_RULE_TASK"
  | "SCRIPT_TASK"
  | "SEND_TASK"
  | "UNKNOWN";
```

Defined in: [gen/types.gen.ts:2661](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2661)

Type of element as defined set of values.
