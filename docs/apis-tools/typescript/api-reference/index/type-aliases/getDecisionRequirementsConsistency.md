---
title: "Type Alias: getDecisionRequirementsConsistency"
sidebar_label: "getDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsConsistency

```ts
type getDecisionRequirementsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:345](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L345)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirements>>;
```

Defined in: [gen/CamundaClient.ts:347](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L347)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
