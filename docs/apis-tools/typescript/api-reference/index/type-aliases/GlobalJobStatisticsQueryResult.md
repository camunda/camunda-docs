---
title: "Type Alias: GlobalJobStatisticsQueryResult"
sidebar_label: "GlobalJobStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: GlobalJobStatisticsQueryResult

```ts
type GlobalJobStatisticsQueryResult = object;
```

Defined in: [gen/types.gen.ts:3688](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3688)

Global job statistics query result.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3690](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3690)

***

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3689](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3689)

***

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3691](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3691)

***

### isIncomplete

```ts
isIncomplete: boolean;
```

Defined in: [gen/types.gen.ts:3695](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3695)

True if some data is missing because internal limits were reached and some metrics were not recorded.
