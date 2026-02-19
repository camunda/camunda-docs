---
title: "Type Alias: getDecisionInstanceConsistency"
sidebar_label: "getDecisionInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionInstanceConsistency

```ts
type getDecisionInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:337](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L337)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionInstance>>;
```

Defined in: [gen/CamundaClient.ts:339](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L339)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
