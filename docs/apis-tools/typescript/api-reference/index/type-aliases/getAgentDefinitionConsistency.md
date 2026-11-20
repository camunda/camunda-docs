---
title: "Type Alias: getAgentDefinitionConsistency"
sidebar_label: "getAgentDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getAgentDefinitionConsistency

```ts
type getAgentDefinitionConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAgentDefinition>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
