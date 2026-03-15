---
title: "Type Alias: getGlobalJobStatisticsConsistency"
sidebar_label: "getGlobalJobStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalJobStatisticsConsistency

```ts
type getGlobalJobStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:350](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L350)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalJobStatistics>>;
```

Defined in: [gen/CamundaClient.ts:352](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L352)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
