---
title: "Type Alias: getProcessInstanceStatisticsByErrorConsistency"
sidebar_label: "getProcessInstanceStatisticsByErrorConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByErrorConsistency

```ts
type getProcessInstanceStatisticsByErrorConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByError>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
