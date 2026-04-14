---
title: "Type Alias: ClusterVariableSearchResult"
sidebar_label: "ClusterVariableSearchResult"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchResult

```ts
type ClusterVariableSearchResult = ClusterVariableResultBase & object;
```

Cluster variable search response item.

## Type Declaration

### isTruncated

```ts
isTruncated: boolean;
```

Whether the value is truncated or not.

### value

```ts
value: string;
```

Value of this cluster variable. Can be truncated.
