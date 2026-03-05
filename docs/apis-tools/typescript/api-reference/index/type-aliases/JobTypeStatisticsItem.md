---
title: "Type Alias: JobTypeStatisticsItem"
sidebar_label: "JobTypeStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsItem

```ts
type JobTypeStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3759](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3759)

Statistics for a single job type.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3765](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3765)

***

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3764](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3764)

***

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3766)

***

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3763](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3763)

The job type identifier.

***

### workers

```ts
workers: number;
```

Defined in: [gen/types.gen.ts:3770](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3770)

Number of distinct workers observed for this job type.
