---
title: "Type Alias: searchMappingRulesForGroupConsistency"
sidebar_label: "searchMappingRulesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForGroupConsistency

```ts
type searchMappingRulesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:821](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L821)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:823](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L823)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
