---
title: "Type Alias: VariableResultBase"
sidebar_label: "VariableResultBase"
mdx:
  format: md
---

# Type Alias: VariableResultBase

```ts
type VariableResultBase = object;
```

Defined in: [gen/types.gen.ts:8153](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8153)

Variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8157](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8157)

Name of this variable.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:8177](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8177)

The key of the process instance of this variable.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:8184](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8184)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### scopeKey

```ts
scopeKey: ScopeKey;
```

Defined in: [gen/types.gen.ts:8173](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8173)

The key of the scope where this variable is directly defined. For process-level
variables, this is the process instance key. For local variables, this is the key of the
specific element instance (task, subprocess, gateway, event, etc.) where the variable is
directly defined.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:8161](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8161)

Tenant ID of this variable.

---

### variableKey

```ts
variableKey: VariableKey;
```

Defined in: [gen/types.gen.ts:8165](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8165)

The key for this variable.
