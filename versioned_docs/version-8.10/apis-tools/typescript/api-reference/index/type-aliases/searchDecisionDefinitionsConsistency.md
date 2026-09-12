---
title: "Type Alias: searchDecisionDefinitionsConsistency"
sidebar_label: "searchDecisionDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionDefinitionsConsistency

```ts
type searchDecisionDefinitionsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionDefinitions>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
