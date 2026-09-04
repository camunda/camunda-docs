---
title: "Type Alias: searchDecisionRequirementsConsistency"
sidebar_label: "searchDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionRequirementsConsistency

```ts
type searchDecisionRequirementsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionRequirements>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
