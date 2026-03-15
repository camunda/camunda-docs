---
title: "Type Alias: StatusMetric"
sidebar_label: "StatusMetric"
mdx:
  format: md
---

# Type Alias: StatusMetric

```ts
type StatusMetric = object;
```

Defined in: [gen/types.gen.ts:3701](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3701)

Metric for a single job status.

## Properties

### count

```ts
count: number;
```

Defined in: [gen/types.gen.ts:3705](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3705)

Number of jobs in this status.

***

### lastUpdatedAt

```ts
lastUpdatedAt: string | null;
```

Defined in: [gen/types.gen.ts:3709](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3709)

ISO 8601 timestamp of the last update for this status.
