---
title: "Type Alias: getProcessDefinitionConsistency"
sidebar_label: "getProcessDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionConsistency

```ts
type getProcessDefinitionConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinition>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
