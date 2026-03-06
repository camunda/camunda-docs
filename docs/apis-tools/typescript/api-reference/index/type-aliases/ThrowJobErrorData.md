---
title: "Type Alias: ThrowJobErrorData"
sidebar_label: "ThrowJobErrorData"
mdx:
  format: md
---

# Type Alias: ThrowJobErrorData

```ts
type ThrowJobErrorData = object;
```

Defined in: [gen/types.gen.ts:11806](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11806)

## Properties

### body

```ts
body: JobErrorRequest;
```

Defined in: [gen/types.gen.ts:11807](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11807)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11808](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11808)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11814](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11814)

***

### url

```ts
url: "/jobs/{jobKey}/error";
```

Defined in: [gen/types.gen.ts:11815](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11815)
