---
title: "Type Alias: getProcessInstanceCallHierarchyConsistency"
sidebar_label: "getProcessInstanceCallHierarchyConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceCallHierarchyConsistency

```ts
type getProcessInstanceCallHierarchyConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceCallHierarchy>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
