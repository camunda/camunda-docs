---
title: "Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency"
sidebar_label: "getProcessDefinitionMessageSubscriptionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency

```ts
type getProcessDefinitionMessageSubscriptionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:442](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L442)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionMessageSubscriptionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:444](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L444)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
