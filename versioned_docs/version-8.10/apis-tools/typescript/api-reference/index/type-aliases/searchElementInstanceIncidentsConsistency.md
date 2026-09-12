---
title: "Type Alias: searchElementInstanceIncidentsConsistency"
sidebar_label: "searchElementInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstanceIncidentsConsistency

```ts
type searchElementInstanceIncidentsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchElementInstanceIncidents>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
