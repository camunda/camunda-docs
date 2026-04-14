---
title: "Type Alias: getStartProcessFormConsistency"
sidebar_label: "getStartProcessFormConsistency"
mdx:
  format: md
---

# Type Alias: getStartProcessFormConsistency

```ts
type getStartProcessFormConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getStartProcessForm>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
