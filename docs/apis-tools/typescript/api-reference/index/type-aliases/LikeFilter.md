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

Defined in: [gen/types.gen.ts:2773](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2773)

Checks if the property matches the provided like value.

Supported wildcard characters are:

* `*`: matches zero, one, or multiple characters.
* `?`: matches one, single character.

Wildcard characters can be escaped with backslash, for instance: `\*`.
