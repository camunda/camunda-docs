---
title: "Type Alias: JobErrorStatisticsItem"
sidebar_label: "JobErrorStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsItem

```ts
type JobErrorStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3942](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3942)

Aggregated error metrics for a single error type and message combination.

## Properties

### errorCode

```ts
errorCode: string;
```

Defined in: [gen/types.gen.ts:3946](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3946)

The error code identifier.

***

### errorMessage

```ts
errorMessage: string;
```

Defined in: [gen/types.gen.ts:3950](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3950)

The error message.

***

### workers

```ts
workers: number;
```

Defined in: [gen/types.gen.ts:3954](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3954)

Number of distinct workers that encountered this error.
