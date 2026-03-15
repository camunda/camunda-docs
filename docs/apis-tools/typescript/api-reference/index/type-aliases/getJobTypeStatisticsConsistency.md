---
title: "Type Alias: getJobTypeStatisticsConsistency"
sidebar_label: "getJobTypeStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTypeStatisticsConsistency

```ts
type getJobTypeStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:398](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L398)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTypeStatistics>>;
```

Defined in: [gen/CamundaClient.ts:400](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L400)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
