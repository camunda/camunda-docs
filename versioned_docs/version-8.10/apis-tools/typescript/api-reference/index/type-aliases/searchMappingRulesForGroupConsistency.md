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

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForGroup>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
