---
title: "Type Alias: AdvancedFormKeyFilter"
sidebar_label: "AdvancedFormKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedFormKeyFilter

```ts
type AdvancedFormKeyFilter = object;
```

Advanced filter

Advanced FormKey filter.

## Properties

### $eq?

```ts
$eq?: FormKey;
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
$in?: FormKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: FormKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: FormKey[];
```

Checks if the property matches none of the provided values.
