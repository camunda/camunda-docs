---
title: "Type Alias: VariableHistoryItemSearchResult"
sidebar_label: "VariableHistoryItemSearchResult"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemSearchResult

```ts
type VariableHistoryItemSearchResult = VariableHistoryItemResultBase & object;
```

Variable history item search response item.

## Type Declaration

### isTruncated

```ts
isTruncated: boolean;
```

Indicates if the value is truncated.

### value

```ts
value: string;
```

Value of this variable change. Can be truncated, also when `truncateValues` is false, for the output collection of a multi-instance element or an ad-hoc sub-process.
