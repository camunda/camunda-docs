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

Defined in: [gen/types.gen.ts:1180](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1180)

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
