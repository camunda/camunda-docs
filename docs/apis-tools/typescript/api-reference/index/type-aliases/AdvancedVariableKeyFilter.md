---
title: "Type Alias: AdvancedVariableKeyFilter"
sidebar_label: "AdvancedVariableKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableKeyFilter

```ts
type AdvancedVariableKeyFilter = object;
```

Advanced filter

Advanced VariableKey filter.

## Properties

### $eq?

```ts
$eq?: VariableKey;
```

Checks for equality with the provided value.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
$in?: VariableKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: VariableKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: VariableKey[];
```

Checks if the property matches none of the provided values.
