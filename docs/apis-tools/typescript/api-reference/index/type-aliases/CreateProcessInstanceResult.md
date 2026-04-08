---
title: "Type Alias: CreateProcessInstanceResult"
sidebar_label: "CreateProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceResult

```ts
type CreateProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6235](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6235)

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6272](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6272)

Business id as provided on creation.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6241](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6241)

The BPMN process id of the process definition which was used to create the process.
instance

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6261](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6261)

The key of the process definition which was used to create the process instance.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6246](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6246)

The version of the process definition which was used to create the process instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6267](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6267)

The unique identifier of the created process instance; to be used wherever a request
needs a process instance key (e.g. CancelProcessInstanceRequest).

---

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6268](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6268)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6250](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6250)

The tenant id of the created process instance.

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:6254](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6254)

All the variables visible in the root scope.

#### Index Signature

```ts
[key: string]: unknown
```
