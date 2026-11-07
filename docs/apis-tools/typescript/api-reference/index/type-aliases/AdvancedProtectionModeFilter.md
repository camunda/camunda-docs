---
title: "Type Alias: AdvancedProtectionModeFilter"
sidebar_label: "AdvancedProtectionModeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProtectionModeFilter

```ts
type AdvancedProtectionModeFilter = object;
```

Advanced filter

Advanced ProtectionModeEnum filter.

## Properties

### $eq?

```ts
$eq?: ProtectionModeEnum;
```

Checks if the variable has the provided protection mode.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the variable has any protection mode. Use `false` to match the variables
that are not protected.

---

### $in?

```ts
$in?: ProtectionModeEnum[];
```

Checks if the variable has at least one of the provided protection modes.

---

### $neq?

```ts
$neq?: ProtectionModeEnum;
```

Checks if the variable does not have the provided protection mode.

---

### $notIn?

```ts
$notIn?: ProtectionModeEnum[];
```

Checks if the variable has none of the provided protection modes.
