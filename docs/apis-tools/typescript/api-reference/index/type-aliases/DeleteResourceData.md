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

Defined in: [gen/types.gen.ts:13552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13552)

## Properties

### body?

```ts
optional body: DeleteResourceRequest;
```

Defined in: [gen/types.gen.ts:13553](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13553)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13554](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13554)

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

Defined in: [gen/types.gen.ts:13563](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13563)

***

### url

```ts
url: "/resources/{resourceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13564](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13564)
