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

List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.

## Type Declaration

### length

```ts
readonly length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
```
