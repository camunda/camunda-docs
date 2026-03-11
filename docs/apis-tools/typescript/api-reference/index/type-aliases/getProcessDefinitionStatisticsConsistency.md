---
title: "Type Alias: getProcessDefinitionStatisticsConsistency"
sidebar_label: "getProcessDefinitionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionStatisticsConsistency

```ts
type getProcessDefinitionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:451](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L451)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:453](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L453)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
