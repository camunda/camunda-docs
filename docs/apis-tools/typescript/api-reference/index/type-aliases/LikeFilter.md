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

Defined in: [gen/types.gen.ts:2775](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2775)

Checks if the property matches the provided like value.

Supported wildcard characters are:

* `*`: matches zero, one, or multiple characters.
* `?`: matches one, single character.

Wildcard characters can be escaped with backslash, for instance: `\*`.
