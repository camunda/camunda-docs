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

Defined in: [gen/types.gen.ts:12310](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12310)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:12314](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12314)

The mapping rule search result.

#### Type Declaration

##### items

```ts
items: MappingRuleResult[];
```

The matching mapping rules.
