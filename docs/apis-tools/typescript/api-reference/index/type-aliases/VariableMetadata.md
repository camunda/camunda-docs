---
title: "Type Alias: VariableMetadata"
sidebar_label: "VariableMetadata"
mdx:
  format: md
---

# Type Alias: VariableMetadata

```ts
type VariableMetadata = object;
```

Metadata describing how a variable is treated.

## Properties

### protectionModes

```ts
protectionModes: ProtectionModeEnum[];
```

The protections applied to the variable. The value of a variable protected with
`REDACT` is irrecoverably replaced before it is stored in secondary storage, so it is
never readable.
