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

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchMappingRulesForTenant>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
