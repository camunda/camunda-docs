---
title: "Type Alias: AdvancedProcessInstanceKeyFilter"
sidebar_label: "AdvancedProcessInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceKeyFilter

```ts
type AdvancedProcessInstanceKeyFilter = object;
```

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
$eq?: ProcessInstanceKey;
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
$in?: ProcessInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: ProcessInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ProcessInstanceKey[];
```

Checks if the property matches none of the provided values.
