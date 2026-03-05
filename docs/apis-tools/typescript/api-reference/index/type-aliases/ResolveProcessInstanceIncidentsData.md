---
title: "Type Alias: ResolveProcessInstanceIncidentsData"
sidebar_label: "ResolveProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: ResolveProcessInstanceIncidentsData

```ts
type ResolveProcessInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:13216](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13216)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13217](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13217)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13218](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13218)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to resolve incidents for.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13224](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13224)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/incident-resolution";
```

Defined in: [gen/types.gen.ts:13225](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13225)
