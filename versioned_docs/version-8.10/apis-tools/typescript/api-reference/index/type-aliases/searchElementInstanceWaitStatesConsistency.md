---
title: "Type Alias: searchElementInstanceWaitStatesConsistency"
sidebar_label: "searchElementInstanceWaitStatesConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstanceWaitStatesConsistency

```ts
type searchElementInstanceWaitStatesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchElementInstanceWaitStates>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
