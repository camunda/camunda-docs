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

Defined in: [gen/types.gen.ts:15300](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15300)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15304](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15304)

The search result of MappingRules for the tenant.

#### Type Declaration

##### items

```ts
items: MappingRuleResult[];
```

The matching mapping rules.
