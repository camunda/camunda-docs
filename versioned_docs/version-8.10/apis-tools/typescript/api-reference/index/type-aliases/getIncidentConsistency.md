---
title: "Type Alias: getIncidentConsistency"
sidebar_label: "getIncidentConsistency"
mdx:
  format: md
---

# Type Alias: getIncidentConsistency

```ts
type getIncidentConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getIncident>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
