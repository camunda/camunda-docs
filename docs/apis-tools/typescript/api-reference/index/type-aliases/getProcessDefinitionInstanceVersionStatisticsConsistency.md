---
title: "Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceVersionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency

```ts
type getProcessDefinitionInstanceVersionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:434](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L434)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceVersionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:436](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L436)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
