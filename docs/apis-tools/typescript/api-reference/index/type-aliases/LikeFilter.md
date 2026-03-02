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

Defined in: [gen/types.gen.ts:2620](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2620)

Checks if the property matches the provided like value.

Supported wildcard characters are:

- `*`: matches zero, one, or multiple characters.
- `?`: matches one, single character.

Wildcard characters can be escaped with backslash, for instance: `\*`.
