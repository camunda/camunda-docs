---
title: "Type Alias: searchMappingRulesForRoleConsistency"
sidebar_label: "searchMappingRulesForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForRoleConsistency

```ts
type searchMappingRulesForRoleConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForRole>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
