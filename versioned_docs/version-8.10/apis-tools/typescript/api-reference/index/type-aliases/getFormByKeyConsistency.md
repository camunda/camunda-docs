---
title: "Type Alias: getFormByKeyConsistency"
sidebar_label: "getFormByKeyConsistency"
mdx:
  format: md
---

# Type Alias: getFormByKeyConsistency

```ts
type getFormByKeyConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getFormByKey>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
