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

Defined in: [gen/types.gen.ts:1148](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1148)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1152](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1152)

The name of the cluster variable. Must be unique within its scope (global or tenant-specific).

***

### value

```ts
value: object;
```

Defined in: [gen/types.gen.ts:1156](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1156)

The value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses.

#### Index Signature

```ts
[key: string]: unknown
```
