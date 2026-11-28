---
title: "Type Alias: AdvancedVariableHistoryItemKeyFilter"
sidebar_label: "AdvancedVariableHistoryItemKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableHistoryItemKeyFilter

```ts
type AdvancedVariableHistoryItemKeyFilter = object;
```

Advanced filter

Advanced VariableHistoryItemKey filter.

## Properties

### $eq?

```ts
$eq?: VariableHistoryItemKey;
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
$in?: VariableHistoryItemKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: VariableHistoryItemKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: VariableHistoryItemKey[];
```

Checks if the property matches none of the provided values.
