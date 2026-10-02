---
title: "Type Alias: getProcessInstanceConsistency"
sidebar_label: "getProcessInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceConsistency

```ts
type getProcessInstanceConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstance>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
