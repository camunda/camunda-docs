---
title: "Type Alias: JobTimeSeriesStatisticsItem"
sidebar_label: "JobTimeSeriesStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTimeSeriesStatisticsItem

```ts
type JobTimeSeriesStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3879](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3879)

Aggregated job metrics for a single time bucket.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3885](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3885)

***

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3884](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3884)

***

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3886](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3886)

***

### time

```ts
time: string;
```

Defined in: [gen/types.gen.ts:3883](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3883)

ISO 8601 timestamp representing the start of this time bucket.
