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

Defined in: [gen/CamundaClient.ts:384](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L384)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalJobStatistics>>;
```

Defined in: [gen/CamundaClient.ts:386](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L386)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
