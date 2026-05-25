---
title: "Type Alias: getProcessInstanceStatisticsByDefinitionConsistency"
sidebar_label: "getProcessInstanceStatisticsByDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByDefinitionConsistency

```ts
type getProcessInstanceStatisticsByDefinitionConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByDefinition>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
