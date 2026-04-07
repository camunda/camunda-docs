---
title: "Type Alias: VariableSearchResult"
sidebar_label: "VariableSearchResult"
mdx:
  format: md
---

# Type Alias: VariableSearchResult

```ts
type VariableSearchResult = VariableResultBase & object;
```

Defined in: [gen/types.gen.ts:8129](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8129)

Variable search response item.

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

Value of this variable. Can be truncated.
