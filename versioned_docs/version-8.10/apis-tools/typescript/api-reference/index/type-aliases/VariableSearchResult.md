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
