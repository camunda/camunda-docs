---
title: "Type Alias: JobWorkerStatisticsItem"
sidebar_label: "JobWorkerStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsItem

```ts
type JobWorkerStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3818](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3818)

Statistics for a single worker within a job type.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3824](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3824)

***

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3823](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3823)

***

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3825](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3825)

***

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:3822](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3822)

The worker identifier.
