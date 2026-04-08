---
title: "Type Alias: ClusterVariableResultBase"
sidebar_label: "ClusterVariableResultBase"
mdx:
  format: md
---

# Type Alias: ClusterVariableResultBase

```ts
type ClusterVariableResultBase = object;
```

Defined in: [gen/types.gen.ts:1190](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1190)

Cluster variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1194](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1194)

The name of the cluster variable. Unique within its scope (global or tenant-specific).

---

### scope

```ts
scope: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1195](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1195)

---

### tenantId

```ts
tenantId: string | null;
```

Defined in: [gen/types.gen.ts:1199](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1199)

Only provided if the cluster variable scope is TENANT. Null for global scope variables.
