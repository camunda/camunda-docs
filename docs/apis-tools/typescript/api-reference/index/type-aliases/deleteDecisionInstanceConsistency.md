---
title: "Type Alias: deleteDecisionInstanceConsistency"
sidebar_label: "deleteDecisionInstanceConsistency"
mdx:
  format: md
---

# Type Alias: deleteDecisionInstanceConsistency

```ts
type deleteDecisionInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:214](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L214)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.deleteDecisionInstance>>;
```

Defined in: [gen/CamundaClient.ts:216](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L216)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
