---
title: "Type Alias: getProcessInstanceStatisticsConsistency"
sidebar_label: "getProcessInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsConsistency

```ts
type getProcessInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:491](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L491)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:493](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L493)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
