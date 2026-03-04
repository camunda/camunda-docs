---
title: "Type Alias: searchDecisionDefinitionsConsistency"
sidebar_label: "searchDecisionDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionDefinitionsConsistency

```ts
type searchDecisionDefinitionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:738](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L738)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionDefinitions>>;
```

Defined in: [gen/CamundaClient.ts:740](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L740)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
