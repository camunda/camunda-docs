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

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRule>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
