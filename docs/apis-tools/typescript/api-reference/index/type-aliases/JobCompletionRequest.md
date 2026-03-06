---
title: "Type Alias: JobCompletionRequest"
sidebar_label: "JobCompletionRequest"
mdx:
  format: md
---

# Type Alias: JobCompletionRequest

```ts
type JobCompletionRequest = object;
```

Defined in: [gen/types.gen.ts:4324](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4324)

## Properties

### result?

```ts
optional result: JobResult;
```

Defined in: [gen/types.gen.ts:4331](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4331)

***

### variables?

```ts
optional variables: 
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4328](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4328)

The variables to complete the job with.
