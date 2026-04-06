---
title: "Type Alias: ElementInstanceFilter"
sidebar_label: "ElementInstanceFilter"
mdx:
  format: md
---

# Type Alias: ElementInstanceFilter

```ts
type ElementInstanceFilter = object;
```

Defined in: [gen/types.gen.ts:2542](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2542)

Element instance filter.

## Properties

### elementId?

```ts
optional elementId?: ElementId;
```

Defined in: [gen/types.gen.ts:2558](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2558)

The element ID for this element instance.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:2572](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2572)

The assigned key, which acts as a unique identifier for this element instance.

---

### elementInstanceScopeKey?

```ts
optional elementInstanceScopeKey?:
  | ElementInstanceKey
  | ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2597](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2597)

The scope key of this element instance. If provided with a process instance key it will return element instances that are immediate children of the process instance. If provided with an element instance key it will return element instances that are immediate children of the element instance.

---

### elementName?

```ts
optional elementName?: string;
```

Defined in: [gen/types.gen.ts:2563](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2563)

The element name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### endDate?

```ts
optional endDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:2592](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2592)

The end date of this element instance.

---

### hasIncident?

```ts
optional hasIncident?: boolean;
```

Defined in: [gen/types.gen.ts:2567](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2567)

Shows whether this element instance has an incident related to.

---

### incidentKey?

```ts
optional incidentKey?: IncidentKey;
```

Defined in: [gen/types.gen.ts:2584](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2584)

The key of incident if field incident is true.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2546](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2546)

The process definition ID associated to this element instance.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2580](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2580)

The process definition key associated to this element instance.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2576](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2576)

The process instance key associated to this element instance.

---

### startDate?

```ts
optional startDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:2588](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2588)

The start date of this element instance.

---

### state?

```ts
optional state?: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:2550](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2550)

State of element instance as defined set of values.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:2568](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2568)

---

### type?

```ts
optional type?:
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

Defined in: [gen/types.gen.ts:2554](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2554)

Type of element as defined set of values.
