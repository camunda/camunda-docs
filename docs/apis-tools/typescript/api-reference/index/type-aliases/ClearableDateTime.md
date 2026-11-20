---
title: "Type Alias: ClearableDateTime"
sidebar_label: "ClearableDateTime"
mdx:
  format: md
---

# Type Alias: ClearableDateTime

```ts
type ClearableDateTime = string | null | string | null | null;
```

A date-time in RFC 3339 format, or an empty string to clear the persisted value.
A `null` value or omitting the property preserves the persisted value.
