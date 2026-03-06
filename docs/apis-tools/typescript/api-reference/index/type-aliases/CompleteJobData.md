---
title: "Type Alias: CompleteJobData"
sidebar_label: "CompleteJobData"
mdx:
  format: md
---

# Type Alias: CompleteJobData

```ts
type CompleteJobData = object;
```

Defined in: [gen/types.gen.ts:11758](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11758)

## Properties

### body?

```ts
optional body: JobCompletionRequest;
```

Defined in: [gen/types.gen.ts:11759](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11759)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11760](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11760)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to complete.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11766)

***

### url

```ts
url: "/jobs/{jobKey}/completion";
```

Defined in: [gen/types.gen.ts:11767](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11767)
