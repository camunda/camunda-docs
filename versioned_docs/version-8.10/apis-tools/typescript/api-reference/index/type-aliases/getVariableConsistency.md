---
title: "Type Alias: getVariableConsistency"
sidebar_label: "getVariableConsistency"
mdx:
  format: md
---

# Type Alias: getVariableConsistency

```ts
type getVariableConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getVariable>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
