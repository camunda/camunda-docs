---
title: "Type Alias: DeleteResourceData"
sidebar_label: "DeleteResourceData"
mdx:
  format: md
---

# Type Alias: DeleteResourceData

```ts
type DeleteResourceData = object;
```

Defined in: [gen/types.gen.ts:13703](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13703)

## Properties

### body?

```ts
optional body: DeleteResourceRequest;
```

Defined in: [gen/types.gen.ts:13704](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13704)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13705](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13705)

#### resourceKey

```ts
resourceKey: ResourceKey;
```

The key of the resource to delete.
This can be the key of a process definition, the key of a decision requirements
definition or the key of a form definition

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13714](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13714)

***

### url

```ts
url: "/resources/{resourceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13715](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13715)
