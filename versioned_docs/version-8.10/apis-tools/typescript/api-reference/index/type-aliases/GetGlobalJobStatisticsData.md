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

## Properties

### body?

```ts
optional body?: never;
```

---

### path?

```ts
optional path?: never;
```

---

### query

```ts
query: object;
```

#### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

#### jobType?

```ts
optional jobType?: string;
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
