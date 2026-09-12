---
title: "Type Alias: DomainErrorTag"
sidebar_label: "DomainErrorTag"
mdx:
  format: md
---

# Type Alias: DomainErrorTag

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type DomainErrorTag = DomainError["_tag"];
```

The tag literals of the [DomainError](DomainError.md) union.
