---
title: "Type Alias: GetGlobalJobStatisticsData"
sidebar_label: "GetGlobalJobStatisticsData"
mdx:
  format: md
---

# Type Alias: GetGlobalJobStatisticsData

```ts
type GetGlobalJobStatisticsData = object;
```

Defined in: [gen/types.gen.ts:11904](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11904)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:11905](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11905)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:11906](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11906)

***

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:11907](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11907)

#### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

#### jobType?

```ts
optional jobType: string;
```

Optional job type to limit the aggregation to a single job type.

#### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.

***

### url

```ts
url: "/jobs/statistics/global";
```

Defined in: [gen/types.gen.ts:11923](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11923)
