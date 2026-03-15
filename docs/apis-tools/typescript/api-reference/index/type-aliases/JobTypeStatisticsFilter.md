---
title: "Type Alias: JobTypeStatisticsFilter"
sidebar_label: "JobTypeStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsFilter

```ts
type JobTypeStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3726](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3726)

Job type statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3731](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3731)

Start of the time window to filter metrics. ISO 8601 date-time format.

***

### jobType?

```ts
optional jobType: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3742](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3742)

Optional job type filter with advanced search capabilities.
Supports exact match, pattern matching, and other operators.

***

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3736](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3736)

End of the time window to filter metrics. ISO 8601 date-time format.
