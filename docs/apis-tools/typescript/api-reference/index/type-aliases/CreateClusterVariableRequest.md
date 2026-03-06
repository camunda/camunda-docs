---
title: "Type Alias: CreateClusterVariableRequest"
sidebar_label: "CreateClusterVariableRequest"
mdx:
  format: md
---

# Type Alias: CreateClusterVariableRequest

```ts
type CreateClusterVariableRequest = object;
```

Defined in: [gen/types.gen.ts:1146](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1146)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1150](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1150)

The name of the cluster variable. Must be unique within its scope (global or tenant-specific).

***

### value

```ts
value: object;
```

Defined in: [gen/types.gen.ts:1154](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1154)

The value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses.

#### Index Signature

```ts
[key: string]: unknown
```
