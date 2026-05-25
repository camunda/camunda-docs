---
title: "Type Alias: getDecisionRequirementsConsistency"
sidebar_label: "getDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsConsistency

```ts
type getDecisionRequirementsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirements>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
