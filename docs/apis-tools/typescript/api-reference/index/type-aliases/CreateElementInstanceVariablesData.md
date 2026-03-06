---
title: "Type Alias: CreateElementInstanceVariablesData"
sidebar_label: "CreateElementInstanceVariablesData"
mdx:
  format: md
---

# Type Alias: CreateElementInstanceVariablesData

```ts
type CreateElementInstanceVariablesData = object;
```

Defined in: [gen/types.gen.ts:10362](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10362)

## Properties

### body

```ts
body: SetVariableRequest;
```

Defined in: [gen/types.gen.ts:10363](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10363)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10364](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10364)

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the element instance to update the variables for.
This can be the process instance key (as obtained during instance creation), or a given
element, such as a service task (see the `elementInstanceKey` on the job message).

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10373](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10373)

***

### url

```ts
url: "/element-instances/{elementInstanceKey}/variables";
```

Defined in: [gen/types.gen.ts:10374](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10374)
