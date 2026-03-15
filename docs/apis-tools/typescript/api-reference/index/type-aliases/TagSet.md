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

Defined in: [gen/types.gen.ts:3346](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3346)

List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.

## Type Declaration

### length

```ts
readonly length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
```
