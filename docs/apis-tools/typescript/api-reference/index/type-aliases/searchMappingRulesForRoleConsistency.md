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

Defined in: [gen/CamundaClient.ts:829](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L829)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForRole>>;
```

Defined in: [gen/CamundaClient.ts:831](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L831)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
