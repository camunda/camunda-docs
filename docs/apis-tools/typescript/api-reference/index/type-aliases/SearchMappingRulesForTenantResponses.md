---
title: "Type Alias: SearchMappingRulesForTenantResponses"
sidebar_label: "SearchMappingRulesForTenantResponses"
mdx:
  format: md
---

# Type Alias: SearchMappingRulesForTenantResponses

```ts
type SearchMappingRulesForTenantResponses = object;
```

Defined in: [gen/types.gen.ts:15354](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15354)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15358](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15358)

The search result of MappingRules for the tenant.

#### Type Declaration

##### items

```ts
items: MappingRuleResult[];
```

The matching mapping rules.
