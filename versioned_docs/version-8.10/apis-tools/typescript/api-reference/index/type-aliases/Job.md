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
