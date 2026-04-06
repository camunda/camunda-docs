---
title: "Type Alias: ConditionalEvaluationInstruction"
sidebar_label: "ConditionalEvaluationInstruction"
mdx:
  format: md
---

# Type Alias: ConditionalEvaluationInstruction

```ts
type ConditionalEvaluationInstruction = object;
```

Defined in: [gen/types.gen.ts:1369](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1369)

## Properties

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1380](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1380)

Used to evaluate root-level conditional start events of the process definition with the given key.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:1375](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1375)

Used to evaluate root-level conditional start events for a tenant with the given ID.
This will only evaluate root-level conditional start events of process definitions which belong to the tenant.

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:1385](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1385)

JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.

#### Index Signature

```ts
[key: string]: unknown
```
