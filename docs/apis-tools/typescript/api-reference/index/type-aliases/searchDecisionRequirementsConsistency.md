---
title: "Type Alias: searchDecisionRequirementsConsistency"
sidebar_label: "searchDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionRequirementsConsistency

```ts
type searchDecisionRequirementsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:737](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L737)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionRequirements>>;
```

Defined in: [gen/CamundaClient.ts:739](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L739)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
