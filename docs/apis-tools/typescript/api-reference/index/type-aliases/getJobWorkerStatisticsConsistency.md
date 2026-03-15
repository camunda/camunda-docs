---
title: "Type Alias: getJobWorkerStatisticsConsistency"
sidebar_label: "getJobWorkerStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobWorkerStatisticsConsistency

```ts
type getJobWorkerStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:406](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L406)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobWorkerStatistics>>;
```

Defined in: [gen/CamundaClient.ts:408](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L408)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
