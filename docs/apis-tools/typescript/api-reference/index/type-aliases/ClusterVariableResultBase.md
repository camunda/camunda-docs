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

Defined in: [gen/types.gen.ts:1192](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1192)

Cluster variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1196](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1196)

The name of the cluster variable. Unique within its scope (global or tenant-specific).

***

### scope

```ts
scope: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1197](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1197)

***

### tenantId?

```ts
optional tenantId: string | null;
```

Defined in: [gen/types.gen.ts:1201](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1201)

Only provided if the cluster variable scope is TENANT. Null for global scope variables.
