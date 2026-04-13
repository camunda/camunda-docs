---
title: "Type Alias: getDecisionDefinitionConsistency"
sidebar_label: "getDecisionDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionConsistency

```ts
type getDecisionDefinitionConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinition>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
