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

Defined in: [gen/CamundaClient.ts:721](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L721)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionDefinitions>>;
```

Defined in: [gen/CamundaClient.ts:723](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L723)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
