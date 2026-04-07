---
title: "Type Alias: TagSet"
sidebar_label: "TagSet"
mdx:
  format: md
---

# Type Alias: TagSet

```ts
type TagSet = Tag[] & object;
```

Defined in: [gen/types.gen.ts:3349](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3349)

List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.

## Type Declaration

### length

```ts
readonly length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
```
