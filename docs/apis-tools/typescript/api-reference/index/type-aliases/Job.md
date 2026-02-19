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

Defined in: [runtime/jobWorker.ts:60](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L60)

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

`In` _extends_ `z.ZodTypeAny` \| `undefined`

### Headers

`Headers` _extends_ `z.ZodTypeAny` \| `undefined`
