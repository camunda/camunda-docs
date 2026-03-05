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

Defined in: [gen/types.gen.ts:15120](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15120)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15124](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15124)

The search result of MappingRules for the tenant.

#### Type Declaration

##### items

```ts
items: MappingRuleResult[];
```

The matching mapping rules.
