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

Defined in: [runtime/jobWorker.ts:67](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobWorker.ts#L67)

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
