---
title: "Type Alias: Job<In, Headers>"
sidebar_label: "Job<In, Headers>"
mdx:
  format: md
---

# Type Alias: Job\<In, Headers\>

```ts
type Job<In, Headers> = EnrichedActivatedJob & object;
```

Defined in: [runtime/jobWorker.ts:67](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L67)

## Type Declaration

### customHeaders

```ts
customHeaders: InferOrUnknown<Headers>;
```

### variables

```ts
variables: InferOrUnknown<In>;
```

## Type Parameters

### In

`In` *extends* `z.ZodTypeAny` \| `undefined`

### Headers

`Headers` *extends* `z.ZodTypeAny` \| `undefined`
