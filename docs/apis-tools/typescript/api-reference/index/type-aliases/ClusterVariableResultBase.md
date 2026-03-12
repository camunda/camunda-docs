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

Defined in: [gen/types.gen.ts:1194](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1194)

Cluster variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1198](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1198)

The name of the cluster variable. Unique within its scope (global or tenant-specific).

***

### scope

```ts
scope: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1199](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1199)

***

### tenantId

```ts
tenantId: string | null;
```

Defined in: [gen/types.gen.ts:1203](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1203)

Only provided if the cluster variable scope is TENANT. Null for global scope variables.
