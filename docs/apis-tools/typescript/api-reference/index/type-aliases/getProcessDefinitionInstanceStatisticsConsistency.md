---
title: "Type Alias: getProcessDefinitionInstanceStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceStatisticsConsistency

```ts
type getProcessDefinitionInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:426](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L426)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:428](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L428)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
