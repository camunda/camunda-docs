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

Defined in: [gen/CamundaClient.ts:303](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L303)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionInstance>>;
```

Defined in: [gen/CamundaClient.ts:305](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L305)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
