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

Defined in: [gen/types.gen.ts:1113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1113)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1117](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1117)

The name of the cluster variable. Must be unique within its scope (global or tenant-specific).

---

### value

```ts
value: object;
```

Defined in: [gen/types.gen.ts:1121](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1121)

The value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses.

#### Index Signature

```ts
[key: string]: unknown
```
