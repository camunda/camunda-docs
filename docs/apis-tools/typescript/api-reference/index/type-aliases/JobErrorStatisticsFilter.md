---
title: "Type Alias: JobErrorStatisticsFilter"
sidebar_label: "JobErrorStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsFilter

```ts
type JobErrorStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3903](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3903)

Job error statistics search filter.

## Properties

### errorCode?

```ts
optional errorCode: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3921](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3921)

Optional error code filter with advanced search capabilities.

***

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3925](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3925)

Optional error message filter with advanced search capabilities.

***

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3908](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3908)

Start of the time window to filter metrics. ISO 8601 date-time format.

***

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3917](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3917)

Job type to return error metrics for.

***

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3913](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3913)

End of the time window to filter metrics. ISO 8601 date-time format.
