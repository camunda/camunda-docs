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

Defined in: [gen/CamundaClient.ts:820](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L820)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:822](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L822)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
