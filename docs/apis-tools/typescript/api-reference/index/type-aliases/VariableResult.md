---
title: "Type Alias: VariableResult"
sidebar_label: "VariableResult"
mdx:
  format: md
---

# Type Alias: VariableResult

```ts
type VariableResult = VariableResultBase & object;
```

Variable search response item.

## Type Declaration

### value

```ts
value: string;
```

The full value of this variable, or `""` if the variable is redacted.

Check `metadata.protectionModes` before you use the value: it contains `REDACT` for a
redacted variable.
