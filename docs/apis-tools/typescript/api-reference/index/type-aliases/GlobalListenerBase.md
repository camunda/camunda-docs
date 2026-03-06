---
title: "Type Alias: GlobalListenerBase"
sidebar_label: "GlobalListenerBase"
mdx:
  format: md
---

# Type Alias: GlobalListenerBase

```ts
type GlobalListenerBase = object;
```

Defined in: [gen/types.gen.ts:2947](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2947)

## Properties

### afterNonGlobal?

```ts
optional afterNonGlobal: boolean;
```

Defined in: [gen/types.gen.ts:2959](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2959)

Whether the listener should run after model-level listeners.

***

### priority?

```ts
optional priority: number;
```

Defined in: [gen/types.gen.ts:2963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2963)

The priority of the listener. Higher priority listeners are executed before lower priority ones.

***

### retries?

```ts
optional retries: number;
```

Defined in: [gen/types.gen.ts:2955](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2955)

Number of retries for the listener job.

***

### type?

```ts
optional type: string;
```

Defined in: [gen/types.gen.ts:2951](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2951)

The name of the job type, used as a reference to specify which job workers request the respective listener job.
