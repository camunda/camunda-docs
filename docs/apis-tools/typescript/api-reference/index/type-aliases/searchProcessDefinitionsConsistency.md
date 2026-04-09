---
title: "Type Alias: searchProcessDefinitionsConsistency"
sidebar_label: "searchProcessDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessDefinitionsConsistency

```ts
type searchProcessDefinitionsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessDefinitions>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
