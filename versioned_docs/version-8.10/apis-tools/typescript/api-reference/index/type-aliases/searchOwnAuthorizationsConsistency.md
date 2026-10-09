---
title: "Type Alias: searchOwnAuthorizationsConsistency"
sidebar_label: "searchOwnAuthorizationsConsistency"
mdx:
  format: md
---

# Type Alias: searchOwnAuthorizationsConsistency

```ts
type searchOwnAuthorizationsConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchOwnAuthorizations>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
