---
title: "Type Alias: getUsageMetricsConsistency"
sidebar_label: "getUsageMetricsConsistency"
mdx:
  format: md
---

# Type Alias: getUsageMetricsConsistency

```ts
type getUsageMetricsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:561](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L561)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUsageMetrics>>;
```

Defined in: [gen/CamundaClient.ts:563](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L563)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
