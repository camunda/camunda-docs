---
title: "Type Alias: searchDecisionInstancesConsistency"
sidebar_label: "searchDecisionInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionInstancesConsistency

```ts
type searchDecisionInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:746](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L746)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionInstances>>;
```

Defined in: [gen/CamundaClient.ts:748](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L748)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
