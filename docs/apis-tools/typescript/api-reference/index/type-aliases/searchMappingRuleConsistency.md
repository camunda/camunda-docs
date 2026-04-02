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

Defined in: [gen/CamundaClient.ts:811](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L811)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:813](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L813)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
