---
title: "Type Alias: getMappingRuleConsistency"
sidebar_label: "getMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: getMappingRuleConsistency

```ts
type getMappingRuleConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getMappingRule>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
