---
title: "Type Alias: searchMappingRulesForTenantConsistency"
sidebar_label: "searchMappingRulesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForTenantConsistency

```ts
type searchMappingRulesForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:838](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L838)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchMappingRulesForTenant>
>;
```

Defined in: [gen/CamundaClient.ts:840](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L840)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
