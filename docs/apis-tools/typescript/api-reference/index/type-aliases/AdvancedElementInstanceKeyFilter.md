---
title: "Type Alias: AdvancedElementInstanceKeyFilter"
sidebar_label: "AdvancedElementInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementInstanceKeyFilter

```ts
type AdvancedElementInstanceKeyFilter = object;
```

Advanced filter

Advanced ElementInstanceKey filter.

## Properties

### $eq?

```ts
$eq?: ElementInstanceKey;
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
$in?: ElementInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: ElementInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ElementInstanceKey[];
```

Checks if the property matches none of the provided values.
