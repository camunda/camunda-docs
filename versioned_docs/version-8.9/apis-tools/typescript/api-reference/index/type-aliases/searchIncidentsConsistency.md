---
title: "Type Alias: searchIncidentsConsistency"
sidebar_label: "searchIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchIncidentsConsistency

```ts
type searchIncidentsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchIncidents>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
