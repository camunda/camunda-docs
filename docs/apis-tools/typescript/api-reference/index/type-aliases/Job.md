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

Defined in: [runtime/jobWorker.ts:66](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L66)

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
