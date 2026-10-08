---
title: "Type Alias: LikeFilter"
sidebar_label: "LikeFilter"
mdx:
  format: md
---

# Type Alias: LikeFilter

```ts
type LikeFilter = string;
```

Checks if the property matches the provided like value.

Supported wildcard characters are:

- `*`: matches zero, one, or multiple characters.
- `?`: matches one, single character.

Wildcard characters can be escaped with backslash, for instance: `\*`.
