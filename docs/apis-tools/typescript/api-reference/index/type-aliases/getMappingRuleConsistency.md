---
title: "Type Alias: getMappingRuleConsistency"
sidebar_label: "getMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: getMappingRuleConsistency

```ts
type getMappingRuleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:415](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L415)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:417](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L417)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
