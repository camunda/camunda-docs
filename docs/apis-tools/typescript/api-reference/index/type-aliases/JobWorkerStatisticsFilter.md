---
title: "Type Alias: JobWorkerStatisticsFilter"
sidebar_label: "JobWorkerStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsFilter

```ts
type JobWorkerStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3787](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3787)

Job worker statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3792](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3792)

Start of the time window to filter metrics. ISO 8601 date-time format.

***

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3801](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3801)

Job type to return worker metrics for.

***

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3797](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3797)

End of the time window to filter metrics. ISO 8601 date-time format.
