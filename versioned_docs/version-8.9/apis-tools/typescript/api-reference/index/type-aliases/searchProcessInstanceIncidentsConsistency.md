---
title: "Type Alias: searchProcessInstanceIncidentsConsistency"
sidebar_label: "searchProcessInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstanceIncidentsConsistency

```ts
type searchProcessInstanceIncidentsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchProcessInstanceIncidents>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
