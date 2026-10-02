---
title: "Type Alias: searchProcessDefinitionVariableNamesConsistency"
sidebar_label: "searchProcessDefinitionVariableNamesConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessDefinitionVariableNamesConsistency

```ts
type searchProcessDefinitionVariableNamesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchProcessDefinitionVariableNames>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
