---
title: "Type Alias: searchMappingRuleConsistency"
sidebar_label: "searchMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRuleConsistency

```ts
type searchMappingRuleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:812](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L812)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:814](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L814)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
