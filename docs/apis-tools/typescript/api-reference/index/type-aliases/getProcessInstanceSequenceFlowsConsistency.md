---
title: "Type Alias: getProcessInstanceSequenceFlowsConsistency"
sidebar_label: "getProcessInstanceSequenceFlowsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceSequenceFlowsConsistency

```ts
type getProcessInstanceSequenceFlowsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceSequenceFlows>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
