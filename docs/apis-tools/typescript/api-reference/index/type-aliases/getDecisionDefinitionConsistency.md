---
title: "Type Alias: getDecisionDefinitionConsistency"
sidebar_label: "getDecisionDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionConsistency

```ts
type getDecisionDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:287](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L287)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinition>>;
```

Defined in: [gen/CamundaClient.ts:289](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L289)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
