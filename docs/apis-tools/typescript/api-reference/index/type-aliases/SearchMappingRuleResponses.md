---
title: "Type Alias: SearchMappingRuleResponses"
sidebar_label: "SearchMappingRuleResponses"
mdx:
  format: md
---

# Type Alias: SearchMappingRuleResponses

```ts
type SearchMappingRuleResponses = object;
```

Defined in: [gen/types.gen.ts:12159](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12159)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:12163](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12163)

The mapping rule search result.

#### Type Declaration

##### items

```ts
items: MappingRuleResult[];
```

The matching mapping rules.
