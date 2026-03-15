---
title: "Type Alias: searchMappingRulesForRoleConsistency"
sidebar_label: "searchMappingRulesForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForRoleConsistency

```ts
type searchMappingRulesForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:830](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L830)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForRole>>;
```

Defined in: [gen/CamundaClient.ts:832](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L832)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
