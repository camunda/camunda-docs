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

Defined in: [gen/types.gen.ts:1176](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1176)

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
