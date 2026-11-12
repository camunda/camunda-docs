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

The value of this variable. Can be truncated or redacted.

If the value is truncated, `isTruncated` is `true` and the value contains only the
beginning of the full value.

If the variable is redacted, the value is set to `""` instead of the real value. Check
`metadata.protectionModes` before you use the value: it contains `REDACT` for a redacted
variable.
