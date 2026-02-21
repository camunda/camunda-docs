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

Defined in: [gen/types.gen.ts:12132](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12132)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:12133](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12133)

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:12134](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12134)

---

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:12135](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12135)

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

---

### url

```ts
url: "/jobs/statistics/global";
```

Defined in: [gen/types.gen.ts:12151](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12151)
