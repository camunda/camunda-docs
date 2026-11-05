---
title: "Type Alias: ProtectionModeEnum"
sidebar_label: "ProtectionModeEnum"
mdx:
  format: md
---

# Type Alias: ProtectionModeEnum

```ts
type ProtectionModeEnum =
  (typeof ProtectionModeEnum)[keyof typeof ProtectionModeEnum];
```

The kind of protection applied to a variable value. `REDACT` irrecoverably replaces the
value before it reaches secondary storage.
